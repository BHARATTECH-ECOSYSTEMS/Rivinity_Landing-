"use client";

import { useState } from "react";
import {
  Mic,
  Upload,
  FileAudio,
  Clock,
  Search,
  Download,
  Languages,
  Sparkles,
  Square,
  Users,
} from "lucide-react";

interface Transcript {
  id: number;
  title: string;
  duration: string;
  date: string;
  speakers: number;
  segments: {
    speaker: string;
    time: string;
    text: string;
  }[];
}

const sampleTranscript: Transcript = {
  id: 1,
  title: "Biology Lecture - Cell Division",
  duration: "45:12",
  date: "Today",
  speakers: 2,
  segments: [
    {
      speaker: "Professor",
      time: "00:00",
      text: "Today we're going to discuss mitosis and meiosis, the two fundamental types of cell division.",
    },
    {
      speaker: "Professor",
      time: "02:15",
      text: "Mitosis produces two identical daughter cells. It occurs in somatic cells for growth and repair.",
    },
    {
      speaker: "Student",
      time: "05:30",
      text: "How does meiosis differ from mitosis in terms of the end result?",
    },
    {
      speaker: "Professor",
      time: "06:00",
      text: "Great question. Meiosis produces four genetically unique haploid cells. This is essential for sexual reproduction and genetic diversity.",
    },
  ],
};

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Chinese",
];

const VoiceTranscribeView = () => {
  const [recording, setRecording] = useState(false);
  const [transcript] = useState<Transcript | null>(sampleTranscript);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const filteredSegments = transcript?.segments.filter(
    (segment) =>
      segment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      !searchQuery
  );

  return (
    <div className="min-h-full bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200/70 bg-white/85">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
              <Mic className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold text-gray-900">
                  Voice Transcribe
                </h1>

                <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF5500] text-[9px] font-semibold">
                  AI POWERED
                </span>
              </div>

              <p className="text-[11px] text-gray-400 mt-0.5">
                Turn recordings into organized study material
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-400">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
            Smart transcription
          </div>
        </div>
      </div>

      <div className="max-w-[850px] mx-auto px-5 py-7">
        {/* Recording Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Record */}
          <button
            onClick={() => setRecording(!recording)}
            className={`group flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
              recording
                ? "bg-red-50 border-red-200"
                : "bg-white border-gray-200/80 hover:border-orange-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                recording ? "bg-red-500" : "bg-[#FF5500]"
              }`}
            >
              {recording ? (
                <Square className="w-4 h-4 text-white fill-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </div>

            <div>
              <p className="text-[13px] font-semibold text-gray-900">
                {recording ? "Recording..." : "Record Live"}
              </p>

              <p
                className={`text-[10px] mt-1 ${
                  recording ? "text-red-400" : "text-gray-400"
                }`}
              >
                {recording
                  ? "Tap to stop recording"
                  : "Start recording a lecture"}
              </p>
            </div>

            {recording && (
              <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {/* Upload */}
          <button className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-200/80 bg-white text-left transition-all hover:border-orange-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5 text-[#FF5500]" />
            </div>

            <div>
              <p className="text-[13px] font-semibold text-gray-900">
                Upload Audio
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                MP3, WAV, M4A supported
              </p>
            </div>
          </button>
        </div>

        {/* Transcript */}
        {transcript && (
          <section className="bg-white border border-gray-200/80 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.035)] overflow-hidden">
            {/* Transcript Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <FileAudio className="w-4 h-4 text-[#FF5500]" />
                  </div>

                  <div>
                    <h2 className="text-[14px] font-semibold text-gray-900">
                      {transcript.title}
                    </h2>

                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-[9px] text-gray-400">
                        <Clock className="w-3 h-3" />
                        {transcript.duration}
                      </span>

                      <span className="flex items-center gap-1 text-[9px] text-gray-400">
                        <Users className="w-3 h-3" />
                        {transcript.speakers} speakers
                      </span>

                      <span className="text-[9px] text-gray-300">
                        {transcript.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Language */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowLangDropdown(!showLangDropdown)
                      }
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                        border border-gray-200 bg-white text-[10px]
                        font-medium text-gray-500 hover:text-gray-800
                        hover:border-gray-300 transition-colors"
                    >
                      <Languages className="w-3.5 h-3.5" />
                      {language}
                    </button>

                    {showLangDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden z-50">
                        {languages.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setLanguage(lang);
                              setShowLangDropdown(false);
                            }}
                            className={`w-full px-3 py-2.5 text-[10px] text-left transition-colors ${
                              lang === language
                                ? "bg-orange-50 text-[#FF5500] font-medium"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Download */}
                  <button
                    className="w-8 h-8 rounded-lg border border-gray-200
                      flex items-center justify-center text-gray-400
                      hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  {/* Smart Notes */}
                  <button
                    className="flex items-center gap-1.5 px-3 py-2
                      rounded-lg bg-[#FF5500] text-white text-[10px]
                      font-semibold hover:bg-[#e94d00] transition-colors
                      shadow-[0_3px_10px_rgba(255,85,0,0.15)]"
                  >
                    <Sparkles className="w-3 h-3" />
                    Smart Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-5 pt-5">
              <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-white border border-gray-200">
                <Search className="w-3.5 h-3.5 text-gray-400" />

                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transcript..."
                  className="flex-1 bg-transparent text-[11px] text-gray-800
                    placeholder:text-gray-400 outline-none"
                />

                {searchQuery && (
                  <span className="text-[9px] text-gray-400">
                    {filteredSegments?.length} results
                  </span>
                )}
              </div>
            </div>

            {/* Transcript Body */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Transcript
                </p>

                <span className="text-[9px] text-gray-300">
                  {filteredSegments?.length || 0} segments
                </span>
              </div>

              <div className="space-y-1 max-h-[430px] overflow-y-auto pr-1">
                {filteredSegments && filteredSegments.length > 0 ? (
                  filteredSegments.map((segment, index) => (
                    <div
                      key={index}
                      className="group flex gap-4 p-3.5 rounded-xl
                        hover:bg-orange-50/40 transition-colors"
                    >
                      {/* Timestamp */}
                      <div className="w-11 shrink-0 pt-0.5">
                        <span className="text-[9px] font-mono text-gray-400">
                          {segment.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold text-[#FF5500] mb-1">
                          {segment.speaker}
                        </p>

                        <p className="text-[12px] text-gray-600 leading-relaxed">
                          {segment.text}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Search className="w-6 h-6 text-gray-200 mx-auto mb-2" />
                    <p className="text-[11px] text-gray-400">
                      No matching transcript found
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-white/60 flex items-center justify-between">
              <span className="text-[9px] text-gray-400">
                Transcript generated with AI
              </span>

              <span className="text-[9px] text-gray-300">
                {language}
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VoiceTranscribeView;