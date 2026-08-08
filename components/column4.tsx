"use client";

import type { NextPage } from "next";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Landmark, Globe, Home, Cog, Cpu } from "lucide-react";
import { DotMatrixIcon, type DotIconName } from "./ui/DotMatrixIcon";

export type DivuseViewModuleVOhHaVi5Type = {
  className?: string;
};

// Types once, then blinks — matches the Column "Column for" eyebrow
function useTypeOnce(word: string, speed = 55) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setText(word.slice(0, i));
      if (i >= word.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [word, speed]);

  return text;
}

type Tab = {
  label: string;
  // icons from lucide-react are SVG components — accept standard SVG props
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  dotIcon: DotIconName; // NEW
  paragraphs: string[];
};

const TABS: Tab[] = [
  {
    label: "Technology companies",
    icon: Cpu, dotIcon: "cpu",
    paragraphs: [
      "Built for teams shipping production software spin up isolated environments for every service, keep your CI/CD pipeline intact, and let infrastructure scale with your traffic instead of against it.",
      "From authentication to database provisioning to observability, the platform handles the undifferentiated heavy lifting so your engineers stay focused on the product, not the plumbing.",
    ],
  },
  {
    label: "Startups",
    icon: Landmark, dotIcon: "startup",
    paragraphs: [
      "Launch your MVP, iterate on it, and scale it without hiring a platform team first. One workspace covers your app, your landing page, and the infrastructure connecting them.",
      "Move at startup speed without cutting corners on reliability the kind of setup that usually takes a specialist hire is available from day one.",
    ],
  },
  {
    label: "Agencies",
    icon: Globe, dotIcon: "globe",
    paragraphs: [
      "Run every client on its own isolated workspace with its own design system, environment variables, and deployment pipeline no cross-contamination, no shared risk.",
      "Switch between client projects without losing context. Each workspace is self-contained, so onboarding a new client takes minutes, not a sprint.",
    ],
  },
  {
    label: "Solo builders",
    icon: Home, dotIcon: "home",
    paragraphs: [
      "Design, build, and deploy as a team of one. Authentication, database, and hosting are handled for you, so your time goes toward the product decisions only you can make.",
      "No DevOps background required sensible defaults get you to production, and you can go deeper only when you actually need to.",
    ],
  },
];

