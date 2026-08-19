"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced four separate dashboards with one Rivinity workspace. Onboarding a new analyst used to take a week — now it takes an afternoon.",
    name: "Priya Sharma",
    role: "Head of Data",
    company: "QuantumLeap",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
  },
  {
    quote:
      "The forecasting model caught a demand shift two weeks before our old process would have. That alone paid for the subscription for the year.",
    name: "Marcus Johnson",
    role: "VP Operations",
    company: "Synergy Corp",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    quote:
      "Support doesn't hand you off to a bot. I've had the same engineer answer three tickets in a row, and he already knew our setup each time.",
    name: "Isabella Rossi",
    role: "Client Success Lead",
    company: "Horizon",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1000&q=80",
  },
  {
    quote:
      "Every release actually ships something we asked for. It's rare to feel like a roadmap is being written with your team in the room.",
    name: "Kenji Tanaka",
    role: "Staff Engineer",
    company: "CodeCrafters",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    quote:
      "We cut project delivery time by almost a third in the first quarter. Finance noticed before I even had to bring it up.",
    name: "Fatima Al-Jamil",
    role: "CFO",
    company: "Apex Financial",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80",
  },
];

function useTestimonialSlider(
  length: number,
  autoplayMs: number | null = 10000
) {
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

  return {
    active,
    next,
    previous,
    setActive,
  };
}

