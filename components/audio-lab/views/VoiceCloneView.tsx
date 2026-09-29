"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Mic,
  Play,
  Pause,
  ArrowRightLeft,
  Download,
  User,
  Users,
  CheckCircle,
  ChevronDown,
  Trash2,
  RefreshCw,
  Zap,
  Radio,
  Sliders,
  Check,
  RotateCcw,
  Volume2,
  Layers,
  Wand2,
  Smile,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const morphStyles = [
  { id: "male-to-female", label: "Male → Female", desc: "Elevate pitch & resonant formants", icon: ArrowRightLeft },
  { id: "female-to-male", label: "Female → Male", desc: "Deeper acoustic chest resonance", icon: ArrowRightLeft },
  { id: "radio-host", label: "Deep Radio Broadcaster", desc: "Rich proximity effect and compressed warmth", icon: Radio },
  { id: "cyber-robot", label: "Cybernetic Vocoder", desc: "Futuristic synthesized harmonics", icon: Bot },
  { id: "anime-hero", label: "Anime / Energetic", desc: "Bright treble and fast cadence", icon: Zap },
  { id: "whisper", label: "Intimate Whisper", desc: "High breathiness with air filtration", icon: Volume2 },
];

interface ClonedVoice {
  id: string;
  name: string;
  gender: string;
  accent: string;
  samplesCount: number;
  quality: string;
  similarity: number;
  created: string;
  avatarColor: string;
}

