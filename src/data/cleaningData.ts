export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  tagline: string;
  image: string;
  popular?: boolean;
  estimate: string;
  duration: string;
  highlights: string[];
  inclusions: string[];
  idealFor: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    shortDesc: "Professional cleaning for everyday comfort, deep sanitization, and lasting freshness.",
    tagline: "Total home rejuvenation from floor to ceiling",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    popular: true,
    estimate: "From ₹1,499",
    duration: "3 – 5 Hours",
    highlights: [
      "Floor scrubbing & machine buffing",
      "Kitchen degreasing & chimney wipe down",
      "Bathroom deep descaling & sanitization",
      "Window glass, grills & balcony washing",
      "Dusting of fans, fixtures & switchboards"
    ],
    inclusions: [
      "Deep vacuuming of all rooms & carpets",
      "Floor scrubbing using single disc machines",
      "Complete bathroom disinfection & hard-water stain removal",
      "Kitchen countertop & exterior appliance wiping",
      "Doors, windows, glass and skirting detailing"
    ],
    idealFor: [
      "Seasonal deep cleaning",
      "Move-in / Move-out handover",
      "Post-renovation dust elimination",
      "Festive home preparation"
    ]
  },
  {
    id: "event-cleaning",
    title: "Event Cleaning",
    shortDesc: "Reliable, discreet cleaning before and after special occasions, parties, and weddings.",
    tagline: "Stress-free celebration spaces, spotless and guest-ready",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    estimate: "Custom Quote",
    duration: "Flexible / Shift-based",
    highlights: [
      "Pre-event staging & venue prep",
      "Continuous trash collection & restroom monitoring",
      "Post-party complete teardown cleaning",
      "Spill management & floor restoration",
      "Rapid turnaround for banquet & home venues"
    ],
    inclusions: [
      "Pre-event floor polishing & chair/table setup cleaning",
      "Waste disposal, sorting and recycling",
      "Restroom maintenance throughout the function",
      "Post-event comprehensive sanitization",
      "Outdoor lawn & veranda clean-up"
    ],
    idealFor: [
      "Weddings & engagement functions",
      "Family gatherings & birthday celebrations",
      "Corporate banquets & seminars",
      "Housewarming ceremonies (Griha Pravesham)"
    ]
  },
  {
    id: "sofa-cleaning",
    title: "Sofa Cleaning",
    shortDesc: "Deep extraction shampooing and fabric care for upholstered furniture and recliners.",
    tagline: "Revitalize fibers, remove tough stains, and banish allergens",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    popular: true,
    estimate: "From ₹699 / 3-seater",
    duration: "60 – 90 Mins",
    highlights: [
      "High-power fabric dry vacuuming",
      "Eco-friendly fabric foam shampooing",
      "Deep moisture & dirt extraction",
      "Food stain, pet odor & smudge removal",
      "Leather sofa conditioning & polish"
    ],
    inclusions: [
      "Industrial suction extraction of embedded dust",
      "Spot treatment for tea, coffee, food & grease stains",
      "Anti-bacterial fabric freshener treatment",
      "Cushion and crevice detailing",
      "Fast drying formulation (ready in 2-3 hours)"
    ],
    idealFor: [
      "Fabric, velvet, suede & microfiber sofas",
      "Leather and faux-leather recliners",
      "Dining chairs & office seats",
      "Allergy prevention & odor removal"
    ]
  },
  {
    id: "mattress-cleaning",
    title: "Mattress Cleaning",
    shortDesc: "Thorough ultraviolet sanitization and deep steam extraction for a healthier sleep.",
    tagline: "Eradicate dust mites, dead skin cells, and allergens",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    estimate: "From ₹799 / mattress",
    duration: "45 – 60 Mins",
    highlights: [
      "Anti-dust-mite UV & suction extraction",
      "Deep foam sanitization & stain lifting",
      "Odor neutralization & fabric conditioning",
      "Moisture vacuum extraction for quick drying",
      "Safe for infants, elders & sensitive skin"
    ],
    inclusions: [
      "Double-sided deep vibration vacuuming",
      "Targeted stain lightening (sweat, spills, biological stains)",
      "Hospital-grade sanitizing spray",
      "Moisture extraction with high-power blow drying",
      "Bed frame & headboard wipe down"
    ],
    idealFor: [
      "King, Queen, & Single mattresses",
      "Homes with kids, pets, or asthma sufferers",
      "Post-illness bedroom sanitization",
      "Routine bi-annual mattress wellness"
    ]
  }
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
  "Koduvally",
  "Balussery",
  "Kunnamangalam",
  "Adivaram",
  "Engapuzha",
  "Eranhikkal",
  "Kozhikode City (Calicut)",
  "Wayanad Foothills Route"
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

