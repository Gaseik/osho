#!/bin/bash

# Zen Tarot Card Image Renaming Script
# Based on image identification from card faces

CARDS_DIR="src/assets/cards"

echo "🎴 Renaming Zen Tarot card images..."
echo "📁 Working directory: $CARDS_DIR"
echo ""

# Array of rename operations: "old_name|new_name"
declare -a RENAMES=(
  # Confirmed Zen Tarot cards in our 30-card list:
  "Breakthrough.jpeg|11-breakthrough.jpeg"
  "OSHO ZEN TAROT.jpeg|21-completion.jpeg"
  "OSHO ZEN TAROT (1).jpeg|09-aloneness.jpeg"
  "OSHO ZEN TAROT (2).jpeg|14-integration.jpeg"
  "OSHO ZEN TAROT (3).jpeg|16-thunderbolt.jpeg"
  "OSHO ZEN TAROT (4).jpeg|04-the-rebel.jpeg"
  "OSHO ZEN TAROT (5).jpeg|17-silence.jpeg"
  "_ (3).jpeg|19-innocence.jpeg"
  "_ (4).jpeg|20-beyond-illusion.jpeg"
  "The Lovers.jpeg|06-the-lovers.jpeg"
  "The Magician.jpeg|01-existence.jpeg"

  # Cards from full Osho Zen Tarot deck (not in our 30-card list):
  # These will be moved to a separate folder
  "OSHO ZEN TAROT (6).jpeg|extra/mind.jpeg"
  "OSHO ZEN TAROT (7).jpeg|extra/postponement.jpeg"
  "_ (2).jpeg|extra/letting-go-cups-8.jpeg"
)

# Create extra folder for non-main cards
mkdir -p "$CARDS_DIR/extra"
mkdir -p "$CARDS_DIR/traditional-tarot"

# Move traditional Tarot cards (not Zen Tarot)
echo "📦 Moving traditional Tarot cards to separate folder..."
TRADITIONAL_CARDS=(
  "The High Priestess.jpeg"
  "Page of Wands.jpeg"
  "Queen of Swords.jpeg"
  "8 of Swords.jpeg"
  "9 of Swords.jpeg"
  "6 of Cups.jpeg"
  "10 of Swords_.jpeg"
  "Knight of Swords.jpeg"
  "The Hanged Man.jpeg"
  "The Moon.jpeg"
  "Knight of Wands.jpeg"
  "Ace of Wands.jpeg"
  "4 of Wands.jpeg"
)

for card in "${TRADITIONAL_CARDS[@]}"; do
  if [ -f "$CARDS_DIR/$card" ]; then
    echo "  → Moving: $card"
    mv "$CARDS_DIR/$card" "$CARDS_DIR/traditional-tarot/"
  fi
done

echo ""
echo "✨ Renaming Zen Tarot cards..."

# Perform renames
for rename_pair in "${RENAMES[@]}"; do
  IFS='|' read -r old_name new_name <<< "$rename_pair"
  old_path="$CARDS_DIR/$old_name"
  new_path="$CARDS_DIR/$new_name"

  if [ -f "$old_path" ]; then
    echo "  ✓ $old_name → $new_name"
    # Create directory if needed (for extra/ paths)
    mkdir -p "$(dirname "$new_path")"
    mv "$old_path" "$new_path"
  else
    echo "  ✗ Not found: $old_name"
  fi
done

echo ""
echo "✅ Done! Summary:"
echo "   • Renamed $(ls -1 "$CARDS_DIR"/*.jpeg 2>/dev/null | wc -l | tr -d ' ') main cards"
echo "   • Moved $(ls -1 "$CARDS_DIR/extra"/*.jpeg 2>/dev/null | wc -l | tr -d ' ') extra cards"
echo "   • Moved $(ls -1 "$CARDS_DIR/traditional-tarot"/*.jpeg 2>/dev/null | wc -l | tr -d ' ') traditional Tarot cards"
echo ""
echo "📝 Note: You still need 19 more cards to complete the 30-card Zen Tarot deck."
