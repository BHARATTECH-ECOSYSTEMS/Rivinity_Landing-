"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";

interface MinimalTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stats: string;
  linkedin: string;
  verified: boolean;
}

const MINIMAL_TESTIMONIALS: MinimalTestimonial[] = [
  {
    id: "1",
    quote:
      "Rivinity unified our multi-model routing into a single low-latency API layer. Automatically directing tasks to the optimal frontier model cut our monthly LLM inference budget by 58% while maintaining p99 under 50ms.",
    name: "Alexandre Moreau",
    role: "VP of Engineering",
    company: "Core AI Systems",
    avatar: "AM",
    stats: "58% Cost Reduction",
    linkedin: "https://linkedin.com",
    verified: true,
  },
  {
    id: "2",
    quote:
      "The shared persistent context cache eliminated session amnesia across our development tools. Autonomous agents maintain accurate architectural schemas and repository contracts without repetitive context prompting.",
    name: "Elena Rostova",
    role: "Head of Infrastructure",
    company: "Aether Dynamics (YC W24)",
    avatar: "ER",
    stats: "Zero Context Resets",
    linkedin: "https://linkedin.com",
    verified: true,
  },
  {
    id: "3",
    quote:
      "In-line PII redaction and deterministic guardrails met our enterprise security requirements out of the box. Having continuous SOC 2 Type II audit logging drastically accelerated our production security review.",
    name: "Devon Vance",
    role: "Principal Security Architect",
    company: "OmniGrid Technologies",
    avatar: "DV",
    stats: "SOC 2 Type II Compliant",
    linkedin: "https://linkedin.com",
    verified: true,
  },
  {
    id: "4",
    quote:
      "Deploying autonomous agent swarms across global edge locations with sub-second failover solved our high-availability challenges. We went from local scripts to production deployments in hours.",
    name: "Marcus Thorne",
    role: "Staff Platform Engineer",
    company: "HyperScale Cloud",
    avatar: "MT",
    stats: "Sub-50ms Routing",
    linkedin: "https://linkedin.com",
    verified: true,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % MINIMAL_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + MINIMAL_TESTIMONIALS.length) % MINIMAL_TESTIMONIALS.length
    );
  };

  const current = MINIMAL_TESTIMONIALS[currentIndex];

  return (
    <section className="section w-full py-12 sm:py-16" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl sm:rounded-[36px] bg-gray-50 border border-gray-100/80 p-6 sm:p-12 md:p-14 overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Minimal Header */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a] leading-tight">
                Engineered for teams that move fast
              </h2>
            </div>

        {/* Frosted Glassmorphism Master Card */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] p-8 sm:p-14 overflow-hidden">
          {/* Subtle Background Glass Reflection Accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-200/40 pointer-events-none select-none" />

          <div className="relative z-10 min-h-[220px] sm:min-h-[190px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Quote Text */}
                <p className="text-lg sm:text-xl md:text-2xl text-[#0f172a] font-normal leading-relaxed tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info & Verified Stat */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-200/60">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0f172a] to-slate-800 text-white flex items-center justify-center text-xs font-semibold shadow-xs ring-2 ring-white/80 shrink-0">
                      {current.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-[#0f172a]">
                          {current.name}
                        </span>
                        {current.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            Verified
                          </span>
                        )}
                        <a
                          href={current.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center"
                          aria-label={`LinkedIn profile for ${current.name}`}
                        >
                          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-xs text-slate-500 font-normal">
                        {current.role} at <span className="text-slate-700 font-medium">{current.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Outcome Highlight Pill */}
                  <div className="inline-flex items-center self-start sm:self-auto px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shrink-0 animate-pulse" />
                    {current.stats}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls: Dots Indicator & Prev/Next Arrows */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {MINIMAL_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${currentIndex === idx
                    ? "w-8 bg-[#FF6B00]"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows with Glass Hover and min 44px touch target */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200/90 bg-white/80 hover:bg-white text-slate-700 active:scale-95 transition-all shadow-2xs backdrop-blur-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200/90 bg-white/80 hover:bg-white text-slate-700 active:scale-95 transition-all shadow-2xs backdrop-blur-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default TestimonialsSection;