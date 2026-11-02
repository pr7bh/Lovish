import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { clinic } from "@/lib/clinic-config";
import { appointmentEmailHtml, appointmentEmailText } from "@/lib/appointment-email";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { name, mobile, email, service, date, time, message } = body;

    if (!name || !mobile || !service || !date || !time) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Nagpal's Physio Care <onboarding@resend.dev>",
      to: [clinic.email],
      replyTo: email || undefined,
      subject: `New Appointment Request — ${name}`,
      html: appointmentEmailHtml({ name, mobile, email, service, date, time, message }),
      text: appointmentEmailText({ name, mobile, email, service, date, time, message }),
    });

    if (error) {
      console.error("[send-appointment] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-appointment] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
