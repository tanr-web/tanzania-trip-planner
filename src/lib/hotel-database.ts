export interface HotelData {
  name: string;
  slug: string;
  region: string;
  city: string;
  type: "safari_camp" | "lodge" | "tented_camp" | "beach_resort" | "city_hotel" | "boutique";
  priceRange: "budget" | "mid" | "luxury";
  stars: number;
  description: string;
  bestFor: string[];
  amenities: string[];
  lat?: number;
  lng?: number;
  bookingUrl?: string;
  highlights: string[];
}

export const SAMPLE_HOTELS: HotelData[] = [
  // Serengeti
  {
    name: "Singita Mara River Tented Camp",
    slug: "singita-mara-river",
    region: "Serengeti",
    city: "Serengeti National Park",
    type: "tented_camp",
    priceRange: "luxury",
    stars: 5,
    description:
      "Ultra-luxury tented camp positioned right on the Mara River for prime crossing season viewing. Private guides, gourmet meals, and extraordinary wildlife encounters.",
    bestFor: ["Luxury travelers", "Photography", "Migration viewing", "Honeymooners"],
    amenities: ["Private plunge pool", "Fine dining", "Spa", "Game drives", "WiFi"],
    highlights: [
      "Mara River crossing views",
      "Private concierge service",
      "Premium photography support",
      "Nightly turndown service",
    ],
    lat: -2.4,
    lng: 34.85,
    bookingUrl: "https://www.singita.com",
  },

  {
    name: "Ubuntu Migration Camp",
    slug: "ubuntu-migration-camp",
    region: "Serengeti",
    city: "Serengeti National Park",
    type: "lodge",
    priceRange: "luxury",
    stars: 4,
    description:
      "Upscale permanent lodge in the heart of the migration route. Expert guides, stellar food, and excellent value for luxury seekers.",
    bestFor: ["Mid-luxury travelers", "Families", "Couples", "Migration enthusiasts"],
    amenities: ["Restaurant", "Bar", "Game drives", "Walking safaris", "WiFi"],
    highlights: ["Migration route location", "Expert naturalist guides", "Great food", "Excellent value"],
    lat: -2.3,
    lng: 34.88,
  },

  {
    name: "Serengeti Tented Camp Budget",
    slug: "serengeti-budget-camp",
    region: "Serengeti",
    city: "Serengeti National Park",
    type: "tented_camp",
    priceRange: "budget",
    stars: 3,
    description:
      "Authentic camping safari experience with shared vehicles and public campsite. Great value for budget-conscious travelers.",
    bestFor: ["Budget travelers", "Backpackers", "Group tours", "Young adventurers"],
    amenities: ["Communal meals", "Tent accommodation", "Game drives", "Campfire"],
    highlights: ["Best value safari", "Authentic experience", "Great for groups", "Amazing wildlife"],
    lat: -2.35,
    lng: 34.82,
  },

  // Zanzibar
  {
    name: "The Palms Zanzibar",
    slug: "the-palms-zanzibar",
    region: "Zanzibar",
    city: "Nungwi",
    type: "beach_resort",
    priceRange: "luxury",
    stars: 5,
    description:
      "Ultra-luxury beachfront resort with infinity pools overlooking turquoise waters. World-class dining and spa. Perfect beach luxury experience.",
    bestFor: ["Honeymooners", "Luxury seekers", "Beach lovers", "Relaxation"],
    amenities: ["Infinity pool", "Spa", "Multiple restaurants", "Beach access", "WiFi"],
    highlights: ["Turquoise beach", "Infinity pool", "Gourmet dining", "Sunset views"],
    lat: -6.23,
    lng: 39.26,
  },

  {
    name: "Zanzibar Coffee House",
    slug: "zanzibar-coffee-house",
    region: "Zanzibar",
    city: "Stone Town",
    type: "boutique",
    priceRange: "mid",
    stars: 4,
    description:
      "Charming mid-range boutique hotel in Stone Town's heart. Rooftop restaurant with stunning views. Perfect for culture and history lovers.",
    bestFor: ["Culture enthusiasts", "Couples", "Photographers", "Stone Town explorers"],
    amenities: ["Rooftop restaurant", "Courtyard", "Library", "Cultural tours", "WiFi"],
    highlights: ["Stone Town location", "Rooftop views", "Historic building", "Local charm"],
    lat: -6.16,
    lng: 39.19,
  },

  {
    name: "Paje Backpackers Zanzibar",
    slug: "paje-backpackers",
    region: "Zanzibar",
    city: "Paje",
    type: "boutique",
    priceRange: "budget",
    stars: 3,
    description:
      "Social backpacker hostel in Paje beach town. Kitesurfing hub with laid-back vibe. Great for meeting fellow travelers.",
    bestFor: ["Backpackers", "Budget travelers", "Kitesurf enthusiasts", "Beach lovers"],
    amenities: ["Dorm beds", "Beach bar", "Kitesurfing lessons", "Social events", "WiFi"],
    highlights: ["Kitesurf capital", "Social atmosphere", "Budget-friendly", "Beach access"],
    lat: -6.37,
    lng: 39.37,
  },

  // Ngorongoro
  {
    name: "Ngorongoro Crater Lodge",
    slug: "ngorongoro-crater-lodge",
    region: "Ngorongoro",
    city: "Ngorongoro",
    type: "lodge",
    priceRange: "luxury",
    stars: 5,
    description:
      "Iconic luxury lodge perched on crater rim with jaw-dropping views. Ultimate African safari experience. The most photographed lodge in Tanzania.",
    bestFor: ["Luxury travelers", "Honeymooners", "Photography", "Crater enthusiasts"],
    amenities: ["Crater views", "Fine dining", "Spa", "Game drives", "Infinity pool"],
    highlights: ["Crater rim views", "Iconic architecture", "Luxurious suites", "Expert guides"],
    lat: -3.2,
    lng: 35.5,
  },

  {
    name: "Simba Campsite Ngorongoro",
    slug: "simba-campsite",
    region: "Ngorongoro",
    city: "Ngorongoro",
    type: "tented_camp",
    priceRange: "budget",
    stars: 2,
    description:
      "Authentic camping on crater rim. Cold and atmospheric with incredible crater views. Budget safari experience at its best.",
    bestFor: ["Budget travelers", "Adventure seekers", "Camping enthusiasts"],
    amenities: ["Tent accommodation", "Basic meals", "Crater access", "Communal fire"],
    highlights: ["Crater rim location", "Authentic camping", "Incredible views", "Budget-friendly"],
    lat: -3.2,
    lng: 35.48,
  },

  // Tarangire
  {
    name: "Tarangire Safari Lodge",
    slug: "tarangire-safari-lodge",
    region: "Tarangire",
    city: "Tarangire",
    type: "lodge",
    priceRange: "mid",
    stars: 4,
    description:
      "Family-friendly lodge with elevated views over watering hole. Excellent elephant viewing from rooms. Great mid-range value.",
    bestFor: ["Families", "Elephant lovers", "Mid-range travelers", "Couples"],
    amenities: ["Game drives", "Restaurant", "Bar", "Waterhole views", "WiFi"],
    highlights: ["Elephant sightings", "Waterhole views", "Family-friendly", "Great value"],
    lat: -3.38,
    lng: 36.08,
  },

  // Kilimanjaro
  {
    name: "Kibo Palace Hotel Moshi",
    slug: "kibo-palace-moshi",
    region: "Kilimanjaro",
    city: "Moshi",
    type: "city_hotel",
    priceRange: "mid",
    stars: 3,
    description:
      "Pre/post-trek accommodation in Moshi town. Walking distance to restaurants and shops. Good base for acclimatisation before climb.",
    bestFor: ["Kili trekkers", "Budget travelers", "Town accommodation", "Last-night rest"],
    amenities: ["Restaurant", "Bar", "Garden", "Tours office", "WiFi"],
    highlights: ["Kilo town base", "Decent facilities", "Tour bookings available", "Good food"],
    lat: -3.36,
    lng: 37.66,
  },

  // Mafia Island
  {
    name: "Mafia Island Lodge",
    slug: "mafia-island-lodge",
    region: "Mafia Island",
    city: "Mafia Island",
    type: "beach_resort",
    priceRange: "luxury",
    stars: 4,
    description:
      "All-inclusive diving resort on pristine Mafia Island. World-class diving and snorkeling. Marine park setting.",
    bestFor: ["Divers", "Snorkelers", "Marine life enthusiasts", "Couples"],
    amenities: ["Dive center", "Restaurant", "Bar", "Beach", "WiFi"],
    highlights: ["Whale sharks Oct-Jan", "World-class diving", "Pristine waters", "Marine park access"],
    lat: -7.92,
    lng: 39.83,
  },
];

export function getHotelsByRegion(region: string): HotelData[] {
  return SAMPLE_HOTELS.filter(
    (h) => h.region.toLowerCase() === region.toLowerCase()
  );
}

export function getHotelBySlug(slug: string): HotelData | undefined {
  return SAMPLE_HOTELS.find((h) => h.slug === slug);
}

export function getAllHotelSlugs(): { slug: string }[] {
  return SAMPLE_HOTELS.map((h) => ({ slug: h.slug }));
}
