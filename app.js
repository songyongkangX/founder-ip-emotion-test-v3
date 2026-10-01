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
  喜: { essence: '希望被验证', trigger: '她能做到，我也可以', peak: '我当初也不信，直到……', style: '轻快、松弛、有节奏', scene: '明亮色系、简约大方、暖光明亮', format: '亮结果 → 说来源 → 给希望' },
  怒: { essence: '边界被侵犯后的反击', trigger: '她替我说了我不敢说的', peak: '你也可以学会说不', style: '坚定、直接、不拖沓', scene: '深色系、干练利落、中性冷光', format: '亮态度 → 说原因 → 亮底线' },
  哀: { essence: '真实地被看见', trigger: '我也经历过，我懂', peak: '我怎么走出来的', style: '柔和、真实、有停顿', scene: '暖色偏暗、舒适居家、暖光偏暗', format: '低谷 → 感受 → 转折 → 感悟' },
  惧: { essence: '对失去的警觉', trigger: '再不改变就晚了', peak: '现在做还来得及', style: '紧凑、严肃、有压迫', scene: '深色系、干练专业、中性偏冷', format: '抛痛点 → 放大后果 → 给方向' },
  爱: { essence: '无条件地看见对方', trigger: '你把我当人看', peak: '不管怎样，我都在', style: '温柔、亲切、像聊天', scene: '柔和暖色、舒适温暖、暖光柔和', format: '回应问题 → 给方法 → 温暖收尾' },
  恶: { essence: '对标准的坚守', trigger: '她有底线', peak: '被筛选是一种认可', style: '冷静、笃定、不讨好', scene: '深色 / 中性色、干练简约、中性光', format: '说不服务谁 → 说为什么 → 说我服务谁' },
  欲: { essence: '对更好状态的向往', trigger: '我也想活成这样', peak: '我也可以走这条路', style: '从容、松弛、有质感', scene: '有质感色系、有设计感、自然光 / 暖光', format: '展示状态 → 说路径 → 给行动' }
};

const cameraGuides = {
  喜: {
    visual: ['气血感、清透有光泽的妆容', '有活力的色彩，避免过度沉闷', '明亮、偏暖色的生活或工作场景', '柔和暖光，让肤色更有精神', '自然微笑，眼神有光'],
    audio: ['语速稍快但咬字清楚', '轻快、松弛、积极', '节奏明快，重点处短暂停顿', '积极向上、轻盈有推动感的音乐']
  },
  怒: {
    visual: ['强调轮廓与眉眼，增加坚定感', '商业感或简约利落的硬挺穿搭', '有质感的商务空间，避开小清新布景', '中性定向光，清晰勾勒面部轮廓', '沉稳坚定，减少细碎动作和夸张表情'],
    audio: ['不急不慢，避免急躁或拖沓', '有立场、有大脑感、笃定', '短句推进，结论前后留出停顿', '有厚重感、力量感但不过度激烈的音乐']
  },
  哀: {
    visual: ['自然真实的妆容，保留个人质感', '柔软、生活化、不过度正式的穿搭', '柔和暖色的居家或真实工作环境', '柔光或自然光，避免硬朗黑白强对比', '让情绪自然带动表情，允许真实的哭与笑'],
    audio: ['语速偏慢，不赶着讲完', '真诚、克制、有回忆感', '保留沉思与情绪涌现时的真实停顿', '跟随故事情绪变化的风格化音乐']
  },
  惧: {
    visual: ['简单利落的专业妆容', '黑白灰或职业感穿搭', '干净、专业、偏商业化的拍摄场景', '清晰中性光，保持信息的锐度', '眼神专注，动作克制，拒绝幼态和过度女性化'],
    audio: ['语速可稍快，制造必要的紧迫感', '干脆、专业、立场明确', '信息紧凑，删掉“可能、也许、我觉得”等虚词', '有节奏感、能推动行动的音乐']
  },
  爱: {
    visual: ['淡妆，避免艳丽和攻击感', '毛衣、亚麻、新中式等柔软有包裹感的材质', '自然、温暖或中式生活场景', '柔和暖光，降低面部阴影与距离感', '眼神真诚，多带自然笑容'],
    audio: ['语速适中，让人跟得上', '温柔亲切、口语化，像一对一聊天', '有问有答，留出被理解的空间', '轻柔、温暖、不抢人声的音乐']
  },
  恶: {
    visual: ['精致明艳、强化五官立体度与权威感', '高质感、有结构的服装，避免过度随意', '材质与空间都要能承接高客单', '有层次的质感光，控制高光与阴影', '坚定又松弛，不讨好镜头'],
    audio: ['语速适中，从容而不急切', '坚定、冷静、有筛选感', '观点完整，避免营销式催促', '厚重、高质感、不过分柔软或欢快的音乐']
  },
  欲: {
    visual: ['有时尚感和审美完成度的妆容', '强调质感与好状态的时尚穿搭', '有美感、设计感和生活品质的场景', '自然光或精致暖光，突出松弛状态', '从容松弛、真诚自然，避免炫耀感'],
    audio: ['语速适中，给画面呼吸感', '松弛、从容、有对话感', '舒展推进，不堆砌信息', '有审美、能托起氛围但不过度煽情的音乐']
  }
};

