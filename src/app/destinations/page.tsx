import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getAllRegions } from "@/lib/sanity";
import { REGIONS } from "@/lib/constants";
import type { Region } from "@/types";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Tanzania Destinations — Regions, Parks & Islands",
  description:
    "Explore Tanzania's iconic destinations: Serengeti National Park, Ngorongoro Crater, Zanzibar, Kilimanjaro, Tarangire, and more. Find the perfect region for your safari.",
  alternates: { canonical: "/destinations" },
};

const REGION_EMOJIS: Record<string, string> = {
  serengeti: "🦁",
  ngorongoro: "🌋",
  zanzibar: "🏝️",
  kilimanjaro: "⛰️",
  tarangire: "🐘",
  "lake-manyara": "🦩",
  ruaha: "🌿",
  selous: "🐊",
};

export default async function DestinationsPage() {
  let regions: Region[] = [];
  try {
    regions = await getAllRegions();
  } catch {
    // Use static data if Sanity not configured
  }

  const displayRegions = regions.length > 0 ? regions : REGIONS.map((r) => ({
    _id: r.slug,
    name: r.name,
    slug: r.slug,
    description: `${r.name} is one of Tanzania's most iconic destinations. Best visited during ${r.bestMonths?.join(", ") ?? "the dry season"}.`,
    bestMonths: r.bestMonths,
    highlights: [],
  } as unknown as Region));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Tanzania Destinations</h1>
      <p className="text-stone-600 mb-10 max-w-2xl">
        From the golden plains of the Serengeti to the turquoise waters of Zanzibar — discover Tanzania's most breathtaking regions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRegions.map((r) => {
          const emojiKey = r.slug?.toLowerCase();
          const emoji = REGION_EMOJIS[emojiKey] ?? "🌍";

          return (
            <Link
              key={r._id ?? r.slug}
              href={`/destinations/${r.slug}`}
              className="group block bg-white rounded-2xl border border-stone-200 hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="h-44 bg-gradient-to-br from-amber-50 to-stone-200 flex items-center justify-center text-6xl">
                {emoji}
              </div>
              <div className="p-5">
                <h2 className="font-bold text-stone-800 text-lg group-hover:text-amber-700 transition-colors mb-2">
                  {r.name}
                </h2>
                {typeof r.description === "string" && r.description && (
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">{r.description}</p>
                )}
                {r.bestMonths?.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-4">
                    <MapPin className="w-3 h-3" />
                    Best: {Array.isArray(r.bestMonths) ? r.bestMonths.join(", ") : r.bestMonths}
                  </div>
                )}
                <div className="flex items-center gap-1 text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
                  Explore {r.name} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Map teaser */}
      <div className="mt-12 bg-amber-50 rounded-3xl p-8 text-center">
        <div className="text-5xl mb-4">🗺️</div>
        <h2 className="text-xl font-bold text-stone-800 mb-2">Not Sure Where to Go?</h2>
        <p className="text-stone-600 mb-5">Our AI will build a personalised itinerary based on your interests, budget, and travel dates.</p>
        <Link href="/plan" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
          Plan My Tanzania Trip →
        </Link>
      </div>
    </div>
  );
}
