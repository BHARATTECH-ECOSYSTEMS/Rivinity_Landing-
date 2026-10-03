import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Paperclip,
  Mic,
  Code,
  FileText,
  Lightbulb,
  Search,
  Plus,
  X,
  Copy,
  Share2,
  Share,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Pencil,
  Wand2,
  Layers,
  HatGlasses,
  BarChart3,
  BookOpen,
  ArrowUpRight,
  Globe,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  Bell,
  MessageSquare,
  PanelLeft,
  MoreHorizontal,
  Upload,
  Brain,
  Loader2,
  Sparkles,
  Eye,
  Image as ImageIcon,
  File as FileIcon,
  Pin,
  Trash2,
  Folder,
  FolderPlus,
  FolderX,
  Archive,
  Check,
  Bot,
  ScanSearch,
  PenLine,
  ImagePlus,
  AudioLines,
} from "lucide-react";
import ChatMarkdown from "./ChatMarkdown";
import { toast } from "sonner";
import WriteAnythingStudio from "./WriteAnythingStudio";
import DIFeasibilityDashboard from "./bigdata";
import { ChatEmptyState } from "./ChatEmptyState";
import SkillResultCard from "./SkillResultCard";
import { MaterialPreviewModal } from "./MaterialPreviewModal";
import { SKILLS } from "@/lib/skillsCatalog";
import { cn } from "@/lib/utils";
import { USER } from "@/lib/profile";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/components/auth/auth-context";
import { LoaderGooeyBlobs } from "@/components/ui/LoaderGooeyBlobs";
import {
  initialHistoryItems,
  STORAGE_HISTORY_KEY,
} from "@/components/history/HistoryPage";

const SKILL_MARKER = "__SKILL__:";

type TabKind = "chat" | "write" | "dashboard";

export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: "image" | "pdf" | "document" | "code" | "other";
  url?: string;
  status: "uploading" | "ready";
  progress?: number;
}

export interface MessageItem {
  id: number;
  role: "user" | "ai";
  content: string;
  attachments?: AttachedFile[];
}

interface TabState {
  id: number;
  icon: typeof Search;
  label: string;
  kind: TabKind;
  messages: MessageItem[];
  draftInput: string;
  attachments?: AttachedFile[];
  isPinned?: boolean;
  historyId?: string;
  workspaceId?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileType = (file: File): "image" | "pdf" | "document" | "code" | "other" => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return "pdf";
  const name = file.name.toLowerCase();
  if (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    name.endsWith(".csv") ||
    name.endsWith(".xlsx") ||
    name.endsWith(".ppt") ||
    name.endsWith(".pptx")
  )
    return "document";
  if (
    name.endsWith(".ts") ||
    name.endsWith(".tsx") ||
    name.endsWith(".js") ||
    name.endsWith(".jsx") ||
    name.endsWith(".json") ||
    name.endsWith(".py") ||
    name.endsWith(".html") ||
    name.endsWith(".css") ||
    name.endsWith(".sql")
  )
    return "code";
  return "other";
};

const getFileCategoryLabel = (file: { name: string; type?: string }): string => {
  const name = file.name.toLowerCase();
  if (name.endsWith(".ppt") || name.endsWith(".pptx") || name.endsWith(".key")) return "Presentation";
  if (name.endsWith(".xls") || name.endsWith(".xlsx") || name.endsWith(".csv")) return "Spreadsheet";
  if (file.type === "pdf" || name.endsWith(".pdf")) return "PDF";
  if (file.type === "image" || name.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) return "Image";
  if (file.type === "code" || name.match(/\.(ts|tsx|js|jsx|py|cpp|c|html|css|json|sql|java|go|rs)$/i)) return "Code";
  if (name.endsWith(".txt") || name.endsWith(".md")) return "Text";
  if (name.endsWith(".doc") || name.endsWith(".docx")) return "Document";
  return "Document";
};

const tabTemplates = [
  { icon: Search, label: "Smart Paper Search", kind: "chat" as TabKind },
  { icon: FileText, label: "Smart Summarization", kind: "chat" as TabKind },
  { icon: Lightbulb, label: "Citation Generator", kind: "chat" as TabKind },
  { icon: Brain, label: "Deep Analytics", kind: "chat" as TabKind },
  { icon: BarChart3, label: "Big Data", kind: "dashboard" as TabKind },
  { icon: BookOpen, label: "Literature Review", kind: "chat" as TabKind },
  { icon: Wand2, label: "Write Anything", kind: "write" as TabKind },
];

const rivinityFeatures = [
  { icon: Bot, label: "Rivinity Chat", kind: "chat" as TabKind },
  { icon: Code, label: "Fullstack Builder", kind: "chat" as TabKind },
  { icon: Layers, label: "Frontend Builder", kind: "chat" as TabKind },
  { icon: ScanSearch, label: "Deep Search", kind: "chat" as TabKind },
  { icon: PenLine, label: "Write Anything", kind: "write" as TabKind },
  { icon: ImagePlus, label: "Image Enhancer", kind: "chat" as TabKind },
  { icon: AudioLines, label: "Audio Lab", kind: "chat" as TabKind },
];

const getTabIcon = (label: string) => {
  const l = label.toLowerCase();
  if (
    l.includes("deep analytic") ||
    l.includes("analytics") ||
    l.includes("brain")
  )
    return Brain;
  if (
    l.includes("big data") ||
    l.includes("bigdata") ||
    l.includes("feasibility") ||
    l.includes("dashboard") ||
    l.includes("d&i")
  )
    return BarChart3;
  if (
    l.includes("write") ||
    l.includes("wand") ||
    l.includes("author") ||
    l.includes("studio")
  )
    return Wand2;
  if (l.includes("code") || l.includes("dev") || l.includes("script"))
    return Code;
  if (
    l.includes("search") ||
    l.includes("find") ||
    l.includes("look") ||
    l.includes("paper")
  )
    return Search;
  if (l.includes("citation") || l.includes("idea") || l.includes("think"))
    return Lightbulb;
  if (
    l.includes("doc") ||
    l.includes("report") ||
    l.includes("file") ||
    l.includes("text") ||
    l.includes("summar")
  )
    return FileText;
  if (l.includes("book") || l.includes("literature") || l.includes("review"))
    return BookOpen;
  return Search;
};

const getTabKind = (label: string): TabKind => {
  if (
    label.toLowerCase().includes("write") ||
    label.toLowerCase().includes("studio")
  )
    return "write";
  return "chat";
};

interface ChatComposerProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  tabs: TabState[];
  setTabs: React.Dispatch<React.SetStateAction<TabState[]>>;
  activeTab: number;
  setActiveTab: (id: number) => void;
  onCloseTab: (id: number, e: React.MouseEvent) => void;
  onAddNewTab?: () => void;
  skillPickerOpen: boolean;
  setSkillPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  skillQuery: string;
  setSkillQuery: (val: string) => void;
  onRunSkill: (id: string) => void;
  disabled?: boolean;
  isCompact?: boolean;
  attachments?: AttachedFile[];
  onAttachFiles?: (files: FileList | File[]) => void;
  onRemoveAttachment?: (id: string) => void;
  onPreviewFile?: (file: AttachedFile) => void;
  className?: string;
}

