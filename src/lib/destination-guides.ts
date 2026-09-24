export interface DestinationGuide {
  name: string;
  slug: string;
  overview: string;
  highlights: string[];
  bestTime: string;
  activities: string[];
  accommodation: string;
  gettingThere: string;
  tips: string[];
  bestMonths: number[];
}

export const DESTINATION_GUIDES: Record<string, DestinationGuide> = {
  serengeti: {
    name: "Serengeti National Park",
    slug: "serengeti",
    overview:
      "The Serengeti is Tanzania's crown jewel and one of the world's greatest natural wonders. Spanning 14,750 square kilometres of pristine wilderness, this UNESCO World Heritage Site is home to over 1.5 million wildebeest, 500,000 zebra, and the Big Five. The name 'Serengeti' comes from the Maasai word for 'the place where the land runs on forever' — and it lives up to that description.",
    highlights: [
      "The Great Migration (1.5+ million animals)",
      "Big Five wildlife guaranteed viewing",
      "Endless golden plains and dramatic sunsets",
      "Ndutu (calving season) or Mara (river crossings)",
      "Over 3,000 lions roaming the park",
    ],
    bestTime: "June–October (dry season, Great Migration); January–February (calving season)",
    activities: [
      "Game drives (early morning and sunset)",
      "Hot air balloon safaris",
      "Walking safaris with ranger guides",
      "Photography tours",
      "Birdwatching (500+ species)",
    ],
    accommodation:
      "Ranges from budget camping safaris ($100–200/night) to ultra-luxury exclusive camps ($1,000+/night). Popular lodges include Serena Serengeti, Nomad Serengeti, and Singita Mara River Camp.",
    gettingThere:
      "Fly into Kilimanjaro International Airport (JRO) or Dar es Salaam. Most visitors drive 4–6 hours to their camps, or fly directly via chartered aircraft (60–90 mins).",
    tips: [
      "Book 6–12 months in advance for July–August",
      "Stay at least 3 nights for best wildlife viewing",
      "Hire an experienced guide — they make all the difference",
      "Bring binoculars, camera with long lens, and high SPF sunscreen",
      "Pack neutral-coloured clothing (khaki, olive, beige)",
    ],
    bestMonths: [1, 2, 6, 7, 8, 9, 10],
  },

  zanzibar: {
    name: "Zanzibar",
    slug: "zanzibar",
    overview:
      "Zanzibar is a spice-scented archipelago off Tanzania's coast that feels like another world. With pristine beaches, turquoise waters, and the UNESCO-listed Stone Town, Zanzibar is the perfect beach extension after a safari. Most Tanzania travellers add 3–5 days here at the end of their trip — and it becomes the highlight.",
    highlights: [
      "White-sand beaches (Nungwi, Kendwa, Paje)",
      "Stone Town UNESCO World Heritage site",
      "Mnemba Atoll snorkelling",
      "Spice island tours",
      "Warm, clear water year-round",
    ],
    bestTime: "June–October (dry, sunny); January–February (warm, clear water); December (Christmas peak)",
    activities: [
      "Snorkelling and diving",
      "Stone Town walking tours",
      "Spice plantation tours",
      "Dhow sunset cruises",
      "Swimming with dolphins (Kizimkazi)",
      "Kitesurfing (Paje)",
    ],
    accommodation:
      "Budget: guesthouses ($30–60/night). Mid-range: comfortable hotels ($100–250/night). Luxury: beach resorts ($300+/night). Popular options: The Palms, Zanzibar Coffee House, Breezes Beach Resort.",
    gettingThere:
      "Fly from Dar es Salaam (25 mins, ~$60) or Kilimanjaro. Ferry from Dar (2 hours, ~$35). Most safari itineraries include a connecting flight from your safari lodge.",
    tips: [
      "Book ahead in peak season (July–August, December)",
      "Respect local Muslim customs — cover shoulders/knees in Stone Town",
      "Swim at high tide on east coast beaches",
      "Bargain in markets but always respectfully",
      "Fresh seafood is incredible but verify sources",
    ],
    bestMonths: [1, 2, 6, 7, 8, 9, 10, 12],
  },

  ngorongoro: {
    name: "Ngorongoro Crater",
    slug: "ngorongoro",
    overview:
      "A collapsed volcanic caldera and UNESCO World Heritage Site, Ngorongoro Crater is sometimes called the 'Eighth Wonder of the World.' The crater floor shelters one of the densest concentrations of wildlife on Earth — roughly 25,000 animals in a 260 km² basin. Unlike the Serengeti, the crater's enclosed ecosystem means animals cannot leave, resulting in near-guaranteed sightings.",
    highlights: [
      "Guaranteed Big Five sightings",
      "Critically endangered black rhino (20–25 in crater)",
      "One-day accessible crater descent and ascent",
      "Spectacular crater rim scenery",
      "Lake Magadi with flamingos",
    ],
    bestTime: "Year-round (animals can't leave). Best: January–February, July–October",
    activities: [
      "Full-day crater descent and wildlife game drive",
      "Crater rim walks",
      "Olduvai Gorge archaeological site visit",
      "Hiking Olmoti or Empakaai craters",
      "Maasai village cultural visits",
    ],
    accommodation:
      "On crater rim: Ngorongoro Crater Lodge (luxury, $400+), Serena Ngorongoro. Budget: Simba Campsite on rim ($50/night). Most visitors do 1–2 nights and combine with Serengeti.",
    gettingThere:
      "1.5–2 hours by road from Arusha. Usually combined with Tarangire (1 hr south) or Lake Manyara (1 hr north) on the Northern Circuit.",
    tips: [
      "Arrive at crater descent at 7am for best light and earliest game viewing",
      "Bring warm layers — the rim sits at 2,200–2,500m and mornings are cold",
      "The crater descent fee is $295 per vehicle (non-negotiable) — worth every penny",
      "Budget a full day (6–7 hours) for the crater experience",
      "Rhino sightings: ask your guide to focus on the southwestern crater area",
    ],
    bestMonths: [1, 2, 6, 7, 8, 9, 10, 11, 12],
  },

  kilimanjaro: {
    name: "Mount Kilimanjaro",
    slug: "kilimanjaro",
    overview:
      "At 5,895 metres, Mount Kilimanjaro is Africa's highest peak and the world's tallest free-standing mountain. Unlike most high mountains, Kilimanjaro requires no technical climbing — just stamina and altitude acclimatisation. Every year ~50,000 people attempt the summit; 65–85% succeed, depending on route and preparation.",
    highlights: [
      "Highest mountain in Africa",
      "Sunrise over clouds at Uhuru Peak",
      "Five distinct ecological zones",
      "No ropes or crampons needed",
      "5-day to 10-day trekking routes available",
    ],
    bestTime: "January–February, June–October (clear skies). Avoid March–May, November.",
    activities: [
      "Summit trek (choose from 7 routes)",
      "Acclimatisation hikes on lower slopes",
      "Scenic crater rim walk at summit",
      "Photography at sunset/sunrise",
    ],
    accommodation:
      "Camping at altitude on mountain (provided by operators). Most operators offer 3-star quality huts and tents. Budget $1,500–2,200; Mid-range $2,500–3,500; Luxury $4,000+.",
    gettingThere:
      "Gate entrance 1 hour from Moshi or Arusha (Kilimanjaro airport). Most trekkers use one of two main gates: Marangu or Machame.",
    tips: [
      "Choose 7+ day routes — success rates improve dramatically with extra acclimatisation days",
      "Machame (6–7 days) is the most popular and has excellent success rates",
      "Diamox (prescription altitude medication) can help acclimatisation",
      "Train 3–6 months: long hikes with elevation gain",
      "Hire reputable operator — your guide's experience matters at altitude",
      "Pole pole (slowly, slowly) is the Kili mantra",
      "Tip your crew ($250–400) — porter welfare and safety depends on fair wages",
    ],
    bestMonths: [1, 2, 6, 7, 8, 9, 10],
  },

  tarangire: {
    name: "Tarangire National Park",
    slug: "tarangire",
    overview:
      "Tarangire National Park is named after the Tarangire River, which is the lifeblood of the park during the dry season. From June–October, animals concentrate around this river for water, creating some of Africa's best wildlife viewing. Tarangire is famous for enormous elephant herds (500+) and ancient baobab trees. It's less crowded than Serengeti and offers exceptional value.",
    highlights: [
      "Largest elephant herds in Tanzania (500+ animals)",
      "Ancient baobab trees and scenic landscapes",
      "Big Five concentrated in dry season",
      "Great value compared to Serengeti",
      "Excellent bird watching (550+ species)",
    ],
    bestTime: "June–October (dry season, peak animals). Still good: January–February.",
    activities: [
      "Game drives (early morning and sunset)",
      "Walking safaris",
      "Bird watching tours",
      "Photography (especially elephant portraits)",
      "Picnic excursions along Tarangire River",
    ],
    accommodation:
      "Tarangire Safari Lodge (excellent elephant views), Tarangire Sopa Lodge, Ngorongoro Sopa Lodge nearby. Budget $50–150/night; Luxury $300+.",
    gettingThere:
      "2 hours drive from Arusha. Usually combined with Lake Manyara (1 hr) and Ngorongoro (1.5 hrs) on Northern Circuit.",
    tips: [
      "Dry season (June–Oct) is best for elephant viewing",
      "January–February has excellent game viewing and is 20–30% cheaper",
      "Hire experienced guide — Tarangire has excellent naturalists",
      "Bring good binoculars for birdwatching",
      "River crossings and elephant portraits are best near Tarangire River",
    ],
    bestMonths: [1, 2, 6, 7, 8, 9, 10],
  },

  "mafia-island": {
    name: "Mafia Island",
    slug: "mafia-island",
    overview:
      "Mafia Island is Tanzania's premier diving and snorkelling destination. Located 50 km off the coast, this marine island sanctuary is home to whale sharks, manta rays, colourful coral reefs, and pristine beaches. Mafia is less touristy than Zanzibar and offers a more authentic island experience.",
    highlights: [
      "World-class snorkelling and diving",
      "Whale sharks (October–January)",
      "Manta ray encounters",
      "Pristine coral reefs",
      "Peaceful, less-touristy island vibe",
    ],
    bestTime: "October–February (whale sharks). June–September (dry season). December–January (peak).",
    activities: [
      "Snorkelling and scuba diving",
      "Whale shark swimming tours",
      "Dhow sailing excursions",
      "Beach relaxation",
      "Crab Island day trips",
    ],
    accommodation:
      "Mafia Island Lodge, Kinasi Lodge, Pole Pole Bungalows. Budget $60–150/night; Luxury $250+. Most accommodations include diving/snorkelling packages.",
    gettingThere:
      "Domestic flight from Dar es Salaam (30 mins, $80–150). Ferry available but less reliable. Best accessed via Dar.",
    tips: [
      "Best whale shark season: October–January (seen on 70–80% of dives)",
      "Book diving certification ahead if needed",
      "Bring reef-safe sunscreen (coral protection)",
      "Pack seasickness medication — boat rides can be choppy",
      "A 4–5 day stay includes good diving variety",
    ],
    bestMonths: [1, 2, 10, 11, 12],
  },
};

export function getDestinationGuide(slug: string): DestinationGuide | undefined {
  return DESTINATION_GUIDES[slug];
}
