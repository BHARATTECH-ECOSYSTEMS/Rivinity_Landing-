"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ChangelogPage() {
  const [selectedTag, setSelectedTag] = useState("all");

  const releases = [
    {
      version: "v2.4.0",
      date: "August 24, 2026",
      title: "Parallel Agentic Inference & Memory Graph V2",
      badge: "STABLE",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      changes: [
        {
          type: "feature",
          label: "Feature",
          text: "Introduced ParallelKernels execution engine for 2x faster agentic inference across multi-GPU setups.",
        },
        {
          type: "feature",
          label: "Feature",
          text: "Upgraded Memory Graph state synchronization to support zero-loss context carrying across all connected studios.",
        },
        {
          type: "improvement",
          label: "Improvement",
          text: "Reduced cold-start latency for background router execution turns by 38%.",
        },
        {
          type: "fix",
          label: "Fix",
          text: "Resolved sporadic SSE reconnection drops during long-running sub-quadratic reasoning tasks.",
        },
      ],
    },
    {
      version: "v2.3.2",
      date: "August 10, 2026",
      title: "Enhanced Enterprise RBAC & Audit Trails",
      badge: "SECURITY",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      changes: [
        {
          type: "feature",
          label: "Feature",
          text: "Added granular role-based access control (RBAC) settings for dedicated VPC compute clusters.",
        },
        {
          type: "improvement",
          label: "Improvement",
          text: "Exportable SOC 2 audit logs in CSV and JSON formats from the enterprise admin portal.",
        },
        {
          type: "fix",
          label: "Fix",
          text: "Fixed Okta SAML metadata parsing issues when authenticating through multi-tenant proxies.",
        },
      ],
    },
    {
      version: "v2.2.0",
      date: "July 28, 2026",
      title: "Autonomous Workflow Router & Studio Connectors",
      badge: "MAJOR",
      badgeColor: "bg-[#FF6B00]/10 text-[#FF6B00] border-[#FF6B00]/20",
      changes: [
        {
          type: "feature",
          label: "Feature",
          text: "Launched automatic prompt routing engine that selects models and tools based on input context.",
        },
        {
          type: "feature",
          label: "Feature",
          text: "Native studio connectors for App Builder, AI Chat, and RivinityLM surfaces.",
        },
        {
          type: "improvement",
          label: "Improvement",
          text: "Optimized streaming payload sizes for WebSockets and server-sent events.",
        },
      ],
    },
  ];

  const filteredReleases =
    selectedTag === "all"
      ? releases
      : releases.filter((r) =>
          r.changes.some((c) => c.type === selectedTag)
        );

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="container pt-28 sm:pt-32 md:pt-36 pb-16"
      >
        {/* Compact Title & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a]">
              Changelog
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Updates" },
              { id: "feature", label: "Features" },
              { id: "improvement", label: "Improvements" },
              { id: "fix", label: "Fixes" },
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold min-h-[36px] transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                  selectedTag === tag.id
                    ? "bg-[#0f172a] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Releases Timeline */}
        <div className="space-y-6">
          {filteredReleases.map((release) => (
            <div
              key={release.version}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#FF6B00]/40 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left Version & Meta Header */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-[#0f172a]">
                      {release.version}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${release.badgeColor}`}
                    >
                      {release.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {release.date}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] pt-1">
                    {release.title}
                  </h3>
                </div>

                {/* Right Change Items */}
                <div className="lg:col-span-8">
                  <div className="space-y-2.5">
                    {release.changes
                      .filter((c) => selectedTag === "all" || c.type === selectedTag)
                      .map((change, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 rounded-xl bg-gray-50 border border-gray-200/80 p-3 text-xs"
                        >
                          <span
                            className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${
                              change.type === "feature"
                                ? "bg-emerald-100 text-emerald-700"
                                : change.type === "improvement"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {change.label}
                          </span>
                          <span className="text-gray-700 font-medium leading-relaxed">
                            {change.text}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}