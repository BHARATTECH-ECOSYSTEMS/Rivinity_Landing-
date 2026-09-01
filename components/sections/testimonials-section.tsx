"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface MinimalTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stats: string;
}

const MINIMAL_TESTIMONIALS: MinimalTestimonial[] = [
  {
    id: "1",
    quote:
      "Rivinity replaced four separate LLM orchestration layers with one unified runtime. Our p99 inference latency dropped from 320ms to 45ms overnight.",
    name: "Alexandre Moreau",
    role: "VP of Engineering",
    company: "Synthesia Core",
    avatar: "AM",
    stats: "45ms p99 Latency",
  },
  {
    id: "2",
    quote:
      "The shared canvas memory is unmatched. Autonomous agent swarms maintain active context across sessions without hallucinating state or dropping tools.",
    name: "Elena Rostova",
    role: "Co-Founder & CTO",
    company: "Aether Dynamics (YC W24)",
    avatar: "ER",
    stats: "4x Faster Shipping",
  },
  {
    id: "3",
    quote:
      "Deterministic guardrails and automated PII redaction passed our SOC 2 Type II audit on day one. It cut our compliance review time by two months.",
    name: "Devon Vance",
    role: "Principal AI Architect",
    company: "OmniGrid Financial",
    avatar: "DV",
    stats: "100% SOC 2 Compliant",
  },
  {
    id: "4",
    quote:
      "Pushing full-stack multi-agent workflows live to 280+ edge locations with zero server maintenance saved our team over 20 hours of DevOps every week.",
    name: "Marcus Thorne",
    role: "Staff Platform Engineer",
    company: "HyperScale Cloud",
    avatar: "MT",
    stats: "280+ Edge Nodes",
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
    <section className="section-sm container relative w-full py-20 sm:py-28 bg-gray-50 rounded-4xl overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Minimal Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Engineered for teams that move fast
          </h2>
        </div>

        {/* Frosted Glassmorphism Master Card */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] p-8 sm:p-14 overflow-hidden">
          {/* Subtle Background Glass Reflection Accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <Quote className="absolute top-6 right-6 w-16 h-16 text-gray-200/40 pointer-events-none select-none" />

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
                <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-normal leading-relaxed tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info & Verified Stat */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-gray-200/60">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center text-xs font-extrabold shadow-sm ring-2 ring-white/80 shrink-0">
                      {current.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {current.name}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {current.role} • <span className="text-gray-700 font-semibold">{current.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center self-start sm:self-auto px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-xs font-semibold text-gray-800 shadow-2xs">
                    {current.stats}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200/60 mt-6">
            {/* Step Indicators */}
            <div className="flex items-center gap-2">
              {MINIMAL_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx
                    ? "w-8 bg-gray-900 shadow-xs"
                    : "w-2 bg-gray-300/80 hover:bg-gray-500"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows with Glass Hover */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-200/90 bg-white/80 hover:bg-white text-gray-700 active:scale-95 transition-all shadow-2xs backdrop-blur-md cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-200/90 bg-white/80 hover:bg-white text-gray-700 active:scale-95 transition-all shadow-2xs backdrop-blur-md cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;