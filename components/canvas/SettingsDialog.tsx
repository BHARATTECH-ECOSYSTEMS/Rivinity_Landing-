"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Settings as SettingsIcon,
  Bell,
  Sparkles,
  Grid2x2,
  AudioLines,
  CreditCard,
  Database,
  HardDrive,
  ShieldCheck,
  LockKeyhole,
  Users,
  LifeBuoy,
  UserCircle,
  Keyboard,
  X,
  ChevronDown,
  Check,
  Trash2,
  LogOut,
  KeyRound,
  ShieldQuestion,
  ExternalLink,
  Plus,
  Calendar,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Activity,
  Zap,
  AlertTriangle,
  Clock,
  Layers,
  Copy,
  RotateCw,
  Ban,
  MoreHorizontal,
  GitBranch,
  Code2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const sections: { id: string; label: string; icon: IconType }[] = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "personalization", label: "Personalization", icon: Sparkles },
  { id: "integrations", label: "Integrations", icon: Grid2x2 },
  { id: "voice", label: "Voice", icon: AudioLines },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "data", label: "Data controls", icon: Database },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "safety", label: "Safety", icon: ShieldCheck },
  { id: "security", label: "Security and login", icon: LockKeyhole },
  { id: "parental", label: "Parental controls", icon: Users },
  { id: "trusted", label: "Trusted contact", icon: LifeBuoy },
  { id: "account", label: "Account", icon: UserCircle },
  { id: "keyboard", label: "Keyboard", icon: Keyboard },
];

const linkedPages: { to: string; label: string; icon: IconType }[] = [
  { to: "/settings/team-members", label: "Team members", icon: Users },
  { to: "/settings/roles-access", label: "Roles & access", icon: ShieldQuestion },
  { to: "/settings/api-keys", label: "API keys", icon: KeyRound },
];

// -------------------------------------------------------------
// Brand Logos for Integrations
// -------------------------------------------------------------
const BrandIcons: Record<string, React.FC<{ className?: string }>> = {
  hubspot: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#FF7A59" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="3.5" fill="#FF7A59" />
      <path d="M12 4V8.5M12 15.5V20M4 12H8.5M15.5 12H20" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17.5" cy="6.5" r="2" fill="#FF7A59" />
    </svg>
  ),
  salesforce: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#00A1E0" fillOpacity="0.15" />
      <path
        d="M8.5 14.5C7.67 14.5 7 13.83 7 13c0-.72.5-1.32 1.18-1.46.12-.9 0.88-1.54 1.77-1.54.34 0 .66.1.92.27A3.01 3.01 0 0113.8 9c1.65 0 3 1.35 3 3 0 .1-.01.2-.02.3.4.3.67.77.67 1.3 0 .88-.72 1.6-1.6 1.6H8.5z"
        fill="#00A1E0"
      />
    </svg>
  ),
  slack: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#4A154B" fillOpacity="0.1" />
      <path d="M7.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#E01E5A" />
      <path d="M10 11h2.5a1.5 1.5 0 000-3H10v3z" fill="#E01E5A" />
      <path d="M13 7.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" fill="#36C5F0" />
      <path d="M13 10v2.5a1.5 1.5 0 003 0V10h-3z" fill="#36C5F0" />
      <path d="M16.5 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#2EB67D" />
      <path d="M14 13h-2.5a1.5 1.5 0 000 3H14v-3z" fill="#2EB67D" />
      <path d="M11 16.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" fill="#ECB22E" />
      <path d="M11 14V11.5a1.5 1.5 0 00-3 0V14h3z" fill="#ECB22E" />
    </svg>
  ),
  openai: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#7C3AED" fillOpacity="0.15" />
      <path
        d="M12 6.5a3.5 3.5 0 00-3.23 2.15A3.48 3.48 0 006.5 11.5c0 1.34.75 2.5 1.85 3.08a3.5 3.5 0 003.35 2.92 3.5 3.5 0 003.23-2.15 3.48 3.48 0 002.27-2.85c0-1.34-.75-2.5-1.85-3.08A3.5 3.5 0 0012 6.5zm0 2.2a2.3 2.3 0 011.3.4l-1.3 2.25-1.3-2.25c.38-.25.82-.4 1.3-.4z"
        fill="#7C3AED"
      />
    </svg>
  ),
  claude: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#D97706" fillOpacity="0.15" />
      <path
        d="M12 7l1.3 3.5 3.7.3-2.8 2.5.8 3.7-3-2-3 2 .8-3.7-2.8-2.5 3.7-.3L12 7z"
        fill="#D97706"
      />
    </svg>
  ),
  mongodb: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#13AA52" fillOpacity="0.15" />
      <path
        d="M12 5.5s-4 4.5-4 7.5a4 4 0 007.8 1.2c.1-.4.2-.8.2-1.2 0-3-4-7.5-4-7.5zm-.1 12.8v-5.8c.4.1.7.3.7.6 0 .5-.7 5.2-.7 5.2z"
        fill="#13AA52"
      />
    </svg>
  ),
  github: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  brevo: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#0B996F" />
      <path
        d="M8 7h4.5a3 3 0 012.12 5.12A3.2 3.2 0 0113 17H8V7zm2.5 4h2a1.25 1.25 0 000-2.5h-2V11zm0 4h2.5a1.25 1.25 0 000-2.5h-2.5V15z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  gemini: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#EEF2FF" />
      <path
        d="M12 4C12 8.418 8.418 12 4 12C8.418 12 12 15.582 12 20C12 15.582 15.582 12 20 12C15.582 12 12 8.418 12 4Z"
        fill="url(#gemini_grad)"
      />
      <defs>
        <linearGradient id="gemini_grad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1B72E8" />
          <stop offset="0.5" stopColor="#9C27B0" />
          <stop offset="1" stopColor="#FF4081" />
        </linearGradient>
      </defs>
    </svg>
  ),
  amplitude: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#1E61F0" />
      <path d="M12 7l4.5 10h-2.3l-2.2-5.3L9.8 17H7.5L12 7z" fill="#FFFFFF" />
    </svg>
  ),
  mailchimp: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#FFE01B" />
      <circle cx="9.5" cy="11.5" r="1.5" fill="#241C15" />
      <circle cx="14.5" cy="11.5" r="1.5" fill="#241C15" />
      <path d="M8.5 14.5c1 1.5 6 1.5 7 0" stroke="#241C15" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  stripe: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#635BFF" fillOpacity="0.15" />
      <path
        d="M14.2 10.3c-.6-.3-1.4-.4-2-.4-.9 0-1.5.4-1.5 1.1 0 1.2 1.8 1.1 2.5 1.5.8.4 1.3 1.1 1.3 2 0 1.6-1.3 2.5-3.1 2.5-1 0-1.9-.3-2.5-.7l.4-1.4c.6.4 1.4.6 2.1.6 1 0 1.6-.4 1.6-1.1 0-1.3-1.8-1.1-2.5-1.5-.7-.4-1.2-1.1-1.2-2 0-1.5 1.2-2.4 2.9-2.4.9 0 1.7.2 2.2.5l-.3 1.3z"
        fill="#635BFF"
      />
    </svg>
  ),
};

