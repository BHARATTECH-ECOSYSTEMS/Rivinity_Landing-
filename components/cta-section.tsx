"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaPlus,
  FaPaperclip,
  FaPalette,
  FaShapes,
  FaChevronDown,
  FaPaperPlane,
  FaGlobe,
  FaMobileScreen,
  FaLaptopCode,
  FaArrowRight,
} from "react-icons/fa6";

export default function Cta() {
  const [activeTab, setActiveTab] = useState("App Generator");

  // Typing animation state
  const prompts = [
    "Build a pricing page for a coffee subscription SaaS.",
    "Create a personal portfolio with dark mode.",
    "Build a modern startup site with pricing.",
    "Launch a high-converting landing page.",
    "Start a sleek company blog using Next.js.",
  ];

  const [prompt, setPrompt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // Automatic Typing Effect Loop
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % prompts.length;
      const fullText = prompts[i];

      setPrompt(
        isDeleting
          ? fullText.substring(0, prompt.length - 1)
          : fullText.substring(0, prompt.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 60);

      if (!isDeleting && prompt === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && prompt === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(200);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [prompt, isDeleting, loopNum, typingSpeed]);

  const tabs = [
    { id: "App Generator", label: "App Generator", icon: <FaLaptopCode /> },
    { id: "UI Builder", label: "UI Builder", icon: <FaMobileScreen /> },
    { id: "Website Creator", label: "Website Creator", icon: <FaGlobe /> },
  ];

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div
        className="relative mx-auto flex min-h-[460px] sm:min-h-[520px] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-3xl sm:rounded-4xl border border-white/40 p-5 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(124,58,237,0.15)]"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.35) 0%, transparent 45%), " +
            "radial-gradient(circle at 100% 50%, rgba(236, 72, 153, 0.35) 0%, transparent 45%), " +
            "radial-gradient(circle at 50% 100%, rgba(249, 115, 22, 0.30) 0%, transparent 50%), " +
            "linear-gradient(135deg, #fdfbfd 0%, #fbf5f8 50%, #fff7f5 100%)",
        }}
      >
        {/* Dotted texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#7C3AED 0.7px, transparent 0.7px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Ambient background blur spheres using brand colors */}
        <div className="pointer-events-none absolute -left-32 top-16 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#7C3AED]/25 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#EC4899]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-[#F97316]/25 blur-3xl" />

        {/* Main Content Area */}
        <div className="relative z-10 flex w-full flex-col items-center text-center gap-4 sm:gap-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#16181A]">
            Your next idea starts here
          </h2>

          {/* Subtitle */}
          <p className="max-w-lg text-xs sm:text-sm md:text-base text-[#16181A]/65 leading-relaxed">
            Turn your concepts into functional apps and websites in seconds.
          </p>

          {/* Chat / Builder Card Box */}
          <div className="mt-4 sm:mt-6 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/90 bg-white/70 shadow-[0_12px_40px_rgba(124,58,237,0.08)] backdrop-blur-xl text-left">
            {/* Top Navigation Tabs (Scrollable on small devices) */}
            <div className="flex items-center border-b border-[#16181A]/8 bg-white/40 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    className={`flex flex-1 min-w-[110px] items-center justify-center gap-1.5 sm:gap-2 border-r border-[#16181A]/8 py-2.5 sm:py-3 px-2 sm:px-3 text-[11px] sm:text-[13px] font-medium transition-colors shrink-0 ${
                      isActive
                        ? "bg-white/90 text-[#16181A] shadow-xs"
                        : "text-[#16181A]/55 hover:bg-white/40 hover:text-[#16181A]"
                    }`}
                  >
                    <span className={isActive ? "text-[#7C3AED]" : "text-[#16181A]/40"}>
                      {tab.icon}
                    </span>
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}

              {/* Add tab button */}
              <button
                type="button"
                aria-label="Add tab"
                className="flex size-9 sm:size-11 shrink-0 items-center justify-center text-[#16181A]/40 transition-colors hover:bg-white/50 hover:text-[#16181A]"
              >
                <FaPlus className="size-3 sm:size-3.5" />
              </button>
            </div>

            {/* Prompt Input Area */}
            <div className="p-3 sm:p-4">
              <div className="relative w-full flex flex-col justify-between min-h-[100px] sm:min-h-[110px]">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to build..."
                  rows={3}
                  className="w-full resize-none border-none bg-transparent text-[13px] sm:text-[15px] font-normal text-[#16181A] outline-none placeholder:text-[#16181A]/40"
                />

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  {/* Left Tool Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      aria-label="Attach file"
                      className="flex size-7 sm:size-8 items-center justify-center rounded-lg border border-white/80 bg-[#16181A]/5 text-[#16181A]/60 transition-colors hover:bg-[#16181A]/10 hover:text-[#16181A]"
                    >
                      <FaPaperclip className="size-3 sm:size-3.5" />
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-7 sm:h-8 items-center gap-1.5 rounded-lg border border-white/80 bg-[#16181A]/5 px-2.5 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#16181A]/70 transition-colors hover:bg-[#16181A]/10 hover:text-[#16181A]"
                    >
                      <FaPalette className="size-2.5 sm:size-3 text-[#EC4899]" />
                      Theme
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-7 sm:h-8 items-center gap-1.5 rounded-lg border border-white/80 bg-[#16181A]/5 px-2.5 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#16181A]/70 transition-colors hover:bg-[#16181A]/10 hover:text-[#16181A]"
                    >
                      <FaShapes className="size-2.5 sm:size-3 text-[#7C3AED]" />
                      Components
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-7 sm:h-8 items-center gap-1.5 rounded-lg border border-white/80 bg-[#16181A]/5 px-2.5 sm:px-3 text-[11px] sm:text-[12px] font-medium text-[#16181A]/70 transition-colors hover:bg-[#16181A]/10 hover:text-[#16181A]"
                    >
                      Stack
                      <FaChevronDown className="size-2 sm:size-2.5 text-[#16181A]/40" />
                    </button>
                  </div>

                  {/* Right Send Button */}
                  <button
                    type="button"
                    aria-label="Generate"
                    className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-black text-white shadow-md transition-transform duration-200 hover:scale-105 shrink-0 ml-auto"
                  >
                    <FaPaperPlane className="size-3 sm:size-3.5 translate-x-[-0.5px] translate-y-[0.5px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Primary Action */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3 text-white">
            <Link
              href="/app"
              className="inline-flex h-9 sm:h-10 items-center justify-center gap-2 sm:gap-2.5 rounded-full bg-black px-5 sm:px-6 text-[12px] sm:text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span>Open Rivinity</span>
              <FaArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}