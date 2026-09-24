"use client";

import React from 'react';
import { X, Trash2, ArrowRight, Layers } from 'lucide-react';
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-md">
      <div className="w-full max-w-md bg-white dark:bg-[#0f121e] border-l border-slate-200 dark:border-slate-800 h-full p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200 shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Saved Assets ({items.length})</h3>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-3 overflow-y-auto max-h-[70vh] [scrollbar-width:thin]">
            {items.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-12 text-center">No agents or models saved yet.</p>
            ) : (
              items.map((it) => (
                <div key={it.id} className="p-3 bg-slate-50 dark:bg-[#141829] border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{it.name}</h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{it.price}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onCheckout(it)}
                      className="px-3 py-1.5 bg-[#FF5500] hover:bg-[#e04b00] text-white text-[11px] font-semibold rounded-lg shadow-2xs cursor-pointer transition-colors"
                    >
                      Deploy
                    </button>
                    <button onClick={() => onRemove(it.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button onClick={onClose} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 cursor-pointer transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};
export default MarketplaceCart;