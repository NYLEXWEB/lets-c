"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check, X, ShieldCheck, Phone, MessageSquare, Send, Sparkles } from "lucide-react";
import { CONTACT_INFO, SERVICES_DATA } from "@/data/cleaningData";

interface BookingFormProps {
  initialService?: string;
}

export default function BookingForm({ initialService }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: initialService || "Home Cleaning",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.service) newErrors.service = "Please select a service.";
    if (!formData.location.trim()) newErrors.location = "Please enter your location (Thamarassery or Kochi).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const whatsappText = `*NEW CLEANING ENQUIRY — LET'S C*
--------------------------------
👤 *Full Name:* ${formData.fullName}
📞 *Phone Number:* ${formData.phone}
🧹 *Service Required:* ${formData.service}
📍 *Location:* ${formData.location}
${formData.message ? `📝 *Message:* ${formData.message}\n` : ""}--------------------------------
Sent via Let's C Website`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(whatsappUrl, "_blank");
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phone: "",
      service: "Home Cleaning",
      location: "",
      message: "",
    });
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#03B9F4] bg-[#EAF8FF] px-3.5 py-1 rounded-full border border-sky-100 inline-block">
            Instant Enquiry
          </span>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#17191C] tracking-tight">
            Request a Free Cleaning Quote
          </h2>
          <p className="text-sm text-[#64748B] font-light leading-relaxed">
            Fill in the details below. Our Thamarassery coordinator will respond within 15 minutes with availability and pricing.
          </p>
        </div>

        {/* Lead Capture Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Row 1: Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Menon"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${errors.fullName
                      ? "border-rose-300 bg-rose-50/20"
                      : "border-slate-200 focus:border-[#03B9F4] focus:ring-2 focus:ring-sky-100"
                    }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98470 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${errors.phone
                      ? "border-rose-300 bg-rose-50/20"
                      : "border-slate-200 focus:border-[#03B9F4] focus:ring-2 focus:ring-sky-100"
                    }`}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Row 2: Service Required & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Service Required *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#03B9F4] focus:ring-2 focus:ring-sky-100 transition-colors"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.estimate})
                    </option>
                  ))}
                  <option value="Commercial / Villa Inspection">Commercial / Villa Inspection</option>
                  <option value="Other Cleaning Enquiry">Other Cleaning Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Location (Thamarassery / Kochi) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thamarassery or Kochi"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${errors.location
                      ? "border-rose-300 bg-rose-50/20"
                      : "border-slate-200 focus:border-[#03B9F4] focus:ring-2 focus:ring-sky-100"
                    }`}
                />
                {errors.location && (
                  <p className="text-xs text-rose-500 mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Row 3: Message / Specific Requirements */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Message / Details <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Mention number of rooms, sofa seats, preferred timing or specific cleaning requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4] focus:ring-2 focus:ring-sky-100 transition-colors resize-none"
              />
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-6 rounded-full bg-black hover:bg-neutral-800 text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Preparing Enquiry..." : "Submit Enquiry (WhatsApp)"}</span>
              </button>

              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                className="py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#03B9F4]" />
                <span>Call Directly</span>
              </a>
            </div>

            {/* Reassurance */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Zero cancellation fee • Pay safely after inspection</span>
            </div>

          </form>
        </div>

      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={handleReset} />

          <div className="relative bg-white rounded-3xl p-7 max-w-sm w-full text-center z-10 border border-black/[0.08] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <h3 className="text-lg font-normal text-black mb-1">
              Enquiry Form Ready!
            </h3>

            <p className="text-xs text-[#6E6E73] font-light leading-relaxed mb-5">
              Thank you, <strong>{formData.fullName}</strong>. WhatsApp has opened with your enquiry for <strong>{formData.service}</strong> in <strong>{formData.location}</strong>.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-full bg-black text-white text-xs font-normal hover:bg-neutral-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
