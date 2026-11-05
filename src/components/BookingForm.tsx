"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { CONTACT_INFO, SERVICES_DATA } from "@/data/cleaningData";

interface BookingFormProps {
  initialService?: string;
}

export default function BookingForm({ initialService }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: initialService || "Home Cleaning",
    preferredDate: "",
    preferredTime: "Morning (9:00 AM – 1:00 PM)",
    location: "",
    notes: "",
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
    if (!formData.fullName.trim()) newErrors.fullName = "Please enter your name.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your contact number.";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Valid 10-digit number required.";
    }
    if (!formData.preferredDate) newErrors.preferredDate = "Select a date.";
    if (!formData.location.trim()) newErrors.location = "Specify your area (e.g. Thamarassery).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const message = `*LET'S C — CLEANING BOOKING*
--------------------------------
👤 *Name:* ${formData.fullName}
📞 *Phone:* ${formData.phone}
${formData.email ? `✉️ *Email:* ${formData.email}\n` : ""}🧹 *Service:* ${formData.service}
📅 *Date:* ${formData.preferredDate}
⏰ *Time:* ${formData.preferredTime}
📍 *Location:* ${formData.location}
${formData.notes ? `📝 *Notes:* ${formData.notes}\n` : ""}--------------------------------
Sent via letsc-cleaning.com`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      service: "Home Cleaning",
      preferredDate: "",
      preferredTime: "Morning (9:00 AM – 1:00 PM)",
      location: "",
      notes: "",
    });
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-[#FBFBFD] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] font-normal text-[#03B9F4] block">
            Reservation
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-[-0.03em]">
            Schedule Your Visit
          </h2>
          <p className="text-base text-[#6E6E73] font-light leading-relaxed">
            Fill out your details to lock in a dedicated cleaning crew in Kozhikode.
          </p>
        </div>

        {/* Minimalist Form Card */}
        <div className="apple-card p-8 sm:p-12 rounded-3xl bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Menon"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors ${
                    errors.fullName
                      ? "border-rose-300 bg-rose-50/20"
                      : "border-black/[0.08] focus:border-black"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1 font-light">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98470 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-rose-300 bg-rose-50/20"
                      : "border-black/[0.08] focus:border-black"
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1 font-light">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Service & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                  Service Selection *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-xs text-neutral-900 bg-white focus:outline-none focus:border-black transition-colors"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.estimate})
                    </option>
                  ))}
                  <option value="Villa / Commercial Inspection">Custom Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                  Email Address <span className="text-neutral-400 font-light">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                >
                </input>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs text-neutral-900 focus:outline-none transition-colors ${
                    errors.preferredDate
                      ? "border-rose-300 bg-rose-50/20"
                      : "border-black/[0.08] focus:border-black"
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-[11px] text-rose-500 mt-1 font-light">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-xs text-neutral-900 bg-white focus:outline-none focus:border-black transition-colors"
                >
                  <option value="Morning (9:00 AM – 1:00 PM)">Morning (9:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                  <option value="Evening (4:00 PM – 7:30 PM)">Evening (4:00 PM – 7:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                Address / Locality in Kozhikode *
              </label>
              <input
                type="text"
                placeholder="e.g. Thamarassery, Koduvally, Balussery, or Kozhikode"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors ${
                  errors.location
                    ? "border-rose-300 bg-rose-50/20"
                    : "border-black/[0.08] focus:border-black"
                }`}
              />
              {errors.location && (
                <p className="text-[11px] text-rose-500 mt-1 font-light">{errors.location}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-normal text-neutral-400 mb-2">
                Special Instructions <span className="text-neutral-400 font-light">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Specific room count, carpet stain focus, balcony requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#03B9F4]" />
                <span>Zero advance deposit. Pay after satisfaction.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-normal transition-colors cursor-pointer disabled:opacity-50 tracking-[-0.01em]"
              >
                {isSubmitting ? "Processing..." : "Submit & Open WhatsApp"}
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={handleReset} />
          
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center z-10 border border-black/[0.08] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-20 h-24 mx-auto mb-4 rounded-xl overflow-hidden bg-[#F5F9FC]">
              <Image
                src="/images/mascot.jpg"
                alt="Let's C Mascot"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-lg font-normal text-black mb-1 tracking-[-0.015em]">
              Request Received
            </h3>

            <p className="text-xs text-[#6E6E73] font-light leading-relaxed mb-6">
              Thank you, <strong>{formData.fullName}</strong>. WhatsApp has been opened with your booking summary for <strong>{formData.service}</strong>.
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
