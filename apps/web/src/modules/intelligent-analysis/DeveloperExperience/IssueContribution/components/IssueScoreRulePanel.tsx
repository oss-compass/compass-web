import React from 'react';

type MetricRule = {
  stage: string;
  axis: '质量' | '效率';
  name: string;
  weight: string;
  question: string;
  rule: string;
};

const stageRows = [
  { stage: 'I0 创建', weight: '15%', metrics: '分类正确性、输入质量' },
  {
    stage: 'I1 首响与分配',
    weight: '20%',
    metrics: '责任分配速度、首次实质回应时效、首响回复质量、分流与责任明确度',
  },
  {
    stage: 'I2 推进讨论',
    weight: '35%',
    metrics: '讨论推进质量、讨论推进效率',
  },
  {
    stage: 'I3 产出与闭环',
    weight: '30%',
    metrics: '关闭决策正确性、关闭复用价值、推进关闭及时性',
  },
];

const metricRows: MetricRule[] = [
  {
    stage: 'I0',
    axis: '质量',
    name: '分类正确性',
    weight: '50%',
    question: 'Issue 类型是否与实际内容匹配？',
    rule: '100：类型正确；80：仅子类边界模糊；60：存疑但不影响后续；40：明显偏差；20：误判且影响后续；0：完全无法判断。',
  },
  {
    stage: 'I0',
    axis: '质量',
    name: '输入质量',
    weight: '50%',
    question: '是否具备被处理的基本前提？',
    rule: '100：信息齐全；80：仅缺少次要信息；60：补 1 轮后可继续；40：需多轮澄清；20：线索零散；0：正文为空、无关或不可判断。',
  },
  {
    stage: 'I1',
    axis: '效率',
    name: '责任分配速度',
    weight: '25%',
    question: '创建后多久完成责任分配或明确认领？',
    rule: '按 Issue 类型的时效阈值分为 100 / 80 / 60 / 40 / 20；超过最低档阈值或无人承接为 0。',
  },
  {
    stage: 'I1',
    axis: '效率',
    name: '首次实质回应时效',
    weight: '25%',
    question: '创建后多久出现有实质内容的回复？',
    rule: '按 Issue 类型的时效阈值分为 100 / 80 / 60 / 40 / 20；超过最低档阈值或无实质回应为 0。',
  },
  {
    stage: 'I1',
    axis: '质量',
    name: '首响回复质量',
    weight: '25%',
    question: '首次回复对用户是否真正有用？',
    rule: '100：方案、方向、责任和下一步明确；80：有针对性且路径清楚；60：有基本帮助；40：仅确认或模板回复；20：机械安抚；0：无回复。',
  },
  {
    stage: 'I1',
    axis: '质量',
    name: '分流与责任明确度',
    weight: '25%',
    question: '是否交给对的人，且用户知道谁负责？',
    rule: '100：责任人正确、状态和下一步明确；80：承接关系清楚；60：有人负责但边界一般；40：仅口头跟进；20：仅标签或模糊分流；0：无人跟进。',
  },
  {
    stage: 'I2',
    axis: '质量',
    name: '讨论推进质量',
    weight: '50%',
    question: '讨论是否持续产生有效信息并推动问题前进？',
    rule: '100：持续推进并形成明确结果；80：稳定推进；60：有实质推进；40：讨论零散；20：多轮往返无进展；0：无有效推进或长期空转。',
  },
  {
    stage: 'I2',
    axis: '效率',
    name: '讨论推进效率',
    weight: '50%',
    question: '处理中是否存在长期无说明停滞？',
    rule: '按 Issue 类型的停滞时长阈值分为 100 / 80 / 60 / 40 / 20；超过最低档阈值或长期失联为 0。',
  },
  {
    stage: 'I3',
    axis: '质量',
    name: '关闭决策正确性',
    weight: '33%',
    question: '关得对不对，时机是否合理？',
    rule: '100：条件满足且证据充分；80：基本满足且说明清楚；60：基本完成但证据略弱；40：关闭偏早；20：处理不足即关闭；0：误关或无结论关闭。',
  },
  {
    stage: 'I3',
    axis: '质量',
    name: '关闭复用价值',
    weight: '34%',
    question: '关闭后是否留下可复用知识和后续路径？',
    rule: '100：完整复用资产与后续路径；80：资产较完整；60：保留部分信息；40：仅结论说明；20：少量备注；0：无可复用内容。',
  },
  {
    stage: 'I3',
    axis: '效率',
    name: '推进关闭及时性',
    weight: '33%',
    question: '达到关闭条件后，是否被及时关闭？',
    rule: '100：很快关闭；80：较及时；60：有拖延但可接受；40：关闭偏慢；20：明显拖延；0：长期不关或远超合理时点。',
  },
];

