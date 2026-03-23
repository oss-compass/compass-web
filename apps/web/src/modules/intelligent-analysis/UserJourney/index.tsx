import React, { useMemo, useState } from 'react';
import {
  ApiOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  BuildOutlined,
  CodeOutlined,
  CopyOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  Descriptions,
  Row,
  Segmented,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import MiniTrendChart from 'src/common/components/EChartX/MiniTrendChart';

const { Text, Title } = Typography;

type Tone = 'critical' | 'warning' | 'positive' | 'neutral';

type OverviewMetric = {
  key: string;
  title: string;
  value: string;
  suffix?: string;
  description: string;
  stage: string;
  recentValues?: string;
  tone: Tone;
  color: string;
};

type ReportMetadataItem = {
  key: string;
  label: string;
  value: string;
  tone?: 'default' | 'mono';
};

type MetricTrend = {
  values: number[];
  unit: string;
  joiner?: string;
  integerAxis?: boolean;
  clampMin?: number;
  clampMax?: number;
};

type ActionStatus = 'success' | 'warning' | 'failed' | 'neutral';

type StepMetric = {
  label: string;
  value: string;
  benchmark: string;
  note: string;
  tone: Tone;
  trend?: MetricTrend;
};

type ActionDetailRecord = {
  label: string;
  description: string;
  duration?: string;
  status?: ActionStatus;
  statusLabel?: string;
};

type ActionCard = {
  title: string;
  summary?: string;
  detail?: string;
  details?: ActionDetailRecord[];
  actionType?: string;
  duration?: string;
  status?: ActionStatus;
  statusLabel?: string;
};

type JourneyStep = {
  key: string;
  code: string;
  title: string;
  summary: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  score: number;
  benchmarkScore: number;
  timeShare: string;
  painLevel: 'P1_CRITICAL' | 'P2_MAJOR' | 'P3_MINOR';
  painLabel: string;
  actions: string[];
  actionCards?: ActionCard[];
  tools: string[];
  painSummary: string;
  recommendation: string;
  metrics: StepMetric[];
};

const overviewMetrics: OverviewMetric[] = [
  {
    key: 'overall-score',
    title: '综合体验评分',
    value: '48.0',
    suffix: '/100',
    description:
      '来自七步旅程综合评分，最能反映外部开发者“从零跑通”的真实体验。',
    stage: '全链路结果',
    recentValues: '近五次数据',
    tone: 'critical',
    color: '#2563eb',
  },
  {
    key: 'e2e-success',
    title: '平均端到端成功率',
    value: '50',
    suffix: '%',
    description:
      '这是最直接的结果指标，比“通用成功率”更贴近用户是否真的能把 Quick Start 跑起来。',
    stage: 'S6 运行验证',
    recentValues: '近五次数据',
    tone: 'warning',
    color: '#7c3aed',
  },
  {
    key: 'e2e-duration',
    title: '平均端到端总耗时',
    value: '45',
    suffix: '分钟',
    description:
      '覆盖从环境准备到最终验证的完整首次跑通时长，比单步耗时更有决策价值。',
    stage: 'S6 运行验证',
    recentValues: '近五次数据',
    tone: 'critical',
    color: '#0f766e',
  },
  {
    key: 'avg-token-cost',
    title: '平均 token 消耗量',
    value: '1,230',
    description:
      '用近五次任务的平均 token 消耗量观察分析成本，辅助判断任务复杂度和调用负担。',
    stage: '全链路成本',
    recentValues: '近五次数据',
    tone: 'warning',
    color: '#ea580c',
  },
];

const reportMetadata: ReportMetadataItem[] = [
  {
    key: 'report-id',
    label: '报告ID',
    value: 'DHDX-2026-0316-OPS-MATH-VS-CUDA',
    tone: 'mono',
  },
  {
    key: 'generated-at',
    label: '生成时间',
    value: '2026-03-16T15:30:00+08:00',
    tone: 'mono',
  },
  {
    key: 'agent-version',
    label: 'Agent版本',
    value: 'langgraph-dhdx-v1.0.0 (手动模拟)',
    tone: 'mono',
  },
  {
    key: 'persona',
    label: '模拟角色',
    value: 'beginner / 熟悉C++/Python，有GPU编程基础但从未使用过昇腾CANN',
  },
  {
    key: 'hardware',
    label: '硬件条件',
    value: 'cloud_only（无本地专用AI加速卡）',
  },
  {
    key: 'language',
    label: '首选语言',
    value: 'zh-CN',
    tone: 'mono',
  },
];

const currentProjectInfo = {
  name: 'CANN/ops-math',
  version: 'V1',
};

const journeySteps: JourneyStep[] = [
  {
    key: 'discover',
    code: 'S0_DISCOVER',
    title: '搜索与发现',
    summary: '定位仓库入口，避免旧名与迁移链接误导。',
    description:
      '通过搜索引擎、社区导航、口碑推荐等方式定位目标项目的仓库地址与 Quick Start 入口。',
    icon: <AppstoreOutlined />,
    color: '#2563eb',
    score: 34,
    benchmarkScore: 100,
    timeShare: '~10%',
    painLevel: 'P2_MAJOR',
    painLabel: '显著摩擦',
    actions: [
      '输入搜索关键词',
      '浏览搜索结果',
      '识别并确认正确仓库 URL',
      '区分同名或近名项目',
    ],
    actionCards: [
      {
        title: '输入搜索关键词',
        summary: '三次搜索后才命中 GitCode 仓库入口。',
        actionType: 'web_search ×3',
        status: 'warning',
        statusLabel: '3次检索',
        duration: '90s',
        details: [
          {
            label: 'web_search',
            description: '关键词：“华为昇腾 CANN ops-math 开源项目”',
            duration: '30s',
            status: 'failed',
            statusLabel: '未命中',
          },
          {
            label: 'web_search',
            description: '关键词：“CANN ops-math gitee ascend”',
            duration: '30s',
            status: 'failed',
            statusLabel: '未命中',
          },
          {
            label: 'web_search',
            description: '关键词：“gitcode.com cann ops-math”',
            duration: '30s',
            status: 'success',
            statusLabel: '成功',
          },
        ],
      },
      {
        title: '浏览搜索结果',
        summary: '通过新闻稿和迁移公告补全仓库迁移线索。',
        actionType: 'doc_read / page_visit',
        status: 'warning',
        statusLabel: '线索确认',
        duration: '105s',
        details: [
          {
            label: 'doc_read',
            description: '阅读搜狐新闻稿，发现提到 AtomGit 和 gitcode.com/cann',
            duration: '60s',
            status: 'warning',
            statusLabel: '补充线索',
          },
          {
            label: 'page_visit',
            description: '访问 gitee.com/ascend/cann-ops，看到迁移公告',
            duration: '45s',
            status: 'warning',
            statusLabel: '确认迁移',
          },
        ],
      },
      {
        title: '识别并确认正确仓库 URL',
        summary: '最终确认 GitCode 为当前有效仓库入口。',
        actionType: 'page_visit',
        status: 'success',
        statusLabel: '仓库确认',
        duration: '15s',
        details: [
          {
            label: 'page_visit',
            description: '确认 https://gitcode.com/cann/ops-math',
            duration: '15s',
            status: 'success',
            statusLabel: '成功',
          },
        ],
      },
      {
        title: '区分同名或近名项目',
        summary: '结合历史入口与迁移信息完成项目辨识。',
        actionType: 'disambiguation',
        status: 'warning',
        statusLabel: '完成辨识',
        duration: '105s',
        details: [
          {
            label: 'doc_read',
            description:
              '从新闻稿中识别 AtomGit / GitCode 平台线索，排除旧入口干扰',
            duration: '60s',
            status: 'warning',
            statusLabel: '线索比对',
          },
          {
            label: 'page_visit',
            description:
              '从迁移公告确认 cann-ops 与 ops-math 的关系，并锁定 GitCode',
            duration: '45s',
            status: 'warning',
            statusLabel: '完成辨识',
          },
        ],
      },
    ],
    tools: ['Google/Bing 搜索', '浏览器访问'],
    painSummary:
      '搜索“ops-math”几乎无法直达仓库，需要经历 cann-ops → Gitee 迁移公告 → GitCode 的三段式跳转，且多个名称容易混淆。',
    recommendation:
      '优先建立 GitHub 官方镜像，并在 README 明确“Mirror of GitCode”，先解决入口可发现性问题。',
    metrics: [
      {
        label: '搜索轮次',
        value: '3 轮',
        benchmark: '对标 1 轮',
        note: '从通用关键词到平台定向搜索，共经历 3 轮定位才找到正确入口。',
        tone: 'warning',
        trend: {
          values: [5, 4, 4, 3, 3],
          unit: '轮',
          integerAxis: true,
        },
      },
      {
        label: '总搜索耗时',
        value: '210 秒',
        benchmark: '对标 45 秒',
        note: '三轮搜索与结果确认共耗时 3.5 分钟。',
        tone: 'warning',
        trend: {
          values: [320, 295, 260, 235, 210],
          unit: '秒',
        },
      },
      {
        label: '首轮直达率',
        value: '0%',
        benchmark: '对标 100%',
        note: '首次搜索前 10 条结果未命中仓库主页或 clone 地址。',
        tone: 'critical',
        trend: {
          values: [0, 0, 0, 0, 0],
          unit: '%',
          joiner: '',
          clampMin: 0,
          clampMax: 100,
        },
      },
      // {
      //   label: '重试次数',
      //   value: '2 次',
      //   benchmark: '对标 0 次',
      //   note: '前两轮都没有直接命中目标仓库，第三轮才完成确认。',
      //   tone: 'warning',
      // },
      {
        label: '命名混淆数',
        value: '3 个',
        benchmark: '对标 0 个',
        note: 'cann-ops、ops-math、cann-ops-adv 之间存在明显歧义。',
        tone: 'critical',
        trend: {
          values: [5, 5, 4, 4, 3],
          unit: '个',
          integerAxis: true,
        },
      },
      {
        label: '平台迁移摩擦',
        value: '70 分',
        benchmark: '理想 0 分',
        note: '旧平台与新平台之间的信息断裂会持续放大入口阻力。',
        tone: 'critical',
      },
    ],
  },
  {
    key: 'comprehend',
    code: 'S1_COMPREHEND',
    title: '理解与导航',
    summary: '串起 README、Quick Start 与外部文档的完整操作路径。',
    description:
      '阅读 README、QuickStart 与项目结构说明，形成完整的执行路径认知。',
    icon: <ApiOutlined />,
    color: '#7c3aed',
    score: 40,
    benchmarkScore: 80,
    timeShare: '~10%',
    painLevel: 'P2_MAJOR',
    painLabel: '显著摩擦',
    actions: [
      '阅读 README.md',
      '定位 QuickStart 文档',
      '解析文档中的超链接',
      '理解项目目录结构',
      '识别外部依赖跳转',
    ],
    tools: ['浏览器阅读', 'Markdown 渲染'],
    painSummary:
      'Quick Start 需要在 GitCode、昇腾社区文档、华为云资源等多个域名之间来回跳转，文档链路不够自包含。',
    recommendation:
      '把 QuickStart.md 扩展成单文件可跑通指南，减少外跳，并在同一页面给出完整命令块与预期输出。',
    metrics: [
      {
        label: '文档跳转数',
        value: '4 个域名',
        benchmark: '对标 2 个',
        note: '需要跨 GitCode、昇腾社区、OBS 等多个站点才补齐信息。',
        tone: 'warning',
        trend: {
          values: [6, 5, 5, 4, 4],
          unit: '个',
          integerAxis: true,
        },
      },
      {
        label: '文档自包含度',
        value: '30%',
        benchmark: '对标 70%',
        note: '多数关键步骤无法在同一份文档中闭环完成。',
        tone: 'critical',
        trend: {
          values: [18, 20, 24, 27, 30],
          unit: '%',
          joiner: '',
          clampMin: 0,
          clampMax: 100,
        },
      },
      {
        label: '死链数量',
        value: '1-2 个',
        benchmark: '对标 0 个',
        note: '部分链接可达性不稳定，会进一步打断理解过程。',
        tone: 'warning',
        trend: {
          values: [3, 2, 2, 2, 1],
          unit: '个',
          integerAxis: true,
        },
      },
      {
        label: '文档覆盖率',
        value: '50%',
        benchmark: '对标 85%',
        note: '关键 API、依赖与动作说明覆盖不足，需要额外查找资料。',
        tone: 'warning',
      },
    ],
  },
  {
    key: 'environment',
    code: 'S2_ENVIRONMENT',
    title: '环境准备',
    summary: '获取硬件、安装工具链，并把编译环境真正跑通。',
    description:
      '获取所需硬件或云环境，安装 SDK、工具链与编译器，配置环境变量并验证可用性。',
    icon: <DashboardOutlined />,
    color: '#ea580c',
    score: 43,
    benchmarkScore: 88,
    timeShare: '~25%',
    painLevel: 'P1_CRITICAL',
    painLabel: '关键阻塞',
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
    painSummary:
      'GitCode Notebook 每次会话限制 2 小时，环境不持久；新会话需要重新下载和安装约 4GB 依赖，20 分钟会被环境准备吞掉。',
    recommendation:
      '优先推动 Notebook 预装 CANN Toolkit 或会话持久化，把环境初始化从 20 分钟压缩到分钟级。',
    metrics: [
      {
        label: '环境初始化耗时',
        value: '20 分钟',
        benchmark: '对标 5 分钟',
        note: '新会话要重新下载与配置工具链，是首个重阻塞阶段。',
        tone: 'critical',
        trend: {
          values: [30, 27, 24, 22, 20],
          unit: '分钟',
        },
      },
      {
        label: '配置步骤数',
        value: '8 步',
        benchmark: '对标 3 步',
        note: '从创建环境到编译器可用，需要完成多轮下载、安装和校验。',
        tone: 'warning',
        trend: {
          values: [10, 10, 9, 8, 8],
          unit: '步',
          integerAxis: true,
        },
      },
      {
        label: '环境持久化',
        value: '不支持',
        benchmark: '对标 支持',
        note: '关闭会话后需要重新初始化，重复成本非常高。',
        tone: 'critical',
      },
      {
        label: '云会话时限',
        value: '2 小时',
        benchmark: '对标 12 小时',
        note: '有效开发时间被压缩到约 100 分钟，试错空间不足。',
        tone: 'critical',
        trend: {
          values: [2, 2, 2, 2, 2],
          unit: '小时',
          integerAxis: true,
        },
      },
    ],
  },
  {
    key: 'acquire',
    code: 'S3_ACQUIRE',
    title: '获取代码',
    summary: '拿到源码后，尽快把依赖、权限与网络问题处理完。',
    description:
      '克隆仓库源码，安装项目依赖，处理权限与网络问题，确保后续构建能继续。',
    icon: <CopyOutlined />,
    color: '#059669',
    score: 70,
    benchmarkScore: 95,
    timeShare: '~5%',
    painLevel: 'P3_MINOR',
    painLabel: '轻微摩擦',
    actions: [
      'git clone 仓库',
      '设置文件权限',
      '安装 requirements 或构建依赖',
      '处理网络超时与重试',
    ],
    tools: ['git clone', 'chmod', 'pip install -r', 'cmake dependency'],
    painSummary:
      '获取代码整体可完成，但 GitCode 偶发网络波动，且 chmod 777 -R 的文档指引过宽，不适合作为默认建议。',
    recommendation:
      '把依赖清单和推荐权限策略写清楚，弱化“777”这类高风险做法，降低新手误用成本。',
    metrics: [
      {
        label: 'Clone 成功率',
        value: '90%',
        benchmark: '对标 99%',
        note: '整体可用，但相比 GitHub 全局 CDN 仍存在网络波动风险。',
        tone: 'warning',
        trend: {
          values: [72, 78, 84, 88, 90],
          unit: '%',
          joiner: '',
          clampMin: 0,
          clampMax: 100,
        },
      },
      {
        label: '依赖透明度',
        value: '中等',
        benchmark: '对标 高',
        note: 'requirements.txt 存在，但关键依赖没有在文档中被完整解释。',
        tone: 'warning',
      },
      {
        label: '权限指引',
        value: '偏宽',
        benchmark: '建议 最小权限',
        note: '当前文档建议 chmod 777 -R，安全性和专业度都不理想。',
        tone: 'warning',
      },
    ],
  },
  {
    key: 'build',
    code: 'S4_BUILD',
    title: '编译构建',
    summary: '理解参数、执行构建，并能从报错里快速定位根因。',
    description:
      '执行构建脚本或命令，编译算子或示例代码，处理编译错误并生成可部署产物。',
    icon: <CodeOutlined />,
    color: '#d97706',
    score: 35,
    benchmarkScore: 88,
    timeShare: '~15%',
    painLevel: 'P2_MAJOR',
    painLabel: '显著摩擦',
    actions: [
      '阅读构建参数说明',
      '选择目标芯片或架构',
      '执行构建命令',
      '诊断编译错误',
      '确认构建产物生成',
    ],
    tools: ['./build.sh --pkg', 'cmake .. && make', 'nvcc *.cu'],
    painSummary:
      'build.sh 需要记住多个关键参数，且存在 20+ 个可选项；如果环境变量未配置，报错“bisheng not found”无法直接指向根因。',
    recommendation:
      '在构建入口增加环境预检和修复提示，让报错直接告诉用户该执行哪条命令，而不是留给用户猜。',
    metrics: [
      {
        label: '编译耗时',
        value: '5 分钟',
        benchmark: '对标 30 秒',
        note: '单次构建本身就偏长，叠加前置准备后感知会更明显。',
        tone: 'warning',
        trend: {
          values: [9, 8, 7, 6, 5],
          unit: '分钟',
        },
      },
      {
        label: '构建参数数',
        value: '20+ 个',
        benchmark: '对标 2 个',
        note: '面对 --help 输出时，新手难以快速锁定最小可运行命令。',
        tone: 'critical',
        trend: {
          values: [24, 24, 23, 22, 20],
          unit: '个',
          integerAxis: true,
        },
      },
      {
        label: '报错可诊断性',
        value: '低',
        benchmark: '对标 高',
        note: '错误信息没有把“缺少环境变量”翻译成明确修复动作。',
        tone: 'critical',
      },
    ],
  },
  {
    key: 'deploy',
    code: 'S5_DEPLOY',
    title: '部署安装',
    summary: '把构建产物注册到运行环境，并确认能被正确识别。',
    description:
      '将构建产物安装或注册到目标运行环境，确认算子或模块可被上层框架识别。',
    icon: <BuildOutlined />,
    color: '#db2777',
    score: 45,
    benchmarkScore: 100,
    timeShare: '~10%',
    painLevel: 'P3_MINOR',
    painLabel: '轻微摩擦',
    actions: [
      '执行安装命令（.run 或 make install）',
      '确认安装路径正确',
      '验证算子或模块已注册',
      '检查版本兼容性',
    ],
    tools: ['.run 安装包执行', 'make install', '环境变量更新'],
    painSummary:
      '需要手动执行 .run 安装包，文件名又包含架构信息；安装后缺少官方验证命令，新手难以判断是否已成功注册。',
    recommendation:
      '补充安装后校验命令和幂等说明，把“打包→安装→注册”链路讲清楚，减少隐性失败。',
    metrics: [
      {
        label: '安装后验证',
        value: '不支持',
        benchmark: '对标 支持',
        note: '缺少安装完成后的官方校验动作，反馈闭环不完整。',
        tone: 'critical',
      },
      {
        label: '幂等性说明',
        value: '未说明',
        benchmark: '对标 已说明',
        note: '重复安装是否安全、是否覆盖旧版本，文档没有明确给出。',
        tone: 'warning',
      },
      {
        label: '部署复杂度',
        value: '打包→安装→注册',
        benchmark: '对标 编译即运行',
        note: '相比 CUDA 示例的“构建完成即可执行”，这里多了一层专有部署心智负担。',
        tone: 'warning',
      },
    ],
  },
  {
    key: 'verify',
    code: 'S6_VERIFY',
    title: '运行验证',
    summary: '运行样例、检查输出，并确认端到端真正通过。',
    description:
      '运行示例程序或测试用例，确认功能正确、精度达标，并完成端到端闭环验证。',
    icon: <ToolOutlined />,
    color: '#1d4ed8',
    score: 45,
    benchmarkScore: 91,
    timeShare: '~15%',
    painLevel: 'P2_MAJOR',
    painLabel: '显著摩擦',
    actions: [
      '选择运行模式',
      '执行示例程序',
      '检查输出结果',
      '对比精度或预期',
      '确认端到端成功',
    ],
    tools: ['./build.sh --run_example', './vectorAdd', 'pytest', 'ctest'],
    painSummary:
      '首次运行命令需要理解 eager / graph、内置 / cust 等多组模式组合，认知成本高，且失败输出不够聚焦。',
    recommendation:
      '在 Quick Start 中突出“一条推荐首次运行命令”，把多模式解释下沉到进阶章节，先保证首次成功。',
    metrics: [
      {
        label: '运行模式数',
        value: '4 种',
        benchmark: '对标 1 种',
        note: '模式组合过多会放大首次运行时的决策与理解成本。',
        tone: 'critical',
        trend: {
          values: [5, 5, 4, 4, 4],
          unit: '种',
          integerAxis: true,
        },
      },
      {
        label: '端到端总耗时',
        value: '45 分钟',
        benchmark: '对标 7 分钟',
        note: '包含环境与运行后的首次完整闭环时间，显著高于对标项目。',
        tone: 'critical',
        trend: {
          values: [62, 58, 54, 50, 45],
          unit: '分钟',
        },
      },
      {
        label: '首次跑通成功率',
        value: '50%',
        benchmark: '对标 95%',
        note: '成功率不足会直接影响开发者是否愿意继续投入时间。',
        tone: 'warning',
        trend: {
          values: [20, 28, 35, 42, 50],
          unit: '%',
          joiner: '',
          clampMin: 0,
          clampMax: 100,
        },
      },
      {
        label: '输出可读性',
        value: '中等',
        benchmark: '对标 高',
        note: '成功时有提示，但失败时仍混杂较多编译输出信息。',
        tone: 'warning',
      },
    ],
  },
];

const getPainClasses = (level: JourneyStep['painLevel']) => {
  switch (level) {
    case 'P1_CRITICAL':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    case 'P2_MAJOR':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    default:
      return 'border-sky-200 bg-sky-50 text-sky-700';
  }
};

const getActionStatusClasses = (status: ActionStatus | undefined) => {
  switch (status) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    case 'failed':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    default:
      return 'border-slate-200 bg-slate-50 text-slate-600';
  }
};

