import React from 'react';
import type { CiWeeklyProb } from '../types';
import { ScrollX, Table, Td, Th } from './Table';
import { EmptyState, PriBadge } from './shared';

/** 迷你日走势柱（周一→周日） */
const MiniTrend: React.FC<{ trend: number[]; tdays: string[] }> = ({
  trend,
  tdays,
}) => {
  const mx = Math.max(...trend, 1);
  return (
    <div className="flex h-6 items-end gap-0.5">
      {trend.map((v, i) => (
        <span
          key={i}
          title={`${tdays[i]}：${v}`}
          className={`w-1.5 rounded-sm ${v ? 'bg-blue-500' : 'bg-slate-200'}`}
          style={{ height: v ? Math.max(3, Math.round((v / mx) * 24)) : 2 }}
        />
      ))}
    </div>
  );
};

/** 本周问题榜（逐日问题按机理跨日聚合） */
const WeeklyProblemBoard: React.FC<{ probs: CiWeeklyProb[] }> = ({ probs }) => {
  if (!probs.length) {
    return <EmptyState>本周无聚合问题条目。</EmptyState>;
  }
  return (
    <ScrollX>
      <Table>
        <thead>
          <tr>
            <Th>优先级</Th>
            <Th>维度</Th>
            <Th>机理/问题</Th>
            <Th numeric>首现</Th>
            <Th numeric>命中天数</Th>
            <Th numeric>累计 run / PR</Th>
            <Th>日走势（周一→周日）</Th>
            <Th>状态</Th>
            <Th>建议动作 → 去向</Th>
          </tr>
        </thead>
        <tbody>
          {probs.map((p, i) => {
            const active = p.status.startsWith('仍活跃');
            return (
              <tr key={`${p.kb}-${i}`}>
                <Td>
                  <PriBadge p={p.pri} />
                </Td>
                <Td>{p.dim}</Td>
                <Td>
                  <b className="font-semibold text-slate-800">{p.kb}</b>
                  {p.stages ? (
                    <span className="ml-1 text-[11.5px] text-slate-400">
                      {p.stages}
                    </span>
                  ) : null}
                </Td>
                <Td numeric>{p.first}</Td>
                <Td numeric>{p.days_hit}</Td>
                <Td numeric>
                  {p.runs} / {p.prs}
                </Td>
                <Td>
                  <MiniTrend trend={p.trend} tdays={p.tdays} />
                </Td>
                <Td>
                  {active ? (
                    <b className="font-semibold text-rose-600">{p.status}</b>
                  ) : (
                    p.status
                  )}
                </Td>
                <Td className="text-[11.5px] text-slate-400">
                  {p.action}
                  <br />→ {p.dest}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollX>
  );
};

export default WeeklyProblemBoard;
