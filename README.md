# 禪意靈卡 | Zen Insight Cards

一個線上禪卡抽牌網站，靈感來自奧修禪卡。提供優雅的 UI 和流暢的翻牌動畫體驗。

## ✨ 特色功能

- 🎴 三種牌陣選擇（單牌、三牌陣、五牌陣）
- 🔄 流暢的 3D 翻牌動畫
- 📋 一鍵複製 AI 解讀 Prompt
- 🎨 暗色系神秘風格設計
- 📱 響應式設計，支援手機和桌面

## 🛠️ 技術棧

- **Vite** - 快速建構工具
- **React 18** - UI 框架
- **TypeScript** - 類型安全
- **Tailwind CSS** - 樣式框架

## 🚀 快速開始

### 安裝依賴

```bash
yarn install
```

### 開發模式

```bash
yarn dev
```

### 建構生產版本

```bash
yarn build
```

### 預覽生產版本

```bash
yarn preview
```

## 📁 專案結構

```
src/
  ├── components/         # React 組件
  │   ├── CardBack.tsx   # 牌背面
  │   ├── CardFace.tsx   # 牌正面
  │   ├── FlipCard.tsx   # 翻牌動畫
  │   ├── SpreadSelector.tsx  # 牌陣選擇
  │   ├── DrawPhase.tsx  # 抽牌階段
  │   └── ResultPhase.tsx # 結果顯示
  ├── data/              # 資料定義
  │   ├── cards.ts       # 30 張牌資料
  │   └── spreads.ts     # 牌陣定義
  ├── App.tsx            # 主應用
  ├── main.tsx           # 入口
  └── index.css          # 全域樣式
```

## 🎴 牌陣說明

| 牌陣 | 張數 | 用途 |
|------|------|------|
| 單牌 | 1 | 簡單指引 |
| 三牌陣 | 3 | 過去·現在·未來 |
| 五牌陣 | 5 | 情境·障礙·建議·根源·結果 |

## 🎯 使用流程

1. **選擇牌陣** - 根據需求選擇適合的牌陣
2. **抽牌** - 從牌堆中選擇指定數量的牌
3. **翻牌** - 點擊翻開每張牌
4. **解讀** - 複製生成的 Prompt 貼到 ChatGPT/Claude 進行解讀

## 🚢 部署

專案可部署到 Vercel：

```bash
yarn build
# 將 dist 目錄部署到 Vercel
```

或使用 Vercel CLI：

```bash
vercel
```

## 📝 未來計畫

- [ ] 完整 79 張牌
- [ ] 更多牌陣選擇
- [ ] 自製卡面插圖
- [ ] 音效支援
- [ ] 截圖功能
- [ ] 捐贈頁面
- [ ] React Native App 版本

## 📄 授權

本專案為原創作品，靈感來自奧修禪卡。

---

Made with ❤️ for spiritual seekers
