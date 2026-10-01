"use client";

import { useState, useEffect } from "react";
import {
  Bot,
  Target,
  Flame,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  time: string;
}

export default function StudyCompanionView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      time: "Just now",
      content:
        "Hello! I am your Rivinity AI Study Companion. Whether you need a 25-minute Pomodoro focus block, an intuitive breakdown of hard concepts, or rapid quizzing, I'm here by your side. What are we mastering today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [streak] = useState(14);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, label: "Review Cellular Respiration Cues", done: true },
    { id: 2, label: "Complete 15 AP Bio Flashcards", done: true },
    { id: 3, label: "Write 1 Debate Rebuttal", done: false },
    { id: 4, label: "Solve 3 Calculus Problems", done: false },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroActive && pomodoroSeconds > 0) {
      interval = setInterval(() => setPomodoroSeconds((s) => s - 1), 1000);
    } else if (pomodoroSeconds === 0) {
      setPomodoroActive(false);
      toast.success("Focus sprint complete! Take a 5-minute break.");
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroSeconds]);

  const formatPomoTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const toggleGoal = (id: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
    toast.success("Goal status updated!");
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      time: "Just now",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        time: "Just now",
        content:
          "Awesome goal! I've set up a structured breakdown for you. Let's do a 25-minute uninterrupted sprint on this topic, followed by 3 rapid recall questions to lock it into long-term memory. Ready to begin?",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Bot className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Study Companion</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                AI Mentor Active
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Real-time accountability, Pomodoro focus sprints & personalized tutor dialogue
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[11.5px] font-semibold text-[#FF6B00]">
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>{streak} Day Streak</span>
          </div>
        </div>
      </div>

      {}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {}
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-[10.5px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Pomodoro 25m Focus</span>
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-zinc-100 mt-0.5">
                  {formatPomoTime(pomodoroSeconds)}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPomodoroActive(!pomodoroActive)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11.5px] font-semibold text-white transition-all shadow-xs ${
                    pomodoroActive ? "bg-amber-500 hover:bg-amber-600" : "bg-[#FF6B00] hover:bg-[#E66000]"
                  }`}
                >
                  {pomodoroActive ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                  <span>{pomodoroActive ? "Pause" : "Start"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPomodoroActive(false);
                    setPomodoroSeconds(25 * 60);
                  }}
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200"
                  title="Reset"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            </div>

            {}
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-[10.5px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Daily Milestones</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-zinc-100 mt-1">
                  {goals.filter((g) => g.done).length} of {goals.length} Completed
                </div>
              </div>
              <div className="flex items-center gap-1">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGoal(g.id)}
                    className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-all ${
                      g.done
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-200 dark:border-zinc-700 hover:border-[#FF6B00] text-slate-400"
                    }`}
                    title={g.label}
                  >
                    {g.done ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <span className="text-[10px]">{g.id}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00] border-b border-slate-100 dark:border-zinc-800 pb-2">
              Mentor Dialogue
            </div>

            <div className="space-y-3">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 space-y-1.5 ${
                        isUser
                          ? "bg-[#FF6B00] text-white rounded-br-xs shadow-md"
                          : "bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 text-slate-900 dark:text-zinc-100 rounded-bl-xs shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] opacity-80 font-medium">
                        <span>{isUser ? "You" : "Companion Bot"}</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="text-[13.5px] leading-relaxed whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}