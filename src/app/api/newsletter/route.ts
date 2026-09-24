import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, sendWelcomeSequenceStart } from "@/lib/email-sequence";

export async function POST(req: NextRequest) {
  let email: string | undefined;

  try {
    const body = await req.json();
    email = body.email?.toLowerCase().trim();
  } catch {
    try {
      const formData = await req.formData();
      email = formData.get("email")?.toString()?.toLowerCase().trim();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }
  }

  // Validate email
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    // Send welcome sequence
    const result = await sendWelcomeSequenceStart(
      email,
      process.env.RESEND_API_KEY
    );

    if (!result.success) {
      console.error(`Newsletter signup failed for ${email}:`, result.error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    // Log GA event (would be tracked client-side in real implementation)
    console.log(`[Analytics] Newsletter signup: ${email}`);

    // Store subscription timestamp in request for potential future logging
    const signupTime = new Date().toISOString();
    console.log(`[Newsletter] New subscriber: ${email} at ${signupTime}`);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
