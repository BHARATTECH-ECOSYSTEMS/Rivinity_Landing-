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
  BookOpen,
  Copy,
  Printer,
  Bookmark,
  Layers,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface NoteSection {
  cue: string;
  detail: string;
  tags?: string[];
}

interface Note {
  id: number;
  title: string;
  subject: string;
  sections: NoteSection[];
  summary: string;
  date: string;
  format: "Cornell" | "Outline" | "Executive";
}

const sampleNotes: Note[] = [
  {
    id: 1,
    title: "Photosynthesis & Cellular Respiration",
    subject: "Cellular Biology",
    format: "Cornell",
    sections: [
      {
        cue: "Chemical Formula & Reactants",
        detail:
          "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\nOccurs within specialized chloroplast organelles containing thylakoid membranes and liquid stroma.",
        tags: ["Reactions", "Chloroplasts"],
      },
      {
        cue: "Two-Stage Mechanism",
        detail:
          "1. Light-Dependent Reactions:\n• Occur across the thylakoid membranes\n• Generate ATP and NADPH while releasing O₂ gas as a byproduct\n\n2. Calvin Cycle (Light-Independent):\n• Takes place inside the stroma\n• Fixes atmospheric CO₂ to assemble glucose precursors using ATP/NADPH.",
        tags: ["Light Reactions", "Calvin Cycle"],
      },
      {
        cue: "Pigment Absorption Spectrum",
        detail:
          "Chlorophyll-a and Chlorophyll-b absorb blue (430-450nm) and red (640-660nm) wavelengths while reflecting green light (giving leaves their color).",
        tags: ["Chlorophyll", "Wavelengths"],
      },
    ],
    summary:
      "Photosynthesis harnesses solar energy to synthesize carbohydrates from carbon dioxide and water through two coordinated phases (Thylakoid Photophosphorylation and Stroma Carbon Fixation), supplying the energetic basis for aerobic life.",
    date: "Today",
  },
  {
    id: 2,
    title: "World War II Geopolitics & Origins",
    subject: "Modern History",
    format: "Cornell",
    sections: [
      {
        cue: "Treaty of Versailles (1919)",
        detail:
          "Imposed Article 231 (War Guilt clause), punitive financial reparations of 132 billion gold marks, and demilitarization of the Rhineland, fostering economic collapse in Weimar Germany.",
        tags: ["Versailles", "Weimar"],
      },
      {
        cue: "Failure of Collective Security",
        detail:
          "The League of Nations lacked enforcement mechanisms without US participation or a standing force, failing to halt the 1931 Manchurian crisis and 1935 Abyssinian invasion.",
        tags: ["League of Nations", "Appeasement"],
      },
    ],
    summary:
      "WWII emerged from the punitive settlements of WWI, the breakdown of multilateral peacekeeping, and totalitarian expansionism across Europe and the Pacific.",
    date: "Yesterday",
  },
];

export default function SmartNotesView() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [selectedNote, setSelectedNote] = useState<Note>(sampleNotes[0]);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [noteStyle, setNoteStyle] = useState<"Cornell" | "Outline" | "Executive">("Cornell");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const generateNote = () => {
    if (!topic.trim() || generating) return;

    setGenerating(true);
    setTimeout(() => {
      const newNote: Note = {
        id: Date.now(),
        title: topic.trim(),
        subject: "AI Synthesized Topic",
        format: noteStyle,
        sections: [
          {
            cue: "Core Definition & Scope",
            detail: `Fundamental overview and essential principles of ${topic.trim()}.\n\n• Key axiom 1: Primary mechanistic behavior\n• Key axiom 2: Empirical boundary conditions and constraints.`,
            tags: ["Fundamentals", "Axioms"],
          },
          {
            cue: "In-Depth Mechanisms",
            detail: `Step-by-step analytical breakdown of ${topic.trim()} with practical scenarios and real-world system modeling.`,
            tags: ["Mechanisms", "Applications"],
          },
        ],
        summary: `Synthesized executive summary for ${topic.trim()} capturing critical concepts and actionable study cues.`,
        date: "Just now",
      };

      setNotes((prev) => [newNote, ...prev]);
      setSelectedNote(newNote);
      setTopic("");
      setGenerating(false);
      toast.success("Smart note generated!");
    }, 1400);
  };

  const copyNoteContent = () => {
    if (!selectedNote) return;
    const text = `# ${selectedNote.title}\nSubject: ${selectedNote.subject}\n\n${selectedNote.sections
      .map((s) => `## Cue: ${s.cue}\n${s.detail}`)
      .join("\n\n")}\n\n### Summary\n${selectedNote.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Note copied as Markdown!");
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* SUB-HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <FileText className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>SmartNotes</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Cornell System
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Structured note formatting with cues, comprehensive details & summaries
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyNoteContent}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy Markdown"}</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          {/* GENERATE PROMPT BAR */}
          <div className="mb-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generateNote();
                }}
                placeholder="Enter any topic (e.g. Thermodynamics, French Revolution, Calculus Limits)..."
                className="flex-1 bg-transparent px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border border-slate-200 dark:border-zinc-800 rounded-xl focus:border-[#FF6B00]"
              />
              <button
                type="button"
                onClick={generateNote}
                disabled={generating || !topic.trim()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generating ? "Synthesizing..." : "Create SmartNote"}</span>
              </button>
            </div>
          </div>

          {/* CORNELL NOTE FORMAT SKELETON */}
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            {/* TITLE & METADATA BAR */}
            <div className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-800/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00]">
                    {selectedNote.subject} • Format: {selectedNote.format}
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-zinc-100 mt-1">
                    {selectedNote.title}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium">
                    Verified Notes
                  </span>
                </div>
              </div>
            </div>

            {/* CORNELL TWO-COLUMN BODY */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-zinc-800">
              {/* LEFT COLUMN: CUES & QUESTIONS (4 cols) */}
              <div className="md:col-span-4 p-5 bg-slate-50/30 dark:bg-zinc-900/30 space-y-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <Bookmark className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Recall Cues & Questions</span>
                </div>

                {selectedNote.sections.map((section, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 space-y-2">
                    <div className="text-[12.5px] font-semibold text-slate-900 dark:text-zinc-100">
                      {section.cue}
                    </div>
                    {section.tags && (
                      <div className="flex flex-wrap gap-1">
                        {section.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-md bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] text-slate-600 dark:text-zinc-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN: DETAILED NOTES (8 cols) */}
              <div className="md:col-span-8 p-5 space-y-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Comprehensive Lecture Notes</span>
                </div>

                {selectedNote.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2 pb-4 border-b last:border-0 border-slate-100 dark:border-zinc-800">
                    <div className="text-[13px] font-bold text-[#FF6B00]">
                      Section {idx + 1}: {section.cue}
                    </div>
                    <div className="text-[13.5px] text-slate-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">
                      {section.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CORNELL FOOTER: SUMMARY BLOCK */}
            <div className="border-t border-slate-200 dark:border-zinc-800 bg-orange-500/5 dark:bg-orange-500/10 p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#FF6B00] mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Executive Summary</span>
              </div>
              <div className="text-[13px] sm:text-[13.5px] text-slate-800 dark:text-zinc-200 leading-relaxed">
                {selectedNote.summary}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}