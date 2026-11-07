"use client";

import React, { useState } from "react";
import { Plus, Minus, Sparkles, CheckCircle2 } from "lucide-react";

export default function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Why should I choose Let's C over regular cleaning services?",
      answer:
        "Let's C provides background-checked, vetted cleaning specialists equipped with high-extraction machinery and hospital-grade bio-detergents. Unlike casual cleaners, our team follows a strict precision protocol covering overlooked zones like window channels, skirting boards, corners, and tile grout lines.",
    },
    {
      question: "Are your cleaning solutions safe for children, elders, and pets?",
      answer:
        "Yes, 100%. We exclusively use certified eco-friendly, non-toxic, and bio-degradable formulations. They are free from harsh chlorine or abrasive acid smells, ensuring a fresh, allergen-free environment that is safe for newborns, elders, and pets immediately after cleaning.",
    },
    {
      question: "How reliable and punctual is your arrival timing?",
      answer:
        "Punctuality is our core standard. Once your slot is confirmed, our dedicated coordinator assigns our nearest mobile team in Thamarassery or Kochi. You receive prompt communication and on-time arrival without unexpected rescheduling or delays.",
    },
    {
      question: "How does Let's C handle Kerala's humid climate and dust?",
      answer:
        "Kerala homes face unique challenges from high humidity, moisture entrapment on tiles, and dampness inside upholstered sofas. We use industrial hot/cold injection-extraction units and specialized anti-fungal treatments tailored specifically for tropical Kerala conditions.",
    },
    {
      question: "Do I get to inspect the work before finalizing the service?",
      answer:
        "Always. We operate on a 'Satisfaction Handover' policy. Our supervisor walks through every cleaned zone with you before sign-off. If you notice any overlooked spot or detail, we address and rectify it immediately on the spot with complete courtesy.",
    },
    {
      question: "Are there any hidden costs or surprise extra charges?",
      answer:
        "Zero hidden fees. We provide clear, transparent upfront estimates based on your space requirements or chosen service package. All industrial equipment, eco-chemicals, and labour are comprehensively included with no surprise add-ons.",
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#FBFBFD] relative border-b border-black/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-light text-slate-600 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#03B9F4]" />
            <span>The Standard of Care</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black tracking-[-0.03em]">
            Why Choose Let's C
          </h2>

          <p className="text-sm sm:text-base text-[#6E6E73] font-light leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our standards, safety, and why homes and venues trust us for meticulous deep cleaning.
          </p>
        </div>

        {/* Accordion List (Question & Answer Model) */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#03B9F4]/40 shadow-sm"
                    : "bg-white/90 border-slate-200/80 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {/* Question Row (Clickable Header) */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-normal tracking-tight transition-colors ${
                      isOpen ? "text-[#03B9F4]" : "text-slate-900 group-hover:text-black"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Side + / - Button */}
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                      isOpen
                        ? "bg-[#03B9F4] text-white border-[#03B9F4]"
                        : "bg-slate-50 text-slate-600 border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2]" />
                    )}
                  </span>
                </button>

                {/* Answer Container (Only shown when clicked) */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs sm:text-sm text-[#6E6E73] font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs text-slate-600 font-light shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[1.75]" />
            <span>Have more questions? Call or WhatsApp our Thamarassery & Kochi coordinators anytime.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
