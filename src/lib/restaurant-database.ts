export interface RestaurantData {
  name: string;
  slug: string;
  region: string;
  city: string;
  cuisine: string[];
  priceRange: "budget" | "mid" | "luxury";
  atmosphere: string;
  description: string;
  mustTry: string[];
  openingHours?: string;
  lat?: number;
  lng?: number;
}

export const SAMPLE_RESTAURANTS: RestaurantData[] = [
  // Zanzibar - Stone Town
  {
    name: "Forodhani Gardens Night Market",
    slug: "forodhani-gardens",
    region: "Zanzibar",
    city: "Stone Town",
    cuisine: ["Zanzibar Pizza", "Seafood", "Street Food", "Local"],
    priceRange: "budget",
    atmosphere: "Bustling open-air market on waterfront. Lively, authentic, crowded.",
    description:
      "The heart of Stone Town street food culture. Fresh seafood grilled to order, Zanzibar pizza (not actual pizza!), urojo, and sugarcane juice. Go at dusk for the full experience.",
    mustTry: [
      "Zanzibar pizza (meat/vegetable pocket)",
      "Grilled lobster",
      "Urojo (Zanzibar mix soup)",
      "Fresh sugarcane juice",
    ],
    openingHours: "5pm–10pm daily",
    lat: -6.16,
    lng: 39.19,
  },

  {
    name: "The Bistro",
    slug: "the-bistro-stone-town",
    region: "Zanzibar",
    city: "Stone Town",
    cuisine: ["Fusion", "Seafood", "International"],
    priceRange: "mid",
    atmosphere: "Rooftop restaurant with Stone Town and ocean views. Romantic.",
    description:
      "Upscale rooftop dining overlooking Stone Town's labyrinth and Indian Ocean. Excellent seafood fusion and cocktails. Perfect for dinner with a view.",
    mustTry: ["Grilled kingfish", "Octopus salad", "Seafood pasta", "House cocktails"],
    openingHours: "6pm–11pm daily",
    lat: -6.163,
    lng: 39.195,
  },

  {
    name: "Emerson Spice Restaurant",
    slug: "emerson-spice",
    region: "Zanzibar",
    city: "Stone Town",
    cuisine: ["Swahili", "Indian", "Seafood"],
    priceRange: "luxury",
    atmosphere: "Historic building with rooftop terrace. Elegant, upscale.",
    description:
      "Fine dining in a restored 19th-century palace. Multi-course Swahili and Indian cuisine celebrating the spice trade heritage. Reservations essential.",
    mustTry: ["Spice-rubbed fish", "Biryani", "Coconut curries", "Sunset cocktails"],
    openingHours: "Dinner only, reservations required",
    lat: -6.164,
    lng: 39.194,
  },

  // Zanzibar - Nungwi
  {
    name: "Nungwi Beach Restaurant",
    slug: "nungwi-beach-restaurant",
    region: "Zanzibar",
    city: "Nungwi",
    cuisine: ["Seafood", "Swahili", "International"],
    priceRange: "mid",
    atmosphere: "Beach shack on white sand. Casual, relaxed, feet-in-sand dining.",
    description:
      "Toes-in-sand seafood restaurant right on Nungwi beach. Fresh daily catch, cold beers, sunset views. Perfect casual beach dinner.",
    mustTry: [
      "Grilled reef fish",
      "Prawns with garlic",
      "Coconut rice",
      "Fresh fruit smoothies",
    ],
    openingHours: "11am–10pm daily",
    lat: -6.23,
    lng: 39.26,
  },

  // Arusha
  {
    name: "Arusha Coffee Lodge Restaurant",
    slug: "arusha-coffee-lodge",
    region: "Arusha",
    city: "Arusha",
    cuisine: ["Tanzanian", "International", "Coffee"],
    priceRange: "mid",
    atmosphere: "Colonial-style lodge with garden. Peaceful, upscale-casual.",
    description:
      "Restaurant within a working coffee plantation. Farm-to-table cuisine featuring Tanzanian coffee and local ingredients. Great for pre/post-safari meals.",
    mustTry: ["Coffee-crusted steak", "Tanzanian coffee tasting", "Farm vegetables"],
    openingHours: "7am–10pm daily",
    lat: -3.35,
    lng: 36.65,
  },

  {
    name: "New Arusha Hotel Restaurant",
    slug: "new-arusha-hotel",
    region: "Arusha",
    city: "Arusha",
    cuisine: ["Tanzanian", "International"],
    priceRange: "mid",
    atmosphere: "Historic hotel restaurant. Classic, traditional.",
    description:
      "Since 1906, a landmark restaurant serving local and international cuisine. Good for understanding Arusha's safari history and meeting other travellers.",
    mustTry: ["Tanzanian stew", "Grilled chicken", "Local beers"],
    openingHours: "6:30am–10pm daily",
    lat: -3.367,
    lng: 36.683,
  },

  // Dar es Salaam
  {
    name: "The Slipway Restaurant",
    slug: "the-slipway-dar",
    region: "Dar es Salaam",
    city: "Dar es Salaam",
    cuisine: ["Seafood", "International", "Fusion"],
    priceRange: "luxury",
    atmosphere: "Waterfront restaurant with ocean views. Sophisticated.",
    description:
      "Premier fine dining in Dar es Salaam overlooking the harbor. Fresh seafood, excellent wine list, impeccable service. Dar's best restaurant.",
    mustTry: ["Grilled barracuda", "Lobster thermidor", "Fresh sashimi"],
    openingHours: "Lunch 12-3pm, Dinner 6-11pm",
    lat: -6.8,
    lng: 39.27,
  },

  {
    name: "Urojo Street Food Cart",
    slug: "urojo-street-food",
    region: "Dar es Salaam",
    city: "Dar es Salaam",
    cuisine: ["Street Food", "Tanzanian"],
    priceRange: "budget",
    atmosphere: "Street-side cart. Authentic, local, busy.",
    description:
      "Authentic street food urojo from a local cart. Get there early, it sells out. The real Tanzanian experience.",
    mustTry: ["Urojo (Dar version)", "Fresh fruit"],
    openingHours: "6am–10am (until sold out)",
    lat: -6.8,
    lng: 39.27,
  },

  // Kilimanjaro Area (Moshi)
  {
    name: "Kibo Palace Dining Hall",
    slug: "kibo-palace-dining",
    region: "Kilimanjaro",
    city: "Moshi",
    cuisine: ["Tanzanian", "International", "Vegetarian"],
    priceRange: "mid",
    atmosphere: "Hotel dining room. Reliable, good for groups.",
    description:
      "Hotel restaurant catering to trekkers pre/post-Kili. Good vegetarian options, hearty portions, buffet style.",
    mustTry: ["Kilimanjaro Bean Stew", "Grilled tilapia", "Banana dishes"],
    openingHours: "7am–10pm daily",
    lat: -3.36,
    lng: 37.66,
  },

  // Mafia Island
  {
    name: "Mafia Island Lodge Dining",
    slug: "mafia-island-dining",
    region: "Mafia Island",
    city: "Mafia Island",
    cuisine: ["Seafood", "International", "Coastal"],
    priceRange: "luxury",
    atmosphere: "Resort restaurant with ocean views. Upscale, all-inclusive.",
    description:
      "All-inclusive resort dining featuring daily fresh catch and international cuisine. Breakfast, lunch, and dinner included with stay.",
    mustTry: ["Fresh grilled reef fish", "Lobster", "Tropical fruits"],
    openingHours: "Included with resort stay",
    lat: -7.92,
    lng: 39.83,
  },

  // Serengeti
  {
    name: "Serengeti Tented Camp Dining",
    slug: "serengeti-camp-dining",
    region: "Serengeti",
    city: "Serengeti",
    cuisine: ["Tanzanian", "International", "Safari"],
    priceRange: "mid",
    atmosphere: "Communal camp dining. Social, authentic.",
    description:
      "Safari camp communal meals featuring local Tanzanian cuisine and international dishes. Meals included with safari package.",
    mustTry: ["Ugali", "Bush salads", "Safari stew"],
    openingHours: "Included with camp stay",
    lat: -2.35,
    lng: 34.82,
  },

  {
    name: "Singita Mara Gourmet Dining",
    slug: "singita-mara-dining",
    region: "Serengeti",
    city: "Serengeti",
    cuisine: ["French", "International", "Fusion"],
    priceRange: "luxury",
    atmosphere: "Fine dining at luxury camp. Elegant, exclusive.",
    description:
      "Michelin-trained chefs prepare gourmet meals at ultra-luxury camp. Multi-course dinners under the stars. Inclusive with stay.",
    mustTry: ["Chef's tasting menu", "Wine pairings", "Safari specialties"],
    openingHours: "Included with camp stay",
    lat: -2.4,
    lng: 34.85,
  },
];

export function getRestaurantsByRegion(region: string): RestaurantData[] {
  return SAMPLE_RESTAURANTS.filter(
    (r) => r.region.toLowerCase() === region.toLowerCase()
  );
}

export function getRestaurantBySlug(slug: string): RestaurantData | undefined {
  return SAMPLE_RESTAURANTS.find((r) => r.slug === slug);
}

export function getAllRestaurantSlugs(): { slug: string }[] {
  return SAMPLE_RESTAURANTS.map((r) => ({ slug: r.slug }));
}
