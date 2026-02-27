import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Item = {
  id: string;
  name: string;
  price: number;
  store: "ikea" | "amazon" | "costco";
  url: string;
  image_url: string | null;
  category: string | null;
  created_at: string;
};

export type Swipe = {
  id: string;
  item_id: string;
  liked: boolean;
  created_at: string;
};