const gradeRows = [
  ['TRIVIAL', '90–100', '极致体验', '流程顺畅，几乎无明显体验损耗'],
  ['MINOR', '70–89', '轻微影响', '整体达标，轻微缺口不影响继续参与'],
  ['MAJOR', '50–69', '显著影响', '已有推进，但完整性、确定性或闭环不足'],
  ['CRITICAL', '30–49', '关键卡点', '体验不稳定，需要专项治理'],
  ['BLOCKER', '0–29', '完全阻塞', '阶段体验严重失败，用户难以判断下一步'],
  ['N/A', '无有效样本', '不适用', '不参与评分'],
];

const Table: React.FC<{ headers: string[]; children: React.ReactNode }> = ({
  headers,
  children,
}) => (
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

const IssueScoreRulePanel: React.FC = () => (
  <div className="space-y-6">
    <div>
      <div className="text-sm font-semibold text-slate-900">
        Issue 贡献体验报告得分说明
      </div>
      <div className="mt-2 text-[13px] leading-6 text-slate-600">
        综合体验评分用于评价外部开发者提交 Issue
        后，是否获得及时响应、正确分流、持续推进、合理关闭和可复用结果。正式口径包含四阶段、质量/效率双轴和
        11 项指标。
      </div>
    </div>

    <section className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-900">
        一、阶段与权重
      </div>
      <Table headers={['阶段', '报告权重', '阶段内指标']}>
        {stageRows.map((row) => (
          <tr key={row.stage}>
            <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-slate-900">
              {row.stage}
            </td>
            <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
              {row.weight}
            </td>
            <td className="min-w-[420px] px-4 py-2.5">{row.metrics}</td>
          </tr>
        ))}
      </Table>
    </section>

    <section className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-900">
        二、11 项指标评分细则
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] leading-6 text-slate-700">
        单项指标统一使用 100、80、60、40、20、0 六档；不适用项不计 0
        分，也不进入分母。时效类指标会结合缺陷、需求、咨询、任务等 Issue
        类型使用差异化阈值。
      </div>
      <Table
        headers={['阶段', '轴', '指标', '阶段内权重', '核心问题', '评分规则']}
      >
        {metricRows.map((row) => (
          <tr key={`${row.stage}-${row.name}`}>
            <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">
              {row.stage}
            </td>
            <td className="whitespace-nowrap px-4 py-2.5">{row.axis}</td>
            <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-800">
              {row.name}
            </td>
            <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
              {row.weight}
            </td>
            <td className="min-w-[220px] px-4 py-2.5">{row.question}</td>
            <td className="min-w-[440px] px-4 py-2.5">{row.rule}</td>
          </tr>
        ))}
      </Table>
    </section>

    <section className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-900">
        三、综合得分计算
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[13px] leading-6 text-slate-700">
          <div className="mb-1 font-semibold text-slate-900">阶段分</div>
          Σ（适用指标分 × 阶段内权重）÷ Σ（适用指标权重）
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[13px] leading-6 text-slate-700">
          <div className="mb-1 font-semibold text-slate-900">报告总分</div>
          Σ（报告阶段分 × 阶段权重）÷ Σ（有有效样本的阶段权重）
        </div>
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-6 text-amber-900">
        单条 Issue
        先按有效阶段加权计算原始分；若触发严重问题控制，最终分取“原始分”和“封顶分”中的较小值，避免关键体验失败被其他高分抵消。
      </div>
    </section>

    <section className="space-y-3">
      <div className="text-[13px] font-semibold text-slate-900">
        四、阶段等级
      </div>
      <Table headers={['等级', '分数范围', '含义', '体验说明']}>
        {gradeRows.map(([grade, range, label, desc]) => (
          <tr key={grade}>
            <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">
              {grade}
            </td>
            <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
              {range}
            </td>
            <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-800">
              {label}
            </td>
            <td className="min-w-[360px] px-4 py-2.5">{desc}</td>
          </tr>
        ))}
      </Table>
    </section>
  </div>
);

export default IssueScoreRulePanel;
