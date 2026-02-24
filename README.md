# Zen Insight Cards

A free, full-featured online Zen tarot card reading platform inspired by Osho Zen Tarot. Features AI-powered interpretations, an interactive card-drawing experience with smooth 3D animations, 9 spread types, and a guided reading flow — all wrapped in a dark mystical UI with bilingual support.

**Live:** [https://osho-wk7j.vercel.app](https://osho-wk7j.vercel.app)

## Features

### Core Reading Experience
- **79-card complete Osho Zen Tarot deck** — Major Arcana, Fire, Water, Clouds, and Rainbows suits, each with bilingual descriptions and keywords
- **9 spread types** — Single Card, Three Cards, Flow of Time, Cross, Diamond, Two Choices, Two People Connection, Mirror (12 cards), and Key (8 cards)
- **Interactive card fan with drag-to-browse** — Smooth 3D arc layout with touch/mouse drag, responsive across mobile and desktop
- **3D flip animations** — Cards flip to reveal with perspective-correct CSS 3D transforms
- **Custom spread grid layouts** — Each spread renders in its own visually meaningful layout (e.g., diamond shape, cross pattern, mirror symmetry)

### AI-Powered Interpretation
- **Real-time AI reading via streaming** — Server-side API route calls Groq (Llama 3.3 70B) and streams the interpretation back in real time, rendered as styled Markdown
- **Structured multi-section output** — Card Analysis, Multi-dimensional Assessment (psychological, interpersonal, practical), Advice & Practice, and Meditation Reminder
- **Context-aware readings** — Interpretations adapt based on user topic, situation description, and spread-specific assessment templates (e.g., relationship-focused or decision-focused)
- **Personalized by user profile** — Optional name, gender, age, and reading style (warm, intuitive, rational, or natural) influence the AI's tone and focus
- **Rate limiting** — IP-based daily limit to manage API costs
- **Fallback: one-click prompt copy** — If AI is unavailable, users can copy a pre-built prompt for ChatGPT, Claude, or any LLM

### Guided Reading Flow
- **4-step guided wizard** — Profile setup → Topic category → Situation description → Spread recommendation
- **6 preset topic categories** — Daily Guidance, Relationships, Career, Decision-Making, Self-Exploration, Spiritual Growth — each maps to recommended spreads
- **Custom topic input** — Users can write their own question instead of choosing a preset category
- **Optional situation description** — Brief context (up to 100 characters) that gets woven into the AI prompt for more targeted readings

### Card Encyclopedia
- **Full card gallery** — Browse all 79 cards organized by suit with card images
- **Individual card detail pages** — Each card has its own SEO-optimized page (`/cards/[slug]`) with bilingual name, keywords, and in-depth description
- **Spread encyclopedia** — Dedicated pages explaining each spread type, position meanings, suitable questions, and usage tips

### Reading Records
- **Local history** — All readings are saved to localStorage with cards drawn, spread used, AI interpretation, and personal notes
- **Review & manage** — Browse past readings, view full details, add/edit notes, and delete records
- **Question tracking** — Records store the user's topic and description for context when reviewing later

### User Profile
- **Persistent profile** — Save name, gender, age, and preferred reading style to localStorage
- **Reading style preference** — Choose between Natural, Warm, Intuitive, or Rational tones for AI interpretations
- **Auto-detected in guided flow** — If a profile exists, the wizard skips the profile setup step

### Internationalization & SEO
- **Bilingual** — Full Traditional Chinese (繁體中文) and English support via react-i18next
- **Language switcher** — Toggle language from a side menu available on every page
- **SEO optimized** — Dynamic metadata, Open Graph tags, Twitter cards, `robots.txt`, `sitemap.xml`, and programmatically generated OG/Twitter images
- **Google Search Console verified**

### Other
- **Contact form** — Formspree-powered contact page
- **Donation support** — Ko-fi integration with scroll-triggered donation prompt after readings
- **Analytics** — Vercel Analytics, Speed Insights, and Google Analytics (GA4) with custom event tracking
- **Dark mystical design** — Gradient backgrounds, gold accents, subtle fade-up animations, fully responsive

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, SSR, static generation) |
| Language | **TypeScript** |
| UI | **React 18**, **Tailwind CSS** |
| AI Backend | **Groq SDK** (Llama 3.3 70B) via Next.js API Route with streaming |
| i18n | **react-i18next** |
| Markdown | **react-markdown** for rendering AI output |
| Analytics | **Vercel Analytics**, **Speed Insights**, **Google Analytics** (GA4) |
| Forms | **Formspree** |
| Icons | **@untitled-ui/icons-react** |
| Hosting | **Vercel** |

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## Project Structure

