"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  PanelLeft,
  X,
  Moon,
  ChevronDown,
  Search,
  Bell,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasMain from "@/components/canvas/CanvasMain";
import { useSidebarState } from "@/components/canvas/useSidebarState";
import { USER } from "@/lib/profile";

const Index = () => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBigDataActive, setIsBigDataActive] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    const handleChatEvent = (e: Event) => {
      const ce = e as CustomEvent<{
        isStarted?: boolean;
        isSplit?: boolean;
      }>;
      if (typeof ce.detail?.isSplit === "boolean") {
        setIsBigDataActive(ce.detail.isSplit);
      }
      if (typeof ce.detail?.isStarted === "boolean") {
        setIsChatActive(ce.detail.isStarted);
      }
    };

    const checkStatus = () => {
      const isDashboardPresent =
        document.querySelector("[data-split-view='true']") !== null ||
        document.body.innerText.includes("D&I Department Feasibility Analysis");

      setIsBigDataActive(Boolean(isDashboardPresent));

      const hasChatMessages =
        document.querySelector(".break-words") !== null ||
        document.querySelector("[title='Regenerate']") !== null;

      setIsChatActive(Boolean(hasChatMessages));
    };

    window.addEventListener("chat-state-change", handleChatEvent);

    const observer = new MutationObserver(checkStatus);
    observer.observe(document.body, { childList: true, subtree: true });

    checkStatus();

    return () => {
      window.removeEventListener("chat-state-change", handleChatEvent);
      observer.disconnect();
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Rivinity AI Chat",
          text: "Check out this conversation on Rivinity AI",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Chat link copied to clipboard!");
    }
  };

  const sidebarWidth = sidebarOpen ? 260 : 68;



  return (
    <div className="h-screen h-[100dvh] w-full overflow-hidden bg-white dark:bg-zinc-950">
      <div className="relative flex h-full w-full overflow-hidden">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sidebar wrapper */}
        <div
          className={`fixed inset-y-0 left-0 z-50 h-full shrink-0 transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,transform] md:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
          style={{ width: `${sidebarWidth}px` }}
        >
          <CanvasSidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen((value) => !value)}
            onCollapse={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content Area */}
        <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden">
          {/* Mobile sidebar toggle button (Image 2 header removed) */}
          <div className="absolute top-3 left-3 z-30 md:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen((value) => !value)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900"
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
            </button>
          </div>

          {/* Main Chat/Canvas View */}
          <CanvasMain 
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            isSidebarOpen={sidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;