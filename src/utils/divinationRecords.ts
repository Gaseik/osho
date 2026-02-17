export interface DivinationCard {
  id: number;
  name: string;
  nameZh: string;
  meaning: string;
}

export interface DivinationRecord {
  id: string;
  spreadId: string;
  spreadName: string;
  spreadNameEn: string;
  cards: DivinationCard[];
  question: string;
  createdAt: string;
  review: string;
  reviewedAt: string | null;
}

const STORAGE_KEY = "zen-divination-records";
const MAX_RECORDS = 100;

export function getRecords(): DivinationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecord(record: DivinationRecord): boolean {
  const records = getRecords();
  if (records.length >= MAX_RECORDS) return false;
  records.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return true;
}

export function isRecordsFull(): boolean {
  return getRecords().length >= MAX_RECORDS;
}

export function updateRecord(
  id: string,
  updates: Partial<Pick<DivinationRecord, "review" | "reviewedAt">>
): void {
  const records = getRecords();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return;
  records[idx] = { ...records[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
