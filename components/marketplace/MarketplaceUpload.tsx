"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { MarketplaceItemType } from "./MarketplaceItem";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (item: MarketplaceItemType) => void;
}

export const MarketplaceUpload: React.FC<UploadModalProps> = React.memo(({ isOpen, onClose, onUpload }) => {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [tier, setTier] = useState<"Free" | "Paid" | "Premium">("Free");
  const [category, setCategory] = useState("Agents");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: MarketplaceItemType = {
      id: `custom-${Date.now()}`,
      name,
      category,
      badge: category === "Agents" ? "agent" : "tool",
      tier,
      tagline,
      description: tagline || "Custom user uploaded asset on Rivinity Marketplace.",
      rating: 5.0,
      runs: "0",
      price: tier === "Free" ? "Free" : "$19",
      author: {
        name: "You",
      },
      capabilities: ["Custom Workflow", "Direct API Invocation"],
      specs: {
        framework: "Custom Architecture",
        license: "Proprietary",
        version: "v1.0.0",
        updatedAt: "Just now"
      }
    };

    onUpload(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-[94vw] sm:max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-[#131317] border border-slate-200/90 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150 [scrollbar-width:thin]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Publish New Asset</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-700 dark:text-zinc-300 font-semibold block mb-1">Asset Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. DocuScribe Agent"
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-xl p-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div>
            <label className="text-slate-700 dark:text-zinc-300 font-semibold block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="Agents">Agents</option>
              <option value="AI / ML Models">AI / ML Models</option>
              <option value="Datasets">Datasets</option>
              <option value="AI Tools">AI Tools</option>
            </select>
          </div>

          <div>
            <label className="text-slate-700 dark:text-zinc-300 font-semibold block mb-1">Pricing Tier</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as "Free" | "Paid" | "Premium")}
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="text-slate-700 dark:text-zinc-300 font-semibold block mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short one-line description..."
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-xl p-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 font-medium cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05e00] font-semibold text-white rounded-xl shadow-sm shadow-[#FF6B00]/25 transition-all cursor-pointer active:scale-98"
            >
              Publish Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

MarketplaceUpload.displayName = "MarketplaceUpload";

export default MarketplaceUpload;