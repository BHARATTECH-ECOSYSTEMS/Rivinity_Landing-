import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Paperclip, Mic, Sparkles, Loader2, ChevronDown, Plus,
  Search, FileText, Lightbulb, Wand2, Layers, Zap, Image as ImageIcon,
  BookOpen, Beaker, Globe, Code2, MessageSquare,
  GraduationCap, Layout, Smartphone, Palette, Rocket,
  Component, Video, ArrowLeft
} from "lucide-react";
import rivinityMark from "./rivinity-mark.png.asset.json";

type SceneId = "chat" | "lm" | "builder";
type Phase = "idle" | "click" | "typing" | "sending" | "thinking" | "executing" | "done";

interface SceneMeta {
  id: SceneId;
  surface: string;
  accent: string;
  prompt: string;
}

const SCENES: SceneMeta[] = [
  { id: "chat", surface: "ai chat", accent: "#FD881F",
    prompt: "Summarize our Q3 user research into three clear takeaways." },
  { id: "lm", surface: "rivinitylm", accent: "#F5A9D0",
    prompt: "Teach me how transformers work — build me a 3-lesson plan." },
  { id: "builder", surface: "app builder", accent: "#BFA7F8",
    prompt: "Build a pricing page for a coffee subscription SaaS." },
];

const TYPING_MS = 22;
const THINKING_MS = 700;
const DONE_HOLD_MS = 1600;
const MEMORY_HOLD_MS = 4200;

const CHAT_STREAM = [
  "Here are the three main takeaways from Q3 research:\n\n",
  "1. Onboarding friction is the biggest drop-off — users who didn't finish setup in session one were 4× less likely to return.\n\n",
  "2. Power users want deeper customization — custom ag",
].join("");

const LM_LESSONS = [
  { n: 1, title: "Attention, intuitively", mins: "8 min", tag: "Concept", progress: 20 },
  { n: 2, title: "Building a tiny transformer", mins: "14 min", tag: "Hands-on", progress: 35 },
];

const BUILDER_CODE = [
  '<section className="pricing">',
  "  <h2>Choose your roast</h2>",
  '  <PricingCard tier="Light" price="$14" />',
  '  <PricingCard tier="Medium" price="$18" popular />',
  '  <PricingCard tier="Dark" price="$22" />',
  "</section>",
];

const MEMORY_NODES = [
  { id: "chat",    label: "AI Chat",         icon: MessageSquare,    x: 50, y: 35 },
  { id: "search",  label: "Deep Search",     icon: Search,           x: 32, y: 48 },
  { id: "lm",      label: "RivinityLM",      icon: GraduationCap,    x: 68, y: 48 },
  { id: "image",   label: "Image Enhancer",  icon: ImageIcon,        x: 38, y: 72 },
  { id: "video",   label: "Prompt → Video",  icon: Video,            x: 62, y: 72 },
  { id: "builder", label: "App Builder",     icon: Layout,           x: 50, y: 85 },
] as const;
const CENTER = { x: 50, y: 55 };

// ---------------------------------------------------------------------------

