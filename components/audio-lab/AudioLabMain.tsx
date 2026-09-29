"use client";

import React from "react";
import { Mic, Volume2, AudioWaveform, Users } from "lucide-react";
import TextToSpeechView from "./views/TextToSpeechView";
import SpeechToTextView from "./views/SpeechToTextView";
import AudioGeneratorView from "./views/AudioGeneratorView";
import VoiceCloneView from "./views/VoiceCloneView";
import { cn } from "@/lib/utils";

const features = [
  { id: "text-to-speech", icon: Volume2, label: "Text to Speech", badge: "Neural TTS", desc: "Convert text into lifelike speech" },
  { id: "speech-to-text", icon: Mic, label: "Speech to Text", badge: "Whisper v3", desc: "Transcribe audio with speakers" },
  { id: "audio-generator", icon: AudioWaveform, label: "Sound FX Generator", badge: "Diffusion", desc: "Generate ambient & SFX audio" },
  { id: "voice-clone", icon: Users, label: "Voice Clone & Changer", badge: "Zero-Shot", desc: "Clone & morph vocal timbres" },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

export default function AudioLabMain({ activeFeature, onFeatureChange }: Props) {
  const renderView = () => {
    switch (activeFeature) {
      case "text-to-speech":
        return <TextToSpeechView />;
      case "speech-to-text":
        return <SpeechToTextView />;
      case "audio-generator":
        return <AudioGeneratorView />;
      case "voice-clone":
        return <VoiceCloneView />;
      default:
        return <TextToSpeechView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* TOP TAB NAVIGATION BAR */}
      <div className="px-4 sm:px-6 pt-3 pb-2.5 flex items-center justify-center shrink-0 border-b border-slate-200/70 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md z-20">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] w-full max-w-[960px] mx-auto">
          {features.map((f) => {
            const Icon = f.icon;
            const isActive = activeFeature === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFeatureChange(f.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all duration-200 shrink-0 cursor-pointer border",
                  isActive
                    ? "bg-white dark:bg-zinc-900 border-slate-200/90 dark:border-zinc-700/80 text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "bg-transparent border-transparent text-slate-500 dark:text-zinc-400 hover:bg-slate-100/80 dark:hover:bg-zinc-900 hover:text-slate-800 dark:hover:text-zinc-200 font-medium"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5 shrink-0 transition-colors", isActive ? "text-[#FF6B00]" : "text-slate-400 dark:text-zinc-500")} />
                <span>{f.label}</span>
                <span
                  className={cn(
                    "hidden sm:inline-block text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-semibold",
                    isActive
                      ? "bg-orange-500/10 text-[#FF6B00]"
                      : "bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500"
                  )}
                >
                  {f.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SCROLLABLE VIEW CONTENT */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-5 [scrollbar-width:thin]">
        <div className="animate-in fade-in duration-200 max-w-[1100px] mx-auto">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
