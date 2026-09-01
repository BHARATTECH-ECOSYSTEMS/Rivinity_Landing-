"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Zap,
  Cpu,
  Fingerprint,
  PenTool,
  Sliders,
  Sparkles,
} from "lucide-react";

interface BentoFeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
  accentRgb: string;
  colSpan?: string;
}

const BENTO_ITEMS: BentoFeatureItem[] = [
  {
    id: "speed",
    icon: Zap,
    title: "Sub-50ms Routing",
    description:
      "Intelligently routes every prompt to the most cost-effective and accurate model without perceptual delay.",
    accent: "#F97316",
    accentRgb: "249, 115, 22",
  },
  {
    id: "power",
    icon: Cpu,
    title: "Autonomous Agent Swarms",
    description:
      "Deploy self-healing agents that execute multi-step tools, run sandboxed code, and coordinate tasks in parallel.",
    accent: "#7C3AED",
    accentRgb: "124, 58, 237",
  },
  {
    id: "security",
    icon: Fingerprint,
    title: "Enterprise Guardrails",
    description:
      "Real-time PII redaction, prompt injection defense, and automated compliance auditing for every single token.",
    accent: "#10B981",
    accentRgb: "16, 185, 129",
  },
  {
    id: "customization",
    icon: PenTool,
    title: "Shared Canvas Memory",
    description:
      "Context, assets, and decisions persist across all studios and sessions without re-prompting or data loss.",
    accent: "#3B82F6",
    accentRgb: "59, 130, 246",
  },
  {
    id: "control",
    icon: Sliders,
    title: "Granular Token Telemetry",
    description:
      "Monitor token usage, latency bottlenecks, prompt regressions, and enforce workspace spend limits live.",
    accent: "#EC4899",
    accentRgb: "236, 72, 153",
  },
  {
    id: "ai-native",
    icon: Sparkles,
    title: "Built for Production AI",
    description:
      "Deploy full-stack applications and AI workflows to 280+ global edge locations with zero server maintenance.",
    accent: "#06B6D4",
    accentRgb: "6, 182, 212",
  },
];

