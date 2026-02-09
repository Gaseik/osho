#!/bin/bash

# Card Image Renaming Script
# Usage: Edit the RENAME_MAP below, then run: bash scripts/rename-cards.sh

CARDS_DIR="src/assets/cards"

# Example format:
# "old-filename.jpeg" "new-filename.jpeg"

declare -A RENAME_MAP=(
  # Found matches:
  ["Breakthrough.jpeg"]="11-breakthrough.jpeg"
  ["The Lovers.jpeg"]="06-the-lovers.jpeg"

  # TODO: Fill in these mappings after identifying the cards:
  # ["OSHO ZEN TAROT.jpeg"]="XX-card-name.jpeg"
  # ["OSHO ZEN TAROT (1).jpeg"]="XX-card-name.jpeg"
  # ["OSHO ZEN TAROT (2).jpeg"]="XX-card-name.jpeg"
  # etc...
)

echo "🔄 Starting card image renaming..."
echo ""

for old_name in "${!RENAME_MAP[@]}"; do
  new_name="${RENAME_MAP[$old_name]}"
  old_path="$CARDS_DIR/$old_name"
  new_path="$CARDS_DIR/$new_name"

  if [ -f "$old_path" ]; then
    echo "✓ Renaming: $old_name → $new_name"
    mv "$old_path" "$new_path"
  else
    echo "✗ File not found: $old_path"
  fi
done

echo ""
echo "✅ Done! Please review the renamed files."
