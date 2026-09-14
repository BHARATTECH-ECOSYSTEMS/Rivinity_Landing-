"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Key,
  ArrowUpRight,
  Check,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

export default function SecurityPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#0f172a] flex flex-col justify-between selection:bg-orange-500/20 selection:text-orange-900">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-20 sm:pt-24 md:pt-28 flex-1 bg-white"
      >
        {/* =========================================================================
            SECTION 1: HERO & DEFENSE POSTURE
            ========================================================================= */}
        <section className="relative overflow-hidden section py-20 sm:py-28 bg-white">

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] max-w-4xl leading-[1.08]">
              Deterministic Security. <br className="hidden sm:inline" />
              Zero Data Exposure.
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-[#64748b] max-w-3xl leading-relaxed">
              Multi-layered defense engineered specifically for generative models, runtime agent loops, and enterprise vector data.
            </p>

            {/* 3-Pillar Security Scoreboard (Horizontal Row - Image 2 Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16">
              {/* Card 1: Orange Glow (Image 2 style) */}
              <div className="relative bg-white rounded-[32px] border border-gray-200/80 p-8 sm:p-9 flex flex-col justify-between min-h-[310px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Zero Model Training
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
                    100% tenant isolation with strict no-log API contracts. Proprietary prompts, system contexts, and completions are never utilized for foundational model retraining.
                  </p>
                </div>

                {/* Ambient Soft Blur Glow (Orange - Image 2 style) */}
                <div className="absolute -bottom-14 -right-10 w-60 h-60 rounded-full bg-gradient-to-tl from-amber-400/50 via-orange-400/35 to-transparent blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-orange-400/15 via-orange-400/5 to-transparent pointer-events-none" />
              </div>

              {/* Card 2: Pink Glow (Image 2 style) */}
              <div className="relative bg-white rounded-[32px] border border-gray-200/80 p-8 sm:p-9 flex flex-col justify-between min-h-[310px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Cryptographic Auditing
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
                    Immutable execution traces with real-time anomaly detection. Every agent dispatch, tool execution, and vector retrieval is cryptographically anchored.
                  </p>
                </div>

                {/* Ambient Soft Blur Glow (Pink - Image 2 style) */}
                <div className="absolute -bottom-14 -right-10 w-60 h-60 rounded-full bg-gradient-to-tl from-pink-400/45 via-rose-400/30 to-transparent blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-pink-400/15 via-pink-400/5 to-transparent pointer-events-none" />
              </div>

              {/* Card 3: Purple Glow (Image 2 style) */}
              <div className="relative bg-white rounded-[32px] border border-gray-200/80 p-8 sm:p-9 flex flex-col justify-between min-h-[310px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Continuous Red-Teaming
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
                    Automated adversarial penetration testing across all runtime layers. Synthetic payload harnesses continuously probe models for novel escape techniques.
                  </p>
                </div>

                {/* Ambient Soft Blur Glow (Purple - Image 2 style) */}
                <div className="absolute -bottom-14 -right-10 w-60 h-60 rounded-full bg-gradient-to-tl from-purple-500/45 via-violet-400/30 to-transparent blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-purple-500/15 via-purple-500/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: AI THREAT VECTOR DEFENSE (ASYMMETRIC BENTO GRID)
            ========================================================================= */}
        <section id="threat-vectors" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                AI Threat Vector Defense
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                Purpose-built runtime filters intercepting adversarial prompts, PII leakage, and model inversion in under 5ms without sacrificing inference velocity.
              </p>
            </div>

            {/* Bento Grid: Image 2 Layout (1 Tall Card on Left + 2 Stacked Cards on Right) with Image 3 Pills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              
              {/* Left Card: Tall Card - Text on Top, Horizontal Orange Pill on Bottom */}
              <div className="group relative bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between min-h-[520px] lg:min-h-[620px]">
                {/* Top Content: Title & Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Prompt Injection &amp; Jailbreak Neutralization
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#64748b] leading-relaxed max-w-lg">
                    Semantic boundary analysis, heuristic token filtering, and multi-layered guardrails intercepting indirect injection payloads before inference execution.
                  </p>
                </div>

                {/* Bottom: Horizontal Orange Pill with Hover Gradient Motion */}
                <div className="pt-16 pb-4 flex items-center justify-center">
                  <div className="relative w-56 sm:w-64 h-16 sm:h-20 rounded-full border border-orange-300/80 bg-gradient-to-b from-white/95 via-white/80 to-white/90 backdrop-blur-md shadow-[0_12px_36px_-6px_rgba(255,107,0,0.32),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(255,107,0,0.15)] group-hover:shadow-[0_16px_44px_-4px_rgba(255,107,0,0.45),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center overflow-hidden transition-all duration-500">
                    {/* Animated Moving Gradient Inside Pill - Centered Motion */}
                    <div className="animate-gradient-x absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-36 h-14 sm:h-16 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF8A3D] to-[#FFAA6C] opacity-80 blur-md pointer-events-none" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-10 rounded-full bg-white/80 blur-sm pointer-events-none" />
                    {/* Top gloss reflection highlight */}
                    <div className="absolute top-1 inset-x-4 h-5 rounded-full bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right Side: Stack of 2 Horizontal Cards with Text on Left and Vertical Pills on Right */}
              <div className="flex flex-col gap-6 lg:gap-8 justify-between">
                
                {/* Right Top Card: Text on Left, Vertical Purple Pill on Right */}
                <div className="group relative bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-8 sm:p-9 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 flex-1 min-h-[280px]">
                  {/* Left Side: Title & Description */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                      Model Inversion &amp; Membership Defense
                    </h3>
                    <p className="mt-2.5 text-sm text-[#64748b] leading-relaxed">
                      Differential privacy noise injection and output entropy validation preventing model parameter probing, membership inference, and training corpus reconstruction.
                    </p>
                  </div>

                  {/* Right Side: Vertical Purple Pill with Centered Motion */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="relative w-14 sm:w-16 h-36 sm:h-40 rounded-full border border-purple-300/80 bg-gradient-to-r from-white/95 via-white/80 to-white/90 backdrop-blur-md shadow-[0_12px_36px_-6px_rgba(168,85,247,0.32),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(168,85,247,0.15)] group-hover:shadow-[0_16px_44px_-4px_rgba(168,85,247,0.45),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center overflow-hidden transition-all duration-500">
                      {/* Animated Moving Gradient Inside Pill - Centered Motion */}
                      <div className="animate-gradient-y absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 h-24 sm:h-28 rounded-full bg-gradient-to-b from-[#7C3AED] via-[#A855F7] to-[#C084FC] opacity-80 blur-md pointer-events-none" />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-14 rounded-full bg-white/80 blur-sm pointer-events-none" />
                      {/* Side gloss reflection highlight */}
                      <div className="absolute left-1 inset-y-3 w-3 rounded-full bg-gradient-to-r from-white/90 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right Bottom Card: Text on Left, Vertical Pink Pill on Right */}
                <div className="group relative bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-8 sm:p-9 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 flex-1 min-h-[280px]">
                  {/* Left Side: Title & Description */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                      Data Exfiltration &amp; PII Sanitization
                    </h3>
                    <p className="mt-2.5 text-sm text-[#64748b] leading-relaxed">
                      Sub-5ms automated regex and transformer-based redaction for secrets, credentials, API tokens, and regulated PII before network transmission.
                    </p>
                  </div>

                  {/* Right Side: Vertical Pink Pill with Centered Motion */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="relative w-14 sm:w-16 h-36 sm:h-40 rounded-full border border-pink-300/80 bg-gradient-to-r from-white/95 via-white/80 to-white/90 backdrop-blur-md shadow-[0_12px_36px_-6px_rgba(244,114,182,0.35),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(244,114,182,0.15)] group-hover:shadow-[0_16px_44px_-4px_rgba(244,114,182,0.48),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center overflow-hidden transition-all duration-500">
                      {/* Animated Moving Gradient Inside Pill - Centered Motion */}
                      <div className="animate-gradient-y absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 h-24 sm:h-28 rounded-full bg-gradient-to-b from-[#DB2777] via-[#F472B6] to-[#FBCFE8] opacity-80 blur-md pointer-events-none" />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-14 rounded-full bg-white/80 blur-sm pointer-events-none" />
                      {/* Side gloss reflection highlight */}
                      <div className="absolute left-1 inset-y-3 w-3 rounded-full bg-gradient-to-r from-white/90 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DATA PROTECTION & CRYPTOGRAPHY ARCHITECTURE
            ========================================================================= */}
        <section id="cryptography" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                Data Protection &amp; Cryptography Architecture
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                End-to-end mathematical guarantees protecting weights, embeddings, and prompt buffers across every compute and transit boundary.
              </p>
            </div>

            {/* 4-Card Grid in Image 2 Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              
              {/* Card 1: Customer-Managed Keys (CMEK) - Purple and White Gradient */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Top Graphic Box: Purple & White Gradient with Geometric Line Art */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-[#A855F7] via-[#C084FC]/50 to-white flex items-center justify-center p-7 sm:p-8 border-b border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-white/25 to-transparent pointer-events-none" />
                  <svg viewBox="0 0 160 160" className="w-full h-full text-[#0f172a] transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="80" cy="80" r="64" />
                    <polygon points="68,54 68,106 108,80" />
                  </svg>
                </div>
                {/* Bottom Content: Title & Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Customer-Managed Keys (CMEK)
                  </h3>
                  <p className="mt-3 text-sm text-[#64748b] leading-relaxed">
                    Full key lifecycle control via AWS KMS, Azure Key Vault, or HashiCorp Vault. Envelope encryption via hardware-backed AES-256.
                  </p>
                </div>
              </div>

              {/* Card 2: End-to-End Transport Encryption - Blue and White Gradient */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Top Graphic Box: Blue & White Gradient with Geometric Line Art */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-[#3B82F6] via-[#93C5FD]/50 to-white flex items-center justify-center p-7 sm:p-8 border-b border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-white/25 to-transparent pointer-events-none" />
                  <svg viewBox="0 0 160 160" className="w-full h-full text-[#0f172a] transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="80" y1="0" x2="80" y2="160" />
                    <line x1="0" y1="80" x2="160" y2="80" />
                    <path d="M 0 80 A 80 80 0 0 0 80 0" />
                    <path d="M 80 0 A 80 80 0 0 0 160 80" />
                    <path d="M 160 80 A 80 80 0 0 0 80 160" />
                    <path d="M 80 160 A 80 80 0 0 0 0 80" />
                  </svg>
                </div>
                {/* Bottom Content: Title & Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    End-to-End Transport Encryption
                  </h3>
                  <p className="mt-3 text-sm text-[#64748b] leading-relaxed">
                    Strict mutual TLS (mTLS) and TLS 1.3 enforcement with automated short-lived certificate rotation and zero plaintext transit hops.
                  </p>
                </div>
              </div>

              {/* Card 3: Ephemeral Inference Buffers - Orange and White Gradient */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Top Graphic Box: Orange & White Gradient with Geometric Line Art */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-[#FF6B00] via-[#FDBA74]/50 to-white flex items-center justify-center p-7 sm:p-8 border-b border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-white/25 to-transparent pointer-events-none" />
                  <svg viewBox="0 0 160 160" className="w-full h-full text-[#0f172a] transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 32 46 C 32 30 46 20 68 20 L 98 20 C 122 20 136 34 136 54 C 136 74 122 88 100 88 L 84 88 L 54 114 L 56 88 C 42 84 32 72 32 54 Z" />
                    <circle cx="68" cy="54" r="4.5" fill="currentColor" />
                    <circle cx="84" cy="54" r="4.5" fill="currentColor" />
                    <circle cx="100" cy="54" r="4.5" fill="currentColor" />
                  </svg>
                </div>
                {/* Bottom Content: Title & Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Ephemeral Inference Buffers
                  </h3>
                  <p className="mt-3 text-sm text-[#64748b] leading-relaxed">
                    In-memory stateless processing; prompts, vector embeddings, and generation states are flushed immediately following response emission.
                  </p>
                </div>
              </div>

              {/* Card 4: Isolated Tenant Sandboxes - Pink and White Gradient */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Top Graphic Box: Pink & White Gradient with Geometric Line Art */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-[#EC4899] via-[#F472B6]/50 to-white flex items-center justify-center p-7 sm:p-8 border-b border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-white/25 to-transparent pointer-events-none" />
                  <svg viewBox="0 0 160 160" className="w-full h-full text-[#0f172a] transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="26" y="26" width="108" height="108" rx="8" transform="rotate(45 80 80)" />
                    <circle cx="68" cy="74" r="4.5" fill="currentColor" />
                    <circle cx="92" cy="74" r="4.5" fill="currentColor" />
                    <path d="M 68 96 Q 80 110 92 96" />
                  </svg>
                </div>
                {/* Bottom Content: Title & Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                    Isolated Tenant Sandboxes
                  </h3>
                  <p className="mt-3 text-sm text-[#64748b] leading-relaxed">
                    Kernel-level network segmentation and microVM isolation preventing cross-tenant data leaks and unauthorized inter-process introspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: LIVE COMPLIANCE & CERTIFICATION MATRIX
            ========================================================================= */}
        <section id="compliance-matrix" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                Live Compliance &amp; Certification Matrix
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                Statutory verified controls, annual independent penetration reports, and continuous SOC 2 audit pipelines updated in real time.
              </p>
            </div>

            {/* Clean Comparison Table with Hairline Borders */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-mono text-gray-600 uppercase tracking-wider">
                      <th scope="col" className="py-4 px-6 font-semibold">Standard / Framework</th>
                      <th scope="col" className="py-4 px-6 font-semibold">Scope &amp; Verification Details</th>
                      <th scope="col" className="py-4 px-6 font-semibold">Audit Cadence</th>
                      <th scope="col" className="py-4 px-6 font-semibold text-right">Live Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm">
                    {/* Row 1: SOC 2 Type II */}
                    <tr className="bg-white hover:bg-gray-50/60 transition-colors">
                      <td className="py-5 px-6 font-bold text-[#0f172a] whitespace-nowrap">
                        SOC 2 Type II
                      </td>
                      <td className="py-5 px-6 text-[#64748b] max-w-md leading-relaxed">
                        Continuous audit reporting available under NDA via automated Trust Center. Covers Security, Availability, and Confidentiality trust service criteria.
                      </td>
                      <td className="py-5 px-6 text-xs font-mono text-gray-500 whitespace-nowrap">
                        Continuous (Real-Time)
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 text-xs font-mono">
                          <Check className="w-3 h-3" />
                          <span>VERIFIED // ACTIVE</span>
                        </span>
                      </td>
                    </tr>

                    {/* Row 2: ISO 27001 & ISO 42001 */}
                    <tr className="bg-white hover:bg-gray-50/60 transition-colors">
                      <td className="py-5 px-6 font-bold text-[#0f172a] whitespace-nowrap">
                        ISO 27001 &amp; ISO 42001
                      </td>
                      <td className="py-5 px-6 text-[#64748b] max-w-md leading-relaxed">
                        Verified controls for information security management systems (ISMS) and artificial intelligence governance frameworks.
                      </td>
                      <td className="py-5 px-6 text-xs font-mono text-gray-500 whitespace-nowrap">
                        Annual Recertification
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 text-xs font-mono">
                          <Check className="w-3 h-3" />
                          <span>CERTIFIED // ACTIVE</span>
                        </span>
                      </td>
                    </tr>

                    {/* Row 3: HIPAA & BAA */}
                    <tr className="bg-white hover:bg-gray-50/60 transition-colors">
                      <td className="py-5 px-6 font-bold text-[#0f172a] whitespace-nowrap">
                        HIPAA &amp; BAA
                      </td>
                      <td className="py-5 px-6 text-[#64748b] max-w-md leading-relaxed">
                        Compliant infrastructure configurations supporting protected health information (PHI) with executed Business Associate Agreements.
                      </td>
                      <td className="py-5 px-6 text-xs font-mono text-gray-500 whitespace-nowrap">
                        Continuous Attestation
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 text-xs font-mono">
                          <Check className="w-3 h-3" />
                          <span>COMPLIANT // BAA READY</span>
                        </span>
                      </td>
                    </tr>

                    {/* Row 4: GDPR & CCPA */}
                    <tr className="bg-white hover:bg-gray-50/60 transition-colors">
                      <td className="py-5 px-6 font-bold text-[#0f172a] whitespace-nowrap">
                        GDPR &amp; CCPA
                      </td>
                      <td className="py-5 px-6 text-[#64748b] max-w-md leading-relaxed">
                        Complete data sovereignty tools, automated right-to-be-forgotten webhooks, EU-isolated inference nodes, and local processing flags.
                      </td>
                      <td className="py-5 px-6 text-xs font-mono text-gray-500 whitespace-nowrap">
                        Statutory Ongoing
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 text-xs font-mono">
                          <Check className="w-3 h-3" />
                          <span>SOVEREIGN // VERIFIED</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: SECURITY OPERATIONS & VULNERABILITY REPORTING
            ========================================================================= */}
        <section id="secops" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Clean White Card Container (No Gradient) */}
            <div className="relative overflow-hidden bg-white border border-gray-200/90 rounded-3xl sm:rounded-[32px] p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column: Details without unwanted badge */}
                <div className="lg:col-span-6 xl:col-span-7">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0f172a]">
                    Responsible Disclosure &amp; Vulnerability Program
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-[#64748b] leading-relaxed">
                    We collaborate closely with global security researchers, academic red-teams, and independent ethical hackers. All verified vulnerabilities receive rapid triage, bounties, and safe-harbor protection.
                  </p>

                  <div className="mt-6 space-y-3.5 text-sm text-[#475569]">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>Bug bounty payouts up to $25,000 for verified high-severity and zero-day discoveries.</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>Initial human response within 4 hours; full remediation SLA within 48 business hours.</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                        <Key className="w-3 h-3" />
                      </div>
                      <span>Official PGP Key Fingerprint: <code className="text-xs font-mono font-bold text-[#0f172a] bg-gray-100 px-2 py-0.5 rounded">F48D 99A2 3C81 0E92</code></span>
                    </div>
                  </div>

                  {/* Actions in Left Column - Matches CTA button styling */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href="mailto:security@rivinity.ai"
                      style={{ color: "#ffffff" }}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[#0f172a] hover:bg-slate-800 !text-white text-white font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                    >
                      <span className="!text-white text-white font-semibold" style={{ color: "#ffffff" }}>Report Vulnerability</span>
                      <ArrowUpRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                    </a>
                    <a
                      href="mailto:security@rivinity.ai"
                      style={{ color: "#1e293b" }}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-slate-900 font-medium text-sm border border-slate-200 shadow-xs hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                    >
                      <span className="!text-slate-800 text-slate-800 font-medium" style={{ color: "#1e293b" }}>security@rivinity.ai</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Fake Skeleton Design in Grid Design */}
                <div className="lg:col-span-6 xl:col-span-5">
                  <div className="bg-gray-50/90 border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    {/* Skeleton Header / Top Mock Toolbar */}
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                        <div className="w-24 h-3 bg-gray-200 rounded-md ml-2 animate-pulse" />
                      </div>
                    </div>

                    {/* Skeleton Grid: 2x2 Grid Design */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Grid Cell 1 */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded bg-purple-300 animate-pulse" />
                          </div>
                          <div className="w-12 h-3.5 rounded-full bg-purple-100/70 animate-pulse" />
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="w-4/5 h-3 bg-gray-200/80 rounded animate-pulse" />
                          <div className="w-3/5 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-purple-400 rounded-full" />
                        </div>
                      </div>

                      {/* Grid Cell 2 */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded bg-blue-300 animate-pulse" />
                          </div>
                          <div className="w-12 h-3.5 rounded-full bg-blue-100/70 animate-pulse" />
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="w-5/6 h-3 bg-gray-200/80 rounded animate-pulse" />
                          <div className="w-1/2 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="w-1/2 h-full bg-blue-400 rounded-full" />
                        </div>
                      </div>

                      {/* Grid Cell 3 */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded bg-orange-300 animate-pulse" />
                          </div>
                          <div className="w-12 h-3.5 rounded-full bg-orange-100/70 animate-pulse" />
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="w-3/4 h-3 bg-gray-200/80 rounded animate-pulse" />
                          <div className="w-2/3 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-orange-400 rounded-full" />
                        </div>
                      </div>

                      {/* Grid Cell 4 */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded bg-pink-300 animate-pulse" />
                          </div>
                          <div className="w-12 h-3.5 rounded-full bg-pink-100/70 animate-pulse" />
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="w-4/5 h-3 bg-gray-200/80 rounded animate-pulse" />
                          <div className="w-2/5 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="w-2/3 h-full bg-pink-400 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Skeleton Rows / Activity Queue */}
                    <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#64748b]">
                        <div className="w-28 h-2.5 bg-gray-200 rounded animate-pulse" />
                        <div className="w-16 h-2.5 bg-gray-100 rounded animate-pulse" />
                      </div>
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                            <div className="w-36 h-2 bg-gray-200/80 rounded animate-pulse" />
                          </div>
                          <div className="w-14 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                            <div className="w-44 h-2 bg-gray-200/80 rounded animate-pulse" />
                          </div>
                          <div className="w-12 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                            <div className="w-28 h-2 bg-gray-200/80 rounded animate-pulse" />
                          </div>
                          <div className="w-16 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Security FAQ */}
        <FaqSection
          title="Questions about Rivinity cybersecurity?"
          subtitle="Learn how Rivinity approaches application security, cloud isolation, AI guardrails, data privacy, and vulnerability management."
          items={[
            {
              question: "Do you train AI models on customer data or prompts?",
              answer:
                "Never. Rivinity operates on strict zero-retention policies. Your prompts, proprietary document embeddings, and model responses are never stored for training foundational models.",
            },
            {
              question: "How does Rivinity defend against prompt injection and jailbreaking?",
              answer:
                "Rivinity intercepts every inference request through an inline sub-5ms security filter that validates prompt boundaries, inspects vector retrieval contexts, and prevents adversarial jailbreak attempts before reaching the LLM.",
            },
            {
              question: "Can we deploy Rivinity inside our own isolated VPC?",
              answer:
                "Yes. Enterprise plans support single-tenant VPC peering on AWS, GCP, and Azure, as well as air-gapped disconnected runtimes for regulated healthcare, defense, and banking institutions.",
            },
            {
              question: "What compliance standards does Rivinity support?",
              answer:
                "Rivinity is architected in accordance with SOC 2 Type II, ISO 27001, ISO 42001, GDPR, and HIPAA standards. Enterprise customers can sign standard Business Associate Agreements (BAAs).",
            },
            {
              question: "How is data encrypted at rest and in transit?",
              answer:
                "All customer secrets, vector databases, and state records are encrypted with AES-256 with optional customer-managed keys (BYOK). All external and inter-service network communications require TLS 1.3.",
            },
            {
              question: "How can our security team report a vulnerability or request a penetration audit?",
              answer:
                "You can reach our dedicated Security Operations Center directly through our contact page or by emailing security@rivinity.ai for vulnerability disclosure and compliance reports.",
            },
          ]}
        />

        {/* Unified Dynamic CTA Section */}
        <CtaSection
          title="Secure your AI perimeter with zero-trust defense"
          description="Protect LLM runtimes, API gateways, and multi-agent workflows against prompt injection, data exfiltration, and model evasion attacks."
          buttonText="Schedule Security Audit"
          buttonHref="/contact"
          secondaryText="Explore Threat Detection"
          secondaryHref="#threat-vectors"
        />
      </motion.main>

      <Footer />
    </div>
  );
}