import React, { useEffect, useState } from 'react';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { CiDimKey, CiProblem, CiRepoData, CiRepoKey } from '../../types';
import { DIM_NAME } from '../../helpers';
import { HintIcon } from '../shared';
import ProblemPanel from '../ProblemPanel';
import { CI_JOURNEY } from './journeyData';

type CiReportOverviewProps = {
  data: CiRepoData;
  repo: CiRepoKey;
  day: string;
  /** 展开面板内问题行点击 → 跳转旅程全景图同段同问题 */
  onProblemJump?: (problem: CiProblem) => void;
};

const DIMENSIONS: Array<{
  key: CiDimKey;
  title: string;
  description: string;
}> = [
  {
    key: 'stability',
    title: '稳定性',
    description: '当日稳定性维度评分，取自验证仓评分口径。',
  },
  {
    key: 'efficiency',
    title: '效率',
    description: '当日效率维度评分，取自验证仓评分口径。',
  },
  {
    key: 'interaction',
    title: '交互体验',
    description: '当日交互体验维度评分，取自验证仓评分口径。',
  },
  {
    key: 'cost',
    title: '成本',
    description: '当日成本维度评分，取自验证仓评分口径。',
  },
];

// 卡片展开面板 key：四维卡展开问题清单；综合卡展开「本页怎么读」
type PanelKey = 'overall' | CiDimKey;

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <b className="font-semibold text-slate-900">{children}</b>
);

/** 「本页怎么读」——分数、问题卡 P 级、状态词的关系（对齐源页面同名折叠卡文案）。 */
const HowToReadPanel: React.FC = () => (
  <div className="flex flex-col gap-2 text-[12.5px] leading-relaxed text-slate-600">
    <p>
      <Strong>两条通道，互不改写</Strong>：<Strong>指标 → 分数</Strong>
      回答「慢性水平好不好」；<Strong>事件 → 问题卡（P0–P2）</Strong>
      回答「今天要不要动手」。分数不含 P
      级、问题卡不改分数——这是防「改分数掩盖问题」的纪律；两者只在下面第④层和状态词处交汇。
    </p>
    <p>
      <Strong>分数有四层</Strong>：
      <br />① <Strong>指标分</Strong>（0–100）：13
      个入分指标各按字典「评分公式」列打分（比例类按固定标准，时长类跟自己的过去比）——模型卡「评分明细」看到的就是它；
      <br />② <Strong>模型分</Strong>：各模型唯一合成公式——稳定性加权
      35/25/25/15，效率加权 50/25/25，交互体验等权 1/4，成本等权 1/2（权重见附录
      A 各模型章头）；
      <br />③ <Strong>总分与等级</Strong>：四模型等权均值；A≥90 / B≥75 / C≥60 /
      D≥40 / F；完结 run&lt;5 当日不打分；
      <Strong>日分仅观察，周定稿分=周内日分中位数</Strong>；
      <br />④ <Strong>旅程段分</Strong>
      （独立体系，不与上面相加）：每段×每模型一个格分（段代表指标打分），段综合=格分等权均值。
      <Strong>P 级只影响这一层</Strong>——段格分封顶 P0≤40 / P1≤60 /
      P2≤75；模型卡分数由全仓指标合成，不由段分加总。
    </p>
    <p>
      <Strong>P 级定义</Strong>：<Strong>P0</Strong>（立刻）= 平台失败聚集 ≥5
      run，或疑似系统性失败达量级条件（涉及 PR ≥ 当日活跃 PR 半数，或持续 ≥2
      天）；<Strong>P1</Strong>（今天派活）= 平台零散 / 疑似系统性失败（基线） /
      超基线 2 倍；<Strong>P2</Strong>（观察）= 其余待定聚集 / 观察项。
    </p>
    <p>
      <Strong>状态词</Strong>：需处理 = 当日有 P0/P1；关注 = 有 P2，或模型分
      ≤40（分数型信号，补触发器无基线时的盲区）；正常 =
      两者皆无。慢性项不驱动状态词，进「长期改进追踪」区。
    </p>
    <p>
      <Strong>触发器</Strong>是两条通道的翻译官：把指标的突变（相对前 7
      日中位）翻译成问题卡；判据见附录 A 各模型章头「触发器」行。
    </p>
  </div>
);

