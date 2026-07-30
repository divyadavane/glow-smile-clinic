import { NextRequest, NextResponse } from "next/server";

// This is an integration point. Wire this up to email (Resend/SendGrid),
// a CRM, WhatsApp Business API, or Google Sheets to receive real
// appointment requests. Currently validates and echoes back success so
// the front-end flow can be demoed end-to-end.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, message } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    // TODO: send email / push to CRM / notify WhatsApp here.
    console.log("New appointment request:", {
      name,
      phone,
      service,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call us directly." },
      { status: 500 }
    );
  }
}
