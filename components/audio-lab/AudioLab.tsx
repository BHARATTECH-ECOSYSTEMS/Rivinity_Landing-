"use client";

import { useState, useEffect } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import AudioLabMain from "@/components/audio-lab/AudioLabMain";

const AudioLab = () => {
  const [activeFeature, setActiveFeature] = useState<string>("landing");
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    try {
      const pendingPrompt = sessionStorage.getItem("rivinity_pending_audio_prompt");
      const pendingFeature = sessionStorage.getItem("rivinity_pending_audio_feature");
      if (pendingPrompt && pendingPrompt.trim()) {
        sessionStorage.removeItem("rivinity_pending_audio_prompt");
        sessionStorage.removeItem("rivinity_pending_audio_feature");
        const prompt = pendingPrompt.trim();
        setCurrentPrompt(prompt);
        const isSoundFx =
          /sound|fx|effect|ambient|rain|music|noise|beat|bass|thunder|blast|ocean|waves|laser|car/i.test(
            prompt,
          );
        setActiveFeature(
          pendingFeature || (isSoundFx ? "audio-generator" : "text-to-speech"),
        );
      }
    } catch {}
  }, []);

  const handlePromptSubmit = (prompt: string, feature: string, file?: File | null) => {
    setCurrentPrompt(prompt);
    setActiveFeature(feature);
    if (file !== undefined) {
      setAttachedFile(file);
    }
  };

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden bg-[#f8fafc] dark:bg-[#0c0c0e]">
        <div className="flex-1 flex min-h-0">
          <AudioLabMain
            activeFeature={activeFeature}
            onFeatureChange={setActiveFeature}
            currentPrompt={currentPrompt}
            onPromptSubmit={handlePromptSubmit}
            attachedFile={attachedFile}
            onFileChange={setAttachedFile}
          />
        </div>
      </div>
    </SidebarShell>
  );
};

export default AudioLab;
