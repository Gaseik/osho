export const runtime = "edge";

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
    return new Response(
      JSON.stringify({ error: "API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { spread: string; cards: CardInfo[]; locale: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { spread, cards, locale } = body;
  if (!spread || !cards?.length || !locale) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const prompt = buildPrompt(spread, cards, locale);

  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1500,
        },
      }),
    }
  );

  if (!geminiResponse.ok) {
    return new Response(
      JSON.stringify({ error: "Gemini API error" }),
      { status: geminiResponse.status, headers: { "Content-Type": "application/json" } }
    );
  }

  // Transform Gemini SSE stream into plain text stream
  let buffer = "";
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      buffer += new TextDecoder().decode(chunk);
      const events = buffer.split("\n\n");
      buffer = events.pop() || "";

      for (const event of events) {
        const dataLine = event
          .split("\n")
          .find((l) => l.startsWith("data: "));
        if (dataLine) {
          try {
            const data = JSON.parse(dataLine.slice(6));
            const textPart =
              data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textPart) {
              controller.enqueue(new TextEncoder().encode(textPart));
            }
          } catch {
            // ignore parse errors for incomplete JSON
          }
        }
      }
    },
    flush(controller) {
      if (buffer.trim()) {
        const dataLine = buffer
          .split("\n")
          .find((l) => l.startsWith("data: "));
        if (dataLine) {
          try {
            const data = JSON.parse(dataLine.slice(6));
            const textPart =
              data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textPart) {
              controller.enqueue(new TextEncoder().encode(textPart));
            }
          } catch {
            // ignore
          }
        }
      }
    },
  });

  return new Response(
    geminiResponse.body!.pipeThrough(transformStream),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    }
  );
}
