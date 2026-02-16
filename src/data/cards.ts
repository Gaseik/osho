export interface Card {
  id: number;
  name: string;
  nameZh: string;
  meaning: string;
  suit?: 'major' | 'fire' | 'water' | 'clouds' | 'rainbows';
}

export const CARDS: Card[] = [
  // Major Arcana (大阿爾克那 0-21 + The Master)
  { id: 0, name: "The Fool", nameZh: "傻瓜", meaning: "Trust, innocence, leap of faith", suit: 'major' },
  { id: 1, name: "Existence", nameZh: "存在", meaning: "You are part of the whole, belonging", suit: 'major' },
  { id: 2, name: "Inner Voice", nameZh: "內在之聲", meaning: "Listen to your intuition, inner truth", suit: 'major' },
  { id: 3, name: "Creativity", nameZh: "創造力", meaning: "Expression, divine inspiration", suit: 'major' },
  { id: 4, name: "The Rebel", nameZh: "叛逆者", meaning: "Individual power, breaking authority", suit: 'major' },
  { id: 5, name: "No-Thingness", nameZh: "空", meaning: "The void, absolute potential, silence", suit: 'major' },
  { id: 6, name: "The Lovers", nameZh: "愛侶", meaning: "Union, reflection through another", suit: 'major' },
  { id: 7, name: "Awareness", nameZh: "覺知", meaning: "Burning the veil of illusion, presence", suit: 'major' },
  { id: 8, name: "Courage", nameZh: "勇氣", meaning: "The flower growing in the rock", suit: 'major' },
  { id: 9, name: "Aloneness", nameZh: "單獨", meaning: "Self-sufficiency, positive solitude", suit: 'major' },
  { id: 10, name: "Change", nameZh: "改變", meaning: "The wheel of life, karma, cycles", suit: 'major' },
  { id: 11, name: "Breakthrough", nameZh: "突破", meaning: "End of repression, light from chaos", suit: 'major' },
  { id: 12, name: "New Vision", nameZh: "新願景", meaning: "Transcending duality, seeing the whole", suit: 'major' },
  { id: 13, name: "Transformation", nameZh: "蛻變", meaning: "Death and rebirth, letting go of ego", suit: 'major' },
  { id: 14, name: "Integration", nameZh: "整合", meaning: "Union of opposites, yin and yang", suit: 'major' },
  { id: 15, name: "Conditioning", nameZh: "制約", meaning: "Sheep in lion's skin, social patterns", suit: 'major' },
  { id: 16, name: "Thunderbolt", nameZh: "雷霆", meaning: "Sudden destruction of the false", suit: 'major' },
  { id: 17, name: "Silence", nameZh: "沈默", meaning: "Inner stillness, starry night of soul", suit: 'major' },
  { id: 18, name: "Past Lives", nameZh: "前世", meaning: "Karmic patterns, the hands of time", suit: 'major' },
  { id: 19, name: "Innocence", nameZh: "天真", meaning: "Old man and dragonfly, pure wisdom", suit: 'major' },
  { id: 20, name: "Beyond Illusion", nameZh: "超越幻象", meaning: "Butterfly and the real, awakening", suit: 'major' },
  { id: 21, name: "Completion", nameZh: "完成", meaning: "The final puzzle piece, wholeness", suit: 'major' },
  { id: 22, name: "The Master", nameZh: "師父", meaning: "Zen master, supreme consciousness", suit: 'major' },

  // Fire (火族群 - 行動與能量)
  { id: 23, name: "The Source", nameZh: "源頭", meaning: "Primal energy, inner sun", suit: 'fire' },
  { id: 24, name: "Possibilities", nameZh: "可能性", meaning: "Eagle's view, wide horizon", suit: 'fire' },
  { id: 25, name: "Experiencing", nameZh: "體驗", meaning: "Touching the tree, being in nature", suit: 'fire' },
  { id: 26, name: "Participation", nameZh: "參與", meaning: "Mandala of action, joining in", suit: 'fire' },
  { id: 27, name: "Totality", nameZh: "全神貫注", meaning: "The trapeze artist, absolute focus", suit: 'fire' },
  { id: 28, name: "Success", nameZh: "成功", meaning: "The parade, public recognition", suit: 'fire' },
  { id: 29, name: "Stress", nameZh: "壓力", meaning: "The clown with many hats", suit: 'fire' },
  { id: 30, name: "Traveling", nameZh: "旅行", meaning: "Path of discovery, movement", suit: 'fire' },
  { id: 31, name: "Exhaustion", nameZh: "疲憊", meaning: "The machine person, depleted energy", suit: 'fire' },
  { id: 32, name: "Suppression", nameZh: "壓抑", meaning: "Internalizing pressure, heavy burden", suit: 'fire' },
  { id: 33, name: "Playfulness", nameZh: "遊戲玩耍", meaning: "Life is a joke, lightheartedness", suit: 'fire' },
  { id: 34, name: "Intensity", nameZh: "強度", meaning: "The arrow, direct focus", suit: 'fire' },
  { id: 35, name: "Sharing", nameZh: "分享", meaning: "The queen of fire, generosity", suit: 'fire' },
  { id: 36, name: "The Creator", nameZh: "創造者", meaning: "The king of fire, masterful action", suit: 'fire' },

  // Water (水族群 - 情感與直覺)
  { id: 37, name: "Going With the Flow", nameZh: "順著流走", meaning: "Trusting the river of life", suit: 'water' },
  { id: 38, name: "Friendliness", nameZh: "友誼", meaning: "Two trees growing together", suit: 'water' },
  { id: 39, name: "Celebration", nameZh: "慶祝", meaning: "Dancing in the rain", suit: 'water' },
  { id: 40, name: "Turning In", nameZh: "轉向內在", meaning: "Self-reflection, meditation", suit: 'water' },
  { id: 41, name: "Clinging to the Past", nameZh: "執著於過去", meaning: "The box of memories, stagnant energy", suit: 'water' },
  { id: 42, name: "The Dream", nameZh: "夢", meaning: "Enchanted night, romantic illusion", suit: 'water' },
  { id: 43, name: "Projections", nameZh: "投射", meaning: "Seeing your own movie on others", suit: 'water' },
  { id: 44, name: "Letting Go", nameZh: "放手", meaning: "The drop merging with ocean", suit: 'water' },
  { id: 45, name: "Laziness", nameZh: "懶惰", meaning: "The stagnant pool, lack of will", suit: 'water' },
  { id: 46, name: "Harmony", nameZh: "和諧", meaning: "Heart-centered peace", suit: 'water' },
  { id: 47, name: "Understanding", nameZh: "了解", meaning: "The cage bird, seeing the bars", suit: 'water' },
  { id: 48, name: "Trust", nameZh: "信任", meaning: "Brave leap into the unknown", suit: 'water' },
  { id: 49, name: "Receptivity", nameZh: "接受性", meaning: "The queen of water, open heart", suit: 'water' },
  { id: 50, name: "Healing", nameZh: "治療", meaning: "The king of water, emotional wholeness", suit: 'water' },

  // Clouds (雲族群 - 心智與頭腦)
  { id: 51, name: "Consciousness", nameZh: "意識", meaning: "Mental clarity, Buddha mind", suit: 'clouds' },
  { id: 52, name: "Schizophrenia", nameZh: "精神分裂", meaning: "Torn between choices", suit: 'clouds' },
  { id: 53, name: "Ice-olation", nameZh: "冰封", meaning: "Emotional coldness, isolation", suit: 'clouds' },
  { id: 54, name: "Postponement", nameZh: "拖延", meaning: "Waiting for tomorrow", suit: 'clouds' },
  { id: 55, name: "Comparison", nameZh: "比較", meaning: "Bamboo vs Oak, unnecessary judgment", suit: 'clouds' },
  { id: 56, name: "The Burden", nameZh: "重擔", meaning: "Carrying others' expectations", suit: 'clouds' },
  { id: 57, name: "Politics", nameZh: "政治", meaning: "Masks and hypocrisy", suit: 'clouds' },
  { id: 58, name: "Guilt", nameZh: "罪惡感", meaning: "Self-torture, mental cage", suit: 'clouds' },
  { id: 59, name: "Sorrow", nameZh: "悲傷", meaning: "Painful transformation", suit: 'clouds' },
  { id: 60, name: "Rebirth", nameZh: "重生", meaning: "Camel to Lion to Child", suit: 'clouds' },
  { id: 61, name: "Mind", nameZh: "頭腦", meaning: "The mechanism of thought", suit: 'clouds' },
  { id: 62, name: "Fighting", nameZh: "奮鬥", meaning: "Armored struggle, ego battle", suit: 'clouds' },
  { id: 63, name: "Morality", nameZh: "道德", meaning: "Rigid rules, the queen of clouds", suit: 'clouds' },
  { id: 64, name: "Control", nameZh: "控制", meaning: "Rigid posture, the king of clouds", suit: 'clouds' },

  // Rainbows (彩虹族群 - 物質與落地)
  { id: 65, name: "Maturity", nameZh: "成熟", meaning: "The ripening of experience", suit: 'rainbows' },
  { id: 66, name: "Moment to Moment", nameZh: "剎那之際", meaning: "One step at a time, presence", suit: 'rainbows' },
  { id: 67, name: "Guidance", nameZh: "指引", meaning: "The inner angel, synchronized path", suit: 'rainbows' },
  { id: 68, name: "The Miser", nameZh: "吝嗇", meaning: "Hoarding energy or wealth", suit: 'rainbows' },
  { id: 69, name: "The Outsider", nameZh: "局外人", meaning: "Feeling left out, childhood gate", suit: 'rainbows' },
  { id: 70, name: "Compromise", nameZh: "妥協", meaning: "Selling out, dishonest peace", suit: 'rainbows' },
  { id: 71, name: "Patience", nameZh: "耐心", meaning: "The waiting for the moon", suit: 'rainbows' },
  { id: 72, name: "Ordinariness", nameZh: "平凡", meaning: "Beauty in the simple things", suit: 'rainbows' },
  { id: 73, name: "Ripeness", nameZh: "熟成", meaning: "Ready to fall, fruit of effort", suit: 'rainbows' },
  { id: 74, name: "We Are The World", nameZh: "我們是世界", meaning: "Human connection, celebration", suit: 'rainbows' },
  { id: 75, name: "Adventure", nameZh: "冒險", meaning: "The child in the woods, exploration", suit: 'rainbows' },
  { id: 76, name: "Slowing Down", nameZh: "慢下來", meaning: "The knight of rainbows, steady pace", suit: 'rainbows' },
  { id: 77, name: "Flowering", nameZh: "開花", meaning: "The queen of rainbows, abundance", suit: 'rainbows' },
  { id: 78, name: "Abundance", nameZh: "豐富", meaning: "The king of rainbows, material wealth", suit: 'rainbows' }
];

export const GRADIENTS = [
  "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0f0c29 100%)",
  "linear-gradient(135deg, #0c1445 0%, #1b3a6b 50%, #0a1628 100%)",
  "linear-gradient(135deg, #2a0a2e 0%, #5c1a6e 50%, #1a0533 100%)",
  "linear-gradient(135deg, #0a2e1a 0%, #1a6b4a 50%, #0c1f14 100%)",
  "linear-gradient(135deg, #2e1a0a 0%, #6b3a1a 50%, #1f140c 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #3a3a6b 50%, #0f0f1f 100%)",
];

export const getCardColor = (id: number): string => GRADIENTS[id % GRADIENTS.length];

export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
