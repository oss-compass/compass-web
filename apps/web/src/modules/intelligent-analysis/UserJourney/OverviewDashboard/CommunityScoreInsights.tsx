import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Empty, Modal, Skeleton, Table, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import Link from 'next/link';
import type { OverviewScoreInsightRepo } from '../rawData/apiClient';
import { ScoreSparkline } from './CloseRateTrendChart';
import {
  getOverviewScoreColor,
  OVERVIEW_SCORE_BANDS,
  type OverviewScoreBand,
} from './scoreVisuals';

type Props = {
  repos: OverviewScoreInsightRepo[];
  overallScore: number | null;
  isLoading?: boolean;
};

type DistributionItem = {
  key: string;
  label: string;
  score: number;
  values: Array<{ repo: OverviewScoreInsightRepo; score: number }>;
};

const SCORE_BANDS = OVERVIEW_SCORE_BANDS;

const average = (values: number[]) =>
  values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : 0;

const scoreColor = getOverviewScoreColor;

const reportHref = (repo: OverviewScoreInsightRepo) =>
  `/intelligent-analysis/community-experience?project=${encodeURIComponent(
    repo.latestReportId
  )}`;

const buildTeamDistribution = (
  repos: OverviewScoreInsightRepo[],
  overallScore: number | null
): DistributionItem[] => {
  if (!repos.length) return [];
  const grouped = new Map<string, OverviewScoreInsightRepo[]>();
  repos.forEach((repo) => {
    const team = repo.team || '未分配团队';
    grouped.set(team, [...(grouped.get(team) ?? []), repo]);
  });
  const teams = Array.from(grouped.entries())
    .map(([team, teamRepos]) => ({
      key: team,
      label: team,
      score: average(teamRepos.map((repo) => repo.latestScore)),
      values: teamRepos.map((repo) => ({ repo, score: repo.latestScore })),
    }))
    .sort((left, right) => right.score - left.score);
  return [
    {
      key: '__all_teams__',
      label: '全部责任团队仓库',
      score: overallScore ?? average(repos.map((repo) => repo.latestScore)),
      values: repos.map((repo) => ({ repo, score: repo.latestScore })),
    },
    ...teams,
  ];
};

const buildMetricDistribution = (
  repos: OverviewScoreInsightRepo[]
): DistributionItem[] => {
  const grouped = new Map<
    string,
    { label: string; values: DistributionItem['values'] }
  >();
  repos.forEach((repo) => {
    repo.stageScores.forEach((stage) => {
      if (typeof stage.score !== 'number') return;
      const current = grouped.get(stage.key) ?? {
        label: stage.label,
        values: [],
      };
      current.values.push({ repo, score: stage.score });
      grouped.set(stage.key, current);
    });
  });
  return Array.from(grouped.entries()).map(([key, item]) => ({
    key,
    label: item.label,
    score: average(item.values.map((value) => value.score)),
    values: item.values,
  }));
};

