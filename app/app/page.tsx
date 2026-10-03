"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarShell from "@/components/canvas/SidebarShell";
import CanvasMain from "@/components/canvas/CanvasMain";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/app") {
      router.replace("/chat");
    }
  }, [router]);

  return (
    <SidebarShell>
      <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        <CanvasMain />
      </div>
    </SidebarShell>
  );
};

export default Index;