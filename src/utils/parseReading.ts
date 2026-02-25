/**
 * Parse AI reading markdown into structured sections.
 *
 * Expected format:
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
  id: "card-reading" | "deeper-insight" | "practical-guidance" | "zen-reminder";
  title: string;
  body: string;
}

// Match section headers in both ZH and EN
const SECTION_PATTERNS: {
  id: ReadingSection["id"];
  pattern: RegExp;
}[] = [
  { id: "card-reading", pattern: /^##\s+.*(?:牌面解析|Card\s*Reading)/i },
  { id: "deeper-insight", pattern: /^##\s+.*(?:深層洞察|Deeper\s*Insight)/i },
  { id: "practical-guidance", pattern: /^##\s+.*(?:具體指引|Practical\s*Guidance)/i },
  { id: "zen-reminder", pattern: /^##\s+.*(?:靜心提醒|Zen\s*Reminder)/i },
];

function matchSection(line: string): ReadingSection["id"] | null {
  const trimmed = line.trim();
  for (const { id, pattern } of SECTION_PATTERNS) {
    if (pattern.test(trimmed)) return id;
  }
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
      // Extract just the title text (remove ## prefix)
      currentTitle = line.trim().replace(/^##\s+/, "");
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
