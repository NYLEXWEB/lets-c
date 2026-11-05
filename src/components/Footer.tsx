"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { CONTACT_INFO, SERVICES_DATA } from "@/data/cleaningData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FBFBFD] text-neutral-800 pt-16 pb-12 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-black/[0.06]">
          
          {/* Brand */}
          <div className="lg:col-span-4 space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-logo.png"
              alt="Let's C Cleaning Logo"
              className="h-8 sm:h-9 w-auto object-contain select-none"
            />
            
            <p className="text-xs text-[#6E6E73] font-light leading-relaxed max-w-sm">
              Professional residential, sofa, mattress, and event cleaning services based in Thamarassery, Kozhikode.
            </p>

            <span className="text-[11px] font-normal text-neutral-400 block pt-1">
              Beyond Cleaning™
            </span>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider font-normal text-neutral-400">
              Overview
            </h4>
            <ul className="space-y-2 text-xs font-light text-neutral-600">
              <li>
                <Link href="#services" className="hover:text-black transition-colors">Services</Link>
              </li>
              <li>
                <Link href="#why-us" className="hover:text-black transition-colors">Philosophy</Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-black transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-black transition-colors">Before & After</Link>
              </li>
              <li>
                <Link href="#reviews" className="hover:text-black transition-colors">Google Reviews</Link>
              </li>
              <li>
                <Link href="#booking" className="hover:text-black transition-colors">Book Online</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider font-normal text-neutral-400">
              Offerings
            </h4>
            <ul className="space-y-2 text-xs font-light text-neutral-600">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <Link href="#services" className="hover:text-black transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#booking" className="hover:text-black transition-colors text-[#03B9F4]">
                  Custom Inspection →
                </Link>
              </li>
            </ul>
          </div>

          {/* Hub */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider font-normal text-neutral-400">
              Center
            </h4>
            <div className="space-y-1.5 text-xs font-light text-neutral-600">
              <p>Thamarassery, Kozhikode</p>
              <p>{CONTACT_INFO.phone}</p>
              <p className="text-[11px] text-neutral-400 pt-1">8 AM – 8 PM Daily</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-neutral-400">
          <div>
            © {new Date().getFullYear()} Let's C Cleaning Services. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Kozhikode, Kerala</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-600 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
