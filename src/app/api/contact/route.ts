import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.log(`[Contact Dry Run] Email from ${name} (${email}): ${subject}`);
    return NextResponse.json(
      { success: true, message: "Message received (dry run mode)" }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const adminResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "hello@tanzaniatripplanner.com",
      to: "hello@tanzaniatripplanner.com",
      subject: `[Contact Form] ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #b45309; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #1c1917; }
    .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #b45309; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From:</div>
        <div class="value">${name} &lt;${email}&gt;</div>
      </div>
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${message.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="field" style="margin-top: 20px; font-size: 12px; color: #6b7280;">
        <p>Visit <a href="https://tanzaniatripplanner.com/contact">contact page</a> to reply or use ${email}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (adminResponse.error) {
      console.error("Failed to send admin email:", adminResponse.error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    const confirmResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "hello@tanzaniatripplanner.com",
      to: email,
      subject: "We received your message 🎉",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #b45309; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e5e7eb; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">We got your message! 👋</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to Tanzania Trip Planner. We've received your message and typically respond within 24 hours.</p>
      <p><strong>Your message:</strong><br>${subject}</p>
      <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
        In the meantime, explore our <a href="https://tanzaniatripplanner.com">travel guides</a>, <a href="https://tanzaniatripplanner.com/plan">AI trip planner</a>, or check out our <a href="https://tanzaniatripplanner.com/blog">blog</a>.
      </p>
    </div>
    <div class="footer">
      <p>Tanzania Trip Planner • <a href="https://tanzaniatripplanner.com">Visit Site</a></p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (confirmResponse.error) {
      console.error("Failed to send confirmation email:", confirmResponse.error);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Contact form error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
