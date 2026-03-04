export interface CardInfo {
  position: string;
  nameZh: string;
  nameEn: string;
  meaningZh: string;
  meaningEn: string;
}

export interface UserProfileInfo {
  name?: string;
  gender?: string;
  age?: string;
  readingStyle?: string;
}

// --- Style Instructions ---

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

// --- User Context ---

export function buildUserContextZh(profile: UserProfileInfo): string {
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

export function buildUserContextEn(profile: UserProfileInfo): string {
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

// --- Topic Context ---

export function buildTopicContextZh(topic: string, description?: string): string {
  if (description) {
    return `\n\n用戶選擇的問題類別：${topic}。\n用戶描述的狀況：${description}\n請將牌義與此情境具體連結，在相關層面的分析要特別深入。`;
  }
  return `\n\n用戶的提問主題：「${topic}」\n請特別針對這個主題方向來解讀牌面，讓解讀緊扣用戶關心的議題。`;
}

export function buildTopicContextEn(topic: string, description?: string): string {
  if (description) {
    return `\n\nUser's selected category: ${topic}.\nUser's situation: ${description}\nPlease connect the card meanings specifically to this situation, with deeper analysis on the relevant aspects.`;
  }
  return `\n\nUser's topic/question: "${topic}"\nPlease focus the reading specifically on this topic, making the interpretation directly relevant to what the user is asking about.`;
}

// --- Card Lines ---

export function buildCardLines(cards: CardInfo[], isZh: boolean): string {
  return isZh
    ? cards.map((c) => `${c.position}：${c.nameZh}（${c.nameEn}）- ${c.meaningZh}`).join("\n")
    : cards.map((c) => `${c.position}: ${c.nameEn} - ${c.meaningEn}`).join("\n");
}
