"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
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
  Check,
} from "lucide-react";
import LogoSlide from "../components/logoslide"
import HeroWorkflow from "./ui/HeroWorkflow";

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

// Animation variants (same pattern as Hero16)
const shellVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.4, duration: 1.5 },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.4, duration: 1.8 },
  },
};

const sliderVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.2, duration: 2.0 },
  },
};

// Slow, ambient fade-in for the background blobs — subtle, never distracting
const blobVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2.5, ease: "easeOut" },
  },
};

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
    <motion.div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.38 }}
      variants={shellVariants}
      // style={{
      //   background: "linear-gradient(180deg, #E9BCD4 0%, #FFFFFF 100%)",
      // }}
    >
      {/* Ethereal blurred gradient background, mesh-blob style */}
      <motion.div
        variants={blobVariants}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* soft accent-purple glow, top-left (light tint of #7C3AED) */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full opacity-60 blur-[110px]"
          style={{ background: "radial-gradient(circle, #C9A8F5 0%, transparent 70%)" }}
        />
        {/* soft accent-pink glow, top-center (light tint of #EC4899) */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/3 w-[80%] h-[75%] rounded-full opacity-60 blur-[130px]"
          style={{ background: "radial-gradient(circle, #F5A8CB 0%, transparent 22%)" }}
        />
        {/* soft accent-orange glow, top-right (light tint of #F97316) */}
        <div
          className="absolute top-[10%] right-[-10%] w-[55%] h-[55%] rounded-full opacity-100 blur-[120px]"
          style={{ background: "radial-gradient(circle, #FAC28E 0%, transparent 70%)" }}
        />
        {/* subtle top haze so it doesn't look flat */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 60%)" }}
        />
      </motion.div>
      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center text-center mt-60">
        <motion.h1
          variants={headingVariants}
          className="text-[clamp(32px,8vw,66px)] font-semibold leading-[0.95] sm:leading-[0.9] md:leading-[0.85] tracking-[-0.02em] sm:tracking-[-0.03em] md:tracking-[-0.04em] text-[#2D2E33]"
        >
          What will you build?
        </motion.h1>
        <motion.p
          variants={headingVariants}
          className="mt-1 text-[clamp(14px,2.2vw,18px)] font-normal text-[#2D2E33]"
        >
          Turn ideas into apps in minutes no coding needed
        </motion.p>
      </div>

      <div className="relative z-10 w-full max-w-350 flex flex-col items-center mt-[clamp(28px,6vw,52px)]">
        {/* Input box */}
        {/* <motion.div
          variants={contentVariants}
          className="w-full bg-[#F5F4F1] border border-[#FF8A29] rounded-[28px] p-4 flex flex-col gap-5"
        >
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
        </motion.div> */}
        <div className="relative mx-auto w-full">
          {/* Almost invisible radial light behind the product window (max 4%) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 55%, rgba(253,136,31,0.04), rgba(191,167,248,0.03) 45%, transparent 70%)",
            }}
          />
          <HeroWorkflow />
          <p className="mt-4 text-center text-[12px] text-foreground/50 flex items-center justify-center gap-1.5 animate-fade-up">
            <Check className="w-3 h-3 text-emerald-500" />
            Real output, not a mockup.
          </p>
        </div>

        {/* Section with horizontal divider line, pill straddling it */}
        {/* <div className="w-full max-w-xl mt-[clamp(36px,7vw,60px)] relative">
          <motion.div
            variants={sliderVariants}
            className="absolute left-1/2 -translate-x-1/2 -top-5 rounded-4xl px-4 sm:px-6 py-3 w-[92vw] sm:w-auto max-w-130 flex justify-center"
          >
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
                  <div className="w-12 h-12 border border-[#DEDCD3] rounded-2xl flex items-center justify-center text-[#3C3C43] hover:bg-[#ffffff] transition">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs text-[#3C3C43] whitespace-nowrap">
                    {label}
                  </span>
                </button>
              ))}
            </InfiniteSlider>
          </motion.div>
          <div className="h-50" />
        </div> */}
      </div>
    </motion.div>
  );
}