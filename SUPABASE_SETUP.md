# 🌿 Supabase Database & Admin Panel Setup Guide

Follow these steps to fully configure your Supabase backend for the Eachur Agro Store website.

---

## 1. Configure the `.env` File
At the root of your project, you'll find a file named `.env`. Open it and replace the placeholder value with your project's **Anon API key**:

```env
VITE_SUPABASE_URL=https://nehzlzimjfkustcrahgk.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_public_key
```

*You can find your **Anon key** in the Supabase Dashboard under **Project Settings** -> **API** -> **`anon` (public)**.*

---

## 2. Create the Products Table
We need to create a table to store the product catalog.

1. In the Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query** (or **New Blank Query**).
3. Copy and paste the following SQL script:

```sql
-- Create the products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  price text not null,
  description text,
  img_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create a policy that allows anyone to read products (public access)
create policy "Allow public read access"
on public.products for select
to public
using (true);

-- Create a policy that allows authenticated users (admins) to perform all actions
create policy "Allow admin write access"
on public.products for all
to authenticated
using (true)
with check (true);
```

4. Click **Run** (at the bottom right).

---

## 3. Create a Public Storage Bucket (For Product Images)
To allow the Admin panel to upload custom product photos:

1. Click on **Storage** in the left sidebar of the Supabase dashboard.
2. Click **New Bucket**.
3. Set the Bucket Name to **`product-images`** (all lowercase, exactly as written).
4. **Important**: Toggle the **Public** switch to **ON** (so users can view uploaded product images).
5. Click **Create bucket**.
6. Set the Storage Policies:
   - Click on the **Policies** tab under Storage.
   - For `product-images`, add a policy allowing **all actions** (Insert, Select, Update, Delete) to **authenticated** users (so logged-in admins can upload/delete files).
   - Alternatively, you can use the quick template: *"Give upload access to authenticated users"* or *"Give full access to authenticated users"*.

---

## 4. Create your Admin Login Account
To register the email and password you will use to log in to the admin panel:

1. Click on **Authentication** in the left sidebar.
2. Click on **Add User** -> **Create User**.
3. Enter the **Email** and **Password** you want to use.
4. **Uncheck** "Send auto-confirm email" (so the account is instantly active and verified).
5. Click **Create user**.

---

## 5. Test the Setup
1. Start your local development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:5173/admin` (or the URL shown in your terminal).
3. Log in using the email and password you created in Step 4.
4. Add a test product. You can type details, select a category, upload an image, and save. It will appear immediately in your inventory table on the right and load on the `/products` page!

---

## 6. Enabling Multi-Language Database Translation Support
To translate dynamic product data (names and descriptions) stored inside the database into Malayalam (`ml`), you need to add translated columns to your `products` table.

1. Go to the **SQL Editor** in the Supabase Dashboard.
2. Click **New Query**.
3. Paste and run the following SQL command:
   ```sql
   -- Add columns for Malayalam translation
   ALTER TABLE public.products ADD COLUMN name_ml text;
   ALTER TABLE public.products ADD COLUMN description_ml text;
   ```
4. Once completed, your Admin panel will display input fields for both English and Malayalam names and descriptions. The frontend will dynamically display the Malayalam translations to users who select Malayalam!
