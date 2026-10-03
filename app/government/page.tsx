"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/sections/cta-section";
import { TacticalHeroGraphic } from "@/components/government/TacticalHeroGraphic";

/* ------------------------------------------------------------------ */
/* Image 2 Exact Pixel Grid Mosaic Component                          */
/* ------------------------------------------------------------------ */
function PixelGridMosaic({ color }: { color: string }) {
  // Exact cell positions extracted from Image 2 reference (22 cols x 4 rows)
  const cells = [
    // Row 0 (topmost floating pixels)
    { col: 5, row: 0 },
    { col: 14, row: 0 },
    { col: 19, row: 0 },

    // Row 1
    { col: 3, row: 1 },
    { col: 7, row: 1 },
    { col: 9, row: 1 },
    { col: 11, row: 1 },
    { col: 13, row: 1 },
    { col: 18, row: 1 },

    // Row 2
    { col: 1, row: 2 },
    { col: 5, row: 2 },
    { col: 8, row: 2 },
    { col: 10, row: 2 },
    { col: 12, row: 2 },
    { col: 16, row: 2 },
    { col: 18, row: 2 },
    { col: 20, row: 2 },

    // Row 3 (bottom row)
    { col: 2, row: 3 },
    { col: 4, row: 3 },
    { col: 7, row: 3 },
    { col: 9, row: 3 },
    { col: 10, row: 3 },
    { col: 13, row: 3 },
    { col: 15, row: 3 },
    { col: 16, row: 3 },
  ];

  const size = 25;
  const pitch = 26.5;

  return (
    <div className="w-full h-20 sm:h-24 overflow-hidden relative mt-8 select-none pointer-events-none">
      <svg
        viewBox="0 0 580 110"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        {cells.map((c, idx) => (
          <rect
            key={idx}
            x={c.col * pitch + 4}
            y={c.row * pitch + 3}
            width={size}
            height={size}
            rx={2}
            fill={color}
          />
        ))}
      </svg>
    </div>
  );
}

