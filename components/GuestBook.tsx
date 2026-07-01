"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { LabelRule } from "./ui/primitives";

type Msg = { id: string; name: string; message: string; created_at: string };

const NAME_MAX = 20;
const MSG_MAX = 200;

function Card({ m }: { m: Msg }) {
  return (
    <div className="mx-2 flex w-[240px] shrink-0 flex-col justify-center rounded-2xl border border-line bg-card px-4 py-2.5">
      <p className="whitespace-pre-wrap text-[13px] leading-snug text-ink/90">
        {m.message}
      </p>
      <p className="mt-1.5 text-[11.5px] font-semibold text-accent-soft">— {m.name}</p>
    </div>
  );
}

/** Fisher-Yates 셔플 (원본 불변). */
function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 마퀴 트랙이 항상 화면을 채우도록 충분히 복제. */
function buildTrack(list: Msg[]): Msg[] {
  if (list.length === 0) return [];
  let track = [...list];
  while (track.length < 6) track = [...track, ...list];
  return [...track, ...track]; // seamless loop 위해 2배
}

export function GuestBook() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((d) => setMessages(shuffle(d.messages ?? [])))
      .catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim() || status === "sending") return;
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "전송에 실패했어요.");
        return;
      }
      setMessages((prev) => [data.message, ...prev]);
      setName("");
      setMessage("");
      setStatus("done");
      setFeedback("축하 메시지가 등록되었습니다. 감사합니다!");
    } catch {
      setStatus("error");
      setFeedback("네트워크 오류가 발생했어요.");
    }
  }

  // 두 줄로 분할 (짝/홀 인덱스) 후 각각 마퀴 트랙 구성
  const rowA = buildTrack(messages.filter((_, i) => i % 2 === 0));
  const rowB = buildTrack(messages.filter((_, i) => i % 2 === 1));
  const durA = `${Math.max(16, rowA.length * 2)}s`;
  const durB = `${Math.max(16, rowB.length * 2)}s`;

  return (
    <section className="w-full overflow-hidden py-24">
      <div className="mx-auto w-full max-w-[430px] px-6">
        <Reveal>
          <LabelRule>축하 한마디</LabelRule>
          <p className="mb-8 text-[14px] leading-relaxed text-ink-sub">
            졸업을 맞은 학생들에게 축하의 말을 남겨주세요.
            <br />
            남긴 이름과 메시지는 모두에게 공개됩니다.
          </p>

          <form onSubmit={submit} className="mb-12 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, NAME_MAX))}
              placeholder="이름"
              maxLength={NAME_MAX}
              className="w-full rounded-xl border border-line bg-card px-4 py-3 text-[15px] outline-none placeholder:text-ink-sub focus:border-accent"
            />
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MSG_MAX))}
                placeholder="축하 메시지를 남겨주세요"
                maxLength={MSG_MAX}
                rows={3}
                className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-[15px] outline-none placeholder:text-ink-sub focus:border-accent"
              />
              <span className="pointer-events-none absolute bottom-2.5 right-3 text-[11px] text-ink-sub">
                {message.length}/{MSG_MAX}
              </span>
            </div>
            <button
              type="submit"
              disabled={status === "sending" || !name.trim() || !message.trim()}
              className="w-full rounded-xl bg-accent py-3 text-[15px] font-semibold text-white transition-opacity disabled:opacity-40"
            >
              {status === "sending" ? "전송 중…" : "축하 남기기"}
            </button>
            {feedback && (
              <p
                className={`text-center text-[13px] ${
                  status === "error" ? "text-red-400" : "text-accent-soft"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </Reveal>
      </div>

      {/* 마퀴 (2줄, 반대 방향) */}
      {rowA.length > 0 ? (
        <div className="space-y-2.5">
          <div
            className="marquee"
            style={{ ["--marquee-duration" as string]: durA, animationDirection: "reverse" }}
          >
            {rowA.map((m, i) => (
              <Card key={`a-${m.id}-${i}`} m={m} />
            ))}
          </div>
          {rowB.length > 0 && (
            <div
              className="marquee"
              style={{ ["--marquee-duration" as string]: durB }}
            >
              {rowB.map((m, i) => (
                <Card key={`b-${m.id}-${i}`} m={m} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="px-6 text-center text-[13px] text-ink-sub">
          첫 번째 축하 메시지를 남겨주세요 🎓
        </p>
      )}
    </section>
  );
}
