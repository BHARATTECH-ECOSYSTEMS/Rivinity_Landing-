"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  GitBranch,
  Sliders,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Pixel Mosaic Palettes (Matching Bento - Orange, Pink, Purple)      */
/* ------------------------------------------------------------------ */

// Step 01: Light Pastel Orange / Peach Palette (pure white to soft warm apricot)
const ORANGE_PIXEL_PALETTE = [
  "#FFFFFF",
  "#FFFBF7",
  "#FFF6ED",
  "#FFEDE0",
  "#FFE4D0",
  "#FFD7BC",
  "#FFC9A4",
  "#FFBA8B",
  "#FFAA72",
  "#FF9654",
];

// Step 02: Light Pastel Pink / Rose Palette (pure white to soft Tribe Capital rose pink)
const PINK_PIXEL_PALETTE = [
  "#FFFFFF",
  "#FFF5F7",
  "#FFEBF0",
  "#FFDFE7",
  "#FFCFDC",
  "#FFBDCE",
  "#FFA8BF",
  "#FF91AE",
  "#F77A9E",
  "#EF638D",
];

// Step 03: Light Pastel Purple / Lilac Palette (pure white to soft lavender)
const PURPLE_PIXEL_PALETTE = [
  "#FFFFFF",
  "#FCFAFF",
  "#F8F3FF",
  "#F3EBFF",
  "#EDE0FE",
  "#E4D2FD",
  "#D9C1FB",
  "#CBAEF9",
  "#BC98F7",
  "#AC82F4",
];

