"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Share2,
  Plus,
  ChevronDown,
  Check,
  Search,
  MoreHorizontal,
} from "lucide-react";

interface Note {
  id: number;
  title: string;
  cue: string;
  detail: string;
  summary: string;
  date: string;
}

const sampleNotes: Note[] = [
  {
    id: 1,
    title: "Photosynthesis",
    cue: "What is the equation for photosynthesis?",
    detail:
      "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\nPhotosynthesis occurs in two stages:\n1. Light-dependent reactions (in thylakoids)\n2. Calvin Cycle (in stroma)\n\nChlorophyll absorbs red and blue light, reflecting green.",
    summary:
      "Photosynthesis converts CO₂ and water into glucose using light energy. It has two stages: light-dependent reactions and the Calvin Cycle.",
    date: "Today",
  },
  {
    id: 2,
    title: "World War II Causes",
    cue: "What led to WWII?",
    detail:
      "Key causes:\n• Treaty of Versailles (1919) — harsh reparations on Germany\n• Rise of Fascism — Mussolini (Italy), Hitler (Germany)\n• Failure of Appeasement — Munich Agreement 1938\n• Invasion of Poland — September 1, 1939\n• Economic instability — Great Depression effects",
    summary:
      "WWII was caused by the Treaty of Versailles, rise of fascism, failed appeasement, and economic instability.",
    date: "Yesterday",
  },
];

