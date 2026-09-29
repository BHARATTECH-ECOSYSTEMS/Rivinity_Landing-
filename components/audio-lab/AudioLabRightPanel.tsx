"use client";

import React, { useState } from "react";
import { Volume2, Mic, AudioWaveform, Star, ChevronDown, Sparkles, Sliders, Play, Pause, Download } from "lucide-react";
import ModelSelectorCard from "@/components/canvas/ModelSelectorCard";
import RightPanelShell from "@/components/panels/RightPanelShell";
import PanelSection from "@/components/panels/PanelSection";
import RecentList, { type RecentItem } from "@/components/panels/RecentList";
import CreditsCard from "@/components/panels/CreditsCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const voices = [
  { id: "sarah", name: "Sarah", desc: "Warm & professional", avatar: "S", color: "from-orange-500 to-amber-500" },
  { id: "aarav", name: "Aarav", desc: "Natural & expressive", avatar: "A", color: "from-blue-500 to-cyan-500" },
  { id: "jonathan", name: "Jonathan", desc: "Deep & authoritative", avatar: "J", color: "from-purple-500 to-indigo-500" },
  { id: "yolanda", name: "Yolanda", desc: "Calm & friendly", avatar: "Y", color: "from-emerald-500 to-teal-500" },
  { id: "lily", name: "Lily", desc: "Bright & energetic", avatar: "L", color: "from-pink-500 to-rose-500" },
];

interface Props {
  activeFeature: string;
}

export default function AudioLabRightPanel({ activeFeature }: Props) {
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);

  const showVoiceSelector = activeFeature === "text-to-speech" || activeFeature === "voice-clone";

  const recents: RecentItem[] = [
    { label: "Meditation take 03.wav", time: "2m ago", icon: Volume2 },
    { label: "Meeting sprint transcript", time: "45m ago", icon: Mic },
    { label: "Rain on roof ambience", time: "2h ago", icon: AudioWaveform },
    { label: "Cyberpunk plasma blast", time: "4h ago", icon: AudioWaveform },
  ];

  return (
    <RightPanelShell>
      <ModelSelectorCard label="AI Audio Engine" />

      {showVoiceSelector && (
        <PanelSection label="Active Voice Profile">
          <div className="relative">
            <button
              type="button"
              onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
              className="w-full rounded-2xl p-3.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs text-left hover:border-[#FF6B00]/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-xs bg-gradient-to-tr", selectedVoice.color)}>
                    {selectedVoice.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedVoice.name}</div>
                    <div className="text-[10.5px] text-slate-400 dark:text-zinc-500">{selectedVoice.desc}</div>
                  </div>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", voiceDropdownOpen && "rotate-180")} />
              </div>
            </button>

            {voiceDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {voices.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedVoice(v);
                      setVoiceDropdownOpen(false);
                      toast.info(`Active voice: ${v.name}`);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors cursor-pointer",
                      v.id === selectedVoice.id
                        ? "bg-orange-500/10 text-[#FF6B00]"
                        : "hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                    )}
                  >
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs bg-gradient-to-tr", v.color)}>
                      {v.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{v.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{v.desc}</div>
                    </div>
                    {v.id === selectedVoice.id && (
                      <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </PanelSection>
      )}

      {/* QUICK AUDIO SPECS */}
      <PanelSection label="Studio Master Settings">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-500 dark:text-zinc-400">
            <span>Sampling Rate:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">48,000 Hz</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-zinc-400">
            <span>Bit Depth:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">24-bit Lossless</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-zinc-400">
            <span>Channels:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">Stereo Spatial</span>
          </div>
        </div>
      </PanelSection>

      <PanelSection label="Recent Audio Clips">
        <RecentList items={recents} />
      </PanelSection>

      <CreditsCard
        label="Audio Generation Credits"
        value="84,500"
        percent={84.5}
        caption="84,500 / 100,000 neural compute units available"
      />
    </RightPanelShell>
  );
}
