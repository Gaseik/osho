export const runtime = "nodejs";

import { GoogleGenAI } from "@google/genai";

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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("Gemini error: GEMINI_API_KEY not set in environment");
    return Response.json(
      { error: "API key not configured – set GEMINI_API_KEY in .env.local", status: 500 },
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
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 1500,
      },
    });

    // Stream SDK chunks as plain text
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (streamError) {
          console.log("Gemini stream error:", streamError);
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
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.log("Gemini API error:", errMsg);
    if (errStack) console.log("Stack:", errStack);

    return Response.json(
      { error: errMsg || "Unknown Gemini error" },
      { status: 500 }
    );
  }
}
