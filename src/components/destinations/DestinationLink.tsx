"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { trackDestinationView } from "@/lib/analytics";
import type { Region } from "@/types";

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

interface DestinationLinkProps {
  region: Region;
}

export default function DestinationLink({ region }: DestinationLinkProps) {
  const handleClick = () => {
    trackDestinationView(region.name);
  };

  const emojiKey = region.slug?.toLowerCase();
  const emoji = REGION_EMOJIS[emojiKey] ?? "🌍";

  return (
    <Link
      href={`/destinations/${region.slug}`}
      onClick={handleClick}
      className="group block bg-white rounded-2xl border border-stone-200 hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="h-44 bg-gradient-to-br from-amber-50 to-stone-200 flex items-center justify-center text-6xl">
        {emoji}
      </div>
      <div className="p-5">
        <h2 className="font-bold text-stone-800 text-lg group-hover:text-amber-700 transition-colors mb-2">
          {region.name}
        </h2>
        {typeof region.description === "string" && region.description && (
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {region.description}
          </p>
        )}
        {region.bestMonths?.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-4">
            <MapPin className="w-3 h-3" />
            Best: {Array.isArray(region.bestMonths) ? region.bestMonths.join(", ") : region.bestMonths}
          </div>
        )}
        <div className="flex items-center gap-1 text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
          Explore {region.name} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
