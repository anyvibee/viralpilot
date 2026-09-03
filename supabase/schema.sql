-- ViralPilot production foundation (PostgreSQL/Supabase)
create extension if not exists pgcrypto;
create table if not exists profiles (id uuid primary key default gen_random_uuid(), email text unique, display_name text, created_at timestamptz default now());
create table if not exists instagram_accounts (id uuid primary key default gen_random_uuid(), profile_id uuid not null references profiles(id) on delete cascade, instagram_user_id text unique, username text not null, account_type text, connected_at timestamptz default now(), last_synced_at timestamptz);
create table if not exists account_snapshots (id uuid primary key default gen_random_uuid(), instagram_account_id uuid not null references instagram_accounts(id) on delete cascade, captured_at timestamptz default now(), followers bigint, reach bigint, views bigint, engagement_rate numeric(8,4), payload jsonb not null default '{}'::jsonb);
create table if not exists content_items (id uuid primary key default gen_random_uuid(), instagram_account_id uuid not null references instagram_accounts(id) on delete cascade, instagram_media_id text unique, media_type text, caption text, published_at timestamptz, views bigint, likes bigint, comments bigint, shares bigint, saves bigint, payload jsonb not null default '{}'::jsonb);
create table if not exists analyses (id uuid primary key default gen_random_uuid(), instagram_account_id uuid not null references instagram_accounts(id) on delete cascade, created_at timestamptz default now(), score numeric(5,2), result jsonb not null default '{}'::jsonb);
create index if not exists snapshots_account_time on account_snapshots(instagram_account_id, captured_at desc);
create index if not exists content_account_time on content_items(instagram_account_id, published_at desc);
