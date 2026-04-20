import { PainGuideItem } from '../types';

export const USER_JOURNEY_AGENT_GENERATOR = 'OSS-Compass Cogito Agent';

export const USER_JOURNEY_DEFAULT_PERSONA =
  'beginner / 熟悉C++/Python，有GPU编程基础但从未使用过昇腾CANN';

export const USER_JOURNEY_DEFAULT_HARDWARE = 'cloud_only（无本地专用AI加速卡）';

// export const USER_JOURNEY_PAIN_GUIDE_ITEMS: PainGuideItem[] = [
//   {
//     level: 'P0_BLOCKER',
//     scoreRange: '0',
//     label: '完全阻塞',
//     english: 'Blocker',
//     description: '完全无法完成当前阶段任务，需要额外人工介入或替代路径。',
//     rowClassName: 'bg-rose-50',
//     cardClassName: 'border-rose-300 bg-white',
//     iconType: 'exclamation',
//     accentColor: '#e11d48',
//   },
//   {
//     level: 'P1_CRITICAL',
//     scoreRange: '1 — 59',
//     label: '关键卡点',
//     english: 'Critical',
//     description: '存在高概率失败或明显卡点，开发者难以独立完成当前任务。',
//     rowClassName: 'bg-red-50',
//     cardClassName: 'border-rose-200 bg-white',
//     iconType: 'exclamation',
//     accentColor: '#f43f5e',
//   },
//   {
//     level: 'P2_MAJOR',
//     scoreRange: '60 — 79',
//     label: '显著影响',
//     english: 'Major',
//     description: '需要多次试错或额外检索，整体效率受到明显影响。',
//     rowClassName: 'bg-amber-50',
//     cardClassName: 'border-amber-200 bg-white',
//     iconType: 'exclamation',
//     accentColor: '#d97706',
//   },
//   {
//     level: 'P3_MINOR',
//     scoreRange: '80 — 94',
//     label: '体验流畅',
//     english: 'Minor',
//     description: '存在一定摩擦，但整体仍然可以顺利推进。',
//     rowClassName: 'bg-emerald-50',
//     cardClassName: 'border-emerald-200 bg-white',
//     iconType: 'check',
//     accentColor: '#059669',
//   },
//   {
//     level: 'P4_TRIVIAL',
//     scoreRange: '95 — 100',
//     label: '极致体验',
//     english: 'Trivial',
//     description: '基本没有显著障碍，对整体体验影响很小。',
//     rowClassName: 'bg-slate-50',
//     cardClassName: 'border-emerald-200 bg-white',
//     iconType: 'smile',
//     accentColor: '#16a34a',
//   },
// ];

export const USER_JOURNEY_PAIN_GUIDE_ITEMS: PainGuideItem[] = [
  {
    level: 'P0_BLOCKER',
    scoreRange: '0',
    label: '完全阻塞',
    english: 'Blocker',
    description: '完全无法完成当前阶段任务，开发者无法自行解决。',
    rowClassName: 'bg-rose-50',
    cardClassName: 'border-rose-300 bg-white',
    iconType: 'exclamation',
    accentColor: '#e11d48',
  },
  {
    level: 'P1_CRITICAL',
    scoreRange: '1 — 59',
    label: '关键卡点',
    english: 'Critical',
    description:
      '在环境配置、编译、构建等任务中出现报错或者中断，开发者自行尝试并已解决。',
    rowClassName: 'bg-red-50',
    cardClassName: 'border-rose-200 bg-white',
    iconType: 'exclamation',
    accentColor: '#f43f5e',
  },
  {
    level: 'P2_MAJOR',
    scoreRange: '60 — 79',
    label: '显著影响',
    english: 'Major',
    description:
      '在样例代码运行、测试验证等任务中出现报错或者中断，开发者自行尝试并已解决。',
    rowClassName: 'bg-amber-50',
    cardClassName: 'border-amber-200 bg-white',
    iconType: 'exclamation',
    accentColor: '#d97706',
  },
  {
    level: 'P3_MINOR',
    scoreRange: '80 — 94',
    label: '轻微影响',
    english: 'Minor',
    description: '存在一定摩擦，但整体仍然可以顺利推进。',
    rowClassName: 'bg-emerald-50',
    cardClassName: 'border-emerald-200 bg-white',
    iconType: 'check',
    accentColor: '#059669',
  },
  {
    level: 'P4_TRIVIAL',
    scoreRange: '95 — 100',
    label: '极致体验',
    english: 'Trivial',
    description: '基本没有显著障碍，对整体体验影响很小。',
    rowClassName: 'bg-slate-50',
    cardClassName: 'border-emerald-200 bg-white',
    iconType: 'smile',
    accentColor: '#16a34a',
  },
];

export const USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO: PainGuideItem[] = [
  {
    level: 'P0_BLOCKER',
    scoreRange: '0',
    label: '完全阻塞',
    english: 'Blocker',
    description: '完全无法完成当前阶段任务，开发者无法自行解决。',
    rowClassName: 'bg-rose-50',
    cardClassName: 'border-rose-300 bg-white',
    iconType: 'exclamation',
    accentColor: '#e11d48',
  },
  {
    level: 'P1_CRITICAL',
    scoreRange: '1 — 59',
    label: '关键卡点',
    english: 'Critical',
    description:
      '在环境配置、编译、构建等任务中出现报错或者中断，开发者自行尝试并已解决。',
    rowClassName: 'bg-red-50',
    cardClassName: 'border-rose-200 bg-white',
    iconType: 'exclamation',
    accentColor: '#f43f5e',
  },
  {
    level: 'P2_MAJOR',
    scoreRange: '60 — 79',
    label: '显著影响',
    english: 'Major',
    description:
      '在样例代码运行、测试验证等任务中出现报错或者中断，开发者自行尝试并已解决。',
    rowClassName: 'bg-amber-50',
    cardClassName: 'border-amber-200 bg-white',
    iconType: 'exclamation',
    accentColor: '#d97706',
  },
  {
    level: 'P3_MINOR',
    scoreRange: '80 — 94',
    label: '轻微影响',
    english: 'Minor',
    description: '存在一定摩擦，但整体仍然可以顺利推进。',
    rowClassName: 'bg-emerald-50',
    cardClassName: 'border-emerald-200 bg-white',
    iconType: 'check',
    accentColor: '#059669',
  },
  {
    level: 'P4_TRIVIAL',
    scoreRange: '95 — 100',
    label: '非项目本身问题',
    english: 'Trivial',
    description: '',
    rowClassName: 'bg-slate-50',
    cardClassName: 'border-emerald-200 bg-white',
    iconType: 'smile',
    accentColor: '#16a34a',
  },
];

export const USER_JOURNEY_DEVELOPER_TYPE_OPTIONS = [
  '社区入门体验',
  'Ascend C算子开发',
];

export const USER_JOURNEY_DEFAULT_DEVELOPER_TYPE =
  USER_JOURNEY_DEVELOPER_TYPE_OPTIONS[0];

export const USER_JOURNEY_MODE_OPTIONS = ['开发算子入门', '调用算子入门'];

export const USER_JOURNEY_DEFAULT_MODE = USER_JOURNEY_MODE_OPTIONS[0];