const ChatComposer: React.FC<ChatComposerProps> = ({
  input,
  setInput,
  onSend,
  tabs,
  setTabs,
  activeTab,
  setActiveTab,
  onCloseTab,
  onAddNewTab,
  skillPickerOpen,
  setSkillPickerOpen,
  skillQuery,
  setSkillQuery,
  onRunSkill,
  disabled,
  isCompact = false,
  attachments = [],
  onAttachFiles,
  onRemoveAttachment,
  onPreviewFile,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const wandButtonRef = useRef<HTMLButtonElement>(null);
  const skillButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAddingTab, setIsAddingTab] = useState(false);
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const [isIncognito, setIsIncognito] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [editingTabId, setEditingTabId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        skillButtonRef.current &&
        !skillButtonRef.current.contains(target) &&
        wandButtonRef.current &&
        !wandButtonRef.current.contains(target)
      ) {
        setSkillPickerOpen(false);
      }
    };
    if (skillPickerOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [skillPickerOpen, setSkillPickerOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleRenameTab = (tabId: number) => {
    if (editingName.trim()) {
      setTabs((p) =>
        p.map((t) =>
          t.id === tabId
            ? {
                ...t,
                label: editingName.trim(),
                icon: getTabIcon(editingName.trim()),
                kind: getTabKind(editingName.trim()),
              }
            : t,
        ),
      );
    }
    setEditingTabId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAttachFiles?.(e.dataTransfer.files);
    }
  };

  const filteredSkills = SKILLS.filter((s) => {
    const q = skillQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 30);

  const canSend = (input.trim().length > 0 || attachments.length > 0) && !disabled;

  return (
    <div
      className={cn(
        "w-full max-w-full mx-auto px-0 relative flex flex-col justify-center transition-all duration-300",
        isIncognito &&
          "p-2 sm:p-2.5 rounded-[26px] bg-slate-100/85 dark:bg-zinc-800/60 backdrop-blur-2xl border border-slate-300 dark:border-zinc-600 shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
      )}
    >
      {isIncognito && (
        <div className="px-3.5 sm:px-4 pt-1 pb-2 text-[12px] select-none text-slate-600 dark:text-zinc-300 font-medium tracking-tight animate-in fade-in duration-200">
          Incognito Mode Active &bull; Chats will not be saved to history
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "transition-all duration-200 overflow-hidden flex flex-col w-full relative",
          isIncognito
            ? "bg-[#22242a] dark:bg-[#1c1e24] rounded-[20px] border border-white/10 dark:border-zinc-700/60 shadow-xl text-white"
            : "bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400/20 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-500/20 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
          isDraggingOver && "border-[#FF5500] ring-2 ring-[#FF5500]/20 bg-orange-50/10",
          className,
        )}
      >
        {isDraggingOver && (
          <div className="absolute inset-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs z-30 flex flex-col items-center justify-center pointer-events-none border-2 border-dashed border-[#FF5500] rounded-2xl animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#FF5500] flex items-center justify-center mb-2 animate-bounce">
              <Paperclip className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
              Drop images, PDFs or files here
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Files will be uploaded and attached to your prompt
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            isCompact
              ? "gap-1 px-2 pt-1.5 pb-0.5"
              : "gap-1.5 sm:gap-2 px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1",
          )}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                className={cn(
                  "group relative flex items-center transition-all duration-150 rounded-full shrink-0 cursor-pointer",
                  isCompact
                    ? "gap-1 px-2.5 py-0.5 text-[11.5px]"
                    : "gap-1.5 px-3 py-1 text-[12.5px]",
                  isActive
                    ? isIncognito
                      ? "border border-[#FF6B00]/70 text-[#FF6B00] bg-[#FF6B00]/15 font-medium"
                      : "border border-[#FF6B00]/40 text-[#FF6B00] bg-orange-50/50 dark:bg-orange-950/30 font-medium"
                    : isIncognito
                      ? "text-zinc-400 hover:text-white border border-white/10 hover:border-zinc-500 hover:bg-white/5 font-medium bg-white/5"
                      : "text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border border-gray-200/90 dark:border-zinc-700/70 hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/50 hover:bg-orange-50/20 dark:hover:bg-orange-950/20 font-medium bg-white/40 dark:bg-zinc-800/30",
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  className={cn(
                    "shrink-0 transition-colors",
                    isCompact ? "w-3.5 h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4",
                    isActive
                      ? "text-[#FF6B00]"
                      : "text-gray-500 dark:text-zinc-400",
                  )}
                  strokeWidth={isActive ? 2.2 : 1.9}
                />
                {editingTabId === tab.id ? (
                  <input
                    autoFocus
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => handleRenameTab(tab.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameTab(tab.id);
                    }}
                    className={cn(
                      "bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[#1C1C1C] dark:text-zinc-100",
                      isCompact
                        ? "w-20 text-[12px]"
                        : "w-24 sm:w-32 text-[13px] sm:text-[14px]",
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <span
                      className="whitespace-nowrap truncate max-w-[100px] sm:max-w-none"
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingTabId(tab.id);
                        setEditingName(tab.label);
                      }}
                    >
                      {tab.label}
                    </span>
                    <div className="flex items-center gap-1 sm:gap-1.5 ml-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTabId(tab.id);
                          setEditingName(tab.label);
                        }}
                        className={cn(
                          "p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0 border-0 bg-transparent flex items-center justify-center",
                          isActive
                            ? "text-[#FF6B00] dark:text-[#FF6B00] opacity-80 hover:opacity-100"
                            : "text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-60 sm:opacity-0 sm:group-hover:opacity-100",
                        )}
                        title="Rename tab"
                        aria-label="Rename tab"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                      {tabs.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => onCloseTab(tab.id, e)}
                          className={cn(
                            "p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0 border-0 bg-transparent flex items-center justify-center",
                            isActive
                              ? "text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200 opacity-80 hover:opacity-100"
                              : "text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-60 sm:opacity-0 sm:group-hover:opacity-100",
                          )}
                          title="Close tab"
                          aria-label="Close tab"
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={2.2} />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddNewTab) {
                onAddNewTab();
              } else {
                const newId = Date.now();
                const newTab: TabState = {
                  id: newId,
                  icon: MessageSquare,
                  label: "New Chat",
                  kind: "chat",
                  messages: [],
                  draftInput: "",
                  attachments: [],
                };
                setTabs((prev) => [...prev, newTab]);
                setActiveTab(newId);
              }
            }}
            className={cn(
              "flex items-center justify-center rounded-full transition-all cursor-pointer shrink-0 border",
              isCompact ? "w-6 h-6" : "w-7 h-7 sm:w-7.5 sm:h-7.5",
              isIncognito
                ? "text-zinc-300 hover:text-white hover:bg-white/10 border-white/20 hover:border-zinc-400 bg-white/5"
                : "text-gray-600 hover:text-[#FF6B00] dark:text-zinc-300 dark:hover:text-[#FF6B00] hover:bg-orange-50/50 dark:hover:bg-zinc-800 border-gray-300/90 dark:border-zinc-700 hover:border-[#FF6B00]/50 bg-white/70 dark:bg-zinc-800/50 shadow-2xs",
            )}
            title="New Chat"
            aria-label="New Chat"
          >
            <Plus className={isCompact ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-4.5 sm:h-4.5"} strokeWidth={2.4} />
          </button>
        </div>

        {isAddingTab && (
          <div
            className={cn(
              "border-t",
              isIncognito ? "border-white/10" : "border-gray-100 dark:border-zinc-800",
            )}
          >
            <div
              className={cn(
                isIncognito ? "bg-black/25" : "bg-gray-50/50 dark:bg-zinc-900/50",
                isCompact ? "p-2.5" : "p-3.5 sm:p-4.5",
              )}
            >
              <div
                className={cn(
                  "text-[11px] sm:text-[12px] font-bold uppercase tracking-wider px-1 mb-2",
                  isIncognito ? "text-zinc-400" : "text-[#64748b]",
                )}
              >
                Quick AI Modes
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {rivinityFeatures.map((feature) => {
                  const isSelected = tabs.find((t) => t.id === activeTab)?.label === feature.label;
                  return (
                    <button
                      key={feature.label}
                      type="button"
                      onClick={() => {
                        const currentTabObj = tabs.find((t) => t.id === activeTab);
                        const hasMessages = currentTabObj && currentTabObj.messages.length > 0;
                        if (hasMessages) {
                          const newId = Date.now();
                          const newTab: TabState = {
                            id: newId,
                            icon: feature.icon,
                            label: feature.label,
                            kind: feature.kind,
                            messages: [],
                            draftInput: "",
                            attachments: [],
                          };
                          setTabs((p) => [...p, newTab]);
                          setActiveTab(newId);
                          setInput("");
                        } else {
                          setTabs((p) =>
                            p.map((t) =>
                              t.id === activeTab
                                ? { ...t, icon: feature.icon, label: feature.label, kind: feature.kind }
                                : t,
                            ),
                          );
                        }
                        setIsAddingTab(false);
                        textareaRef.current?.focus();
                      }}
                      className={cn(
                        "flex items-center gap-2.5 p-2 rounded-xl text-left border cursor-pointer",
                        isSelected
                          ? "bg-orange-50 border-[#FF6B00]/40 dark:bg-orange-900/10 dark:border-[#FF6B00]/30"
                          : isIncognito
                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                            : "bg-white hover:bg-[#f1f5f9] border-[#e2e8f0] dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700",
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          isSelected
                            ? "bg-orange-100 text-[#FF6B00] dark:bg-orange-900/20"
                            : isIncognito
                              ? "bg-white/10 text-zinc-300"
                              : "bg-slate-100 text-slate-900 dark:bg-zinc-700 dark:text-zinc-200",
                        )}
                      >
                        <feature.icon className="w-4 h-4" aria-hidden="true" strokeWidth={2} />
                      </div>
                      <div
                        className={cn(
                          "text-[12px] font-semibold truncate",
                          isSelected
                            ? "text-[#FF6B00]"
                            : isIncognito
                              ? "text-zinc-200"
                              : "text-[#0f172a] dark:text-zinc-100",
                        )}
                      >
                        {feature.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {skillPickerOpen && (
          <div
            className={cn(
              "border-t",
              isIncognito ? "border-white/10" : "border-gray-100 dark:border-zinc-800",
            )}
          >
            <div className={cn(isIncognito ? "bg-black/25" : "bg-[#f8fafc] dark:bg-zinc-900/60")}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 border-b",
                  isIncognito ? "border-white/10" : "border-gray-100 dark:border-zinc-800",
                )}
              >
                <div
                  className={cn(
                    "text-[11px] sm:text-[12px] font-bold uppercase tracking-wider shrink-0",
                    isIncognito ? "text-zinc-400" : "text-[#64748b]",
                  )}
                >
                  Skills
                </div>
                <input
                  value={skillQuery}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  placeholder="Search skills to run…"
                  className={cn(
                    "bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[13px] flex-1 min-w-0",
                    isIncognito
                      ? "text-white placeholder:text-zinc-500"
                      : "text-[#1C1C1C] dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500",
                  )}
                />
                <span className="text-[12px] text-gray-400 dark:text-zinc-500 shrink-0">
                  {filteredSkills.length} available
                </span>
              </div>
              <div className="max-h-[216px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#e2e8f0_transparent]">
                {filteredSkills.length === 0 ? (
                  <div className="py-6 text-center text-[13px] text-gray-400 dark:text-zinc-500">
                    No skills found matching &ldquo;{skillQuery}&rdquo;
                  </div>
                ) : (
                  filteredSkills.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onRunSkill(s.id)}
                      className={cn(
                        "bg-transparent w-full text-left px-4 py-[17px] flex items-center justify-between gap-4 cursor-pointer border-b last:border-0",
                        isIncognito
                          ? "hover:bg-white/10 border-white/10"
                          : "hover:bg-white dark:hover:bg-zinc-800 border-gray-100 dark:border-zinc-800/40",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className={cn(
                            "text-[13px] font-bold truncate",
                            isIncognito ? "text-zinc-100" : "text-slate-900 dark:text-zinc-100",
                          )}
                        >
                          {s.name}
                        </div>
                        <div
                          className={cn(
                            "text-[11.5px] font-normal leading-relaxed mt-0.5 truncate",
                            isIncognito ? "text-zinc-400" : "text-slate-500 dark:text-zinc-400",
                          )}
                        >
                          {s.summary}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-[0.1em] font-extrabold text-[#FF6B00] border border-[#FF6B00]/70 px-2.5 py-0.5 rounded-full shrink-0",
                          isIncognito ? "bg-white/10" : "bg-white dark:bg-zinc-900",
                        )}
                      >
                        {s.category}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}


        {attachments && attachments.length > 0 && (
          <div className="px-3 sm:px-4 pt-2.5 pb-1 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-t border-gray-100/80 dark:border-zinc-800/80">
            {attachments.map((file) => (
              <div
                key={file.id}
                onClick={() => {
                  if (file.status === "ready") onPreviewFile?.(file);
                }}
                className={cn(
                  "group/file relative flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white dark:bg-[#18181b] border border-gray-200 dark:border-zinc-800 shadow-xs hover:border-gray-300 dark:hover:border-zinc-700 transition-all shrink-0 max-w-[240px] sm:max-w-[260px] overflow-hidden",
                  file.status === "ready" ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-[#202025]" : "cursor-default",
                )}
              >
                {file.status === "uploading" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent -translate-x-full animate-[pulse_1.2s_infinite] pointer-events-none" />
                )}

                {file.status === "uploading" ? (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 border-t-[#FF5500] dark:border-t-white animate-spin shrink-0" />
                ) : file.type === "image" && file.url ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-8 h-8 rounded-lg object-cover border border-zinc-200/80 dark:border-zinc-700 shrink-0 bg-white"
                  />
                ) : file.type === "pdf" || file.name.toLowerCase().endsWith(".pdf") ? (
                  <div className="w-7 h-7 rounded-lg flex flex-col items-center justify-center text-rose-500 shrink-0">
                    <FileText className="w-4 h-4" />
                    <span className="text-[7.5px] font-extrabold -mt-0.5 tracking-tighter">
                      PDF
                    </span>
                  </div>
                ) : file.type === "code" ? (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-purple-500 shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0">
                    <FileIcon className="w-4 h-4" />
                  </div>
                )}

                <div className="flex flex-col min-w-0 pr-0.5">
                  <span className="text-[13px] font-medium sm:font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight group-hover/file:text-[#FF5500] transition-colors">
                    {file.name}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-tight mt-0.5">
                    {file.status === "uploading"
                      ? "Uploading..."
                      : getFileCategoryLabel(file)}
                  </span>
                </div>

                {onRemoveAttachment && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveAttachment(file.id);
                    }}
                    className="w-6 h-6 rounded-full text-zinc-400 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-black/8 dark:hover:bg-white/15 flex items-center justify-center transition-all cursor-pointer shrink-0 ml-auto"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isIncognito ? "Ask me anything (Incognito mode)..." : "Ask anything..."}
          rows={1}
          className={cn(
            "w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3.5 sm:px-4.5 pt-2 sm:pt-2.5 pb-1",
            isIncognito
              ? "text-white placeholder:text-zinc-500"
              : "text-[#0f172a] dark:text-zinc-100 placeholder:text-[#94a3b8]",
          )}
          style={{ minHeight: isCompact ? "38px" : "46px", outline: "none" }}
        />

        <div
          className={cn(
            "flex items-center justify-between w-full",
            isCompact
              ? "px-2.5 pb-2 pt-0.5"
              : "px-3 sm:px-4 pb-2 sm:pb-2.5 pt-0.5",
          )}
        >
          <div
            className={cn(
              "flex items-center min-w-0",
              isCompact ? "gap-0.5" : "gap-0.5 sm:gap-1",
            )}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                isIncognito
                  ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                  : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
              )}
              title="Attach context file"
            >
              <Paperclip className="w-4 h-4 shrink-0" strokeWidth={2} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  onAttachFiles?.(files);
                  e.target.value = "";
                }
              }}
            />

            <button
              type="button"
              onClick={() => {
                const next = !isAddingTab;
                setIsAddingTab(next);
                if (next) setSkillPickerOpen(false);
              }}
              className={cn(
                "transition-colors cursor-pointer shrink-0 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center bg-transparent",
                isAddingTab
                  ? isIncognito
                    ? "!bg-[#FF6B00]/25 text-[#FF6B00]"
                    : "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                  : isIncognito
                    ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                    : "hover:!bg-slate-100 dark:hover:!bg-zinc-800 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100",
              )}
              title="Add tool"
            >
              <Plus className="w-4 h-4 shrink-0" strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={() => setIsWebSearchActive((prev) => !prev)}
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                isWebSearchActive
                  ? isIncognito
                    ? "!bg-sky-500/25 text-sky-400"
                    : "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                  : isIncognito
                    ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                    : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
              )}
              title={isWebSearchActive ? "Web search active (Click to disable)" : "Search web (Click to enable)"}
            >
              <Globe className="w-4 h-4" strokeWidth={2} />
            </button>

            <button
              ref={skillButtonRef}
              type="button"
              onClick={() => {
                const next = !skillPickerOpen;
                setSkillPickerOpen(next);
                if (next) setIsAddingTab(false);
              }}
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                skillPickerOpen
                  ? isIncognito
                    ? "!bg-[#FF6B00]/25 text-[#FF6B00]"
                    : "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                  : isIncognito
                    ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                    : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
              )}
              title="Skills"
            >
              <Wand2
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  skillPickerOpen
                    ? "text-[#FF5500]"
                    : isIncognito
                      ? "text-zinc-400"
                      : "text-slate-500 dark:text-zinc-400",
                )}
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsIncognito((prev) => {
                  const next = !prev;
                  if (next) {
                    toast.info(
                      "Incognito mode active: Chats will not be saved to history.",
                    );
                  } else {
                    toast.info("Incognito mode disabled.");
                  }
                  return next;
                });
              }}
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0",
                isIncognito
                  ? "!bg-white/20 text-white shadow-xs ring-1 ring-white/30"
                  : "bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
              )}
              title={
                isIncognito
                  ? "Incognito mode active (Chats are not saved)"
                  : "Incognito mode (Don't save chat history)"
              }
            >
              <HatGlasses className="w-4 h-4 shrink-0" strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
            <button
              type="button"
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                isIncognito
                  ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                  : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
              )}
              title="Voice input"
            >
              <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={onSend}
              disabled={!canSend}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all",
                canSend
                  ? "!bg-[#FF6B00] hover:!bg-[#E66000] text-white shadow-[0_2px_8px_rgba(255,107,0,0.30)] active:scale-95"
                  : isIncognito
                    ? "!bg-white/10 text-white/35 cursor-not-allowed border border-white/5"
                    : "!bg-[#FFD5C2] dark:!bg-[#5a2e1d] text-white opacity-85 cursor-not-allowed",
              )}
              title="Send prompt"
            >
              <ArrowUpRight
                className={cn(
                  "w-4.5 h-4.5 shrink-0",
                  canSend ? "text-white" : isIncognito ? "text-white/40" : "text-white",
                )}
                strokeWidth={2.4}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ChatThinkingIndicator: React.FC = React.memo(() => {
  return (
    <div className="w-full flex items-start gap-2 sm:gap-2.5 justify-start">
      <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 flex items-center justify-center shrink-0 mt-1.5 sm:mt-2.5 select-none">
        <img
          src="/watermark.png"
          alt="Rivinity"
          width={32}
          height={32}
          style={{ width: "100%", height: "100%", maxWidth: "32px", maxHeight: "32px" }}
          className="w-6.5 h-6.5 sm:w-8 sm:h-8 object-contain"
        />
      </div>

      <div className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-xs bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        <LoaderGooeyBlobs size={9} color="#FF5500" duration={1.4} />
      </div>
    </div>
  );
});
ChatThinkingIndicator.displayName = "ChatThinkingIndicator";

