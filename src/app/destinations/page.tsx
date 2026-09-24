import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllRegions } from "@/lib/sanity";
import { REGIONS } from "@/lib/constants";
import DestinationLink from "@/components/destinations/DestinationLink";
import type { Region } from "@/types";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Tanzania Destinations — Regions, Parks & Islands",
  description:
    "Explore Tanzania's iconic destinations: Serengeti National Park, Ngorongoro Crater, Zanzibar, Kilimanjaro, Tarangire, and more. Find the perfect region for your safari.",
  alternates: { canonical: "/destinations" },
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
        {displayRegions.map((r) => (
          <DestinationLink key={r._id ?? r.slug} region={r} />
        ))}
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
