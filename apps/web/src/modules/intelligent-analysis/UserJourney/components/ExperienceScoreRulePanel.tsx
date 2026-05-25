import React from 'react';

type ScoreMetricItem = {
  id: string;
  name: string;
  description: string;
  unit: string;
  baseline: string;
  formula: string;
};

const stageRows = [
  { step: 'S0', name: '搜索与发现', task: '搜索并验证官方文档、源码仓库' },
  { step: 'S1', name: '环境准备', task: '代码克隆、环境预检、依赖安装' },
  { step: 'S2', name: '快速体验', task: '阅读 QuickStart 文档并运行样例' },
  { step: 'S3', name: '开发编译', task: '代码修改、按文档编译安装、运行验证' },
  { step: 'S4', name: '测试验证', task: '运行完整测试套件' },
];

const painRangeRows = [
  { painCount: '0 个', level: '极致体验', range: '[95, 100]' },
  { painCount: '1 个', level: '轻微影响', range: '[80, 94]' },
  { painCount: '2 个', level: '显著影响', range: '[60, 79]' },
  { painCount: '≥ 3 个', level: '关键卡点', range: '[1, 59]' },
  { painCount: '任务失败', level: '完全阻塞', range: '[0, 0]' },
];

const gradeRows = [
  {
    grade: 'A',
    range: '90 — 100',
    zh: '卓越',
    en: 'Excellent',
    desc: '外部开发者可在15-30分钟内丝滑跑通Quick Start全流程',
  },
  {
    grade: 'B',
    range: '75 — 89',
    zh: '良好',
    en: 'Good',
    desc: '有小摩擦但不阻塞，30分钟-1小时内可完成全流程',
  },
  {
    grade: 'C',
    range: '60 — 74',
    zh: '合格',
    en: 'Acceptable',
    desc: '存在显著痛点但可绕过，需1-2小时，可能需查阅社区问答',
  },
  {
    grade: 'D',
    range: '40 — 59',
    zh: '欠佳',
    en: 'Poor',
    desc: '多处阻塞需社区求助，超2小时，首次成功率<50%',
  },
  {
    grade: 'F',
    range: '0 — 39',
    zh: '不合格',
    en: 'Failing',
    desc: '无法独立完成，需内部团队支持或线下指导',
  },
];

