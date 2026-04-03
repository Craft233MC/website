export const siteBrand = {
  name: 'Craft233',
  logo: 'https://res.neokoni.ink/craft233/img/craft233_logo.svg',
  description: 'Craft233，一个休闲养老摸鱼系的 Minecraft 小服务器，欢迎加入我们，同我们一起成长。',
  docsUrl: 'https://docs.craft233.top',
}

export const pages = {
  home: {
    title: 'V4 重制',
  },
  join: {
    title: '加入服务器',
  },
  rules: {
    title: '规则区',
  },
  archive: {
    title: '获取存档',
  },
  contribute: {
    title: '贡献',
  },
  sponsors: {
    title: '赞助者们',
  },
  friendlinks: {
    title: '友情链接',
  },
} as const

export const navigation = [
  { label: '首页', to: '/' },
  { label: '加入', to: '/join' },
  { label: '存档', to: '/archive' },
  { label: '贡献', to: '/contribute' },
  { label: '规则', to: '/rules' },
  { label: '赞助者们', to: '/sponsors' },
  { label: '友情链接', to: '/friendlinks' },
  { label: '文档站', href: siteBrand.docsUrl },
] as const

export const footerGroups = [
  {
    title: '交流',
    links: [
      {
        label: 'QQ群',
        icon: 'ri:qq-line',
        href:
          'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QofGtNhyZdlU0kVZtr81sGxVDMzKGkkt&authKey=59dPS936wuYm%2Bg4qHFkMdo8IYTcdD6Jp8Q9kBb2Mmv8i7APEm0Ms2373ztiW97wE&noverify=0&group_code=830277457',
      },
    ],
  },
  {
    title: 'Craft233',
    links: [
      { label: 'Github', icon: 'ri:github-line', href: 'https://github.com/Craft233MC' },
      { label: 'BiliBili', icon: 'ri:bilibili-line', href: 'https://space.bilibili.com/3546655496342120' },
    ],
  },
  {
    title: '宣传贴',
    links: [
      { label: 'MineBBS', icon: 'ri:book-open-line', href: 'https://www.minebbs.com/threads/1-13-x-1-20-x-craft233-2.19401/' },
      { label: '苦力怕论坛', icon: 'ri:chat-3-line', href: 'https://klpbbs.com/thread-135065-1-1.html' },
      { label: 'mcMod找服玩', icon: 'ri:compass-3-line', href: 'https://play.mcmod.cn/sv20187552.html' },
      { label: 'NameMC', icon: 'ri:global-line', href: 'https://zh-cn.namemc.com/server/mc.craft233.top' },
    ],
  },
  {
    title: '相关链接',
    links: [
      { label: '外部监测站', icon: 'ri:pulse-line', href: 'https://status.craft233.top' },
      { label: '爱发电', icon: 'ri:hand-heart-line', href: 'https://afdian.com/a/neokoni/' },
    ],
  },
] as const

export const footerSocialLinks = [
  {
    label: 'GitHub',
    icon: 'ri:github-line',
    href: 'https://github.com/Craft233MC',
  },
  {
    label: 'BiliBili',
    icon: 'ri:bilibili-line',
    href: 'https://space.bilibili.com/3546655496342120',
  },
] as const

export const legalNotice = [
  '“Minecraft” 以及 “我的世界” 为 Mojang AB. 的商标。',
  '“Craft233” 和本网站与 Mojang 以及 Microsoft 没有任何从属关系。',
  '“Craft233” 不是 Minecraft 官方的服务器。',
]

