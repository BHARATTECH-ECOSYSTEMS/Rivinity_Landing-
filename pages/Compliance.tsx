"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CtaSection from "../components/cta-section";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";



const APPROACH = [
  {
    number: "01",
    title: "Security first",
    description:
      "We build security into every layer of our products, from infrastructure and access controls to monitoring and data protection.",
  },
  {
    number: "02",
    title: "Privacy by design",
    description:
      "We respect user data and design our systems around privacy, transparency, and responsible handling of information.",
  },
  {
    number: "03",
    title: "Continuous improvement",
    description:
      "We continuously evaluate, test, and improve our systems to maintain strong security, reliability, and compliance.",
  },
  {
    number: "04",
    title: "Responsible innovation",
    description:
      "We innovate thoughtfully, balancing new technology with security, accountability, transparency, and user trust.",
  },
];

function PrivacyTabs() {
 const [activeTab, setActiveTab] = useState(0);
   const tabs = [
    {
      title: "Data Minimization",
      short: "01",
      description:
        "We collect only the information that is necessary for legitimate and clearly defined purposes. This helps reduce unnecessary data collection and limits the amount of data that needs to be protected.",
      points: [
        "Collect only necessary information",
        "Avoid unnecessary data collection",
        "Review information requirements regularly",
      ],
    },
    {
      title: "Purpose Limitation",
      short: "02",
      description:
        "Information is used only for clearly defined and legitimate purposes. We aim to ensure that personal information is not used in ways that are unexpected or inconsistent with its intended purpose.",
      points: [
        "Clearly define data usage",
        "Limit secondary uses",
        "Maintain responsible data practices",
      ],
    },
    {
      title: "Access Control",
      short: "03",
      description:
        "Access to information is restricted according to authorized roles and responsibilities. We use appropriate controls to help ensure that information is available only to people who need it.",
      points: [
        "Role-based access",
        "Authorized personnel only",
        "Regular access review",
      ],
    },
    {
      title: "Secure Handling",
      short: "04",
      description:
        "We apply appropriate technical and organizational measures to help protect information against unauthorized access, misuse, alteration, disclosure, or loss.",
      points: [
        "Security controls",
        "Protected information handling",
        "Continuous security improvements",
      ],
    },
    {
      title: "Retention",
      short: "05",
      description:
        "Information is retained only for as long as necessary for legitimate business, legal, operational, or security purposes. When information is no longer required, appropriate disposal practices may be applied.",
      points: [
        "Defined retention periods",
        "Periodic data review",
        "Responsible disposal",
      ],
    },
    {
      title: "Transparency",
      short: "06",
      description:
        "We believe individuals should have a clear understanding of how their information is handled. We aim to communicate our privacy practices in a straightforward and accessible way.",
      points: [
        "Clear privacy information",
        "Accessible policies",
        "Open communication",
      ],
    },
  ];


useEffect(() => {
  const interval = setInterval(() => {
    setActiveTab((prev) => (prev + 1) % tabs.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const active = tabs[activeTab];

  return (
    <div>
      {/* TAB HEADERS */}
      <div className="border-b border-neutral-200 bg-neutral-50">
       <div className="flex w-full overflow-hidden">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              type="button"
              onClick={() => setActiveTab(index)}
             className="relative flex-1 whitespace-nowrap px-4 py-5 text-center text-sm font-medium lg:px-6"
            >
              <span
                className={
                  activeTab === index
                    ? "text-[#F97316]"
                    : "text-neutral-500 hover:text-neutral-900"
                }
              >
                <span className="mr-2 font-mono text-xs">
                  {tab.short}
                </span>

                {tab.title}
              </span>

              {activeTab === index && (
                <motion.div
                  layoutId="privacy-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F97316]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="p-8 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"
          >
            {/* LEFT */}
            <div>
              <span className="text-sm font-semibold text-[#F97316]">
                Our Commitment
              </span>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                {active.title}
              </h3>

              <p className="mt-6 text-base leading-8 text-neutral-600">
                {active.description}
              </p>

              <Link
                href="/privacy"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Read Privacy Policy
                <span>→</span>
              </Link>
            </div>

            {/* RIGHT */}
            <div className="grid gap-4">
              {active.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-semibold text-[#F97316]">
                      ✓
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-neutral-950">
                        {point}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Part of Rivinity&apos;s commitment to responsible
                        privacy practices.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
const AI_PRINCIPLES = [
  {
    title: "Human oversight",
    description:
      "AI systems should be developed and deployed with appropriate human oversight, particularly where outputs may have significant consequences.",
  },
  {
    title: "Data protection",
    description:
      "We consider privacy and security when handling information used by or processed through AI-powered systems.",
  },
  {
    title: "Evaluation",
    description:
      "AI systems should be evaluated for reliability, security, and intended behavior before and during deployment.",
  },
  {
    title: "Transparency",
    description:
      "We aim to communicate clearly about the role of AI within our products and services where appropriate.",
  },
  {
    title: "Responsible development",
    description:
      "We work to identify and reduce potential risks associated with AI systems while continuing to improve our development practices.",
  },
];

const FAQS = [
  {
    question: "Is Rivinity SOC 2 certified?",
    answer:
      "Our compliance status can change as our security program develops. Please contact Rivinity for the latest information regarding certifications, assessments, and available security documentation.",
  },
  {
    question: "Is Rivinity ISO 27001 certified?",
    answer:
      "Please contact Rivinity for the current status of ISO 27001 certification or assessment.",
  },
  {
    question: "Does Rivinity support GDPR requirements?",
    answer:
      "Where GDPR applies, Rivinity considers applicable data protection requirements in its privacy and data-handling practices. Please review our Privacy Policy or contact us for questions relating to a specific use case.",
  },
  {
    question: "How does Rivinity protect customer data?",
    answer:
      "We use security and privacy practices designed to protect information, including access controls, secure development practices, appropriate data protection measures, monitoring, and incident response processes.",
  },
  {
    question: "Does Rivinity use AI?",
    answer:
      "Rivinity develops and works with intelligent systems and AI technologies. Where AI is incorporated into our products or services, we consider security, privacy, reliability, transparency, and responsible use as part of the development process.",
  },
];
export default function SecurityPage() {
  const [activeAIPrinciple, setActiveAIPrinciple] = useState(0);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const securityRef = useRef<HTMLDivElement>(null);
const [securityProgress, setSecurityProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    if (!securityRef.current) return;

    const rect = securityRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const start = viewportHeight * 0.85;


    const end = viewportHeight * 0.15;

    const progress = Math.max(
      0,
      Math.min(1, (start - rect.top) / (start - end))
    );

    setSecurityProgress(progress);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);

  return (
    <>
      <Header />

      <main className="bg-white text-neutral-950">

       {/* ================================================================
        HERO
        ================================================================= */}

<section className="relative overflow-hidden border-b border-neutral-200 bg-white">
  {/* Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "radial-gradient(#111 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pt-40 lg:pb-32">

    {/* Heading */}
    <div className="mt-8 max-w-5xl">
      <h1 className="text-5xl font-semibold tracking-[-0.05em] text-neutral-950 sm:text-6xl lg:text-8xl">
        Building Trust
        <br />
        <span className="text-neutral-400">
           Compliance
        </span>
      </h1>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">
        Rivinity is committed to protecting customer data,
        building secure systems, respecting privacy, and
        developing intelligent technology responsibly.
      </p>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="#policies"
          className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          View Policies
        </Link>

        <Link
          href="#contact"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
        >
          Contact Team
        </Link>
      </div>
    </div>

    {/* Stats / Highlights */}
    <div className="mt-24 grid gap-4 border-t border-neutral-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Security",
          description: "Secure development and infrastructure practices",
        },
        {
          title: "Privacy",
          description: "Responsible data handling and protection",
        },
        {
          title: "Responsible AI",
          description: "Transparent and trustworthy AI systems",
        },
        {
          title: "Compliance",
          description: "Aligned with evolving regulatory requirements",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-orange-300"
        >
          <h3 className="text-sm font-semibold text-neutral-950">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================================================================
    OUR APPROACH
        ================================================================= */}

<section className="border-b border-neutral-200 bg-neutral-50">
  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
    <div className="max-w-3xl">
      

      <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
        Trust is built through
        <br />
        continuous commitment.
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
        Compliance is not a checkbox. It is an ongoing commitment
        to security, privacy, transparency, and responsible
        innovation across everything we build.
      </p>
    </div>

    <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {APPROACH.map((item, index) => {
        const iconsConfig = [
          {
            color: "text-orange-500",
            svg: (
              <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            ),
          },
          {
            color: "text-purple-500",
            svg: (
              <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            ),
          },
          {
            color: "text-green-500",
            svg: (
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
          },
          {
            color: "text-pink-500",
            svg: (
              <svg className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            ),
          },
        ];

        const currentIcon = iconsConfig[index % iconsConfig.length];

        return (
          <div
            key={item.number}
            className="bg-white/50 flex flex-col justify-between rounded-3xl border border-neutral-200 p-6 ring-0 transition-all duration-300 hover:border-orange-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            <div>
              <div className="bg-neutral-100 dark:bg-neutral-800 mb-3 size-fit rounded-lg p-px">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)]">
                  {currentIcon.svg}
                </div>
              </div>

              <span className="text-xs font-mono text-neutral-400">
                {item.number}
              </span>

              <h3 className="mt-2 mb-1 text-lg font-medium text-neutral-950">
                {item.title}
              </h3>

              <p className="text-neutral-600 mb-3 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6">
              <div className="bg-neutral-100 inline-flex rounded-lg p-0.5">
                <div className="text-neutral-600 inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
                  Core Pillar {item.number}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


  
{/* ================================================================
    PRIVACY
================================================================= */}

<section className="border-b border-neutral-200 bg-neutral-50">
  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl"
    >
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
        Privacy is built into
        <br />
        everything we do.
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
        We believe people should understand how their information is
        collected, used, protected, and managed. Transparency and
        responsible data handling are fundamental to how Rivinity operates.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
      className="mt-16 overflow-hidden rounded-3xl border border-neutral-200 bg-white"
    >
      <PrivacyTabs />
    </motion.div>

    <div className="mt-16 grid gap-6 border-t border-neutral-200 pt-10 sm:grid-cols-3">
      {[
        {
          title: "Transparency",
          description:
            "Clear communication about how information is handled.",
        },
        {
          title: "Protection",
          description:
            "Security measures designed to safeguard information.",
        },
        {
          title: "Accountability",
          description:
            "Continuous review and improvement of privacy practices.",
        },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.12,
          }}
        >
          <h4 className="text-lg font-semibold text-neutral-950">
            {item.title}
          </h4>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>
{/* ================================================================
    RESPONSIBLE AI
================================================================= */}

<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

    {/* Heading */}
    <div className="max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#F97316]">
        Responsible AI
      </p>

      <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl lg:text-6xl">
        Building intelligent systems
        <br />
        responsibly.
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
        AI introduces unique considerations around security, privacy,
        transparency, reliability, and accountability. These principles
        guide how we think about and develop intelligent systems.
      </p>
    </div>

    {/* ============================================================
        RESPONSIBLE AI SLIDER
    ============================================================= */}

    <div className="mt-16">

      {/* Top controls */}
      <div className="mb-6 flex items-center justify-between">

        {/* Counter */}
        <div className="text-sm font-medium text-neutral-500">
          <span className="text-neutral-950">
            {String(activeAIPrinciple + 1).padStart(2, "0")}
          </span>

          <span className="mx-2 text-neutral-300">/</span>

          {String(AI_PRINCIPLES.length).padStart(2, "0")}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">

          <button
            type="button"
            onClick={() =>
              setActiveAIPrinciple((current) =>
                current === 0
                  ? AI_PRINCIPLES.length - 1
                  : current - 1
              )
            }
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-all duration-300 hover:border-[#F97316] hover:bg-[#F97316] hover:text-white"
            aria-label="Previous principle"
          >
            <ChevronLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveAIPrinciple((current) =>
                current === AI_PRINCIPLES.length - 1
                  ? 0
                  : current + 1
              )
            }
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-all duration-300 hover:border-[#F97316] hover:bg-[#F97316] hover:text-white"
            aria-label="Next principle"
          >
            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>

        </div>
      </div>

      {/* Main slider */}
      <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-50">

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeAIPrinciple}
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -80,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid min-h-[420px] md:grid-cols-[0.8fr_1.2fr]"
          >

            {/* Left side */}
            <div className="flex flex-col justify-between border-b border-neutral-200 p-8 md:border-b-0 md:border-r md:p-12 lg:p-16">

              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-lg font-semibold text-[#F97316]">
                  {String(activeAIPrinciple + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-10 max-w-md text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                  {AI_PRINCIPLES[activeAIPrinciple].title}
                </h3>
              </div>

              <div className="mt-10">
                <div className="h-px w-full bg-neutral-200" />

                <p className="mt-4 text-sm uppercase tracking-[0.15em] text-neutral-400">
                  Rivinity Responsible AI
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">

              <div className="max-w-2xl">

                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#F97316]">
                  Principle
                </p>

                <p className="mt-6 text-xl leading-9 text-neutral-700 sm:text-2xl sm:leading-10">
                  {AI_PRINCIPLES[activeAIPrinciple].description}
                </p>

                {/* Principle indicator */}
                <div className="mt-12 flex items-center gap-2">
                  {AI_PRINCIPLES.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveAIPrinciple(index)}
                      aria-label={`Go to principle ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeAIPrinciple
                          ? "w-10 bg-[#F97316]"
                          : "w-5 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>

  </div>
</section>


{/* ================================================================
    SECURITY INQUIRIES
================================================================= */}

<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

    <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-50">

      {/* Subtle orange background accent */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
        {/* Main content */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          {/* Text */}
          <div className="max-w-3xl">

            <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Questions about security,
              <br className="hidden sm:block" />
              <span className="text-neutral-400">
                {" "}privacy, or compliance?
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              Whether you're evaluating Rivinity for your organization,
              reviewing our security practices, or looking for additional
              compliance information, our team is here to help.
            </p>

          </div>

          {/* CTA */}
          <div className="shrink-0">

           <Link
  href="/contact"
  className="group inline-flex items-center gap-3 rounded-full bg-[#F97316] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#EA580C]"
>
  Contact our team

  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#F97316] transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>

          </div>

        </div>

        {/* Bottom information */}
        <div className="mt-12 border-t border-neutral-200 pt-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="max-w-2xl text-xs leading-5 text-neutral-500">
              For security-related questions, please provide enough context
              for our team to understand your request and respond appropriately.
            </p>

            <span className="text-xs font-medium tracking-wider text-neutral-400">
              RIVINITY / SECURITY
            </span>

          </div>

        </div>

      </div>
    </div>

  </div>
</section>
 {/* ===================== FAQ ===================== */}
<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">

      {/* Intro */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#F97316]">
          FAQ
        </p>

        <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-[-0.045em] text-neutral-950 sm:text-4xl">
          Frequently asked
          <br />
          <span className="text-neutral-400">
            questions
          </span>
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">
          Answers to common questions about Rivinity's security,
          privacy, compliance, and responsible AI practices.
        </p>
      </div>

      {/* FAQ */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {FAQS.map((faq, index) => (
          <details key={faq.question} className="group">

            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 marker:hidden sm:py-5">

              <div className="flex items-start gap-3">
                <span className="pt-0.5 font-mono text-[8px] text-[#F97316]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm font-semibold leading-5 text-neutral-900 sm:text-[15px]">
                  {faq.question}
                </span>
              </div>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors group-open:border-orange-200 group-open:bg-orange-50">
                <span className="text-lg font-light leading-none text-neutral-400">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </span>

            </summary>

            <div className="pb-5 pl-7 pr-8">
              <p className="max-w-2xl text-sm leading-6 text-neutral-500">
                {faq.answer}
              </p>
            </div>

          </details>
        ))}
      </div>

    </div>
  </div>
</section>

        {/* ================================================================
            FINAL CTA
        ================================================================= */}

    <CtaSection />
      </main>

      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Section Label                                                               */
/* -------------------------------------------------------------------------- */

function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div>
      <div className="font-mono text-xs text-neutral-400">
        {number} / {title.toUpperCase()}
      </div>

      <div className="mt-4 hidden h-px w-10 bg-[#F97316] lg:block" />
    </div>
  );
}