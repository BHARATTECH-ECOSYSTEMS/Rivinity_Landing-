"use client";

import { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import RivinityLMMain from "@/components/rivinity-lm/RivinityLMMain";

export default function RivinityLMPage() {
  const [activeFeature, setActiveFeature] = useState("landing");

  return (
    <SidebarShell>
      <div className="flex-1 flex h-full w-full min-h-0 min-w-0 overflow-hidden bg-white dark:bg-zinc-950">
        <RivinityLMMain
          activeFeature={activeFeature}
          onFeatureChange={setActiveFeature}
        />
      </div>
    </SidebarShell>
  );
}
