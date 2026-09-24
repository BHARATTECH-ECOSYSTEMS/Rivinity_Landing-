"use client";

import { useState } from "react";
import {
  Send,
  Paperclip,
  Loader2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RefreshCw,
  Volume2,
  Pencil,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  thinking?: boolean;
  topics?: string[];
}

const ContextualChatView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "user",
      content:
        "Explain quantum entanglement in simple terms",
    },
    {
      id: 2,
      role: "ai",
      content:
        "Quantum entanglement is a phenomenon where two particles become interconnected in such a way that the quantum state of one particle instantly influences the state of the other, regardless of the distance between them.\n\nImagine you have two magic coins. When you flip one and it lands on heads, the other one — no matter where it is in the universe — will instantly land on tails. That's the basic idea behind entanglement.\n\nKey points:\n• Non-locality: The effect happens faster than light\n• Measurement dependence: The states are undefined until observed\n• No information transfer: Despite the instant correlation, you can't use it to send messages faster than light\n\nEinstein famously called it \"spooky action at a distance\" because it seemed to violate relativity.",
      topics: [
        "Quantum Physics",
        "Wave Functions",
        "EPR Paradox",
      ],
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();

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

    setMessages((prev) => [
      ...prev,
      userMsg,
      thinkingMsg,
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.thinking
            ? {
                ...message,
                thinking: false,
                content:
                  "That's a great follow-up question! Let me break it down for you with clear examples and analogies to make it easy to understand.",
              }
            : message
        )
      );
    }, 2000);
  };

  const copyMessage = async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success("Copied!");
  };

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        bg-white
      "
    >
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-gray-200/70
          bg-white/80
          px-5
          py-3
          backdrop-blur-sm
          sm:px-7
        "
      >
        <div className="flex items-center gap-3">
        

          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-[14px]
                font-semibold
                text-[#242631]
              "
            >
              <span>Contextual Chat</span>

              <span
                className="
                  rounded-full
                  bg-orange-50
                  px-2
                  py-0.5
                  text-[10px]
                  font-medium
                  text-[#FF5500]
                "
              >
                AI
              </span>
            </div>

            <p className="text-[11px] text-gray-400">
              Ask questions about your study material
            </p>
          </div>
        </div>

        <button
          type="button"
          className="
            flex
            h-8
            items-center
            gap-1.5
            rounded-xl
            border
            border-gray-200
            bg-white
            px-3
            text-[11px]
            font-medium
            text-gray-600
            shadow-sm
            transition-all
            hover:border-gray-300
            hover:text-gray-900
          "
        >
          <Sparkles
            className="h-3.5 w-3.5 text-[#FF5500]"
            strokeWidth={2}
          />

          AI Chat
        </button>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          gap-6
          overflow-hidden
          px-5
          py-5
          sm:px-7
          lg:px-8
        "
      >
        {/* ===================================================
            CHAT
        =================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
          "
        >
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              pr-1
              scrollbar-thin
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-[820px]
                space-y-6
                pb-6
              "
            >
              {messages.map((message) => {
                const isUser =
                  message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`
                      flex
                      ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className={`
                        group
                        ${
                          isUser
                            ? "max-w-[78%]"
                            : "w-full max-w-[820px]"
                        }
                      `}
                    >
                      {/* MESSAGE */}

                      {isUser ? (
                        <div
                          className="
                            rounded-[18px]
                            rounded-br-md
                            bg-[#FF5500]
                            px-5
                            py-3.5
                            text-[14px]
                            leading-relaxed
                            text-white
                            shadow-[0_3px_12px_rgba(255,85,0,0.12)]
                          "
                        >
                          {message.content}
                        </div>
                      ) : (
                        <div
                          className="
                            rounded-[20px]
                            border
                            border-gray-200/80
                            bg-white
                            px-5
                            py-5
                            shadow-[0_2px_12px_rgba(0,0,0,0.035)]
                          "
                        >
                          {message.thinking ? (
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-[13px]
                                text-gray-400
                              "
                            >
                              <Loader2
                                className="
                                  h-4
                                  w-4
                                  animate-spin
                                  text-[#FF5500]
                                "
                              />

                              <span>
                                Thinking...
                              </span>
                            </div>
                          ) : (
                            <div
                              className="
                                whitespace-pre-wrap
                                text-[14px]
                                leading-[1.75]
                                text-[#3C3E48]
                              "
                            >
                              {message.content}
                            </div>
                          )}
                        </div>
                      )}

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      {!message.thinking && (
                        <div
                          className={`
                            mt-1.5
                            flex
                            items-center
                            gap-0.5
                            opacity-0
                            transition-opacity
                            duration-200
                            group-hover:opacity-100
                            ${
                              isUser
                                ? "justify-end"
                                : "justify-start"
                            }
                          `}
                        >
                          {isUser ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  copyMessage(
                                    message.content
                                  )
                                }
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Copy"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setInput(
                                    message.content
                                  )
                                }
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Edit"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  copyMessage(
                                    message.content
                                  )
                                }
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Copy"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Good response"
                              >
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Bad response"
                              >
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Share"
                              >
                                <Share2 className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Regenerate"
                              >
                                <RefreshCw className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                className="
                                  rounded-lg
                                  p-1.5
                                  text-gray-400
                                  transition-colors
                                  hover:bg-gray-100
                                  hover:text-gray-700
                                "
                                title="Read aloud"
                              >
                                <Volume2 className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              CHAT INPUT
          ================================================= */}

          <div
            className="
              shrink-0
              pt-3
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-[820px]
                rounded-[20px]
                border
                border-gray-200/80
                bg-white
                shadow-[0_3px_16px_rgba(0,0,0,0.045)]
              "
            >
              <div
                className="
                  flex
                  items-end
                  gap-2
                  px-4
                  py-3
                "
              >
                <button
                  type="button"
                  className="
                    mb-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-400
                    transition-colors
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  title="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <textarea
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="Ask a follow-up question or request more examples..."
                  className="
                    max-h-32
                    min-h-8
                    flex-1
                    resize-none
                    bg-transparent
                    py-1.5
                    text-[13px]
                    leading-relaxed
                    text-[#242631]
                    outline-none
                    placeholder:text-gray-400
                  "
                />

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`
                    mb-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    transition-all

                    ${
                      input.trim()
                        ? "bg-[#FF5500] text-white shadow-[0_3px_10px_rgba(255,85,0,0.2)] hover:bg-[#E64D00]"
                        : "bg-[#FFB9A5] text-white cursor-default"
                    }
                  `}
                  title="Send"
                >
                  <Send
                    className="h-4 w-4"
                    strokeWidth={2.3}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            IMPORTANT TOPICS
        =================================================== */}

        <aside
          className="
            hidden
            w-[210px]
            shrink-0
            lg:block
          "
        >
          <div
            className="
              sticky
              top-0
              rounded-[18px]
              border
              border-gray-200/80
              bg-white
              p-4
              shadow-[0_2px_12px_rgba(0,0,0,0.035)]
            "
          >
            <div className="mb-4">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-gray-400
                "
              >
                Important Topics
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  leading-relaxed
                  text-gray-400
                "
              >
                Key concepts from this conversation
              </p>
            </div>

            {messages
              .filter((message) => message.topics)
              .map((message) => (
                <div
                  key={message.id}
                  className="space-y-1.5"
                >
                  {message.topics!.map(
                    (topic) => (
                      <button
                        key={topic}
                        type="button"
                        className="
                          flex
                          w-full
                          items-center
                          rounded-xl
                          border
                          border-transparent
                          bg-gray-50
                          px-3
                          py-2.5
                          text-left
                          text-[11px]
                          font-medium
                          text-gray-600
                          transition-all
                          hover:border-orange-100
                          hover:bg-orange-50/50
                          hover:text-[#FF5500]
                        "
                      >
                        {topic}
                      </button>
                    )
                  )}
                </div>
              ))}

            {messages.filter(
              (message) => message.topics
            ).length === 0 && (
              <p className="text-[11px] text-gray-400">
                No important topics yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ContextualChatView;