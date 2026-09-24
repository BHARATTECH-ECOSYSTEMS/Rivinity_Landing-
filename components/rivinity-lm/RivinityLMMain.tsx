"use client";

import { useRef, useState } from "react";
import {
  Search,
  X,
  Bell,
  Moon,
  ChevronDown,
  ArrowUp,
  Mic,
  Globe,
  ArrowLeft,
  Wand2,
  Code,
  Paperclip,
  MessageSquare,
  StickyNote,
  Layers,
  HelpCircle,
  Podcast,
  FileAudio,
  CalendarCheck,
  GraduationCap,
  Swords,
  Bot,
  BarChart3,
} from "lucide-react";

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

import { USER } from "@/lib/profile";

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

/* =========================================================
   LEARNING TOOLS
========================================================= */

const features = [
  {
    id: "contextual-chat",
    icon: MessageSquare,
    label: "Chat",
  },
  {
    id: "smart-notes",
    icon: StickyNote,
    label: "SmartNotes",
  },
  {
    id: "flashcards",
    icon: Layers,
    label: "Flashcards",
  },
  {
    id: "quizzes",
    icon: HelpCircle,
    label: "Quizzes",
  },
  {
    id: "ai-podcast",
    icon: Podcast,
    label: "Podcast",
  },
  {
    id: "voice-transcribe",
    icon: FileAudio,
    label: "Transcribe",
  },
  {
    id: "homework-planner",
    icon: CalendarCheck,
    label: "Homework",
  },
  {
    id: "exam-lab",
    icon: GraduationCap,
    label: "ExamLab",
  },
  {
    id: "debate",
    icon: Swords,
    label: "Debate",
  },
  {
    id: "study-companion",
    icon: Bot,
    label: "Companion",
  },
  {
    id: "data-analyst",
    icon: BarChart3,
    label: "Analyst",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const RivinityLMMain = ({
  activeFeature,
  onFeatureChange,
}: Props) => {
  const [input, setInput] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");

  const [attachedFile, setAttachedFile] =
    useState<File | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* =========================================================
     ALL TOOLS MENU
  ========================================================= */

  const [selectedPromptTool, setSelectedPromptTool] = useState<string | null>(null);

  /* =========================================================
     SEND
  ========================================================= */

  const handleSend = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    // If the user selected a specific tool above the prompt,
    // keep the prompt routed to that tool. Otherwise use Chat.
    const targetTool = selectedPromptTool ?? "contextual-chat";

    onFeatureChange(targetTool);
    setInput("");
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
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-[#FAF9F7]">
        <div className="px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => onFeatureChange("landing")}
            aria-label="Back to prompt"
            title="Back to prompt"
            className="
              flex h-8 w-8 items-center justify-center rounded-lg
              text-muted-foreground/60
              hover:bg-accent/50 hover:text-foreground/80
              transition-all cursor-pointer
            "
          >
            <ArrowLeft size={17} strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
          <div className="animate-float-in">
            {renderView()}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     LANDING PAGE
  ========================================================= */

  return (
    <div
      className="
        flex
        flex-1
        flex-col
        min-w-0
        min-h-0
        h-full
        w-full
        overflow-hidden
        bg-[#FAF9F7]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          relative
          z-30
          flex
          h-14
          sm:h-[72px]
          shrink-0
          items-center
          justify-between
          w-full
          px-3.5
          sm:px-6
          bg-transparent
        "
      >
        {/* SEARCH */}

        <div className="flex items-center min-w-0">
          <div
            className="
              group
              relative
              flex
              items-center
              overflow-hidden
              rounded-full
              transition-all
              duration-300
              ease-out
              w-9
              hover:w-[190px]
              focus-within:w-[190px]
            "
          >
            <Search
              className="
                pointer-events-none
                absolute
                left-2
                z-10
                h-4
                w-4
                text-[#1C1C1C]
              "
              strokeWidth={2}
            />

            <input
              type="text"
              value={headerSearch}
              onChange={(e) =>
                setHeaderSearch(e.target.value)
              }
              placeholder="Search chats, tools..."
              className="
                w-full
                h-9
                rounded-full
                border
                border-transparent
                bg-transparent
                pl-9
                pr-8
                text-[13px]
                outline-none
                placeholder:text-gray-400
                hover:border-gray-200/80
                hover:bg-white/70
                focus:border-gray-200
                focus:bg-white
                transition-all
              "
            />

            {headerSearch && (
              <button
                type="button"
                onClick={() =>
                  setHeaderSearch("")
                }
                className="
                  absolute
                  right-2
                  z-10
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  hover:bg-black/5
                "
              >
                <X
                  className="h-3.5 w-3.5 text-[#1C1C1C]"
                  strokeWidth={2}
                />
              </button>
            )}
          </div>
        </div>

        {/* HEADER RIGHT */}

        <div className="flex items-center gap-1.5">
          {/* NOTIFICATION */}

          <button
            type="button"
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-gray-200/70
              bg-white
              shadow-xs
              hover:bg-gray-50
              transition-all
            "
          >
            <Bell
              className="h-4 w-4 text-[#1C1C1C]"
              strokeWidth={1.9}
            />

            <span
              className="
                absolute
                right-1
                top-1
                h-1.5
                w-1.5
                rounded-full
                bg-[#FF5500]
              "
            />
          </button>

          {/* MOON */}

          <button
            type="button"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-gray-200/70
              bg-white
              shadow-xs
              hover:bg-gray-50
              transition-all
            "
          >
            <Moon
              className="h-4 w-4 text-[#1C1C1C]"
              strokeWidth={1.9}
            />
          </button>

          {/* PROFILE */}

          <div
            className="
              flex
              h-10
              items-center
              gap-2
              rounded-full
              border
              border-gray-200/80
              bg-white
              pl-1.5
              pr-3
              shadow-xs
              cursor-pointer
              hover:bg-gray-50
              transition-colors
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#FF5500]
                text-[11px]
                font-bold
                text-white
              "
            >
              {USER.initials}
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span
                className="
                  text-[13px]
                  font-semibold
                  text-[#1C1C1C]
                "
              >
                {USER.name}
              </span>

              <span className="text-[11px] text-gray-400">
                Pro Workspace
              </span>
            </div>

            <ChevronDown
              className="
                hidden
                sm:block
                ml-1
                h-4
                w-4
                text-gray-500
              "
            />
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          relative
          flex-1
          min-h-0
          w-full
          overflow-hidden
        "
      >
        {/* ===================================================
            WATERMARK
        =================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[48%]
            -translate-x-1/2
            -translate-y-1/2
            pointer-events-none
            select-none
            z-0
          "
        >
          <img
            src="/watermark.png"
            alt=""
            className="
              w-[58vw]
              max-w-[620px]
              h-auto
              object-contain
              opacity-[0.035]
            "
          />
        </div>

        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="
            absolute
            left-1/2
            top-[48%]
            -translate-x-1/2
            -translate-y-1/2
            z-10
            w-full
            max-w-[920px]
            flex
            flex-col
            items-center
          "
        >
          <h1
            className="
              text-center
              text-[46px]
              sm:text-[54px]
              lg:text-[58px]
              font-semibold
              leading-[1.05]
              tracking-[-0.035em]
              text-[#30313D]
            "
          >
            What'd you like to
            <br />
            learn today?
          </h1>
        </section>

        {/* ===================================================
            PROMPT BOX
        =================================================== */}

        <section
          className="
            absolute
            left-1/2
            top-[78%]
            -translate-x-1/2
            -translate-y-1/2
            z-20
            w-[calc(100%-32px)]
            max-w-[920px]
          "
        >
          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-[22px]
              border
              border-gray-200/80
              bg-white
              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            "
          >
            {/* =================================================
                PROMPT TOOL TABS
            ================================================= */}

            {selectedPromptTool === null ? (
              <div
                className="
                  border-b border-gray-100 px-2 py-1.5 sm:px-3
                  overflow-x-auto whitespace-nowrap
                  [scrollbar-width:none] [-ms-overflow-style:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                <div className="flex min-w-max items-center gap-0.5">
                  {features.map((tool) => {
                    const Icon = tool.icon;

                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => {
                          setSelectedPromptTool(tool.id);
                        }}
                        className="
                          flex h-8 shrink-0 items-center gap-1.5 rounded-xl
                          px-2.5 text-[11px] sm:text-[12px] font-medium
                          text-gray-500 hover:bg-gray-50 hover:text-gray-900
                          transition-colors cursor-pointer
                        "
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="relative flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-1.5 sm:px-4">
                {(() => {
                  const selectedTool = features.find(
                    (tool) => tool.id === selectedPromptTool
                  );
                  const SelectedIcon = selectedTool?.icon ?? GraduationCap;

                  return (
                    <button
                      type="button"
                      onClick={() => setSelectedPromptTool(null)}
                      className="
                        flex min-w-0 h-8 items-center gap-1.5 rounded-xl
                        px-2.5 text-[11px] sm:text-[12px] font-medium
                        text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer
                      "
                      title="Show all tools"
                    >
                      <SelectedIcon className="h-3.5 w-3.5 shrink-0 text-gray-600" strokeWidth={2} />
                      <span className="truncate">{selectedTool?.label ?? "Study Session"}</span>
                    </button>
                  );
                })()}

                <button
                  type="button"
                  onClick={() => setSelectedPromptTool(null)}
                  className="
                    flex h-8 shrink-0 items-center rounded-xl px-2.5
                    text-[11px] sm:text-[12px] font-medium text-gray-500
                    hover:bg-gray-50 hover:text-gray-800 transition-colors cursor-pointer
                  "
                  title="Show all tools"
                >
                  All Tools
                </button>
              </div>
            )}

            {/* =================================================
                TEXTAREA
            ================================================= */}

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything..."
              rows={2}
              className="
                block
                w-full
                resize-none
                bg-transparent
                px-5
                pb-1
                pt-3
                text-[15px]
                leading-relaxed
                text-[#1C1C1C]
                outline-none
                placeholder:text-gray-400
              "
            />

            {/* =================================================
                BOTTOM ACTION BAR
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                w-full
                px-3
                pb-3
                pt-1
                sm:px-5
              "
            >
              {/* =================================================
                  LEFT CONTROLS
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-1
                  sm:gap-1.5
                  min-w-0
                "
              >
                {/* GLOBE */}

                <button
                  type="button"
                  className="
                    hidden
                    sm:flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                    transition-colors
                    cursor-pointer
                    shrink-0
                  "
                  title="Web search"
                >
                  <Globe
                    className="w-4.5 h-4.5"
                    strokeWidth={2}
                  />
                </button>

                {/* WAND */}

                <button
                  type="button"
                  onClick={() => {
                    if (!input.trim()) return;

                    setInput(
                      `${input.trim()} — provide detailed reasoning, structured findings, and useful examples.`
                    );
                  }}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                    transition-colors
                    cursor-pointer
                    shrink-0
                  "
                  title="Enhance prompt"
                >
                  <Wand2
                    className="w-4 h-4"
                    strokeWidth={2}
                  />
                </button>

                {/* LAYERS */}

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                    transition-colors
                    cursor-pointer
                    shrink-0
                  "
                  title="Skills"
                >
                  <Layers
                    className="w-4 h-4"
                    strokeWidth={2}
                  />
                </button>

                {/* CODE */}

                <button
                  type="button"
                  className="
                    hidden
                    sm:flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                    transition-colors
                    cursor-pointer
                    shrink-0
                  "
                  title="Code"
                >
                  <Code
                    className="w-4.5 h-4.5"
                    strokeWidth={2}
                  />
                </button>

                {/* PAPERCLIP */}

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                    transition-colors
                    cursor-pointer
                    shrink-0
                  "
                  title="Attach file"
                >
                  <Paperclip
                    className="w-4 h-4"
                    strokeWidth={2}
                  />
                </button>

                {/* HIDDEN FILE INPUT */}

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0];

                    if (file) {
                      setAttachedFile(file);
                    }
                  }}
                />

                {/* ATTACHED FILE INDICATOR */}

                {attachedFile && (
                  <span
                    className="
                      hidden
                      sm:block
                      max-w-[120px]
                      truncate
                      text-[11px]
                      text-gray-400
                    "
                    title={attachedFile.name}
                  >
                    {attachedFile.name}
                  </span>
                )}
              </div>

              {/* =================================================
                  RIGHT CONTROLS
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  sm:gap-2.5
                  shrink-0
                "
              >
                {/* MIC */}

                <button
                  type="button"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    hover:text-gray-800
                    hover:bg-gray-100
                    transition-colors
                    cursor-pointer
                  "
                  title="Voice input"
                >
                  <Mic
                    className="w-[18px] h-[18px]"
                    strokeWidth={2}
                  />
                </button>

                {/* SEND */}

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    transition-all

                    ${
                      input.trim()
                        ? "bg-[#FF5500] hover:bg-[#E64D00] cursor-pointer shadow-[0_2px_10px_rgba(255,85,0,0.30)] active:scale-95"
                        : "bg-[#FFA285] cursor-default"
                    }
                  `}
                  title="Send"
                >
                  <ArrowUp
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.6}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RivinityLMMain;
