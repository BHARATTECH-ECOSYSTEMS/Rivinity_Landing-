"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import Link from "next/link";
import useMeasure from "react-use-measure";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Layers,
  Wand2,
  Globe,
  Zap,
  CheckCircle2,
  Sparkles,
  Terminal,
  Database,
  Cpu,
  Code2,
  GraduationCap,
  Microscope,
  Megaphone,
  Rocket,
  Building2,
  Check,
  ShieldCheck,
  MessageSquare,
  Bot,
} from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Adjust these two paths to match where these components actually live
// in your project (they already exist in the Rivinity codebase).
import ScrollReveal from "../components/ui/ScrollReveal";
import HeroWorkflow from "../components/ui/HeroWorkflow";
import { WhyRivinity } from "@/components/WhyRivinity";

// ============================================================
// Hero — What will you build?
// ============================================================
// ==========================================
// 1. Container Scroll Components
// ==========================================

const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.98] : [1.05, 1];
  };

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [10, 0] : [20, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, -20] : [0, -60]
  );

  return (
    <div
      className="min-h-[38rem] sm:min-h-[50rem] md:min-h-[60rem] lg:min-h-[66rem] flex items-center justify-center relative px-2 sm:px-6 md:px-12 pt-10 sm:pt-16 md:pt-24 pb-12 sm:pb-20 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      ref={containerRef}
    >
      <div
        className="py-6 sm:py-12 md:py-20 w-full relative"
        style={{
          perspective: isMobile ? "600px" : "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-4 sm:mb-8 px-2"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl -mt-4 sm:-mt-8 md:-mt-12 mx-auto min-h-[14rem] sm:min-h-[20rem] md:min-h-[24rem] w-full border-2 sm:border-4 border-[#6C6C6C]/20 p-1 sm:p-2.5 md:p-3 bg-[#222222] rounded-[20px] sm:rounded-[26px] md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-[14px] sm:rounded-[20px] md:rounded-[22px] bg-[#FCFCFD] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. Integrated WhatWillYouBuild Hero Section
// ==========================================

const shellVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const blobVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2.5, ease: "easeOut" },
  },
};

function WhatWillYouBuild() {
  return (
    <motion.div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shellVariants}
    >
      {/* Container Scroll Wrapper */}
      <div className="relative z-10 w-full max-w-7xl">
        <ContainerScroll
          titleComponent={
            <div className="py-20 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-6xl text-center">
                <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                  Build with AI that actually understands your code
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
                  Rivinity orchestrates the best models, remembers your context, and deploys your apps all from one canvas.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-sm sm:max-w-none mx-auto">
                  <div className="text-white w-full sm:w-auto">
                    <Link href="/signup" className="btn btn-primary btn-large w-full sm:w-auto text-center block">
                      Start building free
                    </Link>
                  </div>
                  <Link href="/demo" className="btn btn-secondary btn-large w-full sm:w-auto text-center block">
                    View demo
                  </Link>
                </div>
              </div>
            </div>
          }
        >
          <HeroWorkflow />
        </ContainerScroll>
      </div>
    </motion.div>
  );
}
// ============================================================
// Logo marquee
// ============================================================
/* ------------------------------------------------------------------ */
/*  cn helper (inlined — no @/lib/utils needed)                       */
/* ------------------------------------------------------------------ */
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  InfiniteSlider (inlined)                                          */
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
/*  LogoCloud (inlined)                                                */
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
            className="pointer-events-none h-5 w-auto select-none brightness-0 opacity-60 hover:opacity-100 transition-opacity"
            height={20}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Demo page                                                          */