/* ------------------------------------------------------------------ */
/* Mini Rivinity Geometric Star Logo Component                        */
/* ------------------------------------------------------------------ */
function MiniRivinityLogo({
  accentRgb,
  className,
}: {
  accentRgb: string;
  className?: string;
}) {
  const gradId = `mini-star-grad-${accentRgb.replace(/[\s,]/g, "-")}`;
  return (
    <svg
      viewBox="-120 -70 320 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={`rgb(${accentRgb})`} />
          <stop offset="60%" stopColor={`rgb(${accentRgb})`} stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <path
        d="M0 0C1.081-.402 2.161-.772 3.273-1.142 4.526-1.646 5.629-2.077 6.766-2.476L7.237-2.64 7.572-3.012C10.916-6.714 14.581-10.494 18.465-14.248 19.32-15.131 20.124-15.94 20.96-16.654 26.193-21.675 31.538-26.388 36.94-30.747 42.397-26.394 47.804-21.709 53.031-16.81L55.537-14.395C59.124-10.985 62.699-7.348 66.501-3.246L66.804-2.909C67.587-2.064 68.388-1.171 69.157-.278L69.867 .55 70.944 .383C72.138 .199 73.332 .013 74.554-.107H74.688L75.006-.18C80.17-.891 85.501-1.458 90.846-1.866L94.054-2.085C99.704-2.435 105.464-2.614 111.178-2.614 112.565-2.614 113.954-2.602 115.345-2.583 116.73 4.282 117.863 11.349 118.716 18.446 118.857 19.483 118.968 20.511 119.078 21.521L119.124 21.95C119.681 27.118 120.091 32.385 120.342 37.603 120.432 39.095 120.463 40.235 120.492 41.374L120.522 42.473 121.48 43.236C122.486 43.817 123.492 44.426 124.468 45.066L124.621 45.215 124.851 45.309C129.3 48.091 133.762 51.105 138.116 54.267 139.012 54.876 139.857 55.482 140.702 56.145 146.272 60.203 151.852 64.646 157.351 69.404 153.889 75.759 150.172 81.964 146.288 87.865 145.713 88.787 145.106 89.666 144.502 90.544 141.595 94.933 138.56 99.197 135.445 103.27L135.253 103.521 135.226 103.594C134.312 104.816 133.544 105.807 132.751 106.771L132.059 107.608 133.693 112.575C135.339 117.888 136.759 122.942 137.993 127.941 138.277 128.988 138.52 129.988 138.733 131.017 140.336 137.69 141.714 144.632 142.847 151.726 136.523 154.207 129.84 156.521 122.958 158.616 121.938 158.924 120.917 159.235 119.896 159.512 115 160.973 109.896 162.308 104.68 163.49L99.369 164.649 97.476 169.35 99.133 170.472 97.321 169.719C95.313 174.554 93.138 179.367 90.856 184.027 90.339 185.094 89.904 185.992 89.44 186.862 86.393 193.005 83 199.194 79.317 205.32 72.776 203.114 66.175 200.595 59.676 197.816 58.678 197.41 57.739 197.019 56.8 196.563 52.086 194.529 47.352 192.281 42.65 189.85L42.441 189.742 42.213 189.687C41.082 189.068 39.866 188.443 38.649 187.788L37.706 187.282 36.771 187.799C35.604 188.443 34.439 189.089 33.242 189.671L33.025 189.729 32.813 189.888C28.061 192.377 23.345 194.655 18.797 196.661 17.796 197.144 16.827 197.567 15.857 197.962 9.722 200.65 3.148 203.212-3.742 205.598-7.381 199.66-10.822 193.501-13.982 187.276-14.349 186.6-14.664 185.977-14.978 185.356L-15.497 184.335C-17.886 179.493-20.073 174.713-21.977 170.156L-22.016 169.999-22.14 169.798C-22.671 168.552-23.2 167.307-23.698 166.06L-24.096 165.063-25.152 164.862C-26.446 164.615-27.739 164.337-29.032 164.031L-29.256 163.977H-29.486C-34.39 162.867-39.484 161.586-44.623 160.118L-47.762 159.229C-54.539 157.209-61.387 154.879-68.107 152.306-67.022 145.274-65.652 138.267-64.029 131.452-63.862 130.651-63.677 129.907-63.495 129.173L-63.276 128.281C-61.998 123.113-60.548 117.941-58.967 112.919L-57.428 108.037-58.084 107.227C-58.856 106.269-59.597 105.313-60.337 104.324L-60.609 103.987C-63.717 99.961-66.71 95.813-69.758 91.306-70.467 90.339-71.067 89.404-71.672 88.438-75.549 82.621-79.254 76.528-82.726 70.266-77.472 65.642-71.933 61.149-66.242 56.896-65.378 56.248-64.518 55.602-63.627 54.985-59.222 51.764-54.799 48.739-50.435 45.963L-50.147 45.782C-49.139 45.108-48.101 44.468-47.062 43.857L-46.097 43.288V42.167C-46.097 41.004-46.037 39.871-45.978 38.71L-45.966 38.501-45.995 38.199C-45.754 32.901-45.376 27.666-44.847 22.504-44.752 21.333-44.631 20.168-44.476 19.005-43.669 11.824-42.585 4.779-41.249-1.997-39.141-2.046-37.039-2.071-34.939-2.071-29.9-2.071-24.874-1.928-19.998-1.644-18.81-1.581-17.63-1.518-16.449-1.426-11.514-1.1-6.446-.6-.933 .107L-.454 .169ZM35.731-58.996C30.483-55.246 25.214-51.17 19.626-46.537 10.966-39.325 2.75-31.655-4.809-23.723-14.89-24.761-25.074-25.286-35.098-25.286L-38.289-25.269C-45.261-25.206-52.1-24.895-58.611-24.349L-60.002-24.234-60.346-22.88C-62.09-16.043-63.541-9.354-64.66-2.997-66.664 7.936-68.061 19.109-68.808 30.216-78.066 36.476-87.005 43.295-95.389 50.5-100.329 54.677-105.234 59.178-110.377 64.253L-111.369 65.232-110.772 66.491C-107.961 72.418-104.87 78.311-101.323 84.504-95.872 94.132-89.756 103.59-83.136 112.622-86.213 123.4-88.693 134.393-90.505 145.314-91.64 151.887-92.536 158.664-93.169 165.443L-93.297 166.834-92.025 167.41C-86.022 170.137-79.865 172.676-73.207 175.174-62.692 179.081-51.785 182.436-40.768 185.151-36.275 195.157-31.111 205.073-25.411 214.632-21.995 220.422-18.293 226.193-14.415 231.777L-13.619 232.923-12.276 232.547C-5.589 230.683 .941 228.592 7.135 226.331 17.66 222.576 27.963 218.213 37.76 213.362 47.651 218.171 58.005 222.472 68.553 226.153 74.941 228.408 81.477 230.457 87.974 232.237L89.321 232.605 90.113 231.453C93.945 225.862 97.616 220.06 101.019 214.207 106.679 204.55 111.779 194.592 116.188 184.605 126.903 181.888 137.596 178.537 147.985 174.638 154.335 172.245 160.647 169.61 166.749 166.811L168.02 166.226 167.884 164.835C167.205 157.88 166.297 151.076 165.188 144.611 163.327 133.655 160.838 122.736 157.79 112.142 164.379 103.065 170.509 93.458 176.017 83.571 179.269 77.844 182.415 71.762 185.364 65.51L185.962 64.244 184.96 63.267C180.064 58.499 174.977 53.891 169.838 49.572 161.268 42.324 152.279 35.578 143.109 29.509 142.298 18.408 140.842 7.237 138.773-3.715 137.575-10.132 136.083-16.796 134.337-23.518L133.985-24.878 132.584-24.982C125.93-25.476 119.085-25.742 112.239-25.773L110.651-25.777C99.94-25.777 89.223-25.175 78.787-23.985 71.193-31.885 62.902-39.515 54.135-46.673 48.929-50.988 43.497-55.141 37.999-59.005L36.861-59.804Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Accent Grid Canvas with Animated Logos on Top-Right & White Text BG*/
/* ------------------------------------------------------------------ */
function AccentGridCanvas({
  accentRgb,
  isHovered,
  index,
}: {
  accentRgb: string;
  isHovered: boolean;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  // Pre-aligned grid positions concentrated in the top-right area
  const movingBlocks = [
    { row: 0, col: 1, delay: 0 },
    { row: 1, col: 3, delay: 0.7 },
    { row: 2, col: 2, delay: 1.4 },
    { row: 0, col: 4, delay: 0.4 },
    { row: 2, col: 5, delay: 1.1 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-3xl"
    >
      {/* Accent-Colored Grid Lines (Visible in Top-Right) */}
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`accent-grid-${index}`}
            width={28}
            height={28}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke={`rgba(${accentRgb}, 0.28)`}
              strokeWidth="1.2"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#accent-grid-${index})`}
          className="transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0.8,
            maskImage: "radial-gradient(circle at 100% 0%, black 50%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(circle at 100% 0%, black 50%, transparent 85%)",
          }}
        />
      </svg>

      {/* Animated Moving Rivinity Logos (Replacing the square boxes) */}
      {movingBlocks.map((block, i) => (
        <motion.div
          key={i}
          animate={
            isHovered
              ? {
                opacity: [0.45, 1, 0.45],
                scale: [0.95, 1.25, 0.95],
                rotate: [0, 180, 360],
                x: [0, (i % 2 === 0 ? 28 : -28), 0],
                y: [0, (i % 3 === 0 ? -28 : 28), 0],
              }
              : {
                opacity: [0.35, 0.7, 0.35],
                scale: [0.85, 1, 0.85],
                rotate: [0, 90, 180],
                x: 0,
                y: 0,
              }
          }
          transition={{
            duration: isHovered ? 2.8 + i * 0.4 : 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: block.delay,
          }}
          className="absolute w-[28px] h-[28px] flex items-center justify-center pointer-events-none"
          style={{
            top: `${block.row * 28}px`,
            right: `${block.col * 28}px`,
          }}
        >
          <MiniRivinityLogo accentRgb={accentRgb} className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.div>
      ))}

      {/* Mouse Radial Accent Glow */}
      <motion.div
        className="absolute w-56 h-56 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 blur-2xl pointer-events-none"
        style={{
          left: smoothX,
          top: smoothY,
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(circle, rgba(${accentRgb}, 0.5) 0%, rgba(${accentRgb}, 0.12) 50%, transparent 75%)`,
        }}
      />

      {/* Pure White Radial Gradient Mask over Text & Icon Area */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 0% 100%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 45%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0) 80%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive Spaced Bento Card Component                            */
/* ------------------------------------------------------------------ */
function BentoCard({
  item,
  index,
}: {
  item: BentoFeatureItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl border border-dashed border-gray-300/90 p-8 sm:p-9 flex flex-col justify-between min-h-[260px] shadow-xs hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.06)] hover:border-gray-400 transition-all duration-300 overflow-hidden"
    >
      {/* Accent Grid Lines + Moving Blocks (Top Right) & Solid White Mask (Bottom Left) */}
      <AccentGridCanvas
        accentRgb={item.accentRgb}
        isHovered={isHovered}
        index={index}
      />

      {/* Top Left Icon (Clean Outline Style on Solid White) */}
      <div className="relative z-10 mb-12">
        <div className="w-9 h-9 flex items-center justify-start text-slate-800 transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-7 h-7 stroke-[1.75]" />
        </div>
      </div>

      {/* Bottom Left Content: Title & Description on Solid White */}
      <div className="relative z-10 space-y-2 max-w-[280px] sm:max-w-[320px]">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A]">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed font-normal">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Spaced Bento Grid Section Component                                 */
/* ------------------------------------------------------------------ */
export function BentoGrid() {
  return (
    <section className="section py-16 md:py-24 bg-white" id="features">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
            Built for power users, engineered for scale
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto font-normal">
            Everything you need to orchestrate models, deploy autonomous agents, and maintain persistent memory across your entire stack.
          </p>
        </motion.div>

        {/* Spaced Bento Grid with Gap */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {BENTO_ITEMS.map((item, idx) => (
            <BentoCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
