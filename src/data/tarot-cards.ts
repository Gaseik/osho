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
