"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
  type ComponentType,
  type FC,
  type SVGProps,
} from "react";
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
  Search,
  RotateCw,
  Ban,
  Copy,
  ChevronLeft,
  Sun,
  Moon,
  Monitor,
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
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTheme, type ThemeMode } from "@/components/theme/ThemeProvider";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const CustomSwitch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-[#ff6600]" : "bg-zinc-200 dark:bg-zinc-700"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
};

const sections: { id: string; label: string; icon: IconType }[] = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "personalization", label: "Personalization", icon: Sparkles },
  { id: "integrations", label: "Integrations", icon: Grid2x2 },
  { id: "voice", label: "Voice", icon: AudioLines },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "data", label: "Data Controls", icon: Database },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "security", label: "Security & Login", icon: LockKeyhole },
  { id: "parental", label: "Parental Controls", icon: Users },
  { id: "trusted", label: "Trusted Contact", icon: LifeBuoy },
  { id: "account", label: "Account", icon: UserCircle },
  { id: "keyboard", label: "Keyboard Shortcuts", icon: Keyboard },
];

const linkedPages: { to: string; label: string; icon: IconType }[] = [
  { to: "/settings/team-members", label: "Team members", icon: Users },
  {
    to: "/settings/roles-access",
    label: "Roles & access",
    icon: ShieldQuestion,
  },
  { to: "/settings/api-keys", label: "API keys", icon: KeyRound },
];

const BrandIcons: Record<string, FC<{ className?: string }>> = {
  hubspot: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#FF7A59" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="3.5" fill="#FF7A59" />
      <path
        d="M12 4V8.5M12 15.5V20M4 12H8.5M15.5 12H20"
        stroke="#FF7A59"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="6.5" r="2" fill="#FF7A59" />
    </svg>
  ),
  salesforce: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#00A1E0" fillOpacity="0.15" />
      <path
        d="M8.5 14.5C7.67 14.5 7 13.83 7 13c0-.72.5-1.32 1.18-1.46.12-.9 0.88-1.54 1.77-1.54.34 0 .66.1.92.27A3.01 3.01 0 0113.8 9c1.65 0 3 1.35 3 3 0 .1-.01.2-.02.3.4.3.67.77.67 1.3 0 .88-.72 1.6-1.6 1.6H8.5z"
        fill="#00A1E0"
      />
    </svg>
  ),
  slack: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#4A154B" fillOpacity="0.12" />
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
  openai: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#7C3AED" fillOpacity="0.12" />
      <path
        d="M12 6.5a3.5 3.5 0 00-3.23 2.15A3.48 3.48 0 006.5 11.5c0 1.34.75 2.5 1.85 3.08a3.5 3.5 0 003.35 2.92 3.5 3.5 0 003.23-2.15 3.48 3.48 0 002.27-2.85c0-1.34-.75-2.5-1.85-3.08A3.5 3.5 0 0012 6.5zm0 2.2a2.3 2.3 0 011.3.4l-1.3 2.25-1.3-2.25c.38-.25.82-.4 1.3-.4z"
        fill="#7C3AED"
      />
    </svg>
  ),
  claude: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#D97706" fillOpacity="0.12" />
      <path
        d="M12 7l1.3 3.5 3.7.3-2.8 2.5.8 3.7-3-2-3 2 .8-3.7-2.8-2.5 3.7-.3L12 7z"
        fill="#D97706"
      />
    </svg>
  ),
  mongodb: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#13AA52" fillOpacity="0.12" />
      <path
        d="M12 5.5s-4 4.5-4 7.5a4 4 0 007.8 1.2c.1-.4.2-.8.2-1.2 0-3-4-7.5-4-7.5zm-.1 12.8v-5.8c.4.1.7.3.7.6 0 .5-.7 5.2-.7 5.2z"
        fill="#13AA52"
      />
    </svg>
  ),
  github: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  brevo: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#0B996F" />
      <path
        d="M8 7h4.5a3 3 0 012.12 5.12A3.2 3.2 0 0113 17H8V7zm2.5 4h2a1.25 1.25 0 000-2.5h-2V11zm0 4h2.5a1.25 1.25 0 000-2.5h-2.5V15z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  gemini: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#EEF2FF" />
      <path
        d="M12 4C12 8.418 8.418 12 4 12C8.418 12 12 15.582 12 20C12 15.582 15.582 12 20 12C15.582 12 12 8.418 12 4Z"
        fill="url(#gemini_grad)"
      />
      <defs>
        <linearGradient
          id="gemini_grad"
          x1="4"
          y1="4"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1B72E8" />
          <stop offset="0.5" stopColor="#9C27B0" />
          <stop offset="1" stopColor="#FF4081" />
        </linearGradient>
      </defs>
    </svg>
  ),
  stripe: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#635BFF" fillOpacity="0.12" />
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
  iconKey: string;
  description: string;
  enabled: boolean;
};

