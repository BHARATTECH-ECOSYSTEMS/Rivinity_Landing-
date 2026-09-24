"use client";

import React from 'react';
import { Cpu, Terminal, Key, ShieldCheck, ArrowRight } from 'lucide-react';

export const AgentAsAService: React.FC = () => {
  return (
    <div className="p-6 bg-[#101321] border border-slate-800 rounded-2xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Agent-as-a-Service (AaaS) Gateway</h3>
          <p className="text-xs text-slate-400">Invoke any subscribed agent via low-latency serverless endpoint.</p>
        </div>
      </div>
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-400">
        POST https://gateway.market.ai/v1/agents/invoke
      </div>
    </div>
  );
};
export default AgentAsAService;