"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Who are RockFi's private advisors?",
    answer: "Our private advisors are seasoned wealth management and financial experts dedicated to curating custom investment strategies tailored to your long-term goals.",
  },
  {
    question: "What is the minimum purchase amount required to become a customer?",
    answer: "The minimum investment requirement varies depending on the specific portfolio model and tier you choose. Contact our team for precise details.",
  },
  {
    question: "What role does technology play in your support?",
    answer: "We leverage advanced AI portfolio tracking and automated insights combined with human expertise to give you real-time visibility and seamless support.",
  },
  {
    question: "What products/solutions does RockFi offer?",
    answer: "We offer private wealth advisory, custom portfolio tracking, and tailored investment solutions designed to optimize your financial growth.",
  },
  {
    question: "What happens if your goals change?",
    answer: "Your strategy evolves with you. You can schedule a consultation with your private advisor at any time to realign your portfolio with your new goals.",
  },
  {
    question: "How is your data protected?",
    answer: "We implement institutional-grade security, advanced encryption, and strict privacy protocols to ensure your financial and personal data remains secure.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16 items-start">
        {/* Left: Title & Badge */}
        <div className="flex flex-col items-start lg:sticky lg:top-10">
          
          <h2 className="font-serif text-4xl font-normal tracking-tight text-[#16181A] sm:text-5xl lg:text-6xl leading-[1.1]">
            Your questions,<br />
            <span className="text-[#16181A]">our answers</span>
          </h2>
        </div>

        {/* Right: Accordion list */}
        <div className="w-full divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left bg-transparent outline-none transition-colors sm:py-6 cursor-pointer"
                >
                  <span className="text-base font-normal text-[#16181A] group-hover:text-[#6b6f72] sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center text-[#16181A] transition-transform duration-200 ${
                      isOpen ? "rotate-45 text-[#16181A]" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-[#6b6f72] sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}