export default function GovernmentPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500/20 selection:text-orange-900">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full pt-28 sm:pt-32 md:pt-36 pb-16"
      >
        {/* =========================================================================
            SECTION 1: HERO & SOVEREIGN MANDATE
            ========================================================================= */}
        <section id="mandate" className="section py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Engineering Grid Subtle Overlay */}
            <div className="relative">
              {/* 2-Column Hero Grid: Left text & CTAs, Right Sovereign Logo Graphic */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  {/* Headline */}
                  <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl leading-[1.15]">
                    Sovereign Intelligence. Engineered for Tactical Decision
                    Dominance.
                  </h1>

                  {/* Subheadline */}
                  <p className="mt-5 text-base sm:text-lg text-[#4b5563] leading-relaxed max-w-2xl">
                    100% indigenous, air-gapped AI models built for the
                    Tri-Services, Paramilitary (CAPFs), and National Security
                    Agencies. Aligned with Make in India and Atmanirbhar Bharat
                    mandates.
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <a
                      href="#intake"
                      style={{ color: "#ffffff" }}
                      className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#0f172a] hover:bg-slate-800 !text-white text-white text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2"
                    >
                      <span
                        className="!text-white text-white font-semibold"
                        style={{ color: "#ffffff" }}
                      >
                        Request Classified Briefing
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 !text-white text-white shrink-0"
                        style={{ color: "#ffffff", stroke: "#ffffff" }}
                      />
                    </a>

                    <a
                      href="#compliance"
                      style={{ color: "#1e293b" }}
                      className="w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-xl sm:rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 !text-slate-800 text-slate-800 text-sm font-semibold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                    >
                      <span
                        className="!text-slate-800 text-slate-800 font-semibold"
                        style={{ color: "#1e293b" }}
                      >
                        Explore Sovereign Architecture
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 !text-slate-500 text-slate-500 shrink-0"
                        style={{ color: "#64748b", stroke: "#64748b" }}
                      />
                    </a>
                  </div>
                </div>

                {/* Right Column: Logo Only */}
                <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-center">
                  <TacticalHeroGraphic />
                </div>
              </div>

              {/* Hero Sovereign Bento (3 Micro-Cards inspired by Image 1 UI) */}
              <div className="mt-28 sm:mt-32 lg:mt-36 grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
                {/* Card 1: Concentric Striped Ring Pattern */}
                <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 min-h-[220px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden group">
                  {/* Image 1 Pattern: Concentric Striped Circular Ring in bottom right */}
                  <svg
                    className="absolute -bottom-10 -right-10 w-60 h-60 pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    viewBox="0 0 200 200"
                    fill="none"
                  >
                    <defs>
                      <pattern
                        id="stripe-hero-orange"
                        width="7"
                        height="7"
                        patternTransform="rotate(45)"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="7"
                          stroke="#EA580C"
                          strokeWidth="2"
                          opacity="0.35"
                        />
                      </pattern>
                      <mask id="donut-mask-hero-orange">
                        <rect width="200" height="200" fill="white" />
                        <circle cx="150" cy="150" r="42" fill="black" />
                      </mask>
                    </defs>
                    <circle
                      cx="150"
                      cy="150"
                      r="105"
                      stroke="#EA580C"
                      strokeWidth="1"
                      opacity="0.2"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="88"
                      fill="url(#stripe-hero-orange)"
                      mask="url(#donut-mask-hero-orange)"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="88"
                      stroke="#EA580C"
                      strokeWidth="1.5"
                      opacity="0.4"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="42"
                      stroke="#EA580C"
                      strokeWidth="1.5"
                      opacity="0.4"
                    />
                  </svg>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      Buy (Indian-IDDM)
                    </h3>
                    <p className="mt-3 text-sm text-[#4b5563] leading-relaxed max-w-[85%]">
                      100% domestic IP ownership, zero foreign dependencies.
                      Guaranteed code sovereignty with complete hardware and
                      cryptographic control.
                    </p>
                  </div>
                </div>

                {/* Card 2: Diagonal Striped "X" Pattern */}
                <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 min-h-[220px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden group">
                  {/* Image 1 Pattern: Large Diagonal Striped "X" across background */}
                  <svg
                    className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    viewBox="0 0 200 200"
                    fill="none"
                  >
                    <defs>
                      <pattern
                        id="stripe-hero-purple"
                        width="7"
                        height="7"
                        patternTransform="rotate(45)"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="7"
                          stroke="#7C3AED"
                          strokeWidth="2"
                          opacity="0.35"
                        />
                      </pattern>
                    </defs>
                    <g transform="translate(130, 130) rotate(35) translate(-130, -130)">
                      <rect
                        x="50"
                        y="112"
                        width="160"
                        height="36"
                        rx="4"
                        fill="url(#stripe-hero-purple)"
                        stroke="#7C3AED"
                        strokeWidth="1"
                        strokeOpacity="0.35"
                      />
                      <rect
                        x="112"
                        y="50"
                        width="36"
                        height="160"
                        rx="4"
                        fill="url(#stripe-hero-purple)"
                        stroke="#7C3AED"
                        strokeWidth="1"
                        strokeOpacity="0.35"
                      />
                    </g>
                  </svg>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      MeitY Empanelled
                    </h3>
                    <p className="mt-3 text-sm text-[#4b5563] leading-relaxed max-w-[85%]">
                      Certified deployment on sovereign Indian Cloud Service
                      Providers (NIC, C-DAC, RailTel, BSNL) and State Data
                      Centers with mandatory in-country data residency.
                    </p>
                  </div>
                </div>

                {/* Card 3: Nested Striped Square Pattern */}
                <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 min-h-[220px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden group">
                  {/* Image 1 Pattern: Nested Striped Corner Square Frame */}
                  <svg
                    className="absolute -bottom-6 -right-6 w-60 h-60 pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    viewBox="0 0 200 200"
                    fill="none"
                  >
                    <defs>
                      <pattern
                        id="stripe-hero-pink"
                        width="7"
                        height="7"
                        patternTransform="rotate(45)"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="7"
                          stroke="#DB2777"
                          strokeWidth="2"
                          opacity="0.35"
                        />
                      </pattern>
                      <mask id="square-mask-hero-pink">
                        <rect width="200" height="200" fill="white" />
                        <rect
                          x="115"
                          y="115"
                          width="85"
                          height="85"
                          fill="black"
                        />
                      </mask>
                    </defs>
                    <rect
                      x="65"
                      y="65"
                      width="135"
                      height="135"
                      rx="8"
                      fill="url(#stripe-hero-pink)"
                      mask="url(#square-mask-hero-pink)"
                      stroke="#DB2777"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                    <rect
                      x="115"
                      y="115"
                      width="85"
                      height="85"
                      rx="4"
                      stroke="#DB2777"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.4"
                    />
                  </svg>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      Air-Gapped &amp; Rugged
                    </h3>
                    <p className="mt-3 text-sm text-[#4b5563] leading-relaxed max-w-[85%]">
                      Offline edge inference for forward operating bases,
                      high-altitude posts, and naval assets. Completely isolated
                      from public Internet nodes and foreign telemetry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: INDIGENOUS ACCREDITATIONS & SOVEREIGN COMPLIANCE (BENTO GRID)
            ========================================================================= */}
        <section id="compliance" className="section py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-10 sm:mb-14 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
                National Defense Compliance Framework
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
                Architected from the silicon up to adhere to statutory Ministry
                of Defence (MoD), MeitY, and national intelligence audit
                mandates.
              </p>
            </div>

            {/* Equal-Width 4-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
              {/* Card 1: Orange/Amber Accent */}
              <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#111827] shadow-[0_8px_0_0_#111827] p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#111827] overflow-hidden group">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      DAP 2020 &amp; Make in India Architecture
                    </h3>

                    {/* Image 2 Shape 1: Yellow 5-lobed Blob Flower */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                      >
                        <path
                          d="M 50 12 C 56 12 60 25 64 30 C 71 27 83 26 86 34 C 89 42 79 50 78 57 C 82 64 87 77 81 83 C 75 89 64 82 58 79 C 53 85 45 92 38 89 C 31 86 33 74 31 67 C 24 67 12 63 11 55 C 10 47 21 42 24 36 C 23 28 32 17 40 14 C 43 13 47 12 50 12 Z"
                          fill="#FACC15"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                    Fully certified under the Defence Acquisition Procedure (DAP
                    2020) for Buy (Indian-IDDM) and Make-II categorisation.
                    Designed specifically to eliminate dependency on foreign
                    cloud stacks, closed APIs, and third-party commercial
                    weights.
                  </p>
                </div>
              </div>

              {/* Card 2: Magenta Accent */}
              <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#111827] shadow-[0_8px_0_0_#111827] p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#111827] overflow-hidden group">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      DPDP Act &amp; CERT-In Compliant
                    </h3>

                    {/* Image 2 Shape 2: Magenta 8-petal Flower with circular center hole */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                      >
                        <mask id="flower-center-hole-c2">
                          <rect width="100" height="100" fill="white" />
                          <circle cx="50" cy="50" r="10.5" fill="black" />
                        </mask>
                        <g mask="url(#flower-center-hole-c2)" fill="#D946EF">
                          <rect x="43" y="6" width="14" height="34" rx="7" />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(45, 50, 50)"
                          />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(90, 50, 50)"
                          />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(135, 50, 50)"
                          />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(180, 50, 50)"
                          />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(225, 50, 50)"
                          />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(270, 50, 50)"
                          />
                          <rect
                            x="43"
                            y="6"
                            width="14"
                            height="34"
                            rx="7"
                            transform="rotate(315, 50, 50)"
                          />
                          <circle cx="50" cy="50" r="22" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                    Strict adherence to the Digital Personal Data Protection Act
                    2023. Real-time telemetry logging conforming to CERT-In
                    6-hour cybersecurity reporting guidelines with immutable
                    Indian audit trails.
                  </p>
                </div>
              </div>

              {/* Card 3: Coral Accent */}
              <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#111827] shadow-[0_8px_0_0_#111827] p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#111827] overflow-hidden group">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      STQC &amp; MeitY Cloud Ready
                    </h3>

                    {/* Image 2 Shape 3: Coral 12-scallop Rosette with donut & center dot */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                      >
                        <defs>
                          <mask id="rosette-hole-c3">
                            <rect width="100" height="100" fill="white" />
                            <circle cx="50" cy="50" r="23" fill="black" />
                          </mask>
                        </defs>
                        <g mask="url(#rosette-hole-c3)" fill="#FB7185">
                          <circle cx="50" cy="14" r="12" />
                          <circle cx="68" cy="19" r="12" />
                          <circle cx="81" cy="32" r="12" />
                          <circle cx="86" cy="50" r="12" />
                          <circle cx="81" cy="68" r="12" />
                          <circle cx="68" cy="81" r="12" />
                          <circle cx="50" cy="86" r="12" />
                          <circle cx="32" cy="81" r="12" />
                          <circle cx="19" cy="68" r="12" />
                          <circle cx="14" cy="50" r="12" />
                          <circle cx="19" cy="32" r="12" />
                          <circle cx="32" cy="19" r="12" />
                          <circle cx="50" cy="50" r="38" />
                        </g>
                        <circle cx="50" cy="50" r="10" fill="#FB7185" />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                    Pre-architected for containerized deployment across
                    STQC-audited and MeitY-empanelled government clouds. Fully
                    compatible with State Data Centers (SDCs) and secure NIC
                    enclaves.
                  </p>
                </div>
              </div>

              {/* Card 4: Blue Accent / Vetting */}
              <div className="relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#111827] shadow-[0_8px_0_0_#111827] p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_0_0_#111827] overflow-hidden group">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      Classified Vetting &amp; 100% Indian Personnel
                    </h3>

                    {/* Image 2 Shape 4: Sky Blue Interlocking Clover Lattice */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                      >
                        <mask id="clover-diamond-mask-c4">
                          <rect width="100" height="100" fill="white" />
                          <path
                            d="M 35 27 Q 35 35 27 35 Q 35 35 35 43 Q 35 35 43 35 Q 35 35 35 27 Z"
                            fill="black"
                          />
                          <path
                            d="M 65 57 Q 65 65 57 65 Q 65 65 65 73 Q 65 65 73 65 Q 65 65 65 57 Z"
                            fill="black"
                          />
                        </mask>
                        <g mask="url(#clover-diamond-mask-c4)" fill="#38BDF8">
                          <circle cx="35" cy="19" r="13" />
                          <circle cx="35" cy="51" r="13" />
                          <circle cx="19" cy="35" r="13" />
                          <circle cx="51" cy="35" r="13" />
                          <rect x="22" y="22" width="26" height="26" rx="4" />

                          <circle cx="65" cy="49" r="13" />
                          <circle cx="65" cy="81" r="13" />
                          <circle cx="49" cy="65" r="13" />
                          <circle cx="81" cy="65" r="13" />
                          <rect x="52" y="52" width="26" height="26" rx="4" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                    Every engineer, research scientist, and implementation
                    specialist holds verified Indian citizenship with background
                    checks by statutory verification bureaus. Zero remote
                    foreign developer access, offshore maintenance, or
                    third-party overseas dependencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: TACTICAL EDGE & MISSION OPERATIONAL SCENARIOS (IMAGE 1 STYLE)
            ========================================================================= */}
        <section id="edge" className="section py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-10 sm:mb-14 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
                Mission-Ready Operational Scenarios
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
                Battlefield-proven inference engines engineered for
                zero-connectivity operating environments and extreme combat
                conditions.
              </p>
            </div>

            {/* 3-Column Layout using Image 2 design in Orange, Pink, and Purple */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-3">
              {/* Scenario 01: Orange Theme */}
              <div className="flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-orange-200/90 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden group">
                <div className="p-6 sm:p-8 pb-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-200/80">
                    Scenario 01
                  </span>
                  <h3 className="mt-3.5 text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                    Forward Base &amp; Border Surveillance
                  </h3>
                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Real-time multi-sensor fusion and automated perimeter defense for forward sectors with sub-15ms edge inference and zero external dependencies.
                  </p>
                </div>
                <PixelGridMosaic color="#FB923C" />
              </div>

              {/* Scenario 02: Pink Theme */}
              <div className="flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-pink-200/90 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden group">
                <div className="p-6 sm:p-8 pb-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200/80">
                    Scenario 02
                  </span>
                  <h3 className="mt-3.5 text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                    Multilingual Indic Signals Intelligence
                  </h3>
                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    On-premise speech recognition, translation, and tactical COMINT extraction across 22 scheduled Indian languages and frontier dialects.
                  </p>
                </div>
                <PixelGridMosaic color="#F472B6" />
              </div>

              {/* Scenario 03: Purple Theme */}
              <div className="flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-purple-200/90 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden group">
                <div className="p-6 sm:p-8 pb-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200/80">
                    Scenario 03
                  </span>
                  <h3 className="mt-3.5 text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                    Extreme-Terrain Logistics &amp; Readiness
                  </h3>
                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Predictive maintenance, fleet readiness, and convoy route optimization calibrated for high-altitude, desert, and hostile combat climates.
                  </p>
                </div>
                <PixelGridMosaic color="#A78BFA" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PROCUREMENT & ACQUISITION CHANNELS (IMAGE 2 STEP STYLE)
            ========================================================================= */}
        <section id="procurement" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-10 sm:mb-14 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
                Institutional Procurement Channels
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
                Streamlined public sector acquisition frameworks compliant with
                General Financial Rules (GFR 2017) and Defence Procurement
                Manual.
              </p>
            </div>

            {/* 3 Structured Boxes using Image 2 curved corner notch design with gray-50 boxes and orange, purple, and pink circular buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: GeM Portal (Orange) */}
              <div className="relative bg-gray-50 rounded-[32px] border border-gray-200 p-7 sm:p-8 pb-16 flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                <div>
                  {/* Top-left Icon */}
                  <div className="w-13 h-13 rounded-2xl bg-orange-100/90 text-orange-600 flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="19" cy="6" r="2.5" />
                      <circle cx="5" cy="6" r="2.5" />
                      <circle cx="6" cy="18" r="2.5" />
                      <circle cx="18" cy="18" r="2.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.2 10.2L6.8 7.8M13.8 10.2l3.4-2.4M10.2 13.8l-3.4 2.4M13.8 13.8l3.4 2.4"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                    Government e-Marketplace (GeM)
                  </h3>

                  <p className="mt-4 text-sm text-[#4b5563] leading-relaxed">
                    Direct contracting and catalog item procurement on GeM 5.0
                    for Central Ministries, State Governments, and Armed Forces
                    field headquarters under pre-negotiated rate cards.
                  </p>
                </div>

                {/* Corner cutout notch */}
                <svg
                  className="absolute bottom-0 right-0 w-[104px] h-[104px] pointer-events-none"
                  viewBox="0 0 104 104"
                  fill="none"
                >
                  <path
                    d="M 104 0 C 104 18 92 30 74 30 C 42 30 30 42 30 74 C 30 92 18 104 0 104 L 104 104 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M 104 0 C 104 18 92 30 74 30 C 42 30 30 42 30 74 C 30 92 18 104 0 104"
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>

                {/* Orange Circular Button */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href="#intake"
                    className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all duration-200 group-hover:rotate-12"
                    aria-label="Procure via GeM"
                  >
                    <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Card 2: iDEX (Purple) */}
              <div className="relative bg-gray-50 rounded-[32px] border border-gray-200 p-7 sm:p-8 pb-16 flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                <div>
                  {/* Top-left Icon */}
                  <div className="w-13 h-13 rounded-2xl bg-purple-100/90 text-purple-600 flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                    >
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="9"
                        ry="3.5"
                        transform="rotate(30 12 12)"
                      />
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="9"
                        ry="3.5"
                        transform="rotate(90 12 12)"
                      />
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="9"
                        ry="3.5"
                        transform="rotate(150 12 12)"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                    Innovations for Defence Excellence (iDEX)
                  </h3>

                  <p className="mt-4 text-sm text-[#4b5563] leading-relaxed">
                    Participation in Defence India Startup Challenges (DISC) and
                    Open Challenges under the Defence Innovation Organisation
                    (DIO) for co-funded advanced prototype developments.
                  </p>
                </div>

                {/* Corner cutout notch */}
                <svg
                  className="absolute bottom-0 right-0 w-[104px] h-[104px] pointer-events-none"
                  viewBox="0 0 104 104"
                  fill="none"
                >
                  <path
                    d="M 104 0 C 104 18 92 30 74 30 C 42 30 30 42 30 74 C 30 92 18 104 0 104 L 104 104 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M 104 0 C 104 18 92 30 74 30 C 42 30 30 42 30 74 C 30 92 18 104 0 104"
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>

                {/* Purple Circular Button */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href="#intake"
                    className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg shadow-purple-600/25 hover:scale-105 active:scale-95 transition-all duration-200 group-hover:rotate-12"
                    aria-label="Procure via iDEX"
                  >
                    <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Card 3: DRDO & DPSU Alliances (Pink) */}
              <div className="relative bg-gray-50 rounded-[32px] border border-gray-200 p-7 sm:p-8 pb-16 flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                <div>
                  {/* Top-left Icon */}
                  <div className="w-13 h-13 rounded-2xl bg-pink-100/90 text-pink-600 flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                      />
                      <circle cx="9" cy="7" r="4" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 6l3-3m0 0h-3m3 0v3"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                    DRDO &amp; DPSU Strategic Alliances
                  </h3>

                  <p className="mt-4 text-sm text-[#4b5563] leading-relaxed">
                    Joint system integration partnerships through DRDO&apos;s
                    Technology Development Fund (TDF) and native subsystem
                    embedding with Indian DPSUs (BEL, HAL, BDL, MDL).
                  </p>
                </div>

                {/* Corner cutout notch */}
                <svg
                  className="absolute bottom-0 right-0 w-[104px] h-[104px] pointer-events-none"
                  viewBox="0 0 104 104"
                  fill="none"
                >
                  <path
                    d="M 104 0 C 104 18 92 30 74 30 C 42 30 30 42 30 74 C 30 92 18 104 0 104 L 104 104 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M 104 0 C 104 18 92 30 74 30 C 42 30 30 42 30 74 C 30 92 18 104 0 104"
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>

                {/* Pink Circular Button */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href="#intake"
                    className="w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all duration-200 group-hover:rotate-12"
                    aria-label="Procure via DRDO and DPSUs"
                  >
                    <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HIGH-ASSURANCE PROCUREMENT PROTOCOL (STREAMLINED & CLUTTER-FREE)
            ========================================================================= */}
        <section id="intake" className="section py-20 sm:py-28 ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
                High-Assurance Procurement Protocol
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                We maintain strict vetting protocols for air-gapped
                demonstrations, benchmark evaluations, and physical node
                inspections at our secured New Delhi facilities or on-site
                customer enclaves.
              </p>
            </div>

            {/* 4 Protocol Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-100">
                    <span className="font-semibold text-[#111827]">
                      PHASE 01
                    </span>
                    <span className="text-orange-600 font-semibold">
                      VERIFICATION
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">
                    Institutional Identity Vetting
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                    Submission verified against official `@nic.in`, `@gov.in`,
                    or armed forces domains with statutory authorized officer
                    verification.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-100">
                    <span className="font-semibold text-[#111827]">
                      PHASE 02
                    </span>
                    <span className="text-pink-600 font-semibold">
                      LEGAL &amp; NDA
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">
                    Security NDA &amp; Scope Formalization
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                    Execution of bilateral defense non-disclosure agreement
                    protecting sovereign intellectual property and test
                    datasets.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-100">
                    <span className="font-semibold text-[#111827]">
                      PHASE 03
                    </span>
                    <span className="text-purple-600 font-semibold">
                      ISOLATED POC
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">
                    Air-Gapped Sandbox Demonstration
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                    Deployment of standalone evaluation node inside your
                    air-gapped facility or sovereign cloud test tenant.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-100">
                    <span className="font-semibold text-[#111827]">
                      PHASE 04
                    </span>
                    <span className="text-emerald-600 font-semibold">
                      HANDOVER
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">
                    Delivery &amp; Source Escrow
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                    Full model weight packaging, offline deployment images, and
                    statutory source code escrow under Indian jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            EXISTING PRE-FOOTER CTA SECTION
            ========================================================================= */}
        <CtaSection
          title="Deploy Sovereign Defence AI for National Security"
          description="Schedule a classified mission briefing with our Indian National Security Cleared architecture team at New Delhi HQ or at your command enclave."
          buttonText="Schedule Mission Briefing"
          buttonHref="/contact"
          secondaryText="Explore Sovereign Compliance"
          secondaryHref="#compliance"
        />
      </motion.main>

      <Footer />
    </div>
  );
}
