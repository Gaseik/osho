export interface TarotCard {
  id: number;
  name: { en: string; zh: string };
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  number: number;
  keywords: { en: string[]; zh: string[] };
  upright: { en: string; zh: string };
  reversed: { en: string; zh: string };
  element?: string;
  timeframe?: string;
  image: string;
}

const SUIT_ELEMENT: Record<string, string> = {
  wands: "Fire",
  cups: "Water",
  swords: "Air",
  pentacles: "Earth",
};

const SUIT_TIMEFRAME: Record<string, string> = {
  wands: "days–weeks",
  cups: "weeks–months",
  swords: "days–weeks",
  pentacles: "months–years",
};

export const TAROT_CARDS: TarotCard[] = [
  // ══════════════════════════════════════
  // MAJOR ARCANA (0–21)
  // ══════════════════════════════════════
  {
    id: 0, number: 0, arcana: "major",
    name: { en: "The Fool", zh: "愚者" },
    keywords: { en: ["beginnings", "innocence", "spontaneity", "free spirit"], zh: ["起始", "天真", "自發", "自由靈魂"] },
    upright: { en: "New beginnings, innocence, spontaneity, a free spirit. A leap of faith into the unknown with optimism and trust.", zh: "新的開始、天真無邪、自發性、自由靈魂。帶著樂觀與信任，跳入未知的信心之躍。" },
    reversed: { en: "Holding back, recklessness, risk-taking without thought. Naivety leading to poor decisions or fear of the unknown.", zh: "猶豫不前、魯莽行事、不經思考的冒險。天真導致錯誤決定，或對未知的恐懼。" },
    image: "/assets/tarot/00-the-fool.png",
  },
  {
    id: 1, number: 1, arcana: "major",
    name: { en: "The Magician", zh: "魔術師" },
    keywords: { en: ["manifestation", "resourcefulness", "power", "inspired action"], zh: ["顯化", "足智多謀", "力量", "受啟發的行動"] },
    upright: { en: "Manifestation, resourcefulness, power, inspired action. You have all the tools you need — now is the time to act.", zh: "顯化、足智多謀、力量、受啟發的行動。你擁有所需的一切工具——現在是行動的時候。" },
    reversed: { en: "Manipulation, poor planning, untapped talents. Deception or using skills for selfish purposes.", zh: "操控、計畫不周、未開發的才能。欺騙或將技能用於自私目的。" },
    image: "/assets/tarot/01-the-magician.png",
  },
  {
    id: 2, number: 2, arcana: "major",
    name: { en: "The High Priestess", zh: "女祭司" },
    keywords: { en: ["intuition", "sacred knowledge", "divine feminine", "subconscious"], zh: ["直覺", "神聖知識", "神聖女性", "潛意識"] },
    upright: { en: "Intuition, sacred knowledge, divine feminine, the subconscious mind. Trust your inner voice and look beyond the surface.", zh: "直覺、神聖知識、神聖女性能量、潛意識。相信你的內在聲音，看透表面之下。" },
    reversed: { en: "Secrets, disconnected from intuition, withdrawal. Information being withheld or ignoring your inner voice.", zh: "秘密、與直覺斷開連結、退縮。資訊被隱瞞，或忽視內在的聲音。" },
    image: "/assets/tarot/02-the-high-priestess.png",
  },
  {
    id: 3, number: 3, arcana: "major",
    name: { en: "The Empress", zh: "皇后" },
    keywords: { en: ["femininity", "beauty", "nature", "nurturing", "abundance"], zh: ["女性特質", "美", "自然", "滋養", "豐盛"] },
    upright: { en: "Femininity, beauty, nature, nurturing, abundance. A time of growth, comfort, and creative fertility.", zh: "女性特質、美麗、自然、滋養、豐盛。一個成長、舒適和創造豐盛的時期。" },
    reversed: { en: "Creative block, dependence on others, emptiness. Neglecting self-care or smothering those around you.", zh: "創意阻塞、依賴他人、空虛感。忽視自我照顧，或過度保護身邊的人。" },
    image: "/assets/tarot/03-the-empress.png",
  },
  {
    id: 4, number: 4, arcana: "major",
    name: { en: "The Emperor", zh: "皇帝" },
    keywords: { en: ["authority", "structure", "control", "fatherhood"], zh: ["權威", "結構", "掌控", "父性"] },
    upright: { en: "Authority, establishment, structure, a father figure. Stability through discipline, leadership, and solid foundations.", zh: "權威、建制、結構、父親形象。透過紀律、領導力和穩固基礎獲得穩定。" },
    reversed: { en: "Domination, excessive control, rigidity, lack of discipline. Tyranny or an inability to adapt.", zh: "支配、過度控制、僵化、缺乏紀律。暴政或無法適應變化。" },
    image: "/assets/tarot/04-the-emperor.png",
  },
  {
    id: 5, number: 5, arcana: "major",
    name: { en: "The Hierophant", zh: "教皇" },
    keywords: { en: ["spiritual wisdom", "tradition", "conformity", "mentorship"], zh: ["靈性智慧", "傳統", "遵循", "指導"] },
    upright: { en: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions. Seek guidance from a mentor or established path.", zh: "靈性智慧、宗教信仰、遵循常規、傳統、體制。從導師或既有路徑中尋求指引。" },
    reversed: { en: "Personal beliefs, freedom, challenging the status quo. Questioning traditions or feeling restricted by conventions.", zh: "個人信仰、自由、挑戰現狀。質疑傳統，或感到被常規束縛。" },
    image: "/assets/tarot/05-the-hierophant.png",
  },
  {
    id: 6, number: 6, arcana: "major",
    name: { en: "The Lovers", zh: "戀人" },
    keywords: { en: ["love", "harmony", "relationships", "values alignment", "choices"], zh: ["愛", "和諧", "關係", "價值觀契合", "選擇"] },
    upright: { en: "Love, harmony, relationships, values alignment, choices. A meaningful connection or an important decision about values.", zh: "愛、和諧、關係、價值觀契合、選擇。一段有意義的連結，或關於價值觀的重要決定。" },
    reversed: { en: "Self-love, disharmony, imbalance, misalignment of values. Relationship struggles or inner conflict about choices.", zh: "自愛、不和諧、失衡、價值觀不一致。關係困難或對選擇的內心衝突。" },
    image: "/assets/tarot/06-the-lovers.png",
  },
  {
    id: 7, number: 7, arcana: "major",
    name: { en: "The Chariot", zh: "戰車" },
    keywords: { en: ["control", "willpower", "success", "determination"], zh: ["掌控", "意志力", "成功", "決心"] },
    upright: { en: "Control, willpower, success, action, determination. Overcoming obstacles through confidence and sheer will.", zh: "掌控、意志力、成功、行動、決心。透過自信和堅定意志克服障礙。" },
    reversed: { en: "Self-discipline issues, opposition, lack of direction. Aggression, losing control, or being pulled in different directions.", zh: "自律問題、對立、缺乏方向。攻擊性、失控，或被拉向不同方向。" },
    image: "/assets/tarot/07-the-chariot.png",
  },
  {
    id: 8, number: 8, arcana: "major",
    name: { en: "Strength", zh: "力量" },
    keywords: { en: ["strength", "courage", "persuasion", "influence", "compassion"], zh: ["力量", "勇氣", "說服", "影響力", "慈悲"] },
    upright: { en: "Strength, courage, persuasion, influence, compassion. Inner strength and the ability to overcome through patience and soft power.", zh: "力量、勇氣、說服力、影響力、慈悲。內在力量，以及通過耐心和柔性力量克服困難的能力。" },
    reversed: { en: "Inner strength lacking, self-doubt, low energy, raw emotion. Feeling overwhelmed or losing confidence.", zh: "缺乏內在力量、自我懷疑、精力低落、情緒失控。感到不堪負荷或喪失信心。" },
    image: "/assets/tarot/08-strength.png",
  },
  {
    id: 9, number: 9, arcana: "major",
    name: { en: "The Hermit", zh: "隱者" },
    keywords: { en: ["soul-searching", "introspection", "being alone", "inner guidance"], zh: ["靈魂探索", "內省", "獨處", "內在指引"] },
    upright: { en: "Soul-searching, introspection, being alone, inner guidance. A time to withdraw and seek answers within yourself.", zh: "靈魂探索、內省、獨處、內在指引。一段退隱並在內心尋找答案的時期。" },
    reversed: { en: "Isolation, loneliness, withdrawal. Excessive solitude or refusing help when it's needed.", zh: "孤立、寂寞、退縮。過度的獨處，或在需要時拒絕幫助。" },
    image: "/assets/tarot/09-the-hermit.png",
  },
  {
    id: 10, number: 10, arcana: "major",
    name: { en: "Wheel of Fortune", zh: "命運之輪" },
    keywords: { en: ["good luck", "karma", "life cycles", "destiny", "turning point"], zh: ["好運", "業力", "生命週期", "命運", "轉折點"] },
    upright: { en: "Good luck, karma, life cycles, destiny, a turning point. The wheel is turning in your favor — embrace change.", zh: "好運、因果、生命循環、命運、轉折點。命運之輪正在向你有利的方向轉動——擁抱變化。" },
    reversed: { en: "Bad luck, resistance to change, breaking cycles. External forces seem against you; find what you can control.", zh: "運氣不佳、抗拒改變、打破循環。外在力量似乎不利於你；找到你能掌控的部分。" },
    image: "/assets/tarot/10-wheel-of-fortune.png",
  },
  {
    id: 11, number: 11, arcana: "major",
    name: { en: "Justice", zh: "正義" },
    keywords: { en: ["justice", "fairness", "truth", "cause and effect", "law"], zh: ["正義", "公平", "真相", "因果", "法律"] },
    upright: { en: "Justice, fairness, truth, cause and effect, law. A fair outcome based on your actions. Accountability and balanced decisions.", zh: "正義、公平、真相、因果、法律。基於你的行動的公正結果。負責任和平衡的決定。" },
    reversed: { en: "Unfairness, lack of accountability, dishonesty. An unjust outcome or avoiding responsibility for your actions.", zh: "不公平、缺乏責任感、不誠實。不公正的結果，或逃避自己行為的責任。" },
    image: "/assets/tarot/11-justice.png",
  },
  {
    id: 12, number: 12, arcana: "major",
    name: { en: "The Hanged Man", zh: "倒吊人" },
    keywords: { en: ["pause", "surrender", "letting go", "new perspectives"], zh: ["暫停", "臣服", "放手", "新視角"] },
    upright: { en: "Pause, surrender, letting go, new perspectives. Voluntary sacrifice for a greater understanding. See things from a different angle.", zh: "暫停、臣服、放手、新視角。為了更深的理解而自願犧牲。從不同角度看待事物。" },
    reversed: { en: "Delays, resistance, stalling, indecision. Refusing to make a necessary sacrifice or being stuck in limbo.", zh: "拖延、抗拒、停滯、猶豫不決。拒絕做出必要的犧牲，或困在進退兩難中。" },
    image: "/assets/tarot/12-the-hanged-man.png",
  },
  {
    id: 13, number: 13, arcana: "major",
    name: { en: "Death", zh: "死神" },
    keywords: { en: ["endings", "change", "transformation", "transition"], zh: ["結束", "改變", "轉化", "過渡"] },
    upright: { en: "Endings, change, transformation, transition. The end of a chapter makes way for new beginnings. Let go of what no longer serves you.", zh: "結束、改變、轉化、過渡。一個篇章的結束為新的開始讓路。放下不再適合你的東西。" },
    reversed: { en: "Resistance to change, personal transformation delayed, inner purging. Clinging to the past prevents growth.", zh: "抗拒改變、個人轉化被延遲、內在清理。執著於過去阻礙了成長。" },
    image: "/assets/tarot/13-death.png",
  },
  {
    id: 14, number: 14, arcana: "major",
    name: { en: "Temperance", zh: "節制" },
    keywords: { en: ["balance", "moderation", "patience", "purpose"], zh: ["平衡", "節制", "耐心", "目的"] },
    upright: { en: "Balance, moderation, patience, purpose. Finding middle ground and harmonizing opposing forces in your life.", zh: "平衡、節制、耐心、目的。在生活中找到中間地帶，調和對立的力量。" },
    reversed: { en: "Imbalance, excess, self-healing, realignment. Going to extremes or lacking a sense of long-term purpose.", zh: "失衡、過度、自我療癒、重新校準。走向極端，或缺乏長期目標感。" },
    image: "/assets/tarot/14-temperance.png",
  },
  {
    id: 15, number: 15, arcana: "major",
    name: { en: "The Devil", zh: "惡魔" },
    keywords: { en: ["shadow self", "attachment", "addiction", "restriction", "sexuality"], zh: ["暗影自我", "執著", "上癮", "束縛", "性慾"] },
    upright: { en: "Shadow self, attachment, addiction, restriction, sexuality. Bondage to material things, unhealthy patterns, or toxic relationships.", zh: "暗影自我、執著、上癮、束縛、性慾。被物質、不健康的模式或有毒關係所綁縛。" },
    reversed: { en: "Releasing limiting beliefs, exploring dark thoughts, detachment. Breaking free from what has held you captive.", zh: "釋放限制性信念、探索暗面思想、超脫。從束縛你的事物中掙脫。" },
    image: "/assets/tarot/15-the-devil.png",
  },
  {
    id: 16, number: 16, arcana: "major",
    name: { en: "The Tower", zh: "塔" },
    keywords: { en: ["sudden change", "upheaval", "chaos", "revelation", "awakening"], zh: ["突變", "劇變", "混亂", "揭示", "覺醒"] },
    upright: { en: "Sudden change, upheaval, chaos, revelation, awakening. Destruction of false structures leads to liberation and truth.", zh: "突變、劇變、混亂、揭示、覺醒。虛假結構的崩塌帶來解放與真相。" },
    reversed: { en: "Personal transformation, fear of change, averting disaster. Resisting inevitable change or a narrowly avoided crisis.", zh: "個人轉化、恐懼改變、避開災難。抗拒不可避免的改變，或僥倖避開的危機。" },
    image: "/assets/tarot/16-the-tower.png",
  },
  {
    id: 17, number: 17, arcana: "major",
    name: { en: "The Star", zh: "星星" },
    keywords: { en: ["hope", "faith", "purpose", "renewal", "spirituality"], zh: ["希望", "信念", "目的", "重生", "靈性"] },
    upright: { en: "Hope, faith, purpose, renewal, spirituality. A calm after the storm — healing, inspiration, and renewed optimism.", zh: "希望、信念、使命、重生、靈性。暴風雨後的寧靜——療癒、靈感和重新燃起的樂觀。" },
    reversed: { en: "Lack of faith, despair, self-trust issues, disconnection. Losing hope or feeling uninspired and purposeless.", zh: "缺乏信念、絕望、自我信任問題、斷開連結。失去希望，或感到缺乏靈感和目標。" },
    image: "/assets/tarot/17-the-star.png",
  },
  {
    id: 18, number: 18, arcana: "major",
    name: { en: "The Moon", zh: "月亮" },
    keywords: { en: ["illusion", "fear", "anxiety", "subconscious", "intuition"], zh: ["幻覺", "恐懼", "焦慮", "潛意識", "直覺"] },
    upright: { en: "Illusion, fear, anxiety, subconscious, intuition. Things are not as they seem. Navigate through uncertainty by trusting your instincts.", zh: "幻覺、恐懼、焦慮、潛意識、直覺。事情並非表面看到的那樣。透過信任直覺來穿越不確定性。" },
    reversed: { en: "Release of fear, repressed emotion, inner confusion clearing. Truth emerging as illusions fall away.", zh: "釋放恐懼、壓抑的情緒、內在困惑逐漸消散。當幻覺瓦解，真相浮現。" },
    image: "/assets/tarot/18-the-moon.png",
  },
  {
    id: 19, number: 19, arcana: "major",
    name: { en: "The Sun", zh: "太陽" },
    keywords: { en: ["positivity", "fun", "warmth", "success", "vitality"], zh: ["正面", "歡樂", "溫暖", "成功", "活力"] },
    upright: { en: "Positivity, fun, warmth, success, vitality. Joy, abundance, and clarity. Everything is coming together beautifully.", zh: "正面、歡樂、溫暖、成功、活力。喜悅、豐盛和清明。一切正在美好地匯聚。" },
    reversed: { en: "Inner child wounded, overly optimistic, temporary setbacks. Joy is present but may be clouded by doubt or delay.", zh: "內在小孩受傷、過度樂觀、暫時的挫折。喜悅仍在但可能被懷疑或延遲所蒙蔽。" },
    image: "/assets/tarot/19-the-sun.png",
  },
  {
    id: 20, number: 20, arcana: "major",
    name: { en: "Judgement", zh: "審判" },
    keywords: { en: ["judgement", "rebirth", "inner calling", "absolution"], zh: ["審判", "重生", "內在召喚", "赦免"] },
    upright: { en: "Judgement, rebirth, inner calling, absolution. A spiritual awakening and a call to rise to a higher purpose.", zh: "審判、重生、內在召喚、赦免。靈性的覺醒，以及提升到更高使命的召喚。" },
    reversed: { en: "Self-doubt, inner critic, ignoring the call. Refusing to learn from past experiences or avoiding self-reflection.", zh: "自我懷疑、內在批判者、忽視召喚。拒絕從過去經驗中學習，或逃避自我反思。" },
    image: "/assets/tarot/20-judgement.png",
  },
  {
    id: 21, number: 21, arcana: "major",
    name: { en: "The World", zh: "世界" },
    keywords: { en: ["completion", "integration", "accomplishment", "travel"], zh: ["完成", "整合", "成就", "旅行"] },
    upright: { en: "Completion, integration, accomplishment, travel. A cycle is complete. Celebrate your achievements and embrace wholeness.", zh: "完成、整合、成就、旅行。一個循環已經完成。慶祝你的成就，擁抱圓滿。" },
    reversed: { en: "Seeking personal closure, short-cuts, delays. Feeling incomplete or struggling to finish what you started.", zh: "尋求個人了結、走捷徑、延遲。感到不完整，或努力完成你開始的事情。" },
    image: "/assets/tarot/21-the-world.png",
  },
  // ══════════════════════════════════════
  // MINOR ARCANA — WANDS (22–35)
  // ══════════════════════════════════════
  {
    id: 22, number: 1, arcana: "minor", suit: "wands",
    name: { en: "Ace of Wands", zh: "權杖王牌" },
    keywords: { en: ["inspiration", "new opportunity", "growth", "potential"], zh: ["靈感", "新機會", "成長", "潛力"] },
    upright: { en: "Inspiration, new opportunities, growth, potential. A spark of creative energy and the beginning of a passionate venture.", zh: "靈感、新機會、成長、潛力。一道創造力的火花，充滿熱情的新事業的開端。" },
    reversed: { en: "Emerging ideas delayed, lack of direction, distractions. Creative blocks or missed opportunities due to hesitation.", zh: "新想法被延遲、缺乏方向、分心。因猶豫而產生的創意阻塞或錯失機會。" },
    image: "/assets/tarot/22-ace-of-wands.png",
  },
  {
    id: 23, number: 2, arcana: "minor", suit: "wands",
    name: { en: "Two of Wands", zh: "權杖二" },
    keywords: { en: ["future planning", "progress", "decisions", "discovery"], zh: ["未來規劃", "進展", "決策", "發現"] },
    upright: { en: "Future planning, progress, decisions, discovery. You hold the world in your hands — plan boldly for what's next.", zh: "未來規劃、進展、決策、發現。你把世界握在手中——為下一步大膽計畫。" },
    reversed: { en: "Fear of unknown, lack of planning, playing it safe. Staying in your comfort zone when expansion is needed.", zh: "對未知的恐懼、缺乏規劃、保守行事。在需要擴展時停留在舒適圈。" },
    image: "/assets/tarot/23-two-of-wands.png",
  },
  {
    id: 24, number: 3, arcana: "minor", suit: "wands",
    name: { en: "Three of Wands", zh: "權杖三" },
    keywords: { en: ["progress", "expansion", "foresight", "overseas opportunities"], zh: ["進展", "擴張", "遠見", "海外機會"] },
    upright: { en: "Progress, expansion, foresight, overseas opportunities. Your plans are taking shape — look toward the horizon with confidence.", zh: "進展、擴張、遠見、海外機會。你的計畫正在成形——充滿信心地望向遠方。" },
    reversed: { en: "Playing small, lack of foresight, delays in plans. Frustration from obstacles or unexpected setbacks in progress.", zh: "格局太小、缺乏遠見、計畫延遲。因障礙或意外挫折而感到挫敗。" },
    image: "/assets/tarot/24-three-of-wands.png",
  },
  {
    id: 25, number: 4, arcana: "minor", suit: "wands",
    name: { en: "Four of Wands", zh: "權杖四" },
    keywords: { en: ["celebration", "joy", "harmony", "relaxation", "homecoming"], zh: ["慶祝", "喜悅", "和諧", "放鬆", "歸家"] },
    upright: { en: "Celebration, joy, harmony, relaxation, homecoming. A milestone achieved — time to celebrate with those you love.", zh: "慶祝、喜悅、和諧、放鬆、歸家。達成里程碑——是時候與所愛的人一起慶祝。" },
    reversed: { en: "Personal celebration, inner harmony, transition. Feeling unsettled at home or lacking a sense of belonging.", zh: "個人慶祝、內在和諧、過渡期。在家中感到不安，或缺乏歸屬感。" },
    image: "/assets/tarot/25-four-of-wands.png",
  },
  {
    id: 26, number: 5, arcana: "minor", suit: "wands",
    name: { en: "Five of Wands", zh: "權杖五" },
    keywords: { en: ["conflict", "disagreements", "competition", "tension"], zh: ["衝突", "分歧", "競爭", "緊張"] },
    upright: { en: "Conflict, disagreements, competition, tension, diversity. Clashing opinions but potential for creative breakthroughs.", zh: "衝突、分歧、競爭、緊張、多元。意見碰撞，但有創造性突破的潛力。" },
    reversed: { en: "Inner conflict, conflict avoidance, tension release. Avoiding confrontation or finding resolution after a struggle.", zh: "內在衝突、迴避衝突、緊張緩解。逃避對抗，或在掙扎後找到解決方案。" },
    image: "/assets/tarot/26-five-of-wands.png",
  },
  {
    id: 27, number: 6, arcana: "minor", suit: "wands",
    name: { en: "Six of Wands", zh: "權杖六" },
    keywords: { en: ["success", "public recognition", "progress", "self-confidence"], zh: ["成功", "公眾認可", "進步", "自信"] },
    upright: { en: "Success, public recognition, progress, self-confidence. Victory is yours — your efforts are being recognized and celebrated.", zh: "成功、公眾認可、進步、自信。勝利屬於你——你的努力正在被認可和慶祝。" },
    reversed: { en: "Private achievement, fall from grace, egotism. Seeking external validation or dealing with a setback after success.", zh: "私下成就、失寵、自大。尋求外在認可，或在成功後面對挫敗。" },
    image: "/assets/tarot/27-six-of-wands.png",
  },
  {
    id: 28, number: 7, arcana: "minor", suit: "wands",
    name: { en: "Seven of Wands", zh: "權杖七" },
    keywords: { en: ["challenge", "competition", "protection", "perseverance"], zh: ["挑戰", "競爭", "保護", "堅持"] },
    upright: { en: "Challenge, competition, protection, perseverance. Stand your ground — you have the advantage even when outnumbered.", zh: "挑戰、競爭、保護、堅持。堅守立場——即使寡不敵眾，你也佔有優勢。" },
    reversed: { en: "Exhaustion, giving up, overwhelmed. Feeling unable to defend your position or questioning if it's worth the fight.", zh: "精疲力竭、放棄、不堪負荷。感覺無法捍衛立場，或質疑是否值得繼續戰鬥。" },
    image: "/assets/tarot/28-seven-of-wands.png",
  },
  {
    id: 29, number: 8, arcana: "minor", suit: "wands",
    name: { en: "Eight of Wands", zh: "權杖八" },
    keywords: { en: ["speed", "action", "air travel", "movement", "swift change"], zh: ["速度", "行動", "飛行", "移動", "快速變化"] },
    upright: { en: "Speed, action, air travel, movement, swift change. Things are moving fast — ride the momentum and act quickly.", zh: "速度、行動、飛行、移動、快速變化。事情進展神速——乘著這股動力迅速行動。" },
    reversed: { en: "Delays, frustration, resisting change, internal alignment. Plans stalling or messages getting lost in transit.", zh: "延遲、挫折、抗拒改變、內在校準。計畫停滯，或訊息在傳遞中遺失。" },
    image: "/assets/tarot/29-eight-of-wands.png",
  },
  {
    id: 30, number: 9, arcana: "minor", suit: "wands",
    name: { en: "Nine of Wands", zh: "權杖九" },
    keywords: { en: ["resilience", "courage", "persistence", "test of faith", "boundaries"], zh: ["韌性", "勇氣", "堅持", "信念考驗", "界限"] },
    upright: { en: "Resilience, courage, persistence, test of faith, boundaries. You're battle-worn but still standing. One last push to the finish.", zh: "韌性、勇氣、堅持、信念考驗、界限。你身經百戰但依然屹立。最後一搏，就到終點了。" },
    reversed: { en: "Exhaustion, giving up, overwhelmed, paranoia. Running on empty or being too defensive and suspicious.", zh: "精疲力竭、放棄、不堪負荷、多疑。燃料耗盡，或過度防禦和猜疑。" },
    image: "/assets/tarot/30-nine-of-wands.png",
  },
  {
    id: 31, number: 10, arcana: "minor", suit: "wands",
    name: { en: "Ten of Wands", zh: "權杖十" },
    keywords: { en: ["burden", "extra responsibility", "hard work", "completion"], zh: ["重擔", "額外責任", "辛勤工作", "完成"] },
    upright: { en: "Burden, extra responsibility, hard work, completion. You're carrying too much — delegate or let go to avoid burnout.", zh: "重擔、額外責任、辛勤工作、即將完成。你背負太多——委託他人或放下一些，避免過勞。" },
    reversed: { en: "Doing it all, duty, stress release. Learning to say no or finally putting down a heavy load.", zh: "一肩扛起、責任、壓力釋放。學會說不，或終於放下沉重的負擔。" },
    image: "/assets/tarot/31-ten-of-wands.png",
  },
  {
    id: 32, number: 11, arcana: "minor", suit: "wands",
    name: { en: "Page of Wands", zh: "權杖侍者" },
    keywords: { en: ["inspiration", "ideas", "discovery", "limitless potential", "free spirit"], zh: ["靈感", "想法", "發現", "無限潛力", "自由靈魂"] },
    upright: { en: "Inspiration, ideas, discovery, limitless potential, free spirit. An exciting message or the spark of a new creative adventure.", zh: "靈感、想法、發現、無限潛力、自由靈魂。一個令人興奮的訊息，或新創意冒險的火花。" },
    reversed: { en: "Newly formed ideas, redirect your energy, self-limiting beliefs. Lack of direction or scattered enthusiasm.", zh: "初步形成的想法、重新導向能量、自我設限的信念。缺乏方向或分散的熱情。" },
    image: "/assets/tarot/32-page-of-wands.png",
  },
  {
    id: 33, number: 12, arcana: "minor", suit: "wands",
    name: { en: "Knight of Wands", zh: "權杖騎士" },
    keywords: { en: ["energy", "passion", "inspired action", "adventure", "impulsiveness"], zh: ["能量", "熱情", "受啟發的行動", "冒險", "衝動"] },
    upright: { en: "Energy, passion, inspired action, adventure, impulsiveness. Charge forward with enthusiasm — but know where you're going.", zh: "能量、熱情、受啟發的行動、冒險、衝動。帶著熱情向前衝——但要知道方向在哪。" },
    reversed: { en: "Passion project, haste, scattered energy, delays, frustration. Acting without thinking or losing momentum halfway.", zh: "熱情計畫、急躁、能量分散、延遲、挫折。不加思考地行動，或半途失去動力。" },
    image: "/assets/tarot/33-knight-of-wands.png",
  },
  {
    id: 34, number: 13, arcana: "minor", suit: "wands",
    name: { en: "Queen of Wands", zh: "權杖皇后" },
    keywords: { en: ["courage", "confidence", "independence", "social butterfly", "determination"], zh: ["勇氣", "自信", "獨立", "社交達人", "決心"] },
    upright: { en: "Courage, confidence, independence, social butterfly, determination. Bold, vibrant energy — lead with warmth and fierce authenticity.", zh: "勇氣、自信、獨立、社交達人、決心。大膽而充滿活力的能量——以溫暖和真實來引領。" },
    reversed: { en: "Self-respect issues, jealousy, selfishness, demanding nature. Insecurity masked by arrogance or controlling behavior.", zh: "自尊問題、嫉妒、自私、要求過多。以傲慢或控制行為掩飾的不安全感。" },
    image: "/assets/tarot/34-queen-of-wands.png",
  },
  {
    id: 35, number: 14, arcana: "minor", suit: "wands",
    name: { en: "King of Wands", zh: "權杖國王" },
    keywords: { en: ["natural leader", "vision", "entrepreneur", "honor"], zh: ["天生領袖", "願景", "企業家", "榮譽"] },
    upright: { en: "Natural-born leader, vision, entrepreneur, honor. A bold visionary who inspires others through action and integrity.", zh: "天生的領袖、願景、企業家精神、榮譽。一位透過行動和正直激勵他人的大膽遠見者。" },
    reversed: { en: "Impulsiveness, haste, ruthless, high expectations. Tyrannical leadership or burning bridges with reckless decisions.", zh: "衝動、急躁、無情、期望過高。暴君式領導，或因魯莽決定而自斷後路。" },
    image: "/assets/tarot/35-king-of-wands.png",
  },
  // ══════════════════════════════════════
  // MINOR ARCANA — CUPS (36–49)
  // ══════════════════════════════════════
  {
    id: 36, number: 1, arcana: "minor", suit: "cups",
    name: { en: "Ace of Cups", zh: "聖杯王牌" },
    keywords: { en: ["love", "new feelings", "emotional awakening", "creativity", "intuition"], zh: ["愛", "新感覺", "情感覺醒", "創造力", "直覺"] },
    upright: { en: "Love, new feelings, emotional awakening, creativity, intuition. An overflow of emotion and the start of a deep connection.", zh: "愛、新感受、情感覺醒、創造力、直覺。情感的湧現，一段深層連結的開始。" },
    reversed: { en: "Self-love, intuition blocked, repressed emotions. Emotional emptiness or difficulty opening up to others.", zh: "自愛、直覺阻塞、壓抑的情感。情感空虛，或難以向他人敞開心扉。" },
    image: "/assets/tarot/36-ace-of-cups.png",
  },
  {
    id: 37, number: 2, arcana: "minor", suit: "cups",
    name: { en: "Two of Cups", zh: "聖杯二" },
    keywords: { en: ["unified love", "partnership", "mutual attraction", "connection"], zh: ["合一的愛", "夥伴關係", "相互吸引", "連結"] },
    upright: { en: "Unified love, partnership, mutual attraction. A balanced and harmonious connection between two people.", zh: "合一的愛、夥伴關係、相互吸引。兩人之間平衡和諧的連結。" },
    reversed: { en: "Self-love needed, break-ups, disharmony, distrust. Imbalance in a relationship or an incompatible partnership.", zh: "需要自愛、分手、不和諧、不信任。關係中的失衡或不相容的夥伴關係。" },
    image: "/assets/tarot/37-two-of-cups.png",
  },
  {
    id: 38, number: 3, arcana: "minor", suit: "cups",
    name: { en: "Three of Cups", zh: "聖杯三" },
    keywords: { en: ["celebration", "friendship", "creativity", "community"], zh: ["慶祝", "友誼", "創造力", "社群"] },
    upright: { en: "Celebration, friendship, creativity, community. Joyful gatherings and the pleasure of being with kindred spirits.", zh: "慶祝、友誼、創造力、社群。歡樂的聚會，與志同道合者在一起的愉悅。" },
    reversed: { en: "Overindulgence, gossip, isolation. Social excess or feeling like the third wheel in a group dynamic.", zh: "過度放縱、八卦、孤立。社交過度，或在群體中感覺自己是多餘的。" },
    image: "/assets/tarot/38-three-of-cups.png",
  },
  {
    id: 39, number: 4, arcana: "minor", suit: "cups",
    name: { en: "Four of Cups", zh: "聖杯四" },
    keywords: { en: ["meditation", "contemplation", "apathy", "reevaluation"], zh: ["冥想", "沉思", "冷漠", "重新評估"] },
    upright: { en: "Meditation, contemplation, apathy, reevaluation. Turning inward — you may be missing an opportunity right in front of you.", zh: "冥想、沉思、冷漠、重新評估。向內轉——你可能正在錯過眼前的機會。" },
    reversed: { en: "Sudden awareness, choosing to re-engage, seizing the moment. Snapping out of apathy and seeing new possibilities.", zh: "突然的覺察、選擇重新參與、把握當下。從冷漠中醒來，看到新的可能性。" },
    image: "/assets/tarot/39-four-of-cups.png",
  },
  {
    id: 40, number: 5, arcana: "minor", suit: "cups",
    name: { en: "Five of Cups", zh: "聖杯五" },
    keywords: { en: ["regret", "failure", "disappointment", "pessimism"], zh: ["遺憾", "失敗", "失望", "悲觀"] },
    upright: { en: "Regret, failure, disappointment, pessimism. Focusing on what's lost while overlooking what remains. Turn around.", zh: "遺憾、失敗、失望、悲觀。專注於失去的，卻忽略了仍然擁有的。轉過身來看看。" },
    reversed: { en: "Personal setbacks overcome, acceptance, moving on. Finding the strength to leave behind disappointment.", zh: "克服個人挫折、接受、向前走。找到力量，將失望拋在身後。" },
    image: "/assets/tarot/40-five-of-cups.png",
  },
  {
    id: 41, number: 6, arcana: "minor", suit: "cups",
    name: { en: "Six of Cups", zh: "聖杯六" },
    keywords: { en: ["revisiting the past", "childhood memories", "innocence", "joy"], zh: ["重訪過去", "童年記憶", "天真", "喜悅"] },
    upright: { en: "Revisiting the past, childhood memories, innocence, joy. Nostalgia and reconnection with simpler, happier times.", zh: "重訪過去、童年記憶、天真、喜悅。懷舊，重新連結更單純、更快樂的時光。" },
    reversed: { en: "Living in the past, forgiveness, lacking playfulness. Stuck in nostalgia or unable to move forward.", zh: "活在過去、原諒、缺乏玩心。困在懷舊中，無法向前邁進。" },
    image: "/assets/tarot/41-six-of-cups.png",
  },
  {
    id: 42, number: 7, arcana: "minor", suit: "cups",
    name: { en: "Seven of Cups", zh: "聖杯七" },
    keywords: { en: ["fantasy", "illusion", "wishful thinking", "choices", "imagination"], zh: ["幻想", "幻覺", "一廂情願", "選擇", "想像力"] },
    upright: { en: "Fantasy, illusion, wishful thinking, choices. Many options appear — but not all are real. Discern dreams from delusions.", zh: "幻想、幻覺、一廂情願、選擇。許多選項出現——但不是全部都是真的。分辨夢想與妄想。" },
    reversed: { en: "Alignment, personal values, overwhelmed by choices. Cutting through illusion to focus on what truly matters.", zh: "校準、個人價值觀、被選擇淹沒。穿透幻覺，專注於真正重要的事。" },
    image: "/assets/tarot/42-seven-of-cups.png",
  },
  {
    id: 43, number: 8, arcana: "minor", suit: "cups",
    name: { en: "Eight of Cups", zh: "聖杯八" },
    keywords: { en: ["disappointment", "abandonment", "withdrawal", "escapism"], zh: ["失望", "放棄", "退出", "逃避"] },
    upright: { en: "Disappointment, abandonment, withdrawal, escapism. Walking away from what no longer fulfills you — a brave but painful choice.", zh: "失望、放棄、退出、逃避。離開不再滿足你的事物——一個勇敢但痛苦的選擇。" },
    reversed: { en: "Trying one more time, indecision, aimless drifting. Fear of letting go or lacking the courage to leave.", zh: "再試一次、猶豫不決、漫無目的地漂流。害怕放手，或缺乏離開的勇氣。" },
    image: "/assets/tarot/43-eight-of-cups.png",
  },
  {
    id: 44, number: 9, arcana: "minor", suit: "cups",
    name: { en: "Nine of Cups", zh: "聖杯九" },
    keywords: { en: ["contentment", "satisfaction", "gratitude", "wish come true"], zh: ["滿足", "滿意", "感恩", "願望成真"] },
    upright: { en: "Contentment, satisfaction, gratitude, wish come true. The wish card — emotional fulfillment and deep satisfaction.", zh: "滿足、滿意、感恩、願望成真。許願牌——情感的圓滿和深深的滿足感。" },
    reversed: { en: "Inner happiness, materialism, dissatisfaction. Getting what you wanted but finding it doesn't bring the expected joy.", zh: "內在幸福、物質主義、不滿。得到了想要的，卻發現沒有帶來預期的喜悅。" },
    image: "/assets/tarot/44-nine-of-cups.png",
  },
  {
    id: 45, number: 10, arcana: "minor", suit: "cups",
    name: { en: "Ten of Cups", zh: "聖杯十" },
    keywords: { en: ["divine love", "blissful relationships", "harmony", "alignment"], zh: ["神聖之愛", "幸福關係", "和諧", "校準"] },
    upright: { en: "Divine love, blissful relationships, harmony, alignment. Emotional fulfillment and lasting happiness in love and family.", zh: "神聖之愛、幸福的關係、和諧、校準。在愛情和家庭中獲得情感的圓滿與持久的幸福。" },
    reversed: { en: "Disconnection, misaligned values, struggling relationships. The picture-perfect life has cracks beneath the surface.", zh: "斷開連結、價值觀不合、掙扎的關係。完美生活的表面下有著裂縫。" },
    image: "/assets/tarot/45-ten-of-cups.png",
  },
  {
    id: 46, number: 11, arcana: "minor", suit: "cups",
    name: { en: "Page of Cups", zh: "聖杯侍者" },
    keywords: { en: ["creative opportunities", "intuitive messages", "curiosity", "possibility"], zh: ["創意機會", "直覺訊息", "好奇心", "可能性"] },
    upright: { en: "Creative opportunities, intuitive messages, curiosity, possibility. A gentle surprise or emotional message is on its way.", zh: "創意機會、直覺訊息、好奇心、可能性。一個溫柔的驚喜或情感訊息即將到來。" },
    reversed: { en: "New ideas blocked, emotional immaturity, creative blocks. Daydreaming without action or being overly sensitive.", zh: "新想法受阻、情感不成熟、創意阻塞。空想而不行動，或過度敏感。" },
    image: "/assets/tarot/46-page-of-cups.png",
  },
  {
    id: 47, number: 12, arcana: "minor", suit: "cups",
    name: { en: "Knight of Cups", zh: "聖杯騎士" },
    keywords: { en: ["creativity", "romance", "charm", "imagination", "beauty"], zh: ["創造力", "浪漫", "魅力", "想像力", "美"] },
    upright: { en: "Creativity, romance, charm, imagination, beauty. A romantic offer or creative proposal arrives with grace.", zh: "創造力、浪漫、魅力、想像力、美。一個浪漫的邀請或創意提案優雅地到來。" },
    reversed: { en: "Overactive imagination, unrealistic, jealousy, moodiness. Beautiful promises that lack substance or follow-through.", zh: "想像力過度活躍、不切實際、嫉妒、情緒化。美麗的承諾卻缺乏實質或行動力。" },
    image: "/assets/tarot/47-knight-of-cups.png",
  },
  {
    id: 48, number: 13, arcana: "minor", suit: "cups",
    name: { en: "Queen of Cups", zh: "聖杯皇后" },
    keywords: { en: ["compassionate", "caring", "emotionally stable", "intuitive", "in flow"], zh: ["有同理心", "關懷", "情緒穩定", "直覺", "順流"] },
    upright: { en: "Compassionate, caring, emotionally stable, intuitive, in flow. Deep emotional intelligence and nurturing presence.", zh: "有同理心、關懷、情緒穩定、直覺、順流。深層的情商和滋養的存在。" },
    reversed: { en: "Inner feelings, self-care, co-dependency, emotional manipulation. Losing yourself in others' emotions.", zh: "內在感受、自我照顧、共依存、情感操控。在他人的情緒中迷失自己。" },
    image: "/assets/tarot/48-queen-of-cups.png",
  },
  {
    id: 49, number: 14, arcana: "minor", suit: "cups",
    name: { en: "King of Cups", zh: "聖杯國王" },
    keywords: { en: ["emotionally balanced", "compassionate", "diplomatic"], zh: ["情緒平衡", "有同理心", "圓融"] },
    upright: { en: "Emotionally balanced, compassionate, diplomatic. Mastery over emotions — leading with wisdom, empathy, and calm.", zh: "情緒平衡、有同理心、圓融。掌握情緒——以智慧、同理心和冷靜來引領。" },
    reversed: { en: "Self-compassion needed, moodiness, emotional manipulation. Emotional volatility or suppressing feelings behind a calm facade.", zh: "需要自我慈悲、情緒化、情感操控。情緒不穩定，或在冷靜外表下壓抑情感。" },
    image: "/assets/tarot/49-king-of-cups.png",
  },
  // ══════════════════════════════════════
  // MINOR ARCANA — SWORDS (50–63)
  // ══════════════════════════════════════
  {
    id: 50, number: 1, arcana: "minor", suit: "swords",
    name: { en: "Ace of Swords", zh: "寶劍王牌" },
    keywords: { en: ["breakthrough", "clarity", "sharp mind", "truth", "new idea"], zh: ["突破", "清晰", "敏銳思維", "真相", "新想法"] },
    upright: { en: "Breakthrough, clarity, sharp mind, truth, new idea. A powerful moment of mental clarity — cut through confusion.", zh: "突破、清晰、敏銳思維、真相、新想法。一個強大的思維清明時刻——切穿困惑。" },
    reversed: { en: "Inner clarity needed, re-thinking an idea, clouded judgement. Confusion or using intellect to deceive.", zh: "需要內在清明、重新思考、判斷力模糊。困惑，或用智力來欺騙。" },
    image: "/assets/tarot/50-ace-of-swords.png",
  },
  {
    id: 51, number: 2, arcana: "minor", suit: "swords",
    name: { en: "Two of Swords", zh: "寶劍二" },
    keywords: { en: ["difficult decisions", "weighing options", "an impasse", "avoidance"], zh: ["困難決定", "權衡選項", "僵局", "逃避"] },
    upright: { en: "Difficult decisions, weighing options, an impasse, avoidance. A stalemate that requires you to remove the blindfold and choose.", zh: "困難的決定、權衡選項、僵局、逃避。一個需要你摘下眼罩做出選擇的僵局。" },
    reversed: { en: "Indecision, confusion, information overload. Being overwhelmed by options or finally making a difficult choice.", zh: "優柔寡斷、困惑、資訊過載。被選項壓倒，或終於做出艱難的選擇。" },
    image: "/assets/tarot/51-two-of-swords.png",
  },
  {
    id: 52, number: 3, arcana: "minor", suit: "swords",
    name: { en: "Three of Swords", zh: "寶劍三" },
    keywords: { en: ["heartbreak", "emotional pain", "sorrow", "grief", "hurt"], zh: ["心碎", "情感痛苦", "悲傷", "哀痛", "傷害"] },
    upright: { en: "Heartbreak, emotional pain, sorrow, grief, hurt. A painful truth that must be faced — healing begins with acknowledgment.", zh: "心碎、情感痛苦、悲傷、哀痛、傷害。必須面對的痛苦真相——療癒從承認開始。" },
    reversed: { en: "Moving on, releasing pain, optimism after sorrow. The worst is over — allow yourself to heal and forgive.", zh: "向前走、釋放痛苦、悲傷後的樂觀。最壞的已經過去——允許自己療癒和原諒。" },
    image: "/assets/tarot/52-three-of-swords.png",
  },
  {
    id: 53, number: 4, arcana: "minor", suit: "swords",
    name: { en: "Four of Swords", zh: "寶劍四" },
    keywords: { en: ["rest", "relaxation", "meditation", "contemplation", "recuperation"], zh: ["休息", "放鬆", "冥想", "沉思", "恢復"] },
    upright: { en: "Rest, relaxation, meditation, contemplation, recuperation. Take a break — recharge before the next challenge.", zh: "休息、放鬆、冥想、沉思、恢復。休息一下——在下一個挑戰前充電。" },
    reversed: { en: "Exhaustion, burn-out, deep contemplation, stagnation. Pushing yourself too hard without adequate rest.", zh: "精疲力竭、過勞、深度沉思、停滯。在沒有充分休息的情況下逼迫自己。" },
    image: "/assets/tarot/53-four-of-swords.png",
  },
  {
    id: 54, number: 5, arcana: "minor", suit: "swords",
    name: { en: "Five of Swords", zh: "寶劍五" },
    keywords: { en: ["conflict", "disagreements", "competition", "defeat", "winning at all costs"], zh: ["衝突", "分歧", "競爭", "失敗", "不擇手段"] },
    upright: { en: "Conflict, disagreements, competition, defeat, winning at all costs. A hollow victory — consider what you've lost to win.", zh: "衝突、分歧、競爭、失敗、不擇手段的勝利。一場空洞的勝利——想想你為了贏而失去了什麼。" },
    reversed: { en: "Reconciliation, making amends, past resentment. Choosing to let go of a fight or finding peace after conflict.", zh: "和解、彌補、過去的怨恨。選擇放下爭鬥，或在衝突後找到平靜。" },
    image: "/assets/tarot/54-five-of-swords.png",
  },
  {
    id: 55, number: 6, arcana: "minor", suit: "swords",
    name: { en: "Six of Swords", zh: "寶劍六" },
    keywords: { en: ["transition", "change", "rite of passage", "releasing baggage"], zh: ["過渡", "改變", "通過儀式", "釋放包袱"] },
    upright: { en: "Transition, change, rite of passage, releasing baggage. Moving away from difficulties toward calmer waters.", zh: "過渡、改變、通過儀式、釋放包袱。離開困難，駛向更平靜的水域。" },
    reversed: { en: "Personal transition, resistance to change, unfinished business. Difficulty leaving behind a painful situation.", zh: "個人轉變、抗拒改變、未了結的事務。難以離開痛苦的處境。" },
    image: "/assets/tarot/55-six-of-swords.png",
  },
  {
    id: 56, number: 7, arcana: "minor", suit: "swords",
    name: { en: "Seven of Swords", zh: "寶劍七" },
    keywords: { en: ["betrayal", "deception", "getting away with something", "strategic"], zh: ["背叛", "欺騙", "僥倖逃脫", "策略性"] },
    upright: { en: "Betrayal, deception, getting away with something, acting strategically. Someone may not be playing fair — including you.", zh: "背叛、欺騙、僥倖逃脫、策略性行動。有人可能不公平——包括你自己。" },
    reversed: { en: "Imposter syndrome, self-deceit, coming clean. A secret being revealed or the urge to confess.", zh: "冒牌者症候群、自我欺騙、坦白。秘密被揭露，或想要坦誠的衝動。" },
    image: "/assets/tarot/56-seven-of-swords.png",
  },
  {
    id: 57, number: 8, arcana: "minor", suit: "swords",
    name: { en: "Eight of Swords", zh: "寶劍八" },
    keywords: { en: ["negative thoughts", "self-imposed restriction", "imprisonment", "victim mentality"], zh: ["負面思維", "自我設限", "禁錮", "受害者心態"] },
    upright: { en: "Negative thoughts, self-imposed restriction, imprisonment, victim mentality. You feel trapped — but the bonds are of your own making.", zh: "負面思維、自我設限、禁錮、受害者心態。你感覺被困住——但束縛是你自己造成的。" },
    reversed: { en: "Self-acceptance, new perspective, freedom. Releasing limiting beliefs and realizing your power to escape.", zh: "自我接納、新視角、自由。釋放限制性信念，意識到你有力量掙脫。" },
    image: "/assets/tarot/57-eight-of-swords.png",
  },
  {
    id: 58, number: 9, arcana: "minor", suit: "swords",
    name: { en: "Nine of Swords", zh: "寶劍九" },
    keywords: { en: ["anxiety", "worry", "fear", "depression", "nightmares"], zh: ["焦慮", "擔憂", "恐懼", "憂鬱", "噩夢"] },
    upright: { en: "Anxiety, worry, fear, depression, nightmares. The mind torments itself at 3am. Most fears are worse than reality.", zh: "焦慮、擔憂、恐懼、憂鬱、噩夢。心靈在凌晨三點自我折磨。大多數恐懼比現實更糟。" },
    reversed: { en: "Inner turmoil easing, hope, recovering from anxiety. Light at the end of the tunnel — the worst fears won't manifest.", zh: "內在動盪緩和、希望、從焦慮中恢復。隧道盡頭的光——最壞的恐懼不會成真。" },
    image: "/assets/tarot/58-nine-of-swords.png",
  },
  {
    id: 59, number: 10, arcana: "minor", suit: "swords",
    name: { en: "Ten of Swords", zh: "寶劍十" },
    keywords: { en: ["painful endings", "deep wounds", "betrayal", "loss", "crisis"], zh: ["痛苦的結束", "深深的傷口", "背叛", "失去", "危機"] },
    upright: { en: "Painful endings, deep wounds, betrayal, loss, crisis. Rock bottom — but the only way from here is up. A new dawn approaches.", zh: "痛苦的結束、深深的傷口、背叛、失去、危機。觸底——但從這裡只能往上走。新的黎明即將到來。" },
    reversed: { en: "Recovery, regeneration, resisting an inevitable end. Rising from the ashes or prolonging a painful situation.", zh: "恢復、重生、抗拒不可避免的結束。從灰燼中重新站起，或延長痛苦的處境。" },
    image: "/assets/tarot/59-ten-of-swords.png",
  },
  {
    id: 60, number: 11, arcana: "minor", suit: "swords",
    name: { en: "Page of Swords", zh: "寶劍侍者" },
    keywords: { en: ["new ideas", "curiosity", "thirst for knowledge", "new ways of communicating"], zh: ["新想法", "好奇心", "求知欲", "新的溝通方式"] },
    upright: { en: "New ideas, curiosity, thirst for knowledge, new ways of communicating. A sharp mind eager to learn and explore.", zh: "新想法、好奇心、求知欲、新的溝通方式。一顆渴望學習和探索的敏銳頭腦。" },
    reversed: { en: "Self-expression issues, all talk and no action, haste. Scattered thoughts or gossip without substance.", zh: "自我表達問題、光說不做、急躁。思緒分散，或沒有實質內容的閒話。" },
    image: "/assets/tarot/60-page-of-swords.png",
  },
  {
    id: 61, number: 12, arcana: "minor", suit: "swords",
    name: { en: "Knight of Swords", zh: "寶劍騎士" },
    keywords: { en: ["ambitious", "action-oriented", "driven", "fast-thinking"], zh: ["有野心", "行動導向", "驅動力強", "思維敏捷"] },
    upright: { en: "Ambitious, action-oriented, driven to succeed, fast-thinking. Charging ahead with intellectual force — just watch for recklessness.", zh: "有野心、行動導向、志在成功、思維敏捷。以智識的力量向前衝——只是注意不要魯莽。" },
    reversed: { en: "Restless, unfocused, burnout, no direction. Acting impulsively without a plan or cutting people with sharp words.", zh: "焦躁、不專注、過勞、沒有方向。沒有計畫就衝動行事，或用尖銳的言語傷人。" },
    image: "/assets/tarot/61-knight-of-swords.png",
  },
  {
    id: 62, number: 13, arcana: "minor", suit: "swords",
    name: { en: "Queen of Swords", zh: "寶劍皇后" },
    keywords: { en: ["independent", "unbiased judgement", "clear boundaries", "direct communication"], zh: ["獨立", "客觀判斷", "清晰界限", "直接溝通"] },
    upright: { en: "Independent, unbiased judgement, clear boundaries, direct communication. Sharp perception with compassion — speaks truth without cruelty.", zh: "獨立、客觀判斷、清晰界限、直接溝通。帶著慈悲的敏銳洞察——說真話但不殘忍。" },
    reversed: { en: "Overly emotional, easily influenced, bitchy, cold-hearted. Using intelligence as a weapon or isolating through harshness.", zh: "過度情緒化、容易受影響、刻薄、冷漠。用智力當武器，或因嚴厲而孤立自己。" },
    image: "/assets/tarot/62-queen-of-swords.png",
  },
  {
    id: 63, number: 14, arcana: "minor", suit: "swords",
    name: { en: "King of Swords", zh: "寶劍國王" },
    keywords: { en: ["mental clarity", "intellectual power", "authority", "truth"], zh: ["思維清晰", "智識力量", "權威", "真相"] },
    upright: { en: "Mental clarity, intellectual power, authority, truth. A clear thinker who makes fair decisions based on logic and ethics.", zh: "思維清晰、智識力量、權威、真相。一個思路清晰的人，基於邏輯和道德做出公正決定。" },
    reversed: { en: "Quiet power, inner truth, misuse of power, manipulation. Using authority selfishly or being cold and calculating.", zh: "沉靜的力量、內在真相、濫用權力、操控。自私地使用權威，或冷漠而精於算計。" },
    image: "/assets/tarot/63-king-of-swords.png",
  },
  // ══════════════════════════════════════
  // MINOR ARCANA — PENTACLES (64–77)
  // ══════════════════════════════════════
  {
    id: 64, number: 1, arcana: "minor", suit: "pentacles",
    name: { en: "Ace of Pentacles", zh: "錢幣王牌" },
    keywords: { en: ["new financial opportunity", "prosperity", "abundance", "security"], zh: ["新的財務機會", "繁榮", "豐盛", "安全感"] },
    upright: { en: "A new financial or career opportunity, prosperity, abundance, manifestation. Plant the seed — material success is within reach.", zh: "新的財務或職業機會、繁榮、豐盛、顯化。播下種子——物質上的成功觸手可及。" },
    reversed: { en: "Lost opportunity, lack of planning, scarcity mindset. A missed chance due to poor timing or financial insecurity.", zh: "錯失機會、缺乏規劃、匱乏心態。因時機不佳或財務不安全感而錯失的機會。" },
    image: "/assets/tarot/64-ace-of-pentacles.png",
  },
  {
    id: 65, number: 2, arcana: "minor", suit: "pentacles",
    name: { en: "Two of Pentacles", zh: "錢幣二" },
    keywords: { en: ["multiple priorities", "time management", "prioritisation", "adaptability"], zh: ["多重優先事項", "時間管理", "排序", "適應力"] },
    upright: { en: "Multiple priorities, time management, prioritisation, adaptability. Juggling responsibilities with grace and flexibility.", zh: "多重優先事項、時間管理、排序、適應力。優雅而靈活地平衡各項責任。" },
    reversed: { en: "Over-committed, disorganisation, reprioritisation needed. Dropping balls from juggling too many things at once.", zh: "承諾過多、混亂、需要重新排序。因同時處理太多事情而顧此失彼。" },
    image: "/assets/tarot/65-two-of-pentacles.png",
  },
  {
    id: 66, number: 3, arcana: "minor", suit: "pentacles",
    name: { en: "Three of Pentacles", zh: "錢幣三" },
    keywords: { en: ["teamwork", "collaboration", "learning", "implementation"], zh: ["團隊合作", "協作", "學習", "實施"] },
    upright: { en: "Teamwork, collaboration, learning, implementation. Working together skillfully — your expertise is valued and needed.", zh: "團隊合作、協作、學習、實施。巧妙地合作——你的專業受到重視和需要。" },
    reversed: { en: "Disharmony, misalignment, working alone, lack of teamwork. Poor collaboration or not pulling your weight.", zh: "不和諧、目標不一致、單打獨鬥、缺乏團隊合作。協作不佳或沒有盡到本分。" },
    image: "/assets/tarot/66-three-of-pentacles.png",
  },
  {
    id: 67, number: 4, arcana: "minor", suit: "pentacles",
    name: { en: "Four of Pentacles", zh: "錢幣四" },
    keywords: { en: ["saving money", "security", "conservatism", "scarcity", "control"], zh: ["儲蓄", "安全感", "保守", "匱乏", "控制"] },
    upright: { en: "Saving money, security, conservatism, scarcity, control. Holding on tight to what you have — sometimes too tight.", zh: "儲蓄、安全感、保守、匱乏、控制。緊緊握住你所擁有的——有時握得太緊了。" },
    reversed: { en: "Over-spending, greed, self-protection, release of control. Letting go of material attachment or being too loose with money.", zh: "過度消費、貪婪、自我保護、放下控制。放下對物質的執著，或花錢太隨意。" },
    image: "/assets/tarot/67-four-of-pentacles.png",
  },
  {
    id: 68, number: 5, arcana: "minor", suit: "pentacles",
    name: { en: "Five of Pentacles", zh: "錢幣五" },
    keywords: { en: ["financial loss", "poverty", "lack mindset", "isolation", "worry"], zh: ["財務損失", "貧困", "匱乏心態", "孤立", "擔憂"] },
    upright: { en: "Financial loss, poverty, lack mindset, isolation, worry. Hard times — but help is available if you're willing to ask.", zh: "財務損失、貧困、匱乏心態、孤立、擔憂。困難時期——但如果你願意開口，幫助就在那裡。" },
    reversed: { en: "Recovery from financial loss, spiritual poverty, overcoming adversity. Light at the end of the tunnel after hardship.", zh: "從財務損失中恢復、精神貧乏、克服逆境。艱難之後隧道盡頭的光。" },
    image: "/assets/tarot/68-five-of-pentacles.png",
  },
  {
    id: 69, number: 6, arcana: "minor", suit: "pentacles",
    name: { en: "Six of Pentacles", zh: "錢幣六" },
    keywords: { en: ["giving", "receiving", "sharing wealth", "generosity", "charity"], zh: ["給予", "接受", "分享財富", "慷慨", "慈善"] },
    upright: { en: "Giving, receiving, sharing wealth, generosity, charity. A balanced exchange of resources — both giving and receiving gracefully.", zh: "給予、接受、分享財富、慷慨、慈善。資源的平衡交換——優雅地給予和接受。" },
    reversed: { en: "Self-care, unpaid debts, one-sided charity. Giving with strings attached or creating dependency.", zh: "自我照顧、未償債務、單方面的施捨。帶有附加條件的給予，或造成依賴。" },
    image: "/assets/tarot/69-six-of-pentacles.png",
  },
  {
    id: 70, number: 7, arcana: "minor", suit: "pentacles",
    name: { en: "Seven of Pentacles", zh: "錢幣七" },
    keywords: { en: ["long-term view", "sustainable results", "perseverance", "investment"], zh: ["長遠眼光", "可持續結果", "堅持", "投資"] },
    upright: { en: "Long-term view, sustainable results, perseverance, investment. Patience pays off — your efforts are growing, even if slowly.", zh: "長遠眼光、可持續結果、堅持、投資。耐心會有回報——你的努力正在成長，即使緩慢。" },
    reversed: { en: "Lack of long-term vision, limited success, impatience. Wanting quick results or questioning if the effort is worth it.", zh: "缺乏長遠眼光、有限的成功、缺乏耐心。想要快速結果，或質疑努力是否值得。" },
    image: "/assets/tarot/70-seven-of-pentacles.png",
  },
  {
    id: 71, number: 8, arcana: "minor", suit: "pentacles",
    name: { en: "Eight of Pentacles", zh: "錢幣八" },
    keywords: { en: ["apprenticeship", "repetitive tasks", "mastery", "skill development"], zh: ["學徒", "重複任務", "精通", "技能發展"] },
    upright: { en: "Apprenticeship, repetitive tasks, mastery, skill development. Dedication to craft — every hour of practice brings mastery closer.", zh: "學徒階段、重複任務、精通、技能發展。專注於技藝——每一小時的練習都讓精通更近一步。" },
    reversed: { en: "Self-development, perfectionism, misdirected activity. Obsessing over details or investing in the wrong skills.", zh: "自我發展、完美主義、方向錯誤的活動。執著於細節，或投資在錯誤的技能上。" },
    image: "/assets/tarot/71-eight-of-pentacles.png",
  },
  {
    id: 72, number: 9, arcana: "minor", suit: "pentacles",
    name: { en: "Nine of Pentacles", zh: "錢幣九" },
    keywords: { en: ["abundance", "luxury", "self-sufficiency", "financial independence"], zh: ["豐盛", "奢華", "自給自足", "財務獨立"] },
    upright: { en: "Abundance, luxury, self-sufficiency, financial independence. You've earned this comfort — enjoy the fruits of your labor.", zh: "豐盛、奢華、自給自足、財務獨立。你贏得了這份舒適——享受你辛勞的成果。" },
    reversed: { en: "Self-worth issues, over-investment in work, hustling. Sacrificing personal life for material success.", zh: "自我價值問題、過度投入工作、忙碌奔波。為了物質成功犧牲個人生活。" },
    image: "/assets/tarot/72-nine-of-pentacles.png",
  },
  {
    id: 73, number: 10, arcana: "minor", suit: "pentacles",
    name: { en: "Ten of Pentacles", zh: "錢幣十" },
    keywords: { en: ["wealth", "financial security", "family", "long-term success", "contribution"], zh: ["財富", "財務安全", "家庭", "長期成功", "貢獻"] },
    upright: { en: "Wealth, financial security, family, long-term success, contribution. Legacy and lasting prosperity shared across generations.", zh: "財富、財務安全、家庭、長期成功、貢獻。跨越世代的遺產和持久繁榮。" },
    reversed: { en: "The dark side of wealth, financial failure or loss. Family disputes over money or questioning material values.", zh: "財富的黑暗面、財務失敗或損失。家庭因金錢產生糾紛，或質疑物質價值觀。" },
    image: "/assets/tarot/73-ten-of-pentacles.png",
  },
  {
    id: 74, number: 11, arcana: "minor", suit: "pentacles",
    name: { en: "Page of Pentacles", zh: "錢幣侍者" },
    keywords: { en: ["manifestation", "financial opportunity", "skill development"], zh: ["顯化", "財務機會", "技能發展"] },
    upright: { en: "Manifestation, financial opportunity, skill development. A new venture or study opportunity with practical potential.", zh: "顯化、財務機會、技能發展。一個具有實際潛力的新事業或學習機會。" },
    reversed: { en: "Lack of progress, procrastination, learn from failure. Plans that don't get off the ground or lacking practical skills.", zh: "缺乏進展、拖延、從失敗中學習。無法起步的計畫，或缺乏實際技能。" },
    image: "/assets/tarot/74-page-of-pentacles.png",
  },
  {
    id: 75, number: 12, arcana: "minor", suit: "pentacles",
    name: { en: "Knight of Pentacles", zh: "錢幣騎士" },
    keywords: { en: ["hard work", "productivity", "routine", "conservatism"], zh: ["辛勤工作", "生產力", "常規", "保守"] },
    upright: { en: "Hard work, productivity, routine, conservatism. Slow and steady wins the race — reliable, methodical progress.", zh: "辛勤工作、生產力、常規、保守。穩紮穩打——可靠的、有條不紊的進展。" },
    reversed: { en: "Self-discipline needed, boredom, feeling stuck, laziness. Being too rigid in your approach or losing motivation.", zh: "需要自律、無聊、感覺困住、懶惰。方法太僵化，或失去動力。" },
    image: "/assets/tarot/75-knight-of-pentacles.png",
  },
  {
    id: 76, number: 13, arcana: "minor", suit: "pentacles",
    name: { en: "Queen of Pentacles", zh: "錢幣皇后" },
    keywords: { en: ["nurturing", "practical", "providing financially", "working parent"], zh: ["滋養", "務實", "提供經濟支持", "職業父母"] },
    upright: { en: "Nurturing, practical, providing financially, a working parent. Creating a warm, abundant home while managing practical affairs.", zh: "滋養、務實、提供經濟支持、職業父母。在管理實際事務的同時創造溫暖富足的家。" },
    reversed: { en: "Financial independence threatened, self-care neglected, work-home imbalance. Losing touch with nature and simple pleasures.", zh: "財務獨立受威脅、忽視自我照顧、工作與家庭失衡。與大自然和簡單樂趣失去連結。" },
    image: "/assets/tarot/76-queen-of-pentacles.png",
  },
  {
    id: 77, number: 14, arcana: "minor", suit: "pentacles",
    name: { en: "King of Pentacles", zh: "錢幣國王" },
    keywords: { en: ["wealth", "business", "leadership", "security", "discipline", "abundance"], zh: ["財富", "商業", "領導力", "安全", "紀律", "豐盛"] },
    upright: { en: "Wealth, business, leadership, security, discipline, abundance. The master of material wealth — success through steady, disciplined effort.", zh: "財富、商業、領導力、安全、紀律、豐盛。物質財富的大師——通過穩定而有紀律的努力獲得成功。" },
    reversed: { en: "Financially inept, obsessed with wealth, stubborn. Greed, corruption, or valuing money over people.", zh: "財務能力不足、迷戀財富、固執。貪婪、腐敗，或重金錢輕人情。" },
    image: "/assets/tarot/77-king-of-pentacles.png",
  },
];

// ── Helpers ──

export function getTarotCard(id: number): TarotCard | undefined {
  return TAROT_CARDS.find((c) => c.id === id);
}

export function shuffleTarotDeck(): TarotCard[] {
  const deck = [...TAROT_CARDS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function getSuitInfo(suit: string) {
  return {
    element: SUIT_ELEMENT[suit] || "",
    timeframe: SUIT_TIMEFRAME[suit] || "",
  };
}

/** Get localized suit name */
export function getSuitLabel(suit: string, locale: string): string {
  const isZh = locale.startsWith("zh");
  const labels: Record<string, { en: string; zh: string }> = {
    wands: { en: "Wands", zh: "權杖" },
    cups: { en: "Cups", zh: "聖杯" },
    swords: { en: "Swords", zh: "寶劍" },
    pentacles: { en: "Pentacles", zh: "錢幣" },
  };
  return isZh ? labels[suit]?.zh ?? suit : labels[suit]?.en ?? suit;
}
