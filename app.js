const emotions = {
  怒: { type: '立场型', purpose: '建立人设、替用户说话', advice: '亮态度、划边界、替用户说话', frequency: '每周 1–2 条' },
  喜: { type: '结果型', purpose: '晒成果、给希望', advice: '晒战绩、晒学员案例，给希望', frequency: '每周 1 条' },
  哀: { type: '故事型', purpose: '拉信任、讲经历', advice: '讲转折、讲真实经历，让人看见你的来路', frequency: '每两周 1 条' },
  惧: { type: '痛点型', purpose: '制造紧迫感、引流', advice: '点出风险，但不要持续制造焦虑', frequency: '发售前集中用' },
  爱: { type: '陪伴型', purpose: '拉近距离、社群维护', advice: '多回应、多分享幕后，让用户感到被接住', frequency: '每周 1 条' },
  恶: { type: '筛选型', purpose: '建立高端感、筛选客户', advice: '说清楚不服务谁，建立边界与专业感', frequency: '发售前集中用' },
  欲: { type: '向往型', purpose: '制造渴望、品牌片', advice: '展示理想结果，让用户看见想成为的自己', frequency: '每月 1 条' }
};

const emotionGuides = {
  怒: {
    essence: '用态度建立记忆点', format: '亮态度 → 说清原因 → 给出底线',
    visual: [['表情', '严肃、不刻意笑，直视镜头'], ['动作', '动作克制，关键句只用一次手势强调'], ['场景', '办公室、纯色墙面或书架前'], ['穿搭', '深色系、线条利落、减少装饰'], ['灯光', '中性或偏冷光，让面部轮廓清晰']],
    audio: [['语速', '中速偏快，关键词明显加重'], ['语气', '坚定、直接，不解释过度'], ['节奏', '态度快而有力，原因稍慢，底线一字一顿'], ['音乐', '低沉有力的 BGM，或直接用纯人声']],
    authentic: '回忆那件真正让你不舒服的事，找回心里“凭什么”的感觉。',
    prompt: ['当时对方原话是什么？', '你真正想保护的人或原则是什么？', '这件事让你最终立下了什么边界？'],
    useWhen: '行业乱象、用户被误导、需要亮明原则时', opening: '“在{industry}里，我最看不惯的一件事是……”', closing: '“如果你也遇到过，把这条转给那个需要看见的人。”', shot: '中近景直视开场 → 关键句轻推近 → 结尾停一秒再收镜'
  },
  喜: {
    essence: '用结果让用户看到希望', format: '亮结果 → 交代过程 → 提炼方法 → 给希望',
    visual: [['表情', '自然有笑容，眼神有光'], ['动作', '放松自然，说到数字时用手势辅助'], ['场景', '办公室、咖啡厅、书房或明亮户外'], ['穿搭', '明亮色系，简约大方'], ['灯光', '暖光为主，画面明亮通透']],
    audio: [['语速', '中速偏快，有清晰节奏'], ['语气', '轻快、松弛，分享而不是炫耀'], ['节奏', '结果放慢，过程加快，结尾再次放慢给希望'], ['音乐', '轻快、积极但不过分热闹的 BGM']],
    authentic: '回忆你真正做到的那一刻，找回“原来真的可以”的踏实感。',
    prompt: ['结果出现前你做对了哪一步？', '哪个数字或细节最能证明变化？', '用户可以复制的最小动作是什么？'],
    useWhen: '有新成果、学员反馈、案例或方法验证时', opening: '“我用这套方法，在{industry}里拿到了一个没想到的结果……”', closing: '“你不用一次做到满分，先把第一步做完。”', shot: '结果截图特写 → 正面口播拆过程 → 回到成果画面收尾'
  },
  哀: {
    essence: '用真实经历换来深度信任', format: '讲低谷 → 说真实感受 → 出现转折 → 留下感悟',
    visual: [['表情', '柔和真实，允许短暂沉默'], ['动作', '少而自然，手放桌面或腿上'], ['场景', '家中沙发、窗边或安静书房'], ['穿搭', '暖色偏暗，舒适、有生活感'], ['灯光', '柔和暖光，整体亮度稍低']],
    audio: [['语速', '偏慢，有停顿和呼吸感'], ['语气', '柔和、诚实，像在回忆'], ['节奏', '低谷慢而轻，转折稍快，感悟再次放慢'], ['音乐', '轻柔钢琴或吉他，音量保持很低']],
    authentic: '回忆你真正很难的那个时刻，以及你第一次问自己“还要继续吗”的瞬间。',
    prompt: ['那天发生了什么具体细节？', '你最不愿承认的感受是什么？', '后来哪一个选择改变了走向？'],
    useWhen: '讲创业低谷、失败经历、身份转折或成长代价时', opening: '“有一段时间，我甚至不敢告诉别人我在做{industry}……”', closing: '“如果你也在这一段路上，我想告诉你：这不是终点。”', shot: '环境空镜 → 侧面或微侧口播 → 转折处切正面 → 留白收尾'
  },
  惧: {
    essence: '让用户看见不行动的代价', format: '抛出痛点 → 说明后果 → 指出误区 → 给解决方向',
    visual: [['表情', '严肃、不笑，眼神集中'], ['动作', '克制，后果句停顿后直视镜头'], ['场景', '办公室、纯色背景或白板前'], ['穿搭', '深色系，干练、专业'], ['灯光', '中性偏冷，保留适度阴影']],
    audio: [['语速', '中速偏快，信息密度高'], ['语气', '紧凑严肃，但不恐吓'], ['节奏', '痛点快、后果慢且重，解决方案恢复中速'], ['音乐', '轻微紧张感 BGM，或纯人声']],
    authentic: '回忆你曾经后悔的那一刻，找回“如果早点知道就好了”的感觉。',
    prompt: ['你或客户为这个错误付过什么代价？', '问题出现前有哪些信号？', '现在补救的第一步是什么？'],
    useWhen: '用户低估风险、发售预热、需要解释行动时机时', opening: '“如果你正在做{industry}，这件事越晚知道，代价越大。”', closing: '“现在先检查这一项，还来得及。”', shot: '大字标题开场 → 正面口播列后果 → 白板或字幕给 3 步检查'
  },
  爱: {
    essence: '让用户感到被理解、被接住', format: '回应困惑 → 说出感受 → 给出方法 → 温暖收尾',
    visual: [['表情', '微笑，眼神柔和稳定'], ['动作', '自然，可拿杯子或轻托下巴'], ['场景', '家中沙发、书桌或安静咖啡厅'], ['穿搭', '柔和暖色，舒适温暖'], ['灯光', '面部光线充足的柔和暖光']],
    audio: [['语速', '中速，不急不慢'], ['语气', '亲切，像和一个具体的朋友聊天'], ['节奏', '回应平稳，方法稍慢，结尾柔和收住'], ['音乐', '轻柔 BGM，也可以不用音乐']],
    authentic: '回忆你曾被人接住的时刻，找回“原来真的有人懂我”的感觉。',
    prompt: ['用户最难说出口的那句话是什么？', '你曾经也在哪一步卡住？', '你能给他的最小支持是什么？'],
    useWhen: '回应私信、常见困惑、陪跑过程或社群关系维护时', opening: '“最近很多人问我：做{industry}，是不是我真的不行？”', closing: '“你不是做不到，只是这一次需要换一个顺序。”', shot: '坐姿中近景 → 像对一个人说话 → 方法用字幕出现 → 微笑收尾'
  },
  恶: {
    essence: '用清晰标准筛选合适客户', format: '说不服务谁 → 解释为什么 → 说清服务谁 → 给选择',
    visual: [['表情', '冷静、不笑，眼神坚定'], ['动作', '克制，双手交叉或自然放桌面'], ['场景', '办公室、纯色背景或书架前'], ['穿搭', '深色或中性色，干练简约'], ['灯光', '中性光，面部轮廓清晰']],
    audio: [['语速', '中速，不要过快'], ['语气', '冷静、笃定，不讨好也不攻击'], ['节奏', '门槛平稳，原因稍慢，适合对象加重'], ['音乐', '低沉克制的 BGM，或不用音乐']],
    authentic: '回忆你坚守原则、哪怕失去订单也没有后悔的那一刻。',
    prompt: ['你拒绝过哪类合作？', '这个标准保护了谁的结果？', '真正适合你的人需要做到什么？'],
    useWhen: '解释价格、服务门槛、合作标准或筛选客户时', opening: '“我的{industry}服务，不适合所有人，尤其是下面三种人。”', closing: '“如果你认同这套标准，我们再认真聊。”', shot: '固定中景开场 → 每条标准配简洁字幕 → 最后直视镜头给选择'
  },
  欲: {
    essence: '让用户看见想成为的自己', format: '展示理想状态 → 还原成长路径 → 给出可达成的行动',
    visual: [['表情', '放松，有淡淡微笑'], ['动作', '自然，可边走边说或操作工作'], ['场景', '有质感的办公室、书房、咖啡厅或户外'], ['穿搭', '有设计感但不过度用力，强调材质'], ['灯光', '自然光或暖光，画面干净有层次']],
    audio: [['语速', '中慢速，从容不急'], ['语气', '松弛、有质感，不刻意炫耀'], ['节奏', '状态平稳，路径稍慢，行动建议坚定'], ['音乐', '有质感、留白充足的轻音乐']],
    authentic: '回忆你曾羡慕一种生活的时刻，找回“我也想这样”的念头。',
    prompt: ['你真正向往的日常是什么？', '它背后经历了哪三步？', '用户今天能开始的动作是什么？'],
    useWhen: '展示生活方式、理想工作状态、品牌气质或成长路径时', opening: '“这是我做{industry}以后，最喜欢的一种工作状态。”', closing: '“你不用复制我的生活，但可以从今天开始设计自己的版本。”', shot: '状态 B-roll 开场 → 边走边说成长路径 → 一个具体行动作结'
  }
};

