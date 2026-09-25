"use client";

import React, { useState } from 'react';
import { X, CheckCircle, Lock, SendHorizontal } from 'lucide-react';
import { MarketplaceItemType } from './MarketplaceItem';

interface CheckoutProps {
  item: MarketplaceItemType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MarketplaceCheckout: React.FC<CheckoutProps> = ({ item, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen || !item) return null;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Deploy Agent</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {completed ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Agent Connected!</h4>
            <p className="text-xs text-slate-500">
              {item.name} is now ready to use.
            </p>
            <button
              onClick={() => {
                setCompleted(false);
                onClose();
              }}
              className="mt-3 px-4 py-2 bg-slate-900 text-xs font-semibold rounded-xl text-white hover:bg-black"
            >
              Start Session
            </button>
          </div>
        ) : (
          <>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-xs">{item.name}</span>
                <p className="text-[11px] text-slate-400">{item.tier}</p>
              </div>
              <span className="font-bold text-slate-900 text-sm">{item.price}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#e04b00] rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm shadow-[#FF6B00]/25 transition-all cursor-pointer"
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
};

export default MarketplaceCheckout;