export interface CanvasMainProps {
  onChatStateChange?: (isStarted: boolean) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const CanvasMain: React.FC<CanvasMainProps> = ({
  onChatStateChange,
  onToggleSidebar,
}) => {
  const router = useRouter();
  const [tabs, setTabs] = useState<TabState[]>([
    {
      id: 1,
      icon: MessageSquare,
      label: "New Chat",
      kind: "chat",
      messages: [],
      draftInput: "",
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [isThinking, setIsThinking] = useState(false);
  const [skillPickerOpen, setSkillPickerOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const [isDashboardDismissed, setIsDashboardDismissed] = useState(false);
  const [mobileTab, setMobileTab] = useState<"chat" | "dashboard">("dashboard");
  const [previewFile, setPreviewFile] = useState<AttachedFile | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [activeWorkspace, setActiveWorkspace] = useState<{
    id: string;
    name: string;
    topic?: string;
    description?: string;
    accentColor?: string;
    bannerGradient?: string;
  } | null>(null);
  const [workspaceChats, setWorkspaceChats] = useState<any[]>([]);
  const [workspaceMenuChatId, setWorkspaceMenuChatId] = useState<string | null>(null);
  const [moveSubmenuOpen, setMoveSubmenuOpen] = useState(false);
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [renameChatTitle, setRenameChatTitle] = useState<string>("");
  const workspaceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (
        workspaceMenuRef.current &&
        !workspaceMenuRef.current.contains(e.target as Node)
      ) {
        setWorkspaceMenuChatId(null);
        setMoveSubmenuOpen(false);
      }
    };
    if (workspaceMenuChatId) {
      document.addEventListener("mousedown", handleDocClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
    };
  }, [workspaceMenuChatId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find((t) => t.id === activeTabId) ||
    tabs[0] || {
      id: 1,
      icon: MessageSquare,
      label: "New Chat",
      kind: "chat" as TabKind,
      messages: [],
      draftInput: "",
    };
  const messages = currentTab.messages;
  const input = currentTab.draftInput;

  const { isAuthenticated, openAuth, isOpen: isAuthOpen } = useAuthModal();

  interface PendingGuestResponse {
    tabId: number;
    responseContent: string;
    hasBigDataKeyword: boolean;
  }
  const [pendingGuestResponse, setPendingGuestResponse] = useState<PendingGuestResponse | null>(null);
  const prevAuthOpenRef = useRef(isAuthOpen);

  useEffect(() => {
    if (isAuthenticated && pendingGuestResponse) {
      const { tabId, responseContent, hasBigDataKeyword } = pendingGuestResponse;
      setPendingGuestResponse(null);

      setTabs((prev) =>
        prev.map((t) =>
          t.id === tabId
            ? {
                ...t,
                messages: [
                  ...t.messages,
                  {
                    id: Date.now() + 1,
                    role: "ai",
                    content: responseContent,
                  },
                ],
              }
            : t,
        ),
      );
      setIsThinking(false);

      if (hasBigDataKeyword) {
        setIsDashboardDismissed(false);
        setSplitPercent(50);
        setMobileTab("dashboard");
        window.dispatchEvent(
          new CustomEvent("split-ratio-change", { detail: { ratio: 50 } }),
        );
      }
    }
  }, [isAuthenticated, pendingGuestResponse]);

  useEffect(() => {
    if (prevAuthOpenRef.current && !isAuthOpen && !isAuthenticated && pendingGuestResponse) {
      setIsThinking(false);
      setPendingGuestResponse(null);
    }
    prevAuthOpenRef.current = isAuthOpen;
  }, [isAuthOpen, isAuthenticated, pendingGuestResponse]);

  const setInput = useCallback(
    (val: string) => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, draftInput: val } : t)),
      );
    },
    [activeTabId],
  );