const emotionIdentities = {
  怒: { name: '边界守护者', signature: '你天生适合把别人不敢说的话说出来，用态度替用户发声。', trigger: '“她替我说出了心里话。”', peak: '有力量但不攻击，让用户学会建立自己的边界。', avoid: '避免每条都开怼。持续对抗会让专业感变成情绪宣泄。' },
  喜: { name: '结果点亮者', signature: '你适合把真实成果和有效路径说清楚，让用户看到“我也可以”。', trigger: '“她能做到，我也有机会。”', peak: '不炫耀结果，而是把希望和可复制的方法交给用户。', avoid: '避免只晒高光、不讲过程，否则容易让用户觉得有距离。' },
  哀: { name: '真实叙事者', signature: '你适合用经历、低谷和转折建立深度信任，让用户觉得被看见。', trigger: '“原来不只我经历过这些。”', peak: '讲脆弱但不停在脆弱里，最终带用户看见成长出口。', avoid: '避免长期停留在低谷和委屈里，要让每个故事都有转折。' },
  惧: { name: '风险提醒者', signature: '你擅长看见问题与代价，能帮助用户在踩坑之前及时行动。', trigger: '“再不改变，代价可能更大。”', peak: '指出风险后一定给出口，让警觉变成清晰行动。', avoid: '避免只放大焦虑却不给解法，否则用户会本能逃离。' },
  爱: { name: '温柔陪伴者', signature: '你适合先接住情绪，再给方法，让用户愿意靠近并长期信任你。', trigger: '“她真的懂我，也愿意陪我。”', peak: '温柔但有方向，不只安慰，更能陪用户向前走。', avoid: '避免一味迁就和安慰，要保留专业判断与必要边界。' },
  恶: { name: '标准筛选者', signature: '你适合用明确标准和选择边界建立高端感，吸引真正合适的人。', trigger: '“她有原则，所以值得信任。”', peak: '筛选不是高高在上，而是替双方保护结果。', avoid: '避免过度冷感和优越感，要解释标准背后的善意。' },
  欲: { name: '未来描绘者', signature: '你适合展示更好的状态和成长路径，让用户产生真实向往。', trigger: '“我也想成为这样的自己。”', peak: '不贩卖幻想，而是把理想生活拆成可以抵达的路径。', avoid: '避免只展示精致表面，要补充过程与真实代价。' }
};

const contentPlaybooks = {
  怒: [
    ['行业乱象揭秘', ['{industry}里最常见的 3 个伪专业', '那些教你“快速见效”的人，可能自己都没做到', '我为什么不建议你盲目相信这个行业惯例']],
    ['替用户说话', ['不是你不够努力，是这个方法从一开始就错了', '这句话，我替所有被误导的用户说', '别再用“你不够自律”掩盖交付问题']],
    ['边界宣言', ['我的时间有价，这 3 件事不再免费做', '合作前，我一定会说清楚的 3 条底线', '我宁可不成交，也不会答应这件事']],
    ['拒绝记录', ['今天我拒绝了一个客户，原因是……', '这个看似不错的合作，我为什么没接', '少赚一笔钱后，我反而更确定自己的标准']],
    ['观点碰撞', ['有人说“{goal}靠运气”，我的看法正相反', '越是专业的人，越不该承诺这件事', '这个行业默认的做法，我不认同']]
  ],
  喜: [
    ['战绩复盘', ['这次结果比预期好，我做对了哪 3 步', '从 0 到第一个结果，我没有做什么', '一个月后回看，真正有效的是这件小事']],
    ['学员案例', ['这个学员改变的，不只是一个数字', '她从不敢开始到拿到结果，做了什么', '同样的方法，为什么这位学员进步最快']],
    ['前后对比', ['做{industry}之前 vs 之后，我最大的变化', '同一个问题，过去的我和现在的我怎么处理', '调整这一步前后，结果差了多少']],
    ['方法总结', ['我把有效的方法，总结成了一个 3 步公式', '想要{goal}，先把顺序改成这样', '反复验证后，我只保留了这 3 个动作']],
    ['高光时刻', ['那天收到这条消息，我知道这件事做对了', '这个结果背后，是我最想分享的一次坚持', '今年最让我有成就感的，不是赚了多少钱']]
  ],
  哀: [
    ['低谷经历', ['我最想放弃{industry}的那一天', '那次投入没有回报，我是怎么熬过来的', '有一段时间，我不敢告诉别人自己在做什么']],
    ['真实脆弱', ['我也曾经觉得自己不够好', '镜头前看起来很坚定，背后我也怕过', '这件事我藏了很久，今天想认真说说']],
    ['转折时刻', ['直到我学会这件事，结果才开始改变', '一个看似很小的决定，把我从低谷拉出来', '真正的转折，不是成功，而是我不再证明自己']],
    ['成长对比', ['以前的我遇到这件事会崩溃，现在不会了', '三年前的我，绝不会相信今天的生活', '我失去过什么，才换来现在的稳定']],
    ['共情回应', ['如果你现在也很难，我想先告诉你这句话', '你不是脆弱，只是一个人撑太久了', '给正在怀疑自己的你：先别急着否定自己']]
  ],
  惧: [
    ['避坑指南', ['做{industry}，90% 的人都踩过这个坑', '付费前先检查这 3 件事，少走一年弯路', '新手最容易忽略、代价却很大的一个细节']],
    ['代价警告', ['再不处理这个问题，损失的不只是钱', '你以为省下了成本，其实付出了更高代价', '为什么越拖延，这件事越难解决']],
    ['行业真相', ['{industry}里没人愿意明说的 3 个真相', '看起来很努力，为什么结果还是不动', '问题不在执行力，而在第一步就选错了']],
    ['案例拆解', ['这个案例失败前，其实出现过 3 个信号', '她踩了什么坑，又是怎么补救的', '同样的预算，结果为什么完全不同']],
    ['紧迫提醒', ['如果你正处在这个阶段，现在行动还来得及', '这个时间窗口错过后，你会多付出什么', '今天先完成这一步，别等问题变大']]
  ],
  爱: [
    ['回应困惑', ['有朋友问我这个问题，我想认真回答一次', '你不是做不到，只是顺序错了', '当你不知道怎么选时，先问自己这 3 句话']],
    ['共情陪伴', ['如果你也在经历这件事，我懂你的感受', '不用逼自己马上振作，先把今天过好', '你已经很努力了，现在需要的不是再责怪自己']],
    ['答疑解惑', ['最近被问最多的 3 个问题，一次讲清楚', '关于{industry}，新手最想知道的答案', '这件事没有标准答案，但有一个判断方法']],
    ['成长陪伴', ['我陪这个学员走过的，不只是结果', '从第一次不敢做，到现在能独立完成', '真正的陪跑，是在哪些时刻拉你一把']],
    ['温柔提醒', ['今天想温柔地提醒你一件重要的事', '别急着追结果，先确认方向是不是你的', '你可以慢一点，但别一直停在自我怀疑里']]
  ],
  恶: [
    ['门槛声明', ['我的服务不是谁都收，这 3 类人不适合', '合作开始前，我必须确认的一件事', '如果你只想要速成答案，不建议找我']],
    ['劝退指南', ['出现这 3 种情况，先别急着付费', '什么样的人买了也很难拿到结果', '如果你不愿意做这一步，再好的方法也没用']],
    ['标准展示', ['我筛选客户的 4 个标准', '贵不贵先不谈，先看交付有没有这 3 层', '一个专业服务，应该把哪些事说在前面']],
    ['反向定义', ['真正的高端，不是价格高，而是这件事', '专业不是“什么都能做”，而是知道什么不做', '好服务不会讨好所有人']],
    ['筛选故事', ['今天拒绝了一个客户，因为这条原则', '这次没有成交，反而让我更确定服务谁', '一个不合适的合作，会消耗双方什么']]
  ],
  欲: [
    ['生活方式', ['这是我做{industry}后最喜欢的普通一天', '不赶时间的工作状态，是怎么建立起来的', '我理想中的工作与生活，原来可以同时拥有']],
    ['成长路径', ['从起步到现在，我走过的 3 个阶段', '想要{goal}，这条路径比捷径更稳', '如果重新开始，我会按这个顺序走']],
    ['理想状态', ['真正让我向往的成功，不是一个数字', '当工作开始为生活服务，会是什么感觉', '我希望三年后的自己，依然保留这件事']],
    ['路径展示', ['这个看起来松弛的结果，背后做了哪些准备', '从混乱到稳定，我搭好了哪 3 套系统', '理想状态不是等来的，是这样一步步设计的']],
    ['松弛感展示', ['今天不讲干货，带你看我的工作现场', '不用时刻用力，也能持续向前的方法', '我不再追求忙碌之后，反而做对了更多事']]
  ]
};

