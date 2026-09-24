"use client";

import { useState } from "react";
import Link from "next/link";
import { MIGRATION_DATA, SEASONAL_CALENDAR } from "@/lib/constants";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MigrationCalendarPage() {
  const currentMonthIndex = new Date().getMonth();
  const [activeMonth, setActiveMonth] = useState(currentMonthIndex);

  const migData = MIGRATION_DATA[activeMonth + 1];  // 1-indexed
  const seasonal = SEASONAL_CALENDAR[activeMonth + 1];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Great Migration Calendar</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Track the world&apos;s greatest wildlife spectacle month-by-month. Over 1.5 million wildebeest continuously circle the Serengeti-Mara ecosystem.
      </p>

      {/* Month tabs */}
      <div className="flex overflow-x-auto gap-1 mb-8 pb-2 -mx-1 px-1" role="tablist" aria-label="Select month">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setActiveMonth(i)}
            role="tab"
            aria-selected={activeMonth === i}
            aria-label={m}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeMonth === i
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Herd location */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h2 className="font-bold text-stone-800 text-lg mb-4">🐃 Where are the wildebeest in {MONTHS[activeMonth]}?</h2>
            {migData ? (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">📍</div>
                  <div>
                    <p className="font-medium text-stone-800">{migData.location}</p>
                    <p className="text-stone-600 text-sm mt-1">{migData.description}</p>
                  </div>
                </div>
                {(activeMonth === 0 || activeMonth === 1) && (
                  <div className="bg-green-50 rounded-xl p-3 text-sm text-green-800">
                    🐣 <strong>Calving season!</strong> Thousands of wildebeest calves are born this month — a spectacular sight.
                  </div>
                )}
                {(activeMonth >= 5 && activeMonth <= 9) && (
                  <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-800">
                    🐊 <strong>River crossings!</strong> Look out for dramatic Mara or Grumeti river crossings this month.
                  </div>
                )}
              </>
            ) : (
              <p className="text-stone-500">Migration data for this month is being updated.</p>
            )}
          </div>

          {/* Seasonal conditions */}
          {seasonal && (
            <div className={`rounded-2xl p-6 ${seasonal.avoid ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}>
              <h2 className="font-bold text-stone-800 text-lg mb-3">
                {seasonal.avoid ? "⚠️" : "☀️"} Conditions in {MONTHS[activeMonth]}
              </h2>
              <p className="text-stone-700 text-sm mb-3">{seasonal.note}</p>
              {seasonal.highlight && (
                <div className="flex items-start gap-2 text-stone-600 text-sm">
                  <span className="text-amber-500 mt-0.5">★</span>{seasonal.highlight}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recommended camps sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sticky top-24">
            <h3 className="font-bold text-stone-800 mb-4">🏕️ Best Camps This Month</h3>
            {migData?.recommendedCamps?.length > 0 ? (
              <ul className="space-y-3">
                {migData.recommendedCamps.map((camp: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-stone-700 text-sm">{camp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-stone-500 text-sm">Camp recommendations for this month coming soon.</p>
            )}

            <div className="mt-5 pt-4 border-t border-stone-100">
              <Link
                href="/plan"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Plan a {MONTHS[activeMonth].slice(0, 3)} Trip →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* All months overview */}
      <div>
        <h2 className="text-xl font-bold text-stone-800 mb-5">Year-Round Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MONTHS.map((m, i) => {
            const s = SEASONAL_CALENDAR[i + 1];
            return (
              <button
                key={m}
                onClick={() => setActiveMonth(i)}
                aria-label={`${m}${s?.avoid ? " - Rainy season" : " - Good season"}`}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activeMonth === i
                    ? "border-amber-400 bg-amber-50"
                    : s?.avoid
                    ? "border-red-100 bg-red-50 hover:border-red-200"
                    : "border-stone-200 bg-white hover:border-amber-200"
                }`}
              >
                <p className="font-semibold text-stone-800 text-sm">{m}</p>
                <p className={`text-xs mt-0.5 ${s?.avoid ? "text-red-600" : "text-green-600"}`}>
                  {s?.avoid ? "🌧 Rainy" : "☀️ Good"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
