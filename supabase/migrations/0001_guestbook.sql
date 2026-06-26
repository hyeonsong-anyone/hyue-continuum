-- 방명록 (축하 메시지) 테이블 + RLS
-- 익명 SELECT는 hidden=false 인 안전 컬럼만. INSERT/숨김 처리는 service-role(API 라우트) 전용.

create table if not exists public.guestbook_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 20),
  message    text not null check (char_length(message) between 1 and 200),
  hidden     boolean not null default false,
  ip_hash    text,                       -- rate limit 전용. raw IP 저장 금지(sha256만).
  created_at timestamptz not null default now()
);

create index if not exists guestbook_visible_created_idx
  on public.guestbook_messages (created_at desc)
  where hidden = false;

create index if not exists guestbook_iphash_created_idx
  on public.guestbook_messages (ip_hash, created_at desc);

alter table public.guestbook_messages enable row level security;

-- 익명(anon) 은 공개된 글만 읽을 수 있다. 쓰기 정책은 없음 → anon INSERT 차단.
-- (서버 API 는 service-role 키로 RLS 를 우회해 insert/숨김 처리한다.)
drop policy if exists "public read visible messages" on public.guestbook_messages;
create policy "public read visible messages"
  on public.guestbook_messages
  for select
  to anon, authenticated
  using (hidden = false);

-- 컬럼 레벨 방어: anon/authenticated 가 테이블을 직접 쿼리해도 ip_hash/hidden 은 못 읽게.
-- (서버 API 는 service_role 이라 영향 없음.)
revoke select (ip_hash, hidden) on public.guestbook_messages from anon, authenticated;

-- 의도 명시(향후 오해 방지): anon/authenticated 에 INSERT/UPDATE/DELETE 정책을 두지 않는다.
-- RLS 활성 + 정책 부재 = 차단. 모든 쓰기/숨김 처리는 service_role(API 라우트)만 수행한다.

-- 안전 컬럼만 노출하는 뷰(선택적으로 클라이언트가 직접 읽을 때 사용; ip_hash 미노출).
create or replace view public.guestbook_public as
  select id, name, message, created_at
  from public.guestbook_messages
  where hidden = false
  order by created_at desc;
