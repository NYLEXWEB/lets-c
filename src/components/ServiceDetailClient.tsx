"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  Check,
  Share2,
  Phone,
  ShieldCheck,
  ArrowLeft,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  Info,
  CheckCircle2
} from "lucide-react";
import { ServiceItem, ServiceTier, CONTACT_INFO } from "@/data/cleaningData";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

interface ServiceDetailClientProps {
  service: ServiceItem;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    getItemQuantity,
    totalCount,
    totalPrice,
  } = useCart();

  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  // Share handler
  const handleShare = async () => {
    const url = typeof window !== "undefined"
      ? window.location.href
      : `https://letsc-cleaning.com/services/${service.id}`;

    const shareData = {
      title: `${service.title} | Let's C Cleaning`,
      text: `Check out ${service.title} by Let's C Cleaning in Kozhikode (${service.estimate}, 4.9★ rating).`,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (e) {
        // Dismissed
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
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

  const toggleTierDetails = (tierId: string) => {
    setExpandedTier((prev) => (prev === tierId ? null : tierId));
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFBFD] text-slate-900 pb-20 md:pb-12 selection:bg-[#03B9F4] selection:text-white">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        
        {/* Top Breadcrumb & Share */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-black transition-colors font-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-light text-slate-700 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            {copiedShare ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-normal">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Page Title & Google Star Rating Header (Matching Screenshot 1) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8 pb-3 border-b border-slate-200/60">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-slate-900 tracking-tight">
            {service.title} in Kozhikode
          </h1>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-light">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-normal text-slate-900">{service.rating}</span>
            <span className="text-slate-400 text-xs">
              ({service.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Two-Column Layout (Matching Screenshot 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==============================================================
              LEFT COLUMN: SERVICES LIST & ABOUT SECTION (Matching Screenshot 1)
             ============================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Packages Box */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-6">
              <h2 className="text-lg font-normal text-slate-900 pb-2 border-b border-slate-100">
                {service.title} Packages
              </h2>

              <div className="space-y-6">
                {service.tiers.map((tier) => {
                  const cartItemId = `${service.id}-${tier.id}`;
                  const quantity = getItemQuantity(cartItemId);
                  const isExpanded = expandedTier === tier.id;

                  return (
                    <div
                      key={tier.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      {/* Left: Title, Rating, Starts at, View details */}
                      <div className="space-y-1 sm:max-w-md">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-normal text-slate-900 leading-snug">
                            {tier.name}
                          </h3>
                          {tier.isPopular && (
                            <span className="text-[9px] font-normal uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-light">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>4.9 (18 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="text-xs font-light text-slate-600 pt-0.5">
                          <span>Starts at </span>
                          <strong className="font-normal text-slate-900">
                            {tier.priceDisplay}
                          </strong>
                        </div>

                        {/* View details link */}
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleTierDetails(tier.id)}
                            className="inline-flex items-center gap-1 text-xs text-[#03B9F4] hover:text-[#0755D9] font-normal pt-1 cursor-pointer transition-colors"
                          >
                            <span>View details</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <span>→</span>
                            )}
                          </button>

                          {/* Expanded Details preview */}
                          {isExpanded && (
                            <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 font-light space-y-1.5 animate-in fade-in duration-150">
                              <p>{tier.description}</p>
                              <div className="flex items-center gap-1 text-slate-400 text-[11px] pt-1">
                                <Clock className="w-3 h-3" />
                                <span>Estimated time: {tier.duration}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Service Image + Add / Stepper Button (Matching Screenshot 1) */}
                      <div className="flex flex-col items-center sm:items-end gap-2.5 shrink-0 self-start sm:self-center">
                        <div className="relative w-28 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-2xs">
                          <Image
                            src={service.image}
                            alt={tier.name}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </div>

                        {/* Add / Stepper Button */}
                        {quantity === 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              addToCart({
                                id: cartItemId,
                                serviceId: service.id,
                                serviceTitle: service.title,
                                tierId: tier.id,
                                tierName: tier.name,
                                price: tier.price,
                                priceDisplay: tier.priceDisplay,
                                duration: tier.duration,
                                image: service.image,
                              })
                            }
                            className="w-24 sm:w-28 py-1.5 rounded-lg border border-[#03B9F4] text-[#03B9F4] hover:bg-[#EAF8FF] font-medium text-xs transition-colors cursor-pointer text-center bg-white shadow-2xs"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="w-24 sm:w-28 flex items-center justify-between rounded-lg border border-[#03B9F4] bg-[#EAF8FF] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(cartItemId)}
                              className="px-2.5 py-1 text-xs text-[#0755D9] hover:bg-[#03B9F4]/20 transition-colors cursor-pointer select-none font-bold"
                              aria-label="Decrease"
                            >
                              −
                            </button>
                            <span className="text-xs font-semibold text-slate-900">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementQuantity(cartItemId)}
                              className="px-2.5 py-1 text-xs text-[#0755D9] hover:bg-[#03B9F4]/20 transition-colors cursor-pointer select-none font-bold"
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* About Section (Matching Screenshot 1) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
              <h2 className="text-base sm:text-lg font-normal text-slate-900">
                About Let's C's {service.title} in Kozhikode
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                {service.shortDesc} Specially engineered for Kerala's coastal climate, borewell mineral deposits, and high-humidity mold prevention. We deploy background-checked, uniformed crews equipped with rotary scrubbing machines and eco-friendly bio solutions.
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-normal text-slate-900 block">
                  Included in Every Visit:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-light">
                  {service.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#03B9F4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-light">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero advance deposit. Pay safely after inspection sign-off.</span>
              </div>
            </div>

          </div>

          {/* ==============================================================
              RIGHT COLUMN: STICKY CART & WHY LET'S C (Matching Screenshot 1)
             ============================================================== */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            
            {/* 1. Cart Card (Matching Screenshot 1) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-normal text-slate-900 pb-2 border-b border-slate-100">
                Cart
              </h3>

              {cartItems.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 font-light">
                  No items in cart yet. Click &quot;Add&quot; on any package to begin.
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-normal text-slate-900 block leading-tight">
                            {item.tierName}
                          </span>
                          <span className="text-[11px] text-[#03B9F4] hover:underline font-light cursor-pointer block mt-0.5">
                            Edit
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {/* Stepper [- 1 +] */}
                          <div className="inline-flex items-center rounded-lg border border-[#03B9F4]/40 bg-[#EAF8FF] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(item.id)}
                              className="px-2 py-0.5 text-xs text-[#0755D9] hover:bg-[#03B9F4]/20 font-bold cursor-pointer select-none"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-1.5 text-xs font-semibold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementQuantity(item.id)}
                              className="px-2 py-0.5 text-xs text-[#0755D9] hover:bg-[#03B9F4]/20 font-bold cursor-pointer select-none"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-normal text-slate-900 text-right w-14">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total & View Cart Button (Matching Screenshot 1) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-semibold text-slate-900 block">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <Link
                      href="/cart"
                      className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-medium transition-colors shadow-2xs"
                    >
                      View Cart
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* 2. Why Let's C? Card (Matching Screenshot 1) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
              <h3 className="text-sm font-semibold text-slate-900">
                Why Let&apos;s C?
              </h3>

              <ul className="space-y-2.5 text-xs text-slate-600 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Certified Cleaning Professionals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3-Layer Background Verification</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>In-House Teams Only (No Freelancers)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supervisor-Led Quality Control</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Built for Kerala Climate & Hard Water</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Satisfaction Handover Guarantee</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Bottom Bar on Mobile when Cart has items */}
      {totalCount > 0 && (
        <div className="fixed bottom-16 sm:bottom-6 left-0 right-0 z-40 px-4 flex justify-center lg:hidden animate-in slide-in-from-bottom duration-200">
          <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-full shadow-2xl border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-7 h-7 rounded-full bg-[#03B9F4] text-white flex items-center justify-center text-xs font-bold">
                {totalCount}
              </div>
              <div className="leading-tight">
                <span className="text-xs font-normal block">
                  {totalCount} {totalCount === 1 ? "work added" : "works added"}
                </span>
                <span className="text-[11px] text-slate-300 font-light">
                  Total: ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Link
              href="/cart"
              className="px-5 py-2 rounded-full bg-white text-slate-900 text-xs font-normal hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
            >
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </main>
  );
}
