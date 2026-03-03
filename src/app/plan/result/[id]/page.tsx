"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Share2, Bookmark, Clock, Lightbulb, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import type { GeneratedItinerary } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function fetchFromSupabase(shareSlug: string): Promise<GeneratedItinerary | null> {
  try {
    const { data, error } = await supabase
      .from("saved_itineraries")
      .select("itinerary_json")
      .eq("share_slug", shareSlug)
      .single();
    if (error || !data) return null;
    return JSON.parse(data.itinerary_json) as GeneratedItinerary;
  } catch {
    return null;
  }
}

export default function ItineraryResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // 1. Try localStorage first (instant — just generated)
    const cached = localStorage.getItem(`itinerary_${id}`);
    if (cached) {
      try {
        setItinerary(JSON.parse(cached));
        setLoading(false);
        return;
      } catch { /* fall through to Supabase */ }
    }

    // 2. Fall back to Supabase (shared links, returning visitors)
    fetchFromSupabase(id).then((data) => {
      setItinerary(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🦁</div>
          <h1 className="text-2xl font-bold text-stone-800 mb-3">Itinerary Not Found</h1>
          <p className="text-stone-600 mb-6">
            This itinerary link may have expired or been removed. Create a new one!
          </p>
          <Link href="/plan" className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors">
            Plan My Trip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">{itinerary.title}</h1>
        <p className="text-stone-600 text-lg mb-4">{itinerary.summary}</p>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
            💰 Est. ${itinerary.estimatedCost.min.toLocaleString()}–${itinerary.estimatedCost.max.toLocaleString()} {itinerary.estimatedCost.currency} pp
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            📅 {itinerary.days.length} days
          </div>
          {itinerary.seasonalNote && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
              🌦️ {itinerary.seasonalNote}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-stone-200">
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 hover:bg-stone-50 text-sm font-medium text-stone-700 transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share Itinerary
        </button>
        <Link href="/plan" className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors">
          <Bookmark className="w-4 h-4" /> Create New
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Day timeline */}
        <div className="lg:col-span-2 space-y-6">
          {itinerary.days.map((day) => (
            <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500 text-white font-bold text-lg flex items-center justify-center">
                  {day.day}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-stone-800">{day.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-stone-500 mt-0.5">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{day.region}</span>
                    {day.drivingTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{day.drivingTime}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-3 ml-16">
                <div className="flex gap-3">
                  <span className="text-sm font-semibold text-amber-700 w-20 flex-shrink-0">🌅 Morning</span>
                  <p className="text-sm text-stone-600">{day.morning}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm font-semibold text-amber-700 w-20 flex-shrink-0">☀️ Afternoon</span>
                  <p className="text-sm text-stone-600">{day.afternoon}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm font-semibold text-amber-700 w-20 flex-shrink-0">🌙 Evening</span>
                  <p className="text-sm text-stone-600">{day.evening}</p>
                </div>
                {day.accommodation && (
                  <div className="flex gap-3 pt-2 border-t border-stone-100">
                    <span className="text-sm font-semibold text-stone-500 w-20 flex-shrink-0">🏨 Stay</span>
                    <p className="text-sm text-stone-700 font-medium">{day.accommodation}</p>
                  </div>
                )}
                {day.tip && (
                  <div className="mt-3 bg-amber-50 rounded-xl p-3 flex gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">{day.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {itinerary.tips?.length > 0 && (
            <div className="bg-amber-50 rounded-2xl p-5">
              <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" /> Expert Tips
              </h3>
              <ul className="space-y-2">
                {itinerary.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-stone-700 flex gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {itinerary.packingHighlight && (
            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-stone-800 mb-2">🎒 Pack This</h3>
              <p className="text-sm text-stone-700">{itinerary.packingHighlight}</p>
            </div>
          )}

          <div className="bg-stone-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-2">Find Hotels for This Trip</h3>
            <p className="text-stone-300 text-sm mb-4">Browse our curated lodges and camps for every stop on your itinerary.</p>
            <Link href="/hotels" className="block w-full text-center px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full text-sm transition-colors">
              Browse Hotels →
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5">
            <h3 className="font-bold text-stone-800 mb-2">Not quite right?</h3>
            <p className="text-stone-600 text-sm mb-4">Tweak your preferences and generate a new version.</p>
            <Link href="/plan" className="block w-full text-center px-4 py-2.5 border border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold rounded-full text-sm transition-colors">
              Plan Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
