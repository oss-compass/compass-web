import OverviewRepoComparison from '../../../../UserJourney/OverviewDashboard/OverviewRepoComparison';
import { ScoreSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import { useCiRepoTeams } from './useCiRepoTeams';
import React from 'react';
import Link from 'next/link';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Input, Modal, Table, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import {
  countPainProgress,
  type CiRepoSummary,
  type CiTopIssue,
} from './communityMetrics';
import CiIssueTable, { type CiReportHref } from './CiIssueTable';
import { REPAIR_RATE_NOTE } from './CiPainProgress';
import { IssueProgressBar } from '../../../../UserJourney/OverviewDashboard/ProgressComponents';

const PROGRESS_STATUS = {
  pending: { status: 'pending', label: '待处理' },
  inProgress: { status: 'confirmed', label: '进行中' },
  resolved: { status: 'fixed', label: '已闭环' },
} as const;

export type RepoRow = CiRepoSummary & {
  teamName: string;
  repoCategory?: string;
  issues: CiTopIssue[];
};
export const buildCiAggregateRow = (name: string, repos: RepoRow[]) => {
  const issues = repos.flatMap((repo) => repo.issues);
  const scores = repos
    .map((repo) => repo.scoreOverall)
    .filter((score): score is number => score != null);
  const progress = countPainProgress(issues);
  return {
    id: name,
    name,
    repoCount: repos.length,
    score: scores.length
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : null,
    ...progress,
    closeRate: progress.rate,
    issues,
    repos,
  };
};

export const groupCiRepoCategories = (repos: RepoRow[]) => {
  const groups = new Map<string, RepoRow[]>();
  repos.forEach((repo) => {
    const key = repo.repoCategory || '未分类';
    groups.set(key, [...(groups.get(key) || []), repo]);
  });
  return Array.from(groups, ([key, items]) => ({
    key,
    label: key,
    repos: items,
  }));
};

type TeamRow = ReturnType<typeof buildCiAggregateRow>;
type Props = {
  repos: CiRepoSummary[];
  issues: CiTopIssue[];
  trackingReady: boolean;
  reportHref: CiReportHref;
};

const CiRepoProgressSection: React.FC<Props> = ({
  repos,
  issues,
  trackingReady,
  reportHref,
}) => {
  const [view, setView] = React.useState<'team' | 'repo'>('team');
  const [search, setSearch] = React.useState('');
  const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);
  const [detail, setDetail] = React.useState<{
    title: string;
    issues: CiTopIssue[];
  } | null>(null);
  const [collapsed, setCollapsed] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<{
    key: string;
    order: 'ascend' | 'descend';
  }>({ key: 'score', order: 'ascend' });
  const teams = useCiRepoTeams();
  const repoInfo = teams.repoInfo;
  const rows: RepoRow[] = repos.map((repo) => ({
    ...repo,
    teamName:
      repoInfo[repo.slug]?.teamName ||
      (teams.isLoading
        ? '团队加载中'
        : teams.isError
        ? '团队信息不可用'
        : '未分配团队'),
    repoCategory: repoInfo[repo.slug]?.repoCategory,
    issues: issues.filter((issue) => issue.repo === repo.repo),
  }));
  const filtered = rows.filter((repo) =>
    `${repo.slug} ${repo.teamName} ${repo.repoCategory || ''}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );
  const groups = new Map<string, RepoRow[]>();
  filtered.forEach((repo) =>
    groups.set(repo.teamName, [...(groups.get(repo.teamName) || []), repo])
  );
  const teamRows = Array.from(groups, ([name, values]) =>
    buildCiAggregateRow(name, values)
  );
  const latestReport = (items: RepoRow[]) =>
    [...items].sort((a, b) => b.latestDay.localeCompare(a.latestDay))[0];
  const openIssues = (title: string, values: CiTopIssue[]) =>
    setDetail({ title, issues: values });
  const progressCell = (title: string, values: CiTopIssue[]) => {
    if (!trackingReady) return '—';
    const counts = countPainProgress(values);
    return (
      <div onClick={(event) => event.stopPropagation()}>
        <IssueProgressBar
          pending={counts.pending}
          inProgress={counts.confirmed}
          resolved={counts.fixed}
          onBucketClick={(bucket) => {
            if (bucket === 'na') return;
            const { status, label } = PROGRESS_STATUS[bucket];
            openIssues(
              `${title} · ${label}`,
              values.filter((issue) => issue.status === status)
            );
          }}
        />
      </div>
    );
  };
  const totalCell = (title: string, values: CiTopIssue[]) =>
    trackingReady ? (
      <button
        type="button"
        className="overview-table-link overview-table-link-strong"
        onClick={(event) => {
          event.stopPropagation();
          openIssues(title, values);
        }}
      >
        {values.length}
      </button>
    ) : (
      '—'
    );
  const scoreCell = (
    score: number | null,
    history: Array<{ score: number | null }> = []
  ) => (
    <div className="overview-close-rate-cell">
      <ScoreSparkline values={history.slice(-7).map((point) => point.score)} />
      <span className="text-sm font-semibold text-[var(--overview-slateDark)]">
        {score?.toFixed(1) ?? '—'}
      </span>
    </div>
  );
  const rateCell = (values: CiTopIssue[]) =>
    trackingReady ? (
      <Tooltip title={REPAIR_RATE_NOTE}>
        <span className="tabular-nums text-slate-700">
          {countPainProgress(values).rate.toFixed(0)}%
        </span>
      </Tooltip>
    ) : (
      '—'
    );
  const reportCell = (repo?: RepoRow) =>
    repo?.latestDay ? (
      <Link
        href={reportHref(repo.repo, repo.latestDay)}
        onClick={(event) => event.stopPropagation()}
        className="overview-table-link"
      >
        {repo.latestDay}
      </Link>
    ) : (
      '—'
    );
  const indexColumn = {
    title: '序号',
    width: 64,
    align: 'center' as const,
    render: (_value: unknown, _row: unknown, index: number) => (
      <span className="row-num">{index + 1}</span>
    ),
  };
  const repoColumns: TableProps<RepoRow>['columns'] = [
    indexColumn,
    {
      title: '仓库',
      dataIndex: 'slug',
      key: 'name',
      width: 210,
      sorter: (a, b) => a.slug.localeCompare(b.slug),
    },
    { title: '责任团队', dataIndex: 'teamName', width: 110, ellipsis: true },
    {
      title: '综合体验评分',
      dataIndex: 'scoreOverall',
      key: 'score',
      width: 138,
      sorter: (a, b) => (a.scoreOverall ?? -1) - (b.scoreOverall ?? -1),
      render: (score: number | null, repo) =>
        scoreCell(score, repo.scoreHistory),
    },
    {
      title: '问题处理进展',
      width: 230,
      render: (_value, repo) => progressCell(repo.slug, repo.issues),
    },
    {
      title: '总问题数',
      key: 'total',
      width: 110,
      sorter: (a, b) => a.issues.length - b.issues.length,
      render: (_value, repo) => totalCell(repo.slug, repo.issues),
    },
    {
      title: '闭环率',
      key: 'rate',
      width: 100,
      sorter: (a, b) =>
        countPainProgress(a.issues).rate - countPainProgress(b.issues).rate,
      render: (_value, repo) => rateCell(repo.issues),
    },
    {
      title: '最新报告',
      key: 'day',
      width: 110,
      sorter: (a, b) => a.latestDay.localeCompare(b.latestDay),
      render: (_value, repo) => reportCell(repo),
    },
  ];
  const teamColumns: TableProps<TeamRow>['columns'] = [
    indexColumn,
    {
      title: '责任团队',
      dataIndex: 'name',
      key: 'name',
      width: 210,
      sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
      render: (name: string, team) => (
        <button
          type="button"
          className="overview-expand-label"
          aria-label={`${
            expandedKeys.includes(team.id) ? '收起' : '展开'
          }${name}`}
          aria-expanded={expandedKeys.includes(team.id)}
          onClick={(event) => {
            event.stopPropagation();
            setExpandedKeys((previous) =>
              previous.includes(team.id)
                ? previous.filter((key) => key !== team.id)
                : [...previous, team.id]
            );
          }}
        >
          <RightOutlined
            className={`overview-expand-icon ${
              expandedKeys.includes(team.id) ? 'is-expanded' : ''
            }`}
          />
          {name}
        </button>
      ),
    },
    {
      title: '仓库数',
      dataIndex: 'repoCount',
      width: 110,
      sorter: (a, b) => a.repoCount - b.repoCount,
    },
    {
      title: '综合体验评分',
      dataIndex: 'score',
      key: 'score',
      width: 138,
      sorter: (a, b) => (a.score ?? -1) - (b.score ?? -1),
      render: (score: number | null) => scoreCell(score),
    },
    {
      title: '问题处理进展',
      width: 230,
      render: (_value, team) => progressCell(team.name, team.issues),
    },
    {
      title: '总问题数',
      key: 'total',
      width: 110,
      sorter: (a, b) => a.total - b.total,
      render: (_value, team) => totalCell(team.name, team.issues),
    },
    {
      title: '闭环率',
      key: 'rate',
      width: 100,
      sorter: (a, b) => a.rate - b.rate,
      render: (_value, team) => rateCell(team.issues),
    },
    {
      title: '最新报告',
      key: 'day',
      width: 110,
      render: (_value, team) => reportCell(latestReport(team.repos)),
    },
  ];
  const sortRepos = (values: RepoRow[]) =>
    [...values].sort((a, b) => {
      const value = (repo: RepoRow): string | number => {
        if (sort.key === 'score') return repo.scoreOverall ?? -1;
        if (sort.key === 'total') return repo.issues.length;
        if (sort.key === 'rate') return countPainProgress(repo.issues).rate;
        if (sort.key === 'day') return repo.latestDay;
        return repo.slug;
      };
      const left = value(a),
        right = value(b);
      return (
        (typeof left === 'string' && typeof right === 'string'
          ? left.localeCompare(right)
          : Number(left) - Number(right)) * (sort.order === 'ascend' ? 1 : -1)
      );
    });
  const repoTable = (items: RepoRow[]) => (
    <Table<RepoRow>
      className="overview-ant-table"
      rowKey="repo"
      columns={repoColumns}
      dataSource={sortRepos(items)}
      pagination={false}
      tableLayout="fixed"
      scroll={{ x: 1172 }}
    />
  );
  const renderExpandedTeam = (team: TeamRow) => (
    <div className="overview-expanded-wrap">
      <table
        className="overview-expanded-table"
        style={{ width: '100%', tableLayout: 'fixed' }}
      >
        <colgroup>
          {[64, 210, 110, 138, 230, 110, 100, 110].map((width, index) => (
            <col key={index} style={{ width }} />
          ))}
        </colgroup>
        <tbody>
          {groupCiRepoCategories(sortRepos(team.repos)).map((category) => {
            const key = `${team.id}:${category.key}`;
            const grouped = category.key !== '未分类';
            const hidden = collapsed.includes(key);
            const aggregate = buildCiAggregateRow(
              category.label,
              category.repos
            );
            return (
              <React.Fragment key={key}>
                {grouped && (
                  <tr className="overview-category-row">
                    <td className="overview-expanded-cell" />
                    <td className="overview-expanded-cell overview-expanded-cell-name">
                      <button
                        type="button"
                        className="overview-expand-label"
                        aria-expanded={!hidden}
                        onClick={() =>
                          setCollapsed((previous) =>
                            hidden
                              ? previous.filter((item) => item !== key)
                              : [...previous, key]
                          )
                        }
                      >
                        <RightOutlined
                          className={`overview-expand-icon ${
                            hidden ? '' : 'is-expanded'
                          }`}
                        />
                        {category.label}
                      </button>
                    </td>
                    <td className="overview-expanded-cell">
                      {category.repos.length} 个
                    </td>
                    <td className="overview-expanded-cell">
                      {scoreCell(aggregate.score)}
                    </td>
                    <td className="overview-expanded-cell">
                      {progressCell(category.label, aggregate.issues)}
                    </td>
                    <td className="overview-expanded-cell">
                      {totalCell(category.label, aggregate.issues)}
                    </td>
                    <td className="overview-expanded-cell">
                      {rateCell(aggregate.issues)}
                    </td>
                    <td className="overview-expanded-cell">
                      {reportCell(latestReport(category.repos))}
                    </td>
                  </tr>
                )}
                {(!grouped || !hidden) &&
                  category.repos.map((repo, index) => (
                    <tr key={repo.repo}>
                      <td className="overview-expanded-cell">{index + 1}</td>
                      <td className="overview-expanded-cell overview-expanded-cell-name">
                        {repo.slug}
                      </td>
                      <td className="overview-expanded-cell">—</td>
                      <td className="overview-expanded-cell">
                        {scoreCell(repo.scoreOverall, repo.scoreHistory)}
                      </td>
                      <td className="overview-expanded-cell">
                        {progressCell(repo.slug, repo.issues)}
                      </td>
                      <td className="overview-expanded-cell">
                        {totalCell(repo.slug, repo.issues)}
                      </td>
                      <td className="overview-expanded-cell">
                        {rateCell(repo.issues)}
                      </td>
                      <td className="overview-expanded-cell">
                        {reportCell(repo)}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <OverviewRepoComparison
      view={view}
      onViewChange={setView}
      actions={
        <Input
          className="!ml-auto !h-8 !w-56 max-w-full !border-[rgba(var(--overview-slateBorder-rgb),0.8)] !bg-[linear-gradient(180deg,var(--overview-white)_0%,var(--overview-slateSoft)_100%)] !px-3 !text-sm !shadow-[0_2px_6px_rgba(var(--overview-text-rgb),0.06)] [&.ant-input-affix-wrapper]:!rounded-2xl [&_.ant-input]:!bg-transparent"
          aria-label="搜索仓库或团队"
          placeholder="搜索仓库或团队"
          value={search}
          prefix={<SearchOutlined className="text-[var(--overview-slate)]" />}
          allowClear
          onChange={(event) => setSearch(event.target.value)}
        />
      }
    >
      {teams.isError && (
        <Alert
          className="mb-3"
          type="warning"
          message="团队信息加载失败"
          action={
            <button type="button" onClick={() => void teams.refetch()}>
              重试
            </button>
          }
        />
      )}
      {view === 'repo' ? (
        repoTable(filtered)
      ) : (
        <Table<TeamRow>
          className="overview-ant-table"
          rowKey="id"
          columns={teamColumns}
          dataSource={teamRows}
          pagination={false}
          scroll={{ x: 1172 }}
          onChange={(_pagination, _filters, sorter) => {
            const item = Array.isArray(sorter) ? sorter[0] : sorter;
            setSort({
              key: String(item.columnKey || 'score'),
              order: item.order || 'ascend',
            });
          }}
          tableLayout="fixed"
          expandable={{
            expandedRowKeys: expandedKeys,
            onExpandedRowsChange: (keys) => setExpandedKeys([...keys]),
            showExpandColumn: false,
            expandRowByClick: true,
            expandedRowRender: renderExpandedTeam,
          }}
        />
      )}
      <Modal
        open={!!detail}
        title={
          detail ? `${detail.title} · 痛点问题（${detail.issues.length}）` : ''
        }
        onCancel={() => setDetail(null)}
        footer={null}
        width={1080}
        destroyOnClose
      >
        {detail && (
          <CiIssueTable issues={detail.issues} reportHref={reportHref} />
        )}
      </Modal>
    </OverviewRepoComparison>
  );
};
export default CiRepoProgressSection;
