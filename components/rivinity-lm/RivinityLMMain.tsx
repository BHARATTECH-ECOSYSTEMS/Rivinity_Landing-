"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  FileText,
  Layers,
  HelpCircle,
  Radio,
  Mic,
  Calendar,
  GraduationCap,
  Swords,
  Bot,
  BarChart3,
  Paperclip,
  Globe,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  X,
  Wand2,
  HatGlasses,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ContextualChatView from "./views/ContextualChatView";
import SmartNotesView from "./views/SmartNotesView";
import FlashcardsView from "./views/FlashcardsView";
import QuizzesView from "./views/QuizzesView";
import AIPodcastView from "./views/AIPodcastView";
import VoiceTranscribeView from "./views/VoiceTranscribeView";
import HomeworkPlannerView from "./views/HomeworkPlannerView";
import ExamLabView from "./views/ExamLabView";
import DebateView from "./views/DebateView";
import StudyCompanionView from "./views/StudyCompanionView";
import DataAnalystView from "./views/DataAnalystView";

/* =========================================================
   SKILLS DATA
========================================================= */

const BUILT_IN_SKILLS = [
  {
    id: "study-notes-generator",
    name: "Study Notes Generator",
    summary: "Generate structured Cornell-style study notes with key terms, cues, and summaries",
    category: "Writing",
  },
  {
    id: "quiz-creator",
    name: "Quiz & Exam Creator",
    summary: "Create multiple-choice and short-answer quizzes with detailed answer keys",
    category: "Education",
  },
  {
    id: "flashcard-deck-builder",
    name: "Flashcard Deck Builder",
    summary: "Convert textbook chapters or notes into spaced-repetition flashcards",
    category: "Education",
  },
  {
    id: "podcast-script-writer",
    name: "AI Podcast Script Writer",
    summary: "Draft two-host conversational podcast scripts to explain complex topics",
    category: "Audio",
  },
  {
    id: "academic-debater",
    name: "Academic Debate Sparring",
    summary: "Argue against an Oxford-style opponent with real-time logical fallacy detection",
    category: "Analysis",
  },
  {
    id: "data-insights-analyst",
    name: "Data & Gradebook Analyst",
    summary: "Analyze tabular research data, cohort test scores, and statistical trends",
    category: "Data",
  },
];

/* =========================================================
   TYPES & FEATURES
========================================================= */

interface FeatureItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
}

const features: FeatureItem[] = [
  {
    id: "contextual-chat",
    label: "Chat",
    icon: MessageSquare,
    color: "#FF6B00",
  },
  {
    id: "smart-notes",
    label: "SmartNotes",
    icon: FileText,
    color: "#FF6B00",
  },
  {
    id: "flashcards",
    label: "Flashcards",
    icon: Layers,
    color: "#FF6B00",
  },
  {
    id: "quizzes",
    label: "Quizzes",
    icon: HelpCircle,
    color: "#FF6B00",
  },
  {
    id: "ai-podcast",
    label: "Podcast",
    icon: Radio,
    color: "#FF6B00",
  },
  {
    id: "voice-transcribe",
    label: "Transcribe",
    icon: Mic,
    color: "#FF6B00",
  },
  {
    id: "homework-planner",
    label: "Homework",
    icon: Calendar,
    color: "#FF6B00",
  },
  {
    id: "exam-lab",
    label: "ExamLab",
    icon: GraduationCap,
    color: "#FF6B00",
  },
  {
    id: "debate",
    label: "Debate",
    icon: Swords,
    color: "#FF6B00",
  },
  {
    id: "study-companion",
    label: "Companion",
    icon: Bot,
    color: "#FF6B00",
  },
  {
    id: "data-analyst",
    label: "Analyst",
    icon: BarChart3,
    color: "#FF6B00",
  },
];

interface RivinityLMMainProps {
  activeFeature?: string;
  onFeatureChange: (feature: string) => void;
}

