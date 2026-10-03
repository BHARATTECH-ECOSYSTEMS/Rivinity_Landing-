"use client";

import { useState } from "react";
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Bookmark,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface Section {
  cue: string;
  detail: string;
  tags?: string[];
}

interface Note {
  id: number;
  title: string;
  subject: string;
  format: "Cornell" | "Outline" | "Executive";
  sections: Section[];
  summary: string;
  date: string;
}

const sampleNotes: Note[] = [
  {
    id: 1,
    title: "Quantum Mechanics & Superposition",
    subject: "Physics 401",
    format: "Cornell",
    sections: [
      {
        cue: "What is quantum superposition?",
        detail:
          "The principle that a physical system exists partly in all theoretically possible states simultaneously. When measured, it collapses into a deterministic single eigenstate.",
        tags: ["Quantum", "Wave Function", "Postulates"],
      },
      {
        cue: "Schrödinger Equation role",
        detail:
          "Linear partial differential equation governing the wave function evolution of a quantum-mechanical system via the Hamiltonian operator.",
        tags: ["Mathematics", "Hamiltonian"],
      },
      {
        cue: "Measurement Problem",
        detail:
          "The dilemma of how or whether wave function collapse occurs. Key interpretations include Copenhagen, Many-Worlds, and De Broglie-Bohm pilot waves.",
        tags: ["Philosophy", "Interpretations"],
      },
    ],
    summary:
      "Superposition underpins quantum computation and quantum optics. State vectors evolve deterministically until external observation introduces probabilistic collapse.",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "The Industrial Revolution in Europe",
    subject: "World History",
    format: "Outline",
    sections: [
      {
        cue: "Catalysts & Conditions",
        detail:
          "Britain led industrialization due to rich coal beds, patent law institutional protections, deep capital markets, and naval trade supremacy.",
        tags: ["Britain", "Coal", "Capital"],
      },
      {
        cue: "Key Inventions",
        detail:
          "James Watt's steam engine condenser, Hargreaves' Spinning Jenny, and Cort's puddling process revolutionized textile throughput and metallurgy.",
        tags: ["Steam", "Mechanization"],
      },
    ],
    summary:
      "Transition from agrarian handicraft economies to machine manufacturing fundamentally altered demographics, urbanization rates, and global geopolitical dominance.",
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
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <FileText className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>SmartNotes</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                {noteStyle} System
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
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy Markdown"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs space-y-2.5">
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
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generating ? "Synthesizing..." : "Create SmartNote"}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500 dark:text-zinc-400">Format:</span>
                {(["Cornell", "Outline", "Executive"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setNoteStyle(fmt)}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      noteStyle === fmt
                        ? "bg-[#FF6B00] text-white shadow-2xs font-semibold"
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-800 text-xs">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter notes..."
                  className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 w-24 sm:w-32"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 shrink-0">Saved Notes:</span>
            {filteredNotes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNote(n)}
                className={`px-3 py-1 rounded-xl text-xs font-medium shrink-0 border transition-all cursor-pointer ${
                  selectedNote.id === n.id
                    ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-xs"
                    : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800 hover:border-slate-300"
                }`}
              >
                {n.title.length > 25 ? `${n.title.slice(0, 25)}…` : n.title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-800/40 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00]">
                    {selectedNote.subject} • Format: {selectedNote.format}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 mt-1">
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

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-zinc-800">
              <div className="md:col-span-4 p-4 sm:p-5 bg-slate-50/30 dark:bg-zinc-900/30 space-y-4 sm:space-y-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <Bookmark className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Recall Cues & Questions</span>
                </div>

                {selectedNote.sections.map((section, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 space-y-2 shadow-2xs">
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

              <div className="md:col-span-8 p-4 sm:p-5 space-y-4 sm:space-y-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Comprehensive Lecture Notes</span>
                </div>

                {selectedNote.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2 pb-4 border-b last:border-0 border-slate-100 dark:border-zinc-800">
                    <div className="text-[13px] font-bold text-[#FF6B00]">
                      Section {idx + 1}: {section.cue}
                    </div>
                    <div className="text-[13px] sm:text-[13.5px] text-slate-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">
                      {section.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-zinc-800 bg-orange-500/5 dark:bg-orange-500/10 p-4 sm:p-5">
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