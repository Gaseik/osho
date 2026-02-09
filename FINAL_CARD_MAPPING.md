# Final Card Mapping (Based on Image Text Verification)

## 📋 Naming Format
```
{id}-{name-slug}.jpeg
```

## ✅ Identified Cards: 17/30 (57%)

| ID | Card Name | Original File | New Filename | Status |
|----|-----------|---------------|--------------|--------|
| 01 | Existence | The Magician.jpeg | `01-existence.jpeg` | ✓ Found |
| 02 | Inner Voice | The High Priestess.jpeg | `02-inner-voice.jpeg` | ✓ Found |
| 04 | The Rebel | OSHO ZEN TAROT (4).jpeg | `04-the-rebel.jpeg` | ✓ Found |
| 06 | The Lovers | The Lovers.jpeg | `06-the-lovers.jpeg` | ✓ Found |
| 09 | Aloneness | OSHO ZEN TAROT (1).jpeg | `09-aloneness.jpeg` | ✓ Found |
| 11 | Breakthrough | Breakthrough.jpeg | `11-breakthrough.jpeg` | ✓ Found |
| 12 | New Vision | The Hanged Man.jpeg | `12-new-vision.jpeg` | ✓ Found |
| 14 | Integration | OSHO ZEN TAROT (2).jpeg | `14-integration.jpeg` | ✓ Found |
| 16 | Thunderbolt | OSHO ZEN TAROT (3).jpeg | `16-thunderbolt.jpeg` | ✓ Found |
| 17 | Silence | OSHO ZEN TAROT (5).jpeg | `17-silence.jpeg` | ✓ Found |
| 18 | Past Lives | The Moon.jpeg | `18-past-lives.jpeg` | ✓ Found |
| 19 | Innocence | _ (3).jpeg | `19-innocence.jpeg` | ✓ Found |
| 20 | Beyond Illusion | _ (4).jpeg | `20-beyond-illusion.jpeg` | ✓ Found |
| 21 | Completion | OSHO ZEN TAROT.jpeg | `21-completion.jpeg` | ✓ Found |
| 27 | Playfulness | Page of Wands.jpeg | `27-playfulness.jpeg` | ✓ Found |
| 28 | Guilt | 8 of Swords.jpeg | `28-guilt.jpeg` | ✓ Found |

## ❌ Missing Cards: 13/30 (43%)

| ID | Card Name | English | Chinese | Filename Needed |
|----|-----------|---------|---------|-----------------|
| 00 | The Fool | The Fool | 愚者 | `00-the-fool.jpeg` |
| 03 | Creativity | Creativity | 創造力 | `03-creativity.jpeg` |
| 05 | No-Thingness | No-Thingness | 空無 | `05-no-thingness.jpeg` |
| 07 | Awareness | Awareness | 覺知 | `07-awareness.jpeg` |
| 08 | Courage | Courage | 勇氣 | `08-courage.jpeg` |
| 10 | Change | Change | 改變 | `10-change.jpeg` |
| 13 | Transformation | Transformation | 蛻變 | `13-transformation.jpeg` |
| 15 | Conditioning | Conditioning | 制約 | `15-conditioning.jpeg` |
| 22 | The Master | The Master | 大師 | `22-the-master.jpeg` |
| 23 | Letting Go | Letting Go | 放下 | `23-letting-go.jpeg` |
| 24 | Laziness | Laziness | 懶惰 | `24-laziness.jpeg` |
| 25 | Healing | Healing | 療癒 | `25-healing.jpeg` |
| 26 | Moment to Moment | Moment to Moment | 活在當下 | `26-moment-to-moment.jpeg` |
| 29 | Compromise | Compromise | 妥協 | `29-compromise.jpeg` |

## 📦 Extra Cards (Not in 30-card deck): 11 cards

These cards are from the full 79-card Osho Zen Tarot deck:

| Original File | Card Name (on image) | New Location |
|---------------|---------------------|--------------|
| OSHO ZEN TAROT (6).jpeg | MIND | `extra/mind.jpeg` |
| OSHO ZEN TAROT (7).jpeg | POSTPONEMENT | `extra/postponement.jpeg` |
| _ (2).jpeg | Letting Go (Cups 8) | `extra/letting-go-cups-8.jpeg` |
| Queen of Swords.jpeg | MORALITY | `extra/morality.jpeg` |
| 9 of Swords.jpeg | SORROW | `extra/sorrow.jpeg` |
| 6 of Cups.jpeg | THE DREAM | `extra/the-dream.jpeg` |
| 10 of Swords_.jpeg | Rebirth | `extra/rebirth.jpeg` |
| Knight of Swords.jpeg | FIGHTING | `extra/fighting.jpeg` |
| Knight of Wands.jpeg | INTENSITY | `extra/intensity.jpeg` |
| Ace of Wands.jpeg | THE SOURCE | `extra/the-source.jpeg` |
| 4 of Wands.jpeg | PARTICIPATION | `extra/participation.jpeg` |

## 🚀 Execute Renaming

```bash
bash scripts/rename-all-cards.sh
```

This will:
1. Rename 17 main deck cards with correct IDs
2. Move 11 extra cards to `extra/` folder
3. Show summary of what's still needed

## 📊 Progress
- **Identified**: 17/30 cards (57%)
- **Missing**: 13/30 cards (43%)
- **Extra**: 11 cards from full deck
