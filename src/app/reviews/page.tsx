"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function ReviewsPage() {
  const [selectedService, setSelectedService] = useState<string>("Home Cleaning");

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const el = document.querySelector("#booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-[#03B9F4] selection:text-white pb-16 md:pb-0">
      <Navbar onBookClick={() => scrollToBooking()} />

      {/* Page Title Banner */}
      <div className="pt-28 pb-8 bg-gradient-to-b from-[#F2FAFD] to-white border-b border-slate-100 text-center px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#03B9F4] bg-[#EAF8FF] px-3.5 py-1 rounded-full border border-sky-100 inline-block mb-3">
          Client Feedback
        </span>
        <h1 className="text-3xl sm:text-5xl font-light text-[#17191C] tracking-tight">
          Google Reviews & Testimonials
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-light max-w-xl mx-auto mt-2">
          Read genuine feedback from verified homeowners and families across Kozhikode and Thamarassery.
        </p>
      </div>

      <Reviews />

      <BookingForm initialService={selectedService} />

      <Footer />

      <FloatingWhatsApp />

      <MobileBottomBar onEnquiryClick={() => scrollToBooking()} />
    </main>
  );
}

