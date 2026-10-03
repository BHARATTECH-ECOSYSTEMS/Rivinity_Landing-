"use client";

import { useState } from "react";
import {
  HelpCircle,
  Check,
  X,
  Lightbulb,
  ChevronRight,
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  Timer,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  hint: string;
  explanation: string;
  category: string;
}

const initialQuiz: Question[] = [
  {
    id: 1,
    question: "Which cellular process generates the highest yield of ATP per glucose molecule?",
    options: [
      "Glycolysis in the Cytoplasm",
      "Lactic Acid Fermentation",
      "Oxidative Phosphorylation (Electron Transport Chain)",
      "Substrate-Level Phosphorylation in Krebs Cycle",
    ],
    correct: 2,
    hint: "Requires oxygen as the terminal electron acceptor.",
    explanation:
      "Oxidative phosphorylation generates approximately 30-32 ATP per glucose via the proton gradient across the inner mitochondrial membrane, far exceeding glycolysis (2 ATP) or fermentation (2 ATP).",
    category: "Cell Biology",
  },
  {
    id: 2,
    question: "What is the primary physical implication of Schrödinger's Wave Equation?",
    options: [
      "Particles travel in deterministic classical trajectories",
      "Describes the probability amplitude of finding a quantum system in a specific state",
      "Proves light is purely a mechanical transverse wave",
      "Eliminates relativistic time dilation in mass calculations",
    ],
    correct: 1,
    hint: "Think about wave function probability density |Ψ|².",
    explanation:
      "Schrödinger's wave equation calculates the evolution of the wave function Ψ, where |Ψ|² provides the probability density of finding a particle in space-time.",
    category: "Quantum Physics",
  },
  {
    id: 3,
    question: "In Economics, what occurs during 'Stagflation'?",
    options: [
      "Rapid economic growth coupled with negative deflation",
      "High inflation combined with stagnant economic growth and high unemployment",
      "Low unemployment with zero fiscal debt",
      "Exponential stock market appreciation with declining money supply",
    ],
    correct: 1,
    hint: "A toxic mixture of 'Stagnation' and 'Inflation'.",
    explanation:
      "Stagflation occurs when inflation rates remain stubbornly elevated while economic output contracts and unemployment climbs, presenting a major monetary policy dilemma.",
    category: "Macroeconomics",
  },
];

export default function QuizzesView() {
  const [questions, setQuestions] = useState<Question[]>(initialQuiz);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const question = questions[currentQ] || questions[0];
  const progress = Math.round(((currentQ + 1) / questions.length) * 100);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(true);

    if (idx === question.correct) {
      setScore((s) => s + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect! Check the explanation below.");
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowHint(false);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setShowHint(false);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  const generateQuiz = () => {
    if (!topic.trim() || generating) return;
    setGenerating(true);

    setTimeout(() => {
      const newQuestions: Question[] = [
        {
          id: Date.now(),
          question: `Which fundamental principle is central to understanding ${topic.trim()}?`,
          options: [
            `The primary dynamic equilibrium of ${topic.trim()}`,
            `Inverse quadratic decay without baseline limits`,
            `Static invariant velocity under standard conditions`,
            `Non-reciprocal thermal dissipation`,
          ],
          correct: 0,
          hint: `Focus on the foundational dynamic theory of ${topic.trim()}`,
          explanation: `In ${topic.trim()}, systems converge toward dynamic equilibrium according to empirical state boundaries.`,
          category: topic.trim(),
        },
      ];

      setQuestions(newQuestions);
      restartQuiz();
      setTopic("");
      setGenerating(false);
      toast.success(`Generated quiz on ${topic.trim()}!`);
    }, 1300);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <HelpCircle className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Interactive Quizzes</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Live Evaluation
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Instant feedback testing with comprehensive rationale explanations
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300">
            <Timer className="h-3.5 w-3.5 text-slate-400" />
            <Trophy className="h-3.5 w-3.5 text-[#FF6B00]" />
            <span>
              Score: {score}/{questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[800px] space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generateQuiz();
                }}
                placeholder="Generate quiz on any subject (e.g. World History, Genetics, Organic Chemistry)..."
                className="flex-1 bg-transparent px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border border-slate-200 dark:border-zinc-800 rounded-xl focus:border-[#FF6B00]"
              />
              <button
                type="button"
                onClick={generateQuiz}
                disabled={generating || !topic.trim()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generating ? "Crafting Quiz..." : "Create Quiz"}</span>
              </button>
            </div>
          </div>

          {!completed ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[12px] font-medium text-slate-500 dark:text-zinc-400">
                  <span>
                    Question {currentQ + 1} of {questions.length} • {question.category}
                  </span>
                  <span>{progress}% Complete</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-[#FF6B00] transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-sm space-y-5">
                <div className="text-base sm:text-xl font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                  {question.question}
                </div>

                <div className="space-y-2.5">
                  {question.options.map((option, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === question.correct;

                    let optionStyle =
                      "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-800 dark:text-zinc-200";

                    if (answered) {
                      if (isCorrect) {
                        optionStyle =
                          "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium";
                      } else if (isSelected && !isCorrect) {
                        optionStyle =
                          "border-red-500 bg-red-50/70 dark:bg-red-950/40 text-red-900 dark:text-red-200";
                      } else {
                        optionStyle = "opacity-50 border-slate-200 dark:border-zinc-800";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        disabled={answered}
                        className={`w-full flex items-center justify-between rounded-2xl p-3.5 sm:p-4 border text-left text-[13px] sm:text-[13.5px] transition-all cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold text-slate-600 dark:text-zinc-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {answered && isCorrect && <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        {answered && isSelected && !isCorrect && <X className="h-5 w-5 text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {!answered && (
                  <div className="pt-2">
                    {showHint ? (
                      <div className="rounded-xl bg-orange-500/10 p-3 text-[12px] text-[#FF6B00] border border-orange-500/20">
                        <span className="font-bold">Hint:</span> {question.hint}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="inline-flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-[#FF6B00] transition-colors cursor-pointer"
                      >
                        <Lightbulb className="h-3.5 w-3.5" />
                        <span>Need a hint?</span>
                      </button>
                    )}
                  </div>
                )}

                {showExplanation && (
                  <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-800/50 p-4 space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-wider text-[#FF6B00]">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Academic Rationale</span>
                    </div>
                    <div className="text-[13px] text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                      {question.explanation}
                    </div>
                  </div>
                )}
              </div>

              {answered && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#E66000] shadow-sm transition-colors cursor-pointer"
                  >
                    <span>{currentQ < questions.length - 1 ? "Next Question" : "View Results"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 text-center shadow-md space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-[#FF6B00]">
                <Award className="h-8 w-8" strokeWidth={2.2} />
              </div>

              <div className="space-y-1.5">
                <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
                  Quiz Completed!
                </div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">
                  You scored {score} out of {questions.length} questions correctly (
                  {Math.round((score / questions.length) * 100)}%)
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={restartQuiz}
                  className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#E66000] transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Retry Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}