const SmartNotesView = () => {
  const [notes, setNotes] = useState<Note[]>(
    sampleNotes
  );

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(sampleNotes[0]);

  const [topic, setTopic] = useState("");

  const [generating, setGenerating] =
    useState(false);

  const [noteStyle, setNoteStyle] =
    useState("Cornell");

  const [showStyleDropdown, setShowStyleDropdown] =
    useState(false);

  const [search, setSearch] = useState("");

  /* =========================================================
     GENERATE NOTE
  ========================================================= */

  const generateNote = () => {
    if (!topic.trim() || generating) return;

    setGenerating(true);

    setTimeout(() => {
      const newNote: Note = {
        id: Date.now(),
        title: topic.trim(),
        cue: `What are the key concepts of ${topic.trim()}?`,
        detail:
          `AI-generated detailed notes on ${topic.trim()} will appear here with comprehensive explanations, examples, and key terminology.`,
        summary:
          `Summary of ${topic.trim()}: Core concepts and their interconnections explained concisely.`,
        date: "Just now",
      };

      setNotes((prev) => [
        newNote,
        ...prev,
      ]);

      setSelectedNote(newNote);
      setTopic("");
      setGenerating(false);
    }, 1500);
  };

  /* =========================================================
     FILTER NOTES
  ========================================================= */

  const filteredNotes = notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        bg-white
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-gray-200/70
          bg-white/80
          px-5
          py-3
          backdrop-blur-sm
          sm:px-7
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-gray-50
            "
          >
            <FileText
              className="h-4.5 w-4.5 text-gray-500"
              strokeWidth={2}
            />
          </div>

          <div>
            <h1
              className="
                text-[14px]
                font-semibold
                text-[#242631]
              "
            >
              SmartNotes
            </h1>

            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              Create structured notes with AI
            </p>
          </div>
        </div>

        {/* NOTE STYLE */}

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowStyleDropdown(
                !showStyleDropdown
              )
            }
            className="
              flex
              h-9
              items-center
              gap-1.5
              rounded-xl
              border
              border-gray-200
              bg-white
              px-3
              text-[11px]
              font-medium
              text-gray-600
              shadow-sm
              transition-all
              hover:border-gray-300
              hover:text-gray-900
            "
          >
            {noteStyle}

            <ChevronDown
              className="h-3.5 w-3.5 text-gray-400"
            />
          </button>

          {showStyleDropdown && (
            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-2
                w-36
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                p-1
                shadow-[0_8px_30px_rgba(0,0,0,0.10)]
              "
            >
              {[
                "Cornell",
                "Outline",
                "Mind Map",
                "Summary",
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    setNoteStyle(style);
                    setShowStyleDropdown(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-[11px]
                    transition-colors

                    ${
                      style === noteStyle
                        ? "bg-orange-50 text-[#FF5500]"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {style}

                  {style === noteStyle && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
  className="
    flex
    min-h-0
    flex-1
    flex-col
    gap-4
    overflow-y-auto
    p-4
    sm:p-5
    lg:flex-row
    lg:gap-5
    lg:overflow-hidden
    lg:p-6
  "
>
        {/* ===================================================
            LEFT NOTES PANEL
        =================================================== */}

        <aside
          className="
            flex
            w-full
            lg:w-[230px]
            max-h-[420px]
            lg:max-h-none
            shrink-0
            flex-col
            overflow-hidden
            rounded-[20px]
            border
            border-gray-200/80
            bg-white
            shadow-[0_2px_12px_rgba(0,0,0,0.035)]
          "
        >
          {/* SEARCH */}

          <div className="p-3">
            <div
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-gray-50/70
                px-3
              "
            >
              <Search
                className="
                  h-3.5
                  w-3.5
                  shrink-0
                  text-gray-400
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search notes..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-[11px]
                  text-gray-700
                  outline-none
                  placeholder:text-gray-400
                "
              />
            </div>
          </div>

          {/* CREATE */}

          <div className="px-3 pb-3">
            <div
              className="
                rounded-[15px]
                border
                border-orange-100
                bg-orange-50/40
                p-3
              "
            >
              <div className="mb-2 flex items-center gap-1.5">
                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                    text-[#FF5500]
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-semibold
                    text-gray-700
                  "
                >
                  Generate Notes
                </span>
              </div>

              <input
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    generateNote();
                  }
                }}
                placeholder="Enter a topic..."
                className="
                  mb-2
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-2.5
                  py-2
                  text-[11px]
                  text-gray-700
                  outline-none
                  placeholder:text-gray-400
                  focus:border-orange-200
                "
              />

              <button
                type="button"
                onClick={generateNote}
                disabled={generating}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  bg-[#FF5500]
                  py-2
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-[0_3px_10px_rgba(255,85,0,0.15)]
                  transition-all
                  hover:bg-[#E64D00]
                  disabled:cursor-default
                  disabled:opacity-60
                "
              >
                <Sparkles className="h-3 w-3" />

                {generating
                  ? "Generating..."
                  : "Generate Notes"}
              </button>
            </div>
          </div>

          {/* NOTES HEADING */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-gray-100
              px-4
              py-3
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-gray-400
              "
            >
              Your Notes
            </span>

            <button
              type="button"
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-lg
                text-gray-400
                transition-colors
                hover:bg-gray-100
                hover:text-gray-700
              "
              title="New note"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* NOTES LIST */}

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              px-2
              pb-2
            "
          >
            <div className="space-y-1">
              {filteredNotes.map((note) => {
                const selected =
                  selectedNote?.id === note.id;

                return (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() =>
                      setSelectedNote(note)
                    }
                    className={`
                      w-full
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      transition-all

                      ${
                        selected
                          ? "border border-orange-100 bg-orange-50/60"
                          : "border border-transparent hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`
                          mt-0.5
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg

                          ${
                            selected
                              ? "bg-orange-100 text-[#FF5500]"
                              : "bg-gray-100 text-gray-400"
                          }
                        `}
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`
                            truncate
                            text-[12px]
                            font-medium

                            ${
                              selected
                                ? "text-[#FF5500]"
                                : "text-gray-700"
                            }
                          `}
                        >
                          {note.title}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-gray-400
                          "
                        >
                          {note.date}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredNotes.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <p
                    className="
                      text-[11px]
                      text-gray-400
                    "
                  >
                    No notes found
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ===================================================
            NOTE DETAIL
        =================================================== */}

        {selectedNote && (
          <section
            className="
              flex
              min-w-0
              flex-1
              flex-col
              overflow-hidden
              rounded-[20px]
              border
              border-gray-200/80
              bg-white
              shadow-[0_2px_12px_rgba(0,0,0,0.035)]
            "
          >
            {/* NOTE HEADER */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-gray-100
                px-5
                py-4
                sm:px-6
              "
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2
                    className="
                      truncate
                      text-[17px]
                      font-semibold
                      tracking-[-0.01em]
                      text-[#242631]
                    "
                  >
                    {selectedNote.title}
                  </h2>

                  <span
                    className="
                      rounded-full
                      bg-orange-50
                      px-2
                      py-0.5
                      text-[9px]
                      font-semibold
                      text-[#FF5500]
                    "
                  >
                    {noteStyle}
                  </span>
                </div>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-gray-400
                  "
                >
                  Updated {selectedNote.date}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-400
                    transition-colors
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-400
                    transition-colors
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-400
                    transition-colors
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  title="More"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* NOTE BODY */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-5
                py-5
                sm:px-6
                sm:py-6
              "
            >
              <div className="mx-auto max-w-[900px]">
                {/* =================================================
                    CORNELL NOTE
                ================================================= */}

                <div
                  className="
                    overflow-hidden
                    rounded-[16px]
                    border
                    border-gray-200/80
                  "
                >
                  {/* TABLE HEADER */}

                  <div
                    className="
                      grid
                      grid-cols-[190px_1fr]
                      border-b
                      border-gray-200
                      bg-gray-50/80
                    "
                  >
                    <div
                      className="
                        border-r
                        border-gray-200
                        px-4
                        py-3
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]
                          text-gray-400
                        "
                      >
                        Cue / Questions
                      </p>
                    </div>

                    <div className="px-4 py-3">
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]
                          text-gray-400
                        "
                      >
                        Notes
                      </p>
                    </div>
                  </div>

                  {/* TABLE BODY */}

                  <div
                    className="
                      grid
                      grid-cols-[190px_1fr]
                    "
                  >
                    <div
                      className="
                        border-r
                        border-gray-200
                        bg-orange-50/30
                        p-4
                      "
                    >
                      <p
                        className="
                          text-[13px]
                          leading-[1.7]
                          text-gray-700
                        "
                      >
                        {selectedNote.cue}
                      </p>
                    </div>

                    <div className="bg-white p-4">
                      <p
                        className="
                          whitespace-pre-wrap
                          text-[13px]
                          leading-[1.8]
                          text-gray-600
                        "
                      >
                        {selectedNote.detail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div
                  className="
                    mt-5
                    rounded-[16px]
                    border
                    border-orange-100
                    bg-orange-50/40
                    p-5
                  "
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-orange-100
                      "
                    >
                      <Sparkles
                        className="
                          h-3.5
                          w-3.5
                          text-[#FF5500]
                        "
                      />
                    </div>

                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                        text-[#D94A00]
                      "
                    >
                      AI Summary
                    </p>
                  </div>

                  <p
                    className="
                      text-[13px]
                      leading-[1.8]
                      text-gray-600
                    "
                  >
                    {selectedNote.summary}
                  </p>
                </div>

                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-2
                      text-[11px]
                      font-medium
                      text-gray-600
                      transition-all
                      hover:border-orange-200
                      hover:bg-orange-50/40
                      hover:text-[#FF5500]
                    "
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Improve Notes
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-2
                      text-[11px]
                      font-medium
                      text-gray-600
                      transition-all
                      hover:border-orange-200
                      hover:bg-orange-50/40
                      hover:text-[#FF5500]
                    "
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Key Point
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SmartNotesView;