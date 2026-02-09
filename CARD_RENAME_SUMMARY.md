# Card Images Rename Summary

## 📋 Naming Format

```
{id}-{name-slug}.jpeg

Example:
- 00-the-fool.jpeg
- 11-breakthrough.jpeg
- 26-moment-to-moment.jpeg
```

## ✅ Identified Cards (11 of 30)

| Original Filename | Card Name | ID | New Filename |
|-------------------|-----------|----|--------------|
| `Breakthrough.jpeg` | Breakthrough | 11 | `11-breakthrough.jpeg` |
| `OSHO ZEN TAROT.jpeg` | Completion | 21 | `21-completion.jpeg` |
| `OSHO ZEN TAROT (1).jpeg` | Aloneness | 09 | `09-aloneness.jpeg` |
| `OSHO ZEN TAROT (2).jpeg` | Integration | 14 | `14-integration.jpeg` |
| `OSHO ZEN TAROT (3).jpeg` | Thunderbolt | 16 | `16-thunderbolt.jpeg` |
| `OSHO ZEN TAROT (4).jpeg` | The Rebel | 04 | `04-the-rebel.jpeg` |
| `OSHO ZEN TAROT (5).jpeg` | Silence | 17 | `17-silence.jpeg` |
| `_ (3).jpeg` | Innocence | 19 | `19-innocence.jpeg` |
| `_ (4).jpeg` | Beyond Illusion | 20 | `20-beyond-illusion.jpeg` |
| `The Lovers.jpeg` | The Lovers | 06 | `06-the-lovers.jpeg` |
| `The Magician.jpeg` | Existence | 01 | `01-existence.jpeg` |

## 🗂️ Extra Cards (Not in 30-card list)

These are from the full Osho Zen Tarot deck but not in our simplified 30-card version:

| Original Filename | Card Name | Action |
|-------------------|-----------|--------|
| `OSHO ZEN TAROT (6).jpeg` | Mind | → `extra/mind.jpeg` |
| `OSHO ZEN TAROT (7).jpeg` | Postponement | → `extra/postponement.jpeg` |
| `_ (2).jpeg` | Letting Go (Cups 8) | → `extra/letting-go-cups-8.jpeg` |

## 🎴 Traditional Tarot Cards (Wrong deck)

These are traditional Tarot cards, not Zen Tarot. They will be moved to `traditional-tarot/`:

- The High Priestess.jpeg
- Page of Wands.jpeg
- Queen of Swords.jpeg
- 8 of Swords.jpeg
- 9 of Swords.jpeg
- 6 of Cups.jpeg
- 10 of Swords_.jpeg
- Knight of Swords.jpeg
- The Hanged Man.jpeg
- The Moon.jpeg
- Knight of Wands.jpeg
- Ace of Wands.jpeg
- 4 of Wands.jpeg

## ❌ Missing Cards (19 cards needed)

You still need images for these cards:

| ID | Card Name | Filename Needed |
|----|-----------|-----------------|
| 00 | The Fool | `00-the-fool.jpeg` |
| 02 | Inner Voice | `02-inner-voice.jpeg` |
| 03 | Creativity | `03-creativity.jpeg` |
| 05 | No-Thingness | `05-no-thingness.jpeg` |
| 07 | Awareness | `07-awareness.jpeg` |
| 08 | Courage | `08-courage.jpeg` |
| 10 | Change | `10-change.jpeg` |
| 12 | New Vision | `12-new-vision.jpeg` |
| 13 | Transformation | `13-transformation.jpeg` |
| 15 | Conditioning | `15-conditioning.jpeg` |
| 18 | Past Lives | `18-past-lives.jpeg` |
| 22 | The Master | `22-the-master.jpeg` |
| 23 | Letting Go | `23-letting-go.jpeg` |
| 24 | Laziness | `24-laziness.jpeg` |
| 25 | Healing | `25-healing.jpeg` |
| 26 | Moment to Moment | `26-moment-to-moment.jpeg` |
| 27 | Playfulness | `27-playfulness.jpeg` |
| 28 | Guilt | `28-guilt.jpeg` |
| 29 | Compromise | `29-compromise.jpeg` |

## 🚀 How to Run

```bash
# Execute the rename script
bash scripts/rename-cards-final.sh
```

This will:
1. ✅ Rename 11 identified Zen Tarot cards
2. 📦 Move 3 extra Osho cards to `extra/` folder
3. 🗑️ Move 13 traditional Tarot cards to `traditional-tarot/` folder

## 📊 Current Status

- **Found**: 11/30 cards (37%)
- **Missing**: 19/30 cards (63%)
- **Extra**: 3 cards (not in main deck)
- **Wrong deck**: 13 traditional Tarot cards
