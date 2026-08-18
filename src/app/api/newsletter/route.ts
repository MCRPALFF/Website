import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // TODO: Connect to email service (e.g. Mailchimp, Resend) for double opt-in
  console.log("Newsletter signup:", email);

  return NextResponse.redirect(new URL("/get-involved?subscribed=1", request.url));
}
