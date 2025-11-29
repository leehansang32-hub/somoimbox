-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Users Table (Extends Supabase Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  nickname text,
  avatar_url text,
  region text,
  interests text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Groups Table
create table public.groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  category text not null,
  region text not null,
  owner_id uuid references public.users(id) not null,
  image_url text,
  max_members integer default 50,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Group Members Table (Join Requests)
create table public.group_members (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) not null,
  user_id uuid references public.users(id) not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  join_answer text,
  role text check (role in ('member', 'admin')) default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, user_id)
);

-- 4. Events Table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) not null,
  title text not null,
  date timestamp with time zone not null,
  location text not null,
  cost integer default 0,
  participants uuid[] default array[]::uuid[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Chats Table (Realtime)
create table public.chats (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) not null,
  user_id uuid references public.users(id) not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Likes Table
create table public.likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  group_id uuid references public.groups(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, group_id)
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.events enable row level security;
alter table public.chats enable row level security;
alter table public.likes enable row level security;

-- Basic Policies
create policy "Public profiles are viewable by everyone." on public.users for select using (true);
create policy "Users can insert their own profile." on public.users for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.users for update using (auth.uid() = id);

create policy "Groups are viewable by everyone." on public.groups for select using (true);
create policy "Authenticated users can create groups." on public.groups for insert with check (auth.role() = 'authenticated');

create policy "Members are viewable by group members." on public.group_members for select using (true);
create policy "Users can request to join." on public.group_members for insert with check (auth.uid() = user_id);

create policy "Events are viewable by everyone." on public.events for select using (true);

create policy "Chat is viewable by group members." on public.chats for select using (
  exists (
    select 1 from public.group_members 
    where group_members.group_id = chats.group_id 
    and group_members.user_id = auth.uid()
    and group_members.status = 'approved'
  )
);
create policy "Members can insert chat." on public.chats for insert with check (
  exists (
    select 1 from public.group_members 
    where group_members.group_id = chats.group_id 
    and group_members.user_id = auth.uid()
    and group_members.status = 'approved'
  )
);

create policy "Likes are viewable by everyone." on public.likes for select using (true);
create policy "Users can like groups." on public.likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike groups." on public.likes for delete using (auth.uid() = user_id);

-- Trigger to create a public user record on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, nickname, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
