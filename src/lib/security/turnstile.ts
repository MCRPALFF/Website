const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured, keep submissions working while allowing secure rollout.
  if (!secret) return true;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip && ip !== "unknown") {
    body.set("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}