/* ------------------------------------------------------------------ */
const logos: Logo[] = [
  { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
  { src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso" },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
  { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" },
  { src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk" },
];

function LogoMarquee() {
  return (
    <section className="section-sm border-y border-gray-100">
      <div className="container text-center">
        <p className="text-muted text-sm mb-6">Trusted by teams at</p>
        <div className="flex justify-center items-center w-full">
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  );
}
// ============================================================
// Powered by Rivinity (persona tabs)
// ============================================================
type PoweredByRivinityType = {
  className?: string;
};

type UseCase = {
  id: string;
  tabLabel: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  title: string;
  flowSteps: string[];
  description: string;
  preview: React.ReactNode;
};

const USE_CASES: UseCase[] = [
  {
    id: "developers",
    tabLabel: "Developers",
    badge: "Code & APIs",
    icon: Code2,
    accentColor: "#7C3AED",
    title: "Ship production features 10x faster with AI-native workflows",
    flowSteps: ["Prompt", "Generate JSX", "Test Logic", "Instant Deploy"],
    description:
      "Generate fully typed React components, orchestrate API pipelines, and debug complex infrastructure without leaving your canvas.",
    preview: (
      <div className="w-full h-full bg-[#141414] rounded-2xl p-3 sm:p-4 font-mono text-xs text-slate-300 border border-white/10 flex flex-col justify-between shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[120px] sm:max-w-none">
              dev-session.tsx
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] bg-[#7C3AED]/20 text-[#BFA7F8] px-1.5 sm:px-2 py-0.5 rounded border border-[#7C3AED]/40 shrink-0">
            TypeScript + React
          </span>
        </div>
        <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-[11px] py-2 sm:py-3 overflow-x-auto">
          <p className="text-slate-500">// Generated by Rivinity Engine</p>
          <p>
            <span className="text-[#EC4899]">export function</span>{" "}
            <span className="text-[#FF7A1A]">UserAuthGrid</span>() &#123;
          </p>
          <p className="pl-3 sm:pl-4 text-slate-400">
            <span className="text-[#7C3AED]">const</span> &#123; user, login &#125; = useRivinityAuth();
          </p>
          <p className="pl-3 sm:pl-4 text-slate-400">
            return &lt;<span className="text-[#EC4899]">AuthCanvas</span> theme="dark" /&gt;;
          </p>
          <p>&#125;</p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] sm:text-[10px] text-emerald-400">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 stroke-[3] shrink-0" /> Zero errors detected
          </span>
          <span className="text-slate-500">142ms build time</span>
        </div>
      </div>
    ),
  },
  {
    id: "students",
    tabLabel: "Students",
    badge: "Learning & Projects",
    icon: GraduationCap,
    accentColor: "#EC4899",
    title: "Deconstruct complex theory & build portfolio MVPs",
    flowSteps: ["Deconstruct", "Solve Logic", "Verify Proof", "Master"],
    description:
      "Break down intricate computer science concepts, solve algorithmic proofs step-by-step, and convert course projects into live web apps.",
    preview: (
      <div className="w-full h-full bg-white rounded-2xl p-3 sm:p-4 border border-black/10 flex flex-col justify-between shadow-xs min-h-[200px]">
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <span className="text-xs font-semibold text-[#191818] flex items-center gap-1.5 truncate">
            <GraduationCap className="w-4 h-4 text-[#EC4899] shrink-0" /> UTM Proof Breakdown
          </span>
          <span className="text-[9px] sm:text-[10px] bg-[#EC4899]/10 text-[#EC4899] px-1.5 sm:px-2 py-0.5 rounded-full font-bold shrink-0">
            Verified
          </span>
        </div>
        <div className="p-2.5 sm:p-3 bg-[#F3EDE3]/60 rounded-xl text-xs space-y-1 sm:space-y-1.5 text-slate-700 my-2">
          <p className="font-semibold text-[#191818] text-xs">Universal Turing Machine (UTM)</p>
          <p className="text-[10px] sm:text-[11px] leading-relaxed opacity-80 line-clamp-3 sm:line-clamp-none">
            Encodes transition functions onto tape 1 and input data onto tape 2 to simulate any arbitrary Turing machine M...
          </p>
        </div>
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-[#EC4899]">
          <span>Step 3 of 4 completed</span>
          <span className="underline cursor-pointer">View full derivation →</span>
        </div>
      </div>
    ),
  },
  {
    id: "researchers",
    tabLabel: "Researchers",
    badge: "Deep Context & Data",
    icon: Microscope,
    accentColor: "#7C3AED",
    title: "Synthesize literature with zero hallucinations",
    flowSteps: ["Ingest Papers", "Query Vector Memory", "Cross-Reference", "Generate Report"],
    description:
      "Query hundreds of research PDFs simultaneously using infinite vector memory. Extract datasets, cross-check citations, and correlate papers instantly.",
    preview: (
      <div className="w-full h-full bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-800 font-mono text-xs text-slate-300 flex flex-col justify-between shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-1.5 truncate">
            <Database className="w-3.5 h-3.5 text-[#BFA7F8] shrink-0" /> Vector Graph Memory
          </span>
          <span className="text-[#BFA7F8] font-bold text-[10px] sm:text-xs shrink-0">100k+ Tokens</span>
        </div>
        <div className="space-y-1.5 sm:space-y-2 py-2">
          <div className="p-1.5 sm:p-2 bg-slate-800/80 rounded-lg flex justify-between items-center text-[10px] sm:text-[11px]">
            <span className="truncate max-w-[110px] xs:max-w-[150px] sm:max-w-[170px] text-slate-200">
              Steganography_Analysis_v2.pdf
            </span>
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1 sm:px-1.5 py-0.5 rounded shrink-0">
              99.2% Match
            </span>
          </div>
          <div className="p-1.5 sm:p-2 bg-slate-800/80 rounded-lg flex justify-between items-center text-[10px] sm:text-[11px]">
            <span className="truncate max-w-[110px] xs:max-w-[150px] sm:max-w-[170px] text-slate-200">
              ResNet18_Residuals.pdf
            </span>
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1 sm:px-1.5 py-0.5 rounded shrink-0">
              95.8% Match
            </span>
          </div>
        </div>
        <div className="text-[9px] sm:text-[10px] text-slate-400 pt-2 border-t border-slate-800">
          Source cited across 14 research papers
        </div>
      </div>
    ),
  },
  {
    id: "marketers",
    tabLabel: "Marketers",
    badge: "Prompt-to-UI & Copy",
    icon: Megaphone,
    accentColor: "#FF7A1A",
    title: "Turn natural language into high-converting landing pages",
    flowSteps: ["Brief", "Generate Layout", "Refine Copy", "Publish Live"],
    description:
      "Describe a launch concept and let Rivinity build responsive React layouts, interactive CTA elements, and conversion copy in seconds.",
    preview: (
      <div className="w-full h-full bg-white rounded-2xl p-3 sm:p-4 border border-black/10 flex flex-col justify-between shadow-xs min-h-[200px]">
        <div className="flex items-center justify-between pb-2 border-b border-black/10">
          <span className="text-xs font-semibold text-[#191818] flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" /> Prompt-to-UI Output
          </span>
          <span className="text-[9px] sm:text-[10px] bg-[#FF7A1A]/10 text-[#FF7A1A] px-1.5 sm:px-2 py-0.5 rounded font-bold shrink-0">
            Live Interactive
          </span>
        </div>
        <div className="p-3 sm:p-4 my-2 bg-gradient-to-br from-[#FF7A1A]/10 via-[#F5A9D0]/10 to-[#BFA7F8]/10 rounded-xl border border-black/5 flex flex-col gap-1.5 sm:gap-2">
          <h4 className="text-xs font-bold text-[#191818] leading-tight">Automate Your Next Product Launch</h4>
          <p className="text-[10px] text-slate-600 leading-snug">Convert visitors into waitlist signups with AI canvas.</p>
          <button className="mt-1 self-start px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#141414] text-white font-medium text-[9px] sm:text-[10px] shadow-xs">
            Start Free Trial →
          </button>
        </div>
        <div className="text-[9px] sm:text-[10px] text-slate-400 text-right">Optimized for Desktop & Mobile</div>
      </div>
    ),
  },
  {
    id: "startups",
    tabLabel: "Startups",
    badge: "MVP & Zero-DevOps",
    icon: Rocket,
    accentColor: "#FF7A1A",
    title: "Go from initial prompt to globally deployed startup in days",
    flowSteps: ["Prompt", "Auto-Wire Auth/DB", "Deploy Edge", "Scale Globally"],
    description:
      "Skip provisioning servers. Auth, database, hosting, and edge network routing come pre-configured out of the box.",
    preview: (
      <div className="w-full h-full bg-[#141414] rounded-2xl p-3 sm:p-4 border border-white/10 font-mono text-xs text-slate-300 flex flex-col justify-between shadow-lg min-h-[200px]">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="flex items-center gap-1.5 text-slate-400 truncate">
            <Globe className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" /> Edge Deployment Engine
          </span>
          <span className="text-[8px] sm:text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 sm:px-2 py-0.5 rounded-full font-bold shrink-0">
            ONLINE
          </span>
        </div>
        <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-[10.5px] py-2">
          <p className="text-slate-400">✔ Managed Auth & DB Wired</p>
          <p className="text-slate-400">✔ Global POPs: SFO, LHR, TYO, FRA</p>
          <p className="text-[#FF7A1A] font-bold pt-1 truncate">🚀 https://app.rivinity.site</p>
        </div>
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 pt-2 border-t border-white/10">
          <span>Latency: 24ms</span>
          <span>SSL: Active</span>
        </div>
      </div>
    ),
  },
  {
    id: "businesses",
    tabLabel: "Businesses",
    badge: "Enterprise & Scale",
    icon: Building2,
    accentColor: "#7C3AED",
    title: "Scale AI execution safely with strict enterprise governance",
    flowSteps: ["Enforce SAML", "Dynamic Route Models", "Audit Logs", "Optimize Token Costs"],
    description:
      "Empower multi-member teams with collaborative studio access while maintaining SOC 2 compliance and dynamic model cost routing.",
    preview: (
      <div className="w-full h-full bg-white rounded-2xl p-3 sm:p-4 border border-black/10 flex flex-col justify-between shadow-xs min-h-[200px]">
        <div className="flex items-center justify-between pb-2 border-b border-black/10">
          <span className="text-xs font-semibold text-[#191818] flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-4 h-4 text-[#7C3AED] shrink-0" /> Enterprise Control Panel
          </span>
          <span className="text-[9px] sm:text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded font-bold shrink-0">
            SOC 2 Type II
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="p-2 sm:p-2.5 bg-[#F3EDE3]/70 rounded-xl border border-black/5">
            <span className="text-[9px] sm:text-[10px] text-slate-500 block truncate">Token Cost Optimization</span>
            <span className="text-sm sm:text-base font-extrabold text-[#191818]">35.4% Saved</span>
          </div>
          <div className="p-2 sm:p-2.5 bg-[#F3EDE3]/70 rounded-xl border border-black/5">
            <span className="text-[9px] sm:text-[10px] text-slate-500 block truncate">Active Team Seats</span>
            <span className="text-sm sm:text-base font-extrabold text-[#7C3AED]">240 / 250</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400">
          <span>SAML/SSO: ON</span>
          <span>Audit Logs Enabled</span>
        </div>
      </div>
    ),
  },
];

function PoweredByRivinity({ className = "" }: PoweredByRivinityType) {
  const [activeTab, setActiveTab] = useState<UseCase>(USE_CASES[0]);

  return (
    <section className={`w-full max-w-5xl mx-auto px-3 sm:px-6 py-10 sm:py-16 font-sans text-[#191818] overflow-hidden ${className}`}>

      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-2 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#191818] leading-tight">
          One platform. Built for every persona.
        </h2>
      </div>

      {/* Horizontal Tabs Row (Scrollable on mobile) */}
      <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-4 sm:mb-6 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-between gap-4 bg-gray-50 p-2 rounded-2xl border border-black/5 shrink-0">
          {USE_CASES.map((uc) => {
            const Icon = uc.icon;
            const isActive = activeTab.id === uc.id;

            return (
              <button
                key={uc.id}
                onClick={() => setActiveTab(uc)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-md font-semibold transition-all duration-200 shrink-0 ${isActive
                  ? "bg-white text-[#191818] shadow-xs scale-[1.01]"
                  : "text-[#191818]/60 hover:text-[#191818] hover:bg-white/50"
                  }`}
              >
                {/* <Icon
                  className="w-3.5 h-3.5 transition-colors shrink-0"
                  style={{ color: isActive ? uc.accentColor : "currentColor" }}
                /> */}
                <span className="whitespace-nowrap">{uc.tabLabel}</span>

                {/* Subtle active highlight dot */}
                {isActive && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: uc.accentColor }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Dynamic Use-Case Container */}
      <div className="w-full border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden flex flex-col justify-between">

        {/* Subtle background glow */}
        <div
          className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: activeTab.accentColor }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch lg:items-center relative z-10"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border"
                    style={{
                      color: activeTab.accentColor,
                      borderColor: `${activeTab.accentColor}40`,
                      backgroundColor: `${activeTab.accentColor}12`,
                    }}
                  >
                    {activeTab.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#191818] tracking-tight leading-snug">
                  {activeTab.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#191818]/70 leading-relaxed max-w-xl">
                  {activeTab.description}
                </p>
              </div>

              {/* Step-by-Step Workflow Flow */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#191818]/50">
                  WORKFLOW PIPELINE
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#191818]">
                  {activeTab.flowSteps.map((step, idx) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-white border border-black/10 shadow-2xs text-[10px] sm:text-[11px] whitespace-nowrap">
                        {step}
                      </span>
                      {idx < activeTab.flowSteps.length - 1 && (
                        <span className="text-slate-400 font-normal text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Product UI Mockup Column */}
            <div className="lg:col-span-5 min-h-[220px] sm:min-h-[240px] h-full w-full flex flex-col">
              <div className="w-full h-full bg-white/40 p-1.5 sm:p-2 rounded-2xl border border-black/5 shadow-inner flex-1 flex flex-col">
                {activeTab.preview}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Banner Inside Container */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs text-[#191818]/60 relative z-10 text-center sm:text-left">
          <span className="flex items-center justify-center sm:justify-start gap-1.5 font-medium text-[11px] sm:text-xs">
            <Zap className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
            Switch personas anytime — all tools share the same studio memory.
          </span>
          <button className="flex items-center gap-1 font-bold text-[#191818] hover:text-[#7C3AED] transition-colors text-[11px] sm:text-xs shrink-0">
            <span>Explore all features</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
// ============================================================
// Why Rivinity (ecosystem map)
// ============================================================

// components/WhyRivinity.tsx

// ============================================================
// AI bento features
// ============================================================
export function AIBentoFeatures() {
  const bentoItems = [
    {
      step: "01",
      title: "Intelligent Orchestrator",
      description:
        "Automatically routes your prompts to the most capable model for the task, balancing speed, cost, and complex reasoning in real-time.",
      badge: "Real-time Routing",
    },
    {
      step: "02",
      title: "Infinite Context Memory",
      description:
        "Never repeat yourself. The AI remembers your past sessions, files, and preferences across all studios.",
      badge: "Zero-loss State",
    },
    {
      step: "03",
      title: "One-Click Deploy",
      description:
        "From a local development environment to a globally distributed edge network in seconds. Zero DevOps required.",
      badge: "Global Edge",
    },
  ];

  return (
    <div className="container mt-25 mb-25 text-[#1A1A1A]">
      <div className="section-sm mx-auto px-5 sm:px-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.1]">
            Everything you need to build faster
          </h2>
          <p className="text-xs sm:text-base text-[#6B7280] leading-relaxed font-medium max-w-lg mx-auto">
            A complete suite of AI-powered tools designed to supercharge your workflow from idea to production.
          </p>
        </div>

        {/* Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bentoItems.map((item) => (
            <div
              key={item.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-8 transition-all duration-300 hover:border-[#1A1A1A]/30 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              {/* Subtle Ambient Hover Effect */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-black/[0.02] blur-2xl transition-all duration-500 group-hover:scale-150" />

              {/* Card Top: Step Number & Badge */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-bold text-[#6B7280] tracking-widest">
                    {item.step}
                  </span>
                  <span className="rounded-full border border-[#E5E7EB] bg-[#F7F7F8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors group-hover:border-gray-300">
                    {item.badge}
                  </span>
                </div>

                {/* Card Main Header & Text */}
                <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#6B7280] font-normal">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Minimalist Indicator Line */}
              <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase">
                  Overview
                </span>
                <div className="h-[2px] w-6 bg-gray-300 rounded-full transition-all duration-300 group-hover:w-12 group-hover:bg-[#1A1A1A]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
// ============================================================
// Research section
// ============================================================
type ResearchCard = {
  tag: string;
  title: string;
  authors: string;
  href: string;
};

const RESEARCH_CARDS: ResearchCard[] = [
  {
    tag: "Agents",
    title: "ThunderAgent: 2x Faster Agentic Inference for Synthetic Data Generation at Scale",
    authors: "Hao Kang, Ziyang Li et al.",
    href: "/blog/thunderagent",
  },
  {
    tag: "Kernels",
    title: "ParallelKernelBench: Frontier LLMs can't write fast multi-GPU kernels (yet)",
    authors: "Willy Chan et al.",
    href: "/blog/parallelkernelbench",
  },
  {
    tag: "Inference",
    title: "Accelerate RL rollouts by up to 50% with distribution-aware speculative decoding",
    authors: "Zelei Shao et al.",
    href: "/blog/distribution-aware-speculative-decoding",
  },
  {
    tag: "Architecture",
    title: "Parcae: Doing more with fewer parameters using stable looped models",
    authors: "Hayden Prairie et al.",
    href: "/blog/parcae",
  },
  {
    tag: "Agents",
    title: "EinsteinArena: Harnessing the collective intelligence of agents in the wild",
    authors: "Federico Bianchi et al.",
    href: "/blog/einsteinarena",
  },
  {
    tag: "Inference",
    title: "DeepCoder: A Fully Open-Source 14B Coder at O3-mini Level",
    authors: "Michael Luo* et al.",
    href: "/blog/deepcoder",
  },
  {
    tag: "Kernels",
    title: "ThunderKittens Now Optimized for NVIDIA Blackwell GPUs",
    authors: "Benjamin Spector et al.",
    href: "/blog/thunderkittens-nvidia-blackwell-gpus",
  },
  {
    tag: "Model Shaping",
    title: "Introducing AutoJudge: Streamlined inference acceleration via automated dataset curation",
    authors: "Roman Garipov et al.",
    href: "/blog/introducing-autojudge",
  },
];

function useTypeOnce(word: string, speed = 55) {
  const [text, setText] = useState("");
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setText(word.slice(0, i));
        if (i >= word.length) clearInterval(interval);
      }, speed);

      return () => clearInterval(interval);
    }
  }, [word, speed]);

  return text;
}

function ResearchCardItem({ card }: { card: ResearchCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={card.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full min-w-full sm:w-[264px] sm:min-w-0 shrink-0 h-[320px] sm:h-[340px] snap-start rounded-2xl border border-[#EDEAE4] bg-white p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_2px_10px_rgba(17,26,74,0.04)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,60,0,0.10)]"
    >
      {/* Background gradient, fades in on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(160deg, #FFF3EC 0%, #FFE4D3 100%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <span className="inline-flex w-fit items-center rounded-full border border-[#FF7A1A]/30 bg-[#FFF3EC] px-2.5 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-[#FF7A1A]">
          {card.tag}
        </span>
        <p className="text-base sm:text-[17px] leading-[1.35] font-medium text-[#1F2024] line-clamp-4">
          {card.title}
        </p>
      </div>

      <div className="relative z-10 h-6">
        {/* Authors: visible by default, fade out on hover */}
        <p
          className="absolute inset-0 text-xs sm:text-[13px] text-[#8E8E93] transition-opacity duration-300 truncate"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {card.authors}
        </p>

        {/* Read More button: slides up + fades in on hover */}
        <div
          className="absolute inset-0 flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#FF7A1A] transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(100%)",
          }}
        >
          Read More
          <ArrowRight size={14} />
        </div>
      </div>
    </a>
  );
}

function ResearchSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const eyebrow = useTypeOnce("Grounded in cutting-edge research");

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("a");
    const cardWidth = card ? card.offsetWidth + 24 : 288;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }, []);

  return (
    <section className="section-sm bg-gray-50 mt-10 rounded-2xl">
      <div className="container">
        {/* Header Block: Stacked on Mobile, Side-by-Side on Desktop */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1F2024]">
              Foundational systems research for production AI.
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#EDEAE4] bg-gray-200 flex items-center justify-center text-[#1F2024] hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 hover:text-[#FF7A1A] active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#EDEAE4] bg-gray-200 flex items-center justify-center text-[#1F2024] hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 hover:text-[#FF7A1A] active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Card Rail */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {RESEARCH_CARDS.map((card) => (
            <ResearchCardItem key={card.href} card={card} />
          ))}
        </div>

        {/* View All Footer Link */}
        <div className="flex justify-end mt-4">
          <a href="/research" className="text-accent hover:underline text-sm sm:text-md font-medium">
            View all research &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
// ============================================================
// Testimonials
// ============================================================
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced four separate AI dashboards with one Rivinity workspace. Onboarding a new engineer used to take a week now it takes an afternoon.",
    name: "Priya Sharma",
    role: "Head of Data",
    company: "QuantumLeap",
    initials: "PS",
  },
  {
    quote:
      "The forecasting model caught a demand shift two weeks before our old pipeline would have. That single alert paid for our annual enterprise commitment.",
    name: "Marcus Johnson",
    role: "VP Operations",
    company: "Synergy Corp",
    initials: "MJ",
  },
  {
    quote:
      "Support doesn't hand you off to a bot. I've had the same systems engineer answer three architecture tickets in a row he knew our VPC setup inside out.",
    name: "Isabella Rossi",
    role: "Client Success Lead",
    company: "Horizon",
    initials: "IR",
  },
  {
    quote:
      "Every sprint release ships a feature we requested in feedback. It is rare to feel like an agent roadmap is written with your team in the room.",
    name: "Kenji Tanaka",
    role: "Staff AI Engineer",
    company: "CodeCrafters",
    initials: "KT",
  },
  {
    quote:
      "We cut AI project delivery times by almost a third in Q1. Finance noticed the operational efficiency improvements before I even submitted my quarterly report.",
    name: "Fatima Al-Jamil",
    role: "CFO",
    company: "Apex Financial",
    initials: "FA",
  },
];

function useTestimonialSlider(length: number, autoplayMs: number | null = 8000) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % length);
  }, [length]);

  const previous = useCallback(() => {
    setActive((current) => (current - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    if (!autoplayMs) return;

    const timer = window.setInterval(next, autoplayMs);
    return () => window.clearInterval(timer);
  }, [next, autoplayMs]);

  return { active, next, previous, setActive };
}

function TestimonialsSection() {
  const { active, next, previous, setActive } = useTestimonialSlider(
    TESTIMONIALS.length,
    8000
  );

  const current = TESTIMONIALS[active];

  return (
    <section className="section py-20 bg-[var(--color-bg-primary,#ffffff)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl w-full max-w-none text-center">
            Teams run on Rivinity,{" "}
            <span className="text-[#FF6B00]">not around it</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] mt-4 leading-relaxed">
            Real feedback from engineering leaders, researchers, and operators.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-[#F7F7F8] border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 md:p-16 shadow-xs min-h-[320px] flex flex-col justify-between">
            {/* Background Decorative Quote Icon */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-gray-200/60 pointer-events-none -z-0" />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-[#1A1A1A] tracking-tight mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  {/* Author Meta Block */}
                  <div className="flex items-center gap-4">
                    {/* Initial Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                      {current.initials}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#1A1A1A] leading-tight">
                        {current.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                        {current.role} at{" "}
                        <span className="font-semibold text-[#1A1A1A]">
                          {current.company}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls & Indicators */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200/80">
              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${active === idx
                      ? "w-8 bg-[#FF6B00]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                  />
                ))}
              </div>

              {/* Arrow Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={previous}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white text-[#1A1A1A] flex items-center justify-center transition hover:border-[#FF6B00] hover:text-[#FF6B00] active:scale-95 cursor-pointer shadow-xs"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white text-[#1A1A1A] flex items-center justify-center transition hover:border-[#FF6B00] hover:text-[#FF6B00] active:scale-95 cursor-pointer shadow-xs"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ============================================================
// FAQ
// ============================================================
interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does the Intelligent Orchestrator choose models?",
    answer: "Our orchestrator analyzes your prompt complexity, required reasoning depth, and latency requirements to route to the optimal model— whether that's a fast lightweight model or a powerful reasoning engine.",
  },
  {
    question: "What file types can I upload for context memory?",
    answer: "You can upload PDFs, Word documents, code files, images, and spreadsheets. Rivinity extracts context and maintains it across all your sessions and studios.",
  },
  {
    question: "Is my data used to train models?",
    answer: "No. Your data is never used to train foundation models. We maintain strict data isolation and offer enterprise-grade privacy controls.",
  },
  {
    question: "Can I deploy apps built with Rivinity?",
    answer: "Yes. With one-click deploy, your apps go from local development to a globally distributed edge network in seconds.",
  },
  {
    question: "What integrations are supported?",
    answer: "Rivinity connects with GitHub, Vercel, OpenAI, Anthropic, Google Cloud, AWS, and 50+ other tools. New integrations are added weekly.",
  },
  {
    question: "How is my data protected?",
    answer: "We implement SOC 2 controls, SSO/SAML authentication, end-to-end encryption, and workspace-level permissions to keep your data secure.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>();

  return (
    <section className="w-full section-sm ">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center">Your questions, our answers
          </h2>
        </div>

        {/* Right: Accordion list */}
        <div className="w-full divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left bg-transparent outline-none transition-colors sm:py-6 cursor-pointer"
                >
                  <span className="text-base font-normal text-[#16181A] group-hover:text-[#6b6f72] sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center text-[#16181A] transition-transform duration-200 ${isOpen ? "rotate-45 text-[#16181A]" : ""
                      }`}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-6" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-[#6b6f72] sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// ============================================================
// CTA
// ============================================================
function Cta() {
  return (
    <section className="container">
      <div className="section-sm text-center bg-gray-50 rounded-4xl">
        <h2 className="mx-auto">Ready to ship faster?</h2>
        <p className="text-secondary mx-auto mt-4 text-lg">
          Join thousands of developers building with AI.
        </p>
        <div className="mt-8">
          <a href="/signup" className="btn btn-primary btn-large">Get started for free</a>
          <p className="text-muted text-sm mt-3">No credit card required</p>
        </div>
      </div>
    </section>
  );
}
// ============================================================
// Composed homepage
// ============================================================
export {
  WhatWillYouBuild,
  LogoMarquee,
  PoweredByRivinity,
  WhyRivinity,
  ResearchSection,
  TestimonialsSection,
  FaqSection,
  Cta,
};

export default function HomePage() {
  return (
    <div className="w-full">
      <WhatWillYouBuild />
      <LogoMarquee />
      <AIBentoFeatures />
      <WhyRivinity />
      <PoweredByRivinity />
      <ResearchSection />
      <TestimonialsSection />
      <FaqSection />
      <Cta />
    </div>
  );
}