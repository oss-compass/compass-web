import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Empty, Modal, Table, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import IssueTrendSparkline from './IssueTrendSparkline';
import { getMetricCategory } from '../../metricDefinitions';
import type { IssueOverviewRepo } from '../../types';

type Props = {
  repos: IssueOverviewRepo[];
  reportHref: (community: string, period?: string) => string;
  overallScore?: number;
};

type ScoreBand = {
  key: string;
  label: string;
  color: string;
  fill: string;
  textColor: string;
  matches: (score: number) => boolean;
};

type DistributionItem = {
  key: string;
  label: string;
  hint?: string;
  groupKey?: string;
  groupLabel?: string;
  metricCategory?: 'efficiency' | 'quality';
  score: number;
  values: Array<{ repo: IssueOverviewRepo; score: number }>;
};

const SCORE_BANDS: ScoreBand[] = [
  {
    key: 'excellent',
    label: '90–100',
    color: '#12a57b',
    fill: '#67cda0',
    textColor: '#0f6f4e',
    matches: (v) => v >= 90,
  },
  {
    key: 'good',
    label: '80–89',
    color: '#3d7df6',
    fill: '#79a9f5',
    textColor: '#195fcf',
    matches: (v) => v >= 80 && v < 90,
  },
  {
    key: 'fair',
    label: '70–79',
    color: '#7c91c9',
    fill: '#a5b3cf',
    textColor: '#52647d',
    matches: (v) => v >= 70 && v < 80,
  },
  {
    key: 'risk',
    label: '60–69',
    color: '#f0912b',
    fill: '#efad55',
    textColor: '#9a5b0b',
    matches: (v) => v >= 60 && v < 70,
  },
  {
    key: 'critical',
    label: '0–59',
    color: '#e5453a',
    fill: '#e97d73',
    textColor: '#ad302b',
    matches: (v) => v < 60,
  },
];

const scoreColor = (score: number) =>
  SCORE_BANDS.find((band) => band.matches(score))?.color ?? '#64748b';

const average = (values: number[]) =>
  values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : 0;

const STAGE_ORDER = ['I0', 'I1', 'I2', 'I3', 'G'];

const stageRank = (stageId: string) => {
  const index = STAGE_ORDER.indexOf(stageId.toUpperCase());
  return index < 0 ? STAGE_ORDER.length : index;
};

const buildTeamDistribution = (
  repos: IssueOverviewRepo[],
  overallScore?: number
): DistributionItem[] => {
  const grouped = new Map<string, IssueOverviewRepo[]>();
  repos.forEach((repo) => {
    const team = repo.teamName || '未分配团队';
    grouped.set(team, [...(grouped.get(team) ?? []), repo]);
  });
  const teams = Array.from(grouped.entries())
    .map(([team, teamRepos]) => ({
      key: team,
      label: team,
      score: average(teamRepos.map((repo) => repo.idxTotal)),
      values: teamRepos.map((repo) => ({ repo, score: repo.idxTotal })),
    }))
    .sort((left, right) => right.score - left.score);
  return [
    {
      key: '__all_teams__',
      label: '全部责任团队仓库',
      score: overallScore ?? average(repos.map((repo) => repo.idxTotal)),
      values: repos.map((repo) => ({ repo, score: repo.idxTotal })),
    },
    ...teams,
  ];
};

const buildMetricDistribution = (
  repos: IssueOverviewRepo[]
): DistributionItem[] => {
  const grouped = new Map<
    string,
    {
      name: string;
      stageName: string;
      axis: string;
      values: Array<{ repo: IssueOverviewRepo; score: number }>;
    }
  >();
  repos.forEach((repo) => {
    (repo.metrics ?? []).forEach((metric) => {
      const key = `${metric.stageId}#${metric.code}`;
      const current = grouped.get(key) ?? {
        name: metric.name,
        stageName: metric.stageName,
        axis: metric.axis,
        values: [],
      };
      current.values.push({ repo, score: metric.score });
      grouped.set(key, current);
    });
  });
  return Array.from(grouped.entries())
    .map(([key, metric]) => ({
      key,
      label: metric.name,
      hint: `${metric.stageName} · ${
        getMetricCategory(key.split('#')[1] ?? '') === 'efficiency'
          ? '效率'
          : '质量'
      }指标`,
      groupKey: key.split('#')[0],
      groupLabel: metric.stageName,
      metricCategory: getMetricCategory(key.split('#')[1] ?? ''),
      score: average(metric.values.map((item) => item.score)),
      values: metric.values,
    }))
    .sort((left, right) => {
      const stageDiff =
        stageRank(left.groupKey ?? '') - stageRank(right.groupKey ?? '');
      return stageDiff || right.score - left.score;
    });
};

