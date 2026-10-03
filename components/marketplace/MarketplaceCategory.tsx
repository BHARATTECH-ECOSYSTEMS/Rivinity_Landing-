"use client";

import React from "react";
import { Sparkles, BrainCircuit, Database, Wrench, Layers } from "lucide-react";

interface MarketplaceCategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CATEGORIES = [
  { id: "All", label: "All Categories", icon: Layers },
  { id: "Agents", label: "AI Agents", icon: Sparkles },
  { id: "ML Models", label: "ML Models", icon: BrainCircuit },
  { id: "Datasets", label: "Datasets", icon: Database },
  { id: "AI Tools", label: "AI Tools", icon: Wrench },
];

export const MarketplaceCategory: React.FC<MarketplaceCategoryProps> = React.memo(({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer shrink-0 active:scale-95 ${
              isActive
                ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-sm shadow-[#FF6B00]/25"
                : "bg-slate-50 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border-slate-200/80 dark:border-zinc-700/60 hover:bg-white dark:hover:bg-zinc-800 shadow-2xs"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400 dark:text-zinc-400"}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
});

MarketplaceCategory.displayName = "MarketplaceCategory";

export default MarketplaceCategory;