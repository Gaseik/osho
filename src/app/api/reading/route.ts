export const runtime = "nodejs";

import Groq from "groq-sdk";

interface CardInfo {
  position: string;
  nameZh: string;
  nameEn: string;
  meaningZh: string;
  meaningEn: string;
}

function getAssessmentZh(spreadId: string): string {
  if (spreadId === "relationship") {
    return `2. 多層面評估
   - 感情與關係面
   - 溝通與互動面
   - 這段關係的成長方向`;
  }
  if (spreadId === "two-choice") {
    return `2. 多層面評估
   - 選項 A 的能量走向
   - 選項 B 的能量走向
   - 綜合比較與建議`;
  }
  return `2. 多層面評估
   - 內在狀態與心理面
   - 人際與關係面
   - 工作與現實生活面`;
}

function getAssessmentEn(spreadId: string): string {
  if (spreadId === "relationship") {
    return `2. Multi-dimensional Assessment
   - Emotions & connection
   - Communication & interaction
   - Growth direction for the relationship`;
  }
  if (spreadId === "two-choice") {
    return `2. Multi-dimensional Assessment
   - Energy direction of Option A
   - Energy direction of Option B
   - Comparison and recommendation`;
  }
  return `2. Multi-dimensional Assessment
   - Inner state & psychological
   - Relationships & interpersonal
   - Work & practical life`;
}

function buildPrompt(
  spread: string,
  spreadId: string,
  cards: CardInfo[],
  locale: string
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
- 不要用 markdown 格式符號（不要 ###、**、- 等）
- 用段落標題分隔不同區塊，標題用簡短的文字就好，例如「牌面解析」「感情面」等

解讀架構：
1. 牌面解析
   逐張解讀每張牌在其位置上的含義，以及牌與牌之間的關聯和整體流動。

${assessment}
   每個層面 2-3 句話就好，不要寫太長。點出核心就好。

3. 建議與練習
   給出 2-3 個具體可執行的建議或小練習。要實際、可操作，不要空泛的心靈雞湯。例如：
   - 「這週試試看每天花 5 分鐘什麼都不做，就坐著感受呼吸」
   - 「下次想發脾氣的時候，先暫停 10 秒，問自己：我真正在氣的是什麼？」
   這類具體的東西。

4. 靜心提醒
   最後用一句簡短的話作為結尾。

用戶使用「${spread}」牌陣抽了以下的禪卡：

${cardLines}`;
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
- Do not use markdown formatting (no ###, **, - etc)
- Use short section titles as plain text to separate sections, e.g. "Card Analysis", "Relationships"

Reading structure:
1. Card Analysis
   Interpret each card in its position, explain how the cards connect, and describe the overall flow.

${assessment}
   Keep each dimension to 2-3 sentences. Hit the core point and move on.

3. Advice & Practice
   Give 2-3 concrete, actionable suggestions or small exercises. Be specific and practical, not vague platitudes. Examples:
   - "This week, try spending 5 minutes each day doing nothing — just sit and feel your breath"
   - "Next time you feel angry, pause for 10 seconds and ask yourself: what am I really upset about?"

4. Meditation Reminder
   Close with one brief sentence.

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

  let body: { spread: string; spreadId?: string; cards: CardInfo[]; locale: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { spread, spreadId, cards, locale } = body;
  if (!spread || !cards?.length || !locale) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const prompt = buildPrompt(spread, spreadId ?? "", cards, locale);

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
