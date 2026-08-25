import React from 'react';
import Header from "../components/header";
import Footer from "../components/footer";

export default function GovernancePage() {
  const metrics = [
    { value: '0%', label: 'Data Retention for Base Model Training' },
    { value: '100%', label: 'Deterministic Input/Output Guardrails' },
    { value: 'AES-256', label: 'Hardware-Isolated Encryption at Rest & Transit' },
    { value: 'SOC 2 Type II', label: 'Continuous Independent Third-Party Audits' },
  ];

  const pillars = [
    {
      index: '01 / ISOLATION',
      title: 'Model & Data Tenant Isolation',
      desc: 'Customer datasets and inference payloads are processed within sandboxed, ephemeral memory zones. Your enterprise intellectual property is never exposed to public foundations or pooled datasets.',
    },
    {
      index: '02 / GUARDRAILS',
      title: 'Deterministic Policy Engine',
      desc: 'Sub-millisecond inference interceptors filter prompt injection, PII leakages, toxic tokens, and hallucinated responses before payloads ever cross perimeter boundaries.',
    },
    {
      index: '03 / LINEAGE',
      title: 'Cryptographic Audit Lineage',
      desc: 'Every prompt, parameter variation, retrieval chunk, and model output is immutably recorded with tamper-proof cryptographic hashing for comprehensive regulatory audits.',
    },
    {
      index: '04 / ACCESS',
      title: 'Zero-Trust RBAC & IAM Integration',
      desc: 'Enforce granular attribute-based access controls (ABAC) and role-based policies directly synchronized with enterprise Okta, Azure AD, and SAML 2.0 providers.',
    },
  ];

  const pipelineSteps = [
    {
      step: 'STEP 01',
      badge: 'SECURE',
      title: 'Ingestion & Auth',
      desc: 'TLS 1.3 mTLS handshake verified via enterprise IAM token.',
    },
    {
      step: 'STEP 02',
      badge: 'FILTER',
      title: 'PII & Injection Sanitizer',
      desc: 'Real-time redaction of sensitive identifiers and prompt exploit vectors.',
    },
    {
      step: 'STEP 03',
      badge: 'COMPUTE',
      title: 'Ephemeral Inference',
      desc: 'Execution on dedicated, VPC-peered compute with zero disk persistence.',
    },
    {
      step: 'STEP 04',
      badge: 'LOGGED',
      title: 'Output Verification & Audit',
      desc: 'Factuality scoring and immutable audit ledger commitment.',
    },
  ];

  const complianceData = [
    {
      standard: 'SOC 2 Type II',
      scope: 'Security, Availability, and Confidentiality trust service criteria verified by independent auditors.',
      status: 'Active & Verified',
    },
    {
      standard: 'ISO/IEC 27001',
      scope: 'Information Security Management System (ISMS) across all cloud and inference infrastructure.',
      status: 'Certified',
    },
    {
      standard: 'EU AI Act Alignment',
      scope: 'Pre-configured risk classification, transparency documentation, and continuous monitoring controls.',
      status: 'Compliant',
    },
    {
      standard: 'GDPR & CCPA',
      scope: 'Strict data residency controls, right-to-be-forgotten pipelines, and zero training retention guarantees.',
      status: 'Compliant',
    },
    {
      standard: 'HIPAA Ready',
      scope: 'Business Associate Agreements (BAAs) available with automated PHI de-identification mechanisms.',
      status: 'BAA Eligible',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section */}
<section className="border-b border-[#e5e7eb] px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl leading-[1.15]">
            Enterprise-Grade AI Governance & Responsible Control
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-[#4b5563] leading-relaxed">
            Built for regulated environments, secure by design. We provide deterministic policy guardrails, cryptographic
            audit lineage, and isolated execution pipelines to ensure absolute data sovereignty.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#pipeline"
              style={{ color: '#ffffff' }}
              className="rounded-md bg-[#111827] px-6 py-3 text-center text-sm font-semibold !text-white transition hover:bg-[#1f2937]"
            >
              Explore Security Architecture
            </a>
            <a
              href="#compliance"
              className="rounded-md border border-[#d1d5db] bg-white px-6 py-3 text-center font-mono text-sm text-[#111827] transition hover:border-[#9ca3af] hover:bg-[#f9fafb]"
            >
              View Compliance Matrix &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-b border-[#e5e7eb] bg-[#f9fafb]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-[#e5e7eb] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-6 sm:p-8">
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#111827]">{m.value}</div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#6b7280]">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Pillars */}
      <section id="pillars" className="border-b border-[#e5e7eb] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">Pillars of Trust</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
              Institutional Safety & Security by Design
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
              Engineered to satisfy the stringent compliance and risk mandates of financial institutions, healthcare
              providers, and high-assurance enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px rounded-lg border border-[#e5e7eb] bg-[#e5e7eb] sm:grid-cols-2 lg:grid-cols-4 overflow-hidden shadow-sm">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex flex-col justify-between bg-white p-6 sm:p-8 transition hover:bg-[#f9fafb]">
                <div>
                  <div className="font-mono text-xs font-semibold text-[#6b7280]">{pillar.index}</div>
                  <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-[#111827]">{pillar.title}</h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Architecture Pipeline */}
      <section id="pipeline" className="border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">Inference Lifecycle</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
              Zero Data Leakage Execution Flow
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
              How requests traverse through policy gates, sanitization layers, and isolated compute nodes.
            </p>
          </div>

          <div className="rounded-lg border border-[#e5e7eb] bg-white p-4 sm:p-6 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pipelineSteps.map((step, idx) => (
                <div key={idx} className="rounded-md border border-[#e5e7eb] bg-[#f9fafb] p-4 sm:p-5">
                  <div className="flex items-center justify-between font-mono text-xs text-[#6b7280]">
                    <span>{step.step}</span>
                    <span className="font-semibold text-[#374151]">{step.badge}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-[#111827]">{step.title}</h4>
                  <p className="mt-2 text-xs text-[#4b5563] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Matrix */}
      <section id="compliance" className="border-b border-[#e5e7eb] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4b5563] font-semibold">Regulatory Alignment</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]">
              Compliance & Certification Matrix
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4b5563]">
              Continuous adherence to global statutory frameworks and regional sovereign standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
            <table className="w-full text-left text-sm min-w-[540px]">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] font-mono text-xs uppercase tracking-wider text-[#6b7280]">
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Framework / Standard</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Scope & Implementation</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {complianceData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f9fafb]">
                    <td className="px-4 sm:px-6 py-4 sm:py-5 font-semibold text-[#111827] whitespace-nowrap">{item.standard}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-[#4b5563]">{item.scope}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#374151]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#111827]" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}