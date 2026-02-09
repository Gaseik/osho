# Zen Insight Cards | 禪意靈卡

An online Zen card drawing website inspired by Osho Zen Tarot. Features elegant UI and smooth flip animations for an enhanced interactive experience.

## ✨ Features

- 🎴 Three spread options (Single Card, Three Cards, Five Cards)
- 🔄 Smooth 3D card flip animations
- 📋 One-click prompt copy for AI interpretation
- 🎨 Dark mystical design aesthetic
- 📱 Responsive design for mobile and desktop

## 🛠️ Tech Stack

- **Vite** - Fast build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework

## 🚀 Quick Start

### Install Dependencies

```bash
yarn install
```

### Development Mode

```bash
yarn dev
```

### Build for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## 📁 Project Structure

```
src/
  ├── components/         # React components
  │   ├── CardBack.tsx   # Card back
  │   ├── CardFace.tsx   # Card face
  │   ├── FlipCard.tsx   # Flip animation
  │   ├── SpreadSelector.tsx  # Spread selection
  │   ├── DrawPhase.tsx  # Drawing phase
  │   └── ResultPhase.tsx # Result display
  ├── data/              # Data definitions
  │   ├── cards.ts       # 30 cards data
  │   └── spreads.ts     # Spread definitions
  ├── App.tsx            # Main application
  ├── main.tsx           # Entry point
  └── index.css          # Global styles
```

## 🎴 Spread Types

| Spread | Cards | Purpose |
|--------|-------|---------|
| Single Card | 1 | Simple guidance |
| Three Cards | 3 | Past · Present · Future |
| Five Cards | 5 | Situation · Obstacle · Advice · Root · Outcome |

## 🎯 Usage Flow

1. **Choose Spread** - Select the spread that suits your needs
2. **Draw Cards** - Select the specified number of cards from the deck
3. **Flip Cards** - Click to reveal each card
4. **Interpret** - Copy the generated prompt and paste it into ChatGPT/Claude for interpretation

## 🚢 Deployment

Deploy to Vercel:

```bash
yarn build
# Deploy the dist directory to Vercel
```

Or use Vercel CLI:

```bash
vercel
```

## 📝 Roadmap

- [ ] Complete 79-card deck
- [ ] Additional spread options
- [ ] Custom card illustrations
- [ ] Sound effects support
- [ ] Screenshot functionality
- [ ] Donation page
- [ ] React Native app version

## 📄 License

This is an original work inspired by Osho Zen Tarot.

---

Made with ❤️ for spiritual seekers
