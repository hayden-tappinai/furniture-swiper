"use client";

import { Item } from "@/lib/supabase";

const STORE_COLORS: Record<string, { bg: string; text: string }> = {
  ikea: { bg: "bg-blue-500", text: "text-white" },
  amazon: { bg: "bg-orange-500", text: "text-white" },
  costco: { bg: "bg-red-600", text: "text-white" },
};

interface CartItemProps {
  item: Item;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  const storeStyle = STORE_COLORS[item.store] || STORE_COLORS.amazon;

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-3 shadow-sm border border-stone-200">
      {/* Thumbnail */}
      <div className="w-20 h-20 rounded-xl bg-stone-100 flex items-center justify-center overflow-hidden shrink-0">
        {item.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <span className="text-2xl">🪑</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-stone-800 truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-stone-900">
            ${Number(item.price).toFixed(2)}
          </span>
          <span
            className={`${storeStyle.bg} ${storeStyle.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}
          >
            {item.store}
          </span>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-700 hover:text-amber-800 underline underline-offset-2 mt-1 inline-block"
        >
          Buy now →
        </a>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-stone-400 hover:text-red-500 transition-colors p-1 shrink-0"
        aria-label="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
