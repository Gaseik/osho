export const runtime = "nodejs";

import Groq from "groq-sdk";
import type { CardInfo, UserProfileInfo } from "./prompts";
import { buildOshoZenPrompt } from "./prompts";
import { buildTarotPrompt } from "./prompts";
import { VALIDATION_SYSTEM_PROMPT, VALIDATION_MAX_TOKENS } from "./prompts";

// --- Rate Limiting (in-memory, resets on cold start) ---
const DAILY_LIMIT = 10;

interface RateLimitEntry {
  count: number;
  date: string; // UTC date string "YYYY-MM-DD"
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function getUTCDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const today = getUTCDateString();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.date !== today) {
    rateLimitMap.set(ip, { count: 1, date: today });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

// --- CORS ---
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) {
    return origin === allowed;
  }
  // Allow same-origin requests on Vercel preview/production and localhost
  if (origin.endsWith(".vercel.app") || origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return true;
  }
  // Allow custom domain if set via NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && origin === siteUrl) {
    return true;
  }
  return false;
}

export async function POST(request: Request) {
  // --- CORS check ---
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return Response.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // --- Rate limiting ---
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return Response.json(
      { error: "今日免費次數已用完，請明天再來 🙏", dailyLimit: true },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(DAILY_LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.log("Groq error: GROQ_API_KEY not set in environment");
    return Response.json(
      { error: "API key not configured – set GROQ_API_KEY in .env.local", status: 500 },
      { status: 500 }
    );
  }

  let body: { spread: string; spreadId?: string; cards: CardInfo[]; locale: string; userProfile?: UserProfileInfo; topic?: string; description?: string; deck_type?: string; validation?: boolean; validationContext?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { spread, spreadId, cards, locale, userProfile, topic, description, deck_type, validation, validationContext } = body;
  if (!spread || !cards?.length || !locale) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Build messages — validation uses a dedicated simple system+user prompt
  let messages: { role: "system" | "user"; content: string }[];
  let maxTokens: number;

  if (validation) {
    messages = [
      { role: "system", content: VALIDATION_SYSTEM_PROMPT },
      { role: "user", content: topic || "" },
    ];
    maxTokens = VALIDATION_MAX_TOKENS;
  } else {
    const prompt = deck_type === "tarot"
      ? buildTarotPrompt(spread, cards, locale, userProfile, topic, validationContext)
      : buildOshoZenPrompt(spread, spreadId ?? "", cards, locale, userProfile, topic, description);
    messages = [{ role: "user", content: prompt }];
    maxTokens = deck_type === "tarot" ? 4000 : 2000;
  }

  try {
    const groq = new Groq({ apiKey });
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.8,
      max_tokens: maxTokens,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (streamError) {
          console.log("Groq stream error:", streamError);
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-RateLimit-Limit": String(DAILY_LIMIT),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error: unknown) {
    const raw = error instanceof Error ? error.message : String(error);
    console.log("Groq API error:", raw);

    let status = 500;
    let message = raw;

    // Detect rate-limit from Groq SDK (status property on error object)
    const errObj = error as Record<string, unknown>;
    if (errObj?.status === 429 || errObj?.statusCode === 429) {
      status = 429;
    }

    try {
      const parsed = JSON.parse(raw);
      const code = parsed.error?.code || parsed.code;
      if (code === 429 || code === "rate_limit_exceeded") status = 429;
      if (code && typeof code === "number" && status === 500) status = code;
      message = parsed.error?.message || parsed.message || raw;
    } catch {
      // Not JSON, use raw message as-is
    }

    // Also detect rate-limit keywords in the message
    if (status === 500 && /rate.?limit|too many requests|429/i.test(raw)) {
      status = 429;
    }

    return Response.json(
      { error: message, status },
      { status }
    );
  }
}