```
src/
  app/
    ├── layout.tsx              # Root layout, metadata, analytics
    ├── page.tsx                # Home / landing page
    ├── reading/
    │   ├── page.tsx            # Main reading page (spread selection + draw)
    │   ├── [spreadId]/page.tsx # Direct spread entry
    │   ├── guided/             # 4-step guided reading wizard
    │   │   ├── profile/        # Step 1: Profile setup
    │   │   ├── category/       # Step 2: Topic category
    │   │   ├── describe/       # Step 3: Situation description
    │   │   └── spread/         # Step 4: Spread recommendation
    │   └── spreads/page.tsx    # Spread type overview
    ├── cards/
    │   ├── page.tsx            # Card gallery (all 79 cards)
    │   └── [slug]/page.tsx     # Individual card detail page
    ├── spreads/page.tsx        # Spread encyclopedia
    ├── records/
    │   ├── page.tsx            # Reading history list
    │   └── [id]/               # Individual record detail
    ├── profile/page.tsx        # User profile editor
    ├── about/page.tsx          # About the project
    ├── about-osho/page.tsx     # About Osho Zen Tarot
    ├── contact/page.tsx        # Contact form
    ├── api/reading/route.ts    # AI reading API (Groq streaming)
    ├── opengraph-image.tsx     # Dynamic OG image generation
    ├── twitter-image.tsx       # Dynamic Twitter card image
    ├── icon.tsx                # Dynamic favicon
    ├── robots.ts               # SEO robots.txt
    └── sitemap.ts              # SEO sitemap.xml
  components/
    ├── DrawPhase.tsx           # Card fan, drag-to-browse, draw interaction
    ├── ResultPhase.tsx         # Result display, AI reading, save record
    ├── FlipCard.tsx            # 3D card flip animation
    ├── CardFace.tsx            # Card front face
    ├── CardBack.tsx            # Card back design
    ├── CardSpreadLayout.tsx    # Custom grid layout per spread type
    ├── CardDetailContent.tsx   # Card detail page content
    ├── StaticCard.tsx          # Static card display component
    ├── SpreadSelector.tsx      # Spread type picker
    ├── GuidedFlow.tsx          # 4-step guided wizard logic
    ├── GuidedStepIndicator.tsx # Step progress dots
    ├── MarkdownReading.tsx     # Styled Markdown renderer for AI output
    ├── UserProfileEditor.tsx   # Profile form component
    ├── DonationPrompt.tsx      # Scroll-triggered donation section
    ├── DonationToast.tsx       # Donation toast notification
    ├── SideMenu.tsx            # Navigation side menu
    ├── LanguageSwitcher.tsx    # Language toggle + side menu
    ├── I18nProvider.tsx        # i18next provider wrapper
    └── Footer.tsx              # Site footer
  data/
    ├── cards.ts                # 79 cards: names, keywords, descriptions (EN/ZH)
    ├── cardDetails.ts          # Card helpers, image paths, suit labels
    ├── spreads.ts              # 9 spreads: definitions, position labels, grid layouts
    └── spreadDetails.ts        # Spread encyclopedia: tips, suitable questions
  utils/
    ├── divinationRecords.ts    # localStorage CRUD for reading records
    ├── userProfile.ts          # localStorage CRUD for user profile
    └── imageLoader.ts          # Image loader utility
  locales/
    ├── zh-TW.json              # Chinese Traditional translations
    └── en.json                 # English translations
```

## Spread Types

| Spread | Cards | Positions |
|--------|-------|-----------|
| Single Card | 1 | Guidance |
| Three Cards | 3 | General three-card reading |
| Flow of Time | 3 | Past / Present / Future |
| Cross | 5 | Situation / Obstacle / Advice / Root Cause / Outcome |
| Diamond | 5 | Issue / Inner Influence / Outer Influence / What's Needed / Answer |
| Two Choices | 5 | Current / Option A Situation & Outcome / Option B Situation & Outcome |
| Two People Connection | 4 | Your Contribution / Their Contribution / Combined Energy / Insight |
| Mirror | 12 | Self & companion reflection across body, heart, and mind |
| Key | 8 | Suppressed / Feminine / Masculine / Meditation / Body / Heart / Essence / Consciousness |

## License

This is an original work inspired by Osho Zen Tarot. Card images are derived from the Osho Zen Tarot, illustrated by Ma Deva Padma. Copyright belongs to Osho International Foundation. This is an unofficial personal project for spiritual exploration purposes only.
