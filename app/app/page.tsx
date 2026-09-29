"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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

import SidebarShell from "@/components/canvas/SidebarShell";
import CanvasMain from "@/components/canvas/CanvasMain";
import { USER } from "@/lib/profile";

const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBigDataActive, setIsBigDataActive] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/app") {
      router.replace("/chat");
    }
  }, [router]);

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

  return (
    <SidebarShell>
      {/* Main Content Area */}
      <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        {/* Main Chat/Canvas View */}
        <CanvasMain />
      </div>
    </SidebarShell>
  );
};

export default Index;