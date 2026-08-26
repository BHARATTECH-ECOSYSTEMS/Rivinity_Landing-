"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const docNavigation = [
  {
    category: "Getting Started",
    items: [
      { id: "overview", label: "Overview" },
      { id: "quickstart", label: "Quickstart" },
      { id: "authentication", label: "Authentication" },
      { id: "errors", label: "Errors & Rate Limits" },
    ],
  },
  {
    category: "Agent API",
    items: [
      { id: "run-agent", label: "Execute Agent" },
      { id: "agent-status", label: "Get Execution State" },
      { id: "tools", label: "Tool Call Definitions" },
    ],
  },
  {
    category: "Models & Inference",
    items: [
      { id: "models-list", label: "List Models" },
      { id: "embeddings", label: "Generate Embeddings" },
    ],
  },
  {
    category: "SDKs & Tools",
    items: [
      { id: "typescript-sdk", label: "TypeScript / Node" },
      { id: "python-sdk", label: "Python SDK" },
    ],
  },
];

const codeExamples = {
  curl: `curl -X POST https://api.rivinity.ai/v1/agents/run \\
  -H "Authorization: Bearer rv_live_89f3a..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "rivinity-agent-v1",
    "prompt": "Inspect multi-region latency metrics and alert on anomalies.",
    "tools": ["latency_check", "alert_dispatcher"],
    "stream": false
  }'`,

  node: `import { Rivinity } from "@rivinity/sdk";

const client = new Rivinity({ apiKey: process.env.RIVINITY_API_KEY });

const execution = await client.agents.run({
  model: "rivinity-agent-v1",
  prompt: "Inspect multi-region latency metrics and alert on anomalies.",
  tools: ["latency_check", "alert_dispatcher"],
});

console.log(execution.result);`,

  python: `from rivinity import Rivinity

client = Rivinity(api_key="rv_live_89f3a...")

response = client.agents.run(
    model="rivinity-agent-v1",
    prompt="Inspect multi-region latency metrics and alert on anomalies.",
    tools=["latency_check", "alert_dispatcher"]
)

print(response.result)`,
};