const DistributionRows: React.FC<{
  items: DistributionItem[];
  onOpen: (item: DistributionItem, band: ScoreBand) => void;
}> = ({ items, onOpen }) => {
  const detailItems = items.filter((item) => item.key !== '__all_teams__');
  // 汇总行始终占满；具体团队柱长只按团队内的最大仓库数计算。
  const maxCount = Math.max(
    1,
    ...detailItems.map((item) => item.values.length)
  );
  return (
    <div className="space-y-1.5">
      {items.map((item, index) => {
        const isTotal = item.key === '__all_teams__';
        const showGroup =
          item.groupKey && item.groupKey !== items[index - 1]?.groupKey;
        const counts = SCORE_BANDS.map((band) => ({
          band,
          repos: item.values.filter((value) => band.matches(value.score)),
        }));
        return (
          <React.Fragment key={item.key}>
            {showGroup ? (
              <div className="flex items-baseline gap-2 px-2 pb-1 pt-3 text-[13px] font-semibold text-slate-800 first:pt-0">
                {item.groupLabel}
                <span className="text-[11px] font-normal text-slate-400">
                  按平均得分降序
                </span>
              </div>
            ) : null}
            <div
              className={`group grid grid-cols-[minmax(150px,220px)_minmax(260px,1fr)_58px_58px] items-center gap-3 px-2 transition-colors hover:bg-slate-50/80 ${
                isTotal
                  ? 'mb-2 border-b border-slate-200 pb-2 pt-0.5 font-semibold'
                  : 'rounded-lg py-1'
              }`}
            >
              <Tooltip title={item.hint || item.label}>
                <span className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-700">
                  <span className="truncate">{item.label}</span>
                  {item.metricCategory ? (
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                        item.metricCategory === 'efficiency'
                          ? 'bg-sky-50 text-sky-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {item.metricCategory === 'efficiency' ? '效率' : '质量'}
                    </span>
                  ) : null}
                </span>
              </Tooltip>
              <div
                className="flex h-[22px] overflow-hidden rounded-[7px] border border-slate-200 bg-slate-50"
                style={{
                  width: isTotal
                    ? '100%'
                    : `${(item.values.length / maxCount) * 100}%`,
                }}
              >
                {counts.map(({ band, repos }) =>
                  repos.length ? (
                    <button
                      type="button"
                      key={band.key}
                      title={`${item.label} · ${band.label}：${repos.length} 个仓库`}
                      className="relative flex min-w-0 items-center justify-center overflow-hidden border-r border-white/60 text-xs font-extrabold tabular-nums leading-5 transition-[filter,width] last:border-r-0 hover:z-10 hover:brightness-95 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300"
                      style={{
                        width: `${(repos.length / item.values.length) * 100}%`,
                        color: '#ffffff',
                        background: band.fill,
                        textShadow: '0 1px 2px rgba(15, 23, 42, 0.35)',
                      }}
                      onClick={() => onOpen(item, band)}
                    >
                      {repos.length}
                    </button>
                  ) : null
                )}
              </div>
              <span className="text-right text-xs text-slate-400">
                {item.values.length} 个
              </span>
              <span
                className="text-right text-sm font-semibold tabular-nums"
                style={{ color: scoreColor(item.score) }}
              >
                {item.score.toFixed(1)}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const IssueScoreDistribution: React.FC<Props> = ({
  repos,
  reportHref,
  overallScore,
}) => {
  const [dimension, setDimension] = React.useState<'team' | 'metric'>('team');
  const [detail, setDetail] = React.useState<{
    item: DistributionItem;
    band: ScoreBand;
  } | null>(null);
  const items = React.useMemo(
    () =>
      dimension === 'team'
        ? buildTeamDistribution(repos, overallScore)
        : buildMetricDistribution(repos),
    [dimension, overallScore, repos]
  );
  const detailRows = detail
    ? detail.item.values
        .filter((value) => detail.band.matches(value.score))
        .sort((left, right) => right.score - left.score)
    : [];
  const columns: TableProps<(typeof detailRows)[number]>['columns'] = [
    {
      title: '仓库',
      render: (_value, record) => (
        <Link
          href={reportHref(record.repo.community, record.repo.period)}
          className="overview-table-link overview-table-link-strong"
        >
          {record.repo.repoShort}
        </Link>
      ),
    },
    { title: '责任团队', render: (_value, record) => record.repo.teamName },
    {
      title: '得分',
      width: 100,
      align: 'right',
      render: (_value, record) => (
        <span
          className="font-semibold"
          style={{ color: scoreColor(record.score) }}
        >
          {record.score.toFixed(1)}
        </span>
      ),
    },
  ];

  return (
    <div className="section-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[16px] font-extrabold leading-6 text-slate-900">
            综合体验评分分布
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            {SCORE_BANDS.map((band) => (
              <span key={band.key} className="inline-flex items-center gap-1.5">
                <i
                  className="h-2 w-2 rounded-sm"
                  style={{ background: band.color }}
                />
                {band.label}
              </span>
            ))}
          </div>
          <div
            className="inline-flex rounded-[10px] border border-slate-200 bg-white/70 p-[3px]"
            role="tablist"
            aria-label="评分分布维度"
          >
            {(
              [
                ['责任团队', 'team'],
                ['指标', 'metric'],
              ] as const
            ).map(([label, value]) => {
              const selected = dimension === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`min-h-[30px] rounded-lg px-4 text-xs font-semibold transition-colors ${
                    selected
                      ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(15,23,42,0.08)]'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setDimension(value)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {items.length ? (
        <DistributionRows
          key={dimension}
          items={items}
          onOpen={(item, band) => setDetail({ item, band })}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无指标得分数据"
        />
      )}
      <Modal
        open={!!detail}
        title={
          detail
            ? `${detail.item.label} · ${detail.band.label}`
            : '评分分档详情'
        }
        footer={null}
        width={720}
        destroyOnHidden
        onCancel={() => setDetail(null)}
      >
        <Table
          className="overview-ant-table"
          rowKey={(record) => record.repo.community}
          columns={columns}
          dataSource={detailRows}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
        />
      </Modal>
    </div>
  );
};

const RankingColumn: React.FC<{
  title: string;
  repos: IssueOverviewRepo[];
  direction: 'top' | 'bottom';
  reportHref: Props['reportHref'];
  onOpenMetrics: (repo: IssueOverviewRepo) => void;
}> = ({ title, repos, direction, reportHref, onOpenMetrics }) => (
  <section className="min-w-0 flex-1">
    <div className="mb-3 flex flex-wrap items-baseline gap-2">
      <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
    </div>
    <div className="grid grid-cols-[28px_minmax(120px,1fr)_minmax(180px,2fr)_96px] items-center gap-2 border-b border-slate-200 px-1 pb-2 text-xs text-slate-500">
      <span aria-hidden="true" />
      <span>仓库 / 责任团队</span>
      <span className="flex items-center justify-center pr-7 text-center">
        {direction === 'top' ? '得分最高的 3 项指标' : '得分最低的 3 项指标'}
      </span>
      <span className="text-right">综合体验评分</span>
    </div>
    <div className="space-y-1">
      {repos.map((repo, index) => {
        const metrics = [...(repo.metrics ?? [])]
          .sort((left, right) =>
            direction === 'top'
              ? right.score - left.score
              : left.score - right.score
          )
          .slice(0, 3);
        return (
          <div
            key={repo.community}
            className="grid grid-cols-[28px_minmax(120px,1fr)_minmax(180px,2fr)_96px] items-center gap-2 border-t border-slate-100 px-1 py-2 first:border-t-0"
          >
            <span
              className={`grid h-5 w-5 place-items-center rounded-md text-xs font-semibold ${
                direction === 'top'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <Link
                href={reportHref(repo.community, repo.period)}
                className="overview-table-link overview-table-link-strong block truncate"
              >
                {repo.repoShort}
              </Link>
              <span className="block truncate text-xs text-slate-400">
                {repo.teamName}
              </span>
            </div>
            <div className="flex w-full min-w-0 max-w-[300px] items-center justify-center gap-1.5 justify-self-center">
              {metrics.map((metric) => (
                <Tooltip
                  key={`${metric.stageId}-${metric.code}`}
                  title={`${metric.stageName} · ${metric.name}`}
                >
                  <span className="min-w-0 flex-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-1 text-center">
                    <span className="block truncate text-[10px] text-slate-400">
                      {metric.name}
                    </span>
                    <b
                      className="block text-xs"
                      style={{ color: scoreColor(metric.score) }}
                    >
                      {metric.score.toFixed(1)}
                    </b>
                  </span>
                </Tooltip>
              ))}
              <Tooltip title="查看全部指标得分">
                <button
                  type="button"
                  aria-label={`查看 ${repo.repoShort} 全部指标得分`}
                  className="flex h-7 w-[22px] shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-blue-500"
                  onClick={() => onOpenMetrics(repo)}
                >
                  <DownOutlined className="text-[11px]" />
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center justify-end gap-2">
              <IssueTrendSparkline
                trend={{
                  title: `${repo.repoShort} · 综合体验评分趋势`,
                  subtitle: '该仓各周期综合体验评分 · 时间升序',
                  values: repo.idxTrend,
                  labels: repo.idxTrendPeriods.map((period) =>
                    (period.split('_to_')[1] ?? period.split('_to_')[0]).slice(
                      5
                    )
                  ),
                }}
                width={38}
                height={22}
                maxValue={100}
              />
              <b className="tabular-nums" style={{ color: '#3d7df6' }}>
                {repo.idxTotal.toFixed(1)}
              </b>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export const IssueRepoRankings: React.FC<Props> = ({ repos, reportHref }) => {
  const [metricRepo, setMetricRepo] = React.useState<IssueOverviewRepo | null>(
    null
  );
  type Metric = NonNullable<IssueOverviewRepo['metrics']>[number];
  const metricColumns: TableProps<Metric>['columns'] = [
    {
      title: '阶段',
      dataIndex: 'stageName',
      width: 120,
      filters: Array.from(
        new Map(
          (metricRepo?.metrics ?? []).map((metric) => [
            metric.stageId,
            metric.stageName,
          ])
        )
      ).map(([value, text]) => ({ value, text })),
      onFilter: (value, metric) => metric.stageId === value,
    },
    {
      title: '指标',
      dataIndex: 'name',
      ellipsis: true,
      render: (name: string, metric) => (
        <Tooltip title={`${name} · ${metric.code}`}>{name}</Tooltip>
      ),
    },
    {
      title: '类型',
      dataIndex: 'axis',
      width: 90,
      render: (axis: Metric['axis']) =>
        axis === 'objective' ? '效率' : '质量',
    },
    {
      title: '得分',
      dataIndex: 'score',
      width: 90,
      align: 'right',
      sorter: (a, b) => a.score - b.score,
      render: (score: number) => (
        <span
          className="font-semibold tabular-nums"
          style={{ color: scoreColor(score) }}
        >
          {score.toFixed(1)}
        </span>
      ),
    },
  ];
  const sorted = [...repos].sort(
    (left, right) => right.idxTotal - left.idxTotal
  );
  return (
    <div
      className="section-card grid gap-6"
      style={{
        containerType: 'inline-size',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
      }}
    >
      <RankingColumn
        title="综合体验评分 TOP5 仓库"
        repos={sorted.slice(0, 5)}
        direction="top"
        reportHref={reportHref}
        onOpenMetrics={setMetricRepo}
      />
      <div className="ranking-second-column min-w-0">
        <RankingColumn
          title="综合体验评分 BOTTOM5 仓库"
          repos={sorted.slice(-5).reverse()}
          direction="bottom"
          reportHref={reportHref}
          onOpenMetrics={setMetricRepo}
        />
      </div>
      <Modal
        open={!!metricRepo}
        title={`${metricRepo?.repoShort ?? ''} · 全部指标得分`}
        width={760}
        style={{ maxWidth: 'calc(100vw - 32px)', top: '10vh' }}
        styles={{
          body: { maxHeight: 'calc(80vh - 110px)', overflowY: 'auto' },
        }}
        footer={null}
        destroyOnHidden
        onCancel={() => setMetricRepo(null)}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            {metricRepo?.teamName} · 共 {metricRepo?.metrics?.length ?? 0}{' '}
            项指标
          </span>
          {metricRepo && (
            <Link
              className="overview-table-link"
              href={reportHref(metricRepo.community, metricRepo.period)}
            >
              {metricRepo.periodLabel || metricRepo.period} · 查看报告
            </Link>
          )}
        </div>
        <Table<Metric>
          key={
            metricRepo
              ? `${metricRepo.community}-${metricRepo.period}`
              : 'empty'
          }
          className="overview-ant-table"
          rowKey={(metric) => `${metric.stageId}-${metric.code}-${metric.axis}`}
          columns={metricColumns}
          dataSource={metricRepo?.metrics ?? []}
          pagination={false}
          tableLayout="fixed"
          locale={{ emptyText: '暂无指标得分数据' }}
        />
      </Modal>
      <style jsx>{`
        .ranking-second-column {
          position: relative;
        }
        .ranking-second-column::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
          pointer-events: none;
        }
        @container (min-width: 984px) {
          .ranking-second-column::before {
            top: 0;
            bottom: 0;
            left: -12px;
            right: auto;
            width: 1px;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};
