import { sendGAEvent } from "@next/third-parties/google";

/**
 * Structured error codes returned by /api/reading.
 * The API only ever sends a code — never the raw upstream message — so the UI
 * decides what the user reads.
 */
export type ReadingErrorCode =
  | "MODEL_UNAVAILABLE"
  | "CONFIG_ERROR"
  | "SERVICE_ERROR"
  | "SERVICE_BUSY"
  | "RATE_LIMITED"
  | "UNKNOWN_ERROR";

const KNOWN_CODES: ReadingErrorCode[] = [
  "MODEL_UNAVAILABLE",
  "CONFIG_ERROR",
  "SERVICE_ERROR",
  "SERVICE_BUSY",
  "RATE_LIMITED",
  "UNKNOWN_ERROR",
];

export interface ReadingErrorInfo {
  code: ReadingErrorCode;
  /** True when the IP-based daily free limit is exhausted (429 + dailyLimit). */
  dailyLimit: boolean;
}

function toCode(value: unknown): ReadingErrorCode | null {
  return typeof value === "string" && (KNOWN_CODES as string[]).includes(value)
    ? (value as ReadingErrorCode)
    : null;
}

/** Read the structured error out of a failed /api/reading response. */
export async function parseReadingError(response: Response): Promise<ReadingErrorInfo> {
  const data = (await response.json().catch(() => ({}))) as {
    error?: { code?: unknown } | string;
    code?: unknown;
    dailyLimit?: boolean;
  };

  const nested = typeof data.error === "object" && data.error !== null ? data.error.code : undefined;
  const code =
    toCode(nested) ??
    toCode(data.code) ??
    (response.status === 429 ? "RATE_LIMITED" : "UNKNOWN_ERROR");

  return { code, dailyLimit: code === "RATE_LIMITED" && data.dailyLimit === true };
}

/** Error info for a request that never reached the API (network, abort, parse). */
export const NETWORK_READING_ERROR: ReadingErrorInfo = {
  code: "UNKNOWN_ERROR",
  dailyLimit: false,
};

/**
 * The API answered 200 but the stream carried no text. Treated as a failure so
 * the user gets a message and a retry instead of a silently blank reading.
 */
export const EMPTY_READING_ERROR: ReadingErrorInfo = {
  code: "UNKNOWN_ERROR",
  dailyLimit: false,
};

/**
 * i18n key for the message shown to the user.
 * Rate limiting keeps its own existing copy, handled by the caller.
 */
export function readingErrorMessageKey(code: ReadingErrorCode): string {
  return code === "MODEL_UNAVAILABLE"
    ? "result.errorModelUnavailable"
    : "result.errorGeneric";
}

/** GA4: one event per failed reading, so outages are visible in analytics. */
export function trackReadingError(
  code: ReadingErrorCode,
  deckType: "osho" | "tarot",
  spreadType: string
) {
  sendGAEvent("event", "reading_error", {
    error_code: code,
    deck_type: deckType,
    spread_type: spreadType,
  });
}
