import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/security/rate-limit";
import { getClientIp, hasValidSameOrigin, tooManyRequestsResponse } from "@/lib/security/request";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const baseSchema = z.object({
  formType: z.enum(["volunteer", "partner", "sponsor", "press"]),
  email: z.string().trim().email().max(254),
  website: z.string().trim().max(0).optional(),
  turnstileToken: z.string().trim().optional(),
});

const detailsSchema = z.record(z.string(), z.string().trim().max(2000));

export async function POST(request: Request) {
  if (!hasValidSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = rateLimit(`involvement:${ip}`, 8, 10 * 60 * 1000);
  if (!limit.allowed) return tooManyRequestsResponse(limit.resetAt);

  const formData = await request.formData();
  const asObject = Object.fromEntries(formData.entries());

  const parsedBase = baseSchema.safeParse({
    formType: asObject.formType,
    email: asObject.email,
    website: asObject.website,
    turnstileToken: asObject.turnstileToken,
  });
  if (!parsedBase.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot silently accepts bot-like submissions to reduce retry loops.
  if (parsedBase.data.website) {
    return NextResponse.redirect(new URL("/get-involved?submitted=1", request.url), 303);
  }

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (turnstileSiteKey) {
    const token = parsedBase.data.turnstileToken;
    if (!token) {
      return NextResponse.json({ error: "Anti-bot verification is required." }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstileToken(token, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Anti-bot verification failed." }, { status: 400 });
    }
  }

  const parsedDetails = detailsSchema.safeParse(asObject);
  if (!parsedDetails.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // TODO: Forward validated payload to CRM/email provider.
  console.info(`Get involved submission received: ${parsedBase.data.formType}`);

  return NextResponse.redirect(new URL("/get-involved?submitted=1", request.url), 303);
}
