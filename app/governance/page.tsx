"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Shield,
  ShieldAlert,
  Cpu,
  Server,
  Radio,
  FileText,
  CheckCircle2,
  Lock,
  Landmark,
  Send,
  MapPin,
  Eye,
  Zap,
  Database,
  Terminal,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaSection from "@/components/sections/cta-section";

export default function GovernmentPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    agency: "Ministry of Defence (MoD)",
    clearance: "Secret",
    environment: "Air-gapped On-Premises",
    procurementTrack: "GeM Portal (Direct)",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

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
        <section id="mandate" className="section py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Engineering Grid Subtle Overlay */}
            <div className="relative">
              {/* Headline */}
              <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl leading-[1.15]">
                Sovereign Intelligence. Engineered for Tactical Decision Dominance.
              </h1>

              {/* Subheadline */}
              <p className="mt-5 max-w-3xl text-base sm:text-lg text-[#4b5563] leading-relaxed">
                100% indigenous, air-gapped AI models built for the Tri-Services, Paramilitary (CAPFs), and National Security Agencies. Aligned with Make in India and Atmanirbhar Bharat mandates.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <a
                  href="#intake"
                  style={{ color: "#ffffff" }}
                  className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#0f172a] hover:bg-slate-800 !text-white text-white text-sm font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2"
                >
                  <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>
                    Request Classified Briefing
                  </span>
                  <ArrowUpRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                </a>

                <a
                  href="#compliance"
                  style={{ color: "#1e293b" }}
                  className="w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-xl sm:rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 !text-slate-800 text-slate-800 text-sm font-semibold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  <span className="!text-slate-800 text-slate-800 font-semibold" style={{ color: "#1e293b" }}>
                    Explore Sovereign Architecture
                  </span>
                  <ArrowUpRight className="w-4 h-4 !text-slate-500 text-slate-500 shrink-0" style={{ color: "#64748b", stroke: "#64748b" }} />
                </a>
              </div>

              {/* Hero Sovereign Bento (3 Micro-Cards inspired by Image 1 UI) */}
              <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
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
                        <line x1="0" y1="0" x2="0" y2="7" stroke="#EA580C" strokeWidth="2" opacity="0.35" />
                      </pattern>
                      <mask id="donut-mask-hero-orange">
                        <rect width="200" height="200" fill="white" />
                        <circle cx="150" cy="150" r="42" fill="black" />
                      </mask>
                    </defs>
                    <circle cx="150" cy="150" r="105" stroke="#EA580C" strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />
                    <circle cx="150" cy="150" r="88" fill="url(#stripe-hero-orange)" mask="url(#donut-mask-hero-orange)" />
                    <circle cx="150" cy="150" r="88" stroke="#EA580C" strokeWidth="1.5" opacity="0.4" />
                    <circle cx="150" cy="150" r="42" stroke="#EA580C" strokeWidth="1.5" opacity="0.4" />
                  </svg>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      Buy (Indian-IDDM)
                    </h3>
                    <p className="mt-3 text-sm text-[#4b5563] leading-relaxed max-w-[85%]">
                      100% domestic IP ownership, zero foreign dependencies. Guaranteed code sovereignty with complete hardware and cryptographic control.
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
                        <line x1="0" y1="0" x2="0" y2="7" stroke="#7C3AED" strokeWidth="2" opacity="0.35" />
                      </pattern>
                    </defs>
                    <g transform="translate(130, 130) rotate(35) translate(-130, -130)">
                      <rect x="50" y="112" width="160" height="36" rx="4" fill="url(#stripe-hero-purple)" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.35" />
                      <rect x="112" y="50" width="36" height="160" rx="4" fill="url(#stripe-hero-purple)" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.35" />
                    </g>
                  </svg>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      MeitY Empanelled
                    </h3>
                    <p className="mt-3 text-sm text-[#4b5563] leading-relaxed max-w-[85%]">
                      Certified deployment on sovereign Indian Cloud Service Providers (NIC, C-DAC, RailTel, BSNL) and State Data Centers with mandatory in-country data residency.
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
                        <line x1="0" y1="0" x2="0" y2="7" stroke="#DB2777" strokeWidth="2" opacity="0.35" />
                      </pattern>
                      <mask id="square-mask-hero-pink">
                        <rect width="200" height="200" fill="white" />
                        <rect x="115" y="115" width="85" height="85" fill="black" />
                      </mask>
                    </defs>
                    <rect x="65" y="65" width="135" height="135" rx="8" fill="url(#stripe-hero-pink)" mask="url(#square-mask-hero-pink)" stroke="#DB2777" strokeWidth="1.5" strokeOpacity="0.4" />
                    <rect x="115" y="115" width="85" height="85" rx="4" stroke="#DB2777" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  </svg>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      Air-Gapped &amp; Rugged
                    </h3>
                    <p className="mt-3 text-sm text-[#4b5563] leading-relaxed max-w-[85%]">
                      Offline edge inference for forward operating bases, high-altitude posts, and naval assets. Completely isolated from public Internet nodes and foreign telemetry.
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
                Architected from the silicon up to adhere to statutory Ministry of Defence (MoD), MeitY, and national intelligence audit mandates.
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
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        <path
                          d="M 50 12 C 56 12 60 25 64 30 C 71 27 83 26 86 34 C 89 42 79 50 78 57 C 82 64 87 77 81 83 C 75 89 64 82 58 79 C 53 85 45 92 38 89 C 31 86 33 74 31 67 C 24 67 12 63 11 55 C 10 47 21 42 24 36 C 23 28 32 17 40 14 C 43 13 47 12 50 12 Z"
                          fill="#FACC15"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                    Fully certified under the Defence Acquisition Procedure (DAP 2020) for Buy (Indian-IDDM) and Make-II categorisation. Designed specifically to eliminate dependency on foreign cloud stacks, closed APIs, and third-party commercial weights.
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
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        <mask id="flower-center-hole-c2">
                          <rect width="100" height="100" fill="white" />
                          <circle cx="50" cy="50" r="10.5" fill="black" />
                        </mask>
                        <g mask="url(#flower-center-hole-c2)" fill="#D946EF">
                          <rect x="43" y="6" width="14" height="34" rx="7" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(45, 50, 50)" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(90, 50, 50)" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(135, 50, 50)" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(180, 50, 50)" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(225, 50, 50)" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(270, 50, 50)" />
                          <rect x="43" y="6" width="14" height="34" rx="7" transform="rotate(315, 50, 50)" />
                          <circle cx="50" cy="50" r="22" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                    Strict adherence to the Digital Personal Data Protection Act 2023. Real-time telemetry logging conforming to CERT-In 6-hour cybersecurity reporting guidelines with immutable Indian audit trails.
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
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
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
                    Pre-architected for containerized deployment across STQC-audited and MeitY-empanelled government clouds. Fully compatible with State Data Centers (SDCs) and secure NIC enclaves.
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
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        <mask id="clover-diamond-mask-c4">
                          <rect width="100" height="100" fill="white" />
                          <path d="M 35 27 Q 35 35 27 35 Q 35 35 35 43 Q 35 35 43 35 Q 35 35 35 27 Z" fill="black" />
                          <path d="M 65 57 Q 65 65 57 65 Q 65 65 65 73 Q 65 65 73 65 Q 65 65 65 57 Z" fill="black" />
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
                    Every engineer, research scientist, and implementation specialist holds verified Indian citizenship with background checks by statutory verification bureaus. Zero remote foreign developer access, offshore maintenance, or third-party overseas dependencies.
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
                Battlefield-proven inference engines engineered for zero-connectivity operating environments and extreme combat conditions.
              </p>
            </div>

            {/* 3-Column Layout using Image 1 & Image 2 design synergy */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-3">
              {/* Scenario 01: Orange Theme */}
              <div className="flex flex-col justify-between bg-[#FFF7ED] rounded-2xl sm:rounded-3xl border border-orange-200/90 shadow-xs p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <h3 className="text-xl font-bold text-[#111827] leading-snug">
                    Forward Base &amp; Border Surveillance
                  </h3>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Real-time multi-sensor fusion (thermal FLIR, optical cameras, ground radar, and UAV telemetry streams) for automated perimeter defense along high-altitude line-of-actual-control sectors.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-orange-600 mt-0.5">•</span>
                      <span>Sub-15ms edge inference on low-power, ruggedized MIL-SPEC hardware.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-orange-600 mt-0.5">•</span>
                      <span>Zero reliance on commercial satellite backhauls or external APIs.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-orange-600 mt-0.5">•</span>
                      <span>Automated threat classification and encrypted VHF/UHF tactical radio alerts.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenario 02: Pink Theme */}
              <div className="flex flex-col justify-between bg-[#FDF2F8] rounded-2xl sm:rounded-3xl border border-pink-200/90 shadow-xs p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <h3 className="text-xl font-bold text-[#111827] leading-snug">
                    Multilingual Indic Signals Intelligence
                  </h3>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    On-premise multi-dialect speech-to-text, translation, and named entity recognition across 22 scheduled Indian languages, border regional dialects, and adversarial communications.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-pink-600 mt-0.5">•</span>
                      <span>Real-time voice intercept transcription and automated sentiment triage.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-pink-600 mt-0.5">•</span>
                      <span>Dialect-aware entity extraction for tactical COMINT intercept stations.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-pink-600 mt-0.5">•</span>
                      <span>Isolated on-premises weights without telemetry phoning home.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenario 03: Purple Theme */}
              <div className="flex flex-col justify-between bg-[#FAF5FF] rounded-2xl sm:rounded-3xl border border-purple-200/90 shadow-xs p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <h3 className="text-xl font-bold text-[#111827] leading-snug">
                    Extreme-Terrain Logistics &amp; Readiness
                  </h3>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Predictive maintenance, convoy route optimization, and munitions burn forecasting models calibrated for extreme climatic environments (Ladakh, Siachen, Thar, and Northeastern jungle sectors).
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-purple-600 mt-0.5">•</span>
                      <span>Heavy armour, aviation turbofan, and UAV battery degradation prediction.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-purple-600 mt-0.5">•</span>
                      <span>Winter-stocking optimization for forward logistics depots.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="font-mono font-bold text-purple-600 mt-0.5">•</span>
                      <span>Weather-resilient terrain passability and drone route calculating models.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PROCUREMENT & ACQUISITION CHANNELS (IMAGE 2 STEP STYLE)
            ========================================================================= */}
        <section id="procurement" className="section py-20 sm:py-28 bg-gray-50 border-y border-gray-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-10 sm:mb-14 max-w-2xl">
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
                Institutional Procurement Channels
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
                Streamlined public sector acquisition frameworks compliant with General Financial Rules (GFR 2017) and Defence Procurement Manual.
              </p>
            </div>

            {/* 3 Structured Boxes combining Image 1 Black Bottom & Image 2 Technical Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
              {/* Box 1: GeM Portal */}
              <div className="flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-200">
                    <span className="font-semibold text-orange-600">CHANNEL 01</span>
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">DIRECT GeM</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827]">
                    Government e-Marketplace (GeM)
                  </h3>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Direct contracting and catalog item procurement on GeM 5.0 for Central Ministries, State Governments, and Armed Forces field headquarters under pre-negotiated rate cards.
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                      <span className="text-gray-500">Seller Category:</span> AI Platform &amp; Software
                    </div>
                    <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                      <span className="text-gray-500">Compliance:</span> GFR 2017 Rule 149
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: iDEX & DIO */}
              <div className="flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-200">
                    <span className="font-semibold text-pink-600">CHANNEL 02</span>
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">R&amp;D GRANT</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827]">
                    Innovations for Defence Excellence (iDEX)
                  </h3>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Participation in Defence India Startup Challenges (DISC) and Open Challenges under the Defence Innovation Organisation (DIO) for co-funded advanced prototype developments.
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                      <span className="text-gray-500">Program:</span> DISC &amp; Prime Challenges
                    </div>
                    <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                      <span className="text-gray-500">Ministry:</span> Department of Defence Production
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 3: DRDO TDF & DPSU Alliances */}
              <div className="flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-gray-500 pb-3 mb-4 border-b border-gray-200">
                    <span className="font-semibold text-purple-600">CHANNEL 03</span>
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">STRATEGIC DPSU</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827]">
                    DRDO &amp; DPSU Strategic Alliances
                  </h3>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    Joint system integration partnerships through DRDO&apos;s Technology Development Fund (TDF) and native subsystem embedding with Indian DPSUs (BEL, HAL, BDL, MDL).
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                      <span className="text-gray-500">Framework:</span> DRDO TDF / ToT Protocols
                    </div>
                    <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                      <span className="text-gray-500">Partners:</span> BEL, HAL, BDL Ecosystem
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HIGH-ASSURANCE PROCUREMENT INTAKE
            ========================================================================= */}
        <section id="intake" className="section py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Protocol Instructions */}
              <div className="lg:col-span-5">
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
                  High-Assurance Procurement Protocol
                </h2>

                <p className="mt-3 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                  We maintain strict vetting protocols for air-gapped demonstrations, benchmark evaluations, and physical node inspections at our secured New Delhi facilities or on-site customer enclaves.
                </p>

                {/* 4 Protocol Steps (Using Image 2 Step Design) */}
                <div className="mt-8 space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between font-mono text-xs text-gray-500 mb-1.5">
                      <span className="font-semibold text-[#111827]">PHASE 01</span>
                      <span className="text-orange-600 font-semibold">VERIFICATION</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Institutional Identity Vetting</h4>
                    <p className="mt-1 text-xs text-[#4b5563] leading-relaxed">
                      Submission verified against official `@nic.in`, `@gov.in`, or armed forces domains with statutory authorized officer verification.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between font-mono text-xs text-gray-500 mb-1.5">
                      <span className="font-semibold text-[#111827]">PHASE 02</span>
                      <span className="text-pink-600 font-semibold">LEGAL &amp; NDA</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Security NDA &amp; Scope Formalization</h4>
                    <p className="mt-1 text-xs text-[#4b5563] leading-relaxed">
                      Execution of bilateral defense non-disclosure agreement protecting sovereign intellectual property and test datasets.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between font-mono text-xs text-gray-500 mb-1.5">
                      <span className="font-semibold text-[#111827]">PHASE 03</span>
                      <span className="text-purple-600 font-semibold">ISOLATED POC</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Air-Gapped Sandbox Demonstration</h4>
                    <p className="mt-1 text-xs text-[#4b5563] leading-relaxed">
                      Deployment of standalone evaluation node inside your air-gapped facility or sovereign cloud test tenant.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between font-mono text-xs text-gray-500 mb-1.5">
                      <span className="font-semibold text-[#111827]">PHASE 04</span>
                      <span className="text-emerald-600 font-semibold">HANDOVER</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111827]">Delivery &amp; Source Escrow</h4>
                    <p className="mt-1 text-xs text-[#4b5563] leading-relaxed">
                      Full model weight packaging, offline deployment images, and statutory source code escrow under Indian jurisdiction.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Sovereign Briefing Center: New Delhi, India</span>
                </div>
              </div>

              {/* Right Column: Secure Procurement Intake Form (Clean Monochrome UI) */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs bg-white p-6 sm:p-10">
                  {formSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Procurement Dossier Initiated</h3>
                      <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                        Your request has been routed to our Sovereign &amp; Defence Architecture liaison desk. An Indian National Security Cleared representative will initiate contact via verified channels within 12 business hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="mt-6 inline-flex items-center text-xs font-mono font-semibold text-gray-900 hover:text-orange-600 underline"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="text-lg font-bold text-gray-900">
                          Classified Demonstration &amp; Acquisition Intake
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          Restricted to verified Government of India, Tri-Services, MHA, and DPSU authorized personnel.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Official Email */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Official Email <span className="text-orange-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="officer@nic.in / @mod.gov.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900"
                          />
                        </div>

                        {/* Officer Name & Rank */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Full Name &amp; Rank / Designation <span className="text-orange-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Col. / Director / Scientist-G"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Ministry / Agency */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Ministry / Agency Affiliation
                          </label>
                          <select
                            value={formData.agency}
                            onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900"
                          >
                            <option value="Ministry of Defence (MoD)">Ministry of Defence (MoD)</option>
                            <option value="Ministry of Home Affairs (MHA)">Ministry of Home Affairs (MHA)</option>
                            <option value="Indian Army / Navy / Air Force">Indian Army / Navy / Air Force</option>
                            <option value="CAPFs (CRPF, BSF, ITBP, CISF)">CAPFs (CRPF, BSF, ITBP, CISF)</option>
                            <option value="Defence PSU (BEL, HAL, BDL)">Defence PSU (BEL, HAL, BDL)</option>
                            <option value="DRDO / National Lab">DRDO / National Laboratory</option>
                            <option value="MeitY / NIC / State IT Dept">MeitY / NIC / State IT Department</option>
                          </select>
                        </div>

                        {/* Clearance Level */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Target Clearance Level
                          </label>
                          <select
                            value={formData.clearance}
                            onChange={(e) => setFormData({ ...formData, clearance: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900"
                          >
                            <option value="Restricted / Official">Restricted / Official Use</option>
                            <option value="Confidential">Confidential</option>
                            <option value="Secret">Secret</option>
                            <option value="Top Secret / Air-Gapped">Top Secret / Air-Gapped</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Deployment Environment */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Deployment Architecture
                          </label>
                          <select
                            value={formData.environment}
                            onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900"
                          >
                            <option value="Air-gapped On-Premises">Air-gapped On-Premises Facility</option>
                            <option value="MeitY Sovereign Cloud">MeitY Empanelled Sovereign Cloud</option>
                            <option value="Tactical Edge / Rugged Hardware">Tactical Edge / Rugged MIL-SPEC Hardware</option>
                            <option value="Naval / Mobile Command Node">Naval / Mobile Command Vehicle</option>
                          </select>
                        </div>

                        {/* Target Procurement Track */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Preferred Acquisition Route
                          </label>
                          <select
                            value={formData.procurementTrack}
                            onChange={(e) => setFormData({ ...formData, procurementTrack: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-900 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900"
                          >
                            <option value="GeM Portal (Direct)">GeM 5.0 Portal Direct Contract</option>
                            <option value="iDEX / DISC Challenge">iDEX / DIO Innovation Challenge</option>
                            <option value="DRDO TDF Joint Program">DRDO Technology Development Fund</option>
                            <option value="Direct Institutional RFP / Tender">Direct Institutional RFP / Tender</option>
                          </select>
                        </div>
                      </div>

                      {/* Mission Scope / Requirements */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                          Mission Scope &amp; Operational Requirements <span className="text-gray-400 font-normal normal-case">(optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Brief operational overview, estimated edge nodes, sensor integration specifics..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 bg-gray-50/50 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-gray-900 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-sm font-semibold py-3.5 px-6 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0f172a]"
                      >
                        <span>Submit Sovereign AI Procurement Request</span>
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </button>

                      <div className="pt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Protected by Hardware HSM • Air-Gapped Escalation Line</span>
                      </div>
                    </form>
                  )}
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
          buttonHref="#intake"
          secondaryText="Explore Sovereign Compliance"
          secondaryHref="#compliance"
        />
      </motion.main>

      <Footer />
    </div>
  );
}
