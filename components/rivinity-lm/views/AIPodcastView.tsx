"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles,
  Users,
  Radio,
  Download,
  ListMusic,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";

interface DialogueLine {
  speaker: string;
  role: "Host" | "Expert";
  time: string;
  text: string;
}

interface Episode {
  id: number;
  title: string;
  topic: string;
  duration: string;
  durationSeconds: number;
  hosts: string;
  status: "ready" | "generating";
  transcript: DialogueLine[];
}

const initialEpisodes: Episode[] = [
  {
    id: 1,
    title: "Quantum Superposition & The Multiverse Debate",
    topic: "Theoretical Physics",
    duration: "14:20",
    durationSeconds: 860,
    hosts: "Alex (Host) & Dr. Maya Chen (Quantum Physicist)",
    status: "ready",
    transcript: [
      {
        speaker: "Alex",
        role: "Host",
        time: "00:00",
        text: "Welcome back to Rivinity Deep Dive! Today we are tackling one of the most mind-bending questions in modern physics: What actually happens when a quantum particle is in two places at once?",
      },
      {
        speaker: "Dr. Maya Chen",
        role: "Expert",
        time: "00:24",
        text: "Thanks for having me, Alex. The key thing to understand is that superposition isn't just a mathematical trick. Until an observation occurs, the wave function describes genuine physical probabilities across distinct eigenstates.",
      },
      {
        speaker: "Alex",
        role: "Host",
        time: "01:05",
        text: "Which brings us directly to the famous Schrödinger's cat thought experiment! Why did Erwin Schrödinger create that paradox in the first place?",
      },
      {
        speaker: "Dr. Maya Chen",
        role: "Expert",
        time: "01:32",
        text: "Schrödinger actually proposed it as a critique of the Copenhagen interpretation! He wanted to show how absurd macroscopic superposition would appear if quantum indeterminacy scaled up to everyday objects.",
      },
    ],
  },
  {
    id: 2,
    title: "The Geopolitics of the Industrial Revolution",
    topic: "World History",
    duration: "18:45",
    durationSeconds: 1125,
    hosts: "Sarah Jenkins & Prof. Arthur Vance",
    status: "ready",
    transcript: [
      {
        speaker: "Sarah Jenkins",
        role: "Host",
        time: "00:00",
        text: "In this episode, we explore why Britain became the epicenter of steam power, coal extraction, and global factory manufacturing during the late 18th century.",
      },
      {
        speaker: "Prof. Arthur Vance",
        role: "Expert",
        time: "00:35",
        text: "It was a confluence of geography, accessible shallow coal deposits, patent law protections, and naval supremacy that enabled British hegemony.",
      },
    ],
  },
];

