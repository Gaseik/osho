// ============================================
// 傳統韋特塔羅牌 (Rider-Waite Tarot)
// ============================================

export interface TarotCard {
  id: number
  name: { en: string; zh: string }
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  number: number
  keywords: { en: string[]; zh: string[] }
  upright: { en: string; zh: string }
  reversed: { en: string; zh: string }
  element?: string
  timeframe?: string
  image: string
}

// ============================================
// Major Arcana 大阿爾克那 (0–XXI)
// ============================================

export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: { en: 'The Fool', zh: '愚者' },
    arcana: 'major',
    number: 0,
    keywords: {
      en: ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
      zh: ['新的開始', '天真', '自發性', '自由靈魂'],
    },
    upright: {
      en: 'A fresh start is calling you — embrace the unknown with childlike wonder. Trust the journey even if you cannot see the destination. This is a time for bold leaps of faith and pure potential.',
      zh: '一個全新的開始正在召喚你——以赤子般的好奇擁抱未知。即使看不見終點，也請相信這段旅程。現在是大膽跨出信心之躍、釋放無限潛能的時刻。',
    },
    reversed: {
      en: 'You may be acting recklessly without considering the consequences, or holding back out of excessive fear. Naivety could be leading you into avoidable trouble. Pause and find the balance between courage and caution.',
      zh: '你可能正在不顧後果地魯莽行事，或者因過度恐懼而裹足不前。天真可能正將你帶入本可避免的麻煩中。停下來，在勇氣與謹慎之間找到平衡。',
    },
    element: 'Air',
    image: '/assets/tarot/major/the-fool.jpg',
  },
  {
    id: 1,
    name: { en: 'The Magician', zh: '魔術師' },
    arcana: 'major',
    number: 1,
    keywords: {
      en: ['willpower', 'manifestation', 'resourcefulness', 'skill'],
      zh: ['意志力', '顯化', '足智多謀', '技能'],
    },
    upright: {
      en: 'You have all the tools and talents you need — now is the time to act. Channel your focus and willpower to manifest your vision into reality. The universe is aligned to support your creative power.',
      zh: '你已擁有所需的一切工具與天賦——現在正是行動的時刻。集中你的專注力與意志力，將願景化為現實。宇宙正與你的創造力同頻共振。',
    },
    reversed: {
      en: 'Your talents may be scattered or misdirected, leading to wasted potential. Be wary of manipulation — either from others or your own tendency to deceive. Reconnect with your authentic intentions before proceeding.',
      zh: '你的才華可能過於分散或用錯方向，導致潛能被浪費。警惕操控——無論來自他人還是你自己的欺騙傾向。在繼續前進之前，重新連結你真正的意圖。',
    },
    element: 'Mercury',
    image: '/assets/tarot/major/the-magician.jpg',
  },
  {
    id: 2,
    name: { en: 'The High Priestess', zh: '女祭司' },
    arcana: 'major',
    number: 2,
    keywords: {
      en: ['intuition', 'mystery', 'subconscious', 'inner knowledge'],
      zh: ['直覺', '神祕', '潛意識', '內在智慧'],
    },
    upright: {
      en: 'Trust your intuition — the answers you seek lie within, not in the external world. A period of stillness and inner reflection will reveal hidden truths. Allow the mysteries to unfold in their own time.',
      zh: '相信你的直覺——你尋找的答案在內心，而非外在世界。一段靜心與內在反思的時期將揭示隱藏的真相。讓奧祕以它自己的節奏展開。',
    },
    reversed: {
      en: 'You may be ignoring your inner voice or suppressing your intuitive gifts. Secrets and hidden agendas could be clouding your judgement. It is time to withdraw from the noise and reconnect with your deeper knowing.',
      zh: '你可能正在忽視內在的聲音，或壓抑自己的直覺天賦。祕密與隱藏的意圖可能正在蒙蔽你的判斷力。是時候從喧囂中抽身，重新連結你更深層的覺知。',
    },
    element: 'Moon',
    image: '/assets/tarot/major/the-high-priestess.jpg',
  },
  {
    id: 3,
    name: { en: 'The Empress', zh: '皇后' },
    arcana: 'major',
    number: 3,
    keywords: {
      en: ['abundance', 'nurturing', 'fertility', 'nature', 'sensuality'],
      zh: ['豐盛', '滋養', '孕育', '自然', '感官之美'],
    },
    upright: {
      en: 'Abundance is flowing into your life — open your arms to receive it. This is a fertile period for creativity, relationships, and personal growth. Nurture yourself and others with compassion and generosity.',
      zh: '豐盛正流入你的生命——張開雙臂去接受它。這是一個充滿創造力、關係成長與個人成長的肥沃時期。以慈悲與慷慨滋養自己和他人。',
    },
    reversed: {
      en: 'You may be neglecting self-care or feeling creatively blocked and emotionally drained. Over-dependence on others for validation is holding you back. Reconnect with nature and your own body to restore your inner vitality.',
      zh: '你可能正忽略自我照顧，感到創造力枯竭、情感耗盡。過度依賴他人的認可正在拖住你的腳步。重新與自然和你的身體連結，恢復內在的活力。',
    },
    element: 'Venus',
    image: '/assets/tarot/major/the-empress.jpg',
  },
  {
    id: 4,
    name: { en: 'The Emperor', zh: '皇帝' },
    arcana: 'major',
    number: 4,
    keywords: {
      en: ['authority', 'structure', 'stability', 'leadership'],
      zh: ['權威', '結構', '穩定', '領導力'],
    },
    upright: {
      en: 'Take command of your situation with discipline and clear-headed strategy. A solid foundation and structured approach will bring lasting results. You have the authority and experience to lead — step into that role with confidence.',
      zh: '以紀律和清晰的策略掌控你的局面。穩固的基礎和有條理的方法將帶來持久的成果。你擁有足夠的權威與經驗來領導——自信地承擔這個角色。',
    },
    reversed: {
      en: 'Rigid control or authoritarian behaviour is creating resistance and resentment. You may be clinging to power out of insecurity rather than genuine strength. Consider whether your need for order has become a prison for yourself or others.',
      zh: '僵化的控制或專制的行為正在製造阻力與怨恨。你可能出於不安全感而非真正的力量在緊抓權力不放。想想你對秩序的需求是否已成為自己或他人的牢籠。',
    },
    element: 'Aries',
    image: '/assets/tarot/major/the-emperor.jpg',
  },
  {
    id: 5,
    name: { en: 'The Hierophant', zh: '教皇' },
    arcana: 'major',
    number: 5,
    keywords: {
      en: ['tradition', 'spiritual wisdom', 'conformity', 'mentorship'],
      zh: ['傳統', '靈性智慧', '遵循', '導師'],
    },
    upright: {
      en: 'Seek guidance from established traditions, a mentor, or a spiritual practice. There is wisdom in the teachings that have stood the test of time. Shared values and community can provide the support you need right now.',
      zh: '從既有的傳統、一位導師或靈性修行中尋求指引。經受住時間考驗的教導中蘊藏著智慧。共同的價值觀與社群能提供你現在所需的支持。',
    },
    reversed: {
      en: 'Blind conformity or outdated dogma may be stifling your personal truth. Question the rules and belief systems you have inherited — not everything passed down is meant for you. It may be time to find your own spiritual path.',
      zh: '盲目的順從或過時的教條可能正在壓抑你個人的真理。質疑你所繼承的規則與信仰體系——並非所有傳承下來的東西都適合你。也許是時候尋找屬於你自己的靈性道路了。',
    },
    element: 'Taurus',
    image: '/assets/tarot/major/the-hierophant.jpg',
  },
  {
    id: 6,
    name: { en: 'The Lovers', zh: '戀人' },
    arcana: 'major',
    number: 6,
    keywords: {
      en: ['love', 'harmony', 'partnership', 'choices', 'values'],
      zh: ['愛情', '和諧', '伴侶關係', '選擇', '價值觀'],
    },
    upright: {
      en: 'A meaningful connection or important choice stands before you. Align your actions with your deepest values and let love — in all its forms — guide your decision. True union begins with being honest about what your heart truly wants.',
      zh: '一段深刻的連結或重要的抉擇正擺在你面前。讓你的行動與最深層的價值觀一致，讓愛——以它的各種形式——引導你的決定。真正的合一始於對內心真正渴望的坦誠。',
    },
    reversed: {
      en: 'Disharmony in a relationship or inner conflict about a difficult choice is weighing on you. You may be avoiding a necessary decision or compromising your values to keep the peace. Honest self-reflection is needed before you can move forward.',
      zh: '關係中的不和諧或對一個艱難選擇的內在衝突正壓在你心頭。你可能正在逃避一個必要的決定，或為了維持和平而妥協自己的價值觀。在前進之前，你需要誠實的自我反思。',
    },
    element: 'Gemini',
    image: '/assets/tarot/major/the-lovers.jpg',
  },
  {
    id: 7,
    name: { en: 'The Chariot', zh: '戰車' },
    arcana: 'major',
    number: 7,
    keywords: {
      en: ['determination', 'willpower', 'victory', 'control'],
      zh: ['決心', '意志力', '勝利', '掌控'],
    },
    upright: {
      en: 'Harness your willpower and charge forward with unwavering determination. Opposing forces can be overcome when you maintain focus and inner discipline. Victory is within reach — stay the course and trust your ability to steer through obstacles.',
      zh: '駕馭你的意志力，以堅定不移的決心向前衝鋒。當你保持專注與內在紀律時，對立的力量可以被克服。勝利就在眼前——堅持到底，相信你駕馭障礙的能力。',
    },
    reversed: {
      en: 'You may feel pulled in opposing directions, unable to gain momentum. Aggression or a need to control every outcome is leading to burnout. Ease up on the reins — true strength sometimes means knowing when to pause and recalibrate.',
      zh: '你可能感到被拉向相反的方向，無法獲得前進的動力。侵略性或控制每個結果的需求正導致你精疲力竭。鬆開韁繩——真正的力量有時意味著知道何時該暫停並重新校準。',
    },
    element: 'Cancer',
    image: '/assets/tarot/major/the-chariot.jpg',
  },
  {
    id: 8,
    name: { en: 'Strength', zh: '力量' },
    arcana: 'major',
    number: 8,
    keywords: {
      en: ['inner strength', 'courage', 'patience', 'compassion'],
      zh: ['內在力量', '勇氣', '耐心', '慈悲'],
    },
    upright: {
      en: 'True strength is not brute force — it is the quiet courage to face your fears with grace. Approach challenges with patience and compassion, and you will find you are far more resilient than you thought. Gentle persistence will tame even the fiercest obstacles.',
      zh: '真正的力量不是蠻力——而是以優雅面對恐懼的沉靜勇氣。以耐心和慈悲面對挑戰，你會發現自己遠比想像中更有韌性。溫柔的堅持能馴服最兇猛的障礙。',
    },
    reversed: {
      en: 'Self-doubt is undermining your confidence, or raw emotions are getting the better of you. You may be forcing situations instead of allowing natural resolution. Reconnect with your inner resilience — the strength you need has never left you.',
      zh: '自我懷疑正在侵蝕你的信心，或者原始的情緒正在壓倒你。你可能在強迫事情發展而非允許自然解決。重新連結你內在的韌性——你需要的力量從未離開過你。',
    },
    element: 'Leo',
    image: '/assets/tarot/major/strength.jpg',
  },
  {
    id: 9,
    name: { en: 'The Hermit', zh: '隱者' },
    arcana: 'major',
    number: 9,
    keywords: {
      en: ['solitude', 'introspection', 'inner guidance', 'wisdom'],
      zh: ['獨處', '內省', '內在指引', '智慧'],
    },
    upright: {
      en: 'Step away from the noise and seek the answers that only solitude can provide. This is a period for deep introspection and soul-searching, not social performance. The lantern you carry within can illuminate truths that the outside world cannot.',
      zh: '遠離喧囂，尋找唯有獨處才能提供的答案。這是一段深度內省和靈魂探索的時期，而非社交表演的時候。你內在攜帶的燈籠能照亮外在世界無法揭示的真理。',
    },
    reversed: {
      en: 'Isolation has gone too far — withdrawal is becoming avoidance rather than healing. You may be refusing help or cutting yourself off from meaningful connections. Wisdom requires solitude, but not at the cost of losing touch with the world entirely.',
      zh: '孤立已經走得太遠——退縮正在變成逃避而非療癒。你可能在拒絕幫助或切斷與有意義連結的橋梁。智慧需要獨處，但不應以完全失去與世界的聯繫為代價。',
    },
    element: 'Virgo',
    image: '/assets/tarot/major/the-hermit.jpg',
  },
  {
    id: 10,
    name: { en: 'Wheel of Fortune', zh: '命運之輪' },
    arcana: 'major',
    number: 10,
    keywords: {
      en: ['cycles', 'destiny', 'turning point', 'luck', 'change'],
      zh: ['循環', '命運', '轉捩點', '運氣', '變化'],
    },
    upright: {
      en: 'The wheel is turning in your favour — a significant shift or stroke of good fortune is on the way. Embrace change as a natural part of life\'s rhythm. What goes around comes around, and this cycle brings expansion and opportunity.',
      zh: '命運之輪正朝對你有利的方向轉動——一次重大的轉變或好運即將到來。擁抱變化，將它視為生命節奏的自然部分。因果輪迴，這個週期帶來擴展與機遇。',
    },
    reversed: {
      en: 'You may feel caught in a streak of bad luck or stuck in a repeating cycle that you cannot break. Resisting the natural ebb and flow of life only deepens the struggle. Accept what you cannot control and look for the lesson hidden within the setback.',
      zh: '你可能感到陷入一連串的厄運中，或困在一個無法打破的重複循環裡。抗拒生命的自然潮起潮落只會加深掙扎。接受你無法控制的，尋找隱藏在挫折中的功課。',
    },
    element: 'Jupiter',
    image: '/assets/tarot/major/wheel-of-fortune.jpg',
  },
  {
    id: 11,
    name: { en: 'Justice', zh: '正義' },
    arcana: 'major',
    number: 11,
    keywords: {
      en: ['fairness', 'truth', 'accountability', 'law', 'clarity'],
      zh: ['公正', '真相', '責任', '法律', '清晰'],
    },
    upright: {
      en: 'Truth and fairness will prevail — actions have consequences, and the scales are being balanced. Take responsibility for your choices and approach decisions with honesty and integrity. Clarity of mind will guide you toward the just outcome.',
      zh: '真相與公正終將到來——行為都有後果，天秤正在恢復平衡。為你的選擇負起責任，以誠實和正直面對每一個決定。心智的清明將引導你走向公正的結果。',
    },
    reversed: {
      en: 'Dishonesty, unfairness, or a refusal to accept accountability is creating imbalance. You may be avoiding a truth that is uncomfortable but necessary. Examine where bias or self-deception is clouding your judgement and seek to restore integrity.',
      zh: '不誠實、不公平或拒絕承擔責任正在造成失衡。你可能正在迴避一個令人不舒服但必要的真相。檢視偏見或自我欺騙在哪裡蒙蔽了你的判斷，並努力恢復正直。',
    },
    element: 'Libra',
    image: '/assets/tarot/major/justice.jpg',
  },
  {
    id: 12,
    name: { en: 'The Hanged Man', zh: '倒吊人' },
    arcana: 'major',
    number: 12,
    keywords: {
      en: ['surrender', 'new perspective', 'letting go', 'sacrifice'],
      zh: ['臣服', '新視角', '放下', '犧牲'],
    },
    upright: {
      en: 'Surrender the need to control and allow a new perspective to emerge. This pause is not wasted time — it is a sacred interval of transformation. By letting go of what you think you know, you open the door to deeper understanding.',
      zh: '放下控制的需要，讓新的視角自然浮現。這段暫停不是浪費時間——而是一段神聖的轉化間隔。放下你以為自己知道的一切，你就打開了通往更深理解的大門。',
    },
    reversed: {
      en: 'You are resisting a necessary pause or clinging to a situation that no longer serves you. Stalling and indecision are draining your energy without producing results. The sacrifice you are avoiding may be exactly what sets you free.',
      zh: '你正在抗拒一個必要的暫停，或緊抓著一個不再對你有益的處境不放。拖延和猶豫不決正在耗盡你的能量卻毫無成果。你正在迴避的犧牲可能恰恰是能讓你自由的事。',
    },
    element: 'Water',
    image: '/assets/tarot/major/the-hanged-man.jpg',
  },
  {
    id: 13,
    name: { en: 'Death', zh: '死神' },
    arcana: 'major',
    number: 13,
    keywords: {
      en: ['transformation', 'endings', 'rebirth', 'transition'],
      zh: ['轉化', '結束', '重生', '過渡'],
    },
    upright: {
      en: 'A chapter is closing to make room for profound transformation. This ending, though it may feel painful, is clearing the way for renewal and rebirth. Embrace the change — what emerges on the other side will be more authentic than what you are leaving behind.',
      zh: '一個篇章正在關閉，為深刻的轉化騰出空間。這個結束雖然可能令人痛苦，卻在為新生與重生清出道路。擁抱這個變化——在另一端出現的，將比你正在離開的更加真實。',
    },
    reversed: {
      en: 'You are clinging to the past and resisting an inevitable transformation. Fear of the unknown is keeping you trapped in stagnation. Until you release what has already ended, the new life waiting for you cannot begin.',
      zh: '你正緊抓著過去不放，抗拒一個不可避免的轉化。對未知的恐懼讓你困在停滯之中。在你釋放已經結束的事物之前，等待你的新生活無法開始。',
    },
    element: 'Scorpio',
    image: '/assets/tarot/major/death.jpg',
  },
  {
    id: 14,
    name: { en: 'Temperance', zh: '節制' },
    arcana: 'major',
    number: 14,
    keywords: {
      en: ['balance', 'moderation', 'harmony', 'patience', 'healing'],
      zh: ['平衡', '節制', '和諧', '耐心', '療癒'],
    },
    upright: {
      en: 'Seek the middle path — balance and moderation will bring the harmony you need. Blending opposing forces with patience and care creates something greater than the sum of its parts. Trust the process of gradual healing and integration.',
      zh: '尋找中庸之道——平衡與節制將帶來你需要的和諧。以耐心和用心融合對立的力量，能創造出超越各部分總和的事物。相信漸進療癒與整合的過程。',
    },
    reversed: {
      en: 'Excess or imbalance is throwing your life out of alignment. You may be overindulging, overworking, or swinging between extremes. Restore equilibrium by slowing down and paying attention to where you are pushing too hard or neglecting yourself.',
      zh: '過度或失衡正在讓你的生活偏離軌道。你可能在過度放縱、過度工作，或在兩個極端之間搖擺。通過放慢腳步，注意你在哪些方面用力過猛或忽略自己，來恢復平衡。',
    },
    element: 'Sagittarius',
    image: '/assets/tarot/major/temperance.jpg',
  },
  {
    id: 15,
    name: { en: 'The Devil', zh: '惡魔' },
    arcana: 'major',
    number: 15,
    keywords: {
      en: ['bondage', 'shadow self', 'attachment', 'materialism'],
      zh: ['束縛', '陰暗面', '執著', '物質主義'],
    },
    upright: {
      en: 'An unhealthy attachment or pattern is keeping you chained, but the bonds are looser than you think. Face your shadow side honestly — addiction, obsession, or toxic dynamics lose their power once they are brought into the light. You hold the key to your own liberation.',
      zh: '一個不健康的依附或模式正將你束縛，但這些鎖鏈比你以為的更鬆。誠實面對你的陰暗面——成癮、執念或有毒的關係動態一旦被帶到光中，就會失去力量。你握有自己解放的鑰匙。',
    },
    reversed: {
      en: 'You are beginning to break free from limiting patterns and reclaim your power. An awareness of what has been controlling you is emerging, offering a chance at genuine freedom. Do not let guilt over past choices prevent you from stepping into the light.',
      zh: '你正開始掙脫限制性的模式，重新奪回你的力量。你開始意識到什麼一直在控制你，這為真正的自由提供了機會。不要讓對過去選擇的內疚阻止你走向光明。',
    },
    element: 'Capricorn',
    image: '/assets/tarot/major/the-devil.jpg',
  },
  {
    id: 16,
    name: { en: 'The Tower', zh: '高塔' },
    arcana: 'major',
    number: 16,
    keywords: {
      en: ['upheaval', 'sudden change', 'revelation', 'awakening'],
      zh: ['劇變', '突變', '揭示', '覺醒'],
    },
    upright: {
      en: 'A sudden upheaval is shattering structures that were built on unstable ground. Though the destruction feels shocking, it is clearing away illusions so that something more truthful can be built. This disruption is a fierce form of liberation.',
      zh: '一場突如其來的劇變正在摧毀建立在不穩固基礎上的結構。雖然這場破壞令人震驚，但它正在清除幻象，讓更真實的東西得以建立。這場動盪是一種猛烈的解放形式。',
    },
    reversed: {
      en: 'You may be resisting a necessary collapse or living in denial about a crumbling foundation. Prolonging the inevitable only increases the eventual impact. Alternatively, you have already weathered the storm and are beginning the slow work of rebuilding.',
      zh: '你可能正在抗拒一場必要的崩塌，或對正在瓦解的基礎視而不見。拖延不可避免的事只會增加最終的衝擊。或者，你已經經歷了風暴，正開始緩慢的重建工作。',
    },
    element: 'Mars',
    image: '/assets/tarot/major/the-tower.jpg',
  },
  {
    id: 17,
    name: { en: 'The Star', zh: '星星' },
    arcana: 'major',
    number: 17,
    keywords: {
      en: ['hope', 'renewal', 'inspiration', 'serenity', 'faith'],
      zh: ['希望', '重生', '靈感', '寧靜', '信念'],
    },
    upright: {
      en: 'After the storm comes the calm — hope and healing are pouring into your life. This is a time of renewal, inspiration, and quiet faith in the future. Let yourself be vulnerable and open; the universe is offering you a moment of grace.',
      zh: '暴風雨過後是平靜——希望與療癒正湧入你的生命。這是一段重生、靈感迸發、對未來懷抱寧靜信念的時期。讓自己脆弱而開放；宇宙正在贈予你一個恩典的時刻。',
    },
    reversed: {
      en: 'Despair or disillusionment has dimmed your sense of hope. You may feel disconnected from your purpose or unable to see a way forward. The light has not gone out — it is only hidden behind the clouds of your current pain. Keep looking up.',
      zh: '絕望或幻滅感已黯淡了你的希望之光。你可能感到與自己的目標脫節，或看不到前方的路。光芒並未熄滅——它只是被你當前的痛苦烏雲所遮蔽。繼續抬頭望。',
    },
    element: 'Aquarius',
    image: '/assets/tarot/major/the-star.jpg',
  },
  {
    id: 18,
    name: { en: 'The Moon', zh: '月亮' },
    arcana: 'major',
    number: 18,
    keywords: {
      en: ['illusion', 'fear', 'subconscious', 'anxiety', 'dreams'],
      zh: ['幻象', '恐懼', '潛意識', '焦慮', '夢境'],
    },
    upright: {
      en: 'Things are not as they seem — illusions, fears, and subconscious projections are clouding your perception. Navigate this uncertain terrain with heightened intuition rather than logic alone. Pay attention to your dreams and emotional undercurrents; they carry important messages.',
      zh: '事情並非表面所見——幻象、恐懼和潛意識的投射正在蒙蔽你的認知。以提升的直覺而非單純的邏輯來穿越這片不確定的地帶。關注你的夢境和情緒暗流；它們攜帶著重要的訊息。',
    },
    reversed: {
      en: 'Confusion is beginning to clear as repressed fears and anxieties come to the surface. What once felt overwhelming is losing its power over you. Trust that the truth is gradually being revealed, even if the full picture is not yet visible.',
      zh: '隨著被壓抑的恐懼與焦慮浮出水面，困惑正在開始消散。曾經令你不堪承受的事物正在失去對你的控制力。相信真相正在逐漸被揭示，即使全貌還未完全可見。',
    },
    element: 'Pisces',
    image: '/assets/tarot/major/the-moon.jpg',
  },
  {
    id: 19,
    name: { en: 'The Sun', zh: '太陽' },
    arcana: 'major',
    number: 19,
    keywords: {
      en: ['joy', 'success', 'vitality', 'positivity', 'clarity'],
      zh: ['喜悅', '成功', '活力', '正面能量', '清晰'],
    },
    upright: {
      en: 'Radiant joy and success are illuminating your path. This is one of the most positive cards in the deck — warmth, clarity, and vitality surround you. Celebrate your achievements and let your authentic self shine without reservation.',
      zh: '燦爛的喜悅與成功正照亮你的道路。這是整副牌中最正面的牌之一——溫暖、清晰與活力環繞著你。慶祝你的成就，毫無保留地讓真實的自己發光。',
    },
    reversed: {
      en: 'Your inner light is temporarily dimmed — perhaps by self-doubt, burnout, or a setback that shook your confidence. The joy is still there beneath the surface, waiting to be reclaimed. Address what is blocking your radiance and give yourself permission to shine again.',
      zh: '你內在的光芒暫時黯淡了——也許是因為自我懷疑、倦怠，或一個動搖了你信心的挫折。喜悅仍在表面之下，等待被重新找回。處理阻擋你光芒的事物，允許自己再次閃耀。',
    },
    element: 'Sun',
    image: '/assets/tarot/major/the-sun.jpg',
  },
  {
    id: 20,
    name: { en: 'Judgement', zh: '審判' },
    arcana: 'major',
    number: 20,
    keywords: {
      en: ['rebirth', 'calling', 'reckoning', 'reflection', 'absolution'],
      zh: ['重生', '召喚', '清算', '反思', '赦免'],
    },
    upright: {
      en: 'A powerful awakening or calling is rising from within. It is time to take stock of your past, release old guilt, and answer the summons of your higher purpose. This is a moment of profound self-evaluation that leads to rebirth and transformation.',
      zh: '一股強大的覺醒或召喚正從內在升起。是時候回顧過去、釋放舊有的愧疚，回應更高目標的召喚了。這是一個深刻自我評估的時刻，將引領你走向重生與蛻變。',
    },
    reversed: {
      en: 'You may be avoiding honest self-reflection or ignoring an inner calling out of fear of change. Harsh self-judgement or lingering regret is preventing you from moving forward. Forgive yourself for past missteps and allow the process of renewal to begin.',
      zh: '你可能正在逃避誠實的自我反思，或因害怕改變而忽視內在的召喚。嚴苛的自我批判或揮之不去的遺憾正在阻止你向前。原諒自己過去的失誤，讓更新的過程開始吧。',
    },
    element: 'Pluto',
    image: '/assets/tarot/major/judgement.jpg',
  },
  {
    id: 21,
    name: { en: 'The World', zh: '世界' },
    arcana: 'major',
    number: 21,
    keywords: {
      en: ['completion', 'fulfilment', 'wholeness', 'integration', 'achievement'],
      zh: ['完成', '圓滿', '整體', '整合', '成就'],
    },
    upright: {
      en: 'A grand cycle is reaching its triumphant conclusion — you have arrived. Celebrate the fulfilment of a long journey and the wholeness you have cultivated along the way. The world is open to you; savour this moment of completion before the next adventure begins.',
      zh: '一個宏大的循環正在迎來它凱旋的結局——你到達了。慶祝一段漫長旅程的圓滿，以及你在途中培養的完整。世界向你敞開；在下一段冒險開始之前，好好品味這個完成的時刻。',
    },
    reversed: {
      en: 'You are so close to completion, yet something feels unfinished or unresolved. Shortcuts taken earlier may be catching up with you, or you may be struggling to find closure. Tie up the loose ends with care — the final steps matter as much as the first.',
      zh: '你離完成如此之近，但某些事情感覺尚未了結或未解決。之前走的捷徑可能正在追上你，或者你正在努力尋找結束。仔細收尾——最後幾步與最初的同樣重要。',
    },
    element: 'Saturn',
    image: '/assets/tarot/major/the-world.jpg',
  },
]

