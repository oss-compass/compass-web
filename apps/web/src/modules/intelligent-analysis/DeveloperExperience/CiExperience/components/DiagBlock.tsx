import React from 'react';
import type { CiDiag, CiDimKey } from '../types';
import { mmss } from '../helpers';

const wrapCls = 'overflow-x-auto';
const innerCls = 'mt-2 overflow-hidden rounded-xl border border-slate-200';
const tableCls = 'w-full border-collapse text-[12.5px]';
const thCls =
  'border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-left text-[11px] font-semibold text-slate-500';
const thNumCls = `${thCls} text-right`;
const tdCls = 'border-b border-slate-100 px-3 py-2 text-slate-700';
const tdNumCls = `${tdCls} text-right tabular-nums`;

const minText = (s: number | null | undefined) =>
  s == null ? '—' : `${(s / 60).toFixed(1)} min`;

/** 维度细分（诊断指标） */
const DiagBlock: React.FC<{ dimKey: CiDimKey; diag: CiDiag }> = ({
  dimKey,
  diag,
}) => {
  if (dimKey === 'stability') {
    const mech = diag.stability?.mech || {};
    const rows = Object.entries(mech).sort((a, b) => b[1] - a[1]);
    return (
      <div className={wrapCls}>
        <div className={innerCls}>
          <table className={tableCls}>
            <thead>
              <tr>
                <th className={thCls}>机理（二级）</th>
                <th className={thNumCls}>当日失败 run</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <td className={tdCls}>{k}</td>
                  <td className={tdNumCls}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (dimKey === 'efficiency') {
    const eff = diag.efficiency || { stage_bill: [], top_jobs: [] };
    return (
      <div className="flex flex-col gap-2">
        <div className={wrapCls}>
          <div className={innerCls}>
            <table className={tableCls}>
              <thead>
                <tr>
                  <th className={thCls}>阶段</th>
                  <th className={thNumCls}>实际耗时 中位</th>
                  <th className={thNumCls}>样本 run</th>
                </tr>
              </thead>
              <tbody>
                {eff.stage_bill.map((b) => (
                  <tr key={b.stage}>
                    <td className={tdCls}>{b.stage}</td>
                    <td className={tdNumCls}>
                      {b.med_s != null ? minText(b.med_s) : '—'}
                    </td>
                    <td className={tdNumCls}>{b.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={wrapCls}>
          <div className={innerCls}>
            <table className={tableCls}>
              <thead>
                <tr>
                  <th className={thCls}>最耗时 job（成功 run，n≥3）</th>
                  <th className={thCls}>阶段</th>
                  <th className={thNumCls}>中位耗时</th>
                </tr>
              </thead>
              <tbody>
                {eff.top_jobs.map((t, i) => (
                  <tr key={`${t.job}-${i}`}>
                    <td className={tdCls}>{t.job}</td>
                    <td className={tdCls}>{t.stage}</td>
                    <td className={tdNumCls}>{minText(t.med_s)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (dimKey === 'interaction') {
    const it = diag.interaction || { ttff_by_owner: {}, retry: { rate: null, n: 0 } };
    return (
      <div className="flex flex-col gap-1.5">
        <div className={wrapCls}>
          <div className={innerCls}>
            <table className={tableCls}>
              <thead>
                <tr>
                  <th className={thCls}>首次失败耗时 · 按责任方</th>
                  <th className={thNumCls}>中位</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(it.ttff_by_owner).map(([k, v]) => (
                  <tr key={k}>
                    <td className={tdCls}>{k}</td>
                    <td className={tdNumCls}>{mmss(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11.5px] leading-relaxed text-slate-400">
          重试失败率{' '}
          {it.retry && it.retry.rate != null ? `${it.retry.rate}%` : '—'}
          （滚动 7 日，n={it.retry ? it.retry.n : '—'}）——紧跟失败的重跑仍失败的占比。
        </p>
      </div>
    );
  }

  // cost
  const pools = diag.cost?.pools || [];
  return (
    <div className={wrapCls}>
      <div className={innerCls}>
        <table className={tableCls}>
          <thead>
            <tr>
              <th className={thCls}>资源池</th>
              <th className={thNumCls}>当日机时（min）</th>
            </tr>
          </thead>
          <tbody>
            {pools.map((p) => (
              <tr key={p[0]}>
                <td className={tdCls}>{p[0]}</td>
                <td className={tdNumCls}>{p[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagBlock;
