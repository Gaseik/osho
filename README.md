# Zen Insight Cards 

An online Zen card drawing website inspired by Osho Zen Tarot. Features elegant UI, smooth flip animations, and multiple spread options for an enhanced interactive experience.

**Live:** [https://osho-wk7j.vercel.app](https://osho-wk7j.vercel.app)

## Features

- 79-card complete Osho Zen Tarot deck
- 9 spread types (Single, Three Cards, Time Flow, Cross, Diamond, Mirror, Key, Two Choices, Relationship)
- Smooth 3D card fan and flip animations
- One-click prompt copy for AI interpretation (ChatGPT, Claude, etc.)
- Reading records with review notes (stored locally)
- Contact form (Formspree)
- Dark mystical design with gold accents
- Bilingual support (繁體中文 / English)
- Responsive design for mobile and desktop
- Vercel Analytics & Speed Insights

## Tech Stack

- **Next.js 16** - React framework
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **react-i18next** - Internationalization
- **Vercel** - Hosting & Analytics

## Quick Start

```bash
yarn install
yarn dev
```

Build for production:

```bash
yarn build
```

## Project Structure

```
src/
  app/
    ├── layout.tsx           # Root layout & metadata
    ├── page.tsx             # Home page
    ├── reading/page.tsx     # Card drawing page
    ├── records/             # Reading records
    ├── contact/page.tsx     # Contact form
    ├── about/page.tsx       # About page
    ├── opengraph-image.tsx  # OG share image
    ├── icon.tsx             # Favicon
    ├── robots.ts            # SEO robots
    └── sitemap.ts           # SEO sitemap
  components/
    ├── CardFace.tsx         # Card face display
    ├── CardBack.tsx         # Card back
    ├── FlipCard.tsx         # Flip animation
    ├── DrawPhase.tsx        # Card drawing phase
    ├── ResultPhase.tsx      # Result display
    ├── SpreadSelector.tsx   # Spread selection
    └── LanguageSwitcher.tsx # Side menu & language toggle
  data/
    ├── cards.ts             # 79 cards data
    └── spreads.ts           # 9 spread definitions
  locales/
    ├── zh-TW.json           # Chinese Traditional
    └── en.json              # English
```

## Spread Types

| Spread | Cards | Purpose |
|--------|-------|---------|
| Single Card | 1 | Simple guidance |
| Three Cards | 3 | General guidance |
| Time Flow | 3 | Past / Present / Future |
| Cross | 5 | Situation / Obstacle / Advice / Root / Outcome |
| Diamond | 5 | Problem / Inner / Outer / Needed / Answer |
| Two Choices | 5 | Current / Option A / Option B |
| Relationship | 4 | You / Partner / Combined / Insight |
| Mirror | 12 | Self & companion reflection |
| Key | 8 | Suppressed / Feminine / Masculine / Meditation / Body / Heart / Essence / Consciousness |

## License

This is an original work inspired by Osho Zen Tarot.

---

Made with ❤️ for spiritual seekers
