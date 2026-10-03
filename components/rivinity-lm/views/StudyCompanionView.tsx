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
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  time: string;
}

interface Goal {
  id: number;
  label: string;
  done: boolean;
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
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [streakDays] = useState(14);
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, label: "Complete 1 Quiz session", done: true },
    { id: 2, label: "Review 15 Spaced Repetition flashcards", done: true },
    { id: 3, label: "Complete 25 min deep-focus sprint", done: false },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            toast.success("Focus Sprint Completed! Take a 5 min break.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
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
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Bot className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Study Companion Mentor</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Online
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Accountability coaching, sprint timing & tailored academic guidance
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300">
            <Flame className="h-3.5 w-3.5 text-[#FF6B00]" />
            <span>{streakDays} Day Streak</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  <Timer className="h-3.5 w-3.5 text-[#FF6B00]" />
                  <span>Pomodoro Sprint</span>
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-zinc-100">
                  {formatTimer(timerSeconds)}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6B00] text-white hover:bg-[#E66000] transition-colors cursor-pointer"
                >
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(25 * 60);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  <Target className="h-3.5 w-3.5 text-emerald-500" />
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
                    className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
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

          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm space-y-4">
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
                      className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 space-y-1.5 ${
                        isUser
                          ? "bg-[#FF6B00] text-white rounded-br-xs shadow-md"
                          : "bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 text-slate-900 dark:text-zinc-100 rounded-bl-xs shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] opacity-80 font-medium">
                        <span>{isUser ? "You" : "Companion Bot"}</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="text-[13px] sm:text-[13.5px] leading-relaxed whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60 px-3.5 py-2 shadow-2xs focus-within:border-[#FF6B00] focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Ask your study companion for tips, sprint plans, or motivation..."
                  className="flex-1 bg-transparent text-[13px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF6B00] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E66000] cursor-pointer shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}