export default function TestimonialsPage() {
  const { active, next, previous, setActive } =
    useTestimonialSlider(TESTIMONIALS.length, 10000);

  const current = TESTIMONIALS[active];
  const nextIndex = (active + 1) % TESTIMONIALS.length;
  const nextTestimonial = TESTIMONIALS[nextIndex];

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* =========================================================
          DESKTOP (lg and up)
      ========================================================== */}
      <section className="hidden lg:block w-full py-20 px-10">
        <div
          className="mx-auto"
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "1360px",
            height: "520px",
            display: "grid",
            gridTemplateColumns: "18.5% 42.5% 36%",
            gridTemplateRows: "repeat(2, minmax(0, 1fr))",
            gap: "14px",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {/* LEFT TOP - STATIC BRANDING */}
          <div
            style={{ gridColumn: "1", gridRow: "1" }}
            className="rounded-[34px] border border-[#D8D4CE] bg-white p-6 xl:p-7 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-[#202228] text-[30px] xl:text-[32px] font-medium leading-[0.98] tracking-[-0.045em]">
                Trusted by
                <br />
                builders
              </h2>
              <p className="mt-6 text-[13px] xl:text-[14px] text-[#74767C]">
                Endorsed by innovators
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-[6px] w-[6px] rounded-full bg-[#202228]" />
              <span className="text-[10px] xl:text-[11px] font-medium tracking-[0.15em] text-[#9B9CA1]">
                RIVINITY
              </span>
            </div>
          </div>

          {/* LEFT BOTTOM - CURRENT TESTIMONIAL IMAGE */}
          <div
            style={{ gridColumn: "1", gridRow: "2" }}
            className="relative overflow-hidden rounded-[34px]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.05, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* CENTER - MAIN TESTIMONIAL TEXT */}
          <div
            style={{ gridColumn: "2", gridRow: "1 / span 2" }}
            className="relative overflow-hidden rounded-[38px] bg-white border border-[#D8D4CE]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col p-8 xl:p-10"
              >
                <div className="text-[42px] xl:text-[46px] font-serif leading-none text-[#202228]/40">
                  “
                </div>

                <div className="flex flex-1 items-center">
                  <p className="max-w-[500px] text-[25px] xl:text-[28px] font-normal leading-[1.15] tracking-[-0.045em] text-[#202228]">
                    {current.quote}
                  </p>
                </div>

                <div className="shrink-0 mt-auto">
                  <h3 className="text-[17px] xl:text-[18px] font-medium tracking-[-0.02em] text-[#202228]">
                    {current.name}
                  </h3>
                  <p className="mt-3 text-[13px] xl:text-[14px] text-[#77797E]">
                    {current.role}
                  </p>
                  <p className="mt-1 text-[13px] xl:text-[14px] text-[#77797E]">
                    {current.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - CONTROLS & NEXT IMAGE */}
          <div
            style={{ gridColumn: "3", gridRow: "1 / span 2" }}
            className="grid grid-cols-2 grid-rows-2 gap-[14px]"
          >
            <div />

            {/* NEXT BUTTON */}
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="group overflow-hidden rounded-[34px] bg-[#1F2228] p-6 xl:p-7 flex flex-col justify-end text-left transition-all duration-300 hover:bg-[#111317] hover:-translate-y-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#202228]"
            >
              <div className="flex items-end justify-between gap-3">
                <span className="text-[15px] xl:text-[16px] leading-[1.02] tracking-[-0.025em] text-white">
                  Next<br />Testimonial
                </span>
                <ArrowRight
                  className="h-5 w-5 xl:h-6 xl:w-6 shrink-0 text-white/90 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </div>
            </button>

            {/* PREVIOUS BUTTON */}
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="group overflow-hidden rounded-[34px] bg-[#1F2228] p-6 xl:p-7 flex items-end justify-between gap-3 text-left transition-all duration-300 hover:bg-[#111317] hover:-translate-y-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#202228]"
            >
              <ArrowLeft
                className="h-5 w-5 xl:h-6 xl:w-6 shrink-0 text-white/90 transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
              <span className="text-right text-[15px] xl:text-[16px] leading-[1.02] tracking-[-0.025em] text-white">
                Previous<br />Testimonial
              </span>
            </button>

            {/* NEXT TESTIMONIAL IMAGE */}
            <div className="relative overflow-hidden rounded-[34px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={nextTestimonial.image}
                  src={nextTestimonial.image}
                  alt={nextTestimonial.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE / TABLET (Hidden on lg and up)
      ========================================================== */}
      <section className="lg:hidden px-5 py-8 sm:px-8 bg-white">
        <div className="mx-auto flex max-w-[700px] flex-col gap-4">
          {/* Trust */}
          <div className="min-h-[230px] rounded-[32px] border border-[#D8D4CE] bg-white p-7 flex flex-col justify-between">
            <div>
              <h2 className="text-[30px] font-medium leading-[0.98] tracking-[-0.045em] text-[#202228]">
                Trusted by<br />builders
              </h2>
              <p className="mt-5 text-[14px] text-[#74767C]">Endorsed by innovators</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-[6px] w-[6px] rounded-full bg-[#202228]" />
              <span className="text-[11px] tracking-[0.15em] text-[#9B9CA1]">RIVINITY</span>
            </div>
          </div>

          {/* Main testimonial */}
          <div className="relative min-h-[500px] overflow-hidden rounded-[34px] bg-white border border-[#D8D4CE]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col p-7"
              >
                <div className="text-[45px] font-serif text-[#202228]/40">“</div>
                <div className="flex flex-1 items-center">
                  <p className="text-[26px] leading-[1.16] tracking-[-0.04em] text-[#202228]">
                    {current.quote}
                  </p>
                </div>
                <div>
                  <h3 className="text-[18px] font-medium text-[#202228]">{current.name}</h3>
                  <p className="mt-3 text-[14px] text-[#77797E]">{current.role}</p>
                  <p className="mt-1 text-[14px] text-[#77797E]">{current.company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[230px] overflow-hidden rounded-[30px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="relative h-[230px] overflow-hidden rounded-[30px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={nextTestimonial.image}
                  src={nextTestimonial.image}
                  alt={nextTestimonial.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={previous}
              className="min-h-[105px] rounded-[28px] bg-[#1F2228] p-5 flex items-end justify-between"
            >
              <ArrowLeft className="h-5 w-5 text-white/90" strokeWidth={1.5} />
              <span className="text-right text-[15px] leading-[1.05] text-white">
                Previous<br />Testimonial
              </span>
            </button>
            <button
              type="button"
              onClick={next}
              className="min-h-[105px] rounded-[28px] bg-[#1F2228] p-5 flex items-end justify-between"
            >
              <span className="text-left text-[15px] leading-[1.05] text-white">
                Next<br />Testimonial
              </span>
              <ArrowRight className="h-5 w-5 text-white/90" strokeWidth={1.5} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 py-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === index ? "w-7 bg-[#202228]" : "w-1.5 bg-[#202228]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}