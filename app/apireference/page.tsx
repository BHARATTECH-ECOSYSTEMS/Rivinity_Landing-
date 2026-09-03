"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
    Copy,
    Check,
    Key,
} from "lucide-react";

export default function ApiReferencePage() {
    const [activeTab, setActiveTab] = useState<"curl" | "node" | "python">("curl");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const endpoints = [
        {
            id: "orchestrate-turn",
            method: "POST",
            path: "/v1/engine/orchestrate",
            category: "core",
            title: "Orchestrate Canvas Turn",
            desc: "Routes prompts, tools, and models automatically across the unified canvas.",
            badge: "Core API",
            code: {
                curl: `curl -X POST https://api.rivinity.ai/v1/engine/orchestrate \\
  -H "Authorization: Bearer rv_live_99f283a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "canvas_id": "cnv_8820a1",
    "prompt": "Analyze steganography residual streams",
    "auto_route": true
  }'`,
                node: `import { Rivinity } from '@rivinity/sdk';

const rivinity = new Rivinity({ apiKey: process.env.RIVINITY_API_KEY });

const response = await rivinity.engine.orchestrate({
  canvasId: 'cnv_8820a1',
  prompt: 'Analyze steganography residual streams',
  autoRoute: true,
});`,
                python: `from rivinity import Rivinity

client = Rivinity(api_key="rv_live_99f283a")

response = client.engine.orchestrate(
    canvas_id="cnv_8820a1",
    prompt="Analyze steganography residual streams",
    auto_route=True
)`,
            },
        },
        {
            id: "memory-graph",
            method: "GET",
            path: "/v1/memory/graph",
            category: "memory",
            title: "Fetch Persistent Memory Graph",
            desc: "Retrieves context, file embeddings, and decisions tied to an enterprise canvas session.",
            badge: "Zero Loss",
            code: {
                curl: `curl -X GET "https://api.rivinity.ai/v1/memory/graph?canvas_id=cnv_8820a1&depth=3" \\
  -H "Authorization: Bearer rv_live_99f283a"`,
                node: `const graph = await rivinity.memory.getGraph({
  canvasId: 'cnv_8820a1',
  depth: 3,
});`,
                python: `graph = client.memory.get_graph(
    canvas_id="cnv_8820a1",
    depth=3
)`,
            },
        },
        {
            id: "studio-connect",
            method: "POST",
            path: "/v1/studios/connect",
            category: "integrations",
            title: "Attach External Studio Node",
            desc: "Binds an external studio (AI Chat, App Builder, Agents) to the active orchestration pipeline.",
            badge: "Canvas V2",
            code: {
                curl: `curl -X POST https://api.rivinity.ai/v1/studios/connect \\
  -H "Authorization: Bearer rv_live_99f283a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "studio_type": "app-builder",
    "sync_mode": "realtime"
  }'`,
                node: `const connection = await rivinity.studios.connect({
  studioType: 'app-builder',
  syncMode: 'realtime',
});`,
                python: `connection = client.studios.connect(
    studio_type="app-builder",
    sync_mode="realtime"
)`,
            },
        },
    ];

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const filteredEndpoints =
        selectedCategory === "all"
            ? endpoints
            : endpoints.filter((e) => e.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white text-[#0f172a] font-sans antialiased flex flex-col justify-between">
            <Header />

            <motion.main
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full pt-28 sm:pt-32 md:pt-36 pb-16"
            >
                {/* Hero Section */}
                <section className="section border-b border-slate-200 pb-14 sm:pb-20">
                    <div className="container">
                        <div className="max-w-4xl">
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0f172a] leading-[1.15]">
                                Engine API <span className="text-[#FF6B00]">Reference</span>
                            </h1>
                        <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-[#64748b] leading-relaxed">
                            Programmatically orchestrate AI tools, sync persistent memory graphs, and stream inference calls directly into your engineering workflows.
                        </p>
                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <div className="text-white flex flex-col">
                                <a
                                    href="#endpoints"
                                    className="rounded-full bg-[#0f172a] px-6 py-3 min-h-[44px] flex items-center justify-center text-center text-sm font-semibold shadow-xs hover:bg-slate-800 active:scale-95 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                                >
                                    Explore Endpoints &darr;
                                </a>
                            </div>
                            <a
                                href="#authentication"
                                className="rounded-full border border-slate-200 bg-white px-6 py-3 min-h-[44px] flex items-center justify-center text-center text-sm font-semibold text-slate-800 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                            >
                                Authentication Guide
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authentication & Quickstart Section */}
            <section id="authentication" className="section border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                                Security
                            </span>
                            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a]">
                                Authentication
                            </h2>
                            <p className="mt-3 text-xs sm:text-sm text-[#64748b] leading-relaxed">
                                All REST API requests require a valid Bearer token passed in the Authorization header.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#0f172a]">
                                <Key size={16} className="text-[#FF6B00]" />
                                <span>Base URL: https://api.rivinity.ai/v1</span>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                        Authorization Header Example
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                        HTTPS Only
                                    </span>
                                </div>
                                <div className="rounded-2xl bg-[#1A1A1A] p-4 text-xs font-mono text-gray-200 overflow-x-auto">
                                    <code>Authorization: Bearer rv_live_YOUR_API_KEY</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Endpoints Section */}
            <section id="endpoints" className="section py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                                REST Endpoints
                            </span>
                            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#0f172a]">
                                Core API Specs
                            </h2>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { id: "all", label: "All Endpoints" },
                                { id: "core", label: "Core Engine" },
                                { id: "memory", label: "Memory Graph" },
                                { id: "integrations", label: "Studios" },
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`rounded-2xl px-4 py-2 text-xs font-semibold min-h-[36px] transition-all active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${selectedCategory === cat.id
                                            ? "bg-[#0f172a] text-white shadow-xs"
                                            : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#0f172a] hover:border-slate-300"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Endpoints List */}
                    <div className="space-y-8">
                        {filteredEndpoints.map((ep, idx) => (
                            <div
                                key={ep.id}
                                className="group bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#FF6B00]/40 transition-all"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Left Specs */}
                                    <div className="lg:col-span-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${ep.method === "POST"
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                                            : "bg-blue-50 text-blue-600 border border-blue-200"
                                                        }`}
                                                >
                                                    {ep.method}
                                                </span>
                                                <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider bg-[#FF6B00]/10 px-2.5 py-1 rounded-full border border-[#FF6B00]/20">
                                                    {ep.badge}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
                                                {ep.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                                {ep.desc}
                                            </p>
                                        </div>

                                        <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 font-mono text-xs font-semibold text-[#0f172a] break-all">
                                            {ep.path}
                                        </div>
                                    </div>

                                    {/* Right Code Interactive Panel */}
                                    <div className="lg:col-span-7">
                                        <div className="rounded-2xl bg-[#0f172a] border border-slate-800 overflow-hidden shadow-xs">
                                            {/* Code Header Bar */}
                                            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/50">
                                                <div className="flex items-center gap-2">
                                                    {(["curl", "node", "python"] as const).map((lang) => (
                                                        <button
                                                            key={lang}
                                                            onClick={() => setActiveTab(lang)}
                                                            className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${activeTab === lang
                                                                    ? "bg-[#FF6B00] text-white"
                                                                    : "text-neutral-400 hover:text-white"
                                                                }`}
                                                        >
                                                            {lang}
                                                        </button>
                                                    ))}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(ep.code[activeTab], idx)}
                                                    className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-white transition-colors cursor-pointer bg-transparent"
                                                >
                                                    {copiedIndex === idx ? (
                                                        <>
                                                            <Check size={14} className="text-emerald-400" />
                                                            <span className="text-emerald-400 text-[10px] font-bold">Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy size={14} />
                                                            <span className="text-[10px] font-bold">Copy</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Code Area */}
                                            <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto leading-relaxed">
                                                <code>{ep.code[activeTab]}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </motion.main>

            <Footer />
        </div>
    );
}