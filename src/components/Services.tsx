"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/cleaningData";
import ServiceModal from "./ServiceModal";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-normal text-[#03B9F4] block">
            Core Specializations
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-[-0.03em]">
            Cleaning Services, Made Effortless.
          </h2>
          <p className="text-base text-[#6E6E73] font-light leading-relaxed">
            Thoughtfully delivered cleaning solutions for a fresher, healthier space in Kozhikode.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="apple-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[16/11] w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-normal text-neutral-800 border border-black/[0.04]">
                    {service.estimate}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-normal text-black tracking-[-0.015em]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#6E6E73] font-light leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-black/[0.04]">
                    {service.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-neutral-600 font-light">
                        <span className="w-1 h-1 rounded-full bg-[#03B9F4] shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-black/[0.04] mt-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-normal text-neutral-500 hover:text-black transition-colors cursor-pointer py-2"
                >
                  View Details
                </button>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="px-3.5 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-normal transition-colors cursor-pointer"
                >
                  Book
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Minimal Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FBFBFD] border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-normal text-black">
              Need full-villa deep cleaning or post-construction detailing?
            </h4>
            <p className="text-xs font-light text-[#6E6E73] mt-0.5">
              We arrange on-site inspections anywhere in Kozhikode and Thamarassery with custom estimates.
            </p>
          </div>
          <button
            onClick={() => onSelectService("Villa / Commercial Inspection")}
            className="px-4 py-2 rounded-full border border-black/[0.12] hover:border-black text-xs font-normal text-black transition-colors shrink-0 cursor-pointer"
          >
            Request Inspection
          </button>
        </div>

      </div>

      {/* Detail Inclusions Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectForBooking={onSelectService}
        />
      )}
    </section>
  );
}
