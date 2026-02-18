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

    return `你是一位溫暖且富有洞察力的禪卡解讀師。用戶使用「${spread}」牌陣抽了以下的禪卡：

${cardLines}

請根據每張牌的位置和含義，給出整體的解讀。語氣溫暖有深度，像是一位智慧的朋友在和用戶對話。解讀應包含：
1. 每張牌在其位置上的含義
2. 牌與牌之間的關聯
3. 整體的訊息和建議
4. 一句簡短的靜心提醒作為結尾

請用繁體中文回覆，不要使用 markdown 格式。`;
  }

  const cardLines = cards
    .map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`)
    .join("\n");

  return `You are a warm and insightful Zen card reader. The user drew the following cards using the "${spread}" spread:

${cardLines}

Please provide a holistic reading based on each card's position and meaning. Your tone should be warm, thoughtful, and conversational — like a wise friend speaking to the user. The reading should include:
1. The significance of each card in its position
2. How the cards relate to each other
3. The overall message and guidance
4. A brief meditation reminder to close

Please respond in plain text without markdown formatting.`;
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
