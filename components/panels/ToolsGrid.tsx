"use client";

import React from "react";
import { type LucideIcon } from "lucide-react";

export interface ToolItem {
  id: string;
  icon: LucideIcon;
  label: string;
  color?: string;
}

interface ToolsGridProps {
  tools: ToolItem[];
  columns?: number;
  dense?: boolean;
  activeId?: string;
  onSelect?: (tool: ToolItem) => void;
}

const ToolsGrid = ({
  tools,
  columns = 3,
  dense = false,
  activeId,
  onSelect,
}: ToolsGridProps) => {
  const colClass = columns === 2 ? "grid-cols-2" : columns === 4 ? "grid-cols-4" : "grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-1.5 sm:gap-2`}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeId === tool.id;

        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelect?.(tool)}
            className={`group flex flex-col items-center justify-center rounded-xl border text-center transition-all cursor-pointer ${
              dense ? "p-2 min-h-[64px]" : "p-3 min-h-[74px]"
            } ${
              isActive
                ? "bg-[#FF5500]/10 border-[#FF5500]/60 text-[#FF5500] shadow-xs font-semibold"
                : "bg-white/80 dark:bg-zinc-900/80 border-gray-200/70 dark:border-white/10 text-gray-700 dark:text-zinc-300 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 shadow-2xs"
            }`}
          >
            <Icon
              className={`w-4 h-4 mb-1.5 transition-transform group-hover:scale-110 ${
                isActive ? "text-[#FF5500]" : "text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white"
              }`}
            />
            <span className="text-[11px] leading-tight truncate w-full px-0.5">
              {tool.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ToolsGrid;