type IntegrationItem = {
  id: string;
  name: string;
  category: string;
  tag: "CRM" | "Communication" | "AI Models" | "Database" | "Marketing" | "Finance" | "DevOps" | "Analytics";
  iconKey: string;
  status: "Connected" | "Paused" | "Error";
  description: string;
  workflows?: number;
  callsMo?: string;
  latency?: string;
  errorMessage?: string;
  enabled: boolean;
};

const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "CRM",
    tag: "CRM",
    iconKey: "hubspot",
    status: "Connected",
    description: "Sync contacts, deals, and companies. Auto-enrich leads and log workflow activity directly to HubSpot.",
    workflows: 23,
    callsMo: "12.4k",
    latency: "0.82s",
    enabled: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    tag: "CRM",
    iconKey: "salesforce",
    status: "Connected",
    description: "Bi-directional sync with Salesforce objects. Create leads, update opportunities, and trigger flows from CRM events.",
    workflows: 18,
    callsMo: "8.9k",
    latency: "0.21s",
    enabled: true,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    tag: "Communication",
    iconKey: "slack",
    status: "Connected",
    description: "Send messages to channels or DMs, post rich cards, and trigger workflows from Slack slash commands.",
    workflows: 9,
    callsMo: "15.2k",
    latency: "1.12s",
    enabled: true,
  },
  {
    id: "openai",
    name: "OpenAI GPT-4",
    category: "AI Model",
    tag: "AI Models",
    iconKey: "openai",
    status: "Connected",
    description: "Access GPT-4 Turbo for text generation, summarization, classification, and complex reasoning tasks.",
    workflows: 34,
    callsMo: "38.2k",
    latency: "2.14s",
    enabled: true,
  },
  {
    id: "claude",
    name: "Claude AI",
    category: "AI Model",
    tag: "AI Models",
    iconKey: "claude",
    status: "Connected",
    description: "Anthropic Claude for long-context tasks, document analysis, and nuanced text generation with high accuracy.",
    workflows: 20,
    callsMo: "124.4k",
    latency: "0.78s",
    enabled: true,
  },
  {
    id: "mongodb",
    name: "MongoDB Atlas",
    category: "Database",
    tag: "Database",
    iconKey: "mongodb",
    status: "Paused",
    description: "Query collections, insert documents, and subscribe to change streams from MongoDB Atlas clusters.",
    workflows: 14,
    callsMo: "22.8k",
    latency: "0.35s",
    enabled: false,
  },
  {
    id: "github",
    name: "GitHub",
    category: "DevOps",
    tag: "DevOps",
    iconKey: "github",
    status: "Connected",
    description: "Trigger workflows on push, pull request, and issue events. Create issues, comment on PRs, and deploy automatically.",
    workflows: 8,
    callsMo: "3.8k",
    latency: "0.61s",
    enabled: true,
  },
  {
    id: "brevo",
    name: "Brevo (Sendinblue)",
    category: "Marketing",
    tag: "Marketing",
    iconKey: "brevo",
    status: "Error",
    description: "Send transactional emails and SMS, manage contact lists and triggered marketing campaigns.",
    workflows: 6,
    callsMo: "7.1k",
    latency: "0.94s",
    errorMessage: "Invalid API key",
    enabled: false,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    category: "AI Model",
    tag: "AI Models",
    iconKey: "gemini",
    status: "Connected",
    description: "Multimodal AI for text, image, and code tasks. Excellent for document understanding and data extraction.",
    workflows: 26,
    callsMo: "98.4k",
    latency: "0.52s",
    enabled: true,
  },
  {
    id: "amplitude",
    name: "Amplitude",
    category: "Analytics",
    tag: "Analytics",
    iconKey: "amplitude",
    status: "Connected",
    description: "Send workflow events to Amplitude for product analytics, funnels, and user behavior analysis.",
    workflows: 12,
    callsMo: "24.6k",
    latency: "0.41s",
    enabled: true,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "Marketing",
    tag: "Marketing",
    iconKey: "mailchimp",
    status: "Connected",
    description: "Manage audiences, create campaigns, and trigger automations from workflow events.",
    workflows: 15,
    callsMo: "18.3k",
    latency: "0.86s",
    enabled: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Finance",
    tag: "Finance",
    iconKey: "stripe",
    status: "Paused",
    description: "Create customers, process payments, manage subscriptions, and handle webhook events from Stripe.",
    workflows: 18,
    callsMo: "42.5k",
    latency: "0.28s",
    enabled: false,
  },
];

