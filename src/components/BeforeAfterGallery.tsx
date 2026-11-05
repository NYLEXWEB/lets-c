"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/cleaningData";

export default function BeforeAfterGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({
    "gal-1": 50,
    "gal-2": 50,
    "gal-3": 50,
    "gal-4": 50,
  });

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleSliderMove = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPositions((prev) => ({
      ...prev,
      [id]: Number(e.target.value),
    }));
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#FBFBFD] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-normal text-[#03B9F4] block">
            Visual Proof
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-[-0.03em]">
            Before & After
          </h2>
          <p className="text-base text-[#6E6E73] font-light leading-relaxed">
            Drag the divider to observe genuine deep-extraction results.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-12">
          {[
            { id: "all", label: "All Projects" },
            { id: "home", label: "Home Living" },
            { id: "sofa", label: "Sofa Extraction" },
            { id: "mattress", label: "Mattress UV" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-black text-white font-normal"
                  : "bg-white text-neutral-600 font-light hover:text-black border border-black/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const position = sliderPositions[item.id] ?? 50;
            return (
              <div
                key={item.id}
                className="apple-card rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Visual Frame */}
                <div className="relative aspect-[16/10] w-full select-none overflow-hidden">
                  
                  {/* After Image */}
                  <Image
                    src={item.afterImg}
                    alt={`${item.title} After`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-normal uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs">
                    After
                  </span>

                  {/* Before Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${position}%` }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.beforeImg}
                        alt={`${item.title} Before`}
                        fill
                        className="object-cover object-left"
                      />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[10px] font-normal uppercase tracking-wider bg-black/50 text-white backdrop-blur-xs">
                    Before
                  </span>

                  {/* Hairline Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-[1.5px] bg-white shadow-md pointer-events-none z-20"
                    style={{ left: `${position}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-neutral-800 shadow-md border border-black/[0.1] flex items-center justify-center">
                      <ArrowLeftRight className="w-2.5 h-2.5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Range Slider for Interaction */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={position}
                    onChange={(e) => handleSliderMove(item.id, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    aria-label="Comparison slider"
                  />
                </div>

                {/* Meta */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-normal text-black">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#6E6E73] font-light">
                      {item.location}
                    </p>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-light">
                    Drag slider
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
