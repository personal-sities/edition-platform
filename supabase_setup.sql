-- =========================
-- Aloqa Pro platformasi uchun Supabase DB sozlamasi
-- (universities / schools / clinics alohida jadval)
-- =========================

-- 1) Universitetlar
create table if not exists universities (
  id bigserial primary key,
  name text not null unique,
  work_started text,
  meeting_date date,
  comment text,
  offer_status text,
  commercial_status text,
  contract_status text,
  final_status text,
  updated_at timestamptz not null default now()
);

-- 2) Maktablar
create table if not exists schools (
  id bigserial primary key,
  name text not null unique,
  work_started text,
  meeting_date date,
  comment text,
  offer_status text,
  commercial_status text,
  contract_status text,
  final_status text,
  updated_at timestamptz not null default now()
);

-- 3) Klinikalar
create table if not exists clinics (
  id bigserial primary key,
  name text not null unique,
  work_started text,
  meeting_date date,
  comment text,
  offer_status text,
  commercial_status text,
  contract_status text,
  final_status text,
  updated_at timestamptz not null default now()
);

-- 4) Hodimlar
create table if not exists staff (
  staff_id bigserial primary key,
  name text not null,
  role text,
  place text
);

-- 5) Vazifalar
create table if not exists tasks (
  task_id bigserial primary key,
  staff_id bigint references staff(staff_id) on delete cascade,
  name text not null,
  place text,
  date date,
  status int not null default 0
);

-- Index (task'larni tez olish uchun)
create index if not exists tasks_staff_id_idx on tasks(staff_id);

-- =========================
-- RLS + Policy (login qilganlar uchun)
-- =========================

alter table universities enable row level security;
alter table schools enable row level security;
alter table clinics enable row level security;
alter table staff enable row level security;
alter table tasks enable row level security;

-- Avvalgi policy bo'lsa o'chiramiz
DO $$
BEGIN
  IF EXISTS (select 1 from pg_policies where policyname = 'universities full for authenticated') THEN
    drop policy "universities full for authenticated" on universities;
  END IF;
  IF EXISTS (select 1 from pg_policies where policyname = 'schools full for authenticated') THEN
    drop policy "schools full for authenticated" on schools;
  END IF;
  IF EXISTS (select 1 from pg_policies where policyname = 'clinics full for authenticated') THEN
    drop policy "clinics full for authenticated" on clinics;
  END IF;
  IF EXISTS (select 1 from pg_policies where policyname = 'staff full for authenticated') THEN
    drop policy "staff full for authenticated" on staff;
  END IF;
  IF EXISTS (select 1 from pg_policies where policyname = 'tasks full for authenticated') THEN
    drop policy "tasks full for authenticated" on tasks;
  END IF;
END $$;

create policy "universities full for authenticated"
on universities for all
to authenticated
using (true)
with check (true);

create policy "schools full for authenticated"
on schools for all
to authenticated
using (true)
with check (true);

create policy "clinics full for authenticated"
on clinics for all
to authenticated
using (true)
with check (true);

create policy "staff full for authenticated"
on staff for all
to authenticated
using (true)
with check (true);

create policy "tasks full for authenticated"
on tasks for all
to authenticated
using (true)
with check (true);
