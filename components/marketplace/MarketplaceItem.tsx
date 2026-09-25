"use client";

import React, { useEffect, useState } from 'react';
import { 
  X, 
  Star, 
  Copy, 
  Check,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export interface MarketplaceItemType {
  id: string;
  name: string;
  category: string;
  badge?: string;
  tagline: string;
  description: string;
  rating: number;
  runs: string;
  price: string;
  tier: string;
  author: {
    name: string;
    avatar?: string;
  };
  capabilities: string[];
  specs: {
    framework: string;
    license: string;
    version: string;
    updatedAt: string;
  };
  isTrending?: boolean;
}

interface ModalProps {
  item: MarketplaceItemType | null;
  isOpen: boolean;
  onClose: () => void;
  onDeploy?: (item: MarketplaceItemType) => void;
}

export const MarketplaceItem: React.FC<ModalProps> = ({ item, isOpen, onClose, onDeploy }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'specs'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.rivinity.ai/v1/run/${item.id} \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryLabel = () => {
    if (item.category === 'AI / ML Models' || item.badge?.toLowerCase() === 'model') return 'Model';
    if (item.category === 'Datasets' || item.badge?.toLowerCase() === 'dataset') return 'Dataset';
    if (item.category === 'Agents' || item.badge?.toLowerCase() === 'agent') return 'Agent';
    if (item.category === 'AI Tools' || item.badge?.toLowerCase() === 'tool') return 'Tool';
    return item.badge || item.category || 'Asset';
  };

  const orgInitials = item.author.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#131317] border border-slate-200/90 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {item.name}
                </h2>
                <span className="text-[11px] font-semibold text-[#FF6B00] bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md border border-orange-200/80 dark:border-orange-900/40">
                  {getCategoryLabel()}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2">
                {item.tagline}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Sleek Segmented Pill Control) */}
        <div className="px-5 pb-3 border-b border-slate-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-800/60 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              API Snippet
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Specifications
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {activeTab === 'overview' && (
            <>
              {/* Description */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">
                  Description
                </span>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Publisher & Stats Combined Row */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-zinc-850/60 border border-slate-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-zinc-300 shrink-0">
                    {orgInitials}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 block">Publisher</span>
                    <span className="font-semibold text-slate-800 dark:text-zinc-200 text-xs">{item.author.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-zinc-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400 dark:text-zinc-500 text-[11px] font-normal">({item.runs})</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/40">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'api' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Terminal Command</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-[#FF6B00] hover:text-[#e05e00] font-semibold px-2.5 py-1 rounded-lg hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="rounded-2xl bg-slate-950 dark:bg-black border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="text-slate-500 select-none text-[11px] mb-2 font-sans font-medium"># Low-latency serverless invocation</div>
                <pre className="text-[11px] leading-relaxed text-slate-200">
{`curl -X POST https://api.rivinity.ai/v1/run/${item.id} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 dark:bg-zinc-850/60 rounded-2xl border border-slate-200/70 dark:border-zinc-800 text-xs">
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px] mb-0.5">Framework</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{item.specs.framework}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px] mb-0.5">License</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{item.specs.license}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px] mb-0.5">Version</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{item.specs.version}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px] mb-0.5">Last Updated</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{item.specs.updatedAt}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-5 border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/60">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 block uppercase font-medium tracking-wider">Pricing</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{item.price}</span>
          </div>
          <button
            onClick={() => {
              if (onDeploy) onDeploy(item);
              else onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#e05e00] rounded-xl flex items-center gap-1.5 shadow-sm shadow-[#FF6B00]/25 transition-all active:scale-98 cursor-pointer"
          >
            <span>Deploy Asset</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItem;