create extension if not exists pgcrypto;

create table if not exists shared_resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  file_name text not null,
  file_path text not null,
  file_size int,
  created_at timestamptz default now()
);

insert into storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
values ('shared-resources', 'shared-resources', false, array['application/pdf'], 52428800)
on conflict (id) do update
set public = excluded.public,
    allowed_mime_types = excluded.allowed_mime_types,
    file_size_limit = excluded.file_size_limit;
