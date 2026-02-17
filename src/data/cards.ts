export interface CardDetail {
  id: number;
  slug: string;
  name: string;
  nameZh: string;
  suit: 'major' | 'fire' | 'water' | 'clouds' | 'rainbows';
  keywords: string[];
  keywordsZh: string[];
  description: string;
  descriptionZh: string;
}

export const CARD_DETAILS: CardDetail[] = [
  // ============================================
  // Major Arcana 大阿爾克納 (0-22)
  // ============================================
  {
    id: 0,
    slug: "the-fool",
    name: "The Fool",
    nameZh: "傻瓜",
    suit: "major",
    keywords: ["trust", "innocence", "leap of faith", "freedom", "spontaneity"],
    keywordsZh: ["信任", "天真", "信心之躍", "自由", "自發性"],
    description: "The Fool is not about stupidity — it is about the courage to step into the unknown without a map. Like a child taking their first steps, there is no calculation, no fear of falling, only the pure impulse to move forward.\n\nThis card appears when life is asking you to trust. Not trust in a plan or a guarantee, but trust in existence itself. The Fool walks off the cliff not because he doesn't see it, but because he knows that the sky has always caught those who dare to leap.\n\nWhen you draw this card, ask yourself: where in your life are you overthinking instead of living? What would happen if you simply said yes?",
    descriptionZh: "傻瓜這張牌與愚蠢無關——它代表的是踏入未知的勇氣。就像一個孩子邁出人生的第一步，沒有計算，沒有對跌倒的恐懼，只有向前行走的純粹衝動。\n\n這張牌出現時，生命正在邀請你去信任。不是信任某個計畫或保證，而是信任存在本身。傻瓜走下懸崖，不是因為他看不見，而是因為他知道天空永遠會接住那些敢於跳躍的人。\n\n當你抽到這張牌，問問自己：生命中哪些地方你正在過度思考而非真正活著？如果你只是單純地說「好」，會發生什麼？"
  },
  {
    id: 1,
    slug: "existence",
    name: "Existence",
    nameZh: "存在",
    suit: "major",
    keywords: ["wholeness", "belonging", "cosmic unity", "connection", "home"],
    keywordsZh: ["圓滿", "歸屬", "宇宙合一", "連結", "歸家"],
    description: "Existence reminds you that you are not separate from the world — you are an expression of it. Just as a wave is not separate from the ocean, your life is not separate from the vast web of existence.\n\nThis card comes as a deep reassurance. Whatever loneliness or disconnection you may feel, it is an illusion of the mind. You belong here. You have always belonged here. The trees, the stars, the breath in your lungs — all of it is one fabric, and you are woven into it.\n\nWhen this card appears, let go of the need to justify your place in the world. You don't need permission to exist. You already are.",
    descriptionZh: "存在這張牌提醒你，你與這個世界並非分離的——你是它的表達。就像海浪與大海不可分割，你的生命也與廣大的存在之網緊密相連。\n\n這張牌帶來一種深層的安心。無論你感受到多少孤獨或疏離，那都是頭腦的幻象。你屬於這裡。你一直屬於這裡。樹木、星辰、你肺中的呼吸——一切都是同一張織錦，而你就編織在其中。\n\n當這張牌出現時，放下那個需要證明自己存在價值的念頭。你不需要許可才能存在。你已經在了。"
  },
  {
    id: 2,
    slug: "inner-voice",
    name: "Inner Voice",
    nameZh: "內在之聲",
    suit: "major",
    keywords: ["intuition", "inner truth", "guidance", "stillness", "listening"],
    keywordsZh: ["直覺", "內在真相", "指引", "靜定", "聆聽"],
    description: "Beneath the noise of opinions, expectations, and fears, there is a voice that has always known the way. It does not shout. It does not argue. It simply knows.\n\nThe Inner Voice card appears when you are being pulled in many directions by the outside world. Everyone has advice. Everyone has opinions. But the only compass that truly works is the one inside your chest. This card is an invitation to get quiet enough to hear it.\n\nYou already know the answer to the question you are asking. The challenge is not finding the truth — it is having the courage to listen to it.",
    descriptionZh: "在各種意見、期待和恐懼的噪音之下，有一個聲音始終知道方向。它不會大喊大叫，不會爭辯，它只是靜靜地知道。\n\n內在之聲這張牌出現時，代表你正被外在世界拉向許多方向。每個人都有建議，每個人都有看法。但唯一真正有效的指南針，是你胸口裡的那一個。這張牌邀請你安靜下來，安靜到足以聽見它。\n\n你已經知道你正在問的問題的答案。挑戰不在於找到真相——而在於有勇氣去聆聽它。"
  },
  {
    id: 3,
    slug: "creativity",
    name: "Creativity",
    nameZh: "創造力",
    suit: "major",
    keywords: ["expression", "inspiration", "divine channel", "flow", "creation"],
    keywordsZh: ["表達", "靈感", "神聖通道", "心流", "創造"],
    description: "Creativity is not about painting or writing — it is about allowing life to flow through you without obstruction. When the ego steps aside, something greater begins to move. A song writes itself. A solution appears. A conversation becomes poetry.\n\nThis card appears when creative energy is ready to move through you. It may come as a sudden urge to make something, or as a restlessness that can only be resolved by creating. Don't wait for perfection. Don't wait for permission. The act of creation is its own reward.\n\nLet yourself be the instrument. The music already exists — it just needs you to play it.",
    descriptionZh: "創造力不僅僅是畫畫或寫作——它是讓生命毫無阻礙地流經你。當小我退到一旁，某種更大的力量開始流動。一首歌自己寫出來了，一個解答自然浮現，一段對話變成了詩。\n\n這張牌出現時，代表創造的能量已經準備好流經你。它可能是一股突然想做點什麼的衝動，或是一種唯有透過創造才能化解的不安。不要等待完美，不要等待許可。創造的行為本身就是回報。\n\n讓自己成為那個樂器。音樂早已存在——它只需要你來演奏。"
  },
  {
    id: 4,
    slug: "the-rebel",
    name: "The Rebel",
    nameZh: "叛逆者",
    suit: "major",
    keywords: ["individuality", "courage", "breaking free", "authenticity", "power"],
    keywordsZh: ["個體性", "勇氣", "突破束縛", "真實", "力量"],
    description: "The Rebel is not about fighting against the world. It is about refusing to betray yourself. When society says \"fit in\" and your soul says \"stand out,\" the Rebel chooses the soul every time.\n\nThis card appears when you are at a crossroads between conformity and authenticity. Perhaps you are staying in a situation that no longer serves you because it feels safe. Perhaps you are dimming your light so others won't feel uncomfortable. The Rebel says: stop.\n\nTrue rebellion is not loud or aggressive. It is the quiet, unshakable commitment to being exactly who you are, regardless of the cost.",
    descriptionZh: "叛逆者並非與世界對抗。而是拒絕背叛自己。當社會說「融入」而你的靈魂說「做自己」，叛逆者每一次都選擇靈魂。\n\n這張牌出現時，你正站在從眾與真實之間的十字路口。也許你待在一個已經不再適合你的處境裡，只因為它感覺安全。也許你正在壓抑自己的光，好讓別人不會感到不舒服。叛逆者說：夠了。\n\n真正的叛逆不是喧囂或攻擊。而是安靜的、不可動搖的承諾——無論代價如何，忠於你真正的自己。"
  },
  {
    id: 5,
    slug: "no-thingness",
    name: "No-Thingness",
    nameZh: "空",
    suit: "major",
    keywords: ["void", "potential", "emptiness", "silence", "origin"],
    keywordsZh: ["虛空", "潛能", "空性", "寂靜", "源頭"],
    description: "Before creation, there was nothing. And within that nothing, everything was possible. No-Thingness is not absence — it is the ultimate fullness, the pregnant void from which all things emerge.\n\nThis card appears when you feel empty, lost, or directionless. But what feels like emptiness is actually a clearing. Life is making space for something new. The old has fallen away, and the new has not yet arrived. This in-between space is sacred.\n\nDon't rush to fill the void. Sit with it. Breathe into it. The seed germinates in darkness before it ever reaches the light.",
    descriptionZh: "在創造之前，什麼都沒有。而在那個「沒有」之中，一切皆有可能。空不是缺席——它是終極的豐盈，是萬物從中湧現的孕育之虛空。\n\n這張牌出現時，你可能感到空虛、迷失或失去方向。但那感覺像是空虛的東西，實際上是一種清理。生命正在為新的事物騰出空間。舊的已經落下，新的尚未到來。這個中間地帶是神聖的。\n\n不要急著填滿虛空。與它同在，呼吸進入它。種子在黑暗中發芽，然後才觸及光明。"
  },
  {
    id: 6,
    slug: "the-lovers",
    name: "The Lovers",
    nameZh: "愛侶",
    suit: "major",
    keywords: ["union", "love", "reflection", "harmony", "connection"],
    keywordsZh: ["結合", "愛", "映照", "和諧", "連結"],
    description: "The Lovers is not just about romantic love — it is about the meeting of two whole beings. When you are complete within yourself, love becomes a sharing rather than a need. Two flames merging into a greater fire.\n\nThis card appears when a deep connection is present or approaching in your life. It could be romantic, creative, or spiritual. The key message is that true union begins within. When you love and accept all parts of yourself, you become capable of truly seeing and being seen by another.\n\nLet love be a mirror, not a crutch. The most beautiful relationships are those where both people are already whole.",
    descriptionZh: "愛侶這張牌不僅僅關於浪漫的愛情——它是兩個完整的存在的相遇。當你在內在是圓滿的，愛就成為一種分享而非需要。兩束火焰融合成更大的火焰。\n\n這張牌出現時，一段深刻的連結正在你的生命中發生或即將到來。它可能是浪漫的、創造性的，或是靈性的。核心訊息是：真正的結合始於內在。當你愛並接納自己的所有面向，你才有能力真正看見另一個人，也被看見。\n\n讓愛成為一面鏡子，而不是一根拐杖。最美的關係，是兩個已經完整的人的相遇。"
  },
  {
    id: 7,
    slug: "awareness",
    name: "Awareness",
    nameZh: "覺知",
    suit: "major",
    keywords: ["consciousness", "presence", "clarity", "wakefulness", "seeing"],
    keywordsZh: ["意識", "臨在", "清明", "覺醒", "看見"],
    description: "Awareness is the fire that burns away illusion. It is not something you achieve — it is what remains when you stop pretending. When you stop running from yourself, you see clearly for the first time.\n\nThis card is a call to wake up. Not in some grand spiritual sense, but in the most practical way: pay attention to this moment. Notice what you are feeling right now. Notice what you are avoiding. The simple act of seeing — without judgment — is the most transformative force there is.\n\nYou don't need to change anything. You just need to see it. Awareness itself is the alchemy.",
    descriptionZh: "覺知是燃燒幻象的火焰。它不是你需要去達成的東西——它是當你停止假裝時所剩下的。當你停止逃避自己，你第一次真正看清了。\n\n這張牌是一個醒來的呼喚。不是什麼宏大的靈性意義，而是最實際的方式：注意此刻。留意你現在的感受。留意你正在逃避什麼。單純的看見——不帶評判——就是最具變革力量的力量。\n\n你不需要改變任何事。你只需要看見它。覺知本身就是煉金術。"
  },
  {
    id: 8,
    slug: "courage",
    name: "Courage",
    nameZh: "勇氣",
    suit: "major",
    keywords: ["bravery", "vulnerability", "strength", "heart", "growth"],
    keywordsZh: ["勇敢", "脆弱", "力量", "心", "成長"],
    description: "Courage is not the absence of fear — it is the willingness to move forward with your heart wide open, even when you are afraid. Like a flower pushing through rock, true courage is soft and relentless at the same time.\n\nThis card appears when life is asking you to be brave. Not the bravery of warriors and heroes, but the quiet bravery of being vulnerable. Speaking your truth. Opening your heart again after it has been broken. Choosing growth over comfort.\n\nThe word courage comes from the French word for heart — coeur. Real courage is always an act of the heart.",
    descriptionZh: "勇氣不是沒有恐懼——而是願意在心完全敞開的狀態下向前走，即使你感到害怕。就像一朵花穿過岩石綻放，真正的勇氣既柔軟又堅定。\n\n這張牌出現時，生命正在邀請你勇敢。不是戰士和英雄的勇敢，而是脆弱的勇敢。說出你的真實。在心碎之後再次打開心。選擇成長而非舒適。\n\n勇氣（courage）這個字源自法語中「心」的意思——coeur。真正的勇氣，永遠是一個來自心的行動。"
  },
  {
    id: 9,
    slug: "aloneness",
    name: "Aloneness",
    nameZh: "單獨",
    suit: "major",
    keywords: ["solitude", "self-sufficiency", "independence", "inner peace", "wholeness"],
    keywordsZh: ["獨處", "自給自足", "獨立", "內在平靜", "完整"],
    description: "There is a vast difference between loneliness and aloneness. Loneliness is the pain of being without others. Aloneness is the joy of being with yourself. This card speaks of the second kind.\n\nWhen Aloneness appears, it is an invitation to enjoy your own company. To stop seeking validation from the outside and discover the richness that lives within. The person who can sit alone in silence and feel at peace has found something that no relationship or achievement can provide.\n\nThis is not about isolation. It is about becoming so rooted in your own being that connection with others becomes a choice, not a need.",
    descriptionZh: "孤獨與單獨之間有著巨大的區別。孤獨是沒有他人的痛苦。單獨是與自己同在的喜悅。這張牌說的是第二種。\n\n當單獨出現時，它邀請你享受與自己相處的時光。停止向外尋求認可，去發現內在的豐富。一個能夠獨自靜坐並感到平靜的人，找到了任何關係或成就都無法提供的東西。\n\n這不是關於隔離。而是關於在自己的存在中如此扎根，以至於與他人的連結成為一種選擇，而非一種需要。"
  },
  {
    id: 10,
    slug: "change",
    name: "Change",
    nameZh: "改變",
    suit: "major",
    keywords: ["cycles", "impermanence", "karma", "transformation", "flow"],
    keywordsZh: ["循環", "無常", "業力", "轉化", "流動"],
    description: "The only constant in life is change. The wheel turns — sometimes you are on top, sometimes at the bottom. This card is a reminder that whatever you are experiencing right now, it will not last forever.\n\nIf things are difficult, take comfort: this too shall pass. If things are wonderful, be present: this too shall pass. Change is not your enemy. It is the very nature of life itself. Resisting it creates suffering. Flowing with it creates freedom.\n\nThis card asks you to release your grip on how things \"should\" be and open to how things are becoming.",
    descriptionZh: "生命中唯一不變的就是改變。輪子轉動——有時你在頂端，有時在底部。這張牌提醒你，無論你現在正在經歷什麼，它都不會永遠持續。\n\n如果事情很困難，請安心：這也會過去。如果事情很美好，請臨在：這也會過去。改變不是你的敵人，它是生命本身的本質。抵抗它創造痛苦，順應它創造自由。\n\n這張牌邀請你放開對事物「應該」如何的執著，向正在發生的一切敞開。"
  },
  {
    id: 11,
    slug: "breakthrough",
    name: "Breakthrough",
    nameZh: "突破",
    suit: "major",
    keywords: ["liberation", "insight", "freedom", "release", "awakening"],
    keywordsZh: ["解放", "洞見", "自由", "釋放", "覺醒"],
    description: "Something is ready to break open. The pressure that has been building — the tension, the confusion, the feeling of being stuck — is about to release. Breakthrough is not gentle. It is lightning splitting a dark sky.\n\nThis card appears at turning points. The old structure of your life, your beliefs, or your self-image is cracking. This may feel chaotic or even frightening, but it is ultimately liberating. What falls away was never truly yours to begin with.\n\nDon't try to hold the pieces together. Let them fall. What emerges from the rubble will be more real, more alive, and more you than anything that came before.",
    descriptionZh: "有什麼東西已經準備好要破開了。一直在累積的壓力——那些緊張、困惑、被困住的感覺——即將釋放。突破不是溫柔的，它是閃電劈開黑暗的天空。\n\n這張牌出現在轉折點。你的生活、信念或自我形象的舊結構正在裂開。這可能感覺混亂甚至可怕，但最終它是解放的。那些掉落的東西，從一開始就不真正屬於你。\n\n不要試圖把碎片拼回去。讓它們落下。從廢墟中浮現的，會比之前的一切都更真實、更有生命力、更是你。"
  },
  {
    id: 12,
    slug: "new-vision",
    name: "New Vision",
    nameZh: "新願景",
    suit: "major",
    keywords: ["perspective", "transcendence", "seeing whole", "clarity", "overview"],
    keywordsZh: ["視角", "超越", "看見全貌", "清明", "俯瞰"],
    description: "You have been looking at the situation from too close. Step back. Rise above. From a higher vantage point, the maze that seemed impossible suddenly reveals its pathways.\n\nNew Vision asks you to transcend duality — good and bad, right and wrong, success and failure. These are labels the mind creates. From a wider perspective, everything is part of one interconnected unfolding. What seemed like a mistake may be the most important step on your path.\n\nThis card invites you to see with fresh eyes. Drop your assumptions. Drop your story. Look again, as if for the first time.",
    descriptionZh: "你一直在太近的距離看這個狀況。退後一步，升高視角。從更高的地方看，那個看似不可能的迷宮突然顯露出它的路徑。\n\n新願景邀請你超越二元對立——好與壞、對與錯、成功與失敗。這些都是頭腦創造的標籤。從更寬廣的視角來看，一切都是同一個相互連結的展開過程的一部分。那個看似錯誤的東西，可能是你道路上最重要的一步。\n\n這張牌邀請你用全新的眼光去看。放下你的假設，放下你的故事。重新看，像是第一次。"
  },
  {
    id: 13,
    slug: "transformation",
    name: "Transformation",
    nameZh: "蛻變",
    suit: "major",
    keywords: ["death", "rebirth", "letting go", "ego death", "renewal"],
    keywordsZh: ["死亡", "重生", "放下", "自我消融", "更新"],
    description: "Something in your life is dying. It might be a relationship, an identity, a belief, or a way of living. This death is not punishment — it is nature's way of making room for new life.\n\nTransformation is the most misunderstood card. People fear it because they cling to what is familiar. But the caterpillar must dissolve completely before the butterfly can emerge. There is no shortcut. There is no way to keep the old form and also fly.\n\nSurrender to the process. Grieve what needs to be grieved. Then turn your face toward the light that is already appearing on the horizon.",
    descriptionZh: "你生命中有什麼東西正在死去。它可能是一段關係、一個身份、一個信念，或一種生活方式。這種死亡不是懲罰——它是大自然為新生命騰出空間的方式。\n\n蛻變是最被誤解的一張牌。人們害怕它，因為他們緊抓著熟悉的事物。但毛毛蟲必須完全溶解，蝴蝶才能出現。沒有捷徑。你無法保留舊的形式同時還能飛翔。\n\n臣服於這個過程。為需要悲傷的事物悲傷。然後將你的臉轉向那已經出現在地平線上的光。"
  },
  {
    id: 14,
    slug: "integration",
    name: "Integration",
    nameZh: "整合",
    suit: "major",
    keywords: ["balance", "yin yang", "union of opposites", "harmony", "wholeness"],
    keywordsZh: ["平衡", "陰陽", "對立統一", "和諧", "完整"],
    description: "You have been living in one extreme. Perhaps too much thinking, not enough feeling. Too much giving, not enough receiving. Too much doing, not enough being. Integration asks you to honor both sides.\n\nThe masculine and the feminine, the light and the dark, the rational and the intuitive — these are not enemies. They are dance partners. When they move together, life becomes graceful instead of forced.\n\nThis card invites you to stop choosing sides and start embracing the whole. You are not one thing. You are everything — and the art of living is letting all of it breathe.",
    descriptionZh: "你一直活在一個極端裡。也許太多思考、不夠感受。太多付出、不夠接收。太多做、不夠在。整合邀請你尊重兩面。\n\n陽性與陰性、光明與黑暗、理性與直覺——它們不是敵人，是舞伴。當它們一起流動，生命變得優雅而非勉強。\n\n這張牌邀請你停止選邊站，開始擁抱整體。你不是一件事物，你是一切——而生活的藝術，就是讓這一切都能呼吸。"
  },
  {
    id: 15,
    slug: "conditioning",
    name: "Conditioning",
    nameZh: "制約",
    suit: "major",
    keywords: ["social patterns", "conformity", "inherited beliefs", "programming", "masks"],
    keywordsZh: ["社會模式", "從眾", "繼承的信念", "制約程式", "面具"],
    description: "How much of what you believe is truly yours? And how much was handed to you by your parents, your culture, your education? Conditioning is the invisible cage — you don't see the bars because they were installed before you could question them.\n\nThis card appears when it is time to examine your autopilot. The rules you follow, the roles you play, the way you define success and failure — are these your own? Or are you living someone else's script?\n\nBreaking free from conditioning doesn't mean rejecting everything. It means choosing consciously. Keep what serves you. Release what was never yours to carry.",
    descriptionZh: "你所相信的，有多少真正是你的？又有多少是你的父母、文化、教育給你的？制約是一個看不見的牢籠——你看不見那些柵欄，因為它們在你能質疑之前就已經安裝好了。\n\n這張牌出現時，是時候檢視你的自動導航了。你遵循的規則、你扮演的角色、你定義成功和失敗的方式——這些是你自己的嗎？還是你在活著別人的劇本？\n\n掙脫制約不意味著否定一切。而是有意識地選擇。留下對你有益的，釋放那些從來不屬於你的重擔。"
  },
  {
    id: 16,
    slug: "thunderbolt",
    name: "Thunderbolt",
    nameZh: "雷霆",
    suit: "major",
    keywords: ["sudden change", "destruction", "awakening", "shock", "truth"],
    keywordsZh: ["突變", "摧毀", "覺醒", "震撼", "真相"],
    description: "The Thunderbolt strikes without warning. It destroys what is false, what is built on weak foundations, what no longer serves the truth. It is sudden, dramatic, and irreversible.\n\nThis card often appears when life delivers an unexpected blow — a job loss, a breakup, a revelation that changes everything. It feels like destruction, but look closer: what was destroyed was already crumbling. The Thunderbolt simply accelerated the inevitable.\n\nAfter the storm, the air is clearer than ever. What remains standing is what is real. Trust that this clearing, however painful, is making space for something more authentic.",
    descriptionZh: "雷霆毫無預警地降臨。它摧毀虛假的東西、建立在薄弱基礎上的東西、不再服務於真相的東西。它是突然的、戲劇性的、不可逆的。\n\n這張牌常常出現在生命給你意外一擊的時候——失去工作、分手、一個改變一切的真相。它感覺像是毀滅，但仔細看：被摧毀的東西本來就已經在崩塌了。雷霆只是加速了不可避免的事。\n\n風暴過後，空氣比以往更清澈。那些仍然站立的，才是真實的。相信這場清理，無論多麼痛苦，都在為更真實的事物騰出空間。"
  },
  {
    id: 17,
    slug: "silence",
    name: "Silence",
    nameZh: "沈默",
    suit: "major",
    keywords: ["stillness", "meditation", "peace", "inner quiet", "depth"],
    keywordsZh: ["靜定", "冥想", "平靜", "內在寂靜", "深度"],
    description: "In the silence between two thoughts, there is an entire universe. Most people never visit it because they are too busy with the noise — the endless chatter of the mind, the constant stimulation of the world.\n\nThis card is a gentle invitation to stop. Not to think about stopping. Not to plan to stop. Just stop. Right now. Take a breath. Feel the space between the inhale and the exhale. That gap is silence, and it is always available to you.\n\nSilence is not the absence of sound. It is the presence of awareness. In silence, you hear what truly matters.",
    descriptionZh: "在兩個念頭之間的寂靜中，有一整個宇宙。大多數人從不造訪那裡，因為他們太忙於噪音——頭腦無止盡的喋喋不休，世界持續的刺激。\n\n這張牌是一個溫柔的邀請：停下來。不是思考要停下來，不是計畫要停下來，就是停下來。就是現在。吸一口氣，感受吸氣和呼氣之間的空間。那個間隙就是沈默，它一直都在那裡等你。\n\n沈默不是聲音的缺席，而是覺知的臨在。在沈默中，你聽見真正重要的東西。"
  },
  {
    id: 18,
    slug: "past-lives",
    name: "Past Lives",
    nameZh: "前世",
    suit: "major",
    keywords: ["karma", "patterns", "unconscious", "cycles", "depth"],
    keywordsZh: ["業力", "模式", "無意識", "循環", "深度"],
    description: "Some patterns in your life are older than you realize. The same relationship dynamic repeating. The same fear surfacing in different forms. The same self-sabotage at the moment of success. Past Lives points to the deep grooves carved by repetition.\n\nWhether you interpret this literally or metaphorically doesn't matter. What matters is the recognition that you are carrying something ancient — a pattern that has been running long before you became aware of it.\n\nThis card invites you to look beneath the surface. What cycle are you ready to break? What inherited story are you ready to rewrite? Awareness of the pattern is the first step to freedom from it.",
    descriptionZh: "你生命中的某些模式比你意識到的更古老。同樣的關係動態不斷重複，同樣的恐懼以不同形式浮現，同樣的自我破壞在成功的時刻出現。前世指向那些被反覆刻劃出的深深軌跡。\n\n你是從字面上還是比喻上理解這張牌並不重要。重要的是認識到你正在攜帶某種古老的東西——一個在你意識到它之前就已經運行很久的模式。\n\n這張牌邀請你看向表面之下。你準備好打破什麼循環了？你準備好改寫什麼繼承來的故事了？對模式的覺知，是從中解脫的第一步。"
  },
  {
    id: 19,
    slug: "innocence",
    name: "Innocence",
    nameZh: "天真",
    suit: "major",
    keywords: ["wonder", "simplicity", "wisdom", "purity", "presence"],
    keywordsZh: ["驚奇", "簡單", "智慧", "純淨", "臨在"],
    description: "Innocence is not naivety. It is the wisdom that comes full circle — from the simplicity of childhood, through the complexity of experience, back to a simplicity that carries depth. The old man watching a dragonfly with the same wonder as a child.\n\nThis card appears when you are overcomplicating things. Your mind has created layers of analysis, strategy, and worry that obscure what is actually quite simple. Strip it all away. What remains?\n\nInnocence is seeing the world without the filter of past experiences. It is the ability to be surprised, to be moved, to be fully here. This is not something you need to learn — it is something you need to remember.",
    descriptionZh: "天真不是天真無知。它是走了一圈之後回來的智慧——從孩童的單純，經過經驗的複雜，回到一種帶著深度的單純。就像一位老人帶著與孩子一樣的驚奇注視著一隻蜻蜓。\n\n這張牌出現時，代表你正在把事情過度複雜化。你的頭腦創造了層層的分析、策略和擔憂，遮蔽了其實很簡單的東西。把這一切都剝掉，剩下什麼？\n\n天真是不帶過去經驗的濾鏡去看世界。是能夠驚訝、能夠被觸動、能夠完全在這裡的能力。這不是你需要學習的東西——而是你需要記起的東西。"
  },
  {
    id: 20,
    slug: "beyond-illusion",
    name: "Beyond Illusion",
    nameZh: "超越幻象",
    suit: "major",
    keywords: ["awakening", "truth", "seeing through", "liberation", "reality"],
    keywordsZh: ["覺醒", "真相", "看穿", "解脫", "實相"],
    description: "What you thought was real may not be. The story you have been telling yourself — about who you are, what you deserve, what is possible — is just that: a story. Beyond Illusion is the moment the veil drops.\n\nThis card appears when you are ready to see through something that has been deceiving you. It might be a belief about yourself, an idealized image of someone else, or a situation you've been avoiding the truth about. The illusion was comfortable. The truth is freeing.\n\nDon't be afraid of what you see. The butterfly has always been real. It was only your belief that you were a caterpillar that kept you crawling.",
    descriptionZh: "你以為是真實的東西，可能並非如此。你一直告訴自己的那個故事——關於你是誰、你值得什麼、什麼是可能的——只是一個故事。超越幻象就是面紗掉落的那一刻。\n\n這張牌出現時，你已經準備好看穿某個一直在欺騙你的東西。它可能是一個關於自己的信念、對某人理想化的形象，或一個你一直在逃避真相的處境。幻象是舒適的，真相是解放的。\n\n不要害怕你所看見的。蝴蝶一直是真實的。讓你一直在爬行的，只是你以為自己是毛毛蟲的那個信念。"
  },
  {
    id: 21,
    slug: "completion",
    name: "Completion",
    nameZh: "完成",
    suit: "major",
    keywords: ["fulfillment", "wholeness", "celebration", "arrival", "peace"],
    keywordsZh: ["圓滿", "完整", "慶祝", "抵達", "平靜"],
    description: "A cycle is complete. Not because everything went according to plan, but because you have arrived at a place of understanding. The puzzle pieces have found their places, and you can finally see the whole picture.\n\nCompletion is a rare and precious moment. It is the exhale after a long journey. Take time to honor it. Celebrate not just what you achieved, but who you became along the way.\n\nThis card also carries a gentle reminder: completion is not an endpoint. It is a resting place before the next cycle begins. Enjoy this moment of wholeness. You have earned it.",
    descriptionZh: "一個循環完成了。不是因為一切都按計畫進行，而是因為你抵達了一個理解的地方。拼圖的碎片找到了它們的位置，你終於可以看見全貌。\n\n完成是一個稀有而珍貴的時刻。它是長途旅程之後的呼氣。花時間去尊重它。慶祝的不僅是你達成了什麼，還有你在途中成為了誰。\n\n這張牌也帶著一個溫柔的提醒：完成不是終點，而是下一個循環開始前的休息處。享受這個圓滿的時刻。你值得。"
  },
  {
    id: 22,
    slug: "the-master",
    name: "The Master",
    nameZh: "師父",
    suit: "major",
    keywords: ["wisdom", "mastery", "consciousness", "teaching", "enlightenment"],
    keywordsZh: ["智慧", "精通", "意識", "教導", "開悟"],
    description: "The Master is not someone who has all the answers. The Master is someone who has dissolved all the questions. In the space where questions used to be, there is only presence — vast, clear, and infinitely compassionate.\n\nThis card represents the highest potential within you. Not as a distant goal, but as something that is already here, waiting to be recognized. You don't need to become the Master. You need to stop being everything else.\n\nWhen this card appears, it is a reminder that the teacher you are seeking is within. Trust your deepest knowing. The wisdom of a thousand lifetimes is already yours.",
    descriptionZh: "師父不是一個擁有所有答案的人。師父是一個消融了所有問題的人。在曾經有問題的地方，只剩下臨在——廣闊的、清明的、無限慈悲的。\n\n這張牌代表你內在的最高潛能。不是一個遙遠的目標，而是某個已經在這裡、等待被認出的東西。你不需要成為師父，你只需要停止成為其他一切。\n\n當這張牌出現時，它提醒你，你正在尋找的導師就在內在。信任你最深處的了悟。千世的智慧已經是你的了。"
  },

  // ============================================
  // Fire 火族群 (23-36)
  // ============================================
  {
    id: 23,
    slug: "fire-ace",
    name: "The Source",
    nameZh: "源頭",
    suit: "fire",
    keywords: ["primal energy", "inner fire", "life force", "beginning", "spark"],
    keywordsZh: ["原始能量", "內在之火", "生命力", "開端", "火花"],
    description: "Deep within you, there is a fire that never goes out. It is the source of all your energy, passion, and will to live. The Source card represents this primal flame — the spark that existed before your personality, before your stories, before your fears.\n\nThis card appears when it is time to reconnect with your raw life force. Perhaps you have been living too much in your head, too much in routine, too much in other people's expectations. Return to the source. What makes you burn? What makes you feel truly alive?\n\nThis is the beginning of something powerful. Fan the flame.",
    descriptionZh: "在你的深處，有一把永不熄滅的火。它是你所有能量、熱情和生命意志的源頭。源頭這張牌代表這股原始的火焰——在你的人格之前、故事之前、恐懼之前就已存在的火花。\n\n這張牌出現時，是時候重新連結你的原始生命力了。也許你一直太活在頭腦裡、太活在例行公事裡、太活在別人的期待裡。回到源頭。什麼讓你燃燒？什麼讓你感到真正活著？\n\n這是某個強大事物的開端。把火焰吹旺吧。"
  },
  {
    id: 24,
    slug: "possibilities",
    name: "Possibilities",
    nameZh: "可能性",
    suit: "fire",
    keywords: ["vision", "horizon", "opportunity", "expansion", "perspective"],
    keywordsZh: ["願景", "地平線", "機會", "擴展", "視野"],
    description: "Like an eagle soaring above the landscape, you are being invited to see the bigger picture. From up here, the possibilities are endless. Paths you didn't know existed become visible. Options you hadn't considered suddenly appear.\n\nThis card comes when you have been too focused on obstacles and not enough on openings. Lift your gaze. The door you've been pushing against may not be the only door. There are windows, side paths, and open skies that you haven't noticed.\n\nExpand your vision. What would you do if you believed anything was possible?",
    descriptionZh: "就像一隻老鷹翱翔在大地之上，你被邀請去看見更大的圖景。從這裡看，可能性是無限的。你不知道存在的道路變得可見，你沒有考慮過的選項突然出現。\n\n這張牌出現在你太專注於障礙、而不夠關注出口的時候。抬起你的目光。你一直在推的那扇門可能不是唯一的門。還有窗戶、小路和你沒注意到的開闊天空。\n\n擴展你的視野。如果你相信一切皆有可能，你會做什麼？"
  },
  {
    id: 25,
    slug: "experiencing",
    name: "Experiencing",
    nameZh: "體驗",
    suit: "fire",
    keywords: ["presence", "sensation", "nature", "direct experience", "aliveness"],
    keywordsZh: ["臨在", "感受", "自然", "直接體驗", "活力"],
    description: "Stop reading about life and start touching it. Experiencing is about direct contact — feeling the bark of a tree, tasting the rain, letting music move through your body instead of just hearing it.\n\nThis card appears when you have been too much in your head. Theories, plans, and analysis have their place, but they are no substitute for lived experience. The map is not the territory. Put down the map and walk.\n\nToday, choose one thing and experience it fully. Not as a concept. Not as a memory. But as a living, breathing moment that you are inside of right now.",
    descriptionZh: "停止閱讀關於生活的東西，開始觸摸它。體驗是關於直接的接觸——感受樹皮的觸感、品嚐雨水、讓音樂穿過你的身體而不只是聽見它。\n\n這張牌出現時，你一直太活在頭腦裡了。理論、計畫和分析有它們的位置，但它們無法取代活生生的體驗。地圖不是疆域本身。放下地圖，開始行走。\n\n今天，選一件事情，完全地體驗它。不是作為一個概念，不是作為一個記憶，而是作為一個你正身在其中的活生生的、呼吸著的當下。"
  },
  {
    id: 26,
    slug: "participation",
    name: "Participation",
    nameZh: "參與",
    suit: "fire",
    keywords: ["engagement", "action", "joining", "community", "involvement"],
    keywordsZh: ["投入", "行動", "加入", "社群", "參與"],
    description: "Life is not a spectator sport. Participation means jumping in — not perfectly, not with a guarantee of success, but with your whole being. The mandala of existence invites you to take your place.\n\nThis card appears when you have been watching from the sidelines. Perhaps fear of failure, judgment, or vulnerability has kept you from fully engaging. But life rewards those who show up. Imperfect action beats perfect hesitation every time.\n\nSay yes. Join in. Contribute your unique note to the symphony. The music is incomplete without you.",
    descriptionZh: "生活不是一場旁觀者的運動。參與意味著跳進去——不是完美地、不是帶著成功的保證，而是帶著你的整個存在。存在的曼陀羅邀請你就位。\n\n這張牌出現時，你一直在旁邊觀望。也許對失敗、評判或脆弱的恐懼讓你無法全然投入。但生命回報那些現身的人。不完美的行動每次都勝過完美的猶豫。\n\n說「好」。加入進來。把你獨特的音符貢獻給這場交響曲。沒有你，音樂是不完整的。"
  },
  {
    id: 27,
    slug: "totality",
    name: "Totality",
    nameZh: "全神貫注",
    suit: "fire",
    keywords: ["focus", "commitment", "wholehearted", "presence", "dedication"],
    keywordsZh: ["專注", "全心投入", "全然", "臨在", "奉獻"],
    description: "The trapeze artist does not think about the audience, the height, or what happens if she falls. In the moment of the leap, there is only the leap. This is totality — giving yourself completely to what you are doing.\n\nThis card appears when half-hearted effort is holding you back. You are splitting your energy between too many things, or holding back out of fear. Totality asks you to choose one thing and pour yourself into it completely.\n\nWhen you do anything with your total being, it becomes sacred. Washing dishes with totality is more meaningful than meditating with a divided mind.",
    descriptionZh: "空中飛人不會想觀眾、高度或掉下去會怎樣。在跳躍的那一刻，只有跳躍。這就是全神貫注——完全地把自己交給你正在做的事。\n\n這張牌出現時，三心二意的努力正在拖累你。你把能量分散在太多事情上，或者因為恐懼而有所保留。全神貫注要求你選擇一件事，然後完全傾注自己。\n\n當你帶著全部的存在去做任何事，它就成為神聖的。帶著全然去洗碗，比帶著分裂的心去冥想更有意義。"
  },
  {
    id: 28,
    slug: "success",
    name: "Success",
    nameZh: "成功",
    suit: "fire",
    keywords: ["achievement", "recognition", "celebration", "fruition", "harvest"],
    keywordsZh: ["成就", "認可", "慶祝", "結果", "收穫"],
    description: "You have earned this. The effort, the dedication, the late nights and early mornings — they are bearing fruit. Success is here, and it deserves to be celebrated.\n\nBut this card also carries a deeper message: don't let success become your identity. Enjoy the parade, wave to the crowd, feel the warmth of recognition. Then let it go. The greatest danger of success is believing that it defines you.\n\nTrue success is not what others see. It is the quiet satisfaction of knowing you gave everything you had. That feeling belongs to you, regardless of whether anyone else notices.",
    descriptionZh: "你值得這一切。那些努力、奉獻、熬夜和早起——它們正在結出果實。成功到來了，它值得被慶祝。\n\n但這張牌也帶著更深的訊息：不要讓成功成為你的身份。享受遊行，向人群揮手，感受被認可的溫暖。然後放下它。成功最大的危險是相信它定義了你。\n\n真正的成功不是別人看到的。而是那份安靜的滿足感——知道你付出了全部。無論有沒有人注意到，那份感覺都屬於你。"
  },
  {
    id: 29,
    slug: "stress",
    name: "Stress",
    nameZh: "壓力",
    suit: "fire",
    keywords: ["overwhelm", "burnout", "scattered energy", "tension", "overload"],
    keywordsZh: ["超載", "倦怠", "能量分散", "緊繃", "過度負荷"],
    description: "You are wearing too many hats, juggling too many balls, running on fumes. Stress is not a badge of honor — it is a warning signal. Your body and mind are telling you that something needs to change.\n\nThis card appears when you have lost the balance between doing and being. You have become a machine — productive, efficient, but hollow. The spark that made you start is being buried under the weight of demands.\n\nStop. Breathe. Ask yourself: what can I put down? Not everything is urgent. Not everything is your responsibility. The world will not collapse if you rest.",
    descriptionZh: "你戴著太多頂帽子，同時拋接太多顆球，靠著最後一點燃料在跑。壓力不是榮譽勳章——它是一個警告信號。你的身體和心智正在告訴你，有什麼東西需要改變。\n\n這張牌出現時，你已經失去了做與在之間的平衡。你變成了一台機器——高產、高效，但空洞。讓你開始的那個火花，正被需求的重量所掩埋。\n\n停下來。呼吸。問問自己：我可以放下什麼？不是所有事情都緊急。不是所有事情都是你的責任。你休息了，世界不會崩塌。"
  },
  {
    id: 30,
    slug: "traveling",
    name: "Traveling",
    nameZh: "旅行",
    suit: "fire",
    keywords: ["journey", "movement", "discovery", "exploration", "path"],
    keywordsZh: ["旅程", "移動", "發現", "探索", "道路"],
    description: "The path is calling you forward. Traveling is not just about physical movement — it is about the willingness to leave the known and enter the unknown. Every journey begins with a single step into unfamiliar territory.\n\nThis card appears when you need movement in your life. Perhaps you have been stagnant, comfortable, or stuck in routine. Something in you is ready to explore — a new idea, a new place, a new way of being.\n\nRemember: the destination is not the point. The point is who you become along the way. The road itself is the teacher.",
    descriptionZh: "道路正在呼喚你向前。旅行不僅僅是身體的移動——它是離開已知、進入未知的意願。每一段旅程都始於踏入陌生領域的第一步。\n\n這張牌出現時，你的生命需要移動。也許你已經停滯、安逸、困在例行公事中。你內在有什麼東西準備好去探索——一個新想法、一個新地方、一種新的存在方式。\n\n記住：目的地不是重點。重點是你在途中成為了誰。道路本身就是老師。"
  },
  {
    id: 31,
    slug: "exhaustion",
    name: "Exhaustion",
    nameZh: "疲憊",
    suit: "fire",
    keywords: ["depletion", "burnout", "empty tank", "rest needed", "overwork"],
    keywordsZh: ["耗盡", "倦怠", "油箱見底", "需要休息", "過度工作"],
    description: "You have given until there is nothing left to give. Exhaustion is the body's final plea: stop. This is not laziness. This is not weakness. This is the natural consequence of pouring from an empty cup.\n\nThis card is a mirror, not a judgment. It shows you what happens when you ignore your own needs for too long. The machine breaks down. The fire burns out. The river runs dry.\n\nRest is not optional — it is essential. Before you can give to anyone or anything else, you must first refill your own well. Sleep. Eat. Do nothing. The world can wait.",
    descriptionZh: "你已經給到沒有東西可以再給了。疲憊是身體最後的請求：停下來。這不是懶惰，不是軟弱。這是長期忽略自己需求的自然結果。\n\n這張牌是一面鏡子，不是評判。它讓你看見當你太久忽視自己的需要時會發生什麼。機器壞了，火熄了，河流乾涸了。\n\n休息不是可選的——它是必要的。在你能給予任何人或任何事之前，你必須先把自己的井重新填滿。睡覺、吃飯、什麼都不做。世界可以等。"
  },
  {
    id: 32,
    slug: "suppression",
    name: "Suppression",
    nameZh: "壓抑",
    suit: "fire",
    keywords: ["repression", "holding back", "internalized pressure", "denial", "burden"],
    keywordsZh: ["壓制", "忍耐", "內化壓力", "否認", "重擔"],
    description: "What you push down does not disappear. It goes underground, where it grows heavier, darker, and more explosive. Suppression is the act of denying your truth — swallowing your anger, hiding your pain, pretending everything is fine.\n\nThis card appears when something inside you desperately needs to be expressed. An emotion, a need, a boundary that has been silenced. The pressure is building, and if it isn't released consciously, it will find its own way out — through illness, outbursts, or depression.\n\nWhat are you not saying? What are you not allowing yourself to feel? It is safe to let it out. In fact, it is necessary.",
    descriptionZh: "你壓下去的東西不會消失。它會進入地下，在那裡變得更沉重、更黑暗、更具爆發性。壓抑是否認你的真實——吞下你的憤怒、隱藏你的痛苦、假裝一切都好。\n\n這張牌出現時，你內在的某些東西迫切需要被表達。一個情緒、一個需要、一個被壓制的界限。壓力正在累積，如果不有意識地釋放，它會找到自己的出路——透過疾病、爆發或抑鬱。\n\n你沒有說出什麼？你不允許自己感受什麼？讓它出來是安全的。事實上，這是必要的。"
  },
  {
    id: 33,
    slug: "playfulness",
    name: "Playfulness",
    nameZh: "遊戲玩耍",
    suit: "fire",
    keywords: ["joy", "lightness", "humor", "fun", "non-seriousness"],
    keywordsZh: ["喜悅", "輕盈", "幽默", "樂趣", "不嚴肅"],
    description: "Life is too important to be taken seriously. Playfulness is the energy of the child who builds sandcastles knowing the tide will wash them away — and laughs anyway. It is creation without attachment, effort without anxiety.\n\nThis card appears when you have become too heavy, too rigid, too invested in outcomes. You have forgotten that existence itself is playful. Stars explode. Flowers bloom for no one. Rivers take the longest path just because they can.\n\nWhat if you approached your current situation as a game instead of a battle? What if the point was not to win, but to enjoy the playing?",
    descriptionZh: "生命太重要了，不能太嚴肅地對待。遊戲玩耍是孩子的能量——他堆沙堡，知道潮水會沖走它們，但還是笑著。這是沒有執著的創造，沒有焦慮的努力。\n\n這張牌出現時，你變得太沉重、太僵硬、太在意結果了。你忘記了存在本身就是好玩的。星星會爆炸，花兒為沒有人綻放，河流走最遠的路只因為它們可以。\n\n如果你把目前的狀況當作遊戲而不是戰鬥呢？如果重點不是贏，而是享受玩的過程呢？"
  },
  {
    id: 34,
    slug: "intensity",
    name: "Intensity",
    nameZh: "強度",
    suit: "fire",
    keywords: ["focus", "power", "directness", "arrow", "determination"],
    keywordsZh: ["聚焦", "力量", "直接", "箭", "決心"],
    description: "Like an arrow in flight, Intensity knows exactly where it is going. There is no hesitation, no second-guessing, no divided attention. Every ounce of energy is directed toward a single point.\n\nThis card appears when scattered energy is your enemy. You have been drifting, multitasking, or spreading yourself too thin. Intensity says: pick your target and commit. Half measures produce half results.\n\nThis is not about forcing or straining. It is about clarity of purpose. When you know exactly what you want and why, the energy to achieve it appears naturally.",
    descriptionZh: "就像一支飛行中的箭，強度確切地知道它要去哪裡。沒有猶豫、沒有反覆、沒有分散的注意力。每一分能量都指向一個點。\n\n這張牌出現時，分散的能量正在妨礙你。你一直在漂流、多工處理、把自己攤得太薄。強度說：選擇你的目標然後全力以赴。一半的努力只會產生一半的結果。\n\n這不是關於強迫或用力。而是關於目標的清晰。當你確切地知道你想要什麼以及為什麼，達成它的能量會自然出現。"
  },
  {
    id: 35,
    slug: "sharing",
    name: "Sharing",
    nameZh: "分享",
    suit: "fire",
    keywords: ["generosity", "overflow", "giving", "warmth", "abundance"],
    keywordsZh: ["慷慨", "滿溢", "給予", "溫暖", "豐盛"],
    description: "When your cup is full, it naturally overflows. Sharing is not sacrifice — it is the joyful abundance that happens when you have more than you need. The fire that warms you is the same fire that can warm others.\n\nThis card appears when it is time to give. Not from obligation or guilt, but from genuine overflow. Share your knowledge, your warmth, your presence, your gifts. What you give freely comes back multiplied.\n\nBut remember: you can only share what you truly have. Fill yourself first. Then the sharing becomes effortless and authentic.",
    descriptionZh: "當你的杯子滿了，它自然會溢出。分享不是犧牲——它是當你擁有超過需要時自然發生的喜悅豐盛。溫暖你的火，也是能溫暖他人的火。\n\n這張牌出現時，是時候給予了。不是出於義務或內疚，而是出於真正的滿溢。分享你的知識、溫暖、臨在、天賦。你自由給予的東西會加倍回來。\n\n但記住：你只能分享你真正擁有的。先填滿自己，然後分享就變得毫不費力且真實。"
  },
  {
    id: 36,
    slug: "the-creator",
    name: "The Creator",
    nameZh: "創造者",
    suit: "fire",
    keywords: ["mastery", "vision", "leadership", "creative power", "manifestation"],
    keywordsZh: ["精通", "願景", "領導力", "創造力量", "顯化"],
    description: "The Creator is the master of fire — one who has learned to channel raw energy into purposeful creation. This is not wild, chaotic passion. This is passion refined by discipline, vision sharpened by experience.\n\nThis card represents the peak of creative power. You have the skills, the clarity, and the will to bring something meaningful into existence. Whether it is a project, a business, a relationship, or a new chapter of life, you are ready to build.\n\nStep into your power. You are not waiting for permission. You are not waiting for the right moment. The right moment is now, and the creator is you.",
    descriptionZh: "創造者是火的大師——一個已經學會將原始能量轉化為有目的的創造的人。這不是狂野混亂的熱情，而是被紀律提煉過的熱情，被經驗磨利的願景。\n\n這張牌代表創造力量的巔峰。你擁有技能、清晰和意志去將有意義的東西帶入存在。無論是一個專案、一份事業、一段關係，還是生命的新篇章，你已經準備好去建造。\n\n踏入你的力量。你不是在等待許可，不是在等待正確的時刻。正確的時刻就是現在，而創造者就是你。"
  },

  // ============================================
  // Water 水族群 (37-50)
  // ============================================
  {
    id: 37,
    slug: "going-with-the-flow",
    name: "Going With the Flow",
    nameZh: "順著流走",
    suit: "water",
    keywords: ["surrender", "trust", "river of life", "ease", "letting go"],
    keywordsZh: ["臣服", "信任", "生命之河", "輕鬆", "放手"],
    description: "The river does not struggle to reach the ocean. It simply flows — around obstacles, through valleys, over stones. It trusts that the way will reveal itself, and it always does.\n\nThis card appears when you are trying too hard to control the direction of your life. Your hands are gripping the steering wheel so tightly that you can't feel the current beneath you. Let go. Not of your dreams, but of your need to control how they unfold.\n\nLife has a wisdom of its own. Sometimes the detour is the destination. Trust the flow.",
    descriptionZh: "河流不需要掙扎就能抵達大海。它只是流動——繞過障礙、穿過山谷、越過石頭。它相信道路會自己顯現，而它總是如此。\n\n這張牌出現時，你正在太努力地控制生命的方向。你的手緊緊握著方向盤，以至於感受不到身下的水流。放手。不是放掉你的夢想，而是放掉你對它們如何展開的控制需要。\n\n生命有它自己的智慧。有時候繞路就是目的地。信任這個流動。"
  },
  {
    id: 38,
    slug: "friendliness",
    name: "Friendliness",
    nameZh: "友誼",
    suit: "water",
    keywords: ["warmth", "openness", "connection", "acceptance", "companionship"],
    keywordsZh: ["溫暖", "開放", "連結", "接納", "陪伴"],
    description: "Two trees growing side by side — close enough to share the sunlight, far enough apart to let each other grow. This is the essence of friendliness: warmth without possession, closeness without suffocation.\n\nThis card appears when the quality of your connections matters. It is not about how many people you know, but how genuinely you meet them. Can you be warm without wanting something in return? Can you be present without trying to fix or change?\n\nFriendliness begins with yourself. When you are kind to your own flaws and imperfections, that warmth naturally extends to everyone around you.",
    descriptionZh: "兩棵樹並肩生長——近到可以分享陽光，遠到可以讓彼此成長。這就是友誼的本質：沒有佔有的溫暖，沒有窒息的親密。\n\n這張牌出現時，你的連結品質很重要。不是你認識多少人，而是你多真誠地與他們相遇。你能夠不求回報地溫暖嗎？你能夠不試圖修正或改變地臨在嗎？\n\n友誼從自己開始。當你對自己的缺陷和不完美是溫柔的，那份溫暖自然會延伸到你周圍的每一個人。"
  },
  {
    id: 39,
    slug: "celebration",
    name: "Celebration",
    nameZh: "慶祝",
    suit: "water",
    keywords: ["joy", "dance", "gratitude", "aliveness", "expression"],
    keywordsZh: ["喜悅", "舞蹈", "感恩", "活力", "表達"],
    description: "Dance in the rain. Not because the storm is over, but because you are alive in the middle of it. Celebration is not waiting for the perfect moment — it is recognizing that this moment, with all its imperfections, is already worthy of joy.\n\nThis card appears when you have been postponing happiness. Waiting until you lose weight, get the promotion, find the partner. But celebration is not a reward for achievement. It is the natural response to being alive.\n\nYour body wants to move. Your heart wants to sing. Let it. The world needs more people who celebrate without reason.",
    descriptionZh: "在雨中跳舞。不是因為暴風雨結束了，而是因為你在暴風雨中是活著的。慶祝不是等待完美的時刻——而是認出此刻，帶著所有不完美，已經值得喜悅。\n\n這張牌出現時，你一直在推遲快樂。等到減肥成功、等到升職、等到找到伴侶。但慶祝不是成就的獎賞，它是對活著的自然回應。\n\n你的身體想要動，你的心想要歌唱。讓它吧。這個世界需要更多無緣無故就慶祝的人。"
  },
  {
    id: 40,
    slug: "turning-in",
    name: "Turning In",
    nameZh: "轉向內在",
    suit: "water",
    keywords: ["introspection", "meditation", "self-reflection", "inner world", "stillness"],
    keywordsZh: ["內省", "冥想", "自我反思", "內在世界", "靜定"],
    description: "The answers you seek are not out there. They never were. Turning In is the moment you stop looking to the world for guidance and begin the journey inward.\n\nThis card appears when external noise is drowning out your inner voice. Too many opinions, too much information, too many distractions. The remedy is simple but radical: turn inward. Close your eyes. Ask the question to yourself, not to Google.\n\nYour inner world is vast, rich, and full of wisdom. But it requires silence to access. Give yourself the gift of undistracted time alone. What you find there will be more valuable than any advice.",
    descriptionZh: "你尋找的答案不在外面。從來不在。轉向內在是你停止向世界尋求指引、開始向內旅行的時刻。\n\n這張牌出現時，外在的噪音正在淹沒你的內在之聲。太多意見、太多資訊、太多干擾。療方很簡單但很根本：轉向內在。閉上眼睛。把問題問你自己，而不是問 Google。\n\n你的內在世界是廣闊的、豐富的、充滿智慧的。但它需要寂靜才能進入。給自己不被打擾的獨處時間。你在那裡找到的東西，會比任何建議都更有價值。"
  },
  {
    id: 41,
    slug: "clinging-to-the-past",
    name: "Clinging to the Past",
    nameZh: "執著於過去",
    suit: "water",
    keywords: ["attachment", "nostalgia", "stagnation", "holding on", "memory"],
    keywordsZh: ["執著", "懷舊", "停滯", "緊抓不放", "記憶"],
    description: "You are carrying a box of memories that no longer serves you. Old loves, old wounds, old versions of yourself — they weigh you down and prevent you from moving forward. The past has become a prison.\n\nThis card appears when nostalgia is masquerading as comfort. You keep returning to the same memories, the same patterns, the same emotional territory. But the past cannot be relived. It can only be released.\n\nPutting down the box doesn't mean those experiences didn't matter. It means you trust that who you are becoming is more important than who you were.",
    descriptionZh: "你正提著一箱不再有用的記憶。舊的愛、舊的傷、舊版本的自己——它們壓著你，阻止你前進。過去成了一座監獄。\n\n這張牌出現時，懷舊正在偽裝成舒適。你一直回到同樣的記憶、同樣的模式、同樣的情感領域。但過去無法重新活過，它只能被釋放。\n\n放下那個箱子不代表那些經歷不重要。而是你信任你正在成為的人，比你曾經是的人更重要。"
  },
  {
    id: 42,
    slug: "the-dream",
    name: "The Dream",
    nameZh: "夢",
    suit: "water",
    keywords: ["illusion", "romance", "fantasy", "enchantment", "projection"],
    keywordsZh: ["幻象", "浪漫", "幻想", "魅惑", "投射"],
    description: "The Dream is beautiful but fragile. It is the enchanted moonlit night where everything seems possible and nothing seems real. Romantic fantasies, idealized futures, the perfect version of someone who doesn't quite exist.\n\nThis card appears when you may be seeing what you want to see rather than what is actually there. A relationship, a plan, an opportunity — something in your life is wrapped in a veil of projection. It feels wonderful, but is it true?\n\nDreams have their place. They inspire and motivate. But at some point, you must open your eyes and love what is real, not just what is beautiful.",
    descriptionZh: "夢是美麗但脆弱的。它是那個魔幻的月光之夜，一切似乎皆有可能，一切似乎都不真實。浪漫的幻想、理想化的未來、某個並不完全存在的人的完美版本。\n\n這張牌出現時，你可能正在看你想看到的，而非實際存在的。一段關係、一個計畫、一個機會——你生命中的某些東西被投射的面紗所包裹。它感覺很美好，但它是真的嗎？\n\n夢有它的位置。它們啟發和激勵。但在某個時刻，你必須睜開眼睛，去愛真實的東西，而不只是美麗的東西。"
  },
  {
    id: 43,
    slug: "projections",
    name: "Projections",
    nameZh: "投射",
    suit: "water",
    keywords: ["mirror", "shadow", "blame", "unconscious", "reflection"],
    keywordsZh: ["鏡子", "陰影", "指責", "無意識", "映照"],
    description: "What bothers you about others is often a reflection of what you haven't accepted in yourself. Projections is the card of the unconscious mirror — the realization that the movie you see playing on other people's faces is your own film.\n\nThis card appears when you are caught in blame, judgment, or idealization of another person. The intensity of your reaction is the clue. If someone triggers you deeply, they are touching something within you that wants to be seen.\n\nThis is not comfortable, but it is liberating. Every projection reclaimed is a piece of yourself returned. Every mirror faced is a step toward wholeness.",
    descriptionZh: "別人讓你困擾的地方，往往是你尚未接納的自己的映照。投射是無意識鏡子的牌——意識到你在別人臉上看到的電影，其實是你自己的片子。\n\n這張牌出現時，你正陷入對另一個人的指責、評判或理想化。你反應的強度就是線索。如果某人深深地觸發了你，他們正在觸碰你內在某個想要被看見的東西。\n\n這不舒服，但它是解放的。每一個被收回的投射，都是你自己的一部分被歸還。每一面被面對的鏡子，都是走向完整的一步。"
  },
  {
    id: 44,
    slug: "letting-go",
    name: "Letting Go",
    nameZh: "放手",
    suit: "water",
    keywords: ["surrender", "release", "trust", "merging", "freedom"],
    keywordsZh: ["臣服", "釋放", "信任", "融合", "自由"],
    description: "A drop of water falling from a leaf into the ocean. For one moment, it is separate. Then it merges, and discovers it was the ocean all along. This is letting go — not losing yourself, but finding yourself in something greater.\n\nThis card appears when you are holding on too tightly. To a person, an outcome, an identity, a plan. Your fingers are cramping from the grip. Letting go does not mean you don't care. It means you trust enough to open your hands.\n\nWhat needs to stay will stay. What needs to go will go. Your job is not to decide which is which. Your job is to open your hands and trust.",
    descriptionZh: "一滴水從葉子上落入大海。有那麼一刻，它是分離的。然後它融合了，發現自己一直都是大海。這就是放手——不是失去自己，而是在更大的事物中找到自己。\n\n這張牌出現時，你抓得太緊了。對一個人、一個結果、一個身份、一個計畫。你的手指因為緊握而痙攣。放手不代表你不在乎，而是你足夠信任，所以打開你的手。\n\n該留的會留，該走的會走。你的工作不是決定哪個是哪個。你的工作是張開雙手，然後信任。"
  },
  {
    id: 45,
    slug: "laziness",
    name: "Laziness",
    nameZh: "懶惰",
    suit: "water",
    keywords: ["stagnation", "avoidance", "inertia", "lack of will", "comfort zone"],
    keywordsZh: ["停滯", "逃避", "惰性", "缺乏意志", "舒適區"],
    description: "The stagnant pool collects algae. Without movement, without flow, life becomes murky and dull. Laziness is not rest — rest is conscious and rejuvenating. Laziness is unconscious, a slow leaking of life force.\n\nThis card appears when you have been avoiding something important. Not because you can't do it, but because doing it requires stepping out of comfort. The couch is warm. The routine is easy. But your soul is suffocating.\n\nThis is a wake-up call, delivered with love. You have more energy than you think. The first step is always the hardest. After that, momentum carries you.",
    descriptionZh: "停滯的水塘會長藻類。沒有流動，生命變得混濁而遲鈍。懶惰不是休息——休息是有意識的、恢復性的。懶惰是無意識的，是生命力緩慢的流失。\n\n這張牌出現時，你一直在逃避某件重要的事。不是因為你做不到，而是因為做它需要走出舒適區。沙發很溫暖，日常很容易。但你的靈魂在窒息。\n\n這是一個帶著愛的叫醒服務。你比你以為的有更多能量。第一步永遠是最難的。之後，動力會帶著你走。"
  },
  {
    id: 46,
    slug: "harmony",
    name: "Harmony",
    nameZh: "和諧",
    suit: "water",
    keywords: ["peace", "balance", "heart-centered", "alignment", "grace"],
    keywordsZh: ["平靜", "平衡", "以心為中心", "校準", "優雅"],
    description: "Everything is in its right place. Not because you forced it there, but because you allowed it. Harmony is the natural state that emerges when you stop fighting — fighting yourself, fighting others, fighting life.\n\nThis card appears as a confirmation that you are aligned. Your inner world and outer world are reflecting each other. There is a sense of ease, of rightness, of peace that doesn't need to be manufactured.\n\nEnjoy this moment. Let it teach you what alignment feels like in your body, so you can recognize it — and return to it — when life becomes turbulent again.",
    descriptionZh: "一切都在對的位置上。不是因為你強迫它到那裡，而是因為你允許了。和諧是當你停止戰鬥時自然湧現的狀態——停止與自己、與他人、與生命的戰鬥。\n\n這張牌是一個確認：你是校準的。你的內在世界和外在世界正在互相映照。有一種輕鬆感、正確感、平靜感，不需要被製造。\n\n享受這個時刻。讓它教你校準在身體裡的感覺，這樣當生命再次動盪時，你可以認出它——並回到它。"
  },
  {
    id: 47,
    slug: "understanding",
    name: "Understanding",
    nameZh: "了解",
    suit: "water",
    keywords: ["insight", "clarity", "seeing truth", "awareness", "freedom"],
    keywordsZh: ["洞見", "清明", "看見真相", "覺知", "自由"],
    description: "The caged bird suddenly sees the bars. Not with anger or despair, but with quiet clarity. Understanding is this moment — the moment when what was invisible becomes visible, and with that seeing, freedom becomes possible.\n\nThis card appears when a realization is dawning. Something you have been blind to is coming into focus. It might be a pattern in your behavior, a truth about a relationship, or an insight about your deepest needs.\n\nUnderstanding is not the same as fixing. You don't need to do anything yet. Just see. Just understand. The seeing itself begins the transformation.",
    descriptionZh: "籠中鳥突然看見了柵欄。不是帶著憤怒或絕望，而是帶著安靜的清明。了解就是這個時刻——當看不見的東西變得可見，而伴隨著這個看見，自由成為可能。\n\n這張牌出現時，一個領悟正在浮現。你一直看不見的東西正在聚焦。它可能是你行為中的一個模式、一段關係的真相，或者對你最深需求的洞見。\n\n了解不等於修正。你還不需要做任何事。只是看見。只是了解。看見本身就開始了轉化。"
  },
  {
    id: 48,
    slug: "trust",
    name: "Trust",
    nameZh: "信任",
    suit: "water",
    keywords: ["faith", "leap", "courage", "surrender", "openness"],
    keywordsZh: ["信念", "跳躍", "勇氣", "臣服", "開放"],
    description: "Trust is the bridge between where you are and where you need to be. You cannot see the other side. You cannot guarantee the outcome. But something inside you knows that if you take the step, the ground will appear.\n\nThis card appears when fear is asking you to stay and something deeper is asking you to go. Trust does not mean the absence of doubt. It means moving forward despite the doubt. It means choosing faith over evidence.\n\nWhat would you do right now if you trusted that everything would work out? Do that.",
    descriptionZh: "信任是你所在之處和你需要去的地方之間的橋梁。你看不見另一邊，你無法保證結果。但你內在有什麼東西知道，如果你踏出那一步，地面會出現。\n\n這張牌出現時，恐懼要求你留下，而某個更深的東西要求你前行。信任不是沒有懷疑，而是帶著懷疑繼續前進。是選擇信念而非證據。\n\n如果你信任一切都會好的，你現在會做什麼？去做那件事。"
  },
  {
    id: 49,
    slug: "receptivity",
    name: "Receptivity",
    nameZh: "接受性",
    suit: "water",
    keywords: ["openness", "feminine energy", "receiving", "grace", "allowing"],
    keywordsZh: ["開放", "陰性能量", "接收", "恩典", "允許"],
    description: "You have been doing too much and receiving too little. Receptivity is the art of opening — opening your hands to receive, opening your heart to be touched, opening your mind to new possibilities.\n\nThis card appears when you need to balance action with allowing. Not everything needs to be earned through effort. Some things come as gifts — synchronicities, unexpected help, moments of grace. But you can only receive them if your hands are open.\n\nPractice saying yes to what life offers. Practice accepting compliments without deflecting. Practice letting others support you. Receiving is not weakness. It is wisdom.",
    descriptionZh: "你一直在做太多，接收太少。接受性是敞開的藝術——打開你的手去接收，打開你的心去被觸動，打開你的頭腦迎接新的可能。\n\n這張牌出現時，你需要在行動和允許之間找到平衡。不是所有東西都需要透過努力來賺取。有些東西是禮物——共時性、意外的幫助、恩典的時刻。但你只有在手是打開的時候才能接收它們。\n\n練習對生命提供的東西說好。練習接受讚美而不閃躲。練習讓他人支持你。接收不是軟弱，而是智慧。"
  },
  {
    id: 50,
    slug: "healing",
    name: "Healing",
    nameZh: "治療",
    suit: "water",
    keywords: ["wholeness", "recovery", "self-love", "emotional healing", "integration"],
    keywordsZh: ["完整", "復原", "自愛", "情感療癒", "整合"],
    description: "Healing is not about fixing what is broken. It is about remembering that you were never truly broken in the first place. Beneath the wounds, beneath the scars, there is a wholeness that has always been intact.\n\nThis card appears when it is time to tend to your emotional wounds. Not by analyzing them, not by telling the story one more time, but by holding them with compassion. The wounded places in you are asking for love, not logic.\n\nTrue healing happens when you stop trying to be someone who was never hurt and start accepting someone who was hurt and is still here, still beautiful, still whole.",
    descriptionZh: "治療不是修復破碎的東西。而是記起你其實從未真正破碎過。在傷口之下、疤痕之下，有一種完整性一直完好無損。\n\n這張牌出現時，是時候照料你的情感傷口了。不是透過分析它們，不是再講一次那個故事，而是帶著慈悲去擁抱它們。你受傷的地方在請求愛，而不是邏輯。\n\n真正的療癒發生在你停止試圖成為一個從未受過傷的人，開始接納一個受過傷但仍然在這裡、仍然美麗、仍然完整的人的時候。"
  },

  // ============================================
  // Clouds 雲族群 (51-64)
  // ============================================
  {
    id: 51,
    slug: "consciousness",
    name: "Consciousness",
    nameZh: "意識",
    suit: "clouds",
    keywords: ["clarity", "buddha mind", "awareness", "mental light", "insight"],
    keywordsZh: ["清明", "佛心", "覺知", "心智之光", "洞見"],
    description: "When the clouds part, the sky is revealed — vast, clear, and luminous. Consciousness is this sky. It has always been there, behind every thought, every worry, every storm of the mind. You just forgot to look up.\n\nThis card represents a moment of mental clarity. The fog lifts. The confusion dissolves. You see the situation for what it truly is, stripped of projection, fear, and wishful thinking.\n\nThis clarity is not something you create. It is what remains when you stop creating confusion. Still the mind, and consciousness reveals itself.",
    descriptionZh: "當雲散去，天空顯現——廣闊、清明、光明。意識就是這片天空。它一直在那裡，在每一個念頭、每一個擔憂、每一場心智風暴的背後。你只是忘了抬頭看。\n\n這張牌代表一個心智清明的時刻。霧散了，困惑溶解了。你看見了情況的真實面目，剝去了投射、恐懼和一廂情願。\n\n這種清明不是你創造的，而是當你停止製造困惑時所剩下的。讓心智靜下來，意識就會自己顯現。"
  },
  {
    id: 52,
    slug: "schizophrenia",
    name: "Schizophrenia",
    nameZh: "精神分裂",
    suit: "clouds",
    keywords: ["inner conflict", "division", "torn", "confusion", "duality"],
    keywordsZh: ["內在衝突", "分裂", "撕裂", "困惑", "二元"],
    description: "You are being pulled in two directions at once. Part of you wants to go left, part of you wants to go right. Part of you wants to speak, part of you wants to stay silent. This inner division is exhausting.\n\nThis card appears when the mind has split into opposing camps. Desire versus duty. Heart versus head. Freedom versus security. The more you try to choose, the more paralyzed you become.\n\nThe way through is not to pick a side, but to step back and see both sides without identifying with either. From that witness point, clarity naturally arises. You are not the conflict — you are the awareness watching it.",
    descriptionZh: "你正被同時拉向兩個方向。一部分的你想往左，一部分想往右。一部分想說話，一部分想保持沈默。這種內在的分裂讓人筋疲力盡。\n\n這張牌出現時，頭腦已經分裂成對立的陣營。慾望對責任、心對頭腦、自由對安全。你越想選擇，就越癱瘓。\n\n穿越的方式不是選邊站，而是退後一步，看見兩邊但不認同任何一邊。從那個見證的位置，清明自然升起。你不是那個衝突——你是觀看它的覺知。"
  },
  {
    id: 53,
    slug: "ice-olation",
    name: "Ice-olation",
    nameZh: "冰封",
    suit: "clouds",
    keywords: ["emotional coldness", "isolation", "frozen", "walls", "protection"],
    keywordsZh: ["情感冷漠", "孤立", "凍結", "高牆", "自我保護"],
    description: "The heart has frozen over. Ice-olation is what happens when pain leads to withdrawal — when you build walls so thick that nothing can get in. Not pain, but also not love. Not rejection, but also not connection.\n\nThis card appears when emotional self-protection has gone too far. The armor that once saved you is now imprisoning you. You are safe, yes. But you are also alone in a way that hurts more than the original wound.\n\nThe thaw begins with one small crack. One honest conversation. One moment of vulnerability. You don't have to melt all at once. Just let one ray of warmth in.",
    descriptionZh: "心已經結冰了。冰封是當痛苦導致退縮時發生的事——當你築起如此厚的牆，什麼都進不來。不是痛苦，但也不是愛。不是被拒絕，但也沒有連結。\n\n這張牌出現時，情感上的自我保護已經走得太遠了。曾經拯救你的盔甲現在正在囚禁你。你是安全的，是的。但你也以一種比原始傷口更痛的方式孤獨著。\n\n解凍始於一道小小的裂縫。一次誠實的對話。一個脆弱的瞬間。你不必一次全部融化。只需讓一縷溫暖進來。"
  },
  {
    id: 54,
    slug: "postponement",
    name: "Postponement",
    nameZh: "拖延",
    suit: "clouds",
    keywords: ["procrastination", "avoidance", "tomorrow", "delay", "fear"],
    keywordsZh: ["拖延", "逃避", "明天", "延遲", "恐懼"],
    description: "Tomorrow. Next week. When the timing is right. When I'm ready. When I have more money, more time, more confidence. Postponement is the mind's favorite trick for avoiding the uncomfortable truth that the only time is now.\n\nThis card appears when you are delaying something that your soul is ready for but your mind is afraid of. The excuses sound reasonable. They always do. But underneath every \"not yet\" is a hidden \"I'm afraid.\"\n\nWhat are you postponing? And what would happen if you started today — imperfectly, incompletely, but started?",
    descriptionZh: "明天。下週。等時機對了。等我準備好了。等我有更多錢、更多時間、更多自信。拖延是頭腦最愛的把戲，用來逃避一個令人不適的真相：唯一的時間就是現在。\n\n這張牌出現時，你正在延遲某件你的靈魂已經準備好但頭腦害怕的事。那些藉口聽起來很合理，它們總是如此。但每一個「還沒」的背後，都藏著一個「我害怕」。\n\n你在拖延什麼？如果你今天就開始——不完美地、不完整地，但就是開始了——會怎樣？"
  },
  {
    id: 55,
    slug: "comparison",
    name: "Comparison",
    nameZh: "比較",
    suit: "clouds",
    keywords: ["judgment", "measuring", "inadequacy", "competition", "self-doubt"],
    keywordsZh: ["評判", "衡量", "不足感", "競爭", "自我懷疑"],
    description: "The bamboo does not wish it were an oak. The rose does not compare itself to the lotus. Each grows in its own way, in its own time, toward its own light. Only the human mind plays the exhausting game of comparison.\n\nThis card appears when you are measuring yourself against others — their success, their beauty, their progress, their life. This comparison is a poison that robs you of the ability to appreciate your own unique path.\n\nYou are not behind. You are not ahead. You are exactly where you need to be. The only meaningful comparison is between who you were yesterday and who you are becoming today.",
    descriptionZh: "竹子不會希望自己是橡樹。玫瑰不會拿自己和蓮花比較。每一種都以自己的方式、自己的時間、向著自己的光生長。只有人類的頭腦在玩這個令人疲憊的比較遊戲。\n\n這張牌出現時，你正在拿自己和別人比——他們的成功、他們的美麗、他們的進步、他們的人生。這種比較是一種毒藥，奪走你欣賞自己獨特道路的能力。\n\n你沒有落後，也沒有超前。你正好在你需要在的地方。唯一有意義的比較，是昨天的你和今天正在成為的你。"
  },
  {
    id: 56,
    slug: "the-burden",
    name: "The Burden",
    nameZh: "重擔",
    suit: "clouds",
    keywords: ["expectations", "weight", "responsibility", "others' baggage", "heaviness"],
    keywordsZh: ["期待", "重量", "責任", "他人的行李", "沉重"],
    description: "You are carrying weight that does not belong to you. Other people's expectations, inherited obligations, roles you never chose — they pile up on your shoulders until you can barely stand.\n\nThis card appears when it is time to examine what you are carrying and ask: is this mine? Not every responsibility that lands on your plate is yours to carry. Not every expectation placed on you is yours to fulfill.\n\nPutting down the burden is not selfish. It is honest. You can only carry your own weight. Everything else is a choice, and choices can be reconsidered.",
    descriptionZh: "你正在背負不屬於你的重量。別人的期待、繼承來的義務、你從未選擇的角色——它們堆積在你的肩上，直到你幾乎站不住。\n\n這張牌出現時，是時候檢視你正在背負的東西，然後問：這是我的嗎？不是每一個落到你盤子裡的責任都是你該背的。不是每一個加諸在你身上的期待都是你該滿足的。\n\n放下重擔不是自私，而是誠實。你只能背負自己的重量。其他一切都是選擇，而選擇是可以重新考慮的。"
  },
  {
    id: 57,
    slug: "politics",
    name: "Politics",
    nameZh: "政治",
    suit: "clouds",
    keywords: ["masks", "hypocrisy", "manipulation", "games", "inauthenticity"],
    keywordsZh: ["面具", "虛偽", "操控", "遊戲", "不真實"],
    description: "Masks upon masks. Smiles that hide agendas. Words carefully chosen not to communicate, but to manipulate. Politics is the game of appearing rather than being.\n\nThis card appears when you are caught in a web of social games — at work, in relationships, or within yourself. Someone is not being straight with you, or perhaps you are not being straight with yourself. The gap between what is said and what is meant has grown dangerously wide.\n\nStrip away the pretense. What is actually happening here? What do you actually want? Honesty may be uncomfortable, but it is the only foundation that doesn't crumble.",
    descriptionZh: "面具之上還有面具。微笑背後藏著目的。言語被精心選擇，不是為了溝通，而是為了操控。政治是顯得像什麼而非真正是什麼的遊戲。\n\n這張牌出現時，你正被困在社交遊戲的網中——在工作中、在關係中，或在你自己內在。有人對你不夠坦誠，或者也許你對自己不夠坦誠。說的和想的之間的差距已經危險地擴大了。\n\n剝掉偽裝。這裡實際上在發生什麼？你實際上想要什麼？誠實可能不舒服，但它是唯一不會崩塌的基礎。"
  },
  {
    id: 58,
    slug: "guilt",
    name: "Guilt",
    nameZh: "罪惡感",
    suit: "clouds",
    keywords: ["self-punishment", "shame", "inner judge", "regret", "mental prison"],
    keywordsZh: ["自我懲罰", "羞恥", "內在法官", "後悔", "心靈牢籠"],
    description: "The inner judge has passed its verdict, and you are serving the sentence. Guilt keeps you locked in a mental prison of your own making — replaying mistakes, punishing yourself, believing you don't deserve forgiveness.\n\nThis card appears when self-punishment has become a habit. Yes, you may have made a mistake. Yes, there may be something to learn. But guilt that doesn't lead to growth is just suffering for its own sake.\n\nForgive yourself. Not because what happened doesn't matter, but because carrying the weight of guilt prevents you from becoming the person who can do better. Release yourself. You have served enough time.",
    descriptionZh: "內在的法官已經做出判決，而你正在服刑。罪惡感把你鎖在一座自己建造的心靈監獄裡——反覆重播錯誤、懲罰自己、相信自己不值得被原諒。\n\n這張牌出現時，自我懲罰已經成了習慣。是的，你可能犯了錯。是的，可能有什麼需要學習的。但不會帶來成長的罪惡感，只是為了受苦而受苦。\n\n原諒你自己。不是因為發生的事不重要，而是因為背負罪惡感的重量阻止你成為那個可以做得更好的人。釋放自己。你已經服夠了刑期。"
  },
  {
    id: 59,
    slug: "sorrow",
    name: "Sorrow",
    nameZh: "悲傷",
    suit: "clouds",
    keywords: ["grief", "pain", "transformation through pain", "depth", "feeling"],
    keywordsZh: ["悲痛", "痛苦", "透過痛苦轉化", "深度", "感受"],
    description: "There is a sorrow that runs deep — deeper than words, deeper than understanding. It is the kind of pain that changes you permanently, not because it destroys you, but because it opens you to a depth of feeling you didn't know you had.\n\nThis card appears during times of genuine grief or loss. It does not offer solutions or silver linings. It simply says: feel this. Don't run from it. Don't intellectualize it. Let the sorrow move through you like a storm, and trust that you will still be standing when it passes.\n\nSorrow is the price of having loved deeply. It is painful, but it is also proof that you are alive.",
    descriptionZh: "有一種悲傷很深——比語言更深，比理解更深。它是那種永久改變你的痛苦，不是因為它摧毀了你，而是因為它把你打開到一種你不知道自己擁有的感受深度。\n\n這張牌出現在真正的悲痛或失去的時刻。它不提供解決方案或光明面。它只是說：感受它。不要逃避。不要理智化它。讓悲傷像風暴一樣穿過你，相信當它過去時你仍然會站在那裡。\n\n悲傷是深深愛過的代價。它是痛苦的，但它也是你活著的證明。"
  },
  {
    id: 60,
    slug: "rebirth",
    name: "Rebirth",
    nameZh: "重生",
    suit: "clouds",
    keywords: ["renewal", "transformation", "fresh start", "evolution", "new identity"],
    keywordsZh: ["更新", "轉化", "全新開始", "進化", "新身份"],
    description: "From camel to lion to child — this is the journey of the spirit. The camel carries the burden, the lion roars its independence, and the child creates a new beginning with fresh eyes and an open heart.\n\nThis card appears when an old version of you is dying and a new one is being born. It may feel disorienting. The person you were no longer fits. The person you are becoming is not yet clear. You are in the cocoon — formless, uncertain, but transforming.\n\nTrust the process. You are not losing yourself. You are shedding a skin that was too small. What emerges will surprise even you.",
    descriptionZh: "從駱駝到獅子到孩童——這是靈性的旅程。駱駝背負重擔，獅子咆哮它的獨立，而孩童以全新的眼光和開放的心創造新的開始。\n\n這張牌出現時，一個舊的你正在死去，一個新的你正在誕生。這可能讓人迷失方向。你曾經是的那個人已經不再合身。你正在成為的那個人還不清晰。你在繭中——無形、不確定，但正在轉化。\n\n信任這個過程。你不是在失去自己，而是在蛻去一層太小的皮。浮現出來的東西甚至會讓你自己驚訝。"
  },
  {
    id: 61,
    slug: "mind",
    name: "Mind",
    nameZh: "頭腦",
    suit: "clouds",
    keywords: ["thinking", "mental mechanism", "analysis", "thoughts", "intellect"],
    keywordsZh: ["思考", "心智機制", "分析", "念頭", "智力"],
    description: "The mind is a magnificent tool — and a terrible master. It can solve equations, build bridges, and compose symphonies. But when it runs unsupervised, it creates anxiety, doubt, and endless circular thinking.\n\nThis card appears when you are overthinking. The mind has taken the wheel and driven you in circles. Analysis paralysis. Rumination. The same thoughts looping like a broken record.\n\nRemember: you have a mind, but you are not your mind. You are the one who can observe the thoughts. Step back into that observer position. Watch the mechanism without being caught in it. From there, clarity returns.",
    descriptionZh: "頭腦是一個精妙的工具——也是一個糟糕的主人。它可以解方程式、建橋樑、作交響曲。但當它在無人監督下運行時，它製造焦慮、懷疑和無盡的循環思考。\n\n這張牌出現時，你正在過度思考。頭腦已經接管了方向盤，帶著你兜圈子。分析癱瘓、反芻、同樣的念頭像壞掉的唱片一樣循環。\n\n記住：你擁有頭腦，但你不是你的頭腦。你是那個可以觀察念頭的人。退回到那個觀察者的位置。看著這個機制而不被它困住。從那裡，清明會回來。"
  },
  {
    id: 62,
    slug: "fighting",
    name: "Fighting",
    nameZh: "奮鬥",
    suit: "clouds",
    keywords: ["conflict", "ego battle", "resistance", "struggle", "aggression"],
    keywordsZh: ["衝突", "小我之戰", "抗拒", "掙扎", "攻擊性"],
    description: "The armor is on. The sword is drawn. But who exactly are you fighting? Fighting appears when the ego has declared war — against a person, a situation, or most often, against itself. The struggle feels noble, but look closer: is it necessary?\n\nThis card appears when conflict has become your default mode. You approach every challenge as a battle, every disagreement as a threat. The fighting stance uses enormous energy and keeps you in a state of perpetual tension.\n\nNot everything requires a fight. Sometimes the bravest thing is to put down the sword. Sometimes the enemy is just a mirror. Sometimes peace is not defeat — it is wisdom.",
    descriptionZh: "盔甲穿上了，劍拔出來了。但你到底在跟誰打？奮鬥出現在小我宣戰的時候——對一個人、一個情境，或最常見的，對自己。這場掙扎感覺很崇高，但仔細看：它是必要的嗎？\n\n這張牌出現時，衝突已經成了你的預設模式。你把每個挑戰當作戰鬥，每個分歧當作威脅。戰鬥姿態消耗巨大的能量，讓你處於持續緊繃的狀態。\n\n不是所有事情都需要一場戰鬥。有時候最勇敢的事是放下劍。有時候敵人只是一面鏡子。有時候和平不是失敗——而是智慧。"
  },
  {
    id: 63,
    slug: "morality",
    name: "Morality",
    nameZh: "道德",
    suit: "clouds",
    keywords: ["rigid rules", "judgment", "right and wrong", "dogma", "conditioning"],
    keywordsZh: ["僵化規則", "評判", "對與錯", "教條", "制約"],
    description: "Right and wrong. Good and bad. Should and shouldn't. Morality is the voice of inherited rules — rules that may have been useful once but have hardened into rigid judgment. The queen of clouds sits on her throne, pointing fingers.\n\nThis card appears when moral rigidity is blocking your growth. You are judging yourself or others by rules you never consciously chose. These rules create guilt, shame, and a suffocating sense of obligation.\n\nTrue morality is not about following rules. It is about awareness. When you are truly conscious, you naturally know what is compassionate, what is kind, what is true. You don't need a rulebook — you need a clear heart.",
    descriptionZh: "對與錯、好與壞、應該與不應該。道德是繼承來的規則的聲音——這些規則曾經可能有用，但已經硬化成僵固的評判。雲之皇后坐在她的寶座上，指指點點。\n\n這張牌出現時，道德的僵硬正在阻礙你的成長。你正在用你從未有意識地選擇的規則來評判自己或他人。這些規則製造罪惡感、羞恥和令人窒息的義務感。\n\n真正的道德不是遵循規則，而是覺知。當你真正有意識時，你自然知道什麼是慈悲的、什麼是善良的、什麼是真實的。你不需要一本規則書——你需要一顆清明的心。"
  },
  {
    id: 64,
    slug: "control",
    name: "Control",
    nameZh: "控制",
    suit: "clouds",
    keywords: ["rigidity", "domination", "fear", "power over", "resistance to flow"],
    keywordsZh: ["僵硬", "支配", "恐懼", "凌駕", "抗拒流動"],
    description: "The king of clouds sits rigid and upright, controlling everything around him. Every detail managed. Every outcome predicted. Every emotion contained. It looks like power, but it is actually fear dressed in a suit.\n\nThis card appears when you are gripping life too tightly. Control is the mind's response to uncertainty — if I can manage every variable, nothing bad can happen. But life is not a spreadsheet. It is a river, and rivers cannot be controlled without eventually breaking the dam.\n\nWhat are you afraid will happen if you let go? The irony of control is that the tighter you hold, the less you actually have. Loosen your grip. Let life surprise you.",
    descriptionZh: "雲之國王端坐著，僵硬而挺直，控制著周圍的一切。每個細節都被管理，每個結果都被預測，每個情緒都被壓制。它看起來像力量，但實際上是穿著西裝的恐懼。\n\n這張牌出現時，你把生命抓得太緊了。控制是頭腦對不確定性的回應——如果我能管理每一個變數，就不會有壞事發生。但生命不是一張試算表，它是一條河流，而河流不可能被長期控制而不最終衝破堤壩。\n\n如果你放手，你害怕會發生什麼？控制的諷刺在於，你抓得越緊，你實際擁有的越少。鬆開你的手。讓生命給你驚喜。"
  },

  // ============================================
  // Rainbows 彩虹族群 (65-78)
  // ============================================
  {
    id: 65,
    slug: "maturity",
    name: "Maturity",
    nameZh: "成熟",
    suit: "rainbows",
    keywords: ["wisdom", "experience", "ripening", "groundedness", "depth"],
    keywordsZh: ["智慧", "經驗", "成熟", "扎根", "深度"],
    description: "Maturity is not about age. It is about the depth that comes from having lived fully — embracing both the joy and the pain, the success and the failure. The mature person does not avoid life's difficulties. They move through them with grace.\n\nThis card appears when experience has given you something valuable. You have earned a kind of wisdom that cannot be taught — only lived. Trust this wisdom. It is more reliable than any theory or advice.\n\nYou are ready to make decisions from a place of depth rather than reactivity. Your roots are deep. Stand firm in what you know.",
    descriptionZh: "成熟與年齡無關。它是完整地活過之後獲得的深度——擁抱喜悅和痛苦、成功和失敗。成熟的人不逃避生命的困難，而是優雅地穿越它們。\n\n這張牌出現時，經驗給了你某種珍貴的東西。你獲得了一種無法被教導、只能被活出的智慧。信任這份智慧。它比任何理論或建議都更可靠。\n\n你已經準備好從深度而非反應性的地方做決定了。你的根很深。穩穩地站在你知道的事情上。"
  },
  {
    id: 66,
    slug: "moment-to-moment",
    name: "Moment to Moment",
    nameZh: "剎那之際",
    suit: "rainbows",
    keywords: ["presence", "mindfulness", "one step", "now", "attention"],
    keywordsZh: ["臨在", "正念", "一步一步", "此刻", "專注"],
    description: "Life does not happen in years or months or even days. It happens moment to moment — one breath, one step, one heartbeat at a time. This card is a reminder to come back to the only time that truly exists: now.\n\nWhen you are anxious, you are living in the future. When you are regretful, you are living in the past. Moment to Moment asks you to land right here, right now. Feel your feet on the ground. Notice the temperature of the air. This is where life is actually happening.\n\nYou don't need to figure out your whole life today. You just need to take the next step.",
    descriptionZh: "生命不是以年、月甚至天來發生的。它是一刻接一刻地發生——一次呼吸、一個步伐、一次心跳。這張牌提醒你回到唯一真正存在的時間：現在。\n\n當你焦慮時，你活在未來。當你後悔時，你活在過去。剎那之際邀請你落在此時此地。感受你的雙腳踩在地面上。注意空氣的溫度。生命實際上正在這裡發生。\n\n你不需要今天就把整個人生想清楚。你只需要踏出下一步。"
  },
  {
    id: 67,
    slug: "guidance",
    name: "Guidance",
    nameZh: "指引",
    suit: "rainbows",
    keywords: ["synchronicity", "inner angel", "direction", "signs", "alignment"],
    keywordsZh: ["共時性", "內在天使", "方向", "徵兆", "校準"],
    description: "You are being guided. Not by some external force imposing its will, but by a gentle intelligence that speaks through synchronicities, hunches, and quiet knowing. The inner angel does not shout. It whispers.\n\nThis card appears when you need reassurance that you are on the right path. The signs are there — in the coincidences that seem too perfect, in the doors that open without effort, in the feeling of rightness that settles in your chest.\n\nPay attention to what life is showing you. Not with the mind, but with the heart. The guidance is already here. You just need to slow down enough to receive it.",
    descriptionZh: "你正在被指引。不是被某個外在力量強加它的意志，而是被一種溫柔的智慧，透過共時性、直覺和安靜的知曉來說話。內在的天使不會大喊，它低語。\n\n這張牌出現時，你需要確認你在正確的道路上。徵兆就在那裡——在那些似乎太完美的巧合中、在那些毫不費力就打開的門中、在那種落在你胸口的正確感中。\n\n注意生命正在向你展示什麼。不是用頭腦，而是用心。指引已經在這裡了。你只需要慢下來到足以接收它。"
  },
  {
    id: 68,
    slug: "the-miser",
    name: "The Miser",
    nameZh: "吝嗇",
    suit: "rainbows",
    keywords: ["hoarding", "scarcity", "fear of loss", "clinging", "withholding"],
    keywordsZh: ["囤積", "匱乏", "害怕失去", "緊抓", "扣留"],
    description: "The Miser holds everything close — money, energy, love, time — terrified that giving anything away will leave them with nothing. But the irony is that hoarding creates the very emptiness it fears. Stagnant water breeds disease. Hoarded love turns bitter.\n\nThis card appears when you are operating from scarcity rather than abundance. Perhaps you are withholding your talent, your affection, or your resources out of fear. But the universe operates on circulation, not storage. What you give freely returns multiplied.\n\nOpen your hands. Share what you have. The well refills when you draw from it, not when you guard it.",
    descriptionZh: "吝嗇的人把一切都緊緊抱住——金錢、能量、愛、時間——害怕給出任何東西會讓自己一無所有。但諷刺的是，囤積恰恰創造了它所恐懼的空虛。靜止的水滋生疾病，被囤積的愛會變苦。\n\n這張牌出現時，你正在從匱乏而非豐盛的角度運作。也許你出於恐懼而扣留你的才華、情感或資源。但宇宙的運作靠的是流通，而非囤積。你自由給出的東西會加倍回來。\n\n張開你的手，分享你擁有的。井在你從中汲取時會重新填滿，而不是在你守著它的時候。"
  },
  {
    id: 69,
    slug: "the-outsider",
    name: "The Outsider",
    nameZh: "局外人",
    suit: "rainbows",
    keywords: ["exclusion", "not belonging", "childhood wounds", "alienation", "longing"],
    keywordsZh: ["被排除", "不屬於", "童年傷口", "疏離", "渴望"],
    description: "The child stands outside the gate, looking in at a world that seems to have no place for them. The Outsider carries the pain of not belonging — the feeling that everyone else received an invitation that somehow got lost in the mail.\n\nThis card appears when old wounds of exclusion are surfacing. Perhaps a current situation is triggering the childhood feeling of being left out, different, or unwanted. The pain is real, but it may be older than the current situation.\n\nHere is the truth the Outsider needs to hear: belonging is not something others grant you. It is something you claim for yourself. You were never outside. You just believed you were.",
    descriptionZh: "孩子站在門外，望著一個似乎沒有他的位置的世界。局外人承載著不屬於的痛苦——那種感覺每個人都收到了邀請，而你的不知怎麼寄丟了。\n\n這張牌出現時，被排除的舊傷正在浮現。也許某個當前的情境正在觸發童年時被遺落、與眾不同或不被需要的感覺。這個痛苦是真的，但它可能比當前的情境更古老。\n\n這是局外人需要聽到的真相：歸屬不是別人給你的，而是你為自己宣稱的。你從來不在外面，你只是相信你在。"
  },
  {
    id: 70,
    slug: "compromise",
    name: "Compromise",
    nameZh: "妥協",
    suit: "rainbows",
    keywords: ["selling out", "dishonesty", "people-pleasing", "losing yourself", "inauthenticity"],
    keywordsZh: ["出賣自己", "不誠實", "討好", "迷失自己", "不真實"],
    description: "There is healthy negotiation, and then there is compromise — the kind where you sell a piece of your soul for the illusion of peace. This card speaks of the second kind. You are giving up something essential in order to avoid conflict, gain approval, or keep a situation stable.\n\nThis card appears when people-pleasing has crossed into self-betrayal. You smile when you want to scream. You agree when you want to refuse. The peace you've bought is a prison made of your own silence.\n\nWhat are you sacrificing? Is it worth it? Sometimes the bravest thing you can do is say no, even when everyone else wants you to say yes.",
    descriptionZh: "有健康的協商，然後有妥協——那種你為了和平的幻覺而出賣靈魂一部分的妥協。這張牌說的是第二種。你正在放棄某些本質的東西，只為了避免衝突、獲得認可或維持穩定。\n\n這張牌出現時，討好已經越過界線成為自我背叛。你想尖叫的時候在微笑，你想拒絕的時候在同意。你買來的和平是一座用你自己的沈默建造的監獄。\n\n你正在犧牲什麼？它值得嗎？有時候你能做的最勇敢的事就是說不，即使所有人都希望你說好。"
  },
  {
    id: 71,
    slug: "patience",
    name: "Patience",
    nameZh: "耐心",
    suit: "rainbows",
    keywords: ["waiting", "trust", "timing", "persistence", "faith"],
    keywordsZh: ["等待", "信任", "時機", "堅持", "信念"],
    description: "The moon does not rush to become full. The seed does not hurry to become a tree. There is a natural timing to all things, and patience is the art of honoring that timing instead of fighting it.\n\nThis card appears when you want results now but the universe is asking you to wait. This is not passive waiting — it is active trust. Continue doing the work, continue planting seeds, but release your grip on the timeline.\n\nPatience is not about doing nothing. It is about doing everything you can and then trusting the rest to time. What is meant for you will not pass you by. But it may arrive on its own schedule.",
    descriptionZh: "月亮不會急著變圓。種子不會急著變成樹。萬事萬物都有自然的時序，而耐心是尊重那個時序而非與之對抗的藝術。\n\n這張牌出現時，你想要立即看到結果，但宇宙要求你等待。這不是被動的等待——而是主動的信任。繼續做你的工作，繼續播種，但放開你對時間表的執著。\n\n耐心不是什麼都不做。而是做了你能做的一切，然後把剩下的交給時間。屬於你的東西不會錯過你。但它可能按照自己的時間表到來。"
  },
  {
    id: 72,
    slug: "ordinariness",
    name: "Ordinariness",
    nameZh: "平凡",
    suit: "rainbows",
    keywords: ["simplicity", "humble beauty", "everyday sacred", "groundedness", "contentment"],
    keywordsZh: ["簡單", "樸素之美", "日常的神聖", "踏實", "知足"],
    description: "There is extraordinary beauty in the ordinary — in a cup of tea drunk slowly, in the morning light on the kitchen floor, in the rhythm of a familiar routine. Ordinariness is the card that says: you don't need to be special to be sacred.\n\nThis card appears when the pursuit of the extraordinary has made you blind to the beauty that already surrounds you. You are chasing peak experiences while missing the quiet miracle of everyday life.\n\nCome back to earth. Wash the dishes. Walk in the park. Talk to a friend. The sacred is not somewhere else. It is right here, disguised as the ordinary.",
    descriptionZh: "平凡中有著非凡的美——慢慢喝一杯茶、早晨灑在廚房地板上的光線、熟悉日常的節奏。平凡這張牌說的是：你不需要變得特別才是神聖的。\n\n這張牌出現時，對非凡的追求讓你看不見已經圍繞著你的美。你在追逐巔峰體驗，卻錯過了日常生活中安靜的奇蹟。\n\n回到大地。洗碗。去公園走走。和朋友聊天。神聖不在別的地方。它就在這裡，偽裝成平凡的樣子。"
  },
  {
    id: 73,
    slug: "ripeness",
    name: "Ripeness",
    nameZh: "熟成",
    suit: "rainbows",
    keywords: ["readiness", "perfect timing", "harvest", "fruition", "natural conclusion"],
    keywordsZh: ["準備好了", "完美時機", "收穫", "結果", "自然結論"],
    description: "The fruit is ready to fall. Not because it is forced, but because it has reached its natural fullness. There is nothing left to do but let go of the branch and trust gravity.\n\nThis card appears when something in your life has reached its moment of ripeness. A project, a decision, a relationship, a phase of growth — it is ready. The timing is not something you engineered. It arrived on its own, through patience and natural development.\n\nDon't hesitate. Don't overthink. When the fruit is ripe, you pick it. If you wait too long, it falls and bruises. The moment is now.",
    descriptionZh: "果實準備好落下了。不是因為被強迫，而是因為它達到了自然的飽滿。除了放開枝頭、信任重力之外，沒有什麼需要做的了。\n\n這張牌出現時，你生命中的某件事已經達到了它成熟的時刻。一個專案、一個決定、一段關係、一個成長階段——它準備好了。這個時機不是你設計的，它透過耐心和自然發展自己到來的。\n\n不要猶豫，不要過度思考。當果實成熟了，你就摘下它。如果等太久，它會掉下來碰傷。時刻就是現在。"
  },
  {
    id: 74,
    slug: "we-are-the-world",
    name: "We Are The World",
    nameZh: "我們是世界",
    suit: "rainbows",
    keywords: ["unity", "connection", "humanity", "celebration", "togetherness"],
    keywordsZh: ["合一", "連結", "人性", "慶祝", "共同體"],
    description: "Beyond all the differences — of race, culture, belief, and language — there is one humanity. One shared heartbeat. One earth. One sky. We Are The World is the recognition that separation is an illusion and connection is our natural state.\n\nThis card appears when community and human connection are calling to you. Perhaps you have been isolated. Perhaps you have been focused only on your own journey. This card reminds you that your journey is intertwined with everyone else's.\n\nReach out. Share. Celebrate with others. The joy of one is the joy of all. We are far more alike than we are different.",
    descriptionZh: "超越所有的差異——種族、文化、信仰和語言——只有一個人類。一個共同的心跳。一個地球。一片天空。我們是世界是對分離是幻覺、連結是我們自然狀態的認知。\n\n這張牌出現時，社群和人與人的連結正在呼喚你。也許你一直在孤立中，也許你一直只專注在自己的旅程上。這張牌提醒你，你的旅程與所有人的旅程交織在一起。\n\n伸出手。分享。與他人慶祝。一個人的喜悅就是所有人的喜悅。我們之間的相似遠大於不同。"
  },
  {
    id: 75,
    slug: "adventure",
    name: "Adventure",
    nameZh: "冒險",
    suit: "rainbows",
    keywords: ["exploration", "curiosity", "childlike wonder", "new territory", "discovery"],
    keywordsZh: ["探索", "好奇心", "孩童般的驚奇", "新領域", "發現"],
    description: "The child walks into the forest with wide eyes and an open heart. No fear, no plan, just the pure thrill of not knowing what comes next. Adventure is this energy — the willingness to explore the unknown with curiosity rather than anxiety.\n\nThis card appears when routine has made your life too predictable. Your soul is hungry for something new — a new challenge, a new place, a new perspective. You don't need a grand expedition. Even a new route to work can wake up the adventurer in you.\n\nSay yes to the unfamiliar. Let curiosity lead. The best stories always begin with stepping off the known path.",
    descriptionZh: "孩子帶著大大的眼睛和敞開的心走進森林。沒有恐懼、沒有計畫，只有不知道接下來會發生什麼的純粹興奮。冒險就是這種能量——以好奇而非焦慮來探索未知的意願。\n\n這張牌出現時，例行公事讓你的生活變得太可預測了。你的靈魂渴望某些新東西——一個新挑戰、一個新地方、一個新視角。你不需要一場盛大的遠征。即使是一條新的上班路線都能喚醒你內在的冒險者。\n\n對不熟悉的事物說好。讓好奇心帶路。最好的故事總是始於離開已知的道路。"
  },
  {
    id: 76,
    slug: "slowing-down",
    name: "Slowing Down",
    nameZh: "慢下來",
    suit: "rainbows",
    keywords: ["pace", "mindfulness", "steady", "grounding", "presence"],
    keywordsZh: ["步調", "正念", "穩定", "扎根", "臨在"],
    description: "Faster is not always better. The knight of rainbows moves at a steady, deliberate pace — not because he lacks energy, but because he knows that rushing creates mistakes, misses beauty, and burns out the spirit.\n\nThis card appears when your pace has become unsustainable. You are moving so fast that you can't feel the ground beneath your feet. Deadlines, notifications, commitments — they blur together into a frantic stream.\n\nSlow down. Not to a stop, but to a pace where you can actually experience what you are doing. Quality over speed. Presence over productivity. The tortoise, as they say, wins the race.",
    descriptionZh: "快不一定更好。彩虹騎士以穩定、有意識的步調移動——不是因為他缺乏能量，而是因為他知道急躁會製造錯誤、錯過美景、耗盡精神。\n\n這張牌出現時，你的步調已經變得不可持續。你移動得太快，感受不到腳下的地面。截止日期、通知、承諾——它們模糊成一條瘋狂的溪流。\n\n慢下來。不是停下來，而是調到一個你可以實際體驗你正在做的事的步調。品質勝過速度。臨在勝過生產力。烏龜，如他們所說，會贏得比賽。"
  },
  {
    id: 77,
    slug: "flowering",
    name: "Flowering",
    nameZh: "開花",
    suit: "rainbows",
    keywords: ["abundance", "blooming", "expression", "beauty", "fulfillment"],
    keywordsZh: ["豐盛", "綻放", "表達", "美", "實現"],
    description: "The queen of rainbows is in full bloom. Everything she touches flourishes — not through force, but through the natural expression of her being. Flowering is what happens when you stop trying to be something and simply allow yourself to be.\n\nThis card appears when you are entering a phase of natural abundance. Creative projects flow. Relationships deepen. Your presence itself becomes nourishing to those around you. This is not effort — this is overflow.\n\nTrust what is blooming. Don't pick the flowers too early. Don't question whether you deserve this beauty. You do. Let yourself be magnificent.",
    descriptionZh: "彩虹皇后正在盛開。她觸碰的一切都繁榮——不是透過強迫，而是透過她存在的自然表達。開花是當你停止試圖成為什麼，只是允許自己存在時所發生的事。\n\n這張牌出現時，你正在進入一個自然豐盛的階段。創作計畫順暢流動，關係加深，你的臨在本身就成為周圍人的滋養。這不是努力——這是滿溢。\n\n信任正在綻放的東西。不要太早摘花。不要質疑你是否值得這份美好。你值得。讓自己綻放光芒。"
  },
  {
    id: 78,
    slug: "abundance",
    name: "Abundance",
    nameZh: "豐富",
    suit: "rainbows",
    keywords: ["wealth", "prosperity", "groundedness", "material fulfillment", "generosity"],
    keywordsZh: ["財富", "繁榮", "扎根", "物質圓滿", "慷慨"],
    description: "The king of rainbows sits in a garden of earthly delights — not as a hoarder, but as a steward. Abundance is the natural result of living in alignment with your truth, doing meaningful work, and staying grounded in reality.\n\nThis card appears when material and spiritual wealth are converging. You don't have to choose between doing well and doing good. True abundance is not about accumulation — it is about circulation. The more freely you give, the more freely life gives to you.\n\nEnjoy what you have. Share what you can. Trust that there is enough. The universe is not stingy — only the mind creates scarcity.",
    descriptionZh: "彩虹國王坐在人間樂園之中——不是作為囤積者，而是作為管理者。豐富是與你的真實校準、做有意義的工作、扎根於現實的自然結果。\n\n這張牌出現時，物質和靈性的豐盛正在匯聚。你不必在做得好和做好事之間選擇。真正的豐富不是關於累積——而是關於流通。你越自由地給予，生命就越自由地給予你。\n\n享受你擁有的。分享你能分享的。相信足夠的。宇宙不吝嗇——只有頭腦創造匱乏。"
  },
];