const mbtiInsights = {
  ENFJ: ['爱、喜、欲', '陪伴型、结果型、向往型', '感染力强、会讲故事、能带动情绪', '恶（筛选）、惧（痛点）'],
  ENFP: ['喜、欲、爱', '结果型、向往型、陪伴型', '热情、有能量、能制造向往', '恶、惧'],
  ENTJ: ['恶、怒、喜', '筛选型、立场型、结果型', '气场强、有权威感、敢说真话', '爱、哀'],
  ENTP: ['怒、喜、欲', '立场型、结果型、向往型', '观点犀利、逻辑强、能破圈', '爱、哀'],
  ESFJ: ['爱、喜、哀', '陪伴型、结果型、故事型', '亲和、温暖、让人信任', '恶、怒'],
  ESFP: ['喜、欲、爱', '结果型、向往型、陪伴型', '表现力强、有感染力', '恶、惧'],
  ESTJ: ['恶、怒、喜', '筛选型、立场型、结果型', '权威、务实、有结果', '爱、哀'],
  ESTP: ['怒、喜、欲', '立场型、结果型、向往型', '直接、有冲击力、敢做敢说', '爱、哀'],
  INFJ: ['爱、哀、喜', '陪伴型、故事型、结果型', '深度共情、有洞察力', '恶、怒'],
  INFP: ['哀、爱、欲', '故事型、陪伴型、向往型', '真实、有灵魂、能打动人', '恶、怒'],
  INTJ: ['恶、惧、喜', '筛选型、痛点型、结果型', '战略思维、能看透本质', '爱、哀'],
  INTP: ['惧、恶、喜', '痛点型、筛选型、结果型', '逻辑严密、能讲透问题', '爱、哀'],
  ISFJ: ['爱、哀、喜', '陪伴型、故事型、结果型', '温暖、可靠、有耐心', '恶、怒'],
  ISFP: ['哀、爱、欲', '故事型、陪伴型、向往型', '真诚、有审美、能共情', '恶、怒'],
  ISTJ: ['惧、恶、喜', '痛点型、筛选型、结果型', '严谨、可信、有体系', '爱、哀'],
  ISTP: ['惧、怒、恶', '痛点型、立场型、筛选型', '冷静、直接、解决问题', '爱、哀']
};

const industryRecipes = [
  ['喜', '欲、爱', '怒、恶'],
  ['喜', '爱、惧', '怒、恶'],
  ['爱', '哀、喜', '怒、恶、惧'],
  ['惧', '喜、怒', '哀、爱'],
  ['爱', '哀、喜', '怒、恶'],
  ['惧', '恶、怒', '哀、爱'],
  ['惧', '喜、恶', '哀、爱'],
  ['怒', '恶、喜', '哀、爱'],
  ['怒', '恶、喜', '爱、哀']
];

const priceStrategies = [
  ['爱', '哀、惧', '低门槛，靠陪伴、共情和紧迫感成交', '陪伴型、故事型、痛点型'],
  ['喜', '欲、爱', '中门槛，靠结果、向往和陪伴成交', '结果型、向往型、陪伴型'],
  ['恶', '怒、喜', '高门槛，靠筛选、立场和结果成交', '筛选型、立场型、结果型'],
  ['恶', '怒', '高端门槛，靠“不服务谁”和实力成交', '筛选型、立场型'],
  ['恶', '怒、喜', '超高门槛，靠筛选、立场和结果背书成交', '筛选型、立场型、结果型']
];

const audienceStrategies = {
  gender: [
    ['爱、喜', '哀、惧', '先共情，再给希望，最后用紧迫感成交'],
    ['恶、怒', '喜、惧', '先亮态度，再晒结果，最后用筛选建高端'],
    ['喜、恶', '爱、怒', '用结果吸引，用筛选建立标准']
  ],
  age: [
    ['喜、欲', '怒、爱', '给希望、给向往，用结果说话'],
    ['惧、恶', '喜、怒', '制造紧迫感，用筛选建信任'],
    ['爱、哀', '喜、惧', '先共情，再给解法，用案例建信任'],
    ['爱、喜', '哀、惧', '陪伴加结果，用真实案例打动']
  ],
  profession: [
    ['恶、怒', '喜、惧', '亮底线、晒结果，用筛选建高端'],
    ['惧、喜', '爱、恶', '制造紧迫，用结果和陪伴成交'],
    ['喜、欲', '怒、爱', '给希望、给向往，用立场建人设'],
    ['爱、哀', '喜、惧', '先共情，再给希望，用陪伴成交'],
    ['喜、欲', '怒、爱', '给希望、给路径，用结果吸引']
  ],
  income: [
    ['爱、惧', '哀、喜', '用陪伴建立信任，用紧迫感推动决策'],
    ['喜、爱', '欲、惧', '用结果给希望，用陪伴拉距离'],
    ['恶、喜', '怒、惧', '用筛选建高端，用结果做背书'],
    ['恶、怒', '喜', '用“不服务谁”建门槛，用结果做信任']
  ]
};

const barrierStrategies = [
  ['喜', '看到真实案例、结果', '结果型'],
  ['爱', '看到有人陪、有人带', '陪伴型'],
  ['恶、怒', '看到你的底线和原则', '筛选型、立场型'],
  ['惧', '看到“现在就是最好时机”', '痛点型'],
  ['恶', '看到“贵有贵的道理”', '筛选型'],
  ['爱、哀', '看到“很多人都这样走过来了”', '陪伴型、故事型'],
  ['恶', '看到你“不服务谁”的边界', '筛选型'],
  ['怒', '看到你“和别人不一样”', '立场型'],
  ['惧、欲', '看到“现在不报的代价”', '痛点型、向往型']
];