const CiReportOverview: React.FC<CiReportOverviewProps> = ({
  data,
  repo,
  day,
  onProblemJump,
}) => {
  const journey = CI_JOURNEY[repo];
  const board =
    journey.boards[day] ??
    journey.boards[journey.days[journey.days.length - 1]];
  const scores = board?.scores ?? null;
  // 详情面板数据走逐日看板（board.problems / board.metrics），与旅程 scores 并行两套数据源
  const dayBoard =
    data.boards[day] ?? data.boards[data.days[data.days.length - 1]];

  // 选中卡片：四维卡展开「当日问题清单与结果指标」，综合卡展开「本页怎么读」，再次点击收起
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  useEffect(() => {
    setActivePanel(null);
  }, [repo]);

  const dimensionScores = DIMENSIONS.map((dimension) => ({
    ...dimension,
    value: scores?.dims[dimension.key]?.score ?? null,
  }));
  const metrics: Array<{
    key: 'overall' | CiDimKey;
    title: string;
    description: string;
    value: number | null;
  }> = [
    {
      key: 'overall',
      title: '综合体验评分',
      description:
        '当日四维加权综合评分，取自验证仓评分口径（日分仅观察、周分为准）。',
      value: scores?.total ?? null,
    },
    ...dimensionScores,
  ];

  const toggleDim = (key: PanelKey) => {
    setActivePanel((cur) => (cur === key ? null : key));
  };

  return (
    <div>
      <div className="mb-2 text-base font-semibold text-slate-800">
        报告概览
      </div>
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric) => {
          const clickable = metric.key === 'overall' ? true : Boolean(dayBoard);
          const active = clickable && activePanel === metric.key;
          return (
            <div
              key={metric.key}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-pressed={clickable ? active : undefined}
              onClick={clickable ? () => toggleDim(metric.key) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDim(metric.key);
                      }
                    }
                  : undefined
              }
              title={
                clickable
                  ? metric.key === 'overall'
                    ? `点击${
                        active ? '收起' : '展开'
                      }本页怎么读 · 分数、问题卡 P 级、状态词的关系`
                    : `点击${active ? '收起' : '展开'}${
                        metric.title
                      } · 当日问题清单与结果指标`
                  : undefined
              }
              className={`flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-200 ${
                active ? 'ring-2 ring-violet-400' : ''
              } ${
                clickable
                  ? 'cursor-pointer hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)]'
                  : ''
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                  <span className="truncate">{metric.title}</span>
                  <Tooltip title={metric.description}>
                    <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                  </Tooltip>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {metric.value ?? '—'}
                  </div>
                  {metric.value != null ? (
                    <div className="text-sm font-medium text-slate-500">分</div>
                  ) : null}
                </div>
              </div>
              {clickable ? (
                <DownOutlined
                  className={`shrink-0 self-center text-[16px] text-blue-600 transition-transform ${
                    active ? 'rotate-180' : ''
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* 综合卡详情：本页怎么读（对齐设计稿同名折叠卡） */}
      {activePanel === 'overall' ? (
        <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] font-semibold text-slate-900">
                本页怎么读 · 分数、问题卡 P 级、状态词的关系
              </h3>
              <HintIcon title="再次点击综合体验评分卡收起。" />
            </div>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              收起 <DownOutlined className="rotate-180 text-[10px]" />
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <HowToReadPanel />
          </div>
        </div>
      ) : null}

      {/* 维度详情：当日问题清单与结果指标（对齐设计稿「稳定性 · 当日问题清单与结果指标」面板） */}
      {activePanel && activePanel !== 'overall' && dayBoard ? (
        <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] font-semibold text-slate-900">
                {DIM_NAME[activePanel]} · 当日问题清单与结果指标
              </h3>
              <HintIcon title="点击其他维度卡切换；再次点击当前卡收起。" />
            </div>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              收起 <DownOutlined className="rotate-180 text-[10px]" />
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <ProblemPanel
              repo={repo}
              board={dayBoard}
              dim={activePanel}
              onProblemJump={onProblemJump}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CiReportOverview;
