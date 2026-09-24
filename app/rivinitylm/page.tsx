"use client";

import { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import RivinityLMMain from "@/components/rivinity-lm/RivinityLMMain";
import RivinityLMRightPanel from "@/components/rivinity-lm/RivinityLMRightPanel";

export default function RivinityLMPage() {
  const [activeFeature, setActiveFeature] = useState("landing");

  return (
    <SidebarShell>
      <div className="flex-1 flex h-full w-full min-h-0 min-w-0 overflow-hidden bg-[#FAF9F7]">
        <RivinityLMMain
          activeFeature={activeFeature}
          onFeatureChange={setActiveFeature}
        />
        <div className="hidden lg:flex shrink-0 h-full">
          <RivinityLMRightPanel
            activeFeature={activeFeature}
            onFeatureChange={setActiveFeature}
          />
        </div>
      </div>
    </SidebarShell>
  );
}
