"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

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
    question: "Is customer data used to train foundation models?",
    answer:
      "Your data is isolated and never used for model training. Period. All prompts and outputs remain strictly within your dedicated tenant with zero persistence to public foundation model providers.",
  },
  {
    question: "How does sub-50ms intelligent routing reduce inference costs?",
    answer:
      "Rivinity evaluates prompt complexity in under 10ms and dynamically dispatches tasks to the fastest, most cost-efficient frontier or specialized model that satisfies quality requirements — cutting inference costs by up to 60%.",
  },
  {
    question: "How does persistent memory survive across team workflows?",
    answer:
      "Project schemas, architecture decisions, and code context are indexed in a high-speed encrypted context mesh. Agents and developers access identical state across sessions without re-prompting or losing context.",
  },
  {
    question: "What enterprise security and compliance standards are supported?",
    answer:
      "Rivinity is built on SOC 2 Type II, GDPR, and ISO 27001 compliant infrastructure with automated in-line PII redaction, prompt injection defense, and comprehensive audit logging.",
  },
];

export function FaqSection({
  title = "Your questions, our answers",
  subtitle = "Everything you need to know about getting started with Rivinity.",
  items = DEFAULT_FAQS,
  id = "faq",
  className,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn("w-full py-16 sm:py-20 bg-white", className)} id={id}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0f172a]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Accordion list with Staggered Entrance */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
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
                  className="flex w-full items-center justify-between gap-4 py-5 text-left bg-transparent min-h-[44px] transition-colors sm:py-6 cursor-pointer rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
                >
                  <span className="text-base font-semibold text-[#0f172a] group-hover:text-[#FF6B00] transition-colors sm:text-lg">
                    {questionText}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center text-[#0f172a] transition-transform duration-200 ${
                      isOpen ? "rotate-45 text-[#FF6B00]" : ""
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
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
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
