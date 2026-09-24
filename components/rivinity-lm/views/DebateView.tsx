"use client";

import { useState } from "react";
import {
  Swords,
  Send,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  Timer,
  CheckCircle2,
} from "lucide-react";

interface DebateMessage {
  id: number;
  role: "user" | "ai";
  content: string;
  score?: number;
  feedback?: string;
}

const debateTopics = [
  "Should AI replace teachers in classrooms?",
  "Is social media more harmful than beneficial?",
  "Should college education be free?",
  "Is space exploration worth the cost?",
  "Should voting be mandatory?",
];

const DebateView = () => {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [stance, setStance] = useState<"for" | "against">("for");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);

  const startDebate = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setStarted(true);
    setRound(1);

    setMessages([
      {
        id: 1,
        role: "ai",
        content: `Welcome to the debate! The topic is: "${selectedTopic}"\n\nYou are arguing ${
          stance === "for" ? "FOR" : "AGAINST"
        } this proposition. I will take the opposing side.\n\nPlease make your opening statement. You have ${totalRounds} rounds. Make your argument compelling!`,
      },
    ]);
  };

  const handleSend = () => {
    if (!input.trim() || round > totalRounds) return;

    const userMsg: DebateMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          content:
            "That's an interesting point, but I'd argue that the evidence suggests otherwise. Studies show that the implementation challenges far outweigh the theoretical benefits you've described. Furthermore, the practical implications on existing infrastructure would be significant.",
          score: 7,
          feedback:
            "Good argument structure. Try adding specific data points to strengthen your case.",
        },
      ]);

      setRound((currentRound) =>
        Math.min(currentRound + 1, totalRounds)
      );
    }, 1500);
  };

  const restartDebate = () => {
    setStarted(false);
    setMessages([]);
    setRound(1);
    setInput("");
  };

  if (!started) {
    return (
      <div className="min-h-full bg-white text-gray-900">
        {/* Header */}
        <div className="border-b border-gray-200/70 bg-white/85 backdrop-blur-xl">
          <div className="px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
              <Swords className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold text-gray-900">
                  AI Debate Arena
                </h1>

                <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF5500] text-[9px] font-semibold">
                  AI DEBATE
                </span>
              </div>

              <p className="text-[11px] text-gray-400 mt-0.5">
                Sharpen your critical thinking and argumentation skills
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[680px] mx-auto px-5 py-8">
          {/* Intro */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-[#FF5500] mx-auto mb-4 flex items-center justify-center shadow-[0_8px_20px_rgba(255,85,0,0.16)]">
              <Swords className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-[19px] font-semibold text-gray-900 mb-1.5">
              Enter the Debate Arena
            </h2>

            <p className="text-[11px] text-gray-400">
              Choose a topic, pick your stance, and challenge the AI.
            </p>
          </div>

          {/* Topic */}
          <section className="bg-white border border-gray-200/80 rounded-2xl p-5 mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold text-gray-900">
                Choose a Topic
              </p>

              <span className="text-[9px] text-gray-400">
                {debateTopics.length} topics
              </span>
            </div>

            <div className="space-y-1.5 mb-4">
              {debateTopics.map((debateTopic) => {
                const selected = topic === debateTopic;

                return (
                  <button
                    key={debateTopic}
                    onClick={() => setTopic(debateTopic)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl border text-[11px] transition-all ${
                      selected
                        ? "bg-orange-50 border-orange-200 text-[#FF5500] font-medium"
                        : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selected && (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      )}

                      <span>{debateTopic}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[9px] text-gray-400 mb-2">
              Or enter your own topic
            </p>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a debate topic..."
              className="w-full h-10 bg-white border border-gray-200
                rounded-xl px-3.5 text-[11px] text-gray-800
                placeholder:text-gray-400 outline-none
                focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
            />
          </section>

          {/* Stance */}
          <section className="bg-white border border-gray-200/80 rounded-2xl p-5 mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
            <p className="text-[12px] font-semibold text-gray-900 mb-3">
              Your Stance
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setStance("for")}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl text-[11px] font-semibold border transition-all ${
                  stance === "for"
                    ? "bg-orange-50 border-orange-200 text-[#FF5500]"
                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                For
              </button>

              <button
                onClick={() => setStance("against")}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl text-[11px] font-semibold border transition-all ${
                  stance === "against"
                    ? "bg-orange-50 border-orange-200 text-[#FF5500]"
                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                Against
              </button>
            </div>
          </section>

          {/* Start */}
          <button
            onClick={() => topic.trim() && startDebate(topic.trim())}
            disabled={!topic.trim()}
            className="w-full h-11 rounded-xl bg-[#FF5500] text-white
              text-[11px] font-semibold
              shadow-[0_5px_14px_rgba(255,85,0,0.16)]
              hover:bg-[#e94d00] disabled:opacity-40
              disabled:cursor-not-allowed transition-colors"
          >
            Start Debate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white text-gray-900">
      {/* Debate Header */}
      <div className="border-b border-gray-200/70 bg-white/85 backdrop-blur-xl">
        <div className="px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Swords className="w-3.5 h-3.5 text-gray-500" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-800 truncate">
                {topic}
              </p>

              <p className="text-[9px] text-gray-400 mt-0.5">
                You are arguing {stance}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 text-[9px] text-gray-500">
              <Timer className="w-3 h-3" />
              Round {round}/{totalRounds}
            </span>

            <button
              onClick={restartDebate}
              className="w-8 h-8 rounded-lg flex items-center justify-center
                text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              title="Restart debate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-5 py-5">
        {/* Round Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-gray-400">
              Debate Progress
            </span>

            <span className="text-[9px] text-gray-400">
              {Math.min(round, totalRounds)}/{totalRounds}
            </span>
          </div>

          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF5500] rounded-full transition-all"
              style={{
                width: `${(Math.min(round, totalRounds) / totalRounds) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4 pb-4">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`flex items-center gap-2 mb-1.5 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-[9px] font-semibold text-gray-400">
                      {isUser ? "You" : "AI Opponent"}
                    </span>
                  </div>

                  <div
                    className={`px-4 py-3.5 rounded-2xl ${
                      isUser
                        ? "bg-[#FF5500] text-white rounded-br-md"
                        : "bg-white border border-gray-200/80 text-gray-600 rounded-bl-md shadow-[0_2px_8px_rgba(0,0,0,0.025)]"
                    }`}
                  >
                    <p className="text-[11px] leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>

                    {/* Feedback */}
                    {message.feedback && (
                      <div className="mt-3 pt-3 border-t border-gray-200/70">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Sparkles
                            className={`w-3 h-3 ${
                              isUser
                                ? "text-white"
                                : "text-[#FF5500]"
                            }`}
                          />

                          <span
                            className={`text-[9px] font-semibold ${
                              isUser
                                ? "text-white"
                                : "text-[#FF5500]"
                            }`}
                          >
                            Argument Score: {message.score}/10
                          </span>
                        </div>

                        <p
                          className={`text-[10px] leading-relaxed ${
                            isUser
                              ? "text-white/80"
                              : "text-gray-400"
                          }`}
                        >
                          {message.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {round >= totalRounds && (
            <div className="flex justify-center py-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500]" />
                <span className="text-[10px] font-medium text-[#FF5500]">
                  Debate rounds completed
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {round < totalRounds && (
          <div className="mt-2 bg-white border border-gray-200/80 rounded-2xl p-2 shadow-[0_3px_12px_rgba(0,0,0,0.035)]">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Make your argument..."
                className="flex-1 h-10 px-3 bg-transparent text-[11px]
                  text-gray-800 placeholder:text-gray-400
                  outline-none"
              />

              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-[#FF5500]
                  flex items-center justify-center text-white
                  hover:bg-[#e94d00] disabled:opacity-40
                  transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Restart */}
        {round >= totalRounds && (
          <button
            onClick={restartDebate}
            className="w-full mt-3 h-10 rounded-xl border border-gray-200
              bg-white text-[10px] font-semibold text-gray-600
              hover:border-orange-200 hover:text-[#FF5500] transition-colors"
          >
            Start New Debate
          </button>
        )}
      </div>
    </div>
  );
};

export default DebateView;