import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import type {
  CiBoard,
  CiDimKey,
  CiMetricRow,
  CiProblem,
  CiRepoKey,
} from '../types';
import { DIM_KEYS, DIM_NAME } from '../helpers';
import { ScrollX, Table, Td, Th } from './Table';
import { Collapsible, DimTag, EmptyState, PriBadge, ValText } from './shared';
import ProblemCard from './ProblemCard';
import DiagBlock from './DiagBlock';

type DimSelection = CiDimKey | 'all';

type ProblemPanelProps = {
  repo: CiRepoKey;
  board: CiBoard;
  dim: DimSelection;
  /** 提供时问题改为紧凑行（不可展开），点击跳转到旅程全景图同段同问题 */
  onProblemJump?: (problem: CiProblem) => void;
};

/** 指标表行：[维度名, 指标行] */
type MetricDisplayRow = [string, CiMetricRow];

/** 紧凑问题行：仅 tag + 标题，不可展开；点击跳转到旅程全景图同段同问题 */
const ProblemJumpRow: React.FC<{
  problem: CiProblem;
  onJump: (problem: CiProblem) => void;
}> = ({ problem, onJump }) => (
  <button
    type="button"
    onClick={() => onJump(problem)}
    title="点击定位到开发者旅程全景图中的同一问题"
    className="group flex w-full items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition-all hover:border-violet-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
  >
    <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-[13px] font-semibold text-slate-800">
      <PriBadge p={problem.pri} />
      <DimTag>{problem.dim}</DimTag>
      <span className="inline-block rounded border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-600">
        {problem.seg || '跨段/未映射'}
      </span>
      <span className="text-slate-800">{problem.title}</span>
    </span>
    <span className="flex shrink-0 items-center gap-1 pt-0.5 text-[11.5px] font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
      查看详情 <ArrowRightOutlined className="text-[10px]" />
    </span>
  </button>
);

const ProblemPanel: React.FC<ProblemPanelProps> = ({
  repo,
  board,
  dim,
  onProblemJump,
}) => {
  const sel = dim === 'all' ? null : dim;
  const plist = board.problems.filter((p) => !sel || p.dimkey === sel);

  const mrows: MetricDisplayRow[] = sel
    ? board.metrics[sel].map((r) => [DIM_NAME[sel], r] as MetricDisplayRow)
    : DIM_KEYS.flatMap((k) =>
        board.metrics[k].map((r) => [DIM_NAME[k], r] as MetricDisplayRow)
      );

  const metricsTitle =
    (sel
      ? `${DIM_NAME[sel]} · 指标（入分指标标注，其余为诊断附属）`
      : '指标总表（入分指标标注，其余为诊断附属）') +
    ' · 当日 vs 前 7 日中位（不含当日；基线剔除 run<3 的接入噪声日）；口径见附录指标字典';

  const diagKeys: CiDimKey[] = sel ? [sel] : DIM_KEYS;

  // 空态文案（对齐设计稿 render 分支）
  const emptyText = (() => {
    if (!sel) {
      return '当日无 P0/P1/P2 问题——失败均为常规代码类，走贡献者通道。';
    }
    const sd = board.dims.find((x) => x.key === sel);
    if (sd && sd.note) {
      return `${DIM_NAME[sel]} 今日无新增问题；状态「${sd.word}」原因：${sd.note}。`;
    }
    return `${DIM_NAME[sel]} 今日无需处理事项。`;
  })();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11.5px] leading-relaxed text-slate-400">
        问题 = 现象 + 影响面 + 可能根因 + 全量 run×PR 映射（不省略）+
        建议动作。<b className="font-semibold text-slate-600">
          根因只来自机理知识库（人工审定）
        </b>
        ；分类器遇到新机理只给现象与日志证据，标「待人工判读」，不即兴生成根因。优先级：P0
        = 平台失败聚集 ≥5 run；P1 = 平台零散 / 系统性同挂 / 超基线 2 倍；P2 = 待定聚集 /
        观察项。
      </p>

      {/* 问题卡列表：有 onProblemJump 时渲染紧凑跳转行（tag+标题，点击定位全景图），否则保持可展开卡 */}
      {plist.length ? (
        <div className="flex flex-col gap-2.5">
          {plist.map((p, i) =>
            onProblemJump ? (
              <ProblemJumpRow
                key={`${p.kb}-${i}`}
                problem={p}
                onJump={onProblemJump}
              />
            ) : (
              <ProblemCard key={`${p.kb}-${i}`} problem={p} repo={repo} />
            )
          )}
        </div>
      ) : (
        <EmptyState>{emptyText}</EmptyState>
      )}

      {/* 指标总表 */}
      <h3 className="mt-1 text-[13.5px] font-semibold text-slate-800">
        {metricsTitle}
      </h3>
      <ScrollX>
        <Table>
          <thead>
            <tr>
              <Th>维度</Th>
              <Th>指标</Th>
              <Th>旅程段</Th>
              <Th numeric>当日值</Th>
              <Th numeric>前 7 日中位</Th>
              <Th>备注</Th>
            </tr>
          </thead>
          <tbody>
            {mrows.map(([dimName, r], i) => (
              <tr key={`${dimName}-${r.label}-${i}`}>
                <Td>{dimName}</Td>
                <Td>
                  <span className="inline-flex flex-wrap items-center gap-1.5">
                    {r.label}
                    {r.score ? (
                      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                        入分
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                        诊断附属
                      </span>
                    )}
                  </span>
                </Td>
                <Td className="text-[11.5px] text-slate-500">{r.seg || '—'}</Td>
                <Td numeric>
                  <ValText
                    value={r.cur}
                    className="font-semibold text-slate-800"
                  />
                </Td>
                <Td numeric>
                  <ValText value={r.base} />
                </Td>
                <Td className="text-[11.5px] text-slate-400">{r.note || ''}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollX>

      {/* 维度细分（诊断指标）折叠块 */}
      <div className="flex flex-col gap-2">
        {diagKeys.map((k) => (
          <Collapsible
            key={k}
            summary={`${DIM_NAME[k]} · 细分（诊断指标）`}
          >
            <DiagBlock dimKey={k} diag={board.diag} />
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default ProblemPanel;
