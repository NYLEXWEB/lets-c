"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare, MapPin, ChevronDown, Check, ShoppingBag, Search } from "lucide-react";
import { CONTACT_INFO, SERVICE_LOCATIONS } from "@/data/cleaningData";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const pathname = usePathname();
  const { totalCount, setIsCartOpen } = useCart();
  const isHomePage = pathname === "/";
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Location State
  const [selectedLocation, setSelectedLocation] = useState<string>("Thamarassery");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector("#hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setIsPastHero(heroBottom <= 70);
      } else {
        setIsPastHero(window.scrollY > 200);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Why Us", href: "/#why-us" },
    { name: "Before & After", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  const handleBookingAction = () => {
    setMobileMenuOpen(false);
    if (totalCount > 0) {
      setIsCartOpen(true);
      return;
    }
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.querySelector("#booking");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/contact#booking";
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHomePage && !isPastHero && !mobileMenuOpen
        ? "bg-transparent border-b border-transparent py-3 md:py-4"
        : isPastHero && isHomePage
          ? "md:-translate-y-full md:opacity-0 md:pointer-events-none bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
        }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative flex items-center justify-between gap-4">

          {/* Left: Brand Logo + Location Selector */}
          <div className="flex items-center gap-3.5 shrink-0 z-10">
            <Link href="/" className="flex items-center gap-2 group py-1 shrink-0" aria-label="Let's C Cleaning Services Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand-logo.png"
                alt="Let's C - Beyond Cleaning"
                className="h-8 sm:h-8.5 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105 select-none"
                loading="eager"
              />
            </Link>

            {/* Location Selector (Desktop) */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/90 bg-white/80 hover:bg-white text-slate-700 text-xs font-light transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#03B9F4] stroke-[1.25]" />
                <span className="font-light text-slate-700">{selectedLocation}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 stroke-[1.25]" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-light text-slate-400 px-2.5 py-1 block">
                    Select Location
                  </span>
                  {SERVICE_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setLocationDropdownOpen(false);
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
          </div>

          {/* Center: Desktop Navigation (Centered) */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] lg:text-[13.5px] font-normal text-neutral-700 hover:text-black transition-colors duration-150 tracking-[-0.01em]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section: Call + WhatsApp + Cart + Enquiry Now button (Right Aligned) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 ml-auto z-10">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="text-[13px] font-medium text-slate-700 hover:text-[#03B9F4] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100/70"
            >
              <Phone className="w-3.5 h-3.5 text-[#03B9F4]" />
              <span>Call Us</span>
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                CONTACT_INFO.whatsappMessageDefault
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>WhatsApp</span>
            </a>

            {/* Desktop Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              title="View Booking Cart"
              aria-label="View Booking Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={handleBookingAction}
              className="px-4.5 py-2 rounded-full bg-black hover:bg-neutral-800 text-white text-[13px] font-medium transition-colors duration-200 cursor-pointer shadow-xs tracking-[-0.01em]"
            >
              Enquiry Now
            </button>
          </div>

          {/* Mobile Right Quick Action: Quick Call + Cart + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="p-2 rounded-full bg-sky-50 text-[#0755D9] border border-sky-200/80"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full border border-slate-200 text-slate-700 relative"
              aria-label="Booking Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={handleBookingAction}
              className="px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-medium shadow-2xs"
            >
              Enquiry
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-800 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-6 py-5 animate-in fade-in duration-200 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-normal text-slate-700 py-1.5 hover:text-black"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                className="py-2.5 rounded-xl bg-slate-50 text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-[#03B9F4]" />
                <span>Call Directly</span>
              </a>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                  CONTACT_INFO.whatsappMessageDefault
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium flex items-center justify-center gap-1.5 border border-emerald-200"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleBookingAction}
              className="w-full py-3 rounded-full bg-black text-white text-xs font-medium text-center shadow-xs"
            >
              Submit Quick Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
