"use client";

import React from "react";
import Image from "next/image";
import { X, Check, Clock, ShieldCheck } from "lucide-react";
import { ServiceItem } from "@/data/cleaningData";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForBooking: (serviceTitle: string) => void;
}

export default function ServiceModal({
  service,
  onClose,
  onSelectForBooking,
}: ServiceModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col border border-black/[0.08] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-neutral-900">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-85"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 hover:bg-black text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-normal uppercase tracking-wider text-sky-200 block mb-1">
              {service.estimate} • {service.duration}
            </span>
            <h3 className="text-2xl font-light tracking-[-0.02em]">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-800">
          
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-1.5">
              Service Scope
            </h4>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              {service.shortDesc}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-3">
              Included In Every Visit
            </h4>
            <ul className="space-y-2">
              {service.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 font-light">
                  <Check className="w-3.5 h-3.5 text-[#03B9F4] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
              Recommended For
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.idealFor.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[11px] font-light bg-[#FBFBFD] text-neutral-600 border border-black/[0.06]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#FBFBFD] border-t border-black/[0.06] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] text-neutral-400 font-light block">Standard rate</span>
            <span className="text-sm font-normal text-black">{service.estimate}</span>
          </div>

          <button
            onClick={() => {
              onSelectForBooking(service.title);
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-normal transition-colors cursor-pointer"
          >
            Select for Booking
          </button>
        </div>

      </div>
    </div>
  );
}