export const RivinityLMMain: React.FC<RivinityLMMainProps> = ({
  activeFeature = "landing",
  onFeatureChange,
}) => {
  const [input, setInput] = useState("");
  const [selectedPromptTool, setSelectedPromptTool] = useState<string | null>(null);
  const [isIncognito, setIsIncognito] = useState(false);
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isAddingTool, setIsAddingTool] = useState(false);

  /* Skill picker states */
  const [skillPickerOpen, setSkillPickerOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const skillButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  /* Close skill popover on outside click */
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (
        skillPickerOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        skillButtonRef.current &&
        !skillButtonRef.current.contains(e.target as Node)
      ) {
        setSkillPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, [skillPickerOpen]);

  const filteredSkills = BUILT_IN_SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(skillQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(skillQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(skillQuery.toLowerCase())
  );

  const handleRunSkill = (skillId: string) => {
    const skill = BUILT_IN_SKILLS.find((s) => s.id === skillId);
    if (!skill) return;

    setSkillPickerOpen(false);
    setSkillQuery("");

    let matchedFeature = "contextual-chat";
    if (skillId.includes("notes")) matchedFeature = "smart-notes";
    else if (skillId.includes("quiz")) matchedFeature = "quizzes";
    else if (skillId.includes("flashcard")) matchedFeature = "flashcards";
    else if (skillId.includes("podcast")) matchedFeature = "ai-podcast";
    else if (skillId.includes("debate")) matchedFeature = "debate";
    else if (skillId.includes("data")) matchedFeature = "data-analyst";

    onFeatureChange(matchedFeature);
    toast.success(`Skill launched: ${skill.name}`);
  };

  /* Cleanup speech on unmount */
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggleVoiceRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening... Speak your prompt now");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev.trim()} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        setIsListening(false);
        if (event.error !== "no-speech") {
          toast.error(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
      toast.error("Could not access microphone.");
    }
  };

  /* =========================================================
     SEND
  ========================================================= */

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && !attachedFile) return;

    if (isIncognito) {
      toast.info("Incognito mode: prompt sent without saving to history.");
    }

    if (isWebSearchActive) {
      toast.success("Web search context enabled.");
    }

    const targetTool = selectedPromptTool ?? (activeFeature !== "landing" ? activeFeature : "contextual-chat");

    if (activeFeature === "landing" || selectedPromptTool) {
      onFeatureChange(targetTool);
    } else {
      const activeLabel = features.find((f) => f.id === activeFeature)?.label || "Rivinity AI";
      toast.success(`Prompt sent to ${activeLabel}!`);
    }

    setInput("");
    setAttachedFile(null);
  };

  /* =========================================================
     REUSABLE PROMPT / CHAT BOX
  ========================================================= */

  const renderPromptBox = (isCompact = false) => {
    return (
      <div
        className={cn(
          "w-full max-w-full mx-auto px-0 relative flex flex-col justify-center transition-all duration-300 ease-out",
          isIncognito &&
            "p-2 sm:p-2.5 rounded-[26px] bg-slate-100/90 dark:bg-zinc-800/60 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-700/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-none"
        )}
      >
        {/* INCOGNITO MODE TOP GLASS HEADER */}
        {isIncognito && (
          <div className="px-3.5 sm:px-4 pt-1 pb-2 text-[12.5px] select-none text-slate-700 dark:text-zinc-300 font-medium tracking-tight animate-in fade-in duration-200">
            Incognito Mode Active &bull; Chats will not be saved to history
          </div>
        )}

        <div
          className={cn(
            "transition-all duration-300 ease-out overflow-hidden flex flex-col w-full relative",
            isIncognito
              ? "bg-[#22242a] dark:bg-[#1c1e24] rounded-[20px] border border-zinc-700/40 shadow-xl text-white"
              : "bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-zinc-800/80 hover:border-slate-400 dark:hover:border-zinc-600 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400/20 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-500/20 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          )}
        >
          {/* UPPER FEATURE TAB ROW */}
          <div
            className={cn(
              "flex items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              "gap-1.5 sm:gap-2 px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1"
            )}
          >
            {activeFeature !== "landing" && !isAddingTool ? (
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "group relative flex items-center gap-1.5 px-3 py-1 text-[12.5px] rounded-full shrink-0 font-medium border transition-all",
                    isIncognito
                      ? "border-[#FF6B00]/70 text-[#FF6B00] bg-[#FF6B00]/15"
                      : "border-[#FF6B00]/40 text-[#FF6B00] bg-orange-50/70 dark:bg-orange-950/40"
                  )}
                >
                  {(() => {
                    const featObj = features.find((f) => f.id === activeFeature);
                    const FeatIcon = featObj?.icon || Sparkles;
                    return (
                      <>
                        <FeatIcon className="w-3.5 h-3.5 shrink-0 text-[#FF6B00]" strokeWidth={2.2} />
                        <span>{featObj?.label || "RivinityLM"}</span>
                      </>
                    );
                  })()}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingTool(true)}
                  className={cn(
                    "flex items-center justify-center rounded-full transition-colors cursor-pointer shrink-0 border-0 bg-transparent w-6 h-6",
                    isIncognito
                      ? "text-zinc-400 hover:text-white hover:bg-white/10"
                      : "text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                  )}
                  title="Switch feature"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {features.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = (selectedPromptTool || activeFeature) === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        if (activeFeature !== "landing") {
                          onFeatureChange(tool.id);
                          setSelectedPromptTool(tool.id);
                          setIsAddingTool(false);
                        } else {
                          setSelectedPromptTool(isActive ? null : tool.id);
                        }
                      }}
                      className={cn(
                        "group relative flex items-center gap-1.5 px-3 py-1 text-[12.5px] transition-all duration-150 rounded-full shrink-0 cursor-pointer font-medium border",
                        isActive
                          ? isIncognito
                            ? "border-[#FF6B00]/70 text-[#FF6B00] bg-[#FF6B00]/15"
                            : "border-[#FF6B00]/40 text-[#FF6B00] bg-orange-50/70 dark:bg-orange-950/40"
                          : isIncognito
                            ? "border-transparent bg-white/5 text-zinc-300 hover:text-white hover:border-white/10 hover:bg-white/10"
                            : "border-transparent bg-slate-100/80 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-700/70"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors",
                          isActive
                            ? "text-[#FF6B00]"
                            : isIncognito
                              ? "text-zinc-400 group-hover:text-zinc-200"
                              : "text-slate-500 group-hover:text-slate-700 dark:text-zinc-400 dark:group-hover:text-zinc-200"
                        )}
                        strokeWidth={isActive ? 2.2 : 1.9}
                      />
                      <span>{tool.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ATTACHMENT PREVIEW */}
          {attachedFile && (
            <div
              className={cn(
                "px-3 sm:px-4 pt-2 pb-1 flex items-center gap-2 border-t",
                isIncognito ? "border-white/10" : "border-gray-100/80 dark:border-zinc-800/80"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs",
                  isIncognito
                    ? "bg-white/5 border-white/10 text-zinc-200"
                    : "bg-slate-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200"
                )}
              >
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span className="max-w-[200px] truncate">{attachedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* TEXTAREA */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isIncognito ? "Ask me anything (Incognito mode)..." : "Ask anything..."}
            rows={1}
            className={cn(
              "w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3.5 sm:px-4.5 pt-2 sm:pt-2.5 pb-1",
              isIncognito
                ? "text-white placeholder:text-zinc-500"
                : "text-[#0f172a] dark:text-zinc-100 placeholder:text-[#94a3b8]"
            )}
            style={{ minHeight: isCompact ? "40px" : "46px", outline: "none" }}
          />

          {/* BOTTOM ACTION BAR */}
          <div className="flex items-center justify-between w-full px-3 sm:px-4 pb-2 sm:pb-2.5 pt-0.5">
            {/* Left Controls */}
            <div className="flex items-center min-w-0 gap-0.5 sm:gap-1">
              {/* Attach File */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                  isIncognito
                    ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                    : attachedFile
                      ? "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                      : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={attachedFile ? `Attached: ${attachedFile.name}` : "Attach file or document"}
              >
                <Paperclip className="w-4 h-4 shrink-0" strokeWidth={2} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAttachedFile(file);
                    toast.success(`Attached "${file.name}"`);
                  }
                  e.target.value = "";
                }}
              />

              {/* Plus Button to toggle tool list */}
              <button
                type="button"
                onClick={() => setIsAddingTool((prev) => !prev)}
                className={cn(
                  "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                  isAddingTool
                    ? isIncognito
                      ? "!bg-[#FF6B00]/25 text-[#FF6B00]"
                      : "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                    : isIncognito
                      ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title="Add / Switch tool"
              >
                <Plus className="w-4 h-4 shrink-0" strokeWidth={2.2} />
              </button>

              {/* Web search toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsWebSearchActive((prev) => {
                    const next = !prev;
                    if (next) toast.info("Web search enabled.");
                    else toast.info("Web search disabled.");
                    return next;
                  });
                }}
                className={cn(
                  "hidden sm:flex w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                  isWebSearchActive
                    ? isIncognito
                      ? "!bg-sky-500/25 text-sky-400"
                      : "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                    : isIncognito
                      ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={isWebSearchActive ? "Web search active" : "Search web"}
              >
                <Globe className="w-4 h-4" strokeWidth={2} />
              </button>

              {/* Skills Button */}
              <button
                ref={skillButtonRef}
                type="button"
                onClick={() => setSkillPickerOpen((prev) => !prev)}
                className={cn(
                  "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                  skillPickerOpen
                    ? isIncognito
                      ? "!bg-[#FF6B00]/25 text-[#FF6B00]"
                      : "!bg-orange-50 text-[#FF5500] dark:!bg-orange-950/40"
                    : isIncognito
                      ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title="Browse Skills"
              >
                <Wand2
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    skillPickerOpen
                      ? "text-[#FF5500]"
                      : isIncognito
                        ? "text-zinc-400"
                        : "text-slate-500 dark:text-zinc-400"
                  )}
                  strokeWidth={2}
                />
              </button>

              {/* Incognito mode toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsIncognito((prev) => {
                    const next = !prev;
                    if (next) toast.info("Incognito mode active.");
                    else toast.info("Incognito mode disabled.");
                    return next;
                  });
                }}
                className={cn(
                  "hidden sm:flex w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full items-center justify-center transition-colors cursor-pointer shrink-0 border-0",
                  isIncognito
                    ? "!bg-white/20 text-white shadow-xs ring-1 ring-white/30"
                    : "bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={isIncognito ? "Incognito active" : "Incognito mode"}
              >
                <HatGlasses className="w-4 h-4 shrink-0" strokeWidth={2} />
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
              {/* Voice Input */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={cn(
                  "w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                  isListening
                    ? "!bg-red-500 text-white animate-pulse shadow-sm"
                    : isIncognito
                      ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={isListening ? "Listening... Click to stop" : "Voice input"}
              >
                <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() && !attachedFile}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all",
                  input.trim() || attachedFile
                    ? "!bg-[#FF6B00] hover:!bg-[#E66000] text-white shadow-[0_2px_8px_rgba(255,107,0,0.30)] active:scale-95"
                    : isIncognito
                      ? "!bg-white/10 text-white/35 cursor-not-allowed border border-white/5"
                      : "!bg-[#FFD5C2] dark:!bg-[#5a2e1d] text-white opacity-85 cursor-not-allowed"
                )}
                title="Send prompt"
              >
                <ArrowUpRight
                  className={cn(
                    "w-4.5 h-4.5 shrink-0",
                    input.trim() || attachedFile
                      ? "text-white"
                      : isIncognito
                        ? "text-white/40"
                        : "text-white"
                  )}
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
            <div
              className={cn(
                "rounded-2xl border shadow-2xl overflow-hidden",
                isIncognito
                  ? "bg-[#22242a] border-white/15 text-white"
                  : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 border-b",
                  isIncognito ? "border-white/10" : "border-gray-100 dark:border-zinc-800"
                )}
              >
                <Wand2 className="w-5 h-5 text-[#FF5500] shrink-0" strokeWidth={2.2} />
                <input
                  autoFocus
                  value={skillQuery}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  placeholder="Search skills to run…"
                  className={cn(
                    "bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[14.5px] flex-1",
                    isIncognito
                      ? "text-white placeholder:text-zinc-500"
                      : "text-[#1C1C1C] dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                  )}
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
                      onClick={() => handleRunSkill(s.id)}
                      className={cn(
                        "bg-transparent w-full text-left px-5 py-3 transition-colors flex items-center justify-between gap-4 group cursor-pointer border-b last:border-0",
                        isIncognito
                          ? "hover:bg-white/10 border-white/10"
                          : "hover:bg-slate-50/80 dark:hover:bg-zinc-800/60 border-gray-100 dark:border-zinc-800/40"
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className={cn(
                            "text-[13.5px] sm:text-[14px] font-bold group-hover:text-[#FF6B00] transition-colors truncate",
                            isIncognito ? "text-zinc-100" : "text-slate-900 dark:text-zinc-100"
                          )}
                        >
                          {s.name}
                        </div>
                        <div
                          className={cn(
                            "text-[12px] sm:text-[12.5px] font-normal leading-relaxed mt-0.5 truncate",
                            isIncognito ? "text-zinc-400" : "text-slate-500 dark:text-zinc-400"
                          )}
                        >
                          {s.summary}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] sm:text-[10.5px] uppercase tracking-[0.1em] font-extrabold text-[#FF6B00] border border-[#FF6B00]/70 px-3 py-0.5 rounded-full shrink-0 shadow-2xs",
                          isIncognito ? "bg-white/10" : "bg-white dark:bg-zinc-900"
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

        <div className="text-[11.5px] sm:text-[12px] text-gray-400 dark:text-zinc-500 text-center mt-2.5 sm:mt-3 select-none">
          Rivinity can make mistakes. Check important info.
        </div>
      </div>
    );
  };

  /* =========================================================
     RENDER FEATURE VIEW
  ========================================================= */

  const renderView = () => {
    switch (activeFeature) {
      case "contextual-chat":
        return <ContextualChatView />;
      case "smart-notes":
        return <SmartNotesView />;
      case "flashcards":
        return <FlashcardsView />;
      case "quizzes":
        return <QuizzesView />;
      case "ai-podcast":
        return <AIPodcastView />;
      case "voice-transcribe":
        return <VoiceTranscribeView />;
      case "homework-planner":
        return <HomeworkPlannerView />;
      case "exam-lab":
        return <ExamLabView />;
      case "debate":
        return <DebateView />;
      case "study-companion":
        return <StudyCompanionView />;
      case "data-analyst":
        return <DataAnalystView />;
      default:
        return null;
    }
  };

  /* =========================================================
     FEATURE PAGE
  ========================================================= */

  if (activeFeature !== "landing") {
    const currentFeatureObj = features.find((f) => f.id === activeFeature);
    const FeatureIcon = currentFeatureObj?.icon || Sparkles;

    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-white dark:bg-zinc-950">
        {/* TOP BAR */}
        <div className="px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between shrink-0 border-b border-slate-100 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onFeatureChange("landing")}
              aria-label="Back to prompt"
              title="Back to prompt"
              className="
                flex h-8 w-8 items-center justify-center rounded-lg
                text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white
                hover:bg-slate-100 dark:hover:bg-zinc-800
                transition-all cursor-pointer
              "
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300">
              <FeatureIcon className="w-4 h-4 text-[#FF6B00]" />
              <span>{currentFeatureObj?.label || "RivinityLM"}</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE VIEW CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
          <div className="animate-float-in pb-4">
            {renderView()}
          </div>
        </div>

        {/* BOTTOM CHAT PROMPT BOX ON EVERY PAGE */}
        <div className="w-full shrink-0 z-20 px-3 sm:px-6 pb-2.5 pt-1.5 bg-gradient-to-t from-white dark:from-zinc-950 via-white/90 dark:via-zinc-950/90 to-transparent">
          <div className="w-full max-w-[760px] mx-auto">
            {renderPromptBox(false)}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     LANDING PAGE
  ========================================================= */

  return (
    <div className="flex flex-1 flex-col min-w-0 min-h-0 h-full w-full overflow-hidden relative bg-white dark:bg-zinc-950">
      {/* Centered Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden">
        <img
          src="/watermark.png"
          alt=""
          className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] object-contain opacity-[0.04] dark:opacity-[0.03]"
        />
      </div>

      {/* Main Content Area */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-full max-w-[760px] mx-auto flex flex-col items-center my-auto animate-in fade-in duration-300">
          {/* HERO HEADING */}
          <div className="text-center mb-6 sm:mb-8 select-none">
            <div className="text-3xl sm:text-4xl md:text-[46px] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
              What&apos;d you like to
              <br />
              learn today?
            </div>
          </div>

          {/* PROMPT BOX ON LANDING PAGE */}
          {renderPromptBox(false)}
        </div>
      </main>
    </div>
  );
};

export default RivinityLMMain;
