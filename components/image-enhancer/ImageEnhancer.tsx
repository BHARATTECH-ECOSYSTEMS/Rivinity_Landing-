"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import {
  UploadCloud,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sparkles,
  Maximize2,
  FileDown,
  RefreshCw,
  ChevronRight,
  Zap,
  ShieldCheck,
} from "lucide-react";

const DEFAULT_SAMPLE_BEFORE =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=40";
const DEFAULT_SAMPLE_AFTER =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=95";

export default function ImageEnhancerPage() {
  const [imageBefore, setImageBefore] = useState<string>("/assets/template-state1.png");
  const [imageAfter, setImageAfter] = useState<string>("/assets/template-state2.png");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "webp">("png");

  // Filter Adjustments
  const [sharpness, setSharpness] = useState<number>(65);
  const [denoise, setDenoise] = useState<number>(40);
  const [upscale, setUpscale] = useState<"1x" | "2x" | "4x">("2x");
  const [faceEnhance, setFaceEnhance] = useState<boolean>(true);
  const [colorCorrection, setColorCorrection] = useState<boolean>(true);
  const [artifactRemoval, setArtifactRemoval] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageBefore(url);
      setImageAfter(url);
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
        return prev + 20;
      });
    }, 150);
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

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleResetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageAfter;
    link.download = `upscaled-${Date.now()}.${exportFormat}`;
    link.click();
  };

  return (
    <SidebarShell>
      <div className="flex flex-col h-full min-h-screen flex-1 min-w-0 bg-slate-50 text-slate-800 antialiased font-sans select-none overflow-hidden">
        {/* Top Application Breadcrumb Bar */}
        <div className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>AI Vision Suite</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium">Image Enhancer</span>
            {/* Subtle Orange accent pill */}
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200">
              Ultra-HD V3
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Subtle Purple accent pill */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded">
              <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
              <span className="font-semibold">60 Credits Available</span>
            </div>

            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition">
              <UploadCloud className="w-4 h-4 text-slate-500" />
              <span>Upload New</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              type="button"
              onClick={triggerEnhanceProcess}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Process Image</span>
            </button>
          </div>
        </div>

        {/* Main SaaS Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Center Canvas Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-slate-100/70 border-r border-slate-200 relative">
            {/* Canvas Floating Top Toolbar */}
            <div className="p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-1 shadow-sm">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  title="Rotate Clockwise"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  title="Reset Fit"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500 font-mono px-2">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-sm text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Lossless Neural Upscaling</span>
              </div>
            </div>

            {/* Interactive Split-Comparison Viewer */}
            <div className="flex-1 flex items-center justify-center p-6 pt-0 overflow-hidden relative select-none">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="relative w-full max-w-4xl h-[70vh] rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center cursor-col-resize"
              >
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                >
                  {/* Enhanced Base Layer */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                    <img
                      src={imageAfter}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_SAMPLE_AFTER;
                      }}
                      alt="AI Processed Result"
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>

                  {/* Original Layer with dynamic Clip */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img
                      src={imageBefore}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_SAMPLE_BEFORE;
                      }}
                      alt="Original Input"
                      className="w-full h-full object-contain pointer-events-none filter contrast-90 brightness-95"
                    />
                  </div>

                  {/* Solid Divider Bar */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-10"
                    style={{ left: `${sliderPos}%` }}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-orange-500 rounded-full shadow-sm flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-2.5 bg-orange-500 rounded-full" />
                        <div className="w-0.5 h-2.5 bg-orange-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="absolute bottom-4 left-4 z-10 px-2 py-1 rounded bg-white border border-slate-200 text-[11px] font-semibold tracking-wider text-slate-600 shadow-sm pointer-events-none">
                  ORIGINAL (INPUT)
                </div>
                <div className="absolute bottom-4 right-4 z-10 px-2 py-1 rounded bg-white border border-slate-200 text-[11px] font-semibold tracking-wider text-orange-600 shadow-sm pointer-events-none">
                  AI ENHANCED (RESULT)
                </div>
              </div>
            </div>
          </main>

          {/* Right Configuration Inspector */}
          <aside className="w-80 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Enhance Parameters</h3>
                <button
                  type="button"
                  onClick={() => {
                    setSharpness(50);
                    setDenoise(30);
                    setUpscale("2x");
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">Adjust AI reconstruction weights</p>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Upscale Target Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">Upscaling Factor</label>
                  <span className="text-[11px] text-slate-400">Target output</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["1x", "2x", "4x"] as const).map((factor) => (
                    <button
                      key={factor}
                      type="button"
                      onClick={() => setUpscale(factor)}
                      className={`py-2 text-xs font-semibold rounded-md border transition cursor-pointer ${
                        upscale === factor
                          ? "bg-orange-50 border-orange-500 text-orange-700"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {factor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Denoise Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Denoising</span>
                  <span className="text-slate-500 font-mono text-[11px]">{denoise}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={denoise}
                  onChange={(e) => setDenoise(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>

              {/* Sharpness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Edge Sharpness</span>
                  <span className="text-slate-500 font-mono text-[11px]">{sharpness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sharpness}
                  onChange={(e) => setSharpness(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>

              {/* Checkbox Enhancements */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Face Restoration</div>
                    <div className="text-[11px] text-slate-500">Sharpen eyes and skin texture</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={faceEnhance}
                    onChange={(e) => setFaceEnhance(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-0 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Color Fidelity Repair</div>
                    <div className="text-[11px] text-slate-500">Correct exposure and white balance</div>
                  </div>
                  {/* Subtle Pink-accented toggle state */}
                  <input
                    type="checkbox"
                    checked={colorCorrection}
                    onChange={(e) => setColorCorrection(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-0 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Compression Denoise</div>
                    <div className="text-[11px] text-slate-500">Eliminate JPEG artifact blocks</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={artifactRemoval}
                    onChange={(e) => setArtifactRemoval(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Export Action Section */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Export Format</span>
                <div className="flex bg-white border border-slate-200 rounded p-0.5">
                  {(["png", "jpg", "webp"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setExportFormat(fmt)}
                      className={`px-2 py-0.5 text-[11px] uppercase font-medium rounded cursor-pointer ${
                        exportFormat === fmt
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900"
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
                className="w-full py-2 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download High-Res</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Synchronous Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6 w-full max-w-sm flex flex-col items-center text-center shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-orange-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Applying Neural Reconstruction</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Optimizing pixel distribution and dynamic scale...
                </p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-orange-600 h-full transition-all duration-200"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-medium text-slate-600">{processingProgress}% Complete</span>
            </div>
          </div>
        )}
      </div>
    </SidebarShell>
  );
}
