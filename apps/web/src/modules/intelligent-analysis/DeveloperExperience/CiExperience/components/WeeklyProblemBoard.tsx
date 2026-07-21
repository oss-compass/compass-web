import React from 'react';
import { Tag } from 'antd';
import type { CiWeeklyProb } from '../types';
import { ScrollX, Table, Td, Th } from './Table';
import { EmptyState, PriBadge } from './shared';

/**
 * 状态标签配色（取自总览 OverviewDashboard 的 tag 色板）：
 * 仍活跃=红危险、已消退=青绿收敛、待回填=橙黄待办。
 */
const STATUS_TAG_CFG: Record<
  string,
  { tagBg: string; tagColor: string; tagBorder: string }
> = {
  仍活跃: { tagBg: '#fff1f0', tagColor: '#d14343', tagBorder: '#ffccc7' },
  已消退: { tagBg: '#e6fffb', tagColor: '#08979c', tagBorder: '#87e8de' },
  待回填: { tagBg: '#fff7e8', tagColor: '#d46b08', tagBorder: '#ffd591' },
};

const FALLBACK_STATUS_TAG = {
  tagBg: '#f8fafc',
  tagColor: '#94a3b8',
  tagBorder: '#dbe3ee',
};

/** 状态列：按「·」拆分为多个状态，每个状态用一个 Tag 标识 */
const StatusTags: React.FC<{ status: string }> = ({ status }) => {
  const segments = status
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!segments.length) {
    return <span className="text-slate-300">--</span>;
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {segments.map((seg, i) => {
        const cfg = STATUS_TAG_CFG[seg] ?? FALLBACK_STATUS_TAG;
        return (
          <Tag
            key={`${seg}-${i}`}
            style={{
              margin: 0,
              borderRadius: 8,
              padding: '2px 8px',
              fontSize: 11,
              lineHeight: '18px',
              fontWeight: 600,
              background: cfg.tagBg,
              color: cfg.tagColor,
              borderColor: cfg.tagBorder,
            }}
          >
            {seg}
          </Tag>
        );
      })}
    </span>
  );
};

/** 迷你日走势柱（周一→周日） */
const MiniTrend: React.FC<{ trend: number[]; tdays: string[] }> = ({
  trend,
  tdays,
}) => {
  const mx = Math.max(...trend, 1);
  return (
    <div className="flex h-6 items-end justify-center gap-0.5">
      {trend.map((v, i) => (
        <span
          key={i}
          title={`${tdays[i]}：${v}`}
          className={`w-1.5 rounded-sm ${v ? 'bg-sky-500' : 'bg-slate-200'}`}
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
            <Th className="!text-center">趋势</Th>
            <Th>状态</Th>
            <Th>建议动作 → 去向</Th>
          </tr>
        </thead>
        <tbody>
          {probs.map((p, i) => {
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
                <Td className="!text-center">
                  <MiniTrend trend={p.trend} tdays={p.tdays} />
                </Td>
                <Td>
                  <StatusTags status={p.status} />
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
