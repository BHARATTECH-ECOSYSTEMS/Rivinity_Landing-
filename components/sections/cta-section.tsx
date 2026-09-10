"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAuthModal } from "@/components/auth/auth-context";

export interface CtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onClick?: () => void;
  primaryText?: string;
  primaryHref?: string;
  onPrimaryClick?: () => void;
  secondaryText?: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  badge?: string;
  note?: string;
  variant?: "landing" | "subpage";
  className?: string;
}

export function CtaSection({
  title = "Ready to ship production AI software?",
  description = "Join engineering teams deploying sub-50ms model routing, persistent canvas memory, and autonomous agents on Rivinity.",
  buttonText = "Start Building",
  buttonHref,
  onClick,
  primaryText,
  primaryHref,
  onPrimaryClick,
  secondaryText = "Contact Us",
  secondaryHref = "/contact",
  onSecondaryClick,
  note,
  variant = "subpage",
  className,
}: CtaSectionProps) {
  const { openAuth } = useAuthModal();

  const mainText = primaryText || buttonText || "Start Building";
  const mainHref = primaryHref || buttonHref || "/signup";
  const handlePrimary = onPrimaryClick || onClick;

  const isAuthLink =
    !mainHref ||
    mainHref === "/signup" ||
    mainHref === "/login" ||
    mainHref.startsWith("/signup?") ||
    mainHref.startsWith("/login?");

  const executePrimary = () => {
    if (handlePrimary) {
      handlePrimary();
    } else if (isAuthLink) {
      openAuth(mainHref?.includes("login") ? "login" : "signup");
    }
  };

  const handleAction = () => {
    if (onClick) {
      onClick();
    } else {
      openAuth(buttonHref?.includes("login") ? "login" : "signup");
    }
  };

  // Landing Page Variant (Logo-Inspired Multi-Stop Fluid Gradient Glow + Glassmorphism)
  if (variant === "landing") {
  return (
      <section className={className || "section relative overflow-hidden py-12 sm:py-16"}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl sm:rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_20px_60px_-15px_rgba(236,72,153,0.12),0_15px_40px_-10px_rgba(139,92,246,0.1),0_0_0_1px_rgba(255,255,255,0.9)_inset] p-8 sm:p-14 md:p-16 text-center overflow-hidden">
            {/* Logo Gradient Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FD881F]/10 via-[#EC4899]/10 to-[#8B5CF6]/15 pointer-events-none" />

            {/* Amoeba 1: Top-Right Fluid Violet / Purple Glow (Logo Top / Top-Right) */}
            <motion.div
              animate={{
                x: [0, 45, -35, 0],
                y: [0, -35, 25, 0],
                scale: [1, 1.2, 0.95, 1],
                borderRadius: [
                  "40% 60% 70% 30% / 40% 50% 60% 50%",
                  "60% 40% 30% 70% / 50% 30% 70% 40%",
                  "50% 60% 40% 60% / 60% 40% 50% 50%",
                  "40% 60% 70% 30% / 40% 50% 60% 50%",
                ],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-14 -right-14 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-bl from-[#8B5CF6]/55 via-[#A855F7]/45 to-[#C084FC]/35 blur-3xl pointer-events-none"
            />

            {/* Amoeba 2: Bottom-Left Fluid Vibrant Orange Glow (Logo Bottom / Bottom-Left) */}
            <motion.div
              animate={{
                x: [0, -45, 35, 0],
                y: [0, 30, -25, 0],
                scale: [0.95, 1.2, 1, 0.95],
                borderRadius: [
                  "60% 40% 30% 70% / 50% 30% 70% 40%",
                  "40% 60% 70% 30% / 40% 50% 60% 50%",
                  "50% 60% 40% 60% / 60% 40% 50% 50%",
                  "60% 40% 30% 70% / 50% 30% 70% 40%",
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-14 -left-14 w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-tr from-[#FD881F]/55 via-[#FF6A00]/45 to-[#FFA559]/35 blur-3xl pointer-events-none"
            />

            {/* Amoeba 3: Middle Pink / Rose Organic Glow (Logo Mid Pink) */}
            <motion.div
              animate={{
                scale: [1, 1.25, 0.95, 1],
                x: [0, 25, -25, 0],
                y: [0, -20, 20, 0],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-72 sm:h-80 bg-gradient-to-r from-[#EC4899]/40 via-[#F472B6]/35 to-[#E879F9]/30 rounded-full blur-3xl pointer-events-none"
            />

            {/* Content Layer */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a] leading-tight">
            {title}
          </h2>

          {description && (
                <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
          )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isAuthLink && buttonHref ? (
                  <Link
                    href={buttonHref}
                    style={{ color: "#ffffff" }}
                    className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-full bg-[#0f172a] hover:bg-slate-800 !text-white text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group font-semibold text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
                  >
                    <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>{buttonText || "Start Building"}</span>
                    <ArrowUpRight className="w-4 h-4 !text-white text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                  </Link>
                ) : (
              <button
                type="button"
                    onClick={handleAction}
                    style={{ color: "#ffffff" }}
                    className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-full bg-[#0f172a] hover:bg-slate-800 !text-white text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group font-semibold text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
              >
                    <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>{buttonText || "Start Building"}</span>
                    <ArrowUpRight className="w-4 h-4 !text-white text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
              </button>
                )}

              <Link
                  href="/docs"
                  className="w-full sm:w-auto min-h-[44px] px-7 py-3 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all font-medium text-sm flex items-center justify-center gap-2 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
              >
                  <span>View Documentation</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
              </div>

              <div className="text-xs text-slate-500 pt-1 font-mono">
                14-day free trial • No credit card required • SOC 2 & GDPR Ready
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Sub-pages Variant (Clean, modern, minimal bg-gray-50 matching landing-page scale)
  return (
    <section className={className || "py-12 sm:py-16 md:py-20"}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gray-50 border border-slate-200/90 shadow-xs p-8 sm:p-14 md:p-16 text-center overflow-hidden flex flex-col items-center justify-center">


          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-2xl leading-tight">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto mb-8">
              {description}
            </p>
          )}

          {/* Two Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            {/* 1. Black Primary Button */}
            {handlePrimary || isAuthLink ? (
              <button
                type="button"
                onClick={executePrimary}
                style={{ color: "#ffffff" }}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#0f172a] hover:bg-slate-800 !text-white text-white text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2"
              >
                <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>{mainText}</span>
                <ArrowUpRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
              </button>
            ) : (
              <Link
                href={mainHref}
                style={{ color: "#ffffff" }}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#0f172a] hover:bg-slate-800 !text-white text-white text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2"
              >
                <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>{mainText}</span>
                <ArrowUpRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
              </Link>
            )}

            {/* 2. White Secondary Button with Border */}
            {secondaryText && (
              onSecondaryClick ? (
                <button
                  type="button"
                  onClick={onSecondaryClick}
                  style={{ color: "#1e293b" }}
                  className="w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-xl sm:rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 !text-slate-800 text-slate-800 text-sm font-semibold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  <span className="!text-slate-800 text-slate-800 font-semibold" style={{ color: "#1e293b" }}>{secondaryText}</span>
                  <ArrowUpRight className="w-4 h-4 !text-slate-500 text-slate-500 shrink-0" style={{ color: "#64748b", stroke: "#64748b" }} />
                </button>
              ) : (
                <Link
                  href={secondaryHref || "/contact"}
                  style={{ color: "#1e293b" }}
                  className="w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-xl sm:rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 !text-slate-800 text-slate-800 text-sm font-semibold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  <span className="!text-slate-800 text-slate-800 font-semibold" style={{ color: "#1e293b" }}>{secondaryText}</span>
                  <ArrowUpRight className="w-4 h-4 !text-slate-500 text-slate-500 shrink-0" style={{ color: "#64748b", stroke: "#64748b" }} />
                </Link>
              )
            )}
          </div>

          {/* Optional Footer Note */}
          {note && (
            <p className="mt-5 text-xs text-slate-500 font-normal">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
