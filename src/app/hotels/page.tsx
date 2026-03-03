import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Star, MapPin } from "lucide-react";
import { getAllHotels } from "@/lib/sanity";
import { getPriceLabel } from "@/lib/utils";
import type { Hotel } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hotels & Safari Lodges in Tanzania",
  description: "Browse 300+ curated hotels, safari camps, and beach resorts in Tanzania and Zanzibar. Filter by region, budget, and amenities.",
};

const REGIONS = ["All", "Serengeti", "Zanzibar", "Ngorongoro", "Kilimanjaro", "Tarangire", "Dar es Salaam", "Arusha", "Mafia Island"];
const TYPES = ["All", "Safari Camp", "Beach Resort", "City Hotel", "Boutique", "Tented Camp"];
const BUDGETS = ["All", "Budget", "Mid-Range", "Luxury"];

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; budget?: string; type?: string }>;
}) {
  const params = await searchParams;
  let hotels: Hotel[] = [];

  try {
    hotels = await getAllHotels();
  } catch {
    // Sanity not yet configured
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">Hotels & Safari Lodges</h1>
        <p className="text-stone-600 max-w-2xl">
          Hand-curated accommodation across Tanzania and Zanzibar — from luxury tented camps in the Serengeti to pristine beach resorts in Zanzibar.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-stone-50 rounded-2xl p-5 mb-8 space-y-4">
        <div>
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Region</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <Link
                key={r}
                href={r === "All" ? "/hotels" : `/hotels?region=${r.toLowerCase()}`}
                className="px-3 py-1.5 rounded-full text-sm border border-stone-300 hover:border-amber-400 hover:bg-amber-50 transition-colors text-stone-700"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Budget</p>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Link
                  key={b}
                  href={b === "All" ? "/hotels" : `/hotels?budget=${b.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-full text-sm border border-stone-300 hover:border-amber-400 hover:bg-amber-50 transition-colors text-stone-700"
                >
                  {b}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Type</p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <Link
                  key={t}
                  href={t === "All" ? "/hotels" : `/hotels?type=${t.toLowerCase().replace(" ", "_")}`}
                  className="px-3 py-1.5 rounded-full text-sm border border-stone-300 hover:border-amber-400 hover:bg-amber-50 transition-colors text-stone-700"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel grid or empty state */}
      {hotels.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏕️</div>
          <h2 className="text-xl font-bold text-stone-800 mb-2">Hotels Coming Soon</h2>
          <p className="text-stone-500 mb-6">We&apos;re curating 300+ hotels and lodges. Check back soon!</p>
          <Link href="/plan" className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors">
            Plan Your Trip Instead
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  const affiliateUrl = hotel.affiliateLinks?.bookingCom ?? hotel.affiliateLinks?.safaribookings ?? hotel.affiliateLinks?.direct;
  const bookingUrl = affiliateUrl
    ? `/api/track-click?program=${hotel.affiliateLinks?.bookingCom ? "booking" : "safaribookings"}&hotel=${hotel.slug}&dest=${encodeURIComponent(affiliateUrl)}`
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center text-4xl">
        {hotel.type === "beach_resort" ? "🏖️" : hotel.type === "safari_camp" || hotel.type === "tented_camp" ? "🏕️" : "🏨"}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors line-clamp-1 text-lg">
            {hotel.name}
          </h3>
          {hotel.stars && (
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-stone-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{hotel.region?.name ?? "Tanzania"}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            {getPriceLabel(hotel.priceRange)}
          </span>
          {hotel.type && (
            <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs rounded-full capitalize">
              {hotel.type.replace("_", " ")}
            </span>
          )}
          {hotel.ageRestriction && (
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {hotel.ageRestriction}+ years
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/hotels/${hotel.slug}`}
            className="flex-1 text-center py-2 border border-stone-300 hover:bg-stone-50 text-sm font-medium text-stone-700 rounded-full transition-colors"
          >
            View Details
          </Link>
          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Book Now <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
