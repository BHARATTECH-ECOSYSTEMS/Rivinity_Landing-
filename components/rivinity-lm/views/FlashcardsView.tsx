"use client";

import { useState } from "react";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  X,
  Shuffle,
  Layers,
  Flame,
  Brain,
  Award,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  hint?: string;
  difficulty: "easy" | "medium" | "hard";
  mastered: boolean;
  category: string;
}

const initialCards: Flashcard[] = [
  {
    id: 1,
    front: "What is the primary role of the Mitochondria in eukaryotic cells?",
    back: "Mitochondria produce ATP (Adenosine Triphosphate) via oxidative phosphorylation and the Krebs cycle, fueling cellular metabolism.",
    hint: "Often called the cellular powerhouse",
    difficulty: "easy",
    mastered: false,
    category: "Cell Biology",
  },
  {
    id: 2,
    front: "State Newton's Second Law of Motion and its mathematical expression.",
    back: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass: F = ma (or F = dp/dt in relativistic terms).",
    hint: "Relates Force, Mass, and Acceleration",
    difficulty: "medium",
    mastered: false,
    category: "Classical Mechanics",
  },
  {
    id: 3,
    front: "Explain the mechanism of Action Potentials in neurons.",
    back: "Voltage-gated Na+ channels rapidly open causing depolarization (+30mV), followed by Na+ inactivation and K+ efflux causing repolarization and brief hyperpolarization.",
    hint: "Involves Na+/K+ ion flux across the axon membrane",
    difficulty: "hard",
    mastered: false,
    category: "Neuroscience",
  },
  {
    id: 4,
    front: "What is the Heisenberg Uncertainty Principle?",
    back: "It is impossible to simultaneously measure both the exact position (x) and momentum (p) of a quantum particle: Δx · Δp ≥ ℏ/2.",
    hint: "Fundamental quantum limit on precision",
    difficulty: "hard",
    mastered: true,
    category: "Quantum Physics",
  },
  {
    id: 5,
    front: "What is the Central Limit Theorem in Probability?",
    back: "Given a sufficiently large sample size, the distribution of sample means will approximate a normal distribution (Gaussian curve), regardless of the population distribution shape.",
    hint: "Explains why the bell curve is ubiquitous",
    difficulty: "medium",
    mastered: true,
    category: "Statistics",
  },
];

export default function FlashcardsView() {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"study" | "deck">("study");

  const currentCard = cards[currentIndex] || cards[0];
  const masteredCount = cards.filter((c) => c.mastered).length;
  const progressPercent = Math.round(((currentIndex + 1) / cards.length) * 100);

  const nextCard = () => {
    setFlipped(false);
    setShowHint(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 120);
  };

  const prevCard = () => {
    setFlipped(false);
    setShowHint(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 120);
  };

  const toggleMastered = (id: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, mastered: !c.mastered } : c))
    );
    toast.success("Mastery state updated!");
  };

  const shuffleDeck = () => {
    setFlipped(false);
    setShowHint(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    toast.success("Deck shuffled!");
  };

  const generateFlashcards = () => {
    if (!topic.trim() || generating) return;
    setGenerating(true);

    setTimeout(() => {
      const newCard1: Flashcard = {
        id: Date.now(),
        front: `What is the core axiom governing ${topic.trim()}?`,
        back: `The fundamental principle of ${topic.trim()} dictates that internal state variables maintain structural equilibrium under closed operational conditions.`,
        hint: `Think about foundational laws in ${topic.trim()}`,
        difficulty: "medium",
        mastered: false,
        category: topic.trim(),
      };
      const newCard2: Flashcard = {
        id: Date.now() + 1,
        front: `How is ${topic.trim()} applied in contemporary problems?`,
        back: `Practical applications include algorithmic optimization, experimental modeling, and diagnostic performance metrics.`,
        hint: `Real world application`,
        difficulty: "hard",
        mastered: false,
        category: topic.trim(),
      };

      setCards((prev) => [newCard1, newCard2, ...prev]);
      setCurrentIndex(0);
      setFlipped(false);
      setTopic("");
      setGenerating(false);
      toast.success("2 flashcards generated!");
    }, 1300);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* SUB-HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Layers className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Flashcards Mastery</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                {masteredCount}/{cards.length} Mastered
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Spaced repetition flashcards with active recall testing
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={shuffleDeck}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Shuffle Deck</span>
          </button>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[800px] space-y-5">
          {/* AI GENERATOR BOX */}
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generateFlashcards();
                }}
                placeholder="Generate cards on any topic (e.g. Organic Chemistry, Macroeconomics)..."
                className="flex-1 bg-transparent px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border border-slate-200 dark:border-zinc-800 rounded-xl focus:border-[#FF6B00]"
              />
              <button
                type="button"
                onClick={generateFlashcards}
                disabled={generating || !topic.trim()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generating ? "Generating..." : "Create Cards"}</span>
              </button>
            </div>
          </div>

          {/* PROGRESS & STATS BAR */}
          <div className="flex items-center justify-between text-[12px] font-medium text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span>
                Card {currentIndex + 1} of {cards.length}
              </span>
              <span className="text-slate-300 dark:text-zinc-700">•</span>
              <span className="text-[#FF6B00] font-semibold">{currentCard.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="capitalize px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                {currentCard.difficulty}
              </span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-[#FF6B00] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 3D INTERACTIVE FLASHCARD FORMAT SKELETON */}
          <div
            onClick={() => setFlipped(!flipped)}
            className="group relative min-h-[300px] sm:min-h-[340px] cursor-pointer rounded-3xl border-2 border-slate-200/90 dark:border-zinc-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-zinc-900 dark:to-zinc-900/60 p-6 sm:p-10 shadow-md hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between"
          >
            {/* CARD TOP STATUS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  {flipped ? "Answer / Explanation" : "Prompt / Question"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {currentCard.mastered && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-[10.5px] font-semibold">
                    <Check className="h-3 w-3" /> Mastered
                  </span>
                )}
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 group-hover:text-[#FF6B00] transition-colors">
                  (Click to flip)
                </span>
              </div>
            </div>

            {/* CARD CENTER CONTENT */}
            <div className="my-auto py-6 text-center">
              {!flipped ? (
                <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-zinc-100 leading-snug">
                  {currentCard.front}
                </div>
              ) : (
                <div className="text-base sm:text-lg text-slate-800 dark:text-zinc-200 leading-relaxed font-sans max-w-xl mx-auto">
                  {currentCard.back}
                </div>
              )}

              {/* HINT IF AVAILABLE */}
              {!flipped && currentCard.hint && (
                <div className="mt-4">
                  {showHint ? (
                    <div className="inline-block rounded-xl bg-orange-500/10 px-3 py-1 text-[11.5px] text-[#FF6B00] border border-orange-500/20">
                      Hint: {currentCard.hint}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(true);
                      }}
                      className="inline-flex items-center gap-1 text-[11.5px] text-slate-400 hover:text-[#FF6B00] transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Reveal hint</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CARD BOTTOM BAR */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800 text-[11.5px] text-slate-400 dark:text-zinc-500">
              <span>{flipped ? "Back" : "Front"}</span>
              <span className="font-mono">#{currentCard.id}</span>
            </div>
          </div>

          {/* CONTROLS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={prevCard}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-[12.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleMastered(currentCard.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition-all ${
                  currentCard.mastered
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                }`}
              >
                <Check className="h-4 w-4" />
                <span>{currentCard.mastered ? "Mastered" : "Mark Mastered"}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={nextCard}
              className="flex items-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-[#E66000] transition-colors shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}