const barrierActions = [
  { emotion: '喜', title: '先证明“真的有效”', shoot: '连续拍 3 条案例内容：结果数字、发生前后、你做了哪一步。', proof: '展示过程截图、时间线与可验证细节，不只放一句好评。', line: '“先别听我说方法多好，看看这位用户前后发生了什么。”' },
  { emotion: '爱', title: '让用户看见“有人陪着做”', shoot: '拍一次真实陪跑过程，展示卡住时你如何提醒、纠偏和复盘。', proof: '把服务节点说清楚：多久反馈、怎么答疑、掉队后怎么拉回。', line: '“你不需要靠意志力硬撑，我们会在这 3 个节点接住你。”' },
  { emotion: '恶＋怒', title: '用标准证明你靠谱', shoot: '拍“我绝不做的 3 件事”和“合作前必须说清的 3 条边界”。', proof: '公开适合谁、不适合谁、交付范围和风险边界。', line: '“我不会承诺百分百结果，但这几件事我会负责到底。”' },
  { emotion: '惧', title: '说清拖延的真实代价', shoot: '用一个案例展示：继续等 3 个月会损失什么，现在开始能先补哪一步。', proof: '用时间、机会或成本做具体对比，不制造空泛焦虑。', line: '“最好的时机未必是今天，但再等下去会先失去这件事。”' },
  { emotion: '恶', title: '把价格翻译成价值', shoot: '拆解一笔费用对应的诊断、方案、陪跑和结果保障，不只说“贵有贵的道理”。', proof: '展示时间成本、试错成本和交付深度的对比清单。', line: '“你买的不是几节课，而是少走这三段弯路。”' },
  { emotion: '爱＋哀', title: '先处理被评判的压力', shoot: '讲一个“身边人不理解，但后来走出来”的真实故事。', proof: '允许用户慢慢决定，并展示普通人而非天选案例。', line: '“你不需要先获得所有人的同意，才有资格改变自己。”' },
  { emotion: '恶', title: '给出清晰选择标准', shoot: '拍一条中立的选择指南：比较服务者时必须看哪 4 项。', proof: '主动教用户判断专业度，即使最后不选你也能避坑。', line: '“别急着选我，先用这 4 个标准筛掉不合适的人。”' },
  { emotion: '怒＋喜', title: '正面回应过去的失望', shoot: '先替用户说出不满，再用案例讲清你的方法与旧方案到底差在哪。', proof: '不贬低同行，具体展示流程、纠偏机制和结果证据。', line: '“你不是不愿相信，而是上一次的交付没有对结果负责。”' },
  { emotion: '惧＋欲', title: '同时展示窗口与未来', shoot: '一半讲错过窗口的代价，一半展示现在行动 30 天后的可见变化。', proof: '给出明确截止条件与第一阶段里程碑，避免虚假稀缺。', line: '“真正会错过的不是名额，而是这 30 天本可以发生的变化。”' },
  { emotion: '喜', title: '用证据回答这个顾虑', shoot: '把这个顾虑单独拍成一期问答：先复述担心，再给证据和下一步。', proof: '选择最接近的案例、流程或数据支撑回答。', line: '“这个担心很合理，我们把它拆开看清楚。”' }
];

const baseQuestions = [
  ['行业与产品', '你的行业赛道是？', [['美业 / 护肤 / 穿搭 / 医美', '喜+2，欲+1，爱+1'], ['大健康 / 养生 / 营养 / 中医', '喜+1，爱+1，惧+1'], ['疗愈 / 心理咨询 / 身心灵', '爱+2，哀+1，喜+1'], ['教育 / 教培 / 学科辅导', '惧+2，喜+1，怒+1'], ['心理学 / 情感咨询 / 婚姻修复', '爱+2，哀+2'], ['律师 / 法律咨询', '惧+1，恶+1，怒+1'], ['保险 / 理财 / 财富管理', '惧+2，喜+1，恶+1'], ['工厂老板 / 实体老板 / 传统企业主', '怒+1，恶+1，喜+1'], ['IP知识付费教学 / 操盘手 / 自媒体教练', '怒+2，恶+1，喜+1'], ['其他行业', '根据产品判断']], 'multi', 2],
  ['行业与产品', '你的核心产品主要帮用户解决什么？', [['帮人赚钱 / 提升收入', '怒+2，恶+1，喜+1'], ['帮人变美 / 变好 / 变健康', '喜+2，欲+1，爱+1'], ['帮人安心 / 缓解焦虑 / 疗愈', '爱+2，哀+1'], ['帮人省时间 / 避坑 / 少走弯路', '惧+1，怒+1，恶+1']], 'multi', 2],
  ['行业与产品', '你的客单价属于？', [['1–5000 元', '爱+2，哀+1，惧+1'], ['5000–1 万', '喜+1，欲+1，爱+1'], ['1 万–5 万', '恶+2，怒+1，喜+1'], ['5 万–10 万', '恶+2，怒+2'], ['10 万以上', '恶+2，怒+2，喜+1']], 'multi', 2],
  ['行业与产品', '你的交付方式是？', [['一对一深度服务（陪跑 / 私教 / 咨询）', '恶+1，爱+1，喜+1'], ['一对多课程 / 训练营', '惧+1，喜+1，怒+1'], ['社群 / 会员制陪伴', '爱+2，哀+1'], ['内容 / 工具 / 模板类产品', '喜+1，欲+1，惧+1']], 'multi', 2],
  ['用户心理', '你的用户最怕失去什么？', [['怕失去钱 / 机会', '惧+2'], ['怕被人评判 / 不被接纳', '爱+1，哀+2'], ['怕走弯路 / 被割韭菜', '怒+2，恶+1'], ['怕平庸 / 没结果', '喜+1，欲+2']], 'multi', 2],
  ['用户心理', '你的用户最想得到什么？', [['想赚钱 / 想成功', '怒+1，喜+2，欲+1'], ['想变美 / 变自信', '喜+2，欲+2'], ['想安心 / 想被理解', '爱+2，哀+1'], ['想少走弯路 / 想有人带', '惧+1，恶+1，喜+1']], 'multi', 2],
  ['用户心理', '你的用户决定付费时，最大的障碍是什么？', [['怕花钱没效果', '惧+2'], ['怕自己坚持不下来', '惧+1，哀+1'], ['怕遇到不靠谱的人', '怒+2，恶+1'], ['怕现在不是最好时机', '惧+1，欲+1'], ['觉得价格太高', '恶+1，喜+1'], ['怕身边人笑话', '爱+2，哀+1'], ['不知道该选谁', '恶+2，怒+1'], ['之前买过类似的没效果', '怒+2，哀+1'], ['怕错过机会', '欲+2，惧+1'], ['其他障碍', '根据情况判断']], 'multi', 3],
  ['个人特质', '你平时的说话风格是？', [['语速快、犀利、一针见血', '怒+2，恶+1'], ['语速慢、温柔、娓娓道来', '爱+2，哀+1'], ['轻快、幽默、有感染力', '喜+2，欲+1'], ['沉稳、权威、逻辑严密', '惧+1，恶+1，喜+1']], 'multi', 2],
  ['个人特质', '你生气的时候通常会？', [['直接表达，不怕冲突', '怒+2，恶+1'], ['忍着不说，自己消化', '哀+2，爱+1'], ['用幽默化解', '喜+1，欲+1'], ['冷静分析，讲道理', '惧+1，恶+1']], 'single', 1],
  ['个人特质', '你讲自己经历时，更偏向？', [['平静叙述，像讲故事', '哀+2，爱+1'], ['有情绪起伏，像演讲', '怒+1，喜+1，欲+1'], ['轻描淡写，不渲染', '恶+1，喜+1'], ['逻辑清晰，像上课', '惧+1，恶+1']], 'multi', 2],
  ['个人特质', '你的长相 / 气质更接近？', [['气场强、干练、有距离感', '恶+2，怒+1'], ['亲和、温暖、邻家感', '爱+2，哀+1'], ['阳光、活力、有能量', '喜+2，欲+1'], ['知性、专业、可信赖', '惧+1，喜+1']], 'multi', 2],
  ['个人特质', '你面对镜头时，最自然的状态是？', [['直接开怼，敢说真话', '怒+2，恶+1'], ['温柔分享，像跟朋友聊天', '爱+2，哀+1'], ['自信展示，晒结果', '喜+2，欲+1'], ['严肃分析，给干货', '惧+1，恶+1']], 'multi', 2],
  ['个人特质', '你更喜欢哪种表达方式？', [['讲观点、亮态度', '怒+2，恶+1'], ['讲故事、讲经历', '哀+2，爱+1'], ['讲结果、讲案例', '喜+2，欲+1'], ['讲方法、讲逻辑', '惧+1，恶+1']], 'multi', 2],
  ['八字五行 · 可选', '你的日主五行是？', [['火（丙、丁）', '怒+2，喜+1'], ['土（戊、己）', '恶+1，喜+1'], ['木（甲、乙）', '怒+1，欲+1'], ['水（壬、癸）', '哀+1，爱+1'], ['金（庚、辛）', '惧+1，恶+1']], 'single', 1],
  ['八字五行 · 可选', '你的八字身强还是身弱？', [['身强', '怒+1，喜+1，恶+1'], ['身弱', '哀+1，爱+1，惧+1']], 'single', 1]
];

