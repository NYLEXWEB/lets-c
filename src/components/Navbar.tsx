"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { CONTACT_INFO } from "@/data/cleaningData";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector("#hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        // When hero bottom reaches top navigation area
        setIsPastHero(heroBottom <= 70);
      } else {
        setIsPastHero(window.scrollY > 600);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Philosophy", href: "#why-us" },
    { name: "Process", href: "#process" },
    { name: "Before & After", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookingAction = () => {
    setMobileMenuOpen(false);
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.querySelector("#booking");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isPastHero
          ? "md:-translate-y-full md:opacity-0 md:pointer-events-none bg-[#FBFBFD]/95 backdrop-blur-md border-b border-black/[0.08] shadow-xs py-3"
          : mobileMenuOpen
            ? "bg-[#FBFBFD] border-b border-black/[0.06] py-3 md:bg-transparent md:border-transparent md:py-4"
            : "bg-transparent border-b border-transparent py-3 md:py-4"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo - Minimalist, Transparent & Compact */}
          <Link href="#hero" className="flex items-center group py-1" aria-label="Let's C Cleaning Services Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-logo.png"
              alt="Let's C - Beyond Cleaning"
              className="h-8 sm:h-8.5 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105 select-none"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation - Ultra Slim Apple Typography (Transparent inside hero) */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[13px] font-normal text-neutral-700 hover:text-black transition-colors duration-150 tracking-[-0.01em]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Subtle WhatsApp link + Matte Black Pill Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                CONTACT_INFO.whatsappMessageDefault
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-normal text-neutral-700 hover:text-[#03B9F4] transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </a>

            <button
              onClick={handleBookingAction}
              className="px-4 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white text-[13px] font-normal transition-colors duration-200 cursor-pointer shadow-2xs tracking-[-0.01em]"
            >
              Book Service
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleBookingAction}
              className="px-3 py-1 rounded-full bg-black text-white text-[12px] font-normal shadow-2xs"
            >
              Book
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FBFBFD] border-b border-black/[0.08] px-6 py-5 animate-in fade-in duration-200 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block text-sm font-normal text-neutral-700 py-1.5 hover:text-black"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                CONTACT_INFO.whatsappMessageDefault
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-normal text-neutral-600 hover:text-black flex items-center justify-between py-1"
            >
              <span>WhatsApp Inquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
            <button
              onClick={handleBookingAction}
              className="w-full py-2.5 rounded-full bg-black text-white text-xs font-normal text-center shadow-xs"
            >
              Book Service
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
