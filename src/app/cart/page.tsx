"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Calendar as CalendarIcon,
  Phone,
  MessageSquare,
  ShieldCheck,
  Lock,
  ArrowLeft,
  ShoppingBag,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CONTACT_INFO, SERVICE_LOCATIONS } from "@/data/cleaningData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  // Form states matching Screenshot 2 (media_1794082993623_8cc29f6f.jpg)
  const [salutation, setSalutation] = useState("Mr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("Thamarassery");
  const [customLocation, setCustomLocation] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!firstName.trim()) errs.firstName = "Please enter your first name";
    if (!bookingDate) errs.bookingDate = "Please choose a preferred date";
    if (!phoneNumber.trim()) {
      errs.phoneNumber = "Please enter your phone number";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(phoneNumber.trim())) {
      errs.phoneNumber = "Enter a valid 10-digit number";
    }
    const finalLoc = location === "Other" ? customLocation.trim() : location;
    if (!finalLoc) errs.location = "Please enter your location";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!validate()) return;
    setIsSubmitting(true);

    const finalLoc = location === "Other" ? customLocation.trim() : location;
    const fullName = `${salutation} ${firstName.trim()} ${lastName.trim()}`.trim();

    // Formatted WhatsApp message matching Let's C booking desk
    const worksList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.serviceTitle}* — ${item.tierName} (Qty: ${item.quantity}) • ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const whatsappMessage = `*NEW BOOKING CONFIRMATION — LET'S C*
━━━━━━━━━━━━━━━━━━━
📋 *SERVICES IN CART (${totalCount}):*
${worksList}

💵 *Total Amount:* ₹${totalPrice.toLocaleString("en-IN")}
📅 *Preferred Date:* ${bookingDate}
📍 *Service Location:* ${finalLoc}

👤 *Customer:* ${fullName}
📞 *Phone Number:* +91 ${phoneNumber}
${emailAddress ? `📧 *Email:* ${emailAddress}\n` : ""}${
      message ? `📝 *Message:* ${message}\n` : ""
    }━━━━━━━━━━━━━━━━━━━
Sent via Let's C Website`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
      window.open(whatsappUrl, "_blank");
    }, 400);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFBFD] text-slate-900 pb-20 md:pb-12 selection:bg-[#03B9F4] selection:text-white">
      <Navbar />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        
        {/* Top Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-black transition-colors font-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing Services</span>
          </Link>
        </div>

        {bookingConfirmed ? (
          /* Confirmation Success View */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
              Booking Request Submitted!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Thank you, <strong>{salutation} {firstName}</strong>. WhatsApp has opened with your service details. Our Thamarassery coordinator will verify the timing and assign our specialist team.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  clearCart();
                  window.location.href = "/";
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-normal transition-colors"
              >
                Back to Home
              </button>

              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-light transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#03B9F4]" />
                <span>Call Coordinator</span>
              </a>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-10 sm:p-16 text-center max-w-md mx-auto shadow-2xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
            </div>
            <h2 className="text-xl font-light text-slate-800 tracking-tight">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              You haven't selected any cleaning services yet. Browse our residential, sofa, mattress, or event packages to book.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-black transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        ) : (
          /* Main 2-Column Checkout Workflow (Matching Screenshot 2) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ==============================================================
                LEFT COLUMN: BOOKING CONTACT FORM (Matching Screenshot 2)
               ============================================================== */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
              
              {/* Trust Tagline strip */}
              <div className="flex items-center gap-4 text-xs font-light text-slate-500 pb-3 border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <Check className="w-3.5 h-3.5" />
                  Verified professionals
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <Check className="w-3.5 h-3.5" />
                  Transparent pricing
                </span>
              </div>

              <form onSubmit={handleConfirmBooking} className="space-y-4 sm:space-y-5">
                
                {/* 1. Salutation & Name Row */}
                <div>
                  <div className="grid grid-cols-12 gap-3">
                    {/* Salutation */}
                    <div className="col-span-4 sm:col-span-3">
                      <label className="block text-xs font-normal text-slate-700 mb-1.5">
                        Salutation *
                      </label>
                      <select
                        value={salutation}
                        onChange={(e) => setSalutation(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#03B9F4]"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>

                    {/* First Name */}
                    <div className="col-span-8 sm:col-span-5">
                      <label className="block text-xs font-normal text-slate-700 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.firstName
                            ? "border-rose-400 bg-rose-50/20"
                            : "border-slate-200 focus:border-[#03B9F4]"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-[10px] text-rose-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="col-span-12 sm:col-span-4">
                      <label className="block text-xs font-normal text-slate-700 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Choose Date */}
                <div>
                  <label className="block text-xs font-normal text-slate-700 mb-1.5">
                    Choose Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none transition-colors ${
                        errors.bookingDate
                          ? "border-rose-400 bg-rose-50/20"
                          : "border-slate-200 focus:border-[#03B9F4]"
                      }`}
                    />
                    <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.bookingDate && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.bookingDate}</p>
                  )}
                </div>

                {/* 3. Phone Number with India Flag */}
                <div>
                  <label className="block text-xs font-normal text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-[#03B9F4] transition-colors">
                    <div className="px-3 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-xs text-slate-600 select-none">
                      <span className="text-sm">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-white"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* 4. Location in Kozhikode */}
                <div>
                  <label className="block text-xs font-normal text-slate-700 mb-1.5">
                    Service Location in Kozhikode *
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
                      placeholder="Specify your town or village..."
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#03B9F4]"
                    />
                  )}
                  {errors.location && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.location}</p>
                  )}
                </div>

                {/* 5. Email Address */}
                <div>
                  <label className="block text-xs font-normal text-slate-700 mb-1.5">
                    Email Address <span className="text-slate-400 font-light">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4]"
                  />
                </div>

                {/* 6. Message / Note */}
                <div>
                  <label className="block text-xs font-normal text-slate-700 mb-1.5">
                    Message <span className="text-slate-400 font-light">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Have a note for us? Type it here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4] resize-none"
                  />
                </div>

                {/* Confirm Booking Pill Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-black active:scale-98 text-white text-xs sm:text-sm font-normal transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isSubmitting ? "Connecting to WhatsApp..." : "Confirm Booking"}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* ==============================================================
                RIGHT COLUMN: CART SUMMARY & WHY LET'S C (Matching Screenshot 2)
               ============================================================== */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Selected Items Card with Stepper */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-normal text-slate-900">
                    Selected Services ({totalCount})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-rose-500 font-light"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <h4 className="text-xs font-normal text-slate-900 leading-snug">
                          {item.tierName}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-light block">
                          {item.serviceTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Stepper [- 1 +] */}
                        <div className="inline-flex items-center rounded-lg border border-[#03B9F4]/40 bg-[#EAF8FF]/50 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(item.id)}
                            className="px-2.5 py-1 text-xs text-[#0755D9] hover:bg-[#03B9F4]/20 transition-colors cursor-pointer select-none"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2 text-xs font-medium text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.id)}
                            className="px-2.5 py-1 text-xs text-[#0755D9] hover:bg-[#03B9F4]/20 transition-colors cursor-pointer select-none"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-normal text-slate-900 w-16 text-right">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary Box (Matching Screenshot 2) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3">
                <h3 className="text-sm font-normal text-slate-900 pb-2 border-b border-slate-100">
                  Payment summary
                </h3>

                <div className="flex items-center justify-between text-xs font-light text-slate-600">
                  <span>Item total</span>
                  <span className="text-slate-900 font-normal">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-normal text-slate-900">Total amount</span>
                  <span className="font-normal text-slate-900">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Why Book with Let's C? (Matching Screenshot 2) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3">
                <h3 className="text-sm font-normal text-slate-900">
                  Why book with Let's C?
                </h3>

                <ul className="space-y-2 text-xs text-slate-600 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified cleaning specialists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Transparent pricing (zero hidden surcharges)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dedicated service support in Kozhikode</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Trusted by verified homeowners across Kerala</span>
                  </li>
                </ul>

                {/* Security Box */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 flex items-start gap-2.5 text-[11px] text-emerald-800 font-light mt-3">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Your booking details are handled securely and used to coordinate your service.
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </main>
  );
}
