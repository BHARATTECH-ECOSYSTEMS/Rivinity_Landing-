"use client";

import { useState, useEffect } from "react";
import {
  Mic,
  Upload,
  FileAudio,
  Search,
  Sparkles,
  Square,
  Copy,
  Check,
  Languages,
} from "lucide-react";
import { toast } from "sonner";

interface Segment {
  speaker: string;
  role: "Instructor" | "Student" | "Presenter";
  time: string;
  text: string;
}

interface Transcript {
  id: number;
  title: string;
  duration: string;
  date: string;
  speakers: number;
  segments: Segment[];
  extractedSummary: string[];
}

const sampleTranscript: Transcript = {
  id: 1,
  title: "Molecular Biology: Mitosis vs Meiosis Lecture",
  duration: "45:12",
  date: "Today",
  speakers: 2,
  segments: [
    {
      speaker: "Prof. Miller",
      role: "Instructor",
      time: "00:00",
      text: "Good morning everyone. Today we are examining cellular reproduction mechanisms, specifically comparing the mitotic replication cycle with meiotic recombination.",
    },
    {
      speaker: "Prof. Miller",
      role: "Instructor",
      time: "02:15",
      text: "Mitosis yields two diploid daughter cells that are genetically identical to the parent cell. This is the primary driver for somatic tissue repair, growth, and asexual division.",
    },
    {
      speaker: "Sarah K.",
      role: "Student",
      time: "05:30",
      text: "Professor, how does crossing over during prophase I in meiosis ensure genetic variation?",
    },
    {
      speaker: "Prof. Miller",
      role: "Instructor",
      time: "06:00",
      text: "Excellent question, Sarah. During synapsis in Prophase I, non-sister chromatids form chiasmata and exchange reciprocal homologous segments, resulting in entirely unique recombinant alleles.",
    },
  ],
  extractedSummary: [
    "Mitosis: 1 division cycle, 2 identical diploid cells, somatic repair/growth.",
    "Meiosis: 2 division cycles, 4 unique haploid gametes, sexual reproduction.",
    "Prophase I Crossing Over: Homologous recombination generates novel genetic variation.",
  ],
};

const languages = ["English (US)", "Spanish", "French", "German", "Hindi", "Japanese"];

export default function VoiceTranscribeView() {
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [transcript] = useState<Transcript>(sampleTranscript);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("English (US)");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (recording) {
      timer = setInterval(() => setRecordTime((t) => t + 1), 1000);
    } else {
      setRecordTime(0);
    }
    return () => clearInterval(timer);
  }, [recording]);

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      toast.success("Live recording started...");
    } else {
      setRecording(false);
      toast.info("Recording finalized. Synthesizing transcription...");
    }
  };

  const copyTranscript = () => {
    const text = `${transcript.title}\n\n${transcript.segments
      .map((s) => `[${s.time}] ${s.speaker} (${s.role}): ${s.text}`)
      .join("\n\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Transcript copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSegments = transcript.segments.filter(
    (segment) =>
      segment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      segment.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Mic className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Voice Transcribe</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Live Diarization
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              High-accuracy speech-to-text with multi-speaker detection & auto-summaries
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-2.5 py-1 text-[11.5px] text-slate-700 dark:text-zinc-300">
            <Languages className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-[11px] font-medium"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={copyTranscript}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy Full Text"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md transition-all ${
                  recording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-[#FF6B00] hover:bg-[#E66000] text-white"
                }`}
              >
                {recording ? <Square className="h-5 w-5 fill-current" /> : <Mic className="h-5 w-5" />}
              </button>

              <div className="space-y-0.5">
                <div className="text-[14px] font-bold text-slate-900 dark:text-zinc-100">
                  {recording ? "Recording in progress..." : "Start Lecture Recording"}
                </div>
                <div className="text-[11.5px] text-slate-500 dark:text-zinc-400">
                  {recording
                    ? `Live audio stream: ${Math.floor(recordTime / 60)}:${(recordTime % 60)
                        .toString()
                        .padStart(2, "0")}`
                    : "Click to record or upload an audio/video file"}
                </div>
              </div>
            </div>

            {recording && (
              <div className="flex items-center gap-1 h-8 bg-red-500/10 px-3 rounded-xl border border-red-500/20">
                {[40, 80, 100, 60, 90, 70, 45, 85, 95, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.info("Select MP3, WAV or M4A file from device")}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60 px-3.5 py-2 text-[12px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors"
              >
                <Upload className="h-3.5 w-3.5 text-[#FF6B00]" />
                <span>Upload Audio File</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-orange-500/5 dark:bg-orange-500/10 p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-wider text-[#FF6B00]">
              <Sparkles className="h-4 w-4" />
              <span>AI Auto-Extracted Key Takeaways</span>
            </div>
            <div className="space-y-1.5">
              {transcript.extractedSummary.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-[12.5px] text-slate-800 dark:text-zinc-200"
                >
                  <span className="text-[#FF6B00] font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <FileAudio className="h-4 w-4 text-[#FF6B00]" />
                <div className="text-[13px] font-bold text-slate-900 dark:text-zinc-100">
                  {transcript.title}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/60 px-3 py-1.5 w-full sm:w-64">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transcript..."
                  className="w-full bg-transparent text-[12px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border-none focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {filteredSegments.map((segment, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/30 p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-bold text-slate-900 dark:text-zinc-100">
                        {segment.speaker}
                      </span>
                      <span className="rounded-md bg-slate-200/80 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-zinc-400">
                        {segment.role}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                      {segment.time}
                    </span>
                  </div>
                  <div className="text-[13.5px] text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {segment.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}