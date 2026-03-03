// ─── Shared primitive types ────────────────────────────────────────────────────

export type PriceRange = "budget" | "mid" | "midrange" | "luxury" | "upscale";
export type Circuit = "northern" | "southern" | "zanzibar" | "kilimanjaro" | "western";

// ─── Sanity image type ────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

// ─── Region ───────────────────────────────────────────────────────────────────

export interface Region {
  _id: string;
  name: string;
  slug: string;
  mapCenter: { lat: number; lng: number };
  heroImage: SanityImage;
  description: unknown; // Portable Text
  highlights: string[];
  bestMonths: number[];
  circuit: Circuit;
}

// ─── Article ──────────────────────────────────────────────────────────────────

export interface Article {
  _id: string;
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  excerpt?: string;
  heroImage: SanityImage;
  body: unknown; // Portable Text
  region: Region[];
  tags: string[];
  publishedAt: string;
  readingTime: number;
}

// ─── Hotel ────────────────────────────────────────────────────────────────────

export type HotelType =
  | "beach_resort"
  | "safari_camp"
  | "city_hotel"
  | "boutique"
  | "tented_camp";

export interface Hotel {
  _id: string;
  name: string;
  slug: string;
  region: Region;
  type: HotelType;
  stars: number;
  priceRange: PriceRange;
  lat: number;
  lng: number;
  images: SanityImage[];
  amenities: string[];
  affiliateLinks: {
    bookingCom?: string;
    safaribookings?: string;
    direct?: string;
  };
  description: unknown; // Portable Text
  bestFor: string[];
  ageRestriction?: number;
}

// ─── Restaurant ───────────────────────────────────────────────────────────────

export type Cuisine =
  | "swahili"
  | "seafood"
  | "indian"
  | "italian"
  | "international"
  | "african"
  | "street_food"
  | "bbq"
  | "vegetarian";

export type Atmosphere =
  | "romantic"
  | "casual"
  | "outdoor"
  | "rooftop"
  | "family"
  | "beach"
  | "fine_dining"
  | "beachfront"
  | "bush_dinner";

export type DietaryOption = "vegetarian" | "vegan" | "halal" | "gluten_free";

export interface Restaurant {
  _id: string;
  name: string;
  slug: string;
  region: Region;
  city: string;
  cuisine: Cuisine;
  priceRange: PriceRange;
  atmosphere: Atmosphere;
  dietaryOptions: DietaryOption[];
  lat: number;
  lng: number;
  images: SanityImage[];
  description: unknown; // Portable Text
  mustTryDishes: string[];
  openingHours: string;
  googleMapsUrl?: string;
}

// ─── Itinerary ────────────────────────────────────────────────────────────────

export interface ItineraryDay {
  day: number;
  region: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  accommodation: string;
  drivingTime: string;
  tip: string;
}

export interface GeneratedItinerary {
  title: string;
  summary: string;
  estimatedCost: { min: number; max: number; currency: string };
  days: ItineraryDay[];
  tips: string[];
  seasonalNote: string;
  packingHighlight?: string;
}

// ─── Wizard preferences ───────────────────────────────────────────────────────

export type GroupType = "solo" | "couple" | "family" | "friends";
export type FitnessLevel = "easy" | "moderate" | "active";
export type BudgetTier = "budget" | "mid" | "luxury";

export type Interest =
  | "wildlife"
  | "beach"
  | "kilimanjaro"
  | "culture"
  | "birdwatching"
  | "adventure"
  | "photography"
  | "romantic"
  | "offthebeatenpath";

// ─── New preference dimensions (10-category questionnaire) ────────────────────

/** Category 3 – Accommodation Vibe */
export type AccommodationVibe =
  | "luxury_villa"
  | "eco_lodge"
  | "tented_camp"
  | "urban_hotel"
  | "beach_resort";

/** Category 4 – Transport Preference */
export type TransportPreference =
  | "private_suv"
  | "shared_shuttle"
  | "local_ridehail"
  | "bajaji";

/** Category 5 – Wildlife Priority */
export type WildlifePriority =
  | "big_five"
  | "great_migration"
  | "birdwatching"
  | "marine_life";

/** Category 6 – Cultural Depth */
export type CulturalDepth =
  | "village_visits"
  | "urban_creative"
  | "both"
  | "skip";

/** Category 7 – Pacing Style */
export type PacingStyle = "packed" | "balanced" | "slow";

export interface TripPreferences {
  // Core (Categories 2, 10 – physical conditioning & budget)
  startDate: string;
  endDate: string;
  duration: number;
  groupType: GroupType;
  groupSize: number;
  childrenAges?: number[];
  budget: BudgetTier;
  interests: Interest[];
  startCity: string;
  fitnessLevel: FitnessLevel;         // Category 2 – Physical Conditioning
  travelMonth: number;

  // Category 1 – Dietary Landscape (allergies + restrictions)
  dietary: string[];

  // Category 3 – Accommodation Vibe
  accommodationVibe?: AccommodationVibe;

  // Category 4 – Transport Preference
  transportPreference?: TransportPreference;

  // Category 5 – Wildlife Priorities
  wildlifePriorities?: WildlifePriority[];

  // Category 6 – Cultural Depth
  culturalDepth?: CulturalDepth;

  // Category 7 – Pacing & Buffer
  pacingStyle?: PacingStyle;

  // Category 8 – Environmental Ethics
  ecoEthics?: boolean;

  // Category 9 – Historical Interest
  historicalInterest?: boolean;

  // Category 10 – Budgetary Splurge focus
  budgetSplurge?: string;

  mustSee?: string;
}
