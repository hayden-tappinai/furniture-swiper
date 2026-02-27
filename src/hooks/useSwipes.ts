"use client";

import { useState, useCallback } from "react";
import { supabase, Item } from "@/lib/supabase";

export function useSwipes() {
  const [likedItems, setLikedItems] = useState<Item[]>([]);

  const recordSwipe = useCallback(
    async (item: Item, liked: boolean) => {
      if (liked) {
        setLikedItems((prev) => [...prev, item]);
      }

      // Try to persist to Supabase (non-blocking)
      supabase
        .from("swipes")
        .insert({ item_id: item.id, liked })
        .then(() => {});
    },
    []
  );

  const clearCart = useCallback(async () => {
    const ids = likedItems.map((i) => i.id);
    setLikedItems([]);

    // Try to clear from Supabase
    if (ids.length > 0) {
      supabase.from("swipes").delete().in("item_id", ids).then(() => {});
    }
  }, [likedItems]);

  const removeItem = useCallback(async (itemId: string) => {
    setLikedItems((prev) => prev.filter((i) => i.id !== itemId));
    supabase.from("swipes").delete().eq("item_id", itemId).then(() => {});
  }, []);

  const total = likedItems.reduce((sum, item) => sum + Number(item.price), 0);

  return { likedItems, recordSwipe, clearCart, removeItem, total };
}
