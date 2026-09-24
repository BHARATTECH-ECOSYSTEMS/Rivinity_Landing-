"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Mic,
  Sparkles,
  ChevronDown,
  Plus,
  X,
  Layout,
  Smartphone,
  Globe,
  Palette,
  Code2,
  Layers,
  Rocket,
  Component,
  Monitor,
  Search,
  Bell,
  Moon,
} from "lucide-react";
import BuilderWorkbench from "./BuilderWorkbench";
import { USER } from "@/lib/profile";

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
  { icon: Layers, label: "SaaS" },
];

const suggestions = [
  { icon: Code2, label: "Write code", prompt: "Write clean React code for " },
  { icon: Layout, label: "Build UI", prompt: "Build modern UI components for " },
  { icon: Globe, label: "Deploy", prompt: "Deploy application with " },
  { icon: Palette, label: "Design", prompt: "Design modern layout for " },
  { icon: Rocket, label: "Launch", prompt: "Launch product with " },
];

const deriveProjectName = (prompt: string) => {
  const cleaned = prompt
    .replace(/^(build|create|make|design|generate|launch)\s+(me\s+)?(a|an|the)?\s*/i, "")
    .trim();
  const words = cleaned.split(/\s+/).slice(0, 4).join(" ");
  if (!words) return "New Project";
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const AppBuilderMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [projectName, setProjectName] = useState("New Project");
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");

  const addTab = () => {
    const availableIndex = tabs.length - defaultTabs.length;
    if (availableIndex >= tabTemplates.length) {
      return;
    }
    const template = tabTemplates[availableIndex];
    const newTab: Tab = { id: Date.now(), icon: template.icon, label: template.label };
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

  const pushMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: text }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          content:
            "I'll help you build that. Generating responsive UI components and architecture now...",
        },
      ]);
    }, 700);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (!workbenchOpen) {
      setProjectName(deriveProjectName(input));
      setWorkbenchOpen(true);
    }
    pushMessage(input);
    setInput("");
  };

  if (workbenchOpen) {
    return (
      <div className="w-full h-full flex-1 flex min-h-0 min-w-0 overflow-hidden">
        <BuilderWorkbench
          projectName={projectName}
          messages={messages}
          onSendMessage={pushMessage}
          onExit={() => {
            setWorkbenchOpen(false);
            setMessages([]);
          }}
        />
      </div>
    );
  }

  const isEmpty = messages.length === 0;

  const profilePill = (
    <div className="flex h-[40px] sm:h-[46px] shrink-0 cursor-pointer items-center gap-2 sm:gap-3 rounded-full border border-gray-200/80 bg-white pl-1.5 pr-2.5 sm:pr-4 shadow-xs transition-colors hover:bg-gray-50/85 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800">
      <div className="flex h-7 w-7 sm:h-9 sm:w-9 min-w-[28px] sm:min-w-[36px] min-h-[28px] sm:min-h-[36px] shrink-0 items-center justify-center rounded-full bg-[#FF5500] text-[11px] sm:text-[13px] font-bold text-white shadow-xs">
        {USER.initials}
      </div>

      <div className="text-left leading-none block">
        <p className="text-[14.5px] font-semibold text-[#1C1C1C] dark:text-white truncate max-w-[110px] xl:max-w-none">
          {USER.name}
        </p>

        <p className="text-[12px] font-normal text-gray-500 dark:text-gray-400 mt-1">
          {USER.plan || "Pro Workspace"}
        </p>
      </div>

      <ChevronDown
        className="hidden h-4.5 w-4.5 shrink-0 text-gray-500 dark:text-zinc-400 md:block ml-0.5"
        strokeWidth={2}
      />
    </div>
  );

  const InputArea = () => (
    <div className="w-full max-w-[760px] relative z-20 flex flex-col gap-2">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl sm:rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.28)] hover:border-[#FF5500]/50 transition-all duration-300 overflow-hidden">
        {/* Browser Tabs Row */}
        <div className="flex items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 px-2 pt-2 sm:px-3 sm:pt-2.5">
          <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] sm:text-[13px] font-medium transition-all duration-150 rounded-xl min-w-0 flex-1 justify-center cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-zinc-800 text-[#FF5500] border border-[#FF5500]/40 shadow-xs font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <tab.icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? "text-[#FF5500]" : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  />
                  <span className="truncate">{tab.label}</span>
                  {tabs.length > 1 && (
                    <X
                      className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                      onClick={(e) => closeTab(tab.id, e)}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={addTab}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-lg transition-all shrink-0 ml-1 mb-1 cursor-pointer"
            title="New Tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Text Area */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask anything or describe what you want to build..."
          rows={2}
          className="w-full bg-transparent text-[14.5px] sm:text-[15.5px] text-[#1C1C1C] dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none px-4 sm:px-6 pt-3.5 pb-2 resize-none leading-relaxed font-normal"
        />

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between px-3 sm:px-5 pb-2.5 sm:pb-3.5 pt-1 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              className="p-2 rounded-xl text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-xl text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Voice prompt"
            >
              <Mic className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Model Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100/90 dark:bg-zinc-800 hover:bg-[#FF5500]/10 hover:text-[#FF5500] transition-all ml-1 border border-zinc-200/70 dark:border-zinc-700 cursor-pointer">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF5500] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-2 h-2" />
              </span>
              <span className="font-semibold">Rivinity Builder</span>
              <span className="text-[9.5px] text-zinc-400">v1.8</span>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
              input.trim()
                ? "bg-[#FF5500] hover:bg-[#E64D00] text-white shadow-[0_2px_10px_rgba(255,85,0,0.30)] hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex-1 flex flex-col min-w-0 min-h-0 bg-[#FAF9F7]/40 dark:bg-zinc-950 overflow-hidden h-full">
      {/* 🌟 Background Mandala Watermark - Exactly like AI Chat (Free from clipping & centered behind text) */}
      {isEmpty && (
        <div 
          className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center"
          style={{ top: "calc(44% - 15px)" }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "520px",
              height: "520px",
              background:
                "radial-gradient(circle, rgba(255, 85, 0, 0.055) 0%, rgba(255, 120, 40, 0.02) 42%, transparent 70%)",
            }}
          />

          <img
            src="/watermark.png"
            alt=""
            draggable={false}
            className="w-[460px] sm:w-[540px] md:w-[600px] lg:w-[640px] max-w-[92vw] h-auto object-contain opacity-[0.042] dark:opacity-[0.035] pointer-events-none select-none"
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center z-10 overflow-y-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-between w-full max-w-[1050px] mx-auto pt-6 pb-8 sm:pb-10 h-full min-h-[580px] relative z-10">
            
            {/* Centered Heading Section */}
            <div className="flex flex-col items-center justify-center text-center w-full my-auto select-none pt-4">
              <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-4">
                <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.16em] sm:tracking-[0.24em] text-gray-400 dark:text-zinc-500 uppercase mb-2.5 sm:mb-3.5 text-center w-full flex items-center justify-center gap-1.5 sm:gap-2">
                  <span>THINK • RESEARCH • BUILD</span>
                </p>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-2 sm:mb-2.5 text-center w-full">
                  <span>What can I help you</span>{" "}
                  <span className="text-[#FF5500]">build today?</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-normal tracking-normal text-center w-full">
                  Prompt, generate components, and deploy in minutes
                </p>
              </div>
            </div>

            {/* Bottom Composer & Suggestions */}
            <div className="w-full flex flex-col items-center gap-3.5 mt-auto relative z-20">
              {InputArea()}

              <div className="flex gap-2 flex-wrap justify-center max-w-[740px] pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setInput(s.prompt)}
                    className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-[#FF5500]/60 hover:bg-[#FF5500]/5 dark:hover:bg-[#FF5500]/10 transition-all text-[12px] text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium shadow-2xs cursor-pointer"
                  >
                    <s.icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FF5500] transition-colors" />
                    {s.label}
                  </button>
                ))}
              </div>

              <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-1">
                Rivinity can make mistakes. Review generated code before deploying.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-[760px] mx-auto py-8 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 text-[13.5px] leading-relaxed shadow-xs ${
                    msg.role === "user"
                      ? "rounded-2xl rounded-br-none bg-[#FF5500] text-white"
                      : "rounded-2xl rounded-bl-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="px-6 pb-4 pt-2 flex justify-center z-10 bg-transparent">
          {InputArea()}
        </div>
      )}
    </div>
  );
};

export default AppBuilderMain;
