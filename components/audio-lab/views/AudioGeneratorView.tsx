"use client";

import React, { useState, useMemo } from "react";
import {
  Play,
  Pause,
  Download,
  RefreshCw,
  Clock,
  Heart,
  Leaf,
  PawPrint,
  Building2,
  Music,
  Rocket,
  Ghost,
  Waves,
  LayoutGrid,
  Volume2,
  Repeat,
  Sliders,
  Share2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Sounds", icon: LayoutGrid },
  { id: "nature", label: "Nature & Ambience", icon: Leaf },
  { id: "sci-fi", label: "Sci-Fi & Cyber", icon: Rocket },
  { id: "cinematic", label: "Cinematic & Tension", icon: Ghost },
  { id: "ambient", label: "Foley & Waves", icon: Waves },
  { id: "music", label: "Musical Stems", icon: Music },
  { id: "animals", label: "Creatures & Animals", icon: PawPrint },
  { id: "urban", label: "Urban & Mechanical", icon: Building2 },
];

const presets = [
  { id: "rain", label: "Gentle Rain on Skylight", category: "nature", duration: "10s", prompt: "Soft soothing raindrops tapping against a glass skylight with distant rolling thunder and cozy warmth" },
  { id: "laser", label: "Cyberpunk Plasma Blast", category: "sci-fi", duration: "4s", prompt: "High energy futuristic plasma cannon discharge with resonant bass tail and metallic electronic hum" },
  { id: "ocean", label: "Luminescent Ocean Waves", category: "ambient", duration: "16s", prompt: "Gentle nocturnal ocean waves breaking smoothly on a pebble beach with light coastal breeze" },
  { id: "piano", label: "Lo-Fi Nostalgic Chord", category: "music", duration: "6s", prompt: "Warm lo-fi jazz piano chord progression with subtle vinyl crackle and tape flutter" },
  { id: "cyber", label: "Server Room Core Whir", category: "sci-fi", duration: "8s", prompt: "Deep humming cooling fans inside a massive AI data center with high frequency data chirp" },
  { id: "fireplace", label: "Crackling Pine Fireplace", category: "nature", duration: "12s", prompt: "Rich crackling logs in a stone hearth fireplace with gentle sparks popping" },
  { id: "impact", label: "Cinematic Sub Bass Drop", category: "cinematic", duration: "5s", prompt: "Trailer style cinematic braam impact with deep sub bass rumble and eerie reverb tail" },
  { id: "footsteps", label: "Footsteps on Gravel", category: "urban", duration: "6s", prompt: "Slow deliberate footsteps walking across dry crisp gravel stones in a quiet alley" },
];

