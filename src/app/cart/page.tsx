"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "@/components/CartItem";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { likedItems, clearCart, removeItem, total } = useCart();

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-4">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
        >
          ← Back to Swipe
        </Link>
        <h1 className="text-xl font-bold text-stone-800">Your Cart</h1>
        <div className="w-20" />
      </header>

      {/* Cart items */}
      <div className="flex-1 pb-4">
        {likedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <span className="text-5xl">🛒</span>
            <p className="text-stone-500">Your cart is empty.</p>
            <Link
              href="/"
              className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors"
            >
              Start Swiping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {likedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <CartItem item={item} onRemove={removeItem} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer with total */}
      {likedItems.length > 0 && (
        <div className="sticky bottom-0 bg-[#faf8f5] border-t border-stone-200 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-stone-600 font-medium">
              {likedItems.length} item{likedItems.length !== 1 ? "s" : ""}
            </span>
            <span className="text-2xl font-bold text-stone-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={clearCart}
            className="w-full py-3 rounded-full border border-stone-300 text-stone-600 font-medium hover:bg-stone-100 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