const mbtiQuestions = [
  ['MBTI 快速测评', '周末你更倾向于？', [['出门见人、参加活动，跟人聊天能恢复能量', 'E+1'], ['一个人待着、看书、追剧，独处才能恢复能量', 'I+1']], 'single', 1],
  ['MBTI 快速测评', '你接收信息时，更相信？', [['亲眼看到的事实、具体的数据、真实的案例', 'S+1'], ['直觉、灵感、“我感觉这件事能成”', 'N+1']], 'single', 1],
  ['MBTI 快速测评', '你做决策时，更依赖？', [['逻辑分析、利弊权衡、数据支撑', 'T+1'], ['感受、共情、“这件事让我舒不舒服”', 'F+1']], 'single', 1],
  ['MBTI 快速测评', '你做事的方式更偏向？', [['提前计划、按部就班、有明确的截止时间', 'J+1'], ['随机应变、走一步看一步、享受过程', 'P+1']], 'single', 1],
  ['MBTI 快速测评', '你在社交场合通常是？', [['主动开口、带动气氛、认识新朋友', 'E+1'], ['等别人来找我、观察为主、只跟熟人说话', 'I+1']], 'single', 1],
  ['MBTI 快速测评', '你更喜欢的表达方式是？', [['讲具体的事、讲细节、讲“我做了什么”', 'S+1'], ['讲趋势、讲可能性、讲“这件事意味着什么”', 'N+1']], 'single', 1],
  ['MBTI 快速测评', '别人找你倾诉时，你第一反应是？', [['帮他分析问题、给出解决方案', 'T+1'], ['先接住他的情绪、让他觉得被理解', 'F+1']], 'single', 1],
  ['MBTI 快速测评', '你面对截止日期的态度是？', [['提前完成、留足余地、不喜欢最后一刻赶工', 'J+1'], ['最后时刻灵感爆发，deadline是第一生产力', 'P+1']], 'single', 1]
];
const profileQuestions = [
  ['用户画像', '你的用户性别主要是？', [['女性为主', '爱+2，哀+1，喜+1'], ['男性为主', '恶+2，怒+1，惧+1'], ['男女比例均衡', '喜+1，恶+1，爱+1']], 'multi', 2],
  ['用户画像', '你的用户年龄主要是？', [['20–30岁', '喜+2，欲+1，怒+1'], ['30–40岁', '惧+1，喜+1，恶+1'], ['40–50岁', '爱+1，哀+1，惧+1'], ['50岁以上', '爱+2，哀+1，喜+1']], 'multi', 2],
  ['用户画像', '你的用户职业主要是？', [['创业者 / 老板 / 企业主', '恶+2，怒+1，喜+1'], ['职场白领 / 上班族', '惧+1，喜+1，爱+1'], ['自由职业者 / 个体户', '喜+1，欲+1，怒+1'], ['宝妈 / 家庭主妇', '爱+2，哀+1，惧+1'], ['学生 / 刚毕业', '喜+2，欲+1，怒+1']], 'multi', 2],
  ['用户画像', '你的用户收入水平主要是？', [['月入5000以下', '爱+2，哀+1，惧+1'], ['月入5000–2万', '喜+1，欲+1，爱+1'], ['月入2万–10万', '恶+1，怒+1，喜+1'], ['月入10万以上', '恶+2，怒+2']], 'multi', 2]
];
const scenarioQuestions = [
  ['情景反应', '线下课定价9800，学员说“太贵了”，你会怎么回？', [['展示价值和学员案例', '喜+2，恶+1'], ['强调课程门槛和筛选标准', '恶+2，怒+1'], ['理解顾虑，分享自己的犹豫经历', '爱+2，哀+1'], ['强调现在不投资的机会成本', '惧+2']], 'single', 1],
  ['情景反应', '发现另一个IP明显借鉴你的课程大纲和文案，你会怎么做？', [['公开表达立场', '怒+2，恶+1'], ['继续做自己的事，用结果说话', '恶+1，喜+1'], ['内心难受但不想撕破脸', '哀+2，爱+1'], ['告诉团队和核心学员真相', '恶+1，怒+1']], 'single', 1],
  ['情景反应', '付费学员公开说“你的方法根本没用”，你会怎么处理？', [['先私聊，问清情况并解决', '爱+2'], ['公开回应，把逻辑讲清楚', '惧+1，恶+1'], ['拿出其他学员成功案例', '喜+2'], ['强调不行动什么方法都没用', '怒+2']], 'single', 1],
  ['情景反应', '团队发错直播时间导致学员错过，你的第一反应是？', [['先道歉并沟通补偿', '爱+1，哀+1'], ['内部追责，对外承担责任', '怒+2，恶+1'], ['公开道歉，坦诚管理问题', '哀+2，爱+1'], ['把它变成创业踩坑内容', '喜+2，欲+1']], 'single', 1],
  ['情景反应', '认识多年的朋友请你免费打广告，你会怎么回应？', [['时间有价，可以帮但不免费', '恶+2，怒+1'], ['这次免费，下次收费', '爱+1，恶+1'], ['直接拒绝免费推广', '恶+2'], ['为难但最后还是帮了', '爱+2']], 'single', 1],
  ['情景反应', '看到圈里有人用明显有问题的模式割韭菜，你会怎么做？', [['发视频公开批评', '怒+2'], ['在社群里提醒学员', '恶+1，爱+1'], ['专注做自己的事', '恶+1，喜+1'], ['心疼受害者但不知道该不该管', '哀+2，爱+1']], 'single', 1]
];
const questions = [...mbtiQuestions, ...baseQuestions.slice(0, 4), ...profileQuestions, ...baseQuestions.slice(4, 7), ...scenarioQuestions, ...baseQuestions.slice(7)];

let current = 0;
let answers = Array.from({ length: questions.length }, () => []);
let mbtiType = '未完成';
const resultStorageKey = 'founder-ip-emotion-test-result-v1';
const progressStorageKey = 'founder-ip-emotion-test-progress-v1';
let pendingProgress = null;
const scores = () => Object.fromEntries(Object.keys(emotions).map(key => [key, 0]));
const $ = id => document.getElementById(id);
const scoreFromText = text => { const result = {}; [...text.matchAll(/([怒喜哀惧爱恶欲])\+(\d)/g)].forEach(match => { result[match[1]] = Number(match[2]); }); return result; };

