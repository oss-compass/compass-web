import React from 'react';
import {
  LineChartOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import ReportSectionCard from '../../components/ReportSectionCard';
import { getScoreTone } from '../presentation';
import type { IssueExperienceReportData } from '../types';

type IssueReportSignalsProps = {
  context: IssueExperienceReportData['report_context'];
};

const IssueReportSignals: React.FC<IssueReportSignalsProps> = ({ context }) => {
  const currentTrend = context.trend[context.trend.length - 1];
  const hasHistory = context.trend.length > 1;

  return (
    <ReportSectionCard
      id="trend-participants"
      cardIndex={3}
      title="趋势与社区响应者"
      description={
        hasHistory
          ? '按同一口径呈现各周期变化，并同步观察社区响应力量。'
          : '首期报告先建立同口径基线；后续周期将在此呈现变化与行动跟踪。'
      }
      headerMeta={
        <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
          {hasHistory ? `${context.trend.length} PERIODS` : 'BASELINE'}
        </span>
      }
      bodyPadding={false}
    >
      <div className=">lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.85fr)] >lg:divide-x >lg:divide-y-0 grid divide-y divide-slate-100">
        {/* 趋势 / 基线 */}
        <div className=">md:p-5 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <LineChartOutlined className="text-sky-600" />
                {hasHistory ? '体验趋势' : '体验基线'}
              </div>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                {context.trend_summary}
              </p>
            </div>
            {currentTrend ? (
              <div className="flex items-baseline gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
                <span className="text-2xl font-bold tabular-nums leading-none">
                  {currentTrend.idx}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-slate-400">
                  总体分
                </span>
              </div>
            ) : null}
          </div>

          {hasHistory ? (
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {context.trend.map((trend) => (
                <div
                  key={trend.period}
                  className={`min-w-[150px] flex-none rounded-xl border p-3 ${
                    trend.period === currentTrend?.period
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-medium opacity-60">
                    {trend.period_label}
                  </div>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <span className="text-lg font-bold tabular-nums">
                      {trend.idx}
                    </span>
                    <span className="text-[10px] opacity-70">
                      {trend.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {currentTrend ? (
            <div className="mt-5 space-y-2.5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                各阶段得分
              </div>
              {context.stages.map((stage, index) => {
                const alignedIndex = context.stage_ids.indexOf(stage.id);
                const score =
                  currentTrend.stage_scores[
                    alignedIndex >= 0 ? alignedIndex : index
                  ] ?? stage.mixed;
                const tone = getScoreTone(score);
                return (
                  <div key={stage.id} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 truncate text-[12px] font-medium text-slate-600">
                      {stage.id} · {stage.name}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <span
                        className={`block h-full rounded-full ${tone.bar}`}
                        style={{ width: `${Math.max(3, score)}%` }}
                      />
                    </div>
                    <span
                      className={`w-10 shrink-0 text-right text-xs font-bold tabular-nums ${tone.text}`}
                    >
                      {score}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white p-4 text-xs text-slate-500">
              暂无趋势数据
            </div>
          )}

          {currentTrend ? (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
              <span>{currentTrend.period_label}</span>
              <span>{currentTrend.n} 个 Issue 样本</span>
              <span>{currentTrend.delta}</span>
            </div>
          ) : null}
        </div>

        {/* 社区响应者 */}
        <div className=">md:p-5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <TeamOutlined className="text-sky-600" /> 社区响应者
          </div>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            {context.participants.summary}
          </p>

          <div className="mt-4 flex gap-6">
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-900">
                {context.participants.responder_count}
              </div>
              <div className="text-[10px] font-medium text-slate-400">
                响应者
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-900">
                {context.participants.response_count}
              </div>
              <div className="text-[10px] font-medium text-slate-400">
                评论响应
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {context.participants.top_responders.map((responder, index) => (
              <div
                key={responder.name}
                className="flex items-center gap-3 border-t border-slate-100 pt-2 first:border-t-0 first:pt-0"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-500">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-700">
                  {responder.name}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                  <MessageOutlined /> {responder.count}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 border-l-2 border-amber-300 pl-3 text-[11px] leading-5 text-slate-500">
            Top 1 响应集中度 {context.participants.top1_concentration.toFixed(1)}%
            {context.participants.top1_concentration >= 60
              ? '，响应力量较集中，建议逐步建立多维护者轮值。'
              : '，本期响应力量分布相对均衡。'}
          </p>
        </div>
      </div>
    </ReportSectionCard>
  );
};

export default IssueReportSignals;
