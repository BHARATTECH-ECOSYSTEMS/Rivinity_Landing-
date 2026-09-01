"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  GitBranch,
  Cpu,
  ShieldCheck,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Connect Workspace",
    description:
      "Link your repository, documentation, and vector stores with zero configuration to prime persistent memory.",
    icon: GitBranch,
  },
  {
    number: "02",
    title: "Orchestrate Swarms",
    description:
      "Define collaborative autonomous agents with automatic sub-50ms routing across leading frontier models.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Enterprise Guardrails",
    description:
      "Enforce automated PII redaction, prompt injection defense, and real-time deterministic compliance auditing.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Instant Edge Deployment",
    description:
      "Deploy full-stack applications and agent APIs to 280+ global edge locations with sub-second failover.",
    icon: Globe2,
  },
];

function CardPatternBlue({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Radiating contour / flow waves */}
      <path
        d="M-20 60 C 80 40, 180 120, 260 90 C 340 60, 390 120, 440 100"
        stroke="#3B82F6"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M-30 110 C 70 80, 160 180, 250 140 C 330 110, 380 170, 430 150"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-10 160 C 90 140, 190 230, 280 190 C 350 160, 400 220, 450 200"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10 210 C 110 190, 200 270, 290 240 C 360 210, 410 260, 460 240"
        stroke="#60A5FA"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M40 260 C 130 240, 220 310, 310 280 C 370 260, 420 300, 470 280"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Subtle organic dot accents */}
      <circle cx="80" cy="50" r="2.5" fill="#3B82F6" />
      <circle cx="190" cy="70" r="3" fill="#2563EB" />
      <circle cx="320" cy="40" r="2.5" fill="#60A5FA" />
      <circle cx="140" cy="130" r="3" fill="#3B82F6" />
      <circle cx="270" cy="120" r="2.5" fill="#2563EB" />
    </svg>
  );
}

function CardPatternPurple({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fluid continuous looping ribbon / scribble wave */}
      <path
        d="M-10 220 C 60 210, 140 180, 220 90 C 270 30, 350 40, 320 120 C 290 190, 180 200, 120 160 C 60 120, 100 30, 180 20 C 260 10, 340 70, 390 130 C 420 170, 380 240, 320 260 C 250 280, 160 260, 90 280"
        stroke="#8B5CF6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 70 C 110 50, 200 130, 280 80 C 340 40, 390 110, 420 80"
        stroke="#A855F7"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M10 150 C 90 130, 170 210, 260 160 C 330 120, 380 190, 430 160"
        stroke="#C084FC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Subtle organic dot accents */}
      <circle cx="70" cy="90" r="3" fill="#8B5CF6" />
      <circle cx="210" cy="60" r="2.5" fill="#A855F7" />
      <circle cx="340" cy="180" r="3.5" fill="#C084FC" />
      <circle cx="160" cy="240" r="2.5" fill="#8B5CF6" />
    </svg>
  );
}

