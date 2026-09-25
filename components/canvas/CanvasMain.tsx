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
  Brain,
  Loader2,
  Sparkles,
  Eye,
  Image as ImageIcon,
  File as FileIcon,
  Pin,
  Archive,
  Trash2,
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
import { useAuthModal } from "@/components/auth/auth-context";
import { LoaderGooeyBlobs } from "@/components/ui/LoaderGooeyBlobs";

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
    <div className="w-full max-w-[768px] mx-auto px-0 relative flex justify-center">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col w-full relative",
          isDraggingOver
            ? "border-[#FF5500] ring-2 ring-[#FF5500]/20 bg-orange-50/10"
            : "border-gray-200/80 dark:border-zinc-800 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
        )}
      >
        {/* DRAG AND DROP HIGHLIGHT OVERLAY */}
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

        {/* UPPER TABS BAR */}
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
                    ? "border border-[#FF6B00]/40 text-[#FF6B00] bg-orange-50/50 dark:bg-orange-950/30 font-medium"
                    : "text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border border-transparent font-medium",
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
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Pencil
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                        strokeWidth={2}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTabId(tab.id);
                          setEditingName(tab.label);
                        }}
                      />
                      {tabs.length > 1 && (
                        <X
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                          strokeWidth={2}
                          onClick={(e) => onCloseTab(tab.id, e)}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* TEMPLATE SELECTION EXPANDABLE PANEL */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isAddingTab
              ? "max-h-[350px] opacity-100 border-t border-gray-100 dark:border-zinc-800"
              : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={cn(
              "bg-gray-50/50 dark:bg-zinc-900/50",
              isCompact ? "p-2.5" : "p-3.5 sm:p-4.5",
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider px-1 text-gray-400 dark:text-zinc-500">
                Research Tools
              </div>
              <input
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTabName.trim()) {
                    const customLabel = newTabName.trim();
                    const currentTabObj = tabs.find((t) => t.id === activeTab);
                    const hasMessages = currentTabObj && currentTabObj.messages.length > 0;

                    if (hasMessages) {
                      const newId = Date.now();
                      const newTab: TabState = {
                        id: newId,
                        icon: getTabIcon(customLabel),
                        label: customLabel,
                        kind: getTabKind(customLabel),
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
                            ? {
                                ...t,
                                icon: getTabIcon(customLabel),
                                label: customLabel,
                                kind: getTabKind(customLabel),
                              }
                            : t,
                        ),
                      );
                    }
                    setIsAddingTab(false);
                    setNewTabName("");
                    textareaRef.current?.focus();
                  }
                }}
                className={cn(
                  "bg-white dark:bg-zinc-800 border border-gray-200/90 dark:border-zinc-700 rounded-full outline-none transition-all focus:border-[#FF6B00] text-slate-800 dark:text-zinc-100 placeholder:text-slate-400",
                  isCompact
                    ? "w-full px-3 py-0.5 text-[12px]"
                    : "w-full sm:w-44 px-3.5 py-1 text-[12.5px]",
                )}
                placeholder="Custom name..."
              />
            </div>
            <div className="flex flex-col gap-1 max-h-[180px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {tabTemplates.map((template) => {
                const isSelected = tabs.find((t) => t.id === activeTab)?.label === template.label;
                return (
                  <button
                    key={template.label}
                    type="button"
                    onClick={() => {
                      const currentTabObj = tabs.find((t) => t.id === activeTab);
                      const hasMessages = currentTabObj && currentTabObj.messages.length > 0;

                      if (hasMessages) {
                        const newId = Date.now();
                        const newTab: TabState = {
                          id: newId,
                          icon: template.icon,
                          label: template.label,
                          kind: template.kind,
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
                              ? {
                                  ...t,
                                  icon: template.icon,
                                  label: template.label,
                                  kind: template.kind,
                                }
                              : t,
                          ),
                        );
                      }
                      setIsAddingTab(false);
                      textareaRef.current?.focus();
                    }}
                    className={cn(
                      "flex items-center w-full rounded-xl border border-transparent bg-transparent hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all group text-left cursor-pointer",
                      isCompact
                        ? "gap-2.5 h-8 px-2.5"
                        : "gap-3 h-9 sm:h-9.5 px-3",
                    )}
                  >
                    <template.icon
                      className={cn(
                        "shrink-0 transition-colors",
                        isSelected
                          ? "text-[#FF6B00]"
                          : "text-slate-500 dark:text-zinc-400 group-hover:text-[#FF6B00]",
                        isCompact ? "w-3.5 h-3.5" : "w-4 h-4",
                      )}
                      strokeWidth={2}
                    />
                    <div
                      className={cn(
                        "font-semibold transition-colors truncate",
                        isSelected
                          ? "text-[#FF6B00]"
                          : "text-slate-800 dark:text-zinc-200 group-hover:text-[#FF6B00]",
                        isCompact
                          ? "text-[12.5px]"
                          : "text-[13.5px]",
                      )}
                    >
                      {template.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ATTACHMENTS HORIZONTAL PREVIEW & SKELETON LOADER FRAME */}
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
                {/* Skeleton shimmer wave if uploading */}
                {file.status === "uploading" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent -translate-x-full animate-[pulse_1.2s_infinite] pointer-events-none" />
                )}

                {/* Left Icon or Spinner or Image Thumbnail */}
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

                {/* File Details (Name & Type Subtitle) */}
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

                {/* Remove Button */}
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

        {/* PROMPT TEXTAREA */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          rows={1}
          className="w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed text-[#0f172a] dark:text-zinc-100 placeholder:text-[#94a3b8] border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3.5 sm:px-4.5 pt-2 sm:pt-2.5 pb-1"
          style={{ minHeight: isCompact ? "38px" : "46px", outline: "none" }}
        />

        {/* BOTTOM ACTION CONTROLS */}
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
            {/* Attach context file on the left */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-transparent w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800 transition-colors cursor-pointer shrink-0"
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
                  ? "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                  : "hover:!bg-slate-100 dark:hover:!bg-zinc-800 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100",
              )}
              title="Add tool"
            >
              <Plus className="w-4 h-4 shrink-0" strokeWidth={2.2} />
            </button>

            {!isCompact && (
              <button
                type="button"
                onClick={() => setIsWebSearchActive((prev) => !prev)}
                className={cn(
                  "hidden sm:flex w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                  isWebSearchActive
                    ? "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                    : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
                )}
                title={isWebSearchActive ? "Web search active (Click to disable)" : "Search web (Click to enable)"}
              >
                <Globe className="w-4 h-4" strokeWidth={2} />
              </button>
            )}

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
                  ? "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                  : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800",
              )}
              title="Skills"
            >
              <Wand2
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  skillPickerOpen
                    ? "text-[#FF5500]"
                    : "text-slate-500 dark:text-zinc-400",
                )}
                strokeWidth={2}
              />
            </button>

            {!isCompact && (
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
                  "hidden sm:flex w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full items-center justify-center transition-colors cursor-pointer shrink-0 border-0",
                  isIncognito
                    ? "!bg-slate-900 text-white shadow-xs"
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
            )}
          </div>

          <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
            <button
              type="button"
              className="bg-transparent w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800 transition-colors cursor-pointer shrink-0"
              title="Voice input"
            >
              <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={onSend}
              disabled={!canSend}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer transition-all ${
                canSend
                  ? "!bg-[#FF6B00] hover:!bg-[#E66000] shadow-[0_2px_8px_rgba(255,107,0,0.30)] active:scale-95"
                  : "!bg-[#FFD5C2] dark:!bg-[#5a2e1d] text-white opacity-85 cursor-not-allowed"
              }`}
              title="Send prompt"
            >
              <ArrowUpRight
                className="w-4.5 h-4.5 shrink-0 text-white"
                strokeWidth={2.4}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SKILL PICKER POPOVER */}
      {skillPickerOpen && (
        <div
          ref={popoverRef}
          className="absolute left-0 right-0 bottom-full mb-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
              <Wand2
                className="w-5 h-5 text-[#FF5500] shrink-0"
                strokeWidth={2.2}
              />
              <input
                autoFocus
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder="Search skills to run…"
                className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[14.5px] flex-1 text-[#1C1C1C] dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              />
              <span className="text-[12.5px] text-gray-400 shrink-0">
                {filteredSkills.length} available
              </span>
            </div>
            <div className="max-h-[310px] overflow-y-auto py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {filteredSkills.length === 0 ? (
                <div className="py-6 text-center text-[13.5px] text-gray-400 dark:text-zinc-500">
                  No skills found matching &ldquo;{skillQuery}&rdquo;
                </div>
              ) : (
                filteredSkills.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onRunSkill(s.id)}
                    className="bg-transparent w-full text-left px-5 py-3 hover:bg-slate-50/80 dark:hover:bg-zinc-800/60 transition-colors flex items-center justify-between gap-4 group cursor-pointer border-b border-gray-100 dark:border-zinc-800/40 last:border-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 dark:text-zinc-100 group-hover:text-[#FF6B00] transition-colors truncate">
                        {s.name}
                      </div>
                      <div className="text-[12px] sm:text-[12.5px] text-slate-500 dark:text-zinc-400 font-normal leading-relaxed mt-0.5 truncate">
                        {s.summary}
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.1em] font-extrabold text-[#FF6B00] bg-white dark:bg-zinc-900 border border-[#FF6B00]/70 px-3 py-0.5 rounded-full shrink-0 shadow-2xs">
                      {s.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatThinkingIndicator: React.FC = () => {
  return (
    <div className="w-full flex items-start gap-2 sm:gap-2.5 justify-start">
      {/* Normal Logo (no animation) */}
      <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 flex items-center justify-center shrink-0 mt-1.5 sm:mt-2.5 select-none">
        <img
          src="/watermark.png"
          alt="Rivinity"
          className="w-6.5 h-6.5 sm:w-8 sm:h-8 object-contain"
        />
      </div>

      {/* Bubble with only the Gooey Blobs Animation */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-xs bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        <LoaderGooeyBlobs size={9} color="#FF5500" duration={1.4} />
      </div>
    </div>
  );
};

export interface CanvasMainProps {
  onChatStateChange?: (isStarted: boolean) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const CanvasMain: React.FC<CanvasMainProps> = ({
  onChatStateChange,
  onToggleSidebar,
}) => {
  const [tabs, setTabs] = useState<TabState[]>([
    {
      id: 1,
      icon: MessageSquare,
      label: "Rivinity — The AI Infrastructure",
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find((t) => t.id === activeTabId) ||
    tabs[0] || {
      id: 1,
      icon: MessageSquare,
      label: "Rivinity — The AI Infrastructure",
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

  // If user signs up / logs in successfully, deliver the full output of their message
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

  // If user cancels / closes ("crosses") the modal without signing up or logging in, cancel thinking and show no output
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
      const pending = sessionStorage.getItem("rivinity_pending_prompt");
      if (pending) {
        sessionStorage.removeItem("rivinity_pending_prompt");
        setInput(pending);
      }
    } catch {}
  }, [setInput]);

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

      // Transition from uploading skeleton to ready state after a realistic delay
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
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  }, []);

  // Split layout: 50% AI Chat / 50% Big Data Dashboard
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Chat dropdown menu & Files in Chat modal states
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

        // If current active tab is empty, configure the existing tab instead of creating an extra one
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

    window.addEventListener("open-tab", handleOpenTab);
    return () => window.removeEventListener("open-tab", handleOpenTab);
  }, []);

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

  // STRICT RULE: The Big Data screen ONLY appears when the user's prompt explicitly uses "big data"
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
          label: "Rivinity — The AI Infrastructure",
          kind: "chat",
          messages: [],
          draftInput: "",
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

  const handleSend = () => {
    const trimmed = input.trim();
    const currentAttachments = currentTab.attachments || [];
    if ((!trimmed && currentAttachments.length === 0) || isThinking) return;

    // If user has already received an answer and still hasn't signed up, prompt to sign up
    if (!isAuthenticated && currentTab.messages.length >= 2) {
      toast.info("Please sign up to continue chatting.");
      openAuth("signup");
      return;
    }

    // Check strictly if the user wrote a prompt containing "big data"
    const hasBigDataKeyword = /big\s*data/i.test(trimmed);

    const isFirst = currentTab.messages.length === 0;
    const dynamicTitle = trimmed
      ? trimmed.length > 24
        ? trimmed.slice(0, 24) + "…"
        : trimmed
      : currentAttachments[0]?.name
        ? currentAttachments[0].name.slice(0, 24)
        : "Attached File";

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
              messages: [
                ...t.messages,
                {
                  id: Date.now(),
                  role: "user",
                  content: trimmed,
                  attachments: [...currentAttachments],
                },
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
      // Allocate 50% to AI Chat and 50% to Big Data
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

    if (!isAuthenticated) {
      // Chatbot starts thinking animation, then opens login/signup modal.
      // Full output is withheld until login/signup succeeds.
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
      appendTabMessage({
        id: Date.now() + 1,
        role: "ai",
        content: responseContent,
      });
      setIsThinking(false);
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

  // Close chat menu on click outside
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

  // All files uploaded across all messages in current tab
  const currentChatFiles = currentTab.messages.flatMap(
    (m) => m.attachments || [],
  );

  const handleTogglePinChat = () => {
    setChatMenuOpen(false);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId ? { ...t, isPinned: !t.isPinned } : t,
      ),
    );
    toast.success(currentTab.isPinned ? "Chat unpinned" : "Chat pinned");
  };

  const handleArchiveChat = () => {
    setChatMenuOpen(false);
    const freshId = Date.now();
    setTabs((prev) => {
      const filtered = prev.filter((t) => t.id !== activeTabId);
      if (filtered.length === 0) {
        return [
          {
            id: freshId,
            icon: MessageSquare,
            label: "Rivinity — The AI Infrastructure",
            kind: "chat",
            messages: [],
            draftInput: "",
          },
        ];
      }
      return filtered;
    });
    setActiveTabId(freshId);
    toast.success("Chat conversation archived");
  };

  const handleDeleteChat = () => {
    setChatMenuOpen(false);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteChat = () => {
    setShowDeleteConfirmModal(false);
    if (tabs.length <= 1) {
      const freshId = Date.now();
      setTabs([
        {
          id: freshId,
          icon: MessageSquare,
          label: "Rivinity — The AI Infrastructure",
          kind: "chat",
          messages: [],
          draftInput: "",
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

  // Responsive compactness: also active on mobile when split to ensure tight spacing
  const isCompact = splitPercent < 45 || (!isDesktop && isDashboardActive);
  const isUltraCompact = splitPercent < 32;

  const chromeTabsHeader = (
    <div className="w-full bg-white dark:bg-[#121215] border-b border-slate-200/90 dark:border-zinc-800 px-2 sm:px-3 pt-0 h-[35px] flex items-end justify-between select-none shrink-0 z-30 transition-colors">
      <div className="flex items-end min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2 h-full">
        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="bg-transparent md:hidden flex items-center justify-center h-7 w-7 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#3C4043] dark:text-zinc-200 shrink-0 my-auto mr-1 cursor-pointer border-0"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Scooped Tabs */}
        {tabs.map((tab, idx) => {
          const isActive = activeTabId === tab.id;
          const prevIsActive = idx > 0 && tabs[idx - 1].id === activeTabId;
          return (
            <React.Fragment key={tab.id}>
              {/* Divider between inactive tabs */}
              {idx > 0 && !isActive && !prevIsActive && (
                <div className="h-3.5 w-[1px] bg-slate-300 dark:bg-zinc-700 shrink-0 my-auto mx-1" />
              )}

              {isActive ? (
                /* Scooped Orange Active Tab (#ff8b28) */
                <div
                  onClick={() => setActiveTabId(tab.id)}
                  title={tab.label}
                  className="relative flex items-center h-[34px] cursor-pointer select-none z-20 shrink-0 filter drop-shadow-[0_4px_12px_rgba(255,139,40,0.32)] -mb-px"
                >
                  {/* Left Concave Scoop Cap */}
                  <svg
                    width="22"
                    height="34"
                    viewBox="0 0 22 34"
                    fill="none"
                    className="shrink-0 pointer-events-none -mr-[1px]"
                  >
                    <path
                      d="M 0 0 C 8 0, 14 34, 22 34 L 22 0 Z"
                      fill="#ff8b28"
                    />
                  </svg>

                  {/* Center Orange Body */}
                  <div className="h-[34px] bg-[#ff8b28] flex items-center gap-2 px-2.5 text-white min-w-[120px] max-w-[240px]">
                    {/* Normal Logo (no circle around it) */}
                    <img
                      src="/watermark.png"
                      alt="Rivinity"
                      className="w-4 h-4 object-contain brightness-0 invert shrink-0 select-none"
                    />

                    {/* Title */}
                    <span className="truncate flex-1 text-[12.5px] font-medium text-white tracking-tight">
                      {tab.label}
                    </span>

                    {/* Close button */}
                    {tabs.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => closeTab(tab.id, e)}
                        className="bg-transparent w-4.5 h-4.5 rounded-full hover:bg-white/25 text-white/80 hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer border-0 p-0"
                        title="Close tab"
                      >
                        <X className="w-3 h-3 text-white" strokeWidth={2.2} />
                      </button>
                    )}
                  </div>

                  {/* Right Concave Scoop Cap */}
                  <svg
                    width="22"
                    height="34"
                    viewBox="0 0 22 34"
                    fill="none"
                    className="shrink-0 pointer-events-none -ml-[1px]"
                  >
                    <path
                      d="M 0 34 C 8 34, 14 0, 22 0 L 0 0 Z"
                      fill="#ff8b28"
                    />
                  </svg>
                </div>
              ) : (
                /* Inactive Tab */
                <div
                  onClick={() => setActiveTabId(tab.id)}
                  title={tab.label}
                  className="group relative flex items-center transition-all duration-150 cursor-pointer select-none h-[28px] rounded-lg px-2.5 sm:px-3 gap-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] my-auto"
                >
                  <img
                    src="/watermark.png"
                    alt=""
                    className="w-3.5 h-3.5 object-contain shrink-0 opacity-60 group-hover:opacity-100"
                  />
                  <span className="truncate flex-1 min-w-0 text-[12px] leading-none text-left">
                    {tab.label}
                  </span>
                  {tabs.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => closeTab(tab.id, e)}
                      className="bg-transparent w-4 h-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center border-0 p-0"
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* New Tab (+) Button */}
        <button
          type="button"
          onClick={handleAddNewTab}
          className="bg-transparent flex items-center justify-center w-7 h-7 rounded-full text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 my-auto ml-1 border-0"
          title="New tab"
          aria-label="New tab"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 shrink-0 my-auto pl-2">
        {/* Share Button & Chat Options Menu (visible once conversation has started) */}
        {!isEmpty && (
          <div className="flex items-center gap-1 relative" ref={chatMenuRef}>
            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="bg-transparent hover:bg-black/[0.06] dark:hover:bg-white/10 px-2.5 py-1 rounded-full text-[12px] font-medium text-[#3C4043] dark:text-zinc-300 hover:text-[#1F1F1F] transition-colors cursor-pointer flex items-center gap-1.5 border-0"
              title="Share"
            >
              <Share2 className="w-3.5 h-3.5 text-[#5F6368] dark:text-zinc-400" />
              <span>Share</span>
            </button>

            {/* Three Dots More Button */}
            <button
              type="button"
              onClick={() => setChatMenuOpen((prev) => !prev)}
              className={cn(
                "p-1 rounded-full flex items-center justify-center transition-colors cursor-pointer text-[#5F6368] hover:text-[#1F1F1F] dark:text-zinc-400 dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/10 border-0",
                chatMenuOpen && "bg-black/[0.08] dark:bg-white/15 text-[#1F1F1F] dark:text-white",
              )}
              title="More options"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Dropdown Menu Popup (Light Mode Style) */}
            {chatMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 rounded-2xl bg-white dark:bg-[#1c1c1f] text-gray-800 dark:text-zinc-100 border border-gray-200/90 dark:border-zinc-800 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* View files in chat */}
                <button
                  type="button"
                  onClick={handleViewFilesInChat}
                  className="bg-transparent flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-800 dark:text-zinc-100 hover:bg-gray-100/90 dark:hover:bg-white/10 transition-colors cursor-pointer text-left border-0"
                >
                  <FileText className="w-4.5 h-4.5 shrink-0 text-gray-700 dark:text-zinc-300" />
                  <span className="flex-1 truncate">View files in chat</span>
                </button>

                {/* Pin chat */}
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

                {/* Archive */}
                <button
                  type="button"
                  onClick={handleArchiveChat}
                  className="bg-transparent flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-800 dark:text-zinc-100 hover:bg-gray-100/90 dark:hover:bg-white/10 transition-colors cursor-pointer text-left border-0"
                >
                  <Archive className="w-4.5 h-4.5 shrink-0 text-gray-700 dark:text-zinc-300" />
                  <span className="flex-1 truncate">Archive</span>
                </button>

                {/* Delete */}
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
      </div>
    </div>
  );

  // AI Chat View (Canvas Main Prompt Box)
  const chatView = (
    <div className="flex-1 flex flex-col items-center justify-between min-w-0 min-h-0 h-full w-full relative overflow-hidden bg-white dark:bg-zinc-950">
      {!isEmpty && (
        <div className="absolute inset-0 pointer-events-none select-none z-0 flex items-center justify-center">
          <img
            src="/watermark.png"
            alt=""
            className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[660px] lg:h-[660px] max-w-[90vw] sm:max-w-none object-contain opacity-[0.05] dark:opacity-[0.04]"
          />
        </div>
      )}

      {/* Scrollable Message List or Empty State */}
      <div className="flex-1 min-h-0 flex flex-col items-center overflow-y-auto overflow-x-hidden relative z-10 w-full max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {isEmpty ? (
          <div className="relative flex-1 min-h-full flex flex-col items-center justify-center w-full px-3 sm:px-6 py-6 sm:py-10 my-auto">
            <div className="w-full max-w-[768px] mx-auto flex flex-col items-center justify-center mb-4 sm:mb-6">
              <ChatEmptyState />
            </div>

            <div className="relative z-10 w-full max-w-[768px] mx-auto flex justify-center">
              <ChatComposer
                input={input}
                setInput={setInput}
                onSend={handleSend}
                tabs={tabs}
                setTabs={setTabs}
                activeTab={activeTabId}
                setActiveTab={setActiveTabId}
                onCloseTab={closeTab}
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
          </div>
        ) : (
          <div className="w-full max-w-[768px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex flex-col items-center">
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
                  {/* User Attached Files Frame (Clean Light/White Card Styling) */}
                  {msg.role === "user" && msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-col items-end gap-2 mb-2 w-full max-w-full">
                      {msg.attachments.map((file) =>
                        file.type === "image" && file.url ? (
                          /* Large Visual Image Card Preview */
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
                          /* Sleek Document / PDF Capsule Card */
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

      {/* Pinned Bottom Composer */}
      {!isEmpty && (
        <div className="px-2.5 sm:px-4 pb-3 sm:pb-5 pt-2 sm:pt-2.5 flex justify-center items-center bg-gradient-to-t from-white dark:from-zinc-950 via-white/95 dark:via-zinc-950/95 to-transparent shrink-0 relative z-10 w-full">
          <div className="w-full max-w-[768px] mx-auto flex justify-center">
            <ChatComposer
              input={input}
              setInput={setInput}
              onSend={handleSend}
              tabs={tabs}
              setTabs={setTabs}
              activeTab={activeTabId}
              setActiveTab={setActiveTabId}
              onCloseTab={closeTab}
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
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full w-full relative overflow-hidden bg-white dark:bg-zinc-950">
      {chromeTabsHeader}
      {isWriteMode ? (
        <div className="flex-1 min-h-0 overflow-hidden">
          <WriteAnythingStudio />
        </div>
      ) : isDashboardActive ? (
        <div
          ref={splitContainerRef}
          data-split-view="true"
          className="flex-1 flex flex-col lg:flex-row min-w-0 min-h-0 h-full w-full overflow-hidden relative select-none lg:select-auto"
        >
          {/* Mobile View Switcher (Only visible on mobile/tablet screens < 1024px) */}
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

          {/* Left Panel: AI Chat (50% width on desktop, 100% on mobile) */}
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

          {/* Draggable Divider with Grab Handle (Desktop only) */}
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

          {/* Right Panel: Big Data Page (50% width on desktop, 100% on mobile) */}
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

      {/* Delete Chat Confirmation Modal */}
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

            <div className="text-[13.5px] text-gray-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Visit{" "}
              <span className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-zinc-200 cursor-pointer">
                settings
              </span>{" "}
              to delete any memories saved during this chat.
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

      {/* Files in Chat Modal */}
      {showChatFilesModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowChatFilesModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
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

            {/* File List */}
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

      {/* Material Interactive Lightbox / Document Preview Modal */}
      <MaterialPreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};

export default CanvasMain;
