"use client";

import React from "react";
import { Server, Activity, HardDrive } from "lucide-react";

export const CloudServices: React.FC = React.memo(() => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
      <div className="p-4 bg-white dark:bg-[#101321] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 mb-2">
          <Server className="w-4 h-4" />
          <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">NVIDIA H100 Cluster</span>
        </div>
        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">99.98% Available</div>
        <p className="text-[11px] text-slate-500 mt-1">Direct weights offloading</p>
      </div>

      <div className="p-4 bg-white dark:bg-[#101321] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 mb-2">
          <Activity className="w-4 h-4" />
          <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">Latency</span>
        </div>
        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">&lt; 14ms Median</div>
        <p className="text-[11px] text-slate-500 mt-1">Edge inference distribution</p>
      </div>

      <div className="p-4 bg-white dark:bg-[#101321] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xs sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 text-violet-500 dark:text-violet-400 mb-2">
          <HardDrive className="w-4 h-4" />
          <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">Vector Storage</span>
        </div>
        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Managed Chroma/Qdrant</div>
        <p className="text-[11px] text-slate-500 mt-1">Automatic sync enabled</p>
      </div>
    </div>
  );
});

CloudServices.displayName = "CloudServices";

export default CloudServices;