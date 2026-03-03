"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, Download } from "lucide-react";

type TripType = "safari" | "kilimanjaro" | "zanzibar" | "cultural";

interface PackingItem {
  id: string;
  item: string;
  category: string;
  essential?: boolean;
  amazonUrl?: string;
  tripTypes: TripType[];
}

const PACKING_LIST: PackingItem[] = [
  // Clothing
  { id: "safari-shirts", item: "Neutral-coloured shirts (khaki/olive)", category: "Clothing", essential: true, tripTypes: ["safari", "cultural"], amazonUrl: "https://amazon.com/s?k=safari+shirt" },
  { id: "zip-pants", item: "Convertible zip-off trousers", category: "Clothing", essential: true, tripTypes: ["safari", "kilimanjaro", "cultural"] },
  { id: "fleece", item: "Fleece jacket or mid-layer", category: "Clothing", essential: true, tripTypes: ["safari", "kilimanjaro"] },
  { id: "rain-jacket", item: "Waterproof rain jacket", category: "Clothing", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar"] },
  { id: "swimwear", item: "Swimwear (2 pcs)", category: "Clothing", essential: true, tripTypes: ["zanzibar"] },
  { id: "sun-hat", item: "Wide-brim sun hat", category: "Clothing", essential: true, tripTypes: ["safari", "zanzibar", "cultural"] },
  { id: "beanie", item: "Warm beanie hat", category: "Clothing", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "buff", item: "Buff/neck gaiter", category: "Clothing", tripTypes: ["safari", "kilimanjaro"] },
  { id: "gloves", item: "Waterproof gloves", category: "Clothing", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "base-layer", item: "Thermal base layers (top + bottom)", category: "Clothing", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "hiking-boots", item: "Waterproof hiking boots (broken in!)", category: "Footwear", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "sandals", item: "Comfortable sandals", category: "Footwear", essential: true, tripTypes: ["zanzibar", "cultural"] },
  { id: "camp-shoes", item: "Light camp shoes/sneakers", category: "Footwear", tripTypes: ["safari", "kilimanjaro"] },
  { id: "wool-socks", item: "Merino wool socks (x6)", category: "Footwear", tripTypes: ["kilimanjaro"] },
  // Gear
  { id: "daypack", item: "Daypack 20–30L", category: "Gear", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  { id: "main-bag", item: "Duffel bag or 70L rucksack", category: "Gear", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "binoculars", item: "Binoculars (8×42 recommended)", category: "Gear", essential: true, tripTypes: ["safari"], amazonUrl: "https://amazon.com/s?k=safari+binoculars+8x42" },
  { id: "headlamp", item: "Headlamp + spare batteries", category: "Gear", essential: true, tripTypes: ["safari", "kilimanjaro"] },
  { id: "trekking-poles", item: "Trekking poles", category: "Gear", essential: true, tripTypes: ["kilimanjaro"], amazonUrl: "https://amazon.com/s?k=trekking+poles" },
  { id: "sleeping-bag", item: "Sleeping bag (−10°C rated)", category: "Gear", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "power-bank", item: "Power bank 20,000mAh", category: "Electronics", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  { id: "camera", item: "Camera with telephoto lens", category: "Electronics", tripTypes: ["safari"], amazonUrl: "https://amazon.com/s?k=safari+camera+lens" },
  { id: "plug-adapter", item: "UK/South Africa plug adapter", category: "Electronics", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  // Health
  { id: "sunscreen", item: "SPF 50+ sunscreen", category: "Health", essential: true, tripTypes: ["safari", "zanzibar", "kilimanjaro", "cultural"] },
  { id: "insect-rep", item: "DEET 50% insect repellent", category: "Health", essential: true, tripTypes: ["safari", "zanzibar", "cultural"] },
  { id: "malaria-med", item: "Malaria prophylaxis (consult doctor)", category: "Health", essential: true, tripTypes: ["safari", "zanzibar", "cultural"] },
  { id: "altitude-med", item: "Diamox (altitude medication — doctor)", category: "Health", essential: true, tripTypes: ["kilimanjaro"] },
  { id: "first-aid", item: "Personal first-aid kit", category: "Health", tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  { id: "water-purifier", item: "Water purification tablets or filter", category: "Health", tripTypes: ["kilimanjaro"] },
  // Documents
  { id: "passport", item: "Passport (6 months validity)", category: "Documents", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  { id: "visa", item: "Tanzania visa / eVisa printout", category: "Documents", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  { id: "insurance", item: "Travel + medical insurance docs", category: "Documents", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
  { id: "vaccine-cert", item: "Yellow fever certificate (if required)", category: "Documents", essential: true, tripTypes: ["safari", "kilimanjaro", "zanzibar", "cultural"] },
];

const TRIP_TYPES: { id: TripType; label: string; emoji: string }[] = [
  { id: "safari", label: "Safari", emoji: "🦁" },
  { id: "kilimanjaro", label: "Kilimanjaro", emoji: "⛰️" },
  { id: "zanzibar", label: "Zanzibar Beach", emoji: "🏝️" },
  { id: "cultural", label: "Cultural Tour", emoji: "🏛️" },
];

const CATEGORIES = [...new Set(PACKING_LIST.map((i) => i.category))];

export default function PackingListPage() {
  const [selectedTypes, setSelectedTypes] = useState<TripType[]>(["safari"]);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("packing-checked");
    if (stored) setChecked(new Set(JSON.parse(stored)));
  }, []);

  function toggleType(type: TripType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function toggleItem(id: string) {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
    localStorage.setItem("packing-checked", JSON.stringify([...next]));
  }

  const filtered = PACKING_LIST.filter((i) =>
    i.tripTypes.some((t) => selectedTypes.includes(t))
  );

  const total = filtered.length;
  const done = filtered.filter((i) => checked.has(i.id)).length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  function handleDownload() {
    const text = CATEGORIES.map((cat) => {
      const items = filtered.filter((i) => i.category === cat);
      if (!items.length) return "";
      return `${cat.toUpperCase()}\n${items.map((i) => `  [ ] ${i.item}`).join("\n")}`;
    }).filter(Boolean).join("\n\n");
    const blob = new Blob([`TANZANIA PACKING LIST\n${"=".repeat(30)}\n\n${text}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "tanzania-packing-list.txt"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Tanzania Packing List</h1>
      <p className="text-stone-600 mb-8">Select your trip type(s) to get a customised packing list. Check items off as you pack.</p>

      {/* Trip type selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {TRIP_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => toggleType(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-colors ${
              selectedTypes.includes(t.id)
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6 bg-white rounded-2xl border border-stone-200 p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-700">{done}/{total} items packed</span>
          <button onClick={handleDownload} className="flex items-center gap-1.5 text-amber-700 text-xs font-medium hover:text-amber-600">
            <Download className="w-3.5 h-3.5" />Download .txt
          </button>
        </div>
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-stone-400 mt-1">{progress}% complete</p>
      </div>

      {/* Checklist by category */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const items = filtered.filter((i) => i.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat}>
              <h2 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                {cat}
                <span className="text-xs font-normal text-stone-400">
                  ({items.filter((i) => checked.has(i.id)).length}/{items.length})
                </span>
              </h2>
              <div className="space-y-2">
                {items.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                        isChecked ? "bg-green-50" : "bg-white border border-stone-100 hover:border-stone-200"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex-shrink-0 text-green-600">
                        {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-stone-300" />}
                      </div>
                      <span className={`flex-1 text-sm ${isChecked ? "line-through text-stone-400" : "text-stone-700"}`}>
                        {item.item}
                        {item.essential && !isChecked && (
                          <span className="ml-2 text-xs text-amber-600 font-medium">Essential</span>
                        )}
                      </span>
                      {item.amazonUrl && !isChecked && (
                        <a
                          href={item.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-stone-400 hover:text-amber-600 flex-shrink-0"
                        >
                          Buy →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