export default function AIPodcastView() {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(initialEpisodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(38);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= selectedEpisode.durationSeconds) {
            setIsPlaying(false);
            return selectedEpisode.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, selectedEpisode.durationSeconds]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);

    setTimeout(() => {
      const newEp: Episode = {
        id: Date.now(),
        title: `${topic.trim()}: A Comprehensive Conversation`,
        topic: "Custom AI Topic",
        duration: "12:15",
        durationSeconds: 735,
        hosts: "Rivinity AI Host & Guest Scholar",
        status: "ready",
        transcript: [
          {
            speaker: "Rivinity Host",
            role: "Host",
            time: "00:00",
            text: `Welcome to this special audio exploration of ${topic.trim()}. Today we dissect the nuances, practical implementations, and underlying concepts.`,
          },
          {
            speaker: "Guest Scholar",
            role: "Expert",
            time: "00:30",
            text: "Excited to dive in! The essential foundation begins with understanding foundational mechanics before advancing toward synthesis.",
          },
          {
            speaker: "Rivinity Host",
            role: "Host",
            time: "01:10",
            text: "Let us walk through concrete examples so listeners can test their intuitive grasp.",
          },
        ],
      };

      setEpisodes((prev) => [newEp, ...prev]);
      setSelectedEpisode(newEp);
      setCurrentTime(0);
      setIsPlaying(false);
      setGenerating(false);
      setTopic("");
      toast.success("AI Podcast Episode synthesized!");
    }, 2200);
  };

  const handleDownload = () => {
    toast.success("Downloading synthesized audio transcript as MP3...");
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
    toast.info(`Playback speed: ${speeds[nextIdx]}x`);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-[#f8fafc] dark:bg-zinc-950 font-sans">
      <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-zinc-800 bg-[#f8fafc]/80 dark:bg-zinc-900/70 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              <span>AI Audio Deep Dive Podcast</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400">
              Two-host conversational podcasts generated from your textbooks & study topics
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-xl">
            <Headphones className="h-3.5 w-3.5 text-[#FF6B00]" />
            <span>HD Audio Engine</span>
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-xs">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
                placeholder="Generate podcast episode on any topic (e.g. Black Holes, Neurobiology, Macro Policy)..."
                className="flex-1 bg-transparent px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none border border-slate-200 dark:border-zinc-800 rounded-xl focus:border-[#FF6B00]"
              />
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating || !topic.trim()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generating ? "Synthesizing Audio..." : "Generate Episode"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 shrink-0">Episodes:</span>
            {episodes.map((ep) => (
              <button
                key={ep.id}
                type="button"
                onClick={() => {
                  setSelectedEpisode(ep);
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-medium shrink-0 border transition-all cursor-pointer ${
                  selectedEpisode.id === ep.id
                    ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-xs"
                    : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800 hover:border-slate-300"
                }`}
              >
                {ep.title.length > 28 ? `${ep.title.slice(0, 28)}…` : ep.title}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-zinc-900 dark:to-zinc-900/60 p-5 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00]">
                  {selectedEpisode.topic}
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100">
                  {selectedEpisode.title}
                </div>
                <div className="text-[12px] text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>{selectedEpisode.hosts}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 sm:h-20 bg-slate-100/60 dark:bg-zinc-800/40 rounded-2xl px-4 overflow-hidden border border-slate-200/60 dark:border-zinc-800">
              {[
                35, 65, 80, 45, 90, 100, 75, 40, 60, 85, 95, 50, 70, 45, 30, 80, 90,
                65, 40, 55, 95, 75, 60, 40, 70, 85, 60, 45, 80, 90, 65, 50, 35, 70,
              ].map((val, idx) => {
                const isBarActive = (idx / 34) * selectedEpisode.durationSeconds <= currentTime;
                return (
                  <div
                    key={idx}
                    className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                      isBarActive
                        ? "bg-[#FF6B00]"
                        : "bg-slate-300 dark:bg-zinc-700"
                    }`}
                    style={{
                      height: `${val}%`,
                      transform: isPlaying && isBarActive ? `scaleY(${0.7 + Math.random() * 0.5})` : "none",
                    }}
                  />
                );
              })}
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={selectedEpisode.durationSeconds}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
              />
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                <span>{formatSeconds(currentTime)}</span>
                <span>{selectedEpisode.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {playbackSpeed}x
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentTime((t) => Math.max(0, t - 15))}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors"
                  title="Rewind 15 seconds"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-12 w-12 rounded-full bg-[#FF6B00] hover:bg-[#E66000] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentTime((t) =>
                      Math.min(selectedEpisode.durationSeconds, t + 15)
                    )
                  }
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors"
                  title="Forward 15 seconds"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Offline MP3</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#FF6B00]">
                <ListMusic className="h-4 w-4" />
                <span>Interactive Episode Dialogue Script</span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                {selectedEpisode.transcript.length} dialogue segments
              </span>
            </div>

            <div className="space-y-3">
              {selectedEpisode.transcript.map((line, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3 sm:p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-bold text-slate-900 dark:text-zinc-100">
                        {line.speaker}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-orange-500/10 text-[#FF6B00]">
                        {line.role}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-400 dark:text-zinc-500">
                      {line.time}
                    </span>
                  </div>
                  <div className="text-[13px] text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {line.text}
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