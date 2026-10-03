"use client";

import { useState, useEffect, ReactNode, useCallback } from "react";
import CanvasSidebar from "./CanvasSidebar";
import { PanelLeft } from "lucide-react";
import { useSidebarState } from "./useSidebarState";

interface SidebarShellProps {
  children: ReactNode;
}

const SidebarShell = ({ children }: SidebarShellProps) => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();
  const [transitionsReady, setTransitionsReady] = useState(false);

  useEffect(() => {
    document.documentElement.removeAttribute("data-sidebar-closed");
    setTransitionsReady(true);
  }, []);

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const handleOpen = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSidebarOpen(true);
  }, [setSidebarOpen]);

  return (
    <div className="h-screen w-full flex overflow-hidden relative">
      {transitionsReady && sidebarOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      <div
        data-sidebar-wrapper="true"
        className={`fixed lg:static inset-y-0 left-0 z-[80] transform-gpu will-change-transform lg:will-change-[width,transform] lg:shrink-0 ${
          sidebarOpen ? "overflow-visible" : "overflow-hidden lg:overflow-visible"
        } ${
          transitionsReady
            ? "transition-transform lg:transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "transition-none"
        } ${
          sidebarOpen
            ? "w-[280px] sm:w-[320px] md:w-[340px] lg:w-[260px] max-w-[85vw] translate-x-0 shadow-2xl lg:shadow-none"
            : "w-[280px] sm:w-[320px] md:w-[340px] lg:w-[68px] max-w-[85vw] -translate-x-full lg:translate-x-0"
        }`}
      >
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
          onCollapse={handleClose}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full h-full relative overflow-hidden">
        <button
          type="button"
          onClick={handleOpen}
          className={`absolute top-3 left-3 z-[60] h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] items-center justify-center text-slate-800 dark:text-zinc-100 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
            transitionsReady && !sidebarOpen ? "flex lg:hidden" : "hidden"
          }`}
          aria-label="Open sidebar"
          aria-expanded={sidebarOpen}
        >
          <PanelLeft className="w-5 h-5" strokeWidth={2.2} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default SidebarShell;