const DistributionRows: React.FC<{
  items: DistributionItem[];
  onOpen: (item: DistributionItem, band: OverviewScoreBand) => void;
}> = ({ items, onOpen }) => {
  const detailItems = items.filter((item) => item.key !== '__all_teams__');
  const maxCount = Math.max(
    1,
    ...detailItems.map((item) => item.values.length)
  );
  return (
    <div className="space-y-1.5">
      {items.map((item) => {
        const isTotal = item.key === '__all_teams__';
        const counts = SCORE_BANDS.map((band) => ({
          band,
          repos: item.values.filter((value) => band.matches(value.score)),
        }));
        return (
          <div
            key={item.key}
            className={`group grid grid-cols-[minmax(150px,220px)_minmax(260px,1fr)_58px_58px] items-center gap-3 px-2 transition-colors hover:bg-[rgba(var(--overview-slateSoft-rgb),0.8)] ${
              isTotal
                ? 'mb-2 border-b border-[var(--overview-slateBorder)] pb-2 pt-0.5 font-semibold'
                : 'rounded-lg py-1'
            }`}
          >
            <Tooltip title={item.label}>
              <span className="truncate text-sm font-medium text-[var(--overview-slateDark)]">
                {item.label}
              </span>
            </Tooltip>
            <div
              className="flex h-[22px] overflow-hidden rounded-[7px] border border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)]"
              style={{
                width: isTotal
                  ? '100%'
                  : `${(item.values.length / maxCount) * 100}%`,
              }}
            >
              {counts.map(({ band, repos: bandRepos }) =>
                bandRepos.length ? (
                  <button
                    key={band.key}
                    type="button"
                    title={`${item.label} · ${band.label}：${bandRepos.length} 个仓库`}
                    className="relative flex min-w-0 items-center justify-center overflow-hidden border-r border-[rgba(var(--overview-white-rgb),0.6)] text-xs font-extrabold tabular-nums leading-5 text-[var(--overview-white)] transition-[filter,width] last:border-r-0 hover:z-10 hover:brightness-95 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--overview-blueLight)]"
                    style={{
                      width: `${
                        (bandRepos.length / item.values.length) * 100
                      }%`,
                      background: band.fill,
                      color: band.textColor,
                    }}
                    onClick={() => onOpen(item, band)}
                  >
                    {bandRepos.length}
                  </button>
                ) : null
              )}
            </div>
            <span className="text-right text-xs text-[var(--overview-slateLight)]">
              {item.values.length} 个
            </span>
            <span
              className="text-right text-sm font-semibold tabular-nums"
              style={{ color: scoreColor(item.score) }}
            >
              {item.score.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ScoreDistribution: React.FC<Omit<Props, 'isLoading'>> = ({
  repos,
  overallScore,
}) => {
  const [dimension, setDimension] = React.useState<'team' | 'metric'>('team');
  const [detail, setDetail] = React.useState<{
    item: DistributionItem;
    band: OverviewScoreBand;
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
        <Link href={reportHref(record.repo)} className="overview-table-link">
          {record.repo.name}
        </Link>
      ),
    },
    { title: '责任团队', render: (_value, record) => record.repo.team },
    {
      title: '得分',
      width: 100,
      align: 'right',
      render: (_value, record) => (
        <b style={{ color: scoreColor(record.score) }}>
          {record.score.toFixed(1)}
        </b>
      ),
    },
  ];

  return (
    <div className="section-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[16px] font-extrabold leading-6 text-[var(--overview-text)]">
          综合体验评分分布
        </h3>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <div className="flex flex-wrap gap-3 text-xs text-[var(--overview-slate)]">
            {SCORE_BANDS.map((band) => (
              <span key={band.key} className="inline-flex items-center gap-1.5">
                <i
                  className="h-2 w-2 rounded-sm"
                  style={{ background: band.fill }}
                />
                {band.label}
              </span>
            ))}
          </div>
          <div
            className="inline-flex rounded-[10px] border border-[var(--overview-slateBorder)] bg-[rgba(var(--overview-white-rgb),0.7)] p-[3px]"
            role="tablist"
            aria-label="评分分布维度"
          >
            {(
              [
                ['责任团队', 'team'],
                ['指标', 'metric'],
              ] as const
            ).map(([label, value]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={dimension === value}
                className={`min-h-[30px] rounded-lg px-4 text-xs font-semibold transition-colors ${
                  dimension === value
                    ? 'bg-[var(--overview-white)] text-[var(--overview-blue)] shadow-[0_1px_3px_rgba(var(--overview-text-rgb),0.08)]'
                    : 'text-[var(--overview-slate)] hover:text-[var(--overview-slateDark)]'
                }`}
                onClick={() => setDimension(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {items.length ? (
        <DistributionRows
          items={items}
          onOpen={(item, band) => setDetail({ item, band })}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无评分数据"
        />
      )}
      <Modal
        open={!!detail}
        title={detail ? `${detail.item.label} · ${detail.band.label}` : ''}
        footer={null}
        width={720}
        destroyOnHidden
        onCancel={() => setDetail(null)}
      >
        <Table
          className="overview-ant-table"
          rowKey={(record) => record.repo.id}
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
  repos: OverviewScoreInsightRepo[];
  direction: 'top' | 'bottom';
  onOpenMetrics: (repo: OverviewScoreInsightRepo) => void;
}> = ({ title, repos, direction, onOpenMetrics }) => (
  <section className="min-w-0 flex-1">
    <h3 className="mb-3 text-[15px] font-bold text-[var(--overview-text)]">
      {title}
    </h3>
    <div className="grid grid-cols-[28px_minmax(120px,1fr)_minmax(180px,2fr)_96px] items-center gap-2 border-b border-[var(--overview-slateBorder)] px-1 pb-2 text-xs text-[var(--overview-slate)]">
      <span aria-hidden="true" />
      <span>仓库 / 责任团队</span>
      <span className="pr-7 text-center">
        {direction === 'top' ? '得分最高的 3 项指标' : '得分最低的 3 项指标'}
      </span>
      <span className="text-right">综合体验评分</span>
    </div>
    <div className="space-y-1">
      {repos.map((repo, index) => {
        const stages = repo.stageScores
          .filter(
            (stage): stage is typeof stage & { score: number } =>
              typeof stage.score === 'number'
          )
          .sort((left, right) =>
            direction === 'top'
              ? right.score - left.score
              : left.score - right.score
          )
          .slice(0, 3);
        return (
          <div
            key={repo.id}
            className="grid grid-cols-[28px_minmax(120px,1fr)_minmax(180px,2fr)_96px] items-center gap-2 border-t border-[var(--overview-slateSoft)] px-1 py-2 first:border-t-0"
          >
            <span
              className={`grid h-5 w-5 place-items-center rounded-md text-xs font-semibold ${
                direction === 'top'
                  ? 'bg-[var(--overview-greenSoft)] text-[var(--overview-green)]'
                  : 'bg-[var(--overview-redSoft)] text-[var(--overview-red)]'
              }`}
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <Link
                href={reportHref(repo)}
                className="overview-table-link overview-table-link-strong block truncate underline-offset-2 hover:underline"
                title={`查看 ${repo.name} 最新报告`}
              >
                {repo.name}
              </Link>
              <span className="block truncate text-xs text-[var(--overview-slateLight)]">
                {repo.team}
              </span>
            </div>
            <div className="flex w-full min-w-0 max-w-[300px] items-center justify-center gap-1.5 justify-self-center">
              {stages.map((stage) => (
                <Tooltip key={stage.key} title={stage.label}>
                  <span className="min-w-0 flex-1 rounded-md border border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)] px-1.5 py-1 text-center">
                    <span className="block truncate text-[10px] text-[var(--overview-slateLight)]">
                      {stage.label.replace(/^S\d+\s*/, '')}
                    </span>
                    <b
                      className="block text-xs"
                      style={{ color: scoreColor(stage.score) }}
                    >
                      {stage.score.toFixed(1)}
                    </b>
                  </span>
                </Tooltip>
              ))}
              <Tooltip title="查看全部指标得分">
                <button
                  type="button"
                  aria-label={`查看 ${repo.name} 全部指标得分`}
                  className="flex h-7 w-[22px] shrink-0 items-center justify-center rounded-md text-[var(--overview-slateLight)] transition-colors hover:bg-[var(--overview-blueSoft)] hover:text-[var(--overview-blue)]"
                  onClick={() => onOpenMetrics(repo)}
                >
                  <DownOutlined className="text-[11px]" />
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center justify-end gap-2">
              <ScoreSparkline
                values={repo.scoreHistory.slice(-7).map((point) => point.score)}
              />
              <Link
                href={reportHref(repo)}
                className="font-bold tabular-nums text-[var(--overview-blue)] underline underline-offset-2 hover:text-[var(--overview-blueDark)]"
              >
                {repo.latestScore.toFixed(1)}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const RepoRankings: React.FC<{ repos: OverviewScoreInsightRepo[] }> = ({
  repos,
}) => {
  const [metricRepo, setMetricRepo] =
    React.useState<OverviewScoreInsightRepo | null>(null);
  type StageScore = OverviewScoreInsightRepo['stageScores'][number];
  const columns: TableProps<StageScore>['columns'] = [
    { title: '指标', dataIndex: 'label' },
    {
      title: '得分',
      dataIndex: 'score',
      width: 100,
      align: 'right',
      sorter: (left, right) => (left.score ?? -1) - (right.score ?? -1),
      render: (score: number | null) =>
        typeof score === 'number' ? (
          <b style={{ color: scoreColor(score) }}>{score.toFixed(1)}</b>
        ) : (
          '--'
        ),
    },
  ];
  const sorted = [...repos].sort(
    (left, right) => right.latestScore - left.latestScore
  );
  if (!sorted.length) {
    return (
      <div className="section-card">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无仓库评分数据"
        />
      </div>
    );
  }
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
        onOpenMetrics={setMetricRepo}
      />
      <div className="ranking-second-column min-w-0">
        <RankingColumn
          title="综合体验评分 BOTTOM5 仓库"
          repos={sorted.slice(-5).reverse()}
          direction="bottom"
          onOpenMetrics={setMetricRepo}
        />
      </div>
      <Modal
        open={!!metricRepo}
        title={`${metricRepo?.name ?? ''} · 全部指标得分`}
        width={680}
        footer={null}
        destroyOnHidden
        onCancel={() => setMetricRepo(null)}
      >
        <Table<StageScore>
          rowKey="key"
          className="overview-ant-table"
          columns={columns}
          dataSource={metricRepo?.stageScores ?? []}
          pagination={false}
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
          background: var(--overview-slateBorder);
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

const CommunityScoreInsights: React.FC<Props> = ({
  repos,
  overallScore,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[0, 1].map((item) => (
          <div key={item} className="section-card">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4">
      <ScoreDistribution repos={repos} overallScore={overallScore} />
      <RepoRankings repos={repos} />
    </div>
  );
};

export default CommunityScoreInsights;