export default function VoiceCloneView() {
  const [activeTab, setActiveTab] = useState<"clone" | "morph" | "library">("clone");
  const [voiceName, setVoiceName] = useState("My Studio Voice");
  const [voiceDescription, setVoiceDescription] = useState("Authentic personal voice clone for narration and videos");
  const [selectedMorph, setSelectedMorph] = useState(morphStyles[0]);
  const [uploadedSamples, setUploadedSamples] = useState<string[]>([
    "studio_vocal_sample_01.wav",
    "reading_sample_02.wav",
  ]);

  const [isCloning, setIsCloning] = useState(false);
  const [cloneStep, setCloneStep] = useState(1);
  const [hasResult, setHasResult] = useState(true);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [isPlayingTransformed, setIsPlayingTransformed] = useState(false);
  const [transformText, setTransformText] = useState(
    "Welcome to Rivinity Audio Lab. This demonstrates real-time voice timbre morphing and neural cloning."
  );

  /* Audio Sliders */
  const [pitchShift, setPitchShift] = useState(4);
  const [formantShift, setFormantShift] = useState(15);
  const [speed, setSpeed] = useState(100);
  const [stability, setStability] = useState(80);
  const [warmth, setWarmth] = useState(65);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clonedVoices, setClonedVoices] = useState<ClonedVoice[]>([
    {
      id: "v1",
      name: "Marcus Studio Prime",
      gender: "Male",
      accent: "American (General)",
      samplesCount: 4,
      quality: "99.2% Fidelity",
      similarity: 98,
      created: "Today, 2:15 PM",
      avatarColor: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800",
    },
    {
      id: "v2",
      name: "Sophia Narration",
      gender: "Female",
      accent: "British (RP)",
      samplesCount: 3,
      quality: "98.7% Fidelity",
      similarity: 96,
      created: "Yesterday",
      avatarColor: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800",
    },
  ]);

  const handleStartCloning = () => {
    if (uploadedSamples.length === 0) {
      toast.error("Please upload at least 1 audio sample to clone.");
      return;
    }
    setIsCloning(true);
    setCloneStep(1);

    setTimeout(() => setCloneStep(2), 700);
    setTimeout(() => setCloneStep(3), 1400);
    setTimeout(() => setCloneStep(4), 2100);
    setTimeout(() => {
      setIsCloning(false);
      const newVoice: ClonedVoice = {
        id: Date.now().toString(),
        name: voiceName || "Custom Cloned Voice",
        gender: "Custom",
        accent: "Personal Acoustic Profile",
        samplesCount: uploadedSamples.length,
        quality: "99.4% Fidelity",
        similarity: 99,
        created: "Just now",
        avatarColor: "from-slate-700 to-slate-900 dark:from-zinc-700 dark:to-zinc-800",
      };
      setClonedVoices((prev) => [newVoice, ...prev]);
      setActiveTab("library");
      toast.success("Voice cloned and added to your voice library!");
    }, 2800);
  };

  const handleTransform = () => {
    toast.success("Voice morphed successfully with " + selectedMorph.label + "!");
    setHasResult(true);
  };

  const removeSample = (name: string) => {
    setUploadedSamples((prev) => prev.filter((s) => s !== name));
    toast.info(`Removed sample: ${name}`);
  };

  return (
    <div className="w-full max-w-[960px] mx-auto space-y-5 px-2 sm:px-4 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
            Instant Voice Clone & Changer
          </div>
          <div className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 mt-0.5">
            Clone real voices with 10-second samples, modify gender or timbre, and build your custom voice library.
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/80 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("clone")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "clone"
                ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
            )}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Clone Voice</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("morph")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "morph"
                ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
            )}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Voice Changer</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "library"
                ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>My Voices ({clonedVoices.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CLONE VOICE */}
      {activeTab === "clone" && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-6 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5 block">
                  Voice Profile Name
                </span>
                <input
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                  placeholder="e.g. My Podcast Voice"
                  className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5 block">
                  Voice Tag / Purpose
                </span>
                <input
                  value={voiceDescription}
                  onChange={(e) => setVoiceDescription(e.target.value)}
                  placeholder="e.g. YouTube Commentary & Narration"
                  className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-400"
                />
              </div>
            </div>

            {/* SAMPLES UPLOAD & QUALITY METER */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Voice Samples ({uploadedSamples.length}/5)
                </span>
                <span className="text-[11px] text-slate-400">
                  Clear audio without background music produces best results
                </span>
              </div>

              {/* Uploaded Samples List */}
              {uploadedSamples.length > 0 && (
                <div className="space-y-2 mb-2.5">
                  {uploadedSamples.map((sample, idx) => (
                    <div
                      key={sample}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/70"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">{sample}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSample(sample)}
                        className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropzone */}
              {uploadedSamples.length < 5 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl text-center cursor-pointer hover:border-slate-400 dark:hover:border-zinc-600 transition-all"
                >
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                  <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                    Upload voice sample (MP3, WAV, M4A)
                  </div>
                  <div className="text-[10.5px] text-slate-400 dark:text-zinc-500 mt-0.5">
                    Minimum 10 seconds of clear speech
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setUploadedSamples((p) => [...p, f.name]);
                    toast.success(`Sample "${f.name}" added`);
                  }
                }}
              />
            </div>

            {/* TRAINING / CLONING PROGRESS HUD */}
            {isCloning ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF6B00]" />
                    <span>Cloning Neural Voice Model...</span>
                  </span>
                  <span className="text-slate-500">Step {cloneStep} of 4</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-900 dark:bg-white h-full transition-all duration-500"
                    style={{ width: `${cloneStep * 25}%` }}
                  />
                </div>
                <div className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                  {cloneStep === 1 && "Extracting speaker acoustic timbre embeddings..."}
                  {cloneStep === 2 && "Calibrating neural vocoder resonance..."}
                  {cloneStep === 3 && "Synthesizing multi-pitch voice checkpoints..."}
                  {cloneStep === 4 && "Finalizing 48kHz HD neural voice model..."}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartCloning}
                disabled={uploadedSamples.length === 0}
                className="w-full py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center"
              >
                <span>Clone Voice Now</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: VOICE CHANGER & MORPH */}
      {activeTab === "morph" && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-6 shadow-xs space-y-5">
            {/* Conversion Preset Selector */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2 block">
                Select Voice Character / Timbre Morph
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {morphStyles.map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMorph.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelectedMorph(m);
                        toast.info(`Selected morph: ${m.label}`);
                      }}
                      className={cn(
                        "flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                        isSelected
                          ? "bg-slate-50 dark:bg-zinc-800 border-slate-900 dark:border-zinc-300 text-slate-900 dark:text-white shadow-2xs"
                          : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300"
                      )}
                    >
                      <div className={cn("p-1.5 rounded-lg shrink-0", isSelected ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 dark:bg-zinc-800 text-slate-500")}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{m.label}</div>
                        <div className="text-[10px] text-slate-400 dark:text-zinc-500 truncate">{m.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fine Tuning Sliders */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 space-y-3.5">
              <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span>Acoustic Fine-Tuning Controls</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-zinc-400">Pitch Shift:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{pitchShift > 0 ? `+${pitchShift}` : pitchShift} st</span>
                  </div>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    value={pitchShift}
                    onChange={(e) => setPitchShift(Number(e.target.value))}
                    className="w-full h-1 accent-slate-900 dark:accent-white bg-slate-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-zinc-400">Formant Resonant Scale:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{formantShift}%</span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={formantShift}
                    onChange={(e) => setFormantShift(Number(e.target.value))}
                    className="w-full h-1 accent-slate-900 dark:accent-white bg-slate-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-zinc-400">Vocal Warmth:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{warmth}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={warmth}
                    onChange={(e) => setWarmth(Number(e.target.value))}
                    className="w-full h-1 accent-slate-900 dark:accent-white bg-slate-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-zinc-400">Neural Stability:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{stability}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={stability}
                    onChange={(e) => setStability(Number(e.target.value))}
                    className="w-full h-1 accent-slate-900 dark:accent-white bg-slate-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Target Speech Text */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 block">
                Test Phrase
              </span>
              <textarea
                value={transformText}
                onChange={(e) => setTransformText(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-3 font-sans text-[14px] font-normal leading-relaxed text-slate-800 dark:text-zinc-200 outline-none focus:border-slate-400 resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleTransform}
              className="w-full py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              <span>Morph Voice Preview</span>
            </button>
          </div>

          {/* DUAL COMPARISON PLAYER */}
          {hasResult && (
            <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
                  Audio Comparison Test
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Morphed audio downloaded (HD WAV)")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download WAV</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Original Audio Card */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/70 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlayingOriginal(!isPlayingOriginal);
                      setIsPlayingTransformed(false);
                    }}
                    className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-zinc-700 flex items-center justify-center text-slate-800 dark:text-white shrink-0 hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    {isPlayingOriginal ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">Original Audio Take</div>
                    <div className="text-[10px] text-slate-400">Natural Acoustic Profile</div>
                  </div>
                </div>

                {/* Transformed Audio Card */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-900/20 dark:border-zinc-600 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlayingTransformed(!isPlayingTransformed);
                      setIsPlayingOriginal(false);
                    }}
                    className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-xs hover:opacity-90 transition-all cursor-pointer"
                  >
                    {isPlayingTransformed ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{selectedMorph.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-zinc-400">Neural Resynthesized Take</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CLONED VOICES LIBRARY */}
      {activeTab === "library" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {clonedVoices.map((v) => (
              <div
                key={v.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-3.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-2xs bg-gradient-to-tr", v.avatarColor)}>
                      {v.name[0]}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{v.name}</div>
                      <div className="text-[10.5px] text-slate-400 dark:text-zinc-500">{v.gender} • {v.accent}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {v.quality}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-400">
                  <span>{v.samplesCount} Training Samples</span>
                  <button
                    type="button"
                    onClick={() => toast.success(`Active voice set to ${v.name} in Text to Speech!`)}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-semibold transition-colors cursor-pointer"
                  >
                    Use in TTS Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