function show(id) { ['introView', 'quizView', 'resultView'].forEach(view => $(view).classList.toggle('hidden', view !== id)); }
function showToast(message) { const toast = $('toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('visible'), 2400); }
function makeShareUrl(includeAnswers = false) { const url = new URL(window.location.href); url.hash = ''; if (includeAnswers) { url.search = ''; url.searchParams.set('answers', answers.map(selection => selection.length ? selection.reduce((mask, index) => mask | (1 << index), 0) : 'x').join('.')); } return url.toString(); }
async function shareUrl(url, message) { try { if (navigator.share) { await navigator.share({ title: '创始人 IP 情绪风格测评', text: message, url }); } else { await navigator.clipboard.writeText(url); showToast('分享链接已复制，发给学员即可'); } } catch (error) { if (error.name !== 'AbortError') { try { await navigator.clipboard.writeText(url); showToast('分享链接已复制'); } catch (clipboardError) { showToast('请复制浏览器地址栏链接分享'); } } } }
function openShareModal() { const url = makeShareUrl(); $('shareUrlInput').value = url; $('shareQrImage').src = `https://quickchart.io/qr?size=260&margin=2&text=${encodeURIComponent(url)}`; $('shareModal').classList.remove('hidden'); document.body.classList.add('modal-open'); }
function closeShareModal() { $('shareModal').classList.add('hidden'); document.body.classList.remove('modal-open'); }
async function copyShareUrl() { const url = $('shareUrlInput').value; try { await navigator.clipboard.writeText(url); } catch (error) { $('shareUrlInput').select(); document.execCommand('copy'); } showToast('测评网址已复制'); }
function downloadQr() { const link = document.createElement('a'); link.download = '创始人IP情绪风格测评二维码.png'; link.href = $('shareQrImage').src; link.target = '_blank'; link.click(); }
function loadSharedResult() { const encoded = new URLSearchParams(window.location.search).get('answers'); if (!encoded || !/^[0-9x]+(?:\.[0-9x]+)*$/.test(encoded)) return false; const tokens = encoded.includes('.') ? encoded.split('.') : [...encoded]; if (tokens.length !== questions.length) return false; if (tokens.some((token, index) => token !== 'x' && Number(token) > (1 << questions[index][2].length) - 1)) return false; answers = tokens.map((token, index) => { if (token === 'x') return []; const mask = Number(token); return Array.from({ length: questions[index][2].length }, (_, optionIndex) => optionIndex).filter(optionIndex => mask & (1 << optionIndex)); }); renderResults(false); show('resultView'); $('headerStatus').textContent = '已打开分享结果'; return true; }

function isValidSavedAnswers(savedAnswers) {
  return Array.isArray(savedAnswers) && savedAnswers.length === questions.length && savedAnswers.every((selection, questionIndex) => {
    if (!Array.isArray(selection) || selection.length > questions[questionIndex][4]) return false;
    if (questionIndex < questions.length - 2 && selection.length === 0) return false;
    return new Set(selection).size === selection.length && selection.every(optionIndex => Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < questions[questionIndex][2].length);
  });
}

function saveResultArchive() {
  try {
    window.localStorage.setItem(resultStorageKey, JSON.stringify({ version: 1, savedAt: Date.now(), answers }));
    return true;
  } catch (error) {
    console.warn('本地存档失败', error);
    return false;
  }
}

function loadSavedResult() {
  try {
    const raw = window.localStorage.getItem(resultStorageKey);
    if (!raw) return false;
    const archive = JSON.parse(raw);
    if (!archive || archive.version !== 1 || !isValidSavedAnswers(archive.answers)) return false;
    answers = archive.answers.map(selection => [...selection]);
    renderResults(false);
    show('resultView');
    $('headerStatus').textContent = '已恢复上次测评结果';
    return true;
  } catch (error) {
    console.warn('读取本地存档失败', error);
    return false;
  }
}

function isValidProgressAnswers(progressAnswers) {
  return Array.isArray(progressAnswers) && progressAnswers.length === questions.length && progressAnswers.every((selection, questionIndex) => {
    if (!Array.isArray(selection) || selection.length > questions[questionIndex][4]) return false;
    return new Set(selection).size === selection.length && selection.every(optionIndex => Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < questions[questionIndex][2].length);
  });
}

function saveQuizProgress() {
  try {
    window.localStorage.setItem(progressStorageKey, JSON.stringify({ version: 1, savedAt: Date.now(), current, answers }));
  } catch (error) {
    console.warn('答题进度保存失败', error);
  }
}

function clearQuizProgress() {
  try { window.localStorage.removeItem(progressStorageKey); } catch (error) { console.warn('答题进度清理失败', error); }
  pendingProgress = null;
  $('continueButton').classList.add('hidden');
  $('startButton').innerHTML = '开始测评 <span>→</span>';
  $('progressArchiveNote').textContent = '33 题 · 约 10 分钟 · 含 2 题可选';
}

function offerQuizProgress() {
  try {
    const raw = window.localStorage.getItem(progressStorageKey);
    if (!raw) return false;
    const progress = JSON.parse(raw);
    if (!progress || progress.version !== 1 || !Number.isInteger(progress.current) || progress.current < 0 || progress.current >= questions.length || !isValidProgressAnswers(progress.answers)) return false;
    pendingProgress = progress;
    const completed = progress.answers.filter(selection => selection.length).length;
    $('continueButton').classList.remove('hidden');
    $('startButton').innerHTML = '重新开始 <span>↻</span>';
    $('progressArchiveNote').textContent = `已保存 ${completed} 题 · 可继续上次进度`;
    return true;
  } catch (error) {
    console.warn('读取答题进度失败', error);
    return false;
  }
}

function resumeQuizProgress() {
  if (!pendingProgress) return;
  current = pendingProgress.current;
  answers = pendingProgress.answers.map(selection => [...selection]);
  show('quizView');
  renderQuestion();
  $('headerStatus').textContent = `已恢复至第 ${current + 1} 题`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderQuestion() {
  const [section, title, options, mode, maxSelection] = questions[current];
  const optional = current >= questions.length - 2;
  const sectionLabel = current < 8 ? '第一部分 · MBTI 快速测评' : current < 12 ? '第二部分 · 行业与产品' : current < 16 ? '第三部分 · 用户画像' : current < 19 ? '第四部分 · 用户心理' : current < 25 ? '第五部分 · 情景反应' : current < 31 ? '第六部分 · 个人特质' : '第七部分 · 八字五行（可选）';
  $('sectionLabel').textContent = sectionLabel;
  $('questionTitle').textContent = title; $('currentNumber').textContent = String(current + 1).padStart(2, '0'); $('progressBar').style.width = `${((current + 1) / questions.length) * 100}%`; $('skipHint').textContent = mode === 'single' ? '单选题 · 请选择最符合的一项' : `多选题 · 最多选择 ${maxSelection} 项`;
  const modeLabel = mode === 'single' ? '单选题' : maxSelection === 2 ? '双选题 · 最多 2 项' : '多选题 · 最多 ' + maxSelection + ' 项';
  $('questionMode').textContent = optional ? '可选 · ' + modeLabel : modeLabel;
  if (optional) $('skipHint').textContent = '可选题 · 不填写也可以继续';
  $('options').innerHTML = options.map((option, index) => `<div class="option ${answers[current].includes(index) ? 'selected' : ''}" data-index="${index}"><span class="option-letter">${answers[current].includes(index) ? '✓' : String.fromCharCode(65 + index)}</span><div class="option-copy"><strong>${option[0]}</strong></div></div>`).join('');
  document.querySelectorAll('.option').forEach(option => option.addEventListener('click', () => { const index = Number(option.dataset.index); const selected = answers[current]; if (selected.includes(index)) answers[current] = selected.filter(item => item !== index); else if (mode === 'single') answers[current] = [index]; else if (selected.length < maxSelection) answers[current] = [...selected, index]; else { showToast(`本题最多选择 ${maxSelection} 项`); return; } saveQuizProgress(); renderQuestion(); }));
  $('prevButton').disabled = current === 0; $('nextButton').disabled = !optional && answers[current].length === 0; $('nextButton').innerHTML = current === questions.length - 1 ? '查看结果 <span>↗</span>' : optional ? '下一题（可跳过） <span>→</span>' : '下一题 <span>→</span>';
}
function calculate() { const total = scores(); const mbti = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }; answers.forEach((selection, questionIndex) => selection.forEach(answer => { const scoreText = questions[questionIndex][2][answer][1]; Object.entries(scoreFromText(scoreText)).forEach(([emotion, value]) => { total[emotion] += value; }); [...scoreText.matchAll(/([ESNTFJIP])\+1/g)].forEach(match => { if (mbti[match[1]] !== undefined) mbti[match[1]] += 1; }); })); mbtiType = `${mbti.E >= mbti.I ? 'E' : 'I'}${mbti.S >= mbti.N ? 'S' : 'N'}${mbti.T >= mbti.F ? 'T' : 'F'}${mbti.J >= mbti.P ? 'J' : 'P'}`; return Object.entries(total).sort((a, b) => b[1] - a[1]); }
function fillTemplate(text, context) {
  return text.replaceAll('{industry}', context.industry).replaceAll('{goal}', context.goal);
}

function mbtiDeliveryAdvice(type) {
  const tips = [];
  tips.push(type.startsWith('E') ? '用正面口播或一镜到底开场，你在互动中更容易出状态。' : '先写 3 句提纲并允许分段录制，安静的中近景更能保留你的质感。');
  tips.push(type[1] === 'S' ? '多给数字、步骤和真实细节，少说空泛概念。' : '先讲趋势和意义，再用一个案例把观点落地。');
  tips.push(type[2] === 'T' ? '用“结论—原因—方法”的逻辑表达，说服力最强。' : '先说用户感受，再给方法，用户会更愿意听下去。');
  tips.push(type[3] === 'J' ? '适合提前批量写选题、固定机位，按系列连续拍。' : '保留半即兴空间，只固定开头、三点结构和结尾。');
  return tips;
}

function renderDetailList(items) {
  return items.map(item => `<div class="detail-row"><span>${item[0]}</span><strong>${item[1]}</strong></div>`).join('');
}

function getSignalStrength(ranked) {
  const firstScore = ranked[0][1];
  const secondScore = ranked[1][1];
  const gap = firstScore - secondScore;
  const relativeGap = firstScore ? gap / firstScore : 0;
  if (gap === 0) return { label: '复合型信号', value: 38, copy: `前两种情绪同分，你不是单一类型，适合让「${ranked[0][0]}」与「${ranked[1][0]}」共同成为表达主线。` };
  if (relativeGap < 0.08) return { label: '丰富型信号', value: 52, copy: `主情绪仅领先 ${gap} 分，你的表达弹性较强，前两种情绪都可以自然使用。` };
  if (relativeGap < 0.18) return { label: '清晰型信号', value: 72, copy: `主情绪领先 ${gap} 分，已经形成较清晰的表达倾向，同时保留辅助风格。` };
  return { label: '高辨识度信号', value: 92, copy: `主情绪领先 ${gap} 分，你的表达特征集中，适合持续强化这一记忆点。` };
}

function renderEmotionPositioning(ranked) {
  const topThree = ranked.slice(0, 3);
  const ratios = ['60%', '25%', '15%'];
  const roles = ['主情绪人格', '第一辅助人格', '第二辅助人格'];
  $('emotionPersonaGrid').innerHTML = topThree.map(([emotion], index) => {
    const guide = emotionGuides[emotion];
    const identity = emotionIdentities[emotion];
    return `<article class="persona-card ${index === 0 ? 'persona-primary' : ''}">
      <div class="persona-top"><span class="persona-symbol">${emotion}</span><div><small>${roles[index]} · ${ratios[index]}</small><h4>${emotions[emotion].type}人格 · ${identity.name}</h4></div></div>
      <p class="persona-signature">${identity.signature}</p>
      <div class="persona-method"><span>你要怎么说</span><strong>${guide.audio[0][1]}；${guide.audio[1][1]}</strong></div>
      <div class="persona-method"><span>你最适合用</span><strong>${emotions[emotion].advice}</strong></div>
      <div class="persona-method"><span>表达结构</span><strong>${guide.format}</strong></div>
    </article>`;
  }).join('');

  $('avoidGuide').innerHTML = ranked.slice(-2).map(([emotion]) => `
    <article class="avoid-card">
      <span>${emotion}</span>
      <div><small>${emotions[emotion].type}表达</small><strong>${emotionIdentities[emotion].avoid}</strong></div>
    </article>`).join('');
}

function renderDeepEmotionGuides() {
  $('deepEmotionGrid').innerHTML = Object.keys(emotions).map(emotion => {
    const guide = emotionGuides[emotion];
    const identity = emotionIdentities[emotion];
    return `<article class="deep-emotion-card">
      <div class="deep-emotion-top"><span>${emotion}</span><div><small>${emotions[emotion].type}情绪</small><h4>${identity.name}</h4></div></div>
      <p class="deep-essence">${guide.essence}</p>
      <div class="deep-insight"><span>用户为什么被触动</span><strong>${identity.trigger}</strong></div>
      <div class="deep-insight"><span>表达的最高层次</span><strong>${identity.peak}</strong></div>
      <div class="deep-shooting">
        <p><span>怎么说</span>${guide.audio[1][1]}</p>
        <p><span>怎么拍</span>${guide.visual[2][1]}；${guide.visual[4][1]}</p>
        <p><span>内容结构</span>${guide.format}</p>
      </div>
    </article>`;
  }).join('');
}

function renderActionReport(primary, support) {
  const guide = emotionGuides[primary];
  const playbook = contentPlaybooks[primary];
  const industryAnswer = answers[8][0] === undefined ? '你的行业' : questions[8][2][answers[8][0]][0];
  const goalAnswer = answers[9][0] === undefined ? '获得更好的结果' : questions[9][2][answers[9][0]][0];
  const context = {
    industry: industryAnswer.split('/')[0].trim(),
    goal: goalAnswer.replace(/^帮人/, '').replaceAll(' / ', '、')
  };
  const mbtiTips = mbtiDeliveryAdvice(mbtiType);
  const firstTopic = fillTemplate(playbook[0][1][0], context);
  $('posterTopic').textContent = firstTopic;

  $('firstVideoPlan').innerHTML = `
    <article class="first-video-main">
      <div class="first-video-title"><span>建议首拍</span><h4>${firstTopic}</h4></div>
      <blockquote>${fillTemplate(guide.opening, context)}</blockquote>
      <div class="shot-steps">
        <div><b>01</b><span>镜头</span><strong>${guide.shot}</strong></div>
        <div><b>02</b><span>口播</span><strong>${guide.format}</strong></div>
        <div><b>03</b><span>收尾</span><strong>${fillTemplate(guide.closing, context)}</strong></div>
      </div>
    </article>
    <aside class="mbti-camera-card">
      <span class="panel-label">MBTI · ${mbtiType}</span>
      <h4>更适合你的录制方式</h4>
      <ul>${mbtiTips.map(tip => `<li>${tip}</li>`).join('')}</ul>
    </aside>`;

  $('topicDirectionGrid').innerHTML = playbook.map((direction, index) => `
    <article class="topic-direction-card">
      <div class="topic-card-heading"><span>${String(index + 1).padStart(2, '0')}</span><h4>${direction[0]}</h4></div>
      <ul>${direction[1].map(sample => `<li>${fillTemplate(sample, context)}</li>`).join('')}</ul>
    </article>`).join('');

  $('visualGuide').innerHTML = renderDetailList(guide.visual);
  $('audioGuide').innerHTML = renderDetailList([...guide.audio, ['结构', guide.format]]);

  $('supportGuide').innerHTML = support.map((emotion, index) => {
    const item = emotionGuides[emotion];
    const ratio = index === 0 ? '25%' : '15%';
    return `<article class="support-card">
      <div class="support-symbol"><span>${emotion}</span><small>${ratio}</small></div>
      <div><span class="panel-label">辅助情绪 ${index + 1} · ${emotions[emotion].type}</span><h4>${emotions[emotion].purpose}</h4><p><b>什么时候用：</b>${item.useWhen}</p><p><b>怎么拍：</b>${item.format}</p></div>
    </article>`;
  }).join('');

  $('authenticityGuide').innerHTML = `
    <div class="authenticity-quote"><span>${primary}</span><p>${guide.authentic}</p></div>
    <div class="memory-prompts"><span class="panel-label">开拍前先写下这 3 个答案</span><ol>${guide.prompt.map(item => `<li>${item}</li>`).join('')}</ol></div>
    <p class="reality-rule"><strong>拍摄提醒</strong> 不用把情绪“演大”。先回到一个具体的人、一句原话和一个真实细节，情绪自然会出来。</p>`;

  const selectedBarriers = answers[18].length ? answers[18] : [9];
  $('barrierGuide').innerHTML = selectedBarriers.map(index => {
    const item = barrierActions[index] || barrierActions[9];
    const barrier = questions[18][2][index] ? questions[18][2][index][0] : '用户仍有顾虑';
    return `<article class="barrier-card">
      <div class="barrier-heading"><span>用户担心</span><strong>${barrier}</strong><b>${item.emotion}</b></div>
      <h4>${item.title}</h4>
      <p><span>拍什么</span>${item.shoot}</p>
      <p><span>拿什么证明</span>${item.proof}</p>
      <blockquote>${item.line}</blockquote>
    </article>`;
  }).join('');
}

function renderResults(shouldSave = true) {
  const ranked = calculate();
  const primary = ranked[0][0];
  const support = ranked.slice(1, 3).map(item => item[0]);
  const strength = getSignalStrength(ranked);
  renderEmotionPositioning(ranked);
  renderActionReport(primary, support);
  renderDeepEmotionGuides();
  $('dominantEmotion').textContent = primary;
  $('dominantType').textContent = `${emotions[primary].type}人格`;
  $('dominantSummary').textContent = `适合在${emotionGuides[primary].visual[2][1]}拍摄，用${emotionGuides[primary].audio[1][1]}的口播方式，按照“${emotionGuides[primary].format}”展开内容。`;
  $('mbtiResult').textContent = `MBTI · ${mbtiType}`;
  $('emotionFormula').textContent = `${primary} 60% ＋ ${support[0]} 25% ＋ ${support[1]} 15%`;
  $('signalStrength').textContent = strength.label;
  $('signalStrengthCopy').textContent = strength.copy;
  $('signalStrengthFill').style.width = `${strength.value}%`;
  $('signalStrengthFill').parentElement.setAttribute('aria-valuenow', String(strength.value));
  $('posterPrimaryEmotion').textContent = primary;
  $('posterPersonality').textContent = `${emotions[primary].type}人格`;
  $('posterIdentity').textContent = emotionIdentities[primary].signature;
  $('posterMbti').textContent = `MBTI · ${mbtiType}`;
  $('posterConfidence').textContent = `表达信号 · ${strength.label}`;
  $('posterFormula').innerHTML = [[primary, '主情绪 60%'], [support[0], '辅助 25%'], [support[1], '辅助 15%']].map(item => `<div><span>${item[0]}</span><strong>${emotions[item[0]].type}</strong><small>${item[1]}</small></div>`).join('');
  $('posterVoice').textContent = `${emotionGuides[primary].audio[0][1]}；${emotionGuides[primary].audio[1][1]}`;
  $('posterScene').textContent = `${emotionGuides[primary].visual[2][1]}；${emotionGuides[primary].visual[4][1]}`;
  $('posterStructure').textContent = emotionGuides[primary].format;
  if (shouldSave) clearQuizProgress();
  $('headerStatus').textContent = shouldSave && saveResultArchive() ? '结果已自动存档' : '拍摄方案已生成';
}
function answerText(index) { const selection = answers[index]; return selection.length ? selection.map(answer => questions[index][2][answer][0]).join('、') : '未填写'; }
function ensureResultLayout() { const description = document.querySelector('.intro-description'); const note = document.querySelector('.micro-note'); if (description) description.textContent = '用情绪表达做爆款，用信任表达做成交。10 分钟找到属于你的情绪配方、内容比例和可直接执行的视频方向。'; if (note) note.textContent = '15 题 · 约 10 分钟 · 单选与多选'; const homeShare = $('shareTestButton'); const resultShare = $('shareResultButton'); const shareModal = $('shareModal'); if (homeShare) homeShare.remove(); if (resultShare) resultShare.remove(); if (shareModal) shareModal.remove(); const saveButton = $('saveImageButton'); const resultActions = document.querySelector('.result-actions'); if (saveButton && resultActions && !resultActions.contains(saveButton)) resultActions.prepend(saveButton); if (!$('dominantResult') && $('resultCard')) $('resultCard').insertAdjacentHTML('beforebegin', '<div id="dominantResult" class="dominant-result"><div class="dominant-orb"><span id="dominantEmotion">怒</span><small>主情绪</small></div><div class="dominant-copy"><p class="eyebrow">YOUR DOMINANT SIGNAL</p><h3><strong id="dominantType">立场型</strong>人格</h3><p id="dominantSummary">你最适合用清晰的立场和边界，让用户迅速记住你。</p><div class="dominant-meta"><span id="dominantScore">得分 0</span><span id="dominantFrequency">每周 1–2 条</span></div></div><div class="dominant-badge">TOP<br><strong>01</strong></div></div>'); }
function saveCanvasAsPng(canvas, filename = '创始人IP情绪风格完整结果报告.png') {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        resolve(false);
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = objectUrl;
      document.body.append(link);
      link.click();
      window.setTimeout(() => link.remove(), 1000);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      resolve(true);
    }, 'image/png');
  });
}

