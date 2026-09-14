"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Terminal,
  Code,
  Cpu,
  Zap,
  ExternalLink,
  GitBranch,
  Layers,
  Sparkles,
  Server,
  Clock,
  Boxes,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";

type CodeLang = "python" | "typescript" | "curl" | "go";

const CODE_SNIPPETS: Record<CodeLang, { filename: string; code: string }> = {
  python: {
    filename: "quickstart.py",
    code: `from rivinity import Rivinity

client = Rivinity(api_key="riv_live_...")

stream = client.chat.completions.create(
    model="rivinity-reasoner-v2",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "How do I implement rate limiting in FastAPI?"}
    ],
    stream=True,
    temperature=0.2
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)`,
  },
  typescript: {
    filename: "quickstart.ts",
    code: `import { Rivinity } from "@rivinity/sdk";

const rivinity = new Rivinity({
  apiKey: process.env.RIVINITY_API_KEY,
});

const stream = await rivinity.chat.completions.create({
  model: "rivinity-reasoner-v2",
  messages: [
    { role: "system", content: "You are a helpful coding assistant." },
    { role: "user", content: "Explain async/await in TypeScript." },
  ],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`,
  },
  curl: {
    filename: "curl_request.sh",
    code: `curl https://api.rivinity.ai/v1/chat/completions \\
  -H "Authorization: Bearer $RIVINITY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "rivinity-reasoner-v2",
    "messages": [
      {"role": "user", "content": "Hello world!"}
    ],
    "stream": true
  }'`,
  },
  go: {
    filename: "main.go",
    code: `package main

import (
	"context"
	"fmt"
	"os"

	"github.com/rivinity/rivinity-go"
)

func main() {
	client := rivinity.NewClient(os.Getenv("RIVINITY_API_KEY"))

	stream, err := client.Chat.CreateStream(context.Background(), &rivinity.ChatRequest{
		Model: "rivinity-reasoner-v2",
		Messages: []rivinity.Message{
			{Role: "user", Content: "Hello from Go!"},
		},
	})
	if err != nil {
		panic(err)
	}

	for chunk := range stream.Chunks() {
		fmt.Print(chunk.Content)
	}
}`,
  },
};

