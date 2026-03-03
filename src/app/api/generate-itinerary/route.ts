import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import { getSupabaseAdmin } from "@/lib/supabase";
import { TANZANIA_AI_CONTEXT, SEASONAL_CALENDAR, PARK_FEES, BUDGET_TIERS } from "@/lib/constants";
import type { TripPreferences } from "@/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Only init Upstash if credentials are provided
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 h") });
}

function buildSystemPrompt(): string {
  return `You are an expert Tanzania travel planner with 15 years of on-the-ground experience.

${TANZANIA_AI_CONTEXT}

PERSONALISATION DIMENSIONS — apply ALL of the following when generating the itinerary:
1. DIETARY LANDSCAPE: Cross-reference guest allergies and restrictions with each meal's Swahili/local ingredients. Flag unsafe dishes proactively and suggest safe alternatives at each camp.
2. PHYSICAL CONDITIONING: Scale activity intensity, elevation gain, and trekking distances to the stated fitness level and health profile. Kilimanjaro requires active fitness; avoid high-altitude recommendations for easy fitness guests.
3. ACCOMMODATION VIBE: Match psychographic preference (luxury villa, eco-lodge, tented camp, urban hotel, beach resort) to specific, real properties. Eco-lodge preference = only recommend accredited eco-tourism certified properties.
4. TRANSPORT PREFERENCE: Opt for private 4×4, shared shuttle, city ride-hailing (Bolt/Uber), or Bajaji tuk-tuks based on guest preference. Factor into budget and transfer time estimates.
5. WILDLIFE PRIORITIES: Align park selection and seasonal timing to stated wildlife focus (Big Five, Great Migration, birdwatching, marine life). Reference the migration calendar when scheduling.
6. CULTURAL DEPTH: Include genuine village visits (Maasai bomas, Chagga coffee farms) for heritage seekers; urban creative experiences (galleries, music) for urban-creative preference. Never recommend "Disneyland" versions of cultural activities.
7. PACING & BUFFER: For slow-travel preference, add one buffer/rest day every 3–4 active days. For packed preference, schedule pre-dawn game drives and multi-park days. Adjust driving times between remote destinations (Nyerere ↔ Zanzibar requires charter flight).
8. ENVIRONMENTAL ETHICS: If eco-ethics enabled, filter exclusively for properties with recognised eco-certification (Rainforest Alliance, LEED, Ecotourism Kenya/Tanzania standards). Note carbon footprint of charter flights.
9. HISTORICAL INTEREST: For history-interested travellers, weave in UNESCO World Heritage sites (Stone Town, Kondoa rock art, Kilwa Kisiwani), explain heritage narratives, and include guided walking tours.
10. BUDGETARY ROI: For splurge preferences, recommend one high-value, once-in-a-lifetime experience that matches the budget tier (e.g. private hot-air balloon over Serengeti, private Ngorongoro crater floor drive). Perform implicit ROI analysis — flag which experiences deliver best value per dollar.

RESPONSE FORMAT: Return ONLY valid JSON matching this exact structure:
{
  "share_slug": "<nanoid 10 chars>",
  "title": "<catchy trip title>",
  "summary": "<2-3 sentence overview>",
  "estimatedCost": { "min": <number>, "max": <number>, "currency": "USD" },
  "days": [
    {
      "day": <number>,
      "region": "<park/region name>",
      "title": "<day title>",
      "morning": "<morning activity detail>",
      "afternoon": "<afternoon detail>",
      "evening": "<evening/dinner detail>",
      "accommodation": "<lodge/camp name>",
      "drivingTime": "<drive from previous location or 'fly-in'>",
      "tip": "<local insider tip for this day>"
    }
  ],
  "tips": ["<general tip 1>", "<general tip 2>", "<general tip 3>", "<general tip 4>"],
  "seasonalNote": "<specific note for their travel month>",
  "packingHighlight": "<1 key item to pack for this specific trip>"
}

IMPORTANT RULES:
- Be specific with lodge names — real places, not invented ones
- Northern Circuit parks can be combined by road from Arusha
- Southern Circuit requires charter flights from Dar es Salaam
- Factor in park fees and driving times between destinations
- Kilimanjaro requires at least 6 days (7 recommended)
- Zanzibar: recommend 3+ days for a proper beach stay
- If family with children, only recommend family-friendly camps (Singita Klein's Camp, Sanctuary Ngorongoro Crater Camp, etc.)
- Budget tier affects accommodation type: budget=guesthouses/tented camps, mid=lodges, luxury=exclusive camps
`;
}

