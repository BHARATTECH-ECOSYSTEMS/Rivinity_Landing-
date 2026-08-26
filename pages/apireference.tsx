import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {
    Code2,
    Terminal,
    Copy,
    Check,
    Search,
    Key,
    ShieldAlert,
    Cpu,
    Layers,
    Sparkles,
    ArrowRight,
    ExternalLink,
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
        <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased">
            <Header />

            {/* Hero Section */}
            <section className="section border-b border-[#E5E7EB] pt-24 sm:pt-32 lg:pt-40 pb-14 sm:pb-20 lg:pb-24">
                <div className="container mx-auto px-4 sm:px-6 mt-20">
                    <div className="max-w-4xl">
                        <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.15]">
                            Engine API <span className="text-[#FF6B00]">Reference</span>
                        </h1>
                        <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-[#6B7280] leading-relaxed">
                            Programmatically orchestrate AI tools, sync persistent memory graphs, and stream inference calls directly into your engineering workflows.
                        </p>
                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <div className="text-white flex flex-col">
                                <a
                                    href="#endpoints"
                                    className="rounded-xl bg-[#1A1A1A] px-6 py-3.5 text-center text-sm font-bold shadow-xs hover:bg-neutral-800 active:scale-95 transition-all"
                                >
                                    Explore Endpoints &darr;
                                </a>
                            </div>
                            <a
                                href="#authentication"
                                className="rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-center text-sm font-bold text-[#1A1A1A] hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all shadow-xs"
                            >
                                Authentication Guide
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authentication & Quickstart Section */}
            <section id="authentication" className="section border-b border-[#E5E7EB] bg-[#F7F7F8] py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                                Security
                            </span>
                            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
                                Authentication
                            </h2>
                            <p className="mt-3 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                All REST API requests require a valid Bearer token passed in the Authorization header.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
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
                            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
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
                                    className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all active:scale-95 cursor-pointer ${selectedCategory === cat.id
                                            ? "bg-[#1A1A1A] text-white shadow-xs"
                                            : "bg-[#F7F7F8] border border-[#E5E7EB] text-[#6B7280] hover:border-gray-400"
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
                                className="group bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#FF6B00]/40 transition-all"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Left Specs */}
                                    <div className="lg:col-span-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${ep.method === "POST"
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                                            : "bg-blue-50 text-blue-600 border border-blue-200"
                                                        }`}
                                                >
                                                    {ep.method}
                                                </span>
                                                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider bg-[#FF6B00]/10 px-2.5 py-1 rounded-full border border-[#FF6B00]/20">
                                                    {ep.badge}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                                                {ep.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-4">
                                                {ep.desc}
                                            </p>
                                        </div>

                                        <div className="mt-4 rounded-2xl bg-[#F7F7F8] border border-[#E5E7EB] px-4 py-3 font-mono text-xs font-bold text-[#1A1A1A] break-all">
                                            {ep.path}
                                        </div>
                                    </div>

                                    {/* Right Code Interactive Panel */}
                                    <div className="lg:col-span-7">
                                        <div className="rounded-2xl bg-[#1A1A1A] border border-neutral-800 overflow-hidden shadow-xs">
                                            {/* Code Header Bar */}
                                            <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 bg-neutral-900/50">
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

            <Footer />
        </div>
    );
}