export default function DeveloperPage() {
  const [activeLang, setActiveLang] = useState<CodeLang>("python");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeLang].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyInstall = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedInstall(id);
    setTimeout(() => setCopiedInstall(null), 2000);
  };

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
            SECTION 1: HERO & INTERACTIVE QUICKSTART TERMINAL
            ========================================================================= */}
        <section className="relative overflow-hidden section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Headline & Subheadline */}
            <div className="max-w-4xl mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] leading-[1.08]">
                Fast, Reliable AI APIs <br className="hidden sm:inline" />
                for Developers.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-[#64748b] leading-relaxed max-w-3xl">
                Build streaming completions, structured data extraction, and
                tool-calling workflows with clean SDKs and predictable latency.
              </p>
            </div>

            {/* Quickstart Code Console: 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Side: Fast-Start SDK Installation Steps */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
                    Quickstart
                  </h3>
                  <p className="mt-2 text-sm text-[#64748b] leading-relaxed">
                    Install the official client library for your stack and
                    authenticate with your API key.
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Step 1: Install */}
                    <div className="bg-gray-50 border border-gray-200/90 rounded-2xl p-4">
                      <div className="text-xs font-medium text-gray-500 mb-2">
                        1. Install client library
                      </div>
                      <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 font-mono text-xs text-[#0f172a]">
                        <span className="truncate">
                          npm install @rivinity/sdk
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyInstall(
                              "npm install @rivinity/sdk",
                              "npm",
                            )
                          }
                          className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
                          aria-label="Copy npm command"
                        >
                          {copiedInstall === "npm" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 font-mono text-xs text-[#0f172a] mt-2">
                        <span className="truncate">pip install rivinity</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyInstall("pip install rivinity", "pip")
                          }
                          className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
                          aria-label="Copy pip command"
                        >
                          {copiedInstall === "pip" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Environment Config */}
                    <div className="bg-gray-50 border border-gray-200/90 rounded-2xl p-4">
                      <div className="text-xs font-medium text-gray-500 mb-2">
                        2. Configure API key
                      </div>
                      <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 font-mono text-xs text-[#0f172a]">
                        <span className="truncate">
                          export RIVINITY_API_KEY=&quot;riv_live_...&quot;
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyInstall(
                              'export RIVINITY_API_KEY="riv_live_..."',
                              "key",
                            )
                          }
                          className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
                          aria-label="Copy API key command"
                        >
                          {copiedInstall === "key" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-[#64748b]">
                  <span>Get your API key in the dashboard</span>
                  <Link
                    href="/docs"
                    className="font-semibold text-[#0f172a] hover:text-orange-600 flex items-center gap-1 transition-colors"
                  >
                    <span>API Docs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Side: Tabbed Interactive Terminal Box */}
              <div className="lg:col-span-7 flex flex-col bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
                {/* Terminal Header Bar */}
                <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-gray-200/90 gap-3">
                  <div className="flex items-center gap-3">
                    {/* Window Dot Indicators */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                    </div>
                    <span className="text-xs font-mono text-gray-600 font-semibold">
                      {CODE_SNIPPETS[activeLang].filename}
                    </span>
                  </div>

                  {/* Language Tab Switcher */}
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 text-xs font-mono">
                    {(["python", "typescript", "curl", "go"] as CodeLang[]).map(
                      (lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveLang(lang)}
                          className={`px-3 py-1 rounded-lg transition-all capitalize cursor-pointer ${
                            activeLang === lang
                              ? "bg-[#0f172a] text-white font-semibold shadow-xs"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {lang === "curl" ? "cURL" : lang}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Terminal Code Body */}
                <div className="flex-1 bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 font-mono text-xs text-gray-800 overflow-x-auto relative">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-mono bg-gray-50 hover:bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-lg text-gray-700 transition-all cursor-pointer shadow-xs"
                    aria-label="Copy code to clipboard"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <pre className="text-xs leading-relaxed font-mono whitespace-pre overflow-x-auto text-[#0f172a]">
                    <code>{CODE_SNIPPETS[activeLang].code}</code>
                  </pre>
                </div>

                {/* Terminal Footer Metas */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 px-1">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-orange-500" />
                    <span>Streaming enabled</span>
                  </span>
                  <span>Server-Sent Events &amp; WebSockets</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CORE API PRIMITIVES (ASYMMETRIC BENTO GRID)
            ========================================================================= */}
        <section id="primitives" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                Core API Primitives
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                Reliable building blocks for streaming chat, structured data
                extraction, and tool execution.
              </p>
            </div>

            {/* 3 Folder-Tab Cards (Glassmorphism & White Borders - Full Text) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* Card 1: Orange (001) */}
              <div className="relative aspect-[4/4] sm:aspect-[4/3.8] rounded-[32px] border-[2.5px] border-white overflow-hidden flex flex-col justify-between bg-white/40 backdrop-blur-xl shadow-[0_15px_35px_-5px_rgba(249,115,22,0.14),0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.25)] hover:-translate-y-1.5 transition-all duration-300 group">
                {/* Atmospheric Glowing Mesh Background (Orange) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed] via-[#ffedd5]/60 to-[#fff7ed] pointer-events-none">
                  <div className="absolute -top-12 -right-8 w-72 h-72 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 blur-2xl opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute top-4 left-4 w-52 h-52 rounded-full bg-amber-300 blur-xl opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-6 right-8 w-48 h-48 rounded-full bg-orange-400/40 blur-2xl" />
                  {/* Subtle Glass Diagonal Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Spacer - Compact */}
                <div className="relative z-0 h-6 sm:h-8" />

                {/* Folder Flap with Glassmorphism & White Contour */}
                <div className="relative z-10 w-full mt-auto backdrop-blur-md">
                  <svg
                    viewBox="0 0 400 255"
                    preserveAspectRatio="none"
                    className="w-full h-auto block filter drop-shadow-[0_-4px_16px_rgba(255,255,255,0.4)]"
                  >
                    <defs>
                      <linearGradient
                        id="glass-orange-flap"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.84"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.68"
                        />
                      </linearGradient>
                    </defs>
                    {/* Flap Fill (Frosted Glass Translucent) */}
                    <path
                      d="M -2, 0 L 205, 0 Q 220,0 228,14 L 238, 30 Q 246,42 262,42 L 402, 42 L 402, 260 L -2, 260 Z"
                      fill="url(#glass-orange-flap)"
                    />
                    {/* Top Stepped Contour Stroke (Pure White Glass Rim) */}
                    <path
                      d="M -2, 0 L 205, 0 Q 220,0 228,14 L 238, 30 Q 246,42 262,42 L 402, 42"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Flap Content */}
                  <div className="absolute inset-0 px-6 sm:px-7 pb-6 sm:pb-7 pt-2.5 sm:pt-3 flex flex-col justify-between">
                    {/* Top Tab Info */}
                    <div className="max-w-[50%]">
                      <div className="font-mono text-[11px] sm:text-xs font-bold text-[#0f172a] tracking-wider">
                        TOKEN-STREAMING
                      </div>
                      <div className="font-mono text-[9px] sm:text-[10px] font-medium text-[#64748b] tracking-tight mt-0.5">
                        SSE, WEBSOCKETS, TTFT
                      </div>
                    </div>

                    {/* Middle Description - Full text without truncation */}
                    <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed mt-2 sm:mt-2.5">
                      Stream completions instantly with Server-Sent Events and
                      bi-directional WebSockets. Minimize latency and keep
                      conversational interfaces responsive.
                    </p>

                    {/* Bottom Row */}
                    <div className="flex items-end justify-between pt-2">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                        001
                      </span>
                      <span className="font-mono text-xs font-bold text-[#64748b] tracking-wider">
                        &lt; 20MS TTFT
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Purple (002) */}
              <div className="relative aspect-[4/4] sm:aspect-[4/3.8] rounded-[32px] border-[2.5px] border-white overflow-hidden flex flex-col justify-between bg-white/40 backdrop-blur-xl shadow-[0_15px_35px_-5px_rgba(168,85,247,0.14),0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.25)] hover:-translate-y-1.5 transition-all duration-300 group">
                {/* Atmospheric Glowing Mesh Background (Purple) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ff] via-[#f3e8ff]/60 to-[#faf5ff] pointer-events-none">
                  <div className="absolute -top-12 -right-8 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 blur-2xl opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute top-4 left-4 w-52 h-52 rounded-full bg-violet-300 blur-xl opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-6 right-8 w-48 h-48 rounded-full bg-purple-400/40 blur-2xl" />
                  {/* Subtle Glass Diagonal Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Spacer - Compact */}
                <div className="relative z-0 h-6 sm:h-8" />

                {/* Folder Flap with Glassmorphism & White Contour */}
                <div className="relative z-10 w-full mt-auto backdrop-blur-md">
                  <svg
                    viewBox="0 0 400 255"
                    preserveAspectRatio="none"
                    className="w-full h-auto block filter drop-shadow-[0_-4px_16px_rgba(255,255,255,0.4)]"
                  >
                    <defs>
                      <linearGradient
                        id="glass-purple-flap"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.84"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.68"
                        />
                      </linearGradient>
                    </defs>
                    {/* Flap Fill (Frosted Glass Translucent) */}
                    <path
                      d="M -2, 0 L 205, 0 Q 220,0 228,14 L 238, 30 Q 246,42 262,42 L 402, 42 L 402, 260 L -2, 260 Z"
                      fill="url(#glass-purple-flap)"
                    />
                    {/* Top Stepped Contour Stroke (Pure White Glass Rim) */}
                    <path
                      d="M -2, 0 L 205, 0 Q 220,0 228,14 L 238, 30 Q 246,42 262,42 L 402, 42"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Flap Content */}
                  <div className="absolute inset-0 px-6 sm:px-7 pb-6 sm:pb-7 pt-2.5 sm:pt-3 flex flex-col justify-between">
                    {/* Top Tab Info */}
                    <div className="max-w-[50%]">
                      <div className="font-mono text-[11px] sm:text-xs font-bold text-[#0f172a] tracking-wider">
                        CONTEXT-GRAPH
                      </div>
                      <div className="font-mono text-[9px] sm:text-[10px] font-medium text-[#64748b] tracking-tight mt-0.5">
                        HYBRID SEARCH, VECTOR RAG
                      </div>
                    </div>

                    {/* Middle Description - Full text without truncation */}
                    <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed mt-2 sm:mt-2.5">
                      Connect vector databases and knowledge bases with dense
                      embeddings, BM25 hybrid search, and semantic caching for
                      dynamic prompt context.
                    </p>

                    {/* Bottom Row */}
                    <div className="flex items-end justify-between pt-2">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                        002
                      </span>
                      <span className="font-mono text-xs font-bold text-[#64748b] tracking-wider">
                        HYBRID RAG
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Pink (003) */}
              <div className="relative aspect-[4/4] sm:aspect-[4/3.8] rounded-[32px] border-[2.5px] border-white overflow-hidden flex flex-col justify-between bg-white/40 backdrop-blur-xl shadow-[0_15px_35px_-5px_rgba(244,63,94,0.14),0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(244,63,94,0.25)] hover:-translate-y-1.5 transition-all duration-300 group">
                {/* Atmospheric Glowing Mesh Background (Pink) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#fdf2f8] via-[#fce7f3]/60 to-[#fdf2f8] pointer-events-none">
                  <div className="absolute -top-12 -right-8 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 blur-2xl opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute top-4 left-4 w-52 h-52 rounded-full bg-rose-300 blur-xl opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-6 right-8 w-48 h-48 rounded-full bg-pink-400/40 blur-2xl" />
                  {/* Subtle Glass Diagonal Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Top Spacer - Compact */}
                <div className="relative z-0 h-6 sm:h-8" />

                {/* Folder Flap with Glassmorphism & White Contour */}
                <div className="relative z-10 w-full mt-auto backdrop-blur-md">
                  <svg
                    viewBox="0 0 400 255"
                    preserveAspectRatio="none"
                    className="w-full h-auto block filter drop-shadow-[0_-4px_16px_rgba(255,255,255,0.4)]"
                  >
                    <defs>
                      <linearGradient
                        id="glass-pink-flap"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.84"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.68"
                        />
                      </linearGradient>
                    </defs>
                    {/* Flap Fill (Frosted Glass Translucent) */}
                    <path
                      d="M -2, 0 L 205, 0 Q 220,0 228,14 L 238, 30 Q 246,42 262,42 L 402, 42 L 402, 260 L -2, 260 Z"
                      fill="url(#glass-pink-flap)"
                    />
                    {/* Top Stepped Contour Stroke (Pure White Glass Rim) */}
                    <path
                      d="M -2, 0 L 205, 0 Q 220,0 228,14 L 238, 30 Q 246,42 262,42 L 402, 42"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Flap Content */}
                  <div className="absolute inset-0 px-6 sm:px-7 pb-6 sm:pb-7 pt-2.5 sm:pt-3 flex flex-col justify-between">
                    {/* Top Tab Info */}
                    <div className="max-w-[50%]">
                      <div className="font-mono text-[11px] sm:text-xs font-bold text-[#0f172a] tracking-wider">
                        SCHEMA-VALIDATOR
                      </div>
                      <div className="font-mono text-[9px] sm:text-[10px] font-medium text-[#64748b] tracking-tight mt-0.5">
                        PYDANTIC V2, STRICT JSON
                      </div>
                    </div>

                    {/* Middle Description - Full text without truncation */}
                    <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed mt-2 sm:mt-2.5">
                      Enforce strict JSON schemas using TypeScript types or
                      Pydantic models. Reliably extract structured outputs and
                      trigger tools with zero formatting errors.
                    </p>

                    {/* Bottom Row */}
                    <div className="flex items-end justify-between pt-2">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                        003
                      </span>
                      <span className="font-mono text-xs font-bold text-[#64748b] tracking-wider">
                        100% STRICT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: OFFICIAL SDKS & FRAMEWORK INTEGRATIONS
            ========================================================================= */}
        <section id="sdks" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                Official SDKs
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                Clean, fully typed libraries for your preferred languages and
                runtimes.
              </p>
            </div>

            {/* 4-Card Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {/* Box 1 (Purple Theme): Python */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[320px]">
                <div>
                  {/* Icon & Heading Row */}
                  <div className="flex items-center gap-7 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-purple-600" />
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                      Python
                    </h3>
                  </div>

                  <p className="text-sm text-[#64748b] leading-relaxed">
                    Native async client with streaming support, Pydantic type
                    validation, and LangChain &amp; LlamaIndex integrations.
                  </p>
                </div>

                {/* Nested bg-gray-50 rounded block */}
                <div className="mt-6 pt-3">
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3 py-2 font-mono text-xs text-[#0f172a] flex items-center justify-between">
                    <span className="text-purple-700 font-semibold">$</span>
                    <span className="truncate flex-1 ml-2">
                      pip install rivinity
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2 (Pink Theme): TypeScript & Next.js */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[320px]">
                <div>
                  {/* Icon & Heading Row */}
                  <div className="flex items-center gap-7 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="w-5 h-5 rounded-full border-2 border-pink-500 absolute -top-0.5 -left-0.5" />
                      <div className="w-5 h-5 rounded-full border-2 border-pink-400 absolute -bottom-0.5 -right-0.5" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                      TypeScript
                    </h3>
                  </div>

                  <p className="text-sm text-[#64748b] leading-relaxed">
                    First-class TypeScript typings and zero dependencies. Works
                    seamlessly in Node.js, Next.js, and edge workers.
                  </p>
                </div>

                <div className="mt-6 pt-3">
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3 py-2 font-mono text-xs text-[#0f172a] flex items-center justify-between">
                    <span className="text-pink-600 font-semibold">$</span>
                    <span className="truncate flex-1 ml-2">
                      npm i @rivinity/sdk
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 3 (Orange Theme): Go */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[320px]">
                <div>
                  {/* Icon & Heading Row */}
                  <div className="flex items-center gap-7 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="w-7 h-7 bg-[#FF6B00] rounded-tl-full absolute bottom-0 right-0" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                      Go
                    </h3>
                  </div>

                  <p className="text-sm text-[#64748b] leading-relaxed">
                    High-performance client for Go backends with context
                    propagation, streaming support, and connection reuse.
                  </p>
                </div>

                <div className="mt-6 pt-3">
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3 py-2 font-mono text-xs text-[#0f172a] flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">$</span>
                    <span className="truncate flex-1 ml-2">
                      go get github.com/rivinity/rivinity-go
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 4 (Blue/Slate Theme): CLI */}
              <div className="group bg-white rounded-3xl sm:rounded-[32px] border border-gray-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[320px]">
                <div>
                  {/* Icon & Heading Row */}
                  <div className="flex items-center gap-7 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="w-6 h-6 bg-blue-600 rotate-45 rounded-sm" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                      Rivinity CLI
                    </h3>
                  </div>

                  <p className="text-sm text-[#64748b] leading-relaxed">
                    Run test completions, monitor token consumption, and manage
                    project keys directly from the command line.
                  </p>
                </div>

                <div className="mt-6 pt-3">
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3 py-2 font-mono text-xs text-[#0f172a] flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">$</span>
                    <span className="truncate flex-1 ml-2">
                      brew install rivinity/cli
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TELEMETRY, OBSERVABILITY & RATE LIMITS
            ========================================================================= */}
        <section id="telemetry" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div className="max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                  Performance &amp; Observability
                </h2>
                <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                  Transparent latency benchmarks, rate limit tiers, and
                  distributed tracing support.
                </p>
              </div>
            </div>

            {/* Pure White Comparison Table with Hairline Borders */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/90 border-b border-gray-200 text-xs text-gray-600 uppercase tracking-wider">
                      <th scope="col" className="py-4 px-6 font-semibold">
                        Capability / Metric
                      </th>
                      <th scope="col" className="py-4 px-6 font-semibold">
                        Specifications
                      </th>
                      <th scope="col" className="py-4 px-6 font-semibold">
                        Integrations
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-6 font-semibold text-right"
                      >
                        SLA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {/* Row 1: Inference Latency */}
                    <tr className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0f172a]">
                          Inference Latency
                        </div>
                        <div className="text-xs text-[#64748b]">
                          Time to First Token (TTFT)
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-[#0f172a]">
                        <span className="text-emerald-700 font-semibold">
                          p50: 12ms
                        </span>{" "}
                        · p95: 28ms · p99: 44ms
                      </td>
                      <td className="py-4 px-6 text-xs text-[#64748b]">
                        Optimized for SSE &amp; HTTP/2 Streaming
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Sub-20ms TTFT
                        </span>
                      </td>
                    </tr>

                    {/* Row 2: Rate Limiting */}
                    <tr className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0f172a]">
                          Rate Limits
                        </div>
                        <div className="text-xs text-[#64748b]">
                          Request &amp; token throughput
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-[#475569]">
                        Free: 60 RPM · Pro: 1,000 RPM · Enterprise: Custom
                        quotas
                      </td>
                      <td className="py-4 px-6 text-xs text-[#64748b]">
                        Automated concurrency management
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          No cold starts
                        </span>
                      </td>
                    </tr>

                    {/* Row 3: OpenTelemetry Tracing */}
                    <tr className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0f172a]">
                          Observability
                        </div>
                        <div className="text-xs text-[#64748b]">
                          Distributed traces &amp; metrics
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-[#475569]">
                        OpenTelemetry (OTLP) exporters for traces, token counts,
                        and tool calls
                      </td>
                      <td className="py-4 px-6 text-xs text-[#64748b]">
                        Datadog · Langfuse · Arize Phoenix · New Relic
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                          OpenTelemetry
                        </span>
                      </td>
                    </tr>

                    {/* Row 4: Failover & Regions */}
                    <tr className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0f172a]">
                          Global Availability
                        </div>
                        <div className="text-xs text-[#64748b]">
                          Edge network &amp; multi-region failover
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-[#475569]">
                        Multi-region clusters with sub-second automated failover
                      </td>
                      <td className="py-4 px-6 text-xs text-[#64748b]">
                        US-East · US-West · EU-Central · AP-South
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          99.99% Uptime
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
            SECTION 5: COOKBOOKS, CODE RECIPES & CHANGELOG FEED
            ========================================================================= */}
        <section id="cookbooks" className="section py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
                Cookbooks &amp; Code Recipes
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed">
                Production-ready starter templates and multi-agent examples from our open-source repository.
              </p>
            </div>

            {/* 3-Card Grid for Cookbooks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* Recipe 1 */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-3 py-1 rounded-full">
                      Agent Workflows
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-purple-600 group-hover:border-purple-300 group-hover:bg-purple-50/50 transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-purple-600 transition-colors tracking-tight">
                    Autonomous Support Agent with Tool Calling
                  </h3>
                  <p className="mt-2.5 text-sm text-[#64748b] leading-relaxed">
                    Human-in-the-loop approvals, ticket database queries, and automatic conversational escalation.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#94a3b8] font-mono">
                  <span>Python · LangChain</span>
                  <span className="text-purple-600 font-sans font-semibold group-hover:underline">
                    View Recipe →
                  </span>
                </div>
              </a>

              {/* Recipe 2 */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200/70 px-3 py-1 rounded-full">
                      Structured Outputs
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-orange-600 group-hover:border-orange-300 group-hover:bg-orange-50/50 transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-orange-600 transition-colors tracking-tight">
                    Invoice &amp; Document Schema Extraction
                  </h3>
                  <p className="mt-2.5 text-sm text-[#64748b] leading-relaxed">
                    Extract clean structured JSON from PDFs and tables with strict schema validation.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#94a3b8] font-mono">
                  <span>TypeScript · Zod</span>
                  <span className="text-orange-600 font-sans font-semibold group-hover:underline">
                    View Recipe →
                  </span>
                </div>
              </a>

              {/* Recipe 3 */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 hover:border-pink-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-semibold text-pink-700 bg-pink-50 border border-pink-200/70 px-3 py-1 rounded-full">
                      Hybrid Search
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-pink-600 group-hover:border-pink-300 group-hover:bg-pink-50/50 transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-pink-600 transition-colors tracking-tight">
                    Multi-Modal Vector RAG Pipeline
                  </h3>
                  <p className="mt-2.5 text-sm text-[#64748b] leading-relaxed">
                    Dense neural embeddings combined with BM25 keyword search and cross-encoder reranking.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#94a3b8] font-mono">
                  <span>Python · Vector RAG</span>
                  <span className="text-pink-600 font-sans font-semibold group-hover:underline">
                    View Recipe →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Unified FAQ Section */}
        <FaqSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about building with Rivinity APIs and SDKs."
          items={[
            {
              question: "How fast is Rivinity's response streaming?",
              answer:
                "Our global edge network delivers streaming completions with a median time-to-first-token of 12ms and p95 under 30ms, keeping interactive applications fast and responsive.",
            },
            {
              question: "Is Rivinity compatible with existing OpenAI SDK code?",
              answer:
                "Yes. Rivinity supports standard OpenAI client libraries. You can use your existing client by updating the baseURL to https://api.rivinity.ai/v1 and adding your Rivinity API key.",
            },
            {
              question: "How does structured JSON output work?",
              answer:
                "We enforce schema constraints during token generation. The model is guaranteed to return valid JSON matching your TypeScript interface or Pydantic model without formatting errors.",
            },
            {
              question: "Can I export traces to Datadog or Langfuse?",
              answer:
                "Yes. Rivinity exports standard OpenTelemetry (OTLP) traces including latency, token usage, and tool executions directly to Datadog, Langfuse, and other observability platforms.",
            },
            {
              question: "What rate limits are available for production?",
              answer:
                "Free accounts start with 60 requests per minute. Pro and Enterprise plans provide higher throughput, concurrency pooling, and dedicated infrastructure.",
            },
          ]}
        />

        {/* Unified CTA Section */}
        <CtaSection
          title="Start building with Rivinity today"
          description="Get your API key in seconds and build streaming, structured AI applications with official SDKs for Python, TypeScript, and Go."
          buttonText="Get API Keys"
          buttonHref="/signup"
          secondaryText="Read Documentation"
          secondaryHref="/docs"
        />
      </motion.main>

      <Footer />
    </div>
  );
}
