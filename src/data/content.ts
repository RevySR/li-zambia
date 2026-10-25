export const stats = [
  { label: '公开仓库', value: '34', note: '覆盖 FlagOS、RISC-V、内核与系统移植' },
  { label: '关注者', value: '64', note: '不多，但都是真人' },
  { label: '关注中', value: '119', note: '从 0 到 119，终于开始回头了' },
  { label: '常驻地', value: '银河系', note: '主页写着 Milky Way galaxy' },
]

export const repositories = [
  {
    name: 'community',
    url: 'https://github.com/shiptux/community',
    description: 'FlagOS 的社区治理、开发者贡献指南、贡献协议与社区交流。李部长的主场。',
    meta: '治理 · 文档 · Fork',
  },
  {
    name: 'FlagTree',
    url: 'https://github.com/shiptux/FlagTree',
    description: '支持多种 AI 芯片后端的统一编译器，FlagOS 工具链的新战线。',
    meta: '编译器 · C++ · Fork',
  },
  {
    name: 'FlagGems',
    url: 'https://github.com/shiptux/FlagGems',
    description: '面向大语言模型的算子库，也是 FlagOS 算子生态的一员。',
    meta: '算子库 · Python · Fork',
  },
  {
    name: 'FlagCX',
    url: 'https://github.com/shiptux/FlagCX',
    description: '可扩展、自适应的跨芯片通信库，让不同 AI 芯片坐到同一张桌上开会。',
    meta: '通信库 · C++ · Fork',
  },
  {
    name: 'dynamorio-riscv-port-memo',
    url: 'https://github.com/shiptux/dynamorio-riscv-port-memo',
    description: 'DynamoRIO 往 RISC-V 移植的笔记。动态二进制插桩遇到新指令集，坑都记在这里。',
    meta: 'RISC-V · 移植笔记',
  },
  {
    name: 'hello_ko',
    url: 'https://github.com/shiptux/hello_ko',
    description: '一个内核模块版的 hello world。入门仪式，也是简历里的第一行。',
    meta: '内核模块 · C',
  },
]

export const planks = [
  '铜带省每条村道都铺上 <strong>RISC-V 指令集</strong>，先从自家服务器开始。',
  '每个部落配一台自研内核的服务器，旁边放柴油发电机，<strong>断电也能编译</strong>。',
  '给仓库提过 PR 的人到卢萨卡，一律用 <strong>Nshima（西玛）</strong> 招待，管饱。',
  '部落官方语言增加一门 <strong>C</strong>；文档先写英文，再补中文。',
  '维多利亚瀑布 Mosi-oa-Tunya（雷霆之雾）旁建一座<strong>自然水冷数据中心</strong>。',
  '<strong>月报制度照旧</strong>，FlagOS 的进展一个月都不能停。',
]

export const coronationJumps = [
  { value: 0, label: '0% 部长' },
  { value: 18, label: '18% 击鼓' },
  { value: 42, label: '42% 授杖' },
  { value: 68, label: '68% 加冕' },
  { value: 82, label: '82% 开翼' },
  { value: 100, label: '100% 礼成' },
]

export const riteSteps = [
  { target: 18, title: '击鼓三通', tag: '01 · 18%', description: '鼓是一把 87 键机械键盘，敲三下，键帽是青轴。' },
  { target: 42, title: '授杖', tag: '02 · 42%', description: '接过权杖：一根 USB-C 铜线缠的杖，顶端镶 87 键机械键盘。' },
  { target: 68, title: '加冕', tag: '03 · 68%', description: '戴上铜带省黄金圣冠，冠底铭刻 RISC-V · 721。' },
  { target: 82, title: '宣誓与开翼', tag: '04 · 82%', description: '背后展开铜鹰征伐之翼，誓词只有一句：I will review your pull request.' },
  { target: 90, title: '设宴', tag: '05 · 90%', description: 'Nshima（西玛）管饱，配可乐，来宾自带筷子或手。' },
  { target: 96, title: '合影', tag: '06 · 96%', description: '全员开摄像头，时区按 UTC+2 算，北京时间晚上八点。' },
  { target: 100, title: '礼成 · 隐修院印章满载爆发', tag: '100%', final: true },
]

export const wowRotation = [
  { time: 0, label: '0.0s 隐修院印章 +9097', epic: true },
  { time: 1.5, label: '1.5s 神圣风暴 #1' },
  { time: 4.5, label: '4.5s 愤怒之锤 #1' },
  { time: 7.5, label: '7.5s 神圣风暴 #2' },
  { time: 12, label: '12.0s 神圣风暴 #3' },
  { time: 15.5, label: '15.5s 愤怒之锤 #2' },
  { time: 18.5, label: '18.5s 神圣风暴 #4' },
]
