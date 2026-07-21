import React, { type ReactNode } from 'react';
import type { CiRepoData } from '../../types';
import { Collapsible } from '../shared';
import { computeFindings, type CiFindingsModel } from './metrics';

type FindingTone = 'crit' | 'warn' | 'good';

const TONE: Record<FindingTone, { bar: string; badge: string }> = {
  crit: {
    bar: 'border-l-rose-400',
    badge: 'border-rose-200 bg-rose-50 text-rose-700',
  },
  warn: {
    bar: 'border-l-amber-400',
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  good: {
    bar: 'border-l-emerald-400',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
};

const TONE_TEXT: Record<FindingTone, string> = {
  crit: '重点',
  warn: '关注',
  good: '平稳',
};

const B: React.FC<{ children: ReactNode }> = ({ children }) => (
  <b className="font-semibold text-slate-800">{children}</b>
);

type Finding = {
  tone: FindingTone;
  title: string;
  body: ReactNode;
  ev: string;
  action: string;
};

/** 由计算模型生成四条结论（移植 dashboard renderBottom findings 文案） */
const buildFindings = (m: CiFindingsModel): Finding[] => {
  const platMedTxt = m.platMed != null ? m.platMed.toFixed(0) : '—';
  const durMedTxt = m.durMed != null ? m.durMed.toFixed(1) : '—';
  const blk0Txt = m.blk0 != null ? m.blk0 : '—';
  const blkLTxt = m.blkL != null ? m.blkL : '—';
  const climbing = m.blk0 != null && m.blkL != null && m.blkL > m.blk0;
  const stab = m.topStab;
  const eff = m.effProb;
  return [
    {
      tone: 'crit',
      title: '稳定性：失败主要是平台的锅，不是贡献者代码',
      body: (
        <>
          平台故障占比窗口中位 <B>{platMedTxt}%</B>
          {stab ? (
            <>
              ；头号机理「{stab.kb}」累计{' '}
              <B>
                {stab.runs} run / {stab.prs} PR
              </B>
              ，命中 {stab.days_hit} 天，当前<B>{stab.status}</B>。
            </>
          ) : (
            '。'
          )}
        </>
      ),
      ev: '支撑：问题管理 + 平台故障占比日趋势。',
      action: stab
        ? `${stab.action || '按机理知识库根因治理'} → ${
            stab.dest || '基础设施团队'
          }`
        : '按机理知识库根因治理 → 基础设施团队',
    },
    {
      tone: 'warn',
      title: '成本：算力浪费集中在平台侧，可回收',
      body: (
        <>
          窗口无效机时累计 <B>{m.totWaste.toFixed(0)} 机时</B>
          ；成本矩阵中「平台失败废弃+取消占用」约占总机时 <B>{m.wasteShare}%</B>
          （代码失败消耗属正常拦截成本，不计入）。
        </>
      ),
      ev: '支撑：成本矩阵（阶段×机时归属）+ 无效机时日趋势。',
      action:
        '治理平台故障与取消占用即可回收；NPU 池容量数据补齐后核算利用率 → 基础设施团队',
    },
    {
      tone: 'warn',
      title: '交互体验：被卡住的 PR 在累积，开发者受影响',
      body: (
        <>
          被 CI 卡住的 PR 由窗口初 <B>{blk0Txt}</B> 升至最新 <B>{blkLTxt}</B> 个
          {climbing ? '（持续累积）' : ''}；与平台故障拦截 PR 直接相关。
        </>
      ),
      ev: '支撑：被 CI 卡住的 PR 日趋势 + 稳定性问题的跨维度影响。',
      action:
        '平台故障拦截的 PR 优先解阻；失败信息可读性需求提交平台 → 基础设施团队',
    },
    {
      tone: 'good',
      title: '效率：主干反馈稳定，个别阶段需盯',
      body: (
        <>
          流水线时长中位窗口 <B>{durMedTxt} min</B>，总体平稳；
          {eff
            ? `但「${eff.kb}」${eff.stages || ''}耗时上浮（${
                eff.status
              }），需连续观察。`
            : '无显著效率退化。'}
        </>
      ),
      ev: '支撑：效率矩阵（阶段×耗时，对前 7 日基线）+ 流水线时长日趋势。',
      action: eff ? '对超基线阶段持续观察，暂不立项 → 观察' : '保持，无需动作',
    },
  ];
};

/**
 * 深度分析卡（默认折叠）：四条结论与建议行动。
 */
const DeepAnalysis: React.FC<{ data: CiRepoData }> = ({ data }) => {
  if (!data.days.length) {
    return null;
  }
  const m = computeFindings(data);
  const findings = buildFindings(m);
  const pendTxt = m.pendLast != null ? `${m.pendLast}%` : '—';

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <Collapsible
        className="!rounded-2xl !border-0"
        summary={
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-semibold text-slate-900">
              深度分析
            </span>
            <span className="text-[11.5px] font-normal text-slate-400">
              结论与建议行动（点击展开）
            </span>
          </span>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[13.5px] font-semibold text-slate-800">
              结论与建议行动
              <span className="ml-2 text-[11.5px] font-normal text-slate-400">
                每条结论都对应支撑数据与下一步该做什么；不打总分
              </span>
            </h3>
            <div className=">lg:grid-cols-2 mt-3 grid grid-cols-1 gap-3">
              {findings.map((f, i) => (
                <div
                  key={i}
                  className={`rounded-xl border border-l-4 border-slate-200 bg-white p-4 ${
                    TONE[f.tone].bar
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10.5px] font-semibold ${
                        TONE[f.tone].badge
                      }`}
                    >
                      {TONE_TEXT[f.tone]}
                    </span>
                    <div className="text-[13.5px] font-semibold text-slate-800">
                      {f.title}
                    </div>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                    {f.body}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-400">
                    {f.ev}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                    <b className="font-semibold text-slate-700">建议</b>{' '}
                    {f.action}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-slate-400">
              治理健康度：最新完整日待定率 <B>{pendTxt}</B>（目标
              &lt;10%）；待回填条目 <B>{m.backfill}</B> 条。改进效果 = 指标曲线
              + 改进项落地标注 + 前后对比，不打总分。
            </p>
          </div>
        </div>
      </Collapsible>
    </section>
  );
};

export default DeepAnalysis;
