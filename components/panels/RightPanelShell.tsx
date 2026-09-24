"use client";

import React, { ReactNode } from "react";

interface RightPanelShellProps {
  children: ReactNode;
  gap?: number;
  className?: string;
}

const RightPanelShell = ({
  children,
  gap = 4,
  className = "",
}: RightPanelShellProps) => {
  return (
    <aside
      className={`w-[320px] xl:w-[350px] shrink-0 border-l border-zinc-200/80 dark:border-white/10 bg-[#FAF9F7]/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 sm:p-5 flex flex-col h-full overflow-y-auto [scrollbar-width:thin] select-none ${className}`}
      style={{ gap: `${gap * 4}px` }}
    >
      {children}
    </aside>
  );
};

export default RightPanelShell;
