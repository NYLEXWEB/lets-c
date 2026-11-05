"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, X, ArrowUpRight } from "lucide-react";
import { CONTACT_INFO } from "@/data/cleaningData";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-64 bg-white rounded-2xl shadow-xl border border-black/[0.08] p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.05]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-normal text-black">Let's C Help</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-black p-0.5"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-neutral-600 font-light py-2.5 leading-relaxed">
            Need a fast estimate or same-day slot in Kozhikode? Chat directly with our team.
          </p>

          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
              CONTACT_INFO.whatsappMessageDefault
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-normal flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-black/[0.08] shadow-sm hover:border-black/[0.2] transition-colors cursor-pointer"
        aria-label="Toggle WhatsApp"
      >
        <span className="w-2 h-2 rounded-full bg-[#03B9F4]" />
        <span className="text-xs font-normal text-black">WhatsApp</span>
      </button>
    </div>
  );
}
