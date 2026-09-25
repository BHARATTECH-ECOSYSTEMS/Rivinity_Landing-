"use client";

import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import AudioLabMain from "@/components/audio-lab/AudioLabMain";
import AudioLabRightPanel from "@/components/audio-lab/AudioLabRightPanel";
import { PanelLeft } from "lucide-react";
import { useSidebarState } from "@/components/canvas/useSidebarState";

const AudioLab = () => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarState();
  const [activeFeature, setActiveFeature] = useState<string>("text-to-speech");

  return (
    <div className="h-screen flex overflow-hidden">
      <CanvasSidebar
        open={sidebarOpen}
        onToggle={toggleSidebar}
        onCollapse={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200 animate-float-in cursor-pointer"
            aria-label="Open sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}

        <div className="flex-1 flex min-h-0">
          <AudioLabMain
            activeFeature={activeFeature}
            onFeatureChange={setActiveFeature}
          />
          <AudioLabRightPanel activeFeature={activeFeature} />
        </div>
      </div>
    </div>
  );
};

export default AudioLab;
