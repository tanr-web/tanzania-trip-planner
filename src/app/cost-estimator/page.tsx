"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PARK_FEES, BUDGET_TIERS } from "@/lib/constants";

const PARK_NAMES: Record<string, string> = {
  serengeti: "Serengeti NP",
  ngorongoro: "Ngorongoro CA",
  tarangire: "Tarangire NP",
  "lake-manyara": "Lake Manyara NP",
  "arusha-np": "Arusha NP",
  "nyerere-selous": "Nyerere/Selous",
  ruaha: "Ruaha NP",
  kilimanjaro: "Kilimanjaro",
  mikumi: "Mikumi NP",
};

const PARKS = Object.entries(PARK_FEES).map(([slug, val]) => ({
  name: PARK_NAMES[slug] || slug,
  slug,
  fee: val.adult,
}));

export default function CostEstimatorPage() {
  const [days, setDays] = useState(7);
  const [people, setPeople] = useState(2);
  const [budgetTier, setBudgetTier] = useState<"budget" | "mid" | "luxury">("mid");
  const [selectedParks, setSelectedParks] = useState<string[]>(["serengeti", "ngorongoro"]);
  const [includeZanzibar, setIncludeZanzibar] = useState(false);
  const [zanzibarDays, setZanzibarDays] = useState(3);
  const [includeKili, setIncludeKili] = useState(false);

  const tier = BUDGET_TIERS[budgetTier];

  const costs = useMemo(() => {
    const accommodation = tier.accommodationPerNight * days * people;
    const food = tier.foodPerDay * days * people;
    const internalFlights = days > 5 ? 350 * people : 0;
    const parkFees = selectedParks.reduce((sum, parkSlug) => {
      const p = PARKS.find((p) => p.slug === parkSlug);
      return sum + (p?.fee ?? 0) * days * 0.4; // avg visits per day
    }, 0) * people;
    const zanzibarCost = includeZanzibar
      ? (budgetTier === "budget" ? 60 : budgetTier === "mid" ? 180 : 500) * zanzibarDays * people
      : 0;
    const kiliCost = includeKili ? 2200 * people : 0;
    const visaFee = 50 * people;
    const tipsGuides = 15 * days * people;
    const misc = 100 * people;

    return {
      accommodation,
      food,
      internalFlights,
      parkFees: Math.round(parkFees),
      zanzibarCost,
      kiliCost,
      visaFee,
      tipsGuides,
      misc,
      total: Math.round(accommodation + food + internalFlights + parkFees + zanzibarCost + kiliCost + visaFee + tipsGuides + misc),
      perPerson: Math.round((accommodation + food + internalFlights + parkFees + zanzibarCost + kiliCost + visaFee + tipsGuides + misc) / people),
    };
  }, [days, people, budgetTier, selectedParks, includeZanzibar, zanzibarDays, includeKili, tier]);

  function togglePark(parkSlug: string) {
    setSelectedParks((prev) =>
      prev.includes(parkSlug) ? prev.filter((p) => p !== parkSlug) : [...prev, parkSlug]
    );
  }

  const lineItems = [
    { label: "Accommodation", amount: costs.accommodation },
    { label: "Food & drinks", amount: costs.food },
    { label: "Internal flights/transfers", amount: costs.internalFlights },
    { label: "Park & conservation fees", amount: costs.parkFees },
    ...(costs.zanzibarCost ? [{ label: `Zanzibar (${zanzibarDays}d)`, amount: costs.zanzibarCost }] : []),
    ...(costs.kiliCost ? [{ label: "Kilimanjaro trek", amount: costs.kiliCost }] : []),
    { label: "Tanzania visa", amount: costs.visaFee },
    { label: "Guide tips", amount: costs.tipsGuides },
    { label: "Misc / shopping", amount: costs.misc },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Tanzania Trip Cost Estimator</h1>
      <p className="text-stone-600 mb-10">
        Get a rough budget breakdown for your Tanzania trip. Adjust the sliders and options below.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Duration */}
          <div>
            <label htmlFor="duration-slider" className="block font-semibold text-stone-800 mb-3">
              Safari duration: <span className="text-amber-600">{days} nights</span>
            </label>
            <input
              id="duration-slider"
              type="range"
              min={3}
              max={21}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-amber-500"
              aria-label="Safari duration in nights"
              aria-valuenow={days}
              aria-valuemin={3}
              aria-valuemax={21}
            />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>3 nights</span><span>21 nights</span>
            </div>
          </div>

          {/* Group size */}
          <div>
            <label htmlFor="travellers-slider" className="block font-semibold text-stone-800 mb-3">
              Travellers: <span className="text-amber-600">{people} {people === 1 ? "person" : "people"}</span>
            </label>
            <input
              id="travellers-slider"
              type="range"
              min={1}
              max={8}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full accent-amber-500"
              aria-label="Number of travellers"
              aria-valuenow={people}
              aria-valuemin={1}
              aria-valuemax={8}
            />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>1 person</span><span>8 people</span>
            </div>
          </div>

          {/* Budget tier */}
          <div>
            <label className="block font-semibold text-stone-800 mb-3">Budget style</label>
            <div className="grid grid-cols-3 gap-3">
              {(["budget", "mid", "luxury"] as const).map((t) => {
                const bt = BUDGET_TIERS[t];
                return (
                  <button
                    key={t}
                    onClick={() => setBudgetTier(t)}
                    aria-pressed={budgetTier === t}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      budgetTier === t ? "border-amber-400 bg-amber-50" : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <p className="font-semibold text-stone-800 text-sm capitalize">{t === "mid" ? "Mid-range" : t === "luxury" ? "Luxury" : "Budget"}</p>
                    <p className="text-xs text-stone-500 mt-0.5">${bt.dailyCostPerPerson}/day</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parks */}
          <div>
            <label className="block font-semibold text-stone-800 mb-3">Parks & reserves (select visited)</label>
            <div className="flex flex-wrap gap-2">
              {PARKS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => togglePark(p.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedParks.includes(p.slug)
                      ? "bg-amber-500 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {p.name} (${p.fee}/day)
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block font-semibold text-stone-800 mb-3">Add-ons</label>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeZanzibar} onChange={(e) => setIncludeZanzibar(e.target.checked)}
                  className="w-4 h-4 accent-amber-500" />
                <span className="text-sm text-stone-700">Include Zanzibar beach extension</span>
                {includeZanzibar && (
                  <span className="text-xs text-stone-400 ml-2">
                    <input type="number" min={2} max={14} value={zanzibarDays}
                      onChange={(e) => setZanzibarDays(Number(e.target.value))}
                      className="w-12 border border-stone-300 rounded px-1 text-center" /> nights
                  </span>
                )}
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeKili} onChange={(e) => setIncludeKili(e.target.checked)}
                  className="w-4 h-4 accent-amber-500" />
                <span className="text-sm text-stone-700">Include Kilimanjaro climb (~$2,200/person)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Result card */}
        <div>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-stone-800 text-lg mb-4">Estimated Budget</h2>

            <div className="space-y-2 mb-4">
              {lineItems.map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-stone-600">{item.label}</span>
                  <span className="font-medium text-stone-800">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-3 mb-4">
              <div className="flex justify-between font-bold text-stone-800 text-lg">
                <span>Total</span>
                <span>${costs.total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-stone-400 mt-1">${costs.perPerson.toLocaleString()} per person</p>
            </div>

            <p className="text-xs text-stone-400 mb-4">
              * Excludes international flights and travel insurance. Estimates only — actual costs vary.
            </p>

            <Link href="/plan" className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-colors">
              Build My Itinerary →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
