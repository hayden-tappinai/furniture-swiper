"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Item } from "@/lib/supabase";

const STORE_COLORS: Record<string, { bg: string; text: string }> = {
  ikea: { bg: "bg-blue-500", text: "text-white" },
  amazon: { bg: "bg-orange-500", text: "text-white" },
  costco: { bg: "bg-red-600", text: "text-white" },
};

const SWIPE_THRESHOLD = 100;

interface SwipeCardProps {
  item: Item;
  onSwipe: (liked: boolean) => void;
  isTop: boolean;
}

export default function SwipeCard({ item, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const passOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe(true);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe(false);
    }
  }

  const storeStyle = STORE_COLORS[item.store] || STORE_COLORS.amazon;

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      exit={{
        x: 300,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative h-full rounded-3xl bg-white shadow-lg overflow-hidden border border-stone-200">
        {/* Product image */}
        <div className="relative h-[60%] bg-stone-100 flex items-center justify-center overflow-hidden">
          {item.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-contain p-4"
              draggable={false}
            />
          ) : (
            <div className="text-stone-400 text-6xl">🪑</div>
          )}

          {/* LIKE overlay */}
          <motion.div
            className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-6xl font-bold text-green-600 border-4 border-green-600 rounded-xl px-4 py-2 -rotate-12">
              LIKE
            </span>
          </motion.div>

          {/* PASS overlay */}
          <motion.div
            className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
            style={{ opacity: passOpacity }}
          >
            <span className="text-6xl font-bold text-red-600 border-4 border-red-600 rounded-xl px-4 py-2 rotate-12">
              PASS
            </span>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-stone-800 leading-tight flex-1">
              {item.name}
            </h2>
            <span
              className={`${storeStyle.bg} ${storeStyle.text} text-xs font-bold px-2.5 py-1 rounded-full uppercase shrink-0`}
            >
              {item.store}
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900">
            ${Number(item.price).toFixed(2)}
          </p>
          {item.category && (
            <span className="text-xs text-stone-500 uppercase tracking-wider">
              {item.category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