const appearanceStyles = [
  { name: '都市睿智型', stars: '宋佳 · 姚晨 · 高叶', trust: '判断、执行与高价值', hook: '商业洞察 · 强观点 · 下判断', fit: '商业解析、创始人 IP、高客单咨询', styling: '西装、衬衫、硬挺面料；场景简洁；表达短、准、稳。', avoid: '碎花、甜美和过度生活化会削弱权威感。' },
  { name: '少女型', stars: '虞书欣 · 赵露思 · 赵丽颖', trust: '亲和、喜欢与朋友感', hook: '体验分享 · 好物 · 陪伴感', fit: '亲子、食品、美妆、童装、家居与年轻消费', styling: '妆造可甜一些；家庭或咖啡厅场景；轻快、有笑容。', avoid: '做高客单时要用案例、结果和专业内容补足权威。' },
  { name: '自然型', stars: '汤唯 · 刘诗诗', trust: '真实、舒服与松弛感', hook: '文化表达 · 生活方式 · 真实叙事', fit: '国学、国风、茶叶、滋补与文化生活方式', styling: '淡妆、自然光、棉麻穿搭；表达慢一点，多一点停顿。', avoid: '不要精致过头，太用力会损失真实感。' },
  { name: '古典型', stars: '刘涛 · 陈数 · 刘敏涛', trust: '秩序、分寸与理性可靠', hook: '专业解释 · 体系方法 · 知识科普', fit: '教育、法律、医疗、留学与行业分析', styling: '简洁专业的妆造与干净场景；表达沉稳、逻辑严密。', avoid: '避免杂乱布景和过于随意、跳脱的表达。' },
  { name: '前卫型', stars: '王菲 · 刘雯', trust: '辨识度、主张与边界', hook: '审美观点 · 趋势判断 · 个性表达', fit: '买手品牌、小众设计、美学、潮流与个性产品', styling: '大胆妆造、设计感场景；表达直接，不必讨好镜头。', avoid: '为了让所有人喜欢而抹平个人特点。' },
  { name: '浪漫型', stars: '范冰冰 · 朱珠 · 景甜', trust: '高价值、富足与精致感', hook: '女性成长 · 品质生活 · 价值展示', fit: '珠宝、翡翠、珍珠、女性成长与高品质生活', styling: '精致有曲线感的妆造；质感场景；温柔但不软弱。', avoid: '廉价布景与过度生硬的表达会迅速拉低高级感。' },
  { name: '少年型', stars: '周冬雨 · 李宇春 · 王子文', trust: '活力、力量与行动感', hook: '行动挑战 · 职场成长 · 新消费', fit: '运动、户外、新消费、职场成长与个性表达', styling: '年轻利落的穿搭；动态场景；直接、轻快，不故作成熟。', avoid: '与传统贵妇型产品硬凑，会让人和产品不在同一世界。' },
  { name: '优雅型', stars: '赵雅芝 · 宋慧乔', trust: '温柔、端庄与聆听感', hook: '关系沟通 · 家庭教育 · 生活美学', fit: '亲密关系、家庭教育、阅读、生活美学与轻珠宝', styling: '精致但不浓；温馨而不杂乱；表达温柔、有秩序。', avoid: '不必靠狠话制造力量，稳定的亲近感就是优势。' }
];

