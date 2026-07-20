import React from 'react';
import type {
  CiMatrices,
  CiMatrixCost,
  CiMatrixEff,
  CiMatrixStab,
} from '../types';
import { mmss } from '../helpers';

const wrapCls = 'overflow-x-auto';
const innerCls = 'overflow-hidden rounded-2xl border border-slate-200';
const tableCls = 'w-full border-collapse text-[13px]';
const thCls =
  'border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-center text-[11.5px] font-semibold text-slate-500';
const thRowCls =
  'border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-left text-[11.5px] font-semibold text-slate-500';
const tdCls = 'border-b border-slate-100 px-3 py-2 text-center text-slate-700';
const tdRowCls =
  'border-b border-slate-100 px-3 py-2 text-left font-medium text-slate-700';
const noteCls = 'mt-2 text-[11.5px] leading-relaxed text-slate-400';

const heatClass = (kind: 'hot' | 'warm' | 'cool' | '') => {
  if (kind === 'hot') return 'bg-rose-50 font-semibold text-rose-700';
  if (kind === 'warm') return 'bg-amber-50 text-amber-700';
  if (kind === 'cool') return 'bg-blue-50 text-blue-700';
  return '';
};

/** ① 稳定性 · 阶段 × 失败分类（一级责任方分组 × 二级机理） */
export const MatrixStab: React.FC<{ m: CiMatrixStab }> = ({ m }) => {
  if (!m.stages.length) {
    return <p className={noteCls}>暂无数据。</p>;
  }
  return (
    <>
      <div className={wrapCls}>
        <div className={innerCls}>
          <table className={tableCls}>
            <thead>
              <tr>
                <th className={thRowCls} rowSpan={2}>
                  阶段
                </th>
                {m.groups.map((g) => (
                  <th className={thCls} colSpan={g.mechs.length} key={g.g}>
                    {g.g}
                  </th>
                ))}
                <th className={`${thCls} tabular-nums`} rowSpan={2}>
                  合计
                </th>
              </tr>
              <tr>
                {m.groups.flatMap((g) =>
                  g.mechs.map((mm) => (
                    <th className={thCls} key={`${g.g}-${mm}`}>
                      {mm}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {m.stages.map((st) => {
                const row = m.cells[st] || {};
                const tot = Object.values(row).reduce((a, b) => a + b, 0);
                return (
                  <tr key={st}>
                    <th className={tdRowCls}>{st}</th>
                    {m.groups.flatMap((g) =>
                      g.mechs.map((mm) => {
                        const v = row[mm] || 0;
                        const kind = v
                          ? g.cls === 'Action 平台失败'
                            ? 'hot'
                            : g.cls === '待定'
                            ? 'warm'
                            : 'cool'
                          : '';
                        return (
                          <td
                            className={`${tdCls} tabular-nums ${heatClass(
                              kind
                            )}`}
                            key={`${st}-${g.g}-${mm}`}
                          >
                            {v || '·'}
                          </td>
                        );
                      })
                    )}
                    <td className={`${tdCls} font-semibold tabular-nums`}>
                      {tot || '·'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {m.note ? <p className={noteCls}>{m.note}</p> : null}
    </>
  );
};

/** ② 效率 · 阶段 × 耗时统计（成功 run） */
export const MatrixEff: React.FC<{ m: CiMatrixEff }> = ({ m }) => {
  if (!m.rows.length) {
    return <p className={noteCls}>暂无数据。</p>;
  }
  const heads = [
    '阶段',
    '中位耗时',
    '90 分位',
    '前 7 日基线',
    '偏离',
    '超基线 run',
    '当日总机时(min)',
    '样本',
  ];
  return (
    <>
      <div className={wrapCls}>
        <div className={innerCls}>
          <table className={tableCls}>
            <thead>
              <tr>
                {heads.map((h, i) => (
                  <th
                    className={i === 0 ? thRowCls : `${thCls} text-right`}
                    key={h}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.rows.map((e) => {
                const dev =
                  e.dev_pct == null
                    ? '—'
                    : `${e.dev_pct > 0 ? '+' : ''}${e.dev_pct}%`;
                const warn = e.dev_pct != null && e.dev_pct >= 50;
                return (
                  <tr key={e.stage}>
                    <td className={tdRowCls}>{e.stage}</td>
                    <td className={`${tdCls} text-right tabular-nums`}>
                      {mmss(e.med_s)}
                    </td>
                    <td className={`${tdCls} text-right tabular-nums`}>
                      {mmss(e.p90_s)}
                    </td>
                    <td className={`${tdCls} text-right tabular-nums`}>
                      {mmss(e.base_med_s)}
                    </td>
                    <td
                      className={`${tdCls} text-right tabular-nums ${
                        warn ? 'font-semibold text-rose-600' : ''
                      }`}
                    >
                      {dev}
                    </td>
                    <td className={`${tdCls} text-right tabular-nums`}>
                      {e.over_n}
                    </td>
                    <td className={`${tdCls} text-right tabular-nums`}>
                      {e.total_min}
                    </td>
                    <td className={`${tdCls} text-right tabular-nums`}>
                      {e.n}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {m.note ? <p className={noteCls}>{m.note}</p> : null}
    </>
  );
};

const COST_DISP: Record<string, string> = {
  有效: '有效(成功 run)',
  代码失败消耗: '代码失败消耗(拦截成本)',
  平台失败废弃: '平台失败废弃',
  待定: '待定',
  取消占用: '取消占用',
};

/** ③ 成本 · 阶段 × 机时归属（分钟） */
export const MatrixCost: React.FC<{ m: CiMatrixCost }> = ({ m }) => {
  if (!m.rows.length) {
    return <p className={noteCls}>暂无数据。</p>;
  }
  const grand = m.cols.reduce((a, c) => a + (m.total[c] || 0), 0);
  const costHeat = (col: string, v: number) =>
    v
      ? col === '平台失败废弃' || col === '取消占用'
        ? 'hot'
        : col === '待定'
        ? 'warm'
        : ''
      : '';
  return (
    <>
      <div className={wrapCls}>
        <div className={innerCls}>
          <table className={tableCls}>
            <thead>
              <tr>
                <th className={thRowCls}>阶段</th>
                {m.cols.map((c) => (
                  <th className={thCls} key={c}>
                    {COST_DISP[c] || c}
                  </th>
                ))}
                <th className={`${thCls} text-right`}>小计</th>
              </tr>
            </thead>
            <tbody>
              {m.rows.map((r) => {
                const tot = m.cols.reduce((a, c) => a + (r.cells[c] || 0), 0);
                return (
                  <tr key={r.stage}>
                    <th className={tdRowCls}>{r.stage}</th>
                    {m.cols.map((c) => {
                      const v = Math.round(r.cells[c] || 0);
                      return (
                        <td
                          className={`${tdCls} tabular-nums ${heatClass(
                            costHeat(c, v)
                          )}`}
                          key={`${r.stage}-${c}`}
                        >
                          {v || '·'}
                        </td>
                      );
                    })}
                    <td
                      className={`${tdCls} text-right font-semibold tabular-nums`}
                    >
                      {Math.round(tot)}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th className={`${tdRowCls} bg-slate-50/60`}>合计</th>
                {m.cols.map((c) => (
                  <td
                    className={`${tdCls} bg-slate-50/60 font-semibold tabular-nums`}
                    key={`total-${c}`}
                  >
                    {Math.round(m.total[c] || 0)}
                  </td>
                ))}
                <td
                  className={`${tdCls} bg-slate-50/60 text-right font-semibold tabular-nums`}
                >
                  {Math.round(grand)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {m.note ? <p className={noteCls}>{m.note}</p> : null}
    </>
  );
};

const h3Cls = 'mb-2 mt-4 text-[13.5px] font-semibold text-slate-800 first:mt-0';

const DAILY_HEADINGS: readonly [string, string, string] = [
  '① 稳定性 · 阶段 × 失败分类（一级责任方分组 × 二级机理）',
  '② 效率 · 阶段 × 耗时统计（成功 run）',
  '③ 成本 · 阶段 × 机时归属（分钟）',
];

export const WEEKLY_HEADINGS: readonly [string, string, string] = [
  '① 稳定性 · 阶段 × 失败分类（周汇总）',
  '② 效率 · 阶段 × 耗时统计（周中位，基线=上周）',
  '③ 成本 · 阶段 × 机时归属（周合计，分钟）',
];

/** 三个二维矩阵（日观测板 / 周复盘周汇总共用） */
const AnalysisMatrices: React.FC<{
  matrices: CiMatrices;
  headings?: readonly [string, string, string];
}> = ({ matrices, headings = DAILY_HEADINGS }) => (
  <div className="flex flex-col gap-1">
    <h3 className={h3Cls}>{headings[0]}</h3>
    <MatrixStab m={matrices.stab} />
    <h3 className={h3Cls}>{headings[1]}</h3>
    <MatrixEff m={matrices.eff} />
    <h3 className={h3Cls}>{headings[2]}</h3>
    <MatrixCost m={matrices.cost} />
  </div>
);

export default AnalysisMatrices;
