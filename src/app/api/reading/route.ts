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

type PromptLang = 'zh' | 'en' | 'ko' | 'ja';

function getPromptLang(locale: string): PromptLang {
  if (locale.startsWith('zh')) return 'zh';
  if (locale === 'ko') return 'ko';
  if (locale === 'ja') return 'ja';
  return 'en';
}

function getLanguageInstruction(lang: PromptLang): string {
  switch (lang) {
    case 'zh':
      return `\n\n## Language\nRespond entirely in Traditional Chinese (繁體中文).`;
    case 'ko':
      return `\n\n## Language\nIMPORTANT: You MUST respond entirely in Korean (한국어). Keep the section headings in Chinese characters (## 牌意解讀, ## 牌面解析, ## 深層洞察, ## 具體指引, ## 靜心提醒, ## 解答), but write ALL content, analysis, and advice in Korean. Do NOT respond in English or Chinese.`;
    case 'ja':
      return `\n\n## Language\nIMPORTANT: You MUST respond entirely in Japanese (日本語). Keep the section headings in Chinese characters (## 牌意解讀, ## 牌面解析, ## 深層洞察, ## 具體指引, ## 靜心提醒, ## 解答), but write ALL content, analysis, and advice in Japanese. Do NOT respond in English or Chinese.`;
    default:
      return `\n\n## Language\nRespond entirely in English.`;
  }
}

const STYLE_INSTRUCTIONS: Record<PromptLang, Record<string, string>> = {
  zh: {
    natural: "",
    warm: "\n\n解讀風格要求：用溫暖、鼓勵的語氣。多給予正向支持和肯定，即使是挑戰性的牌面也要找到光明面。語氣像一個溫柔的朋友在安慰和打氣。",
    intuitive: "\n\n解讀風格要求：用直覺性、靈性的語氣。強調能量流動、內在感受和深層連結。可以使用意象和隱喻，讓解讀帶有靈性的深度和詩意。",
    rational: "\n\n解讀風格要求：用理性、務實的語氣。著重邏輯分析和具體行動建議。少用抽象比喻，多用清晰的因果關係和可操作的步驟。像一個理性的顧問在給建議。",
  },
  en: {
    natural: "",
    warm: "\n\nReading style: Use a warm, encouraging tone. Offer positive support and affirmation. Even with challenging cards, find the silver lining. Sound like a caring friend offering comfort and motivation.",
    intuitive: "\n\nReading style: Use an intuitive, spiritual tone. Emphasize energy flow, inner feelings, and deep connections. Use imagery and metaphors to bring spiritual depth and poetic quality to the reading.",
    rational: "\n\nReading style: Use a rational, practical tone. Focus on logical analysis and concrete action steps. Minimize abstract metaphors, emphasize clear cause-and-effect and actionable advice. Sound like a pragmatic advisor.",
  },
  ko: {
    natural: "",
    warm: "\n\n리딩 스타일: 따뜻하고 격려하는 톤으로. 긍정적인 지지와 확인을 제공하세요. 도전적인 카드에서도 희망을 찾으세요. 따뜻한 친구처럼 위로하고 응원하는 느낌으로.",
    intuitive: "\n\n리딩 스타일: 직관적이고 영적인 톤으로. 에너지의 흐름, 내면의 감정, 깊은 연결을 강조하세요. 이미지와 은유를 사용하여 영적인 깊이와 시적인 아름다움을 더하세요.",
    rational: "\n\n리딩 스타일: 이성적이고 실용적인 톤으로. 논리적 분석과 구체적 행동 조언에 집중하세요. 추상적 비유를 줄이고, 명확한 인과관계와 실행 가능한 단계를 제시하세요.",
  },
  ja: {
    natural: "",
    warm: "\n\nリーディングスタイル：温かく励ましのあるトーンで。ポジティブなサポートと肯定を提供してください。チャレンジングなカードでも希望を見つけてください。思いやりのある友人のように。",
    intuitive: "\n\nリーディングスタイル：直感的でスピリチュアルなトーンで。エネルギーの流れ、内なる感情、深いつながりを強調してください。イメージとメタファーを使って深みを加えてください。",
    rational: "\n\nリーディングスタイル：理性的で実用的なトーンで。論理的分析と具体的なアクションステップに焦点を当ててください。明確な因果関係と実行可能なアドバイスを強調してください。",
  },
};