const jsonResponse = `{
  "id": "run_99a8b7c6d5e4",
  "object": "agent.execution",
  "status": "completed",
  "model": "rivinity-agent-v1",
  "result": {
    "summary": "Detected 140ms latency spike in ap-south-1 region.",
    "action_taken": "Dispatched alert to PagerDuty incident channel."
  },
  "usage": {
    "prompt_tokens": 142,
    "completion_tokens": 68,
    "total_tokens": 210
  }
}`;

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [langTab, setLangTab] = useState<"curl" | "node" | "python">("node");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  // Automatic Scroll Spy using IntersectionObserver
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const sections = mainEl.querySelectorAll("div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: mainEl,
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased">
      <Head>
        <title>Documentation & API Reference — Rivinity AI</title>
      </Head>

      {/* Screen Height Container */}
      <div className="h-screen flex flex-col overflow-hidden bg-[var(--color-bg-primary,#ffffff)]">

        {/* PAGE-SPECIFIC HEADER NAVBAR */}
        <header className="border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md shrink-0 z-30 p-2">
          <div className="container mx-auto flex items-center justify-between gap-4">

            {/* Left: Custom Logo Section */}
            <Link href="/" className="group flex items-center shrink-0">
              <div className="transition-transform duration-300 group-hover:scale-105 py-3">
                <Image
                  src="/rivinity_logo.png"
                  alt="Rivinity Logo"
                  width={140}
                  height={32}
                  className="object-cover align-middle"
                  priority
                  sizes="100px"
                />
              </div>
            </Link>

            {/* Center: Search Bar */}
            <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2 rounded-full bg-[#F3F3F5] text-xs font-medium text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:bg-white border border-transparent focus:border-[#FF6B00] transition-all"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-white border border-gray-200 p-1.5 rounded-full text-gray-500 shadow-xs hover:text-[#FF6B00] hover:border-[#FF6B00] active:scale-95 transition-all cursor-pointer"
              >
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Right: CTA Button */}
            <div className="flex items-center gap-3 shrink-0 text-white">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FF6B00] px-5 py-2 text-xs font-bold shadow-xs hover:bg-[#FF6B00]/90 active:scale-95 transition-all"
              >
                Start Building
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>
        </header>

        {/* Split Screen Area */}
        <div className="flex-1 container mx-auto px-4 sm:px-6 flex overflow-hidden py-6 gap-8">

          {/* 1. FIXED LEFT SIDEBAR (NON-SCROLLABLE) */}
          <aside className="w-64 shrink-0 hidden lg:block pr-3 space-y-6 border-r border-[#E5E7EB]/60">
            {docNavigation.map((cat) => (
              <div key={cat.category}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 px-2 mb-2">
                  {cat.category}
                </p>
                <nav className="space-y-1">
                  {cat.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${isActive
                          ? "bg-[#FF6B00] text-white shadow-xs"
                          : "text-[#6B7280] hover:bg-[#F7F7F8] hover:text-[#1A1A1A]"
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          size={12}
                          className={isActive ? "text-white" : "text-gray-400"}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </aside>

          {/* 2. SCROLLABLE RIGHT CONTENT AREA */}
          <main ref={mainRef} className="flex-1 overflow-y-auto pr-2 space-y-16 pb-20">

            {/* 1. Overview */}
            <div id="overview" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md border border-[#FF6B00]/20">
                  01
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    Platform Overview
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Rivinity provides production-ready infrastructure for running autonomous AI agents, fine-tuned models, and vector retrieval layers. Built for extreme low latency and sovereign cloud environments.
              </p>
            </div>

            {/* 2. Quickstart */}
            <div id="quickstart" className="space-y-6 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md border border-[#FF6B00]/20">
                  02
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    Quickstart Guide
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                The Rivinity API allows developers to trigger autonomous agent executions, query fine-tuned models, and manage vector retrieval pipelines over REST or via our official SDKs.
              </p>

              {/* Code Sandbox */}
              <div className="border border-[#E5E7EB] rounded-2xl bg-white shadow-xs overflow-hidden">
                <div className="flex items-center justify-between bg-[#F7F7F8] px-4 py-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    {(["node", "python", "curl"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLangTab(lang)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${langTab === lang
                          ? "bg-white text-[#FF6B00] shadow-xs border border-gray-200"
                          : "text-gray-500 hover:text-[#1A1A1A]"
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(codeExamples[langTab])}
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#FF6B00] transition cursor-pointer font-bold"
                  >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="bg-[#1A1A1A] p-5 font-mono text-xs text-gray-200 overflow-x-auto">
                  <pre className="leading-relaxed">{codeExamples[langTab]}</pre>
                </div>
              </div>
            </div>

            {/* 3. Authentication */}
            <div id="authentication" className="space-y-6 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                  AUTH
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    Authentication
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Authenticate all API requests by passing your secret API Key in the Authorization header. API keys can be generated in your <Link href="/dashboard" className="text-[#FF6B00] font-bold hover:underline">Rivinity Dashboard</Link>.
              </p>

              <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-5 font-mono text-xs text-[#1A1A1A]">
                <span className="text-[#6B7280]">// Include bearer header in all HTTPS calls</span>
                <div className="mt-1 font-bold">Authorization: Bearer rv_live_99a8b7c6d5e4f3a2b1</div>
              </div>
            </div>

            {/* 4. Errors & Rate Limits */}
            <div id="errors" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  LIMITS
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    Errors & Rate Limits
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Rivinity uses conventional HTTP response codes. <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs border border-gray-200">429 Too Many Requests</code> indicates rate limit exhaustion. Pro accounts include 1,000 requests per minute by default.
              </p>
            </div>

            {/* 5. Execute Agent */}
            <div id="run-agent" className="space-y-6 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  POST
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1A1A1A] leading-none tracking-tight">
                    /v1/agents/run
                  </h2>
                </div>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F7F7F8] border-b border-[#E5E7EB] text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      <th className="p-4">Parameter</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Required</th>
                      <th className="p-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] text-xs text-[#6B7280]">
                    <tr>
                      <td className="p-4 font-mono font-bold text-[#1A1A1A]">model</td>
                      <td className="p-4 font-mono text-[#FF6B00]">string</td>
                      <td className="p-4 font-bold text-red-600">Yes</td>
                      <td className="p-4">Target model engine (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">rivinity-agent-v1</code>).</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono font-bold text-[#1A1A1A]">prompt</td>
                      <td className="p-4 font-mono text-[#FF6B00]">string</td>
                      <td className="p-4 font-bold text-red-600">Yes</td>
                      <td className="p-4">The task instruction or question for the autonomous agent.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono font-bold text-[#1A1A1A]">tools</td>
                      <td className="p-4 font-mono text-[#FF6B00]">array</td>
                      <td className="p-4 font-medium text-gray-500">Optional</td>
                      <td className="p-4">List of enabled function tools available during step execution.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50">200 OK Response Payload</h3>
                <div className="bg-[#1A1A1A] rounded-2xl p-5 font-mono text-xs text-gray-200 overflow-x-auto shadow-xs border border-gray-800">
                  <pre className="leading-relaxed">{jsonResponse}</pre>
                </div>
              </div>
            </div>

            {/* 6. Get Execution State */}
            <div id="agent-status" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  GET
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1A1A1A] leading-none tracking-tight">
                    /v1/agents/runs/:id
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Retrieve step-by-step trace logs, intermediate memory states, and token consumption metrics for any asynchronous agent run.
              </p>
            </div>

            {/* 7. Tool Call Definitions */}
            <div id="tools" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  SCHEMA
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    Tool Call Definitions
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Register JSON Schema definitions for external APIs, database connectors, and local function calls that agents can invoke mid-task.
              </p>
            </div>

            {/* 8. List Models */}
            <div id="models-list" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  GET
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1A1A1A] leading-none tracking-tight">
                    /v1/models
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Returns a list of available models including context window limits, capability flags, and regional availability.
              </p>
            </div>

            {/* 9. Generate Embeddings */}
            <div id="embeddings" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  POST
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1A1A1A] leading-none tracking-tight">
                    /v1/embeddings
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-3xl">
                Convert raw text inputs into 1536-dimensional embedding vectors for semantic search, RAG pipelines, and vector databases.
              </p>
            </div>

            {/* 10. TypeScript SDK */}
            <div id="typescript-sdk" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                  SDK
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    TypeScript / Node SDK
                  </h2>
                </div>
              </div>
              <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-4 font-mono text-xs text-[#1A1A1A] font-bold">
                npm install @rivinity/sdk
              </div>
            </div>

            {/* 11. Python SDK */}
            <div id="python-sdk" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                  SDK
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-none tracking-tight">
                    Python SDK
                  </h2>
                </div>
              </div>
              <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-4 font-mono text-xs text-[#1A1A1A] font-bold">
                pip install rivinity
              </div>
            </div>

            {/* Support Footer CTA */}
            <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-3xl p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold text-[#1A1A1A]">Need technical support?</h3>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Our solutions engineers are available for custom API integrations, private VPC setup, and dedicated latency SLAs.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-[#FF6B00] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#FF6B00]/90 active:scale-95 transition shadow-xs w-full sm:w-auto"
                >
                  Contact API Support
                </Link>
                <Link
                  href="/security"
                  className="bg-white border border-[#E5E7EB] text-[#1A1A1A] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-gray-100 active:scale-95 transition shadow-xs w-full sm:w-auto"
                >
                  Security & Compliance
                </Link>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}