"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Reviews from "@/components/Reviews";
import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
    <main className="min-h-screen flex flex-col relative selection:bg-[#03B9F4] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onBookClick={() => scrollToBooking()} />

      {/* Hero Section */}
      <Hero
        onBookClick={() => scrollToBooking()}
        onExploreClick={scrollToServices}
      />

      {/* Services Section (Highest Priority, Urban Company Reference) */}
      <Services onSelectService={(service) => scrollToBooking(service)} />

      {/* Why Choose Let's C */}
      <WhyChooseUs />

      {/* 3-Step Cleaning Process */}
      <Process onStartBooking={() => scrollToBooking()} />

      {/* Before & After Interactive Showcase */}
      <BeforeAfterGallery />

      {/* Google Reviews Section (4.9 Stars, 20+ Reviews) */}
      <Reviews />

      {/* Booking and WhatsApp Enquiry Form */}
      <BookingForm initialService={selectedServiceForBooking} />

      {/* Contact & Service Area Coverage */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Floating Mascot & WhatsApp Quick Action */}
      <FloatingWhatsApp />
    </main>
  );
}
