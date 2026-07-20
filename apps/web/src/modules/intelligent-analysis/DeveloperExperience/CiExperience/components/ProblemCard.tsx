import React, { useState } from 'react';
import type { CiProblem, CiRepoKey } from '../types';
import { prURL, ROOT_STATUS_LABEL, rootStatusBadgeClass, runURL } from '../helpers';
import { Badge, DimTag, PriBadge } from './shared';

type ProblemCardProps = {
  problem: CiProblem;
  repo: CiRepoKey;
};

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, repo }) => {
  const [open, setOpen] = useState(problem.pri === 'P0');
  const im = problem.impact;
  const rt = problem.root;

  // 同 PR 重复行计数（重复触发高亮）
  const prCount: Record<string, number> = {};
  problem.runs.forEach((r) => {
    if (r.pr) prCount[r.pr] = (prCount[r.pr] || 0) + 1;
  });

  const metaParts: string[] = [
    `影响面：${im.runs || 0} run · ${im.prs || 0} PR`,
  ];
  if (im.streak_days > 1) {
    metaParts.push(`持续第 ${im.streak_days} 天（窗口累计 ${im.window_total} 起）`);
  }
  if (im.wasted_min) {
    metaParts.push(`关联机时 ${(im.wasted_min / 60).toFixed(1)} 机时`);
  }
  metaParts.push(`责任方：${problem.owner}`);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-[13px] font-semibold text-slate-800">
          <PriBadge p={problem.pri} />
          <DimTag>{problem.dim}</DimTag>
          <span className="text-slate-800">{problem.title}</span>
        </span>
        <span className="shrink-0 pt-0.5 text-slate-400">{open ? '▾' : '▸'}</span>
      </button>

      {open ? (
        <div className="border-t border-slate-100 px-4 py-3">
          <div className="text-xs text-slate-500">{metaParts.join(' · ')}</div>
          {im.cross && im.cross.length ? (
            <div className="mt-1 text-xs text-slate-500">
              跨维度影响：{im.cross.join('；')}
            </div>
          ) : null}

          {/* 根因块（中性底色，无彩色左边框） */}
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12.5px] leading-relaxed text-slate-600">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700">可能根因</span>
              <Badge className={rootStatusBadgeClass[rt.status]}>
                {ROOT_STATUS_LABEL[rt.status]}
              </Badge>
            </div>
            <div className="mt-1.5">
              {rt.cause || '机理知识库暂无条目——根因待人工判读，不做推测。'}
            </div>
            {rt.evidence && rt.evidence.length ? (
              <div className="mt-1.5">
                <span className="font-semibold text-slate-700">已核证据</span>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {rt.evidence.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {rt.guess ? (
              <div className="mt-1.5">
                <span className="font-semibold text-slate-700">推测（未核）</span>
                ：{rt.guess}
              </div>
            ) : null}
            <div className="mt-1.5">
              <span className="font-semibold text-slate-700">建议动作</span>：
              {rt.action || '—'}
              {rt.dest ? (
                <span className="text-slate-400"> → {rt.dest}</span>
              ) : null}
            </div>
          </div>

          {/* run × PR 全量映射表 */}
          <div className="mt-3 max-h-[300px] overflow-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-[12px]">
              <thead className="sticky top-0 z-[1] bg-white">
                <tr>
                  <th className="border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                    run
                  </th>
                  <th className="border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                    PR
                  </th>
                  <th className="border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-right text-[11px] font-semibold text-slate-500">
                    触发
                  </th>
                  <th className="border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                    失败位置
                  </th>
                  <th className="border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                    失败信息 / 说明
                  </th>
                </tr>
              </thead>
              <tbody>
                {problem.runs.map((r, i) => {
                  const dup = Boolean(r.pr && prCount[r.pr] > 1);
                  return (
                    <tr
                      key={`${r.id}-${i}`}
                      className={dup ? 'bg-amber-50/60' : undefined}
                    >
                      <td className="border-b border-slate-100 px-3 py-2 align-top">
                        <a
                          href={runURL(repo, r.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          #{r.n}
                        </a>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top">
                        {r.pr ? (
                          <>
                            <a
                              href={prURL(repo, r.pr)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {r.pr}
                            </a>
                            {dup ? (
                              <span className="ml-1 text-[11px] text-slate-400">
                                ×{prCount[r.pr]}
                              </span>
                            ) : null}
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 text-right align-top tabular-nums text-slate-600">
                        {r.t || '—'}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top text-slate-700">
                        {r.stage || '—'}
                        {r.job ? ` / ${r.job}` : ''}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 align-top text-[11px] text-slate-400">
                        {r.msg || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProblemCard;
