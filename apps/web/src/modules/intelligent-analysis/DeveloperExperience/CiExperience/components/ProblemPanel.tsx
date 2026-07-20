import React from 'react';
import type { CiBoard, CiDimKey, CiRepoKey } from '../types';
import { DIM_KEYS, DIM_NAME } from '../helpers';
import { ScrollX, Table, Td, Th } from './Table';
import { Collapsible, EmptyState, ValText } from './shared';
import ProblemCard from './ProblemCard';
import DiagBlock from './DiagBlock';

type DimSelection = CiDimKey | 'all';

type ProblemPanelProps = {
  repo: CiRepoKey;
  board: CiBoard;
  dim: DimSelection;
};

/** 指标表行：[维度, 指标, 当日值, 前 7 日中位, 口径, 备注] */
type MetricDisplayRow = [
  string,
  string,
  CiBoard['metrics'][CiDimKey][number][1],
  CiBoard['metrics'][CiDimKey][number][2],
  string,
  string
];

const ProblemPanel: React.FC<ProblemPanelProps> = ({ repo, board, dim }) => {
  const sel = dim === 'all' ? null : dim;
  const plist = board.problems.filter((p) => !sel || p.dimkey === sel);

  const mrows: MetricDisplayRow[] = sel
    ? board.metrics[sel].map((r) => [DIM_NAME[sel], ...r] as MetricDisplayRow)
    : DIM_KEYS.flatMap((k) =>
        board.metrics[k].map((r) => [DIM_NAME[k], ...r] as MetricDisplayRow)
      );

  const metricsTitle =
    (sel
      ? `${DIM_NAME[sel]} · 指标（结果层为主，诊断层标注）`
      : '指标总表（结果层为主，诊断层标注）') +
    ' · 当日 vs 前 7 日中位（不含当日；基线剔除 run<3 的接入噪声日）';

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

      {/* 问题卡列表 */}
      {plist.length ? (
        <div className="flex flex-col gap-2.5">
          {plist.map((p, i) => (
            <ProblemCard key={`${p.kb}-${i}`} problem={p} repo={repo} />
          ))}
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
              <Th numeric>当日值</Th>
              <Th numeric>前 7 日中位</Th>
              <Th>口径（分子/分母）</Th>
              <Th>备注</Th>
            </tr>
          </thead>
          <tbody>
            {mrows.map((r, i) => (
              <tr key={`${r[0]}-${r[1]}-${i}`}>
                <Td>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td numeric>
                  <ValText value={r[2]} className="font-semibold text-slate-800" />
                </Td>
                <Td numeric>
                  <ValText value={r[3]} />
                </Td>
                <Td>{r[4]}</Td>
                <Td className="text-[11.5px] text-slate-400">{r[5]}</Td>
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
