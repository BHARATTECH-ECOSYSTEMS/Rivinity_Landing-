"use client";

import { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import AudioLabMain from "@/components/audio-lab/AudioLabMain";

const AudioLab = () => {
  const [activeFeature, setActiveFeature] = useState<string>("text-to-speech");

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        <div className="flex-1 flex min-h-0">
          <AudioLabMain activeFeature={activeFeature} onFeatureChange={setActiveFeature} />
        </div>
      </div>
    </SidebarShell>
  );
};

export default AudioLab;
