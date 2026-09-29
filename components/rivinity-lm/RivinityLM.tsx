"use client";

import { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import RivinityLMMain from "@/components/rivinity-lm/RivinityLMMain";

const RivinityLM = () => {
  const [activeFeature, setActiveFeature] = useState<string>("landing");

  return (
    <SidebarShell>
      <div className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        <RivinityLMMain
          activeFeature={activeFeature}
          onFeatureChange={setActiveFeature}
        />
      </div>
    </SidebarShell>
  );
};

export default RivinityLM;
