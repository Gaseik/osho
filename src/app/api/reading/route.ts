export const runtime = "nodejs";

import Groq from "groq-sdk";

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

interface CardInfo {
  position: string;
  nameZh: string;
  nameEn: string;
  meaningZh: string;
  meaningEn: string;
}

interface UserProfileInfo {
  name?: string;
  gender?: string;
  age?: string;
  readingStyle?: string;
}

const STYLE_INSTRUCTIONS_ZH: Record<string, string> = {
  natural: "",
  warm: "\n\n解讀風格要求：用溫暖、鼓勵的語氣。多給予正向支持和肯定，即使是挑戰性的牌面也要找到光明面。語氣像一個溫柔的朋友在安慰和打氣。",
  intuitive: "\n\n解讀風格要求：用直覺性、靈性的語氣。強調能量流動、內在感受和深層連結。可以使用意象和隱喻，讓解讀帶有靈性的深度和詩意。",
  rational: "\n\n解讀風格要求：用理性、務實的語氣。著重邏輯分析和具體行動建議。少用抽象比喻，多用清晰的因果關係和可操作的步驟。像一個理性的顧問在給建議。",
};

const STYLE_INSTRUCTIONS_EN: Record<string, string> = {
  natural: "",
  warm: "\n\nReading style: Use a warm, encouraging tone. Offer positive support and affirmation. Even with challenging cards, find the silver lining. Sound like a caring friend offering comfort and motivation.",
  intuitive: "\n\nReading style: Use an intuitive, spiritual tone. Emphasize energy flow, inner feelings, and deep connections. Use imagery and metaphors to bring spiritual depth and poetic quality to the reading.",
  rational: "\n\nReading style: Use a rational, practical tone. Focus on logical analysis and concrete action steps. Minimize abstract metaphors, emphasize clear cause-and-effect and actionable advice. Sound like a pragmatic advisor.",
};

function buildUserContextZh(profile: UserProfileInfo): string {
  const parts: string[] = [];
  if (profile.name) parts.push(`稱呼：${profile.name}`);
  if (profile.gender) {
    const genderMap: Record<string, string> = { male: "男性", female: "女性", other: "其他" };
    parts.push(`性別：${genderMap[profile.gender] || profile.gender}`);
  }
  if (profile.age) parts.push(`年齡：${profile.age} 歲`);
  const styleInstruction = STYLE_INSTRUCTIONS_ZH[profile.readingStyle || "natural"] || "";
  if (parts.length === 0 && !styleInstruction) return "";
  const userInfo = parts.length > 0
    ? `\n\n用戶資訊：\n${parts.join("\n")}\n請根據用戶的背景資訊，讓解讀更加個人化和貼近。`
    : "";
  return `${userInfo}${styleInstruction}`;
}

function buildUserContextEn(profile: UserProfileInfo): string {
  const parts: string[] = [];
  if (profile.name) parts.push(`Name: ${profile.name}`);
  if (profile.gender) {
    const genderMap: Record<string, string> = { male: "Male", female: "Female", other: "Other" };
    parts.push(`Gender: ${genderMap[profile.gender] || profile.gender}`);
  }
  if (profile.age) parts.push(`Age: ${profile.age}`);
  const styleInstruction = STYLE_INSTRUCTIONS_EN[profile.readingStyle || "natural"] || "";
  if (parts.length === 0 && !styleInstruction) return "";
  const userInfo = parts.length > 0
    ? `\n\nUser info:\n${parts.join("\n")}\nPlease personalize the reading based on the user's background.`
    : "";
  return `${userInfo}${styleInstruction}`;
}


function buildTopicContextZh(topic: string, description?: string): string {
  if (description) {
    return `\n\n用戶選擇的問題類別：${topic}。\n用戶描述的狀況：${description}\n請將牌義與此情境具體連結，在相關層面的分析要特別深入。`;
  }
  return `\n\n用戶的提問主題：「${topic}」\n請特別針對這個主題方向來解讀牌面，讓解讀緊扣用戶關心的議題。`;
}

function buildTopicContextEn(topic: string, description?: string): string {
  if (description) {
    return `\n\nUser's selected category: ${topic}.\nUser's situation: ${description}\nPlease connect the card meanings specifically to this situation, with deeper analysis on the relevant aspects.`;
  }
  return `\n\nUser's topic/question: "${topic}"\nPlease focus the reading specifically on this topic, making the interpretation directly relevant to what the user is asking about.`;
}

function buildPrompt(
  spread: string,
  spreadId: string,
  cards: CardInfo[],
  locale: string,
  userProfile?: UserProfileInfo,
  topic?: string,
  description?: string
): string {
  const isZh = locale.startsWith("zh");

  const cardLines = isZh
    ? cards.map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`).join("\n")
    : cards.map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`).join("\n");

  const topicContext = topic
    ? isZh ? buildTopicContextZh(topic, description) : buildTopicContextEn(topic, description)
    : "";

  const userContext = userProfile
    ? isZh ? buildUserContextZh(userProfile) : buildUserContextEn(userProfile)
    : "";

  return `You are a deep and insightful Osho Zen Tarot reader. Your tone is like a wise friend having an honest conversation — not a spiritual guru preaching from above.

## Core Principles
1. **Respond to the question, don't just translate the cards**: Whatever the user is asking about, the reading must directly address that. Don't just say "this card represents breakthrough" — say what breakthrough specifically means in the context of their question.
2. **Be honest and give direct insights**: If the cards show the user is avoiding something or deceiving themselves, point it out — gently but clearly. Don't hide behind vague phrases like "you might want to reflect on this." Say what you see, the way a smart, caring friend would.
3. **Build a narrative across all cards**: All the cards together should tell one coherent story. First identify the core message, then use each card to support that narrative. Don't interpret each card in isolation as disconnected paragraphs.
4. **Specific beats abstract — always**:
   - ❌ Don't write: "Release your negative emotions"
   - ✅ Write: "Next time you catch yourself checking their social media, pause and notice what feeling is driving that urge"
   - ❌ Don't write: "Focus your energy"
   - ✅ Write: "Pick one thing you've been procrastinating on this week and spend 30 minutes starting it"
5. **See the deeper pattern beneath the surface question**: Users ask surface-level questions ("Does he still think about me?"), but the cards often reveal something deeper (fear of abandonment, defining self-worth through relationships). Address both layers — first answer what they want to know, then reveal what they need to see.

## Tone Rules
- Never use overly polite greetings like "Dear friend" or "Dear one"
- No excessive encouragement or preaching
- Jump straight into the reading, no small talk
- Natural, authentic tone — conversational, occasionally colloquial
- Use rhetorical questions to provoke reflection, e.g. "Have you considered that what you're really afraid of isn't losing him, but..."
- Don't force a positive spin on every section. If the cards show difficulty, acknowledge it honestly rather than reframing it as something positive

## Reading Structure & Format

IMPORTANT: You MUST use exactly these ## headings to structure your response. Each section MUST start with ## followed by a space and the section title. Do NOT skip any section.

## 牌意解讀
For each card drawn, use a ### subheading with the card name. In 2-3 sentences, explain what this card means in its specific position — connect it to the user's question, not just the textbook definition. Highlight the most important keyword or phrase in **bold**.

## 牌面解析
Open with 1-2 sentences stating the **core message** of the entire reading — if all the cards could say one thing, what would it be?

Then use natural flowing paragraphs. Do NOT repeat the individual card interpretations. Instead, weave them together as a narrative — show how the cards connect, conflict, or build upon each other to tell one coherent story.

Use **bold** for key insights.

## 深層洞察
This is the most important section. Surface the blind spots and unconscious patterns the user may not see.
- On the surface you're asking about ___, but what the cards reveal at a deeper level is ___
- A pattern you may not have noticed is ___
- This pattern likely also shows up in your life as ___

Each point needs concrete descriptions and relatable examples. Keep it to 2-3 points. No fluff.

## 具體指引
Use numbered list (1. 2. 3.) with 2-3 actionable steps.
Every suggestion must be **specific, actionable, and time-bound**.
❌ Don't: "Spend more time reflecting on your inner world"
✅ Do: "This week, find a quiet moment and write down three recurring thoughts you have about this relationship. Then ask yourself: are these facts, or fears?"

## 靜心提醒
Use blockquote format (>) for one short, powerful line.

No chicken soup for the soul. Make it a gentle but precise nudge that makes the reader stop and think.

## Language
Respond in the same language as the user's message.
If the user writes in Traditional Chinese, respond entirely in Traditional Chinese.
If the user writes in English, respond entirely in English.

The user drew the following cards using the "${spread}" spread:

${cardLines}${topicContext}${userContext}`;
}

function buildTarotPrompt(
  spread: string,
  cards: CardInfo[],
  locale: string,
  userProfile?: UserProfileInfo,
  topic?: string,
  validationContext?: string
): string {
  const isZh = locale.startsWith("zh");

  const cardLines = isZh
    ? cards.map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`).join("\n")
    : cards.map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`).join("\n");

  const topicContext = topic
    ? isZh ? buildTopicContextZh(topic) : buildTopicContextEn(topic)
    : "";

  const userContext = userProfile
    ? isZh ? buildUserContextZh(userProfile) : buildUserContextEn(userProfile)
    : "";

  return `You are a professional tarot reader with deep expertise in the Rider-Waite tarot system. Your tone is like a wise, experienced friend — warm but direct, insightful but grounded.

## Core Principles

1. **Respond to the question, don't just translate the cards**: Address the user's specific question directly. Don't just list card meanings — weave them into an answer.

2. **Upright and Reversed matter**: Give distinctly different interpretations for upright vs reversed. Reversed doesn't always mean "bad" — it can mean internalized energy, delays, or blocked potential.

3. **Build a narrative across all cards**: All cards together tell one story. Identify the core message first, then use each card's position to support it. Show how cards relate to and influence each other.

4. **Be honest and specific**: If the cards show difficulty, say so constructively. Don't sugarcoat. Give concrete examples and actionable advice, not vague platitudes.

5. **See deeper patterns**: Users ask surface questions ("Will he come back?"), but the cards often reveal deeper truths (fear of abandonment, control issues, self-worth patterns). Address both layers.

## Time Prediction Guidelines
- Wands (Fire): Days to weeks
- Cups (Water): Weeks to months
- Swords (Air): Days to weeks
- Pentacles (Earth): Months to a year
- Major Arcana: Based on card meaning, usually longer cycles or major life milestones
- Integrate time predictions naturally, e.g. "This card suggests within the next 2-3 months..."
- Be specific but flexible — don't be overly definitive

## Tone Rules
- No greetings like "Dear friend" or "Dear one"
- No excessive encouragement or preaching
- Jump straight into the reading
- Natural, conversational, occasionally colloquial
- Use rhetorical questions to provoke reflection
- Don't force positivity — if cards show challenges, acknowledge them honestly

## Reading Structure & Format

IMPORTANT: You MUST use exactly these ## headings to structure your response. Each section MUST start with ## followed by a space and the section title. Do NOT skip any section.

## 牌面解析
Open with 1-2 sentences stating the **core message** of the entire spread. Then weave all cards together as a flowing narrative, referencing each card's position and upright/reversed status. Use **bold** for key insights.

## 深層洞察
Surface blind spots and unconscious patterns:
- On the surface you're asking about ___, but the cards reveal ___
- A pattern you may not have noticed is ___
- This pattern likely shows up in your life as ___
2-3 points with concrete descriptions. No fluff.

## 具體指引
2-3 numbered, **specific, actionable, time-bound** suggestions.
❌ "Reflect on your feelings"
✅ "This week, write down three things you're afraid will happen if you let go of this relationship. Then ask yourself: are these fears, or facts?"

## 靜心提醒
One short, powerful line in blockquote format (>). A gentle but precise nudge.

## Language
Respond in the same language as the user's message. If Traditional Chinese, respond entirely in Traditional Chinese. If English, respond entirely in English.

${validationContext ? `${validationContext}\n\n` : ""}The user drew the following cards using the "${spread}" spread:

${cardLines}${topicContext}${userContext}`;
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
    const validationSystemPrompt = `You are a perceptive tarot reader doing a quick validation check. Your ONLY job is to describe the user's current state in 3-4 sentences. Nothing more.

Rules:
- ONLY describe their current situation and inner state. Do NOT give advice, guidance, deeper insight, or action steps.
- Connect the 3 cards to their specific question topic
- If about love: describe the relationship dynamic and their emotional state
- If about career: describe their work situation and mindset
- If about finances: describe their financial situation and attitudes
- Mention both inner world (emotions, fears, thoughts) and outer world (what's happening in reality)
- Synthesize all 3 cards into ONE cohesive description, do not explain cards individually
- No titles, no headers, no markdown formatting, no bullet points
- Just 3-4 natural sentences, like a friend telling you what they see
- Keep it under 100 words`;

    messages = [
      { role: "system", content: validationSystemPrompt },
      { role: "user", content: topic || "" },
    ];
    maxTokens = 300;
  } else {
    const prompt = deck_type === "tarot"
      ? buildTarotPrompt(spread, cards, locale, userProfile, topic, validationContext)
      : buildPrompt(spread, spreadId ?? "", cards, locale, userProfile, topic, description);
    messages = [{ role: "user", content: prompt }];
    maxTokens = deck_type === "tarot" ? 3000 : 2000;
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
