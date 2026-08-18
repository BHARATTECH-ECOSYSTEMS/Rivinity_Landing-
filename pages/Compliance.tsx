"use client";

import React, { useState } from "react";

import {
  ShieldCheck,
  Lock,
  FileCheck2,
  KeyRound,
  ScrollText,
  Fingerprint,
  ShieldAlert,
  Eye,
  Users,
  Radar,
  Globe2,
  Database,
  Cloud,
  Network,
  Activity,
  RotateCcw,
  GitBranch,
  ChevronDown,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  UserCheck,
  Gauge,
  Copy,
  Menu,
} from "lucide-react";

/* ---------------------------------------------------------------
   Rivinity brand tokens
   bg     #FCFBF9   warm off-white
   ink    #17140F   near-black text
   sub    #6F6A63   muted text
   line   #E4DED3   hairline border
   accent #C4622D   burnt orange
   soft   #F3E4D8
----------------------------------------------------------------- */

const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

type TexturePanelProps = {
  variant?: "clay" | "slate";
  children: React.ReactNode;
  className?: string;
};

function TexturePanel({ variant = "clay", children, className = "" }: TexturePanelProps) {
  const stops =
    variant === "clay"
      ? "linear-gradient(115deg, #EFE7DA 0%, #EFE7DA 38%, #C4622D 38%, #C4622D 74%, #D6D0C4 74%)"
      : "linear-gradient(115deg, #C9CDD3 0%, #C9CDD3 30%, #8A93A6 30%, #8A93A6 100%)";
  return (
    <div
      className={`relative isolate flex min-h-[380px] items-center justify-center overflow-hidden rounded-[28px] border border-[#E4DED3] ${className}`}
      style={{ backgroundImage: stops }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, transparent 2px, transparent 10px), url("${GRAIN}")`,
          backgroundSize: "auto, 180px 180px",
        }}
      />
      {children}
    </div>
  );
}

const trustBadges = [
  { icon: BadgeCheck, label: "SOC 2 Type 2" },
  { icon: ShieldAlert, label: "Zero Retention Available" },
  { icon: ShieldCheck, label: "HIPAA-Ready Offering" },
  { icon: Globe2, label: "GDPR Compliance" },
  { icon: KeyRound, label: "Single Sign-On (SSO/SAML)" },
];

const complianceStandards = [
  {
    icon: BadgeCheck,
    title: "SOC 2 Principles",
    desc: "Controls mapped to the AICPA Trust Services Criteria across security, availability, and confidentiality.",
  },
  {
    icon: Globe2,
    title: "GDPR Aligned",
    desc: "Data processing agreements, lawful-basis tracking, and subject-access tooling for EU obligations.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA Ready",
    desc: "Configurable safeguards and BAAs available for teams handling protected health information.",
  },
  {
    icon: KeyRound,
    title: "SSO / SAML",
    desc: "Enterprise identity federation with SAML 2.0 and OIDC, following your identity provider's policy.",
  },
  {
    icon: Lock,
    title: "Encryption",
    desc: "AES-256 at rest and TLS 1.2+ in transit on every request, upload, and stored artifact.",
  },
  {
    icon: ScrollText,
    title: "Audit Logging",
    desc: "Immutable, timestamped logs of access and configuration changes, exportable for review.",
  },
];

const securityControls = [
  { icon: Lock, label: "End-to-end encryption", description: "AES-256 encryption for data at rest and TLS 1.2+ for all traffic in transit." },
  { icon: FileCheck2, label: "Secure file uploads", description: "Virus scanning, policy controls, and sanitized processing for every file intake workflow." },
  { icon: Fingerprint, label: "Multi-factor authentication", description: "Phishing-resistant sign-in options with enforced MFA for privileged and user roles." },
  { icon: Users, label: "Role-based access control", description: "Least-privilege permissions and approval gates across teams, projects, and data access." },
  { icon: Radar, label: "Continuous monitoring", description: "Real-time signal monitoring for behavioral anomalies, drift, and suspicious activity." },
  { icon: ShieldAlert, label: "API security", description: "Authentication, rate limits, and request validation to harden all platform integrations." },
  { icon: Eye, label: "Threat detection", description: "Automated alerts and investigation workflows that surface emerging attack patterns early." },
  { icon: ScrollText, label: "Audit trails", description: "Immutable logs of changes, access events, and compliance-relevant actions for review." },
];

const governanceCards = [
  { icon: Eye, title: "Transparent Analysis", desc: "Every output ships with the reasoning trail and sources behind it, not just a final answer." },
  { icon: UserCheck, title: "Human Oversight", desc: "Review checkpoints let your team approve, edit, or override AI-generated decisions before they ship." },
  { icon: Gauge, title: "Confidence Reporting", desc: "Calibrated confidence scores accompany every result, so low-certainty outputs are easy to flag." },
  { icon: BrainCircuit, title: "Model Monitoring", desc: "Ongoing evaluation for drift, bias, and degraded performance across every deployed model version." },
];

const infraItems = [
  { icon: Cloud, label: "Cloud infrastructure", desc: "Hosted on hardened, regularly patched cloud environments with isolated tenancy." },
  { icon: Network, label: "Network protection", desc: "Segmented networks, firewalls, and DDoS mitigation at every ingress point." },
  { icon: Activity, label: "Monitoring", desc: "24/7 automated monitoring with alerting on anomalous system behavior." },
  { icon: RotateCcw, label: "Disaster recovery", desc: "Regular backups and tested recovery procedures to minimize downtime." },
  { icon: Users, label: "Access controls", desc: "Least-privilege access enforced across engineering and support teams." },
  { icon: GitBranch, label: "Secure deployment pipelines", desc: "Code review, automated scanning, and staged rollouts on every release." },
];

const integrations = ["Vaultic", "Northbeam", "Fluxgate", "Continuum", "Ledgerline", "Sparrow"];

const faqs = [
  { q: "How is uploaded data protected?", a: "All uploads are encrypted in transit with TLS 1.2+ and at rest with AES-256. Access is scoped to your workspace and logged for auditability." },
  { q: "Do you retain uploaded files?", a: "Retention is configurable per workspace. Files can be set to auto-delete after processing, or retained under your organization's policy." },
  { q: "Can Rivinity support enterprise reviews?", a: "Yes. Our security team can walk through architecture reviews, security questionnaires, and compliance documentation with your procurement or InfoSec team." },
  { q: "Do you provide audit logs?", a: "Enterprise workspaces include exportable audit logs covering authentication, access, and configuration events." },
  { q: "Is customer data used for AI training?", a: "No. Customer data and uploads are never used to train underlying models. Your data stays scoped to your workspace." },
];

function FaqItem({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#E4DED3]">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 py-6 text-left">
        <span className="text-[15px] font-medium text-[#17140F]">{item.q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#6F6A63] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl text-[15px] leading-relaxed text-[#6F6A63]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Compliance() {
  const [openFaq, setOpenFaq] = useState(0);
  const [access, setAccess] = useState(2); // 0 Viewer 1 Editor 2 Admin 3 Owner
  const accessLevels = ["Viewer", "Editor", "Admin", "Owner"];

  return (
    <div className="min-h-screen w-full bg-[#FCFBF9] font-sans text-[#17140F] antialiased">
     {/* ---------------- RIVINITY NAV ---------------- */}
{/* ---------------- NAVBAR ---------------- */}
<header className="sticky top-0 z-50">
  

  {/* Main navigation */}
  <div className="border-b border-[#E4DED3] bg-[#FCFBF9]/95 backdrop-blur-xl">
    <div className="mx-auto flex h-[70px] max-w-[1050px] items-center justify-between px-5 sm:px-6">

      {/* Logo */}
      <a
        href="/"
        className="group flex min-w-[105px] flex-col justify-center"
      >
        <span className="text-[19px] font-semibold leading-none tracking-[-0.045em] text-[#202B3C] transition-colors group-hover:text-[#C4622D]">
          Rivinity
        </span>

       
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-[3px] lg:flex">

        <a
          href="/platform"
          className="rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#777B86] transition-colors hover:bg-[#F3F0EB] hover:text-[#202B3C]"
        >
          Platform
        </a>

        <a
          href="/solutions"
          className="rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#777B86] transition-colors hover:bg-[#F3F0EB] hover:text-[#202B3C]"
        >
          Solutions
        </a>

        {/* Active Research */}
        <a
          href="/research"
          className="relative rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#202B3C]"
        >
          Research

          <span className="absolute -bottom-[19px] left-1/2 h-[2px] w-[62px] -translate-x-1/2 bg-[#C4622D]" />
        </a>

        <a
          href="/pricing"
          className="rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#777B86] transition-colors hover:bg-[#F3F0EB] hover:text-[#202B3C]"
        >
          Pricing
        </a>

        <a
          href="/company"
          className="rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#777B86] transition-colors hover:bg-[#F3F0EB] hover:text-[#202B3C]"
        >
          Company
        </a>
      </nav>

      {/* Right actions */}
      <div className="hidden min-w-[180px] items-center justify-end gap-1.5 lg:flex">

        <a
          href="/docs"
          className="rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#777B86] transition-colors hover:bg-[#F3F0EB] hover:text-[#202B3C]"
        >
          Docs
        </a>

        <a
          href="/login"
          className="rounded-[3px] px-3 py-2 text-[12px] font-medium text-[#777B86] transition-colors hover:bg-[#F3F0EB] hover:text-[#202B3C]"
        >
          Sign in
        </a>

        <a
          href="/get-started"
          className="ml-1 rounded-full bg-[#F0F0EF] px-4 py-2 text-[12px] font-medium text-[#202B3C] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8E7E5]"
        >
          Get Started
        </a>
      </div>

      {/* Mobile menu */}
      <button
        type="button"
        aria-label="Open navigation menu"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4DED3] text-[#202B3C] transition-colors hover:bg-[#F3F0EB] lg:hidden"
      >
        <Menu className="h-[18px] w-[18px]" strokeWidth={1.7} />
      </button>
    </div>
  </div>
</header>
    
    {/* ---------------- HERO ---------------- */}
<section className="px-6 pt-10 sm:pt-14">
  <div className="mx-auto max-w-6xl">
    <div className="max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C4622D]">
        Trust & Security
      </p>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#17140F] sm:text-6xl lg:text-[64px]">
        Built for enterprise.
        <br />
        <span className="text-[#6F6A63]">Secure by design.</span>
      </h1>

      <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#6F6A63] sm:text-[16px]">
        Rivinity protects AI workflows, media analysis, and enterprise
        deployments with{" "}
        <span className="font-medium text-[#C4622D]">
          security-first infrastructure
        </span>
        , calibrated confidence reporting, and privacy-focused practices
        by default.
      </p>
    </div>

    {/* Trust indicators */}
    <div className="mt-10 border-y border-[#E4DED3]">
      <div className="grid grid-cols-2 sm:grid-cols-5">
        {trustBadges.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-5 sm:justify-center sm:py-6 ${
              i !== 0 ? "border-t border-[#E4DED3] sm:border-l sm:border-t-0" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D8D0C4] bg-[#FCFBF9]">
              <Icon
                className="h-4 w-4 text-[#6F6A63]"
                strokeWidth={1.5}
              />
            </div>

            <span className="font-mono text-[9.5px] uppercase tracking-[0.09em] text-[#6F6A63]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ---------------- SPLIT A: texture panel + copy ---------------- */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <TexturePanel variant="clay">
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-[#E4DED3] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(23,20,15,0.35)] sm:inset-x-10 sm:bottom-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6F6A63]">
                Access Controls
              </p>
              <div className="mt-4">
                <div className="relative h-1.5 rounded-full bg-[#EFE7DA]">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#C4622D] transition-all duration-300"
                    style={{ width: `${(access / (accessLevels.length - 1)) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#C4622D] bg-white transition-all duration-300"
                    style={{ left: `calc(${(access / (accessLevels.length - 1)) * 100}% - 7px)` }}
                  />
                </div>
                <div className="mt-3 flex justify-between font-mono text-[11px] text-[#6F6A63]">
                  {accessLevels.map((lvl, i) => (
                    <button
                      key={lvl}
                      onClick={() => setAccess(i)}
                      className={i === access ? "font-semibold text-[#C4622D]" : ""}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#E4DED3] pt-4">
                <span className="font-mono text-[11px] text-[#6F6A63]">SCOPE PER WORKSPACE</span>
                <div className="flex rounded-md bg-[#F3E4D8] p-0.5 font-mono text-[10.5px]">
                  <span className="rounded bg-[#17140F] px-2 py-1 text-white">HUMAN</span>
                  <span className="px-2 py-1 text-[#6F6A63]">AGENT</span>
                </div>
              </div>
            </div>
          </TexturePanel>

          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Access that flexes to your org chart
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6F6A63]">
              Every Rivinity workspace scopes permissions down to the individual and the agent. Set
              viewer, editor, admin, or owner tiers, cap what automated workflows can touch, and change
              it without waiting on a support ticket.
            </p>
            <button className="mt-7 rounded-md border border-[#17140F] px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide">
              View Permissions Docs
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- SPLIT B: copy + texture panel ---------------- */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Start building with Rivinity
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6F6A63]">
              Spin up a workspace in minutes. Every request runs through the same encrypted pipeline,
              logged and auditable from day one.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-md bg-[#C4622D] px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide text-white">
                Get API Access
              </button>
              <button className="rounded-md border border-[#17140F] px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide">
                Docs
              </button>
            </div>
          </div>

          <TexturePanel variant="slate">
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 rounded-2xl border border-[#E4DED3] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(23,20,15,0.35)] sm:inset-x-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6F6A63]">
                  Agent Onboarding
                </p>
                <Copy className="h-3.5 w-3.5 text-[#6F6A63]" />
              </div>
              <p className="mt-3 font-mono text-[12.5px] leading-relaxed text-[#17140F]">
                Use curl to read{" "}
                <span className="text-[#C4622D]">rivinity.ai/agents.md</span> and complete setup to
                install Rivinity.
              </p>
            </div>
          </TexturePanel>
        </div>
      </section>

      {/* ---------------- INTEGRATION WALL ---------------- */}
      <section className="border-y border-[#E4DED3] px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6F6A63]">
            Available across your stack
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
            {integrations.map((name) => (
              <span key={name} className="text-lg font-semibold tracking-tight text-[#17140F]">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

{/* ---------------- COMPLIANCE STANDARDS ---------------- */}
<section className="px-6 py-24 sm:py-28">
  <div className="mx-auto max-w-6xl">
    {/* Section Header */}
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C4622D]" />
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6F6A63]">
          Standards
        </p>
      </div>

      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-[#17140F] sm:text-4xl">
        Compliance standards
      </h2>

      <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6F6A63]">
        Rivinity is designed around recognized security, privacy, and
        governance frameworks to help organizations deploy AI with confidence.
      </p>
    </div>

    {/* Standards Grid */}
    <div className="mt-12 grid overflow-hidden rounded-[24px] border border-[#DED8CE] bg-[#DED8CE] sm:grid-cols-2 lg:grid-cols-3">
      {complianceStandards.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="group relative bg-[#FCFBF9] p-8 transition-all duration-300 hover:bg-white"
        >
          {/* Top accent */}
          <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#C4622D] transition-all duration-300 group-hover:w-full" />

          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4DED3] bg-white transition-all duration-300 group-hover:border-[#C4622D]/30 group-hover:bg-[#C4622D]/5">
            <Icon
              className="h-[18px] w-[18px] text-[#C4622D] transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </div>

          {/* Content */}
          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#17140F]">
                {title}
              </h3>

              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9A9389] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Verified
              </span>
            </div>

            <p className="mt-3 text-[13.5px] leading-6 text-[#6F6A63]">
              {desc}
            </p>
          </div>

          {/* Bottom indicator */}
          <div className="mt-8 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9A9389]">
              Security framework
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ---------------- SECURITY CONTROLS ---------------- */}
<section className="relative overflow-hidden border-y border-[#E4DED3] bg-[#FCFBF9] px-6 py-24 sm:py-28">
  {/* subtle background glow */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#C4622D]/[0.035] blur-3xl" />

  <div className="relative mx-auto max-w-6xl">
    {/* Section heading */}
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C4622D]" />
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A746C]">
          Security Controls
        </p>
      </div>

      <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-[#17140F] sm:text-4xl lg:text-[46px]">
        Enterprise protection
        <br />
        <span className="text-[#716B63]">at every layer.</span>
      </h2>

      <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#6F6A63] sm:text-base">
        Security controls designed to protect your data, infrastructure,
        identities, and AI workloads from end to end.
      </p>
    </div>

    {/* Controls grid */}
    <div className="mt-14 grid overflow-hidden rounded-[24px] border border-[#DDD6CB] bg-[#DDD6CB] sm:grid-cols-2 lg:grid-cols-4">
      {securityControls.map(({ icon: Icon, label, description }, index) => (
        <div
          key={label}
          className="group relative min-h-[210px] bg-white p-7 transition-all duration-300 hover:bg-[#F9F6F1]"
        >
          {/* number */}
          <div className="absolute right-6 top-6 font-mono text-[10px] tracking-widest text-[#B8B1A7]">
            0{index + 1}
          </div>

          {/* icon */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E4DED3] bg-[#FCFBF9] transition-all duration-300 group-hover:border-[#C4622D]/30 group-hover:bg-[#C4622D]/[0.06]">
            <Icon
              className="h-[18px] w-[18px] text-[#C4622D] transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.8}
            />
          </div>

          {/* content */}
          <div className="mt-7">
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#17140F]">
              {label}
            </h3>

            {description && (
              <p className="mt-2 max-w-[220px] text-[13px] leading-6 text-[#777168]">
                {description}
              </p>
            )}
          </div>

          {/* hover indicator */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C4622D] transition-all duration-300 group-hover:w-full" />
        </div>
      ))}
    </div>

    {/* Bottom trust line */}
    <div className="mt-8 flex flex-col gap-3 border-t border-[#E4DED3] pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A837A]">
        Defense in depth · Continuous monitoring · Least privilege
      </p>

      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4B8B63]" />
        <span className="text-[12px] font-medium text-[#6F6A63]">
          Security controls active
        </span>
      </div>
    </div>
  </div>
</section>

  {/* ---------------- DATA PRIVACY ---------------- */}
<section className="border-y border-[#E4DED3] bg-[#FCFBF9] px-6 py-20 sm:py-24">
  <div className="mx-auto max-w-6xl">

    {/* HEADER */}
    <div className="mb-12 max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A837A]">
        Data protection
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#17140F] sm:text-4xl">
        Your data stays yours.
      </h2>

      <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6F6A63]">
        Rivinity is designed around privacy from the ground up, with
        strict isolation, encryption, and control over how customer
        data is stored and handled.
      </p>
    </div>

    {/* CARDS */}
    <div className="grid gap-5 lg:grid-cols-2">

      {/* DATA PRIVACY */}
      <div className="group rounded-[22px] border border-[#E4DED3] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#CFC5B7] hover:shadow-[0_12px_35px_rgba(40,32,24,0.06)] sm:p-10">

        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E4DED3] bg-[#F8F5F0]">
            <Fingerprint
              className="h-5 w-5 text-[#C4622D]"
              strokeWidth={1.5}
            />
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9A9288]">
            01 / Privacy
          </span>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[#17140F]">
          Data privacy
        </h3>

        <p className="mt-3 max-w-md text-[14px] leading-6 text-[#6F6A63]">
          Customer data remains under your control. Rivinity does not
          claim ownership of your content or use it to train underlying
          AI models.
        </p>

        <div className="mt-8">
          {[
            "You retain ownership of your data and content.",
            "Customer uploads are never used to train AI models.",
            "Workspace-level isolation keeps customer data separated.",
          ].map((item, index) => (
            <div
              key={item}
              className="flex gap-4 border-t border-[#EAE5DD] py-4 last:border-b"
            >
              <span className="pt-1 font-mono text-[10px] text-[#C4622D]">
                0{index + 1}
              </span>

              <p className="text-[14px] leading-6 text-[#5F5952]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECURE STORAGE */}
      <div className="group rounded-[22px] border border-[#E4DED3] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#CFC5B7] hover:shadow-[0_12px_35px_rgba(40,32,24,0.06)] sm:p-10">

        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E4DED3] bg-[#F8F5F0]">
            <Database
              className="h-5 w-5 text-[#C4622D]"
              strokeWidth={1.5}
            />
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9A9288]">
            02 / Storage
          </span>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[#17140F]">
          Secure storage
        </h3>

        <p className="mt-3 max-w-md text-[14px] leading-6 text-[#6F6A63]">
          Data is protected throughout its lifecycle with encryption
          and configurable retention controls designed for enterprise
          environments.
        </p>

        <div className="mt-8">
          {[
            "AES-256 encryption protects data at rest.",
            "TLS 1.2+ protects data in transit.",
            "Policy-driven retention and deletion controls.",
          ].map((item, index) => (
            <div
              key={item}
              className="flex gap-4 border-t border-[#EAE5DD] py-4 last:border-b"
            >
              <span className="pt-1 font-mono text-[10px] text-[#C4622D]">
                0{index + 1}
              </span>

              <p className="text-[14px] leading-6 text-[#5F5952]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>
{/* ---------------- AI GOVERNANCE ---------------- */}
<section className="border-y border-[#E4DED3] bg-white px-6 py-20 sm:py-24">
  <div className="mx-auto max-w-6xl">
    {/* Section heading */}
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#C4622D]">
        AI Governance
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17140F] sm:text-4xl">
        Responsible AI
      </h2>

      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#6F6A63]">
        Rivinity is designed to keep AI systems observable, reviewable, and
        accountable throughout their lifecycle.
      </p>
    </div>

    {/* Governance cards */}
    <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E4DED3] bg-[#E4DED3] sm:grid-cols-2 lg:grid-cols-4">
      {governanceCards.map(({ icon: Icon, title, desc }, index) => (
        <div
          key={title}
          className="group relative overflow-hidden bg-[#FCFBF9] p-7 opacity-0 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_35px_rgba(23,20,15,0.07)]"
          style={{
            animation: `fadeUp .65s ease-out ${index * 100}ms forwards`,
          }}
        >
          {/* Top accent */}
          <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#C4622D] transition-all duration-500 group-hover:w-full" />

          {/* Icon */}
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#E4DED3] bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#C4622D]/30 group-hover:bg-[#C4622D]/5">
            <Icon
              className="h-5 w-5 text-[#C4622D] transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </div>

          {/* Content */}
          <h3 className="text-[16px] font-semibold text-[#17140F] transition-colors duration-300 group-hover:text-[#C4622D]">
            {title}
          </h3>

          <p className="mt-2 text-[13.5px] leading-relaxed text-[#6F6A63]">
            {desc}
          </p>

          {/* Learn more */}
          <div className="mt-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[#C4622D] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            <span>Learn more</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
          </div>

          {/* Background glow */}
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#C4622D]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  </div>

  {/* Animation */}
  <style jsx>{`
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(24px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
</section>

{/* ---------------- INFRASTRUCTURE SECURITY ---------------- */}
<section className="px-6 py-20 sm:py-24">
  <div className="group relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-[#E4DED3] bg-[#F7F5F0] p-10 shadow-[0_12px_40px_rgba(23,20,15,0.06)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(23,20,15,0.10)] sm:p-14">

    {/* Soft animated background glow */}
    <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#E08A5B]/10 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
    <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#D9C8B8]/30 blur-3xl transition-transform duration-1000 group-hover:scale-110" />

    {/* Content */}
    <div className="relative z-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#C4622D]">
        Infrastructure
      </p>

      <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[#17140F] sm:text-4xl">
        Security underneath every workflow
      </h2>

      <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#6F6A63]">
        Built on secure infrastructure designed to protect your data,
        workloads, and AI workflows at every layer.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {infraItems.map(({ icon: Icon, label, desc }, index) => (
          <div
            key={label}
            className="group/card relative overflow-hidden rounded-2xl border border-[#E4DED3] bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D8B49C] hover:shadow-[0_16px_35px_rgba(23,20,15,0.08)]"
            style={{
              animation: `infraFadeUp 0.6s ease-out ${index * 100}ms both`,
            }}
          >
            {/* Animated top line */}
            <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#E08A5B] transition-all duration-500 group-hover/card:w-full" />

            {/* Icon */}
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DDD2] bg-[#FBF8F4] transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-3 group-hover/card:border-[#E08A5B]/40 group-hover/card:bg-[#FFF4EC]">
              <Icon
                className="h-5 w-5 text-[#C4622D] transition-transform duration-500 group-hover/card:scale-110"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mb-2 text-[15px] font-semibold text-[#17140F]">
              {label}
            </h3>

            <p className="text-[13px] leading-relaxed text-[#6F6A63]">
              {desc}
            </p>

            {/* Hover arrow */}
            <div className="mt-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-[#C4622D] opacity-0 transition-all duration-500 group-hover/card:translate-x-1 group-hover/card:opacity-100">
              <span>Protected layer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom decorative line */}
    <div className="absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E08A5B]/40 to-transparent" />
  </div>

  {/* Animation */}
  <style jsx>{`
    @keyframes infraFadeUp {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
</section>


{/* ---------------- CTA ---------------- */}
<section className="px-6 pb-24 sm:pb-32">
  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#E4DED3] bg-[#F6F2EC] p-12 text-center sm:p-16">
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#C4622D]">
        Security & Compliance
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#2A251E] sm:text-4xl">
        Need security documentation?
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#6F6A63]">
        Contact our team to discuss compliance reviews, security questionnaires,
        and enterprise deployment.
      </p>

      <button className="group mt-8 inline-flex items-center gap-2 rounded-md bg-[#C4622D] px-6 py-3 font-mono text-[12px] uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B65326] hover:shadow-md">
        Contact Security Team
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
</section>
    
{/* ==================== RIVINITY FOOTER ==================== */}
<footer className="w-full overflow-hidden bg-[#F7F4EF] px-6 py-10 font-sans text-[#24221F] antialiased sm:px-10 lg:px-12">
  <div className="mx-auto flex min-h-[390px] w-full max-w-[1440px] flex-col justify-between">

    {/* ==================== TOP CONTENT ==================== */}
    <div className="grid gap-10 lg:grid-cols-[minmax(250px,390px)_1fr] lg:gap-20">

      {/* Newsletter */}
      <div className="max-w-[390px]">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A837A]">
          Stay connected
        </p>

        <h2 className="max-w-[340px] text-[18px] font-normal leading-[1.12] tracking-normal text-[#24221F] sm:text-[20px]">
          Keep up to date with Rivinity.
          <br />
          Subscribe to our newsletter.
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 max-w-[390px]"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="h-[50px] w-full rounded-md border border-[#D9D2C7] bg-white px-6 text-sm text-[#24221F] outline-none transition-all duration-200 placeholder:text-[#969087] focus:border-[#BDB4A8] focus:bg-[#FCFBF9] focus:ring-2 focus:ring-[#E8E2D9]"
          />

          <button
            type="submit"
            className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#24221F] px-5 text-sm font-medium text-[#F7F4EF] shadow-sm transition-all duration-200 hover:bg-[#3A3732] active:scale-[0.98]"
          >
            <span>Subscribe</span>
            <span className="text-base">→</span>
          </button>
        </form>
      </div>

      {/* ==================== FOOTER NAVIGATION ==================== */}
      <nav
        aria-label="Footer navigation"
        className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4"
      >

        {/* Company */}
        <div>
          <h3 className="text-[15px] font-normal tracking-[0.08em] text-[#24221F]">
            COMPANY
          </h3>

          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="/about"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Our Story
              </a>
            </li>

            <li>
              <a
                href="/team"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Team
              </a>
            </li>

            <li>
              <a
                href="/careers"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Careers
              </a>
            </li>

            <li>
              <a
                href="/governance"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Governance
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-[15px] font-normal tracking-[0.08em] text-[#24221F]">
            RESOURCES
          </h3>

          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="/research"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Research
              </a>
            </li>

            <li>
              <a
                href="/blog"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Blog
              </a>
            </li>

            <li>
              <a
                href="/documentation"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Documentation
              </a>
            </li>

            <li>
              <a
                href="/api"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                API
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-[15px] font-normal tracking-[0.08em] text-[#24221F]">
            LEGAL
          </h3>

          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="/terms"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Terms & Conditions
              </a>
            </li>

            <li>
              <a
                href="/privacy"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Privacy Policy
              </a>
            </li>

            <li>
              <a
                href="/security"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Security
              </a>
            </li>

            <li>
              <a
                href="/compliance"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Compliance
              </a>
            </li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-[15px] font-normal tracking-[0.08em] text-[#24221F]">
            PRODUCT
          </h3>

          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="/platform"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Platform
              </a>
            </li>

            <li>
              <a
                href="/ai-governance"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                AI Governance
              </a>
            </li>

            <li>
              <a
                href="/data-privacy"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Data Privacy
              </a>
            </li>

            <li>
              <a
                href="/security"
                className="text-sm font-light tracking-wide text-[#6F6A63] transition-colors hover:text-[#C4622D]"
              >
                Security Controls
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>


    {/* ==================== BOTTOM BAR ==================== */}
    <div className="mt-9 grid gap-6 border-t border-[#E4DED3] pt-7 text-[#24221F] md:grid-cols-3 md:items-center">

      {/* Copyright */}
      <p className="text-sm font-light leading-none text-[#8A837A]">
        © 2026 Rivinity. All rights reserved.
      </p>

      {/* Socials */}
      <div className="flex items-center gap-5 md:justify-center">
        <a
          href="#"
          aria-label="X"
          className="flex min-h-10 min-w-10 items-center justify-center text-sm font-medium text-[#6F6A63] transition-colors hover:text-[#C4622D] md:min-h-6 md:min-w-6"
        >
          X
        </a>

        <a
          href="#"
          aria-label="LinkedIn"
          className="flex min-h-10 min-w-10 items-center justify-center text-sm font-medium text-[#6F6A63] transition-colors hover:text-[#C4622D] md:min-h-6 md:min-w-6"
        >
          LinkedIn
        </a>

        <a
          href="#"
          aria-label="GitHub"
          className="flex min-h-10 min-w-10 items-center justify-center text-sm font-medium text-[#6F6A63] transition-colors hover:text-[#C4622D] md:min-h-6 md:min-w-6"
        >
          GitHub
        </a>
      </div>

      {/* Language */}
      <div className="flex items-center justify-start md:justify-end">
        <button
          type="button"
          className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#D9D2C7] bg-white px-4 text-sm font-normal text-[#5F5A53] shadow-sm transition-all duration-200 hover:border-[#C4622D] hover:text-[#C4622D] active:scale-[0.98]"
        >
          <span>English</span>
          <span className="text-xs">⌄</span>
        </button>
      </div>

    </div>
  </div>
</footer>
    </div>
  );
}