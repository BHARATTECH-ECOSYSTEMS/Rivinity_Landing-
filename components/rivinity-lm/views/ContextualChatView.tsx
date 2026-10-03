"use client";

import { useState } from "react";
import {
  Loader2,
  Copy,
  Volume2,
  Sparkles,
  BookOpen,
  Check,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  thinking?: boolean;
  topics?: string[];
  citations?: string[];
  keyTakeaways?: string[];
}

export default function ContextualChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "user",
      content: "Explain quantum entanglement in simple terms",
    },
    {
      id: 2,
      role: "ai",
      content:
        "Quantum entanglement is a phenomenon where two particles become interconnected in such a way that the quantum state of one particle instantly influences the state of the other, regardless of the distance between them.\n\nImagine you have two magic coins. When you flip one and it lands on heads, the other one — no matter where it is in the universe — will instantly land on tails. That is the fundamental concept behind entanglement.\n\nKey principles:\n• Non-locality: The effect happens instantaneously across space\n• State super-position: The states remain undefined until observed\n• Information preservation: While correlated, no faster-than-light communication occurs\n\nEinstein famously referred to it as 'spooky action at a distance' because it seemed to challenge classical notions of local realism.",
      topics: ["Quantum Mechanics", "Wave Function Collapse", "EPR Paradox", "Bell's Theorem"],
      citations: ["Principles of Quantum Mechanics (Dirac)", "Nature Physics 2024 Research Review"],
      keyTakeaways: [
        "Entangled pairs share instantaneous correlated quantum states",
        "Measurement on one instantly resolves the other",
        "Does not violate relativistic causality (no information transfer)",
      ],
    },
  ]);

  const [isSpeakingId, setIsSpeakingId] = useState<number | null>(null);
  const [savedMessages, setSavedMessages] = useState<number[]>([]);

  const handleSendPrompt = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    const thinkingMsg: Message = {
      id: Date.now() + 1,
      role: "ai",
      content: "",
      thinking: true,
    };

    setMessages((prev) => [...prev, userMsg, thinkingMsg]);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.thinking
            ? {
                ...message,
                thinking: false,
                content:
                  "Here is a structured explanation of that topic:\n\n1. Fundamental Concept: The core underlying principle builds upon established theoretical foundations.\n2. Practical Real-World Example: In laboratory testing, observe how independent variables trigger direct responses.\n3. Summary: Keep this mental model in mind when tackling related assignments or exams.",
                topics: ["Core Principle", "Practical Example", "Synthesis"],
                keyTakeaways: [
                  "Break complex questions into constituent sub-problems",
                  "Validate assumptions using empirical test cases",
                ],
                citations: ["Rivinity Academic Knowledge Graph"],
              }
            : message
        )
      );
    }, 1800);
  };

  const copyMessage = async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const toggleBookmark = (id: number) => {
    setSavedMessages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    toast.success("Bookmark updated!");
  };

  const handleSpeak = (id: number, text: string) => {
    if (isSpeakingId === id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeakingId(null);
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#•]/g, ""));
      utterance.onend = () => setIsSpeakingId(null);
      utterance.onerror = () => setIsSpeakingId(null);
      setIsSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    } else {
      toast.info("Audio reader not supported on this browser.");
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <MessageSquare className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Contextual Chat</span>
              <span className="rounded-full bg-orange-500/10 dark:bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Pro Academic
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Multi-source citation grounding with step-by-step reasoning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Grounding Active
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-4">
          <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 sm:p-5 shadow-xs">
            <div className="space-y-4">
              {messages.map((message) => {
                const isUser = message.role === "user";
                const isSaved = savedMessages.includes(message.id);

                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00] border border-orange-500/20">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`relative max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-[13px] leading-relaxed transition-all shadow-xs ${
                        isUser
                          ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium"
                          : "border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-zinc-800">
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-400">
                          {isUser ? "You" : "Rivinity Academic Assistant"}
                        </span>

                        {!isUser && (
                          <div className="flex items-center gap-1 text-slate-400">
                            <button
                              type="button"
                              onClick={() => toggleBookmark(message.id)}
                              className={`p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${
                                isSaved ? "text-[#FF6B00]" : ""
                              }`}
                              title={isSaved ? "Remove Bookmark" : "Bookmark this answer"}
                            >
                              <Bookmark className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSpeak(message.id, message.content)}
                              className={`p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${
                                isSpeakingId === message.id ? "text-[#FF6B00] animate-pulse" : ""
                              }`}
                              title="Listen to answer"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => copyMessage(message.content)}
                              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                              title="Copy content"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {message.thinking ? (
                        <div className="flex items-center gap-2.5 py-2 text-slate-500 dark:text-zinc-400 text-xs">
                          <Loader2 className="h-4 w-4 animate-spin text-[#FF6B00]" />
                          <span>Formulating academic response and verifying references...</span>
                        </div>
                      ) : (
                        <div className="text-[13px] sm:text-[13.5px] leading-relaxed whitespace-pre-wrap font-sans">
                          {message.content}
                        </div>
                      )}

                      {message.keyTakeaways && message.keyTakeaways.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#FF6B00] mb-2 flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5" /> Key Takeaways
                          </div>
                          <div className="space-y-1.5">
                            {message.keyTakeaways.map((point, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-[12px] bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-2 text-slate-700 dark:text-zinc-300"
                              >
                                <span className="text-[#FF6B00] font-bold">•</span>
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">Sources:</span>
                          {message.citations.map((cite, idx) => (
                            <span
                              key={idx}
                              className="text-[10.5px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 flex items-center gap-1"
                            >
                              <BookOpen className="h-2.5 w-2.5 text-slate-400" />
                              {cite}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <div className="mx-auto w-full max-w-[840px] flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              {[
                "Give 3 practice questions",
                "Explain with an analogy",
                "Summarize in one sentence",
                "Show mathematical formula",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    handleSendPrompt(chip);
                    toast.info(`Prompt chip sent: "${chip}"`);
                  }}
                  className="shrink-0 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60 px-2.5 py-1 text-[11px] text-slate-600 dark:text-zinc-400 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}