"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Calendar, Users, Wallet, Heart, Settings, Sparkles, Leaf } from "lucide-react";
import {
  BUDGET_TIERS, INTERESTS, SEASONAL_CALENDAR,
  DIETARY_OPTIONS, ACCOMMODATION_VIBES, TRANSPORT_OPTIONS,
  WILDLIFE_PRIORITIES, CULTURAL_DEPTH_OPTIONS, PACING_STYLES,
} from "@/lib/constants";
import type {
  TripPreferences, GroupType, BudgetTier, FitnessLevel, Interest,
  AccommodationVibe, TransportPreference, WildlifePriority, CulturalDepth, PacingStyle,
} from "@/types";
import { cn } from "@/lib/utils";
import { trackPlanTripStart, trackPlanTripComplete } from "@/lib/analytics";

const STEPS = [
  { id: 1, label: "Dates",      icon: Calendar  },
  { id: 2, label: "Group",      icon: Users     },
  { id: 3, label: "Budget",     icon: Wallet    },
  { id: 4, label: "Interests",  icon: Heart     },
  { id: 5, label: "Lifestyle",  icon: Settings  },
  { id: 6, label: "Values",     icon: Leaf      },
  { id: 7, label: "Generate",   icon: Sparkles  },
];

const GROUP_TYPES: { value: GroupType; label: string; icon: string; desc: string }[] = [
  { value: "solo", label: "Solo Traveler", icon: "🧍", desc: "Just me" },
  { value: "couple", label: "Couple", icon: "👫", desc: "Romantic getaway" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦", desc: "With kids" },
  { value: "friends", label: "Friends", icon: "🧑‍🤝‍🧑", desc: "Group trip" },
];

const START_CITIES = ["Arusha", "Dar es Salaam", "Kilimanjaro Airport (JRO)", "Zanzibar (ZNZ)"];
const FITNESS_LEVELS: { value: FitnessLevel; label: string; desc: string }[] = [
  { value: "easy", label: "Easy", desc: "Vehicle safaris, gentle walks" },
  { value: "moderate", label: "Moderate", desc: "Some hiking, active exploration" },
  { value: "active", label: "Active", desc: "Kilimanjaro, walking safaris, diving" },
];

export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [prefs, setPrefs] = useState<Partial<TripPreferences>>({
    groupSize: 2,
    budget: "mid",
    interests: [],
    fitnessLevel: "moderate",
    dietary: [],
    startCity: "Arusha",
    // new preference dimensions
    accommodationVibe: undefined,
    transportPreference: undefined,
    wildlifePriorities: [],
    culturalDepth: undefined,
    pacingStyle: "balanced",
    ecoEthics: false,
    historicalInterest: false,
    budgetSplurge: "",
  });

  useEffect(() => {
    if (step === 2 && !hasTrackedStart) {
      trackPlanTripStart();
      setHasTrackedStart(true);
    }
  }, [step, hasTrackedStart]);

  const update = (partial: Partial<TripPreferences>) =>
    setPrefs((p) => ({ ...p, ...partial }));

  const travelMonth = prefs.startDate
    ? new Date(prefs.startDate).getMonth() + 1
    : new Date().getMonth() + 1;
  const monthInfo = SEASONAL_CALENDAR[travelMonth];

  const toggleInterest = (v: Interest) => {
    const cur = prefs.interests ?? [];
    update({ interests: cur.includes(v) ? cur.filter((i) => i !== v) : [...cur, v] });
  };

  async function generate() {
    setStep(7);
    setLoading(true);
    setStreamText("");

    try {
      const finalPrefs: TripPreferences = {
        startDate: prefs.startDate ?? new Date().toISOString().slice(0, 10),
        endDate: prefs.endDate ?? new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
        duration: prefs.duration ?? 7,
        groupType: prefs.groupType ?? "couple",
        groupSize: prefs.groupSize ?? 2,
        budget: prefs.budget ?? "mid",
        interests: prefs.interests ?? ["wildlife"],
        startCity: prefs.startCity ?? "Arusha",
        fitnessLevel: prefs.fitnessLevel ?? "moderate",
        dietary: prefs.dietary ?? [],
        mustSee: prefs.mustSee,
        travelMonth,
        childrenAges: prefs.childrenAges,
        // 10-category preference dimensions
        accommodationVibe: prefs.accommodationVibe,
        transportPreference: prefs.transportPreference,
        wildlifePriorities: prefs.wildlifePriorities,
        culturalDepth: prefs.culturalDepth,
        pacingStyle: prefs.pacingStyle ?? "balanced",
        ecoEthics: prefs.ecoEthics ?? false,
        historicalInterest: prefs.historicalInterest ?? false,
        budgetSplurge: prefs.budgetSplurge,
      };

      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPrefs),
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to generate itinerary");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        full += chunk;
        setStreamText(full);
      }

      // Parse slug and store full itinerary in localStorage for the result page
      const slugMatch = full.match(/"share_slug"\s*:\s*"([^"]+)"/);
      if (slugMatch) {
        const slug = slugMatch[1];
        try {
          // Validate it's real JSON before storing
          const parsed = JSON.parse(full);
          localStorage.setItem(`itinerary_${slug}`, JSON.stringify(parsed));
        } catch {
          // Store raw string as fallback
          localStorage.setItem(`itinerary_${slugMatch[1]}`, full);
        }
        // Track completion with trip details
        trackPlanTripComplete({
          duration: prefs.duration,
          budget: prefs.budget,
          groupType: prefs.groupType,
        });
        router.push(`/plan/result/${slug}`);
      } else {
        setStreamText("❌ Could not parse itinerary. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStreamText("❌ Something went wrong generating your itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canNext = () => {
    if (step === 1) return !!(prefs.startDate && prefs.endDate);
    if (step === 2) return !!prefs.groupType;
    if (step === 3) return !!prefs.budget;
    if (step === 4) return (prefs.interests?.length ?? 0) > 0;
    // Steps 5 & 6 are optional preference refinements — always allow Next
    return true;
  };

  const toggleWildlife = (v: WildlifePriority) => {
    const cur = prefs.wildlifePriorities ?? [];
    update({ wildlifePriorities: cur.includes(v) ? cur.filter((i) => i !== v) : [...cur, v] });
  };

  const toggleDietary = (v: string) => {
    const cur = prefs.dietary ?? [];
    update({ dietary: cur.includes(v) ? cur.filter((d) => d !== v) : [...cur, v] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                    step > s.id
                      ? "bg-amber-500 border-amber-500 text-white"
                      : step === s.id
                      ? "bg-white border-amber-500 text-amber-600"
                      : "bg-white border-stone-300 text-stone-600"
                  )}>
                    {step > s.id ? "✓" : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={cn("text-xs hidden sm:block", step >= s.id ? "text-amber-700 font-medium" : "text-stone-600")}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          {/* Step 1: Dates */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-1">When are you travelling?</h2>
              <p className="text-stone-700 text-sm mb-6">We&apos;ll tailor your itinerary to the season.</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={prefs.startDate ?? ""}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      const start = e.target.value;
                      const end = prefs.endDate ?? "";
                      const dur = end ? Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) : undefined;
                      update({ startDate: start, travelMonth: new Date(start).getMonth() + 1, duration: dur });
                    }}
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={prefs.endDate ?? ""}
                    min={prefs.startDate ?? new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      const end = e.target.value;
                      const start = prefs.startDate ?? "";
                      const dur = start ? Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) : undefined;
                      update({ endDate: end, duration: dur });
                    }}
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>
              {prefs.duration && (
                <div className="bg-amber-50 rounded-2xl p-4 text-sm text-stone-700 mb-3">
                  <strong>📅 {prefs.duration} days</strong>
                  {prefs.duration >= 10 ? " — Great! Enough for Northern Circuit + Zanzibar." : prefs.duration >= 7 ? " — Ideal for the Northern Circuit." : " — Consider a focused 1–2 park itinerary."}
                </div>
              )}
              {monthInfo && (
                <div className={cn("rounded-2xl p-4 text-sm", monthInfo.avoid ? "bg-orange-50 text-orange-800" : "bg-green-50 text-green-800")}>
                  <strong>{monthInfo.avoid ? "⚠️" : "✅"} {monthInfo.label} tip:</strong> {monthInfo.note}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Group */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-1">Who&apos;s coming?</h2>
              <p className="text-stone-700 text-sm mb-6">We&apos;ll check camp age policies and group pricing.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {GROUP_TYPES.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => update({ groupType: g.value })}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-left transition-all",
                      prefs.groupType === g.value
                        ? "border-amber-500 bg-amber-50"
                        : "border-stone-200 hover:border-amber-300"
                    )}
                  >
                    <div className="text-2xl mb-1">{g.icon}</div>
                    <div className="font-semibold text-stone-800 text-sm">{g.label}</div>
                    <div className="text-stone-700 text-xs">{g.desc}</div>
                  </button>
                ))}
              </div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Number of travellers</label>
              <input
                type="number"
                min={1}
                max={20}
                value={prefs.groupSize ?? 2}
                onChange={(e) => update({ groupSize: parseInt(e.target.value) })}
                className="w-32 border border-stone-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
              {prefs.groupType === "family" && (
                <div className="mt-4 bg-amber-50 rounded-2xl p-4 text-sm text-stone-700">
                  <strong>👶 Note:</strong> Many safari camps have a minimum age of 8–12. We&apos;ll only suggest family-friendly lodges.
                </div>
              )}
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-1">What&apos;s your budget?</h2>
              <p className="text-stone-700 text-sm mb-6">Per person per day, excluding international flights.</p>
              <div className="flex flex-col gap-4">
                {(Object.entries(BUDGET_TIERS) as [BudgetTier, typeof BUDGET_TIERS[keyof typeof BUDGET_TIERS]][]).map(([key, tier]) => (
                  <button
                    key={key}
                    onClick={() => update({ budget: key })}
                    className={cn(
                      "p-5 rounded-2xl border-2 text-left transition-all",
                      prefs.budget === key
                        ? "border-amber-500 bg-amber-50"
                        : "border-stone-200 hover:border-amber-300"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-stone-800">{tier.label}</span>
                      <span className="text-amber-700 font-semibold text-sm">{tier.dailyCost}/day</span>
                    </div>
                    <p className="text-stone-700 text-sm">{tier.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Interests */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-1">What excites you most?</h2>
              <p className="text-stone-700 text-sm mb-6">Pick everything that appeals — we&apos;ll balance your itinerary.</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.value}
                    onClick={() => toggleInterest(interest.value as Interest)}
                    className={cn(
                      "px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all",
                      (prefs.interests ?? []).includes(interest.value as Interest)
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-stone-200 text-stone-700 hover:border-amber-300"
                    )}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
              {(prefs.interests?.includes("kilimanjaro") || prefs.interests?.includes("wildlife")) && prefs.interests.length >= 2 && (
                <div className="mt-4 bg-blue-50 rounded-2xl p-4 text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Kilimanjaro + Safari? We recommend 12+ days to do both justice.
                </div>
              )}
            </div>
          )}

          {/* Step 5: Lifestyle Preferences */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-1">Your travel lifestyle</h2>
                <p className="text-stone-700 text-sm mb-0">Help us match activities to your body, diet and transport comfort.</p>
              </div>

              {/* Category 2 – Physical Conditioning */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Physical conditioning
                  <span className="ml-1 text-xs font-normal text-stone-600">— we pace activities to match</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {FITNESS_LEVELS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => update({ fitnessLevel: f.value })}
                      className={cn(
                        "p-3 rounded-2xl border-2 text-left text-sm transition-all",
                        prefs.fitnessLevel === f.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      )}
                    >
                      <div className="font-semibold text-stone-800">{f.label}</div>
                      <div className="text-stone-700 text-xs mt-0.5">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 7 – Pacing Style */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Trip pacing
                  <span className="ml-1 text-xs font-normal text-stone-600">— buffer days affect destination count</span>
                </label>
                <div className="flex flex-col gap-3">
                  {PACING_STYLES.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => update({ pacingStyle: p.value as PacingStyle })}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all",
                        prefs.pacingStyle === p.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      )}
                    >
                      <div className="font-semibold text-stone-800 text-sm">{p.label}</div>
                      <div className="text-stone-700 text-xs mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 4 – Transport Preference */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Transport preference</label>
                <div className="grid grid-cols-2 gap-3">
                  {TRANSPORT_OPTIONS.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => update({ transportPreference: t.value as TransportPreference })}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all",
                        prefs.transportPreference === t.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      )}
                    >
                      <div className="font-semibold text-stone-800 text-sm">{t.label}</div>
                      <div className="text-stone-700 text-xs mt-1">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 1 – Dietary restrictions & allergies */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Dietary needs & allergies
                  <span className="ml-1 text-xs font-normal text-stone-600">— cross-referenced with Swahili cuisine safety profiles</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => toggleDietary(d.value)}
                      className={cn(
                        "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all",
                        (prefs.dietary ?? []).includes(d.value)
                          ? "border-amber-500 bg-amber-500 text-white"
                          : "border-stone-200 text-stone-700 hover:border-amber-300"
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Values & Personalization */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-1">Your values & priorities</h2>
                <p className="text-stone-700 text-sm">Shape the soul of your trip — wildlife focus, culture depth, eco ethics and more.</p>
              </div>

              {/* Category 3 – Accommodation Vibe */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Accommodation vibe</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ACCOMMODATION_VIBES.map((a) => (
                    <button
                      key={a.value}
                      onClick={() => update({ accommodationVibe: a.value as AccommodationVibe })}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all",
                        prefs.accommodationVibe === a.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      )}
                    >
                      <div className="font-semibold text-stone-800 text-sm">{a.label}</div>
                      <div className="text-stone-700 text-xs mt-1">{a.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 5 – Wildlife Priorities */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Wildlife priorities
                  <span className="ml-1 text-xs font-normal text-stone-600">— aligned to seasonal migration calendar</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {WILDLIFE_PRIORITIES.map((w) => (
                    <button
                      key={w.value}
                      onClick={() => toggleWildlife(w.value as WildlifePriority)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all",
                        (prefs.wildlifePriorities ?? []).includes(w.value as WildlifePriority)
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      )}
                    >
                      <div className="font-semibold text-stone-800 text-sm">{w.label}</div>
                      <div className="text-stone-700 text-xs mt-1">{w.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 6 – Cultural Depth */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Cultural depth</label>
                <div className="grid grid-cols-2 gap-3">
                  {CULTURAL_DEPTH_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => update({ culturalDepth: c.value as CulturalDepth })}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all",
                        prefs.culturalDepth === c.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-amber-300"
                      )}
                    >
                      <div className="font-semibold text-stone-800 text-sm">{c.label}</div>
                      <div className="text-stone-700 text-xs mt-1">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category 8 & 9 – Eco Ethics + Historical Interest */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => update({ ecoEthics: !prefs.ecoEthics })}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all",
                    prefs.ecoEthics
                      ? "border-green-500 bg-green-50"
                      : "border-stone-200 hover:border-green-300"
                  )}
                >
                  <div className="text-xl mb-1">🌱</div>
                  <div className="font-semibold text-stone-800 text-sm">Eco-certified stays</div>
                  <div className="text-stone-700 text-xs mt-1">Filter for carbon-neutral & accredited eco-tourism properties</div>
                </button>
                <button
                  onClick={() => update({ historicalInterest: !prefs.historicalInterest })}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all",
                    prefs.historicalInterest
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-200 hover:border-amber-300"
                  )}
                >
                  <div className="text-xl mb-1">🏛️</div>
                  <div className="font-semibold text-stone-800 text-sm">Historical sites</div>
                  <div className="text-stone-700 text-xs mt-1">UNESCO sites, Stone Town alleys, Swahili ruins & ancient narratives</div>
                </button>
              </div>

              {/* Category 10 – Budget Splurge */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  Where would you splurge?
                  <span className="ml-1 text-xs font-normal text-stone-600">optional</span>
                </label>
                <input
                  type="text"
                  value={prefs.budgetSplurge ?? ""}
                  onChange={(e) => update({ budgetSplurge: e.target.value })}
                  placeholder="e.g. One night at Singita, private helicopter, spa treatment…"
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              {/* Category 9 – Start City & Must-see */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Starting city</label>
                  <select
                    value={prefs.startCity}
                    onChange={(e) => update({ startCity: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    {START_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">
                    Must-see <span className="text-stone-600 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={prefs.mustSee ?? ""}
                    onChange={(e) => update({ mustSee: e.target.value })}
                    placeholder="Mara crossing, whale sharks…"
                    className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Generating */}
          {step === 7 && (
            <div className="text-center py-8">
              {loading ? (
                <>
                  <div className="relative mb-6">
                    <div className="text-6xl animate-bounce">🦁</div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-2xl animate-pulse">✨</div>
                  </div>
                  <h2 className="text-xl font-bold text-stone-800 mb-2">Crafting your perfect Tanzania adventure…</h2>
                  <p className="text-stone-700 text-sm mb-6">Our AI is consulting the Serengeti experts.</p>
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-left">
                  <pre className="whitespace-pre-wrap text-sm text-stone-700 font-sans leading-relaxed">
                    {streamText || "Preparing your itinerary…"}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {step < 7 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < 6 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={generate}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-lg"
                >
                  <Sparkles className="w-4 h-4" /> Generate My Itinerary
                </button>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-stone-600 mt-4">
          Free to use. No account required. AI-generated — always verify details before booking.
        </p>
      </div>
    </div>
  );
}
