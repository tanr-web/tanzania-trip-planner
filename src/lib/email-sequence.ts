// Email welcome sequence handler
import { Resend } from "resend";
import { getEmailTemplate } from "./email-templates";

interface SequenceStep {
  name: string;
  delayHours: number;
  templateName: keyof typeof import("./email-templates").emailTemplates;
  gaEvent: string;
}

// Define the welcome sequence
export const WELCOME_SEQUENCE: SequenceStep[] = [
  {
    name: "welcome",
    delayHours: 0, // Immediate
    templateName: "packingList",
    gaEvent: "email_welcome_packing_list",
  },
  {
    name: "destinations",
    delayHours: 48, // 2 days later
    templateName: "topDestinations",
    gaEvent: "email_destinations_overview",
  },
  {
    name: "plan_cta",
    delayHours: 120, // 5 days later
    templateName: "planTripCTA",
    gaEvent: "email_plan_trip_cta",
  },
];

export interface SubscriberEmail {
  email: string;
  signupDate: Date;
  lastEmailSent?: string;
  emailsCompleted: string[];
}

export async function sendEmailFromTemplate(
  toEmail: string,
  templateName: keyof typeof import("./email-templates").emailTemplates,
  apiKey?: string
): Promise<{ success: boolean; error?: string }> {
  if (!apiKey) {
    console.log(`[Email Dry Run] Would send "${templateName}" to ${toEmail}`);
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);
    const template = getEmailTemplate(templateName);

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "hello@tanzaniatripplanner.com",
      to: toEmail,
      subject: template.subject,
      html: template.html,
    });

    if (response.error) {
      return { success: false, error: response.error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}

export async function sendWelcomeSequenceStart(
  email: string,
  apiKey?: string
): Promise<{ success: boolean; emailSent: boolean; error?: string }> {
  // Send immediate welcome email
  const result = await sendEmailFromTemplate(email, "packingList", apiKey);

  if (!result.success) {
    return {
      success: false,
      emailSent: false,
      error: result.error || "Failed to send welcome email",
    };
  }

  // In a real app, you'd also schedule the delayed emails in a job queue
  // For now, we log that the sequence started
  console.log(`Welcome sequence started for ${email}`);

  return {
    success: true,
    emailSent: true,
  };
}

export function shouldSendEmail(
  lastEmailTime: Date | undefined,
  delayHours: number
): boolean {
  if (!lastEmailTime) return true;

  const now = new Date();
  const timeSinceLastEmail = (now.getTime() - lastEmailTime.getTime()) / (1000 * 60 * 60);

  return timeSinceLastEmail >= delayHours;
}

// Helper to validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper to track email opens/clicks (basic GA events)
export function trackEmailEvent(eventName: string, email?: string) {
  // This would be called from the server to track email interactions
  // For now, just log it
  console.log(`[Email Tracking] ${eventName}${email ? ` (${email})` : ""}`);
}
