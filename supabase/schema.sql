create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  phone text,
  display_name text,
  active boolean not null default true,
  must_change_password boolean not null default true,
  invited_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_profiles add column if not exists phone text;
create unique index if not exists admin_profiles_phone_key
  on public.admin_profiles (phone) where phone is not null;

create table if not exists public.admin_bootstrap_lock (
  singleton boolean primary key default true check (singleton = true),
  claimed_at timestamptz not null default now()
);

create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null check (char_length(student_name) between 1 and 50),
  student_contact text check (student_contact is null or char_length(student_contact) <= 100),
  group_name text check (group_name is null or char_length(group_name) <= 80),
  consent_at timestamptz not null,
  submitted_at timestamptz not null default now(),
  test_version text not null check (char_length(test_version) <= 60),
  source_url text check (source_url is null or char_length(source_url) <= 1000),
  mbti_type varchar(4) check (mbti_type is null or mbti_type ~ '^(E|I)(N|S)(T|F)(J|P)$'),
  primary_emotion text,
  support_emotions text[] not null default '{}',
  avoid_emotions text[] not null default '{}',
  appearance_style text,
  intake_profile jsonb not null default '{}'::jsonb check (jsonb_typeof(intake_profile) = 'object'),
  emotion_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(emotion_scores) = 'object'),
  raw_answers jsonb not null default '[]'::jsonb check (jsonb_typeof(raw_answers) = 'array' and jsonb_array_length(raw_answers) in (29, 30, 33)),
  answers_detail jsonb not null default '[]'::jsonb check (jsonb_typeof(answers_detail) = 'array' and jsonb_array_length(answers_detail) in (29, 30, 33))
);

alter table public.assessment_submissions
  add column if not exists intake_profile jsonb not null default '{}'::jsonb;
alter table public.assessment_submissions
  drop constraint if exists assessment_submissions_raw_answers_check;
alter table public.assessment_submissions
  add constraint assessment_submissions_raw_answers_check check (jsonb_typeof(raw_answers) = 'array' and jsonb_array_length(raw_answers) in (29, 30, 33));
alter table public.assessment_submissions
  drop constraint if exists assessment_submissions_answers_detail_check;
alter table public.assessment_submissions
  add constraint assessment_submissions_answers_detail_check check (jsonb_typeof(answers_detail) = 'array' and jsonb_array_length(answers_detail) in (29, 30, 33));

create index if not exists assessment_submissions_submitted_at_idx
  on public.assessment_submissions (submitted_at desc);
create index if not exists assessment_submissions_primary_emotion_idx
  on public.assessment_submissions (primary_emotion);
create index if not exists assessment_submissions_mbti_type_idx
  on public.assessment_submissions (mbti_type);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists admin_profiles_touch_updated_at on public.admin_profiles;
create trigger admin_profiles_touch_updated_at
before update on public.admin_profiles
for each row execute function public.touch_updated_at();

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid() and active = true
  );
$$;

revoke all on function public.is_active_admin() from public;
grant execute on function public.is_active_admin() to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.admin_bootstrap_lock enable row level security;
alter table public.assessment_submissions enable row level security;

drop policy if exists "admins can read own profile" on public.admin_profiles;
create policy "admins can read own profile"
on public.admin_profiles for select
to authenticated
using (id = auth.uid() and active = true);

drop policy if exists "admins can finish invitation" on public.admin_profiles;
create policy "admins can finish invitation"
on public.admin_profiles for update
to authenticated
using (id = auth.uid() and active = true)
with check (id = auth.uid() and active = true);

drop policy if exists "visitors can submit assessments" on public.assessment_submissions;
create policy "visitors can submit assessments"
on public.assessment_submissions for insert
to anon, authenticated
with check (
  char_length(student_name) between 1 and 50
  and consent_at is not null
  and jsonb_typeof(emotion_scores) = 'object'
  and jsonb_typeof(intake_profile) = 'object'
  and jsonb_typeof(raw_answers) = 'array' and jsonb_array_length(raw_answers) in (29, 30, 33)
  and jsonb_typeof(answers_detail) = 'array' and jsonb_array_length(answers_detail) in (29, 30, 33)
);

drop policy if exists "admins can read assessments" on public.assessment_submissions;
create policy "admins can read assessments"
on public.assessment_submissions for select
to authenticated
using (public.is_active_admin());

drop policy if exists "admins can delete assessments" on public.assessment_submissions;
create policy "admins can delete assessments"
on public.assessment_submissions for delete
to authenticated
using (public.is_active_admin());

revoke all on table public.admin_profiles from anon, authenticated;
grant select on table public.admin_profiles to authenticated;
grant update (display_name, must_change_password) on table public.admin_profiles to authenticated;

revoke all on table public.assessment_submissions from anon, authenticated;
grant insert on table public.assessment_submissions to anon, authenticated;
grant select, delete on table public.assessment_submissions to authenticated;

revoke all on table public.admin_bootstrap_lock from anon, authenticated;