type ApiKeyItem = {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  callsMo: string;
  env: "Production" | "Development" | "Staging";
  ageDays: number;
  prefix: string;
  suffix: string;
  isRevoked?: boolean;
  ipRestricted?: boolean;
};

const INITIAL_API_KEYS: ApiKeyItem[] = [
  {
    id: "key-1",
    name: "Production Key",
    created: "Jan 15, 2026",
    lastUsed: "2 min ago",
    callsMo: "38,210 calls/mo",
    env: "Production",
    ageDays: 112,
    prefix: "ff_live_",
    suffix: "xK9p",
    ipRestricted: true,
  },
  {
    id: "key-2",
    name: "Development Key",
    created: "Feb 3, 2025",
    lastUsed: "1 day ago",
    callsMo: "100 PZ calls/mo",
    env: "Development",
    ageDays: 84,
    prefix: "ff_test_",
    suffix: "mQz7",
    ipRestricted: true,
  },
  {
    id: "key-3",
    name: "CI/CD Pipeline",
    created: "Mar 10, 2006",
    lastUsed: "2 hr ago",
    callsMo: "6442 call/mo",
    env: "Staging",
    ageDays: 47,
    prefix: "ff_stg_",
    suffix: "pk4r",
    ipRestricted: false,
  },
  {
    id: "key-4",
    name: "Legacy Integration",
    created: "Dec 1, 2025",
    lastUsed: "1 month ago",
    callsMo: "calm",
    env: "Production",
    ageDays: 140,
    prefix: "ff_live_",
    suffix: "rx1k",
    isRevoked: true,
    ipRestricted: false,
  },
];