// ============================================
// Minor Arcana — Wands 權杖 (22–35)
// ============================================

export const wandsCards: TarotCard[] = [
  {
    id: 22,
    name: { en: 'Ace of Wands', zh: '權杖王牌' },
    arcana: 'minor',
    suit: 'wands',
    number: 1,
    keywords: {
      en: ['inspiration', 'new opportunity', 'creative spark', 'potential'],
      zh: ['靈感', '新機會', '創意火花', '潛能'],
    },
    upright: {
      en: 'A bold new opportunity is igniting your passion — seize it before the flame fades. Creative energy is surging through you, urging you to begin something meaningful. Trust the spark; this is the seed of something powerful.',
      zh: '一個大膽的新機會正在點燃你的熱情——趁火焰未滅之前抓住它。創造力正在你體內湧動，催促你開始某件有意義的事。相信這道火花；這是某個強大事物的種子。',
    },
    reversed: {
      en: 'A promising idea is stalling because of hesitation or poor timing. You may feel creatively frustrated, unable to channel your energy into anything concrete. Revisit your motivations — the spark is still there, but it needs the right conditions to catch fire.',
      zh: '一個充滿前景的想法因猶豫或時機不佳而停滯不前。你可能感到創造力受阻，無法將能量導入任何具體的事物。重新審視你的動機——火花仍在，但它需要合適的條件才能燃起。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/ace-of-wands.jpg',
  },
  {
    id: 23,
    name: { en: 'Two of Wands', zh: '權杖二' },
    arcana: 'minor',
    suit: 'wands',
    number: 2,
    keywords: {
      en: ['planning', 'future vision', 'decision', 'discovery'],
      zh: ['規劃', '未來願景', '決定', '探索'],
    },
    upright: {
      en: 'You stand at a crossroads with the world spread before you — it is time to plan your next move. Your vision extends beyond the familiar; dare to explore uncharted territory. Make a decision and commit to it; waiting will only shrink your options.',
      zh: '你站在十字路口，世界在你面前展開——是時候規劃下一步了。你的視野已超越熟悉的範圍；敢於探索未知的領域。做出決定並全力投入；等待只會讓你的選擇越來越少。',
    },
    reversed: {
      en: 'Fear of the unknown is keeping you confined to your comfort zone. You may be overthinking your options to the point of paralysis, or a lack of long-term vision is leaving you directionless. Step back and clarify what you truly want before the window closes.',
      zh: '對未知的恐懼讓你困在舒適圈裡。你可能過度思考各種選項而導致癱瘓，或者缺乏長期願景讓你失去方向。在窗口關閉之前退後一步，釐清你真正想要的是什麼。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/two-of-wands.jpg',
  },
  {
    id: 24,
    name: { en: 'Three of Wands', zh: '權杖三' },
    arcana: 'minor',
    suit: 'wands',
    number: 3,
    keywords: {
      en: ['expansion', 'foresight', 'progress', 'opportunity abroad'],
      zh: ['擴展', '遠見', '進展', '海外機會'],
    },
    upright: {
      en: 'Your early efforts are bearing fruit and the horizon is expanding. Opportunities from unexpected directions — perhaps even overseas — are heading your way. Keep your eyes on the bigger picture; momentum is building and your ships are coming in.',
      zh: '你早期的努力正在結出果實，視野正在擴展。來自意想不到方向的機會——甚至可能來自海外——正朝你而來。放眼更大的格局；動能正在積累，你的船正駛來。',
    },
    reversed: {
      en: 'Delays and setbacks are testing your patience, and plans that looked promising are hitting obstacles. You may be playing it too safe or failing to adapt when circumstances shift. Reevaluate your strategy rather than stubbornly pushing the original plan.',
      zh: '延遲和挫折正在考驗你的耐心，看起來很有前景的計畫正遇到阻礙。你可能過於保守，或在情勢轉變時未能及時調整。重新評估你的策略，而非固執地推進原來的計畫。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/three-of-wands.jpg',
  },
  {
    id: 25,
    name: { en: 'Four of Wands', zh: '權杖四' },
    arcana: 'minor',
    suit: 'wands',
    number: 4,
    keywords: {
      en: ['celebration', 'homecoming', 'harmony', 'milestone'],
      zh: ['慶祝', '歸來', '和諧', '里程碑'],
    },
    upright: {
      en: 'A joyful milestone deserves to be celebrated — gather with those who matter and honour how far you have come. Stability and harmony are gracing your home and community. This is a moment of well-earned pride; let gratitude fill the space.',
      zh: '一個喜悅的里程碑值得慶祝——與重要的人相聚，向你走過的路致敬。穩定與和諧正降臨在你的家庭和社群。這是一個當之無愧的驕傲時刻；讓感恩充滿這個空間。',
    },
    reversed: {
      en: 'Tension beneath the surface is disrupting what should be a harmonious time. A celebration may feel hollow, or a sense of not belonging is nagging at you. Look at what needs to be addressed in your personal foundations before you can truly relax.',
      zh: '表面之下的緊張正在擾亂本應和諧的時光。一場慶祝可能感覺空洞，或一種不屬於此地的感覺在啃噬你。在你能真正放鬆之前，看看你的個人根基有什麼需要處理的。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/four-of-wands.jpg',
  },
  {
    id: 26,
    name: { en: 'Five of Wands', zh: '權杖五' },
    arcana: 'minor',
    suit: 'wands',
    number: 5,
    keywords: {
      en: ['conflict', 'competition', 'tension', 'disagreement'],
      zh: ['衝突', '競爭', '緊張', '分歧'],
    },
    upright: {
      en: 'Clashing egos and competing agendas are creating chaos — but this friction can be productive if channelled well. Healthy competition sharpens your skills and reveals your true priorities. Engage with the challenge rather than avoiding it; growth lives on the other side of discomfort.',
      zh: '相互碰撞的自尊和競爭的議程正在製造混亂——但如果引導得當，這種摩擦可以是有建設性的。良性競爭能磨練你的技能，揭示你真正的優先順序。迎接挑戰而非逃避它；成長就在不適的另一端。',
    },
    reversed: {
      en: 'You may be avoiding necessary confrontation or, conversely, escalating petty disputes into full-blown battles. The energy spent on internal bickering is draining everyone involved. Seek common ground and redirect the group\'s fire toward a shared goal.',
      zh: '你可能正在迴避必要的對峙，或者相反地，將瑣碎的爭執升級為全面的戰爭。花在內部爭吵上的精力正在耗盡所有相關的人。尋找共識，將團體的火焰重新導向共同的目標。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/five-of-wands.jpg',
  },
  {
    id: 27,
    name: { en: 'Six of Wands', zh: '權杖六' },
    arcana: 'minor',
    suit: 'wands',
    number: 6,
    keywords: {
      en: ['victory', 'recognition', 'success', 'public acclaim'],
      zh: ['勝利', '認可', '成功', '公眾讚譽'],
    },
    upright: {
      en: 'Victory is yours and others are taking notice — accept the recognition you have earned with grace. Your confidence and persistence have paid off, and this success boosts your momentum. Enjoy the spotlight, but remember that true leadership inspires others to rise as well.',
      zh: '勝利屬於你，旁人也注意到了——優雅地接受你贏得的認可。你的自信和堅持已經得到回報，這次成功為你增添了動力。享受聚光燈，但記住真正的領導力是激勵他人一同崛起。',
    },
    reversed: {
      en: 'The applause you expected has not arrived, or success feels empty despite outward appearances. Self-doubt may be undermining your achievements, or you are seeking validation from the wrong audience. Define success on your own terms instead of measuring it by others\' approval.',
      zh: '你期待的掌聲遲遲未來，或者儘管表面上一切光鮮，成功卻感覺空洞。自我懷疑可能正在削弱你的成就，或者你正從錯誤的對象尋求認可。用你自己的標準定義成功，而非以他人的認可來衡量。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/six-of-wands.jpg',
  },
  {
    id: 28,
    name: { en: 'Seven of Wands', zh: '權杖七' },
    arcana: 'minor',
    suit: 'wands',
    number: 7,
    keywords: {
      en: ['defiance', 'perseverance', 'standing ground', 'courage'],
      zh: ['抵抗', '堅持', '堅守立場', '勇氣'],
    },
    upright: {
      en: 'Others are challenging your position, but you have the high ground — hold it. This is not the time to back down; your convictions are worth defending. The pressure you feel is proof that what you have built matters enough to be contested.',
      zh: '他人正在挑戰你的位置，但你佔據了有利地形——守住它。現在不是退縮的時候；你的信念值得捍衛。你感受到的壓力恰恰證明你所建立的東西足夠重要，才會被質疑。',
    },
    reversed: {
      en: 'Constant defensiveness is wearing you down, and you may be fighting battles that are no longer worth the cost. Consider whether stubbornness has replaced strategic thinking. Sometimes the bravest move is knowing when to step aside and conserve your energy for what truly matters.',
      zh: '持續的防禦姿態正在消耗你，你可能在打一些不再值得代價的仗。想想固執是否已經取代了戰略性思考。有時最勇敢的舉動是知道何時退開，把精力留給真正重要的事。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/seven-of-wands.jpg',
  },
  {
    id: 29,
    name: { en: 'Eight of Wands', zh: '權杖八' },
    arcana: 'minor',
    suit: 'wands',
    number: 8,
    keywords: {
      en: ['swift action', 'momentum', 'rapid progress', 'movement'],
      zh: ['迅速行動', '動能', '快速進展', '移動'],
    },
    upright: {
      en: 'Events are accelerating rapidly — the waiting is over and things are falling into place. Strike while the iron is hot; delays and overthinking will only slow a momentum that is working in your favour. Messages, travel, or breakthroughs may arrive sooner than expected.',
      zh: '事情正在飛速發展——等待已經結束，一切都在就位。趁熱打鐵；拖延和過度思考只會減緩正在對你有利的動能。訊息、旅行或突破可能比預期更早到來。',
    },
    reversed: {
      en: 'Frustrating delays are slowing progress that should be swift. Miscommunication, cancelled plans, or a sense of being stuck in limbo is testing your patience. Rather than forcing the pace, use this pause to double-check the direction — speed without clarity leads to wrong destinations.',
      zh: '令人沮喪的延遲正在拖慢本應迅速的進展。溝通不良、計畫取消或困在不上不下的狀態正在考驗你的耐心。與其強迫進度，不如利用這個停頓重新確認方向——沒有清晰目標的速度只會通往錯誤的終點。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/eight-of-wands.jpg',
  },
  {
    id: 30,
    name: { en: 'Nine of Wands', zh: '權杖九' },
    arcana: 'minor',
    suit: 'wands',
    number: 9,
    keywords: {
      en: ['resilience', 'persistence', 'last stand', 'boundaries'],
      zh: ['韌性', '堅持不懈', '最後防線', '界線'],
    },
    upright: {
      en: 'You have been through the fire and you are still standing — do not give up now when the finish line is so close. Your scars are proof of your resilience, not your weakness. Set firm boundaries to protect what you have fought so hard to build.',
      zh: '你已經歷過烈火的考驗而依然屹立——不要在終點線如此接近時放棄。你的傷疤是你韌性的證明，而非軟弱。設立堅定的界線來保護你奮力建立的一切。',
    },
    reversed: {
      en: 'Exhaustion and paranoia are clouding your judgement — you are seeing threats where none exist. The walls you have built for protection have become a prison. It is time to lay down the defensive posture and accept that not every situation requires a fight.',
      zh: '疲憊和多疑正蒙蔽你的判斷力——你在沒有威脅的地方看到了威脅。你為了保護自己而築起的牆已經變成了牢籠。是時候放下防禦姿態，接受並非每個情況都需要戰鬥。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/nine-of-wands.jpg',
  },
  {
    id: 31,
    name: { en: 'Ten of Wands', zh: '權杖十' },
    arcana: 'minor',
    suit: 'wands',
    number: 10,
    keywords: {
      en: ['burden', 'overwhelm', 'responsibility', 'hard work'],
      zh: ['重擔', '不堪負荷', '責任', '辛勞'],
    },
    upright: {
      en: 'You are carrying more than your fair share and the weight is beginning to show. Success has come, but at the cost of joy — the load must be redistributed or released. Delegate, prioritise, or set something down before your back breaks.',
      zh: '你承擔了超出你應有份量的重擔，壓力開始顯現。成功來了，但代價是失去喜悅——負荷必須重新分配或釋放。在你不堪承受之前，委派任務、排定優先順序，或放下某些東西。',
    },
    reversed: {
      en: 'You are beginning to recognise that martyrdom is not a virtue and are learning to put burdens down. Alternatively, you may be shirking responsibilities or collapsing under pressure you refused to address. Honest assessment of what is truly yours to carry is the first step to relief.',
      zh: '你開始認識到殉道不是美德，正在學習放下重擔。或者，你可能在逃避責任，或因拒絕面對的壓力而崩潰。誠實評估哪些才是你真正該承擔的，是獲得解脫的第一步。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/ten-of-wands.jpg',
  },
  {
    id: 32,
    name: { en: 'Page of Wands', zh: '權杖侍者' },
    arcana: 'minor',
    suit: 'wands',
    number: 11,
    keywords: {
      en: ['enthusiasm', 'exploration', 'free spirit', 'curiosity'],
      zh: ['熱忱', '探索', '自由精神', '好奇心'],
    },
    upright: {
      en: 'A surge of enthusiasm and curiosity is pulling you toward a new adventure or creative pursuit. This youthful energy brings fresh ideas and the courage to explore without needing a guaranteed outcome. Follow your excitement — it is pointing you in the right direction.',
      zh: '一股熱忱和好奇心的湧動正將你拉向一場新的冒險或創作追尋。這股年輕的能量帶來新鮮的想法和無需保證結果就敢探索的勇氣。追隨你的興奮感——它正指引你走向正確的方向。',
    },
    reversed: {
      en: 'Restless energy without direction is leaving you scattered and uncommitted. Grand ideas fizzle out before they gain traction, or impatience is sabotaging projects that need sustained effort. Channel your fire into one clear intention instead of chasing every passing spark.',
      zh: '沒有方向的躁動能量讓你分散而無法投入。宏大的想法在獲得動力之前就熄滅了，或者不耐煩正在破壞那些需要持續努力的項目。把你的火焰導向一個明確的意圖，而非追逐每一個稍縱即逝的火花。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/page-of-wands.jpg',
  },
  {
    id: 33,
    name: { en: 'Knight of Wands', zh: '權杖騎士' },
    arcana: 'minor',
    suit: 'wands',
    number: 12,
    keywords: {
      en: ['action', 'adventure', 'boldness', 'passion'],
      zh: ['行動', '冒險', '大膽', '熱情'],
    },
    upright: {
      en: 'Charge forward with passion and fearless energy — this is the time for bold, decisive action. Your charisma and confidence are magnetic, drawing opportunities and allies to your side. Embrace the thrill of the chase, but stay mindful of where the horse is heading.',
      zh: '帶著熱情和無畏的能量向前衝鋒——這是大膽果斷行動的時刻。你的魅力和自信具有磁性，吸引機會和盟友到你身邊。擁抱追逐的刺激，但留意馬匹奔向的方向。',
    },
    reversed: {
      en: 'Impulsive behaviour and reckless decisions are burning bridges faster than you can build them. Your passion has tipped into aggression or arrogance, alienating the people around you. Slow down long enough to consider whether your fire is creating warmth or destruction.',
      zh: '衝動的行為和魯莽的決定正在以比你建造更快的速度燒毀橋梁。你的熱情已傾向攻擊性或傲慢，疏遠了你身邊的人。放慢腳步，想想你的火焰是在創造溫暖還是毀滅。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/knight-of-wands.jpg',
  },
  {
    id: 34,
    name: { en: 'Queen of Wands', zh: '權杖皇后' },
    arcana: 'minor',
    suit: 'wands',
    number: 13,
    keywords: {
      en: ['confidence', 'warmth', 'determination', 'vitality'],
      zh: ['自信', '溫暖', '堅定', '生命力'],
    },
    upright: {
      en: 'You radiate a magnetic warmth that draws others in and inspires them to act. Your confidence is grounded in genuine self-knowledge, not performance — and that authenticity is your greatest power. Lead with generosity and fierce determination; the world responds to your fire.',
      zh: '你散發著一種吸引他人並激勵他們行動的磁性溫暖。你的自信建立在真正的自我認知之上，而非表演——這份真實就是你最大的力量。以慷慨和堅定的決心引領；世界會回應你的火焰。',
    },
    reversed: {
      en: 'Your confidence may have curdled into domineering behaviour, or insecurity is making you withdraw your warmth. Jealousy and territorial instincts are poisoning relationships that once thrived. Reconnect with the generous, fiery core that defines you at your best.',
      zh: '你的自信可能已變質為專橫的行為，或者不安全感讓你收回了溫暖。嫉妒和領地本能正在毒害曾經蓬勃的關係。重新連結你最好狀態時那個慷慨而充滿火焰的核心。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/queen-of-wands.jpg',
  },
  {
    id: 35,
    name: { en: 'King of Wands', zh: '權杖國王' },
    arcana: 'minor',
    suit: 'wands',
    number: 14,
    keywords: {
      en: ['visionary leadership', 'boldness', 'enterprise', 'honour'],
      zh: ['遠見領導', '魄力', '事業心', '榮譽'],
    },
    upright: {
      en: 'You embody visionary leadership — bold enough to set the direction and charismatic enough to rally others behind it. Your entrepreneurial spirit turns ideas into empires when paired with integrity. Command your domain with honour; your example sets the standard.',
      zh: '你體現了遠見卓識的領導力——足夠大膽來指明方向，也足夠有魅力來號召他人跟隨。你的創業精神在與正直結合時，能將想法轉化為事業。以榮譽統領你的領域；你的榜樣就是標準。',
    },
    reversed: {
      en: 'A tyrannical streak or inflated ego is undermining the respect you once commanded. Grand visions without follow-through are eroding trust, or you are using your influence to bully rather than inspire. True authority is earned through service, not fear.',
      zh: '暴虐的傾向或膨脹的自我正在損害你曾經擁有的尊重。空有宏大願景卻缺乏執行正在侵蝕信任，或者你在用影響力來霸凌而非激勵。真正的權威是通過服務贏得的，而非恐懼。',
    },
    element: 'Fire',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/wands/king-of-wands.jpg',
  },
]

// ============================================
// Minor Arcana — Cups 聖杯 (36–49)
// ============================================

export const cupsCards: TarotCard[] = [
  {
    id: 36,
    name: { en: 'Ace of Cups', zh: '聖杯王牌' },
    arcana: 'minor',
    suit: 'cups',
    number: 1,
    keywords: {
      en: ['new love', 'emotional awakening', 'compassion', 'creativity'],
      zh: ['新的愛', '情感覺醒', '慈悲', '創造力'],
    },
    upright: {
      en: 'A profound wave of love, compassion, or creative inspiration is overflowing into your life. Open your heart fully — this is the beginning of deep emotional fulfilment. Whether it arrives as a new relationship, a spiritual awakening, or an artistic breakthrough, receive it with gratitude.',
      zh: '一股深刻的愛、慈悲或創作靈感正滿溢地湧入你的生命。完全敞開你的心——這是深層情感滿足的開端。無論它以新戀情、靈性覺醒還是藝術突破的形式到來，都以感恩之心接受。',
    },
    reversed: {
      en: 'Emotional blockages are preventing you from giving or receiving love freely. You may be suppressing your feelings, or a creative well has run dry. Look inward to find what is damming the flow — healing begins when you stop guarding your vulnerability.',
      zh: '情感上的阻塞正在阻止你自由地付出或接受愛。你可能在壓抑自己的感受，或者創意之泉已經枯竭。向內審視是什麼在阻擋這股流動——當你不再防衛自己的脆弱時，療癒就開始了。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/ace-of-cups.jpg',
  },
  {
    id: 37,
    name: { en: 'Two of Cups', zh: '聖杯二' },
    arcana: 'minor',
    suit: 'cups',
    number: 2,
    keywords: {
      en: ['partnership', 'mutual attraction', 'unity', 'connection'],
      zh: ['伴侶關係', '相互吸引', '合一', '連結'],
    },
    upright: {
      en: 'A genuine and balanced connection is forming between you and another — this is a meeting of equals. Mutual respect, attraction, and shared understanding are the foundation of this bond. Whether romantic or platonic, honour the rare gift of true reciprocity.',
      zh: '你與另一個人之間正在形成一種真誠而平衡的連結——這是平等之間的相遇。相互尊重、吸引和共同理解是這份連結的基礎。無論是浪漫的還是友誼的，珍惜真正互惠的稀有禮物。',
    },
    reversed: {
      en: 'An imbalance of power or unspoken resentment is eroding a once-harmonious relationship. One side may be giving far more than the other, or trust has been quietly broken. Address the disconnect honestly before the gap becomes too wide to bridge.',
      zh: '權力的失衡或未說出口的怨恨正在侵蝕一段曾經和諧的關係。一方可能付出遠多於另一方，或者信任已悄然破裂。在裂痕擴大到無法彌合之前，誠實地面對這種疏離。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/two-of-cups.jpg',
  },
  {
    id: 38,
    name: { en: 'Three of Cups', zh: '聖杯三' },
    arcana: 'minor',
    suit: 'cups',
    number: 3,
    keywords: {
      en: ['celebration', 'friendship', 'community', 'joy'],
      zh: ['慶祝', '友誼', '社群', '喜悅'],
    },
    upright: {
      en: 'Gather with the people who lift your spirits — this is a time for shared joy and heartfelt celebration. Friendships and creative collaborations are thriving, and the support of your community strengthens you. Let laughter flow freely; connection is its own reward.',
      zh: '與那些振奮你精神的人相聚——這是分享喜悅和真心慶祝的時刻。友誼和創意合作正蓬勃發展，社群的支持讓你更加堅強。讓笑聲自由流淌；連結本身就是最好的回報。',
    },
    reversed: {
      en: 'Social circles may be sources of gossip, exclusion, or superficial connection rather than genuine support. Overindulgence in pleasure is masking deeper emotional needs. Step back and evaluate which relationships truly nourish you and which are draining your energy.',
      zh: '社交圈可能成為八卦、排擠或膚淺交往的來源，而非真正的支持。過度沉溺於享樂正在掩蓋更深層的情感需求。退後一步，評估哪些關係真正滋養你，哪些正在消耗你的能量。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/three-of-cups.jpg',
  },
  {
    id: 39,
    name: { en: 'Four of Cups', zh: '聖杯四' },
    arcana: 'minor',
    suit: 'cups',
    number: 4,
    keywords: {
      en: ['apathy', 'contemplation', 'discontent', 're-evaluation'],
      zh: ['冷漠', '沉思', '不滿', '重新評估'],
    },
    upright: {
      en: 'A sense of emotional stagnation or boredom has settled in, and opportunities that once excited you now feel flat. Before dismissing what is being offered, look more carefully — there may be a gift you are overlooking because your gaze is turned inward. Sometimes what we need most is what we least expect.',
      zh: '一種情感停滯或無聊感已經降臨，曾經讓你興奮的機會現在感覺平淡。在拒絕眼前的事物之前，更仔細地看——可能有一份你因為目光向內而忽略的禮物。有時我們最需要的正是我們最意想不到的。',
    },
    reversed: {
      en: 'You are emerging from a period of withdrawal with renewed clarity about what you truly want. The fog of apathy is lifting, and motivation is slowly returning. Seize this moment of re-engagement before old patterns of avoidance pull you back under.',
      zh: '你正從一段退縮的時期中走出，對自己真正想要的東西有了重新的清晰認識。冷漠的迷霧正在散去，動力正慢慢回歸。在逃避的老模式再次將你拉回去之前，抓住這個重新投入的時刻。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/four-of-cups.jpg',
  },
  {
    id: 40,
    name: { en: 'Five of Cups', zh: '聖杯五' },
    arcana: 'minor',
    suit: 'cups',
    number: 5,
    keywords: {
      en: ['grief', 'loss', 'regret', 'disappointment'],
      zh: ['悲傷', '失去', '遺憾', '失望'],
    },
    upright: {
      en: 'Grief over what has been lost is consuming your attention, and the pain feels all-encompassing. Honour your sorrow — it is real and it matters — but do not forget that not everything has been taken from you. Two cups still stand behind you; when you are ready, turn around.',
      zh: '對失去之物的悲傷正佔據你全部的注意力，痛苦似乎無處不在。尊重你的悲傷——它是真實的，也是重要的——但不要忘記並非一切都已失去。兩個杯子仍立在你身後；當你準備好時，轉過身來。',
    },
    reversed: {
      en: 'The heavy cloud of mourning is beginning to part as you find the strength to accept and move on. You are learning that loss does not erase what was meaningful — it transforms it. Forgiveness of yourself or others may be the final key to releasing the grief.',
      zh: '當你找到接受並繼續前行的力量時，沉重的哀悼之雲開始散去。你正在學習：失去並不會抹消那些有意義的事物——它只是轉化了它們。對自己或他人的寬恕可能是釋放悲傷的最後一把鑰匙。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/five-of-cups.jpg',
  },
  {
    id: 41,
    name: { en: 'Six of Cups', zh: '聖杯六' },
    arcana: 'minor',
    suit: 'cups',
    number: 6,
    keywords: {
      en: ['nostalgia', 'childhood', 'innocence', 'reunion'],
      zh: ['懷舊', '童年', '純真', '重逢'],
    },
    upright: {
      en: 'Sweet memories of the past are resurfacing, bringing comfort and a sense of innocence. A reunion with someone from your history or a return to a familiar place may be on the horizon. Allow yourself to revisit the joy of simpler times while staying rooted in the present.',
      zh: '過去的美好回憶正在浮現，帶來慰藉和一種純真感。與過去某人的重逢或回到一個熟悉的地方可能即將到來。允許自己重溫更單純時光的喜悅，同時仍然紮根於當下。',
    },
    reversed: {
      en: 'You may be trapped in nostalgia, idealising a past that was not as perfect as memory suggests. Living in yesterday prevents you from building a meaningful today. Alternatively, unresolved childhood wounds are resurfacing and asking to be healed rather than romanticised.',
      zh: '你可能困在懷舊中，將過去理想化成記憶所暗示的那般完美。活在昨天會阻止你建立有意義的今天。或者，未解決的童年傷口正在重新浮現，要求被療癒而非被浪漫化。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/six-of-cups.jpg',
  },
  {
    id: 42,
    name: { en: 'Seven of Cups', zh: '聖杯七' },
    arcana: 'minor',
    suit: 'cups',
    number: 7,
    keywords: {
      en: ['illusion', 'fantasy', 'choices', 'wishful thinking'],
      zh: ['幻象', '幻想', '選擇', '一廂情願'],
    },
    upright: {
      en: 'A dazzling array of possibilities stretches before you, but not all of them are real. Fantasies and wishful thinking can be seductive distractions from the work that genuine dreams require. Sort through the illusions with clear eyes and commit to the one vision that is grounded in truth.',
      zh: '一連串令人目眩的可能性在你面前展開，但並非所有都是真實的。幻想和一廂情願可能是誘人的干擾，讓你遠離真正夢想所需的努力。以清明的眼光分辨幻象，投入那個扎根於真實的願景。',
    },
    reversed: {
      en: 'The fog of confusion is clearing and you are finally seeing your options for what they truly are. A dose of realism is helping you cut through the daydreams and focus on what is actually achievable. Use this clarity to make a decisive choice before the window of opportunity shifts.',
      zh: '迷惑的霧氣正在消散，你終於看清了各個選項的真面目。一劑現實主義正在幫助你穿透白日夢，專注於真正可實現的事物。利用這份清明在機會之窗轉移之前做出果斷的選擇。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/seven-of-cups.jpg',
  },
  {
    id: 43,
    name: { en: 'Eight of Cups', zh: '聖杯八' },
    arcana: 'minor',
    suit: 'cups',
    number: 8,
    keywords: {
      en: ['departure', 'letting go', 'seeking deeper meaning', 'withdrawal'],
      zh: ['離去', '放下', '尋求更深意義', '退出'],
    },
    upright: {
      en: 'Something that once filled your cup no longer satisfies, and your soul is urging you to walk away in search of deeper meaning. This departure is not failure — it is the courage to honour your own growth. Leave with grace; what you seek cannot be found where you have been standing.',
      zh: '曾經填滿你杯子的東西不再能滿足你，你的靈魂正催促你離開，去尋找更深的意義。這次離去不是失敗——而是尊重自身成長的勇氣。優雅地離開；你尋找的東西無法在你駐足之處找到。',
    },
    reversed: {
      en: 'Fear of the unknown is keeping you tethered to a situation you have emotionally outgrown. You know it is time to move on, but comfort and familiarity hold a powerful grip. Alternatively, you may be running away from something that still deserves your attention and effort.',
      zh: '對未知的恐懼讓你緊繫在一個你已經在情感上超越的處境中。你知道是時候繼續前進了，但舒適和熟悉有著強大的牽絆力。或者，你可能正在逃離某個仍然值得你關注和努力的事物。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/eight-of-cups.jpg',
  },
  {
    id: 44,
    name: { en: 'Nine of Cups', zh: '聖杯九' },
    arcana: 'minor',
    suit: 'cups',
    number: 9,
    keywords: {
      en: ['contentment', 'satisfaction', 'wish fulfilment', 'gratitude'],
      zh: ['滿足', '滿意', '願望實現', '感恩'],
    },
    upright: {
      en: 'Your wishes are being granted and a deep sense of contentment fills your heart. This is the card of emotional fulfilment — savour the pleasure of having what you once only dreamed of. Gratitude amplifies the joy; acknowledge how your inner work brought you here.',
      zh: '你的願望正在被實現，一種深深的滿足感充盈你的內心。這是情感滿足之牌——品味擁有你曾經只能夢想之物的喜悅。感恩會放大喜悅；承認是你的內在修煉帶你走到了這裡。',
    },
    reversed: {
      en: 'Outward abundance masks an inner emptiness — material comfort alone is not bringing the happiness you expected. You may be chasing pleasure as a substitute for genuine emotional connection. Reassess what true fulfilment means to you beyond surface-level desires.',
      zh: '外在的豐盛掩蓋了內在的空虛——單純的物質舒適並未帶來你期望的幸福。你可能在追逐享樂作為真正情感連結的替代品。重新評估真正的滿足對你而言意味著什麼，超越表面的慾望。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/nine-of-cups.jpg',
  },
  {
    id: 45,
    name: { en: 'Ten of Cups', zh: '聖杯十' },
    arcana: 'minor',
    suit: 'cups',
    number: 10,
    keywords: {
      en: ['harmony', 'family', 'lasting happiness', 'emotional fulfilment'],
      zh: ['和諧', '家庭', '持久的幸福', '情感圓滿'],
    },
    upright: {
      en: 'Lasting emotional harmony and deep familial love surround you — this is the fulfilment of the heart\'s deepest longing. The rainbow after the storm has arrived, bringing peace, belonging, and shared joy. Treasure this chapter; it is the reward for the emotional work you have done.',
      zh: '持久的情感和諧與深厚的家庭之愛環繞著你——這是內心最深渴望的實現。暴風雨後的彩虹已經到來，帶來平靜、歸屬感和共同的喜悅。珍惜這個篇章；這是你所做的情感功課的回報。',
    },
    reversed: {
      en: 'The picture-perfect family or relationship is showing cracks beneath the surface. Unspoken tensions and misaligned values are undermining what appears harmonious from the outside. True happiness requires honest communication, not just the performance of togetherness.',
      zh: '完美的家庭或關係正在表面之下顯露裂痕。未說出口的緊張和不一致的價值觀正在削弱從外表看似和諧的一切。真正的幸福需要誠實的溝通，而不僅僅是團聚的表演。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/ten-of-cups.jpg',
  },
  {
    id: 46,
    name: { en: 'Page of Cups', zh: '聖杯侍者' },
    arcana: 'minor',
    suit: 'cups',
    number: 11,
    keywords: {
      en: ['creative message', 'intuitive child', 'curiosity', 'imagination'],
      zh: ['創意訊息', '直覺之子', '好奇心', '想像力'],
    },
    upright: {
      en: 'A gentle, intuitive message is arriving — perhaps through a dream, a synchronicity, or a sudden spark of imagination. Approach the world with childlike wonder and let your creative instincts guide you. This tender energy invites you to feel deeply without judgement.',
      zh: '一個溫柔而直覺的訊息正在到來——也許通過夢境、巧合或突如其來的想像力火花。以赤子般的好奇心面對世界，讓你的創作直覺引導你。這股溫柔的能量邀請你不帶批判地深刻感受。',
    },
    reversed: {
      en: 'Emotional immaturity or excessive daydreaming is preventing you from grounding your creative gifts in reality. You may be overly sensitive to criticism or using fantasy to escape uncomfortable truths. Channel your rich inner world into something tangible before it becomes mere escapism.',
      zh: '情感上的不成熟或過度的白日夢正在阻止你將創作天賦落實到現實中。你可能對批評過度敏感，或利用幻想來逃避令人不舒服的真相。在你豐富的內在世界變成純粹的逃避之前，將它導向具體的事物。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/page-of-cups.jpg',
  },
  {
    id: 47,
    name: { en: 'Knight of Cups', zh: '聖杯騎士' },
    arcana: 'minor',
    suit: 'cups',
    number: 12,
    keywords: {
      en: ['romance', 'idealism', 'charm', 'following the heart'],
      zh: ['浪漫', '理想主義', '魅力', '追隨內心'],
    },
    upright: {
      en: 'A romantic or creative proposal is approaching with grace and sincerity. Follow your heart with the courage of one who believes in beauty and meaning. This energy is charming and emotionally generous — let it lead you toward what inspires your deepest feelings.',
      zh: '一個浪漫的或創意的提議正以優雅和真誠向你走來。以相信美麗和意義之人的勇氣追隨你的心。這股能量既迷人又在情感上慷慨——讓它引領你走向激發你最深感受的事物。',
    },
    reversed: {
      en: 'Romantic idealism has disconnected from reality, leading to empty promises or unrealistic expectations. Charm without substance is a seductive trap — either in someone approaching you or in your own behaviour. Ground your emotions in honesty before making any commitments.',
      zh: '浪漫的理想主義已與現實脫節，導致空洞的承諾或不切實際的期望。沒有內涵的魅力是一個誘人的陷阱——無論是在接近你的人身上還是你自己的行為中。在做出任何承諾之前，將你的情感扎根於誠實。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/knight-of-cups.jpg',
  },
  {
    id: 48,
    name: { en: 'Queen of Cups', zh: '聖杯皇后' },
    arcana: 'minor',
    suit: 'cups',
    number: 13,
    keywords: {
      en: ['emotional depth', 'empathy', 'nurturing', 'intuition'],
      zh: ['情感深度', '同理心', '滋養', '直覺'],
    },
    upright: {
      en: 'Your emotional intelligence and empathy are your greatest strengths right now. You hold space for others with a depth of compassion that heals without words. Trust your intuitive knowing — you sense what lies beneath the surface long before others see it.',
      zh: '你的情商和同理心是你現在最大的優勢。你以一種無需言語就能療癒的深沉慈悲為他人保留空間。信任你的直覺認知——你在他人看見之前就能感應到表面之下的東西。',
    },
    reversed: {
      en: 'Your empathy may be overwhelming you — absorbing everyone else\'s pain at the expense of your own wellbeing. Emotional boundaries have dissolved, leaving you drained and codependent. Nurturing yourself is not selfish; you cannot pour from a cup that has been emptied for others.',
      zh: '你的同理心可能正壓倒你——以犧牲自己的健康為代價吸收每個人的痛苦。情感界線已經溶解，讓你疲憊不堪並陷入相互依賴。滋養自己不是自私；你無法從一個已為他人倒空的杯子中再倒出什麼。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/queen-of-cups.jpg',
  },
  {
    id: 49,
    name: { en: 'King of Cups', zh: '聖杯國王' },
    arcana: 'minor',
    suit: 'cups',
    number: 14,
    keywords: {
      en: ['emotional mastery', 'diplomacy', 'composure', 'wisdom'],
      zh: ['情感掌握', '外交手腕', '沉著', '智慧'],
    },
    upright: {
      en: 'You have mastered the art of navigating deep emotions without being swept away by them. Your calm composure and diplomatic wisdom make you a steady anchor for those around you. Lead with your heart and your head in equal measure — that balance is your true authority.',
      zh: '你已精通在深層情感中航行而不被捲走的藝術。你沉穩的風度和外交智慧使你成為周圍人穩定的錨點。以同等的心與腦來引領——這份平衡才是你真正的權威。',
    },
    reversed: {
      en: 'Emotional suppression disguised as composure is creating a pressure that will eventually erupt. You may be using coldness or manipulation to maintain control over situations that require genuine vulnerability. Allow yourself to feel without fearing that emotion equals weakness.',
      zh: '偽裝成沉著的情感壓抑正在累積終將爆發的壓力。你可能在用冷漠或操控來維持對需要真正脆弱的情境的控制。允許自己去感受，不要害怕情感等同於軟弱。',
    },
    element: 'Water',
    timeframe: 'Weeks to months',
    image: '/assets/tarot/cups/king-of-cups.jpg',
  },
]