function buildUserContext(profile: UserProfileInfo, lang: PromptLang): string {
  const labels: Record<PromptLang, { name: string; gender: string; age: string; ageUnit: string; intro: string; genders: Record<string, string> }> = {
    zh: { name: "稱呼", gender: "性別", age: "年齡", ageUnit: " 歲", intro: "請根據用戶的背景資訊，讓解讀更加個人化和貼近。", genders: { male: "男性", female: "女性", other: "其他" } },
    en: { name: "Name", gender: "Gender", age: "Age", ageUnit: "", intro: "Please personalize the reading based on the user's background.", genders: { male: "Male", female: "Female", other: "Other" } },
    ko: { name: "이름", gender: "성별", age: "나이", ageUnit: "세", intro: "사용자의 배경 정보를 바탕으로 더 개인화된 리딩을 해주세요.", genders: { male: "남성", female: "여성", other: "기타" } },
    ja: { name: "名前", gender: "性別", age: "年齢", ageUnit: "歳", intro: "ユーザーの背景情報に基づいて、よりパーソナライズされたリーディングを提供してください。", genders: { male: "男性", female: "女性", other: "その他" } },
  };
  const l = labels[lang];
  const parts: string[] = [];
  if (profile.name) parts.push(`${l.name}: ${profile.name}`);
  if (profile.gender) parts.push(`${l.gender}: ${l.genders[profile.gender] || profile.gender}`);
  if (profile.age) parts.push(`${l.age}: ${profile.age}${l.ageUnit}`);
  const styleInstruction = STYLE_INSTRUCTIONS[lang]?.[profile.readingStyle || "natural"] || "";
  if (parts.length === 0 && !styleInstruction) return "";
  const userInfo = parts.length > 0
    ? `\n\n${lang === 'zh' ? '用戶資訊' : lang === 'ko' ? '사용자 정보' : lang === 'ja' ? 'ユーザー情報' : 'User info'}:\n${parts.join("\n")}\n${l.intro}`
    : "";
  return `${userInfo}${styleInstruction}`;
}


function buildTopicContext(topic: string, lang: PromptLang, description?: string): string {
  if (lang === 'zh') {
    if (description) return `\n\n用戶選擇的問題類別：${topic}。\n用戶描述的狀況：${description}\n請將牌義與此情境具體連結，在相關層面的分析要特別深入。`;
    return `\n\n用戶的提問主題：「${topic}」\n請特別針對這個主題方向來解讀牌面，讓解讀緊扣用戶關心的議題。`;
  }
  if (lang === 'ko') {
    if (description) return `\n\n사용자가 선택한 질문 카테고리: ${topic}.\n사용자가 설명한 상황: ${description}\n카드의 의미를 이 상황과 구체적으로 연결하고, 관련 측면을 특히 깊이 분석해주세요.`;
    return `\n\n사용자의 질문 주제: "${topic}"\n이 주제에 맞춰 카드를 해석하고, 사용자가 관심 있는 문제와 직접 연결해주세요.`;
  }
  if (lang === 'ja') {
    if (description) return `\n\nユーザーが選択した質問カテゴリ: ${topic}。\nユーザーが説明した状況: ${description}\nカードの意味をこの状況と具体的に結びつけ、関連する側面を特に深く分析してください。`;
    return `\n\nユーザーの質問テーマ: 「${topic}」\nこのテーマに焦点を当ててカードを解釈し、ユーザーが気にしている問題に直接関連づけてください。`;
  }
  if (description) return `\n\nUser's selected category: ${topic}.\nUser's situation: ${description}\nPlease connect the card meanings specifically to this situation, with deeper analysis on the relevant aspects.`;
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
  const lang = getPromptLang(locale);
  const useZhData = lang === 'zh';

  const cardLines = useZhData
    ? cards.map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`).join("\n")
    : cards.map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`).join("\n");

  const topicContext = topic
    ? buildTopicContext(topic, lang, description)
    : "";

  const userContext = userProfile
    ? buildUserContext(userProfile, lang)
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

The user drew the following cards using the "${spread}" spread:

${cardLines}${topicContext}${userContext}${getLanguageInstruction(lang)}`;
}

function buildFortuneInstructionZh(): string {
  return `

