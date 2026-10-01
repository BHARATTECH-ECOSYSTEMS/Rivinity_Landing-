"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight,
  Paperclip,
  Mic,
  Sparkles,
  ChevronDown,
  Plus,
  X,
  Pencil,
  Layout,
  Smartphone,
  Globe,
  Component,
  Monitor,
  Layers,
} from "lucide-react";
import BuilderWorkbench from "./BuilderWorkbench";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface Tab {
  id: number;
  icon: typeof Layout;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: Layout, label: "App Generator" },
  { id: 2, icon: Smartphone, label: "UI Builder" },
  { id: 3, icon: Globe, label: "Website Creator" },
];

const tabTemplates = [
  { icon: Layout, label: "Dashboard" },
  { icon: Component, label: "Component" },
  { icon: Monitor, label: "Portfolio" },
  { icon: Layers, label: "SaaS Platform" },
];

const STARS = [
  { top: "12%", left: "18%", size: 2, delay: "0s", duration: "3s" },
  { top: "16%", left: "78%", size: 2.5, delay: "0.8s", duration: "2.4s" },
  { top: "26%", left: "12%", size: 1.5, delay: "1.5s", duration: "3.2s" },
  { top: "22%", left: "32%", size: 2, delay: "0.3s", duration: "2.8s" },
  { top: "32%", left: "86%", size: 3, delay: "1.1s", duration: "3.5s" },
  { top: "44%", left: "16%", size: 2, delay: "2.0s", duration: "2.6s" },
  { top: "50%", left: "82%", size: 1.5, delay: "0.5s", duration: "3.1s" },
  { top: "66%", left: "20%", size: 2.5, delay: "1.7s", duration: "2.9s" },
  { top: "70%", left: "76%", size: 2, delay: "0.2s", duration: "3.4s" },
  { top: "80%", left: "32%", size: 1.5, delay: "1.4s", duration: "2.7s" },
  { top: "78%", left: "68%", size: 2, delay: "2.2s", duration: "3.0s" },
  { top: "24%", left: "68%", size: 2, delay: "1.9s", duration: "2.5s" },
];

