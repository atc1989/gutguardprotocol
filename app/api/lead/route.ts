import { NextResponse } from "next/server";

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

  const webhookUrl = process.env.LEAD_CAPTURE_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify(lead),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Lead destination rejected the request." }, { status: 502 });
    }
  } else {
    console.info("Lead captured", lead);
  }

  return NextResponse.json({ ok: true });
}