const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "CRM",
    iconKey: "hubspot",
    description: "Sync contacts, deals, and activities directly to HubSpot.",
    enabled: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    iconKey: "salesforce",
    description:
      "Bi-directional sync with Salesforce objects and trigger events.",
    enabled: true,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    iconKey: "slack",
    description: "Send alerts, post message summaries, and execute actions.",
    enabled: true,
  },
  {
    id: "openai",
    name: "OpenAI GPT-4",
    category: "AI Model",
    iconKey: "openai",
    description: "Access GPT-4 Turbo for text generation and summarization.",
    enabled: true,
  },
  {
    id: "claude",
    name: "Claude AI",
    category: "AI Model",
    iconKey: "claude",
    description:
      "Anthropic Claude for document analysis and long-form writing.",
    enabled: true,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    category: "AI Model",
    iconKey: "gemini",
    description: "Multimodal AI for text, documents, and visual reasoning.",
    enabled: true,
  },
  {
    id: "mongodb",
    name: "MongoDB Atlas",
    category: "Database",
    iconKey: "mongodb",
    description: "Query documents and subscribe to Atlas change streams.",
    enabled: false,
  },
  {
    id: "github",
    name: "GitHub",
    category: "DevOps",
    iconKey: "github",
    description:
      "Trigger automations on pull requests, issues, and deployments.",
    enabled: true,
  },
  {
    id: "brevo",
    name: "Brevo",
    category: "Marketing",
    iconKey: "brevo",
    description: "Send transactional emails and manage user campaigns.",
    enabled: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Finance",
    iconKey: "stripe",
    description: "Handle billing events, subscriptions, and receipts.",
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
    prefix: "rv_live_",
    suffix: "xK9p",
  },
  {
    id: "key-2",
    name: "Development Key",
    created: "Feb 3, 2026",
    lastUsed: "1 day ago",
    callsMo: "1,240 calls/mo",
    env: "Development",
    ageDays: 84,
    prefix: "rv_test_",
    suffix: "mQz7",
  },
  {
    id: "key-3",
    name: "CI/CD Pipeline",
    created: "Mar 10, 2026",
    lastUsed: "2 hr ago",
    callsMo: "6,442 calls/mo",
    env: "Staging",
    ageDays: 47,
    prefix: "rv_stg_",
    suffix: "pk4r",
  },
];

const accentSwatch: Record<string, string> = {
  Default: "#71717a",
  Indigo: "#6366f1",
  Rose: "#f43f5e",
  Emerald: "#10b981",
  Amber: "#f59e0b",
};

