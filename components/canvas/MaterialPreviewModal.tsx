"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  FileText,
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Copy,
  Check,
  ExternalLink,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import type { AttachedFile } from "./CanvasMain";

interface MaterialPreviewModalProps {
  file: AttachedFile | null;
  onClose: () => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const MaterialPreviewModal: React.FC<MaterialPreviewModalProps> = ({
  file,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [isLoadingText, setIsLoadingText] = useState(false);

  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setCopied(false);
    setTextContent(null);

    if (file && file.url && (file.type === "code" || file.type === "document")) {
      const name = file.name.toLowerCase();
      if (
        name.endsWith(".txt") ||
        name.endsWith(".md") ||
        name.endsWith(".json") ||
        name.endsWith(".ts") ||
        name.endsWith(".tsx") ||
        name.endsWith(".js") ||
        name.endsWith(".jsx") ||
        name.endsWith(".py") ||
        name.endsWith(".css") ||
        name.endsWith(".html") ||
        name.endsWith(".csv") ||
        name.endsWith(".sql")
      ) {
        setIsLoadingText(true);
        fetch(file.url)
          .then((r) => r.text())
          .then((text) => {
            setTextContent(text);
            setIsLoadingText(false);
          })
          .catch(() => {
            setIsLoadingText(false);
          });
      }
    }
  }, [file]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (file) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [file, onClose]);

  if (!file) return null;

  const handleDownload = () => {
    if (file.url) {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success(`Downloading ${file.name}`);
    } else {
      toast.success(`Exporting ${file.name}`);
    }
  };

  const handleOpenInNewTab = () => {
    if (file.url) {
      window.open(file.url, "_blank");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(file.name);
    setCopied(true);
    toast.success("File name copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/45 dark:bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window Container in Light Mode */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-5xl h-[88vh] flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white dark:bg-zinc-950 border-b border-gray-200/80 dark:border-zinc-800 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {file.type === "image" ? (
                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF5500] flex items-center justify-center shrink-0 border border-orange-200/60 dark:border-orange-800/60">
                  <ImageIcon className="w-4 h-4" />
                </div>
              ) : file.type === "pdf" ? (
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 font-bold text-[10px] border border-rose-200/60 dark:border-rose-800/60">
                  PDF
                </div>
              ) : file.type === "code" ? (
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200/60 dark:border-purple-800/60">
                  <Code className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/60">
                  <FileText className="w-4 h-4" />
                </div>
              )}

              <div className="min-w-0 flex flex-col">
                <div className="text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate">
                  {file.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  {formatFileSize(file.size)} • {file.type.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {file.type === "image" && (
                <>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.4, z - 0.25))}
                    className="bg-transparent p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-600 dark:text-zinc-400 font-mono w-10 text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                    className="bg-transparent p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="bg-transparent p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Rotate"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </>
              )}

              {file.url && (
                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="bg-transparent p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handleDownload}
                className="bg-transparent p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="bg-transparent p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Copy name"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-transparent p-1.5 ml-1 rounded-full text-slate-500 hover:text-slate-950 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Proper Full Viewer Body in Light Theme */}
          <div className="flex-1 w-full h-full min-h-0 bg-[#F4F3EF] dark:bg-zinc-950 overflow-hidden flex items-center justify-center p-2 sm:p-4">
            {/* PDF VIEWER */}
            {file.type === "pdf" ? (
              file.url ? (
                <object
                  data={file.url}
                  type="application/pdf"
                  className="w-full h-full rounded-2xl bg-white border border-gray-200/80 dark:border-zinc-800 shadow-sm"
                >
                  <iframe
                    src={`${file.url}#toolbar=1`}
                    title={file.name}
                    className="w-full h-full rounded-2xl bg-white border-0"
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center text-slate-700 dark:text-zinc-300">
                      <div className="text-sm">Your browser does not support inline PDF viewing.</div>
                      <button
                        type="button"
                        onClick={handleOpenInNewTab}
                        className="px-4 py-2 rounded-xl bg-[#FF5500] text-white font-semibold text-xs shadow-sm hover:bg-[#E64D00]"
                      >
                        Open PDF in New Tab
                      </button>
                    </div>
                  </iframe>
                </object>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-zinc-400">
                  <FileText className="w-12 h-12 text-rose-500" />
                  <div className="font-semibold text-slate-800 dark:text-zinc-200">{file.name}</div>
                  <div className="text-xs">No PDF preview URL available</div>
                </div>
              )
            ) : file.type === "image" ? (
              /* IMAGE VIEWER */
              file.url ? (
                <div className="w-full h-full overflow-auto flex items-center justify-center p-4 bg-white/60 dark:bg-zinc-900/60 rounded-2xl border border-gray-200/60 dark:border-zinc-800/60 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: "center center",
                    }}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-md transition-transform duration-150"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-zinc-400">
                  <ImageIcon className="w-12 h-12 text-orange-500" />
                  <div className="font-semibold text-slate-800 dark:text-zinc-200">{file.name}</div>
                </div>
              )
            ) : textContent !== null ? (
              /* CODE / TEXT / MARKDOWN / CSV VIEWER */
              <div className="w-full h-full bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 overflow-auto font-mono text-xs text-slate-800 dark:text-zinc-200 leading-relaxed shadow-sm [scrollbar-width:thin]">
                <pre className="whitespace-pre-wrap select-text font-mono">
                  <code>{textContent}</code>
                </pre>
              </div>
            ) : (
              /* GENERIC DOCUMENT FALLBACK */
              <div className="flex flex-col items-center justify-center gap-4 text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-sm max-w-md mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-zinc-800 border border-orange-200/60 dark:border-zinc-700 flex items-center justify-center text-[#FF5500]">
                  <FileIcon className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-semibold text-base text-slate-900 dark:text-zinc-100">{file.name}</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{formatFileSize(file.size)}</div>
                </div>
                {file.url && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-5 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download File</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MaterialPreviewModal;
