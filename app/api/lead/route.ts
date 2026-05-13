import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type LeadPayload = {
  email: string;
  source: string;
  submittedAt: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: Partial<LeadPayload>;

  try {
    payload = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const lead: LeadPayload = {
    email,
    source: payload.source?.trim() || "lead-capture",
    submittedAt: payload.submittedAt || new Date().toISOString(),
  };

  const supabase = createServerSupabaseClient();
  const { data: existingLead, error: lookupError } = await supabase
    .from("leads")
    .select("id")
    .eq("email", lead.email)
    .maybeSingle();

  if (lookupError) {
    console.error("Lead lookup failed", lookupError);
    return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  }

  if (existingLead) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const { error } = await supabase.from("leads").insert({
    email: lead.email,
    source: lead.source,
    submitted_at: lead.submittedAt,
  });

  if (error) {
    console.error("Lead insert failed", error);
    return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
