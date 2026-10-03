"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Wand2,
  Sparkles,
  Search,
  ChevronDown,
  Copy,
  Download,
  RefreshCw,
  Trash2,
  Check,
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code as CodeIcon,
  Link as LinkIcon,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders,
  FileText,
  Lightbulb,
  Megaphone,
  Briefcase,
  Mail,
  PenLine,
  Tag,
  BookOpen,
  Newspaper,
  ShoppingBag,
  HelpCircle,
  Star,
  Loader2,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Custom Social SVGs
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

export interface UseCase {
  id: string;
  label: string;
  desc: string;
  category: "Marketing" | "Blog" | "Business" | "Social" | "Career" | "Communication" | "E-commerce" | "Creative";
  icon: React.ComponentType<{ className?: string }>;
  accentBg: string;
  accentText: string;
  placeholder: string;
  starters: string[];
}

export const USE_CASES: UseCase[] = [
  {
    id: "aida",
    label: "Copywriting: AIDA",
    desc: "Attention · Interest · Desire · Action framework",
    category: "Marketing",
    icon: PenLine,
    accentBg: "bg-orange-500/10 dark:bg-orange-500/20",
    accentText: "text-[#FF6B00]",
    placeholder: "E.g. AI-powered smart noise-cancelling headphones for frequent flyers and remote workers...",
    starters: [
      "AI noise-cancelling headphones that adapt to your focus rhythms",
      "All-in-one productivity suite automating client invoicing & payroll",
      "30-day personalized fitness challenge for busy startup founders",
    ],
  },
  {
    id: "pas",
    label: "Copywriting: PAS",
    desc: "Problem · Agitate · Solution framework",
    category: "Marketing",
    icon: Megaphone,
    accentBg: "bg-rose-500/10 dark:bg-rose-500/20",
    accentText: "text-rose-600 dark:text-rose-400",
    placeholder: "E.g. Inefficient manual bookkeeping that causes entrepreneurs to lose 10+ hours every month...",
    starters: [
      "Lost productivity from constant Slack notifications and context switching",
      "High customer churn due to sluggish onboarding flows in SaaS",
      "Manual expense tracking giving founders sleepless nights at tax season",
    ],
  },
  {
    id: "blog-idea",
    label: "Blog Idea & Outline",
    desc: "Catchy headlines with structured H2 & H3 outline",
    category: "Blog",
    icon: Lightbulb,
    accentBg: "bg-amber-500/10 dark:bg-amber-500/20",
    accentText: "text-amber-600 dark:text-amber-400",
    placeholder: "E.g. How autonomous AI agents will reshape software engineering in the next 3 years...",
    starters: [
      "How autonomous AI coding agents are changing software teams in 2026",
      "The definitive guide to optimizing Core Web Vitals for Next.js",
      "Why zero-party data is the future of privacy-first digital marketing",
    ],
  },
  {
    id: "blog-section",
    label: "Blog Section Writing",
    desc: "Deep-dive compelling sections for any topic",
    category: "Blog",
    icon: BookOpen,
    accentBg: "bg-sky-500/10 dark:bg-sky-500/20",
    accentText: "text-sky-600 dark:text-sky-400",
    placeholder: "E.g. Why vector embeddings and hybrid search outperform traditional keyword matching...",
    starters: [
      "Why vector databases and hybrid search outperform traditional search",
      "The architectural tradeoffs between serverless vs dedicated clusters",
      "How micro-habits compound into extraordinary annual business growth",
    ],
  },
  {
    id: "brand-name",
    label: "Brand Name & Tagline",
    desc: "Catchy brand names with positioning angles",
    category: "Business",
    icon: Tag,
    accentBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    accentText: "text-emerald-600 dark:text-emerald-400",
    placeholder: "E.g. Sustainable luxury activewear crafted entirely from upcycled ocean polymers...",
    starters: [
      "Sustainable luxury activewear crafted from recycled ocean textiles",
      "Cloud-native financial forecasting platform for venture-backed startups",
      "Zero-latency WebAssembly audio engineering suite for creators",
    ],
  },
  {
    id: "biz-pitch",
    label: "Business Pitch Deck Summary",
    desc: "Compelling pitch narrative for investors & clients",
    category: "Business",
    icon: Briefcase,
    accentBg: "bg-purple-500/10 dark:bg-purple-500/20",
    accentText: "text-purple-600 dark:text-purple-400",
    placeholder: "E.g. An AI agent platform that eliminates repetitive back-office logistics routing...",
    starters: [
      "Autonomous logistics agent cutting dispatch costs by 40%",
      "Real-time fraud prevention engine powered by graph neural networks",
      "B2B marketplace connecting verified artisans with luxury hotel chains",
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn Thought Leadership",
    desc: "High-engagement posts with hooks and actionable takeaways",
    category: "Social",
    icon: LinkedinIcon,
    accentBg: "bg-blue-500/10 dark:bg-blue-500/20",
    accentText: "text-blue-600 dark:text-blue-400",
    placeholder: "E.g. 3 uncomfortable truths I learned scaling our engineering team from 5 to 50...",
    starters: [
      "3 counter-intuitive lessons learned from bootstrapping to $1M ARR",
      "Why the best engineers write less code and design better systems",
      "How we reduced customer support tickets by 60% with self-serve guides",
    ],
  },
  {
    id: "twitter",
    label: "Twitter / X Viral Thread",
    desc: "Punchy tweet series with viral hook & takeaways",
    category: "Social",
    icon: TwitterIcon,
    accentBg: "bg-sky-500/10 dark:bg-sky-500/20",
    accentText: "text-sky-500",
    placeholder: "E.g. 7 modern frontend development tools that feel like living in 2030...",
    starters: [
      "7 open-source AI tools that save our startup 20 hours every week",
      "The playbook for shipping a micro-SaaS MVP in a single weekend",
      "How Apple crafts product landing pages that convert like magic",
    ],
  },
  {
    id: "product",
    label: "E-Commerce Product Description",
    desc: "Sensory, benefit-driven product copy that sells",
    category: "E-commerce",
    icon: ShoppingBag,
    accentBg: "bg-pink-500/10 dark:bg-pink-500/20",
    accentText: "text-pink-600 dark:text-pink-400",
    placeholder: "E.g. Minimalist titanium mechanical keyboard with hot-swappable lubricated switches...",
    starters: [
      "Aerospace-grade titanium mechanical keyboard with sound-dampened gasket mount",
      "Cold-pressed organic Moroccan argan oil elixir for radiant skin hydration",
      "Ultra-lightweight modular travel backpack with water-resistant Cordura",
    ],
  },
  {
    id: "email",
    label: "Professional Outreach Email",
    desc: "High-response B2B emails & partnership pitches",
    category: "Communication",
    icon: Mail,
    accentBg: "bg-teal-500/10 dark:bg-teal-500/20",
    accentText: "text-teal-600 dark:text-teal-400",
    placeholder: "E.g. Inviting a VP of Product to an exclusive preview of our AI design workbench...",
    starters: [
      "Reaching out to a VP of Engineering for a personalized product demo",
      "Follow-up email after an enterprise discovery call with next steps",
      "Partnership proposal for co-marketing a joint developer webinar",
    ],
  },
  {
    id: "cover-letter",
    label: "Targeted Cover Letter",
    desc: "Persuasive career pitch highlighting achievements",
    category: "Career",
    icon: FileText,
    accentBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    accentText: "text-indigo-600 dark:text-indigo-400",
    placeholder: "E.g. Staff Fullstack Engineer applying to a fast-growing cloud infrastructure team...",
    starters: [
      "Senior Frontend Architect applying to a Series-B AI workspace company",
      "Product Lead position at a fintech company modernizing cross-border payments",
      "Growth Marketing Manager application for a high-velocity developer platform",
    ],
  },
  {
    id: "cta",
    label: "Call to Action (CTA) Library",
    desc: "High-conversion button copies and landing CTAs",
    category: "Marketing",
    icon: Megaphone,
    accentBg: "bg-orange-500/10 dark:bg-orange-500/20",
    accentText: "text-[#FF6B00]",
    placeholder: "E.g. Free 14-day trial for an AI code assistant without requiring a credit card...",
    starters: [
      "Sign up for early access to our developer cloud beta without credit card",
      "Claim your customized SEO audit report in under 60 seconds",
      "Unlock 3 months of complimentary AI generation credits today",
    ],
  },
  {
    id: "seo-meta",
    label: "SEO Meta Tags & Title",
    desc: "Click-worthy meta descriptions with keyword hooks",
    category: "Marketing",
    icon: Search,
    accentBg: "bg-lime-500/10 dark:bg-lime-500/20",
    accentText: "text-lime-600 dark:text-lime-400",
    placeholder: "E.g. High-performance Next.js template for enterprise SaaS applications...",
    starters: [
      "Best open-source UI libraries for Tailwind CSS and React 19",
      "Enterprise cloud security compliance checklist for SOC 2 Type II",
      "Ultimate guide to optimizing Core Web Vitals for maximum SEO ranking",
    ],
  },
  {
    id: "faq",
    label: "FAQ Section Generator",
    desc: "Comprehensive Q&As that eliminate buyer objections",
    category: "Communication",
    icon: HelpCircle,
    accentBg: "bg-violet-500/10 dark:bg-violet-500/20",
    accentText: "text-violet-600 dark:text-violet-400",
    placeholder: "E.g. Pricing, data privacy, cancellation policy for a collaborative team workspace...",
    starters: [
      "Enterprise billing, data encryption, and GDPR compliance questions",
      "How our AI assistant integrates with GitHub, Slack, and Linear",
      "Refund policy and team seat allocation for annual plans",
    ],
  },
  {
    id: "story",
    label: "Creative Narrative & Story Beat",
    desc: "Imaginative scene building, dialogues & character arcs",
    category: "Creative",
    icon: BookOpen,
    accentBg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/20",
    accentText: "text-fuchsia-600 dark:text-fuchsia-400",
    placeholder: "E.g. A lone archivist discovers a hidden memory chamber inside an orbital habitat...",
    starters: [
      "A deep-space navigator discovers an anomaly broadcasting ancient radio signals",
      "Two rival clockmakers tasked with building the Emperor's final mechanical compass",
      "An urban fantasy detective investigating neon spirits in old downtown Tokyo",
    ],
  },
];

const LANGUAGES = [
  "US English",
  "UK English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Japanese",
  "Arabic",
  "Portuguese",
];

const TONES = [
  "Convincing",
  "Professional",
  "Casual",
  "Bold & Direct",
  "Witty & Clever",
  "Empathetic",
  "Inspirational",
  "Technical",
];

const CATEGORIES = [
  "All",
  "Marketing",
  "Blog",
  "Business",
  "Social",
  "Communication",
  "E-commerce",
  "Career",
  "Creative",
] as const;

export default function WriteAnythingStudio() {
  const [activeCase, setActiveCase] = useState<UseCase>(USE_CASES[0]);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [promptInput, setPromptInput] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [creativity, setCreativity] = useState(75);
  const [lengthTier, setLengthTier] = useState<"concise" | "balanced" | "detailed">("balanced");

  const [documentTitle, setDocumentTitle] = useState("Copywriting: AIDA — Draft 1");
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"setup" | "canvas">("setup");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update document title when active case changes
  useEffect(() => {
    setDocumentTitle(`${activeCase.label} — Draft 1`);
  }, [activeCase]);

  // Cleanup copy timeout
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // Auto-resize textarea to fit 100% of generated content with zero clipping
  useEffect(() => {
    const handleResize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.max(textarea.scrollHeight, 360)}px`;
      }
    };
    handleResize();
    const timer = setTimeout(handleResize, 50);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [content, mobileTab]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    const q = templateSearch.trim().toLowerCase();
    return USE_CASES.filter((c) => {
      const matchCat = selectedCategory === "All" || c.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        c.label.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [templateSearch, selectedCategory]);

  // Generator simulation that outputs rich markdown tailored to the active usecase
  const handleGenerate = useCallback(
    (customBrief?: string) => {
      const brief = (customBrief ?? promptInput).trim();
      if (!brief) {
        toast.error("Please describe your topic or select a starter prompt below.");
        return;
      }

      setIsGenerating(true);
      setMobileTab("canvas");

      setTimeout(() => {
        let generatedText = "";

        switch (activeCase.id) {
          case "aida":
            generatedText = `# ${brief}\n\n*Framework: AIDA (Attention · Interest · Desire · Action) · Tone: ${tone} · Language: ${language}*\n\n---\n\n### ⚡ 1. Attention\nStop burning precious hours on manual workflows. In a market where every second compounds, the gap between top performers and everyone else isn't effort—it's having the right intelligent system behind you.\n\n### 💡 2. Interest\nIntroducing an intuitive solution crafted specifically for **${brief}**. Built with zero friction in mind, our system automates complex friction points, connects effortlessly into your daily stack, and turns hours of tedious work into a single automated keystroke.\n\n- **Autonomous Precision:** Execute high-leverage workflows with calibrated accuracy.\n- **Instant Ramp-up:** Zero onboarding headaches—plug in and see real output from minute one.\n- **Built for Scale:** Designed to handle 10x your current volume without breaking a sweat.\n\n### 🔥 3. Desire\nImagine finishing your week with every critical task delivered, zero backlogs, and total confidence in your deliverables. That's the clarity our users experience every single day. Teams report a **68% reduction in turnaround time** and an immediate boost in strategic momentum.\n\n### 🚀 4. Action\n**Ready to transform the way you execute?**\nClick below to activate your free 14-day workspace trial. No credit card required. Start creating real impact today.`;
            break;

          case "pas":
            generatedText = `# ${brief}\n\n*Framework: PAS (Problem · Agitate · Solution) · Tone: ${tone}*\n\n---\n\n### 🚨 The Problem\nYou're putting in 60-hour weeks, but crucial goals keep getting delayed. Every day starts with good intentions, only to be completely consumed by unexpected firefighting and repetitive roadblocks around **${brief}**.\n\n### 💥 The Agitation\nEvery week you delay addressing this bottleneck, your team loses momentum while competitors move twice as fast. The stress builds, mistakes sneak in, and the compounding cost of doing things the hard way eats directly into your bottom line. You can't afford to keep duct-taping solutions together.\n\n### ✨ The Solution\nThere's a smarter, permanent way. With our dedicated platform for **${brief}**, you reclaim control. We remove the chaos with clean automation, bulletproof reliability, and real-time visibility that lets your team focus on high-impact work.\n\n**Take the next step:** Get started now and eliminate the headache for good.`;
            break;

          case "blog-idea":
            generatedText = `# ${brief}\n\n*Comprehensive Blog Strategy & Outline · Tone: ${tone}*\n\n---\n\n## 🎯 Working Headline Options\n1. **The Definitive Guide to ${brief} in 2026**\n2. **Why Most Teams Fail at ${brief} (And How the Top 1% Succeed)**\n3. **From Chaos to Clarity: The Blueprint for Mastering ${brief}**\n\n---\n\n## 📑 Structured Outline\n\n### I. Introduction\n- **Hook:** Why traditional approaches to ${brief} are failing modern teams.\n- **The Shift:** What changed over the last 18 months.\n- **Thesis Statement:** A practical roadmap for building durable competitive advantage.\n\n### II. Core Obstacles & Misconceptions\n- Common myth #1: Why more resources rarely solve foundational bottlenecks.\n- The hidden cost of fragmented tools.\n- Key data point: 72% of organizations struggle with initial implementation.\n\n### III. The 4-Step Strategic Framework\n1. **Audit & Diagnostics:** Pinpointing high-friction friction points.\n2. **Architecture & Setup:** Establishing scalable protocols.\n3. **Iterative Deployment:** Small wins compounding into systemic velocity.\n4. **Measurement & Feedback Loops:** Metric KPIs that actually matter.\n\n### IV. Practical Implementation Checklist\n- [ ] Step 1: Align core stakeholders on measurable benchmarks.\n- [ ] Step 2: Sunset redundant legacy processes.\n- [ ] Step 3: Implement automated feedback alerts.\n\n### V. Conclusion & Key Takeaways\n- Summary of the primary paradigm shift.\n- Final actionable takeaway to implement before the week ends.`;
            break;

          case "linkedin":
            generatedText = `Most people think ${brief} takes years to master.\n\nThey're looking at it the wrong way.\n\nAfter working with dozens of high-performing teams, here are 4 counter-intuitive insights that changed how I approach this entirely:\n\n1️⃣ **Complexity is the enemy of execution.**\nThe best systems don't have 50 moving parts. They have 3 clear rules enforced with absolute consistency.\n\n2️⃣ **Feedback loops beat perfection every time.**\nShipping an 80% solution on Tuesday and iterating on Thursday beats spending 3 months polishing a hypothesis in a vacuum.\n\n3️⃣ **Automate the baseline so you can innovate on the edges.**\nIf you're spending mental bandwidth on recurring operational friction, you have zero creative reserves left for strategic breakthroughs.\n\n4️⃣ **Momentum compounds quietly.**\nSmall 1% optimizations in your daily cadence look invisible on day 10, but look like sorcery on day 300.\n\n---\n\n💡 What's the single biggest friction point holding your team back right now?\n\nDrop your perspective in the comments below 👇\n\n#Leadership #Productivity #Innovation #Strategy`;
            break;

          case "product":
            generatedText = `# ${brief}\n\n**Elevate your standard. Built without compromise.**\n\n---\n\n### Overview\nMeticulously engineered for those who demand precision, our **${brief}** delivers unparalleled performance, tactile luxury, and effortless daily reliability.\n\n### Key Highlights\n- 💎 **Premium Craftsmanship:** Fabricated using aerospace-grade materials designed to endure decades of rigorous daily use.\n- ⚡ **Zero-Friction Ergonomics:** Every contour, texture, and balance point has been calibrated to eliminate fatigue.\n- 🔋 **Next-Generation Efficiency:** Optimized architecture that delivers maximum output while consuming minimal energy.\n- 🛡️ **Lifetime Guarantee:** Backed by our dedicated concierge warranty and 30-day risk-free home trial.\n\n### What's In The Box\n1. 1x ${brief} (Signature Edition)\n2. Braided fast-charge USB-C cable & protective travel sleeve\n3. Quickstart setup card with VIP member access key\n\n**Order today to enjoy complimentary express shipping worldwide.**`;
            break;

          case "email":
            generatedText = `Subject: Quick question regarding ${brief} (Ideas for your team)\n\nHi [First Name],\n\nHope you're having a productive week.\n\nI've been following your recent milestones with [Company Name], and noticed how aggressively your team has been scaling.\n\nWhen scaling rapidly, one of the most common friction points we observe is managing **${brief}** without bottlenecking your senior leads.\n\nWe recently helped [Similar Company] eliminate this exact hurdle, resulting in a **42% reduction in cycle time** and giving their engineering team 15+ hours back each week.\n\nWould you be open to a 10-minute introductory call this Thursday or Friday to see how we could do the same for you?\n\nBest regards,\n\n**[Your Name]**\nRivinity Solutions Team`;
            break;

          default:
            generatedText = `# ${brief}\n\n*Generated for ${activeCase.label} · Tone: ${tone} · Language: ${language}*\n\n---\n\n### Executive Summary\n${brief} represents an extraordinary opportunity to establish high-impact engagement, eliminate operational friction, and communicate with maximum persuasion.\n\n### Key Principles\n1. **Clarity Over Cleverness:** Deliver direct value in the opening lines to capture and sustain audience attention.\n2. **Substance-Driven Narrative:** Ground every claim in concrete benefits, verifiable proof points, and real-world utility.\n3. **Clear Path Forward:** Ensure your audience knows precisely what action to take next.\n\n### Strategic Execution\nBy deploying this framework, you transform an abstract concept into an irresistible proposition. Review the text above, adapt any nuanced brand references, and deploy with confidence.`;
            break;
        }

        setContent(generatedText);
        setIsGenerating(false);
        toast.success(`Generated ${activeCase.label}!`);
      }, 1000);
    },
    [promptInput, activeCase, tone, language]
  );

  // Formatting helpers
  const applyFormat = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = content;

    const selectedText = current.substring(start, end) || "Text";
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      current.substring(0, start) + replacement + current.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  const handleCopy = () => {
    if (!content.trim()) {
      toast.info("Nothing to copy yet. Generate or write some text first.");
      return;
    }
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Document copied to clipboard!");
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!content.trim()) {
      toast.info("Nothing to download yet.");
      return;
    }
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded document as Markdown (.md)");
  };

  const handleClear = () => {
    if (!content) return;
    setContent("");
    toast.info("Canvas cleared");
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readTime = Math.ceil(wordCount / 200) || 1;

  const ActiveIcon = activeCase.icon;

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-0 min-w-0 h-full w-full overflow-hidden bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      {/* ---------------------------------------------------- */}
      {/* MOBILE TOP SEGMENTED VIEW SWITCHER (< lg)            */}
      {/* ---------------------------------------------------- */}
      <div className="lg:hidden shrink-0 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pl-14 sm:pl-16 pr-3 py-2 flex items-center justify-between z-20 min-h-[48px]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 text-[#FF6B00] flex items-center justify-center shrink-0">
            <Wand2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">Write Anything</span>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-zinc-900 p-0.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 text-xs font-medium shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("setup")}
            className={cn(
              "px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer",
              mobileTab === "setup"
                ? "bg-white dark:bg-zinc-800 text-[#FF6B00] shadow-2xs"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Brief & Setup</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("canvas")}
            className={cn(
              "px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer relative",
              mobileTab === "canvas"
                ? "bg-white dark:bg-zinc-800 text-[#FF6B00] shadow-2xs"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document</span>
            {content.trim() ? (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
            ) : null}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* LEFT SIDEBAR: Workflow & Prompt Composer            */}
      {/* ---------------------------------------------------- */}
      <aside
        className={cn(
          "w-full lg:w-[290px] xl:w-[310px] 2xl:w-[320px] shrink-0 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col flex-1 min-h-0 lg:flex-none lg:h-full select-none z-10",
          mobileTab === "setup" ? "flex" : "hidden lg:flex"
        )}
      >
        {/* Studio Brand Header (Desktop) */}
        <div className="hidden lg:flex px-3.5 py-3 border-b border-slate-200/90 dark:border-zinc-800/80 items-center justify-between shrink-0 bg-slate-50/50 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 text-[#FF6B00] flex items-center justify-center shadow-xs">
              <Wand2 className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-[12.5px] font-bold text-slate-900 dark:text-white leading-tight">
                Write Anything
              </div>
              <div className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                Rivinity Composition Studio
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Setup Options */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 [scrollbar-width:thin]">
          {/* Active Template Selector Card */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Selected Use Case
              </span>
              <button
                type="button"
                onClick={() => setTemplateModalOpen(true)}
                className="text-[11.5px] font-semibold text-[#FF6B00] hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Browse 15+ Templates</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div
              onClick={() => setTemplateModalOpen(true)}
              className="p-3 rounded-2xl border border-orange-200/90 dark:border-orange-500/30 bg-orange-50/40 dark:bg-orange-950/20 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all cursor-pointer flex items-center gap-3 shadow-2xs group"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105",
                  activeCase.accentBg,
                  activeCase.accentText
                )}
              >
                <ActiveIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12.5px] font-bold text-slate-900 dark:text-zinc-100 truncate">
                    {activeCase.label}
                  </span>
                  <span className="text-[9.5px] font-medium px-1.5 py-0.2 rounded-md bg-white/80 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700">
                    {activeCase.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                  {activeCase.desc}
                </div>
              </div>
            </div>
          </div>

          {/* Topic / Prompt Brief */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FF6B00]" />
                <span>What are you writing about?</span>
              </label>
              <span className="text-[10.5px] text-slate-400 dark:text-zinc-500">
                {promptInput.length} chars
              </span>
            </div>

            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={activeCase.placeholder}
              rows={3}
              className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-3 text-[12.5px] leading-relaxed text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all resize-none shadow-2xs"
            />

            {/* Quick Starters */}
            <div className="pt-1 space-y-1">
              <div className="text-[10.5px] font-medium text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                <span>Try an example brief:</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {activeCase.starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => {
                      setPromptInput(starter);
                      toast.info("Example loaded into brief");
                    }}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-300 hover:border-orange-300 dark:hover:border-orange-500/40 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer truncate"
                    title={starter}
                  >
                    💡 {starter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tone & Language Selectors */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
            <div className="space-y-1">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-2 text-[12px] font-medium text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 cursor-pointer pr-8 shadow-2xs transition-colors"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Tone / Voice
              </label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-2 text-[12px] font-medium text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 cursor-pointer pr-8 shadow-2xs transition-colors"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Creativity & Output Length */}
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/30 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-semibold text-slate-600 dark:text-zinc-300 flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-[#FF6B00]" /> Creativity Level
                </span>
                <span className="font-bold text-[#FF6B00]">{creativity}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full accent-[#FF6B00] cursor-pointer"
              />
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300 mb-1.5">
                Detail Level
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["concise", "balanced", "detailed"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setLengthTier(tier)}
                    className={cn(
                      "py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all border cursor-pointer",
                      lengthTier === tier
                        ? "bg-[#FF6B00] border-[#FF6B00] text-white shadow-xs"
                        : "bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
                    )}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Bottom Generate Action Button */}
        <div className="p-3 border-t border-slate-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm shrink-0">
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8533] hover:from-[#ff7a1a] hover:to-[#ffa059] text-white font-bold text-[12.5px] shadow-[0_4px_16px_rgba(255,107,0,0.25)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border-0 outline-none"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Crafting {activeCase.label}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* RIGHT WORKSPACE: Document Studio & Toolbar          */}
      {/* ---------------------------------------------------- */}
      <main
        className={cn(
          "w-full flex-1 flex flex-col min-w-0 min-h-0 lg:h-full overflow-hidden bg-white dark:bg-zinc-950",
          mobileTab === "canvas" ? "flex" : "hidden lg:flex"
        )}
      >
        {/* Document Header Bar */}
        <header className="px-3 sm:px-5 py-2.5 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between shrink-0 z-10 gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setMobileTab("setup")}
              className="lg:hidden p-1.5 -ml-1 text-slate-500 hover:text-[#FF6B00] hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg shrink-0 cursor-pointer transition-colors"
              title="Back to Brief"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <input
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="bg-transparent text-[13px] sm:text-[15px] font-bold text-slate-900 dark:text-white tracking-tight focus:outline-none min-w-0 flex-1 hover:bg-slate-100 dark:hover:bg-zinc-800/60 px-1.5 sm:px-2 py-1 rounded-lg transition-colors border border-transparent focus:border-slate-300 dark:focus:border-zinc-700 truncate"
              placeholder="Untitled Document..."
            />
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ready
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="h-8 px-2 sm:px-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy all text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="h-8 px-2 sm:px-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download as Markdown"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating || !promptInput.trim()}
              className="h-8 px-2 sm:px-3 rounded-lg bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title="Regenerate with current brief"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isGenerating && "animate-spin")} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>

            {content && (
              <button
                type="button"
                onClick={handleClear}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Clear canvas"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </header>

        {/* Formatting Toolbar */}
        <div className="px-3 sm:px-5 py-2 border-b border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 flex items-center justify-between overflow-x-auto [scrollbar-width:none] shrink-0 gap-3 sm:gap-4">
          <div className="flex items-center gap-0.5 shrink-0">
            {/* Inline Text Styles */}
            <div className="flex items-center gap-0.5 pr-1.5 sm:pr-2 mr-1.5 sm:mr-2 border-r border-slate-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => applyFormat("**", "**")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("*", "*")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("<u>", "</u>")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("~~", "~~")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Strikethrough"
              >
                <Strikethrough className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headings */}
            <div className="flex items-center gap-0.5 pr-1.5 sm:pr-2 mr-1.5 sm:mr-2 border-r border-slate-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => applyFormat("# ")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Heading 1"
              >
                <Heading1 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("## ")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Heading 2"
              >
                <Heading2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("### ")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Heading 3"
              >
                <Heading3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex items-center gap-0.5 pr-1.5 sm:pr-2 mr-1.5 sm:mr-2 border-r border-slate-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => applyFormat("- ")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Bullet list"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("1. ")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Numbered list"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("> ")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Blockquote"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => applyFormat("```\n", "\n```")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Code block"
              >
                <CodeIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Alignment / Misc */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => applyFormat("[Link Text](", ")")}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Insert link"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Word Count Badges */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11px] text-slate-500 dark:text-zinc-400 shrink-0 font-medium ml-auto">
            <span>
              <strong className="text-slate-900 dark:text-white font-bold">{wordCount}</strong>
              <span className="hidden sm:inline"> words</span>
              <span className="sm:hidden">w</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
            <span>
              <strong className="text-slate-900 dark:text-white font-bold">{charCount}</strong>
              <span className="hidden sm:inline"> chars</span>
              <span className="sm:hidden">c</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700 hidden sm:inline" />
            <span className="hidden sm:inline">{readTime} min read</span>
          </div>
        </div>

        {/* Document Canvas Area - Fullscreen Document Workspace */}
        <div className="flex-1 min-h-0 overflow-y-auto w-full bg-white dark:bg-zinc-950 [scrollbar-width:thin]">
          <div className="w-full max-w-4xl mx-auto min-h-full flex flex-col px-4 sm:px-8 md:px-12 py-6 sm:py-10 pb-36 sm:pb-28">
            {isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 sm:py-24 text-center space-y-4 my-auto">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-[#FF6B00] shadow-sm animate-pulse">
                    <Wand2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B00] animate-spin absolute -top-1 -right-1" />
                </div>
                <div>
                  <div className="text-[15px] sm:text-[16px] font-bold text-slate-900 dark:text-white">
                    Crafting {activeCase.label}...
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Tone: {tone} · Language: {language} · Level: {lengthTier}
                  </div>
                </div>
                <div className="w-40 sm:w-48 h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden mt-2">
                  <div className="w-full h-full bg-[#FF6B00] animate-[shimmer_1.5s_infinite] origin-left" />
                </div>
              </div>
            ) : content ? (
              <div className="w-full flex-1 flex flex-col min-h-full">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing your document..."
                  className="w-full flex-1 bg-transparent border-none outline-none resize-none font-sans text-[15px] sm:text-[16.5px] leading-relaxed text-slate-900 dark:text-zinc-100 placeholder:text-slate-300 dark:placeholder:text-zinc-700 overflow-hidden"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-8 sm:py-16 text-center max-w-lg mx-auto w-full my-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-[#FF6B00] mb-3 sm:mb-4 shadow-sm">
                  <Wand2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  What would you like to write?
                </div>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed mb-4 sm:mb-6">
                  Select a template, describe your topic, and Rivinity will craft polished, publication-ready copy in your chosen tone.
                </p>

                <div className="w-full space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                    Quick Sample Starters for {activeCase.label}
                  </div>
                  {activeCase.starters.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => {
                        setPromptInput(starter);
                        handleGenerate(starter);
                      }}
                      className="w-full text-left p-2.5 sm:p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-800/40 hover:bg-orange-50/40 dark:hover:bg-orange-950/20 hover:border-orange-200 dark:hover:border-orange-800/60 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                        <Sparkle className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                        <span className="text-xs font-medium text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white truncate">
                          {starter}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setMobileTab("setup")}
                  className="lg:hidden mt-5 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500/10 text-[#FF6B00] font-semibold text-xs border border-orange-200 dark:border-orange-800/60 hover:bg-orange-500/20 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Brief & Options</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ---------------------------------------------------- */}
      {/* TEMPLATE PICKER MODAL / POPUP                       */}
      {/* ---------------------------------------------------- */}
      {templateModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setTemplateModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white">
                    Choose a Writing Template
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400">
                    Select from 15+ specialized copywriting and editorial frameworks
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTemplateModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search & Categories */}
            <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/40 space-y-2.5 sm:space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="Search templates (e.g., AIDA, blog, product, cover letter, email)..."
                  className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                      selectedCategory === cat
                        ? "bg-[#FF6B00] border-[#FF6B00] text-white shadow-xs"
                        : "bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Cards Grid */}
            <div className="p-3 sm:p-4 overflow-y-auto [scrollbar-width:thin] flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {filteredTemplates.map((item) => {
                  const isSelected = activeCase.id === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveCase(item);
                        setTemplateModalOpen(false);
                        toast.success(`Selected ${item.label}`);
                      }}
                      className={cn(
                        "p-3 sm:p-3.5 rounded-2xl border text-left flex items-start gap-2.5 sm:gap-3 transition-all cursor-pointer relative",
                        isSelected
                          ? "bg-orange-50/70 dark:bg-orange-950/30 border-[#FF6B00] ring-1 ring-[#FF6B00]/40"
                          : "bg-white dark:bg-zinc-800/80 border-slate-200/90 dark:border-zinc-700/80 hover:border-orange-300 dark:hover:border-orange-500/40 hover:bg-slate-50/80 dark:hover:bg-zinc-800"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs",
                          item.accentBg,
                          item.accentText
                        )}
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12 text-sm text-slate-400 dark:text-zinc-500">
                  No templates match your search. Try another query or category.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
