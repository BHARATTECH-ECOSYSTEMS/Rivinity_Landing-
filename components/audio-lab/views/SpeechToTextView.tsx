"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Upload,
  FileAudio,
  Copy,
  Download,
  Globe,
  ChevronDown,
  Trash2,
  CheckCircle,
  Sparkles,
  Search,
  Users,
  Play,
  Pause,
  Clock,
  ListFilter,
  Volume2,
  Share2,
  RefreshCw,
  Check,
  Tag,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const languages = [
  { code: "auto", label: "Auto Detect", flag: "🌐" },
  { code: "en", label: "English (US)", flag: "🇺🇸" },
  { code: "hi", label: "Hindi (India)", flag: "🇮🇳" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "zh", label: "Mandarin", flag: "🇨🇳" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷" },
];

interface TranscriptSegment {
  id: number;
  speaker: string;
  role: string;
  avatar: string;
  text: string;
  startTime: string;
  seconds: number;
  color: string;
}

const initialTranscript: TranscriptSegment[] = [
  {
    id: 1,
    speaker: "Dr. Evelyn Reed",
    role: "Lead Researcher",
    avatar: "ER",
    text: "Welcome everyone to our Q3 neural audio benchmarking review. Today we are demonstrating the real-time transcription and voice synthesis engine.",
    startTime: "00:04",
    seconds: 4,
    color: "text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700",
  },
  {
    id: 2,
    speaker: "Marcus Chen",
    role: "Audio Engineer",
    avatar: "MC",
    text: "Thanks Evelyn. The new pipeline achieves 99.4% word error rate accuracy across multilingual streams, including noisy environments and simultaneous speech.",
    startTime: "00:16",
    seconds: 16,
    color: "text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700",
  },
  {
    id: 3,
    speaker: "Dr. Evelyn Reed",
    role: "Lead Researcher",
    avatar: "ER",
    text: "Let's ensure that we test the diarization capabilities with three or more concurrent speakers before the production release on Friday.",
    startTime: "00:29",
    seconds: 29,
    color: "text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700",
  },
  {
    id: 4,
    speaker: "Aria Sharma",
    role: "Product Lead",
    avatar: "AS",
    text: "Agreed. The latency is currently under 120 milliseconds on edge devices, which is well within our real-time conversation target.",
    startTime: "00:42",
    seconds: 42,
    color: "text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700",
  },
];

export default function SpeechToTextView() {
  const [activeMode, setActiveMode] = useState<"record" | "upload">("upload");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasTranscript, setHasTranscript] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[1]);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [diarization, setDiarization] = useState(true);
  const [smartPunctuation, setSmartPunctuation] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"transcript" | "summary" | "actions">("transcript");
  const [uploadedFile, setUploadedFile] = useState<string | null>("team_sprint_sync.wav");
  const [playingSegmentId, setPlayingSegmentId] = useState<number | null>(null);
  const [liveWaveform, setLiveWaveform] = useState<number[]>(Array(40).fill(12));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
        setLiveWaveform(() =>
          Array.from({ length: 40 }, () => Math.floor(Math.random() * 80) + 15)
        );
      }, 100);
    } else {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      setLiveWaveform(Array(40).fill(12));
    }
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsTranscribing(true);
      setTimeout(() => {
        setIsTranscribing(false);
        setHasTranscript(true);
        toast.success("Live recording transcribed successfully!");
      }, 1500);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      setHasTranscript(false);
      toast.info("Microphone active. Speak naturally...");
    }
  };

  const handleTranscribeFile = () => {
    if (!uploadedFile) {
      toast.error("Please select an audio file first.");
      return;
    }
    setIsTranscribing(true);
    setTimeout(() => {
      setIsTranscribing(false);
      setHasTranscript(true);
      toast.success("Audio transcribed with speaker diarization!");
    }, 1400);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const filteredTranscript = initialTranscript.filter(
    (seg) =>
      seg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seg.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportText = () => {
    const textOutput = initialTranscript
      .map((s) => `[${s.startTime}] ${s.speaker}: ${s.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(textOutput);
    toast.success("Transcript copied with timestamps!");
  };

  return (
    <div className="w-full max-w-[960px] mx-auto space-y-5 px-2 sm:px-4 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
            Speech to Text & Transcription
          </div>
          <div className="text-xs sm:text-[13px] text-slate-500 dark:text-zinc-400 mt-0.5">
            Transcribe conversations, voice notes, and audio files with high accuracy and speaker tags.
          </div>
        </div>

        {/* MODE SWITCHER */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/80 shrink-0">
          <button
            type="button"
            onClick={() => setActiveMode("upload")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeMode === "upload"
                ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
            )}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Audio</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("record")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeMode === "record"
                ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
            )}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Live Mic</span>
          </button>
        </div>
      </div>

      {/* INPUT CONTAINER */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs">
        {activeMode === "record" ? (
          /* LIVE RECORDING HUD */
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
            <div className="relative flex items-center justify-center mb-5">
              {isRecording && (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-rose-500/10 animate-ping" />
                  <div className="absolute w-36 h-36 rounded-full bg-rose-500/5 animate-pulse" />
                </>
              )}
              <button
                type="button"
                onClick={toggleRecording}
                className={cn(
                  "relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer",
                  isRecording
                    ? "bg-rose-600 text-white shadow-rose-500/20 scale-105"
                    : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105"
                )}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
            </div>

            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {isRecording ? "Listening & Recording Audio..." : "Click microphone to start live transcription"}
            </div>

            {/* LIVE WAVEFORM VISUALIZER */}
            {isRecording ? (
              <div className="w-full max-w-md my-4">
                <div className="h-14 flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800">
                  {liveWaveform.map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-rose-500 transition-all duration-75"
                      style={{ height: `${Math.max(15, h)}%` }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2.5 font-mono text-xs font-bold text-rose-500">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Recording: {formatTime(recordingTime)}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                Real-time acoustic analysis · Auto-gain control enabled
              </div>
            )}
          </div>
        ) : (
          /* FILE UPLOAD DROPZONE */
          <div>
            {uploadedFile ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <FileAudio className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {uploadedFile}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-zinc-400 mt-0.5">
                      3.8 MB · 48kHz WAV · Duration: 01:28 · Stereo
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl text-center cursor-pointer hover:border-slate-400 dark:hover:border-zinc-600 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 flex items-center justify-center mb-2.5">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Drop your audio file here or click to browse
                </div>
                <div className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1">
                  Supports MP3, WAV, M4A, FLAC, AAC, WebM (up to 200MB)
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
                  setUploadedFile(f.name);
                  toast.success(`Attached "${f.name}"`);
                }
              }}
            />
          </div>
        )}

        {/* TRANSCRIPTION OPTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedLanguage.flag} {selectedLanguage.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="max-h-56 overflow-y-auto py-1 [scrollbar-width:thin]">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(l);
                          setLangDropdownOpen(false);
                          toast.info(`Language set to ${l.label}`);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                      >
                        <span>{l.flag} {l.label}</span>
                        {l.code === selectedLanguage.code && <Check className="w-3.5 h-3.5 text-[#FF6B00]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Diarization Toggle */}
            <button
              type="button"
              onClick={() => {
                setDiarization(!diarization);
                toast.info(diarization ? "Speaker separation disabled" : "Speaker separation enabled");
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border",
                diarization
                  ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white"
                  : "bg-transparent border-slate-200/70 dark:border-zinc-800 text-slate-500"
              )}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Detect Speakers</span>
            </button>

            {/* Smart Punctuation */}
            <button
              type="button"
              onClick={() => setSmartPunctuation(!smartPunctuation)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border",
                smartPunctuation
                  ? "bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white"
                  : "bg-transparent border-slate-200/70 dark:border-zinc-800 text-slate-500"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Punctuate</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleTranscribeFile}
            disabled={isTranscribing || (activeMode === "upload" && !uploadedFile)}
            className="flex items-center justify-center px-5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isTranscribing ? (
              <span>Transcribing...</span>
            ) : (
              <span>Transcribe Audio</span>
            )}
          </button>
        </div>
      </div>

      {/* TRANSCRIPT RESULTS & AI INSIGHTS */}
      {hasTranscript && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs overflow-hidden animate-in fade-in duration-150">
          {/* OUTPUT TABS & SEARCH BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/30">
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/70 dark:bg-zinc-800/80">
              <button
                type="button"
                onClick={() => setActiveTab("transcript")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "transcript"
                    ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                )}
              >
                Transcript ({initialTranscript.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("summary")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "summary"
                    ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                )}
              >
                AI Summary
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("actions")}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "actions"
                    ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
                )}
              >
                Action Items
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transcript..."
                  className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg pl-7 pr-2.5 py-1 text-xs text-slate-800 dark:text-zinc-200 outline-none focus:border-slate-400"
                />
              </div>

              <button
                type="button"
                onClick={handleExportText}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer"
                title="Copy all"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>

              <button
                type="button"
                onClick={() => toast.success("Transcript exported as SRT subtitle file!")}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export SRT</span>
              </button>
            </div>
          </div>

          {/* TAB 1: INTERACTIVE TRANSCRIPT */}
          {activeTab === "transcript" && (
            <div className="p-4 sm:p-5 space-y-3 max-h-[480px] overflow-y-auto [scrollbar-width:thin]">
              {filteredTranscript.map((seg) => {
                const isPlaying = playingSegmentId === seg.id;
                return (
                  <div
                    key={seg.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-zinc-800/40 hover:bg-slate-100/70 dark:hover:bg-zinc-800/70 transition-all border border-slate-100 dark:border-zinc-800"
                  >
                    <div className="flex items-center sm:flex-col sm:items-start gap-2 shrink-0 sm:w-40">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border shrink-0", seg.color)}>
                          {seg.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {seg.speaker}
                          </div>
                          <div className="text-[9.5px] text-slate-400 dark:text-zinc-500">
                            {seg.role}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPlayingSegmentId(isPlaying ? null : seg.id);
                          toast.info(`Playing from ${seg.startTime}`);
                        }}
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-zinc-700 text-[10px] font-mono font-bold text-slate-600 dark:text-zinc-300 hover:text-slate-900 transition-colors cursor-pointer ml-auto sm:ml-0"
                      >
                        {isPlaying ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current" />}
                        <span>{seg.startTime}</span>
                      </button>
                    </div>

                    <div className="flex-1 text-[13px] sm:text-[13.5px] leading-relaxed text-slate-800 dark:text-zinc-200 font-sans">
                      {seg.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: AI SUMMARY */}
          {activeTab === "summary" && (
            <div className="p-4 sm:p-5 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-700/70">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Executive Meeting Summary</span>
                </div>
                <div className="text-[13px] leading-relaxed text-slate-700 dark:text-zinc-300">
                  The team reviewed Q3 neural audio transcription benchmarks. Evelyn demonstrated that the updated pipeline achieves a 99.4% word error rate accuracy. Marcus and Aria validated edge latency metrics (&lt; 120ms) and scheduled multi-speaker stress tests before the upcoming Friday production rollout.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Sentiment</div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">94% Positive & Collaborative</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Total Word Count</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">148 Words Transcribed</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Speaker Count</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">3 Unique Speakers</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTION ITEMS */}
          {activeTab === "actions" && (
            <div className="p-4 sm:p-5 space-y-2.5">
              {[
                { task: "Execute multi-speaker diarization stress tests with >3 speakers", owner: "Dr. Evelyn Reed & Marcus", due: "By Thursday 5 PM" },
                { task: "Verify sub-120ms edge latency metrics across low-tier hardware", owner: "Aria Sharma", due: "By Friday 12 PM" },
                { task: "Deploy production build to staging cluster for QA validation", owner: "Engineering Team", due: "Friday Evening" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800"
                >
                  <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{item.task}</div>
                    <div className="text-[10.5px] text-slate-400 dark:text-zinc-500 mt-0.5">
                      Assignee: <span className="text-slate-700 dark:text-zinc-300 font-medium">{item.owner}</span> • Due: {item.due}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
