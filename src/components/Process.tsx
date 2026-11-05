"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ProcessProps {
  onStartBooking: () => void;
}

export default function Process({ onStartBooking }: ProcessProps) {
  const steps = [
    {
      num: "01",
      title: "Choose Your Service",
      desc: "Select the cleaning category tailored to your residence, upholstered furniture, or upcoming family event.",
    },
    {
      num: "02",
      title: "Confirm Your Schedule",
      desc: "Pick a convenient date and time slot. Our Thamarassery coordinator immediately locks your team.",
    },
    {
      num: "03",
      title: "Experience Freshness",
      desc: "Relax while certified cleaners revitalize your space with advanced extraction and eco-safe formulations.",
    },
  ];

  return (
    <section id="process" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-normal text-[#03B9F4] block">
            The Flow
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-[-0.03em]">
            Clean Spaces in 3 Steps
          </h2>
          <p className="text-base text-[#6E6E73] font-light leading-relaxed">
            Designed for frictionless booking and quiet precision.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="apple-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-extralight text-neutral-300 block mb-6 tracking-tight">
                  {step.num}
                </span>

                <h3 className="text-lg font-normal text-black mb-2 tracking-[-0.015em]">
                  {step.title}
                </h3>

                <p className="text-xs text-[#6E6E73] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.04]">
                <span className="text-[11px] font-normal text-[#03B9F4]">
                  Zero hassle
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Trigger */}
        <div className="text-center mt-12">
          <button
            onClick={onStartBooking}
            className="inline-flex items-center gap-2 text-xs font-normal text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <span>Ready to book your session?</span>
            <span className="text-[#03B9F4] underline underline-offset-4">Get started</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#03B9F4]" />
          </button>
        </div>

      </div>
    </section>
  );
}