## 特殊模式：運勢分析
這次解讀是「運勢占卜」模式，請特別按照以下結構提供 3-6 個月的運勢分析：

請將 ## 具體指引 替換為 ## 運勢預測，並按照以下子項目分析：

### 整體運勢
概述未來 3-6 個月的整體能量走向和趨勢。

### 感情運
分析未來 3-6 個月的感情發展、桃花運或伴侶關係走向。

### 事業運
分析未來 3-6 個月的職場機會、挑戰與發展方向。

### 財運
分析未來 3-6 個月的財務狀況、投資機會或需注意的風險。

### 健康運
分析未來 3-6 個月的身心健康注意事項。

### 關鍵月份
指出未來 3-6 個月中最重要的轉折點或機會時間，越具體越好（例如：四月中旬、五月底等）。

每個子項目請給出具體的時間範圍和實際建議，不要只說「注意健康」，要說明具體需要注意什麼、在什麼時間段特別需要留意。`;
}

function buildFortuneInstructionEn(): string {
  return `

## Special Mode: Fortune Analysis
This reading is in "Fortune Reading" mode. Please provide a 3-6 month fortune analysis with the following structure:

Replace ## 具體指引 with ## Fortune Forecast, and analyze these sub-areas:

### Overall Fortune
Overview of the overall energy trends and direction for the next 3-6 months.

### Love & Relationships
Analysis of romantic development, dating prospects, or partnership trajectory for the next 3-6 months.

### Career
Analysis of workplace opportunities, challenges, and development direction for the next 3-6 months.

### Finances
Analysis of financial outlook, investment opportunities, or risks to watch for over the next 3-6 months.

### Health & Wellness
Physical and mental health considerations for the next 3-6 months.

### Key Months
Identify the most important turning points or opportunity windows in the next 3-6 months. Be as specific as possible (e.g., mid-April, late May).

For each sub-area, give concrete time ranges and practical advice. Don't just say "watch your health" — specify what to watch and when.`;
}