const topicGuides = {
  喜: ['结果前后对比：我/学员是怎么做到的', '拆解一个可复制的小成果，让用户看到希望', '记录高能量工作现场，用真实状态证明结果'],
  怒: ['替用户说出不敢说的话，明确你的立场', '反常识判断：这件事为什么大多数人都做错了', '划清行业边界：什么钱我不赚、什么人我不服务'],
  哀: ['讲一次真实低谷，以及你如何走出来', '复盘一个当时很难启齿、现在能坦然面对的选择', '用一段个人经历解释你今天坚持的原则'],
  惧: ['指出一个正在被忽略的风险，并给出补救顺序', '拆解“继续拖延”的真实成本，但不给无解焦虑', '避坑清单：出现这几个信号就要立刻调整'],
  爱: ['回应一个用户真实问题，像对朋友一样给建议', '分享服务幕后：你如何接住一个焦虑的人', '一封给某类用户的信：你不必独自扛住'],
  恶: ['明确你的服务标准，以及为什么这样坚持', '高客单不是贵在哪里，而是替用户省掉了什么', '筛选声明：哪些情况不适合选择你'],
  欲: ['展示理想状态的一天，并说清抵达路径', '从过去到现在：好状态不是炫耀，而是选择的结果', '带用户看见一个更好的未来，再给第一步行动']
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
  ['个人特质', '不考虑职业，你的外在长相与第一印象更接近哪一种？', [['都市睿智型：眼神锐利、轮廓清晰、有气场', '恶+2，怒+1'], ['少女型：脸型圆润、五官偏钝、亲和可爱', '爱+2，喜+1'], ['自然型：五官清淡、眼神柔和、松弛真实', '哀+1，爱+2'], ['古典型：五官端正、比例规整、专业有秩序', '惧+2，喜+1'], ['前卫型：辨识度高、非标准化、有个人态度', '怒+2，欲+1'], ['浪漫型：五官精致、有曲线感、富足明艳', '欲+2，喜+1'], ['少年型：年轻利落、酷而不甜、富有行动感', '喜+2，怒+1'], ['优雅型：端庄温柔、攻击性低、让人愿意靠近', '爱+2，欲+1']], 'single', 1],
  ['个人特质', '你面对镜头时，最自然的状态是？', [['直接开怼，敢说真话', '怒+2，恶+1'], ['温柔分享，像跟朋友聊天', '爱+2，哀+1'], ['自信展示，晒结果', '喜+2，欲+1'], ['严肃分析，给干货', '惧+1，恶+1']], 'multi', 2],
  ['个人特质', '你更喜欢哪种表达方式？', [['讲观点、亮态度', '怒+2，恶+1'], ['讲故事、讲经历', '哀+2，爱+1'], ['讲结果、讲案例', '喜+2，欲+1'], ['讲方法、讲逻辑', '惧+1，恶+1']], 'multi', 2],
  ['八字五行 · 可选', '你的日主五行是？', [['火（丙、丁）', '怒+2，喜+1'], ['土（戊、己）', '恶+1，喜+1'], ['木（甲、乙）', '怒+1，欲+1'], ['水（壬、癸）', '哀+1，爱+1'], ['金（庚、辛）', '惧+1，恶+1']], 'single', 1],
  ['八字五行 · 可选', '你的八字身强还是身弱？', [['身强', '怒+1，喜+1，恶+1'], ['身弱', '哀+1，爱+1，惧+1']], 'single', 1]
];

