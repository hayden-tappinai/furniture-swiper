# Furniture Swiper

Tinder-style furniture shopping app. Swipe right to like (adds to cart), swipe left to pass.

Built for Hayden's SF apartment shopping list with a warm Japandi aesthetic.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase

## Getting Started

```bash
npm install
cp .env.local.example .env.local  # Add your Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

Run the SQL files in order via the Supabase SQL Editor:

1. `supabase/schema.sql` - Creates tables and RLS policies
2. `supabase/seed.sql` - Inserts 34 furniture items

The app works with local fallback data if the database isn't set up.

## Deploy

Push to GitHub, connect to Vercel, and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables.
