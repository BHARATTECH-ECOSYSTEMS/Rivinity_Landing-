"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import {
  Upload,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sparkles,
  Maximize2,
  Download,
  RefreshCw,
  Sliders,
  Check,
  Eye,
  Columns,
  Layers,
  Sun,
  Wand2,
  Trash2,
  Image as ImageIcon,
  User,
  Palette,
  Clock,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SamplePreset {
  id: string;
  name: string;
  category: string;
  before: string;
  after: string;
  inputRes: string;
  outputRes: string;
}

const samplePresets: SamplePreset[] = [
  {
    id: "portrait",
    name: "Portrait & Skin Detail",
    category: "Face Restore",
    before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=35",
    after: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=100",
    inputRes: "800 × 1200",
    outputRes: "3200 × 4800 (4K)",
  },
  {
    id: "cyberpunk",
    name: "Digital Art & Neon",
    category: "Anime & Art",
    before: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=35",
    after: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=100",
    inputRes: "720 × 1080",
    outputRes: "2880 × 4320 (4K)",
  },
  {
    id: "nature",
    name: "Landscape & Architecture",
    category: "HDR & Clarity",
    before: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=35",
    after: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=100",
    inputRes: "1024 × 680",
    outputRes: "4096 × 2720 (4K)",
  },
  {
    id: "vintage",
    name: "Old Photo & Scratch Fix",
    category: "Restoration",
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=35",
    after: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=100",
    inputRes: "640 × 960",
    outputRes: "2560 × 3840 (4K)",
  },
];

const enhancementModes = [
  { id: "auto", label: "Auto Super-Res", desc: "Balanced upscale & clarity", icon: Sparkles },
  { id: "portrait", label: "Face Restoration", desc: "Deep facial micro-details", icon: User },
  { id: "art", label: "Anime & Digital Art", desc: "Clean line-art & zero blur", icon: Palette },
  { id: "hdr", label: "Low-Light HDR", desc: "Dynamic shadow & lighting boost", icon: Sun },
];

