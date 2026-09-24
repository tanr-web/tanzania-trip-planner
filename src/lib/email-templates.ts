// Email templates for Resend

export interface EmailTemplate {
  subject: string;
  html: string;
}

const BRAND_COLOR = "#b45309"; // Amber
const TEXT_COLOR = "#1c1917"; // Stone 800
const LIGHT_BG = "#fef3c7"; // Amber 50

export const emailTemplates = {
  // Welcome email with packing list
  packingList: (): EmailTemplate => ({
    subject: "Your Free Tanzania Packing List 🦁 + 20% off tip!",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: ${TEXT_COLOR}; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${BRAND_COLOR}; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 25px; }
    .section h2 { color: ${BRAND_COLOR}; font-size: 20px; margin-top: 0; }
    .checklist { list-style: none; padding: 0; }
    .checklist li { padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
    .checklist li:before { content: "✓ "; color: ${BRAND_COLOR}; font-weight: bold; margin-right: 10px; }
    .cta { background: ${BRAND_COLOR}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
    .secondary { background: ${LIGHT_BG}; padding: 20px; border-radius: 6px; margin: 15px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .footer a { color: ${BRAND_COLOR}; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🦁 Welcome to Tanzania Trip Planner!</h1>
    </div>

    <div class="content">
      <div class="section">
        <p>Hi there! Thanks for signing up. We're excited to help you plan an unforgettable Tanzania adventure.</p>
        <p>Your <strong>free interactive packing list</strong> is ready to use — it's customizable for safari, Kilimanjaro, Zanzibar, or cultural tours.</p>
      </div>

      <div class="section">
        <h2>✓ Essential Safari Packing Items</h2>
        <ul class="checklist">
          <li>Neutral-coloured clothing (khaki, olive, beige)</li>
          <li>Wide-brimmed sun hat & UV sunglasses</li>
          <li>Quality binoculars (8×42 recommended)</li>
          <li>Camera with telephoto lens (200mm+)</li>
          <li>Fleece or warm mid-layer (mornings are cold)</li>
          <li>Waterproof rain jacket</li>
          <li>High SPF sunscreen (50+) & insect repellent</li>
          <li>Malaria prophylaxis (prescribed by doctor)</li>
          <li>Yellow Fever certificate (if required)</li>
          <li>Travel insurance with evacuation coverage</li>
        </ul>
      </div>

      <div class="section">
        <p><strong>Get the full interactive packing list:</strong></p>
        <a href="https://tanzaniatripplanner.com/packing-list" class="cta">View Complete Packing List →</a>
      </div>

      <div class="secondary">
        <strong>💡 Quick Pro Tips:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Book safari 6-12 months in advance for peak season</li>
          <li>Dry season (Jun-Oct) = best wildlife viewing</li>
          <li>January-February = calving season, fewer tourists, lower prices</li>
          <li>Always get comprehensive travel insurance</li>
        </ul>
      </div>

      <div class="section">
        <h2>🎯 Next Steps</h2>
        <p>Ready to plan? Our AI-powered trip planner creates personalized itineraries in seconds:</p>
        <a href="https://tanzaniatripplanner.com/plan" class="cta">Start Planning Your Trip →</a>
      </div>

      <div class="section" style="background: #fef3c7; padding: 15px; border-radius: 6px;">
        <strong>🎁 Exclusive Offer:</strong> First-time users get a <strong>20% discount</strong> on premium accommodation bookings through our partners. Check the dashboard after you create your first itinerary!
      </div>
    </div>

    <div class="footer">
      <p>Tanzania Trip Planner • <a href="https://tanzaniatripplanner.com">Visit Site</a> • <a href="https://tanzaniatripplanner.com/privacy">Privacy</a> • <a href="https://tanzaniatripplanner.com/affiliate-disclosure">Affiliate Disclosure</a></p>
      <p>You're receiving this because you signed up for our newsletter. <a href="https://tanzaniatripplanner.com">Manage preferences</a></p>
    </div>
  </div>
</body>
</html>
    `,
  }),

  // Day 2 email: Top 5 destinations
  topDestinations: (): EmailTemplate => ({
    subject: "Tanzania's 5 Must-See Destinations (No, You Can't Skip Any 🦁)",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: ${TEXT_COLOR}; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${BRAND_COLOR}; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e5e7eb; }
    .destination { background: ${LIGHT_BG}; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid ${BRAND_COLOR}; }
    .destination h3 { margin: 0 0 10px 0; color: ${BRAND_COLOR}; }
    .destination p { margin: 5px 0; font-size: 14px; }
    .cta { background: ${BRAND_COLOR}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Tanzania's Top 5 Destinations</h1>
      <p>Where to go and what to see</p>
    </div>

    <div class="content">
      <p>Hi! Here's what most visitors experience when they come to Tanzania. Each offers something completely different:</p>

      <div class="destination">
        <h3>🦁 Serengeti National Park</h3>
        <p><strong>The Experience:</strong> 1.5M wildebeest, Big Five wildlife, the Great Migration</p>
        <p><strong>Best Time:</strong> Jun-Oct (dry season), Jan-Feb (calving)</p>
        <p><strong>Duration:</strong> 3-5 days minimum</p>
      </div>

      <div class="destination">
        <h3>🏝️ Zanzibar</h3>
        <p><strong>The Experience:</strong> Pristine beaches, Stone Town (UNESCO), spice island culture</p>
        <p><strong>Best Time:</strong> Jun-Oct, Dec-Jan</p>
        <p><strong>Duration:</strong> 3-5 days beach time</p>
      </div>

      <div class="destination">
        <h3>🌋 Ngorongoro Crater</h3>
        <p><strong>The Experience:</strong> Volcanic crater with 25,000 animals, black rhinos, year-round viewing</p>
        <p><strong>Best Time:</strong> Jan-Feb, Jun-Oct (though great year-round)</p>
        <p><strong>Duration:</strong> 1 full day</p>
      </div>

      <div class="destination">
        <h3>⛰️ Mount Kilimanjaro</h3>
        <p><strong>The Experience:</strong> Climb Africa's highest peak (no technical skills needed)</p>
        <p><strong>Best Time:</strong> Jan-Feb, Jun-Oct</p>
        <p><strong>Duration:</strong> 6-10 days for the climb</p>
      </div>

      <div class="destination">
        <h3>🐘 Tarangire National Park</h3>
        <p><strong>The Experience:</strong> Massive elephant herds (500+), baobab trees, underrated gem</p>
        <p><strong>Best Time:</strong> Jun-Oct (peak animals)</p>
        <p><strong>Duration:</strong> 2-3 days</p>
      </div>

      <p style="margin-top: 25px; font-size: 16px;"><strong>Most visitors do:</strong> Northern Circuit (Tarangire → Ngorongoro → Serengeti) = 7-10 days, then fly to Zanzibar for 3-5 beach days.</p>

      <a href="https://tanzaniatripplanner.com/destinations" class="cta">Explore All Destinations →</a>
    </div>

    <div class="footer">
      <p>Tanzania Trip Planner</p>
    </div>
  </div>
</body>
</html>
    `,
  }),

  // Day 5 email: Plan trip CTA
  planTripCTA: (): EmailTemplate => ({
    subject: "Ready to Plan? Your AI Trip Planner is Waiting 🤖✈️",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: ${TEXT_COLOR}; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${BRAND_COLOR}; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e5e7eb; }
    .highlight { background: ${LIGHT_BG}; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .cta { background: ${BRAND_COLOR}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-size: 16px; }
    .stats { display: flex; justify-content: space-around; margin: 20px 0; }
    .stat { text-align: center; }
    .stat .number { font-size: 28px; font-weight: bold; color: ${BRAND_COLOR}; }
    .stat .label { font-size: 12px; color: #6b7280; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Plan Your Perfect Tanzania Adventure</h1>
      <p>In minutes, not weeks</p>
    </div>

    <div class="content">
      <p>We know planning a Tanzania trip can feel overwhelming:</p>
      <ul>
        <li>When is the best time to go?</li>
        <li>What parks should I visit?</li>
        <li>How much will it cost?</li>
        <li>Which hotels are actually good?</li>
        <li>How do I put it all together?</li>
      </ul>

      <div class="highlight">
        <p><strong>Here's the thing:</strong> Our AI-powered trip planner answers all of that in seconds. Answer 6 quick questions about your dates, budget, and interests — and boom — you get a personalized day-by-day itinerary with real hotel recommendations and insider tips.</p>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="number">60s</div>
          <div class="label">To create your itinerary</div>
        </div>
        <div class="stat">
          <div class="number">300+</div>
          <div class="label">Curated hotels</div>
        </div>
        <div class="stat">
          <div class="number">100%</div>
          <div class="label">Free</div>
        </div>
      </div>

      <p style="text-align: center;">
        <a href="https://tanzaniatripplanner.com/plan" class="cta">Start Planning Now →</a>
      </p>

      <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
        <strong>What you'll get:</strong><br>
        ✈️ Day-by-day itinerary<br>
        🏨 Handpicked hotel recommendations<br>
        🍽️ Restaurant picks for every stop<br>
        💰 Estimated costs (breakdown included)<br>
        🗺️ Interactive map of your route<br>
        📱 Shareable itinerary (save or send to travel buddies)<br>
      </p>
    </div>

    <div class="footer">
      <p>Tanzania Trip Planner • <a href="https://tanzaniatripplanner.com">Visit Site</a></p>
    </div>
  </div>
</body>
</html>
    `,
  }),
};

export function getEmailTemplate(templateName: keyof typeof emailTemplates): EmailTemplate {
  const template = emailTemplates[templateName];
  if (!template) throw new Error(`Email template "${templateName}" not found`);
  return template();
}
