"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackNavClick } from "@/lib/analytics";

export default function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/plan"
        onClick={() => trackNavClick("plan_my_trip")}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg transition-all shadow-xl hover:scale-105"
      >
        Plan My Trip <ArrowRight className="w-5 h-5" />
      </Link>
      <Link
        href="/destinations"
        onClick={() => trackNavClick("explore_destinations")}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-lg transition-all border border-white/30"
      >
        Explore Destinations
      </Link>
    </div>
  );
}