const mbtiQuestions = [
  ['MBTI 快速测评', '周末终于没安排，你更想怎么过？', [['约朋友出去玩，顺手把行程安排好', 'E+2，J+1'], ['看心情临时约人，有意思就出发', 'E+2，P+1'], ['一个人充充电，顺便完成自己的小计划', 'I+2，J+1'], ['彻底放空，想干嘛就干嘛', 'I+2，P+1']], 'single', 1],
  ['MBTI 快速测评', '碰到没做过的事，你通常先？', [['先找攻略和数据，看看哪条路最靠谱', 'S+2，T+1'], ['看看别人真实体验，选自己更舒服的方式', 'S+2，F+1'], ['先想它以后能发展成什么，再理清逻辑', 'N+2，T+1'], ['先看有没有感觉、有没有意义，再考虑对大家的影响', 'N+2，F+1']], 'single', 1],
  ['MBTI 快速测评', '大家一起聊点子时，你更像？', [['先开口抛脑洞，把气氛带起来', 'N+2，E+1'], ['边聊边补细节，让事情赶紧落地', 'S+2，E+1'], ['先听一会儿，想好后说出一个关键角度', 'N+2，I+1'], ['默默观察，最后提醒大家漏掉的细节', 'S+2，I+1']], 'single', 1],
  ['MBTI 快速测评', '跟人意见不一样时，你多半会？', [['把道理说清楚，尽快定下来', 'T+2，J+1'], ['先讲逻辑，实在不行就边做边调', 'T+2，P+1'], ['先照顾大家的感受，再一起定方案', 'F+2，J+1'], ['先让对方把话说完，再找双方都舒服的办法', 'F+2，P+1']], 'single', 1],
  ['MBTI 快速测评', '累了一周，你最想怎么“回血”？', [['找朋友聊聊，也想听个靠谱建议', 'E+2，T+1'], ['找熟人说说话，被理解就舒服多了', 'E+2，F+1'], ['自己待一会儿，把问题想明白', 'I+2，T+1'], ['安静独处，等情绪慢慢恢复', 'I+2，F+1']], 'single', 1],
  ['MBTI 快速测评', '学一个新东西时，你通常是？', [['跟着教程一步步练，做完再复盘', 'S+2，J+1'], ['先动手，哪里不会再补哪里', 'S+2，P+1'], ['先搞懂原理，再按自己的计划学', 'N+2，J+1'], ['先到处看看，遇到感兴趣的就深挖', 'N+2，P+1']], 'single', 1],
  ['MBTI 快速测评', '准备一条重要内容时，你更容易？', [['找人聊着聊着冒出新点子', 'N+2，E+1'], ['先讲出来，再用例子越讲越清楚', 'S+2，E+1'], ['一个人把观点想透，再开口', 'N+2，I+1'], ['先把资料和细节理清，再表达', 'S+2，I+1']], 'single', 1],
  ['MBTI 快速测评', '截止时间快到了，你通常是哪种？', [['早就做得差不多，最后检查一遍', 'J+2，T+1'], ['基本按计划完成，还会看看大家的体验', 'J+2，F+1'], ['越临近越专注，先拿下最关键的部分', 'P+2，T+1'], ['跟着状态冲刺，需要时拉大家一起补位', 'P+2，F+1']], 'single', 1]
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
const questions = [...baseQuestions.slice(0, 4), ...mbtiQuestions, ...profileQuestions, ...baseQuestions.slice(4, 7), ...scenarioQuestions, ...baseQuestions.slice(7)];

let current = 0;
let answers = Array.from({ length: questions.length }, () => []);
let mbtiType = '未完成';
const CACHE_KEY = 'founder-emotion-assessment-v3';
const CACHE_VERSION = 3;
const scores = () => Object.fromEntries(Object.keys(emotions).map(key => [key, 0]));
const $ = id => document.getElementById(id);
const scoreFromText = text => { const result = {}; [...text.matchAll(/([怒喜哀惧爱恶欲])\+(\d)/g)].forEach(match => { result[match[1]] = Number(match[2]); }); return result; };

function readCache() {
  try {
    const data = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!data || data.version !== CACHE_VERSION || data.questionCount !== questions.length || !Array.isArray(data.answers)) return null;
    if (data.answers.length !== questions.length) return null;
    const invalidAnswer = data.answers.some((selection, questionIndex) => !Array.isArray(selection) || selection.some(optionIndex => !Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= questions[questionIndex][2].length));
    if (invalidAnswer) return null;
    return data;
  } catch (error) {
    return null;
  }
}
function saveCache(view = 'quiz') {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ version: CACHE_VERSION, questionCount: questions.length, current, answers, view, updatedAt: Date.now() }));
  } catch (error) {
    console.warn('本地进度保存失败', error);
  }
}
function clearCache() { try { localStorage.removeItem(CACHE_KEY); } catch (error) { console.warn('本地进度清除失败', error); } }
function startFresh() {
  clearCache();
  current = 0;
  answers = Array.from({ length: questions.length }, () => []);
  show('quizView');
  $('headerStatus').textContent = '正在测评 · 自动保存';
  renderQuestion();
  saveCache('quiz');
}
function openResumeModal(data) {
  const completed = data.view === 'result';
  const answeredCount = data.answers.filter(selection => Array.isArray(selection) && selection.length).length;
  $('resumeTitle').textContent = completed ? '发现上次的测评结果' : '继续上次的测评吗？';
  $('resumeDescription').textContent = completed ? '上次结果已保存在当前设备，你可以直接查看，也可以重新开始。' : `已自动保存 ${answeredCount} / ${questions.length} 题，将从第 ${Math.min(data.current + 1, questions.length)} 题继续。`;
  $('resumeContinueButton').textContent = completed ? '查看上次结果' : '接着答题';
  $('resumeModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}
function closeResumeModal() { $('resumeModal').classList.add('hidden'); document.body.classList.remove('modal-open'); }
function resumeFromCache() {
  const data = readCache();
  if (!data) { closeResumeModal(); startFresh(); return; }
  answers = data.answers.map(selection => Array.isArray(selection) ? selection : []);
  current = Math.max(0, Math.min(Number(data.current) || 0, questions.length - 1));
  closeResumeModal();
  if (data.view === 'result') {
    renderResults();
    show('resultView');
    $('headerStatus').textContent = '已恢复上次结果';
  } else {
    show('quizView');
    $('headerStatus').textContent = '正在测评 · 自动保存';
    renderQuestion();
  }
}

function show(id) { ['introView', 'quizView', 'resultView'].forEach(view => $(view).classList.toggle('hidden', view !== id)); }
function showToast(message) { const toast = $('toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('visible'), 2400); }
function makeShareUrl(includeAnswers = false) { const url = new URL(window.location.href); url.hash = ''; if (includeAnswers) { url.search = ''; url.searchParams.set('answers', answers.map(selection => selection.length ? selection.reduce((mask, index) => mask | (1 << index), 0) : 'x').join('.')); } return url.toString(); }
async function shareUrl(url, message) { try { if (navigator.share) { await navigator.share({ title: '创始人 IP 情绪风格测评', text: message, url }); } else { await navigator.clipboard.writeText(url); showToast('分享链接已复制，发给学员即可'); } } catch (error) { if (error.name !== 'AbortError') { try { await navigator.clipboard.writeText(url); showToast('分享链接已复制'); } catch (clipboardError) { showToast('请复制浏览器地址栏链接分享'); } } } }
function openShareModal() { const url = makeShareUrl(); $('shareUrlInput').value = url; $('shareQrImage').src = `https://quickchart.io/qr?size=260&margin=2&text=${encodeURIComponent(url)}`; $('shareModal').classList.remove('hidden'); document.body.classList.add('modal-open'); }
function closeShareModal() { $('shareModal').classList.add('hidden'); document.body.classList.remove('modal-open'); }
async function copyShareUrl() { const url = $('shareUrlInput').value; try { await navigator.clipboard.writeText(url); } catch (error) { $('shareUrlInput').select(); document.execCommand('copy'); } showToast('测评网址已复制'); }
function downloadQr() { const link = document.createElement('a'); link.download = '创始人IP情绪风格测评二维码.png'; link.href = $('shareQrImage').src; link.target = '_blank'; link.click(); }
function loadSharedResult() { const encoded = new URLSearchParams(window.location.search).get('answers'); if (!encoded || !/^[0-9x]+(?:\.[0-9x]+)*$/.test(encoded)) return false; const tokens = encoded.includes('.') ? encoded.split('.') : [...encoded]; if (tokens.length !== questions.length) return false; if (tokens.some((token, index) => token !== 'x' && Number(token) > (1 << questions[index][2].length) - 1)) return false; answers = tokens.map((token, index) => { if (token === 'x') return []; const mask = Number(token); return Array.from({ length: questions[index][2].length }, (_, optionIndex) => optionIndex).filter(optionIndex => mask & (1 << optionIndex)); }); renderResults(); show('resultView'); $('headerStatus').textContent = '已打开分享结果'; return true; }
function renderQuestion() {
  const [section, title, options, mode, maxSelection] = questions[current];
  const optional = current >= questions.length - 2;
  const sectionLabel = current < 4 ? '第一部分 · 行业与产品' : current < 12 ? '第二部分 · MBTI 快速测评' : current < 16 ? '第三部分 · 用户画像' : current < 19 ? '第四部分 · 用户心理' : current < 25 ? '第五部分 · 情景反应' : current < 31 ? '第六部分 · 个人特质' : '第七部分 · 八字五行（可选）';
  $('sectionLabel').textContent = sectionLabel;
  $('questionTitle').textContent = title; $('currentNumber').textContent = String(current + 1).padStart(2, '0'); $('progressBar').style.width = `${((current + 1) / questions.length) * 100}%`; $('skipHint').textContent = mode === 'single' ? '单选题 · 请选择最符合的一项' : `多选题 · 最多选择 ${maxSelection} 项`;
  const modeLabel = mode === 'single' ? '单选题' : maxSelection === 2 ? '双选题 · 最多 2 项' : '多选题 · 最多 ' + maxSelection + ' 项';
  $('questionMode').textContent = optional ? '可选 · ' + modeLabel : modeLabel;
  if (optional) $('skipHint').textContent = '可选题 · 不填写也可以继续';
  $('options').innerHTML = options.map((option, index) => `<div class="option ${answers[current].includes(index) ? 'selected' : ''}" data-index="${index}"><span class="option-letter">${answers[current].includes(index) ? '✓' : String.fromCharCode(65 + index)}</span><div class="option-copy"><strong>${option[0]}</strong></div></div>`).join('');
  document.querySelectorAll('.option').forEach(option => option.addEventListener('click', () => { const index = Number(option.dataset.index); const selected = answers[current]; if (selected.includes(index)) answers[current] = selected.filter(item => item !== index); else if (mode === 'single') answers[current] = [index]; else if (selected.length < maxSelection) answers[current] = [...selected, index]; else { showToast(`本题最多选择 ${maxSelection} 项`); return; } saveCache('quiz'); renderQuestion(); }));
  $('prevButton').disabled = current === 0; $('nextButton').disabled = !optional && answers[current].length === 0; $('nextButton').innerHTML = current === questions.length - 1 ? '查看结果 <span>↗</span>' : optional ? '下一题（可跳过） <span>→</span>' : '下一题 <span>→</span>';
}
function calculate() {
  const total = scores();
  const mbti = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach((selection, questionIndex) => selection.forEach(answer => {
    const scoreText = questions[questionIndex][2][answer][1];
    Object.entries(scoreFromText(scoreText)).forEach(([emotion, value]) => { total[emotion] += value; });
    [...scoreText.matchAll(/([ESNTFJIP])\+(\d)/g)].forEach(match => { if (mbti[match[1]] !== undefined) mbti[match[1]] += Number(match[2]); });
  }));
  const signalFromQuestion = (questionIndex, left, right) => {
    const optionIndex = answers[questionIndex] && answers[questionIndex][0];
    if (!Number.isInteger(optionIndex)) return null;
    const scoreText = questions[questionIndex][2][optionIndex][1];
    const leftMatch = scoreText.match(new RegExp(left + '\\+(\\d)'));
    const rightMatch = scoreText.match(new RegExp(right + '\\+(\\d)'));
    const leftScore = leftMatch ? Number(leftMatch[1]) : 0;
    const rightScore = rightMatch ? Number(rightMatch[1]) : 0;
    return leftScore === rightScore ? null : leftScore > rightScore ? left : right;
  };
  const axis = (left, right, priorityQuestions) => {
    if (mbti[left] !== mbti[right]) return mbti[left] > mbti[right] ? left : right;
    for (const questionIndex of priorityQuestions) {
      const signal = signalFromQuestion(questionIndex, left, right);
      if (signal) return signal;
    }
    return left;
  };
  mbtiType = `${axis('E', 'I', [10, 6, 8, 4])}${axis('S', 'N', [10, 5, 9, 6])}${axis('T', 'F', [7, 8, 5, 11])}${axis('J', 'P', [11, 9, 7, 4])}`;
  return Object.entries(total).sort((a, b) => b[1] - a[1]);
}
function renderAdvancedInsights(primary, support, ranked) {
  const guide = emotionGuides[primary];
  const mbti = mbtiInsights[mbtiType] || ['喜、爱', '结果型、陪伴型', '真实、稳定、容易建立信任', '恶、惧'];
  const mbtiPractice = mbti[3].split('、').map(item => emotions[item[0]] ? `${item[0]} · ${emotions[item[0]].type}` : item).join('、');
  const ratio = primary + ' 60% + ' + support[0] + ' 25% + ' + support[1] + ' 15%';

  $('executionGrid').innerHTML = [
    '<article class="execution-card execution-primary"><span class="card-kicker">主情绪 · ' + primary + '</span><h4>' + emotions[primary].type + '怎么拍</h4><p>' + guide.format + '</p><small>' + guide.style + ' · ' + guide.scene + '</small></article>',
    '<article class="execution-card"><span class="card-kicker">MBTI · ' + mbtiType + '</span><h4>你的表达优势</h4><p>' + mbti[2] + '</p><small>适合内容：' + mbti[1] + '<br>有意识加入：' + mbtiPractice + '</small></article>',
    '<article class="execution-card"><span class="card-kicker">CONTENT MIX</span><h4>一周内容配方</h4><p>' + ratio + '</p><small>先用主情绪建立识别度，再用辅助情绪完成信任与转化。</small></article>'
  ].join('');

  const camera = cameraGuides[primary];
  const visualLabels = ['妆容', '服饰', '背景', '灯光', '表情'];
  const audioLabels = ['语速', '语气', '节奏', '音乐'];
  $('visualGuideList').innerHTML = camera.visual.map((text, index) => `<li><span>${visualLabels[index]}</span><strong>${text}</strong></li>`).join('');
  $('audioGuideList').innerHTML = camera.audio.map((text, index) => `<li><span>${audioLabels[index]}</span><strong>${text}</strong></li>`).join('');

  const selectedAppearanceIndex = Number.isInteger(answers[28][0]) ? answers[28][0] : 0;
  const appearance = appearanceStyles[selectedAppearanceIndex] || appearanceStyles[0];
  $('appearanceName').textContent = appearance.name;
  $('appearanceTrust').textContent = appearance.trust;
  $('appearanceFit').textContent = appearance.fit;
  $('appearanceStyling').textContent = appearance.styling;
  $('appearanceAvoid').textContent = appearance.avoid;
  $('appearanceComparisonGrid').innerHTML = appearanceStyles.map((style, index) => `<article class="appearance-mini ${index === selectedAppearanceIndex ? 'active' : ''}"><span>${String(index + 1).padStart(2, '0')}</span><div class="appearance-mini-title"><strong>${style.name}</strong><em>${style.stars}</em></div><small><b>信任</b><i>${style.trust}</i></small><small><b>内容</b><i>${style.hook}</i></small><small><b>赛道</b><i>${style.fit}</i></small></article>`).join('');

  $('topicSuggestionGrid').innerHTML = topicGuides[primary].map((topic, index) => `<article class="topic-card"><span>选题 ${String(index + 1).padStart(2, '0')}</span><strong>${topic}</strong><small>用「${primary} · ${emotions[primary].type}」作为主表达，画面按${appearance.name}建立第一眼信任。</small></article>`).join('');

  $('emotionGuideGrid').innerHTML = Object.keys(emotionGuides).map(emotion => {
    const item = emotionGuides[emotion];
    return '<article class="emotion-guide-card"><div class="emotion-guide-top"><span class="emotion-symbol">' + emotion + '</span><div><strong>' + emotions[emotion].type + '</strong><small>' + item.essence + '</small></div></div><p>用户触动：' + item.trigger + '</p><p>最高层次：' + item.peak + '</p><div class="guide-meta"><span>' + item.style + '</span><span>' + item.format + '</span></div></article>';
  }).join('');
  queueMicrotask(() => document.querySelectorAll('.advice-item span').forEach(item => { item.textContent = item.textContent.replace(/，建议[^。]+。$/, '。'); }));
}
function renderResults() {
  const ranked = calculate(); const primary = ranked[0][0]; const support = ranked.slice(1, 3).map(item => item[0]); const avoid = ranked.slice(-2).map(item => item[0]); const max = ranked[0][1] || 1;
  renderAdvancedInsights(primary, support, ranked);
  $('completionCopy').textContent = '完成度 ' + Math.round(answers.slice(0, -2).filter(selection => selection.length).length / (questions.length - 2) * 100) + '%';
  $('dominantEmotion').textContent = primary; $('dominantType').textContent = emotions[primary].type; $('dominantSummary').textContent = `${emotions[primary].advice}。你的内容首先要让用户感受到${emotions[primary].purpose.replace('建立人设、', '').replace('、替用户说话', '')}。`; $('dominantScore').textContent = `得分 ${ranked[0][1]}`; $('dominantPurpose').textContent = emotions[primary].purpose;
  $('resultTitle').textContent = `${primary} × ${support.join(' × ')} 配方`; $('resultSubtitle').textContent = `${emotions[primary].type}为主，${emotions[support[0]].type}与${emotions[support[1]].type}辅助`;
  $('scoreBars').innerHTML = ranked.map(([emotion, score]) => `<div class="score-bar-row"><strong>${emotion}</strong><div class="score-bar-track"><div class="score-bar-fill" style="width:${Math.max(5, score / max * 100)}%"></div></div><span>${score}</span></div>`).join('');
  $('primaryEmotion').textContent = `${primary} · ${emotions[primary].type}`; $('supportEmotions').textContent = support.map(emotion => `${emotion} · ${emotions[emotion].type}`).join(' + '); $('contentRatio').textContent = '60% + 25% + 15%';
  $('contentAdvice').innerHTML = [primary, ...support].map((emotion, index) => `<div class="advice-item"><strong>${[60, 25, 15][index]}% ${emotion} · ${emotions[emotion].type}</strong><span>${emotions[emotion].advice}。${emotions[emotion].purpose}，建议${emotions[emotion].frequency}。</span></div>`).join(''); $('avoidAdvice').textContent = `${avoid.join('、')}：分数较低，暂时不要把它们当作主要表达。你的内容更适合从「${emotions[primary].type}」出发，保持真实比刻意补齐所有情绪更重要。`; $('signalCopy').textContent = ranked[0][1] - ranked[1][1] >= 3 ? '情绪信号清晰' : '情绪组合丰富'; $('emotionTags').innerHTML = ranked.slice(0, 4).map(([emotion, score], index) => `<span class="emotion-tag tag-${index}">${emotion} · ${emotions[emotion].type}<b>${score}</b></span>`).join('');
  $('headerStatus').textContent = '测评已完成 · 结果已保存';
  saveCache('result');
}
function answerText(index) { const selection = answers[index]; return selection.length ? selection.map(answer => questions[index][2][answer][0]).join('、') : '未填写'; }
function ensureResultLayout() { const description = document.querySelector('.intro-description'); const note = document.querySelector('.micro-note'); if (description) description.textContent = '用情绪表达做爆款，用信任表达做成交。10 分钟找到属于你的情绪配方、内容比例和可直接执行的视频方向。'; if (note) note.textContent = `${questions.length} 题 · 约 10 分钟 · 含 2 题可选`; const homeShare = $('shareTestButton'); const resultShare = $('shareResultButton'); const shareModal = $('shareModal'); if (homeShare) homeShare.remove(); if (resultShare) resultShare.remove(); if (shareModal) shareModal.remove(); const saveButton = $('saveImageButton'); const resultActions = document.querySelector('.result-actions'); if (saveButton && resultActions && !resultActions.contains(saveButton)) resultActions.prepend(saveButton); if (!$('dominantResult') && $('resultCard')) $('resultCard').insertAdjacentHTML('beforebegin', '<div id="dominantResult" class="dominant-result"><div class="dominant-orb"><span id="dominantEmotion">怒</span><small>主情绪</small></div><div class="dominant-copy"><p class="eyebrow">YOUR DOMINANT SIGNAL</p><h3><strong id="dominantType">立场型</strong>人格</h3><p id="dominantSummary">你最适合用清晰的立场和边界，让用户迅速记住你。</p><div class="dominant-meta"><span id="dominantScore">得分 0</span><span id="dominantFrequency">每周 1–2 条</span></div></div><div class="dominant-badge">TOP<br><strong>01</strong></div></div>'); }
function saveCanvasAsPng(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        resolve(false);
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = '创始人IP情绪风格完整结果报告.png';
      link.href = objectUrl;
      document.body.append(link);
      link.click();
      window.setTimeout(() => link.remove(), 1000);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      resolve(true);
    }, 'image/png');
  });
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
$('startButton').addEventListener('click', () => { const cached = readCache(); if (cached) openResumeModal(cached); else startFresh(); });
$('prevButton').addEventListener('click', () => { if (current > 0) { current--; saveCache('quiz'); renderQuestion(); } });
$('nextButton').addEventListener('click', () => { if (current < questions.length - 1) { current++; saveCache('quiz'); renderQuestion(); } else { renderResults(); show('resultView'); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
$('restartButton').addEventListener('click', () => { clearCache(); show('introView'); $('headerStatus').textContent = '准备开始'; window.history.replaceState({}, '', window.location.pathname); window.scrollTo({ top: 0, behavior: 'smooth' }); });
$('resumeContinueButton').addEventListener('click', resumeFromCache);
$('resumeRestartButton').addEventListener('click', () => { closeResumeModal(); startFresh(); });
$('resumeCloseButton').addEventListener('click', closeResumeModal);
$('saveImageButton').addEventListener('click', downloadResult);
const openedSharedResult = loadSharedResult();
if (!openedSharedResult) { const cached = readCache(); if (cached) queueMicrotask(() => openResumeModal(cached)); }

function refreshIntroCopy() {
  const description = document.querySelector('.intro-description');
  const note = document.querySelector('.micro-note');
  const legacyFrequency = $('dominantFrequency');
  if (legacyFrequency) {
    legacyFrequency.id = 'dominantPurpose';
    legacyFrequency.textContent = '';
  }
  if (description) description.innerHTML = '用情绪表达做爆款，让更多人看到你<br>用信任表达做成交，让更多人选择你<br>通过 MBTI、七情情绪和用户画像<br>找到最适合你的短视频表达风格与拍摄方向';
  if (note) note.textContent = `${questions.length} 题 · 约 10 分钟 · 含 2 题可选`;
}

refreshIntroCopy();
