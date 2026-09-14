"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CtaSection from "@/components/sections/cta-section";
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

  // Automatic Scroll Spy using IntersectionObserver on page scroll
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
        root: null,
        rootMargin: "-25% 0px -65% 0px",
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
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter navigation items based on search query
  const filteredNavigation = docNavigation
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      {/* Universal Site Header */}
      <Header />

      {/* Main Documentation Wrapper */}
      <div className="flex-1 w-full pt-28 sm:pt-32 md:pt-36 pb-16">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 lg:gap-12 relative">

          {/* 1. STICKY LEFT SIDEBAR */}
          <aside className="sticky top-28 sm:top-32 self-start w-64 shrink-0 hidden lg:block pr-4 space-y-6 max-h-[calc(100vh-9rem)] overflow-y-auto border-r border-slate-200/80">
            {/* Quick Search / Filter Input */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Filter documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 text-xs font-medium text-[#0f172a] placeholder:text-slate-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] border border-slate-200 focus-visible:border-[#FF6B00] transition-all"
              />
            </div>

            {filteredNavigation.map((cat) => (
              <div key={cat.category}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">
                  {cat.category}
                </p>
                <nav className="space-y-1">
                  {cat.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center justify-between min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                          isActive
                            ? "bg-[#FF6B00] text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#0f172a]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          size={12}
                          className={isActive ? "text-white" : "text-slate-400"}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </aside>

          {/* 2. MAIN CONTENT AREA */}
          <main ref={mainRef} className="flex-1 min-w-0 space-y-16 pb-12">

            {/* 1. Overview */}
            <div id="overview" className="space-y-4 scroll-mt-32">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md border border-[#FF6B00]/20">
                  01
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    Platform Overview
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Rivinity provides production-ready infrastructure for running autonomous AI agents, fine-tuned models, and vector retrieval layers. Built for extreme low latency and sovereign cloud environments.
              </p>
            </div>

            {/* 2. Quickstart */}
            <div id="quickstart" className="space-y-6 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md border border-[#FF6B00]/20">
                  02
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    Quickstart Guide
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                The Rivinity API allows developers to trigger autonomous agent executions, query fine-tuned models, and manage vector retrieval pipelines over REST or via our official SDKs.
              </p>

              {/* Code Sandbox */}
              <div className="border border-slate-200 rounded-2xl bg-white shadow-xs overflow-hidden">
                <div className="flex items-center justify-between bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    {(["node", "python", "curl"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLangTab(lang)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition cursor-pointer ${langTab === lang
                          ? "bg-white text-[#FF6B00] shadow-xs border border-slate-200"
                          : "text-slate-500 hover:text-[#0f172a]"
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(codeExamples[langTab])}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0f172a] transition cursor-pointer font-bold"
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
            <div id="authentication" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md border border-[#FF6B00]/20">
                  AUTH
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    Authentication
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Authenticate all API requests by passing your secret API Key in the Authorization header. API keys can be generated in your <Link href="/dashboard" className="text-[#FF6B00] font-semibold hover:underline">Rivinity Dashboard</Link>.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 font-mono text-xs text-[#0f172a]">
                <span className="text-slate-500">{"// Include bearer header in all HTTPS calls"}</span>
                <div className="mt-1 font-semibold">Authorization: Bearer rv_live_99a8b7c6d5e4f3a2b1</div>
              </div>
            </div>

            {/* 4. Errors & Rate Limits */}
            <div id="errors" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  LIMITS
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    Errors & Rate Limits
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Rivinity uses conventional HTTP response codes. <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200">429 Too Many Requests</code> indicates rate limit exhaustion. Pro accounts include 1,000 requests per minute by default.
              </p>
            </div>

            {/* 5. Execute Agent */}
            <div id="run-agent" className="space-y-6 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  POST
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold font-mono text-[#0f172a] leading-none tracking-tight">
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
            <div id="agent-status" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  GET
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold font-mono text-[#0f172a] leading-none tracking-tight">
                    /v1/agents/runs/:id
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Retrieve step-by-step trace logs, intermediate memory states, and token consumption metrics for any asynchronous agent run.
              </p>
            </div>

            {/* 7. Tool Call Definitions */}
            <div id="tools" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  SCHEMA
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    Tool Call Definitions
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Register JSON Schema definitions for external APIs, database connectors, and local function calls that agents can invoke mid-task.
              </p>
            </div>

            {/* 8. List Models */}
            <div id="models-list" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  GET
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold font-mono text-[#0f172a] leading-none tracking-tight">
                    /v1/models
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Returns a list of available models including context window limits, capability flags, and regional availability.
              </p>
            </div>

            {/* 9. Generate Embeddings */}
            <div id="embeddings" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  POST
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold font-mono text-[#0f172a] leading-none tracking-tight">
                    /v1/embeddings
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Convert raw text inputs into 1536-dimensional embedding vectors for semantic search, RAG pipelines, and vector databases.
              </p>
            </div>

            {/* 10. TypeScript SDK */}
            <div id="typescript-sdk" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  SDK
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    TypeScript / Node SDK
                  </h2>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs text-[#0f172a] font-semibold">
                npm install @rivinity/sdk
              </div>
            </div>

            {/* 11. Python SDK */}
            <div id="python-sdk" className="space-y-4 scroll-mt-32 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  SDK
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] leading-none tracking-tight">
                    Python SDK
                  </h2>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs text-[#0f172a] font-semibold">
                pip install rivinity
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Universal Site Footer */}
      <Footer />
    </div>
  );
}