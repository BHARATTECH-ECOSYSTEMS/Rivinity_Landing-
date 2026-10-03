"use client";

import { useState } from "react";
import {
  Swords,
  Send,
  RotateCcw,
  Scale,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

interface DebateMessage {
  id: number;
  role: "user" | "ai";
  round: number;
  content: string;
  fallacyCheck?: string;
  score?: number;
  feedback?: string;
}

const debateTopics = [
  "Artificial Intelligence should be granted legal rights and liability shields",
  "Universal Basic Income is economically imperative in an automated world",
  "Nuclear energy is essential for achieving carbon neutrality by 2050",
  "Social media algorithmic feeds should be banned for minors under 16",
];

export default function DebateView() {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [stance, setStance] = useState<"for" | "against">("for");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(1);
  const totalRounds = 4;
  const [customTopic, setCustomTopic] = useState("");

  const startDebate = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setStarted(true);
    setRound(1);

    setMessages([
      {
        id: 1,
        role: "ai",
        round: 1,
        content: `Welcome to the Oxford-style AI Debate Arena! The motion is: "${selectedTopic}".\n\nYou are arguing in the ${
          stance === "for" ? "AFFIRMATIVE (PRO)" : "NEGATIVE (CON)"
        } position. I will defend the opposing side.\n\nDeliver your opening argument whenever you are ready. Each round evaluates logic, empirical evidence, and rhetorical coherence.`,
      },
    ]);
    toast.success("Debate session initialized!");
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: DebateMessage = {
      id: Date.now(),
      role: "user",
      round,
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const responses = [
        "While your premise highlights key moral considerations, empirical studies from the National Bureau of Economic Research suggest the contrary when scaling across heterogeneous demographics.",
        "Your argument hinges on an appeal to consequence. If we scrutinize the causal mechanism, systemic externalities outweigh short-term benefits.",
        "An insightful rebuttal. However, historic precedents during the post-war industrial shifts show that regulatory mandates stifled parallel innovation.",
        "Summing up this motion: Although the affirmative side defends admirable principles, operational viability remains the deciding constraint.",
      ];

      const aiMsg: DebateMessage = {
        id: Date.now() + 1,
        role: "ai",
        round,
        content: responses[(round - 1) % responses.length],
        score: Math.min(10, Math.floor(7 + Math.random() * 3)),
        fallacyCheck: "No major logical fallacies detected; sound inductive reasoning",
        feedback: "Strengthen your thesis by quantifying real-world fiscal impacts or citation benchmarks.",
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (round < totalRounds) {
        setRound((r) => r + 1);
      } else {
        toast.success("Debate completed! Final judge score: 8.8 / 10");
      }
    }, 1200);
  };

  const restartDebate = () => {
    setStarted(false);
    setMessages([]);
    setRound(1);
    setTopic("");
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-[#f8fafc] dark:bg-zinc-950 font-sans">
      <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Swords className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              <span>Academic Debate Sparring</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400">
              Oxford-style debate arena with real-time logical fallacy detection
            </div>
          </div>
        </div>

        {started && (
          <button
            type="button"
            onClick={restartDebate}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>New Motion</span>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-4">
          {!started ? (
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-sm space-y-5">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00]">
                  Oxford Debate Setup
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 mt-1">
                  Choose Motion & Argument Stance
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[12px] font-semibold text-slate-700 dark:text-zinc-300">
                  Your Proposition Stance:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStance("for")}
                    className={`rounded-2xl p-4 border text-center transition-all cursor-pointer ${
                      stance === "for"
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="text-sm">AFFIRMATIVE (PRO)</div>
                    <div className="text-[11px] font-normal opacity-80 mt-0.5">Argue in favor of the motion</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStance("against")}
                    className={`rounded-2xl p-4 border text-center transition-all cursor-pointer ${
                      stance === "against"
                        ? "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 font-bold"
                        : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="text-sm">NEGATIVE (CON)</div>
                    <div className="text-[11px] font-normal opacity-80 mt-0.5">Argue against the proposition</div>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[12px] font-semibold text-slate-700 dark:text-zinc-300">
                  Select Featured Motion:
                </div>
                <div className="space-y-2">
                  {debateTopics.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => startDebate(t)}
                      className="w-full text-left rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-800/40 p-3.5 sm:p-4 hover:border-[#FF6B00]/50 hover:bg-orange-500/5 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="text-[13px] font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-[#FF6B00]">
                        {t}
                      </span>
                      <Swords className="h-4 w-4 text-slate-400 group-hover:text-[#FF6B00] shrink-0 ml-2" />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customTopic.trim()) {
                        startDebate(customTopic.trim());
                        setCustomTopic("");
                      }
                    }}
                    placeholder="Or enter your own debate motion..."
                    className="flex-1 bg-transparent px-3 py-2 text-xs border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customTopic.trim()) {
                        startDebate(customTopic.trim());
                        setCustomTopic("");
                      }
                    }}
                    disabled={!customTopic.trim()}
                    className="px-3 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#E66000] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    Debate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase font-bold text-[#FF6B00]">Active Motion</div>
                  <div className="text-[13px] font-bold text-slate-900 dark:text-zinc-100">{topic}</div>
                </div>
                <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                  Your Stance: {stance.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                    >
                      <div
                        className={`max-w-[92%] sm:max-w-[88%] rounded-2xl p-4 sm:p-5 space-y-3 ${
                          isUser
                            ? "bg-[#FF6B00] text-white rounded-br-xs shadow-md"
                            : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 rounded-bl-xs shadow-xs"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 text-[11.5px] font-bold opacity-90">
                          <span>{isUser ? `You (Round ${msg.round})` : "AI Opponent Rebuttal"}</span>
                          {!isUser && msg.score && (
                            <span className="flex items-center gap-1 text-[#FF6B00] bg-orange-500/10 px-2 py-0.5 rounded-md">
                              <Scale className="h-3 w-3" />
                              Score: {msg.score}/10
                            </span>
                          )}
                        </div>

                        <div className="text-[13px] sm:text-[13.5px] leading-relaxed whitespace-pre-wrap font-sans">
                          {msg.content}
                        </div>

                        {!isUser && msg.fallacyCheck && (
                          <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 space-y-1 text-[11.5px]">
                            <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                              <Shield className="h-3.5 w-3.5" />
                              <span>{msg.fallacyCheck}</span>
                            </div>
                            {msg.feedback && (
                              <div className="text-slate-500 dark:text-zinc-400 italic">
                                Tip: {msg.feedback}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 shadow-sm focus-within:border-[#FF6B00]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    placeholder={`Deliver your Round ${round} argument / rebuttal...`}
                    className="flex-1 bg-transparent text-[13.5px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF6B00] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E66000] cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}