const metricsByStage: Array<{ title: string; rows: ScoreMetricItem[] }> = [
  {
    title: 'S0 搜索与发现',
    rows: [
      {
        id: 'SDX_SEARCH_ROUNDS',
        name: '搜索轮次',
        description:
          '发现阶段所有任务的 web_search 总次数，基准=任务数（每任务各1次为正常）',
        unit: 'count',
        baseline: '动态（任务数，≥1）',
        formula: '100 - (轮次 - 基准) × 25，min=0',
      },
      {
        id: 'SDX_SEARCH_TIME_SEC',
        name: '搜索耗时',
        description: '定位仓库的总耗时',
        unit: 'seconds',
        baseline: '600',
        formula: '<600s→100，<900s→75，<1500s→50，<3000s→25，else→0',
      },
      {
        id: 'SDX_SEARCH_DIRECT_HIT_RATE',
        name: '直达率',
        description: '首次搜索即命中正确仓库 URL 的概率',
        unit: 'percentage',
        baseline: '100',
        formula:
          'search_count==1 且 success=True→100；search_count≥2 且 success=True→0；success=False→0；无 web_search 或无 discovery_repo→N/A',
      },
      {
        id: 'SDX_NAMING_CONFUSION_COUNT',
        name: '命名混淆数',
        description: '项目/仓库命名产生歧义的数量',
        unit: 'count',
        baseline: '0',
        formula: '100 - 混淆次数 × 20，min=0',
      },
      {
        id: 'SDX_PLATFORM_MIGRATION_FRICTION',
        name: '平台迁移摩擦',
        description: '跨平台迁移导致的信息断裂程度',
        unit: '0-100 scale',
        baseline: '0',
        formula: 'friction = min(100, (平台数-1)×25)；score = 100 - friction',
      },
    ],
  },
  {
    title: 'S1 环境准备',
    rows: [
      {
        id: 'SDX_ENV_INIT_TIME_SEC',
        name: '环境初始化耗时',
        description: '从空环境到可编译的总配置时间',
        unit: 'seconds',
        baseline: '600',
        formula: '<600s→100，<1500s→75，<3000s→50，<9000s→25，else→0',
      },
      {
        id: 'SDX_ENV_STEP_COUNT',
        name: '环境配置步数',
        description: '从零到环境就绪的操作步骤数',
        unit: 'count',
        baseline: '2',
        formula: 'min(100, max(0, 100 - (步数 - 2) × 10))；基准=2步',
      },
      {
        id: 'SDX_ENV_PERSISTENCE',
        name: '环境持久化',
        description: '环境配置是否可跨会话保留',
        unit: 'boolean',
        baseline: 'True',
        formula:
          '容器化（级别3）→100，系统级安装（级别2）→80，工具已存在（级别1）→50，未知（级别0）→30',
      },
      {
        id: 'SDX_ENV_HARDWARE_COST_USD',
        name: '硬件成本',
        description: '获取可用开发硬件的最低成本',
        unit: 'USD',
        baseline: '0',
        formula: '固定 100',
      },
      {
        id: 'SDX_ENV_CLOUD_SESSION_LIMIT_SEC',
        name: '云环境时限',
        description: '云开发环境的单次会话时长限制',
        unit: 'seconds',
        baseline: 'unlimited',
        formula: '固定 100',
      },
      {
        id: 'SDX_CLONE_SUCCESS_RATE',
        name: '克隆成功率',
        description: '首次 git clone 成功的概率',
        unit: 'percentage',
        baseline: '100',
        formula:
          '成功→100，失败→0；无 clone 任务：整体成功→100，否则→50；无数据→N/A',
      },
      {
        id: 'SDX_CLONE_TIME_SEC',
        name: '克隆耗时',
        description: 'git clone 操作的实际耗时',
        unit: 'seconds',
        baseline: '180',
        formula: '<180s→100，<360s→75，<720s→50，<1800s→25，else→0',
      },
      {
        id: 'SDX_DEPENDENCY_TRANSPARENCY',
        name: '依赖透明度',
        description: '依赖是否在文档中明确列出且版本锁定',
        unit: '0-100 scale',
        baseline: '80',
        formula:
          '三方库（max 50）：锁文件→50，精确版本→40，模糊版本→20，仅包名→15，仅安装命令→10，无→0；CANN/CUDA（max 30）：具体版本号→30，仅关键词→10，无→0；硬件（max 20）：具体型号→20，泛指 GPU/NPU→5，无→0',
      },
    ],
  },
  {
    title: 'S2 快速体验',
    rows: [
      {
        id: 'SDX_DOC_JUMPS',
        name: '文档跳转数',
        description: '完成 Quick Start 需跨越的不同域名数',
        unit: 'count',
        baseline: '2',
        formula: '100 - (域名数 - 2) × 15，min=0，max=100',
      },
      {
        id: 'SDX_DOC_DEAD_LINKS',
        name: '死链数',
        description: 'Quick Start 中不可访问的超链接数',
        unit: 'count',
        baseline: '0',
        formula: '100 - 死链数 × 20，min=0',
      },
      {
        id: 'SDX_DOC_SELF_CONTAINED_RATIO',
        name: '文档自包含度',
        description:
          'Quick Start 所需信息中，文档内直接提供的比例（文档覆盖步骤数 / Agent 构建步骤总数 × 100）',
        unit: 'percentage',
        baseline: '80',
        formula: '无构建步骤时：成功→80，否则→50',
      },
      {
        id: 'SDX_BUILD_TIME_SEC',
        name: '编译耗时',
        description: '首次编译的总耗时',
        unit: 'seconds',
        baseline: '600',
        formula: '<600s→100，<1800s→75，<4800s→50，<9000s→25，else→0',
      },
      {
        id: 'SDX_BUILD_PARAM_COUNT',
        name: '构建参数数',
        description: '构建脚本的可选参数总数',
        unit: 'count',
        baseline: '5',
        formula: '<5→100，<10→75，<20→50，<30→25，else→0',
      },
      {
        id: 'SDX_BUILD_ERROR_DIAGNOSABILITY',
        name: '报错可诊断性',
        description: '编译报错信息是否包含修复建议',
        unit: '0-100 scale',
        baseline: '80',
        formula:
          '无 build/run 错误→100；可诊断错误数 / 错误总数 × 100；无 build/run 数据→N/A',
      },
      {
        id: 'SDX_BUILD_FIRST_TRY_SUCCESS',
        name: '首次构建成功率',
        description: '首次执行构建命令是否成功，无需重试',
        unit: 'percentage',
        baseline: '100',
        formula:
          '首次 build/run 即成功（无失败）→100；有失败但后续成功→30；最终失败→0；无数据→N/A',
      },
      {
        id: 'SDX_QUICKSTART_RUN_SUCCESS',
        name: 'QuickStart 成功率',
        description: '最后一个关键 build/run 调用是否成功',
        unit: 'percentage',
        baseline: '100',
        formula:
          '首个 build/run 即成功（prior_failures==0）→100；前面有失败但最后成功→50；最后失败→0；无数据→N/A',
      },
    ],
  },
  {
    title: 'S3 开发编译',
    rows: [
      {
        id: 'SDX_BUILD_TIME_SEC',
        name: '编译耗时',
        description: '首次编译的总耗时',
        unit: 'seconds',
        baseline: '600',
        formula: '<600s→100，<1800s→75，<4800s→50，<9000s→25，else→0',
      },
      {
        id: 'SDX_BUILD_PARAM_COUNT',
        name: '构建参数数',
        description: '构建脚本的可选参数总数',
        unit: 'count',
        baseline: '5',
        formula: '<5→100，<10→75，<20→50，<30→25，else→0',
      },
      {
        id: 'SDX_BUILD_ERROR_DIAGNOSABILITY',
        name: '报错可诊断性',
        description: '编译报错信息是否包含修复建议',
        unit: '0-100 scale',
        baseline: '80',
        formula:
          '无 build/run 错误→100；可诊断错误数 / 错误总数 × 100；无 build/run 数据→N/A',
      },
      {
        id: 'SDX_BUILD_FIRST_TRY_SUCCESS',
        name: '首次构建成功率',
        description: '首次执行构建命令是否成功，无需重试',
        unit: 'percentage',
        baseline: '100',
        formula:
          '首次 build/run 即成功（无失败）→100；有失败但后续成功→30；最终失败→0；无数据→N/A',
      },
      {
        id: 'SDX_QUICKSTART_RUN_SUCCESS',
        name: '运行成功率',
        description: '最后一个关键 build/run 调用是否成功',
        unit: 'percentage',
        baseline: '100',
        formula:
          '首个 build/run 即成功（prior_failures==0）→100；前面有失败但最后成功→50；最后失败→0；无数据→N/A',
      },
      {
        id: 'SDX_DEPLOY_VERIFY_AVAILABLE',
        name: '部署验证可用',
        description: '是否提供安装后验证命令',
        unit: 'boolean',
        baseline: 'True',
        formula: '全部成功→100，有失败→40；无此类任务→N/A',
      },
      {
        id: 'SDX_DEPLOY_IDEMPOTENT',
        name: '部署幂等性',
        description: '重复安装是否安全',
        unit: 'boolean',
        baseline: 'True',
        formula: '幂等→100，非幂等→50；无部署任务→N/A',
      },
      {
        id: 'SDX_RUN_OUTPUT_READABILITY',
        name: '输出可读性',
        description: '运行结果是否明确指示成功/失败',
        unit: '0-100 scale',
        baseline: '80',
        formula: '清晰输出数 / 总输出数 × 100；无数据→N/A',
      },
      {
        id: 'SDX_RUN_MODE_COMBINATIONS',
        name: '运行模式组合数',
        description: '需理解的运行模式种类数',
        unit: 'count',
        baseline: '1',
        formula: '1→100，2→80，≤4→60，≤8→40，else→20；无数据→N/A',
      },
    ],
  },
  {
    title: 'S4 测试验证',
    rows: [
      {
        id: 'SDX_RUN_OUTPUT_READABILITY',
        name: '输出可读性',
        description: '运行结果是否明确指示成功/失败',
        unit: '0-100 scale',
        baseline: '80',
        formula: '清晰输出数 / 总输出数 × 100；无数据→N/A',
      },
      {
        id: 'SDX_RUN_MODE_COMBINATIONS',
        name: '运行模式组合数',
        description: '需理解的运行模式种类数',
        unit: 'count',
        baseline: '1',
        formula: '1→100，2→80，≤4→60，≤8→40，else→20；无数据→N/A',
      },
      {
        id: 'SDX_TEST_SUITE_PASS_RATE',
        name: '测试套件通过率',
        description: '运行完整测试套件后通过的测试用例比例',
        unit: 'percentage',
        baseline: '95',
        formula: '≥95%→100，≥80%→75，≥60%→50，≥40%→25，else→0',
      },
      {
        id: 'SDX_TEST_EXECUTION_TIME_SEC',
        name: '测试执行耗时',
        description: '运行完整测试套件的总时间',
        unit: 'seconds',
        baseline: '600',
        formula:
          '<600s→100，<3000s→75，<9000s→50，<18000s→25，else→0；无数据→N/A',
      },
      {
        id: 'SDX_TEST_COVERAGE_AVAILABLE',
        name: '测试覆盖率可见性',
        description: '测试结果中是否提供覆盖率报告',
        unit: 'boolean',
        baseline: 'True',
        formula: '有→100，无→40；无数据→N/A',
      },
    ],
  },
];

