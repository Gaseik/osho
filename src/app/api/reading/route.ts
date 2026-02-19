export const runtime = "nodejs";

import Groq from "groq-sdk";

interface CardInfo {
  position: string;
  nameZh: string;
  nameEn: string;
  meaningZh: string;
  meaningEn: string;
}

function buildPrompt(
  spread: string,
  cards: CardInfo[],
  locale: string
): string {
  const isZh = locale.startsWith("zh");

  if (isZh) {
    const cardLines = cards
      .map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`)
      .join("\n");

    return `你是一位有深度的禪卡解讀者。語氣像一個有智慧的朋友在跟人聊天，不是靈性導師在佈道。

規則：
- 不要用「親愛的朋友」「親愛的」等客套稱呼
- 不要用過多的鼓勵性語句，不要說教
- 直接切入牌義解讀，不要寒暄
- 語氣自然真誠，像跟朋友聊天，可以偶爾口語化
- 每張牌的解讀要結合位置含義，說明它在這個位置代表什麼
- 分析牌與牌之間的關聯和整體流動
- 最後給出具體、實際的建議，不要空泛的心靈雞湯
- 結尾用一句簡短的靜心提醒，不要太長
- 用繁體中文，不要用 markdown 格式符號（不要 ###、**、- 等）

用戶使用「${spread}」牌陣抽了以下的禪卡：

${cardLines}`;
  }

  const cardLines = cards
    .map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`)
    .join("\n");

  return `You are an insightful Zen card reader. Your tone is like a wise friend having a real conversation — not a spiritual guru giving a sermon.

Rules:
- No "dear friend" or any formal greetings
- Jump straight into the reading, no small talk
- Be direct, genuine, and conversational
- Explain what each card means in its specific position
- Analyze how the cards connect and flow together
- Give concrete, practical advice — not vague spiritual platitudes
- End with one brief meditation reminder
- Do not use any markdown formatting (no ###, **, - etc)

The user drew the following cards using the "${spread}" spread:

${cardLines}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.log("Groq error: GROQ_API_KEY not set in environment");
    return Response.json(
      { error: "API key not configured – set GROQ_API_KEY in .env.local", status: 500 },
      { status: 500 }
    );
  }

  let body: { spread: string; cards: CardInfo[]; locale: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { spread, cards, locale } = body;
  if (!spread || !cards?.length || !locale) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const prompt = buildPrompt(spread, cards, locale);

  try {
    const groq = new Groq({ apiKey });
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
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
      },
    });
  } catch (error: unknown) {
    const raw = error instanceof Error ? error.message : String(error);
    console.log("Groq API error:", raw);

    let status = 500;
    let message = raw;
    try {
      const parsed = JSON.parse(raw);
      const code = parsed.error?.code || parsed.code;
      if (code && typeof code === "number") status = code;
      message = parsed.error?.message || parsed.message || raw;
    } catch {
      // Not JSON, use raw message as-is
    }

    return Response.json(
      { error: message, status },
      { status }
    );
  }
}
