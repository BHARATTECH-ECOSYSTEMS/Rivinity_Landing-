"use client";

import { useState, useCallback, useEffect } from "react";
import { InfiniteSlider } from './ui/infinite-slider';
import {
  Plus,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  AppWindow,
  Smartphone,
  MousePointerSquareDashed,
  Layers,
  PlaySquare,
  BarChart3,
  Gamepad2,
  FileText,
  Table,
} from "lucide-react";

const CATEGORIES = [
  { label: "Website", icon: AppWindow },
  { label: "Mobile", icon: Smartphone },
  { label: "Design", icon: MousePointerSquareDashed },
  { label: "Slides", icon: Layers },
  { label: "Animation", icon: PlaySquare },
  { label: "Data Visualization", icon: BarChart3 },
  { label: "3D Game", icon: Gamepad2 },
  { label: "Document", icon: FileText },
  { label: "Spreadsheet", icon: Table },
];

const EXAMPLE_PROMPTS = [
  "Make a promo video for…",
  "Beginner running tracker",
  "Quarterly review presentation",
  "Freelance client portal",
];

// Classic typewriter effect: types a word, pauses, deletes it, moves to the next
function useTypewriter(
  words: string[],
  { typingSpeed = 45, deletingSpeed = 25, pauseTime = 1400 } = {},
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const current = words[wordIndex];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseTime);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseTime);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed,
        );
        return () => clearTimeout(t);
      }
      setWordIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

export default function WhatWillYouBuild() {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const typedPlaceholder = useTypewriter(EXAMPLE_PROMPTS);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#FAFAFA] px-4 sm:px-6">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mt-[clamp(48px,14vw,180px)]">
        <h1 className="text-[clamp(32px,8vw,66px)] font-semibold leading-[0.95] sm:leading-[0.9] md:leading-[0.85] tracking-[-0.02em] sm:tracking-[-0.03em] md:tracking-[-0.04em] text-[#2D2E33]">
          What will you build?
        </h1>

        <p className="mt-1 text-[clamp(14px,2.2vw,18px)] font-normal text-[#2D2E33]">
          Turn ideas into apps in minutes — no coding needed
        </p>
      </div>

      <div className="w-full max-w-150 flex flex-col items-center mt-[clamp(28px,6vw,52px)]">
        {/* Input box */}
        <div className="w-full bg-[#F5F4F1] border border-[#FF8A29] rounded-[28px] p-4 flex flex-col gap-5">
          <div className="relative min-h-6 flex items-center">
            {!prompt && (
              <div className="pointer-events-none absolute inset-0 flex items-center">
                <span className="text-[15px] text-[#6B6D74]">
                  {typedPlaceholder}
                  <span className="inline-block w-px h-[1.1em] align-middle bg-[#F0693D] ml-0.5 animate-pulse" />
                </span>
              </div>
            )}
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={1}
              className="w-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none resize-none font-sans text-[15px] text-[#3C3C43] placeholder-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Add attachment"
              className="flex items-center bg-transparent justify-center text-[#3C3C43] hover:bg-black/5 rounded-full w-8 h-8 transition shrink-0"
            >
              <Plus size={20} />
            </button>
            <button
              type="button"
              aria-label="Submit"
              disabled={!prompt.trim()}
              className="w-10 h-10 rounded-full bg-[#F0693D] flex items-center justify-center text-white hover:bg-[#e05a2e] transition disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Section with horizontal divider line, pill straddling it */}
        <div className="w-full max-w-xl mt-[clamp(36px,7vw,60px)] relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-5 bg-[#FAFAFA] rounded-4xl px-4 sm:px-6 py-3 w-[92vw] sm:w-auto max-w-130 flex justify-center">
            <InfiniteSlider
              gap={24}
              duration={30}
              className="w-full sm:w-[min(500px,80vw)] mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            >
              {CATEGORIES.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex flex-col items-center gap-3 shrink-0 bg-transparent w-20 py-2"
                >
                  <div className="w-12 h-12 border border-[#DEDCD3] rounded-2xl flex items-center justify-center text-[#3C3C43] hover:bg-[#e6e3db] transition">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs text-[#3C3C43] whitespace-nowrap">
                    {label}
                  </span>
                </button>
              ))}
            </InfiniteSlider>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}