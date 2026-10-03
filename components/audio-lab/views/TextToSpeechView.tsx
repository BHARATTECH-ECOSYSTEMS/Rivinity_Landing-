"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Send,
  Download,
  RotateCcw,
  RotateCw,
  ChevronDown,
  Sparkles,
  Smile,
  Frown,
  Angry,
  Zap,
  Meh,
  CloudRain,
  AlertCircle,
  Leaf,
  Volume2,
  Sliders,
  Check,
  Globe,
  Radio,
  Clock,
  Layers,
  FileAudio,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const voices = [
  { id: "sarah", name: "Sarah", lang: "English (US)", accent: "Warm & Professional", gender: "Female", flag: "🇺🇸", avatar: "S", color: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800" },
  { id: "aarav", name: "Aarav", lang: "Hindi / English", accent: "Natural & Expressive", gender: "Male", flag: "🇮🇳", avatar: "A", color: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800" },
  { id: "jonathan", name: "Jonathan", lang: "English (UK)", accent: "Deep & Authoritative", gender: "Male", flag: "🇬🇧", avatar: "J", color: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800" },
  { id: "yolanda", name: "Yolanda", lang: "Spanish (ES)", accent: "Calm & Friendly", gender: "Female", flag: "🇪🇸", avatar: "Y", color: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800" },
  { id: "lily", name: "Lily", lang: "English (US)", accent: "Bright & Energetic", gender: "Female", flag: "🇺🇸", avatar: "L", color: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800" },
  { id: "kenji", name: "Kenji", lang: "Japanese (JA)", accent: "Clear & Narrative", gender: "Male", flag: "🇯🇵", avatar: "K", color: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800" },
];

const emotions = [
  { icon: Leaf, label: "Calm", desc: "Soothing & balanced" },
  { icon: Smile, label: "Happy", desc: "Warm & uplifting" },
  { icon: Zap, label: "Energetic", desc: "High enthusiasm" },
  { icon: Radio, label: "Storyteller", desc: "Narrative pacing" },
  { icon: Volume2, label: "Whisper", desc: "Soft & intimate" },
  { icon: Sparkles, label: "Dramatic", desc: "Intense & theatrical" },
  { icon: AlertCircle, label: "Serious", desc: "Corporate & formal" },
  { icon: Frown, label: "Sad", desc: "Somber tone" },
];

const defaultScript =
  "Bring your attention to the crown of your head... Notice any sensations there. Slowly let your awareness travel down to your forehead, your eyes, and your jaw. If you notice any tension, imagine it softening with each breath.";

interface TextToSpeechViewProps {
  initialPrompt?: string;
}

export default function TextToSpeechView({ initialPrompt }: TextToSpeechViewProps = {}) {
  const [text, setText] = useState(initialPrompt || defaultScript);
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setText(initialPrompt.trim());
      setHasGenerated(true);
      setIsPlaying(true);
      toast.success("Voice narration generated!");
    }
  }, [initialPrompt]);
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(28);
  const [currentTime, setCurrentTime] = useState(26);
  const [totalDuration] = useState(92);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("Calm");
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const playbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  }, [text]);

  useEffect(() => {
    if (!isPlaying) {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
      return;
    }

    playbackIntervalRef.current = setInterval(() => {
      setCurrentTime((time) => {
        const next = time + 1;
        if (next >= totalDuration) {
          setIsPlaying(false);
          setProgress(100);
          return totalDuration;
        }
        setProgress((next / totalDuration) * 100);
        return next;
      });
    }, 1000 / playbackSpeed);

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, totalDuration]);

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to synthesize.");
      return;
    }
    setIsGenerating(true);
    setIsPlaying(false);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setCurrentTime(0);
      setProgress(0);
      toast.success("Speech synthesized with " + selectedVoice.name + "!");
    }, 1200);
  };

  const handleInsertTag = (tag: string) => {
    setText((prev) => prev + " " + tag + " ");
    toast.info(`Inserted modifier: ${tag}`);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="w-full max-w-[960px] mx-auto space-y-5 px-2 sm:px-4 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
            Text to Speech Studio
          </div>
          <div className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 mt-0.5">
            Convert scripts, articles, and prompts into lifelike neural speech with fine emotional nuance.
          </div>
        </div>

        {/* VOICE SELECTOR DROPDOWN */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
            className="w-full sm:w-auto flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-2xs bg-gradient-to-tr", selectedVoice.color)}>
                {selectedVoice.avatar}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                  <span>{selectedVoice.name}</span>
                  <span className="text-[11px] font-normal text-slate-400">{selectedVoice.flag}</span>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-zinc-500">
                  {selectedVoice.accent}
                </div>
              </div>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ml-1.5", voiceDropdownOpen && "rotate-180")} />
          </button>

          {voiceDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2 text-[10.5px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800">
                Choose Voice Actor
              </div>
              <div className="max-h-72 overflow-y-auto py-1 [scrollbar-width:thin]">
                {voices.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedVoice(v);
                      setVoiceDropdownOpen(false);
                      toast.info(`Selected voice: ${v.name}`);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors cursor-pointer",
                      v.id === selectedVoice.id
                        ? "bg-slate-100/90 dark:bg-zinc-800/80 text-slate-900 dark:text-white font-semibold"
                        : "hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-2xs bg-gradient-to-tr", v.color)}>
                        {v.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{v.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{v.gender} · {v.flag}</span>
                        </div>
                        <div className="text-[10.5px] text-slate-400 dark:text-zinc-500 truncate max-w-[180px]">
                          {v.lang} · {v.accent}
                        </div>
                      </div>
                    </div>
                    {v.id === selectedVoice.id && <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TEXT / SCRIPT COMPOSER */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs overflow-hidden focus-within:border-slate-400 dark:focus-within:border-zinc-600 transition-all">
        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text to generate studio speech..."
          rows={4}
          className="w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none px-4 sm:px-5 pt-4 pb-2 resize-none [scrollbar-width:thin]"
          style={{ minHeight: "120px" }}
        />

        {/* MODIFIER TAGS & CONTROLS */}
        <div className="px-4 sm:px-5 pb-3.5 pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100/90 dark:border-zinc-800/80">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 mr-1">Insert:</span>
            {["[pause 0.5s]", "[whisper]", "[emphasis]", "[breath]"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleInsertTag(tag)}
                className="px-2.5 py-1 rounded-lg text-xs font-normal bg-slate-100/90 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700/80 text-slate-700 dark:text-zinc-300 border border-slate-200/90 dark:border-zinc-700/80 hover:border-slate-300 dark:hover:border-zinc-600 transition-all cursor-pointer shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-zinc-500">
              <Clock className="w-3 h-3" />
              <span>~{Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length * 0.4))}s audio</span>
              <span>•</span>
              <span>{text.length}/5,000 chars</span>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              className="flex items-center justify-center px-4.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Synthesizing...</span>
              ) : (
                <span>Generate Speech</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* EMOTION & DELIVERY CONTROLS */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Delivery Style & Emotion</span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500">Selected: {selectedEmotion}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {emotions.map((em) => {
            const Icon = em.icon;
            const isSelected = selectedEmotion === em.label;
            return (
              <button
                key={em.label}
                type="button"
                onClick={() => {
                  setSelectedEmotion(em.label);
                  toast.info(`Emotion set to: ${em.label}`);
                }}
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                  isSelected
                    ? "bg-slate-50 dark:bg-zinc-800 border-slate-900 dark:border-zinc-300 text-slate-900 dark:text-white shadow-xs"
                    : "bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200/70 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700"
                )}
              >
                <div className={cn("p-1.5 rounded-lg shrink-0", isSelected ? "bg-slate-200/80 dark:bg-zinc-700 text-slate-900 dark:text-white" : "bg-slate-100 dark:bg-zinc-800 text-slate-400")}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{em.label}</div>
                  <div className="text-[10px] text-slate-400 dark:text-zinc-500 truncate">{em.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* GENERATED AUDIO PLAYER */}
      {hasGenerated && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-2xs bg-gradient-to-tr", selectedVoice.color)}>
                {selectedVoice.avatar}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  <span>{selectedVoice.name} · {selectedEmotion} Take</span>
                </div>
                <div className="text-[10.5px] text-slate-400 dark:text-zinc-500">
                  48kHz · 320kbps · Neural Model v3
                </div>
              </div>
            </div>

            {/* SPEED & ACTIONS */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-0.5 rounded-lg">
                {[0.75, 1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={cn(
                      "px-2 py-0.5 text-[10.5px] font-semibold rounded-md transition-all cursor-pointer",
                      playbackSpeed === spd
                        ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                        : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                    )}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => toast.success("Audio file downloaded (HD WAV)")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export WAV</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC WAVEFORM EQUALIZER */}
          <div className="flex items-center gap-1 sm:gap-1.5 h-12 sm:h-14 px-3 py-2 bg-slate-50 dark:bg-zinc-950/60 rounded-xl border border-slate-100 dark:border-zinc-800/80 mb-4 overflow-hidden">
            {[
              28, 45, 60, 35, 75, 90, 42, 68, 55, 85, 30, 62, 95, 48, 70, 52,
              88, 40, 65, 35, 80, 92, 50, 78, 44, 60, 85, 38, 72, 54, 90, 46,
              68, 82, 36, 74, 58, 94, 48, 70, 42, 66, 88, 52, 76, 38, 64, 82,
              56, 90, 45, 72, 60, 84, 40, 68, 50, 78, 35, 62, 80, 48, 70, 55,
            ].map((height, i) => {
              const barPercent = (i / 64) * 100;
              const isPassed = barPercent <= progress;
              return (
                <div
                  key={i}
                  onClick={() => {
                    setProgress(barPercent);
                    setCurrentTime(Math.round((barPercent / 100) * totalDuration));
                  }}
                  className="flex-1 h-full flex items-center justify-center cursor-pointer group"
                >
                  <div
                    className={cn(
                      "w-full rounded-full transition-all duration-75",
                      isPassed
                        ? "bg-slate-900 dark:bg-white"
                        : "bg-slate-200 dark:bg-zinc-800"
                    )}
                    style={{
                      height: `${isPlaying ? Math.max(15, (height * (0.8 + Math.sin(i + currentTime) * 0.2))) : height}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* MAIN PLAYER CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentTime((t) => Math.max(0, t - 5));
                  setProgress((p) => Math.max(0, p - (5 / totalDuration) * 100));
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Rewind 5s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentTime >= totalDuration) {
                    setCurrentTime(0);
                    setProgress(0);
                  }
                  setIsPlaying(!isPlaying);
                }}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-900 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentTime((t) => Math.min(totalDuration, t + 5));
                  setProgress((p) => Math.min(100, p + (5 / totalDuration) * 100));
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Forward 5s"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* TIMELINE COUNTER */}
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600 dark:text-zinc-400 ml-2">
                <span className="font-bold text-slate-900 dark:text-white">{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* VOLUME */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer bg-transparent border-none outline-none ring-0 shadow-none flex items-center justify-center"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 h-1 accent-[#FF6B00] bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
