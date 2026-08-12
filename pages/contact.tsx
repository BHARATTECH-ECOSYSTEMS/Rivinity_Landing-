"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
import LogoMarquee from "../components/logoslide";
import { InfiniteSlider } from "../components/ui/infinite-slider";
import {
    ArrowRight,
    Check,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";
import {
    Fingerprint,
    Users,
    Settings2,
    Lock,
    ScrollText,
    Globe,
} from "lucide-react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const ORANGE = "#FF4F12";
const CREAM = "#F7F4EC";
const BLACK = "#171717";
const BORDER = "#D9D5CC";
const MUTED = "#77736C";

const logos = ["Microsoft", "gusto", "Google", "Adobe", "ATLASSIAN", "BOEING", "ClickUp"];

const capabilities = [
    {
        title: "Shorten your product development lifecycle",
        body: "Product Managers & Designers can quickly prototype and test their product ideas with clickable prototypes to speed up customer demos, gather feedback faster, and dramatically shorten the product development cycle.",
        type: "lifecycle",
    },
    {
        title: "Enable every team to automate workflows",
        body: "Give every department — sales, marketing, ops, finance, HR, legal — the tools to tackle work that previously required engineering. No waiting. No tickets. No lockups.",
        type: "workflow",
    },
    {
        title: "Collaborate across the organization",
        body: "Collaborate on shared workspace where your team plans and builds together, while Agent handles execution behind the scenes. Work in real time with live cursors, control changes with explicit approvals, and ship faster with built-in permissions, audit logs, and governance.",
        type: "collaboration",
    },
];

const faqs = [
    ["What is Replit Enterprise?", "Replit Enterprise gives every team the ability to build software, internal tools, dashboards, and prototypes securely with enterprise controls."],
    ["What's included in Replit Enterprise?", "Enterprise includes Replit Agent, multi-artifact workflows, connectors, SSO, SCIM, audit logs, governance, and enterprise security controls."],
    ["What security and compliance is in place?", "Enterprise provides identity controls, access management, private deployments, audit logging, and security controls designed for large organizations."],
    ["How do we control and attribute cost across teams?", "Usage can be managed across teams and workspaces so organizations can understand and govern how resources are consumed."],
    ["How do we govern app-building across the organization?", "Admins can control publishing, data access, connector usage, and other organization-wide policies."],
    ["How does Replit integrate with our existing engineering toolchain?", "Replit connects with identity providers, source control, data systems, and other tools through connectors and APIs."],
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}


function VisualCard({ type }: { type: string }) {
    if (type === "lifecycle") {
        return (
            <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#FF7167] via-[#E8B4DD] to-[#7FD4EF]">
                <div className="absolute left-1/2 top-[23%] -translate-x-1/2 rounded-xl bg-white p-3 shadow-lg">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFF0EA] text-[#FF4F12]">✦</span>
                </div>
                <div className="absolute left-[17%] right-[17%] top-[46%] h-px bg-white/80" />
                {["Idea", "Prototype", "Preview", "Ship"].map((x, i) => (
                    <div key={x} className="absolute top-[39%] flex w-16 flex-col items-center gap-1" style={{ left: `${12 + i * 25}%` }}>
                        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/80 bg-white/75 text-[9px] text-[#FF4F12]">{i + 1}</span>
                        <span className="text-[8px] text-white">{x}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (type === "workflow") {
        return (
            <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#FFD27D] via-[#FFA56D] to-[#B76EF4]">
                <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-white shadow-lg">
                    <span className="font-bold text-[#FF4F12]">✦</span>
                </div>
                {["Sales", "Ops", "HR", "Finance"].map((x, i) => (
                    <div key={x} className="absolute rounded-lg border border-white/70 bg-white/75 px-2 py-1 text-[8px] text-[#4D4A45]" style={{
                        left: i % 2 === 0 ? "9%" : "70%",
                        top: i < 2 ? "18%" : "68%"
                    }}>{x}</div>
                ))}
                <div className="absolute inset-0 opacity-70">
                    <svg className="h-full w-full" viewBox="0 0 400 300" fill="none">
                        <path d="M75 65 C140 65 150 145 195 150 M325 65 C260 65 250 145 205 150 M75 235 C140 235 150 155 195 150 M325 235 C260 235 250 155 205 150" stroke="white" strokeWidth="1.5" strokeDasharray="4 5" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#FFB36D] via-[#F68D9E] to-[#8D77EF]">
            <div className="absolute left-[14%] top-[15%] h-[70%] w-[72%] rounded-xl bg-white/85 p-4 shadow-2xl">
                <div className="mb-3 h-2 w-24 rounded-full bg-black/10" />
                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => <div key={i} className="h-8 rounded-md bg-black/4.5" />)}
                </div>
                <div className="mt-4 h-24 rounded-lg border border-black/5 bg-white">
                    <div className="mt-12 h-1 bg-linear-to-r from-[#FF4F12] via-[#F49C74] to-transparent" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="h-9 rounded-md bg-black/4" />
                    <div className="h-9 rounded-md bg-black/4" />
                </div>
            </div>
        </div>
    );
}

function AgentVisual() {
    return (
        <div className="relative aspect-square overflow-hidden rounded-[22px] bg-linear-to-br from-[#7FCFE7] via-[#B8A6E9] to-[#FF4D16]">
            <div className="absolute inset-0 opacity-40">
                <svg className="h-full w-full" viewBox="0 0 500 500">
                    <circle cx="250" cy="250" r="160" stroke="white" strokeDasharray="5 7" fill="none" />
                    <circle cx="250" cy="250" r="110" stroke="white" strokeDasharray="4 8" fill="none" />
                </svg>
            </div>
            <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-[#151515] text-lg font-semibold text-white shadow-2xl">
                Agent <sup className="ml-1 text-xs">4</sup>
            </div>
            {[
                ["scale", "top-[14%] left-[18%]"],
                ["test", "top-[25%] right-[12%]"],
                ["fix", "bottom-[22%] right-[16%]"],
                ["publish", "bottom-[20%] left-[14%]"],
            ].map(([label, pos]) => (
                <div key={label} className={`absolute ${pos} rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-[11px] text-black shadow-lg`}>
                    {label}
                </div>
            ))}
        </div>
    );
}


function PlatformShowcase() {
    const [active, setActive] = useState("Replit Agent");

    const tabs = [
        "Replit Agent",
        "Multi-Artifact",
        "Connectors",
        "Templates & Skills",
        "Deployments",
        "Source control & handoff",
    ];

    const content: Record<string, {
        title: string;
        paragraphs: string[];
        visual: React.ReactNode;
    }> = {
        "Replit Agent": {
            title: "Build, test & fix autonomously from prompt to production",
            paragraphs: [
                "Agent 4 plans, builds, tests, debugs, and iterates on applications independently, coordinating parallel tasks across isolated micro-VMs to move faster on complex projects.",
                "Teams can go from idea to working software without stitching together multiple tools.",
            ],
            visual: <AgentVisual />,
        },

        "Multi-Artifact": {
            title: "Create anything you want with code",
            paragraphs: [
                "Replit can generate and manage full-stack web apps, mobile apps, landing pages, internal tools, AI agents, slide decks, and even launch videos, all within a single collaborative project workspace.",
                "This lets teams move from concept to complete product experience in one environment.",
            ],
            visual: <MultiArtifactVisual />,
        },

        "Connectors": {
            title: "Connect securely to the systems your business already runs on",
            paragraphs: [
                "Build production-ready apps on top of data & tools you already use.",
                "Hundreds of first-party connectors including Salesforce, Snowflake, Databricks, Slack, HubSpot, Gmail, Jira, and more can be configured at the organization level, alongside MCP servers for proprietary internal APIs and workflows.",
            ],
            visual: <ConnectorsVisual />,
        },

        "Templates & Skills": {
            title: "Standardize how your company builds",
            paragraphs: [
                "Custom Templates and Skills let organizations create design systems, enforce architecture patterns, security defaults, compliance requirements, coding conventions, and standard workflows across every project.",
            ],
            visual: <TemplatesVisual />,
        },

        "Deployments": {
            title: "Deploy to your secure, governed cloud",
            paragraphs: [
                "Deploy instantly with Autoscale, Reserved VM, Static, or Scheduled deployments — all managed directly inside Replit. Deploy to Google Cloud, Microsoft Azure or Databricks.",
                "Teams can launch apps, automations, APIs, and internal tools without setting up separate infrastructure or DevOps pipelines.",
            ],
            visual: <DeploymentsVisual />,
        },

        "Source control & handoff": {
            title: "Handoff prototypes seamlessly to engineering",
            paragraphs: [
                "Replit supports Git-based workflows, exports to GitHub and Azure DevOps, downloadable source packages, and integrations with VS Code and Cursor, making it easy to transition projects from rapid prototyping to production engineering workflows.",
            ],
            visual: <HandoffVisual />,
        },
    };

    const item = content[active];

    return (
        <>
            <div className="text-center text-5xl mb-15 font-semibold">The enterprise platform for building software</div>
            <div className="flex justify-center overflow-x-auto pb-2">
                <div
                    className="flex max-w-full items-center gap-2 overflow-x-auto pb-2 sm:gap-4"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {tabs.map((tab) => {
                        const selected = active === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActive(tab)}
                                className="whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-normal transition-all duration-200"
                                style={{
                                    color: selected ? "#fff" : "#69655E",
                                    background: selected ? ORANGE : "transparent",
                                }}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="mt-14 flex flex-row flex-wrap justify-center items-center gap-12 md:mt-16 md:grid-cols-[0.9fr_1fr] md:gap-20"
                >
                    <div className="max-w-117.5 ">
                        <h3 className="text-[19px] font-normal leading-[1.04] tracking-[-0.055em] md:text-[27px]">
                            {item.title}
                        </h3>

                        <div className="mt-6 space-y-5">
                            {item.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="text-[14px] leading-[1.95] text-[#77736C] md:text-[15px]">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="w-120">{item.visual}</div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

function ShowcaseShell({
    children,
    background = "linear-gradient(135deg,#7FCFE7 0%,#A7A4D9 45%,#FF8D61 100%)",
}: {
    children: React.ReactNode;
    background?: string;
}) {
    return (
        <div
            className="relative aspect-square w-full overflow-hidden rounded-[20px] md:aspect-[1.05/1]"
            style={{ background }}
        >
            {children}
        </div>
    );
}

function HandoffVisual() {
    return (
        <ShowcaseShell background="linear-gradient(145deg,#72AFA9 0%,#8BB7A6 28%,#F6D984 68%,#F7A181 100%)">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(255,110,90,.85),transparent_27%),radial-gradient(circle_at_85%_30%,rgba(255,180,150,.55),transparent_35%)]" />

            <div className="absolute left-[13%] top-[19%] w-[32%] rounded-lg bg-white/90 p-3 shadow-xl blur-[.15px]">
                <div className="text-[5px] text-black/30">Dashboard</div>
                <div className="mt-2 text-[12px] font-medium text-black/25">1,231</div>
                <div className="mt-3 flex items-end gap-0.5">
                    {[15, 22, 18, 29, 24, 34, 28, 40].map((h, i) => (
                        <span key={i} className="w-1.75 rounded-t-sm bg-[#B7B7B7]/40" style={{ height: h }} />
                    ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1">
                    <div className="h-6 rounded bg-black/[.035]" />
                    <div className="h-6 rounded bg-black/[.035]" />
                </div>
            </div>

            <div className="absolute left-[51%] top-[27%] rounded-lg bg-white/90 px-4 py-3 shadow-lg">
                <p className="text-[7px] font-medium text-black/65">Handoff</p>
                <div className="mt-2 space-y-1.5 text-[6px] text-black/40">
                    <p>○ Export code</p>
                    <p>○ Push to GitHub</p>
                    <p>○ Sync project</p>
                    <p>○ Ready for team</p>
                </div>
            </div>

            <div className="absolute left-[39%] top-[37%] h-[23%] w-[28%]">
                <svg className="h-full w-full" viewBox="0 0 120 100" fill="none">
                    <path d="M5 12 C48 12 55 40 75 40 C98 40 105 65 115 85" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity=".75" />
                </svg>
            </div>

            <div className="absolute left-[40%] top-[47%] grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[17px] text-[#555] shadow-lg">
                <span className="font-bold">●</span>
            </div>

            <div className="absolute right-[11%] bottom-[15%] w-[32%] rounded-lg bg-white/95 p-3 shadow-xl">
                <div className="text-[6px] text-black/40">Good morning, Alex</div>
                <div className="mt-1 text-[12px] font-semibold text-black/70">1,231</div>
                <div className="mt-2 h-7.5">
                    <svg className="h-full w-full" viewBox="0 0 100 30" fill="none">
                        <path d="M0 25 L15 18 L26 20 L37 8 L50 14 L62 7 L76 12 L88 4 L100 7" stroke="#777" strokeWidth="1.4" />
                    </svg>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1">
                    <div className="h-6 rounded bg-black/[.035]" />
                    <div className="h-6 rounded bg-black/[.035]" />
                </div>
            </div>
        </ShowcaseShell>
    );
}

function DeploymentsVisual() {
    return (
        <ShowcaseShell background="linear-gradient(140deg,#D3A9C7 0%,#7C9CA5 42%,#B4C5B1 67%,#E56D4E 100%)">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(210,235,225,.55),transparent_35%),radial-gradient(circle_at_22%_90%,rgba(255,228,160,.65),transparent_38%)]" />

            <div className="absolute left-[14%] top-[19%] w-[52%] rounded-[20px] bg-white/95 p-6 shadow-xl">
                {["Autoscale", "Reserved VM", "Static", "Scheduled"].map((x, i) => (
                    <div key={x} className={`flex items-center gap-3 py-3 ${i ? "border-t border-black/10" : ""}`}>
                        <span className="text-[14px] text-[#F06A45]">{["↗", "◉", "▣", "□"][i]}</span>
                        <span className="text-[12px] text-black/70">{x}</span>
                    </div>
                ))}
            </div>

            <div className="absolute right-[10%] top-[28%] grid h-16 w-16 place-items-center rounded-xl bg-white/90 shadow-lg">
                <span className="text-2xl text-[#6C928F]">☁</span>
            </div>
            <div className="absolute right-[10%] top-[48%] grid h-16 w-16 place-items-center rounded-xl bg-white/90 shadow-lg">
                <span className="text-2xl text-[#98A8A0]">△</span>
            </div>
            <div className="absolute right-[10%] bottom-[18%] grid h-16 w-16 place-items-center rounded-xl bg-white/90 shadow-lg">
                <span className="text-2xl text-[#A5AAA5]">▱</span>
            </div>

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 480" fill="none">
                <path d="M330 205 H375 M330 300 H375 M330 395 H375" stroke="white" strokeDasharray="3 3" opacity=".8" />
            </svg>
        </ShowcaseShell>
    );
}

function TemplatesVisual() {
    return (
        <ShowcaseShell background="linear-gradient(140deg,#F5EDE3 0%,#F0D7D0 35%,#F27A3C 100%)">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(255,150,100,.65),transparent_35%)]" />

            <div className="absolute left-1/2 top-[25%] w-[48%] -translate-x-1/2 rounded-[20px] bg-white/95 p-5 shadow-xl">
                <p className="text-[10px] font-medium text-black/70">Templates & Skills Hub</p>
                <p className="mt-1 text-[6px] text-black/40">Reusable standards for every build</p>
                {["Approved templates", "Company skills", "Security rules", "Brand standards"].map((x) => (
                    <div key={x} className="mt-2 flex items-center justify-between rounded-md border border-black/10 px-2 py-2">
                        <span className="text-[7px] text-black/55">{x}</span>
                        <span className="text-[9px] text-black/25">⋮</span>
                    </div>
                ))}
            </div>

            {[
                ["Analytics Dashboard", "top-[11%] left-[42%]"],
                ["CRM App", "top-[35%] left-[9%]"],
                ["Client Portal", "top-[35%] right-[8%]"],
                ["Support Bot", "bottom-[30%] left-[9%]"],
                ["Internal Tool", "bottom-[30%] right-[8%]"],
                ["Marketing Site", "bottom-[8%] left-[42%]"],
            ].map(([label, pos]) => (
                <div key={label} className={`absolute ${pos} rounded-xl bg-white/90 px-3 py-3 text-center shadow-md`}>
                    <div className="mx-auto h-4 w-4 rounded bg-[#F0B7A2]" />
                    <p className="mt-1 text-[5px] text-black/55">{label}</p>
                </div>
            ))}
        </ShowcaseShell>
    );
}

function ConnectorsVisual() {
    const nodes = [
        ["↗", "top-[12%] left-[45%]"],
        ["✣", "top-[26%] left-[18%]"],
        ["◉", "top-[26%] right-[18%]"],
        ["✳", "top-[48%] left-[8%]"],
        ["▱", "top-[48%] right-[8%]"],
        ["S", "bottom-[23%] left-[19%]"],
        ["M", "bottom-[9%] left-[45%]"],
        ["sf", "bottom-[23%] right-[19%]"],
    ];

    return (
        <ShowcaseShell background="linear-gradient(135deg,#EFA0B0 0%,#ED7374 43%,#9B8FE8 100%)">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 480" fill="none">
                {[
                    [250, 115], [120, 180], [380, 180], [75, 265],
                    [425, 265], [125, 355], [250, 405], [375, 355],
                ].map(([x, y], i) => (
                    <line key={i} x1="250" y1="240" x2={x} y2={y} stroke="white" strokeDasharray="3 4" opacity=".8" />
                ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[18px] bg-[#F04F28] shadow-2xl">
                <span className="text-3xl font-bold text-white">▮</span>
            </div>

            {nodes.map(([icon, pos]) => (
                <div key={pos} className={`absolute ${pos} grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[15px] text-black/35 shadow-md`}>
                    {icon}
                </div>
            ))}
        </ShowcaseShell>
    );
}

function MultiArtifactVisual() {
    return (
        <ShowcaseShell background="linear-gradient(145deg,#238CC2 0%,#4599C6 36%,#6B91CF 55%,#D76476 100%)">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_55%,rgba(255,100,45,.75),transparent_35%)]" />
            <div className="absolute left-[13%] right-[13%] top-[23%] rounded-[18px] bg-white/95 p-5 shadow-2xl">
                <p className="text-[11px] font-medium text-black/75">Hi Jacob, what do you want to make?</p>
                <div className="mt-5 rounded-lg border border-[#7692B8] p-3">
                    <p className="text-[7px] text-black/35">Create a spreadsheet to organize...</p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="rounded bg-black/5 px-2 py-1 text-[7px] text-black/50">＋ Spreadsheet</span>
                        <span className="text-[8px] text-black/35">Plan ↑</span>
                    </div>
                </div>
                <div className="mt-5 flex justify-center gap-3 text-[10px] text-black/30">
                    <span>▣</span><span>▯</span><span>▤</span><span>▧</span><span>▦</span>
                </div>
            </div>
        </ShowcaseShell>
    );
}


function SecuritySection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const defenseItems = [
        {
            title: "Security from the first line of code",
            description:
                "Isolated sandboxes, backend separation, built-in auth, supply chain protection, and pre-deploy scanning — working from the first line of code.",
        },
        {
            title: "Your data is locked down by default",
            description:
                "Your workspace data remains protected by default, with strict access controls and secure handling of sensitive information.",
        },
        {
            title: "Enterprise-grade infrastructure, out of the box",
            description:
                "Enterprise-grade infrastructure and security controls are available without requiring teams to assemble the infrastructure themselves.",
        },
        {
            title: "Continuously tested and hardened",
            description:
                "Continuous testing, hardening, and security improvements help keep the platform protected as threats evolve.",
        },
    ];

    return (
        <>
            {/* ========================================================= */}
            {/* PUBLISH WITH CONFIDENCE */}
            {/* ========================================================= */}

            <section
                className="px-4 py-24 pt-12 pb-16 sm:px-6 lg:px-8"
                style={{
                    backgroundColor: "#181818",
                }}
            >
                <div className="mx-auto max-w-7xl">
                    {/* Heading */}
                    <div className="mb-16 text-center">
                        <h2
                            className="mb-6 text-[#FAF6F1]"
                            style={{
                                fontSize: "clamp(40px, 7vw, 60px)",
                                letterSpacing: "-0.05em",
                                lineHeight: 1,
                            }}
                        >
                            Publish with confidence
                        </h2>

                        <p
                            className="mx-auto mb-8 max-w-2xl text-lg text-[#B5B1AD]"
                            style={{
                                lineHeight: 1.6,
                            }}
                        >
                            The controls, compliance, and visibility that enterprise IT and
                            security teams require — all built in.
                        </p>
                    </div>

                    {/* Security Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ml-10 mr-10">
                        {/* SSO */}
                        <div className="flex min-h-55 flex-col rounded-2xl border border-[#5C5858] bg-[#312E2E] p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5C5858] bg-[#181818]">
                                <Fingerprint className="h-5 w-5 text-[#FAF6F1]" />
                            </div>

                            <div className="mt-auto pt-6">
                                <h3
                                    className="mb-2 text-lg text-[#FAF6F1]"
                                    style={{
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    SSO
                                </h3>

                                <p
                                    className="text-sm text-[#B5B1AD]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    SAML and OIDC with Okta, Azure AD, Google, and any compliant
                                    identity provider.
                                </p>
                            </div>
                        </div>

                        {/* SCIM */}
                        <div className="flex min-h-55 flex-col rounded-2xl border border-[#5C5858] bg-[#312E2E] p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5C5858] bg-[#181818]">
                                <Users className="h-5 w-5 text-[#FAF6F1]" />
                            </div>

                            <div className="mt-auto pt-6">
                                <h3
                                    className="mb-2 text-lg text-[#FAF6F1]"
                                    style={{
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    SCIM
                                </h3>

                                <p
                                    className="text-sm text-[#B5B1AD]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Automated provisioning and deprovisioning synced from your
                                    identity provider.
                                </p>
                            </div>
                        </div>

                        {/* RBAC */}
                        <div className="flex min-h-55 flex-col rounded-2xl border border-[#5C5858] bg-[#312E2E] p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5C5858] bg-[#181818]">
                                <Settings2 className="h-5 w-5 text-[#FAF6F1]" />
                            </div>

                            <div className="mt-auto pt-6">
                                <h3
                                    className="mb-2 text-lg text-[#FAF6F1]"
                                    style={{
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Role-Based Access Control
                                </h3>

                                <p
                                    className="text-sm text-[#B5B1AD]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Granular permissions for viewing, editing, and deploying
                                    across your org.
                                </p>
                            </div>
                        </div>

                        {/* PRIVATE DEPLOYMENTS */}
                        <div className="flex min-h-55 flex-col rounded-2xl border border-[#5C5858] bg-[#312E2E] p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5C5858] bg-[#181818]">
                                <Lock className="h-5 w-5 text-[#FAF6F1]" />
                            </div>

                            <div className="mt-auto pt-6">
                                <h3
                                    className="mb-2 text-lg text-[#FAF6F1]"
                                    style={{
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Private Deployments
                                </h3>

                                <p
                                    className="text-sm text-[#B5B1AD]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Keep internal prototypes private. Control who can access
                                    what you build.
                                </p>
                            </div>
                        </div>

                        {/* AUDIT LOGGING */}
                        <div className="flex min-h-55 flex-col rounded-2xl border border-[#5C5858] bg-[#312E2E] p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5C5858] bg-[#181818]">
                                <ScrollText className="h-5 w-5 text-[#FAF6F1]" />
                            </div>

                            <div className="mt-auto pt-6">
                                <h3
                                    className="mb-2 text-lg text-[#FAF6F1]"
                                    style={{
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Audit Logging
                                </h3>

                                <p
                                    className="text-sm text-[#B5B1AD]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Full visibility into who did what and when across your
                                    organization.
                                </p>
                            </div>
                        </div>

                        {/* SECURITY CENTER */}
                        <div className="flex min-h-55 flex-col rounded-2xl border border-[#5C5858] bg-[#312E2E] p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5C5858] bg-[#181818]">
                                <Globe className="h-5 w-5 text-[#FAF6F1]" />
                            </div>

                            <div className="mt-auto pt-6">
                                <h3
                                    className="mb-2 text-lg text-[#FAF6F1]"
                                    style={{
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Security Center
                                </h3>

                                <p
                                    className="text-sm text-[#B5B1AD]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Act on vulnerabilities in bulk across all apps in your
                                    organization.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* SECURED ON ALL FRONTS */}
            {/* ========================================================= */}

            <section
                className="px-4 py-24 pt-12 pb-16 sm:px-6 lg:px-8"
                style={{
                    backgroundColor: "#181818",
                }}
            >
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-12 grid grid-cols-1 items-center gap-6 text-center lg:mb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:text-left">
                        <div className="lg:max-w-2xl">
                            <h2
                                className="mb-6 text-[#FAF6F1]"
                                style={{
                                    fontSize: "clamp(40px, 7vw, 60px)",
                                    letterSpacing: "-0.05em",
                                    lineHeight: 1,
                                }}
                            >
                                Secured on all fronts
                            </h2>

                            <p
                                className="mx-auto max-w-2xl text-lg text-[#B5B1AD] lg:mx-0"
                                style={{
                                    lineHeight: 1.6,
                                }}
                            >
                                Independent layers of security work together to reduce risk at
                                every level.
                            </p>
                        </div>

                        {/* Blog Link */}
                        <div className="flex justify-center text-white">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[#5C5858] px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-[#FAF6F1] lg:whitespace-nowrap"
                            >
                                Read the full Defense in Depth blog post

                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-row justify-center gap-32  lg:gap-50 h-140">
                        {/* Accordion */}
                        <div className="flex min-w-0 flex-col">
                            {defenseItems.map((item, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={item.title}
                                        className={
                                            index !== 0
                                                ? "border-t border-[#5C5858]"
                                                : ""
                                        }
                                    >
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`defense-panel-${index}`}
                                            onClick={() =>
                                                setOpenIndex(isOpen ? null : index)
                                            }
                                            className="flex w-full cursor-pointer items-center gap-4 py-6 text-left bg-transparent"
                                        >
                                            {/* Number */}
                                            <span className="w-6 shrink-0 text-sm font-medium text-[#B5B1AD]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            {/* Title */}
                                            <h3
                                                className="flex-1 text-lg text-[#FAF6F1] sm:text-xl"
                                                style={{
                                                    letterSpacing: "-0.02em",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {item.title}
                                            </h3>

                                            {/* Plus / Minus */}
                                            <div className="shrink-0">
                                                {isOpen ? (
                                                    <Minus className="h-5 w-5 text-[#B5B1AD]" />
                                                ) : (
                                                    <Plus className="h-5 w-5 text-[#B5B1AD]" />
                                                )}
                                            </div>
                                        </button>

                                        {/* Expanded Content */}
                                        {isOpen && (
                                            <div
                                                id={`defense-panel-${index}`}
                                                className="pb-6 pl-10 pr-4 w-122"
                                            >
                                                <p className="text-sm leading-7 text-[#B5B1AD]">
                                                    {item.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* SVG Security Layers */}
                        <div className="hidden justify-center self-center lg:flex">
                            <div
                                className="relative"
                                style={{
                                    width: "392px",
                                    height: "552px",
                                }}
                            >
                                <svg
                                    viewBox="0 0 392 552"
                                    width="392"
                                    height="552"
                                    className="absolute inset-0 overflow-visible"
                                >
                                    {/* Vertical guide lines */}
                                    <line
                                        x1="0.5"
                                        y1="64"
                                        x2="0.5"
                                        y2="488"
                                        stroke="#5C5858"
                                        strokeWidth="0.6"
                                    />

                                    <line
                                        x1="391.5"
                                        y1="64"
                                        x2="391.5"
                                        y2="488"
                                        stroke="#5C5858"
                                        strokeWidth="0.6"
                                    />

                                    <line
                                        x1="196"
                                        y1="0"
                                        x2="196"
                                        y2="552"
                                        stroke="#5C5858"
                                        strokeWidth="0.6"
                                    />

                                    {/* Layer 01 */}
                                    <g transform="translate(196 321.5)">
                                        <path
                                            d="M187 0 L187 23 L0 120.5 L-187 23 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />

                                        <path
                                            d="M187 0 L0 97.5 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />
                                    </g>

                                    {/* Layer 02 */}
                                    <g transform="translate(196 283.5)">
                                        <path
                                            d="M187 0 L187 23 L0 120.5 L-187 23 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />

                                        <path
                                            d="M187 0 L0 97.5 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />
                                    </g>

                                    {/* Layer 03 */}
                                    <g transform="translate(196 245.5)">
                                        <path
                                            d="M187 0 L187 23 L0 120.5 L-187 23 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />

                                        <path
                                            d="M187 0 L0 97.5 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />
                                    </g>

                                    {/* Layer 04 */}
                                    <g transform="translate(196 207.5)">
                                        <path
                                            d="M187 0 L187 23 L0 120.5 L-187 23 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />

                                        <path
                                            d="M187 0 L0 97.5 L-187 0 L0 -97.5 Z"
                                            fill="#181818"
                                            stroke="#5C5858"
                                            strokeWidth="1"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


function ExpandEveryTeamSection() {
    const [activeTeam, setActiveTeam] = useState("Product & Design");

    const teams = [
        "Product & Design",
        "Operations",
        "Marketing",
        "Sales",
        "Finance",
        "HR / People",
        "Legal",
        "Data",
        "IT",
    ];

    const teamContent = {
        "Product & Design": {
            image: "/enterprise-team/product.png",
            items: [
                {
                    title: "Interactive prototypes",
                    description:
                        "Turn designs, wireframes, and PRDs into clickable prototypes and working demos in hours instead of weeks.",
                },
                {
                    title: "Research and feedback tools",
                    description:
                        "Create user interview hubs, survey tools, analytics dashboards, and feedback collection systems to streamline product discovery.",
                },
                {
                    title: "Internal product systems",
                    description:
                        "Build custom documentation portals, roadmap trackers, sprint planning tools, and cross-functional collaboration apps tailored to your team's workflows.",
                },
                {
                    title: "Slide decks",
                    description:
                        "Turn ideas, research, and docs into beautifully designed, structured slide decks and stakeholder-ready presentations.",
                },
            ],
        },

        "Operations": {
            image: "/enterprise-team/operations.png",
            items: [
                {
                    title: "Workflow automation",
                    description:
                        "Automate repetitive operational workflows and eliminate manual processes across your organization.",
                },
                {
                    title: "Internal tools",
                    description:
                        "Build custom tools that fit the exact workflows your operations teams use every day.",
                },
                {
                    title: "Process dashboards",
                    description:
                        "Create dashboards that give teams a clear view of processes, performance, and operational metrics.",
                },
                {
                    title: "Approvals and requests",
                    description:
                        "Build custom request, approval, and tracking systems without waiting for engineering resources.",
                },
            ],
        },

        "Marketing": {
            image: "/enterprise-team/marketing.png",
            items: [
                {
                    title: "Marketing websites",
                    description:
                        "Create campaign sites, landing pages, and interactive experiences quickly.",
                },
                {
                    title: "Campaign tools",
                    description:
                        "Build custom tools to support campaigns, launches, and marketing operations.",
                },
                {
                    title: "Content workflows",
                    description:
                        "Create internal systems for managing content, approvals, publishing, and collaboration.",
                },
                {
                    title: "Analytics dashboards",
                    description:
                        "Turn marketing data into custom dashboards that help teams understand campaign performance.",
                },
            ],
        },

        "Sales": {
            image: "/enterprise-team/sales.png",
            items: [
                {
                    title: "Sales tools",
                    description:
                        "Build custom applications that help sales teams manage their workflows and customers.",
                },
                {
                    title: "Lead management",
                    description:
                        "Create custom lead tracking and qualification workflows tailored to your sales process.",
                },
                {
                    title: "Customer portals",
                    description:
                        "Build customer-facing experiences that help prospects and customers interact with your business.",
                },
                {
                    title: "Sales dashboards",
                    description:
                        "Give sales teams real-time visibility into pipeline, performance, and key metrics.",
                },
            ],
        },

        "Finance": {
            image: "/enterprise-team/finance.png",
            items: [
                {
                    title: "Financial dashboards",
                    description:
                        "Build dashboards that bring financial information and key business metrics together.",
                },
                {
                    title: "Reporting tools",
                    description:
                        "Create custom reporting systems that fit your organization's financial workflows.",
                },
                {
                    title: "Planning systems",
                    description:
                        "Build tools for budgeting, forecasting, planning, and financial analysis.",
                },
                {
                    title: "Approval workflows",
                    description:
                        "Automate finance requests, approvals, and recurring processes.",
                },
            ],
        },

        "HR / People": {
            image: "/enterprise-team/hr.png",
            items: [
                {
                    title: "Employee tools",
                    description:
                        "Build custom employee-facing tools and experiences for your organization.",
                },
                {
                    title: "People operations",
                    description:
                        "Automate recurring HR workflows and simplify everyday people operations.",
                },
                {
                    title: "Onboarding systems",
                    description:
                        "Create custom onboarding experiences for new employees and teams.",
                },
                {
                    title: "People dashboards",
                    description:
                        "Build dashboards that help HR teams understand workforce data and trends.",
                },
            ],
        },

        "Legal": {
            image: "/enterprise-team/legal.png",
            items: [
                {
                    title: "Legal workflows",
                    description:
                        "Create custom tools to manage legal requests, reviews, and recurring workflows.",
                },
                {
                    title: "Document systems",
                    description:
                        "Build searchable systems for organizing and accessing important legal documents.",
                },
                {
                    title: "Contract tracking",
                    description:
                        "Create custom tools for tracking contracts, approvals, renewals, and obligations.",
                },
                {
                    title: "Legal dashboards",
                    description:
                        "Bring legal operations data together into dashboards tailored to your team.",
                },
            ],
        },

        "Data": {
            image: "/enterprise-team/data.png",
            items: [
                {
                    title: "Data dashboards",
                    description:
                        "Build custom dashboards that make complex datasets easier to understand and explore.",
                },
                {
                    title: "Data tools",
                    description:
                        "Create internal tools that help teams work with and analyze their data.",
                },
                {
                    title: "Analytics workflows",
                    description:
                        "Build repeatable workflows for analyzing, transforming, and presenting data.",
                },
                {
                    title: "Data applications",
                    description:
                        "Turn data and models into usable applications for teams across your organization.",
                },
            ],
        },

        "IT": {
            image: "/enterprise-team/it.png",
            items: [
                {
                    title: "Internal IT tools",
                    description:
                        "Build custom tools for managing IT operations and internal requests.",
                },
                {
                    title: "Service portals",
                    description:
                        "Create self-service portals that help employees get support faster.",
                },
                {
                    title: "Infrastructure dashboards",
                    description:
                        "Build dashboards that provide visibility into systems, services, and infrastructure.",
                },
                {
                    title: "Automation",
                    description:
                        "Automate repetitive IT workflows and connect systems without building everything from scratch.",
                },
            ],
        },
    };

    const currentTeam =
        teamContent[activeTeam as keyof typeof teamContent];

    return (
        <section
            className="overflow-x-hidden px-4 pt-32 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">

                {/* ===================================================== */}
                {/* HEADING */}
                {/* ===================================================== */}

                <div className="mb-16 text-center">
                    <h2
                        className="mb-6 text-4xl text-[#181818] sm:text-5xl lg:text-6xl"
                        style={{
                            letterSpacing: "-0.06em",
                            lineHeight: 0.95,
                        }}
                    >
                        Expand what every team can do
                    </h2>
                </div>

                {/* ===================================================== */}
                {/* TEAM TABS */}
                {/* ===================================================== */}

                <div className="flex justify-center">
                    <div
                        className="flex max-w-full items-center gap-2 overflow-x-auto pb-2 sm:gap-4"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {teams.map((team) => {
                            const isActive = activeTeam === team;

                            return (
                                <button
                                    key={team}
                                    type="button"
                                    onClick={() => setActiveTeam(team)}
                                    className="relative flex-none cursor-pointer whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium outline-none transition-colors sm:text-base"
                                    style={{
                                        letterSpacing: "-0.01em",
                                        color: isActive ? "#FAF6F1" : "#767270",
                                        background: "transparent",
                                        border: 0,
                                    }}
                                >
                                    {/* Active background */}
                                    {isActive && (
                                        <span className="absolute inset-0 z-0 rounded-full bg-[#FF3C00]" />
                                    )}

                                    <span className="relative z-10">
                                        {team}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ===================================================== */}
                {/* MAIN CONTENT */}
                {/* ===================================================== */}

                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14 ml-10 mr-10">

                    {/* ================================================= */}
                    {/* LEFT IMAGE */}
                    {/* ================================================= */}

                    <div
                        className="relative w-full overflow-hidden rounded-3xl bg-[#FAFAFA] lg:sticky lg:top-24"
                        style={{
                            aspectRatio: "1 / 1",
                        }}
                    >
                        <img
                            key={currentTeam.image}
                            src={currentTeam.image}
                            alt={`${activeTeam} workspace`}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    {/* ================================================= */}
                    {/* RIGHT CONTENT */}
                    {/* ================================================= */}

                    <ul className="flex flex-col list-none">

                        {currentTeam.items.map((item, index) => (
                            <li
                                key={item.title}
                                className={
                                    index !== 0
                                        ? "border-t border-[#DCDCDC]"
                                        : ""
                                }
                            >
                                <button
                                    type="button"
                                    className="block w-full cursor-pointer py-6 text-left outline-none bg-transparent"
                                >
                                    <h3
                                        className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#181818]"
                                        style={{
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="text-base text-[#767270]"
                                        style={{
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </button>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </section>
    );
}

export default function EnterprisePage() {
    const [defenseOpen, setDefenseOpen] = useState(0);
    useEffect(() => {
        document.title = "Replit Enterprise — Build software across your whole org";
    }, []);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);

    return (
        <>
            <div className="min-h-screen overflow-x-hidden font-sans" style={{ background: CREAM, color: BLACK }}>
                <Header />

                {/* HERO */}
                <section className="relative overflow-hidden px-6 py-19.5 md:py-21.5" style={{ background: "linear-gradient(145deg,#242424,#171717 55%,#080808)" }}>
                    <span className="absolute left-[15%] top-[27%] text-xl text-white/20">+</span>
                    <span className="absolute right-[14%] bottom-[18%] text-xl text-white/20">+</span>
                    <div className="mx-auto max-w-205 text-center">
                        <Reveal>
                            <h1 className="text-[42px] font-normal tracking-[-0.055em] text-white sm:text-[56px] md:text-[64px]">
                                Replit Enterprise
                            </h1>
                            <p className="mx-auto mt-5 max-w-162.5 text-[12px] leading-6 text-white/55 sm:text-[13px]">
                                Enable every team in your organization the ability to build apps, internal tools, slide decks or
                                data dashboards securely. Designed for large organizations and enterprise-scale challenges.
                            </p>
                            <div className="mt-7 flex flex-wrap justify-center gap-3 text-white">
                                <Link href="/signup" className="rounded-full border border-white/25 px-6 py-3 text-[12px]  transition hover:bg-white/10">
                                    Get started now
                                </Link>
                                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-medium" style={{ background: ORANGE }}>
                                    Talk to sales <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* LOGOS */}
                <LogoMarquee />

                {/* CAPABILITIES */}
                <section className="px-6">
                    <div className="mx-auto max-w-290">
                        <Reveal>
                            <h2 className="text-center text-[36px] font-normal tracking-[-0.055em] md:text-[50px]">
                                Tackle your most complex challenges
                            </h2>
                        </Reveal>

                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {capabilities.map((card, i) => (
                                <Reveal key={card.title} delay={i * 0.07}>
                                    <article>
                                        <div className="aspect-[1.55] overflow-hidden rounded-[15px]">
                                            <VisualCard type={card.type} />
                                        </div>
                                        <h3 className="mt-4 text-[16px] font-medium leading-5 tracking-tight md:text-[18px]">{card.title}</h3>
                                        <p className="mt-2 text-[11px] leading-[1.65] text-[#6F6B63]">{card.body}</p>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PLATFORM */}
                <section className="px-6 pb-20 pt-12 md:pb-28 md:pt-20">
                    <div className="mx-auto max-w-290">

                        <PlatformShowcase />
                    </div>
                </section>

                {/* SECURITY — PDF MATCHED */}
                <SecuritySection />

                {/* TEAMS — EXACT REFERENCE */}
                <ExpandEveryTeamSection />

                {/* TESTIMONIALS */}
                <section className="overflow-hidden mt-10">
                    <div className="mx-auto mb-12 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
                        <h2
                            className="mb-6 text-4xl tracking-tighter text-[#181818] sm:text-5xl lg:text-6xl"
                            style={{
                                lineHeight: 1,
                            }}
                        >
                            Trusted by the best
                        </h2>

                        <p
                            className="mx-auto max-w-2xl text-lg text-[#767270]"
                            style={{
                                lineHeight: 1.6,
                            }}
                        >
                            See what enterprise leaders are saying about building on Replit.
                        </p>
                    </div>

                    {/* SLIDER */}
                    <div className="relative w-full">
                        {/* Left fade */}
                        <div
                            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24"
                            style={{
                                background:
                                    "linear-gradient(to right, #FAF6F1 0%, rgba(250,246,241,0) 100%)",
                            }}
                        />

                        {/* Right fade */}
                        <div
                            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24"
                            style={{
                                background:
                                    "linear-gradient(to left, #FAF6F1 0%, rgba(250,246,241,0) 100%)",
                            }}
                        />

                        <InfiniteSlider
                            gap={20}
                            duration={90}
                            direction="horizontal"
                            reverse={false}
                            pauseOnHover={true}
                            className="w-full"
                        >
                            {/* ===================================================== */}
                            {/* CARD 1 */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-[#DBD4CF] p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    "To deliver the world's best customer experience, our internal
                                    teams need to work without limits. Replit gives our teams the
                                    'superpowers' to prototype and scale internal solutions in hours
                                    rather than weeks, ensuring our operations are as innovative as
                                    the products we build."
                                </p>

                                <div className="mt-7 border-t border-[#BDB7B2] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-[10px] font-semibold text-[#312E2E]">
                                                TD
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Shauna Geraghty
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                SVP, Global People and Talent, TalkDesk
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================== */}
                            {/* CARD 2 */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-[#FFB199] p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    "Replit Agent 4 is incredible. Its ability to take a one-shot
                                    prompt and flesh out the requirements before a full build is
                                    unmatched. It requires very little guidance to take a rough
                                    concept to a functional prototype. This makes my life as a Product
                                    Manager 10x easier."
                                </p>

                                <div className="mt-7 border-t border-[#DC9A86] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-xs font-semibold text-[#312E2E]">
                                                G
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Alex Meyers
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                Principal Product Manager, Gusto
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================== */}
                            {/* CARD 3 */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-[#E2E2E2] p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    "With Replit Agent 4, the future of engineering isn't one developer
                                    and one IDE — it's teams of humans collaborating with teams of
                                    autonomous agents."
                                </p>

                                <div className="mt-7 border-t border-[#C5C5C5] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-[10px] font-semibold text-[#312E2E]">
                                                HX
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Satyajit M
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                CTO, Hexaware
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================== */}
                            {/* CARD 4 */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-[#312E2E] p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#FAF6F1]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    "By integrating with Lakebase and Databricks Apps, we're combining
                                    Replit's capabilities with trusted enterprise data and governance,
                                    helping teams move from idea to production faster and more securely
                                    than ever."
                                </p>

                                <div className="mt-7 border-t border-[#5C5858] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                                            <span className="text-[10px] font-semibold text-[#FAF6F1]">
                                                DB
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#FAF6F1]">
                                                Ali Ghodsi
                                            </p>

                                            <p className="text-xs text-[#B5B1AD]">
                                                CEO, Databricks
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================== */}
                            {/* CARD 5 */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-white p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    "Agent 4 is a game-changer. Multi-user vibe coding via the kanban
                                    is a significant milestone for enterprises. It's great for turning
                                    individual concepts into team realities and managing tasks through
                                    diverse role definitions."
                                </p>

                                <div className="mt-7 border-t border-[#DCDCDC] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-[8px] font-semibold text-[#312E2E]">
                                                SMFL
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Takeshi Fujiwara
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                Director, SMFL Digital Lab
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================== */}
                            {/* CARD 6 */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-white p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{
                                        lineHeight: 1.6,
                                    }}
                                >
                                    "Replit unlocks true collaboration and real-time learning - now our
                                    teams can design and build with our closest partners live, turn
                                    instant feedback into measurable wins, and deliver outcomes that
                                    delight customers and partners."
                                </p>

                                <div className="mt-7 border-t border-[#DCDCDC] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-xs font-semibold text-[#312E2E]">
                                                Z
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Doug Rodermund
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                Principal Program Manager, Zillow
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================== */}
                            {/* DUPLICATE CARDS — SEAMLESS LOOP */}
                            {/* ===================================================== */}

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-[#DBD4CF] p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{ lineHeight: 1.6 }}
                                >
                                    "To deliver the world's best customer experience, our internal
                                    teams need to work without limits. Replit gives our teams the
                                    'superpowers' to prototype and scale internal solutions in hours
                                    rather than weeks."
                                </p>

                                <div className="mt-7 border-t border-[#BDB7B2] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-[10px] font-semibold text-[#312E2E]">
                                                TD
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Shauna Geraghty
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                SVP, Global People and Talent, TalkDesk
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-75 shrink-0 flex-col rounded-2xl bg-[#FFB199] p-6 sm:w-90 sm:p-7">
                                <p
                                    className="flex-1 text-[15px] text-[#312E2E]"
                                    style={{ lineHeight: 1.6 }}
                                >
                                    "Replit Agent 4 is incredible. Its ability to take a one-shot
                                    prompt and flesh out the requirements before a full build is
                                    unmatched."
                                </p>

                                <div className="mt-7 border-t border-[#DC9A86] pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5">
                                            <span className="text-xs font-semibold text-[#312E2E]">
                                                G
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#312E2E]">
                                                Alex Meyers
                                            </p>

                                            <p className="text-xs text-[#767270]">
                                                Principal Product Manager, Gusto
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </InfiniteSlider>
                    </div>
                </section>

                {/* PRICING */}
                <section className="px-6 py-16 md:py-20">
                    <div className="mx-auto max-w-280">
                        <Reveal>
                            <div className="text-center">
                                <div className="text-[38px] font-normal tracking-[-0.055em] md:text-[50px]">Choose your Enterprise plan</div>
                                <div className="mt-6 mb-15 text-[17px] text-[#77736C]">Get started now or discuss more options with our team.</div>
                            </div>
                        </Reveal>

                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {[
                                {
                                    name: "Self-Serve Enterprise",
                                    desc: "Get started today. Includes Enterprise security and compliance, Agent 4, Multi-artifact, connectors, SSO, SCIM, audit logs, and more.",
                                    price: "Custom Pricing",
                                    sub: "Usage is billed as you go based on how your team uses.",
                                    features: ["Enterprise security & compliance", "Agent 4 & Multi-Artifact", "SSO/SAML & SCIM", "Connectors & MCP", "Audit logs"],
                                    button: "Get started now",
                                },
                                {
                                    name: "Sales-Assisted Enterprise",
                                    desc: "Work with Replit's sales team on your Enterprise deployment. Tailored terms, usage commitments, invoicing, and product bundling available.",
                                    price: "Custom Pricing",
                                    sub: "Flexible commercial plans tailored to your organization's structure and stage, from early POC to full enterprise rollout.",
                                    features: ["Everything in self-serve", "Tailored terms & invoicing", "Usage commitments & pooled credits", "Dedicated GCP project, single-tenant option", "Dedicated Customer Advocate + Field Engineer"],
                                    button: "Talk to sales",
                                },
                            ].map((plan, i) => (
                                <div key={plan.name} className="rounded-[20px] bg-white p-4 md:p-6">
                                    <h3 className="text-[28px] tracking-[-0.045em] md:text-[34px]">{plan.name}</h3>
                                    <p className="text-sm leading-5 text-[#77736C]">{plan.desc}</p>

                                    <div className="flex flex-col p-5 gap-3 mt-7 rounded-[14px] border" style={{ borderColor: BORDER }}>
                                        <div className="text-md font-semibold">{plan.price}</div>
                                        <div className="text-sm leading-5 text-[#77736C]">{plan.sub}</div>
                                    </div>

                                    <ul className="mt-7 space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex gap-3 text-md">
                                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="text-white">
                                        <Link
                                            href={i === 0 ? "/signup" : "/contact"}
                                            className="mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-md font-medium"
                                            style={{ background: i === 0 ? BLACK : ORANGE }}
                                        >
                                            {plan.button} {i === 1 && <ArrowRight className="h-3.5 w-3.5" />}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-5 text-center text-[14px] text-[#99958C]">Annual commitment required. Prices shown don't include applicable tax.</p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="px-6 pb-16 pt-8 md:pb-24">
                    <div className="mx-auto max-w-190">
                        <Reveal>
                            <h2 className="text-center text-[38px] font-normal tracking-[-0.055em] md:text-[50px]">Frequently asked questions</h2>
                        </Reveal>

                        <div className="mt-10">
                            {faqs.map(([q, a], i) => (
                                <div key={q} className="border-b" style={{ borderColor: BORDER }}>
                                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left bg-transparent">
                                        <span className="text-xl">{q}</span>
                                        {faqOpen === i ? <span className="text-lg">−</span> : <span className="text-lg">+</span>}
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {faqOpen === i && (
                                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pb-5 pr-10 text-[10px] leading-5 text-[#77736C]">
                                                {a}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            <div className="border-b border-gray-200 mt-10"></div>
                        
                {/* FOOTER */}
                <Footer />
            </div>
        </>
    );
}