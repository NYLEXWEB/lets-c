export interface ServiceTier {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  duration: string;
  description?: string;
  isPopular?: boolean;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "home" | "event" | "sofa" | "mattress";
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  shortDesc: string;
  tagline: string;
  image: string;
  popular?: boolean;
  badge?: string;
  estimate: string;
  startingPrice: number;
  duration: string;
  highlights: string[];
  inclusions: string[];
  idealFor: string[];
  propertyTypes?: string[];
  tiers: ServiceTier[];
  addons: ServiceAddon[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "home-cleaning",
    slug: "home-cleaning",
    title: "Home Cleaning",
    category: "home",
    categoryLabel: "Residential",
    rating: 4.9,
    reviewCount: 52,
    shortDesc: "Complete deep cleaning, machine floor buffing, bathroom descaling, kitchen wiping, and balcony pressure washing.",
    tagline: "Total home rejuvenation for flats, apartments, and luxury villas",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    popular: true,
    badge: "Most Booked",
    estimate: "From ₹1,499",
    startingPrice: 1499,
    duration: "3 – 5 Hours",
    highlights: [
      "Rotary machine floor scrubbing & buffing",
      "Kitchen degreasing & exhaust wipe down",
      "Bathroom descaling & hard-water stain removal",
      "Window glass, balcony & grill washing",
      "Ceiling fans, switchboards & fixture dusting"
    ],
    inclusions: [
      "Deep vacuuming of all bedrooms, living area & carpets",
      "Single-disc floor scrubbing with eco-neutral floor polish",
      "Complete bathroom sanitation with tile grout scrubbing",
      "Countertop sanitization & exterior cabinet wiping",
      "Doors, windows, glass and skirting detailing",
      "Post-cleaning supervisor walk-through handover"
    ],
    idealFor: [
      "Seasonal deep cleaning",
      "Move-in / Move-out handover",
      "Post-renovation dust elimination",
      "Festive home preparation"
    ],
    propertyTypes: ["Flat / Apartment", "Independent Villa", "Row House"],
    tiers: [
      {
        id: "1bhk",
        name: "1 BHK Deep Clean",
        price: 1499,
        priceDisplay: "₹1,499",
        duration: "2.5 – 3 Hours",
        description: "1 Bedroom + 1 Hall + 1 Kitchen + 1 Bathroom",
      },
      {
        id: "2bhk",
        name: "2 BHK Deep Clean",
        price: 2199,
        priceDisplay: "₹2,199",
        duration: "3.5 – 4 Hours",
        description: "2 Bedrooms + 1 Hall + 1 Kitchen + 2 Bathrooms",
        isPopular: true,
      },
      {
        id: "3bhk",
        name: "3 BHK Deep Clean",
        price: 2999,
        priceDisplay: "₹2,999",
        duration: "4.5 – 5.5 Hours",
        description: "3 Bedrooms + 1 Hall + 1 Dining + 1 Kitchen + 3 Bathrooms",
      },
      {
        id: "4bhk-villa",
        name: "4 BHK / Luxury Villa",
        price: 3999,
        priceDisplay: "₹3,999",
        duration: "6+ Hours",
        description: "Full duplex/villa detailing with outdoor sit-out wash",
      },
    ],
    addons: [
      {
        id: "balcony-wash",
        name: "Balcony High-Pressure Wash",
        price: 299,
        priceDisplay: "+₹299",
        description: "Jet-wash balcony tiles and glass railings",
      },
      {
        id: "fridge-oven",
        name: "Fridge & Microwave Deep Sanitization",
        price: 399,
        priceDisplay: "+₹399",
        description: "Interior shelves, gasket descaling & food-safe wipe",
      },
      {
        id: "room-fogging",
        name: "Anti-Bacterial Herbal Fogging",
        price: 499,
        priceDisplay: "+₹499",
        description: "Eliminate airborne germs and tropical moisture odors",
      },
    ],
  },
  {
    id: "event-cleaning",
    slug: "event-cleaning",
    title: "Event Cleaning",
    category: "event",
    categoryLabel: "Special Occasions",
    rating: 4.9,
    reviewCount: 38,
    shortDesc: "Discreet and fast pre-event staging and post-party teardown cleaning for weddings, family functions, and banquets.",
    tagline: "Stress-free celebration spaces, spotless and guest-ready",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    badge: "Fast Crew",
    estimate: "From ₹1,999",
    startingPrice: 1999,
    duration: "3 – 5 Hours",
    highlights: [
      "Pre-event floor polishing & chair/table setup",
      "Restroom maintenance & sanitization throughout",
      "Post-event comprehensive waste sorting & disposal",
      "Dining hall food spill & grease removal",
      "Outdoor veranda & lawn litter cleanup"
    ],
    inclusions: [
      "Pre-event floor buffing & hall dusting",
      "Dedicated waste bagging & prompt removal",
      "Continuous restroom upkeep & deodorization",
      "Post-function full premises scrub & mop",
      "Outdoor car porch & entryway washing"
    ],
    idealFor: [
      "Weddings & engagement ceremonies",
      "Griha Pravesham (Housewarming) functions",
      "Family birthday parties & anniversaries",
      "Corporate banquets & seminars"
    ],
    tiers: [
      {
        id: "post-party",
        name: "Post-Party Home Cleanup",
        price: 1999,
        priceDisplay: "₹1,999",
        duration: "3 – 4 Hours",
        description: "Living hall, dining area, kitchen reset, and waste removal",
        isPopular: true,
      },
      {
        id: "griha-pravesham",
        name: "Griha Pravesham Festive Prep",
        price: 2999,
        priceDisplay: "₹2,999",
        duration: "5 – 6 Hours",
        description: "Entire premises buffed, spotless bathrooms, entrance wash",
      },
      {
        id: "commercial-venue",
        name: "Banquet / Auditorium Clean",
        price: 0,
        priceDisplay: "Custom Quote",
        duration: "Custom Shift",
        description: "Auditoriums, party halls & convention spaces (on-site visit)",
      },
    ],
    addons: [
      {
        id: "waste-disposal",
        name: "Extra Waste Bagging & Lawn Sweeping",
        price: 399,
        priceDisplay: "+₹399",
        description: "Gather and sack all event trash & sweep car porch/gardens",
      },
      {
        id: "floor-buffing",
        name: "Rotary Single-Disc Floor Buffing",
        price: 599,
        priceDisplay: "+₹599",
        description: "Machine buffing for marble, vitrified, or granite flooring",
      },
    ],
  },
  {
    id: "sofa-cleaning",
    slug: "sofa-cleaning",
    title: "Sofa Cleaning",
    category: "sofa",
    categoryLabel: "Upholstery",
    rating: 4.9,
    reviewCount: 46,
    shortDesc: "German injection-extraction deep foam shampooing. Removes tough stains, tea spills, dust mites, and restores fabric freshness.",
    tagline: "Revitalize fibers, remove tough stains, and banish allergens",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    popular: true,
    badge: "Top Rated",
    estimate: "From ₹699",
    startingPrice: 699,
    duration: "60 – 90 Mins",
    highlights: [
      "High-power fabric dry vacuuming",
      "Eco-friendly deep foam shampoo injection",
      "High-power moisture & grime extraction",
      "Stubborn food stain, tea spill & ink spot treatment",
      "Leather & fabric conditioning with delicate fragrance"
    ],
    inclusions: [
      "Industrial suction extraction of embedded allergens",
      "Targeted spot treatment for stubborn patches",
      "Anti-bacterial fabric freshener treatment",
      "Cushion edges and deep crevice detailing",
      "Rapid drying formulation (ready in 2–3 hours)"
    ],
    idealFor: [
      "Fabric, velvet, suede & microfiber sofas",
      "Leather and faux-leather recliners",
      "Dining chairs & office seats",
      "Allergy prevention & odor removal"
    ],
    tiers: [
      {
        id: "3seater",
        name: "3-Seater Sofa",
        price: 699,
        priceDisplay: "₹699",
        duration: "45 – 60 Mins",
        description: "Standard 3-seater fabric or leatherette sofa",
        isPopular: true,
      },
      {
        id: "5seater-l",
        name: "5-Seater L-Shape Sofa",
        price: 1199,
        priceDisplay: "₹1,199",
        duration: "75 – 90 Mins",
        description: "3+2 or L-shaped sectional couch with lounger",
      },
      {
        id: "7seater-sec",
        name: "7-Seater Royal Sectional",
        price: 1599,
        priceDisplay: "₹1,599",
        duration: "100 – 120 Mins",
        description: "Full living room set with armrests and loose cushions",
      },
      {
        id: "recliner",
        name: "Single Recliner Chair",
        price: 299,
        priceDisplay: "₹299",
        duration: "30 Mins",
        description: "Manual or motorized single recliner detailing",
      },
      {
        id: "dining-chairs",
        name: "Dining Chairs (Set of 6)",
        price: 699,
        priceDisplay: "₹699",
        duration: "45 Mins",
        description: "Cushioned dining chair fabric extraction",
      },
    ],
    addons: [
      {
        id: "stain-guard",
        name: "Fabric Shield Anti-Stain Coat",
        price: 299,
        priceDisplay: "+₹299",
        description: "Repels future liquid and food spill stains",
      },
      {
        id: "pillow-steam",
        name: "Throw Pillows & Cushions Deep Steam",
        price: 199,
        priceDisplay: "+₹199",
        description: "High-heat sanitization for up to 6 decorative pillows",
      },
    ],
  },
  {
    id: "mattress-cleaning",
    slug: "mattress-cleaning",
    title: "Mattress Cleaning",
    category: "mattress",
    categoryLabel: "Bed Sanitization",
    rating: 4.9,
    reviewCount: 29,
    shortDesc: "Double-sided dust-mite vibration suction vacuuming and hospital-grade germicidal UV-C light sanitization.",
    tagline: "Eradicate dust mites, dead skin cells, and allergens for healthy sleep",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    badge: "UV-C Tech",
    estimate: "From ₹599",
    startingPrice: 599,
    duration: "45 – 60 Mins",
    highlights: [
      "Deep vibration suction dust-mite extraction",
      "Hospital-grade UV-C light sanitization",
      "Stain lightening for sweat & biological marks",
      "Herbal anti-allergen deodorizing mist",
      "Safe for infants, elders & asthma sufferers"
    ],
    inclusions: [
      "Double-sided high-power filtration vacuuming",
      "UV-C germicidal pass eradicating bacteria & mites",
      "Targeted foam treatment on visible stains",
      "Moisture vacuum extraction for prompt drying",
      "Bed frame & headboard wipe down"
    ],
    idealFor: [
      "King, Queen, & Single mattresses",
      "Homes with kids, pets, or allergy sufferers",
      "Post-illness bedroom sanitization",
      "Routine bi-annual mattress wellness"
    ],
    tiers: [
      {
        id: "single-matt",
        name: "Single Bed Mattress",
        price: 599,
        priceDisplay: "₹599",
        duration: "30 – 40 Mins",
        description: "Single size (36x72 or 36x75) double-sided vacuum & UV",
      },
      {
        id: "queen-matt",
        name: "Queen Size Bed Mattress",
        price: 799,
        priceDisplay: "₹799",
        duration: "45 – 50 Mins",
        description: "Queen size (60x78) deep extraction & UV sterilization",
        isPopular: true,
      },
      {
        id: "king-matt",
        name: "King Size Bed Mattress",
        price: 999,
        priceDisplay: "₹999",
        duration: "55 – 60 Mins",
        description: "King size (72x78) comprehensive allergen decontamination",
      },
      {
        id: "two-matt-pack",
        name: "2 Mattresses Combo Pack",
        price: 1399,
        priceDisplay: "₹1,399",
        duration: "80 – 90 Mins",
        description: "1 King + 1 Queen or 2 Single beds package deal",
      },
    ],
    addons: [
      {
        id: "headboard-clean",
        name: "Upholstered Headboard Vacuuming",
        price: 249,
        priceDisplay: "+₹249",
        description: "Deep dust extraction from tufted headboards",
      },
      {
        id: "botanical-mist",
        name: "Anti-Allergen Eucalyptus Mist",
        price: 199,
        priceDisplay: "+₹199",
        description: "Safe natural repellent preventing dust mite settlement",
      },
    ],
  },
];

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  service: string;
  category?: "all" | "home" | "sofa" | "event" | "mattress";
  rating: number;
  date: string;
  comment: string;
  avatarText: string;
  avatarColor?: string;
  isLocalGuide?: boolean;
  localGuideInfo?: string;
  positiveTags?: string[];
  helpfulCount?: number;
  photos?: string[];
  ownerReply?: {
    date: string;
    comment: string;
  };
  verified: boolean;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Dr. Anoop Nambiar",
    location: "Thamarassery, Kozhikode",
    service: "Full Home Deep Cleaning",
    category: "home",
    rating: 5,
    date: "4 days ago",
    comment: "Outstanding service by the Let's C crew! They reached our house in Thamarassery right on time at 8:30 AM. The kitchen tile degreasing, bathroom descaling, and balcony wash were spotless. Extremely courteous staff with professional grade machinery. Worth every single rupee.",
    avatarText: "AN",
    avatarColor: "#1a73e8",
    isLocalGuide: true,
    localGuideInfo: "Local Guide · 48 reviews · 22 photos",
    positiveTags: ["Professionalism", "Punctuality", "Quality", "Responsiveness", "Value"],
    helpfulCount: 7,
    photos: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80"
    ],
    ownerReply: {
      date: "3 days ago",
      comment: "Thank you so much Dr. Anoop! It was an absolute pleasure serving your family in Thamarassery. Our team takes deep pride in punctuality and spotless results. Looking forward to assisting you again!"
    },
    verified: true
  },
  {
    id: "rev-2",
    name: "Fathima Suhara",
    location: "Koduvally",
    service: "Sofa & Upholstery Deep Extraction",
    category: "sofa",
    rating: 5,
    date: "1 week ago",
    comment: "I thought my 5-seater light beige sofa was ruined forever from tea spills and kids' marker stains. Let's C used German shampoo injection-extraction machines and made it look brand new! Mild pleasant fragrance left behind. Highly recommended in Kozhikode.",
    avatarText: "FS",
    avatarColor: "#9c27b0",
    isLocalGuide: true,
    localGuideInfo: "Local Guide · 19 reviews · 8 photos",
    positiveTags: ["Quality", "Value", "Responsiveness"],
    helpfulCount: 5,
    photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
    ],
    ownerReply: {
      date: "5 days ago",
      comment: "Thank you Fathima! Fabric revival without damaging the delicate weave is our specialty. Glad the kids and family loved the fresh sofa!"
    },
    verified: true
  },
  {
    id: "rev-3",
    name: "Jithin Varghese",
    location: "Balussery Road, Kozhikode",
    service: "Post-Event & Housewarming Cleaning",
    category: "event",
    rating: 5,
    date: "2 weeks ago",
    comment: "Booked them for our post-housewarming party in Balussery Road. Huge amount of waste, food grease in dining hall, and dusty sit-out. Their 4-member crew tackled everything in under 4 hours. Transparent pricing without any hidden surprises.",
    avatarText: "JV",
    avatarColor: "#00897b",
    isLocalGuide: true,
    localGuideInfo: "Local Guide · 31 reviews · 14 photos",
    positiveTags: ["Professionalism", "Punctuality", "Value"],
    helpfulCount: 4,
    ownerReply: {
      date: "1 week ago",
      comment: "Congratulations again on your new home Jithin! We were delighted to help make your post-party clean up effortless."
    },
    verified: true
  },
  {
    id: "rev-4",
    name: "Riyas K.P.",
    location: "Adivaram, Wayanad Road",
    service: "Mattress Sanitization & Dust Mite Extraction",
    category: "mattress",
    rating: 5,
    date: "3 weeks ago",
    comment: "The UV-C sanitization and vacuum dust extraction on our king-size mattress was eye-opening. They showed the extracted dirt chamber and it proved how much dust settles inside over time. Breathing much better at night now.",
    avatarText: "RK",
    avatarColor: "#e65100",
    isLocalGuide: false,
    localGuideInfo: "12 reviews",
    positiveTags: ["Professionalism", "Quality"],
    helpfulCount: 3,
    photos: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
    ],
    ownerReply: {
      date: "2 weeks ago",
      comment: "Thank you Riyas! Healthy sleep hygiene is so important. Best wishes from team Let's C!"
    },
    verified: true
  },
  {
    id: "rev-5",
    name: "Sneha Menon",
    location: "Kunnamangalam, Kozhikode",
    service: "Kitchen Deep Degreasing",
    category: "home",
    rating: 5,
    date: "A month ago",
    comment: "Chimney filters, oil-splattered tile backsplashes, and under-counter shelves were completely renewed. No pungent chemical smell at all, they used food-safe bio detergents. Truly 5-star service in Kozhikode.",
    avatarText: "SM",
    avatarColor: "#d81b60",
    isLocalGuide: true,
    localGuideInfo: "Local Guide · 26 reviews · 9 photos",
    positiveTags: ["Quality", "Professionalism", "Punctuality"],
    helpfulCount: 6,
    verified: true
  },
  {
    id: "rev-6",
    name: "Mohammed Haris",
    location: "Koduvally",
    service: "Move-in Deep Cleaning",
    category: "home",
    rating: 5,
    date: "A month ago",
    comment: "Moved into a newly renovated apartment in Koduvally. Cement stains on tiles and paint spots on glass windows were totally cleared by their team using rotary floor polishers. Super polite technicians!",
    avatarText: "MH",
    avatarColor: "#3949ab",
    isLocalGuide: false,
    localGuideInfo: "8 reviews · 3 photos",
    positiveTags: ["Punctuality", "Quality", "Value"],
    helpfulCount: 2,
    verified: true
  }
];

