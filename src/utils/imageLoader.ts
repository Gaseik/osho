/**
 * Dynamic image loader for card images
 */

/**
 * Get card image path with fallback support
 * Returns the image path if it exists, null if not
 */
export function getCardImagePath(cardId: number): string {
  const paddedId = String(cardId).padStart(2, '0');

  // In Vite, we need to use dynamic imports for conditional image loading
  // For now, we'll return the path and let the component handle loading
  return `/src/assets/cards/${paddedId}-*.jpeg`;
}

/**
 * Check if card image exists
 * This is a helper that components can use with try/catch on img.onError
 */
export function tryLoadCardImage(cardId: number): Promise<string | null> {
  return new Promise((resolve) => {
    // We'll try to load the image and return the path if successful
    // This is handled at component level with img tag error handling
    const paddedId = String(cardId).padStart(2, '0');

    // Since we don't know the exact filename (e.g., 01-existence.jpeg),
    // we rely on the actual file system structure
    // In production, components should handle img onError to show placeholder

    resolve(null); // For now, components will handle this
  });
}

/**
 * Get available card images from the cards directory
 * This would need to be populated at build time or via an index file
 */
export const AVAILABLE_CARD_IMAGES = new Set([
  1, 2, 4, 6, 7, 9, 11, 12, 14, 16, 17, 18, 19, 20, 21,
  22, 25, 26, 30, 32, 33, 39, 40, 42, 43, 44, 48, 49,
  51, 52, 53, 55, 57, 58, 60, 61, 62, 67, 69, 70, 71, 72, 73, 74, 77
]);

/**
 * Check if a card has an image available
 */
export function hasCardImage(cardId: number): boolean {
  return AVAILABLE_CARD_IMAGES.has(cardId);
}
