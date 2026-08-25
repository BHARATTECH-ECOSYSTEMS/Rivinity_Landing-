"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Search,
  Key,
  Copy,
  Check,
  ChevronRight,
  Zap,
  Sliders,
  AlertTriangle,
  Layers,
  Code2,
  Terminal,
  ListFilter,
  Activity,
  Wrench,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

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
    <>
      <Header />
      <Head>
        <title>Documentation & API Reference — Rivinity AI</title>
      </Head>

      {/* Screen Height Container */}
      <div className="h-screen pt-20 flex flex-col overflow-hidden bg-[var(--color-bg-primary,#ffffff)]">
        
        {/* Top Header & Search Subnav */}
        <div className="border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md shrink-0 z-20">
          <div className="container py-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5">
              <div>
                <div className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
                  Rivinity Developer Platform
                </div>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search API reference, endpoints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF6B00] transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Split Screen Area */}
        <div className="flex-1 container flex overflow-hidden py-6 gap-8">
          
          {/* 1. FIXED LEFT SIDEBAR */}
          <aside className="w-64 shrink-0 hidden lg:block overflow-y-auto pr-3 space-y-6 border-r border-[#E5E7EB]/60">
            {docNavigation.map((cat) => (
              <div key={cat.category}>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] px-2 mb-2">
                  {cat.category}
                </p>
                <nav className="space-y-1">
                  {cat.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                          isActive
                            ? "bg-[#FF6B00] text-white shadow-xs"
                            : "text-[#6B7280] hover:bg-gray-100 hover:text-[#1A1A1A]"
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
          <main className="flex-1 overflow-y-auto pr-2 space-y-16 pb-20">
            
            {/* 1. Overview */}
            <div id="overview" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Platform Overview</h2>
                  <p className="text-xs text-[#6B7280]">Introduction to Rivinity agentic architecture.</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Rivinity provides production-ready infrastructure for running autonomous AI agents, fine-tuned models, and vector retrieval layers. Built for extreme low latency and sovereign cloud environments.
              </p>
            </div>

            {/* 2. Quickstart */}
            <div id="quickstart" className="space-y-6 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Quickstart Guide</h2>
                  <p className="text-xs text-[#6B7280]">Make your first agent runtime call in under two minutes.</p>
                </div>
              </div>

              <p className="text-sm text-[#6B7280] leading-relaxed">
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
                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
                          langTab === lang
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
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#FF6B00] transition cursor-pointer"
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
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Key size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Authentication</h2>
                  <p className="text-xs text-[#6B7280]">Bearer token API security model.</p>
                </div>
              </div>

              <p className="text-sm text-[#6B7280] leading-relaxed">
                Authenticate all API requests by passing your secret API Key in the Authorization header. API keys can be generated in your <Link href="/dashboard" className="text-[#FF6B00] font-semibold hover:underline">Rivinity Dashboard</Link>.
              </p>

              <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-5 font-mono text-xs text-[#1A1A1A]">
                <span className="text-[#6B7280]">// Include bearer header in all HTTPS calls</span>
                <div className="mt-1 font-bold">Authorization: Bearer rv_live_99a8b7c6d5e4f3a2b1</div>
              </div>
            </div>

            {/* 4. Errors & Rate Limits */}
            <div id="errors" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Errors & Rate Limits</h2>
                  <p className="text-xs text-[#6B7280]">HTTP status codes and concurrency boundaries.</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Rivinity uses conventional HTTP response codes. <code className="bg-gray-100 px-1 py-0.5 rounded">429 Too Many Requests</code> indicates rate limit exhaustion. Pro accounts include 1,000 requests per minute by default.
              </p>
            </div>

            {/* 5. Execute Agent */}
            <div id="run-agent" className="space-y-6 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">POST /v1/agents/run</h2>
                  <p className="text-xs text-[#6B7280]">Request body parameters for agent execution.</p>
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
                      <td className="p-4">Target model engine (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded">rivinity-agent-v1</code>).</td>
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
                <h3 className="text-sm font-bold text-[#1A1A1A]">200 OK Response Payload</h3>
                <div className="bg-[#1A1A1A] rounded-2xl p-5 font-mono text-xs text-gray-200 overflow-x-auto shadow-xs border border-gray-800">
                  <pre className="leading-relaxed">{jsonResponse}</pre>
                </div>
              </div>
            </div>

            {/* 6. Get Execution State */}
            <div id="agent-status" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Activity size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">GET /v1/agents/runs/:id</h2>
                  <p className="text-xs text-[#6B7280]">Fetch status and step logs for asynchronous tasks.</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Retrieve step-by-step trace logs, intermediate memory states, and token consumption metrics for any asynchronous agent run.
              </p>
            </div>

            {/* 7. Tool Call Definitions */}
            <div id="tools" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Wrench size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Tool Call Definitions</h2>
                  <p className="text-xs text-[#6B7280]">Function schemas and custom webhooks.</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Register JSON Schema definitions for external APIs, database connectors, and local function calls that agents can invoke mid-task.
              </p>
            </div>

            {/* 8. List Models */}
            <div id="models-list" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <ListFilter size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">GET /v1/models</h2>
                  <p className="text-xs text-[#6B7280]">Enumerate available base and fine-tuned models.</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Returns a list of available models including context window limits, capability flags, and regional availability.
              </p>
            </div>

            {/* 9. Generate Embeddings */}
            <div id="embeddings" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">POST /v1/embeddings</h2>
                  <p className="text-xs text-[#6B7280]">Generate high-dimensional vector representations.</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Convert raw text inputs into 1536-dimensional embedding vectors for semantic search, RAG pipelines, and vector databases.
              </p>
            </div>

            {/* 10. TypeScript SDK */}
            <div id="typescript-sdk" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Code2 size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">TypeScript / Node SDK</h2>
                  <p className="text-xs text-[#6B7280]">Fully typed SDK with built-in retry mechanisms.</p>
                </div>
              </div>
              <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-4 font-mono text-xs text-[#1A1A1A]">
                npm install @rivinity/sdk
              </div>
            </div>

            {/* 11. Python SDK */}
            <div id="python-sdk" className="space-y-4 scroll-mt-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Terminal size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Python SDK</h2>
                  <p className="text-xs text-[#6B7280]">Async-first Python client for AI workflows.</p>
                </div>
              </div>
              <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-2xl p-4 font-mono text-xs text-[#1A1A1A]">
                pip install rivinity
              </div>
            </div>

            {/* Support Footer CTA */}
            <div className="bg-[#F7F7F8] border border-[#E5E7EB] rounded-3xl p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold text-[#1A1A1A]">Need technical support?</h3>
              <p className="text-sm text-[#6B7280]">
                Our solutions engineers are available for custom API integrations, private VPC setup, and dedicated latency SLAs.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-[#FF6B00] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#e66000] transition shadow-xs w-full sm:w-auto"
                >
                  Contact API Support
                </Link>
                <Link
                  href="/security"
                  className="bg-white border border-[#E5E7EB] text-[#1A1A1A] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-100 transition shadow-xs w-full sm:w-auto"
                >
                  Security & Compliance
                </Link>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}