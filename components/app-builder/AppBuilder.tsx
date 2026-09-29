"use client";

import React from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import AppBuilderMain from "@/components/app-builder/AppBuilderMain";

export default function AppBuilder() {
  return (
    <SidebarShell>
      <AppBuilderMain />
    </SidebarShell>
  );
}
