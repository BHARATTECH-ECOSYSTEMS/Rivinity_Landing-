"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  Volume2,
  AudioWaveform,
  Users,
  Paperclip,
  ArrowUpRight,
  ArrowLeft,
  X,
  Sparkles,
  HatGlasses,
  Play,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import TextToSpeechView from "./views/TextToSpeechView";
import SpeechToTextView from "./views/SpeechToTextView";
import AudioGeneratorView from "./views/AudioGeneratorView";
import VoiceCloneView from "./views/VoiceCloneView";

export interface AudioFeature {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  placeholder: string;
  description: string;
  starterTitle: string;
  starterPrompt: string;
}

export const AUDIO_FEATURES: AudioFeature[] = [
  {
    id: "text-to-speech",
    label: "Text to Speech",
    icon: Volume2,
    placeholder: "Enter text to convert to lifelike speech, paste a script, or type a voice prompt...",
    description: "Convert written text into ultra-realistic spoken audio with customizable voices and accents",
    starterTitle: "Meditation & Calm Narration",
    starterPrompt:
      "Bring your attention to the crown of your head... Notice any sensations there. Slowly let your awareness travel down to your forehead, your eyes, and your jaw.",
  },
  {
    id: "speech-to-text",
    label: "Speech to Text",
    icon: Mic,
    placeholder: "Upload an audio recording or type instructions for transcribing speech...",
    description: "Transcribe multi-speaker audio recordings, meetings, and voice memos with high accuracy",
    starterTitle: "Meeting & Interview Transcription",
    starterPrompt:
      "Transcribe team standup recording with speaker diarization, timestamps, and action item summary.",
  },
  {
    id: "audio-generator",
    label: "Sound FX",
    icon: AudioWaveform,
    placeholder: "Describe any sound effect, ambience, or foley (e.g. 'Gentle rain on skylight with thunder')...",
    description: "Synthesize bespoke ambient environments, cinematic foley, and sound effects from text prompts",
    starterTitle: "Rain on Skylight Ambience",
    starterPrompt:
      "Soft soothing raindrops tapping against a glass skylight with distant rolling thunder and cozy warmth.",
  },
  {
    id: "voice-clone",
    label: "Voice Clone",
    icon: Users,
    placeholder: "Describe the voice persona to clone or enter text to speak with cloned voice...",
    description: "Clone unique vocal timbres in seconds or morph tone, pitch, and formants in real-time",
    starterTitle: "Narrative Voice Timbre Morph",
    starterPrompt:
      "Welcome to Rivinity Audio Lab. This demonstrates real-time voice timbre morphing and neural cloning.",
  },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
  currentPrompt?: string;
  onPromptSubmit?: (prompt: string, feature: string, file?: File | null) => void;
  attachedFile?: File | null;
  onFileChange?: (file: File | null) => void;
}

