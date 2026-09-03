"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";

/* ------------------------------------------------------------------ */
/* Utility Helper                                                     */
/* ------------------------------------------------------------------ */
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* InfiniteSlider Component                                           */
/* ------------------------------------------------------------------ */
type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls: ReturnType<typeof animate>;
    const size = direction === "horizontal" ? width : height;
    if (!size) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const duration = Math.abs(to - from) / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: remainingDistance / currentSpeed,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((k) => k + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [key, translation, currentSpeed, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LogoCloud Component                                                */
/* ------------------------------------------------------------------ */
type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={48} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            width={110}
            height={20}
            decoding="async"
            className="pointer-events-none h-5 w-auto max-w-[130px] object-contain select-none brightness-0 opacity-60 hover:opacity-100 transition-opacity"
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

import Link from "next/link";
import { ShieldCheck, Lock, Award, ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Main LogoMarquee Component Export                                  */
/* ------------------------------------------------------------------ */
const DEFAULT_LOGOS: Logo[] = [
  { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" },
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
  { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" },
  { src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk" },
];

export default function LogoMarquee({
  logos = DEFAULT_LOGOS,
  title = "TRUSTED BY ENGINEERING TEAMS AT HIGH-GROWTH STARTUPS & ENTERPRISES",
}: {
  logos?: Logo[];
  title?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pt-10 pb-9 sm:pt-12 sm:pb-10 border-y border-neutral-100 bg-[#FAFAFA]"
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold mb-6">
          {title}
        </p>

        <div className="flex justify-center items-center w-full max-w-5xl mx-auto">
          <LogoCloud logos={logos} />
        </div>

        {/* Enterprise Compliance & Live Status Badge Row */}
        <div className="mt-8 pt-6 border-t border-neutral-200/60 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-neutral-600">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 shadow-2xs font-medium text-neutral-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>SOC 2 Type II Certified</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 shadow-2xs font-medium text-neutral-700">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>GDPR Compliant</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 shadow-2xs font-medium text-neutral-700">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>ISO 27001 Certified</span>
          </div>

          <Link
            href="/status"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/80 shadow-2xs font-medium text-neutral-800 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All systems operational (99.99% SLA)</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}