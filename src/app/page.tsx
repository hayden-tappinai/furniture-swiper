"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import SwipeCard from "@/components/SwipeCard";
import { useItems } from "@/hooks/useItems";
import { useCart } from "@/components/CartProvider";

export default function Home() {
  const { items, loading } = useItems();
  const { likedItems, recordSwipe } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(
    (liked: boolean) => {
      const item = items[currentIndex];
      if (!item) return;
      recordSwipe(item, liked);
      setCurrentIndex((prev) => prev + 1);
    },
    [items, currentIndex, recordSwipe]
  );

  const done = currentIndex >= items.length && items.length > 0;
  const currentItem = items[currentIndex];
  const nextItem = items[currentIndex + 1];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-4">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <h1 className="text-xl font-bold text-stone-800">
          🪑 Furniture Swiper
        </h1>
        <Link
          href="/cart"
          className="relative flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
        >
          Cart
          {likedItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {likedItems.length}
            </span>
          )}
        </Link>
      </header>

      {/* Progress */}
      <div className="text-center text-sm text-stone-500 mb-3">
        {done
          ? "All done!"
          : `${currentIndex + 1} of ${items.length} items`}
      </div>

      {/* Card stack */}
      <div className="relative flex-1 min-h-[500px] mb-4">
        <AnimatePresence>
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              <span className="text-6xl">✨</span>
              <h2 className="text-2xl font-bold text-stone-800">
                All swiped!
              </h2>
              <p className="text-stone-500 text-center">
                You liked {likedItems.length} item{likedItems.length !== 1 ? "s" : ""}.
                <br />
                Check your cart to review.
              </p>
              <Link
                href="/cart"
                className="mt-2 bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors"
              >
                View Cart ({likedItems.length})
              </Link>
            </motion.div>
          ) : (
            <>
              {nextItem && (
                <SwipeCard
                  key={nextItem.id}
                  item={nextItem}
                  onSwipe={() => {}}
                  isTop={false}
                />
              )}
              {currentItem && (
                <SwipeCard
                  key={currentItem.id}
                  item={currentItem}
                  onSwipe={handleSwipe}
                  isTop={true}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      {!done && (
        <div className="flex items-center justify-center gap-6 pb-6">
          <button
            onClick={() => handleSwipe(false)}
            className="w-16 h-16 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-2xl text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors active:scale-95"
            aria-label="Pass"
          >
            ✗
          </button>
          <button
            onClick={() => handleSwipe(true)}
            className="w-16 h-16 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-2xl text-green-500 hover:bg-green-50 hover:border-green-200 transition-colors active:scale-95"
            aria-label="Like"
          >
            ✓
          </button>
        </div>
      )}
    </div>
  );
}