export const homeContent = {
  hero: {
    eyebrow: 'Craft233',
    title: '全新出发，让简化带来原生态的生存体验。',
    subtitle: '在尝试中找到尽可能优的生存体验。与玩家一起，携手出发。',
    actions: [
      { label: '加入服务器', to: '/join', variant: 'primary' },
      { label: '查看规则', to: '/rules', variant: 'ghost' },
      { label: '文档站', href: siteBrand.docsUrl, variant: 'outline' },
    ],
    image: siteBrand.logo,
  },
  spotlights: [
    {
      title: '原版生存',
      description:
        '由原版 Folia 系服务端驱动的原版粘液生存服务器，体验与大部分原版生存服类似，包括常见的家、传送等功能。服务端设置尽可能保持原版特性，已开启可以还原原版特性的所有选项。',
      image: 'https://www.craft233.top/assets/img/index/hub.png',
    },
    {
      title: '单方块生存',
      description:
        '原版经典单方块生存服务器，大部分时间由 Leaves 驱动，若更新新版本可能会更换一段时间 Paper 端。不限制生电及机器，除粘液科技外与原版生存差距不大，也尽可能开启了原版特性。',
      image: 'https://www.craft233.top/assets/img/index/oneblock.png',
    },
  ],
  features: [
    {
      title: '基岩版头颅显示',
      description: '对基岩版物品栏内完整的插件头颅物品显示，背包不再算是 Steve 头颅。',
    },
    {
      title: '版本兼容',
      description: '支持 Java 版 1.20 及之后的版本以及基岩版的最新正式版。',
    },
    {
      title: '删繁就简',
      description: '相比于二周目，第三周目删去了臃肿感知不大的插件，返璞归真。',
    },
    {
      title: '滚动更新',
      description: '当插件或模组支持时，我们会追随最新的 Minecraft 版本。',
    },
    {
      title: '线程优化',
      description: '主生存服借助 Folia 提升资源利用率，减少卡顿。',
    },
    {
      title: '原生运行',
      description: '手动修改源码将粘液科技带回 Folia 平台，不依靠修改 Scheduler 服务端，提升稳定性。',
    },
    {
      title: '数据安全',
      description: '每日凌晨自动备份数据，保证数据安全。',
    },
    {
      title: '去密码化',
      description: '使用主流账号 / 外置登陆验证，不再依靠皮肤恢复和进服密码。',
    },
    {
      title: '开源',
      description: '所有经过修改的插件均开源在 GitHub 平台。',
    },
  ],
  teamTitle: '我们的团队',
  teamDescription: '认识一下我们的管理人员。',
  team: [
    {
      name: 'Neokoni',
      role: '服主 · 技术 · 开发',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3335792980&s=640',
      bio: ['每天都在摸鱼的鸽子。'],
      links: [
        { label: 'GitHub', href: 'https://github.com/neokoni' },
        { label: '邮箱', href: 'mailto:me@neokoni.ink' },
      ],
    },
    {
      name: '233laoliu',
      role: '管理员',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2117015126&s=640',
      bio: ['这个人很神秘，没有留下任何东西。'],
      links: [],
    },
    {
      name: 'gjyyds1',
      role: '管理员 · 礼包大使',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2712878343&s=640',
      bio: ['我除会了 eee 还会 eee 的。'],
      links: [],
    },
  ],
} as const

export const joinContent = {
  title: '加入服务器',
  summary: '显示打开此页面时服务器的状态。',
  servers: [
    {
      name: 'Craft233',
      address: 'v4.mc.craft233.top:25565',
      apiAddress: 'v4.mc.craft233.top:25565',
      kind: 'Velocity',
    },
  ],
  steps: [
    {
      title: '进入游戏菜单',
      image: 'https://docs.craft233.top/assets/JavaHomePage.ChXN-PvP.png',
    },
    {
      title: '点击添加服务器',
      image: 'https://docs.craft233.top/assets/javaServerList.ClEIZ0Kn.png',
    },
    {
      title: '填入信息并保存',
      image: 'https://docs.craft233.top/assets/javaAddServer.C_XH7osL.png',
    },
  ],
} as const

export const rulesContent = [
  '关于偷盗：未使用服务器内相关保护插件如 Residence、QuickShop 等阻止访问的插件进行保护则不受偷盗管束。如果为使用了 Residence 领地插件包围了建筑物的大部分且由于资金原因没有扩展，则不在领地内的小部分依然受保护。',
  '关于建筑物破坏：若被恶意使用引雷或岩浆破坏且建筑物已具有一定规模，可要求服务器管理员查找相关证据并惩罚一段时间封禁。若反复作案或毁坏建筑物规模巨大，造成损失过于严重，将封禁。',
  '关于作弊：服务器允许使用生存辅助类 mod 提升游玩体验，部分作弊端的辅助功能是允许的。但若出现影响他人游玩体验或被他人举报，仍将给予不同程度封禁惩罚。',
  '矿透是不允许的。',
  '关于言行：服务器及交流群禁止讨论任何违反国家法律的话题及言行，包括但不限于政治、暴力血腥、色情内容、虚拟货币、传播社会谣言，违反将给予禁言或封禁。',
  '关于广告：禁止在服务器内及群内发布砍一刀或助力等推广，也不允许发布其他服务器的推广，特别是机器人推广。',
  '平等交流：禁止出现学历、性别、民族、地域等歧视，违者将被禁言，严重者封禁。',
  '话题不限制：虽然是 MC 的东西，但是服务器及交流群内并不限制讨论话题，包括游戏邀请或技术讨论等都是不受限制的。',
  '关于交易：游戏内可以通过服务器内货币咕咕点在服务器商店出售或购买物品，如果有不包含的物品禁止向管理员提出购买请求。若有二手商品交易请自行辨别及是否使用“咸鱼”等交易平台，Craft233 不负责交易担保。',
  '虚拟物品现金交易：禁止以现金交易游戏内货币或物品，如咕咕点、钻石等物资。',
  '公开监督：若 Craft233 管理人员出现言语辱骂、人身威胁、私自收受钱财等情况，请私信 Neokoni 或邮箱 me@neokoni.ink 提交材料举报。',
] as const

