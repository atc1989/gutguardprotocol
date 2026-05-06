create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'lead-capture',
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_submitted_at_idx on public.leads (submitted_at desc);
create unique index if not exists leads_email_unique_idx on public.leads (email);

alter table public.leads enable row level security;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  protocol_key text not null check (protocol_key in ('trial', 'start', 'grow', 'power')),
  product_name text not null,
  product_detail text not null,
  product_duration text not null,
  product_quantity text not null,
  product_scan_line text not null,
  price text not null,
  customer_name text not null,
  email text not null,
  mobile text not null,
  street text not null,
  city text not null,
  province text not null,
  region text not null,
  zip text,
  ttclid text,
  ttp text,
  landing_page text,
  tt_test_event_code text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  tiktok_event_id text,
  payment_method text not null check (payment_method in ('bank', 'card', 'cod', 'gcash', 'maya')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'completed', 'cancelled')),
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create unique index if not exists orders_pending_email_protocol_unique_idx
  on public.orders (email, protocol_key)
  where status = 'pending';

alter table public.orders enable row level security;