export default function AudioLabMain({
  activeFeature = "landing",
  onFeatureChange,
  currentPrompt = "",
  onPromptSubmit,
  attachedFile = null,
  onFileChange,
}: Props) {
  const [selectedFeature, setSelectedFeature] = useState<string>("text-to-speech");
  const [input, setInput] = useState<string>("");
  const [isIncognito, setIsIncognito] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [localAttachedFile, setLocalAttachedFile] = useState<File | null>(attachedFile || null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync external attached file changes
  useEffect(() => {
    if (attachedFile !== undefined) {
      setLocalAttachedFile(attachedFile);
    }
  }, [attachedFile]);

  // Keep recognition clean on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const handleSelectFeature = (featureId: string) => {
    setSelectedFeature(featureId);
    if (activeFeature !== "landing") {
      onFeatureChange(featureId);
    }
  };

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    const targetFeature =
      activeFeature !== "landing" ? activeFeature : selectedFeature;

    if (onPromptSubmit) {
      onPromptSubmit(trimmed, targetFeature, localAttachedFile);
    } else {
      onFeatureChange(targetFeature);
    }

    if (isIncognito) {
      toast.info("Incognito: prompt processed without saving to session history.");
    } else {
      const featObj = AUDIO_FEATURES.find((f) => f.id === targetFeature);
      toast.success(`Sent to ${featObj?.label || "Audio Lab"}`);
    }

    setInput("");
    setLocalAttachedFile(null);
    if (onFileChange) onFileChange(null);
  }, [
    input,
    activeFeature,
    selectedFeature,
    localAttachedFile,
    isIncognito,
    onPromptSubmit,
    onFeatureChange,
    onFileChange,
  ]);



  const toggleVoiceRecording = useCallback(() => {
    const win = window as unknown as Record<string, any>;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening... Speak your prompt now");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev.trim()} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== "no-speech") {
          toast.error(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      toast.error("Could not access microphone.");
    }
  }, [isListening]);

  // Pill option bar matching chat page chatbox tabs
  const renderOptionPills = (compact = false, fullWidth = false) => {
    const activeId = activeFeature !== "landing" ? activeFeature : selectedFeature;

    return (
      <div
        className={cn(
          "w-full flex items-center gap-1.5 sm:gap-2 py-0.5",
          fullWidth
            ? "justify-between"
            : "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden justify-start"
        )}
      >
        {AUDIO_FEATURES.map((item) => {
          const Icon = item.icon;
          const isSelected = activeId === item.id;

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectFeature(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectFeature(item.id);
                }
              }}
              className={cn(
                "group relative flex items-center transition-all duration-150 rounded-full cursor-pointer select-none",
                fullWidth
                  ? "flex-1 justify-center min-w-0 text-center"
                  : "shrink-0",
                compact
                  ? "gap-1.5 px-2 sm:px-3 py-1.5 text-[12px] sm:text-[12.5px] md:text-[13px]"
                  : "gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[13px] sm:text-[13.5px]",
                isSelected
                  ? isIncognito
                    ? "border border-[#FF6B00]/70 text-[#FF6B00] bg-[#FF6B00]/15 font-medium"
                    : "border border-[#FF6B00]/40 text-[#FF6B00] bg-orange-50/50 dark:bg-orange-950/30 font-medium"
                  : isIncognito
                    ? "text-zinc-400 hover:text-white border border-white/10 hover:border-zinc-500 hover:bg-white/5 font-medium bg-white/5"
                    : "text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border border-gray-200/90 dark:border-zinc-700/70 hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/50 hover:bg-orange-50/20 dark:hover:bg-orange-950/20 font-medium bg-white/40 dark:bg-zinc-800/30"
              )}
            >
              <Icon
                className={cn(
                  "shrink-0 transition-colors w-3.5 h-3.5 sm:w-4 sm:h-4",
                  isSelected
                    ? "text-[#FF6B00]"
                    : isIncognito
                      ? "text-zinc-400 group-hover:text-zinc-200"
                      : "text-gray-500 dark:text-zinc-400 group-hover:text-gray-700 dark:group-hover:text-zinc-200"
                )}
                strokeWidth={isSelected ? 2.2 : 1.9}
              />
              <span className="tracking-tight whitespace-nowrap truncate">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const currentPlaceholder =
    AUDIO_FEATURES.find(
      (f) => f.id === (activeFeature !== "landing" ? activeFeature : selectedFeature)
    )?.placeholder || "Enter audio prompt...";

  // Main Prompt Chatbox
  const renderPromptBox = (isCompact = false) => {
    return (
      <div
        className={cn(
          "w-full max-w-full mx-auto relative flex flex-col justify-center transition-all duration-300 ease-out",
          isIncognito &&
            "p-2 sm:p-2.5 rounded-[26px] bg-slate-100/90 dark:bg-zinc-800/60 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-700/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-none"
        )}
      >
        {isIncognito && (
          <div className="px-3.5 sm:px-4 pt-1 pb-2 text-[12.5px] select-none text-slate-700 dark:text-zinc-300 font-medium tracking-tight animate-in fade-in duration-200">
            Incognito Mode Active &bull; Audio sessions will not be saved to library
          </div>
        )}

        <div
          className={cn(
            "transition-all duration-300 ease-out overflow-hidden flex flex-col w-full relative",
            isIncognito
              ? "bg-[#22242a] dark:bg-[#1c1e24] rounded-[20px] border border-zinc-700/40 shadow-xl text-white"
              : "bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/90 dark:border-zinc-800/90 hover:border-slate-400 dark:hover:border-zinc-600 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400/20 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-500/20 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          )}
        >
          {/* OPTION TABS BAR (Taking full space evenly) */}
          <div
            className={cn(
              "w-full",
              isCompact
                ? "px-2 pt-1.5 pb-0.5"
                : "px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1"
            )}
          >
            {renderOptionPills(true, true)}
          </div>

          {/* ATTACHED FILE CHIP */}
          {localAttachedFile && (
            <div
              className={cn(
                "px-3 sm:px-4 pt-2 pb-1 flex items-center gap-2 border-b",
                isIncognito ? "border-white/10" : "border-gray-100/80 dark:border-zinc-800/80"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs",
                  isIncognito
                    ? "bg-white/5 border-white/10 text-zinc-200"
                    : "bg-slate-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200"
                )}
              >
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span className="max-w-[200px] truncate font-medium">
                  {localAttachedFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalAttachedFile(null);
                    if (onFileChange) onFileChange(null);
                  }}
                  className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* TEXTAREA PROMPT INPUT */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isIncognito ? "Enter audio prompt (Incognito mode)..." : currentPlaceholder}
            rows={1}
            className={cn(
              "w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3.5 sm:px-4.5 pt-2.5 sm:pt-3 pb-1.5",
              isIncognito
                ? "text-white placeholder:text-zinc-500"
                : "text-[#0f172a] dark:text-zinc-100 placeholder:text-[#94a3b8]"
            )}
            style={{ minHeight: isCompact ? "42px" : "48px", outline: "none" }}
          />

          {/* ACTIONS ROW */}
          <div className="flex items-center justify-between w-full px-2.5 sm:px-4 pb-2.5 sm:pb-3 pt-0.5">
            <div className="flex items-center min-w-0 gap-1 sm:gap-1.5">
              {/* Paperclip Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 bg-transparent",
                  isIncognito
                    ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                    : localAttachedFile
                    ? "!bg-orange-50 text-[#FF6B00] dark:!bg-orange-950/40"
                    : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={localAttachedFile ? `Attached: ${localAttachedFile.name}` : "Attach audio or script file"}
              >
                <Paperclip className="w-4 h-4 shrink-0" strokeWidth={2} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.wav,.mp3,.ogg,.flac,.txt,.doc,.pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLocalAttachedFile(file);
                    if (onFileChange) onFileChange(file);
                    toast.success(`Attached "${file.name}"`);
                  }
                  e.target.value = "";
                }}
              />

              {/* Incognito mode toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsIncognito((prev) => {
                    const next = !prev;
                    if (next) toast.info("Incognito mode active.");
                    else toast.info("Incognito mode disabled.");
                    return next;
                  });
                }}
                className={cn(
                  "flex w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center transition-colors cursor-pointer shrink-0 border-0",
                  isIncognito
                    ? "!bg-white/20 text-white shadow-xs ring-1 ring-white/30"
                    : "bg-transparent text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={isIncognito ? "Incognito active" : "Incognito mode"}
              >
                <HatGlasses className="w-4 h-4 shrink-0" strokeWidth={2} />
              </button>
            </div>

            {/* Right side: Mic and Send */}
            <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 bg-transparent",
                  isListening
                    ? "!bg-red-500 text-white animate-pulse shadow-sm"
                    : isIncognito
                    ? "text-zinc-400 hover:text-white hover:!bg-white/10"
                    : "text-slate-500 hover:text-slate-900 hover:!bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:!bg-zinc-800"
                )}
                title={isListening ? "Listening... Click to stop" : "Voice dictation"}
              >
                <Mic className="w-4 h-4 shrink-0" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() && !localAttachedFile}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all",
                  input.trim() || localAttachedFile
                    ? "!bg-[#FF6B00] hover:!bg-[#E66000] text-white shadow-[0_2px_8px_rgba(255,107,0,0.30)] active:scale-95"
                    : isIncognito
                    ? "!bg-white/10 text-white/35 cursor-not-allowed border border-white/5"
                    : "!bg-[#FFD5C2] dark:!bg-[#5a2e1d] text-white opacity-85 cursor-not-allowed"
                )}
                title="Generate audio / Send prompt"
              >
                <ArrowUpRight
                  className="w-4.5 h-4.5 shrink-0 text-white"
                  strokeWidth={2.4}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveView = () => {
    switch (activeFeature) {
      case "text-to-speech":
        return <TextToSpeechView initialPrompt={currentPrompt} />;
      case "speech-to-text":
        return <SpeechToTextView initialPrompt={currentPrompt} initialFile={attachedFile} />;
      case "audio-generator":
        return <AudioGeneratorView initialPrompt={currentPrompt} />;
      case "voice-clone":
        return <VoiceCloneView initialPrompt={currentPrompt} />;
      default:
        return <TextToSpeechView initialPrompt={currentPrompt} />;
    }
  };

  // IF NOT LANDING: Render the full view with top navigation bar and bottom docked prompt box (like RivinityLM)
  if (activeFeature !== "landing") {
    const currentFeatObj = AUDIO_FEATURES.find((f) => f.id === activeFeature);
    const FeatureIcon = currentFeatObj?.icon || Volume2;

    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
        {/* TOP BAR WITH BACK TO LANDING & IMAGE 1 PILL SWITCHER */}
        <div className="px-3 sm:px-6 pt-2.5 pb-2 flex items-center justify-between shrink-0 border-b border-slate-200/80 dark:border-zinc-800/80 bg-[#f8fafc]/90 dark:bg-zinc-950/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onFeatureChange("landing")}
              aria-label="Back to Audio Lab Home"
              title="Back to Audio Lab Home"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300">
              <FeatureIcon className="w-4 h-4 text-[#FF6B00]" />
              <span>{currentFeatObj?.label || "Audio Lab"}</span>
            </div>
          </div>

          {/* Centered / Header option switcher matching Image 1 */}
          <div className="hidden md:flex items-center">
            {renderOptionPills(true)}
          </div>

          <div className="w-8 shrink-0 md:hidden" />
        </div>

        {/* ACTIVE FEATURE CONTENT */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
          <div className="animate-in fade-in duration-200 max-w-[1100px] mx-auto pb-4">
            {renderActiveView()}
          </div>
        </div>

        {/* DOCKED BOTTOM PROMPT BAR */}
        <div className="w-full shrink-0 z-20 px-3 sm:px-6 pb-2.5 pt-1.5 bg-gradient-to-t from-[#f8fafc] dark:from-zinc-950 via-[#f8fafc]/90 dark:via-zinc-950/90 to-transparent">
          <div className="w-full max-w-[840px] mx-auto">
            {renderPromptBox(false)}
          </div>
        </div>
      </div>
    );
  }

  // LANDING PAGE (modeled directly on Rivinity LM with Watermark & Image 1 Options)
  return (
    <div className="flex flex-1 flex-col min-w-0 min-h-0 h-full w-full overflow-hidden relative bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden">
        <img
          src="/watermark.png"
          alt=""
          width={560}
          height={560}
          style={{
            maxWidth: "min(560px, 80vw)",
            maxHeight: "min(560px, 80vh)",
            width: "100%",
            height: "auto",
            opacity: 0.035,
          }}
          className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] object-contain"
        />
      </div>

      <main className="relative flex-1 min-h-full flex flex-col items-center justify-center w-full px-4 sm:px-8 py-6 sm:py-8 my-auto z-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* HERO TITLE (matching chat page) */}
        <div className="relative z-10 w-full max-w-[700px] mx-auto flex flex-col items-center justify-center mb-4 sm:mb-6 select-none">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight text-center w-full">
            What sound would you like to create today?
          </div>
        </div>

        {/* CHATBOX IN CENTER */}
        <div className="relative z-10 w-full max-w-[700px] mx-auto flex justify-center">
          {renderPromptBox(false)}
        </div>

        {/* DISCLAIMER LIKE IN CHAT PAGE */}
        <div className="text-[11.5px] sm:text-[12px] text-gray-400 dark:text-zinc-500 text-center mt-2.5 sm:mt-3 select-none">
          Rivinity can make mistakes. Check important info.
        </div>
      </main>
    </div>
  );
}