/* ------------------------------------------------------------------ */
/* Pixel Mosaic Generator Component (Tribe Capital Style - Compact)   */
/* ------------------------------------------------------------------ */
function PixelMosaicVisual({
  palette,
  label,
  isHovered,
  focalX = 0.65,
  focalY = 0.45,
}: {
  palette: string[];
  label: string;
  isHovered: boolean;
  focalX?: number;
  focalY?: number;
}) {
  const cols = 14;
  const rows = 6;

  // Precompute colors for each pixel in the 14x6 grid with wide luminous spread
  const pixels: { col: number; row: number; color: string; delay: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c / (cols - 1);
      const y = r / (rows - 1);

      // Distance from the bright light focal point
      const dx = (x - focalX) * 1.35;
      const dy = (y - focalY) * 1.05;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Subtle wave ripple for organic gradient contour
      const wave = Math.sin(x * Math.PI * 1.6 + y * Math.PI) * 0.1;
      const t = Math.max(0, Math.min(1, dist * 0.85 + wave));

      const paletteIndex = Math.min(
        palette.length - 1,
        Math.floor(t * palette.length)
      );

      pixels.push({
        col: c,
        row: r,
        color: palette[paletteIndex],
        delay: (r * cols + c) * 0.007,
      });
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-white flex items-center justify-center">
      {/* 14x6 CSS Grid of Pixel Blocks */}
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((p) => (
          <motion.div
            key={`${p.row}-${p.col}`}
            className="w-full h-full"
            style={{ backgroundColor: p.color }}
            animate={
              isHovered
                ? {
                    opacity: [1, 0.9, 1],
                    scale: [1, 0.98, 1],
                  }
                : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: 2.2,
              repeat: isHovered ? Infinity : 0,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Tribe Capital Style Brand Typography in Bottom-Left */}
      <div className="absolute bottom-2.5 left-3 z-10 select-none pointer-events-none px-2 py-0.5 rounded-md bg-black/[0.14] backdrop-blur-xs">
        <span className="text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider text-white drop-shadow-xs font-mono leading-none">
          {label}
        </span>
      </div>

      {/* Subtle hover gloss sweep */}
      {isHovered && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Steps Definitions                                                  */
/* ------------------------------------------------------------------ */
interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  palette: string[];
  label: string;
  focalX: number;
  focalY: number;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Connect",
    description: "One-click integration with your stack.",
    icon: GitBranch,
    palette: ORANGE_PIXEL_PALETTE,
    label: "CONNECT",
    focalX: 0.68,
    focalY: 0.42,
  },
  {
    number: "02",
    title: "Configure",
    description: "Set routing rules and agent behaviors.",
    icon: Sliders,
    palette: PINK_PIXEL_PALETTE,
    label: "CONFIGURE",
    focalX: 0.7,
    focalY: 0.5,
  },
  {
    number: "03",
    title: "Deploy",
    description: "Push to global edge locations instantly.",
    icon: Globe2,
    palette: PURPLE_PIXEL_PALETTE,
    label: "DEPLOY",
    focalX: 0.65,
    focalY: 0.45,
  },
];

/* ------------------------------------------------------------------ */
/* Main HowItWorks Component Export                                   */
/* ------------------------------------------------------------------ */
export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [cardWidth, setCardWidth] = useState(380);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCardWidth(Math.min(w - 48, 320));
      } else if (w < 1024) {
        setCardWidth(360);
      } else {
        setCardWidth(400);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const gap = 28;
  const totalShift = (cardWidth + gap) * (STEPS.length - 1);

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -totalShift]
  );

  const trackProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepIndex = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.round(latest * (STEPS.length - 1)))
    );
    setActiveStep(stepIndex);
  });

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll =
      containerTop + (index / (STEPS.length - 1)) * (containerHeight - window.innerHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="section relative w-full h-[220vh] sm:h-[260vh] bg-white border-t border-neutral-100"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-6 sm:py-10 md:py-14 overflow-hidden">
        {/* Section Header */}
        <div className="container relative z-10 text-center flex flex-col items-center shrink-0">
          <div className="max-w-2xl sm:max-w-3xl flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a] leading-tight">
              From code to production in 3 simple steps
            </h2>
          </div>
        </div>

        {/* Horizontally Sliding Cards Track */}
        <div className="relative w-full z-10 overflow-visible my-auto py-2 sm:py-4">
          <div
            className="flex items-stretch w-max"
            style={{
              paddingLeft: mounted ? `calc(50vw - ${cardWidth / 2}px)` : "1rem",
              paddingRight: mounted ? `calc(50vw - ${cardWidth / 2}px)` : "1rem",
            }}
          >
            <motion.div
              style={{ x: xTranslate }}
              className="flex items-stretch gap-4 sm:gap-6 md:gap-8 transition-transform duration-75"
            >
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isCurrent = activeStep === idx;

                return (
                  <div
                    key={step.number}
                    onClick={() => scrollToStep(idx)}
                    style={{ width: `${cardWidth}px` }}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl sm:rounded-3xl flex flex-col justify-between transition-all duration-300 cursor-pointer select-none shrink-0 bg-white",
                      isCurrent
                        ? "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border-2 border-gray-900 scale-[1.02] sm:scale-[1.03]"
                        : "shadow-[0_8px_25px_rgba(0,0,0,0.03)] border border-gray-200/80 opacity-90 hover:opacity-100 scale-95"
                    )}
                  >
                    {/* Top Visual Area (Pixelated Gradient Mosaic) */}
                    <div className="w-full h-36 sm:h-40 relative overflow-hidden border-b border-gray-100">
                      <PixelMosaicVisual
                        palette={step.palette}
                        label={step.label}
                        isHovered={isCurrent}
                        focalX={step.focalX}
                        focalY={step.focalY}
                      />

                      {/* Top Floating Control: Icon */}
                      <div className="absolute top-3 left-3.5 z-10 pointer-events-none">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 backdrop-blur-xs border border-white/80 flex items-center justify-center text-gray-900 shadow-2xs">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0f172a] tracking-tight leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Timeline & Step Pills - Centered Track */}
        <div className="container relative z-10 flex flex-col items-center shrink-0">
          <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl mx-auto pt-2 pb-2">
            {/* Horizontal Continuous Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-slate-200 rounded-full" />

            {/* Animated Active Track Fill */}
            <motion.div
              style={{ width: trackProgress }}
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#0f172a] rounded-full z-0"
            />

            {/* Step Pills */}
            <div className="relative z-10 flex items-center justify-between w-full">
              {STEPS.map((step, idx) => {
                const isCurrent = activeStep === idx;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className={cn(
                      "flex items-center justify-center min-h-[44px] px-4 sm:px-6 md:px-7 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2",
                      isCurrent
                        ? "bg-[#0f172a] text-white shadow-xl scale-110"
                        : "bg-white text-slate-700 border border-slate-200 shadow-xs hover:border-slate-400 hover:text-slate-900 hover:scale-105"
                    )}
                  >
                    {step.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
