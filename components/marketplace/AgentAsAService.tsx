"use client";

import React from "react";
import { Cpu } from "lucide-react";

export const AgentAsAService: React.FC = React.memo(() => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-[#101321] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xs space-y-3 sm:space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <Cpu className="w-4.5 sm:w-5 h-4.5 sm:h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Agent-as-a-Service (AaaS) Gateway</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Invoke any subscribed agent via low-latency serverless endpoint.</p>
        </div>
      </div>
      <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 font-mono text-xs text-indigo-600 dark:text-indigo-400 overflow-x-auto">
        POST https://gateway.market.ai/v1/agents/invoke
      </div>
    </div>
  );
});

AgentAsAService.displayName = "AgentAsAService";

export default AgentAsAService;