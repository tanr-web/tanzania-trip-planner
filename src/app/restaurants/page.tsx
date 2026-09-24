import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Leaf } from "lucide-react";
import { getAllRestaurants } from "@/lib/sanity";
import { SAMPLE_RESTAURANTS } from "@/lib/restaurant-database";
import { getPriceLabel } from "@/lib/utils";
import type { Restaurant } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Restaurants in Tanzania — Best Places to Eat",
  description: "Discover the best restaurants in Tanzania — from traditional Swahili cuisine on Zanzibar to bush dinners on safari. Curated dining picks for every budget.",
};

const CUISINES = ["All", "swahili", "african", "indian", "italian", "international", "seafood"];
const ATMOSPHERES = ["All", "fine_dining", "casual", "beachfront", "rooftop", "bush_dinner"];

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; cuisine?: string; atmosphere?: string }>;
}) {
  const { region, cuisine, atmosphere } = await searchParams;
  let restaurants: Restaurant[] = [];

  try {
    restaurants = await getAllRestaurants();
  } catch (error) {
    console.log('[Restaurants] Sanity fetch failed, using sample data');
  }

  // Use sample restaurants if no Sanity data (for now, always use sample to ensure data displays)
  let displayRestaurants = restaurants.length > 0 ? restaurants : (SAMPLE_RESTAURANTS as unknown as Restaurant[]);
  console.log('[Restaurants] Displaying', displayRestaurants.length, 'restaurants');

  // Apply filters
  if (region && region !== "All") {
    displayRestaurants = displayRestaurants.filter((r) =>
      (r.region?.name || "").toLowerCase().replace(" ", "-") === region
    );
  }
  if (cuisine && cuisine !== "All") {
    displayRestaurants = displayRestaurants.filter((r) =>
      Array.isArray(r.cuisine) ? r.cuisine.includes(cuisine) : r.cuisine === cuisine
    );
  }
  if (atmosphere && atmosphere !== "All") {
    displayRestaurants = displayRestaurants.filter((r) =>
      (r.atmosphere || "").toLowerCase().replace(" ", "_") === atmosphere.toLowerCase().replace(" ", "_")
    );
  }

  function filterLink(key: string, value: string) {
    const params = new URLSearchParams({
      ...(region ? { region } : {}),
      ...(cuisine ? { cuisine } : {}),
      ...(atmosphere ? { atmosphere } : {}),
      [key]: value,
    });
    if (value === "All") params.delete(key);
    return `/restaurants?${params.toString()}`;
  }

  const isActive = (key: string, value: string) => {
    if (key === "cuisine") return (cuisine ?? "All") === value;
    if (key === "atmosphere") return (atmosphere ?? "All") === value;
    return true;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Restaurants in Tanzania</h1>
      <p className="text-stone-600 mb-8">
        From Zanzibar seafood shacks to Serengeti bush dinners — curated picks for every taste.
      </p>

      {/* Filter strip */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-stone-400 self-center">CUISINE:</span>
          {CUISINES.map((c) => (
            <Link
              key={c}
              href={filterLink("cuisine", c)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive("cuisine", c)
                  ? "bg-amber-500 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {c === "All" ? "All Cuisines" : c.charAt(0).toUpperCase() + c.slice(1)}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-stone-400 self-center">VIBE:</span>
          {ATMOSPHERES.map((a) => (
            <Link
              key={a}
              href={filterLink("atmosphere", a)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive("atmosphere", a)
                  ? "bg-amber-500 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {a === "All" ? "All Vibes" : a.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>

      {displayRestaurants.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-xl font-bold text-stone-700 mb-2">No restaurants found</h2>
          <p className="text-stone-500 mb-6">Try adjusting your filters or browse all restaurants.</p>
          <Link href="/restaurants" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
            View All Restaurants →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-stone-600 mb-6">Showing {displayRestaurants.length} restaurants</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRestaurants.map((r) => (
              <RestaurantCard key={r._id || r.slug} restaurant={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  const emoji =
    r.cuisine === "seafood" ? "🦞" :
    r.cuisine === "swahili" ? "🫕" :
    r.cuisine === "indian" ? "🍛" :
    r.atmosphere === "bush_dinner" ? "🌿" : "🍽️";

  return (
    <Link href={`/restaurants/${r.slug}`} className="group block bg-white rounded-2xl border border-stone-200 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-44 bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center text-5xl">
        {emoji}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-tight">{r.name}</h3>
          {r.priceRange && (
            <span className="text-xs text-stone-500 whitespace-nowrap mt-0.5">{getPriceLabel(r.priceRange)}</span>
          )}
        </div>

        {r.region && (
          <div className="flex items-center gap-1 text-stone-500 text-xs mb-3">
            <MapPin className="w-3 h-3" />{r.region.name}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {r.cuisine && (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full capitalize">{r.cuisine}</span>
          )}
          {r.atmosphere && (
            <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-full capitalize">{r.atmosphere.replace("_", " ")}</span>
          )}
          {r.dietaryOptions?.includes("vegetarian") && (
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" />Veg-friendly
            </span>
          )}
        </div>

        {r.openingHours && (
          <div className="flex items-center gap-1 text-stone-400 text-xs">
            <Clock className="w-3 h-3" />{r.openingHours}
          </div>
        )}
      </div>
    </Link>
  );
}
