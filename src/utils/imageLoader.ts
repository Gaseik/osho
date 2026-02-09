/**
 * Dynamic image loader for card images
 *
 * Usage:
 * const cardImage = getCardImage(cardId);
 * <img src={cardImage} alt={cardName} />
 */

/**
 * Get card image path
 * When you add card images to src/assets/cards/,
 * name them as: 00-fool.png, 01-existence.png, etc.
 */
export function getCardImage(cardId: number): string {
  try {
    // This will be used when you have actual card images
    // For now, returns a placeholder
    return new URL(`../assets/cards/${String(cardId).padStart(2, '0')}.png`, import.meta.url).href;
  } catch {
    // Fallback to placeholder
    return '';
  }
}

/**
 * Preload card images for better performance
 * Call this on app initialization
 */
export function preloadCardImages(cardIds: number[]): Promise<void[]> {
  return Promise.all(
    cardIds.map(id => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getCardImage(id);
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Still resolve on error
      });
    })
  );
}
