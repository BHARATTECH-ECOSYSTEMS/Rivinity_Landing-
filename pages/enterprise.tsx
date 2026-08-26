import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {
    ShieldCheck,
    Zap,
    Lock,
    Cpu,
    Layers,
    Server,
    CheckCircle2,
} from "lucide-react";

export default function EnterprisePage() {
    const [teamSize, setTeamSize] = useState("100-500");

    const metrics = [
        { value: "99.99%", label: "Guaranteed SLA Uptime" },
        { value: "SOC 2 Type II", label: "Certified Compliance" },
        { value: "< 10ms", label: "Enterprise Engine Latency" },
        { value: "24/7/365", label: "Dedicated Solutions Support" },
    ];

    const enterpriseFeatures = [
        {
            icon: ShieldCheck,
            title: "Advanced Security & Governance",
            badge: "Compliance",
            desc: "SSO/SAML, granular RBAC, audit logs, custom data retention policies, and zero data training guarantees.",
        },
        {
            icon: Cpu,
            title: "Custom Model Fine-Tuning",
            badge: "Private Engine",
            desc: "Deploy fine-tuned enterprise models on isolated cloud infrastructure or within your own private VPC.",
        },
        {
            icon: Layers,
            title: "Unified Knowledge Graph",
            badge: "Persistent State",
            desc: "Connect thousands of developer workspaces into a single indexable knowledge graph with instant sync.",
        },
        {
            icon: Server,
            title: "Dedicated Compute Clusters",
            badge: "High Throughput",
            desc: "Isolated high-performance GPU nodes with autoscaling engineered for high-concurrency workloads.",
        },
        {
            icon: Lock,
            title: "VPC & On-Prem Deployment",
            badge: "Data Sovereignty",
            desc: "Keep complete control over sensitive data with seamless AWS, OCI, Azure, or air-gapped deployments.",
        },
        {
            icon: Zap,
            title: "Priority SLA & Support",
            badge: "Dedicated Team",
            desc: "Get 15-minute emergency response SLAs, dedicated Slack/Teams channels, and tailored onboarding solutions.",
        },
    ];

    const plans = [
        {
            name: "Enterprise Core",
            badge: "Scale-Up",
            desc: "For fast-growing engineering teams requiring dedicated compute and unified security.",
            features: [
                "Up to 250 enterprise seats",
                "SOC 2 Type II & HIPAA compliance",
                "SSO / SAML / Okta integration",
                "Dedicated VPC option",
                "99.9% Uptime SLA",
            ],
        },
        {
            name: "Enterprise Sovereign",
            badge: "Custom Scale",
            desc: "For global enterprises needing full data isolation, air-gapped environments, and custom models.",
            features: [
                "Unlimited seat capacity",
                "On-premise or air-gapped deployment",
                "Custom model fine-tuning & RAG",
                "Dedicated Solutions Architect",
                "99.99% Guaranteed SLA",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="section border-b mt-12 sm:mt-20 border-[#E5E7EB] pt-16 sm:pt-32 lg:pt-40 pb-12 sm:pb-20 lg:pb-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl">
                        <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.18] sm:leading-[1.15]">
                            Secure AI Orchestration Built for{" "}
                            <span className="text-[#FF6B00]">Global Scale</span>
                        </h1>
                        <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-[#6B7280] leading-relaxed">
                            Empower thousands of engineers with unified context, persistent
                            memory, and autonomous workflows—backed by bank-grade compliance and
                            dedicated VPC execution.
                        </p>
                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <div className="text-white flex flex-col sm:flex-row">
                                <a
                                    href="#contact"
                                    className="rounded-xl bg-[#1A1A1A] px-6 py-3.5 text-center text-sm font-bold text-white shadow-xs hover:bg-neutral-800 active:scale-95 transition-all"
                                >
                                    Schedule Enterprise Demo &darr;
                                </a>
                            </div>

                            <a
                                href="#features"
                                className="rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-center text-sm font-bold text-[#1A1A1A] hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all shadow-xs"
                            >
                                Explore Enterprise Features
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Metrics Section */}
            <section className="section border-b border-[#E5E7EB] bg-[#F7F7F8]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
                        {metrics.map((m, idx) => (
                            <div
                                key={idx}
                                className="p-5 sm:p-8 sm:first:pl-0 sm:last:pr-0"
                            >
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                                    {m.value}
                                </div>
                                <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-[#6B7280]">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section
                id="features"
                className="section border-b border-[#E5E7EB] py-12 sm:py-20 lg:py-24"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-8 sm:mb-12 max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                            Built for Security & Performance
                        </span>
                        <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                            Enterprise-Grade Control Architecture
                        </h2>
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base text-[#6B7280] leading-relaxed">
                            Designed to fit into complex corporate environments without
                            compromising developer speed or security compliance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {enterpriseFeatures.map((f, i) => {
                            const IconComp = f.icon;
                            return (
                                <div
                                    key={i}
                                    className="group bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs hover:border-[#FF6B00]/40 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                                                <IconComp size={20} />
                                            </div>
                                            <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider bg-[#FF6B00]/10 px-2.5 py-1 rounded-full">
                                                {f.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-2">
                                            {f.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Deployment & Custom Options */}
            <section className="section border-b border-[#E5E7EB] bg-[#F7F7F8] py-12 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                            Tailored Solutions for Your Stack
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className="bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="text-lg sm:text-xl font-extrabold text-[#1A1A1A]">
                                            {plan.name}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20 shrink-0">
                                            {plan.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-[#6B7280] mb-6 leading-relaxed">
                                        {plan.desc}
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feat, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#1A1A1A]"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className="text-[#FF6B00] shrink-0 mt-0.5"
                                                />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-white">
                                        <a
                                            href="#contact"
                                            className="w-full rounded-xl sm:rounded-2xl bg-[#1A1A1A] py-3.5 text-center text-sm font-boldshadow-xs hover:bg-neutral-800 active:scale-95 transition-all inline-block"
                                        >
                                            Request Quote
                                        </a>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise Contact / Form Section */}
            <section id="contact" className="section py-12 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 sm:mb-10 text-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                                Get Started
                            </span>
                            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                                Speak with an Enterprise Architect
                            </h2>
                        </div>

                        <div className="rounded-2xl sm:rounded-3xl border border-[#E5E7EB] bg-white p-5 sm:p-8 lg:p-10 shadow-xs">
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                                            Work Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="alex@company.com"
                                            className="w-full rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#FF6B00] focus:bg-white focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Acme Corp"
                                            className="w-full rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#FF6B00] focus:bg-white focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                                            Engineering Team Size
                                        </label>
                                        <select
                                            value={teamSize}
                                            onChange={(e) => setTeamSize(e.target.value)}
                                            className="w-full rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#FF6B00] focus:bg-white focus:outline-none transition-all"
                                        >
                                            <option value="10-50">10 - 50 Engineers</option>
                                            <option value="50-100">50 - 100 Engineers</option>
                                            <option value="100-500">100 - 500 Engineers</option>
                                            <option value="500+">500+ Engineers</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                                            Deployment Preference
                                        </label>
                                        <select className="w-full rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#FF6B00] focus:bg-white focus:outline-none transition-all">
                                            <option>Managed Cloud (SOC2 Dedicated)</option>
                                            <option>Isolated VPC Deployment</option>
                                            <option>On-Premise / Air-Gapped</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                                        Project Details / Security Requirements
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Tell us about your technical requirements, SAML setup, or compliance needs..."
                                        className="w-full rounded-xl sm:rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#FF6B00] focus:bg-white focus:outline-none transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl sm:rounded-2xl bg-[#FF6B00] py-3.5 sm:py-4 text-center text-sm font-bold text-white shadow-xs hover:bg-[#FF6B00]/90 active:scale-95 transition-all cursor-pointer"
                                >
                                    Contact Enterprise Team &rarr;
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}