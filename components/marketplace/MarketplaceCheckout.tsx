"use client";

import React, { useState } from "react";
import { X, CheckCircle, Lock } from "lucide-react";
import { MarketplaceItemType } from "./MarketplaceItem";

interface CheckoutProps {
  item: MarketplaceItemType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MarketplaceCheckout: React.FC<CheckoutProps> = React.memo(({ item, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen || !item) return null;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-[92vw] sm:max-w-sm bg-white dark:bg-[#131317] border border-slate-200/90 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Deploy Asset</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {completed ? (
          <div className="py-5 text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Asset Connected!</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {item.name} is now ready to use in your runtime.
            </p>
            <button
              onClick={() => {
                setCompleted(false);
                onClose();
              }}
              className="mt-3 px-4 py-2 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-xs font-semibold rounded-xl text-white dark:text-black transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              Start Session
            </button>
          </div>
        ) : (
          <>
            <div className="p-3 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{item.name}</span>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">{item.tier}</p>
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{item.price}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#e05e00] rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm shadow-[#FF6B00]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-70"
            >
              {loading ? (
                <span>Configuring instance...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Confirm Access
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
});

MarketplaceCheckout.displayName = "MarketplaceCheckout";

export default MarketplaceCheckout;