const Table: React.FC<{
  headers: string[];
  children: React.ReactNode;
}> = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full border-collapse text-left text-[13px] leading-6 text-slate-700">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap border-b border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">{children}</tbody>
      </table>
    </div>
  );
};

export type ExperienceScoreRulePanelProps = {
  variant?: 'popover' | 'page';
};

const ExperienceScoreRulePanel: React.FC<ExperienceScoreRulePanelProps> = ({
  variant = 'page',
}) => {
  const body = (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold text-slate-900">
          社区入门体验报告得分说明
        </div>
        <div className="mt-2 text-[13px] leading-6 text-slate-600">
          本说明用于解释 SDX（Software Developer
          Experience）评测报告中综合得分的计算逻辑与含义。
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-[13px] font-semibold text-slate-900">
          一、评测流程概览
        </div>
        <Table headers={['步骤', '阶段名称', '核心任务']}>
          {stageRows.map((row) => (
            <tr key={row.step}>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">
                {row.step}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-800">
                {row.name}
              </td>
              <td className="px-4 py-2.5 text-slate-700">{row.task}</td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="space-y-4">
        <div className="text-[13px] font-semibold text-slate-900">
          二、每步骤得分计算
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-700">
            2.1 第一步：确定分数区间
          </div>
          <Table headers={['痛点数量', '等级', '分数区间 [lo, hi]']}>
            {painRangeRows.map((row) => (
              <tr key={row.level}>
                <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                  {row.painCount}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-800">
                  {row.level}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">
                  {row.range}
                </td>
              </tr>
            ))}
          </Table>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] leading-6 text-slate-700">
            <span className="font-semibold text-slate-900">痛点</span>
            ：指在该步骤中被 Agent
            识别并记录的体验障碍（如文档缺失、命令失败、依赖冲突等）。
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-700">
            2.2 第二步：区间内精细化
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] leading-6 text-slate-700">
            在确定分数区间 [lo, hi] 后，用该步骤所有 SDX
            客观指标的均分（step_metrics_avg）在区间内线性映射，得到最终步骤得分：
          </div>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 text-xs leading-5 text-slate-100">
            {`step_metrics_avg = 该步骤所有 SDX 指标得分的均值

step_score = round(lo + (hi - lo) × step_metrics_avg / 100)
step_score = max(lo, min(hi, step_score))`}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-[13px] font-semibold text-slate-900">
          三、SDX 指标说明
        </div>
        <div className="space-y-5">
          {metricsByStage.map((stage) => (
            <div key={stage.title} className="space-y-2">
              <div className="text-xs font-semibold text-slate-700">
                {stage.title}
              </div>
              <Table
                headers={[
                  '指标 ID',
                  '指标名称',
                  '描述',
                  '单位',
                  '基准值',
                  '评分公式',
                ]}
              >
                {stage.rows.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">
                      {row.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-800">
                      {row.name}
                    </td>
                    <td className="min-w-[260px] px-4 py-2.5 text-slate-700">
                      {row.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                      {row.unit}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                      {row.baseline}
                    </td>
                    <td className="min-w-[320px] px-4 py-2.5 text-slate-700">
                      {row.formula}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-[13px] font-semibold text-slate-900">
          四、综合得分计算
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] leading-6 text-slate-700">
          将已执行步骤的得分加总取平均。未执行步骤不计入分子，也不计入分母；如果没有任何已执行步骤，则不计算综合得分：
        </div>
        <pre className="overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 text-xs leading-5 text-slate-100">
          {`executed_step_scores = [step_score for step_score in all_step_scores if step_score is not None]

final_score = round(sum(executed_step_scores) / len(executed_step_scores))`}
        </pre>
      </div>

      <div className="space-y-3">
        <div className="text-[13px] font-semibold text-slate-900">
          五、最终等级
        </div>
        <Table
          headers={['等级', '分数范围', '等级名称', 'Grade Name', '体验描述']}
        >
          {gradeRows.map((row) => (
            <tr key={row.grade}>
              <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-slate-900">
                {row.grade}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">
                {row.range}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-800">
                {row.zh}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                {row.en}
              </td>
              <td className="min-w-[320px] px-4 py-2.5 text-slate-700">
                {row.desc}
              </td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="space-y-3">
        <div className="text-[13px] font-semibold text-slate-900">
          六、计算示例
        </div>
        <div className="grid gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold text-slate-700">场景 1</div>
            <div className="mt-2 text-[13px] leading-6 text-slate-600">
              S0~S4 均成功执行，但痛点数量与指标均分不同。
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 text-xs leading-5 text-slate-100">
              {`final_score = round((25 + 43 + 100 + 93 + 99) / 5) = 72  →  等级 C`}
            </pre>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold text-slate-700">场景 2</div>
            <div className="mt-2 text-[13px] leading-6 text-slate-600">
              S4 任务失败导致该步骤得分为 0，其它步骤正常。
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 text-xs leading-5 text-slate-100">
              {`final_score = round((100 + 75 + 72 + 99 + 0) / 5) = 69  →  等级 C`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === 'popover') {
    return (
      <div className="w-[920px] max-w-[calc(100vw-64px)] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">
            综合体验评分规则
          </div>
          <div className="text-xs font-medium text-slate-500">
            鼠标滚动查看更多
          </div>
        </div>
        <div className="max-h-[70vh] overflow-auto px-4 py-4">{body}</div>
      </div>
    );
  }

  return <div className="w-full">{body}</div>;
};

export default ExperienceScoreRulePanel;
