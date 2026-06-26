import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import {
  getAdminClient,
  getAnonClient,
  guestbookEnabled,
  GUESTBOOK_TABLE,
  type GuestMessage,
} from "@/lib/supabase";
import { containsProfanity } from "@/lib/profanity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NAME_MAX = 20;
const MESSAGE_MAX = 200;
const RATE_WINDOW_MIN = 5; // 분
const RATE_MAX = 5; // 동일 IP가 window 내 최대 작성 수

function clientIp(req: NextRequest): string {
  // 플랫폼이 위조 불가로 설정하는 헤더를 우선 신뢰 (Vercel). 그 외 환경에서는
  // x-forwarded-for 가 위조 가능하므로 rate limit 은 best-effort 임을 전제로 한다.
  const trusted = req.headers.get("x-vercel-forwarded-for");
  if (trusted) return trusted.split(",")[0].trim();
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

function hashIp(ip: string): string {
  // guestbookEnabled 가 GUESTBOOK_IP_SALT 존재를 보장 (없으면 503). 약한 기본 솔트 미사용.
  const salt = process.env.GUESTBOOK_IP_SALT as string;
  return createHash("sha256").update(`${ip}|${salt}`).digest("hex");
}

/** GET — 공개 방명록 목록 (최신순, 최대 100). */
export async function GET() {
  if (!guestbookEnabled) {
    return NextResponse.json({ messages: [] as GuestMessage[], enabled: false });
  }
  try {
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from(GUESTBOOK_TABLE)
      .select("id, name, message, created_at")
      .eq("hidden", false)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    return NextResponse.json({ messages: data ?? [], enabled: true });
  } catch {
    return NextResponse.json(
      { messages: [], enabled: true, error: "목록을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

/** POST — 축하 메시지 작성. 길이/금칙어/rate limit 검증 후 service-role 로 저장. */
export async function POST(req: NextRequest) {
  if (!guestbookEnabled) {
    return NextResponse.json(
      { error: "방명록이 아직 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  let body: { name?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > NAME_MAX) {
    return NextResponse.json(
      { error: `이름은 1~${NAME_MAX}자로 입력해주세요.` },
      { status: 400 },
    );
  }
  if (!message || message.length > MESSAGE_MAX) {
    return NextResponse.json(
      { error: `메시지는 1~${MESSAGE_MAX}자로 입력해주세요.` },
      { status: 400 },
    );
  }
  if (containsProfanity(name) || containsProfanity(message)) {
    return NextResponse.json(
      { error: "부적절한 표현이 포함되어 있어요." },
      { status: 422 },
    );
  }

  const ipHash = hashIp(clientIp(req));

  try {
    const admin = getAdminClient();

    // rate limit: window 내 동일 IP 작성 수 카운트
    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
    const { count, error: countErr } = await admin
      .from(GUESTBOOK_TABLE)
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if (countErr) throw countErr;
    if ((count ?? 0) >= RATE_MAX) {
      return NextResponse.json(
        { error: "잠시 후 다시 작성해주세요." },
        { status: 429 },
      );
    }

    const { data, error } = await admin
      .from(GUESTBOOK_TABLE)
      .insert({ name, message, ip_hash: ipHash })
      .select("id, name, message, created_at")
      .single();

    if (error) throw error;
    return NextResponse.json({ message: data as GuestMessage }, { status: 201 });
  } catch (e) {
    // TODO(임시진단): 원인 파악 후 detail 제거
    return NextResponse.json(
      {
        error: "저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 500 },
    );
  }
}
