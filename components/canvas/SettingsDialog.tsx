"use client";

import { useState } from "react";
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
  ChevronDown,
  Check,
  Trash2,
  LogOut,
  KeyRound,
  ShieldQuestion,
  ExternalLink,
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
  { id: "apps", label: "Apps", icon: Grid2x2 },
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

type SelectRowProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  swatch?: string;
};

const SelectRow = ({ label, value, options, onChange, swatch }: SelectRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-zinc-800">
    <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">{label}</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-[13.5px] font-medium text-gray-700 dark:text-zinc-300 hover:text-[#FF5500] dark:hover:text-[#FF5500] transition-colors px-3 py-1.5 rounded-xl border border-gray-200/90 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800/70 hover:border-[#FF5500]/40 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 cursor-pointer"
        >
          {swatch && <span className="w-2.5 h-2.5 rounded-full shadow-xs" style={{ background: swatch }} />}
          {value}
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl p-1">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            onClick={() => onChange(opt)}
            className="text-[13px] rounded-lg px-2.5 py-1.5 cursor-pointer text-gray-700 dark:text-zinc-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#FF5500] dark:hover:text-[#FF5500] focus:bg-orange-50 dark:focus:bg-orange-950/30 focus:text-[#FF5500]"
          >
            <span className="flex-1">{opt}</span>
            {opt === value && <Check className="w-3.5 h-3.5 text-[#FF5500]" />}
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
  <div className="flex items-start justify-between gap-6 py-4 border-b border-gray-100 dark:border-zinc-800">
    <div className="min-w-0">
      <div className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">{label}</div>
      {description && (
        <div className="text-[12.5px] text-gray-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{description}</div>
      )}
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
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
    Default: "#FF5500",
    Indigo: "#6366f1",
    Rose: "#f43f5e",
    Emerald: "#10b981",
    Amber: "#f59e0b",
  };

  const renderSection = () => {
    switch (section) {
      case "general":
        return (
          <div>
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
          <div>
            <ToggleRow label="Push notifications" description="Get notified on this device." checked={pushNotif} onChange={setPushNotif} />
            <ToggleRow label="Email digest" description="Weekly summary delivered to your inbox." checked={emailNotif} onChange={setEmailNotif} />
            <ToggleRow label="Sound alerts" checked={soundNotif} onChange={setSoundNotif} />
            <ToggleRow label="Task completion" description="Ping me when long-running tasks finish." checked={tasksNotif} onChange={setTasksNotif} />
          </div>
        );
      case "personalization":
        return (
          <div>
            <ToggleRow label="Memory" description="Let Rivinity remember details across chats." checked={memory} onChange={setMemory} />
            <ToggleRow label="Follow-up suggestions" checked={followUp} onChange={setFollowUp} />
            <div className="py-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">Creativity</div>
                <span className="text-[12.5px] font-bold text-[#FF5500]">{creativity[0]}%</span>
              </div>
              <Slider value={creativity} onValueChange={setCreativity} max={100} step={1} />
            </div>
          </div>
        );
      case "apps":
        return (
          <div className="py-1">
            {["Google Drive", "Notion", "Slack", "GitHub", "Linear"].map((app) => (
              <div key={app} className="flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/40 text-[#FF5500] flex items-center justify-center text-[12px] font-bold">
                    {app[0]}
                  </div>
                  <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">{app}</span>
                </div>
                <button
                  type="button"
                  className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800/70 hover:border-[#FF5500]/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#FF5500] text-gray-700 dark:text-zinc-300 transition-all cursor-pointer"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        );
      case "voice":
        return (
          <div>
            <SelectRow label="Voice model" value={voiceModel} options={["Aurora", "Nova", "Ember", "Sage"]} onChange={setVoiceModel} />
            <ToggleRow label="Auto-send after pause" description="Send automatically when you stop speaking." checked={autoSend} onChange={setAutoSend} />
          </div>
        );
      case "billing":
        return (
          <div className="space-y-4 pt-2">
            <div className="bg-orange-50/30 dark:bg-orange-950/20 rounded-2xl p-5 border border-orange-200/60 dark:border-orange-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-wider text-[#FF5500]">Current plan</div>
                  <div className="text-[18px] font-bold text-gray-900 dark:text-white mt-1">Pro · $20/month</div>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#FF5500] hover:bg-[#e04b00] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Manage
                </button>
              </div>
            </div>
            <div className="bg-gray-50/80 dark:bg-zinc-800/40 rounded-2xl p-5 border border-gray-200/90 dark:border-zinc-800">
              <div className="text-[14px] font-semibold text-gray-900 dark:text-white">Payment method</div>
              <div className="text-[13px] text-gray-500 dark:text-zinc-400 mt-1">Visa ending in 4242 · expires 09/27</div>
            </div>
          </div>
        );
      case "data":
        return (
          <div>
            <ToggleRow label="Improve the model" description="Allow Rivinity to use your conversations to improve the model." checked={improve} onChange={setImprove} />
            <ToggleRow label="Chat history" description="Store chats so you can revisit and search them." checked={chatHistory} onChange={setChatHistory} />
            <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">Export data</span>
              <button
                type="button"
                className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800/70 hover:border-[#FF5500]/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#FF5500] text-gray-700 dark:text-zinc-300 transition-all cursor-pointer"
              >
                Request export
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="text-[14px] font-semibold text-red-600 dark:text-red-400">Delete all chats</div>
                <div className="text-[12.5px] text-gray-500 dark:text-zinc-400 mt-0.5">Permanently remove all previous conversations.</div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        );
      case "storage":
        return (
          <div className="space-y-4 pt-2">
            <div className="bg-gray-50/80 dark:bg-zinc-800/40 rounded-2xl p-5 border border-gray-200/90 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-[14px] font-semibold text-gray-900 dark:text-white">Workspace storage</div>
                <div className="text-[13px] text-gray-500 dark:text-zinc-400">3.2 GB of 50 GB</div>
              </div>
              <div className="h-2.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF5500] rounded-full" style={{ width: "6.4%" }} />
              </div>
            </div>
          </div>
        );
      case "safety":
      case "security":
        return (
          <div>
            <ToggleRow label="Two-factor authentication" description="Add an extra layer of security with 2FA." checked={twoFA} onChange={setTwoFA} />
            <div className="py-4 border-b border-gray-100 dark:border-zinc-800">
              <div className="text-[14px] font-medium text-gray-800 dark:text-zinc-200 mb-2">Change password</div>
              <Input
                type="password"
                placeholder="New password"
                className="max-w-sm rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/60 dark:bg-zinc-800/60 focus:bg-white dark:focus:bg-zinc-900 focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500]/30 text-sm"
              />
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">Active sessions</span>
              <button
                type="button"
                className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800/70 hover:border-[#FF5500]/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#FF5500] text-gray-700 dark:text-zinc-300 transition-all cursor-pointer"
              >
                View
              </button>
            </div>
          </div>
        );
      case "parental":
        return (
          <div>
            <ToggleRow label="Restrict mature content" checked={true} onChange={() => {}} />
            <ToggleRow label="Require PIN for purchases" checked={false} onChange={() => {}} />
          </div>
        );
      case "trusted":
        return (
          <div className="space-y-4 pt-2">
            <div className="text-[13.5px] text-gray-500 dark:text-zinc-400">A trusted contact can help you regain access to your account.</div>
            <Input
              placeholder="Trusted contact email"
              className="max-w-md rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/60 dark:bg-zinc-800/60 focus:bg-white dark:focus:bg-zinc-900 focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500]/30 text-sm"
            />
            <button
              type="button"
              className="px-4.5 py-2 rounded-xl bg-[#FF5500] hover:bg-[#e04b00] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Add contact
            </button>
          </div>
        );
      case "account":
        return (
          <div>
            <div className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-zinc-800">
              <div className="w-13 h-13 rounded-full bg-[#FF5500] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                TT
              </div>
              <div>
                <div className="text-[15px] font-bold text-gray-900 dark:text-white">Tushar Trivedi</div>
                <div className="text-[13px] text-gray-500 dark:text-zinc-400">tushar@rivinity.ai</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">Username</span>
              <span className="text-[13.5px] font-semibold text-gray-500 dark:text-zinc-400">@tushar</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">Sign out</span>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800/70 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 text-gray-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          </div>
        );
      case "keyboard":
        return (
          <div className="pt-1">
            {[
              ["New chat", "⌘ N"],
              ["Search chats", "⌘ K"],
              ["Toggle sidebar", "⌘ B"],
              ["Send message", "↵"],
              ["Newline", "⇧ ↵"],
            ].map(([action, keys]) => (
              <div key={action} className="flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-[14px] font-medium text-gray-800 dark:text-zinc-200">{action}</span>
                <kbd className="text-[12px] font-mono font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 shadow-2xs">
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
      <DialogContent className="max-w-[920px] p-0 overflow-hidden border border-gray-200/90 dark:border-zinc-800 bg-white dark:bg-[#18181b] rounded-2xl sm:rounded-3xl shadow-2xl">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Manage your Rivinity preferences.</DialogDescription>
        <div className="flex h-[640px]">
          {/* Sidebar */}
          <div className="w-[240px] shrink-0 border-r border-gray-100 dark:border-zinc-800/80 bg-gray-50/70 dark:bg-[#131316] flex flex-col">
            <div className="flex-1 overflow-y-auto px-2 pt-3 pb-3 space-y-0.5">
              {sections.map((s) => {
                const Icon = s.icon;
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSection(s.id)}
                    className={`w-full h-9 px-2.5 rounded-xl flex items-center gap-3 text-[13.5px] transition-all duration-150 cursor-pointer text-left border-0 ${
                      active
                        ? "bg-orange-50 dark:bg-orange-950/40 text-[#FF5500] font-semibold shadow-2xs"
                        : "text-gray-600 dark:text-zinc-400 hover:bg-orange-50/40 dark:hover:bg-orange-950/20 hover:text-[#FF5500] dark:hover:text-[#FF5500] font-medium bg-transparent"
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? "text-[#FF5500]" : "text-gray-500 dark:text-zinc-400"}`} strokeWidth={1.75} />
                    <span className="truncate text-left">{s.label}</span>
                  </button>
                );
              })}
              <div className="mt-3 pt-3 border-t border-gray-200/80 dark:border-zinc-800">
                <div className="px-2.5 pb-1.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-gray-400 dark:text-zinc-500">
                  Workspace
                </div>
                {linkedPages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.to}
                      href={p.to}
                      onClick={() => onOpenChange(false)}
                      className="w-full h-9 px-2.5 rounded-xl flex items-center gap-3 text-[13.5px] font-medium text-gray-600 dark:text-zinc-400 hover:bg-orange-50/40 dark:hover:bg-orange-950/20 hover:text-[#FF5500] dark:hover:text-[#FF5500] transition-colors group"
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0 text-gray-500 dark:text-zinc-400 group-hover:text-[#FF5500] transition-colors" strokeWidth={1.75} />
                      <span className="truncate text-left flex-1">{p.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500 group-hover:text-[#FF5500] transition-colors" strokeWidth={1.75} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-[#18181b]">
            <div className="px-8 pt-7 pb-10">
              <div className="text-[22px] font-bold text-gray-900 dark:text-white tracking-tight mb-4">{activeLabel}</div>
              {renderSection()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
