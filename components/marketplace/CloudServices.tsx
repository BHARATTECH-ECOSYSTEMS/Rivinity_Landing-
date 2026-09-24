"use client";

import React from 'react';
import { Server, Activity, HardDrive, CheckCircle2 } from 'lucide-react';

export const CloudServices: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 bg-[#101321] border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Server className="w-4 h-4" />
          <span className="font-semibold text-xs text-slate-300">NVIDIA H100 Cluster</span>
        </div>
        <div className="text-base font-bold text-white">99.98% Available</div>
        <p className="text-[11px] text-slate-500 mt-1">Direct weights offloading</p>
      </div>
      <div className="p-4 bg-[#101321] border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <Activity className="w-4 h-4" />
          <span className="font-semibold text-xs text-slate-300">Latency</span>
        </div>
        <div className="text-base font-bold text-white">&lt; 14ms Median</div>
        <p className="text-[11px] text-slate-500 mt-1">Edge inference distribution</p>
      </div>
      <div className="p-4 bg-[#101321] border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-violet-400 mb-2">
          <HardDrive className="w-4 h-4" />
          <span className="font-semibold text-xs text-slate-300">Vector Storage</span>
        </div>
        <div className="text-base font-bold text-white">Managed Chroma/Qdrant</div>
        <p className="text-[11px] text-slate-500 mt-1">Automatic sync enabled</p>
      </div>
    </div>
  );
};
export default CloudServices;