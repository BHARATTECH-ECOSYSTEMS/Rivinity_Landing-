"use client";

import { Mic, Volume2, AudioWaveform, Users } from "lucide-react";
import TextToSpeechView from "./views/TextToSpeechView";
import SpeechToTextView from "./views/SpeechToTextView";
import AudioGeneratorView from "./views/AudioGeneratorView";
import VoiceCloneView from "./views/VoiceCloneView";

const features = [
  { id: "text-to-speech", icon: Volume2, label: "Text to Speech", desc: "Convert text into lifelike speech" },
  { id: "speech-to-text", icon: Mic, label: "Speech to Text", desc: "Transcribe audio into text" },
  { id: "audio-generator", icon: AudioWaveform, label: "Audio Generator", desc: "Generate any sound or voice" },
  { id: "voice-clone", icon: Users, label: "Voice Clone", desc: "Clone & transform voices" },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const AudioLabMain = ({ activeFeature, onFeatureChange }: Props) => {
  const renderView = () => {
    switch (activeFeature) {
      case "text-to-speech": return <TextToSpeechView />;
      case "speech-to-text": return <SpeechToTextView />;
      case "audio-generator": return <AudioGeneratorView />;
      case "voice-clone": return <VoiceCloneView />;
      default: return <TextToSpeechView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-background text-foreground">
      {/* Feature tabs */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-2 overflow-x-auto shrink-0 border-b border-glass/40">
        {features.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFeatureChange(f.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeFeature === f.id
                ? "bg-accent text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <f.icon className="w-4 h-4" />
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Active view */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="animate-float-in">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default AudioLabMain;