function CardPatternGreen({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal layered wavy textured brush strokes */}
      <path
        d="M-20 45 Q 80 65, 180 40 T 380 50 T 430 40"
        stroke="#10B981"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-10 85 Q 90 110, 200 80 T 390 95 T 440 85"
        stroke="#059669"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M-30 130 Q 70 155, 180 125 T 370 140 T 420 130"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M-15 175 Q 85 200, 195 170 T 385 185 T 435 175"
        stroke="#34D399"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-25 220 Q 75 245, 185 215 T 375 230 T 425 220"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M-5 265 Q 95 285, 205 260 T 395 275 T 445 265"
        stroke="#059669"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Texture dash accents */}
      <line x1="60" y1="65" x2="85" y2="65" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="220" y1="105" x2="250" y2="105" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="140" y1="150" x2="175" y2="150" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
      <line x1="300" y1="195" x2="330" y2="195" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CardPatternPink({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Concentric organic ripple arcs & confetti dashes */}
      <path
        d="M320 280 C 260 260, 160 210, 110 130 C 70 60, 80 -20, 100 -50"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M360 290 C 300 270, 200 220, 150 140 C 110 70, 120 0, 140 -40"
        stroke="#F43F5E"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M400 300 C 340 280, 240 230, 190 150 C 150 80, 160 20, 180 -30"
        stroke="#FB7185"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M280 270 C 220 250, 120 190, 70 120 C 30 50, 40 -30, 60 -60"
        stroke="#EC4899"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Confetti dashes & organic speckled strokes */}
      <line x1="80" y1="170" x2="95" y2="155" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
      <line x1="120" y1="220" x2="135" y2="205" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
      <line x1="220" y1="80" x2="235" y2="65" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="260" y1="130" x2="275" y2="115" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
      <line x1="300" y1="70" x2="315" y2="55" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="180" y1="250" x2="195" y2="235" stroke="#FB7185" strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="180" r="3" fill="#EC4899" />
      <circle cx="270" cy="180" r="3.5" fill="#F43F5E" />
      <circle cx="210" cy="130" r="2.5" fill="#FB7185" />
    </svg>
  );
}

const STEP_THEMES = [
  {
    pattern: CardPatternBlue,
    cardGradient: "from-blue-50/40 via-white to-white",
    glowColor: "from-blue-400/12 via-blue-300/4 to-transparent",
    borderColor: "border-blue-100 group-hover:border-blue-300/60",
    iconBg: "bg-blue-50/80 text-blue-600 border-blue-200/60",
    starGradient: {
      id: "star-grad-blue",
      startColor: "#38BDF8",
      middleColor: "#60A5FA",
      endColor: "#93C5FD",
    },
  },
  {
    pattern: CardPatternPurple,
    cardGradient: "from-purple-50/40 via-white to-white",
    glowColor: "from-purple-400/12 via-purple-300/4 to-transparent",
    borderColor: "border-purple-100 group-hover:border-purple-300/60",
    iconBg: "bg-purple-50/80 text-purple-600 border-purple-200/60",
    starGradient: {
      id: "star-grad-purple",
      startColor: "#A855F7",
      middleColor: "#C084FC",
      endColor: "#E9D5FF",
    },
  },
  {
    pattern: CardPatternGreen,
    cardGradient: "from-emerald-50/40 via-white to-white",
    glowColor: "from-emerald-400/12 via-emerald-300/4 to-transparent",
    borderColor: "border-emerald-100 group-hover:border-emerald-300/60",
    iconBg: "bg-emerald-50/80 text-emerald-600 border-emerald-200/60",
    starGradient: {
      id: "star-grad-green",
      startColor: "#34D399",
      middleColor: "#6EE7B7",
      endColor: "#A7F3D0",
    },
  },
  {
    pattern: CardPatternPink,
    cardGradient: "from-pink-50/40 via-white to-white",
    glowColor: "from-pink-400/12 via-pink-300/4 to-transparent",
    borderColor: "border-pink-100 group-hover:border-pink-300/60",
    iconBg: "bg-pink-50/80 text-pink-600 border-pink-200/60",
    starGradient: {
      id: "star-grad-pink",
      startColor: "#FB7185",
      middleColor: "#F472B6",
      endColor: "#FBCFE8",
    },
  },
];

