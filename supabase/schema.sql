create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Allow public read site_content" on public.site_content;
create policy "Allow public read site_content"
on public.site_content
for select
using (true);

drop policy if exists "Allow public write site_content" on public.site_content;
create policy "Allow public write site_content"
on public.site_content
for insert
with check (true);

drop policy if exists "Allow public update site_content" on public.site_content;
create policy "Allow public update site_content"
on public.site_content
for update
using (true)
with check (true);
