"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

// Copy tied to what Rivinity actually does, not generic SaaS praise.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced four separate dashboards with one Rivinity workspace. Onboarding a new analyst used to take a week — now it takes an afternoon.",
    name: "Priya Sharma",
    role: "Head of Data",
    company: "QuantumLeap",
    initials: "PS",
  },
  {
    quote:
      "The forecasting model caught a demand shift two weeks before our old process would have. That alone paid for the subscription for the year.",
    name: "Marcus Johnson",
    role: "VP Operations",
    company: "Synergy Corp",
    initials: "MJ",
  },
  {
    quote:
      "Support doesn't hand you off to a bot. I've had the same engineer answer three tickets in a row, and he already knew our setup each time.",
    name: "Isabella Rossi",
    role: "Client Success Lead",
    company: "Horizon",
    initials: "IR",
  },
  {
    quote:
      "Every release actually ships something we asked for. It's rare to feel like a roadmap is being written with your team in the room.",
    name: "Kenji Tanaka",
    role: "Staff Engineer",
    company: "CodeCrafters",
    initials: "KT",
  },
  {
    quote:
      "We cut project delivery time by almost a third in the first quarter. Finance noticed before I even had to bring it up.",
    name: "Fatima Al-Jamil",
    role: "CFO",
    company: "Apex Financial",
    initials: "FJ",
  },
];

function useCycler(length: number, autoplayMs: number | null) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    if (!autoplayMs) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, next]);

  return { active, next, prev, setActive };
}

function InitialsCard({
  testimonial,
  isActive,
  index,
  active,
  total,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  index: number;
  active: number;
  total: number;
}) {
  // Deterministic-ish rotation per card index, avoids Math.random() re-triggering on rerender
  const rotations = [-6, 4, -3, 7, -5];
  const rotate = rotations[index % rotations.length];

  return (
    <motion.div
      key={testimonial.name}
      initial={{ opacity: 0, scale: 0.92, y: 40, rotate: `${rotate}deg` }}
      animate={{
        opacity: isActive ? 1 : 0.35,
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 18,
        zIndex: isActive ? total : total - Math.abs(index - active),
        rotate: isActive ? "0deg" : `${rotate}deg`,
      }}
      exit={{ opacity: 0, scale: 0.92, y: -40 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 origin-bottom"
    >
      <div className="h-full w-full rounded-[28px] bg-white border border-[#F0EAE3] shadow-[0_20px_50px_rgba(31,32,36,0.10)] flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-20 h-20 rounded-full bg-[#FFF3EC] border border-[#FF7A1A]/25 flex items-center justify-center">
          <span className="text-2xl font-semibold text-[#FF7A1A]">
            {testimonial.initials}
          </span>
        </div>
        <Quote className="w-6 h-6 text-[#FF7A1A]/30" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}

function AnimatedTestimonials({
  testimonials,
  autoplayMs = 10000,
}: {
  testimonials: Testimonial[];
  autoplayMs?: number | null;
}) {
  const { active, next, prev, setActive } = useCycler(
    testimonials.length,
    autoplayMs,
  );
  const current = testimonials[active];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 items-center">
        {/* Card stack */}
        <div className="flex items-center justify-center">
          <div className="relative h-100 w-full max-w-md">
            <AnimatePresence>
              {testimonials.map((t, i) => (
                <InitialsCard
                  key={t.name}
                  testimonial={t}
                  isActive={i === active}
                  index={i}
                  active={active}
                  total={testimonials.length}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Quote + controls */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="min-h-64"
            >
              <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1F2024]">
                {current.name}
              </h3>
              <p className="mt-1 text-[14px] text-[#8E8E93]">
                {current.role}, {current.company}
              </p>
              <p className="mt-6 text-[18px] leading-[1.55] text-[#3C3C43]">
                “{current.quote}”
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4 pt-10">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#EDEAE4] bg-white transition-colors hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]/40"
            >
              <ArrowLeft className="h-4 w-4 text-[#1F2024] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:text-[#FF7A1A]" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#EDEAE4] bg-white transition-colors hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]/40"
            >
              <ArrowRight className="h-4 w-4 text-[#1F2024] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#FF7A1A]" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 ml-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active
                      ? "w-6 bg-[#FF7A1A]"
                      : "w-1.5 bg-[#1F2024]/15 hover:bg-[#1F2024]/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="relative  w-full overflow-hidden font-[Inter]">
      {/* Faint dot-grid background, matches the pattern used elsewhere on the site */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(207,208,216) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 75%)",
        }}
      />

      <section className="relative z-10 flex flex-col items-center pt-4 pb-2 md:pt-10 md:pb-28">
        {/* <div className="text-cente">
          <span className="inline-flex items-center rounded-full border border-[#FF7A1A]/25 bg-[#FFF3EC] px-3 py-1 text-[12px] font-medium uppercase tracking-wide text-[#FF7A1A]">
            Customer stories
          </span>
        </div> */}

        <h1 className="text-center text-[36px] md:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] text-[#1F2024] max-w-4xl">
          Teams run on Rivinity,{" "}
          <span className="text-[#FF7A1A]">not around it</span>
        </h1>

        <p className="mt-2 text-center text-[16px] text-[#6B6D74] max-w-3xl px-6">
          Real feedback from the people who use it every day to plan, ship,
          and report faster.
        </p>

        <div className="mt-16 w-full">
          <AnimatedTestimonials testimonials={TESTIMONIALS} />
        </div>
      </section>
    </main>
  );
}