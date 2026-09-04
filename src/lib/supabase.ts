"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl ?? "https://invalid.supabase.co",
  supabaseAnonKey ?? "invalid",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);

export type LeadPayload = {
  channel: string;
  full_name?: string;
  phone?: string;
  email?: string;
  message?: string;
  metadata?: Record<string, unknown>;
};

// Reutiliza el RPC capture_lead de Supabase (mismo que serana-web)
export async function captureLead(payload: LeadPayload): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const enriched = {
    ...payload,
    source_url:
      typeof window !== "undefined" ? window.location.href : undefined,
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : undefined,
  };
  try {
    const { data, error } = await supabase.rpc("capture_lead", {
      payload: enriched,
    });
    if (error) {
      console.warn("[serana-experiencias] captureLead failed:", error.message);
      return null;
    }
    return (data as { lead_id?: string } | null)?.lead_id ?? null;
  } catch (err) {
    console.warn("[serana-experiencias] captureLead error:", err);
    return null;
  }
}
