"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function ContactPage() {
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
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-light text-[#17191C] tracking-tight">
          Contact Let's C Cleaning
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-light max-w-xl mx-auto mt-2">
          Reach our Thamarassery office or send an instant WhatsApp inquiry. We respond in under 15 minutes.
        </p>
      </div>

      <BookingForm initialService={selectedService} />

      <Contact />

      <Footer />

      <FloatingWhatsApp />

      <MobileBottomBar onEnquiryClick={() => scrollToBooking()} />
    </main>
  );
}