async function downloadSummaryPoster() {
  const poster = $('summaryPoster');
  const button = $('saveImageButton');
  if (!poster || !button) return;
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = '正在生成精华卡…';
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    let canvas;
    if (typeof window.html2canvas === 'function') {
      canvas = await window.html2canvas(poster, { backgroundColor: '#f5f1fa', scale: 1, width: 1080, height: 1440, useCORS: true, allowTaint: false, logging: false, onclone: clonedDocument => { const clonedPoster = clonedDocument.getElementById('summaryPoster'); if (clonedPoster) { clonedPoster.style.position = 'relative'; clonedPoster.style.left = '0'; clonedPoster.style.top = '0'; clonedPoster.style.zIndex = '0'; } } });
    } else {
      canvas = await renderResultWithSvg(poster, 1080, 1440, 1);
    }
    if (!await saveCanvasAsPng(canvas, '高质感IP情绪人格精华卡.png')) throw new Error('图片写入失败');
    showToast('精华结果卡已保存');
  } catch (error) {
    console.error('精华结果卡生成失败', error);
    showToast('精华卡生成失败，请检查浏览器下载权限');
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

function renderResultWithSvg(result, width, height, scale) {
  return new Promise((resolve, reject) => {
    const styles = [...document.styleSheets].map(sheet => {
      try {
        return [...sheet.cssRules].map(rule => rule.cssText).join('\n');
      } catch (error) {
        return '';
      }
    }).join('\n');
    const clone = result.cloneNode(true);
    clone.classList.remove('hidden');
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.maxWidth = 'none';
    clone.style.margin = '0';
    clone.style.animation = 'none';
    clone.style.position = 'relative';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.zIndex = '0';
    clone.querySelectorAll('img[src]').forEach(image => {
      image.setAttribute('src', new URL(image.getAttribute('src'), document.baseURI).href);
    });

    const bodyStyle = getComputedStyle(document.body);
    const exportRoot = document.createElement('div');
    exportRoot.style.cssText = `width:${width}px;height:${height}px;overflow:hidden;color:${bodyStyle.color};font-family:${bodyStyle.fontFamily};background:${bodyStyle.background};`;
    exportRoot.append(clone);
    const serialized = new XMLSerializer().serializeToString(exportRoot);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%"><xhtml:div xmlns:xhtml="http://www.w3.org/1999/xhtml"><xhtml:style>${styles}</xhtml:style>${serialized}</xhtml:div></foreignObject></svg>`;
    const image = new Image();
    const objectUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    let usingDataUrl = false;
    const cleanup = () => URL.revokeObjectURL(objectUrl);
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.floor(width * scale));
      canvas.height = Math.max(1, Math.floor(height * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = bodyStyle.backgroundColor || '#f5f1fa';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      cleanup();
      resolve(canvas);
    };
    image.onerror = () => {
      if (!usingDataUrl) {
        usingDataUrl = true;
        image.src = dataUrl;
        return;
      }
      cleanup();
      reject(new Error('SVG foreignObject 导出失败'));
    };
    image.src = objectUrl;
  });
}

async function downloadResult() {
  const result = $('resultView');
  if (!result) return;

  const bounds = result.getBoundingClientRect();
  const width = Math.ceil(result.scrollWidth || bounds.width);
  const height = Math.ceil(Math.max(result.scrollHeight, bounds.height));
  if (!width || !height) return;
  const scale = Math.min(2, 8192 / width, 8192 / height);

  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    if (typeof window.html2canvas === 'function') {
      const canvas = await window.html2canvas(result, {
        backgroundColor: '#f5f1fa',
        scale,
        width,
        height,
        useCORS: true,
        allowTaint: false,
        logging: false,
        onclone: clonedDocument => {
          const clonedResult = clonedDocument.getElementById('resultView');
          if (clonedResult) {
            clonedResult.classList.remove('hidden');
            clonedResult.style.height = 'auto';
            clonedResult.style.animation = 'none';
          }
        }
      });
      if (await saveCanvasAsPng(canvas)) return;
    }
  } catch (error) {
    console.warn('html2canvas 导出失败，尝试 SVG 兜底', error);
  }

  try {
    const canvas = await renderResultWithSvg(result, width, height, scale);
    if (await saveCanvasAsPng(canvas)) return;
  } catch (error) {
    console.error('结果图片导出失败', error);
  }
  showToast('图片生成失败，请检查浏览器下载权限后重试');
}

