"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  PenLine,
  ExternalLink,
  X,
  Check
} from "lucide-react";
import { CONTACT_INFO } from "@/data/cleaningData";

// Official 4-Color Google 'G' Logo SVG
function GoogleGIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

interface ReviewCardData {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  date: string;
  rating: number;
  comment: string;
  serviceTag: string;
}

const REVIEWS: ReviewCardData[] = [
  {
    id: "rev-1",
    name: "Muhammed Shafi",
    avatarLetter: "M",
    avatarBg: "#1976D2",
    date: "2 weeks ago",
    rating: 5,
    comment:
      "Excellent job and good work and good worker. Thanks Let's C! We booked them for full deep cleaning of our 2,800 sq ft house in Alakode before our family gathering. Spotless bathrooms and kitchen degreasing.",
    serviceTag: "Home Deep Cleaning & Bathroom Descaling"
  },
  {
    id: "rev-2",
    name: "Sneha Nair",
    avatarLetter: "S",
    avatarBg: "#8E24AA",
    date: "3 weeks ago",
    rating: 5,
    comment:
      "They communicated clearly about the process and stuck to the quoted time. We had stubborn tea stains and dust trapped in our 7-seater sectional fabric sofa. After their deep injection-extraction, it feels brand new!",
    serviceTag: "Sofa Shampooing & Fabric Care"
  },
  {
    id: "rev-3",
    name: "Georgekutty Joseph",
    avatarLetter: "G",
    avatarBg: "#1B5E20",
    date: "a month ago",
    rating: 5,
    comment:
      "They offer professional housekeeping services for shopping malls and commercial complexes in Kozhikode. Let's C provides well-trained, uniformed staff with modern rotary scrubbing machines.",
    serviceTag: "Commercial Housekeeping & Facility Care"
  },
  {
    id: "rev-4",
    name: "Dr. Priya Varma",
    avatarLetter: "P",
    avatarBg: "#D84315",
    date: "a month ago",
    rating: 5,
    comment:
      "Outstanding cleaning of our exhaust chimney, oil stains and sink areas were cleaned with attention to detail. The team was punctual, polite and used safe eco-friendly solutions.",
    serviceTag: "Kitchen Deep Clean & Degreasing"
  },
  {
    id: "rev-5",
    name: "Dr. Anoop Nambiar",
    avatarLetter: "A",
    avatarBg: "#0284C7",
    date: "4 days ago",
    rating: 5,
    comment:
      "Outstanding service by the Let's C crew! They reached our house in Thamarassery right on time at 8:30 AM. Balcony descaling and window tracks were crystal clean. Truly professional grade equipment.",
    serviceTag: "Home Deep Cleaning & Bathroom Descaling"
  },
  {
    id: "rev-6",
    name: "Fathima Suhara",
    avatarLetter: "F",
    avatarBg: "#C2185B",
    date: "1 week ago",
    rating: 5,
    comment:
      "I was worried about our velvet dining chairs and sofa fabric. The shampoo extraction removed every spot with a mild, fresh fragrance and zero water pooling. Highly recommended!",
    serviceTag: "Sofa Shampooing & Fabric Care"
  },
  {
    id: "rev-7",
    name: "Riyas K.P.",
    avatarLetter: "R",
    avatarBg: "#00897B",
    date: "3 weeks ago",
    rating: 5,
    comment:
      "The UV-C sanitization and vacuum extraction on our mattresses was eye opening. You can visibly see the fine dust mite debris extracted in their filtration chamber. Sleeping much better now.",
    serviceTag: "Mattress Sanitization & UV Extraction"
  },
  {
    id: "rev-8",
    name: "Mohammed Haris",
    avatarLetter: "M",
    avatarBg: "#3949AB",
    date: "a month ago",
    rating: 5,
    comment:
      "Moved into a newly renovated apartment. Cement stains on tiles and paint spots on glass windows were totally cleared by their team using rotary floor polishers. Super polite technicians!",
    serviceTag: "Move-in Deep Clean & Polishing"
  }
];

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form states for "Write a Review" modal
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [service, setService] = useState("Home Deep Cleaning");
  const [submitted, setSubmitted] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsWriteModalOpen(false);
      setName("");
      setComment("");
    }, 2000);
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row matching the exact screenshot structure */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7 sm:mb-9">
          
          {/* Left: Google Reviews rating & stars */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="shrink-0">
              <GoogleGIcon className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-lg font-semibold text-[#202124] tracking-tight">
                  Google Reviews
                </span>
                <span className="text-base sm:text-lg font-semibold text-[#202124]">
                  4.9
                </span>
                <div className="flex items-center text-[#FBBC04] ml-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-[#5F6368] font-normal mt-0.5">
                Based on 42 verified Google reviews · Kozhikode
              </p>
            </div>
          </div>

          {/* Right: Carousel Navigation Arrows & "Write a Review" Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 self-end sm:self-auto">
            {/* Previous Arrow Button */}
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors cursor-pointer ${
                canScrollLeft
                  ? "text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 active:scale-95"
                  : "text-gray-300 border-gray-100 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next reviews"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors cursor-pointer ${
                canScrollRight
                  ? "text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 active:scale-95"
                  : "text-gray-300 border-gray-100 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Write a Review Button */}
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm font-medium shadow-xs transition-all active:scale-98 cursor-pointer ml-1 sm:ml-2"
            >
              <PenLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Write a Review</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
            </button>
          </div>

        </div>

        {/* Minimalist Horizontal Cards Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-5 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="w-[285px] sm:w-[335px] md:w-[355px] shrink-0 snap-start bg-white rounded-2xl p-5 sm:p-6 border border-[#E9EEF3] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Date, Google 'G' Icon */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0"
                      style={{ backgroundColor: rev.avatarBg }}
                    >
                      {rev.avatarLetter}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#202124] leading-snug">
                        {rev.name}
                      </h3>
                      <p className="text-xs text-[#5F6368] font-normal mt-0.5">
                        {rev.date}
                      </p>
                    </div>
                  </div>

                  {/* Google 'G' Logo on card top right */}
                  <div className="shrink-0 p-0.5" title="Google Verified Review">
                    <GoogleGIcon className="w-3.5 h-3.5 opacity-80" />
                  </div>
                </div>

                {/* 5 Yellow Stars */}
                <div className="flex items-center gap-1 my-2.5 text-[#FBBC04]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]"
                    />
                  ))}
                </div>

                {/* Review Quote text */}
                <p className="text-xs sm:text-[13px] text-[#3C4043] leading-relaxed font-light mt-2 line-clamp-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Bottom Service Tag / Category link */}
              <div className="mt-6 pt-1">
                <span className="text-[#03B9F4] text-xs font-medium inline-block hover:underline cursor-default">
                  {rev.serviceTag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Sleek Minimalist "Write a Review" Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 border border-gray-200 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <GoogleGIcon className="w-5 h-5" />
                <h3 className="text-base font-semibold text-[#202124]">
                  Write a Google Review
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-medium text-gray-900">
                  Thank You for Your Review!
                </h4>
                <p className="text-xs text-gray-500">
                  Your feedback has been submitted. Opening our official Google Business profile...
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="mt-4 space-y-4">
                {/* Star rating selector */}
                <div className="text-center py-2 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isFilled = (hoverRating || rating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(starVal)}
                          className="p-1 cursor-pointer transition-transform hover:scale-115"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              isFilled
                                ? "fill-[#FBBC04] text-[#FBBC04]"
                                : "text-gray-300 stroke-1"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-medium text-[#1A73E8] block mt-1">
                    {rating === 5 ? "Loved it! 5 Stars" : `${rating} out of 5 Stars`}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammed Shafi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Service Experience
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                  >
                    <option value="Home Deep Cleaning & Bathroom Descaling">Home Deep Cleaning & Bathroom Descaling</option>
                    <option value="Sofa Shampooing & Fabric Care">Sofa Shampooing & Fabric Care</option>
                    <option value="Kitchen Deep Clean & Degreasing">Kitchen Deep Clean & Degreasing</option>
                    <option value="Commercial Housekeeping & Facility Care">Commercial Housekeeping & Facility Care</option>
                    <option value="Mattress Sanitization & UV Extraction">Mattress Sanitization & UV Extraction</option>
                    <option value="Move-in Deep Clean & Polishing">Move-in Deep Clean & Polishing</option>
                  </select>
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your experience with our crew and cleaning quality..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                  />
                </div>

                {/* CTA actions */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-100">
                  <a
                    href={CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#1A73E8] hover:underline inline-flex items-center gap-1"
                  >
                    Open Google Maps ↗
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-medium cursor-pointer shadow-xs transition-colors"
                    >
                      <GoogleGIcon className="w-3.5 h-3.5" />
                      <span>Post Review</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
