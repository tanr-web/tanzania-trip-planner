import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const program = searchParams.get("program") ?? "unknown";
  const hotelSlug = searchParams.get("hotel");
  const dest = searchParams.get("dest");

  if (!dest) {
    return NextResponse.json({ error: "Missing destination URL" }, { status: 400 });
  }

  // Log click to Supabase (fire and forget)
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("affiliate_clicks").insert({
      program,
      hotel_slug: hotelSlug,
      destination_url: dest,
      user_agent: req.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Non-fatal — still redirect
  }

  return NextResponse.redirect(dest, { status: 302 });
}
