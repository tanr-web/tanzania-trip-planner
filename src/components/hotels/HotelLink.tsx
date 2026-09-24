"use client";

import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { trackHotelClick } from "@/lib/analytics";
import { getPriceLabel } from "@/lib/utils";
import type { Hotel } from "@/types";

interface HotelLinkProps {
  hotel: Hotel;
}

export default function HotelLink({ hotel }: HotelLinkProps) {
  const handleClick = () => {
    trackHotelClick(hotel.name, hotel.region?.name);
  };

  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      onClick={handleClick}
      className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-40 bg-gradient-to-br from-amber-100 to-stone-200" />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-stone-800">{hotel.name}</h3>
            {hotel.region && (
              <p className="text-xs text-stone-500">{hotel.region.name}</p>
            )}
          </div>
          {hotel.stars && (
            <div className="flex gap-0.5">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
        </div>
        {hotel.type && (
          <p className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full inline-block mb-2">
            {hotel.type}
          </p>
        )}
        {hotel.priceRange && (
          <p className="text-sm text-stone-600 mb-3">
            {getPriceLabel(hotel.priceRange)}
          </p>
        )}
        <div className="flex items-center gap-1 text-amber-600 text-xs font-medium hover:gap-2 transition-all">
          View Details <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}
