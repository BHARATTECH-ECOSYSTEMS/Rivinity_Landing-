"use client";

import React, { ReactNode } from "react";

interface PanelSectionProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const PanelSection = ({ label, children, className = "" }: PanelSectionProps) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest px-1">
        {label}
      </div>
      {children}
    </div>
  );
};

export default PanelSection;
