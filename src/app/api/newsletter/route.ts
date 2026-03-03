import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email")?.toString();

  if (!email || !email.includes("@")) {
    return NextResponse.redirect(new URL("/?newsletter=error", req.url));
  }

  try {
    // Send welcome email with packing list
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "hello@tanzaniatripplanner.com",
      to: email,
      subject: "Your Free Tanzania Packing List 🦁",
      html: `
        <h2>Welcome to Tanzania Trip Planner!</h2>
        <p>Thanks for signing up. Your free Tanzania safari packing list is attached.</p>
        <p>In the meantime, start planning your trip: <a href="https://tanzaniatripplanner.com/plan">Plan My Trip</a></p>
        <br/>
        <p><strong>Quick packing essentials:</strong></p>
        <ul>
          <li>✅ Neutral-coloured clothing (khaki, olive, beige)</li>
          <li>✅ Wide-brimmed sun hat</li>
          <li>✅ Quality binoculars</li>
          <li>✅ Malaria prophylaxis (consult your doctor)</li>
          <li>✅ Yellow Fever certificate (if required)</li>
          <li>✅ Sunscreen SPF 50+</li>
          <li>✅ Travel insurance (essential)</li>
          <li>✅ Camera with telephoto lens</li>
        </ul>
        <p>Visit <a href="https://tanzaniatripplanner.com/packing-list">our full interactive packing list</a> for the complete guide.</p>
      `,
    });
  } catch {
    // Non-fatal
  }

  return NextResponse.redirect(new URL("/?newsletter=success", req.url));
}
