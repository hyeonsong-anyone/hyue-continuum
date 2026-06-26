import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 방명록 설정이 갖춰졌는지 여부. 없으면 API가 503으로 우아하게 거절.
 * IP_SALT 까지 요구 — 약한 기본 솔트로 ip_hash 가 역추적되는 것을 차단.
 */
export const guestbookEnabled = Boolean(
  url && anonKey && serviceKey && process.env.GUESTBOOK_IP_SALT,
);

/** 읽기용 익명 클라이언트 (RLS: hidden=false 만 노출). */
export function getAnonClient(): SupabaseClient {
  if (!url || !anonKey) throw new Error("Supabase 공개 환경변수가 없습니다.");
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

/** 쓰기용 service-role 클라이언트 — 서버에서만 사용. RLS 우회. */
export function getAdminClient(): SupabaseClient {
  if (!url || !serviceKey) throw new Error("Supabase service-role 키가 없습니다.");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export const GUESTBOOK_TABLE = "guestbook_messages";

export type GuestMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};
