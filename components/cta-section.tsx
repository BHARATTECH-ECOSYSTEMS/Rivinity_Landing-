"use client";

import Link from "next/link";
import {
  FaPlus,
  FaMicrophone,
  FaWaveSquare,
  FaFileLines,
  FaGlobe,
  FaImage,
  FaArrowRight,
} from "react-icons/fa6";

export default function Cta() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8 mb-25">
      <div
        className="relative mx-auto flex h-130 w-full max-w-5xl items-center justify-center overflow-hidden rounded-4xl border border-white/70 shadow-[0_20px_60px_rgba(30,35,50,0.10)]"
        style={{
          background:
            "radial-gradient(circle at 0% 35%, rgba(185,190,255,0.60), transparent 35%), radial-gradient(circle at 100% 65%, rgba(255,190,190,0.60), transparent 35%), linear-gradient(110deg, #f0efff 0%, #ffffff 48%, #fff4f4 100%)",
        }}
      >
        {/* Dotted texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(#777 0.7px, transparent 0.7px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl" />

        {/* Main content */}
        <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
          {/* Eyebrow */}
          <div className="text-[10px] pb-6 font-semibold uppercase tracking-[0.18em] text-[#16181A]/50">
            Get started
          </div>

          {/* Heading */}
          <div className="text-5xl font-bold leading-[1.05] tracking-tight text-[#16181A]">
            An AI companion on every device.
          </div>

          {/* Subtitle */}
          <p className="mt-4 max-w-lg text-md text-[#16181A]/65">
            Empowering humanity with intelligent productivity.
          </p>

          {/* Prompt box */}
          <div className="mt-9 w-full max-w-180 rounded-3xl border border-white/80 bg-white/55 px-4 py-5 shadow-[0_12px_30px_rgba(40,45,70,0.09)] backdrop-blur-xl sm:px-6">
            {/* Input */}
            <div className="flex h-11 items-center gap-3 rounded-full border border-white/80 bg-white/60 px-4">
              <FaPlus className="size-3.5 shrink-0 text-[#16181A]/50" />

              <input
                type="text"
                placeholder="Ask anything..."
                aria-label="Ask anything"
                className="flex-1 bg-transparent text-[13px] text-[#16181A] outline-none placeholder:text-[#16181A]/40 border-none outline-none"
              />

              <button
                type="button"
                aria-label="Voice input"
                className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[#16181A]/5"
              >
                <FaMicrophone className="size-3.5 text-[#16181A]/60" />
              </button>
            </div>

            {/* Tasks */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px]">
              <span className="mr-1 text-[#16181A]/55">
                Try these tasks:
              </span>

              <TaskPill
                icon={<FaWaveSquare />}
                label="Action"
              />

              <TaskPill
                icon={<FaFileLines />}
                label="Report"
              />

              <TaskPill
                icon={<FaGlobe />}
                label="Webpage"
              />

              <TaskPill
                icon={<FaImage />}
                label="Image"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-2 text-white">
            <Link
              href="/app"
              className="inline-flex h-10 items-center justify-center gap-3 rounded-full bg-[#10121c] px-5 text-[13px] font-semibold shadow-[0_8px_20px_rgba(16,18,28,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span>Open Rivinity</span>
              <FaArrowRight className="size-3" />
            </Link>

            {/* Secondary links */}
            <div className="flex items-center gap-4 text-[12px] text-[#16181A]/60 mt-2">
              <Link
                href="/contact"
                className="underline-offset-4 transition-colors hover:text-[#16181A] hover:underline"
              >
                Book a demo
              </Link>

              <span className="size-1 rounded-full bg-[#16181A]/25" />

              <Link
                href="/marketplace"
                className="underline-offset-4 transition-colors hover:text-[#16181A] hover:underline"
              >
                Browse marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/80 bg-white/55 px-3 text-[11px] text-[#16181A]/75 backdrop-blur-md transition-colors hover:bg-[#16181A]/4"
    >
      <span className="text-[#16181A]/60">
        {icon}
      </span>

      {label}
    </button>
  );
}