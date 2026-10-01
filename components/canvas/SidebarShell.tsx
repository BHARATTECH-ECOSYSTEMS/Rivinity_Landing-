"use client";

import { useState, useEffect, ReactNode } from "react";
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
    const timer = setTimeout(() => {
      document.documentElement.removeAttribute("data-sidebar-closed");
      setTransitionsReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex overflow-hidden relative">
      {/* Mobile Backdrop Overlay */}
      {transitionsReady && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Wrapper: 260px when open, 68px when collapsed */}
      <div
        data-sidebar-wrapper="true"
        className={`fixed md:static inset-y-0 left-0 z-50 will-change-[width,transform] md:shrink-0 ${
          transitionsReady
            ? "transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "transition-none"
        } ${
          sidebarOpen ? "w-[260px] translate-x-0" : "w-[260px] md:w-[68px] -translate-x-full md:translate-x-0"
        }`}
      >
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
          onCollapse={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full h-full relative overflow-hidden">
        {/* Toggle open button on mobile only when collapsed */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setSidebarOpen(true);
          }}
          className={`absolute top-3 left-3 z-[60] h-11 w-11 rounded-full glass border border-glass shadow-float items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-colors duration-200 cursor-pointer ${
            transitionsReady && !sidebarOpen ? "flex md:hidden" : "hidden"
          }`}
          aria-label="Open sidebar"
          aria-expanded={sidebarOpen}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default SidebarShell;