#!/bin/bash

# Zen Tarot Card Renaming Script
# Based on actual text identified from card images

CARDS_DIR="src/assets/cards"

echo "🎴 Renaming Zen Tarot card images based on card text..."
echo ""

# Create folders
mkdir -p "$CARDS_DIR/extra"

echo "✨ Renaming main deck cards (17 found)..."

# Main deck cards (in our 30-card list)
mv "$CARDS_DIR/The Magician.jpeg" "$CARDS_DIR/01-existence.jpeg" 2>/dev/null && echo "  ✓ 01-existence.jpeg"
mv "$CARDS_DIR/The High Priestess.jpeg" "$CARDS_DIR/02-inner-voice.jpeg" 2>/dev/null && echo "  ✓ 02-inner-voice.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT (4).jpeg" "$CARDS_DIR/04-the-rebel.jpeg" 2>/dev/null && echo "  ✓ 04-the-rebel.jpeg"
mv "$CARDS_DIR/The Lovers.jpeg" "$CARDS_DIR/06-the-lovers.jpeg" 2>/dev/null && echo "  ✓ 06-the-lovers.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT (1).jpeg" "$CARDS_DIR/09-aloneness.jpeg" 2>/dev/null && echo "  ✓ 09-aloneness.jpeg"
mv "$CARDS_DIR/Breakthrough.jpeg" "$CARDS_DIR/11-breakthrough.jpeg" 2>/dev/null && echo "  ✓ 11-breakthrough.jpeg"
mv "$CARDS_DIR/The Hanged Man.jpeg" "$CARDS_DIR/12-new-vision.jpeg" 2>/dev/null && echo "  ✓ 12-new-vision.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT (2).jpeg" "$CARDS_DIR/14-integration.jpeg" 2>/dev/null && echo "  ✓ 14-integration.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT (3).jpeg" "$CARDS_DIR/16-thunderbolt.jpeg" 2>/dev/null && echo "  ✓ 16-thunderbolt.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT (5).jpeg" "$CARDS_DIR/17-silence.jpeg" 2>/dev/null && echo "  ✓ 17-silence.jpeg"
mv "$CARDS_DIR/The Moon.jpeg" "$CARDS_DIR/18-past-lives.jpeg" 2>/dev/null && echo "  ✓ 18-past-lives.jpeg"
mv "$CARDS_DIR/_ (3).jpeg" "$CARDS_DIR/19-innocence.jpeg" 2>/dev/null && echo "  ✓ 19-innocence.jpeg"
mv "$CARDS_DIR/_ (4).jpeg" "$CARDS_DIR/20-beyond-illusion.jpeg" 2>/dev/null && echo "  ✓ 20-beyond-illusion.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT.jpeg" "$CARDS_DIR/21-completion.jpeg" 2>/dev/null && echo "  ✓ 21-completion.jpeg"
mv "$CARDS_DIR/Page of Wands.jpeg" "$CARDS_DIR/27-playfulness.jpeg" 2>/dev/null && echo "  ✓ 27-playfulness.jpeg"
mv "$CARDS_DIR/8 of Swords.jpeg" "$CARDS_DIR/28-guilt.jpeg" 2>/dev/null && echo "  ✓ 28-guilt.jpeg"

echo ""
echo "📦 Moving extra cards (not in main 30-card deck)..."

# Extra cards from full Osho Zen Tarot deck
mv "$CARDS_DIR/OSHO ZEN TAROT (6).jpeg" "$CARDS_DIR/extra/mind.jpeg" 2>/dev/null && echo "  → extra/mind.jpeg"
mv "$CARDS_DIR/OSHO ZEN TAROT (7).jpeg" "$CARDS_DIR/extra/postponement.jpeg" 2>/dev/null && echo "  → extra/postponement.jpeg"
mv "$CARDS_DIR/_ (2).jpeg" "$CARDS_DIR/extra/letting-go-cups-8.jpeg" 2>/dev/null && echo "  → extra/letting-go-cups-8.jpeg"
mv "$CARDS_DIR/Queen of Swords.jpeg" "$CARDS_DIR/extra/morality.jpeg" 2>/dev/null && echo "  → extra/morality.jpeg"
mv "$CARDS_DIR/9 of Swords.jpeg" "$CARDS_DIR/extra/sorrow.jpeg" 2>/dev/null && echo "  → extra/sorrow.jpeg"
mv "$CARDS_DIR/6 of Cups.jpeg" "$CARDS_DIR/extra/the-dream.jpeg" 2>/dev/null && echo "  → extra/the-dream.jpeg"
mv "$CARDS_DIR/10 of Swords_.jpeg" "$CARDS_DIR/extra/rebirth.jpeg" 2>/dev/null && echo "  → extra/rebirth.jpeg"
mv "$CARDS_DIR/Knight of Swords.jpeg" "$CARDS_DIR/extra/fighting.jpeg" 2>/dev/null && echo "  → extra/fighting.jpeg"
mv "$CARDS_DIR/Knight of Wands.jpeg" "$CARDS_DIR/extra/intensity.jpeg" 2>/dev/null && echo "  → extra/intensity.jpeg"
mv "$CARDS_DIR/Ace of Wands.jpeg" "$CARDS_DIR/extra/the-source.jpeg" 2>/dev/null && echo "  → extra/the-source.jpeg"
mv "$CARDS_DIR/4 of Wands.jpeg" "$CARDS_DIR/extra/participation.jpeg" 2>/dev/null && echo "  → extra/participation.jpeg"

echo ""
echo "✅ Done!"
echo ""
echo "📊 Summary:"
echo "   • Main deck: $(ls -1 "$CARDS_DIR"/*.jpeg 2>/dev/null | wc -l | tr -d ' ')/30 cards"
echo "   • Extra cards: $(ls -1 "$CARDS_DIR/extra"/*.jpeg 2>/dev/null | wc -l | tr -d ' ') cards"
echo ""
echo "❌ Still missing 13 cards:"
echo "   00-the-fool, 03-creativity, 05-no-thingness, 07-awareness, 08-courage,"
echo "   10-change, 13-transformation, 15-conditioning, 22-the-master,"
echo "   23-letting-go, 24-laziness, 25-healing, 26-moment-to-moment, 29-compromise"
