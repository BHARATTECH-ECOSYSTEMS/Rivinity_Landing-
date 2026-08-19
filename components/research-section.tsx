"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      className="group relative shrink-0 w-[240px] sm:w-[264px] h-[320px] sm:h-[340px] snap-start rounded-2xl border border-[#EDEAE4] bg-white p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_2px_10px_rgba(17,26,74,0.04)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,60,0,0.10)]"
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

export default function ResearchSection() {
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
    <section className="w-full py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-3xl">
            <p className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-[33px] font-medium uppercase tracking-wide leading-tight text-[#1F2024]">
              {eyebrow}
            </p>
            <p className="text-sm sm:text-base md:text-[18px] text-[#6B6D74]">
              Foundational systems research for production AI.
            </p>
          </div>

          {/* Navigation Controls (Visible on all screens) */}
          <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t border-[#EDEAE4] md:border-none">
            <span className="text-xs text-[#8E8E93] md:hidden">Scroll to explore</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollByCards(-1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#EDEAE4] bg-white flex items-center justify-center text-[#1F2024] hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 hover:text-[#FF7A1A] active:scale-95 transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollByCards(1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#EDEAE4] bg-white flex items-center justify-center text-[#1F2024] hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 hover:text-[#FF7A1A] active:scale-95 transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Card rail */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {RESEARCH_CARDS.map((card) => (
            <ResearchCardItem key={card.href} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}