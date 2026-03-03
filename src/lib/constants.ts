// ─── Tanzania regions ──────────────────────────────────────────────────────────

export const REGIONS = [
  {
    name: "Serengeti",
    slug: "serengeti",
    circuit: "northern",
    mapCenter: { lat: -2.3333, lng: 34.8333 },
    bestMonths: [1, 2, 6, 7, 8, 9, 10],
  },
  {
    name: "Zanzibar",
    slug: "zanzibar",
    circuit: "zanzibar",
    mapCenter: { lat: -6.165, lng: 39.2026 },
    bestMonths: [1, 2, 6, 7, 8, 9, 10],
  },
  {
    name: "Ngorongoro",
    slug: "ngorongoro",
    circuit: "northern",
    mapCenter: { lat: -3.2, lng: 35.5 },
    bestMonths: [1, 2, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "Kilimanjaro",
    slug: "kilimanjaro",
    circuit: "kilimanjaro",
    mapCenter: { lat: -3.0674, lng: 37.3556 },
    bestMonths: [1, 2, 6, 7, 8, 9, 10],
  },
  {
    name: "Tarangire",
    slug: "tarangire",
    circuit: "northern",
    mapCenter: { lat: -3.8333, lng: 36.0 },
    bestMonths: [6, 7, 8, 9, 10],
  },
  {
    name: "Mafia Island",
    slug: "mafia-island",
    circuit: "zanzibar",
    mapCenter: { lat: -7.9167, lng: 39.8333 },
    bestMonths: [10, 11, 1, 2],
  },
] as const;

// ─── Tanzania national park fees (USD, 2026) ──────────────────────────────────

export const PARK_FEES: Record<string, { adult: number; unit: string }> = {
  serengeti: { adult: 82, unit: "per day" },
  ngorongoro: { adult: 82, unit: "conservation fee per day" },
  tarangire: { adult: 59, unit: "per day" },
  "lake-manyara": { adult: 59, unit: "per day" },
  "arusha-np": { adult: 59, unit: "per day" },
  "nyerere-selous": { adult: 50, unit: "per day" },
  ruaha: { adult: 50, unit: "per day" },
  kilimanjaro: { adult: 70, unit: "per day (climbing)" },
  mikumi: { adult: 45, unit: "per day" },
};

// ─── Seasonal calendar ─────────────────────────────────────────────────────────

export const SEASONAL_CALENDAR: Record<
  number,
  { label: string; note: string; highlight: string; avoid: boolean }
> = {
  1: {
    label: "January",
    note: "Dry season. Wildebeest calving in Southern Serengeti. Zanzibar sunny. Fewer tourists.",
    highlight: "Calving Season — Southern Serengeti",
    avoid: false,
  },
  2: {
    label: "February",
    note: "Excellent safari month. Calving continues. Warm and dry. Good value.",
    highlight: "Great Calving Season — Best value month",
    avoid: false,
  },
  3: {
    label: "March",
    note: "Long rains begin (Masika). Not ideal for most activities. Zanzibar wet season starts.",
    highlight: "Green season begins — discounted lodge rates",
    avoid: true,
  },
  4: {
    label: "April",
    note: "Peak long rains. Many lodges close. Roads can be impassable. Avoid for wildlife.",
    highlight: "Low season — some lodges closed",
    avoid: true,
  },
  5: {
    label: "May",
    note: "Rains easing late in month. Lush landscapes. Very few tourists. Good for photography.",
    highlight: "Green landscapes, very few visitors",
    avoid: false,
  },
  6: {
    label: "June",
    note: "Dry season starts. Great Migration heads north. Excellent safari conditions. Peak season begins.",
    highlight: "Migration moves north — peak season starts",
    avoid: false,
  },
  7: {
    label: "July",
    note: "PEAK SEASON. Mara River crossings. Dry and cool. Best overall month for safari + Zanzibar beach.",
    highlight: "Mara River Crossings — Best overall month",
    avoid: false,
  },
  8: {
    label: "August",
    note: "Peak season. Continued river crossings. Busy and pricey but spectacular.",
    highlight: "River crossings continue — book 6+ months ahead",
    avoid: false,
  },
  9: {
    label: "September",
    note: "Shoulder season. Still dry. Kilimanjaro ideal. Quieter than July–Aug. Whale sharks off Mafia.",
    highlight: "Whale sharks at Mafia Island",
    avoid: false,
  },
  10: {
    label: "October",
    note: "Short rains (Mvuli) begin. Migratory birds arrive. Whale sharks peak. Good birdwatching.",
    highlight: "Bird migration begins + whale sharks",
    avoid: false,
  },
  11: {
    label: "November",
    note: "Short rains. Wildebeest return south for calving grounds. Fewer visitors.",
    highlight: "Wildebeest return to Southern Serengeti",
    avoid: false,
  },
  12: {
    label: "December",
    note: "Rains ease mid-month. Christmas/New Year popular (book early). Good beach weather.",
    highlight: "Christmas peak — beautiful landscapes",
    avoid: false,
  },
};

// ─── Budget tiers ─────────────────────────────────────────────────────────────

export const BUDGET_TIERS = {
  budget: {
    label: "Budget",
    dailyCost: "~$150–250",
    dailyCostPerPerson: 150,
    accommodationPerNight: 60,
    foodPerDay: 30,
    description: "Guesthouses, shared safaris, local restaurants",
  },
  mid: {
    label: "Mid-Range",
    dailyCost: "~$250–500",
    dailyCostPerPerson: 300,
    accommodationPerNight: 180,
    foodPerDay: 60,
    description: "Comfortable lodges, private game drives, beach hotels",
  },
  luxury: {
    label: "Luxury",
    dailyCost: "$500+",
    dailyCostPerPerson: 700,
    accommodationPerNight: 500,
    foodPerDay: 120,
    description: "Exclusive camps, fly-in safaris, private guides, fine dining",
  },
} as const;

// ─── AI itinerary system prompt context ──────────────────────────────────────

export const TANZANIA_AI_CONTEXT = `
You are an expert Tanzania safari and travel planner with 15 years of experience.

KEY FACTS:
- Northern Circuit parks (Serengeti, Ngorongoro, Tarangire, Lake Manyara, Arusha NP) are all accessible by road from Arusha.
- Southern Circuit (Nyerere/Selous, Ruaha) requires charter flights from Dar es Salaam — add $500–800pp for flights.
- Zanzibar is 20 minutes by plane from Dar es Salaam or 2 hours by ferry.
- Yellow Fever certificate required if arriving from endemic country.
- Malaria prophylaxis recommended for all mainland Tanzania areas.
- Many safari camps have minimum age requirements (typically 8–12 years).

PARK FEES (USD per person per day):
- Serengeti: $82
- Ngorongoro Conservation Area: $82
- Tarangire: $59
- Lake Manyara: $59
- Nyerere/Selous: $50
- Ruaha: $50
- Kilimanjaro (climbing): $70/day + rescue fee

DRIVING DISTANCES (from Arusha):
- Tarangire: 2h (118km)
- Lake Manyara: 2h (126km)
- Ngorongoro: 3h (180km)
- Serengeti Central: 7h (335km) or 45min flight
- Serengeti North (for Mara crossing): 8h or 1h flight

SEASONAL:
- Peak (Jun–Oct): Best wildlife, dry, pricey. Book 6+ months ahead.
- Green season (Nov–May): Lush, fewer tourists, cheaper, calving Jan–Feb.
- Long rains (Mar–May): Avoid for safari. Some lodges close.
`;

// ─── Great Migration data ─────────────────────────────────────────────────────

export const MIGRATION_DATA: Record<
  number,
  { location: string; description: string; coordinates: [number, number]; recommendedCamps: string[] }
> = {
  1: {
    location: "Southern Serengeti – Ndutu",
    description: "Calving season. 500,000 calves born in 3 weeks. Predator action at its peak.",
    coordinates: [-2.98, 34.77],
    recommendedCamps: ["Ndutu Safari Lodge", "Serengeti Under Canvas – Kusini", "&Beyond Ngorongoro Crater Lodge"],
  },
  2: {
    location: "Southern Serengeti – Ndutu",
    description: "Calving continues. Great for photography. Cheetah and lion activity abundant.",
    coordinates: [-2.98, 34.77],
    recommendedCamps: ["Ndutu Safari Lodge", "Nomad Serengeti Safari Camp"],
  },
  3: {
    location: "Central Serengeti",
    description: "Herd starts moving north. Rains begin. Stunning green landscapes.",
    coordinates: [-2.5, 34.83],
    recommendedCamps: ["Singita Grumeti", "Four Seasons Serengeti"],
  },
  4: {
    location: "Central Serengeti",
    description: "Migration dispersed. Peak rains. Not ideal for viewing — green season rates.",
    coordinates: [-2.44, 34.83],
    recommendedCamps: ["Serengeti Serena Safari Lodge"],
  },
  5: {
    location: "Western Serengeti – Grumeti",
    description: "Herd reaches Grumeti River. River crossings begin. Lush and dramatic.",
    coordinates: [-2.06, 34.47],
    recommendedCamps: ["Singita Grumeti", "Nomad Lamai"],
  },
  6: {
    location: "Northern Serengeti – Mara River (south bank)",
    description: "First Mara River crossings. Exceptional predator sightings.",
    coordinates: [-1.5, 34.83],
    recommendedCamps: ["Lamai Serengeti", "Alex Walker's Serian"],
  },
  7: {
    location: "Northern Serengeti / Masai Mara border",
    description: "PEAK CROSSINGS. Hundreds of thousands of wildebeest cross the Mara River. Spectacular.",
    coordinates: [-1.4, 34.88],
    recommendedCamps: ["Lamai Serengeti", "Sayari Camp", "Alex Walker's Serian North"],
  },
  8: {
    location: "Northern Serengeti – Mara River",
    description: "Crossings continue. Most dramatic month. Very busy — book far ahead.",
    coordinates: [-1.4, 34.88],
    recommendedCamps: ["Sayari Camp", "Lamai Serengeti", "&Beyond Klein's Camp"],
  },
  9: {
    location: "Northern Serengeti",
    description: "Start of return south. Quieter than Aug. Good value. Kilimanjaro ideal.",
    coordinates: [-1.5, 34.83],
    recommendedCamps: ["Sayari Camp", "Serengeti North – Kogatende"],
  },
  10: {
    location: "Eastern & Central Serengeti",
    description: "Herd disperses returning south. Short rains begin. Migratory birds arrive.",
    coordinates: [-2.2, 35.0],
    recommendedCamps: ["Serengeti Serena", "Singita Mara River"],
  },
  11: {
    location: "Central Serengeti moving south",
    description: "Wildebeest heading back to calving grounds. Lush green. Excellent birdwatching.",
    coordinates: [-2.5, 34.83],
    recommendedCamps: ["Four Seasons Serengeti", "Serengeti Safari Lodge"],
  },
  12: {
    location: "Southern Serengeti approaching Ndutu",
    description: "Herd arrives in south. Pregnant females. Beautiful green plains.",
    coordinates: [-2.8, 34.77],
    recommendedCamps: ["Ndutu Safari Lodge", "Serengeti Under Canvas – Kusini"],
  },
};

// ─── Interest labels (for wizard UI) ─────────────────────────────────────────

export const INTERESTS = [
  { value: "wildlife", label: "🦁 Wildlife Safari" },
  { value: "beach", label: "🏖️ Beach & Snorkeling" },
  { value: "kilimanjaro", label: "🏔️ Kilimanjaro Climb" },
  { value: "culture", label: "🏛️ Culture & History" },
  { value: "birdwatching", label: "🐦 Birdwatching" },
  { value: "adventure", label: "🧗 Adventure Sports" },
  { value: "photography", label: "📷 Photography" },
  { value: "romantic", label: "💑 Romantic Getaway" },
  { value: "offthebeatenpath", label: "🗺️ Off the Beaten Path" },
] as const;

// ─── Category 1: Dietary options (allergies + restrictions) ──────────────────

export const DIETARY_OPTIONS = [
  { value: "vegetarian",       label: "🥗 Vegetarian" },
  { value: "vegan",            label: "🌱 Vegan" },
  { value: "halal",            label: "☪️ Halal" },
  { value: "gluten_free",      label: "🌾 Gluten-Free" },
  { value: "nut_allergy",      label: "🥜 Nut Allergy" },
  { value: "shellfish_allergy",label: "🦐 Shellfish Allergy" },
  { value: "dairy_free",       label: "🥛 Dairy-Free" },
  { value: "kosher",           label: "✡️ Kosher" },
] as const;

// ─── Category 3: Accommodation Vibe ──────────────────────────────────────────

export const ACCOMMODATION_VIBES = [
  {
    value: "luxury_villa",
    label: "🏰 Luxury Villa",
    desc: "Private villas, $1,200+/night, butler service & bespoke dining",
  },
  {
    value: "eco_lodge",
    label: "🌿 Eco-Lodge",
    desc: "Solar-powered, low-impact camps with eco-tourism certification",
  },
  {
    value: "tented_camp",
    label: "⛺ Tented Safari Camp",
    desc: "Classic under-canvas experience — immersive & atmospheric",
  },
  {
    value: "urban_hotel",
    label: "🏨 Urban Boutique Hotel",
    desc: "Contemporary city stays with local design and rooftop bars",
  },
  {
    value: "beach_resort",
    label: "🏖️ Beach Resort",
    desc: "Oceanfront properties with pools, water sports & spa",
  },
] as const;

// ─── Category 4: Transport Preference ────────────────────────────────────────

export const TRANSPORT_OPTIONS = [
  {
    value: "private_suv",
    label: "🚙 Private 4×4 SUV",
    desc: "Most flexible — dedicated vehicle, guide & pop-up roof",
  },
  {
    value: "shared_shuttle",
    label: "🚌 Shared Shuttle",
    desc: "Budget-friendly, meet fellow travellers on scheduled transfers",
  },
  {
    value: "local_ridehail",
    label: "📲 Ride-hailing (Bolt)",
    desc: "App-based taxis in cities — authentic and affordable",
  },
  {
    value: "bajaji",
    label: "🛺 Bajaji / Tuk-tuk",
    desc: "True local character for short urban hops in Stone Town & Arusha",
  },
] as const;

// ─── Category 5: Wildlife Priorities ─────────────────────────────────────────

export const WILDLIFE_PRIORITIES = [
  {
    value: "big_five",
    label: "🦁 Big Five",
    desc: "Lion, leopard, elephant, buffalo, rhino — classic safari bucket list",
  },
  {
    value: "great_migration",
    label: "🦬 Great Migration",
    desc: "Annual wildebeest spectacle aligned to seasonal calendar",
  },
  {
    value: "birdwatching",
    label: "🐦 Birdwatching",
    desc: "1,100+ species including Eurasian migrants and rare endemics",
  },
  {
    value: "marine_life",
    label: "🐋 Marine Life",
    desc: "Whale sharks, dolphins & sea turtles — Mafia Island & Zanzibar",
  },
] as const;

// ─── Category 6: Cultural Depth ──────────────────────────────────────────────

export const CULTURAL_DEPTH_OPTIONS = [
  {
    value: "village_visits",
    label: "🏡 Village Visits",
    desc: "Maasai bomas, Chagga coffee farms, authentic community home-stays",
  },
  {
    value: "urban_creative",
    label: "🎨 Urban Creative Scene",
    desc: "Dar es Salaam galleries, Bongo Flava music venues, Stone Town cafés",
  },
  {
    value: "both",
    label: "🌍 Both",
    desc: "A curated blend of rural heritage and city culture",
  },
  {
    value: "skip",
    label: "⏭️ Skip Cultural Activities",
    desc: "Prioritise wildlife and nature — no village detours",
  },
] as const;

// ─── Category 7: Pacing Style ─────────────────────────────────────────────────

export const PACING_STYLES = [
  {
    value: "packed",
    label: "⚡ Back-to-Back",
    desc: "Maximise every hour — pre-dawn game drives, multiple parks, no wasted days",
  },
  {
    value: "balanced",
    label: "⚖️ Balanced",
    desc: "A mix of activity and downtime, one buffer day built in per 4 days",
  },
  {
    value: "slow",
    label: "🌅 Slow Travel",
    desc: "Deeper stays per location, buffer days, unhurried and restorative",
  },
] as const;