function buildTarotPrompt(
  spread: string,
  cards: CardInfo[],
  locale: string,
  userProfile?: UserProfileInfo,
  topic?: string,
  validationContext?: string,
  fortuneMode?: boolean
): string {
  const lang = getPromptLang(locale);
  const useZhData = lang === 'zh';

  const cardLines = useZhData
    ? cards.map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`).join("\n")
    : cards.map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`).join("\n");

  const topicContext = topic
    ? buildTopicContext(topic, lang)
    : "";

  const userContext = userProfile
    ? buildUserContext(userProfile, lang)
    : "";

  const fortuneInstruction = fortuneMode
    ? (useZhData ? buildFortuneInstructionZh() : buildFortuneInstructionEn())
    : "";

  return `You are a masterful tarot reader who combines sharp intuition with honest, grounded wisdom. You read cards the way a brilliant storyteller would — weaving each card into a vivid, interconnected narrative that makes the querent feel truly seen and understood.

## Core Philosophy

1. **Tell a story, not a report**: Each card is a chapter. Build a narrative arc where cards connect to each other with cause and effect. Use vivid metaphors and imagery (e.g. "It's like returning to an old harbor only to find the tides have shifted and the ships have changed hands"). Make the querent feel like they're watching their own life unfold through the cards.

2. **Be cinematically specific**: Don't say "this card represents change." Paint a picture: "The Wheel of Fortune here suggests the universe is quietly rearranging the pieces — that text message you've been waiting for, that unexpected encounter, something is about to shift the entire dynamic."

3. **Cards must talk to each other**: Never interpret cards in isolation. Each card modifies, reinforces, or contradicts the ones around it. Show the tension and harmony between them: "While the Empress speaks of the warmth you once shared, the Emperor arriving in the final position tells a very different story — she's built walls where there used to be open doors."

4. **Be honest with compassion**: If the cards say no, say no — but say it like a wise friend who respects the querent enough to tell the truth. Don't hide behind vagueness. "That door has closed" is more helpful than "you might want to consider other possibilities."

5. **See what they can't see**: The querent asks about the surface. You read what's underneath. Always address both: first answer what they came to hear, then reveal what the cards say they need to understand.

6. **Time predictions must be concrete**: Use the elemental timing system and commit to it:
   - Wands (Fire): Days to weeks
   - Cups (Water): Weeks to months
   - Swords (Air): Days to weeks
   - Pentacles (Earth): Months to a year
   - Major Arcana: Major life milestones, turning points
   - Always give a range: "around late March to mid-April" not just "soon"

## Tone Rules
- No "Dear friend", "Dear one", or any formal greetings
- No preaching or spiritual lecturing
- Jump straight into the reading
- Write like a captivating storyteller who happens to read tarot — vivid, engaging, occasionally poetic
- Use rhetorical questions sparingly but effectively
- Don't force positivity. Difficulty is not failure — name it honestly
- Conversational but with weight. Every sentence should earn its place.

## Reading Structure

IMPORTANT: You MUST use exactly these ## headings to structure your response. Each section MUST start with ## followed by a space and the section title. Do NOT skip any section.

## 解答
The FIRST thing the querent sees. Answer their question directly in 2-4 sentences.
- Clear verdict: yes/no/unlikely/possible with conditions
- Probability: "chances are high/low/moderate"
- Timing: specific range based on card elements
- Conditions: "This may happen, but only if..."
- Be decisive. If the cards say no, say no clearly.
Example: "Based on these cards, the likelihood of her returning to the previous arrangement is low. The cards point to a fundamental shift in how she views this connection. If any reconnection happens, it won't be before late spring, and it will look nothing like what you had before — she's operating from an entirely different place now."

## 牌面解析
This is NOT a card-by-card breakdown. This is a STORY.
Structure it as a narrative arc:
1. Open with the core message in 1-2 vivid sentences
2. Weave through each card as chapters of the same story, showing how one leads to the next
3. Use metaphors and imagery that connect to the querent's specific situation
4. Bold **key turning points** in the narrative
5. End with where the story is heading
The querent should feel like they're reading a compelling account of their own situation, not a textbook definition of cards.

## 深層洞察
The uncomfortable but necessary truth. 2-3 points:
- "You came asking about X, but what the cards are really showing is Y"
- Name the unconscious pattern with a specific, relatable example
- Show where this pattern appears elsewhere in their life
- This section should make the querent pause and think "...damn, that's accurate"

## 具體指引
2-3 numbered actions that are:
- **Specific**: not "reflect on your feelings" but "write down three promises you made to yourself about this relationship that you haven't kept"
- **Time-bound**: "this week", "in the next two weeks", "before the end of the month"
- **Actionable**: something they can literally do tomorrow

## 靜心提醒
One line in blockquote format (>).
Not chicken soup. A line that lands like a gentle punch — the kind of sentence that stays in your head for days.

${validationContext ? `${validationContext}\n\n` : ""}The user drew the following cards using the "${spread}" spread:

${cardLines}${topicContext}${userContext}${fortuneInstruction}${getLanguageInstruction(lang)}`;
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

  let body: { spread: string; spreadId?: string; cards: CardInfo[]; locale: string; userProfile?: UserProfileInfo; topic?: string; description?: string; deck_type?: string; validation?: boolean; validationContext?: string; fortuneMode?: boolean };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { spread, spreadId, cards, locale, userProfile, topic, description, deck_type, validation, validationContext, fortuneMode } = body;
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
    const lang = getPromptLang(locale);
    const validationLangMap: Record<PromptLang, string> = {
      zh: 'You MUST respond entirely in Traditional Chinese (繁體中文).',
      ko: 'You MUST respond entirely in Korean (한국어). Do NOT respond in Chinese or English.',
      ja: 'You MUST respond entirely in Japanese (日本語). Do NOT respond in Chinese or English.',
      en: 'Respond in English.',
    };
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
- Keep it under 100 words
- ${validationLangMap[lang]}`;

    messages = [
      { role: "system", content: validationSystemPrompt },
      { role: "user", content: topic || "" },
    ];
    maxTokens = 300;
  } else {
    const prompt = deck_type === "tarot"
      ? buildTarotPrompt(spread, cards, locale, userProfile, topic, validationContext, fortuneMode)
      : buildPrompt(spread, spreadId ?? "", cards, locale, userProfile, topic, description);
    messages = [{ role: "user", content: prompt }];
    maxTokens = deck_type === "tarot" ? (fortuneMode ? 4000 : 3000) : 2000;
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
