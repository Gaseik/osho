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

// ============================================
// Minor Arcana — Swords 寶劍 (50–63)
// ============================================

export const swordsCards: TarotCard[] = [
  {
    id: 50,
    name: { en: 'Ace of Swords', zh: '寶劍王牌' },
    arcana: 'minor',
    suit: 'swords',
    number: 1,
    keywords: {
      en: ['clarity', 'breakthrough', 'truth', 'new idea'],
      zh: ['清晰', '突破', '真相', '新觀點'],
    },
    upright: {
      en: 'A powerful moment of mental clarity is cutting through confusion — the truth is now undeniable. This breakthrough brings a new idea or perspective that changes everything. Wield this insight with precision and integrity; the sword of truth cuts both ways.',
      zh: '一個強大的心智清明時刻正在斬破迷惘——真相已無法否認。這個突破帶來一個改變一切的新想法或觀點。以精準和正直揮舞這份洞見；真相之劍是雙面刃。',
    },
    reversed: {
      en: 'Mental fog or misinformation is preventing you from seeing the situation clearly. A promising idea may lack substance, or you are using intellect to justify a conclusion you reached emotionally. Slow down and verify before you act on what you think you know.',
      zh: '思緒的迷霧或錯誤的資訊正阻止你清楚看見局勢。一個看似有前景的想法可能缺乏實質，或者你正用理智來為一個情感上已下的結論辯護。在根據你認為知道的事情行動之前，放慢腳步並加以驗證。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/ace-of-swords.jpg',
  },
  {
    id: 51,
    name: { en: 'Two of Swords', zh: '寶劍二' },
    arcana: 'minor',
    suit: 'swords',
    number: 2,
    keywords: {
      en: ['indecision', 'stalemate', 'avoidance', 'difficult choice'],
      zh: ['猶豫不決', '僵局', '迴避', '困難的選擇'],
    },
    upright: {
      en: 'You are caught between two options and deliberately keeping yourself blindfolded to avoid the discomfort of choosing. Neither path feels safe, but remaining frozen is its own decision. Remove the blindfold, face the facts, and trust that an imperfect choice is better than none at all.',
      zh: '你被困在兩個選項之間，刻意蒙住自己的眼睛以逃避選擇的不適。兩條路都不覺得安全，但保持凍結本身就是一種決定。摘下眼罩，面對事實，相信一個不完美的選擇也好過完全不選。',
    },
    reversed: {
      en: 'The stalemate is finally breaking — information or events are forcing the decision you have been avoiding. Emotional overwhelm may be clouding your logic, or you are making a choice based on anxiety rather than sound reasoning. Seek counsel from someone who can offer a clear-eyed perspective.',
      zh: '僵局終於在瓦解——資訊或事件正迫使你做出一直在迴避的決定。情緒的淹沒可能正蒙蔽你的邏輯，或者你正基於焦慮而非合理推斷做出選擇。向能提供清晰視角的人尋求建議。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/two-of-swords.jpg',
  },
  {
    id: 52,
    name: { en: 'Three of Swords', zh: '寶劍三' },
    arcana: 'minor',
    suit: 'swords',
    number: 3,
    keywords: {
      en: ['heartbreak', 'sorrow', 'painful truth', 'grief'],
      zh: ['心碎', '悲痛', '痛苦的真相', '哀傷'],
    },
    upright: {
      en: 'A painful truth has pierced your heart, and the sorrow it brings is unavoidable. Betrayal, loss, or a devastating revelation demands that you grieve fully before you can heal. Do not rush past the pain — acknowledging it honestly is the first step toward putting yourself back together.',
      zh: '一個痛苦的真相刺穿了你的心，它帶來的悲傷無法迴避。背叛、失去或毀滅性的揭露要求你完整地悲傷之後才能療癒。不要急於跳過痛苦——誠實地承認它是重新拼湊自己的第一步。',
    },
    reversed: {
      en: 'You are beginning to process old wounds and release the grief that has been lodged in your heart. The worst of the pain is passing, and perspective is slowly returning. Be gentle with yourself during this recovery — healing is not linear, and setbacks do not erase progress.',
      zh: '你正開始處理舊傷，釋放積存在心中的悲傷。最劇烈的痛苦正在消退，觀點正慢慢回歸。在恢復過程中溫柔對待自己——療癒不是線性的，倒退不會抹消進步。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/three-of-swords.jpg',
  },
  {
    id: 53,
    name: { en: 'Four of Swords', zh: '寶劍四' },
    arcana: 'minor',
    suit: 'swords',
    number: 4,
    keywords: {
      en: ['rest', 'recovery', 'contemplation', 'solitude'],
      zh: ['休息', '恢復', '沉思', '獨處'],
    },
    upright: {
      en: 'Your mind and body are demanding rest — heed the call before exhaustion forces your hand. This is a sacred pause for recovery, not laziness; the battles ahead require you to be restored. Step back from the noise, meditate, and let stillness replenish what action has depleted.',
      zh: '你的身心正在要求休息——在疲憊迫使你停下之前聽從這個呼喚。這是一個神聖的恢復暫停，而非懈怠；前方的戰役需要你恢復元氣。從喧囂中退後，冥想，讓靜止補充行動所耗損的。',
    },
    reversed: {
      en: 'Restlessness is cutting your recovery short, or you have been hiding in isolation for too long under the guise of rest. The line between necessary retreat and avoidance has blurred. Assess honestly whether you are healing or simply postponing the moment you must re-engage with life.',
      zh: '不安正在縮短你的恢復時間，或者你以休息為藉口已在孤立中躲藏太久。必要的退隱和逃避之間的界線已變得模糊。誠實評估你是在療癒，還是只是在拖延必須重新投入生活的那一刻。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/four-of-swords.jpg',
  },
  {
    id: 54,
    name: { en: 'Five of Swords', zh: '寶劍五' },
    arcana: 'minor',
    suit: 'swords',
    number: 5,
    keywords: {
      en: ['conflict', 'defeat', 'hollow victory', 'betrayal'],
      zh: ['衝突', '失敗', '空洞的勝利', '背叛'],
    },
    upright: {
      en: 'A conflict has ended, but the victory feels hollow — winning at the expense of relationships leaves everyone diminished. Pick your battles wisely; not every argument is worth the damage it inflicts. Consider whether your pride is costing you more than the fight itself.',
      zh: '一場衝突已經結束，但勝利感覺空洞——以犧牲關係為代價的贏只會讓每個人都受損。明智地選擇你的戰役；不是每場爭論都值得它造成的傷害。想想你的驕傲是否比這場戰鬥本身付出更多代價。',
    },
    reversed: {
      en: 'You are ready to lay down your weapons and seek reconciliation after a bitter dispute. The desire to be right is giving way to the desire for peace. Alternatively, lingering resentment from a past defeat is poisoning your present — release it before it defines you.',
      zh: '在一場激烈的爭執之後，你準備好放下武器尋求和解了。想要證明自己是對的慾望正讓位於對和平的渴望。或者，過去失敗留下的怨恨正在毒害你的當下——在它定義你之前釋放它。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/five-of-swords.jpg',
  },
  {
    id: 55,
    name: { en: 'Six of Swords', zh: '寶劍六' },
    arcana: 'minor',
    suit: 'swords',
    number: 6,
    keywords: {
      en: ['transition', 'moving on', 'recovery', 'calmer waters'],
      zh: ['過渡', '繼續前進', '復原', '平靜的水域'],
    },
    upright: {
      en: 'You are leaving troubled waters behind and moving toward calmer shores. This transition may be bittersweet — what you are leaving still hurts — but the journey forward is necessary. Trust the quiet passage; healing happens in the crossing, not just at the destination.',
      zh: '你正離開洶湧的水域，駛向更平靜的彼岸。這次轉變可能苦樂參半——你正離開的仍然令人心痛——但向前的旅程是必要的。信任這段安靜的航行；療癒發生在渡過的途中，而不僅在終點。',
    },
    reversed: {
      en: 'You are resisting a necessary departure or finding it impossible to leave the past behind. Emotional baggage is weighing down the boat, making the crossing far harder than it needs to be. Lighten your load — some things must be left on the shore you came from.',
      zh: '你正在抗拒一次必要的離開，或發現自己無法將過去拋在身後。情感包袱正壓著船，讓渡河變得比本該的困難許多。減輕你的負擔——有些東西必須留在你出發的岸邊。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/six-of-swords.jpg',
  },
  {
    id: 56,
    name: { en: 'Seven of Swords', zh: '寶劍七' },
    arcana: 'minor',
    suit: 'swords',
    number: 7,
    keywords: {
      en: ['deception', 'strategy', 'stealth', 'cunning'],
      zh: ['欺騙', '策略', '隱匿', '狡詐'],
    },
    upright: {
      en: 'Someone may be acting with hidden motives — and that someone could be you. Strategic thinking has its place, but when it crosses into deception or avoidance of accountability, the gains are short-lived. Examine whether cleverness is serving your integrity or undermining it.',
      zh: '某人可能懷有隱藏的動機行事——而那個人可能就是你。策略性思考有其用處，但當它越界成為欺騙或逃避責任時，所獲甚微。審視你的聰明是在服務你的正直還是在破壞它。',
    },
    reversed: {
      en: 'Hidden truths are coming to light and deceptions are unravelling. You may be experiencing the consequences of past dishonesty or finally confronting someone else\'s betrayal. Use this revelation as an opportunity to rebuild on a foundation of transparency rather than repeating the cycle.',
      zh: '隱藏的真相正在浮出水面，欺騙正在瓦解。你可能正在承受過去不誠實的後果，或終於面對他人的背叛。以這次揭露為契機，在透明的基礎上重建，而非重蹈覆轍。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/seven-of-swords.jpg',
  },
  {
    id: 57,
    name: { en: 'Eight of Swords', zh: '寶劍八' },
    arcana: 'minor',
    suit: 'swords',
    number: 8,
    keywords: {
      en: ['restriction', 'trapped thinking', 'self-imposed limits', 'helplessness'],
      zh: ['限制', '困頓思維', '自我設限', '無助感'],
    },
    upright: {
      en: 'You feel trapped, but the prison is largely of your own making — the bindings are loose and the blindfold can be removed. Limiting beliefs and fear-based thinking have convinced you that there is no way out. Challenge the narrative; more options exist than your anxious mind allows you to see.',
      zh: '你感覺被困住了，但這座牢獄很大程度上是你自己打造的——束縛是鬆的，眼罩可以拿掉。限制性信念和基於恐懼的思維讓你相信沒有出路。挑戰這個敘事；比你焦慮的頭腦讓你看見的有更多選擇。',
    },
    reversed: {
      en: 'You are beginning to see through the mental traps that have kept you paralysed. The courage to question your own limiting stories is the first step toward liberation. As the blindfold slips, you realise that the swords surrounding you were never as close as they appeared.',
      zh: '你開始看穿那些讓你癱瘓的心理陷阱。質疑你自己限制性故事的勇氣是邁向解放的第一步。當眼罩滑落，你意識到圍繞你的劍從來不像看起來那麼近。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/eight-of-swords.jpg',
  },
  {
    id: 58,
    name: { en: 'Nine of Swords', zh: '寶劍九' },
    arcana: 'minor',
    suit: 'swords',
    number: 9,
    keywords: {
      en: ['anxiety', 'nightmares', 'worry', 'despair'],
      zh: ['焦慮', '噩夢', '憂慮', '絕望'],
    },
    upright: {
      en: 'Anxiety and dark thoughts are robbing you of sleep and peace of mind. The fears that torment you in the small hours feel enormous, but many of them are projections rather than realities. Reach out to someone you trust — suffering in silence only amplifies the anguish.',
      zh: '焦慮和黑暗的思緒正在剝奪你的睡眠與內心平靜。在深夜折磨你的恐懼感覺巨大無比，但其中許多是投射而非現實。向你信任的人伸出手——默默承受只會放大痛苦。',
    },
    reversed: {
      en: 'The worst of the mental anguish is easing as you begin to confront what has been haunting you. Seeking help — whether through therapy, honest conversation, or simply naming your fears — is breaking the cycle of nocturnal torment. Dawn is closer than the darkness suggests.',
      zh: '當你開始面對一直困擾你的事物時，最嚴重的心理痛苦正在緩解。尋求幫助——無論是通過療癒、坦誠的對話，還是僅僅為你的恐懼命名——正在打破夜間折磨的循環。黎明比黑暗所暗示的更近。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/nine-of-swords.jpg',
  },
  {
    id: 59,
    name: { en: 'Ten of Swords', zh: '寶劍十' },
    arcana: 'minor',
    suit: 'swords',
    number: 10,
    keywords: {
      en: ['rock bottom', 'painful ending', 'collapse', 'new dawn'],
      zh: ['谷底', '痛苦的結束', '崩塌', '新的曙光'],
    },
    upright: {
      en: 'You have hit rock bottom and there is no denying it — this chapter has ended in the most painful way possible. Yet the sunrise on the horizon promises that this is also the moment when things can only get better. Let the old story die completely so the new one can begin.',
      zh: '你已經觸底了，這無法否認——這一章以最痛苦的方式結束了。然而地平線上的日出承諾著這也是事情只會變得更好的時刻。讓舊的故事徹底死去，新的才能開始。',
    },
    reversed: {
      en: 'You are surviving an ordeal that once felt unsurvivable and slowly beginning to rise again. The temptation to wallow or replay the trauma is strong, but the swords are falling away. Resist the urge to keep the wounds open — recovery requires you to accept the ending and move on.',
      zh: '你正在度過一場曾經感覺無法倖存的磨難，並慢慢開始重新站起來。沉溺或反覆重播創傷的誘惑很強烈，但劍正在掉落。抵抗讓傷口繼續敞開的衝動——復原要求你接受結局並繼續前行。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/ten-of-swords.jpg',
  },
  {
    id: 60,
    name: { en: 'Page of Swords', zh: '寶劍侍者' },
    arcana: 'minor',
    suit: 'swords',
    number: 11,
    keywords: {
      en: ['curiosity', 'vigilance', 'mental agility', 'new information'],
      zh: ['好奇心', '警覺', '思維敏捷', '新資訊'],
    },
    upright: {
      en: 'A sharp and restless mind is hungry for new information and eager to challenge the status quo. Your intellectual curiosity and quick thinking are assets — use them to investigate, question, and communicate with clarity. Stay alert; the truth you uncover now could prove invaluable.',
      zh: '一個敏銳而不安的頭腦渴望新資訊，急於挑戰現狀。你的求知欲和敏捷思維是寶貴的資產——用它們來調查、提問並清晰地溝通。保持警覺；你現在揭示的真相可能極為寶貴。',
    },
    reversed: {
      en: 'Scattered thinking or gossipy behaviour is undermining your credibility. You may be all talk and no follow-through, or using sharp words to wound rather than illuminate. Direct your mental energy toward constructive ends instead of petty arguments or idle speculation.',
      zh: '思維散亂或八卦行為正在損害你的可信度。你可能光說不練，或用尖銳的言語來傷害而非啟發。將你的心智能量導向建設性的方向，而非瑣碎的爭論或無謂的猜測。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/page-of-swords.jpg',
  },
  {
    id: 61,
    name: { en: 'Knight of Swords', zh: '寶劍騎士' },
    arcana: 'minor',
    suit: 'swords',
    number: 12,
    keywords: {
      en: ['ambition', 'direct action', 'intellect', 'assertiveness'],
      zh: ['野心', '直接行動', '智識', '果斷'],
    },
    upright: {
      en: 'You are charging toward your goal with relentless intellectual force and unwavering focus. This is the energy of someone who has made up their mind and will not be deterred. Your assertiveness is admirable, but ensure that speed does not sacrifice accuracy or empathy along the way.',
      zh: '你正以不懈的智識力量和堅定不移的專注向目標衝鋒。這是一個已下定決心、不會被阻擋之人的能量。你的果斷令人欽佩，但確保速度不會在途中犧牲準確性或同理心。',
    },
    reversed: {
      en: 'Reckless haste and intellectual arrogance are leading to careless mistakes and hurt feelings. You may be bulldozing through situations that require finesse, or your arguments have become weapons rather than tools. Slow the charge before you cause damage that cannot be undone.',
      zh: '魯莽的急躁和智識上的傲慢正導致粗心的錯誤和受傷的感受。你可能正在橫衝直撞地處理需要細膩的情境，或者你的論點已變成武器而非工具。在造成無法挽回的損害之前放慢衝鋒。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/knight-of-swords.jpg',
  },
  {
    id: 62,
    name: { en: 'Queen of Swords', zh: '寶劍皇后' },
    arcana: 'minor',
    suit: 'swords',
    number: 13,
    keywords: {
      en: ['clear judgement', 'independence', 'honest communication', 'perceptiveness'],
      zh: ['清晰判斷', '獨立', '誠實溝通', '洞察力'],
    },
    upright: {
      en: 'Your ability to see through pretence and communicate with unflinching honesty is a rare gift. Approach your situation with the clear-eyed judgement of someone who values truth over comfort. Your independence and sharp perception cut to the heart of the matter — trust that clarity.',
      zh: '你看穿偽裝並以毫不退縮的誠實溝通的能力是一份稀有的天賦。以一個重視真相甚於舒適之人的清澈判斷力來面對你的處境。你的獨立和敏銳洞察直入事物核心——信任那份清晰。',
    },
    reversed: {
      en: 'Your sharp tongue may be cutting deeper than intended, or bitterness from past wounds is hardening you into cynicism. Emotional walls built for self-protection are isolating you from genuine connection. Honesty is a virtue, but weaponised truth without compassion is cruelty.',
      zh: '你尖銳的言辭可能傷得比預期更深，或者過去傷口留下的苦澀正讓你硬化為憤世嫉俗。為自我保護而築起的情感高牆正將你與真正的連結隔絕。誠實是美德，但沒有慈悲的武器化真相是殘酷。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/queen-of-swords.jpg',
  },
  {
    id: 63,
    name: { en: 'King of Swords', zh: '寶劍國王' },
    arcana: 'minor',
    suit: 'swords',
    number: 14,
    keywords: {
      en: ['intellectual authority', 'fairness', 'discipline', 'strategic mind'],
      zh: ['智識權威', '公正', '紀律', '戰略思維'],
    },
    upright: {
      en: 'Command your situation with the disciplined intellect and impartial judgement of a seasoned strategist. Your ability to separate emotion from logic allows you to make fair decisions that others trust. Lead with ethical clarity; your authority comes from the rigour of your thinking, not the volume of your voice.',
      zh: '以資深戰略家的嚴謹智識和公正判斷來掌控你的局面。你將情感與邏輯分開的能力讓你做出他人信服的公平決定。以倫理清晰來領導；你的權威來自你思考的嚴謹，而非你嗓門的大小。',
    },
    reversed: {
      en: 'Intellectual dominance is being wielded as a weapon — cold logic without heart creates tyranny disguised as reason. You may be manipulating facts to serve your agenda or suppressing dissent through intimidation. True wisdom integrates compassion; a mind without heart is a blade without a handle.',
      zh: '智識上的優勢正被當作武器揮舞——沒有心的冰冷邏輯創造的是偽裝成理性的暴政。你可能在操控事實來服務你的議程，或通過恐嚇壓制異議。真正的智慧整合慈悲；沒有心的頭腦是一把沒有劍柄的刀刃。',
    },
    element: 'Air',
    timeframe: 'Days to weeks',
    image: '/assets/tarot/swords/king-of-swords.jpg',
  },
]

// ============================================
// Minor Arcana — Pentacles 錢幣 (64–77)
// ============================================

export const pentaclesCards: TarotCard[] = [
  {
    id: 64,
    name: { en: 'Ace of Pentacles', zh: '錢幣王牌' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 1,
    keywords: {
      en: ['new opportunity', 'prosperity', 'manifestation', 'abundance'],
      zh: ['新機會', '繁榮', '實現', '豐盛'],
    },
    upright: {
      en: 'A golden opportunity for material prosperity is being placed directly in your hands. This is the seed of financial growth, a promising job offer, or a solid investment that could yield lasting abundance. Ground your ambitions in practical action — the universe is providing, but you must plant the seed to reap the harvest.',
      zh: '一個物質繁榮的黃金機會正被直接放到你手中。這是財務成長的種子、一個有前景的工作機會，或一筆能帶來持久豐盛的穩健投資。將你的雄心建立在實際行動上——宇宙正在給予，但你必須播下種子才能收穫。',
    },
    reversed: {
      en: 'A promising opportunity is slipping through your fingers due to poor planning or lack of follow-through. Financial instability or missed chances may stem from unrealistic expectations or unwillingness to do the groundwork. Re-examine your relationship with material security and ensure your foundations are solid before building higher.',
      zh: '一個有前景的機會正因規劃不周或缺乏執行力而從你指間溜走。財務不穩或錯失的機會可能源於不切實際的期望或不願打好基礎。重新審視你與物質安全感的關係，確保在更高處建造之前地基是穩固的。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/ace-of-pentacles.jpg',
  },
  {
    id: 65,
    name: { en: 'Two of Pentacles', zh: '錢幣二' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 2,
    keywords: {
      en: ['balance', 'adaptability', 'juggling', 'prioritisation'],
      zh: ['平衡', '適應力', '兼顧多事', '排定優先順序'],
    },
    upright: {
      en: 'You are juggling multiple responsibilities and managing to keep everything in motion through skilful adaptation. Flexibility is your greatest asset right now — ride the ups and downs with grace rather than rigidity. Just be mindful that perpetual juggling is not sustainable; eventually you will need to set something down.',
      zh: '你正在兼顧多項責任，並透過靈活的應變能力讓一切保持運轉。靈活性是你現在最大的資產——以優雅而非僵硬的態度去順應起伏。只是要留意，永無止境的兼顧是不可持續的；最終你需要放下某些事。',
    },
    reversed: {
      en: 'The juggling act is becoming unsustainable — balls are starting to drop as you spread yourself too thin. Financial disorganisation or an inability to prioritise is creating unnecessary chaos. Stop trying to do everything at once; pick what matters most and give it your full attention.',
      zh: '兼顧的把戲正變得難以為繼——當你把自己攤得太薄時，球開始掉落。財務的混亂或無法排定優先順序正製造不必要的混亂。停止試圖同時做所有事；挑出最重要的，給予它全部的注意力。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/two-of-pentacles.jpg',
  },
  {
    id: 66,
    name: { en: 'Three of Pentacles', zh: '錢幣三' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 3,
    keywords: {
      en: ['teamwork', 'craftsmanship', 'collaboration', 'skill building'],
      zh: ['團隊合作', '工藝', '協作', '技能培養'],
    },
    upright: {
      en: 'Your skills are being recognised within a collaborative effort, and the quality of your craftsmanship is elevating the whole project. This is the power of teamwork — each person\'s expertise contributes to something none could build alone. Stay open to feedback; mastery grows through the exchange of ideas.',
      zh: '你的技能正在協作的努力中獲得認可，你工藝的品質正在提升整個計畫。這就是團隊合作的力量——每個人的專長共同成就了獨自無法建成的東西。保持對回饋的開放；精通在思想交流中成長。',
    },
    reversed: {
      en: 'Disharmony within a team or a lack of respect for each other\'s contributions is undermining the project. Poor workmanship, ego clashes, or unclear roles are creating friction where synergy should exist. Realign expectations and ensure everyone understands both the vision and their part in achieving it.',
      zh: '團隊中的不和諧或對彼此貢獻缺乏尊重正在破壞計畫。粗劣的工作品質、自我衝突或不明確的角色正在本該有協同效應的地方製造摩擦。重新對齊期望，確保每個人都理解願景以及自己在實現它中的角色。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/three-of-pentacles.jpg',
  },
  {
    id: 67,
    name: { en: 'Four of Pentacles', zh: '錢幣四' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 4,
    keywords: {
      en: ['security', 'control', 'possessiveness', 'conservation'],
      zh: ['安全感', '控制', '佔有慾', '保守'],
    },
    upright: {
      en: 'You are holding tightly to what you have — money, status, or control — out of a deep fear of loss. While financial caution has its place, excessive hoarding blocks the natural flow of abundance. Ask yourself whether you are building security or building a prison; there is a fine line between the two.',
      zh: '你正緊緊抓住你擁有的——金錢、地位或控制——出於對失去的深層恐懼。雖然財務上的謹慎有其道理，但過度的囤積阻塞了豐盛的自然流動。問問自己你是在建立安全感還是在建造一座監獄；兩者之間只有一線之隔。',
    },
    reversed: {
      en: 'You are either loosening your grip and learning to share generously, or your financial stability is crumbling because the fortress you built has isolated you from opportunity. Reckless spending may be the other extreme of the same fear. Find the middle ground between hoarding and squandering.',
      zh: '你正在放鬆控制、學習慷慨分享，或者你的財務穩定正在崩塌，因為你建造的堡壘把你與機會隔絕了。揮霍無度可能是同一種恐懼的另一個極端。在囤積和揮霍之間找到中庸之道。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/four-of-pentacles.jpg',
  },
  {
    id: 68,
    name: { en: 'Five of Pentacles', zh: '錢幣五' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 5,
    keywords: {
      en: ['hardship', 'financial loss', 'isolation', 'worry'],
      zh: ['困苦', '財務損失', '孤立', '擔憂'],
    },
    upright: {
      en: 'You are enduring a period of material hardship or feeling left out in the cold — physically, financially, or emotionally. The stained-glass window glowing above suggests that help is closer than you think, but pride or shame may be preventing you from seeking it. You do not have to suffer alone; reach out.',
      zh: '你正在經歷一段物質困苦的時期，或感覺被排斥在外——無論是身體上、財務上或情感上。上方發光的彩色玻璃窗暗示援助比你想像的更近，但驕傲或羞恥可能正阻止你去尋求。你不必獨自受苦；伸出手求助。',
    },
    reversed: {
      en: 'The worst of the financial or spiritual hardship is beginning to ease. You are finding the courage to accept help or discovering inner resources you did not know you had. Recovery from scarcity is gradual — celebrate small improvements rather than waiting for everything to be fixed at once.',
      zh: '最艱難的財務或精神困苦正開始緩解。你正找到接受幫助的勇氣，或發現你不知道自己擁有的內在資源。從匱乏中恢復是漸進的——慶祝小小的改善，而非等待一切一次到位。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/five-of-pentacles.jpg',
  },
  {
    id: 69,
    name: { en: 'Six of Pentacles', zh: '錢幣六' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 6,
    keywords: {
      en: ['generosity', 'charity', 'giving and receiving', 'fairness'],
      zh: ['慷慨', '慈善', '給予與接受', '公平'],
    },
    upright: {
      en: 'Resources are flowing in a healthy cycle of giving and receiving. Whether you are the one offering support or gratefully accepting it, this exchange creates balance and goodwill. Be generous with what you have, but also discerning — true charity empowers rather than creates dependency.',
      zh: '資源正在給予和接受的健康循環中流動。無論你是提供支持的一方還是感恩地接受的一方，這種交換創造了平衡與善意。對你所擁有的慷慨，但也要有辨別力——真正的慈善是賦予力量而非製造依賴。',
    },
    reversed: {
      en: 'The balance of power in a financial or supportive relationship has become unhealthy. Strings are attached to generosity, debts are being used as leverage, or you are giving beyond your means to feel needed. Examine whether the exchange is truly reciprocal or quietly transactional.',
      zh: '一段財務或支持關係中的權力平衡已變得不健康。慷慨附帶著條件，債務被用作籌碼，或者你為了感覺被需要而超出能力地付出。審視這場交換是否真正互惠，還是暗地裡是交易性的。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/six-of-pentacles.jpg',
  },
  {
    id: 70,
    name: { en: 'Seven of Pentacles', zh: '錢幣七' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 7,
    keywords: {
      en: ['patience', 'long-term investment', 'evaluation', 'perseverance'],
      zh: ['耐心', '長期投資', '評估', '堅持不懈'],
    },
    upright: {
      en: 'You have invested significant time and effort, and now you are pausing to assess whether the harvest will justify the labour. Growth is happening, but it requires patience — pulling up the roots to check progress will only set you back. Trust the process and tend your garden faithfully.',
      zh: '你已投入大量時間和心力，現在你正停下來評估收穫是否能對得起付出。成長正在發生，但它需要耐心——拔起根來檢查進度只會讓你倒退。信任過程，忠實地照料你的花園。',
    },
    reversed: {
      en: 'Impatience or doubt about your investment is tempting you to abandon the effort prematurely. Alternatively, you may be pouring resources into something that genuinely is not yielding returns and need the honesty to pivot. Distinguish between a slow harvest and a barren field before deciding your next move.',
      zh: '對你投資的不耐煩或懷疑正誘惑你過早放棄努力。或者，你可能正在把資源傾注到一個確實沒有回報的事物中，需要坦誠地轉向。在決定下一步之前，分辨這是緩慢的收穫還是貧瘠的土地。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/seven-of-pentacles.jpg',
  },
  {
    id: 71,
    name: { en: 'Eight of Pentacles', zh: '錢幣八' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 8,
    keywords: {
      en: ['diligence', 'apprenticeship', 'mastery', 'dedication'],
      zh: ['勤勉', '學徒期', '精通', '專注投入'],
    },
    upright: {
      en: 'Dedicated, repetitive effort is forging genuine mastery. You are deep in the process of honing your craft — each repetition refines your skill and brings you closer to excellence. This is not glamorous work, but it is the most rewarding kind. Stay disciplined; the quality of your output speaks for itself.',
      zh: '專注而重複的努力正在鍛造真正的精通。你正深入磨練技藝的過程中——每一次重複都在精煉你的技能，帶你更接近卓越。這不是光鮮亮麗的工作，但它是最有回報的那種。保持紀律；你產出的品質會為自己代言。',
    },
    reversed: {
      en: 'You are cutting corners, losing motivation, or stuck in perfectionism that prevents you from finishing. The monotony of practice has drained your enthusiasm, or you are working hard on the wrong thing entirely. Reconnect with the purpose behind your labour or honestly reassess whether this path still serves you.',
      zh: '你正在偷工減料、失去動力，或陷入阻止你完成的完美主義。練習的單調已耗盡你的熱情，或者你正在完全錯誤的事情上努力。重新連結你勞動背後的目的，或誠實地重新評估這條路是否仍然適合你。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/eight-of-pentacles.jpg',
  },
  {
    id: 72,
    name: { en: 'Nine of Pentacles', zh: '錢幣九' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 9,
    keywords: {
      en: ['self-sufficiency', 'luxury', 'accomplishment', 'independence'],
      zh: ['自給自足', '奢華', '成就', '獨立'],
    },
    upright: {
      en: 'You have earned the right to enjoy the fruits of your labour in elegant comfort. Financial independence and personal accomplishment surround you — this abundance is the result of discipline, not luck. Savour this moment of self-sufficiency; you built this garden with your own hands.',
      zh: '你已贏得了在優雅舒適中享受勞動果實的權利。財務獨立和個人成就環繞著你——這份豐盛是紀律的結果，而非運氣。品味這自給自足的時刻；你用自己的雙手建造了這座花園。',
    },
    reversed: {
      en: 'Your sense of worth has become too entangled with material possessions, or financial independence is proving lonelier than expected. Overspending to maintain an image of success or neglecting relationships in pursuit of wealth is hollowing out what should feel fulfilling. Redefine what true abundance means to you.',
      zh: '你的自我價值感已與物質財產過度纏繞，或者財務獨立被證明比預期更加孤獨。為維持成功的形象而過度消費，或為追求財富而忽視關係，正在掏空本該令人滿足的東西。重新定義真正的豐盛對你而言意味著什麼。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/nine-of-pentacles.jpg',
  },
  {
    id: 73,
    name: { en: 'Ten of Pentacles', zh: '錢幣十' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 10,
    keywords: {
      en: ['legacy', 'inheritance', 'family wealth', 'long-term success'],
      zh: ['傳承', '遺產', '家族財富', '長期成功'],
    },
    upright: {
      en: 'Lasting wealth and stability extend beyond your own lifetime — this is the card of legacy, inheritance, and generational prosperity. The structures you have built provide security not just for you but for those who follow. Honour the traditions and foundations that brought you here while adding your own chapter to the story.',
      zh: '持久的財富和穩定超越了你個人的生命——這是傳承、遺產和世代繁榮的牌。你所建立的結構不僅為你提供安全，也為追隨你的人提供安全。尊重帶你走到這裡的傳統和基礎，同時為這個故事增添你自己的篇章。',
    },
    reversed: {
      en: 'Family disputes over money or inheritance are threatening the stability that took generations to build. Alternatively, you may be questioning whether the traditional path to security is truly what you want, or financial setbacks are shaking your long-term plans. Separate what is truly valuable from what is merely inherited.',
      zh: '家族中關於金錢或遺產的爭執正威脅著歷經幾代人才建立的穩定。或者，你可能在質疑通往安全的傳統路徑是否真是你想要的，或者財務挫折正在動搖你的長期計畫。區分真正有價值的東西和僅僅是繼承下來的東西。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/ten-of-pentacles.jpg',
  },
  {
    id: 74,
    name: { en: 'Page of Pentacles', zh: '錢幣侍者' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 11,
    keywords: {
      en: ['studiousness', 'new venture', 'ambition', 'practicality'],
      zh: ['勤學', '新事業', '抱負', '務實'],
    },
    upright: {
      en: 'A fresh opportunity for learning or a new practical venture has captured your attention. Approach it with the earnest studiousness of a dedicated apprentice — be willing to start at the beginning and build your knowledge step by step. This seed of ambition, nurtured with patience, has the potential to grow into something substantial.',
      zh: '一個新的學習機會或新的務實計畫已吸引了你的注意。以一個專注學徒的認真勤學態度來面對它——願意從頭開始，一步步建立你的知識。這顆抱負的種子，以耐心培育，有潛力成長為實質性的成果。',
    },
    reversed: {
      en: 'Lack of focus or unrealistic goals are preventing a promising idea from taking root. You may be all planning and no execution, or the practical demands of a new venture feel overwhelming. Break the task into smaller steps and commit to starting imperfectly rather than waiting for perfect conditions.',
      zh: '缺乏專注或不切實際的目標正阻止一個有前途的想法生根。你可能全是計畫沒有執行，或者新事業的實際要求令人感到不堪負荷。將任務分解成更小的步驟，承諾不完美地開始，而非等待完美的條件。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/page-of-pentacles.jpg',
  },
  {
    id: 75,
    name: { en: 'Knight of Pentacles', zh: '錢幣騎士' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 12,
    keywords: {
      en: ['reliability', 'hard work', 'routine', 'methodical progress'],
      zh: ['可靠', '勤奮', '日常紀律', '有條不紊的進展'],
    },
    upright: {
      en: 'Steady, reliable effort is the surest path to your goal right now. There is nothing flashy about this approach — just unwavering commitment to showing up and doing the work day after day. Your methodical progress may feel slow to others, but you know that consistency builds what intensity cannot sustain.',
      zh: '穩定、可靠的努力是你現在通往目標最確實的道路。這種方式沒有什麼華麗之處——只是堅定不移地日復一日出現和做好工作。你有條不紊的進展在別人看來可能很慢，但你知道持續性能建立強度無法維持的東西。',
    },
    reversed: {
      en: 'Stubbornness is masquerading as persistence, or you have become so attached to routine that you cannot adapt when circumstances change. Alternatively, laziness or procrastination is stalling progress you are perfectly capable of making. Shake off the inertia — efficiency without momentum is just standing still.',
      zh: '固執正偽裝成堅持，或者你已對日常慣例如此執著，以至於環境變化時無法調適。或者，懶惰或拖延正在拖慢你完全有能力做出的進展。甩掉惰性——沒有動力的效率只是原地踏步。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/knight-of-pentacles.jpg',
  },
  {
    id: 76,
    name: { en: 'Queen of Pentacles', zh: '錢幣皇后' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 13,
    keywords: {
      en: ['nurturing abundance', 'practicality', 'comfort', 'resourcefulness'],
      zh: ['滋養的豐盛', '務實', '舒適', '足智多謀'],
    },
    upright: {
      en: 'You embody the art of creating warmth and abundance in the material world without losing touch with what truly matters. Your practical wisdom turns a house into a home and a budget into a foundation for generosity. Nurture others from your overflow, not your reserves — sustainable giving begins with caring for yourself first.',
      zh: '你體現了在物質世界中創造溫暖和豐盛的藝術，同時不失去對真正重要事物的連結。你的務實智慧將房子變成家，將預算變成慷慨的基礎。從你的盈餘而非你的儲備去滋養他人——可持續的給予始於先照顧好自己。',
    },
    reversed: {
      en: 'The balance between nurturing others and nurturing yourself has tipped — either domestic or financial anxiety is consuming your peace, or you have neglected the practical foundations of your life in favour of appearances. Reconnect with the earth beneath your feet; no amount of comfort objects can replace genuine security.',
      zh: '滋養他人和滋養自己之間的平衡已傾斜——要麼家庭或財務的焦慮正在吞噬你的平靜，要麼你為了表面功夫而忽視了生活的務實基礎。重新連結腳下的大地；再多的物質安慰品也無法取代真正的安全感。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/queen-of-pentacles.jpg',
  },
  {
    id: 77,
    name: { en: 'King of Pentacles', zh: '錢幣國王' },
    arcana: 'minor',
    suit: 'pentacles',
    number: 14,
    keywords: {
      en: ['wealth', 'business acumen', 'stability', 'leadership'],
      zh: ['財富', '商業頭腦', '穩定', '領導力'],
    },
    upright: {
      en: 'You have achieved material mastery through disciplined effort and sound judgement. Your business acumen and steady leadership create an environment where others can thrive alongside you. Enjoy the security you have built, and use your position of strength to mentor and uplift — true wealth multiplies when shared wisely.',
      zh: '你透過自律的努力和健全的判斷達成了物質上的精通。你的商業頭腦和穩定的領導力創造了一個讓他人能與你一起蓬勃發展的環境。享受你所建立的安全感，並利用你的優勢地位去指導和提攜——真正的財富在被智慧地分享時倍增。',
    },
    reversed: {
      en: 'Material obsession is corrupting your values — wealth has become an end in itself rather than a means to a meaningful life. Greed, workaholism, or authoritarian control over finances is damaging your relationships and well-being. Remember that the richest person in the graveyard is still in the graveyard.',
      zh: '對物質的執迷正在腐蝕你的價值觀——財富已成為目的本身，而非通向有意義生活的手段。貪婪、工作成癮或對財務的專制控制正在損害你的關係和身心健康。記住，墓地裡最富有的人仍然在墓地裡。',
    },
    element: 'Earth',
    timeframe: 'Months to a year',
    image: '/assets/tarot/pentacles/king-of-pentacles.jpg',
  },
]

// ============================================
// All 78 Rider-Waite Tarot Cards
// ============================================

export const allTarotCards: TarotCard[] = [
  ...majorArcana,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards,
]

// ============================================
// Helpers
// ============================================

export function getTarotCardSlug(card: TarotCard): string {
  return card.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getTarotCardBySlug(slug: string): TarotCard | undefined {
  return allTarotCards.find((c) => getTarotCardSlug(c) === slug);
}

const SUIT_LABELS: Record<string, { en: string; zh: string }> = {
  major: { en: 'Major Arcana', zh: '大阿爾克那' },
  wands: { en: 'Wands', zh: '權杖' },
  cups: { en: 'Cups', zh: '聖杯' },
  swords: { en: 'Swords', zh: '寶劍' },
  pentacles: { en: 'Pentacles', zh: '錢幣' },
};

export function getTarotSuitLabel(suit: string, lang: 'en' | 'zh'): string {
  return SUIT_LABELS[suit]?.[lang] ?? suit;
}

const SUIT_DESCS: Record<string, { en: string; zh: string }> = {
  major: {
    en: 'The 22 Major Arcana represent major life themes, spiritual lessons, and karmic influences.',
    zh: '22 張大阿爾克那代表人生重大主題、靈性課題與業力影響。',
  },
  wands: {
    en: 'The suit of Wands represents fire energy — passion, creativity, ambition, and action.',
    zh: '權杖牌組代表火元素——熱情、創造力、野心與行動力。',
  },
  cups: {
    en: 'The suit of Cups represents water energy — emotions, relationships, intuition, and dreams.',
    zh: '聖杯牌組代表水元素——情感、關係、直覺與夢想。',
  },
  swords: {
    en: 'The suit of Swords represents air energy — intellect, communication, conflict, and truth.',
    zh: '寶劍牌組代表風元素——智識、溝通、衝突與真相。',
  },
  pentacles: {
    en: 'The suit of Pentacles represents earth energy — material world, finances, health, and work.',
    zh: '錢幣牌組代表土元素——物質世界、財務、健康與工作。',
  },
};

export function getTarotSuitDesc(suit: string, lang: 'en' | 'zh'): string {
  return SUIT_DESCS[suit]?.[lang] ?? '';
}
