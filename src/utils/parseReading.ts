/**
 * Parse AI reading markdown into structured sections.
 *
 * Expected format:
 *   ## 牌意解讀 / Card Meanings
 *   ### Card Name
 *   ...interpretation paragraphs...
 *
 *   ## 牌面解析 / Card Reading
 *   ...paragraphs with **bold**...
 *
 *   ## 深層洞察 / Deeper Insight
 *   - point 1
 *   - point 2
 *
 *   ## 具體指引 / Practical Guidance
 *   1. step 1
 *   2. step 2
 *
 *   ## 靜心提醒 / Zen Reminder
 *   > quote text
 */

export interface ReadingSection {
  id: "card-meanings" | "card-reading" | "deeper-insight" | "practical-guidance" | "zen-reminder" | "generic";
  title: string;
  body: string;
}

// Match section headers in both ZH and EN (including old prompt variants)
// Supports: ## Title, ### Title, **Title**, ##Title (no space)
const SECTION_PATTERNS: {
  id: ReadingSection["id"];
  pattern: RegExp;
}[] = [
  { id: "card-meanings", pattern: /^(?:#{1,3}\s*|(?:\*\*)).*(?:牌意解讀|Card\s*Meanings?)/i },
  { id: "card-reading", pattern: /^(?:#{1,3}\s*|(?:\*\*)).*(?:牌面解析|Card\s*(?:Reading|Analysis)|綜合解讀|整體解讀)/i },
  { id: "deeper-insight", pattern: /^(?:#{1,3}\s*|(?:\*\*)).*(?:深層洞察|多層面評估|Deeper\s*Insight|Multi.?dimensional\s*Assessment|深入分析|深層)/i },
  { id: "practical-guidance", pattern: /^(?:#{1,3}\s*|(?:\*\*)).*(?:具體指引|建議與練習|Practical\s*Guidance|Advice\s*[&＆]\s*Practice|行動指引|實際建議)/i },
  { id: "zen-reminder", pattern: /^(?:#{1,3}\s*|(?:\*\*)).*(?:靜心提醒|Zen\s*Reminder|Meditation\s*Reminder|冥想提醒)/i },
];

/** Check if a line is a # or ## heading (NOT ### which is a sub-heading inside sections) */
const H2_PATTERN = /^#{1,2}(?!#)\s*\S/;

/** Check if a line is a standalone bold heading like **Title** */
const BOLD_LINE_PATTERN = /^\*\*[^*]+\*\*\s*$/;

function matchSection(line: string): ReadingSection["id"] | null {
  const trimmed = line.trim();
  for (const { id, pattern } of SECTION_PATTERNS) {
    if (pattern.test(trimmed)) return id;
  }
  // Any unrecognized # or ## heading or standalone **bold** line becomes a generic section
  // Note: ### is NOT matched here — it's used for sub-headings within sections (e.g. card names)
  if (H2_PATTERN.test(trimmed) || BOLD_LINE_PATTERN.test(trimmed)) return "generic";
  return null;
}

export function parseReading(markdown: string): ReadingSection[] {
  const lines = markdown.split("\n");
  const sections: ReadingSection[] = [];
  let currentId: ReadingSection["id"] | null = null;
  let currentTitle = "";
  let bodyLines: string[] = [];

  for (const line of lines) {
    const sectionId = matchSection(line);

    if (sectionId) {
      // Flush previous section
      if (currentId) {
        sections.push({
          id: currentId,
          title: currentTitle,
          body: bodyLines.join("\n").trim(),
        });
      }
      currentId = sectionId;
      // Extract just the title text (remove #/##/### prefix or **bold** markers)
      currentTitle = line.trim()
        .replace(/^#{1,3}\s*/, "")
        .replace(/^\*\*(.+)\*\*$/, "$1");
      bodyLines = [];
    } else if (currentId) {
      bodyLines.push(line);
    }
    // Lines before any section header are ignored
  }

  // Flush last section
  if (currentId) {
    sections.push({
      id: currentId,
      title: currentTitle,
      body: bodyLines.join("\n").trim(),
    });
  }

  return sections;
}

/** Parse card meanings body into individual card entries (split by ### headings) */
export interface CardMeaningEntry {
  name: string;
  body: string;
}

export function parseCardMeanings(body: string): CardMeaningEntry[] {
  const entries: CardMeaningEntry[] = [];
  let currentName = "";
  let bodyLines: string[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    // Match ### heading (card name)
    const match = trimmed.match(/^###\s+(.+)/);
    if (match) {
      if (currentName) {
        entries.push({ name: currentName, body: bodyLines.join("\n").trim() });
      }
      currentName = match[1];
      bodyLines = [];
    } else if (currentName) {
      bodyLines.push(line);
    }
  }
  if (currentName) {
    entries.push({ name: currentName, body: bodyLines.join("\n").trim() });
  }

  return entries;
}

/** Extract blockquote text from body (strips leading >) */
export function extractBlockquote(body: string): string {
  const lines = body.split("\n");
  const quoteLines = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith(">"))
    .map((l) => l.replace(/^>\s*/, ""));
  return quoteLines.join(" ").trim() || body.trim();
}

/** Parse bullet list items (- item) */
export function parseBulletList(body: string): string[] {
  const items: string[] = [];
  let current = "";

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (current) items.push(current.trim());
      current = trimmed.replace(/^[-*]\s+/, "");
    } else if (current && trimmed) {
      // Continuation of previous item
      current += " " + trimmed;
    }
  }
  if (current) items.push(current.trim());

  return items;
}

/** Parse numbered list items (1. item) */
export function parseNumberedList(body: string): string[] {
  const items: string[] = [];
  let current = "";

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (/^\d+[.)]\s+/.test(trimmed)) {
      if (current) items.push(current.trim());
      current = trimmed.replace(/^\d+[.)]\s+/, "");
    } else if (current && trimmed) {
      current += " " + trimmed;
    }
  }
  if (current) items.push(current.trim());

  return items;
}