const DivuseViewModuleVOhHaVi5: NextPage<DivuseViewModuleVOhHaVi5Type> = ({
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const eyebrowText = useTypeOnce("Agent 4 for");

  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined,
  );

  // Track the ResizeObserver instance across renders so we can tear it
  // down cleanly whenever the observed node changes or unmounts.
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Callback ref instead of a plain useRef + useEffect: this fires exactly
  // when the DOM node is actually mounted/unmounted by framer-motion's
  // AnimatePresence, so we never end up measuring a stale/exiting node or
  // missing the newly-mounted one. Fixes the "shows then collapses to 0"
  // flash that happened when the observer was tied to activeIndex instead.
  const measureRef = useCallback((node: HTMLDivElement | null) => {
    // tear down whatever we were observing before
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;

    if (node) {
      const observer = new ResizeObserver(([entry]) => {
        setContentHeight(entry.contentRect.height);
      });
      observer.observe(node);
      resizeObserverRef.current = observer;
    }
  }, []);

  const active = TABS[activeIndex];

  return (
    <main
      className={`overflow-hidden font-[Inter] text-replitcom-mine-shaft1 ${className} justify-center items-center flex flex-col w-full`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-5">
          {/* Left column: eyebrow, vertical label stack, sliding content */}
          <div className="col-span-12 lg:col-span-5">
            {/* Eyebrow with typewriter + blinking cursor block */}
            {/* <div className="inline-flex relative items-center px-2 mb-12 h-6 text-replitcom-vermilion text-xs uppercase leading-normal font-mono">
              <div className="flex items-center gap-0.5 overflow-hidden">
                <span className="inline-block relative z-[1] overflow-hidden whitespace-nowrap">
                  {eyebrowText}
                </span>
                <span className="inline-block relative z-[1] ml-0.5 w-1.5 h-3 rounded-xs bg-replitcom-vermilion opacity-20 animate-pulse" />
              </div>
              <span className="absolute inset-0 w-full h-full rounded bg-replitcom-vermilion/5 ring ring-replitcom-vermilion/10 backdrop-blur-lg" />
            </div> */}

            {/* Vertical label list — active is large/solid, rest are faded + indented */}
            <ul className="flex flex-col gap-1 list-none p-0 m-0">
              {TABS.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = index === activeIndex;
                return (
                  <li key={tab.label}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group flex items-center gap-2 sm:gap-3 text-left transition-all duration-300 cursor-pointer rounded-2xl w-full sm:w-auto ${isActive
                        ? "bg-white py-3 px-3 sm:py-4 sm:px-5 shadow-[0_8px_24px_rgba(17,26,74,0.06),0_2px_8px_rgba(17,26,74,0.04)]"
                        : "py-3 px-3 sm:py-4 sm:px-5 bg-transparent"
                        }`}
                    >
                      {isActive && (
                        <Icon
                          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 shrink-0"
                          style={{ color: "#16283a" }}
                          strokeWidth={1.75}
                        />
                      )}
                      <span
                        className="text-xl sm:text-3xl lg:text-[2.75rem] font-medium tracking-[-0.02em] leading-tight lg:leading-none whitespace-normal sm:whitespace-nowrap transition-colors duration-200"
                        style={{
                          color: isActive ? "#16283a" : "#b7bfc7",
                        }}
                      >
                        {tab.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Sliding content — container height animates to match the active panel */}
            <motion.div
              className="relative overflow-hidden w-full max-w-full lg:max-w-[26.688rem]"
              animate={{ height: contentHeight }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  ref={measureRef}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute top-0 left-0 right-0 w-full"
                >
                  {active.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={`max-w-full lg:max-w-[56ch] text-sm sm:text-base text-[#5b6470] font-light ${i === 0 ? "mt-6 mb-4 sm:mt-8 sm:mb-6" : ""
                        }`}
                    >
                      {p}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right column: dot-grid graphic with corner dot clusters — desktop only, fully unmounted below lg */}
          <div className="hidden lg:block lg:col-span-6 lg:col-start-8">
            <div className="relative">
              <div
                className="absolute z-0 -inset-50"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 0.063rem 0.063rem, rgb(207, 208, 216) 0.063rem, rgba(0, 0, 0, 0) 0.063rem)",
                  backgroundPosition: "0.188rem 0.188rem",
                  backgroundSize: "0.5rem 0.5rem",
                  maskImage:
                    "radial-gradient(black 0%, black 25%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.4) 50%, transparent 70%)",
                }}
              />
              <div className="w-112.5 h-150 relative rounded-3xl overflow-hidden">
                <DotMatrixIcon icon={TABS[activeIndex].dotIcon} />
              </div>
              <div className="absolute z-1 -inset-6 transition duration-1000 pointer-events-none">
                <div className="absolute top-0.5 left-0.5 rotate-90"><CornerDots /></div>
                <div className="absolute top-0.5 right-0.5 rotate-180"><CornerDots /></div>
                <div className="absolute bottom-0.5 left-0.5"><CornerDots /></div>
                <div className="absolute right-0.5 bottom-0.5 -rotate-90"><CornerDots /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

function CornerDots() {
  return (
    <svg className="block w-full h-full overflow-visible" fill="none" height="50" viewBox="0 0 12 12" width="12">
      <circle cx="2" cy="2" fill="#0C6997" r="2" />
      <circle cx="10" cy="2" fill="#0C6997" r="2" />
      <circle cx="10" cy="10" fill="#0C6997" r="2" />
    </svg>
  );
}

export default DivuseViewModuleVOhHaVi5;