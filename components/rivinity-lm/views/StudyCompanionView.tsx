"use client";

import { useState } from "react";
import {
  Bot,
  Send,
  Target,
  Flame,
  Trophy,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

const StudyCompanionView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      content:
        "Hey! I'm your study companion. I'll help you stay focused, understand concepts, and track your progress. What are you studying today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [streak] = useState(7);
  const [level] = useState(12);

  const quickActions = [
    "Explain this simply",
    "Give me a quiz",
    "Create flashcards",
    "Summarize",
  ];

  const goals = [
    { label: "Daily study", done: true },
    { label: "5 flashcards", done: true },
    { label: "1 quiz", done: false },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: input,
      },
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          content:
            "That's a great topic to focus on! Let me help you break it down into manageable chunks. I recommend starting with the fundamentals and building up. Would you like me to create a quick study plan or dive right into explaining the concept?",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-white">
      {/* Header */}
      <div className="border-b border-gray-200/80 bg-white/85 backdrop-blur-sm">
        <div className="max-w-[1050px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gray-500" />
            </div>

            <div>
              <h1 className="text-[15px] font-semibold text-gray-900">
                Study Companion
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Your personalized AI tutor
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
            <span className="text-[11px] font-medium text-orange-700">
              AI Powered
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1050px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_210px] gap-6">
          {/* Main Chat */}
          <div className="min-w-0">
            <div className="bg-white border border-gray-200/80 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.035)] overflow-hidden">
              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-gray-900">
                    Your Study Session
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Ask questions, learn concepts, and stay on track.
                  </p>
                </div>

                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#FF5500]" />
                </div>
              </div>

              {/* Messages */}
              <div className="min-h-[420px] max-h-[520px] overflow-y-auto px-5 py-5 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-2 max-w-[82%] ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {msg.role === "ai" && (
                        <div className="w-7 h-7 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center mb-0.5">
                          <Bot className="w-3.5 h-3.5 text-[#FF5500]" />
                        </div>
                      )}

                      <div
                        className={`px-4 py-3 text-[12.5px] leading-relaxed ${
                          msg.role === "user"
                            ? "rounded-2xl rounded-br-md bg-[#FF5500] text-white"
                            : "rounded-2xl rounded-bl-md bg-gray-50 border border-gray-100 text-gray-700"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="px-5 pb-3">
                <div className="flex gap-2 flex-wrap">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => setInput(action)}
                      className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[10.5px] font-medium text-gray-500 hover:border-orange-200 hover:bg-orange-50 hover:text-[#FF5500] transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-2 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    placeholder="Ask your companion anything..."
                    className="flex-1 min-w-0 bg-transparent text-[12px] text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-8 h-8 shrink-0 rounded-lg bg-[#FF5500] flex items-center justify-center hover:bg-[#e94d00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-3">
            {/* Streak */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700">
                    Streak
                  </span>
                </div>

                <span className="text-[10px] text-gray-400">🔥</span>
              </div>

              <p className="text-2xl font-bold text-gray-900">{streak}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                days in a row
              </p>
            </div>

            {/* Level */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                </div>

                <span className="text-[11px] font-semibold text-gray-700">
                  Level
                </span>
              </div>

              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{level}</p>
                <span className="text-[10px] text-gray-400">650 / 1000 XP</span>
              </div>

              <div className="h-1.5 rounded-full bg-gray-100 mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FF5500]"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-[#FF5500]" />
                </div>

                <span className="text-[11px] font-semibold text-gray-700">
                  Today's Goals
                </span>
              </div>

              <div className="space-y-2.5">
                {goals.map((goal) => (
                  <div
                    key={goal.label}
                    className="flex items-center gap-2.5"
                  >
                    {goal.done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />
                    )}

                    <span
                      className={`text-[10.5px] ${
                        goal.done
                          ? "text-gray-400 line-through"
                          : "text-gray-600"
                      }`}
                    >
                      {goal.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-400">
                  2 of 3 goals completed
                </p>
              </div>
            </div>

            {/* Small Motivation Card */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
              <p className="text-[11px] font-semibold text-gray-800">
                Keep going!
              </p>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                One focused session today keeps your learning streak alive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCompanionView;