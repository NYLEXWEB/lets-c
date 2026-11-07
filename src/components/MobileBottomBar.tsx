"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Mail, PhoneCall, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MobileBottomBarProps {
  onEnquiryClick?: () => void;
}

export default function MobileBottomBar({ onEnquiryClick }: MobileBottomBarProps) {
  const pathname = usePathname();
  const { totalCount, setIsCartOpen } = useCart();

  const isHome = pathname === "/";
  const isServices = pathname === "/services";
  const isContact = pathname === "/contact";

  const handleEnquiry = () => {
    if (totalCount > 0) {
      setIsCartOpen(true);
      return;
    }
    if (onEnquiryClick) {
      onEnquiryClick();
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
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black text-white py-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-4 items-center text-center">

        {/* 1. HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isHome ? "text-[#03B9F4]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${isHome ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] font-bold tracking-wider uppercase">Home</span>
        </Link>

        {/* 2. SERVICES */}
        <Link
          href="/services"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isServices ? "text-[#03B9F4]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <Calendar className={`w-5 h-5 mb-0.5 ${isServices ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] font-bold tracking-wider uppercase">Services</span>
        </Link>

        {/* 3. CONTACT */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isContact ? "text-[#03B9F4]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <Mail className={`w-5 h-5 mb-0.5 ${isContact ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] font-bold tracking-wider uppercase">Contact</span>
        </Link>

        {/* 4. ENQUIRE / CART */}
        <button
          onClick={handleEnquiry}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-[#03B9F4] transition-colors cursor-pointer relative"
        >
          {totalCount > 0 ? (
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-0.5 stroke-[2] text-[#03B9F4]" />
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            </div>
          ) : (
            <PhoneCall className="w-5 h-5 mb-0.5 stroke-[1.75]" />
          )}
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {totalCount > 0 ? "Cart" : "Enquire"}
          </span>
        </button>

      </div>
    </div>
  );
}
