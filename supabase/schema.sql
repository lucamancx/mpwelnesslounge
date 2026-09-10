-- Tabella Specialisti
create table public.specialists (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  bio text not null,
  image_url text not null,
  is_owner boolean default false,
  order_priority int default 10,
  created_at timestamp with time zone default now()
);

-- Tabella Slot Prenotabili
create table public.booking_slots (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  time_start time not null,
  time_end time not null,
  specialist_id uuid references public.specialists(id) on delete set null,
  service_category text not null,
  is_booked boolean default false,
  created_at timestamp with time zone default now()
);

-- Tabella Prenotazioni Ricevute
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  slot_id uuid references public.booking_slots(id) on delete cascade,
  client_name text not null,
  client_phone text not null,
  client_email text not null,
  notes text,
  status text default 'confirmed',
  created_at timestamp with time zone default now()
);

-- Storage: Bucket 'specialists-images' (Public Read)
insert into storage.buckets (id, name, public) values ('specialists-images', 'specialists-images', true);