ensureResultLayout();
$('startButton').addEventListener('click', () => {
  clearQuizProgress();
  current = 0;
  answers = Array.from({ length: questions.length }, () => []);
  show('quizView');
  $('headerStatus').textContent = '正在测评';
  renderQuestion();
});
$('continueButton').addEventListener('click', resumeQuizProgress);
$('prevButton').addEventListener('click', () => {
  if (current > 0) {
    current--;
    saveQuizProgress();
    renderQuestion();
  }
});
$('nextButton').addEventListener('click', () => {
  if (current < questions.length - 1) {
    current++;
    saveQuizProgress();
    renderQuestion();
  } else {
    renderResults();
    show('resultView');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
$('restartButton').addEventListener('click', () => {
  show('introView');
  $('headerStatus').textContent = '准备开始';
  window.history.replaceState({}, '', window.location.pathname);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  offerQuizProgress();
});
$('saveImageButton').addEventListener('click', downloadSummaryPoster);
document.querySelectorAll('[data-scroll-target]').forEach(button => button.addEventListener('click', () => {
  const target = $(button.dataset.scrollTarget);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

function refreshIntroCopy() {
  const description = document.querySelector('.intro-description');
  const note = document.querySelector('.micro-note');
  const legacyFrequency = $('dominantFrequency');
  if (legacyFrequency) {
    legacyFrequency.id = 'dominantPurpose';
    legacyFrequency.textContent = '';
  }
  if (description) description.innerHTML = '用情绪表达做爆款，让更多人看到你<br>用信任表达做成交，让更多人选择你<br>通过 MBTI、七情情绪和用户画像<br>找到最适合你的短视频表达风格与拍摄方向';
  if (note) note.textContent = '33 题 · 约 10 分钟 · 含 2 题可选';
}

refreshIntroCopy();
if (!loadSharedResult() && !offerQuizProgress()) loadSavedResult();