export interface GalleryItem {
  id: string;
  category: "all" | "home" | "sofa" | "mattress";
  title: string;
  location: string;
  beforeImg: string;
  afterImg: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "sofa",
    title: "Fabric Sofa Stain Extraction",
    location: "Residential Villa, Thamarassery",
    beforeImg: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-2",
    category: "home",
    title: "Modern Kitchen Degreasing & Floor Buffing",
    location: "Apartment, Kozhikode",
    beforeImg: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-3",
    category: "mattress",
    title: "Deep UV Sanitization & Dust Mite Removal",
    location: "Family Home, Koduvally",
    beforeImg: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-4",
    category: "home",
    title: "Luxury Living Room Pre-Festive Detailing",
    location: "Independent Bungalow, Kunnamangalam",
    beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
  }
];

export const SERVICE_LOCATIONS = [
  "Thamarassery",
  "Kochi"
];

export const CONTACT_INFO = {
  companyName: "Let's C Cleaning Services",
  tagline: "Beyond Cleaning",
  phone: "+91 94960 00000",
  phoneDisplay: "+91 94960 XXXXX",
  whatsapp: "+919496000000",
  whatsappMessageDefault: "Hello Let's C! I would like to book a professional cleaning service in Kozhikode.",
  email: "contact@letsc-cleaning.com",
  address: "Near Old Bus Stand, Thamarassery, Kozhikode, Kerala 673573",
  googleMapsUrl: "https://maps.google.com/?q=Thamarassery+Kozhikode+Kerala",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJXXXXXXXX",
  workingHours: "Monday – Sunday: 8:00 AM – 8:00 PM"
};

