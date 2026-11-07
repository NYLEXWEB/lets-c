"use client";

import React from "react";
import { Phone, MessageSquare, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { CONTACT_INFO, SERVICE_LOCATIONS } from "@/data/cleaningData";

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-normal text-[#03B9F4] block">
            Direct Reach
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-[-0.03em]">
            Connect with Our Team
          </h2>
          <p className="text-base text-[#6E6E73] font-light leading-relaxed">
            Our hubs in Thamarassery & Kochi coordinate residential and event cleaning services.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Phone */}
          <div className="apple-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-light text-neutral-400 block mb-3">
                Call Direct
              </span>
              <h4 className="text-sm font-normal text-black">Speak to Coordinator</h4>
              <p className="text-xs text-[#6E6E73] font-light mt-1">Available 8 AM to 8 PM</p>
            </div>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="mt-6 text-xs font-normal text-black hover:text-[#03B9F4] transition-colors"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="apple-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-light text-[#03B9F4] block mb-3">
                Instant Chat
              </span>
              <h4 className="text-sm font-normal text-black">WhatsApp Desk</h4>
              <p className="text-xs text-[#6E6E73] font-light mt-1">Send photos for rapid estimates</p>
            </div>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                CONTACT_INFO.whatsappMessageDefault
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-xs font-normal text-black hover:text-[#03B9F4] transition-colors flex items-center gap-1"
            >
              <span>Open WhatsApp</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>
          </div>

          {/* Hub Location */}
          <div className="apple-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-light text-neutral-400 block mb-3">
                Operations Hub
              </span>
              <h4 className="text-sm font-normal text-black">Thamarassery, Kozhikode</h4>
              <p className="text-xs text-[#6E6E73] font-light mt-1">{CONTACT_INFO.address}</p>
            </div>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-xs font-normal text-black hover:text-[#03B9F4] transition-colors flex items-center gap-1"
            >
              <span>View Map</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>
          </div>

          {/* Schedule */}
          <div className="apple-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-light text-neutral-400 block mb-3">
                Availability
              </span>
              <h4 className="text-sm font-normal text-black">7 Days a Week</h4>
              <p className="text-xs text-[#6E6E73] font-light mt-1">{CONTACT_INFO.workingHours}</p>
            </div>
            <span className="mt-6 text-[11px] font-normal text-emerald-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active Everyday
            </span>
          </div>

        </div>

        {/* Coverage Strip */}
        <div className="p-6 rounded-2xl bg-[#FBFBFD] border border-black/[0.06] flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <span className="text-xs font-normal text-black shrink-0">
            Service Coverage:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SERVICE_LOCATIONS.map((loc, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-[11px] font-light text-neutral-600 bg-white border border-black/[0.05]"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
