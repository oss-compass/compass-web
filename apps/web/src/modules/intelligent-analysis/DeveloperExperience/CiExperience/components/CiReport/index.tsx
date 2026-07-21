import React, { useCallback, useEffect, useState } from 'react';
import type { CiDimKey, CiRepoData, CiRepoKey } from '../../types';
import { Collapsible, EmptyState, HintIcon } from '../shared';
import ImprovementCandidates from '../ImprovementCandidates';
import TrendCharts from '../TrendCharts';
import MachineHourBill from '../MachineHourBill';
import BackfillLedger from '../BackfillLedger';
import ScoreCards, { type CiGrain } from './ScoreCards';
import ProblemLocation from './ProblemLocation';
import DeepAnalysis from './DeepAnalysis';

type CiReportProps = {
  data: CiRepoData;
  repo: CiRepoKey;
};

const lastDay = (data: CiRepoData): string =>
  data.days.length ? data.days[data.days.length - 1] : '';

const dayDefaultDim = (data: CiRepoData, day: string): CiDimKey => {
  const board = data.boards[day];
  return board ? board.default_dim : 'stability';
};

/** 简易报告卡壳（圆角白卡，对齐社区报告风格） */
const ReportCard: React.FC<{
  title: string;
  anno?: string;
  children: React.ReactNode;
}> = ({ title, anno, children }) => (
  <section className=">md:p-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
    <div className="mb-3 flex items-center gap-1.5">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {anno ? <HintIcon title={anno} /> : null}
    </div>
    {children}
  </section>
);

/**
 * 报告部分（维度驱动联动区）：
 * 自管 grain / day / dim 状态（切仓重置到最后一天与该日默认维度）。
 * 组织：体验得分（卡内含指标缩略图）→ 问题定位 →（周级专属卡）→ 深度分析。
 */
const CiReport: React.FC<CiReportProps> = ({ data, repo }) => {
  const [grain, setGrain] = useState<CiGrain>('daily');
  const [day, setDay] = useState<string>(() => lastDay(data));
  const [dim, setDim] = useState<CiDimKey>(() =>
    dayDefaultDim(data, lastDay(data))
  );

  // 切仓：回到最后一天 + 该日默认维度 + 日级
  useEffect(() => {
    const nextDay = lastDay(data);
    setGrain('daily');
    setDay(nextDay);
    setDim(dayDefaultDim(data, nextDay));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  // 切日：联动回落到该日默认维度，并切到日级
  const handleSelectDay = useCallback(
    (nextDay: string) => {
      setGrain('daily');
      setDay(nextDay);
      setDim(dayDefaultDim(data, nextDay));
    },
    [data]
  );

  if (!data.days.length) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
        <h2 className="mb-3 text-base font-semibold text-slate-900">报告</h2>
        <EmptyState>该仓库数据落库中，暂无报告内容。</EmptyState>
      </section>
    );
  }

  const currentDay = data.boards[day] ? day : lastDay(data);
  const w = data.weekly;

  return (
    <div className="flex flex-col gap-4">
      {/* 体验得分（含日级/周级切换 + 维度联动入口）；卡内指标内嵌缩略图，问题定位同处一卡 */}
      <ScoreCards
        data={data}
        grain={grain}
        day={currentDay}
        dim={dim}
        onSelectGrain={setGrain}
        onSelectDay={handleSelectDay}
        onSelectDim={setDim}
      >
        {/* 问题定位（随维度 + 日/周联动） */}
        <ProblemLocation
          data={data}
          repo={repo}
          grain={grain}
          day={currentDay}
          dim={dim}
        />
      </ScoreCards>

      {/* 周级专属卡 */}
      {grain === 'weekly' ? (
        <>
          <ReportCard
            title="改进项候选 · 由周问题榜生成"
            anno="P0/P1 条目 × 机理知识库自动预填，周复盘确认后提交 Issue；未回验不关闭"
          >
            <ImprovementCandidates imps={w.imps} />
          </ReportCard>

          <ReportCard
            title="改进效果 · 结果指标趋势与改进项标注"
            anno="改进项落地日画在曲线上；回验 = 落地前后对比 + 跨 2 周期看复发"
          >
            <TrendCharts trends={w.trends} />
          </ReportCard>

          <Collapsible
            className="!rounded-2xl !border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            summary={
              <span className="flex flex-wrap items-baseline gap-2">
                <span className="text-base font-semibold text-slate-900">
                  机时账单 · 资源池 × 阶段
                </span>
                <span className="text-[11.5px] font-normal text-slate-400">
                  CI 资源占用时长细化（点击展开）
                </span>
              </span>
            }
          >
            <MachineHourBill bill={w.bill} />
          </Collapsible>

          <Collapsible
            className="!rounded-2xl !border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            summary={
              <span className="flex flex-wrap items-baseline gap-2">
                <span className="text-base font-semibold text-slate-900">
                  待定/回填台账
                </span>
                <span className="text-[11.5px] font-normal text-slate-400">
                  人工判读在周复盘固定回填（点击展开）
                </span>
              </span>
            }
          >
            <BackfillLedger rows={w.backfill} />
          </Collapsible>
        </>
      ) : null}

      {/* 深度分析（默认折叠） */}
      <DeepAnalysis data={data} />
    </div>
  );
};

export default CiReport;
