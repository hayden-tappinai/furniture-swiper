"use client";

import { useEffect, useState } from "react";
import { supabase, Item } from "@/lib/supabase";
import { SEED_ITEMS } from "@/lib/seed-data";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: true });

      if (error || !data || data.length === 0) {
        // Fall back to seed data if Supabase tables aren't set up
        setItems(SEED_ITEMS);
      } else {
        setItems(data);
      }
      setLoading(false);
    }

    fetchItems();
  }, []);

  return { items, loading };
}
