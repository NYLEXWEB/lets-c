"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Reviews from "@/components/Reviews";
import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("Home Cleaning");

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForBooking(serviceName);
    }
    const element = document.querySelector("#booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-[#03B9F4] selection:text-white pb-16 sm:pb-0">
      {/* Sticky Navigation with Quick Enquiry */}
      <Navbar onBookClick={() => scrollToBooking()} />

      {/* Hero Section: Preserved Desktop Video Layout + Safsafaiwala Mobile Lead-Gen Layout */}
      <Hero
        onBookClick={() => scrollToBooking()}
        onExploreClick={scrollToServices}
      />

      {/* Services Section: Clean Cards with Prominent "Enquiry Now" CTAs */}
      <Services onSelectService={(service) => scrollToBooking(service)} />

      {/* Why Choose Let's C: Clean Trust & Value Badges */}
      <WhyChooseUs />

      {/* Before & After Interactive Showcase */}
      <BeforeAfterGallery />

      {/* Google Reviews Section (4.9 Stars, 20+ Reviews) */}
      <Reviews />

      {/* Simple Enquiry Form (Full Name, Phone, Service, Location, Message + WhatsApp) */}
      <BookingForm initialService={selectedServiceForBooking} />

      {/* Contact & Service Area Coverage */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Desktop Floating WhatsApp Assistant */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Action Bar: Call Us | WhatsApp | Enquiry Now */}
      <MobileBottomBar onEnquiryClick={() => scrollToBooking()} />
    </main>
  );
}