function RivinityStarEmblem({
  className,
  gradientId = "rivinity-star-gradient",
  startColor = "#60A5FA",
  middleColor = "#93C5FD",
  endColor = "#38BDF8",
}: {
  className?: string;
  gradientId?: string;
  startColor?: string;
  middleColor?: string;
  endColor?: string;
}) {
  return (
    <svg
      viewBox="-120 -70 320 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="50%" stopColor={middleColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
      <path
        d="M0 0C1.081-.402 2.161-.772 3.273-1.142 4.526-1.646 5.629-2.077 6.766-2.476L7.237-2.64 7.572-3.012C10.916-6.714 14.581-10.494 18.465-14.248 19.32-15.131 20.124-15.94 20.96-16.654 26.193-21.675 31.538-26.388 36.94-30.747 42.397-26.394 47.804-21.709 53.031-16.81L55.537-14.395C59.124-10.985 62.699-7.348 66.501-3.246L66.804-2.909C67.587-2.064 68.388-1.171 69.157-.278L69.867 .55 70.944 .383C72.138 .199 73.332 .013 74.554-.107H74.688L75.006-.18C80.17-.891 85.501-1.458 90.846-1.866L94.054-2.085C99.704-2.435 105.464-2.614 111.178-2.614 112.565-2.614 113.954-2.602 115.345-2.583 116.73 4.282 117.863 11.349 118.716 18.446 118.857 19.483 118.968 20.511 119.078 21.521L119.124 21.95C119.681 27.118 120.091 32.385 120.342 37.603 120.432 39.095 120.463 40.235 120.492 41.374L120.522 42.473 121.48 43.236C122.486 43.817 123.492 44.426 124.468 45.066L124.621 45.215 124.851 45.309C129.3 48.091 133.762 51.105 138.116 54.267 139.012 54.876 139.857 55.482 140.702 56.145 146.272 60.203 151.852 64.646 157.351 69.404 153.889 75.759 150.172 81.964 146.288 87.865 145.713 88.787 145.106 89.666 144.502 90.544 141.595 94.933 138.56 99.197 135.445 103.27L135.253 103.521 135.226 103.594C134.312 104.816 133.544 105.807 132.751 106.771L132.059 107.608 133.693 112.575C135.339 117.888 136.759 122.942 137.993 127.941 138.277 128.988 138.52 129.988 138.733 131.017 140.336 137.69 141.714 144.632 142.847 151.726 136.523 154.207 129.84 156.521 122.958 158.616 121.938 158.924 120.917 159.235 119.896 159.512 115 160.973 109.896 162.308 104.68 163.49L99.369 164.649 97.476 169.35 99.133 170.472 97.321 169.719C95.313 174.554 93.138 179.367 90.856 184.027 90.339 185.094 89.904 185.992 89.44 186.862 86.393 193.005 83 199.194 79.317 205.32 72.776 203.114 66.175 200.595 59.676 197.816 58.678 197.41 57.739 197.019 56.8 196.563 52.086 194.529 47.352 192.281 42.65 189.85L42.441 189.742 42.213 189.687C41.082 189.068 39.866 188.443 38.649 187.788L37.706 187.282 36.771 187.799C35.604 188.443 34.439 189.089 33.242 189.671L33.025 189.729 32.813 189.888C28.061 192.377 23.345 194.655 18.797 196.661 17.796 197.144 16.827 197.567 15.857 197.962 9.722 200.65 3.148 203.212-3.742 205.598-7.381 199.66-10.822 193.501-13.982 187.276-14.349 186.6-14.664 185.977-14.978 185.356L-15.497 184.335C-17.886 179.493-20.073 174.713-21.977 170.156L-22.016 169.999-22.14 169.798C-22.671 168.552-23.2 167.307-23.698 166.06L-24.096 165.063-25.152 164.862C-26.446 164.615-27.739 164.337-29.032 164.031L-29.256 163.977H-29.486C-34.39 162.867-39.484 161.586-44.623 160.118L-47.762 159.229C-54.539 157.209-61.387 154.879-68.107 152.306-67.022 145.274-65.652 138.267-64.029 131.452-63.862 130.651-63.677 129.907-63.495 129.173L-63.276 128.281C-61.998 123.113-60.548 117.941-58.967 112.919L-57.428 108.037-58.084 107.227C-58.856 106.269-59.597 105.313-60.337 104.324L-60.609 103.987C-63.717 99.961-66.71 95.813-69.758 91.306-70.467 90.339-71.067 89.404-71.672 88.438-75.549 82.621-79.254 76.528-82.726 70.266-77.472 65.642-71.933 61.149-66.242 56.896-65.378 56.248-64.518 55.602-63.627 54.985-59.222 51.764-54.799 48.739-50.435 45.963L-50.147 45.782C-49.139 45.108-48.101 44.468-47.062 43.857L-46.097 43.288V42.167C-46.097 41.004-46.037 39.871-45.978 38.71L-45.966 38.501-45.995 38.199C-45.754 32.901-45.376 27.666-44.847 22.504-44.752 21.333-44.631 20.168-44.476 19.005-43.669 11.824-42.585 4.779-41.249-1.997-39.141-2.046-37.039-2.071-34.939-2.071-29.9-2.071-24.874-1.928-19.998-1.644-18.81-1.581-17.63-1.518-16.449-1.426-11.514-1.1-6.446-.6-.933 .107L-.454 .169ZM35.731-58.996C30.483-55.246 25.214-51.17 19.626-46.537 10.966-39.325 2.75-31.655-4.809-23.723-14.89-24.761-25.074-25.286-35.098-25.286L-38.289-25.269C-45.261-25.206-52.1-24.895-58.611-24.349L-60.002-24.234-60.346-22.88C-62.09-16.043-63.541-9.354-64.66-2.997-66.664 7.936-68.061 19.109-68.808 30.216-78.066 36.476-87.005 43.295-95.389 50.5-100.329 54.677-105.234 59.178-110.377 64.253L-111.369 65.232-110.772 66.491C-107.961 72.418-104.87 78.311-101.323 84.504-95.872 94.132-89.756 103.59-83.136 112.622-86.213 123.4-88.693 134.393-90.505 145.314-91.64 151.887-92.536 158.664-93.169 165.443L-93.297 166.834-92.025 167.41C-86.022 170.137-79.865 172.676-73.207 175.174-62.692 179.081-51.785 182.436-40.768 185.151-36.275 195.157-31.111 205.073-25.411 214.632-21.995 220.422-18.293 226.193-14.415 231.777L-13.619 232.923-12.276 232.547C-5.589 230.683 .941 228.592 7.135 226.331 17.66 222.576 27.963 218.213 37.76 213.362 47.651 218.171 58.005 222.472 68.553 226.153 74.941 228.408 81.477 230.457 87.974 232.237L89.321 232.605 90.113 231.453C93.945 225.862 97.616 220.06 101.019 214.207 106.679 204.55 111.779 194.592 116.188 184.605 126.903 181.888 137.596 178.537 147.985 174.638 154.335 172.245 160.647 169.61 166.749 166.811L168.02 166.226 167.884 164.835C167.205 157.88 166.297 151.076 165.188 144.611 163.327 133.655 160.838 122.736 157.79 112.142 164.379 103.065 170.509 93.458 176.017 83.571 179.269 77.844 182.415 71.762 185.364 65.51L185.962 64.244 184.96 63.267C180.064 58.499 174.977 53.891 169.838 49.572 161.268 42.324 152.279 35.578 143.109 29.509 142.298 18.408 140.842 7.237 138.773-3.715 137.575-10.132 136.083-16.796 134.337-23.518L133.985-24.878 132.584-24.982C125.93-25.476 119.085-25.742 112.239-25.773L110.651-25.777C99.94-25.777 89.223-25.175 78.787-23.985 71.193-31.885 62.902-39.515 54.135-46.673 48.929-50.988 43.497-55.141 37.999-59.005L36.861-59.804Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive card dimensions
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const cardWidth = isMobile ? Math.min(windowWidth * 0.82, 320) : isTablet ? 360 : 420;
  const cardGap = isMobile ? 16 : isTablet ? 24 : 32;
  const stepOffset = cardWidth + cardGap;
  const totalOffset = stepOffset * (STEPS.length - 1);

  // Scroll tracking across the tall sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal translation that centers the active card on screen
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -totalOffset]
  );

  // Track progress line fill for bottom timeline
  const trackProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress 0..1 to step index 0..3
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
    <section
      ref={containerRef}
      className="relative w-full h-[280vh] sm:h-[320vh]"
    >
      {/* Sticky Viewport Container with 100dvh for mobile dynamic toolbars */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-6 sm:py-10 md:py-14 overflow-hidden">
        {/* Section Header - Perfectly Centered & Responsive */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center shrink-0">
          <div className="max-w-2xl sm:max-w-3xl flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              From code to autonomous production in 4 simple steps
            </h2>
          </div>
        </div>

        {/* Horizontally Sliding Cards Track - Centered Viewport Focal Point */}
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
                const theme = STEP_THEMES[idx % STEP_THEMES.length];
                const PatternComponent = theme.pattern;

                return (
                  <div
                    key={step.number}
                    onClick={() => scrollToStep(idx)}
                    style={{ width: `${cardWidth}px` }}
                    className={cn(
                      "group relative overflow-hidden min-h-[260px] sm:min-h-[300px] md:min-h-[330px] rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-[transform,opacity,box-shadow,border-color] duration-300 cursor-pointer select-none shrink-0",
                      isCurrent
                        ? "bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border-2 border-gray-900 scale-[1.02] sm:scale-[1.03]"
                        : "bg-white hover:bg-white shadow-[0_8px_25px_rgba(0,0,0,0.03)] border border-gray-200/80 opacity-95 hover:opacity-100 scale-95"
                    )}
                  >
                    {/* Soft Pastel Gradient Base Background */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-b opacity-80 group-hover:opacity-100 transition-opacity duration-500",
                        theme.cardGradient
                      )}
                    />

                    {/* Minimalist Pattern with Fade Mask for Crystal Clear Text */}
                    <div
                      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)",
                      }}
                    >
                      {/* Gentle ambient top glow wash */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                          theme.glowColor
                        )}
                      />
                      {/* Airy & Soft Minimalist Pattern */}
                      <PatternComponent className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-105" />
                    </div>

                    {/* Top-Right Corner Partial Star Emblem Matching Card Theme Gradient */}
                    <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none transition-all duration-500 ease-out transform opacity-0 scale-75 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 z-0">
                      <RivinityStarEmblem
                        className="w-full h-full"
                        gradientId={theme.starGradient.id}
                        startColor={theme.starGradient.startColor}
                        middleColor={theme.starGradient.middleColor}
                        endColor={theme.starGradient.endColor}
                      />
                    </div>

                    {/* Top: Step Icon Pill */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl sm:rounded-2xl bg-white/95 border border-gray-200/90 backdrop-blur-xs flex items-center justify-center text-gray-900 shadow-2xs group-hover:bg-gray-950 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        {step.number}
                      </span>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div className="space-y-2 sm:space-y-3 relative z-10 pt-6 sm:pt-8">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Timeline & Step Number Pills - Centered Track */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center shrink-0">
          <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl mx-auto pt-2 pb-2">
            {/* Horizontal Continuous Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gray-200 rounded-full" />

            {/* Animated Active Track Fill */}
            <motion.div
              style={{ width: trackProgress }}
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gray-900 rounded-full z-0"
            />

            {/* Step Number Pills */}
            <div className="relative z-10 flex items-center justify-between w-full">
              {STEPS.map((step, idx) => {
                const isCurrent = activeStep === idx;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className={cn(
                      "flex items-center justify-center px-4 sm:px-6 md:px-7 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold tracking-wider transition-all duration-300 active:scale-95 cursor-pointer",
                      isCurrent
                        ? "bg-[#090A0F] text-white shadow-xl scale-110"
                        : "bg-white text-gray-700 border border-gray-200 shadow-xs hover:border-gray-400 hover:text-black hover:scale-105"
                    )}
                  >
                    {step.number}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