const deriveProjectName = (prompt: string) => {
  const cleaned = prompt
    .replace(
      /^(build|create|make|design|generate|launch)\s+(me\s+)?(a|an|the)?\s*/i,
      "",
    )
    .trim();
  const words = cleaned.split(/\s+/).slice(0, 4).join(" ");
  if (!words) return "New Project";
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export default function AppBuilderMain() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [projectName, setProjectName] = useState("New Project");
  const [editingTabId, setEditingTabId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const msgIdRef = useRef(0);
  const aiReplyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isNight, setIsNight] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const h = new Date().getHours();
      return h >= 21 || h < 5;
    }
    return false;
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== "undefined") return window.innerWidth >= 1024;
    return true;
  });

  const nextMessageId = () => {
    msgIdRef.current += 1;
    return msgIdRef.current;
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const update = () => {
      const h = new Date().getHours();
      setIsNight(h >= 21 || h < 5);
    };
    update();
    const interval = setInterval(update, 60000);

    const checkDark = () => {
      setIsDarkMode(
        document.documentElement.classList.contains("dark") ||
          document.body.classList.contains("dark"),
      );
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (aiReplyTimeoutRef.current) clearTimeout(aiReplyTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleRenameTab = (tabId: number) => {
    if (editingName.trim()) {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === tabId ? { ...t, label: editingName.trim() } : t,
        ),
      );
    }
    setEditingTabId(null);
  };

  const addTab = () => {
    const availableIndex = tabs.length - defaultTabs.length;
    if (availableIndex >= tabTemplates.length) {
      const newId = Date.now();
      const newTab: Tab = {
        id: newId,
        icon: Layout,
        label: `App ${tabs.length + 1}`,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTab(newId);
      return;
    }
    const template = tabTemplates[availableIndex];
    const newTab: Tab = {
      id: Date.now(),
      icon: template.icon,
      label: template.label,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    if (activeTab === id) {
      const next = tabs[idx + 1] || tabs[idx - 1];
      setActiveTab(next.id);
    }
    setTabs((prev) => prev.filter((t) => t.id !== id));
  };

  const pushMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextMessageId(), role: "user", content: text },
    ]);
    if (aiReplyTimeoutRef.current) clearTimeout(aiReplyTimeoutRef.current);
    aiReplyTimeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "ai",
          content:
            "I'll help you build that. Generating responsive UI components and architecture now...",
        },
      ]);
      aiReplyTimeoutRef.current = null;
    }, 700);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    if (!workbenchOpen) {
      setProjectName(deriveProjectName(input));
      setWorkbenchOpen(true);
    }
    pushMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (workbenchOpen) {
    return (
      <div className="w-full h-full flex-1 flex min-h-0 min-w-0 overflow-hidden">
        <BuilderWorkbench
          projectName={projectName}
          messages={messages}
          onSendMessage={pushMessage}
          onExit={() => {
            if (aiReplyTimeoutRef.current) {
              clearTimeout(aiReplyTimeoutRef.current);
              aiReplyTimeoutRef.current = null;
            }
            setWorkbenchOpen(false);
            setMessages([]);
          }}
        />
      </div>
    );
  }

  const showNightAtmosphere = isDarkMode || isNight;

  return (
    <div className="relative flex-1 flex flex-col min-w-0 min-h-0 bg-white dark:bg-zinc-950 overflow-hidden h-full">
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.3); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)); }
        }
      `}</style>

      {showNightAtmosphere && isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000 opacity-90 dark:opacity-100">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `starTwinkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute pointer-events-none select-none z-0 flex items-center justify-center overflow-visible"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          contain: "layout paint",
        }}
      >
        {showNightAtmosphere && isDarkMode && (
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-300"
            style={{
              width: isDesktop ? "650px" : "390px",
              height: isDesktop ? "650px" : "390px",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255, 85, 0, 0.03) 40%, transparent 70%)",
              transform: "translateZ(0)",
            }}
          />
        )}

        <img
          src="/watermark.png"
          alt=""
          draggable={false}
          decoding="async"
          loading="eager"
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] object-contain pointer-events-none select-none transition-all duration-300 opacity-[0.055] dark:opacity-[0.05]"
          style={{
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        />
      </div>

      <div className="relative flex-1 min-h-full flex flex-col items-center justify-center w-full px-4 sm:px-8 py-6 sm:py-8 my-auto z-10">
        <div className="w-full max-w-[700px] mx-auto flex flex-col items-center justify-center mb-4 sm:mb-6 select-none">
          <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight text-center w-full">
            What can I help you build today?
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[700px] mx-auto flex justify-center">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400/20 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-500/20 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200 overflow-hidden flex flex-col w-full relative">
            <div className="flex items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-1.5 sm:gap-2 px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "group relative flex items-center transition-all duration-150 rounded-full shrink-0 cursor-pointer gap-1.5 px-3 py-1 text-[12.5px] border outline-none select-none",
                      isActive
                        ? "border-[#FF6B00]/40 text-[#FF6B00] bg-orange-50/50 dark:bg-orange-950/30 font-medium"
                        : "border-gray-200/90 dark:border-zinc-700/70 text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/50 hover:bg-orange-50/20 dark:hover:bg-orange-950/20 font-medium bg-white/40 dark:bg-zinc-800/30",
                    )}
                  >
                    <tab.icon
                      className={cn(
                        "shrink-0 transition-colors w-3.5 h-3.5 sm:w-4 sm:h-4",
                        isActive
                          ? "text-[#FF6B00]"
                          : "text-gray-500 dark:text-zinc-400",
                      )}
                      strokeWidth={isActive ? 2.2 : 1.9}
                    />

                    {editingTabId === tab.id ? (
                      <input
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onBlur={() => handleRenameTab(tab.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameTab(tab.id);
                        }}
                        className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[#1C1C1C] dark:text-zinc-100 w-24 sm:w-32 text-[13px] sm:text-[14px]"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <span
                          className="whitespace-nowrap truncate max-w-[110px] sm:max-w-none"
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            setEditingTabId(tab.id);
                            setEditingName(tab.label);
                          }}
                        >
                          {tab.label}
                        </span>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <Pencil
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                            strokeWidth={2}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTabId(tab.id);
                              setEditingName(tab.label);
                            }}
                          />
                          {tabs.length > 1 && (
                            <X
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                              strokeWidth={2}
                              onClick={(e) => closeTab(tab.id, e)}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addTab}
                className="flex items-center justify-center rounded-full transition-colors cursor-pointer shrink-0 border border-gray-200/90 dark:border-zinc-700/70 bg-white/40 dark:bg-zinc-800/30 hover:bg-gray-100 dark:hover:bg-zinc-800 w-6 h-6 text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white hover:border-[#FF6B00]/40"
                title="New Tab"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or describe what you want to build..."
              rows={1}
              className="w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3.5 sm:px-4.5 pt-2 sm:pt-2.5 pb-1 text-[#0f172a] dark:text-zinc-100 placeholder:text-[#94a3b8]"
              style={{ minHeight: "46px", outline: "none" }}
            />

            <div className="flex items-center justify-between w-full px-3 sm:px-4 pb-2 sm:pb-2.5 pt-0.5">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4 shrink-0" strokeWidth={2} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    e.target.value = "";
                  }}
                />

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium text-slate-700 dark:text-zinc-200 bg-slate-100/90 dark:bg-zinc-800 hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] transition-all ml-1 border border-slate-200/80 dark:border-zinc-700 cursor-pointer select-none">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FF6B00] flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-2 h-2" />
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Rivinity Builder
                  </span>
                  <span className="text-[9.5px] text-slate-400 dark:text-zinc-500">
                    v2.0
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                  title="Voice prompt"
                >
                  <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    "w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 border-0 outline-none",
                    input.trim()
                      ? "bg-[#FF6B00] text-white shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                      : "bg-slate-100 dark:bg-zinc-800 text-slate-300 dark:text-zinc-600 cursor-not-allowed",
                  )}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[11.5px] sm:text-[12px] text-gray-400 dark:text-zinc-500 text-center mt-2.5 sm:mt-3 select-none">
          Rivinity AI can make mistakes. Review generated code before deploying.
        </div>
      </div>
    </div>
  );
}
