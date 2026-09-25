"use client";

import { useEffect, ReactNode } from "react";
import CanvasSidebar from "./CanvasSidebar";
import { PanelLeft } from "lucide-react";
import { useSidebarState } from "./useSidebarState";

interface SidebarShellProps {
  children: ReactNode;
}

const SidebarShell = ({ children }: SidebarShellProps) => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();

  // Track window resize to ensure proper state across screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  return (
    <div className="h-screen w-full flex overflow-hidden relative">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Wrapper: 260px when open, 68px when collapsed */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,transform] md:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width: typeof window !== "undefined" && window.innerWidth >= 768 
            ? (sidebarOpen ? 260 : 68) 
            : 260,
        }}
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
          onClick={() => setSidebarOpen(true)}
          className={`absolute top-3 left-3 z-30 w-8 h-8 rounded-full glass border border-glass shadow-float items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200 cursor-pointer ${
            sidebarOpen ? "hidden" : "flex md:hidden"
          }`}
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default SidebarShell;