export const archiveContent = [
  {
    title: '第一周目',
    description:
      'Craft233 最原始的一个周目，此时我们正在用不知名的配置开服，一切都是未知的，每一次修改都是对开服的学习。',
    image: 'https://www.craft233.top/assets/img/week1/2023-08-31_00.03.12.png',
    dateRange: '2023.7.10 — 2024.2.24',
    downloadUrl: 'https://www.123912.com/s/81d8Vv-eJGmd',
  },
  {
    title: '第二周目：Cube',
    description: '第二周目的生电服存档，因无人感兴趣加入与管理维护降低，在很长一段时间之前就已是空服。第二周目并未结束，仅 Cube。',
    image: 'https://www.craft233.top/assets/img/week2/cube/cube-screenshot-from-bili.png',
    dateRange: '2024.3.10 — 2024.8.3',
    downloadUrl: 'https://www.123912.com/s/81d8Vv-tJGmd',
  },
  {
    title: '第二周目',
    description: '第二周目的非生电服存档。',
    image: 'https://www.craft233.top/assets/img/week2/town.png',
    dateRange: '2024.3.10 — 2025.4.2',
    downloadUrl: 'https://www.123684.com/s/81d8Vv-iJGmd',
  },
] as const

export const contributeContent = [
  {
    title: '改进网页与文档',
    description: '欢迎在 GitHub 上帮助我们改进文档与网站。',
    href: 'https://github.com/Craft233MC',
    button: 'GitHub',
  },
  {
    title: '帮助其他玩家',
    description: '欢迎加入我们的交流群，帮助解决其他玩家的困惑。',
    href:
      'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QofGtNhyZdlU0kVZtr81sGxVDMzKGkkt&authKey=59dPS936wuYm%2Bg4qHFkMdo8IYTcdD6Jp8Q9kBb2Mmv8i7APEm0Ms2373ztiW97wE&noverify=0&group_code=830277457',
    button: 'QQ群聊',
  },
  {
    title: '提供资金支持',
    description: 'Craft233 使用爱发电来管理各种日常开支，其中大部分与基础设施有关。',
    href: 'https://afdian.com/a/neokoni/',
    button: '爱发电',
  },
] as const

export const sponsorsContent = [
  { name: 'MRCI', qq: 3259266411, message: '私はロリコンですか?', value: '10' },
  { name: '233laoliu', qq: 2117015126, message: '可千万别成商业服啊', value: '31.44 + 50（花火推广）' },
  { name: 'gjyyds', qq: 2712878343, message: 'eee', value: '30' },
  { name: 'SuMaple', qq: 652657854, message: '希望我们服能越来越好啊！！！', value: '70' },
  { name: 'CREATORKARIMO', qq: 'unknown', message: '阿巴', value: '5' },
  { name: 'Ygbs', qq: 2300861061, message: 'Ygbs here', value: '10' },
  { name: 'floodluo', qq: 1782531643, message: '我很爱这个服务器希望他能一直有', value: '5' },
  { name: 'Lee', qq: 3886321682, message: '加油，希望越来越好。', value: '5' },
  { name: 'cjfd', qq: 1599221954, message: '', value: '30' },
] as const

export const friendLinksContent = [
  {
    name: 'MCJPG',
    avatar: 'https://avatars.githubusercontent.com/u/177510197?s=200&v=4',
    href: 'https://mcjpg.org/',
    intro: ['MCJPG 集体宣传组织', '一个致力于 Minecraft 技术交流和服务器宣传的新兴组织'],
  },
  {
    name: 'FurCraft',
    avatar: 'https://www.furcraft.top/icon.png',
    href: 'https://www.furcraft.top',
    intro: ['在方块世界中，与毛毛共绘未来'],
  },
] as const