const ApiKeysView = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(INITIAL_API_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedId(null), 1800);
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
      }),
    );
  };

  const handleRevoke = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isRevoked: true } : k)),
    );
  };

  return (
    <div className="space-y-2 pt-1">
      {apiKeys.map((k) => {
        const isCopied = copiedId === k.id;
        const fullKeyString = `${k.prefix}••••••••••••••••${k.suffix}`;

        return (
          <div
            key={k.id}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <KeyRound className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold text-zinc-900 dark:text-white leading-tight truncate">
                  {k.name}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono truncate">
                  {fullKeyString}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleCopy(k.id, fullKeyString)}
                className="p-1.5 sm:p-1 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 cursor-pointer"
                title="Copy API Key"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                onClick={() => handleRotate(k.id)}
                className="p-1.5 sm:p-1 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 cursor-pointer"
                title="Rotate Key"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {!k.isRevoked && (
                <button
                  onClick={() => handleRevoke(k.id)}
                  className="p-1.5 sm:p-1 rounded-md border border-rose-200 dark:border-rose-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 cursor-pointer"
                  title="Revoke Key"
                >
                  <Ban className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const IntegrationsView = () => {
  const [activeTab, setActiveTab] = useState<"connected" | "api-keys">(
    "connected",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const enabledCount = useMemo(
    () => items.reduce((n, i) => n + (i.enabled ? 1 : 0), 0),
    [items],
  );

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }, [items, searchQuery]);

  return (
    <div className="w-full space-y-3 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start">
          <button
            onClick={() => setActiveTab("connected")}
            className={`px-2.5 py-1 rounded-md text-[11.5px] font-medium transition-all cursor-pointer ${
              activeTab === "connected"
                ? "bg-white dark:bg-zinc-800 shadow-2xs text-zinc-900 dark:text-white font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Connected ({enabledCount})
          </button>
          <button
            onClick={() => setActiveTab("api-keys")}
            className={`px-2.5 py-1 rounded-md text-[11.5px] font-medium transition-all cursor-pointer ${
              activeTab === "api-keys"
                ? "bg-white dark:bg-zinc-800 shadow-2xs text-zinc-900 dark:text-white font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            API Keys
          </button>
        </div>

        {activeTab === "connected" && (
          <div className="relative w-full sm:w-44">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7 w-full pl-8 pr-6 text-[11.5px] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-full focus-visible:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className={activeTab === "api-keys" ? undefined : "hidden"}>
        <ApiKeysView />
      </div>

      <div className={activeTab === "connected" ? "space-y-2" : "hidden"}>
        {filteredItems.map((item) => {
          const IconComponent = BrandIcons[item.iconKey] || BrandIcons.github;

          return (
            <div
              key={item.id}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 flex items-center justify-between gap-2 sm:gap-3 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-[13px] font-semibold text-zinc-900 dark:text-white leading-tight">
                      {item.name}
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-zinc-500 truncate mt-0.5 max-w-full sm:max-w-[280px]">
                    {item.description}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <CustomSwitch
                  checked={item.enabled}
                  onCheckedChange={() => handleToggle(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
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

const SelectRow = ({
  label,
  value,
  options,
  onChange,
  swatch,
}: SelectRowProps) => (
  <div className="flex items-center justify-between gap-3 py-3 border-b border-zinc-200 dark:border-zinc-800">
    <span className="text-[13px] text-zinc-900 dark:text-white font-medium min-w-0 shrink">
      {label}
    </span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-[12px] text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer shrink-0 max-w-[55%] sm:max-w-none">
          {swatch && (
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: swatch }}
            />
          )}
          <span className="font-medium truncate">{value}</span>
          <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[300] min-w-[150px] p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-lg"
      >
        {options.map((opt) => {
          const isSelected = opt === value;
          return (
            <DropdownMenuItem
              key={opt}
              onClick={() => onChange(opt)}
              className={`text-[12.5px] rounded-md px-2.5 py-1.5 cursor-pointer flex items-center justify-between transition-colors ${
                isSelected
                  ? "bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:bg-slate-200/90 dark:focus:bg-slate-800"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:bg-slate-100 dark:focus:bg-slate-800/50"
              }`}
            >
              <span>{opt}</span>
              {isSelected && (
                <Check className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
              )}
            </DropdownMenuItem>
          );
        })}
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

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) => (
  <div className="flex items-center justify-between gap-3 sm:gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
    <div className="min-w-0 flex-1 pr-2">
      <div className="text-[13px] text-zinc-900 dark:text-white font-medium leading-snug">
        {label}
      </div>
      {description && (
        <div className="text-[11.5px] text-zinc-500 mt-0.5 leading-relaxed">
          {description}
        </div>
      )}
    </div>
    <CustomSwitch checked={checked} onCheckedChange={onChange} />
  </div>
);

const SettingsDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const [section, setSection] = useState("general");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [mobileShowContent, setMobileShowContent] = useState(false);

  const { theme, setTheme } = useTheme();
  const [contrast, setContrast] = useState("Normal");
  const [accent, setAccent] = useState("Default");
  const [language, setLanguage] = useState("English");
  const [higherIntel, setHigherIntel] = useState(true);
  const [dictation, setDictation] = useState(true);

  const appearance = theme.charAt(0).toUpperCase() + theme.slice(1);

  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [soundNotif, setSoundNotif] = useState(true);
  const [tasksNotif, setTasksNotif] = useState(true);

  const [memory, setMemory] = useState(true);
  const [followUp, setFollowUp] = useState(true);
  const [creativity, setCreativity] = useState([60]);

  const [voiceModel, setVoiceModel] = useState("Aurora");
  const [autoSend, setAutoSend] = useState(false);

  const [improve, setImprove] = useState(true);
  const [chatHistory, setChatHistory] = useState(true);

  const [twoFA, setTwoFA] = useState(false);
  const [safeSearch, setSafeSearch] = useState(true);
  const [requirePin, setRequirePin] = useState(false);
  const [trustedEmail, setTrustedEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!open) setMobileShowContent(false);
  }, [open]);

  const filteredSections = useMemo(() => {
    const q = sidebarSearch.toLowerCase().trim();
    if (!q) return sections;
    return sections.filter((s) => s.label.toLowerCase().includes(q));
  }, [sidebarSearch]);

  const filteredLinkedPages = useMemo(() => {
    const q = sidebarSearch.toLowerCase().trim();
    if (!q) return linkedPages;
    return linkedPages.filter((p) => p.label.toLowerCase().includes(q));
  }, [sidebarSearch]);

  const handleSectionSelect = (id: string) => {
    setSection(id);
    setMobileShowContent(true);
  };

  const renderSection = () => {
    switch (section) {
      case "general":
        return (
          <div className="w-full">
            {/* Appearance theme selector with direct interactive buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="min-w-0">
                <span className="text-[13px] text-zinc-900 dark:text-white font-medium block">
                  Appearance
                </span>
                <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                  Select workspace theme for dashboard and tools
                </span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                    theme === "light"
                      ? "bg-white text-zinc-900 shadow-xs font-semibold border border-zinc-200/80"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-zinc-900 text-white shadow-xs font-semibold border border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                    theme === "system"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-zinc-400" />
                  <span>System</span>
                </button>
              </div>
            </div>
            <SelectRow
              label="Contrast"
              value={contrast}
              options={["Normal", "High"]}
              onChange={setContrast}
            />
            <SelectRow
              label="Accent Color"
              value={accent}
              options={Object.keys(accentSwatch)}
              onChange={setAccent}
              swatch={accentSwatch[accent]}
            />
            <SelectRow
              label="Language"
              value={language}
              options={["English", "Hindi", "Spanish", "French", "German"]}
              onChange={setLanguage}
            />
            <ToggleRow
              label="Higher Intelligence"
              description="Automatically switch to advanced reasoning models when complex prompts are detected."
              checked={higherIntel}
              onChange={setHigherIntel}
            />
            <ToggleRow
              label="Voice Dictation"
              description="Enable real-time audio dictation in prompt inputs."
              checked={dictation}
              onChange={setDictation}
            />
          </div>
        );
      case "notifications":
        return (
          <div className="w-full">
            <ToggleRow
              label="Push Notifications"
              description="Receive alert badges and desktop toasts."
              checked={pushNotif}
              onChange={setPushNotif}
            />
            <ToggleRow
              label="Email Digest"
              description="Weekly telemetry and workspace summary."
              checked={emailNotif}
              onChange={setEmailNotif}
            />
            <ToggleRow
              label="Sound Alerts"
              checked={soundNotif}
              onChange={setSoundNotif}
            />
            <ToggleRow
              label="Background Tasks"
              description="Notify when long-running workflows complete."
              checked={tasksNotif}
              onChange={setTasksNotif}
            />
          </div>
        );
      case "personalization":
        return (
          <div className="w-full">
            <ToggleRow
              label="Workspace Memory"
              description="Allow Rivinity to retain project context across sessions."
              checked={memory}
              onChange={setMemory}
            />
            <ToggleRow
              label="Follow-up Suggestions"
              description="Show smart suggestions below completed replies."
              checked={followUp}
              onChange={setFollowUp}
            />
            <div className="py-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="text-[13px] text-zinc-900 dark:text-white font-medium">
                  Model Temperature / Creativity
                </div>
                <span className="text-[12px] text-zinc-500 font-mono shrink-0">
                  {creativity[0]}%
                </span>
              </div>
              <Slider
                value={creativity}
                onValueChange={setCreativity}
                max={100}
                step={1}
                className="py-1"
              />
            </div>
          </div>
        );
      case "integrations":
        return <IntegrationsView />;
      case "voice":
        return (
          <div className="w-full">
            <SelectRow
              label="Voice Profile"
              value={voiceModel}
              options={["Aurora", "Nova", "Ember", "Sage"]}
              onChange={setVoiceModel}
            />
            <ToggleRow
              label="Auto-Submit on Pause"
              description="Send speech immediately when a natural pause is detected."
              checked={autoSend}
              onChange={setAutoSend}
            />
          </div>
        );
      case "billing":
        return (
          <div className="space-y-3 pt-1">
            <div className="rounded-xl p-3 sm:p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Active Plan
                </div>
                <div className="text-[18px] font-bold text-zinc-900 dark:text-white mt-0.5">
                  Pro Tier · $20/mo
                </div>
                <div className="text-[11.5px] text-zinc-500 mt-1">
                  Renews on Oct 14, 2026
                </div>
              </div>
              <button className="px-3.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer self-start sm:self-auto shrink-0">
                Manage Subscription
              </button>
            </div>
            <div className="rounded-xl p-3 sm:p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-zinc-900 dark:text-white">
                  Payment Method
                </div>
                <div className="text-[12px] text-zinc-500 mt-0.5 font-mono truncate">
                  Visa ending in •••• 4242
                </div>
              </div>
              <button className="text-[12px] text-zinc-900 dark:text-zinc-100 hover:underline font-medium cursor-pointer shrink-0">
                Edit
              </button>
            </div>
          </div>
        );
      case "data":
        return (
          <div className="w-full">
            <ToggleRow
              label="Model Training Feedback"
              description="Include anonymized chats in quality improvements."
              checked={improve}
              onChange={setImprove}
            />
            <ToggleRow
              label="Save Conversation History"
              description="Persist chat threads in the sidebar."
              checked={chatHistory}
              onChange={setChatHistory}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
              <div className="min-w-0">
                <div className="text-[13px] text-zinc-900 dark:text-white font-medium">
                  Export Workspace Data
                </div>
                <div className="text-[11.5px] text-zinc-500">
                  Download a JSON archive of your account data.
                </div>
              </div>
              <button
                type="button"
                onClick={() => toast.success("Workspace data archive initiated. Downloading JSON...")}
                className="text-[12px] px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-800 dark:text-zinc-200 cursor-pointer self-start sm:self-auto shrink-0"
              >
                Export Data
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3.5">
              <div className="min-w-0">
                <div className="text-[13px] text-rose-600 font-medium">
                  Purge All Conversations
                </div>
                <div className="text-[11.5px] text-zinc-500">
                  Permanently delete stored history across devices.
                </div>
              </div>
              <button
                type="button"
                onClick={() => toast.error("All local cached conversations purged")}
                className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        );
      case "storage":
        return (
          <div className="space-y-3 pt-1">
            <div className="rounded-xl p-3 sm:p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <div className="text-[13px] font-semibold text-zinc-900 dark:text-white">
                    Workspace Storage
                  </div>
                  <div className="text-[11.5px] text-zinc-500">
                    Documents, vector embeddings, and media uploads.
                  </div>
                </div>
                <span className="text-[12px] font-mono font-medium text-zinc-900 dark:text-white shrink-0">
                  3.2 GB / 50 GB
                </span>
              </div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-300"
                  style={{ width: "6.4%" }}
                />
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="w-full">
            <ToggleRow
              label="Two-Factor Authentication (2FA)"
              description="Require an authenticator app code on login."
              checked={twoFA}
              onChange={setTwoFA}
            />
            <div className="py-3.5 border-b border-zinc-200 dark:border-zinc-800">
              <div className="text-[13px] text-zinc-900 dark:text-white font-medium mb-1">
                Change Password
              </div>
              <div className="text-[11.5px] text-zinc-500 mb-3">
                Ensure your new password contains at least 8 characters.
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-sm">
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="h-8 text-[12px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newPassword.trim()) {
                      toast.error("Please enter a new password");
                      return;
                    }
                    if (newPassword.length < 8) {
                      toast.error("Password must be at least 8 characters");
                      return;
                    }
                    toast.success("Password updated successfully");
                    setNewPassword("");
                  }}
                  className="px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3.5">
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-zinc-900 dark:text-white">
                  Active Sessions
                </div>
                <div className="text-[11.5px] text-zinc-500">
                  Revoke access from unknown devices.
                </div>
              </div>
              <button
                type="button"
                onClick={() => toast.info("Active session list refreshed")}
                className="text-[12px] px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-800 dark:text-zinc-200 cursor-pointer self-start sm:self-auto shrink-0"
              >
                View All
              </button>
            </div>
          </div>
        );
      case "parental":
        return (
          <div className="w-full">
            <ToggleRow
              label="Safe Search & Filter"
              description="Restrict explicit or mature responses."
              checked={safeSearch}
              onChange={setSafeSearch}
            />
            <ToggleRow
              label="Require PIN for Upgrades"
              description="Prevent unexpected tier changes."
              checked={requirePin}
              onChange={setRequirePin}
            />
          </div>
        );
      case "trusted":
        return (
          <div className="space-y-3 pt-1">
            <div className="text-[13px] text-zinc-500 leading-relaxed">
              Designate a trusted collaborator to help verify account recovery
              if you lose access.
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-md">
              <Input
                type="email"
                value={trustedEmail}
                onChange={(e) => setTrustedEmail(e.target.value)}
                placeholder="colleague@domain.com"
                className="h-8 text-[12px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
              />
              <button
                type="button"
                onClick={() => {
                  if (!trustedEmail.trim()) {
                    toast.error("Please enter an email address");
                    return;
                  }
                  toast.success(`Invitation sent to ${trustedEmail.trim()}`);
                  setTrustedEmail("");
                }}
                className="px-3.5 py-1.5 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer shrink-0 self-start sm:self-auto"
              >
                Add
              </button>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="w-full">
            <div className="flex items-center gap-3.5 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white font-bold text-base shrink-0">
                TT
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-zinc-900 dark:text-white leading-tight truncate">
                  Tushar Trivedi
                </div>
                <div className="text-[12px] text-zinc-500 truncate">
                  tushar@rivinity.ai
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-zinc-900 dark:text-white">
                  Workspace Handle
                </div>
                <div className="text-[11.5px] text-zinc-500">
                  Public handle for mentions and shares.
                </div>
              </div>
              <span className="text-[12.5px] font-mono text-zinc-500 shrink-0">
                @tushar
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3">
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-zinc-900 dark:text-white">
                  Sign Out
                </div>
                <div className="text-[11.5px] text-zinc-500">
                  End session on this machine.
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer self-start sm:self-auto shrink-0">
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        );
      case "keyboard":
        return (
          <div className="w-full">
            {[
              ["New conversation", "⌘ N"],
              ["Open command search", "⌘ K"],
              ["Toggle workspace sidebar", "⌘ B"],
              ["Submit prompt", "↵"],
              ["Insert soft newline", "⇧ ↵"],
            ].map(([action, keys]) => (
              <div
                key={action}
                className="flex items-center justify-between gap-3 py-2.5 border-b border-zinc-200 dark:border-zinc-800"
              >
                <span className="text-[13px] text-zinc-900 dark:text-white font-medium min-w-0">
                  {action}
                </span>
                <kbd className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-600 dark:text-zinc-400 shrink-0">
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-none sm:rounded-2xl bg-white dark:bg-zinc-950 w-full max-w-full h-[100dvh] sm:max-w-[740px] sm:w-[90vw] sm:h-[640px] sm:max-h-[90vh] z-[200]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage workspace configurations and preferences.
        </DialogDescription>

        <div className="flex flex-1 overflow-hidden min-h-0">
          <div
            className={`${
              mobileShowContent ? "hidden" : "flex"
            } md:flex w-full md:w-[210px] shrink-0 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden`}
          >
            <div className="px-3.5 pr-12 md:pr-3.5 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <div className="text-[14px] font-semibold text-zinc-900 dark:text-white tracking-tight px-1">
                Preferences
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search settings..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="h-7 w-full pl-8 pr-6 text-[11.5px] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-full shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus:border-zinc-300 dark:focus:border-zinc-700"
                />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 px-2.5 py-2.5 space-y-1">
              {filteredSections.map((s) => {
                const Icon = s.icon;
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSectionSelect(s.id)}
                    className={`w-full h-9 md:h-8 px-2.5 rounded-lg flex items-center gap-2.5 text-[12.5px] transition-all cursor-pointer ${
                      active
                        ? "bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold shadow-2xs"
                        : "bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-100"
                    }`}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      strokeWidth={active ? 2 : 1.75}
                    />
                    <span className="truncate text-left">{s.label}</span>
                  </button>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="px-2 py-4 text-center text-[11.5px] text-zinc-400">
                  No settings match
                </div>
              )}

              {filteredLinkedPages.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="px-2.5 pb-2 text-[12px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
                    Workspace
                  </div>
                  {filteredLinkedPages.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.to}
                        href={p.to}
                        onClick={() => onOpenChange(false)}
                        className="w-full h-9 md:h-8 px-2.5 rounded-lg flex items-center gap-2.5 text-[12.5px] bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
                      >
                        <Icon
                          className="w-3.5 h-3.5 shrink-0 text-zinc-400"
                          strokeWidth={1.75}
                        />
                        <span className="truncate text-left flex-1">
                          {p.label}
                        </span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div
            className={`${
              mobileShowContent ? "flex" : "hidden"
            } md:flex flex-1 flex-col overflow-hidden min-h-0 h-full bg-white dark:bg-zinc-950`}
          >
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 [scrollbar-width:thin]">
              <div className="w-full">
              <div className="mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800 pr-10 sm:pr-0">
              <div className="flex items-start gap-1.5">
                <button
                  type="button"
                  onClick={() => setMobileShowContent(false)}
                  className="md:hidden flex items-center justify-center p-1 -ml-1 mt-0.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shrink-0"
                  aria-label="Back to settings list"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="text-[18px] font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                    {activeLabel}
                  </div>
                  <div className="text-[12.5px] text-zinc-500 mt-0.5">
                    Configure and customize your {activeLabel.toLowerCase()}{" "}
                    preferences.
                  </div>
                </div>
              </div>
            </div>
            
                {renderSection()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;