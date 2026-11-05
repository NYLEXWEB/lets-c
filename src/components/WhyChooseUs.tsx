"use client";

import React from "react";
import { Users, CalendarCheck, SearchCheck, Sparkles, Home, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: Users,
      title: "Vetted Cleaning Specialists",
      desc: "Background-checked professionals trained in modern sanitation standards and respectful conduct.",
    },
    {
      icon: CalendarCheck,
      title: "Reliable Scheduling",
      desc: "Instant confirmations with punctual arrival across Thamarassery and Kozhikode.",
    },
    {
      icon: SearchCheck,
      title: "Meticulous Attention to Detail",
      desc: "Focusing on overlooked areas: window channels, skirting boards, grout lines, and corners.",
    },
    {
      icon: Sparkles,
      title: "Hospital-Grade & Eco Solutions",
      desc: "Safe, non-toxic formulations gentle for children, elders, and domestic pets.",
    },
    {
      icon: Home,
      title: "Kerala Climate Expertise",
      desc: "Formulations tailored to counter high humidity, tile moisture, and tropical dust settling.",
    },
    {
      icon: ShieldCheck,
      title: "Satisfaction Handover",
      desc: "Inspect every surface before sign-off. We address any oversight immediately.",
    },
  ];

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-[#FBFBFD] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-normal text-[#03B9F4] block">
            The Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-[-0.03em]">
            Why Kozhikode Chooses Let's C
          </h2>
          <p className="text-base text-[#6E6E73] font-light leading-relaxed">
            A quiet standard of excellence in every residence and commercial space we tend.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="apple-card p-7 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#FBFBFD] border border-black/[0.06] text-neutral-800 flex items-center justify-center mb-5">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>

                  <h3 className="text-base font-normal text-black mb-1.5 tracking-[-0.01em]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6E6E73] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.04] text-[10px] uppercase tracking-wider font-light text-neutral-400">
                  Standard Protocol
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
