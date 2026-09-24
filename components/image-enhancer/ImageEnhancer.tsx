"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import {
  Upload,
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Image as ImageIcon,
  Sparkles,
  Layers,
  HelpCircle,
  RefreshCw,
  Maximize2,
  FileDown,
} from "lucide-react";

const DEFAULT_SAMPLE_BEFORE =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=40";
const DEFAULT_SAMPLE_AFTER =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=95";

export default function ImageEnhancerPage() {
  // State
  const [imageBefore, setImageBefore] = useState<string>(
    "/assets/template-state1.png"
  );
  const [imageAfter, setImageAfter] = useState<string>(
    "/assets/template-state2.png"
  );
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "webp">("png");

  // Filter adjustments
  const [sharpness, setSharpness] = useState<number>(50);
  const [denoise, setDenoise] = useState<number>(30);
  const [upscale, setUpscale] = useState<"1x" | "2x" | "4x">("2x");
  const [faceEnhance, setFaceEnhance] = useState<boolean>(true);
  const [colorCorrection, setColorCorrection] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // File Upload Handlers
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageBefore(url);
      setImageAfter(url); // Mirrors until process run
      triggerEnhanceProcess();
    }
  };

  const triggerEnhanceProcess = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  // Slider Drag Handlers
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

  // Zoom / Rotate
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleResetView = () => {
    setZoom(1);
    setRotation(0);
  };

  // Download Handler
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageAfter;
    link.download = `enhanced-image.${exportFormat}`;
    link.click();
  };

  return (
    <SidebarShell>
      <div className="flex h-screen flex-1 min-w-0 bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
        {/* 1. Left Icon Sidebar */}
        <aside className="w-16 border-r border-slate-800 bg-slate-900/60 flex flex-col items-center py-4 justify-between shrink-0">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-600/20 text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <nav className="flex flex-col gap-4">
              <button
                type="button"
                className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
                title="Images"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Layers"
              >
                <Layers className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Presets"
              >
                <Sliders className="w-5 h-5" />
              </button>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* 2. Top Navigation */}
          <header className="h-14 border-b border-slate-800 bg-slate-900/40 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-semibold tracking-wide text-sm bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Rivinity Image Enhancer
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                AI v2.4
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition border border-slate-700">
                <Upload className="w-3.5 h-3.5" />
                <span>Replace Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={triggerEnhanceProcess}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enhance Again</span>
              </button>
            </div>
          </header>

          {/* 3. Stage & Canvas */}
          <div className="flex-1 relative flex items-center justify-center bg-slate-950 p-6 overflow-hidden">
            {/* Zoom/Rotate HUD */}
            <div className="absolute top-8 left-8 z-20 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg p-1 shadow-lg">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-slate-700 mx-1" />
              <button
                type="button"
                onClick={handleRotate}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
                title="Rotate 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetView}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
                title="Reset View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 font-mono px-1">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Comparison Stage Canvas */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="relative w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 cursor-ew-resize bg-slate-900/30 flex items-center justify-center"
            >
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
              >
                {/* After Layer (Full background view) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={imageAfter}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_SAMPLE_AFTER;
                    }}
                    alt="Enhanced"
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>

                {/* Before Layer (Clipped View) */}
                <div
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={imageBefore}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_SAMPLE_BEFORE;
                    }}
                    alt="Original"
                    className="w-full h-full object-contain pointer-events-none filter contrast-90 brightness-95"
                  />
                </div>

                {/* Comparison Split Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  style={{ left: `${sliderPos}%` }}
                  onMouseDown={handleMouseDown}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white text-slate-900 rounded-full shadow-lg flex items-center justify-center border-2 border-slate-900">
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-3 bg-slate-900 rounded-full" />
                      <div className="w-0.5 h-3 bg-slate-900 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage Indicators */}
              <div className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-medium tracking-wide text-slate-300 border border-white/10 pointer-events-none">
                BEFORE
              </div>
              <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded bg-indigo-950/70 backdrop-blur-md text-[11px] font-medium tracking-wide text-indigo-200 border border-indigo-500/20 pointer-events-none">
                AFTER (AI ENHANCED)
              </div>
            </div>
          </div>
        </div>

        {/* 4. Right Controls Panel */}
        <aside className="w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold tracking-wide">Enhance Settings</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Upscale Resolution */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">Upscaling Factor</label>
              <div className="grid grid-cols-3 gap-2">
                {(["1x", "2x", "4x"] as const).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setUpscale(scale)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      upscale === scale
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Denoise Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Noise Reduction</span>
                <span className="text-slate-300 font-mono">{denoise}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={denoise}
                onChange={(e) => setDenoise(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Sharpness Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Sharpness</span>
                <span className="text-slate-300 font-mono">{sharpness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sharpness}
                onChange={(e) => setSharpness(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-slate-300">Face Restoration</span>
                <input
                  type="checkbox"
                  checked={faceEnhance}
                  onChange={(e) => setFaceEnhance(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-slate-300">Color Correction</span>
                <input
                  type="checkbox"
                  checked={colorCorrection}
                  onChange={(e) => setColorCorrection(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Export Panel Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Output Format</span>
              <div className="flex gap-1">
                {(["png", "jpeg", "webp"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setExportFormat(fmt)}
                    className={`text-[10px] px-2 py-0.5 uppercase font-bold rounded cursor-pointer ${
                      exportFormat === fmt
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition active:scale-[0.98] cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Export Enhanced Image</span>
            </button>
          </div>
        </aside>

        {/* 5. Processing Modal */}
        {isProcessing && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-2xl space-y-4">
              <div className="relative">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Enhancing Image...</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Applying super-resolution and AI corrections
                </p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-150"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-indigo-400">
                {processingProgress}%
              </span>
            </div>
          </div>
        )}
      </div>
    </SidebarShell>
  );
}
