import React from 'react';
import type { CiRepoData, CiRepoKey } from '../../types';
import { Collapsible, EmptyState } from '../shared';
import Appendix from '../Appendix';
import CiReportOverview from './CiReportOverview';
import CiJourneyPanorama from './CiJourneyPanorama';
import DailyDrilldown from './DailyDrilldown';
import DeepAnalysis from './DeepAnalysis';

type CiReportProps = {
  data: CiRepoData;
  repo: CiRepoKey;
  day: string;
};

/**
 * 报告部分（开发者旅程全景图驱动）：
 * 体验得分区已重构为开发者旅程全景图（样式借鉴社区入门体验旅程全景图）；
 * 日观测板 / 周复盘切换已隐藏，默认只展示日观测板 → 深度分析 → 附录。
 */
const CiReport: React.FC<CiReportProps> = ({ data, repo, day }) => {
  if (!data.days.length) {
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
        <h2 className="mb-3 text-base font-semibold text-slate-900">报告</h2>
        <EmptyState>该仓库数据落库中，暂无报告内容。</EmptyState>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CiReportOverview repo={repo} day={day} />

        {/* 体验得分（重构为开发者旅程全景图，含段详情：四维度 / 段中位耗时 / 段内问题） */}
        <div className="mt-2 border-slate-100 pt-5">
          <CiJourneyPanorama repo={repo} workflow={data.workflow} day={day} />
        </div>
      </div>

      <DailyDrilldown data={data} day={day} />

      {/* 深度分析（默认折叠） */}
      <DeepAnalysis data={data} />

      {/* 附录 · 口径与来源（默认折叠，与深度分析同级） */}
      <Collapsible
        className="!rounded-2xl !border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
        summary={
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-semibold text-slate-900">
              附录 · 口径与来源
            </span>
            <span className="text-[11.5px] font-normal text-slate-400">
              指标口径与数据来源说明（点击展开）
            </span>
          </span>
        }
      >
        <Appendix />
      </Collapsible>
    </div>
  );
};

export default CiReport;
