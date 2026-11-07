"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Check,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CONTACT_INFO, SERVICE_LOCATIONS } from "@/data/cleaningData";

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Booking Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("Thamarassery");
  const [customLocation, setCustomLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("Tomorrow");
  const [customDate, setCustomDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isCartOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Please enter your name";
    if (!phoneNumber.trim()) {
      errs.phoneNumber = "Please enter your phone number";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(phoneNumber.trim())) {
      errs.phoneNumber = "Enter a valid 10-digit number";
    }
    const finalLoc = location === "Other" ? customLocation.trim() : location;
    if (!finalLoc) errs.location = "Please specify your location in Kozhikode";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const finalLoc = location === "Other" ? customLocation.trim() : location;
    const finalDate =
      preferredDate === "Pick Date" && customDate ? customDate : preferredDate;

    // Build formatted WhatsApp message listing all works
    const worksList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.serviceTitle}* — ${item.tierName} (${item.priceDisplay})`
      )
      .join("\n");

    const whatsappMessage = `*NEW BOOKING ENQUIRY — LET'S C*
━━━━━━━━━━━━━━━━━━━
📋 *SELECTED WORKS (${cartItems.length}):*
${worksList}

💵 *Estimated Total:* ₹${totalPrice.toLocaleString("en-IN")}
📅 *Preferred Date:* ${finalDate}
📍 *Service Location:* ${finalLoc}

👤 *Customer Name:* ${fullName}
📞 *Phone Number:* ${phoneNumber}
${notes ? `📝 *Notes:* ${notes}\n` : ""}━━━━━━━━━━━━━━━━━━━
Sent via Let's C Website`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
      window.open(whatsappUrl, "_blank");
    }, 300);
  };

  const handleCloseAndReset = () => {
    if (bookingConfirmed) {
      clearCart();
      setBookingConfirmed(false);
    }
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={handleCloseAndReset}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-base font-normal text-slate-900 tracking-tight">
                Your Booking Cart
              </h2>
              <p className="text-[11px] text-slate-500 font-light">
                {totalCount} {totalCount === 1 ? "service selected" : "services selected"}
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Confirmation View */}
          {bookingConfirmed ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-light text-slate-900 tracking-tight">
                Booking Submitted!
              </h3>
              <p className="text-xs text-slate-500 font-light max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. WhatsApp has opened with your booking summary. Our coordinator will confirm your time slot shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleCloseAndReset}
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-normal transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
              </div>
              <h3 className="text-base font-light text-slate-800">
                Your Cart is Empty
              </h3>
              <p className="text-xs text-slate-500 font-light max-w-xs mx-auto">
                Select from our cleaning services and add the required package to proceed with your booking.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-black transition-colors"
                >
                  Browse Services
                </button>
              </div>
            </div>
          ) : (
            /* Cart Items List & Booking Form */
            <>
              {/* Selected Services List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400">
                    Selected Services ({cartItems.length})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-rose-500 font-light transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#FBFBFD] border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60">
                          <Image
                            src={item.image}
                            alt={item.serviceTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-normal text-slate-900 leading-snug">
                            {item.serviceTitle}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-light block">
                            {item.tierName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-light flex items-center gap-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-normal text-slate-900">
                          {item.priceDisplay}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label={`Remove ${item.serviceTitle}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Estimate Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-light">
                    Estimated Total
                  </span>
                  <span className="text-xs text-slate-500 font-light">
                    Includes machinery, detergents & bio-solutions
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-normal text-slate-900">
                    {totalPrice > 0 ? `₹${totalPrice.toLocaleString("en-IN")}` : "Custom Quote"}
                  </span>
                </div>
              </div>

              {/* Integrated Booking Contact Form */}
              <form onSubmit={handleSubmitBooking} className="space-y-4 pt-2">
                <div className="pb-1 border-b border-slate-100">
                  <span className="text-[10px] font-normal uppercase tracking-wider text-[#03B9F4] block mb-0.5">
                    Step 2
                  </span>
                  <h3 className="text-sm font-normal text-slate-900">
                    Contact & Scheduling Details
                  </h3>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-light text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Menon"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                      errors.fullName
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#03B9F4]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-light text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 98470 12345"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                      errors.phoneNumber
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#03B9F4]"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[11px] font-light text-slate-700 uppercase tracking-wider mb-1">
                    Location in Kozhikode *
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#03B9F4]"
                  >
                    {SERVICE_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    <option value="Other">Other Location in Kozhikode</option>
                  </select>
                  {location === "Other" && (
                    <input
                      type="text"
                      placeholder="Specify your area or town..."
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#03B9F4]"
                    />
                  )}
                  {errors.location && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Date Preference */}
                <div>
                  <label className="block text-[11px] font-light text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Service Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Today", "Tomorrow", "Pick Date"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPreferredDate(opt)}
                        className={`py-2 px-3 rounded-xl text-xs font-light border text-center transition-all cursor-pointer ${
                          preferredDate === opt
                            ? "bg-slate-900 text-white border-slate-900 font-normal"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {preferredDate === "Pick Date" && (
                    <input
                      type="date"
                      value={customDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#03B9F4]"
                    />
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-light text-slate-700 uppercase tracking-wider mb-1">
                    Special Instructions <span className="text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific stain concerns, timing or directions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4] resize-none"
                  />
                </div>

                {/* Reassurance */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-light">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero cancellation fee • Pay safely after satisfactory service handover</span>
                </div>

                {/* Submit Booking Button */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-black active:scale-98 text-white text-xs font-normal transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isSubmitting ? "Connecting..." : "Submit Booking (WhatsApp)"}</span>
                  </button>

                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                    className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#03B9F4]" />
                    <span>Or Call Us Directly</span>
                  </a>
                </div>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

