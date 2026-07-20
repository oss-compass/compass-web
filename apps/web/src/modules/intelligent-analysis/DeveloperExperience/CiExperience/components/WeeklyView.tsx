import React from 'react';
import type { CiRepoData } from '../types';
import SectionCard from './SectionCard';
import { EmptyState } from './shared';
import WeeklyProblemBoard from './WeeklyProblemBoard';
import ImprovementCandidates from './ImprovementCandidates';
import DimComparison from './DimComparison';
import TrendCharts from './TrendCharts';
import { MatrixCost, MatrixEff, MatrixStab } from './matrices';
import MachineHourBill from './MachineHourBill';
import BackfillLedger from './BackfillLedger';
import PlatformObservability from './PlatformObservability';

type WeeklyViewProps = {
  data: CiRepoData;
  startIndex: number;
};

const h3Cls = 'mb-2 mt-4 text-[13.5px] font-semibold text-slate-800 first:mt-0';

const WeeklyView: React.FC<WeeklyViewProps> = ({ data, startIndex }) => {
  const w = data.weekly;
  const empty = !data.days.length;

  return (
    <>
      <SectionCard
        cardIndex={startIndex}
        title={
          <>
            本周问题榜 ·{' '}
            <span className="font-normal text-slate-500">{w.period}</span>
          </>
        }
        anno="逐日问题按机理跨日聚合：日观测板管「今天派活」，周复盘管「本周立项与回验」；周边界=自然周（周一~周日）"
      >
        {empty ? (
          <EmptyState>该仓库数据落库中，暂无周复盘内容。</EmptyState>
        ) : (
          <WeeklyProblemBoard probs={w.probs} />
        )}
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 1}
        title="改进项候选 · 由周问题榜生成"
        anno="P0/P1 条目 × 机理知识库（action/回验口径）自动预填，周复盘确认后提交 cann/infrastructure Issue；未回验不关闭。不再手写改进项——消灭第二事实来源"
      >
        <ImprovementCandidates imps={w.imps} />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 2}
        title="四维度周对比 · 本周 vs 上周"
        anno="各日值取周中位；首周上周列为 —，下周起成对出现"
      >
        <DimComparison rows={w.dimcmp} />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 3}
        title="改进效果 · 结果指标趋势与改进项标注"
        anno="改进项落地日画在曲线上；回验 = 落地前后对比 + 跨 2 周期看复发"
      >
        <TrendCharts trends={w.trends} />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 4}
        title="本周分析 · 三矩阵（周汇总）"
        anno="与日观测板同构：稳定性=失败全景；效率=对上周基线；成本=机时归属周合计"
      >
        {empty ? (
          <EmptyState>该仓库数据落库中，暂无周汇总矩阵。</EmptyState>
        ) : (
          <div className="flex flex-col gap-1">
            <h3 className={h3Cls}>① 稳定性 · 阶段 × 失败分类（周汇总）</h3>
            <MatrixStab m={w.matrices.stab} />
            <h3 className={h3Cls}>② 效率 · 阶段 × 耗时统计（周中位，基线=上周）</h3>
            <MatrixEff m={w.matrices.eff} />
            <h3 className={h3Cls}>③ 成本 · 阶段 × 机时归属（周合计，分钟）</h3>
            <MatrixCost m={w.matrices.cost} />
          </div>
        )}
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 5}
        title="机时账单 · 资源池 × 阶段"
        anno="CI 资源占用时长细化；利用率待池容量数据（团队提供中）"
      >
        <MachineHourBill bill={w.bill} />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 6}
        title="待定/回填台账"
        anno="疑似系统性同挂与待定类的人工判读在周复盘固定回填：确认共因→改判平台失败；排除→解除暂缓归代码失败"
      >
        <BackfillLedger rows={w.backfill} />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 7}
        title="平台可观测性面板"
        anno="GitCode Action 平台能力清单，兼作对平台的需求台账；完备度提升 = 指标从近似升精确"
      >
        <PlatformObservability />
      </SectionCard>

      <SectionCard cardIndex={startIndex + 8} title="上期回验">
        <EmptyState>
          基线周（验证阶段首期），无上期改进项可回验；下期起逐条回填绑定结果指标的前后对比。未回验的改进项不得关闭。
        </EmptyState>
      </SectionCard>
    </>
  );
};

export default WeeklyView;
