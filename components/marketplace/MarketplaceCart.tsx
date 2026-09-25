"use client";

import React, { useEffect } from 'react';
import { X, Trash2, ArrowUpRight, Bookmark } from 'lucide-react';
import { MarketplaceItemType } from './MarketplaceItem';

interface CartProps {
  isOpen: boolean;
  items: MarketplaceItemType[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onCheckout: (item: MarketplaceItemType) => void;
}

export const MarketplaceCart: React.FC<CartProps> = ({
  isOpen,
  items,
  onClose,
  onRemove,
  onCheckout
}) => {
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white dark:bg-[#111115] border-l border-slate-200/90 dark:border-zinc-800 h-full p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-zinc-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/40 flex items-center justify-center text-[#FF6B00]">
                <Bookmark className="w-4 h-4 fill-[#FF6B00]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Saved Assets</h3>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'} saved
                </span>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              title="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List or Empty State */}
          <div className="flex-1 overflow-y-auto py-4 space-y-2.5 [scrollbar-width:thin]">
            {items.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/80 flex items-center justify-center text-slate-400 dark:text-zinc-500">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">No saved assets yet</h4>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 max-w-[220px] leading-relaxed">
                    Bookmark models, datasets, or agents from the marketplace to access them here.
                  </p>
                </div>
              </div>
            ) : (
              items.map((it) => (
                <div 
                  key={it.id} 
                  className="p-3 bg-slate-50 dark:bg-zinc-850/60 border border-slate-200/70 dark:border-zinc-800 rounded-2xl flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-[#FF6B00]">
                        {it.badge || it.category}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500">•</span>
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
                        {it.author.name}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{it.name}</h4>
                    <span className="text-[10.5px] text-slate-600 dark:text-zinc-400 font-semibold">{it.price}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onCheckout(it)}
                      className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-[11px] font-semibold rounded-xl shadow-2xs cursor-pointer transition-all flex items-center gap-1 active:scale-95"
                    >
                      <span>Deploy</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => onRemove(it.id)} 
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition-colors"
                      title="Remove asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 shrink-0">
          <button 
            onClick={onClose} 
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold rounded-xl text-slate-700 dark:text-zinc-300 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCart;