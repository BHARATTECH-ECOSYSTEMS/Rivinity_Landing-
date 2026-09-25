"use client";

import { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import AudioLabMain from "@/components/audio-lab/AudioLabMain";
import AudioLabRightPanel from "@/components/audio-lab/AudioLabRightPanel";

const AudioLab = () => {
  const [activeFeature, setActiveFeature] = useState<string>("text-to-speech");

  return (
    <SidebarShell>
      <div className="flex-1 flex min-h-0 h-full w-full overflow-hidden">
        <AudioLabMain
          activeFeature={activeFeature}
          onFeatureChange={setActiveFeature}
        />
        <AudioLabRightPanel activeFeature={activeFeature} />
      </div>
    </SidebarShell>
  );
};

export default AudioLab;