function buildUserMessage(prefs: TripPreferences): string {
  const monthName = new Date(2000, prefs.travelMonth - 1, 1).toLocaleString("en-US", { month: "long" });
  const seasonInfo = SEASONAL_CALENDAR[prefs.travelMonth];
  const budgetInfo = BUDGET_TIERS[prefs.budget as keyof typeof BUDGET_TIERS];

  // ── Helper to format optional fields ──────────────────────────────────────
  const line = (label: string, val: string | boolean | string[] | undefined) => {
    if (val === undefined || val === null || val === "" || val === false) return "";
    if (Array.isArray(val) && val.length === 0) return "";
    const display = Array.isArray(val) ? val.join(", ") : String(val);
    return `- ${label}: ${display}\n`;
  };

  return `
Please create a ${prefs.duration}-day Tanzania itinerary for:

── CORE PROFILE ──────────────────────────────────────────────────────────────
- Group: ${prefs.groupType} (${prefs.groupSize} people)${prefs.childrenAges?.length ? `, children ages: ${prefs.childrenAges.join(", ")}` : ""}
- Budget: ${budgetInfo.label} (${budgetInfo.dailyCost}/person/day)
- Travel month: ${monthName}
- Starting city: ${prefs.startCity}
- Interests: ${prefs.interests.join(", ")}

── 10-CATEGORY PREFERENCE PROFILE ───────────────────────────────────────────
${line("1. Dietary restrictions & allergies (cross-ref Swahili ingredients)", prefs.dietary)}\
${line("2. Physical conditioning / fitness", prefs.fitnessLevel)}\
${line("3. Accommodation vibe (match to property portfolio)", prefs.accommodationVibe)}\
${line("4. Transport preference (optimise for budget & safety)", prefs.transportPreference)}\
${line("5. Wildlife priorities (align to migration calendar)", prefs.wildlifePriorities)}\
${line("6. Cultural depth (authentic experiences, avoid tourist traps)", prefs.culturalDepth)}\
${line("7. Pacing style (adjust buffer days & driving times)", prefs.pacingStyle)}\
${line("8. Eco-ethics: filter for eco-certified, carbon-neutral stays", prefs.ecoEthics ? "Yes — require accredited eco-tourism certification" : undefined)}\
${line("9. Historical interest (UNESCO sites, Stone Town, heritage narratives)", prefs.historicalInterest ? "Yes — include heritage sites and guided history experiences" : undefined)}\
${line("10. Budgetary splurge focus (ROI-optimised once-in-a-lifetime experiences)", prefs.budgetSplurge)}\
${line("Must-see request", prefs.mustSee)}
── SEASONAL CONTEXT ──────────────────────────────────────────────────────────
Seasonal context for ${monthName}: ${seasonInfo?.note ?? ""}

Generate the share_slug as a unique 10-character alphanumeric ID.
`;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  if (ratelimit) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please wait an hour." }, { status: 429 });
    }
  }

  let prefs: TripPreferences;
  try {
    prefs = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Validate duration
  if (!prefs.duration || prefs.duration < 1 || prefs.duration > 30) {
    return NextResponse.json({ error: "Duration must be between 1 and 30 days" }, { status: 400 });
  }

  try {
    const groqStream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserMessage(prefs) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      stream: true,
    });

    // Save to Supabase in the background after streaming completes
    const readableStream = new ReadableStream({
      async start(controller) {
        let fullText = "";

        for await (const chunk of groqStream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            fullText += text;
            controller.enqueue(new TextEncoder().encode(text));
          }
        }

        controller.close();

        // Persist to Supabase asynchronously (fire and forget)
        try {
          const supabase = getSupabaseAdmin();
          const shareSlug = nanoid(10);

          // Try to parse and inject our share_slug
          const parsed = JSON.parse(fullText);
          parsed.share_slug = parsed.share_slug ?? shareSlug;

          await supabase.from("saved_itineraries").insert({
            preferences_json: JSON.stringify(prefs),
            itinerary_json: JSON.stringify(parsed),
            share_slug: parsed.share_slug,
            user_id: null, // attach to user if auth session available
          });
        } catch {
          // Non-fatal — itinerary still streamed to client
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("OpenAI error:", err);
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 });
  }
}