export default function ImageEnhancer() {
  const [activeMode, setActiveMode] = useState("auto");
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset>(samplePresets[0]);
  const [imageBefore, setImageBefore] = useState<string>(samplePresets[0].before);
  const [imageAfter, setImageAfter] = useState<string>(samplePresets[0].after);
  const [inputDimensions, setInputDimensions] = useState<string>(samplePresets[0].inputRes);
  const [outputDimensions, setOutputDimensions] = useState<string>(samplePresets[0].outputRes);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  // Viewer Controls
  const [viewMode, setViewMode] = useState<"split" | "side-by-side" | "original">("split");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);

  // Model Parameters
  const [upscaleFactor, setUpscaleFactor] = useState<"2x" | "4x" | "8x">("4x");
  const [sharpness, setSharpness] = useState<number>(75);
  const [denoise, setDenoise] = useState<number>(50);
  const [faceEnhanceStrength, setFaceEnhanceStrength] = useState<number>(85);
  const [hdrLighting, setHdrLighting] = useState<number>(60);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "webp">("png");

  // Feature Toggles
  const [faceRestoration, setFaceRestoration] = useState<boolean>(true);
  const [colorVibrancy, setColorVibrancy] = useState<boolean>(true);
  const [artifactRemoval, setArtifactRemoval] = useState<boolean>(true);
  const [dehazeContrast, setDehazeContrast] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageBefore(url);
      setImageAfter(url);
      setCustomFileName(file.name);
      setInputDimensions("1200 × 1600 (Detected)");
      setOutputDimensions(
        upscaleFactor === "2x"
          ? "2400 × 3200 (2K HD)"
          : upscaleFactor === "4x"
          ? "4800 × 6400 (4K UHD)"
          : "9600 × 12800 (8K Ultra)"
      );
      toast.success(`Loaded "${file.name}"`);
      triggerEnhanceProcess();
    }
  };

  const handlePresetSelect = (preset: SamplePreset) => {
    setSelectedPreset(preset);
    setImageBefore(preset.before);
    setImageAfter(preset.after);
    setInputDimensions(preset.inputRes);
    setOutputDimensions(preset.outputRes);
    setCustomFileName(null);
    toast.info(`Loaded demo: "${preset.name}"`);
  };

  const triggerEnhanceProcess = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success("Image enhanced with 4K Neural Reconstruction!");
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleResetView = () => {
    setZoom(1);
    setRotation(0);
    setSliderPos(50);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageAfter;
    link.download = `enhanced-${Date.now()}.${exportFormat}`;
    link.click();
    toast.success(`Downloading high-res image as .${exportFormat.toUpperCase()}`);
  };

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-y-auto bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans [scrollbar-width:thin]">
        <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20 animate-in fade-in duration-200">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
                AI Image Enhancer & Super-Resolution
              </div>
              <div className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 mt-0.5">
                Upscale low-resolution photos up to 8K, restore facial details, eliminate compression noise, and boost lighting.
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-semibold border border-slate-200/90 dark:border-zinc-800 shadow-2xs transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>{customFileName ? "Change Image" : "Upload Image"}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={triggerEnhanceProcess}
                disabled={isProcessing}
                className="flex items-center justify-center px-4.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Reconstructing...</span>
                ) : (
                  <span>Enhance Image</span>
                )}
              </button>
            </div>
          </div>

          {/* MODEL / PRESET MODE SELECTOR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {enhancementModes.map((m) => {
              const Icon = m.icon;
              const isSelected = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setActiveMode(m.id);
                    toast.info(`Switched engine mode: ${m.label}`);
                  }}
                  className={cn(
                    "flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-2xs",
                    isSelected
                      ? "bg-white dark:bg-zinc-900 border-[#FF6B00] dark:border-[#FF6B00] ring-1 ring-[#FF6B00]/30"
                      : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className={cn("p-1.5 rounded-lg", isSelected ? "bg-orange-500/10 text-[#FF6B00]" : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400")}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5 line-clamp-1">
                    {m.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* MAIN COMPARISON WORKSPACE CARD */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-4">
            {/* CANVAS TOP TOOLBAR */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
              {/* VIEW MODE TOGGLES */}
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "split"
                      ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                  )}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Split Slider</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("side-by-side")}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "side-by-side"
                      ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Side by Side</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("original")}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "original"
                      ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                  )}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Original Only</span>
                </button>
              </div>

              {/* ZOOM & ROTATE TOOLBAR */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-slate-200/70 dark:border-zinc-700/70">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] px-2 text-slate-600 dark:text-zinc-300 font-semibold">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white border border-slate-200/70 dark:border-zinc-700/70 transition-colors cursor-pointer"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleResetView}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white border border-slate-200/70 dark:border-zinc-700/70 transition-colors cursor-pointer"
                  title="Reset Fit"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* VIEWER DISPLAY */}
            {viewMode === "split" && (
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchMove={handleTouchMove}
                className="relative w-full h-[360px] sm:h-[460px] rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 overflow-hidden flex items-center justify-center cursor-col-resize select-none"
              >
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                  style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                >
                  {/* AFTER (ENHANCED) LAYER */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={imageAfter}
                      alt="AI Enhanced"
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>

                  {/* BEFORE (ORIGINAL) LAYER */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img
                      src={imageBefore}
                      alt="Original Input"
                      className="w-full h-full object-contain pointer-events-none filter brightness-95 contrast-90"
                    />
                  </div>

                  {/* SLIDER DIVIDER */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#FF6B00] z-20 cursor-col-resize"
                    style={{ left: `${sliderPos}%` }}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white dark:bg-zinc-900 border-2 border-[#FF6B00] rounded-full shadow-md flex items-center justify-center cursor-col-resize">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-2.5 bg-[#FF6B00] rounded-full" />
                        <div className="w-0.5 h-2.5 bg-[#FF6B00] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RESOLUTION & TAG BADGES */}
                <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide pointer-events-none">
                  Original: {inputDimensions}
                </div>

                <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide pointer-events-none">
                  Enhanced: {outputDimensions}
                </div>
              </div>
            )}

            {viewMode === "side-by-side" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[360px] sm:h-[460px]">
                <div className="relative rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
                  <img
                    src={imageBefore}
                    alt="Original"
                    className="w-full h-full object-contain filter brightness-95 contrast-90"
                    style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10.5px] font-semibold">
                    Original ({inputDimensions})
                  </div>
                </div>
                <div className="relative rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
                  <img
                    src={imageAfter}
                    alt="AI Enhanced"
                    className="w-full h-full object-contain"
                    style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[#FF6B00] text-white text-[10.5px] font-semibold shadow-xs">
                    4K Enhanced ({outputDimensions})
                  </div>
                </div>
              </div>
            )}

            {viewMode === "original" && (
              <div className="relative w-full h-[360px] sm:h-[460px] rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
                <img
                  src={imageBefore}
                  alt="Original Raw"
                  className="w-full h-full object-contain filter brightness-95 contrast-90"
                  style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-xs font-semibold">
                  Original Source Image ({inputDimensions})
                </div>
              </div>
            )}

            {/* DEMO SAMPLES BAR */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  Test with demo samples:
                </span>
                {customFileName && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomFileName(null);
                      handlePresetSelect(samplePresets[0]);
                    }}
                    className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Uploaded Image</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {samplePresets.map((preset) => {
                  const isCurrent = selectedPreset.id === preset.id && !customFileName;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={cn(
                        "flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer shadow-2xs",
                        isCurrent
                          ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 ring-1 ring-slate-400 dark:ring-zinc-500"
                          : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
                      )}
                    >
                      <img
                        src={preset.after}
                        alt={preset.name}
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {preset.name}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-zinc-500 truncate">
                          {preset.category}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PARAMETER CONTROLS & RECONSTRUCTION SETTINGS */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span>Reconstruction & Super-Resolution Parameters</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSharpness(75);
                  setDenoise(50);
                  setFaceEnhanceStrength(85);
                  setHdrLighting(60);
                  setUpscaleFactor("4x");
                  toast.info("Reset to optimal defaults");
                }}
                className="text-xs font-medium text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                Reset Defaults
              </button>
            </div>

            {/* UPSCALE FACTOR SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Target Resolution Upscale Factor
                </span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
                  {upscaleFactor === "2x" ? "200% Scale · 2K" : upscaleFactor === "4x" ? "400% Scale · 4K UHD" : "800% Scale · 8K Studio"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["2x", "4x", "8x"] as const).map((factor) => {
                  const isSelected = upscaleFactor === factor;
                  return (
                    <button
                      key={factor}
                      type="button"
                      onClick={() => {
                        setUpscaleFactor(factor);
                        toast.info(`Target resolution set to ${factor}`);
                      }}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-center transition-all cursor-pointer",
                        isSelected
                          ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white font-bold shadow-2xs"
                          : "bg-white dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                      )}
                    >
                      <div className="text-xs font-bold">{factor} Super-Res</div>
                      <div className="text-[10px] text-slate-400 dark:text-zinc-500">
                        {factor === "2x" ? "HD 1080p" : factor === "4x" ? "Ultra 4K" : "Master 8K"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SLIDERS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sharpness Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">Edge Sharpness & Clarity</span>
                  <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px] font-bold">{sharpness}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sharpness}
                  onChange={(e) => setSharpness(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-[#FF6B00]"
                />
              </div>

              {/* Denoise Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">Noise & Artifact Reduction</span>
                  <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px] font-bold">{denoise}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={denoise}
                  onChange={(e) => setDenoise(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-[#FF6B00]"
                />
              </div>

              {/* Face Restoration Strength */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">Face Detail Synthesis</span>
                  <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px] font-bold">{faceEnhanceStrength}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={faceEnhanceStrength}
                  onChange={(e) => setFaceEnhanceStrength(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-[#FF6B00]"
                />
              </div>

              {/* Dynamic HDR Lighting */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">HDR Dynamic Lighting</span>
                  <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px] font-bold">{hdrLighting}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={hdrLighting}
                  onChange={(e) => setHdrLighting(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-lg cursor-pointer accent-[#FF6B00]"
                />
              </div>
            </div>

            {/* FEATURE TOGGLES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setFaceRestoration(!faceRestoration)}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                  faceRestoration
                    ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white"
                    : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 text-slate-500"
                )}
              >
                <div className="text-xs font-semibold">Face Geometry</div>
                <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center", faceRestoration ? "bg-[#FF6B00] text-white" : "border border-slate-300")}>
                  {faceRestoration && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setColorVibrancy(!colorVibrancy)}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                  colorVibrancy
                    ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white"
                    : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 text-slate-500"
                )}
              >
                <div className="text-xs font-semibold">Color Vibrancy</div>
                <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center", colorVibrancy ? "bg-[#FF6B00] text-white" : "border border-slate-300")}>
                  {colorVibrancy && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setArtifactRemoval(!artifactRemoval)}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                  artifactRemoval
                    ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white"
                    : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 text-slate-500"
                )}
              >
                <div className="text-xs font-semibold">De-JPEG Noise</div>
                <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center", artifactRemoval ? "bg-[#FF6B00] text-white" : "border border-slate-300")}>
                  {artifactRemoval && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDehazeContrast(!dehazeContrast)}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                  dehazeContrast
                    ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-white"
                    : "bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-zinc-800 text-slate-500"
                )}
              >
                <div className="text-xs font-semibold">De-Haze Clarity</div>
                <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center", dehazeContrast ? "bg-[#FF6B00] text-white" : "border border-slate-300")}>
                  {dehazeContrast && <Check className="w-2.5 h-2.5" />}
                </div>
              </button>
            </div>
          </div>

          {/* EXPORT & DOWNLOAD BAR */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Export Format:
              </div>
              <div className="flex bg-slate-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-zinc-700/80">
                {(["png", "jpg", "webp"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setExportFormat(fmt)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] uppercase font-semibold rounded-md transition-all cursor-pointer",
                      exportFormat === fmt
                        ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                        : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                    )}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500 hidden sm:inline">
                ({exportFormat === "png" ? "Lossless 24-bit" : exportFormat === "jpg" ? "High Quality 95%" : "WebP Compressed"})
              </span>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res ({outputDimensions.split(" ")[0]})</span>
            </button>
          </div>

        </div>

        {/* PROCESSING HUD OVERLAY */}
        {isProcessing && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#FF6B00] animate-spin" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Running Neural Super-Resolution
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Synthesizing high-frequency pixel details and facial geometry...
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#FF6B00] h-full transition-all duration-200"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="text-xs font-mono font-bold text-slate-600 dark:text-zinc-300">
                {processingProgress}% Complete
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarShell>
  );
}
