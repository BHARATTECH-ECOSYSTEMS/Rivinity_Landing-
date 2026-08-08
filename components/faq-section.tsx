"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do you offer volume discounts?",
    answer: "Yes. Discounts apply automatically across all your titles.",
  },
  {
    question: "What if I have multiple games?",
    answer: "Each title is billed separately, but usage pools together toward volume discounts.",
  },
  {
    question: "Are there hidden fees?",
    answer: "No. The price you see on your plan is the price you pay — no setup or overage surprises.",
  },
  {
    question: "How long does setup take?",
    answer: "Most teams are live within a day. Our onboarding guide walks you through every step.",
  },
  {
    question: "Can I start below 10k DAU?",
    answer: "Yes, every plan works from day one — you can upgrade as your daily active users grow.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-w-screen px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16 mb-15">
      <div className="mx-auto grid w-full max-w-330 grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        {/* Left: title */}
        <div>
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#16181A] sm:text-5xl lg:ml-4 lg:text-6xl">
            FAQ<span className="italic text-[#E9602F]">s</span>
          </h2>
        </div>

        {/* Right: accordion */}
        <div className="overflow-hidden rounded-2xl bg-[#FAFAFA]">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full appearance-none items-center justify-between gap-4 border-0 bg-transparent px-4 py-4 text-left outline-none transition-colors sm:gap-6 sm:px-6 sm:py-5 lg:px-8 lg:py-6"
                >
                  <span className="text-base font-semibold text-[#16181A] transition-colors group-hover:text-[#9a9d9a] sm:text-lg lg:text-xl">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#16181A] transition-all duration-200 group-hover:text-[#9a9d9a] sm:h-7 sm:w-7 ${
                      isOpen ? "rotate-45 text-[#E9602F] group-hover:text-[#E9602F]" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:h-4.5 sm:w-4.5">
                      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-relaxed text-[#6b6f72] sm:px-6 sm:pb-5 sm:text-base lg:px-8 lg:pb-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}