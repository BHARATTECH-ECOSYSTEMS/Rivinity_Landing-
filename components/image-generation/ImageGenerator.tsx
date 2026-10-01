"use client";

import React, { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import {
  Sparkles,
  Wand2,
  Download,
  RefreshCw,
  Sliders,
  Dice5,
  Trash2,
  Copy,
  Eye,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StylePreset {
  id: string;
  name: string;
  category: string;
  preview: string;
  promptSuffix: string;
}

interface GenerationItem {
  id: string;
  url: string;
  seed: number;
  prompt: string;
  aspectRatio: string;
}

const stylePresets: StylePreset[] = [
  {
    id: "photorealistic",
    name: "Hyper-Real 8K",
    category: "Photography",
    preview:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    promptSuffix:
      ", 8k UHD, photorealistic, 85mm portrait lens, natural subsurface scattering, soft ambient occlusion",
  },
  {
    id: "anime",
    name: "Anime & Manga",
    category: "Illustration",
    preview:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
    promptSuffix:
      ", modern anime key visual, Studio Ghibli vibes, clean linework, vibrant cel-shaded color palette",
  },
  {
    id: "cinematic",
    name: "Cyberpunk Neon",
    category: "Cinematic",
    preview:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    promptSuffix:
      ", futuristic cyberpunk, moody volumetric fog, neon rim light, anamorphic lens flare, cinematic still",
  },
  {
    id: "surreal",
    name: "Fantasy Oil Art",
    category: "Digital Art",
    preview:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80",
    promptSuffix:
      ", ornate oil canvas painting, rich impasto brush strokes, mythical glowing atmosphere, trending on ArtStation",
  },
];

const samplePrompts = [
  "Futuristic city with vertical hanging gardens and crystalline sky bridges",
  "A cybernetic samurai overlooking a neon-soaked Tokyo in heavy rainfall, cinematic reflections",
  "Close-up portrait of an ethereal elf queen with luminescent silver hair and fractal emerald jewelry",
  "Retro 1980s synthwave sports car speeding down an infinite desert highway during sunset",
];

const aspectRatios = [
  { label: "1:1", name: "Square", res: "1024 × 1024" },
  { label: "16:9", name: "Landscape", res: "1344 × 768" },
  { label: "9:16", name: "Story / Reel", res: "768 × 1344" },
  { label: "4:5", name: "Portrait", res: "896 × 1152" },
];

const initialGallery: GenerationItem[] = [
  {
    id: "gen-1",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    seed: 7729104,
    prompt:
      "Futuristic city with vertical hanging gardens and crystalline sky bridges",
    aspectRatio: "16:9",
  },
  {
    id: "gen-2",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    seed: 4892019,
    prompt:
      "Hyper-realistic editorial portrait of a woman in golden sunlight with fine skin micro-texture",
    aspectRatio: "4:5",
  },
  {
    id: "gen-3",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
    seed: 9283711,
    prompt:
      "Cyberpunk anime warrior with glowing turquoise katanas and vibrant holographic visor",
    aspectRatio: "1:1",
  },
  {
    id: "gen-4",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    seed: 1204855,
    prompt:
      "Majestic alpine glacial valley during golden hour, cinematic 8k landscape photography",
    aspectRatio: "16:9",
  },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState<string>(samplePrompts[0]);
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(
    stylePresets[0],
  );
  const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0]);
  const [gallery, setGallery] = useState<GenerationItem[]>(initialGallery);
  const [activeImage, setActiveImage] = useState<GenerationItem>(
    initialGallery[0],
  );

  // Model parameters
  const [cfgScale, setCfgScale] = useState<number>(7.5);
  const [inferenceSteps, setInferenceSteps] = useState<number>(30);
  const [hiresFix, setHiresFix] = useState<boolean>(true);
  const [faceCorrection, setFaceCorrection] = useState<boolean>(true);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "webp">(
    "png",
  );

  // State flags
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image.");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);

          const randomPresetImg =
            stylePresets[Math.floor(Math.random() * stylePresets.length)]
              .preview;
          const newGen: GenerationItem = {
            id: `gen-${Date.now()}`,
            url: randomPresetImg.replace("&w=400", "&w=1200"),
            seed: Math.floor(Math.random() * 9000000) + 1000000,
            prompt: prompt,
            aspectRatio: selectedRatio.label,
          };

          setGallery((curr) => [newGen, ...curr.slice(0, 7)]);
          setActiveImage(newGen);
          toast.success("Generation complete!");
          return 100;
        }
        return prev + 20;
      });
    }, 220);
  };

  const handleRandomPrompt = () => {
    const random =
      samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(random);
    toast.info("Loaded surprise prompt!");
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = activeImage.url;
    link.download = `rivinity-ai-${Date.now()}.${exportFormat}`;
    link.click();
    toast.success(`Downloading generation as .${exportFormat.toUpperCase()}`);
  };

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-y-auto lg:overflow-hidden bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans [scrollbar-width:thin]">
        <div className="w-full h-full max-w-none px-3 sm:px-5 lg:px-6 py-3 sm:py-3.5 flex flex-col space-y-3 pb-6 lg:pb-3 animate-in fade-in duration-200">
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 shrink-0">
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>AI Image Generator Studio</span>
              </div>
              <div className="text-[11.5px] text-slate-500 dark:text-zinc-400 mt-0.5">
                Generate photo-realistic visuals, anime art, and cinematic
                renderings using next-generation neural diffusion models.
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleRandomPrompt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-semibold border border-slate-200/90 dark:border-zinc-800 shadow-2xs transition-all cursor-pointer"
              >
                <Dice5 className="w-3.5 h-3.5 text-slate-500" />
                <span>Surprise Prompt</span>
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isGenerating ? "Synthesizing..." : "Generate Image"}
                </span>
              </button>
            </div>
          </div>

          {/* WORKSPACE 2-COLUMN GRID */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
            {/* LEFT COLUMN: ACTIVE VIEWER & RECENT GENERATIONS */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-3 min-h-0 h-full">
              {/* MAIN DISPLAY CANVAS */}
              <div className="flex-1 min-h-[340px] rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-3 sm:p-3.5 shadow-xs flex flex-col space-y-2.5">
                {/* CANVAS TOOLBAR */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-orange-500/10 text-[#FF6B00] text-[10.5px] font-bold tracking-wide">
                      Seed: {activeImage.seed}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
                      {activeImage.aspectRatio}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white border border-slate-200/70 dark:border-zinc-700/70 transition-colors cursor-pointer"
                      title="Copy Prompt"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white border border-slate-200/70 dark:border-zinc-700/70 transition-colors cursor-pointer"
                      title="Quick Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* IMAGE VIEWER */}
                <div className="relative flex-1 w-full min-h-[280px] rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 overflow-hidden flex items-center justify-center select-none group">
                  <img
                    src={activeImage.url}
                    alt={activeImage.prompt}
                    className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  {/* ACTIVE PROMPT BOTTOM OVERLAY */}
                  <div className="absolute bottom-2.5 inset-x-2.5 z-10 p-2.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] leading-relaxed flex items-center justify-between gap-3 pointer-events-auto">
                    <span className="truncate">{activeImage.prompt}</span>
                    <button
                      type="button"
                      onClick={() => setPrompt(activeImage.prompt)}
                      className="shrink-0 px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold transition-colors cursor-pointer"
                    >
                      Remix Prompt
                    </button>
                  </div>
                </div>
              </div>

              {/* GENERATION GALLERY BAR */}
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-2.5 sm:p-3 shadow-xs shrink-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10.5px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    Recent Generations ({gallery.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setGallery([activeImage])}
                    className="text-[10.5px] text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Other Shots</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {gallery.slice(0, 4).map((item) => {
                    const isCurrent = activeImage.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveImage(item)}
                        className={cn(
                          "relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer group shadow-2xs",
                          isCurrent
                            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/40"
                            : "border-slate-200/80 dark:border-zinc-800 hover:border-slate-300",
                        )}
                      >
                        <img
                          src={item.url}
                          alt={item.prompt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROMPT ENGINE & GENERATOR CONTROLS */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-3 min-h-0 h-full lg:overflow-y-auto [scrollbar-width:thin] pr-0.5">
              {/* PROMPT INPUT CARD */}
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-3 sm:p-3.5 shadow-xs space-y-2 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="text-[11.5px] font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <div>Text Prompt</div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe whatever you want the AI to imagine..."
                    className="w-full text-xs font-sans leading-relaxed p-2.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B00] resize-none"
                  />
                </div>
              </div>

              {/* ART STYLE PRESET SELECTOR */}
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-3 sm:p-3.5 shadow-xs space-y-2 shrink-0">
                <div className="text-[11.5px] font-bold text-slate-800 dark:text-zinc-200 flex items-center justify-between">
                  <span>Visual Style Preset</span>
                  <span className="text-[10px] font-normal text-slate-400 dark:text-zinc-500">
                    Aesthetic Engine
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {stylePresets.map((style) => {
                    const isSelected = selectedStyle.id === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => {
                          setSelectedStyle(style);
                          toast.info(`Style preset applied: ${style.name}`);
                        }}
                        className={cn(
                          "flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all cursor-pointer shadow-2xs",
                          isSelected
                            ? "bg-white dark:bg-zinc-900 border-[#FF6B00] dark:border-[#FF6B00] ring-1 ring-[#FF6B00]/30"
                            : "bg-slate-50/50 dark:bg-zinc-800/40 border-slate-200/70 dark:border-zinc-800 hover:border-slate-300",
                        )}
                      >
                        <img
                          src={style.preview}
                          alt={style.name}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                            {style.name}
                          </div>
                          <div className="text-[9.5px] text-slate-400 dark:text-zinc-500 truncate">
                            {style.category}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ASPECT RATIO & ENGINE CONFIG */}
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-3 sm:p-3.5 shadow-xs space-y-3 shrink-0">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                  <div className="text-[11.5px] font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>Canvas & Engine Settings</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedRatio.res}
                  </span>
                </div>

                {/* ASPECT RATIO BUTTONS */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Aspect Ratio
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {aspectRatios.map((ratio) => {
                      const isSelected = selectedRatio.label === ratio.label;
                      return (
                        <button
                          key={ratio.label}
                          type="button"
                          onClick={() => setSelectedRatio(ratio)}
                          className={cn(
                            "py-1.5 px-1 rounded-xl border text-center transition-all cursor-pointer",
                            isSelected
                              ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white font-bold shadow-2xs"
                              : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50",
                          )}
                        >
                          <div className="text-[11px] font-bold">
                            {ratio.label}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate">
                            {ratio.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DIFFUSION PARAMETERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 pt-0.5">
                  {/* CFG Scale */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="font-semibold text-slate-700 dark:text-zinc-300">
                        Prompt Guidance (CFG)
                      </span>
                      <span className="text-slate-500 dark:text-zinc-400 font-mono font-bold">
                        {cfgScale}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={cfgScale}
                      onChange={(e) => setCfgScale(Number(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-[#FF6B00]"
                    />
                  </div>

                  {/* Sampling Steps */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="font-semibold text-slate-700 dark:text-zinc-300">
                        Inference Steps
                      </span>
                      <span className="text-slate-500 dark:text-zinc-400 font-mono font-bold">
                        {inferenceSteps}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={60}
                      step={1}
                      value={inferenceSteps}
                      onChange={(e) =>
                        setInferenceSteps(Number(e.target.value))
                      }
                      className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-[#FF6B00]"
                    />
                  </div>
                </div>

                {/* FEATURE TOGGLES */}
                <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setHiresFix(!hiresFix)}
                    className={cn(
                      "flex items-center justify-between p-1.5 rounded-xl border text-left transition-all cursor-pointer",
                      hiresFix
                        ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white"
                        : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 text-slate-500",
                    )}
                  >
                    <div className="text-[10.5px] font-semibold truncate pr-1">
                      Hi-Res Fix 2x
                    </div>
                    <div
                      className={cn(
                        "w-3 h-3 rounded shrink-0 flex items-center justify-center",
                        hiresFix
                          ? "bg-[#FF6B00] text-white"
                          : "border border-slate-300",
                      )}
                    >
                      {hiresFix && <Check className="w-2 h-2" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFaceCorrection(!faceCorrection)}
                    className={cn(
                      "flex items-center justify-between p-1.5 rounded-xl border text-left transition-all cursor-pointer",
                      faceCorrection
                        ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white"
                        : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 text-slate-500",
                    )}
                  >
                    <div className="text-[10.5px] font-semibold truncate pr-1">
                      Face Detailer
                    </div>
                    <div
                      className={cn(
                        "w-3 h-3 rounded shrink-0 flex items-center justify-center",
                        faceCorrection
                          ? "bg-[#FF6B00] text-white"
                          : "border border-slate-300",
                      )}
                    >
                      {faceCorrection && <Check className="w-2 h-2" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* EXPORT & DOWNLOAD BAR */}
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-3 sm:p-3.5 shadow-xs space-y-2.5 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300">
                    Export Output:
                  </span>
                  <div className="flex bg-slate-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-zinc-700/80">
                    {(["png", "jpg", "webp"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setExportFormat(fmt)}
                        className={cn(
                          "px-2 py-0.5 text-[10.5px] uppercase font-semibold rounded-md transition-all cursor-pointer",
                          exportFormat === fmt
                            ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                            : "text-slate-500 hover:text-slate-900 dark:text-zinc-400",
                        )}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Artwork (.{exportFormat.toUpperCase()})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GENERATION PROGRESS MODAL OVERLAY */}
        {isGenerating && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#FF6B00] animate-spin" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Synthesizing Artwork with Diffusion
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Sampling latent noise vectors and rendering stylistic
                  details...
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#FF6B00] h-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs font-mono font-bold text-slate-600 dark:text-zinc-300">
                {progress}% Complete
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarShell>
  );
}
