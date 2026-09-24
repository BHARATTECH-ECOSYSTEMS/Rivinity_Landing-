"use client";

import { useState } from "react";
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
} from "lucide-react";

interface Episode {
  id: number;
  title: string;
  topic: string;
  duration: string;
  hosts: string;
  status: "ready" | "generating" | "playing";
}

const episodes: Episode[] = [
  {
    id: 1,
    title: "Quantum Physics Explained",
    topic: "Physics",
    duration: "12:34",
    hosts: "AI Host + Expert",
    status: "ready",
  },
  {
    id: 2,
    title: "The French Revolution",
    topic: "History",
    duration: "18:20",
    hosts: "Two AI Hosts",
    status: "ready",
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    topic: "Computer Science",
    duration: "15:45",
    hosts: "AI Tutor",
    status: "ready",
  },
];

const AIPodcastView = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(episodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [topic, setTopic] = useState("");
  const [hostStyle, setHostStyle] = useState("Conversational");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setTopic("");
    }, 2000);
  };

  const handlePrevious = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.id === selectedEpisode.id
    );

    if (currentIndex > 0) {
      setSelectedEpisode(episodes[currentIndex - 1]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.id === selectedEpisode.id
    );

    if (currentIndex < episodes.length - 1) {
      setSelectedEpisode(episodes[currentIndex + 1]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-full bg-white text-gray-900">
      {/* Header */}
      <div className=" z-10 border-b border-gray-200/70 bg-white/85 backdrop-blur-xl">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
          

            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
              <Mic2 className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold text-gray-900">
                  AI Podcast
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF5500] text-[9px] font-semibold">
                  AI AUDIO
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Turn any topic into an engaging audio experience
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-400">
            <Volume2 className="w-3.5 h-3.5" />
            Immersive learning
          </div>
        </div>
      </div>

      <div className="max-w-[820px] mx-auto px-5 py-7">
        {/* Generator */}
        <section className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.035)] mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[13px] font-semibold text-gray-900">
                Create New Episode
              </h2>
              <p className="text-[10px] text-gray-400 mt-1">
                Generate a podcast from a topic, notes, or study material.
              </p>
            </div>

            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
            </div>
          </div>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic or paste your notes..."
            className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200
              text-[12px] text-gray-800 placeholder:text-gray-400
              outline-none transition-all
              focus:border-orange-300 focus:ring-2 focus:ring-orange-100 mb-4"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {["Conversational", "Interview", "Lecture", "Debate"].map(
                (style) => (
                  <button
                    key={style}
                    onClick={() => setHostStyle(style)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-medium border transition-all ${
                      hostStyle === style
                        ? "bg-orange-50 border-orange-200 text-[#FF5500]"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {style}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="sm:ml-auto flex items-center justify-center gap-1.5
                px-4 py-2.5 rounded-xl bg-[#FF5500] text-white
                text-[11px] font-semibold shadow-[0_4px_12px_rgba(255,85,0,0.18)]
                hover:bg-[#e94d00] disabled:opacity-60
                transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {generating ? "Generating..." : "Generate Episode"}
            </button>
          </div>
        </section>

        {/* Now Playing */}
        <section className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.035)] mb-6">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-[68px] h-[68px] shrink-0 rounded-2xl
                bg-[#FF5500] flex items-center justify-center
                shadow-[0_8px_20px_rgba(255,85,0,0.18)]"
              >
                <Mic2 className="w-7 h-7 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#FF5500]">
                    Now Selected
                  </span>
                </div>

                <h2 className="text-[16px] font-semibold text-gray-900 truncate">
                  {selectedEpisode.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    {selectedEpisode.duration}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Users className="w-3 h-3" />
                    {selectedEpisode.hosts}
                  </span>

                  <span className="text-[10px] text-gray-300">
                    {selectedEpisode.topic}
                  </span>
                </div>
              </div>
            </div>

            {/* Waveform */}
            <div className="h-14 flex items-center gap-[3px] px-1 mb-3">
              {Array.from({ length: 64 }).map((_, index) => {
                const height =
                  18 +
                  ((index * 37 + selectedEpisode.id * 19) % 65);

                const filled = (index / 64) * 100 < progress;

                return (
                  <div
                    key={index}
                    className={`flex-1 max-w-[8px] rounded-full transition-colors ${
                      filled ? "bg-[#FF5500]" : "bg-gray-200"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>

            {/* Progress */}
            <div className="relative mb-2">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5500] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-gray-400 font-mono">
                4:23
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="w-8 h-8 rounded-lg flex items-center justify-center
                    text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying((value) => !value)}
                  className="w-11 h-11 rounded-full bg-[#FF5500]
                    flex items-center justify-center text-white
                    shadow-[0_5px_16px_rgba(255,85,0,0.2)]
                    hover:bg-[#e94d00] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4.5 h-4.5" />
                  ) : (
                    <Play className="w-4.5 h-4.5 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg flex items-center justify-center
                    text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[10px] text-gray-400 font-mono">
                {selectedEpisode.duration}
              </span>
            </div>
          </div>

          {/* Player footer */}
          <div className="px-5 py-3 border-t border-gray-100 bg-white/70 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-gray-400">
              {hostStyle} mode
            </span>

            <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
              <Volume2 className="w-3 h-3" />
              AI generated audio
            </div>
          </div>
        </section>

        {/* Library */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[12px] font-semibold text-gray-800">
                Podcast Library
              </h2>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Continue listening to your generated episodes
              </p>
            </div>

            <span className="text-[10px] text-gray-400">
              {episodes.length} episodes
            </span>
          </div>

          <div className="space-y-2">
            {episodes.map((episode) => {
              const selected = selectedEpisode.id === episode.id;

              return (
                <button
                  key={episode.id}
                  onClick={() => {
                    setSelectedEpisode(episode);
                    setProgress(0);
                    setIsPlaying(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl
                    text-left border transition-all ${
                      selected
                        ? "bg-orange-50/50 border-orange-200"
                        : "bg-white border-gray-200/70 hover:border-gray-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.025)]"
                    }`}
                >
                  <div
                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                      selected
                        ? "bg-[#FF5500] text-white"
                        : "bg-orange-50 text-[#FF5500]"
                    }`}
                  >
                    <Mic2 className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-800 truncate">
                      {episode.title}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-gray-400">
                        {episode.topic}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[9px] text-gray-400">
                        {episode.duration}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[9px] text-gray-400">
                        {episode.hosts}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selected
                        ? "bg-white text-[#FF5500]"
                        : "text-gray-300 hover:text-gray-600"
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIPodcastView;