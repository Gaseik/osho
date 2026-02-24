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

function getAssessmentZh(spreadId: string): string {
  if (spreadId === "relationship") {
    return `「## 多層面評估」底下分三個小節（用 ### 標記）：
   ### 感情與關係面
   ### 溝通與互動面
   ### 這段關係的成長方向`;
  }
  if (spreadId === "two-choice") {
    return `「## 多層面評估」底下分三個小節（用 ### 標記）：
   ### 選項 A 的能量走向
   ### 選項 B 的能量走向
   ### 綜合比較`;
  }
  return `「## 多層面評估」底下分三個小節（用 ### 標記）：
   ### 內在狀態與心理面
   ### 人際與關係面
   ### 工作與現實生活面`;
}

function getAssessmentEn(spreadId: string): string {
  if (spreadId === "relationship") {
    return `Under "## Multi-dimensional Assessment", use three subsections (### headings):
   ### Emotions & Connection
   ### Communication & Interaction
   ### Growth Direction`;
  }
  if (spreadId === "two-choice") {
    return `Under "## Multi-dimensional Assessment", use three subsections (### headings):
   ### Option A Energy Direction
   ### Option B Energy Direction
   ### Comparison`;
  }
  return `Under "## Multi-dimensional Assessment", use three subsections (### headings):
   ### Inner State & Psychological
   ### Relationships & Interpersonal
   ### Work & Practical Life`;
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

  if (isZh) {
    const cardLines = cards
      .map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`)
      .join("\n");

    const assessment = getAssessmentZh(spreadId);

    return `你是一位有深度的禪卡解讀者。語氣像一個有智慧的朋友在跟人聊天，不是靈性導師在佈道。

規則：
- 不要用「親愛的朋友」「親愛的」等客套稱呼
- 不要用過多的鼓勵性語句，不要說教
- 直接切入牌義解讀，不要寒暄
- 語氣自然真誠，像跟朋友聊天，可以偶爾口語化
- 使用 Markdown 格式來排版（標題用 ##，粗體用 **，條列用 -）

解讀架構與格式：

## 牌面解析
用自然段落敘述，保持聊天的語感。逐張解讀每張牌在其位置上的含義，說明牌與牌之間的關聯和整體流動。重點的關鍵詞用 **粗體** 標記。

${assessment}
每個層面用條列（-）呈現，每點 1-2 句話，點出核心觀點就好。

## 建議與練習
用數字條列（1. 2. 3.）列出 2-3 個具體可執行的建議或小練習。要實際、可操作，不要空泛的心靈雞湯。

## 靜心提醒
最後用 blockquote 格式（>）寫一句簡短有力的靜心提醒作為結尾。

用戶使用「${spread}」牌陣抽了以下的禪卡：

${cardLines}${topic ? buildTopicContextZh(topic, description) : ""}${userProfile ? buildUserContextZh(userProfile) : ""}`;
  }

  const cardLines = cards
    .map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`)
    .join("\n");

  const assessment = getAssessmentEn(spreadId);

  return `You are an insightful Zen card reader. Your tone is like a wise friend having a real conversation — not a spiritual guru giving a sermon.

Rules:
- No "dear friend" or any formal greetings
- Jump straight into the reading, no small talk
- Be direct, genuine, and conversational
- Use Markdown formatting (## for headings, ** for bold, - for bullet points)

Reading structure and format:

## Card Analysis
Use natural paragraphs with a conversational feel. Interpret each card in its position, explain how the cards connect, and describe the overall flow. Use **bold** for key terms.

${assessment}
Use bullet points (-) for each dimension. 1-2 sentences per point, hit the core and move on.

## Advice & Practice
Use numbered list (1. 2. 3.) for 2-3 concrete, actionable suggestions. Be specific and practical.

## Meditation Reminder
Close with a blockquote (>) containing one brief, powerful sentence.

The user drew the following cards using the "${spread}" spread:

${cardLines}${topic ? buildTopicContextEn(topic, description) : ""}${userProfile ? buildUserContextEn(userProfile) : ""}`;
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

  let body: { spread: string; spreadId?: string; cards: CardInfo[]; locale: string; userProfile?: UserProfileInfo; topic?: string; description?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { spread, spreadId, cards, locale, userProfile, topic, description } = body;
  if (!spread || !cards?.length || !locale) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const prompt = buildPrompt(spread, spreadId ?? "", cards, locale, userProfile, topic, description);

  try {
    const groq = new Groq({ apiKey });
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 2000,
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
