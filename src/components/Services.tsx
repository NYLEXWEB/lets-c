"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  ArrowRight,
  Share2,
  CheckCheck,
  ShieldCheck,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { SERVICES_DATA, ServiceItem, CONTACT_INFO } from "@/data/cleaningData";
import ServiceConfiguratorModal from "./ServiceConfiguratorModal";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [configuringService, setConfiguringService] = useState<ServiceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Share service card
  const handleShare = async (service: ServiceItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = typeof window !== "undefined"
      ? `${window.location.origin}/services/${service.id}`
      : `https://letsc-cleaning.com/services/${service.id}`;

    const shareData = {
      title: `${service.title} | Let's C Cleaning`,
      text: `Check out ${service.title} by Let's C Cleaning Services in Kozhikode (${service.estimate}, 4.9★ rating).`,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User dismissed share dialog
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedId(service.id);
        setTimeout(() => setCopiedId(null), 2500);
      } catch (err) {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${shareData.title}\n${shareData.text}\n${url}`
          )}`,
          "_blank"
        );
      }
    }
  };

  const handleEnquiry = (service: ServiceItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfiguringService(service);
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FBFBFD] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: Minimalist & Elegant */}
        <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.2em] font-light text-[#03B9F4] block">
            Our Cleaning Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#17191C] tracking-tight">
            Services We Provide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-md mx-auto">
            Thoughtfully planned for Kozhikode homes, upholstered furnishings, and special celebrations.
          </p>
        </div>

        {/* 4 Cards Grid - Matching Image Reference (media_1794081643703_ec136121.jpg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* 1. Large Rounded Image Container */}
                <Link
                  href={`/services/${service.id}`}
                  className="block relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 select-none cursor-pointer"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-300"
                  />

                  {/* Share button overlay on image top right */}
                  <button
                    onClick={(e) => handleShare(service, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-2xs flex items-center justify-center transition-all active:scale-90 cursor-pointer backdrop-blur-xs"
                    title="Share this service"
                    aria-label={`Share ${service.title}`}
                  >
                    {copiedId === service.id ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>

                  {/* Duration overlay badge */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-light backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{service.duration}</span>
                  </div>
                </Link>

                {/* 2. Text Meta below Image (Exact style matching user reference photo) */}
                <div className="pt-3.5 px-1 space-y-1">
                  
                  {/* Service Title (Slim font thickness as requested) */}
                  <Link
                    href={`/services/${service.id}`}
                    className="block text-sm sm:text-[15px] font-normal text-slate-900 tracking-tight leading-snug hover:text-[#03B9F4] transition-colors"
                  >
                    {service.title}
                  </Link>

                  {/* Star Rating Line (★ 4.9 (42 reviews)) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-light pt-0.5">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="font-normal text-slate-800">{service.rating}</span>
                    <span className="text-slate-400 text-[11px]">
                      ({service.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Starting Price */}
                  <div className="text-xs text-slate-500 font-light pt-1">
                    <span>Starting from </span>
                    <strong className="font-normal text-slate-900">{service.estimate}</strong>
                  </div>

                </div>
              </div>

              {/* 3. Action: Enquiry Now leads to Service Details & Add to Cart Page */}
              <div className="pt-4 px-1 mt-2">
                <Link
                  href={`/services/${service.id}`}
                  className="w-full py-2.5 px-4 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-normal transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs text-center"
                >
                  <span>Enquiry Now</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Minimalist Trust Handover Note */}
        <div className="mt-12 p-4 rounded-2xl bg-white border border-slate-200/70 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-600 font-light">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Pay safely after inspection • Zero advance payment required across Kozhikode</span>
        </div>

      </div>

      {/* Interactive Service Configurator Modal */}
      {configuringService && (
        <ServiceConfiguratorModal
          service={configuringService}
          onClose={() => setConfiguringService(null)}
          onSuccess={() => {
            if (onSelectService) {
              onSelectService(configuringService.title);
            }
          }}
        />
      )}
    </section>
  );
}
