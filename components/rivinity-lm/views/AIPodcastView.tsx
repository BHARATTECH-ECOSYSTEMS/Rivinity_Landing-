"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Sparkles,
  Clock,
  Users,
  Mic2,
  Radio,
  Share2,
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
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedEpisode, playbackSpeed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleGenerate = () => {
    if (!topic.trim() || generating) return;
    setGenerating(true);

    setTimeout(() => {
      const newEp: Episode = {
        id: Date.now(),
        title: `${topic.trim()}: The Complete Breakdown`,
        topic: topic.trim(),
        duration: "12:00",
        durationSeconds: 720,
        hosts: "Rivinity AI Co-Hosts (Alex & Jordan)",
        status: "ready",
        transcript: [
          {
            speaker: "Alex",
            role: "Host",
            time: "00:00",
            text: `Welcome to our special podcast session exploring ${topic.trim()}. We're breaking down everything you need to know in under 15 minutes.`,
          },
          {
            speaker: "Jordan",
            role: "Expert",
            time: "00:20",
            text: `That's right, Alex. Let's start with the foundational concepts and build up to real-world applications and exam strategies.`,
          },
        ],
      };

      setEpisodes((prev) => [newEp, ...prev]);
      setSelectedEpisode(newEp);
      setCurrentTime(0);
      setIsPlaying(false);
      setTopic("");
      setGenerating(false);
      toast.success("AI Podcast Episode generated!");
    }, 1500);
  };

  const progressPercent = Math.min(
    100,
    Math.round((currentTime / selectedEpisode.durationSeconds) * 100)
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <Radio className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>AI Podcast Studio</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                Synthetic Voice
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              Transform lecture notes and topics into two-host conversational podcasts
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

      {}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          {}
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
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generating ? "Synthesizing Audio..." : "Generate Episode"}</span>
              </button>
            </div>
          </div>

          {}
          <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-zinc-900 dark:to-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
            {}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00]">
                  {selectedEpisode.topic}
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-zinc-100">
                  {selectedEpisode.title}
                </div>
                <div className="text-[12px] text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>{selectedEpisode.hosts}</span>
                </div>
              </div>
            </div>

            {}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 sm:h-20 bg-slate-100/60 dark:bg-zinc-800/40 rounded-2xl px-4 overflow-hidden border border-slate-200/60 dark:border-zinc-800">
              {[
                35, 65, 80, 45, 90, 100, 75, 40, 60, 85, 95, 50, 70, 45, 30, 80, 90,
                65, 40, 55, 95, 75, 60, 40, 70, 85, 60, 45, 80, 90, 65, 50, 35, 70,
              ].map((val, idx) => {
                const isPassed = (idx / 34) * 100 <= progressPercent;
                return (
                  <div
                    key={idx}
                    className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
                      isPassed
                        ? "bg-[#FF6B00]"
                        : "bg-slate-300 dark:bg-zinc-700 opacity-60"
                    } ${isPlaying ? "animate-pulse" : ""}`}
                    style={{
                      height: isPlaying ? `${Math.max(15, (val * (idx % 2 === 0 ? 1 : 0.8)))}%` : `${val}%`,
                    }}
                  />
                );
              })}
            </div>

            {}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11.5px] font-mono text-slate-500 dark:text-zinc-400">
                <span>{formatTime(currentTime)}</span>
                <span>{selectedEpisode.duration}</span>
              </div>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = clickX / rect.width;
                  setCurrentTime(Math.round(newPercent * selectedEpisode.durationSeconds));
                }}
                className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 cursor-pointer overflow-hidden"
              >
                <div
                  className="h-full bg-[#FF6B00] rounded-full transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {}
            <div className="flex items-center justify-between pt-2">
              {}
              <div className="flex items-center gap-1">
                {[1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      playbackSpeed === spd
                        ? "bg-[#FF6B00] text-white"
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {}
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
                  onClick={togglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-md hover:bg-[#E66000] active:scale-95 transition-all"
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
                    setCurrentTime((t) => Math.min(selectedEpisode.durationSeconds, t + 15))
                  }
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors"
                  title="Forward 15 seconds"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              {}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => toast.success("Episode added to study queue")}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11.5px] font-medium text-slate-700 dark:text-zinc-300 hover:border-[#FF6B00]/40 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Offline MP3</span>
                </button>
              </div>
            </div>
          </div>

          {}
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-xs">
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
                  className="rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3.5 space-y-1"
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