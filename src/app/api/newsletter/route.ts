import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/security/rate-limit";
import { getClientIp, hasValidSameOrigin, tooManyRequestsResponse } from "@/lib/security/request";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
  website: z.string().trim().max(0).optional(),
  turnstileToken: z.string().trim().optional(),
});

export async function POST(request: Request) {
  if (!hasValidSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = rateLimit(`newsletter:${ip}`, 10, 10 * 60 * 1000);
  if (!limit.allowed) return tooManyRequestsResponse(limit.resetAt);

  const formData = await request.formData();
  const payload = newsletterSchema.safeParse({
    email: formData.get("email"),
    website: formData.get("website"),
    turnstileToken: formData.get("turnstileToken"),
  });

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot silently accepts bot-like submissions to reduce retry loops.
  if (payload.data.website) {
    return NextResponse.redirect(new URL("/get-involved?subscribed=1", request.url), 303);
  }

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (turnstileSiteKey) {
    const token = payload.data.turnstileToken;
    if (!token) {
      return NextResponse.json({ error: "Anti-bot verification is required." }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstileToken(token, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Anti-bot verification failed." }, { status: 400 });
    }
  }

  // TODO: Connect to email service (e.g. Mailchimp, Resend) for double opt-in.
  console.info("Newsletter signup received");

  return NextResponse.redirect(new URL("/get-involved?subscribed=1", request.url), 303);
}
