"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";

export interface RecentItem {
  label: string;
  time: string;
  icon: LucideIcon;
}

interface RecentListProps {
  items: RecentItem[];
  dense?: boolean;
  onSelect?: (item: RecentItem) => void;
}

const RecentList = ({ items, dense = false, onSelect }: RecentListProps) => {
  return (
    <div className="space-y-1.5">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            onClick={() => onSelect?.(item)}
            className={`group flex items-center justify-between rounded-xl border border-gray-200/60 dark:border-white/5 bg-white/70 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 transition-all cursor-pointer ${
              dense ? "px-2.5 py-1.5" : "px-3 py-2"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF5500] shrink-0 transition-colors" />
              <span className="text-[11.5px] text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">
                {item.label}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-zinc-500 shrink-0 ml-2">
              {item.time}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RecentList;