const getMetricTrendPalette = (tone: Tone) => {
  switch (tone) {
    case 'critical':
      return {
        stroke: '#ef4444',
        fill: 'rgba(239, 68, 68, 0.12)',
        point: '#dc2626',
      };
    case 'warning':
      return {
        stroke: '#f59e0b',
        fill: 'rgba(245, 158, 11, 0.14)',
        point: '#d97706',
      };
    case 'positive':
      return {
        stroke: '#10b981',
        fill: 'rgba(16, 185, 129, 0.14)',
        point: '#059669',
      };
    default:
      return {
        stroke: '#64748b',
        fill: 'rgba(100, 116, 139, 0.12)',
        point: '#475569',
      };
  }
};

const formatTrendValue = (value: number, trend: MetricTrend) => {
  const normalizedValue = trend.integerAxis
    ? Math.round(value).toString()
    : Number.isInteger(value) || Math.abs(value) >= 10
    ? value.toFixed(0)
    : value.toFixed(1);

  return `${normalizedValue}${trend.joiner ?? (trend.unit === '%' ? '' : ' ')}${
    trend.unit
  }`;
};

const MetricTrendChart: React.FC<{
  trend: MetricTrend;
  tone: Tone;
}> = ({ trend, tone }) => {
  const palette = getMetricTrendPalette(tone);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>最近五次趋势</span>
        <span>单位：{trend.unit}</span>
      </div>
      <div className="mt-3">
        <MiniTrendChart
          values={trend.values}
          xLabels={trend.values.map((_, index) => `${index + 1}`)}
          color={palette.stroke}
          areaColor={palette.fill}
          pointColor={palette.point}
          integerAxis={trend.integerAxis}
          minValue={trend.clampMin}
          maxValue={trend.clampMax}
          formatValue={(value) => formatTrendValue(value, trend)}
        />
      </div>
    </div>
  );
};

