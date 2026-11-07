"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  MapPin,
  Search,
  ShoppingCart,
  Sparkles,
  ChevronDown,
  Home as HomeIcon,
  Sofa,
  Bed,
  PartyPopper,
  Flame,
  Bath,
  Building,
  KeyRound,
  Check,
  X,
  PhoneCall
} from "lucide-react";
import { CONTACT_INFO, SERVICES_DATA, SERVICE_LOCATIONS, ServiceItem } from "@/data/cleaningData";
import { useCart } from "@/context/CartContext";
import ServiceModal from "./ServiceModal";
import ServiceConfiguratorModal from "./ServiceConfiguratorModal";

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  const { totalCount, setIsCartOpen } = useCart();

  // Mobile UI States
  const [selectedLocation, setSelectedLocation] = useState<string>("Thamarassery");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [configuringService, setConfiguringService] = useState<ServiceItem | null>(null);

  // Desktop Search & Location States
  const [desktopLocationOpen, setDesktopLocationOpen] = useState(false);
  const [desktopSearchQuery, setDesktopSearchQuery] = useState("");

  // App-style quick services list for Mobile (Strictly the 4 core cleanings)
  const mobileServices = [
    {
      id: "home-cleaning",
      title: "Home Cleaning",
      category: "home",
      icon: HomeIcon,
      badge: "Popular",
      badgeColor: "bg-amber-500",
      targetTitle: "Home Cleaning",
    },
    {
      id: "event-cleaning",
      title: "Event Cleaning",
      category: "event",
      icon: PartyPopper,
      badge: "Express",
      badgeColor: "bg-purple-600",
      targetTitle: "Event Cleaning",
    },
    {
      id: "sofa-cleaning",
      title: "Sofa Cleaning",
      category: "sofa",
      icon: Sofa,
      badge: "Top Rated",
      badgeColor: "bg-[#03B9F4]",
      targetTitle: "Sofa Cleaning",
    },
    {
      id: "mattress-cleaning",
      title: "Mattress Cleaning",
      category: "mattress",
      icon: Bed,
      badge: "UV Care",
      badgeColor: "bg-emerald-500",
      targetTitle: "Mattress Cleaning",
    },
  ];

  const filteredMobileServices = searchQuery.trim()
    ? mobileServices.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : mobileServices;

  const filteredDesktopServices = desktopSearchQuery.trim()
    ? mobileServices.filter((s) =>
      s.title.toLowerCase().includes(desktopSearchQuery.toLowerCase())
    )
    : [];

  const handleMobileServiceClick = (targetTitle: string) => {
    const srv = SERVICES_DATA.find((s) => s.title.toLowerCase().includes(targetTitle.toLowerCase()));
    if (srv) {
      window.location.href = `/services/${srv.id}`;
    } else {
      onBookClick();
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-white border-b border-[#E8EDF1]/60">

      {/* ==============================================================
          1. DESKTOP HERO (Strictly preserved: video background, foggy blend,
             typography, buttons, exactly as requested by user)
         ============================================================== */}
      <div className="hidden md:flex relative min-h-screen lg:min-h-[700px] items-center pt-20 lg:pt-0">

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

        {/* Content Container - Exact Alignment & Style from Reference */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 py-8 sm:py-16 lg:py-24 w-full">
          <div className="max-w-xl text-left space-y-4 sm:space-y-6">

            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E8EDF1] text-neutral-600 shadow-2xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#03B9F4]" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-light text-neutral-500">
                Thamarassery • Kochi, Kerala
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[32px] sm:text-[46px] lg:text-[60px] font-light tracking-[-0.03em] leading-[1.12] text-[#17191C]">
              Your Space. <br />
              <span className="text-[#03B9F4] font-normal">Beautifully Clean.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-light text-[#555B62] leading-[1.65] max-w-lg">
              From homes and offices to upholstered sofas and special occasions, Let's C delivers thoughtful cleaning solutions designed to restore calm, freshness, and order.
            </p>

            {/* Desktop Unified Search & Location Bar */}
            <div className="relative pt-1 max-w-lg">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs p-1.5 focus-within:border-[#03B9F4] focus-within:ring-2 focus-within:ring-sky-100 transition-all">

                {/* Location Picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDesktopLocationOpen(!desktopLocationOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-light cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#03B9F4] stroke-[1.25]" />
                    <span className="font-light text-slate-800">{selectedLocation}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 stroke-[1.25]" />
                  </button>

                  {/* Location Dropdown Menu */}
                  {desktopLocationOpen && (
                    <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                      <span className="text-[10px] uppercase font-light text-slate-400 px-2.5 py-1 block">
                        Select Location
                      </span>
                      {SERVICE_LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setDesktopLocationOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${selectedLocation === loc
                            ? "bg-sky-50 text-[#03B9F4] font-normal"
                            : "text-slate-600 hover:bg-slate-50 font-light"
                            }`}
                        >
                          <span>{loc}</span>
                          {selectedLocation === loc && <Check className="w-3.5 h-3.5 stroke-[1.5]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-6 bg-slate-200 mx-1" />

                {/* Services Search Input */}
                <div className="relative flex-1 flex items-center">
                  <Search className="w-4 h-4 text-slate-400 ml-2 mr-2 shrink-0 stroke-[1.5]" />
                  <input
                    type="text"
                    placeholder="Search for 'Deep Cleaning', 'Sofa', 'Mattress'..."
                    value={desktopSearchQuery}
                    onChange={(e) => setDesktopSearchQuery(e.target.value)}
                    className="w-full text-xs font-light text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  {desktopSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setDesktopSearchQuery("")}
                      className="p-1 text-slate-400 hover:text-slate-600 mr-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search / Book CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (filteredDesktopServices.length > 0) {
                      handleMobileServiceClick(filteredDesktopServices[0].targetTitle);
                    } else {
                      onBookClick();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-normal transition-colors cursor-pointer shrink-0"
                >
                  Search
                </button>
              </div>

              {/* Live Search Suggestions Dropdown */}
              {desktopSearchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 max-h-72 overflow-y-auto animate-in fade-in duration-150">
                  <div className="text-[11px] font-light text-slate-400 px-3 py-1">
                    Matching Services ({filteredDesktopServices.length})
                  </div>
                  {filteredDesktopServices.length > 0 ? (
                    filteredDesktopServices.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => {
                          handleMobileServiceClick(srv.targetTitle);
                          setDesktopSearchQuery("");
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#03B9F4]">
                            <srv.icon className="w-4 h-4 stroke-[1.5]" />
                          </div>
                          <div>
                            <h4 className="text-xs font-normal text-slate-800 group-hover:text-[#03B9F4] transition-colors">
                              {srv.title}
                            </h4>
                            <span className="text-[10px] font-light text-slate-400">Available in {selectedLocation}</span>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-[11px] font-normal text-[#03B9F4] bg-sky-50 rounded-lg group-hover:bg-[#03B9F4] group-hover:text-white transition-colors cursor-pointer">
                          Book Now
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs font-light text-slate-500">
                      No services found for "{desktopSearchQuery}". Try "Deep Cleaning" or "Sofa".
                    </div>
                  )}
                </div>
              )}
            </div>

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

            {/* Action Buttons: Black Book a Cleaning button */}
            <div className="flex flex-row items-center gap-3 pt-2">
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

            {/* Category tags */}
            <div className="pt-6 border-t border-[#E8EDF1]/60 flex flex-wrap items-center gap-6 text-[13px] font-light text-[#666D75]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#03B9F4]" />
                <span>Residential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#03B9F4]" />
                <span>Sofa & Mattress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#03B9F4]" />
                <span>Event Cleaning</span>
              </div>
            </div>

          </div>
        </div>

      </div>


      {/* ==============================================================
          2. MOBILE HERO: HANDYSQUAD STYLE UI (Exact matching visual structure)
             - Location Header + Cart icon
             - Search Bar for cleaning services
             - 3-column rounded App Service Grid with badges
             - Horizontal sliding promo cards ("Book Now")
         ============================================================== */}
      <div className="flex md:hidden flex-col bg-white pt-20 pb-8 px-4 sm:px-5">

        {/* HandySquad Header: Location dropdown (Left) + Cart/Enquiry button (Right) */}
        <div className="flex items-center justify-between mb-4 pt-1">
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-1.5 text-slate-700 font-light text-sm tracking-normal cursor-pointer hover:text-slate-900 transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#03B9F4] stroke-[1.25]" />
            <span className="truncate max-w-[200px] font-light text-slate-800">{selectedLocation}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[1.25]" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-slate-400 active:scale-95 transition-all cursor-pointer relative"
            aria-label="View booking cart or enquiry"
          >
            <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* HandySquad Rounded Pill Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for 'Deep Cleaning', 'Sofa', 'Mattress'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-[#03B9F4] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* HandySquad 4 Core Cleaning Services Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {filteredMobileServices.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileServiceClick(item.targetTitle)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  {/* Rounded square container */}
                  <div className="relative w-full aspect-square rounded-2xl bg-slate-50 border border-slate-100/90 flex items-center justify-center p-2 mb-1.5 group-active:scale-95 group-hover:bg-[#EAF8FF] transition-all">
                    {/* Badge if present */}
                    {item.badge && (
                      <span
                        className={`absolute -top-1.5 right-0.5 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs ${item.badgeColor || "bg-amber-500"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 shadow-2xs flex items-center justify-center text-[#03B9F4] group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title Label (Slim font) */}
                  <span className="text-[10px] sm:text-[11px] font-normal text-slate-800 leading-tight">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* HandySquad Featured Promo Sliding Cards (Carousel) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
              Featured Clean Packages
            </h2>
            <Link href="/services" className="text-xs text-[#03B9F4] font-medium">
              View All →
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">

            {/* Promo Card 1: Villa Deep Cleaning with Let's C Mascot Image Background */}
            <div className="relative min-w-[285px] sm:min-w-[310px] min-h-[175px] snap-center rounded-2xl overflow-hidden text-white p-5 flex flex-col justify-between shadow-md group border border-slate-800/40">
              {/* Background Image: Mascot Crew */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/api/asset?img=penguins"
                  alt="Let's C Cleaning Specialist Crew"
                  fill
                  sizes="(max-width: 640px) 310px, 350px"
                  unoptimized
                  className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
                />
                {/* Multi-layer Dark Foggy Gradient Overlay for high text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/30" />
              </div>

              {/* Text Meta */}
              <div className="relative z-10 space-y-1 mb-4">
                <span className="text-[10px] font-semibold text-[#03B9F4] uppercase tracking-wider block drop-shadow-xs">
                  Most Booked • Thamarassery & Kochi
                </span>
                <h3 className="text-base font-bold leading-snug drop-shadow-sm text-white">
                  Full Villa Deep Sanitization
                </h3>
                <p className="text-xs text-slate-200 font-light drop-shadow-xs">
                  From ₹1,499 • Machine scrubbing & detailing
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleMobileServiceClick("Home Cleaning")}
                className="relative z-10 self-start px-5 py-2 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Book Now
              </button>
            </div>

            {/* Promo Card 2: Sofa & Fabric Extraction with Background Image */}
            <div className="relative min-w-[285px] sm:min-w-[310px] min-h-[175px] snap-center rounded-2xl overflow-hidden text-white p-5 flex flex-col justify-between shadow-md group border border-sky-900/40">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                  alt="Sofa Cleaning Care"
                  fill
                  sizes="(max-width: 640px) 310px, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0755D9]/95 via-[#0755D9]/70 to-[#03B9F4]/40" />
              </div>

              <div className="relative z-10 space-y-1 mb-4">
                <span className="text-[10px] font-semibold text-sky-100 uppercase tracking-wider block drop-shadow-xs">
                  Express Care
                </span>
                <h3 className="text-base font-bold leading-snug drop-shadow-sm text-white">
                  Sofa Shampoo & Revival
                </h3>
                <p className="text-xs text-sky-100 font-light drop-shadow-xs">
                  From ₹699 • High-power stain extraction
                </p>
              </div>

              <button
                onClick={() => handleMobileServiceClick("Sofa Cleaning")}
                className="relative z-10 self-start px-5 py-2 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Book Now
              </button>
            </div>

            {/* Promo Card 3: Mattress & Allergen Extraction with Background Image */}
            <div className="relative min-w-[285px] sm:min-w-[310px] min-h-[175px] snap-center rounded-2xl overflow-hidden text-white p-5 flex flex-col justify-between shadow-md group border border-emerald-900/40">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80"
                  alt="Mattress Sanitization"
                  fill
                  sizes="(max-width: 640px) 310px, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/95 via-[#047857]/70 to-[#10b981]/40" />
              </div>

              <div className="relative z-10 space-y-1 mb-4">
                <span className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider block drop-shadow-xs">
                  Sleep Hygiene
                </span>
                <h3 className="text-base font-bold leading-snug drop-shadow-sm text-white">
                  UV Mattress Sanitization
                </h3>
                <p className="text-xs text-emerald-100 font-light drop-shadow-xs">
                  From ₹799 • Eradicate dust mites & allergens
                </p>
              </div>

              <button
                onClick={() => handleMobileServiceClick("Mattress Cleaning")}
                className="relative z-10 self-start px-5 py-2 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Book Now
              </button>
            </div>

            {/* Promo Card 4: Event & Celebration Clean with Background Image */}
            <div className="relative min-w-[285px] sm:min-w-[310px] min-h-[175px] snap-center rounded-2xl overflow-hidden text-white p-5 flex flex-col justify-between shadow-md group border border-rose-950/40">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Event Cleaning"
                  fill
                  sizes="(max-width: 640px) 310px, 350px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4c0519]/95 via-[#881337]/75 to-[#be123c]/40" />
              </div>

              <div className="relative z-10 space-y-1 mb-4">
                <span className="text-[10px] font-semibold text-rose-200 uppercase tracking-wider block drop-shadow-xs">
                  Celebration Care
                </span>
                <h3 className="text-base font-bold leading-snug drop-shadow-sm text-white">
                  Post-Event & Wedding Care
                </h3>
                <p className="text-xs text-rose-100 font-light drop-shadow-xs">
                  Custom Quote • Rapid banquet & home turnaround
                </p>
              </div>

              <button
                onClick={() => handleMobileServiceClick("Event")}
                className="relative z-10 self-start px-5 py-2 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Book Now
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Location Picker Modal (Mobile) */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          {/* Backdrop dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setLocationModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 pb-28 sm:pb-6 shadow-2xl animate-in slide-in-from-bottom duration-200 z-[101]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#03B9F4] stroke-[1.25]" />
                <h3 className="text-sm font-normal text-slate-800">Select Your Location</h3>
              </div>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[1.25]" />
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {SERVICE_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setLocationModalOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-light flex items-center justify-between transition-colors cursor-pointer ${selectedLocation === loc
                    ? "bg-[#EAF8FF] text-[#03B9F4] font-normal border border-[#03B9F4]/30"
                    : "hover:bg-slate-50 text-slate-700 border border-slate-100"
                    }`}
                >
                  <span className="font-normal">{loc}</span>
                  {selectedLocation === loc && <Check className="w-4 h-4 text-[#03B9F4] stroke-[1.5]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Service Configurator Modal (The Flow) */}
      {configuringService && (
        <ServiceConfiguratorModal
          service={configuringService}
          onClose={() => setConfiguringService(null)}
          onSuccess={onBookClick}
        />
      )}

      {/* Service Details Modal */}
      {selectedServiceModal && (
        <ServiceModal
          service={selectedServiceModal}
          onClose={() => setSelectedServiceModal(null)}
          onSelectForBooking={() => {
            const srv = selectedServiceModal;
            setSelectedServiceModal(null);
            setConfiguringService(srv);
          }}
        />
      )}

    </section>
  );
}
