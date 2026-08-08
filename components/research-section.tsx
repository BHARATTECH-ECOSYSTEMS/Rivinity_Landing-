"use client";

import { useRef, useState, useCallback } from "react";
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

const RECOGNIZED_BY = ["ICLR", "ICML", "NeurIPS", "MLSys"];

function useTypeOnce(word: string, speed = 55) {
  const [text, setText] = useState("");
  const ref = useRef(false);

  if (!ref.current) {
    ref.current = true;
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setText(word.slice(0, i));
        if (i >= word.length) clearInterval(interval);
      }, speed);
    }, 0);
  }

  return text;
}

function ResearchCardItem({ card }: { card: ResearchCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={card.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative shrink-0 w-66 h-85 snap-start rounded-2xl border border-[#EDEAE4] bg-white p-6 flex flex-col justify-between overflow-hidden shadow-[0_2px_10px_rgba(17,26,74,0.04)] transition-shadow hover:shadow-[0_10px_30px_rgba(255,60,0,0.10)]"
    >
      {/* Background image, fades in on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            "linear-gradient(160deg, #FFF3EC 0%, #FFE4D3 100%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center rounded-full border border-[#FF7A1A]/30 bg-[#FFF3EC] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-[#FF7A1A]">
          {card.tag}
        </span>
        <p className="text-[17px] leading-[1.35] font-medium text-[#1F2024]">
          {card.title}
        </p>
      </div>

      <div className="relative z-10 h-6">
        {/* Authors: visible by default, fade out on hover */}
        <p
          className="absolute inset-0 text-[13px] text-[#8E8E93] transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {card.authors}
        </p>

        {/* Read More button: slides up + fades in on hover */}
        <div
          className="absolute inset-0 flex items-center gap-1.5 text-[13px] font-medium text-[#FF7A1A] transition-all duration-300"
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
    const cardWidth = 264 + 16; // card width + gap
    el.scrollBy({ left: direction * cardWidth * 2, behavior: "smooth" });
  }, []);

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto w-full max-w-290 px-5">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="mb-3 text-[33px] font-medium uppercase tracking-wide ">
              {eyebrow}
              <span className="inline-block w-px h-3 bg-[#FF7A1A] ml-0.5 align-middle animate-pulse" />
            </p>
            <p className="text-[18px] text-[#6B6D74]">
              Foundational systems research for production AI.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="w-10 h-10 rounded-full border border-[#EDEAE4] bg-white flex items-center justify-center text-[#1F2024] hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 hover:text-[#FF7A1A] transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="w-10 h-10 rounded-full border border-[#EDEAE4] bg-white flex items-center justify-center text-[#1F2024] hover:bg-[#FFF3EC] hover:border-[#FF7A1A]/30 hover:text-[#FF7A1A] transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Card rail */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-5 px-5"
          style={{ scrollbarWidth: "none" }}
        >
          {RESEARCH_CARDS.map((card) => (
            <ResearchCardItem key={card.href} card={card} />
          ))}
        </div>

        {/* Recognized-by logos row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 ">
          <p className="text-[14px] uppercase tracking-wide shrink-0">
            recognized by
          </p>
          <ul className="flex items-center gap-8 flex-wrap justify-center sm:justify-start list-none p-0 m-0">
            {RECOGNIZED_BY.map((name, i) => (
              <li
                key={name}
                className={`relative pr-8 text-[15px] font-medium text-[#1F2024]/50 ${
                  i !== RECOGNIZED_BY.length - 1
                    ? "after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-px after:bg-[#1F2024]/10"
                    : ""
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}