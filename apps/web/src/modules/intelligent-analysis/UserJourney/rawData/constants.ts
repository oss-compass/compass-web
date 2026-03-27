import { PainGuideItem } from '../types';

export const USER_JOURNEY_AGENT_GENERATOR = 'OSS-Compass Cogito Agent';

export const USER_JOURNEY_DEFAULT_PERSONA =
  'beginner / 熟悉C++/Python，有GPU编程基础但从未使用过昇腾CANN';

export const USER_JOURNEY_DEFAULT_HARDWARE = 'cloud_only（无本地专用AI加速卡）';

export const USER_JOURNEY_PAIN_GUIDE_ITEMS: PainGuideItem[] = [
  {
    level: 'P0_BLOCKER',
    scoreRange: '0 — 19',
    label: '完全阻塞',
    english: 'Blocker',
    description: '完全无法完成当前阶段任务，需要额外人工介入或替代路径。',
    rowClassName: 'bg-rose-50',
    cardClassName: 'border-rose-300 bg-white',
    iconType: 'exclamation',
    accentColor: '#e11d48',
  },
  {
    level: 'P1_CRITICAL',
    scoreRange: '20 — 39',
    label: '关键卡点',
    english: 'Critical',
    description: '存在高概率失败或明显卡点，开发者难以独立完成当前任务。',
    rowClassName: 'bg-red-50',
    cardClassName: 'border-rose-200 bg-white',
    iconType: 'exclamation',
    accentColor: '#f43f5e',
  },
  {
    level: 'P2_MAJOR',
    scoreRange: '40 — 59',
    label: '显著影响',
    english: 'Major',
    description: '需要多次试错或额外检索，整体效率受到明显影响。',
    rowClassName: 'bg-amber-50',
    cardClassName: 'border-amber-200 bg-white',
    iconType: 'exclamation',
    accentColor: '#d97706',
  },
  {
    level: 'P3_MINOR',
    scoreRange: '60 — 79',
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
    scoreRange: '80 — 100',
    label: '体验流畅',
    english: 'Trivial',
    description: '基本没有显著障碍，对整体体验影响很小。',
    rowClassName: 'bg-slate-50',
    cardClassName: 'border-emerald-200 bg-white',
    iconType: 'check',
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

export const USER_JOURNEY_STEP_STATIC_CONTENT: Record<
  string,
  {
    description: string;
    actions: string[];
    tools: string[];
  }
> = {
  S0_DISCOVER: {
    description:
      '通过搜索引擎、社区导航、口碑推荐等方式定位目标项目的仓库地址与 Quick Start 入口。',
    actions: [
      '输入搜索关键词',
      '浏览搜索结果',
      '识别并确认正确仓库 URL',
      '区分同名或近名项目',
    ],
    tools: ['Google/Bing 搜索', '浏览器访问'],
  },
  S1_COMPREHEND: {
    description:
      '阅读 README、QuickStart 与项目结构说明，形成完整的执行路径认知。',
    actions: [
      '阅读 README.md',
      '定位 QuickStart 文档',
      '解析文档中的超链接',
      '理解项目目录结构',
      '识别外部依赖跳转',
    ],
    tools: ['浏览器阅读', 'Markdown 渲染'],
  },
  S2_ENVIRONMENT: {
    description:
      '获取所需硬件或云环境，安装 SDK、工具链与编译器，配置环境变量并验证可用性。',
    actions: [
      '选择硬件路径（本地或云）',
      '创建云开发环境',
      '下载并安装 SDK 或 Toolkit',
      '配置环境变量',
      '验证编译工具链可用',
    ],
    tools: [
      '云平台 Notebook',
      'apt/pip/conda 安装',
      'source set_env.sh',
      'nvcc --version',
    ],
  },
  S3_ACQUIRE: {
    description:
      '克隆仓库源码，安装项目依赖，处理权限与网络问题，确保后续构建能继续。',
    actions: [
      'git clone 仓库',
      '设置文件权限',
      '安装 requirements 或构建依赖',
      '处理网络超时与重试',
    ],
    tools: ['git clone', 'chmod', 'pip install -r', 'cmake dependency'],
  },
  S4_BUILD: {
    description:
      '执行构建脚本或命令，编译算子或示例代码，处理编译错误并生成可部署产物。',
    actions: [
      '阅读构建参数说明',
      '选择目标芯片或架构',
      '执行构建命令',
      '诊断编译错误',
      '确认构建产物生成',
    ],
    tools: ['./build.sh --pkg', 'cmake .. && make', 'nvcc *.cu'],
  },
  S5_DEPLOY: {
    description:
      '将构建产物安装或注册到目标运行环境，确认算子或模块可被上层框架识别。',
    actions: [
      '执行安装命令（.run 或 make install）',
      '确认安装路径正确',
      '验证算子或模块已注册',
      '检查版本兼容性',
    ],
    tools: ['.run 安装包执行', 'make install', '环境变量更新'],
  },
  S6_VERIFY: {
    description:
      '运行示例程序或测试用例，确认功能正确、精度达标，并完成端到端闭环验证。',
    actions: [
      '选择运行模式',
      '执行示例程序',
      '检查输出结果',
      '对比精度或预期',
      '确认端到端成功',
    ],
    tools: ['./build.sh --run_example', './vectorAdd', 'pytest', 'ctest'],
  },
};