const HeroWorkflow = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [streamed, setStreamed] = useState("");
  const [lessonStep, setLessonStep] = useState(0);
  const [codeStep, setCodeStep] = useState(0);
  const [showMemory, setShowMemory] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scene = SCENES[sceneIdx];

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((r) => { const t = window.setTimeout(r, ms); timers.push(t); });

    const run = async () => {
      setTyped(""); setStreamed(""); setLessonStep(0); setCodeStep(0);
      setShowMemory(false); setPhase("idle");
      await wait(500); if (cancelled) return;

      setPhase("click"); await wait(650); if (cancelled) return;

      setPhase("typing");
      for (let i = 1; i <= scene.prompt.length; i++) {
        if (cancelled) return;
        setTyped(scene.prompt.slice(0, i));
        await wait(TYPING_MS);
      }
      await wait(380); if (cancelled) return;

      setPhase("sending"); await wait(240); setTyped(""); if (cancelled) return;

      setPhase("thinking"); await wait(THINKING_MS); if (cancelled) return;

      setPhase("executing");
      if (scene.id === "chat") {
        for (let i = 1; i <= CHAT_STREAM.length; i++) {
          if (cancelled) return;
          setStreamed(CHAT_STREAM.slice(0, i));
          await wait(9 + (i % 9 === 0 ? 18 : 0));
        }
      } else if (scene.id === "lm") {
        for (let i = 1; i <= LM_LESSONS.length; i++) {
          if (cancelled) return;
          setLessonStep(i);
          await wait(680);
        }
        await wait(500);
      } else {
        for (let i = 1; i <= BUILDER_CODE.length; i++) {
          if (cancelled) return;
          setCodeStep(i);
          await wait(460);
        }
        await wait(500);
      }
      if (cancelled) return;

      setPhase("done"); await wait(DONE_HOLD_MS); if (cancelled) return;

      if (scene.id === "builder") {
        setShowMemory(true);
        await wait(MEMORY_HOLD_MS); if (cancelled) return;
        setShowMemory(false);
        setSceneIdx(0);
      } else {
        setSceneIdx((i) => (i + 1) % SCENES.length);
      }
      setRunKey((k) => k + 1);
    };

    run();
    return () => { cancelled = true; timers.forEach((t) => clearTimeout(t)); };
  }, [runKey, scene.id, scene.prompt]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [streamed, lessonStep, codeStep, phase]);

  const conversationVisible = phase === "sending" || phase === "thinking" || phase === "executing" || phase === "done";
  const isBusy = phase === "click" || phase === "typing" || phase === "sending" || phase === "thinking" || phase === "executing";

  const statusLabel =
    phase === "executing" ? "EXECUTING" :
    phase === "thinking" ? "THINKING" :
    phase === "done" ? "COMPLETED" :
    (phase === "typing" || phase === "click" || phase === "sending") ? "TYPING" : "LIVE";
    
  const statusDot = (statusLabel === "LIVE" || statusLabel === "COMPLETED") ? "bg-emerald-500" : "bg-[#FD881F]";

  return (
    <div className="relative mx-auto w-full max-w-6xl font-sans">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#FCFCFD] border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="w-3 h-3 rounded-full bg-gray-200" />
          </div>
          <motion.div key={scene.id + "-label"}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: scene.accent }} />
            rivinity <span className="text-gray-300">/</span> {scene.surface}
          </motion.div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <motion.span className={`w-1.5 h-1.5 rounded-full ${statusDot}`}
              animate={{ opacity: isBusy ? [1, 0.35, 1] : 1 }}
              transition={{ duration: 1.1, repeat: isBusy ? Infinity : 0 }} />
            {statusLabel}
          </div>
        </div>

        {/* Scene body */}
        <div className="relative min-h-[580px] md:min-h-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id + "-" + runKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {scene.id === "chat" && (
                <ChatScene
                  phase={phase} typed={typed} streamed={streamed} prompt={scene.prompt}
                  conversationVisible={conversationVisible} scrollerRef={scrollerRef}
                />
              )}
              {scene.id === "lm" && (
                <LMScene
                  phase={phase} typed={typed} lessonStep={lessonStep} prompt={scene.prompt}
                  conversationVisible={conversationVisible} scrollerRef={scrollerRef}
                />
              )}
              {scene.id === "builder" && (
                <BuilderScene
                  phase={phase} typed={typed} codeStep={codeStep} prompt={scene.prompt}
                  conversationVisible={conversationVisible} scrollerRef={scrollerRef}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showMemory && <MemoryGraphOverlay />}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Shared Prompt Bubble
// ---------------------------------------------------------------------------

const PromptBubble = ({ text }: { text: string }) => (
  <div className="flex justify-end pr-4">
    <div className="max-w-[70%] rounded-3xl rounded-br-lg bg-gradient-to-r from-[#7B61FF] via-[#EC4899] to-[#F97316] text-white px-5 py-3.5 shadow-md">
      <p className="text-[14px] font-medium leading-relaxed">{text}</p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Scene 1 — AI Chat
// ---------------------------------------------------------------------------

const ChatScene = ({
  phase, typed, streamed, prompt, conversationVisible, scrollerRef,
}: {
  phase: Phase; typed: string; streamed: string; prompt: string;
  conversationVisible: boolean; scrollerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#FCFCFD]">
      {/* Top Bar */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Workspace</p>
          <h2 className="text-[18px] font-bold text-gray-900 leading-tight">AI Chat</h2>
        </div>
        <button className="h-8 px-4 rounded-full bg-white border border-gray-200 text-[12px] font-semibold text-gray-700 flex items-center gap-1.5 shadow-sm">
          <Layers className="w-3.5 h-3.5" strokeWidth={2} /> Skills
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {conversationVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              ref={scrollerRef}
              className="absolute inset-0 overflow-y-auto px-6 pt-6 pb-2 space-y-6"
            >
              <PromptBubble text={prompt} />
              
              <div className="flex justify-start">
                <div className="w-full max-w-[95%] rounded-3xl rounded-bl-lg bg-white border border-gray-100 shadow-sm px-6 py-5">
                  <div className="flex items-center gap-2 mb-4">
                    <img src={rivinityMark.url} alt="" className="w-5 h-5 rounded object-contain" />
                    <span className="text-[13px] font-semibold text-gray-700">Rivinity</span>
                  </div>
                  {phase === "thinking" ? (
                    <div className="flex items-center gap-2 text-gray-500 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[13px] font-medium">Thinking…</span>
                    </div>
                  ) : (
                    <div className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                      {streamed}
                      {phase === "executing" && (
                        <motion.span
                          className="inline-block w-[2px] h-[16px] align-middle ml-0.5 bg-gray-400"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer Area */}
      <div className="px-6 pb-6 pt-2 shrink-0">
        <div className="mx-auto w-full max-w-[700px] bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-white border-r border-gray-100 text-[12px] font-semibold text-gray-900 flex-1 truncate shadow-[0_2px_0_0_white]">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Smart Paper Sear...</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1 truncate">
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Smart Summariza...</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1 truncate">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Citation Generator</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1 truncate">
              <Wand2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Write Anything</span>
            </div>
            <div className="px-3 py-3 text-gray-400 shrink-0"><Plus className="w-4 h-4" /></div>
          </div>
          
          {/* Input Box */}
          <div className="relative px-4 pt-4 pb-2 min-h-[60px] text-[14px]">
            <span className={typed ? "text-gray-900" : "text-gray-300 font-medium"}>
              {typed || "Ask anything — the orchestrator picks the right tool, model & agents."}
            </span>
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between px-3 pb-3 pt-2">
            <div className="flex items-center gap-1.5">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Paperclip className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Mic className="w-4 h-4" /></button>
              
              <button className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700">
                <Zap className="w-3 h-3 fill-indigo-700" /> Auto-route
              </button>
              <button className="inline-flex items-center gap-1 px-2 py-1.5 text-[12px] font-medium text-gray-500">
                <Layers className="w-3.5 h-3.5" /> Skills <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              <button className="inline-flex items-center gap-1 px-2 py-1.5 text-[12px] font-medium text-gray-500">
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </span>
                orchestrator <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
            </div>
            <div className={`w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center ${phase === 'sending' ? 'scale-90' : 'scale-100'} transition-transform`}>
              <Send className="w-3.5 h-3.5 text-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Scene 2 — RivinityLM
// ---------------------------------------------------------------------------

const LMScene = ({
  phase, typed, lessonStep, prompt, conversationVisible, scrollerRef,
}: {
  phase: Phase; typed: string; lessonStep: number; prompt: string;
  conversationVisible: boolean; scrollerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#FCFCFD]">
      {/* Top Tabs Bar */}
      <div className="px-6 py-4 flex items-center gap-1 border-b border-gray-100/50 bg-white shrink-0">
        <button className="flex items-center gap-1 text-[13px] font-semibold text-gray-400 mr-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </button>
        <span className="w-px h-5 bg-gray-200 mx-2" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[13px] font-bold text-gray-900 shadow-sm">
          <MessageSquare className="w-3.5 h-3.5" /> Chat
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-400">
          <FileText className="w-3.5 h-3.5" /> SmartNotes
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-400">
          <Layers className="w-3.5 h-3.5" /> Flashcards
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-400">
          <GraduationCap className="w-3.5 h-3.5" /> ExamLab
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {conversationVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              ref={scrollerRef}
              className="absolute inset-0 overflow-y-auto px-6 pt-6 pb-2 space-y-6"
            >
              <PromptBubble text={prompt} />
              
              <div className="flex justify-start">
                <div className="w-full max-w-[95%] rounded-3xl rounded-bl-lg bg-white border border-gray-100 shadow-sm px-6 py-5">
                  <div className="flex items-center gap-2 mb-4">
                    <img src={rivinityMark.url} alt="" className="w-5 h-5 rounded object-contain" />
                    <span className="text-[13px] font-semibold text-gray-700">RivinityLM</span>
                    <span className="text-gray-300 text-[14px]">·</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#F472B6]">
                      Contextual Chat
                    </span>
                  </div>
                  
                  {phase === "thinking" ? (
                    <div className="flex items-center gap-2 text-gray-500 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[13px] font-medium">Building lesson plan…</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-[#F472B6]" />
                        <span className="text-[13px] font-semibold text-gray-800">Personalized lesson plan</span>
                      </div>
                      
                      {LM_LESSONS.map((l, i) => (
                        <AnimatePresence key={l.n}>
                          {i < lessonStep && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                            >
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D946EF] to-[#F472B6] flex items-center justify-center text-[13px] font-bold text-white shrink-0">
                                {l.n}
                              </div>
                              <div className="flex-1">
                                <div className="text-[14px] font-bold text-gray-900">{l.title}</div>
                                <div className="text-[12px] font-medium text-gray-400 mt-0.5">{l.tag} · {l.mins}</div>
                              </div>
                              <div className="w-12 h-2 rounded-full bg-gray-100 overflow-hidden shrink-0">
                                <div className="h-full bg-[#F472B6] rounded-full" style={{ width: `${l.progress}%` }} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer Area */}
      <div className="px-6 pb-6 pt-2 shrink-0">
        <div className="mx-auto w-full max-w-[700px] bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="flex items-center border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 bg-white border-r border-gray-100 text-[12px] font-semibold text-gray-900 flex-1 shadow-[0_2px_0_0_white]">
              <BookOpen className="w-4 h-4" /> Study Session
            </div>
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1">
              <Beaker className="w-4 h-4" /> Research Lab
            </div>
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1">
              <Globe className="w-4 h-4" /> Explore Topics
            </div>
            <div className="px-3 py-3 text-gray-400 shrink-0"><Plus className="w-4 h-4" /></div>
          </div>
          
          <div className="relative px-5 pt-4 pb-4 min-h-[60px] text-[15px]">
            <span className={typed ? "text-gray-900" : "text-gray-300 font-medium"}>
              {typed || "Ask me to teach you anything..."}
            </span>
          </div>
          
          <div className="flex items-center justify-between px-5 pb-4 pt-2">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Prompt Mode</span>
                <span className="text-[13px] font-bold text-gray-800 flex items-center gap-1">
                  Chat <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Add files</span>
                  <span className="text-[13px] font-semibold text-gray-600">Click or drop</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Length</span>
                <span className="text-[13px] font-bold text-gray-800 flex items-center gap-1">
                  Medium <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </span>
              </div>
            </div>
            <div className={`w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center ${phase === 'sending' ? 'scale-90' : 'scale-100'} transition-transform`}>
              <Send className="w-4 h-4 text-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Scene 3 — App Builder
// ---------------------------------------------------------------------------

const BuilderScene = ({
  phase, typed, codeStep, prompt, conversationVisible, scrollerRef,
}: {
  phase: Phase; typed: string; codeStep: number; prompt: string;
  conversationVisible: boolean; scrollerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#FCFCFD]">
      <div className="px-6 pt-5 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Workspace</p>
          <h2 className="text-[18px] font-bold text-gray-900 leading-tight">App Builder</h2>
        </div>
        <button className="h-8 px-4 rounded-full bg-white border border-gray-200 text-[12px] font-semibold text-gray-700 flex items-center gap-1.5 shadow-sm">
          <Rocket className="w-3.5 h-3.5" /> Deploy
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {conversationVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              ref={scrollerRef}
              className="absolute inset-0 overflow-y-auto px-6 pt-6 pb-2 space-y-6"
            >
              <PromptBubble text={prompt} />
              
              <div className="flex justify-start">
                <div className="w-full max-w-[95%] rounded-3xl rounded-bl-lg bg-white border border-gray-100 shadow-sm px-6 py-5">
                  <div className="flex items-center gap-2 mb-4">
                    <img src={rivinityMark.url} alt="" className="w-5 h-5 rounded object-contain" />
                    <span className="text-[13px] font-semibold text-gray-700">App Builder</span>
                    <span className="text-gray-300 text-[14px]">·</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#BFA7F8]">
                      Workbench
                    </span>
                  </div>

                  {phase === "thinking" ? (
                    <div className="flex items-center gap-2 text-gray-500 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[13px] font-medium">Generating components…</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {/* Code Panel */}
                      <div className="rounded-xl border border-gray-100 bg-[#FCFCFD] p-4">
                        <div className="flex items-center gap-2 mb-3 text-gray-400">
                          <Code2 className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Pricing.tsx</span>
                        </div>
                        <div className="font-mono text-[12px] leading-relaxed text-gray-600">
                          {BUILDER_CODE.map((line, i) => (
                            <AnimatePresence key={i}>
                              {i < codeStep && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                  <span className="text-gray-300 mr-3 select-none">{String(i + 1).padStart(2, "0")}</span>
                                  {line.replace(/</g, '\u003c').replace(/>/g, '\u003e')}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          ))}
                        </div>
                      </div>

                      {/* Live Preview Panel */}
                      <div className="rounded-xl border border-gray-100 bg-[#FCFCFD] p-4">
                        <div className="flex items-center gap-2 mb-4 text-gray-400">
                          <Sparkles className="w-3.5 h-3.5 text-[#BFA7F8]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Live Preview</span>
                        </div>
                        
                        <AnimatePresence>
                          {codeStep >= 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <h3 className="text-[15px] font-bold text-gray-900 mb-4">Choose your roast</h3>
                              <div className="grid grid-cols-3 gap-3">
                                {["Light", "Medium", "Dark"].map((tier, i) => {
                                  const isPopular = tier === "Medium";
                                  return (
                                    <AnimatePresence key={tier}>
                                      {codeStep >= 3 + i && (
                                        <motion.div
                                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                          className={`relative rounded-xl border-2 bg-white px-2 py-4 text-center flex flex-col items-center justify-center
                                            ${isPopular ? 'border-[#BFA7F8] shadow-sm' : 'border-gray-100'}`}
                                        >
                                          {isPopular && (
                                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#BFA7F8] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                                              Popular
                                            </span>
                                          )}
                                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{tier}</div>
                                          <div className="text-[16px] font-bold text-gray-900">${14 + i * 4}</div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer Area */}
      <div className="px-6 pb-6 pt-2 shrink-0">
        <div className="mx-auto w-full max-w-[700px] bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="flex items-center border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 bg-white border-r border-gray-100 text-[12px] font-semibold text-gray-900 flex-1 shadow-[0_2px_0_0_white]">
              <Layout className="w-4 h-4" /> App Generator
            </div>
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1">
              <Smartphone className="w-4 h-4" /> UI Builder
            </div>
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-r border-gray-100 text-[12px] font-medium text-gray-400 flex-1">
              <Globe className="w-4 h-4" /> Website Creator
            </div>
            <div className="px-3 py-3 text-gray-400 shrink-0"><Plus className="w-4 h-4" /></div>
          </div>
          
          <div className="relative px-5 pt-4 pb-2 min-h-[60px] text-[15px]">
            <span className={typed ? "text-gray-900" : "text-gray-300 font-medium"}>
              {typed || "Describe the app you want to build..."}
            </span>
          </div>
          
          <div className="flex items-center justify-between px-4 pb-3 pt-2">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Paperclip className="w-4 h-4" /></button>
              <button className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-semibold text-gray-500">
                <Palette className="w-4 h-4" /> Theme
              </button>
              <button className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-semibold text-gray-500">
                <Component className="w-4 h-4" /> Components
              </button>
              <button className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-semibold text-gray-500">
                <Code2 className="w-4 h-4" /> Stack <ChevronDown className="w-3.5 h-3.5 opacity-50" />
              </button>
            </div>
            <div className={`w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center ${phase === 'sending' ? 'scale-90' : 'scale-100'} transition-transform`}>
              <Send className="w-4 h-4 text-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Memory Graph Overlay
// ---------------------------------------------------------------------------

const MemoryGraphOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-20 bg-[#FCFCFD]/95 backdrop-blur-sm flex flex-col items-center justify-center px-8"
    >
      <div className="text-center mb-8">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          One Shared Memory
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[20px] font-bold text-gray-800">
          Every tool talks to every other tool. Context never resets.
        </motion.div>
      </div>

      <div className="relative w-full max-w-2xl h-75">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          {MEMORY_NODES.map((n, i) => (
            <g key={n.id}>
              {/* Pink Line */}
              <motion.line x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y}
                stroke="#F472B6" strokeWidth={0.3} opacity={0.6}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.07 }} />
              {/* Orange animated dot on the line */}
              <motion.circle r={0.7} fill="#FB923C"
                initial={{ opacity: 0 }}
                animate={{ cx: [CENTER.x, n.x, CENTER.x], cy: [CENTER.y, n.y, CENTER.y], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 + i * 0.2, ease: "linear" }} />
            </g>
          ))}
        </svg>

        {/* Center Node */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-100 px-4 py-2 flex items-center gap-2 shadow-[0_0_40px_rgba(244,114,182,0.25)] z-10"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}>
          <img src="public/logo.png" alt="Rivinity" className="w-5 h-5 rounded object-contain" />
          {/* <span className="text-[13px] font-bold text-gray-900">Rivinity Memory</span> */}
        </div>

        {/* Surrounding Nodes */}
        {MEMORY_NODES.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div key={n.id}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-100 px-3 py-1.5 flex items-center gap-2 shadow-sm"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <Icon className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[12px] font-semibold text-gray-700 whitespace-nowrap">{n.label}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.9 }}
        className="mt-12 text-[14px] font-medium text-gray-400 text-center max-w-lg leading-relaxed">
        Chat something, learn it in RivinityLM, ship it in App Builder — Rivinity remembers the whole thread.
      </motion.div>
    </motion.div>
  );
};

export default HeroWorkflow;