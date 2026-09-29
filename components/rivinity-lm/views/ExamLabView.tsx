"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Clock,
  Target,
  Play,
  Sparkles,
  ChevronDown,
  BarChart3,
  Check,
  Award,
  AlertCircle,
  Flag,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

interface ExamTemplate {
  id: string;
  name: string;
  subject: string;
  questions: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  userAnswer?: number;
  flagged?: boolean;
}

const templates: ExamTemplate[] = [
  {
    id: "ap-bio",
    name: "AP Biology Mock Exam",
    subject: "Cellular & Molecular Biology",
    questions: 20,
    duration: "25 min",
    difficulty: "Hard",
  },
  {
    id: "sat-math",
    name: "SAT Advanced Mathematics",
    subject: "Algebra & Trigonometry",
    questions: 25,
    duration: "30 min",
    difficulty: "Medium",
  },
  {
    id: "mc-phys",
    name: "University Classical Physics",
    subject: "Thermodynamics & Electromagnetism",
    questions: 15,
    duration: "20 min",
    difficulty: "Expert",
  },
];

const mockQuestions: ExamQuestion[] = [
  {
    id: 1,
    question: "Which organelle synthesizes phospholipids and steroid hormones?",
    options: [
      "Smooth Endoplasmic Reticulum",
      "Rough Endoplasmic Reticulum",
      "Golgi Apparatus Trans-face",
      "Peroxisome",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "If a system undergoes an adiabatic expansion, what happens to its internal temperature?",
    options: [
      "Increases due to non-zero work done on system",
      "Decreases as the system performs work at the expense of internal energy",
      "Remains constant according to isothermal principles",
      "Oscillates based on the specific heat ratio",
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "Evaluate the derivative of f(x) = e^(2x) · cos(x) at x = 0.",
    options: ["1", "2", "0", "-1"],
    correct: 1,
  },
];

export default function ExamLabView() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("ap-bio");
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState<ExamQuestion[]>(mockQuestions);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins in sec

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted, timeLeft]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (examSubmitted) return;
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentIdx ? { ...q, userAnswer: optIdx } : q))
    );
  };

  const toggleFlag = (idx: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, flagged: !q.flagged } : q))
    );
  };

  const submitExam = () => {
    setExamSubmitted(true);
    toast.success("Exam submitted for AI grading!");
  };

  const scoreCount = questions.filter((q) => q.userAnswer === q.correct).length;
  const currentQ = questions[currentIdx] || questions[0];

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* SUB-HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <GraduationCap className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>ExamLab Pro Simulator</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Timed Standardized Testing
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Full-length timed mock examinations with automated rubric evaluations
            </div>
          </div>
        </div>

        {examStarted && !examSubmitted && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[12px] font-mono font-bold text-[#FF6B00]">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          {!examStarted ? (
            /* EXAM PREPARATION LOBBY SKELETON */
            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm space-y-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00]">
                    Select Standardized Template
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-zinc-100 mt-1">
                    Choose Your Examination Environment
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {templates.map((tpl) => {
                    const isSel = selectedTemplate === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`text-left rounded-2xl p-4 border transition-all ${
                          isSel
                            ? "bg-orange-500/10 border-[#FF6B00] dark:bg-orange-500/15"
                            : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold text-[#FF6B00]">
                          {tpl.subject}
                        </div>
                        <div className="text-[13.5px] font-bold text-slate-900 dark:text-zinc-100 mt-1">
                          {tpl.name}
                        </div>
                        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 dark:text-zinc-400">
                          <span>{tpl.duration}</span>
                          <span className="font-semibold text-slate-700 dark:text-zinc-300">
                            {tpl.difficulty}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setExamStarted(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#E66000] shadow-sm transition-colors"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Begin Simulated Exam</span>
                  </button>
                </div>
              </div>
            </div>
          ) : !examSubmitted ? (
            /* LIVE EXAM TESTING SKELETON */
            <div className="space-y-5">
              {/* QUESTION PALETTE */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs">
                <div className="flex items-center gap-1.5">
                  {questions.map((q, idx) => {
                    const isCurrent = currentIdx === idx;
                    const isAnswered = q.userAnswer !== undefined;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-[12px] font-bold transition-all relative ${
                          isCurrent
                            ? "bg-[#FF6B00] text-white ring-2 ring-[#FF6B00]/40"
                            : isAnswered
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                        }`}
                      >
                        {idx + 1}
                        {q.flagged && (
                          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlag(currentIdx)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11.5px] font-medium transition-colors ${
                      currentQ.flagged
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-600"
                        : "border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>{currentQ.flagged ? "Flagged" : "Flag for Review"}</span>
                  </button>
                </div>
              </div>

              {/* CURRENT QUESTION CARD SKELETON */}
              <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between text-[11.5px] text-slate-400 dark:text-zinc-500 font-medium">
                  <span>Question {currentIdx + 1} of {questions.length}</span>
                  <span>Standard Multiple Choice</span>
                </div>

                <div className="text-lg font-bold text-slate-900 dark:text-zinc-100 leading-snug">
                  {currentQ.question}
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = currentQ.userAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full flex items-center justify-between rounded-2xl p-4 border text-left text-[13.5px] transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#FF6B00] bg-orange-500/10 text-slate-900 dark:text-zinc-100 font-semibold"
                            : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold text-slate-600 dark:text-zinc-300">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-[#FF6B00]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM NAVIGATION */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => i - 1)}
                  className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-[12.5px] font-medium text-slate-700 dark:text-zinc-300 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((i) => i + 1)}
                    className="rounded-xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2 text-[12.5px] font-semibold hover:opacity-90"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitExam}
                    className="rounded-xl bg-[#FF6B00] text-white px-5 py-2 text-[12.5px] font-semibold hover:bg-[#E66000]"
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* SCORE EVALUATION SKELETON */
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-10 shadow-md text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-[#FF6B00]">
                <Award className="h-8 w-8" strokeWidth={2.2} />
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
                  Exam Evaluation Complete
                </div>
                <div className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                  Overall Score: {scoreCount} / {questions.length} (
                  {Math.round((scoreCount / questions.length) * 100)}%)
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    Demonstrated Strengths
                  </div>
                  <div className="text-[12.5px] text-slate-700 dark:text-zinc-300">
                    High accuracy in organic biochemical pathways and algebraic derivatives.
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-amber-600 dark:text-amber-400">
                    Recommended Study Focus
                  </div>
                  <div className="text-[12.5px] text-slate-700 dark:text-zinc-300">
                    Review adiabatic work formulas and thermodynamic equilibrium constraints.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setExamStarted(false);
                    setExamSubmitted(false);
                    setCurrentIdx(0);
                    setTimeLeft(1500);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#E66000]"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Return to Exam Lobby</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}