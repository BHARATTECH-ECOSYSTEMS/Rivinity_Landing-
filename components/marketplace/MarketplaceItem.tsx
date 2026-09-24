"use client";

import React, { useEffect, useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  Layers, 
  SendHorizontal, 
  Copy, 
  Check 
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
    avatar: string;
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
    navigator.clipboard.writeText(`curl -X POST https://api.rivinity.ai/v1/run/${item.id} \\\n  -H "Authorization: Bearer YOUR_KEY"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className="relative h-28 w-full bg-gradient-to-r from-orange-50/80 via-slate-50 to-slate-100 border-b border-slate-200 flex items-end p-5">
          <div className="absolute top-3 right-3">
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-900 border border-slate-200 shadow-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-orange-100 flex items-center justify-center font-bold text-[#FF5500]">
              <Layers className="w-6 h-6 text-[#FF5500]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white text-slate-700 border border-slate-200">
                  {item.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF5500] text-white">
                  {item.badge}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-1">{item.name}</h2>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-200 bg-white text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'overview' ? 'border-[#FF5500] text-[#FF5500]' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'api' ? 'border-[#FF5500] text-[#FF5500]' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            API Snippet
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'specs' ? 'border-[#FF5500] text-[#FF5500]' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Specifications
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600">
          {activeTab === 'overview' && (
            <>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5">Description</h4>
                <p className="leading-relaxed text-slate-600">{item.description}</p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
                <div>
                  <span className="text-[11px] text-slate-400">Rating</span>
                  <div className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#FF5500] text-[#FF5500]" /> {item.rating}
                  </div>
                </div>
                <div className="border-x border-slate-200">
                  <span className="text-[11px] text-slate-400">Downloads</span>
                  <div className="font-bold text-slate-800 mt-0.5">{item.runs}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Price Tier</span>
                  <div className="font-bold text-slate-900 mt-0.5">{item.price}</div>
                </div>
              </div>

              {/* Author Row */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={item.author.avatar} 
                    alt={item.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                  />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Creator</span>
                    <span className="font-bold text-slate-800 text-xs">{item.author.name}</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#FF5500] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/80">
                  Verified Artifact
                </span>
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Key Highlights</h4>
                <div className="space-y-1.5">
                  {item.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Terminal Command</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-[#FF5500] hover:text-[#e04b00] font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] overflow-x-auto">
{`curl -X POST https://api.rivinity.ai/v1/run/${item.id} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div><span className="text-slate-400">Framework:</span> <span className="font-semibold text-slate-800 ml-1">{item.specs.framework}</span></div>
              <div><span className="text-slate-400">License:</span> <span className="font-semibold text-slate-800 ml-1">{item.specs.license}</span></div>
              <div><span className="text-slate-400">Version:</span> <span className="font-semibold text-slate-800 ml-1">{item.specs.version}</span></div>
              <div><span className="text-slate-400">Updated:</span> <span className="font-semibold text-slate-800 ml-1">{item.specs.updatedAt}</span></div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-slate-200 bg-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Pricing</span>
            <span className="text-base font-extrabold text-slate-900">{item.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (onDeploy) onDeploy(item);
                else onClose();
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-[#FF5500] hover:bg-[#e04b00] rounded-xl flex items-center gap-1.5 shadow-sm shadow-[#FF5500]/25 transition-all active:scale-98 cursor-pointer"
            >
              <SendHorizontal className="w-3.5 h-3.5 rotate-45" /> Deploy Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItem;