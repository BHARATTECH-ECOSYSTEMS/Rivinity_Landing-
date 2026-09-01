"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAuthModal } from "@/components/auth/auth-context";

export interface CtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onClick?: () => void;
  variant?: "landing" | "subpage";
  className?: string;
}

export function CtaSection({
  title = "Ready to ship production AI software?",
  description = "Join thousands of engineers orchestrating multi-agent systems, persistent canvas memory, and real-time inference on Rivinity.",
  buttonText = "Get Started for Free",
  buttonHref,
  onClick,
  variant = "subpage",
  className,
}: CtaSectionProps) {
  const { openAuth } = useAuthModal();

  const handleAction = () => {
    if (onClick) {
      onClick();
    } else if (!buttonHref) {
      openAuth("signup");
    }
  };

  // Landing Page Variant (Logo-Inspired Multi-Stop Fluid Gradient Glow + Glassmorphism)
  if (variant === "landing") {
    return (
      <section className={className || "relative w-full py-20 sm:py-28 overflow-hidden"}>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {title}
              </h2>

              {description && (
                <p className="text-sm sm:text-base md:text-lg text-gray-600 font-normal leading-relaxed max-w-xl mx-auto">
                  {description}
                </p>
              )}

              <div className="pt-2 flex items-center justify-center">
                {buttonHref ? (
                  <Link
                    href={buttonHref}
                    className="w-full sm:w-auto px-9 py-4 rounded-full bg-white hover:bg-white/95 border border-white/80 shadow-[0_10px_30px_-5px_rgba(236,72,153,0.15),0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_-5px_rgba(236,72,153,0.25),0_0_20px_rgba(139,92,246,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group text-black font-extrabold"
                  >
                    <span className="font-extrabold tracking-wider uppercase text-xs sm:text-sm text-black">
                      {buttonText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleAction}
                    className="w-full sm:w-auto px-9 py-4 rounded-full bg-white hover:bg-white/95 border border-white/80 shadow-[0_10px_30px_-5px_rgba(236,72,153,0.15),0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_-5px_rgba(236,72,153,0.25),0_0_20px_rgba(139,92,246,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group text-black font-extrabold"
                  >
                    <span className="font-extrabold tracking-wider uppercase text-xs sm:text-sm text-black">
                      {buttonText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Sub-pages Variant (Clean Light Gray Background with Logo Gradient Accents)
  return (
    <section className={className || "w-full py-16 sm:py-20 bg-[#F7F7F8] border-t border-gray-200/80"}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-sm p-8 sm:p-12 md:p-14 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1A1A1A]">
              {title}
            </h2>

            {description && (
              <p className="text-sm sm:text-base text-[#6B7280] font-normal leading-relaxed max-w-xl mx-auto">
                {description}
              </p>
            )}

            <div className="pt-2 flex items-center justify-center">
              {buttonHref ? (
                <Link
                  href={buttonHref}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FD881F] via-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleAction}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FD881F] via-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
