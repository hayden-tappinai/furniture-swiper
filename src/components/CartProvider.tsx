"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { supabase, Item } from "@/lib/supabase";

interface CartContextValue {
  likedItems: Item[];
  recordSwipe: (item: Item, liked: boolean) => Promise<void>;
  clearCart: () => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [likedItems, setLikedItems] = useState<Item[]>([]);

  const recordSwipe = useCallback(async (item: Item, liked: boolean) => {
    if (liked) {
      setLikedItems((prev) => [...prev, item]);
    }
    supabase
      .from("swipes")
      .insert({ item_id: item.id, liked })
      .then(() => {});
  }, []);

  const clearCart = useCallback(async () => {
    setLikedItems((prev) => {
      const ids = prev.map((i) => i.id);
      if (ids.length > 0) {
        supabase.from("swipes").delete().in("item_id", ids).then(() => {});
      }
      return [];
    });
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    setLikedItems((prev) => prev.filter((i) => i.id !== itemId));
    supabase.from("swipes").delete().eq("item_id", itemId).then(() => {});
  }, []);

  const total = likedItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <CartContext.Provider
      value={{ likedItems, recordSwipe, clearCart, removeItem, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