  useEffect(() => {
    try {
      const pendingChatRaw =
        sessionStorage.getItem("rivinity_active_chat") ||
        localStorage.getItem("rivinity_active_chat");
      if (pendingChatRaw) {
        sessionStorage.removeItem("rivinity_active_chat");
        localStorage.removeItem("rivinity_active_chat");
        const parsed = JSON.parse(pendingChatRaw);
        if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          const tabId = Date.now();
          let isItemPinned = false;
          try {
            const storedPinned = localStorage.getItem("rivinity_pinned_items_v2");
            if (storedPinned) {
              const list = JSON.parse(storedPinned);
              if (Array.isArray(list) && (list.includes(parsed.id) || (parsed.title && list.includes(parsed.title)))) {
                isItemPinned = true;
              }
            }
          } catch {}

          setTabs([
            {
              id: tabId,
              icon: MessageSquare,
              label: parsed.title || "Chat",
              kind: "chat",
              messages: parsed.messages,
              draftInput: "",
              isPinned: isItemPinned,
              historyId: parsed.id,
            },
          ]);
          setActiveTabId(tabId);
        }
      }
    } catch {}

    try {
      const pending = sessionStorage.getItem("rivinity_pending_prompt");
      if (pending) {
        sessionStorage.removeItem("rivinity_pending_prompt");
        setInput(pending);
      }
    } catch {}
  }, [setInput]);

  useEffect(() => {
    const checkWorkspaceParam = () => {
      try {
        let wsId =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("workspace")
            : null;
        if (!wsId && typeof window !== "undefined") {
          wsId = localStorage.getItem("rivinity_active_workspace_id");
        }
        if (wsId) {
          let wsObj: any = null;
          const rawObj = localStorage.getItem("rivinity_active_workspace_obj");
          if (rawObj) {
            try {
              wsObj = JSON.parse(rawObj);
            } catch {}
          }
          if (!wsObj || wsObj.id !== wsId) {
            const rawList = localStorage.getItem("rivinity_workspaces_v4");
            if (rawList) {
              try {
                const list = JSON.parse(rawList);
                if (Array.isArray(list)) {
                  wsObj = list.find((w: any) => w.id === wsId);
                }
              } catch {}
            }
          }
          if (!wsObj) {
            const defaultWorkspaces = [
              {
                id: "ws-email",
                name: "Email Responder",
                description:
                  "Automate customer support email drafting & context-aware replies",
              },
              {
                id: "ws-agents",
                name: "Autonomous AI Agents",
                description:
                  "Multi-agent orchestration, tool-calling & reasoning graphs",
              },
              {
                id: "ws-growth",
                name: "Brand & Marketing",
                description:
                  "Campaign copywriting, interactive persona synthesis & social ads",
              },
              {
                id: "ws-infra",
                name: "Backend Optimizer",
                description:
                  "Next.js edge runtime, Redis idempotency keys & telemetry",
              },
              {
                id: "ws-legal",
                name: "Legal & Enterprise",
                description:
                  "Vendor MSA review, mutual NDAs & compliance verification",
              },
            ];
            wsObj = defaultWorkspaces.find((w) => w.id === wsId) || {
              id: wsId,
              name: wsId
                .replace(/^ws-/, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
              description: "Workspace knowledge context",
            };
          }

          setActiveWorkspace(wsObj);
          try {
            localStorage.setItem("rivinity_active_workspace_id", wsObj.id);
            localStorage.setItem("rivinity_active_workspace_obj", JSON.stringify(wsObj));
          } catch {}

          setTabs((prev) =>
            prev.map((t) =>
              t.messages.length === 0
                ? { ...t, workspaceId: wsObj.id }
                : t,
            ),
          );

          let histList: any[] = [];
          const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
          if (rawHistory) {
            try {
              histList = JSON.parse(rawHistory);
            } catch {}
          }
          if (!Array.isArray(histList) || histList.length === 0) {
            histList = [...initialHistoryItems];
            try {
              localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(histList));
            } catch {}
          }
          const chats = histList.filter((item: any) => item.workspaceId === wsId);
          setWorkspaceChats(chats);
        } else {
          setActiveWorkspace(null);
        }
      } catch {}
    };

    checkWorkspaceParam();

    const handleHistoryUpdated = () => {
      checkWorkspaceParam();
    };

    window.addEventListener("popstate", checkWorkspaceParam);
    window.addEventListener("workspace-selected", checkWorkspaceParam);
    window.addEventListener("history-updated", handleHistoryUpdated);
    return () => {
      window.removeEventListener("popstate", checkWorkspaceParam);
      window.removeEventListener("workspace-selected", checkWorkspaceParam);
      window.removeEventListener("history-updated", handleHistoryUpdated);
    };
  }, []);

  const handleAttachFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      if (!fileArray.length) return;

      const newAttachments: AttachedFile[] = fileArray.map((file) => {
        const fileType = getFileType(file);
        let url: string | undefined;
        try {
          url = URL.createObjectURL(file);
        } catch {
          url = undefined;
        }
        return {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: fileType,
          url,
          status: "uploading",
          progress: 0,
        };
      });

      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                attachments: [...(t.attachments || []), ...newAttachments],
              }
            : t,
        ),
      );

      newAttachments.forEach((att) => {
        setTimeout(() => {
          setTabs((prev) =>
            prev.map((t) =>
              t.id === activeTabId
                ? {
                    ...t,
                    attachments: (t.attachments || []).map((f) =>
                      f.id === att.id
                        ? { ...f, status: "ready", progress: 100 }
                        : f,
                    ),
                  }
                : t,
            ),
          );
        }, 850);
      });
    },
    [activeTabId],
  );

  const handleRemoveAttachment = useCallback(
    (id: string) => {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                attachments: (t.attachments || []).filter((f) => f.id !== id),
              }
            : t,
        ),
      );
    },
    [activeTabId],
  );

  const handleAddNewTab = useCallback(() => {
    const newId = Date.now();
    const newTab: TabState = {
      id: newId,
      icon: MessageSquare,
      label: "New Chat",
      kind: "chat",
      messages: [],
      draftInput: "",
      attachments: [],
      workspaceId: activeWorkspace?.id,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);

    if (activeWorkspace?.id) {
      try {
        const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
        if (rawHistory) {
          const histList = JSON.parse(rawHistory);
          if (Array.isArray(histList)) {
            const chats = histList.filter(
              (item: any) => item.workspaceId === activeWorkspace.id,
            );
            setWorkspaceChats(chats);
          }
        }
      } catch {}
    }
  }, [activeWorkspace?.id]);

  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [showChatFilesModal, setShowChatFilesModal] = useState(false);
  const chatMenuRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOpenTab = (e: Event) => {
      const ce = e as CustomEvent<{ label?: string }>;
      const targetLabel = ce.detail?.label || "";
      if (!targetLabel) return;

      setTabs((prev) => {
        const found = prev.find(
          (t) => t.label.toLowerCase() === targetLabel.toLowerCase(),
        );
        if (found) {
          setActiveTabId(found.id);
          return prev;
        }

        const activeIndex = prev.findIndex((t) => t.id === activeTabId);
        if (activeIndex !== -1 && prev[activeIndex].messages.length === 0) {
          return prev.map((t) =>
            t.id === activeTabId
              ? {
                  ...t,
                  icon: getTabIcon(targetLabel),
                  label: targetLabel,
                  kind: getTabKind(targetLabel),
                }
              : t,
          );
        }

        const newTab: TabState = {
          id: Date.now(),
          icon: getTabIcon(targetLabel),
          label: targetLabel,
          kind: getTabKind(targetLabel),
          messages: [],
          draftInput: "",
        };
        setActiveTabId(newTab.id);
        return [...prev, newTab];
      });
    };

    const handleNewChat = () => {
      handleAddNewTab();
    };

    window.addEventListener("open-tab", handleOpenTab);
    window.addEventListener("rivinity:new-chat", handleNewChat);
    return () => {
      window.removeEventListener("open-tab", handleOpenTab);
      window.removeEventListener("rivinity:new-chat", handleNewChat);
    };
  }, [handleAddNewTab]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const newPercent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(Math.max(newPercent, 15), 85);
      setSplitPercent(clamped);
      window.dispatchEvent(
        new CustomEvent("split-ratio-change", { detail: { ratio: clamped } }),
      );
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (
        !isDraggingRef.current ||
        !splitContainerRef.current ||
        !moveEvent.touches[0]
      )
        return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const clientX = moveEvent.touches[0].clientX;
      const newPercent = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(Math.max(newPercent, 15), 85);
      setSplitPercent(clamped);
      window.dispatchEvent(
        new CustomEvent("split-ratio-change", { detail: { ratio: clamped } }),
      );
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  }, []);

  const handleResetSplit = useCallback(() => {
    setSplitPercent(50);
    window.dispatchEvent(
      new CustomEvent("split-ratio-change", { detail: { ratio: 50 } }),
    );
    toast("Reset layout to 50/50");
  }, []);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    if (isEmpty && activeWorkspace?.id) {
      try {
        const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
        if (rawHistory) {
          const histList = JSON.parse(rawHistory);
          if (Array.isArray(histList)) {
            const chats = histList.filter(
              (item: any) => item.workspaceId === activeWorkspace.id,
            );
            setWorkspaceChats(chats);
          }
        }
      } catch {}
    }
  }, [isEmpty, activeTabId, activeWorkspace?.id]);

  const hasBigDataInPrompt = messages.some(
    (m) => m.role === "user" && /big\s*data/i.test(m.content),
  );
  const isDashboardActive = hasBigDataInPrompt && !isDashboardDismissed;

  useEffect(() => {
    onChatStateChange?.(!isEmpty);
    window.dispatchEvent(
      new CustomEvent("chat-state-change", {
        detail: {
          isStarted: !isEmpty,
          isSplit: isDashboardActive,
          tabKind: currentTab.kind,
          tabLabel: currentTab.label,
        },
      }),
    );
  }, [
    isEmpty,
    onChatStateChange,
    isDashboardActive,
    currentTab.kind,
    currentTab.label,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) {
      const freshId = Date.now();
      setTabs([
        {
          id: freshId,
          icon: MessageSquare,
          label: "New Chat",
          kind: "chat",
          messages: [],
          draftInput: "",
          workspaceId: activeWorkspace?.id,
        },
      ]);
      setActiveTabId(freshId);
      return;
    }
    const idx = tabs.findIndex((t) => t.id === id);
    if (activeTabId === id) {
      const next = tabs[idx + 1] || tabs[idx - 1];
      if (next) setActiveTabId(next.id);
    }
    setTabs((prev) => prev.filter((t) => t.id !== id));
  };

  const appendTabMessage = (msg: MessageItem) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId ? { ...t, messages: [...t.messages, msg] } : t,
      ),
    );
  };

  const handleSend = (customText?: string) => {
    const textToSend = typeof customText === "string" ? customText : (input || "");
    const trimmed = textToSend.trim();
    const currentAttachments = currentTab.attachments || [];
    if ((!trimmed && currentAttachments.length === 0) || isThinking) return;

    const isBuilderTab =
      currentTab.label === "Fullstack Builder" ||
      currentTab.label === "Frontend Builder" ||
      currentTab.label.toLowerCase().includes("builder");
    const isBuilderPrompt =
      /\[Mode:\s*(Fullstack Builder|Frontend Builder)\]/i.test(trimmed);

    if (isBuilderTab || isBuilderPrompt) {
      const cleanPrompt = trimmed
        .replace(/\[Mode:\s*(Fullstack Builder|Frontend Builder)\]/gi, "")
        .trim();
      const mode = currentTab.label.includes("Builder")
        ? currentTab.label
        : (trimmed.toLowerCase().includes("frontend")
            ? "Frontend Builder"
            : "Fullstack Builder");
      try {
        sessionStorage.setItem(
          "rivinity_pending_builder_prompt",
          cleanPrompt || trimmed,
        );
        sessionStorage.setItem("rivinity_pending_builder_mode", mode);
      } catch {}
      setInput("");
      router.push("/app-builder");
      return;
    }

    const isImageTab =
      currentTab.label === "Image Enhancer" ||
      currentTab.label.toLowerCase().includes("image");
    const isImagePrompt =
      /\[Mode:\s*(Image Enhancer)\]/i.test(trimmed);

    if (isImageTab || isImagePrompt) {
      const cleanPrompt = trimmed
        .replace(/\[Mode:\s*(Image Enhancer)\]/gi, "")
        .trim();
      try {
        sessionStorage.setItem(
          "rivinity_pending_image_prompt",
          cleanPrompt || trimmed,
        );
      } catch {}
      setInput("");
      router.push("/image-generation");
      return;
    }

    const isAudioTab =
      currentTab.label === "Audio Lab" ||
      currentTab.label.toLowerCase().includes("audio");
    const isAudioPrompt =
      /\[Mode:\s*(Audio Lab)\]/i.test(trimmed);

    if (isAudioTab || isAudioPrompt) {
      const cleanPrompt = trimmed
        .replace(/\[Mode:\s*(Audio Lab)\]/gi, "")
        .trim();
      try {
        sessionStorage.setItem(
          "rivinity_pending_audio_prompt",
          cleanPrompt || trimmed,
        );
      } catch {}
      setInput("");
      router.push("/audio-lab");
      return;
    }

    setInput("");

    if (!isAuthenticated && currentTab.messages.length >= 2) {
      toast.info("Please sign up to continue chatting.");
      openAuth("signup");
      return;
    }

    const targetWorkspaceId = activeWorkspace?.id || currentTab.workspaceId;

    const hasBigDataKeyword = /big\s*data/i.test(trimmed);

    const isFirst = currentTab.messages.length === 0;
    const dynamicTitle = trimmed
      ? trimmed.length > 24
        ? trimmed.slice(0, 24) + "…"
        : trimmed
      : currentAttachments[0]?.name
        ? currentAttachments[0].name.slice(0, 24)
        : "Attached File";

    const chatId = currentTab.historyId || `chat-${Date.now()}`;
    const userMsgId = Date.now();
    const userMsg: MessageItem = {
      id: userMsgId,
      role: "user",
      content: trimmed,
      attachments: [...currentAttachments],
    };

    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              label:
                isFirst ||
                t.label.startsWith("Rivinity") ||
                t.label === "New Chat"
                  ? dynamicTitle
                  : t.label,
              historyId: chatId,
              workspaceId: targetWorkspaceId,
              messages: [
                ...t.messages,
                userMsg,
              ],
              draftInput: "",
              attachments: [],
            }
          : t,
      ),
    );

    setIsThinking(true);

    if (hasBigDataKeyword) {
      setIsDashboardDismissed(false);
      setSplitPercent(50);
      setMobileTab("dashboard");
      window.dispatchEvent(
        new CustomEvent("split-ratio-change", { detail: { ratio: 50 } }),
      );
    }

    const responseContent = hasBigDataKeyword
      ? `Analyzed query: "${trimmed || "attached files"}". Generating Big Data D&I Feasibility Analysis dashboard on the right.`
      : currentAttachments.length > 0
        ? `Analyzed ${currentAttachments.length} attached file(s) and query: "${trimmed || "Analyzing uploaded document/image context"}". Extracted key features and integrated with reasoning model.`
        : `Analyzed query: "${trimmed}". Processing context across loaded index agents.`;

    if (targetWorkspaceId) {
      const todayFormatted = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const newChatItem = {
        id: chatId,
        name: dynamicTitle,
        subtitle:
          trimmed.length > 80
            ? trimmed.slice(0, 80) + "…"
            : trimmed || "Interactive chat conversation",
        category: "CHAT" as const,
        workspaceId: targetWorkspaceId,
        modified: "Just now",
        dateStr: todayFormatted,
        prompt: trimmed || "Interactive chat prompt",
        response: responseContent,
        tokens: 1200,
        cost: "$0.002",
        durationMs: 450,
        messages: [...currentTab.messages, userMsg],
      };

      if (activeWorkspace && activeWorkspace.id === targetWorkspaceId) {
        setWorkspaceChats((prev) => {
          const filtered = prev.filter((c) => c.id !== chatId);
          return [newChatItem, ...filtered];
        });
      }

      try {
        const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
        let histList: any[] = [];
        if (rawHistory) {
          try {
            histList = JSON.parse(rawHistory);
          } catch {}
        }
        if (!Array.isArray(histList) || histList.length === 0) {
          histList = [...initialHistoryItems];
        }
        const existIdx = histList.findIndex((h: any) => h.id === chatId);
        if (existIdx >= 0) {
          histList[existIdx] = { ...histList[existIdx], ...newChatItem };
        } else {
          histList.unshift(newChatItem);
        }
        localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(histList));
        window.dispatchEvent(new CustomEvent("history-updated"));
      } catch (err) {
        console.error("Error saving workspace chat to history", err);
      }
    }

    if (!isAuthenticated) {
      setPendingGuestResponse({
        tabId: activeTabId,
        responseContent,
        hasBigDataKeyword,
      });

      setTimeout(() => {
        openAuth("signup");
      }, 900);
      return;
    }

    setTimeout(() => {
      const aiMsgId = Date.now() + 1;
      const aiMsg: MessageItem = {
        id: aiMsgId,
        role: "ai",
        content: responseContent,
      };
      appendTabMessage(aiMsg);
      setIsThinking(false);

      if (targetWorkspaceId) {
        if (activeWorkspace && activeWorkspace.id === targetWorkspaceId) {
          setWorkspaceChats((prev) =>
            prev.map((c) =>
              c.id === chatId
                ? {
                    ...c,
                    response: responseContent,
                    messages: [...(c.messages || []), aiMsg],
                  }
                : c,
            ),
          );
        }
        try {
          const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
          if (rawHistory) {
            const histList = JSON.parse(rawHistory);
            if (Array.isArray(histList)) {
              const updated = histList.map((h: any) =>
                h.id === chatId
                  ? {
                      ...h,
                      response: responseContent,
                      messages: [...(h.messages || []), aiMsg],
                    }
                  : h,
              );
              localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
              window.dispatchEvent(new CustomEvent("history-updated"));
            }
          }
        } catch {}
      }
    }, 600);
  };

  const runSkill = (skillId: string) => {
    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) return;
    setSkillPickerOpen(false);
    setSkillQuery("");
    appendTabMessage({
      id: Date.now(),
      role: "user",
      content: `Run skill: ${skill.name}`,
    });
    setIsThinking(true);

    if (!isAuthenticated) {
      setPendingGuestResponse({
        tabId: activeTabId,
        responseContent: `${SKILL_MARKER}${skill.id}`,
        hasBigDataKeyword: false,
      });
      setTimeout(() => {
        openAuth("signup");
      }, 900);
      return;
    }

    setTimeout(() => {
      appendTabMessage({
        id: Date.now() + 1,
        role: "ai",
        content: `${SKILL_MARKER}${skill.id}`,
      });
      setIsThinking(false);
    }, 600);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        chatMenuRef.current &&
        !chatMenuRef.current.contains(e.target as Node)
      ) {
        setChatMenuOpen(false);
      }
    };
    if (chatMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatMenuOpen]);

  const currentChatFiles = currentTab.messages.flatMap(
    (m) => m.attachments || [],
  );

  const handleTogglePinChat = () => {
    setChatMenuOpen(false);
    const newPinnedState = !currentTab.isPinned;
    const historyId = currentTab.historyId || `c-${currentTab.id}`;

    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId ? { ...t, isPinned: newPinnedState, historyId } : t,
      ),
    );

    try {
      const storedPinned = localStorage.getItem("rivinity_pinned_items_v2");
      let pinnedList: string[] = storedPinned ? JSON.parse(storedPinned) : [];
      if (!Array.isArray(pinnedList)) pinnedList = [];

      const storedHistory = localStorage.getItem("rivinity_history_v4");
      let historyList: any[] = storedHistory ? JSON.parse(storedHistory) : [];
      if (!Array.isArray(historyList)) historyList = [];

      const matchedIdx = historyList.findIndex(
        (h) =>
          h.id === historyId ||
          (currentTab.label &&
            currentTab.label !== "New Chat" &&
            h.name?.toLowerCase() === currentTab.label.toLowerCase()),
      );

      const targetId = matchedIdx >= 0 ? historyList[matchedIdx].id : historyId;

      if (newPinnedState) {
        if (!pinnedList.includes(targetId)) pinnedList.push(targetId);
        if (currentTab.label && !pinnedList.includes(currentTab.label)) pinnedList.push(currentTab.label);

        if (matchedIdx >= 0) {
          historyList[matchedIdx].isPinned = true;
        } else {
          const userMsg =
            currentTab.messages.find((m) => m.role === "user")?.content || currentTab.label;
          const aiMsg =
            currentTab.messages.filter((m) => m.role === "ai").slice(-1)[0]?.content || "";

          historyList.unshift({
            id: targetId,
            name:
              currentTab.label !== "New Chat"
                ? currentTab.label
                : userMsg.slice(0, 40) || "Chat Session",
            subtitle: `${currentTab.messages.length || 1} messages • Interactive chat`,
            category: "CHAT",
            workspaceId: "ws-growth",
            modified: "Just now",
            dateStr: "Today",
            prompt: userMsg || "Chat conversation",
            response: aiMsg || "Assistant response",
            tokens: 1200,
            cost: "$0.002",
            durationMs: 450,
            isPinned: true,
          });
        }
      } else {
        pinnedList = pinnedList.filter(
          (id) => id !== targetId && id !== historyId && id !== currentTab.label,
        );
        if (matchedIdx >= 0) {
          historyList[matchedIdx].isPinned = false;
        }
      }

      localStorage.setItem("rivinity_pinned_items_v2", JSON.stringify(pinnedList));
      if (historyList.length > 0) {
        localStorage.setItem("rivinity_history_v4", JSON.stringify(historyList));
      }
    } catch (e) {
      console.error("Failed to sync pinned state to history", e);
    }

    toast.success(newPinnedState ? "Chat pinned" : "Chat unpinned");
  };

  const handleDeleteChat = () => {
    setChatMenuOpen(false);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteChat = () => {
    setShowDeleteConfirmModal(false);
    if (currentTab.historyId) {
      const hId = currentTab.historyId;
      setWorkspaceChats((prev) => prev.filter((c) => c.id !== hId));
      try {
        const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
        if (rawHistory) {
          const histList = JSON.parse(rawHistory);
          if (Array.isArray(histList)) {
            const filtered = histList.filter((h: any) => h.id !== hId);
            localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(filtered));
            window.dispatchEvent(new CustomEvent("history-updated"));
          }
        }
      } catch {}
    }
    if (tabs.length <= 1) {
      const freshId = Date.now();
      setTabs([
        {
          id: freshId,
          icon: MessageSquare,
          label: "New Chat",
          kind: "chat",
          messages: [],
          draftInput: "",
          workspaceId: activeWorkspace?.id,
        },
      ]);
      setActiveTabId(freshId);
    } else {
      const idx = tabs.findIndex((t) => t.id === activeTabId);
      const next = tabs[idx + 1] || tabs[idx - 1];
      if (next) setActiveTabId(next.id);
      setTabs((prev) => prev.filter((t) => t.id !== activeTabId));
    }
    toast.success("Chat conversation deleted");
  };

  const handleShareWorkspace = () => {
    if (!activeWorkspace) return;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/chat?workspace=${activeWorkspace.id}`
        : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Workspace link copied to clipboard!");
    } else {
      toast.info(`Workspace URL: ${url}`);
    }
  };

  const handleExitWorkspace = () => {
    setActiveWorkspace(null);
    try {
      localStorage.removeItem("rivinity_active_workspace_id");
      localStorage.removeItem("rivinity_active_workspace_obj");
      window.history.replaceState({}, "", "/chat");
    } catch {}
    toast.info("Switched to general chat");
  };

  const handleOpenWorkspaceChat = (chatItem: any) => {
    const existingTab = tabs.find((t) => t.historyId === chatItem.id);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const userPrompt = chatItem.prompt || chatItem.name;
    const aiResponse =
      chatItem.response || `Here is the conversation for ${chatItem.name}`;
    const loadedMessages: MessageItem[] =
      chatItem.messages &&
      Array.isArray(chatItem.messages) &&
      chatItem.messages.length > 0
        ? chatItem.messages
        : [
            {
              id: Date.now() - 1000,
              role: "user",
              content: userPrompt,
            },
            {
              id: Date.now(),
              role: "ai",
              content: aiResponse,
            },
          ];

    if (currentTab.messages.length === 0) {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                label: chatItem.name,
                messages: loadedMessages,
                historyId: chatItem.id,
                workspaceId: chatItem.workspaceId || activeWorkspace?.id,
              }
            : t,
        ),
      );
    } else {
      const newId = Date.now();
      const newTab: TabState = {
        id: newId,
        icon: MessageSquare,
        label: chatItem.name,
        kind: "chat",
        messages: loadedMessages,
        draftInput: "",
        historyId: chatItem.id,
        workspaceId: chatItem.workspaceId || activeWorkspace?.id,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newId);
    }
  };

  const getAvailableWorkspaces = () => {
    const defaultWorkspaces = [
      { id: "ws-email", name: "Email Support Responder" },
      { id: "ws-agents", name: "Autonomous AI Agents" },
      { id: "ws-growth", name: "Brand & Marketing" },
      { id: "ws-infra", name: "Backend Optimizer" },
      { id: "ws-legal", name: "Legal & Enterprise" },
    ];
    try {
      const rawWs = localStorage.getItem("rivinity_workspaces_v4");
      if (rawWs) {
        const parsed = JSON.parse(rawWs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((w: any) => ({ id: w.id, name: w.name }));
        }
      }
    } catch {}
    return defaultWorkspaces;
  };

  const handleShareWorkspaceChat = (chatItem: any) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/chat?workspace=${activeWorkspace?.id || ""}&chat=${chatItem.id}`
        : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Chat link copied to clipboard!");
    } else {
      toast.info(`Chat: ${chatItem.name}`);
    }
    setWorkspaceMenuChatId(null);
  };

  const handleSaveRenameChat = (chatId: string) => {
    const newTitle = renameChatTitle.trim();
    if (!newTitle) {
      setRenamingChatId(null);
      return;
    }
    setWorkspaceChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, name: newTitle } : c)),
    );
    setTabs((prev) =>
      prev.map((t) => (t.historyId === chatId ? { ...t, label: newTitle } : t)),
    );
    try {
      const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (rawHistory) {
        const histList = JSON.parse(rawHistory);
        if (Array.isArray(histList)) {
          const updated = histList.map((h: any) =>
            h.id === chatId ? { ...h, name: newTitle } : h,
          );
          localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("history-updated"));
        }
      }
    } catch {}
    toast.success("Chat renamed");
    setRenamingChatId(null);
    setWorkspaceMenuChatId(null);
  };

  const handlePinWorkspaceChat = (chatItem: any) => {
    const newPinned = !chatItem.isPinned;
    setWorkspaceChats((prev) =>
      prev.map((c) =>
        c.id === chatItem.id ? { ...c, isPinned: newPinned } : c,
      ),
    );
    setTabs((prev) =>
      prev.map((t) =>
        t.historyId === chatItem.id ? { ...t, isPinned: newPinned } : t,
      ),
    );
    try {
      const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (rawHistory) {
        const histList = JSON.parse(rawHistory);
        if (Array.isArray(histList)) {
          const updated = histList.map((h: any) =>
            h.id === chatItem.id ? { ...h, isPinned: newPinned } : h,
          );
          localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("history-updated"));
        }
      }
      const rawPinned = localStorage.getItem("rivinity_pinned_items_v2");
      let pinnedList: string[] = rawPinned ? JSON.parse(rawPinned) : [];
      if (!Array.isArray(pinnedList)) pinnedList = [];
      if (newPinned) {
        if (!pinnedList.includes(chatItem.id)) pinnedList.push(chatItem.id);
      } else {
        pinnedList = pinnedList.filter((id) => id !== chatItem.id);
      }
      localStorage.setItem(
        "rivinity_pinned_items_v2",
        JSON.stringify(pinnedList),
      );
    } catch {}
    toast.success(newPinned ? "Chat pinned" : "Chat unpinned");
    setWorkspaceMenuChatId(null);
  };

  const handleArchiveWorkspaceChat = (chatItem: any) => {
    const nowArchived = !chatItem.isArchived;
    setWorkspaceChats((prev) =>
      prev.map((c) =>
        c.id === chatItem.id ? { ...c, isArchived: nowArchived } : c,
      ),
    );
    try {
      const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (rawHistory) {
        const histList = JSON.parse(rawHistory);
        if (Array.isArray(histList)) {
          const updated = histList.map((h: any) =>
            h.id === chatItem.id ? { ...h, isArchived: nowArchived } : h,
          );
          localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("history-updated"));
        }
      }
    } catch {}
    toast.success(nowArchived ? "Chat archived" : "Chat unarchived");
    setWorkspaceMenuChatId(null);
  };

  const handleDeleteWorkspaceChat = (chatId: string) => {
    setWorkspaceChats((prev) => prev.filter((c) => c.id !== chatId));
    setTabs((prev) => prev.filter((t) => t.historyId !== chatId));
    try {
      const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (rawHistory) {
        const histList = JSON.parse(rawHistory);
        if (Array.isArray(histList)) {
          const updated = histList.filter((h: any) => h.id !== chatId);
          localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("history-updated"));
        }
      }
    } catch {}
    toast.success("Chat deleted");
    setWorkspaceMenuChatId(null);
  };

  const handleMoveChatToWorkspace = (
    chatId: string,
    targetWsId: string,
    targetWsName: string,
  ) => {
    setWorkspaceChats((prev) => prev.filter((c) => c.id !== chatId));
    setTabs((prev) =>
      prev.map((t) =>
        t.historyId === chatId ? { ...t, workspaceId: targetWsId } : t,
      ),
    );
    try {
      const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (rawHistory) {
        const histList = JSON.parse(rawHistory);
        if (Array.isArray(histList)) {
          const updated = histList.map((h: any) =>
            h.id === chatId ? { ...h, workspaceId: targetWsId } : h,
          );
          localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("history-updated"));
        }
      }
    } catch {}
    toast.success(`Moved chat to ${targetWsName}`);
    setWorkspaceMenuChatId(null);
    setMoveSubmenuOpen(false);
  };

  const handleRemoveChatFromWorkspace = (chatId: string) => {
    const wsName = activeWorkspace?.name || "workspace";
    setWorkspaceChats((prev) => prev.filter((c) => c.id !== chatId));
    setTabs((prev) =>
      prev.map((t) =>
        t.historyId === chatId ? { ...t, workspaceId: "" } : t,
      ),
    );
    try {
      const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (rawHistory) {
        const histList = JSON.parse(rawHistory);
        if (Array.isArray(histList)) {
          const updated = histList.map((h: any) =>
            h.id === chatId ? { ...h, workspaceId: "" } : h,
          );
          localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("history-updated"));
        }
      }
    } catch {}
    toast.success(`Removed from ${wsName}`);
    setWorkspaceMenuChatId(null);
  };

  const handleViewFilesInChat = () => {
    setChatMenuOpen(false);
    if (currentChatFiles.length === 0) {
      toast.info("No files attached in this conversation yet");
    } else {
      setShowChatFilesModal(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Rivinity AI Chat",
          text: "Check out this conversation on Rivinity AI",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Chat link copied to clipboard!");
    }
  };

  const isWriteMode = currentTab.kind === "write";

  const isCompact = splitPercent < 45 || (!isDesktop && isDashboardActive);
  const isUltraCompact = splitPercent < 32;

  const chatView = (
    <div className="flex-1 flex flex-col items-center justify-between min-w-0 min-h-0 h-full w-full relative overflow-hidden bg-[#f8fafc] dark:bg-zinc-950">
      {!isEmpty && activeWorkspace && (
        <div className="absolute top-2.5 sm:top-3 left-14 sm:left-16 lg:left-6 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const emptyTab = tabs.find(
                (t) =>
                  t.workspaceId === activeWorkspace.id &&
                  t.messages.length === 0,
              );
              if (emptyTab) {
                setActiveTabId(emptyTab.id);
              } else {
                handleAddNewTab();
              }
              try {
                const rawHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
                if (rawHistory) {
                  const histList = JSON.parse(rawHistory);
                  if (Array.isArray(histList)) {
                    const chats = histList.filter(
                      (item: any) => item.workspaceId === activeWorkspace.id,
                    );
                    setWorkspaceChats(chats);
                  }
                }
              } catch {}
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer border border-slate-200/60 dark:border-zinc-700 shadow-2xs group"
            title="Return to workspace view"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300 group-hover:-translate-x-0.5 transition-transform" />
            <Folder className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300" />
            <span className="max-w-[120px] sm:max-w-[180px] truncate">{activeWorkspace.name}</span>
          </button>
        </div>
      )}

      {!isEmpty && (
        <div className="absolute top-2 sm:top-2.5 right-2 sm:right-4 z-30 flex items-center gap-1 sm:gap-2" ref={chatMenuRef}>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl border-0 bg-transparent px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-slate-950 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-800 cursor-pointer"
            title="Share"
          >
            <Upload className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} />
            <span className="hidden xs:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={() => setChatMenuOpen((prev) => !prev)}
            className={cn(
              "flex items-center justify-center rounded-xl border-0 bg-transparent p-1.5 sm:p-2 text-slate-950 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-800 cursor-pointer",
              chatMenuOpen && "bg-gray-100 dark:bg-zinc-800",
            )}
            aria-label="More options"
          >
            <MoreHorizontal className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
          </button>

          {chatMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 rounded-2xl bg-white dark:bg-[#1c1c1f] text-gray-800 dark:text-zinc-100 border border-gray-200/90 dark:border-zinc-800 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={handleViewFilesInChat}
                className="bg-transparent flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-800 dark:text-zinc-100 hover:bg-gray-100/90 dark:hover:bg-white/10 transition-colors cursor-pointer text-left border-0"
              >
                <FileText className="w-4.5 h-4.5 shrink-0 text-gray-700 dark:text-zinc-300" />
                <span className="flex-1 truncate">View files in chat</span>
              </button>

              <button
                type="button"
                onClick={handleTogglePinChat}
                className="bg-transparent flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-800 dark:text-zinc-100 hover:bg-gray-100/90 dark:hover:bg-white/10 transition-colors cursor-pointer text-left border-0"
              >
                <Pin
                  className={cn(
                    "w-4.5 h-4.5 shrink-0 text-gray-700 dark:text-zinc-300",
                    currentTab.isPinned && "fill-amber-500 text-amber-500",
                  )}
                />
                <span className="flex-1 truncate">
                  {currentTab.isPinned ? "Unpin chat" : "Pin chat"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleDeleteChat}
                className="bg-transparent flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer text-left border-0"
              >
                <Trash2 className="w-4.5 h-4.5 shrink-0 text-red-500" />
                <span className="flex-1 truncate font-medium text-red-500">
                  Delete
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {!isEmpty && (
        <div className="absolute inset-0 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden">
          <img
            src="/watermark.png"
            alt=""
            width={520}
            height={520}
            style={{
              maxWidth: "min(520px, 80vw)",
              maxHeight: "min(520px, 80vh)",
              width: "100%",
              height: "auto",
              opacity: 0.05,
            }}
            className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] object-contain"
          />
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col items-center overflow-y-auto overflow-x-hidden relative z-10 w-full max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {isEmpty ? (
          activeWorkspace ? (
            <div className="relative flex-1 min-h-full flex flex-col items-center justify-start w-full px-4 sm:px-8 py-8 sm:py-12 my-auto animate-in fade-in duration-200">
              <div className="w-full max-w-[700px] mx-auto flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white tracking-tight truncate">
                    {activeWorkspace.name}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleShareWorkspace}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      <Share className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExitWorkspace}
                      className="w-8 h-8 rounded-full border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 shadow-2xs transition-colors cursor-pointer"
                      title="Exit workspace view"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative z-10 w-full flex justify-center">
                  <ChatComposer
                    input={input}
                    setInput={setInput}
                    onSend={handleSend}
                    tabs={tabs}
                    setTabs={setTabs}
                    activeTab={activeTabId}
                    setActiveTab={setActiveTabId}
                    onCloseTab={closeTab}
                    onAddNewTab={handleAddNewTab}
                    skillPickerOpen={skillPickerOpen}
                    setSkillPickerOpen={setSkillPickerOpen}
                    skillQuery={skillQuery}
                    setSkillQuery={setSkillQuery}
                    onRunSkill={runSkill}
                    disabled={isThinking}
                    isCompact={false}
                    attachments={currentTab.attachments || []}
                    onAttachFiles={handleAttachFiles}
                    onRemoveAttachment={handleRemoveAttachment}
                    onPreviewFile={setPreviewFile}
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs">
                    Chats
                  </span>
                </div>

                <div className="space-y-1">
                  {workspaceChats.length === 0 ? (
                    <div className="py-12 text-center space-y-2 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 p-6">
                      <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        No chats in this workspace yet
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-zinc-500">
                        Type a question above to start chatting with {activeWorkspace.name} context.
                      </div>
                    </div>
                  ) : (
                    workspaceChats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => {
                          if (renamingChatId === chat.id) return;
                          handleOpenWorkspaceChat(chat);
                        }}
                        className="relative group py-3 px-3.5 -mx-3.5 rounded-xl hover:bg-slate-100/70 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer border-b border-slate-100 dark:border-zinc-800/60 last:border-b-0"
                      >
                        {renamingChatId === chat.id ? (
                          <div
                            className="flex items-center gap-2 py-0.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="text"
                              value={renameChatTitle}
                              onChange={(e) => setRenameChatTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveRenameChat(chat.id);
                                if (e.key === "Escape") setRenamingChatId(null);
                              }}
                              autoFocus
                              className="flex-1 px-3 py-1.5 text-sm font-semibold rounded-xl border border-[#FF6B00] bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:outline-hidden ring-2 ring-[#FF6B00]/20 shadow-xs"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveRenameChat(chat.id)}
                              className="p-2 rounded-xl bg-[#FF6B00] text-white hover:bg-[#E05300] transition-colors cursor-pointer shadow-xs"
                              title="Save title"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setRenamingChatId(null)}
                              className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200 hover:bg-slate-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors truncate">
                                {chat.name}
                              </div>
                              {chat.isPinned && (
                                <Pin className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00] shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                                {chat.dateStr || "May 23"}
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setWorkspaceMenuChatId((prev) =>
                                    prev === chat.id ? null : chat.id,
                                  );
                                  setMoveSubmenuOpen(false);
                                }}
                                className={cn(
                                  "bg-transparent border-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all cursor-pointer",
                                  workspaceMenuChatId === chat.id
                                    ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white opacity-100"
                                    : "opacity-0 group-hover:opacity-100 focus:opacity-100",
                                )}
                                title="More options"
                                aria-label="More options"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="text-xs text-slate-500 dark:text-zinc-400 truncate mt-1 pr-6">
                          {chat.subtitle || chat.prompt || chat.response}
                        </div>

                        {workspaceMenuChatId === chat.id && (
                          <div
                            ref={workspaceMenuRef}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-11 w-52 rounded-2xl bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200/90 dark:border-zinc-800 shadow-xl shadow-slate-200/80 dark:shadow-black/70 p-1.5 z-50 select-none text-left animate-in fade-in zoom-in-95 duration-100"
                          >
                            <button
                              type="button"
                              onClick={() => handleShareWorkspaceChat(chat)}
                              className="bg-transparent border-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer w-full text-left"
                            >
                              <Share2 className="w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400 shrink-0" />
                              <span>Share</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setRenamingChatId(chat.id);
                                setRenameChatTitle(chat.name);
                                setWorkspaceMenuChatId(null);
                              }}
                              className="bg-transparent border-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer w-full text-left"
                            >
                              <Pencil className="w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400 shrink-0" />
                              <span>Rename</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handlePinWorkspaceChat(chat)}
                              className="bg-transparent border-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer w-full text-left"
                            >
                              <Pin
                                className={cn(
                                  "w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400 shrink-0",
                                  chat.isPinned && "text-[#FF6B00] fill-[#FF6B00]",
                                )}
                              />
                              <span>{chat.isPinned ? "Unpin chat" : "Pin chat"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteWorkspaceChat(chat.id)}
                              className="bg-transparent border-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer w-full text-left"
                            >
                              <Trash2 className="w-4 h-4 stroke-[2] text-red-500 dark:text-red-400 shrink-0" />
                              <span>Delete</span>
                            </button>

                            <div className="my-1 border-t border-slate-100 dark:border-zinc-800" />

                            <div className="px-3 pt-1.5 pb-1 text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider truncate">
                              {activeWorkspace.name}
                            </div>

                            <button
                              type="button"
                              onClick={() => setMoveSubmenuOpen((prev) => !prev)}
                              className="bg-transparent border-0 flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer w-full text-left"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <FolderPlus className="w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400 shrink-0" />
                                <span className="truncate">Move to workspace</span>
                              </div>
                              <ChevronRight
                                className={cn(
                                  "w-4 h-4 text-slate-400 dark:text-zinc-500 shrink-0 transition-transform",
                                  moveSubmenuOpen && "rotate-90",
                                )}
                              />
                            </button>

                            {moveSubmenuOpen && (
                              <div className="p-1 space-y-0.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl my-1 border border-slate-100 dark:border-zinc-800/80 max-h-36 overflow-y-auto">
                                {getAvailableWorkspaces()
                                  .filter((w) => w.id !== activeWorkspace.id)
                                  .map((targetWs) => (
                                    <button
                                      key={targetWs.id}
                                      type="button"
                                      onClick={() =>
                                        handleMoveChatToWorkspace(
                                          chat.id,
                                          targetWs.id,
                                          targetWs.name,
                                        )
                                      }
                                      className="bg-transparent border-0 w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-700/60 transition-colors truncate flex items-center gap-2 cursor-pointer"
                                    >
                                      <Folder className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                      <span className="truncate">{targetWs.name}</span>
                                    </button>
                                  ))}
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveChatFromWorkspace(chat.id)}
                              className="bg-transparent border-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer w-full text-left"
                            >
                              <FolderX className="w-4 h-4 stroke-[2] text-slate-500 dark:text-zinc-400 shrink-0" />
                              <span>Remove from workspace</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex-1 min-h-full flex flex-col items-center justify-center w-full px-4 sm:px-8 py-6 sm:py-8 my-auto">
              <div className="absolute inset-0 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden">
                <img
                  src="/watermark.png"
                  alt=""
                  width={520}
                  height={520}
                  draggable={false}
                  decoding="async"
                  style={{
                    maxWidth: "min(520px, 80vw)",
                    maxHeight: "min(520px, 80vh)",
                    width: "100%",
                    height: "auto",
                    opacity: 0.05,
                  }}
                  className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] object-contain"
                />
              </div>
              <div className="relative z-10 w-full max-w-[700px] mx-auto flex flex-col items-center justify-center mb-4 sm:mb-6">
                <ChatEmptyState />
              </div>

              <div className="relative z-10 w-full max-w-[700px] mx-auto flex justify-center">
                <ChatComposer
                  input={input}
                  setInput={setInput}
                  onSend={handleSend}
                  tabs={tabs}
                  setTabs={setTabs}
                  activeTab={activeTabId}
                  setActiveTab={setActiveTabId}
                  onCloseTab={closeTab}
                  onAddNewTab={handleAddNewTab}
                  skillPickerOpen={skillPickerOpen}
                  setSkillPickerOpen={setSkillPickerOpen}
                  skillQuery={skillQuery}
                  setSkillQuery={setSkillQuery}
                  onRunSkill={runSkill}
                  disabled={isThinking}
                  isCompact={false}
                  attachments={currentTab.attachments || []}
                  onAttachFiles={handleAttachFiles}
                  onRemoveAttachment={handleRemoveAttachment}
                  onPreviewFile={setPreviewFile}
                />
              </div>

              <div className="text-[11.5px] sm:text-[12px] text-gray-400 dark:text-zinc-500 text-center mt-2.5 sm:mt-3 select-none">
                Rivinity can make mistakes. Check important info.
              </div>
            </div>
          )
        ) : (
          <div className="w-full max-w-[860px] mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-8 space-y-4 sm:space-y-6 flex flex-col items-center">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`w-full flex items-start gap-2 sm:gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 flex items-center justify-center shrink-0 mt-1.5 sm:mt-2.5 select-none">
                    <img
                      src="/watermark.png"
                      alt="Rivinity"
                      width={32}
                      height={32}
                      style={{ width: "100%", height: "100%", maxWidth: "32px", maxHeight: "32px" }}
                      className="w-6.5 h-6.5 sm:w-8 sm:h-8 object-contain"
                    />
                  </div>
                )}

                <div
                  className={cn(
                    "group max-w-[95%] sm:max-w-[85%] flex flex-col",
                    msg.role === "user" ? "items-end" : "items-start",
                  )}
                >
                  {msg.role === "user" && msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-col items-end gap-2 mb-2 w-full max-w-full">
                      {msg.attachments.map((file) =>
                        file.type === "image" && file.url ? (
                          <div
                            key={file.id}
                            onClick={() => setPreviewFile(file)}
                            className="group/img relative w-full max-w-[340px] sm:max-w-[460px] rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200/90 dark:border-zinc-800 shadow-md sm:shadow-lg overflow-hidden cursor-pointer p-2 sm:p-2.5 hover:border-gray-300 dark:hover:border-zinc-700 transition-all"
                          >
                            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800/80 aspect-[16/10] flex items-center justify-center">
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                                <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-xl">
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Preview</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            key={file.id}
                            onClick={() => setPreviewFile(file)}
                            className="group/doc relative flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white dark:bg-[#18181b] border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer min-w-[200px] sm:min-w-[260px] max-w-[340px] overflow-hidden"
                          >
                            {file.type === "pdf" || file.name.toLowerCase().endsWith(".pdf") ? (
                              <div className="w-8 h-8 rounded-xl flex flex-col items-center justify-center text-rose-500 shrink-0">
                                <FileText className="w-4.5 h-4.5" />
                                <span className="text-[8px] font-extrabold -mt-0.5 tracking-tighter">
                                  PDF
                                </span>
                              </div>
                            ) : file.type === "code" ? (
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-purple-500 dark:text-purple-400 shrink-0">
                                <Code className="w-4.5 h-4.5" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                                <FileIcon className="w-4.5 h-4.5" />
                              </div>
                            )}
                            <div className="flex flex-col min-w-0 pr-1">
                              <span className="text-[13.5px] font-semibold text-gray-900 dark:text-zinc-100 truncate leading-tight group-hover/doc:text-[#FF5500] transition-colors">
                                {file.name}
                              </span>
                              <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium leading-tight mt-0.5">
                                {getFileCategoryLabel(file)}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {msg.role === "ai" && msg.content.startsWith(SKILL_MARKER) ? (
                    <SkillResultCard
                      skillId={msg.content.slice(SKILL_MARKER.length)}
                    />
                  ) : msg.content ? (
                    <div
                      className={`w-fit text-[14.5px] sm:text-[15.5px] leading-relaxed break-words ${
                        msg.role === "user"
                          ? "px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-br-xs bg-gradient-to-r from-[#FF8238] to-[#FF6B20] text-white shadow-[0_2px_8px_rgba(255,122,48,0.22)] whitespace-pre-wrap font-normal"
                          : "px-4 py-3 sm:px-5.5 sm:py-4 rounded-2xl rounded-bl-xs bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 text-[#1C1C1C] dark:text-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] font-normal"
                      }`}
                    >
                      {msg.role === "user" ? (
                        msg.content
                      ) : (
                        <ChatMarkdown content={msg.content} />
                      )}
                    </div>
                  ) : null}

                  <div
                    className={`flex items-center gap-1.5 mt-1.5 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ${msg.role === "user" ? "justify-end self-end" : "justify-start self-start"}`}
                  >
                    {msg.role === "user" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setInput(msg.content)}
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Edit prompt"
                        >
                          <Pencil
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(msg.content);
                            toast.success("Copied!");
                          }}
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Copy"
                        >
                          <Copy
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.share) {
                              navigator
                                .share({ text: msg.content })
                                .catch(() => {});
                            } else {
                              navigator.clipboard.writeText(msg.content);
                              toast.success("Copied to clipboard for sharing!");
                            }
                          }}
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Share"
                        >
                          <Share2
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(msg.content);
                            toast.success("Copied!");
                          }}
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Copy"
                        >
                          <Copy
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.share) {
                              navigator
                                .share({ text: msg.content })
                                .catch(() => {});
                            } else {
                              navigator.clipboard.writeText(msg.content);
                              toast.success("Copied to clipboard for sharing!");
                            }
                          }}
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Share"
                        >
                          <Share2
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>

                        <button
                          type="button"
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                          title="Regenerate"
                        >
                          <RefreshCw
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>

                        <button
                          type="button"
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 dark:text-zinc-500 transition-colors cursor-pointer"
                          title="Helpful"
                        >
                          <ThumbsUp
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>

                        <button
                          type="button"
                          className="bg-transparent p-1 sm:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 dark:text-zinc-500 transition-colors cursor-pointer"
                          title="Unhelpful"
                        >
                          <ThumbsDown
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={2}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && <ChatThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="px-4 sm:px-8 pb-3 sm:pb-4 pt-2 sm:pt-2.5 flex flex-col justify-center items-center bg-gradient-to-t from-white dark:from-zinc-950 via-white/95 dark:via-zinc-950/95 to-transparent shrink-0 relative z-10 w-full">
          <div className="w-full max-w-[860px] mx-auto flex justify-center">
            <ChatComposer
              input={input}
              setInput={setInput}
              onSend={handleSend}
              tabs={tabs}
              setTabs={setTabs}
              activeTab={activeTabId}
              setActiveTab={setActiveTabId}
              onCloseTab={closeTab}
              onAddNewTab={handleAddNewTab}
              skillPickerOpen={skillPickerOpen}
              setSkillPickerOpen={setSkillPickerOpen}
              skillQuery={skillQuery}
              setSkillQuery={setSkillQuery}
              onRunSkill={runSkill}
              disabled={isThinking}
              isCompact={isDashboardActive && isCompact}
              attachments={currentTab.attachments || []}
              onAttachFiles={handleAttachFiles}
              onRemoveAttachment={handleRemoveAttachment}
              onPreviewFile={setPreviewFile}
            />
          </div>
          <div className="text-[11.5px] sm:text-[12px] text-gray-400 dark:text-zinc-500 text-center mt-2 sm:mt-2.5 select-none">
            Rivinity can make mistakes. Check important info.
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full w-full relative overflow-hidden bg-white dark:bg-zinc-950">
      {isWriteMode ? (
        <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full w-full overflow-hidden">
          <WriteAnythingStudio />
        </div>
      ) : isDashboardActive ? (
        <div
          ref={splitContainerRef}
          data-split-view="true"
          className="flex-1 flex flex-col lg:flex-row min-w-0 min-h-0 h-full w-full overflow-hidden relative select-none lg:select-auto"
        >
          {!isDesktop && (
            <div className="flex items-center justify-between px-3.5 py-2 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shrink-0 z-30 w-full">
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl mx-auto text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMobileTab("chat")}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    mobileTab === "chat"
                      ? "bg-white dark:bg-zinc-700 text-[#FF5500] shadow-xs"
                      : "text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white",
                  )}
                >
                  <span>AI Chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("dashboard")}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    mobileTab === "dashboard"
                      ? "bg-[#FF5500] text-white shadow-xs"
                      : "text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white",
                  )}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Big Data</span>
                </button>
              </div>
            </div>
          )}

          <div
            className={cn(
              "h-full flex flex-col border-b lg:border-b-0 border-gray-200 dark:border-zinc-800 min-w-0 min-h-0 overflow-hidden shrink-0 transition-all duration-300",
              !isDesktop && mobileTab !== "chat" && "hidden",
            )}
            style={
              isDesktop ? { width: `${splitPercent}%` } : { width: "100%" }
            }
          >
            {chatView}
          </div>

          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleTouchStart}
            onDoubleClick={handleResetSplit}
            title="Drag left or right to resize panels (Double-click to reset to 50/50)"
            className={`hidden lg:flex items-center justify-center w-3.5 -mx-[7px] relative z-30 cursor-col-resize select-none group h-full shrink-0 transition-colors ${
              isDragging ? "bg-[#FF5500]/10" : ""
            }`}
          >
            <div
              className={`w-[2px] h-full transition-colors duration-150 ${
                isDragging
                  ? "bg-[#FF5500]"
                  : "bg-gray-200/90 dark:bg-zinc-800 group-hover:bg-[#FF5500]/80"
              }`}
            />
            <div
              className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-9 rounded-full border shadow-sm transition-all duration-150 ${
                isDragging
                  ? "bg-[#FF5500] border-[#FF5500] text-white scale-110 shadow-md"
                  : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-zinc-400 group-hover:border-[#FF5500] group-hover:text-[#FF5500] group-hover:scale-105"
              }`}
            >
              <div className="flex items-center">
                <ChevronLeft
                  className="w-2.5 h-2.5 -mr-0.5"
                  strokeWidth={2.5}
                />
                <ChevronRight className="w-2.5 h-2.5" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div
            data-dashboard="true"
            className={cn(
              "h-full flex flex-col min-w-0 min-h-0 flex-1 bg-white dark:bg-zinc-900 overflow-hidden",
              !isDesktop && mobileTab !== "dashboard" && "hidden",
            )}
            style={
              isDesktop
                ? { width: `${100 - splitPercent}%` }
                : { width: "100%" }
            }
          >
            <DIFeasibilityDashboard />
          </div>
        </div>
      ) : (
        chatView
      )}

      {showDeleteConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowDeleteConfirmModal(false)}
        >
          <div
            className="w-full max-w-[420px] bg-white dark:bg-[#1e1e20] border border-gray-200/90 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-6.5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[17px] font-semibold text-gray-900 dark:text-zinc-100 mb-2.5">
              Delete chat?
            </div>

            <div className="text-[14px] text-gray-600 dark:text-zinc-300 leading-relaxed">
              This will delete{" "}
              <span className="font-semibold text-gray-900 dark:text-zinc-100">
                {currentTab.label || "this chat"}
              </span>
              .
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-4.5 py-2 rounded-full border border-gray-300/90 dark:border-zinc-700 bg-transparent text-[14px] font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteChat}
                className="px-4.5 py-2 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-[14px] font-medium transition-colors shadow-xs cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showChatFilesModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowChatFilesModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF5500] flex items-center justify-center">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900 dark:text-zinc-100">
                    Files in this chat
                  </div>
                  <div className="text-xs text-gray-500 dark:text-zinc-400">
                    {currentChatFiles.length}{" "}
                    {currentChatFiles.length === 1 ? "file" : "files"} shared
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowChatFilesModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              {currentChatFiles.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500 dark:text-zinc-400">
                  No files have been attached in this chat yet.
                </div>
              ) : (
                currentChatFiles.map((file, idx) => (
                  <div
                    key={file.id || idx}
                    onClick={() => {
                      setShowChatFilesModal(false);
                      setPreviewFile(file);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200/80 dark:border-zinc-800 hover:border-[#FF5500]/50 hover:bg-orange-50/20 dark:hover:bg-zinc-800/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {file.type === "image" && file.url ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-zinc-700 shrink-0 bg-white"
                        />
                      ) : file.type === "pdf" ||
                        file.name.toLowerCase().endsWith(".pdf") ? (
                        <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex flex-col items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                          <span className="text-[7px] font-extrabold -mt-0.5">
                            PDF
                          </span>
                        </div>
                      ) : file.type === "code" ? (
                        <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center shrink-0">
                          <Code className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center shrink-0">
                          <FileIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-gray-900 dark:text-zinc-100 truncate group-hover:text-[#FF5500] transition-colors">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-zinc-400">
                          {getFileCategoryLabel(file)}{" "}
                          {file.size ? `• ${formatFileSize(file.size)}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 group-hover:bg-[#FF5500] group-hover:text-white text-xs font-medium text-gray-700 dark:text-zinc-300 transition-colors shrink-0 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <MaterialPreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};

export default CanvasMain;
