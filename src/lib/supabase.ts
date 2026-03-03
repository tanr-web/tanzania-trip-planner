import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser-safe client (uses anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only admin client (bypasses RLS — only import in server code)
export function getSupabaseAdmin() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ─── Database types ────────────────────────────────────────────────────────────

export interface SavedItinerary {
  id: string;
  user_id: string | null;
  preferences_json: string;
  itinerary_json: string;
  share_slug: string;
  created_at: string;
}

export interface AffiliateClick {
  id: string;
  program: string;
  hotel_slug: string | null;
  timestamp: string;
  user_agent: string | null;
  destination_url: string;
}

/*
 * Supabase SQL to run in the dashboard:
 *
 * CREATE TABLE saved_itineraries (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
 *   preferences_json TEXT NOT NULL,
 *   itinerary_json TEXT NOT NULL,
 *   share_slug TEXT UNIQUE NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 *
 * ALTER TABLE saved_itineraries ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can read own itineraries" ON saved_itineraries
 *   FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
 * CREATE POLICY "Users can insert own itineraries" ON saved_itineraries
 *   FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
 *
 * CREATE TABLE affiliate_clicks (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   program TEXT NOT NULL,
 *   hotel_slug TEXT,
 *   timestamp TIMESTAMPTZ DEFAULT now(),
 *   user_agent TEXT,
 *   destination_url TEXT NOT NULL
 * );
 */
