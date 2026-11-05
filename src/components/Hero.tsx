"use client";

import React from "react";
import { Star, ArrowRight } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white border-b border-[#E8EDF1]/60 min-h-screen lg:min-h-[700px] flex items-center pt-20 lg:pt-0"
    >
      {/* Video Container Right-Aligned with Multi-Layer Foggy Blend */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[75%_center] lg:object-center"
        >
          <source src="/video/6195521-uhd_2160_3840_25fps.mp4" type="video/mp4" />
        </video>

        {/* 1. Horizontal White Foggy Blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-50% sm:via-40% to-white/10 lg:from-white lg:via-white/80 lg:via-30% lg:to-transparent pointer-events-none" />

        {/* 2. Top Fade Blend */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />

        {/* 3. Bottom Fade Blend */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

        {/* 4. Ambient Soft White Tint */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      </div>

      {/* Content Container - Matching Exact Alignment & Style from Reference */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 py-8 sm:py-16 lg:py-24 w-full">
        <div className="max-w-xl text-left space-y-4 sm:space-y-6">

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E8EDF1] text-neutral-600 shadow-2xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#03B9F4]" />
            <span className="text-[11px] uppercase tracking-[0.18em] font-normal text-neutral-600">
              Thamarassery • Kozhikode, Kerala
            </span>
          </div>

          {/* Headline - Exact Typography Style & Scale */}
          <h1 className="text-[32px] sm:text-[46px] lg:text-[60px] font-light tracking-[-0.03em] leading-[1.12] text-[#17191C]">
            Your Space. <br />
            <span className="text-[#03B9F4] font-normal">Beautifully Clean.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-light text-[#555B62] leading-[1.65] max-w-lg">
            From homes and offices to upholstered sofas and special occasions, Let's C delivers thoughtful cleaning solutions designed to restore calm, freshness, and order.
          </p>

          {/* Google Reviews Trust Strip */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E8EDF1] shadow-2xs backdrop-blur-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[12px] font-normal text-[#17191C]">
              <strong>4.9</strong> on Google
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-[12px] text-[#555B62] font-light">20+ verified reviews</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-[14px] font-normal text-white bg-black hover:bg-neutral-800 transition-all shadow-2xs hover:shadow-xs active:translate-y-0.5 cursor-pointer text-center"
            >
              Book a Cleaning
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full text-[14px] font-light text-[#17191C] bg-white/85 hover:bg-white border border-[#E8EDF1] transition-all cursor-pointer backdrop-blur-xs text-center"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#666D75]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