export default function AudioGeneratorView() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(8);
  const [influence, setInfluence] = useState(85);
  const [isLoopable, setIsLoopable] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedSounds, setGeneratedSounds] = useState<Array<{
    id: string;
    prompt: string;
    category: string;
    duration: string;
    playing: boolean;
    liked: boolean;
    loop: boolean;
  }>>([
    {
      id: "1",
      prompt: "Soft soothing raindrops tapping against a glass skylight with distant rolling thunder",
      category: "Nature",
      duration: "10s",
      playing: false,
      liked: true,
      loop: true,
    },
    {
      id: "2",
      prompt: "High energy futuristic plasma cannon discharge with metallic electronic hum",
      category: "Sci-Fi",
      duration: "4s",
      playing: false,
      liked: false,
      loop: false,
    },
    {
      id: "3",
      prompt: "Warm lo-fi jazz piano chord progression with subtle vinyl crackle",
      category: "Music",
      duration: "6s",
      playing: false,
      liked: true,
      loop: true,
    },
  ]);

  const filteredPresets = useMemo(
    () =>
      activeCategory === "all"
        ? presets
        : presets.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please provide a prompt describing the sound.");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const newSound = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        category: "Custom FX",
        duration: `${duration}s`,
        playing: false,
        liked: false,
        loop: isLoopable,
      };
      setGeneratedSounds((prev) => [newSound, ...prev]);
      setIsGenerating(false);
      toast.success("Sound FX synthesized at 48kHz HD quality!");
    }, 1400);
  };

  const togglePlay = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => ({ ...s, playing: s.id === id ? !s.playing : false }))
    );
  };

  const toggleLike = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.liked;
          toast.success(next ? "Added to sound library favorites!" : "Removed from favorites");
          return { ...s, liked: next };
        }
        return s;
      })
    );
  };

  const toggleLoop = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.loop;
          toast.info(next ? "Infinite loop enabled" : "Loop disabled");
          return { ...s, loop: next };
        }
        return s;
      })
    );
  };

  return (
    <div className="w-full max-w-[960px] mx-auto space-y-5 px-2 sm:px-4 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
            Audio & Sound FX Generator
          </div>
          <div className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 mt-0.5">
            Generate cinematic sound effects, ambient atmospheres, foley, and musical stems from text prompts.
          </div>
        </div>
      </div>

      {/* PROMPT COMPOSER CONTAINER */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs focus-within:border-slate-400 dark:focus-within:border-zinc-600 transition-all">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the sound effect or ambience... e.g. 'A deep spaceship engine hum with echoing steam release in a hollow cavern'"
            rows={3}
            className="w-full bg-transparent font-sans text-[14.5px] font-normal leading-relaxed text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none p-0 resize-none"
          />
        </div>

        {/* PARAMETERS & CONTROLS ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Duration Slider */}
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Duration:</span>
              <input
                type="range"
                min={1}
                max={25}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-20 h-1 accent-[#FF6B00] bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white w-6">{duration}s</span>
            </div>

            {/* Prompt Influence Slider */}
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Influence:</span>
              <input
                type="range"
                min={20}
                max={100}
                value={influence}
                onChange={(e) => setInfluence(Number(e.target.value))}
                className="w-20 h-1 accent-[#FF6B00] bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white w-8">{influence}%</span>
            </div>

            {/* Seamless Loop Toggle */}
            <button
              type="button"
              onClick={() => setIsLoopable(!isLoopable)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border",
                isLoopable
                  ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white"
                  : "bg-transparent border-slate-200/70 dark:border-zinc-800 text-slate-500"
              )}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Seamless Loop</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center justify-center px-4.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <span>Synthesizing FX...</span>
            ) : (
              <span>Generate Sound</span>
            )}
          </button>
        </div>
      </div>

      {/* QUICK PRESETS & CATEGORIES */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
            Inspiration Presets
          </div>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500">Click to fill prompt</span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer border",
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs font-semibold"
                    : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {filteredPresets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPrompt(p.prompt);
                toast.info(`Loaded preset: ${p.label}`);
              }}
              className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600 text-left transition-all group shadow-2xs cursor-pointer"
            >
              <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors truncate">
                {p.label}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-1">
                <span className="uppercase tracking-wider">{p.category}</span>
                <span className="font-mono">{p.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* GENERATED SOUNDS PLAYLIST */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
            Generated Sound FX Library ({generatedSounds.length})
          </div>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500">48kHz 24-bit HD WAV</span>
        </div>

        <div className="space-y-2">
          {generatedSounds.map((sound) => (
            <div
              key={sound.id}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => togglePlay(sound.id)}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer",
                  sound.playing
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                )}
              >
                {sound.playing ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {sound.prompt}
                  </span>
                </div>

                {/* EQUALIZER WAVEFORM */}
                <div className="flex items-center gap-0.5 h-4 mt-1">
                  {[
                    30, 55, 75, 40, 85, 95, 50, 70, 60, 90, 35, 65, 80, 45, 70, 55,
                    90, 40, 65, 35, 85, 95, 50, 80, 45, 65, 85, 40, 75, 55, 90, 50,
                    70, 85, 40, 75, 60, 95, 50, 70, 45, 65, 85, 55, 75, 40, 65, 85,
                  ].map((height, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-full transition-all duration-75",
                        sound.playing ? "bg-slate-900 dark:bg-white" : "bg-slate-200 dark:bg-zinc-800"
                      )}
                      style={{
                        height: `${sound.playing ? Math.max(20, height * (0.8 + Math.sin(i) * 0.2)) : 30}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono text-[10.5px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800">
                  {sound.duration}
                </span>

                <button
                  type="button"
                  onClick={() => toggleLoop(sound.id)}
                  className={cn(
                    "p-1.5 rounded-lg border transition-colors cursor-pointer",
                    sound.loop
                      ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white"
                      : "border-slate-200/80 dark:border-zinc-800 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200"
                  )}
                  title="Toggle loop"
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleLike(sound.id)}
                  className={cn(
                    "p-1.5 rounded-lg border transition-colors cursor-pointer",
                    sound.liked
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                      : "border-slate-200/80 dark:border-zinc-800 text-slate-400 hover:text-rose-500"
                  )}
                  title="Favorite"
                >
                  <Heart className={cn("w-3.5 h-3.5", sound.liked && "fill-current")} />
                </button>

                <button
                  type="button"
                  onClick={() => toast.success("Downloaded sound FX (WAV HD)")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>WAV</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