const UserJourney: React.FC = () => {
  const [activeStepKey, setActiveStepKey] = useState(journeySteps[0].key);
  const [developerType, setDeveloperType] = useState('外部入门开发者');
  const [journeyMode, setJourneyMode] = useState('开发算子入门');

  const currentStep = useMemo(
    () =>
      journeySteps.find((step) => step.key === activeStepKey) ||
      journeySteps[0],
    [activeStepKey]
  );
  const keyMetrics =
    currentStep.key === 'discover'
      ? currentStep.metrics.slice(0, 4)
      : currentStep.metrics.slice(0, 3);
  const keyActionCards =
    currentStep.actionCards ??
    currentStep.actions
      .slice(0, 3)
      .map((action): ActionCard => ({ title: action }));
  const keyTools = currentStep.tools.slice(0, 3);

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_24%),linear-gradient(180deg,#f6f8fc_0%,#eef3fb_100%)]">
      <nav className="flex h-14 items-center justify-between border-b border-t bg-white/90 px-6 backdrop-blur md:h-12 md:px-4">
        <div className="relative flex h-10 flex-1 items-center gap-3 overflow-hidden pl-4 text-xl font-semibold">
          <Select
            value={developerType}
            onChange={setDeveloperType}
            bordered={false}
            options={[
              { label: '外部入门开发者', value: '外部入门开发者' },
              { label: 'Ascend C算子开发', value: 'Ascend C算子开发' },
            ]}
            className="min-w-[185px] [&_.ant-select-arrow]:text-slate-700 [&_.ant-select-selection-item]:!text-xl [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!leading-10 [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!shadow-none"
            dropdownStyle={{ minWidth: 200 }}
          />
          <div className="ml-4 mt-2">
            <Segmented
              value={journeyMode}
              onChange={(value) => setJourneyMode(String(value))}
              style={{ marginBottom: 8 }}
              options={['开发算子入门', '调用算子入门']}
            />
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 items-center md:flex">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3.5 py-2 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-900">
                {currentProjectInfo.name}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
                {currentProjectInfo.version}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-136px)] flex-col gap-5 p-5">
        <Card
          bordered={false}
          className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
          bodyStyle={{ padding: 24 }}
        >
          <div>
            <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div className="text-xl font-semibold text-slate-900">
                报告元数据
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 shadow-[0_10px_20px_rgba(15,23,42,0.04)]">
              <Descriptions
                size="small"
                column={{ xs: 1, md: 2, xl: 3 }}
                colon
                className="[&_.ant-descriptions-item-content]:!align-top [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!text-xs [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-2"
                items={reportMetadata.map((item) => ({
                  key: item.key,
                  label: item.label,
                  children: (
                    <Tooltip title={item.value}>
                      <span
                        className={`block max-w-[320px] truncate text-sm ${
                          item.tone === 'mono' ? 'font-mono' : 'font-medium'
                        }`}
                      >
                        {item.value}
                      </span>
                    </Tooltip>
                  ),
                }))}
              />
            </div>
          </div>

          <div className="mt-3 border-slate-100 pt-3">
            <div className="mb-2 text-xl font-semibold text-slate-900">
              指标概览
            </div>
            <Text className="text-sm text-slate-500">
              {/* 只保留 4 个最关键的结果指标，避免把页面做成“指标堆砌”。 */}
            </Text>
            <Row gutter={[16, 16]} className="mt-5">
              {overviewMetrics.map((metric) => {
                return (
                  <Col xs={24} md={12} xl={6} key={metric.key}>
                    <Card
                      bordered
                      className="h-full rounded-3xl border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                      bodyStyle={{ padding: 22 }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <span>{metric.title}</span>
                            <Tooltip title={metric.description}>
                              <InfoCircleOutlined className="cursor-help text-slate-400" />
                            </Tooltip>
                          </div>
                          <div className="mt-3 flex items-end gap-2">
                            <span className="text-[34px] font-semibold leading-none text-slate-900">
                              {metric.value}
                            </span>
                            {metric.suffix ? (
                              <span className="text-sm font-medium text-slate-500">
                                {metric.suffix}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        {metric.recentValues ? (
                          <span className="max-w-[150px] text-right text-[11px] leading-5 text-slate-400">
                            {metric.recentValues}
                          </span>
                        ) : null}
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Card>

        <Row gutter={20} wrap={false} className="flex-1 items-stretch">
          <Col flex="260px" className="flex min-w-[260px]">
            <Card
              bordered={false}
              className="h-full w-full rounded-3xl border border-white/80 bg-white/90 shadow-[0_20px_48px_rgba(15,23,42,0.08)]"
              bodyStyle={{ padding: 16 }}
            >
              <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                步骤名称
              </Title>
              <div className="flex flex-col gap-3">
                {journeySteps.map((step, index) => {
                  const isActive = step.key === activeStepKey;

                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => setActiveStepKey(step.key)}
                      className={`w-full cursor-pointer rounded-2xl border text-left transition-all duration-200 ${
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)]'
                          : 'border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 px-4 py-4">
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                            isActive
                              ? 'bg-white/12 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <span className="text-sm font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`truncate text-sm font-semibold ${
                              isActive ? 'text-white' : 'text-slate-800'
                            }`}
                          >
                            {step.title}
                          </div>
                          <div
                            className={`mt-1 truncate text-xs ${
                              isActive ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {step.code}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </Col>

          <Col flex="auto" className="flex min-w-0">
            <Card
              bordered={false}
              className="h-full w-full min-w-0 rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
              bodyStyle={{ padding: 24 }}
            >
              <div className="mb-5">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="text-xl font-semibold text-slate-900">
                    开发旅程
                  </div>
                  <a
                    href="https://onebox.huawei.com/v/ae8e6ec514aec0689eb41ea813c9c1e2?type=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1677ff] hover:underline"
                  >
                    查看详细报告
                    <ArrowRightOutlined />
                  </a>
                </div>
                <Text className="text-sm text-slate-500">
                  {/* 当前只展示侧边栏选中步骤的关键信息：阶段判断、3
                  个关键指标、核心动作和优先建议。 */}
                </Text>
              </div>

              <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-xl"
                      style={{
                        color: currentStep.color,
                        background: `${currentStep.color}12`,
                      }}
                    >
                      {currentStep.icon}
                    </div>
                    <div>
                      <Title
                        level={4}
                        style={{ marginTop: 0, marginBottom: 8 }}
                      >
                        {currentStep.title}
                      </Title>
                      <Text className="text-sm leading-6 text-slate-500">
                        {currentStep.description}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      当前得分 {currentStep.score}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getPainClasses(
                        currentStep.painLevel
                      )}`}
                    >
                      {currentStep.painLevel} · {currentStep.painLabel}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      耗时占比 {currentStep.timeShare}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-base font-semibold text-slate-900">
                    关键动作
                  </div>
                  <div className="mt-4 flex items-stretch gap-3 overflow-x-auto pb-1">
                    {keyActionCards.map((action, index) => {
                      const detailItems: ActionDetailRecord[] =
                        action.details ??
                        (action.detail
                          ? action.detail
                              .split('；')
                              .map((item) => item.trim())
                              .filter(Boolean)
                              .map((item) => ({
                                label: 'detail',
                                description: item,
                              }))
                          : []);
                      const hasRichContent =
                        Boolean(action.summary) ||
                        Boolean(action.actionType) ||
                        Boolean(action.status) ||
                        Boolean(action.duration) ||
                        detailItems.length > 0;

                      return (
                        <React.Fragment
                          key={`${currentStep.key}-action-${index}-${action.title}`}
                        >
                          {hasRichContent ? (
                            <div className="flex min-w-[320px] flex-1 flex-col rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)]">
                              <div className="rounded-[20px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex min-w-0 items-start gap-3">
                                    <span
                                      className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-xs font-semibold text-white shadow-[0_6px_14px_rgba(15,23,42,0.12)]"
                                      style={{
                                        backgroundColor: currentStep.color,
                                      }}
                                    >
                                      {index + 1}
                                    </span>
                                    <div className="min-w-0">
                                      <div className="text-[15px] font-semibold leading-6 text-slate-900">
                                        {action.title}
                                      </div>
                                      {action.summary ? (
                                        <Tooltip title={action.summary}>
                                          <div
                                            className="mt-1 text-[13px] leading-5 text-slate-500"
                                            style={{
                                              display: '-webkit-box',
                                              WebkitLineClamp: 2,
                                              WebkitBoxOrient: 'vertical',
                                              overflow: 'hidden',
                                            }}
                                          >
                                            {action.summary}
                                          </div>
                                        </Tooltip>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                                    {action.duration ? (
                                      <div className="text-right">
                                        <div className="mt-1 text-[24px] font-semibold leading-none text-slate-900">
                                          {action.duration}
                                        </div>
                                      </div>
                                    ) : null}
                                    {action.status ? (
                                      <span
                                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getActionStatusClasses(
                                          action.status
                                        )}`}
                                      >
                                        {action.statusLabel ?? action.status}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              {detailItems.length ? (
                                <div className="mt-4 flex flex-1 flex-col gap-2.5">
                                  {detailItems.map(
                                    (detailItem, detailIndex) => (
                                      <div
                                        key={`${action.title}-detail-${detailIndex}`}
                                        className="rounded-2xl border border-slate-200/80 bg-slate-50/75 px-3 py-3"
                                      >
                                        <div className="flex items-start justify-between gap-3">
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-slate-400">
                                              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-semibold text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
                                                {detailIndex + 1}
                                              </span>
                                              <span>{detailItem.label}</span>
                                            </div>
                                            <Tooltip
                                              title={detailItem.description}
                                            >
                                              <div
                                                className="mt-1.5 text-sm font-medium leading-5 text-slate-700"
                                                style={{
                                                  display: '-webkit-box',
                                                  WebkitLineClamp: 2,
                                                  WebkitBoxOrient: 'vertical',
                                                  overflow: 'hidden',
                                                }}
                                              >
                                                {detailItem.description}
                                              </div>
                                            </Tooltip>
                                          </div>
                                          <div className="flex flex-shrink-0 flex-col items-end gap-2">
                                            {detailItem.duration ? (
                                              <div className="text-xs font-semibold text-slate-900">
                                                {detailItem.duration}
                                              </div>
                                            ) : null}
                                            {detailItem.status ? (
                                              <span
                                                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${getActionStatusClasses(
                                                  detailItem.status
                                                )}`}
                                              >
                                                {detailItem.statusLabel ??
                                                  detailItem.status}
                                              </span>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="min-w-[220px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)]">
                              <div className="flex items-start gap-3">
                                <span
                                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                                  style={{ backgroundColor: currentStep.color }}
                                >
                                  {index + 1}
                                </span>
                                <span className="text-sm leading-6 text-slate-600">
                                  {action.title}
                                </span>
                              </div>
                            </div>
                          )}
                          {index < keyActionCards.length - 1 ? (
                            <div className="flex flex-shrink-0 items-center text-slate-300">
                              <ArrowRightOutlined />
                            </div>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-base font-semibold text-slate-900">
                    典型命令 / 工具
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keyTools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.03)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-base font-semibold text-slate-900">
                    关键指标
                  </div>
                  <div className="mt-3 flex items-stretch gap-3 overflow-x-auto pb-1">
                    {keyMetrics.map((metric) => (
                      <div
                        key={`${currentStep.key}-${metric.label}`}
                        className="min-w-[280px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 text-lg font-semibold text-slate-800">
                            {metric.label}
                          </div>
                          <div className="flex-shrink-0 text-[24px] font-semibold leading-none text-slate-900">
                            {metric.value}
                          </div>
                        </div>
                        {metric.trend ? (
                          <MetricTrendChart
                            trend={metric.trend}
                            tone={metric.tone}
                          />
                        ) : (
                          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-3 py-4 text-center text-xs text-slate-400">
                            趋势数据待补充
                          </div>
                        )}
                        <Tooltip title={metric.note}>
                          <div className="mt-3 truncate text-[13px] leading-5 text-slate-500">
                            {metric.note}
                          </div>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-base font-semibold text-slate-900">
                    痛点分析
                  </div>
                  <div className="mt-3 text-sm leading-7 text-slate-500">
                    {currentStep.painSummary}
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.03)]">
                    改进建议：{currentStep.recommendation}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserJourney;
