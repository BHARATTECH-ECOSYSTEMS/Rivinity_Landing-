"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface FaqItem {
  question?: string;
  q?: string;
  answer?: string;
  a?: string;
}

export interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  id?: string;
  className?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How does the Intelligent Orchestrator choose models?",
    answer:
      "Our orchestrator analyzes your prompt complexity, required reasoning depth, and latency requirements to route to the optimal model— whether that's a fast lightweight model or a powerful reasoning engine.",
  },
  {
    question: "What file types can I upload for context memory?",
    answer:
      "You can upload PDFs, Word documents, code files, images, and spreadsheets. Rivinity extracts context and maintains it across all your sessions and studios.",
  },
  {
    question: "Is my data used to train models?",
    answer:
      "No. Your data is never used to train foundation models. We maintain strict data isolation and offer enterprise-grade privacy controls.",
  },
  {
    question: "Can I deploy apps built with Rivinity?",
    answer:
      "Yes. With one-click deploy, your apps go from local development to a globally distributed edge network in seconds.",
  },
  {
    question: "What integrations are supported?",
    answer:
      "Rivinity connects with GitHub, Vercel, OpenAI, Anthropic, Google Cloud, AWS, and 50+ other tools. New integrations are added weekly.",
  },
  {
    question: "How is my data protected?",
    answer:
      "We implement SOC 2 controls, SSO/SAML authentication, end-to-end encryption, and workspace-level permissions to keep your data secure.",
  },
];

export function FaqSection({
  title = "Your questions, our answers",
  subtitle = "Everything you need to know about getting started with Rivinity.",
  items = DEFAULT_FAQS,
  id = "faq",
  className = "w-full py-16 md:py-24 bg-white",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={className} id={id}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16181A]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-500 mt-3 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Accordion list with Staggered Entrance */}
        <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          {items.map((item, i) => {
            const questionText = item.question || item.q || "";
            const answerText = item.answer || item.a || "";
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={questionText + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left bg-transparent outline-none transition-colors sm:py-6 cursor-pointer"
                >
                  <span className="text-base font-semibold text-[#16181A] group-hover:text-[#FD881F] transition-colors sm:text-lg">
                    {questionText}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center text-[#16181A] transition-transform duration-200 ${
                      isOpen ? "rotate-45 text-[#FD881F]" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      className="h-4 w-4"
                    >
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
                    <p className="text-sm leading-relaxed text-[#6b6f72] sm:text-base font-normal">
                      {answerText}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
