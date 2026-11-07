"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  Info
} from "lucide-react";
import {
  ServiceItem,
  ServiceTier,
  ServiceAddon,
  CONTACT_INFO,
  SERVICE_LOCATIONS
} from "@/data/cleaningData";

interface ServiceConfiguratorModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ServiceConfiguratorModal({
  service,
  onClose,
  onSuccess,
}: ServiceConfiguratorModalProps) {
  if (!service) return null;

  // Selected State
  const defaultTier =
    service.tiers.find((t) => t.isPopular) || service.tiers[0] || null;

  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
    service.propertyTypes ? service.propertyTypes[0] : ""
  );
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(defaultTier);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDateOption, setSelectedDateOption] = useState<string>("Tomorrow");
  const [customDate, setCustomDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("Morning (8:30 AM)");
  const [location, setLocation] = useState<string>("Thamarassery");
  const [customLocation, setCustomLocation] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default tier when service changes
  useEffect(() => {
    if (service) {
      const popular = service.tiers.find((t) => t.isPopular) || service.tiers[0] || null;
      setSelectedTier(popular);
      setSelectedAddons([]);
      if (service.propertyTypes && service.propertyTypes.length > 0) {
        setSelectedPropertyType(service.propertyTypes[0]);
      }
    }
  }, [service]);

  // Calculate Total Live Price
  const basePrice = selectedTier ? selectedTier.price : 0;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = service.addons.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalPrice = basePrice + addonsTotal;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Please enter your name";
    if (!phoneNumber.trim()) {
      errs.phoneNumber = "Please enter your phone number";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(phoneNumber.trim())) {
      errs.phoneNumber = "Enter a valid 10-digit number";
    }
    const finalLoc = location === "Other" ? customLocation.trim() : location;
    if (!finalLoc) errs.location = "Please enter your location in Kozhikode";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppBooking = () => {
    if (!validate()) return;
    setIsSubmitting(true);

    const finalLoc = location === "Other" ? customLocation.trim() : location;
    const finalDate = selectedDateOption === "Pick Date" && customDate ? customDate : selectedDateOption;

    const chosenAddonNames = selectedAddons
      .map((id) => {
        const item = service.addons.find((a) => a.id === id);
        return item ? `${item.name} (${item.priceDisplay})` : "";
      })
      .filter(Boolean);

    const whatsappMessage = `*NEW CLEANING BOOKING — LET'S C*
━━━━━━━━━━━━━━━━━━━
🧹 *Service:* ${service.title}
📦 *Configuration:* ${selectedTier?.name || "Standard"} (${selectedTier?.priceDisplay || ""})
${selectedPropertyType ? `🏠 *Property Type:* ${selectedPropertyType}\n` : ""}${
      chosenAddonNames.length > 0
        ? `✨ *Add-ons:* ${chosenAddonNames.join(", ")}\n`
        : ""
    }💵 *Estimated Total:* ${totalPrice > 0 ? `₹${totalPrice.toLocaleString("en-IN")}` : "Custom Quote"}
📅 *Preferred Date:* ${finalDate}
⏰ *Time Slot:* ${selectedTimeSlot}
📍 *Service Location:* ${finalLoc}
👤 *Customer Name:* ${fullName}
📞 *Phone Number:* ${phoneNumber}
${notes ? `📝 *Special Instructions:* ${notes}\n` : ""}━━━━━━━━━━━━━━━━━━━
Sent via Let's C Website`;

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, "_blank");
      if (onSuccess) onSuccess();
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div
        className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Banner */}
        <div className="relative bg-slate-900 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between">
          <div className="flex items-center gap-3.5 pr-8">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/20">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-[#03B9F4] uppercase tracking-wider bg-[#03B9F4]/10 px-2 py-0.5 rounded-full border border-[#03B9F4]/30">
                  {service.categoryLabel}
                </span>
                <span className="text-xs text-slate-300 font-light flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#03B9F4]" />
                  {selectedTier?.duration || service.duration}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold leading-tight mt-1 text-white">
                {service.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 font-light mt-0.5">
                {service.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Workflow Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-slate-800">
          
          {/* STEP 1: Property Type (if applicable) */}
          {service.propertyTypes && service.propertyTypes.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2.5">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {service.propertyTypes.map((prop) => (
                  <button
                    key={prop}
                    type="button"
                    onClick={() => setSelectedPropertyType(prop)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      selectedPropertyType === prop
                        ? "bg-[#EAF8FF] border-[#03B9F4] text-[#0755D9] shadow-2xs font-semibold"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {prop}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Configuration / Tier */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
                {service.propertyTypes ? "2." : "1."} Choose Size & Configuration
              </label>
              <span className="text-[11px] text-slate-400 font-light">
                Transparent flat pricing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.tiers.map((tier) => {
                const isSelected = selectedTier?.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#EAF8FF]/70 border-[#03B9F4] shadow-xs ring-1 ring-[#03B9F4]"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {tier.isPopular && (
                      <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-2xs">
                        Most Popular
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-900 leading-snug">
                        {tier.name}
                      </span>
                      <span className="text-sm font-bold text-[#0755D9] shrink-0">
                        {tier.priceDisplay}
                      </span>
                    </div>

                    {tier.description && (
                      <p className="text-[11px] text-slate-500 leading-tight mb-2 font-light">
                        {tier.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {tier.duration}
                      </span>
                      <span
                        className={`font-semibold ${
                          isSelected ? "text-[#03B9F4]" : "text-slate-400"
                        }`}
                      >
                        {isSelected ? "Selected ✓" : "Select"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Optional Add-on Upgrades */}
          {service.addons && service.addons.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  {service.propertyTypes ? "3." : "2."} Add-on Care (Optional)
                </label>
                <span className="text-[11px] text-[#03B9F4] font-medium">
                  {selectedAddons.length} added
                </span>
              </div>

              <div className="space-y-2">
                {service.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#EAF8FF]/60 border-[#03B9F4]"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-2.5 pr-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-0.5 w-4 h-4 rounded text-[#03B9F4] focus:ring-[#03B9F4] border-slate-300 cursor-pointer"
                        />
                        <div>
                          <span className="font-semibold text-slate-800 block">
                            {addon.name}
                          </span>
                          {addon.description && (
                            <span className="text-[11px] text-slate-500 font-light block mt-0.5">
                              {addon.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">
                        {addon.priceDisplay}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Preferred Date & Time Slot */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2.5">
              {service.propertyTypes ? "4." : "3."} Schedule Date & Time
            </label>

            <div className="grid grid-cols-3 gap-2 mb-2.5">
              {["Today", "Tomorrow", "Pick Date"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedDateOption(opt)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    selectedDateOption === opt
                      ? "bg-[#EAF8FF] border-[#03B9F4] text-[#0755D9] font-semibold"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selectedDateOption === "Pick Date" && (
              <div className="mb-2.5">
                <input
                  type="date"
                  value={customDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#03B9F4]"
                />
              </div>
            )}

            {/* Time Slots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "Morning (8:30 AM)",
                "Midday (11:30 AM)",
                "Afternoon (2:00 PM)",
                "Evening (4:30 PM)",
              ].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    selectedTimeSlot === slot
                      ? "bg-slate-900 text-white border-slate-900 font-semibold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 5: Service Location & Contact Info */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {service.propertyTypes ? "5." : "4."} Location & Contact
            </label>

            {/* Location Selector */}
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                {["Thamarassery", "Koduvally", "Balussery", "Kunnamangalam", "Calicut City", "Other"].map(
                  (loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        location === loc
                          ? "bg-[#EAF8FF] border-[#03B9F4] text-[#0755D9] font-semibold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {loc}
                    </button>
                  )
                )}
              </div>

              {location === "Other" && (
                <input
                  type="text"
                  placeholder="Enter your town or area in Kozhikode..."
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4]"
                />
              )}
              {errors.location && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.location}</p>
              )}
            </div>

            {/* Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                    errors.fullName ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#03B9F4]"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number (e.g. 98470 12345) *"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                    errors.phoneNumber ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#03B9F4]"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <textarea
              rows={2}
              placeholder="Any specific stains, timing notes or directions... (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#03B9F4] resize-none"
            />
          </div>

          {/* Guarantee Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>
              <strong>Zero Cancellation Fee</strong> • Pay safely after satisfactory service handover.
            </span>
          </div>

        </div>

        {/* Sticky Footer: Total Live Price + WhatsApp Booking CTA */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-light">
                Estimated Total
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-bold text-slate-900">
                  {totalPrice > 0 ? `₹${totalPrice.toLocaleString("en-IN")}` : "Custom Quote"}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">
                  Tax Incl.
                </span>
              </div>
            </div>

            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="sm:hidden px-3 py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#03B9F4]" />
              <span>Call</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="hidden sm:inline-flex px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#03B9F4]" />
              <span>Call Us</span>
            </a>

            <button
              onClick={handleWhatsAppBooking}
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isSubmitting ? "Opening WhatsApp..." : "Confirm Booking via WhatsApp"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