const ApiKeysView = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(INITIAL_API_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalKeys = apiKeys.length;
  const activeKeys = apiKeys.filter((k) => !k.isRevoked).length;
  const revokedKeys = apiKeys.filter((k) => k.isRevoked).length;
  const ipRestrictedKeys = apiKeys.filter((k) => k.ipRestricted).length;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleRotate = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => {
        if (k.id !== id) return k;
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        return {
          ...k,
          ageDays: 1,
          suffix: randomSuffix,
          lastUsed: "Just now",
        };
      })
    );
  };

  const handleRevoke = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isRevoked: true } : k))
    );
  };

  return (
    <div className="space-y-4 pt-1">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3.5 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <div className="w-5 h-5 rounded-md border border-glass bg-accent/40 flex items-center justify-center">
              <KeyRound className="w-3 h-3 text-foreground/70" />
            </div>
            <span className="text-[12px] font-medium">Total Keys</span>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">
            {totalKeys < 10 ? `0${totalKeys}` : totalKeys}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <div className="w-5 h-5 rounded-md border border-glass bg-accent/40 flex items-center justify-center">
              <KeyRound className="w-3 h-3 text-emerald-500" />
            </div>
            <span className="text-[12px] font-medium">Active Keys</span>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">
            {activeKeys < 10 ? `0${activeKeys}` : activeKeys}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <div className="w-5 h-5 rounded-md border border-glass bg-accent/40 flex items-center justify-center">
              <KeyRound className="w-3 h-3 text-rose-500" />
            </div>
            <span className="text-[12px] font-medium">Revoked keys</span>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">
            {revokedKeys < 10 ? `0${revokedKeys}` : revokedKeys}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <div className="w-5 h-5 rounded-md border border-glass bg-accent/40 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-sky-500" />
            </div>
            <span className="text-[12px] font-medium">IP- restricted</span>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">
            {ipRestrictedKeys < 10 ? `0${ipRestrictedKeys}` : ipRestrictedKeys}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-glass bg-background/50 backdrop-blur-xs p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-glass/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-dashed border-foreground/50 inline-block" />
            <h2 className="text-[13.5px] font-semibold text-foreground tracking-tight">
              Integrations API Key
            </h2>
          </div>
          <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {apiKeys.map((k) => {
            const isProd = k.env === "Production";
            const isDev = k.env === "Development";
            const isStaging = k.env === "Staging";
            const isCopied = copiedId === k.id;
            const fullKeyString = `${k.prefix}****************${k.suffix}`;

            return (
              <div
                key={k.id}
                className="rounded-lg border border-glass bg-background/40 hover:bg-background/80 transition-all p-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      k.id === "key-1"
                        ? "bg-amber-500/10 text-amber-600"
                        : k.id === "key-2"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : k.id === "key-3"
                        ? "bg-sky-500/10 text-sky-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {k.id === "key-1" && <KeyRound className="w-4 h-4" />}
                    {k.id === "key-2" && <Code2 className="w-4 h-4" />}
                    {k.id === "key-3" && <GitBranch className="w-4 h-4" />}
                    {k.id === "key-4" && <Trash2 className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-foreground leading-tight">
                      {k.name}
                    </p>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5 truncate">
                      Created {k.created} Last used {k.lastUsed} {k.callsMo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap xl:justify-center">
                  {isProd && (
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Production
                    </span>
                  )}
                  {isDev && (
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Development
                    </span>
                  )}
                  {isStaging && (
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      Staging
                    </span>
                  )}

                  {!k.isRevoked ? (
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{k.ageDays}d old</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-muted text-muted-foreground border border-border flex items-center gap-1">
                      <Ban className="w-2.5 h-2.5" />
                      <span>Revoked</span>
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent/40 border border-glass text-[11px] font-mono text-foreground/80">
                    <span className="text-muted-foreground">IP</span>
                    <span>{fullKeyString}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end xl:self-auto">
                  <button
                    onClick={() => handleCopy(k.id, fullKeyString)}
                    className="p-1.5 rounded-md border border-glass hover:bg-accent text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                    title="Copy API Key"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleRotate(k.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-glass hover:bg-accent text-[11.5px] text-foreground/85 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Rotate</span>
                  </button>

                  {!k.isRevoked && (
                    <button
                      onClick={() => handleRevoke(k.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-[11.5px] transition-colors cursor-pointer"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Revoke</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-amber-700 dark:text-amber-400 leading-tight">
              Security Reminder
            </p>
            <p className="text-[11.5px] text-muted-foreground mt-0.5">
              Never expose API keys in client-side code or public repositories. Rotate keys every 90 days.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[12px] font-medium transition-colors shadow-xs shrink-0 self-start sm:self-auto cursor-pointer">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Rotate Now</span>
        </button>
      </div>
    </div>
  );
};

const IntegrationsView = () => {
  const [activeTab, setActiveTab] = useState<"connected" | "marketplace" | "api-keys" | "usage">("connected");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [items, setItems] = useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);
  const [isSyncing, setIsSyncing] = useState(false);

  const categories = [
    "All",
    "CRM",
    "Communication",
    "AI Models",
    "Database",
    "Marketing's",
    "Finance",
    "DevOps",
  ];

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newEnabled = !item.enabled;
        return {
          ...item,
          enabled: newEnabled,
          status: newEnabled ? "Connected" : "Paused",
        };
      })
    );
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (activeCategory === "All") return true;
      if (activeCategory === "Marketing's" && (item.tag === "Marketing" || item.tag === "Analytics")) return true;
      return item.tag.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [items, activeCategory, searchQuery]);

  const totalConnected = items.length;
  const activeConnected = items.filter((i) => i.enabled && i.status === "Connected").length;
  const errorsCount = items.filter((i) => i.status === "Error").length;

  return (
    <div className="w-full space-y-4 pb-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-foreground">Integrations</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Connect FlowForge to your tools and automate workflows.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-glass bg-background/60 text-[12.5px] text-foreground/80 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>17 September, 2026</span>
          </div>
          <button
            onClick={() => setActiveTab("api-keys")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-glass bg-background/80 hover:bg-accent text-foreground text-[12.5px] font-medium transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Integration</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab("connected")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer ${
              activeTab === "connected"
                ? "bg-background border border-glass shadow-xs text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <span>Connected</span>
            <span className="px-1.5 py-0.2 rounded-md bg-accent text-[11px] font-semibold text-foreground/80">
              {totalConnected}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("marketplace")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer ${
              activeTab === "marketplace"
                ? "bg-background border border-glass shadow-xs text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <span>Marketplace</span>
            <span className="px-1.5 py-0.2 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
              200+
            </span>
          </button>

          <button
            onClick={() => setActiveTab("api-keys")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer ${
              activeTab === "api-keys"
                ? "bg-background border border-glass shadow-xs text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <span>API Keys</span>
            <span className="px-1.5 py-0.2 rounded-md bg-accent text-[11px] font-semibold text-foreground/80">
              04
            </span>
          </button>

          <button
            onClick={() => setActiveTab("usage")}
            className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer ${
              activeTab === "usage"
                ? "bg-background border border-glass shadow-xs text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <span>Usage & Limits</span>
          </button>
        </div>

        {activeTab === "api-keys" ? (
          <button
            onClick={() => {}}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-foreground text-background text-[12.5px] font-medium hover:opacity-90 transition-opacity shadow-xs self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate API Key</span>
          </button>
        ) : (
          <button
            onClick={handleSyncAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-glass hover:bg-accent/60 transition-colors text-[12.5px] text-foreground/80 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground ${isSyncing ? "animate-spin text-primary" : ""}`} />
            <span>Sync All</span>
          </button>
        )}
      </div>

      {activeTab === "api-keys" ? (
        <ApiKeysView />
      ) : activeTab === "usage" ? (
        <div className="p-12 text-center text-muted-foreground border border-glass rounded-xl bg-background/50">
          <p className="text-[14px] font-medium">Usage & Limits dashboard and metrics.</p>
        </div>
      ) : activeTab === "marketplace" ? (
        <div className="p-12 text-center text-muted-foreground border border-glass rounded-xl bg-background/50">
          <p className="text-[14px] font-medium">Explore 200+ available integration templates and community plugins.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <div className="p-3 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                <Layers className="w-3.5 h-3.5 text-foreground/70" />
                <span className="text-[12px] font-medium">Total Connected</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-foreground">{totalConnected}</div>
            </div>

            <div className="p-3 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[12px] font-medium">Active Connected</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-foreground">
                {activeConnected < 10 ? `0${activeConnected}` : activeConnected}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-[12px] font-medium">Errors</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-foreground">
                {errorsCount < 10 ? `0${errorsCount}` : errorsCount}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="text-[12px] font-medium">API Calls Today</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-foreground">147k</div>
            </div>

            <div className="p-3 rounded-xl border border-glass bg-background/50 backdrop-blur-xs flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span className="text-[12px] font-medium">Avg Latency</span>
              </div>
              <div className="text-xl font-bold tracking-tight text-foreground">1.14s</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-glass/60">
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-background border border-glass shadow-xs text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {showSearch ? (
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 w-44 sm:w-52 text-[12px] pr-7"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearch(false);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-1.5 rounded-lg border border-glass hover:bg-accent/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Search integrations"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              )}

              <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-glass hover:bg-accent/60 text-[12px] text-foreground/80 transition-colors cursor-pointer">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <h2 className="text-[14px] font-semibold text-foreground tracking-tight">All Connected</h2>
            <span className="text-[12px] text-muted-foreground">
              Showing {filteredItems.length} of {items.length} tools
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {filteredItems.map((item) => {
              const IconComponent = BrandIcons[item.iconKey] || BrandIcons.github;
              const isConnected = item.status === "Connected";
              const isPaused = item.status === "Paused";
              const isError = item.status === "Error";

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-glass bg-background/60 hover:border-glass-hover hover:shadow-xs transition-all flex flex-col justify-between p-3.5 min-h-[175px]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-[13px] font-semibold text-foreground leading-tight">{item.name}</h3>
                          <p className="text-[11px] text-muted-foreground">{item.category}</p>
                        </div>
                      </div>

                      {isConnected && (
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Connected
                        </span>
                      )}
                      {isPaused && (
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          Paused
                        </span>
                      )}
                      {isError && (
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400">
                          Error
                        </span>
                      )}
                    </div>

                    <p className="text-[11.5px] text-muted-foreground leading-relaxed line-clamp-2 min-h-[32px]">
                      {item.description}
                    </p>

                    <div className="mt-3 mb-2.5 pt-2 border-t border-glass/50 min-h-[34px] flex items-center">
                      {isConnected && item.workflows !== undefined && (
                        <div className="flex items-center justify-between w-full text-[10.5px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span>
                              <strong className="text-foreground font-semibold">
                                {item.workflows < 10 ? `0${item.workflows}` : item.workflows}
                              </strong>{" "}
                              Workflows
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                            <span>
                              <strong className="text-foreground font-semibold">{item.callsMo}</strong> Calls/mo
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            <span>
                              <strong className="text-foreground font-semibold">{item.latency}</strong> Latency
                            </span>
                          </div>
                        </div>
                      )}

                      {isPaused && (
                        <div className="w-full flex items-center justify-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 py-1 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>No calls</span>
                        </div>
                      )}

                      {isError && (
                        <div className="w-full flex items-center justify-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 bg-rose-500/10 py-1 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="font-medium">{item.errorMessage || "Invalid API key"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-glass/30">
                    <button
                      onClick={() => setActiveTab("api-keys")}
                      className="p-1 rounded-md hover:bg-accent text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1 text-[11.5px] cursor-pointer"
                      title="Configure API Keys"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Configure</span>
                    </button>
                    <Switch
                      checked={item.enabled}
                      onCheckedChange={() => handleToggle(item.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

type SelectRowProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  swatch?: string;
};

const SelectRow = ({ label, value, options, onChange, swatch }: SelectRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-glass/60">
    <span className="text-[14px] text-foreground">{label}</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-[13.5px] text-foreground/85 hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent/60 cursor-pointer">
          {swatch && <span className="w-2.5 h-2.5 rounded-full" style={{ background: swatch }} />}
          {value}
          <ChevronDown className="w-3.5 h-3.5 text-foreground/50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {options.map((opt) => (
          <DropdownMenuItem key={opt} onClick={() => onChange(opt)} className="text-[13px] cursor-pointer">
            <span className="flex-1">{opt}</span>
            {opt === value && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

type ToggleRowProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

const ToggleRow = ({ label, description, checked, onChange }: ToggleRowProps) => (
  <div className="flex items-start justify-between gap-6 py-4 border-b border-glass/60">
    <div className="min-w-0 pr-4">
      <p className="text-[14px] text-foreground font-medium">{label}</p>
      {description && (
        <p className="text-[12.5px] text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      )}
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const useDisplayScale = () => {
  const [scale, setScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    const dpr = window.devicePixelRatio || 1;
    if (dpr >= 1.15 && dpr <= 1.35) return 0.8;
    if (dpr > 1.35 && dpr <= 1.6) return 0.72;
    if (dpr > 1.6) return 0.65;
    return 1;
  });

  useEffect(() => {
    const updateScale = () => {
      const dpr = window.devicePixelRatio || 1;
      if (dpr >= 1.15 && dpr <= 1.35) {
        setScale(0.8);
      } else if (dpr > 1.35 && dpr <= 1.6) {
        setScale(0.72);
      } else if (dpr > 1.6) {
        setScale(0.65);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    let mq: MediaQueryList | null = null;
    try {
      mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mq.addEventListener?.("change", updateScale);
    } catch {
      // safe fallback
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      mq?.removeEventListener?.("change", updateScale);
    };
  }, []);

  return scale;
};

const SettingsDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const displayScale = useDisplayScale();
  const [section, setSection] = useState("general");

  // General
  const [appearance, setAppearance] = useState("System");
  const [contrast, setContrast] = useState("System");
  const [accent, setAccent] = useState("Default");
  const [language, setLanguage] = useState("Auto-detect");
  const [higherIntel, setHigherIntel] = useState(true);
  const [dictation, setDictation] = useState(true);

  // Notifications
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [soundNotif, setSoundNotif] = useState(true);
  const [tasksNotif, setTasksNotif] = useState(true);

  // Personalization
  const [memory, setMemory] = useState(true);
  const [followUp, setFollowUp] = useState(true);
  const [creativity, setCreativity] = useState([60]);

  // Voice
  const [voiceModel, setVoiceModel] = useState("Aurora");
  const [autoSend, setAutoSend] = useState(false);

  // Data
  const [improve, setImprove] = useState(true);
  const [chatHistory, setChatHistory] = useState(true);

  // Security
  const [twoFA, setTwoFA] = useState(false);

  const accentSwatch: Record<string, string> = {
    Default: "hsl(var(--muted-foreground))",
    Indigo: "#6366f1",
    Rose: "#f43f5e",
    Emerald: "#10b981",
    Amber: "#f59e0b",
  };

  const renderSection = () => {
    switch (section) {
      case "general":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <SelectRow label="Appearance" value={appearance} options={["System", "Light", "Dark"]} onChange={setAppearance} />
            <SelectRow label="Contrast" value={contrast} options={["System", "Normal", "High"]} onChange={setContrast} />
            <SelectRow
              label="Accent color"
              value={accent}
              options={Object.keys(accentSwatch)}
              onChange={setAccent}
              swatch={accentSwatch[accent]}
            />
            <SelectRow label="Language" value={language} options={["Auto-detect", "English", "Hindi", "Spanish", "French", "German"]} onChange={setLanguage} />
            <ToggleRow
              label="Higher intelligence"
              description="Rivinity can automatically use a higher intelligence setting when you ask a complex question."
              checked={higherIntel}
              onChange={setHigherIntel}
            />
            <ToggleRow
              label="Enable Dictation"
              description="Use dictation in the chat composer."
              checked={dictation}
              onChange={setDictation}
            />
          </div>
        );
      case "notifications":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <ToggleRow label="Push notifications" description="Get notified on this device." checked={pushNotif} onChange={setPushNotif} />
            <ToggleRow label="Email digest" description="Weekly summary delivered to your inbox." checked={emailNotif} onChange={setEmailNotif} />
            <ToggleRow label="Sound alerts" checked={soundNotif} onChange={setSoundNotif} />
            <ToggleRow label="Task completion" description="Ping me when long-running tasks finish." checked={tasksNotif} onChange={setTasksNotif} />
          </div>
        );
      case "personalization":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <ToggleRow label="Memory" description="Let Rivinity remember details across chats." checked={memory} onChange={setMemory} />
            <ToggleRow label="Follow-up suggestions" checked={followUp} onChange={setFollowUp} />
            <div className="py-5 border-b border-glass/60">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] text-foreground font-medium">Creativity</p>
                <span className="text-[12.5px] text-muted-foreground">{creativity[0]}%</span>
              </div>
              <Slider value={creativity} onValueChange={setCreativity} max={100} step={1} className="py-2" />
            </div>
          </div>
        );
      case "integrations":
        return <IntegrationsView />;
      case "voice":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <SelectRow label="Voice model" value={voiceModel} options={["Aurora", "Nova", "Ember", "Sage"]} onChange={setVoiceModel} />
            <ToggleRow label="Auto-send after pause" description="Send automatically when you stop speaking." checked={autoSend} onChange={setAutoSend} />
          </div>
        );
      case "billing":
        return (
          <div className="w-full max-w-4xl space-y-4 pt-1">
            <div className="glass-subtle rounded-xl p-5 border border-glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12.5px] uppercase tracking-wider text-muted-foreground font-medium">Current plan</p>
                  <p className="text-[19px] font-semibold text-foreground mt-1">Pro · $20/month</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">
                  Manage
                </button>
              </div>
            </div>
            <div className="glass-subtle rounded-xl p-5 border border-glass">
              <p className="text-[14px] font-medium text-foreground">Payment method</p>
              <p className="text-[13px] text-muted-foreground mt-1">Visa ending in 4242 · expires 09/27</p>
            </div>
          </div>
        );
      case "data":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <ToggleRow label="Improve the model" description="Allow Rivinity to use your conversations to improve the model." checked={improve} onChange={setImprove} />
            <ToggleRow label="Chat history" description="Store chats so you can revisit and search them." checked={chatHistory} onChange={setChatHistory} />
            <div className="flex items-center justify-between py-4 border-b border-glass/60">
              <div>
                <p className="text-[14px] text-foreground font-medium">Export data</p>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">Download a copy of your chat history and account data.</p>
              </div>
              <button className="text-[13px] px-3.5 py-1.5 rounded-lg border border-glass hover:bg-accent transition-colors text-foreground/85 cursor-pointer">
                Request export
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-[14px] text-destructive font-medium">Delete all chats</p>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">Permanently remove all conversations from your account.</p>
              </div>
              <button className="flex items-center gap-1.5 text-[13px] px-3.5 py-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-destructive border border-destructive/20 cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        );
      case "storage":
        return (
          <div className="w-full max-w-4xl space-y-4 pt-1">
            <div className="glass-subtle rounded-xl p-5 border border-glass">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[14px] font-medium text-foreground">Workspace storage</p>
                  <p className="text-[12.5px] text-muted-foreground mt-0.5">Shared across projects, documents, and uploads.</p>
                </div>
                <p className="text-[13px] font-medium text-foreground/80">3.2 GB of 50 GB</p>
              </div>
              <div className="h-2.5 bg-accent/60 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: "6.4%" }} />
              </div>
            </div>
          </div>
        );
      case "safety":
      case "security":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <ToggleRow label="Two-factor authentication" description="Add an extra layer of security with 2FA." checked={twoFA} onChange={setTwoFA} />
            <div className="py-4 border-b border-glass/60">
              <p className="text-[14px] font-medium text-foreground mb-1">Change password</p>
              <p className="text-[12.5px] text-muted-foreground mb-3">Enter a strong password with at least 8 characters.</p>
              <div className="flex items-center gap-3">
                <Input type="password" placeholder="New password" className="max-w-sm h-9" />
                <button className="px-3.5 py-2 rounded-lg bg-foreground text-background text-[12.5px] font-medium hover:opacity-90 transition-opacity cursor-pointer">
                  Update
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-[14px] font-medium text-foreground">Active sessions</p>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">Manage devices currently logged into your account.</p>
              </div>
              <button className="text-[13px] px-3.5 py-1.5 rounded-lg border border-glass hover:bg-accent transition-colors text-foreground/85 cursor-pointer">
                View sessions
              </button>
            </div>
          </div>
        );
      case "parental":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <ToggleRow label="Restrict mature content" description="Filter out content not suitable for all audiences." checked={true} onChange={() => {}} />
            <ToggleRow label="Require PIN for purchases" description="Ask for security PIN before any plan changes." checked={false} onChange={() => {}} />
          </div>
        );
      case "trusted":
        return (
          <div className="w-full max-w-4xl space-y-4 pt-1">
            <div>
              <p className="text-[14px] font-medium text-foreground">Trusted recovery contact</p>
              <p className="text-[13px] text-muted-foreground mt-0.5">A trusted contact can help you regain access if you are locked out.</p>
            </div>
            <div className="flex items-center gap-3">
              <Input placeholder="Trusted contact email (e.g. colleague@company.com)" className="max-w-md h-9" />
              <button className="px-4 py-2 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">
                Add contact
              </button>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="w-full max-w-4xl space-y-1">
            <div className="flex items-center gap-4 py-4 border-b border-glass/60">
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                TT
              </div>
              <div>
                <p className="text-[16px] font-semibold text-foreground">Tushar Trivedi</p>
                <p className="text-[13px] text-muted-foreground">tushar@rivinity.ai</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-glass/60">
              <div>
                <p className="text-[14px] font-medium text-foreground">Username</p>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">Your public handle across the workspace.</p>
              </div>
              <span className="text-[13.5px] font-medium text-muted-foreground">@tushar</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-[14px] font-medium text-foreground">Sign out</p>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">Sign out from this device.</p>
              </div>
              <button className="flex items-center gap-1.5 text-[13px] px-3.5 py-1.5 rounded-lg border border-glass hover:bg-accent text-foreground/80 transition-colors cursor-pointer">
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          </div>
        );
      case "keyboard":
        return (
          <div className="w-full max-w-4xl pt-1">
            {[
              ["New chat", "⌘ N"],
              ["Search chats", "⌘ K"],
              ["Toggle sidebar", "⌘ B"],
              ["Send message", "↵"],
              ["Newline", "⇧ ↵"],
            ].map(([action, keys]) => (
              <div key={action} className="flex items-center justify-between py-3.5 border-b border-glass/60">
                <span className="text-[14px] text-foreground font-medium">{action}</span>
                <kbd className="text-[12px] px-2.5 py-1 rounded-md bg-accent/60 border border-glass text-foreground/85 font-mono">
                  {keys}
                </kbd>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const activeLabel = sections.find((s) => s.id === section)?.label ?? "";
  const isIntegrations = section === "integrations";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ zoom: displayScale } as React.CSSProperties}
        className="max-w-[1240px] w-[95vw] h-[85vh] max-h-[85vh] p-0 overflow-hidden flex flex-col border-glass"
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Manage your preferences and integrations.</DialogDescription>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[240px] shrink-0 border-r border-glass glass-subtle flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex-1 px-2 pt-3 pb-3 space-y-0.5">
              {sections.map((s) => {
                const Icon = s.icon;
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={`w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-[13.5px] transition-colors duration-150 cursor-pointer ${
                      active
                        ? "bg-accent text-foreground font-medium"
                        : "text-foreground/80 hover:bg-accent/60"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0 text-foreground/70" strokeWidth={1.75} />
                    <span className="truncate text-left">{s.label}</span>
                  </button>
                );
              })}
              <div className="mt-3 pt-3 border-t border-glass/60">
                <p className="px-2.5 pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Workspace
                </p>
                {linkedPages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.to}
                      href={p.to}
                      onClick={() => onOpenChange(false)}
                      className="w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-[13.5px] text-foreground/80 hover:bg-accent/60 transition-colors"
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0 text-foreground/70" strokeWidth={1.75} />
                      <span className="truncate text-left flex-1">{p.label}</span>
                      <ExternalLink className="w-3 h-3 text-foreground/40" strokeWidth={1.75} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side Content Area */}
          <div className="flex-1 overflow-y-auto h-full pl-8 pr-4 pt-7 pb-6 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:hsl(var(--muted-foreground)/0.4)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-accent/20 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/35 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/60 transition-colors">
            {isIntegrations ? (
              <IntegrationsView />
            ) : (
              <div className="w-full">
                <div className="mb-6">
                  <h2 className="text-[22px] font-bold tracking-tight text-foreground">{activeLabel}</h2>
                  <p className="text-[13px] text-muted-foreground mt-0.5">
                    Manage your {activeLabel.toLowerCase()} preferences.
                  </p>
                </div>
                {renderSection()}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
