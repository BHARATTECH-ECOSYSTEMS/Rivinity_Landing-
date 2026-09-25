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
import SidebarShell from "@/components/canvas/SidebarShell";
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
    <SidebarShell>
      {/* Main Content Area */}
      <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        {/* Mobile sidebar toggle button */}
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
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={sidebarOpen}
        />
      </div>
    </SidebarShell>
  );
};

export default Index;