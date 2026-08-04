import { NextResponse } from "next/server";
import { z } from "zod";
import { contactConfig } from "@/lib/config/contact-form.config";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; firstRequestAt: number }>();

const contactFormSchema = z.object({
  token: z.string().min(1),
});

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  return realIp ?? "unknown";
}

function isOriginAllowed(request: Request) {
  const originHeader = request.headers.get("origin") ?? request.headers.get("referer");

  if (!originHeader) {
    return false;
  }

  try {
    const origin = new URL(originHeader).origin;
    const allowedOrigins = [
      contactConfig.liveUrl,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

    return allowedOrigins.includes(origin);
  } catch {
    return false;
  }
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  if (now - entry.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

async function verifyRecaptcha(token: string) {
  const payload = new URLSearchParams({
    secret: contactConfig.recaptchaSecretKey,
    response: token,
  });

  console.log("PAYLOAD", payload.toString());
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });
  
  if (!response.ok) {
    console.error("Failed to verify reCAPTCHA:", response.statusText);
    return { success: false, error: "reCAPTCHA verification failed" };
  }

  const data = await response.json();
  console.log("DATA", data);
  if (!data.success || data.score === undefined || data.action !== "contact_form") {
    console.error("DATA:", data, payload);
    return { success: false, error: "JUJU  reCAPTCHA validation failed" };
  }

  if (data.score < 0.5) {
    return { success: false, error: "SCORE reCAPTCHA score too low" };
  }

  return { success: true };
}

export async function POST(request: Request) {
  if (!isOriginAllowed(request)) {
    return NextResponse.json(
      { success: false, error: "Invalid request origin" },
      { status: 403 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests, please try again later." },
      { status: 429 }
    );
  }
  //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", request);
  const formData = await request.json();
  //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  formData);
  /*const requestBody = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => typeof value === "string")
  ) as Record<string, string>;*/

  const parsed = contactFormSchema.safeParse({
    token: formData.token,
  });
   
  if (!parsed.success) {
    console.log()
    return NextResponse.json(
      {
        success: false,
        error: "Invalid form data",
        fields: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }
  console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
  const recaptchaResult = await verifyRecaptcha(parsed.data.token);
  if (!recaptchaResult.success) {
    return NextResponse.json(
      { success: false, error: recaptchaResult.error },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
