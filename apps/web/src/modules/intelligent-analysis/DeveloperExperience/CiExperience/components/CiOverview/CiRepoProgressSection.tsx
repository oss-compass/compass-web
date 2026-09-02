import React from 'react';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Modal, Segmented, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchRepoTeams } from '../../../IssueContribution/data';
import { IssueProgressBar } from '../../../../UserJourney/OverviewDashboard/ProgressComponents';
import type { CiRepoSummary, CiTopIssue } from './communityMetrics';

const { Title } = Typography;
const COLUMN_WIDTHS = [64, 210, 110, 138, 230, 110, 100, 110] as const;
const TABLE_WIDTH = COLUMN_WIDTHS.reduce((sum, width) => sum + width, 0);

type RepoRow = CiRepoSummary & { teamName: string; issues: CiTopIssue[] };
type TeamSortKey =
  | 'name'
  | 'repoCount'
  | 'score'
  | 'total'
  | 'closeRate'
  | 'report';
type TableSortOrder = 'ascend' | 'descend' | null;
type TeamRow = {
  id: string;
  name: string;
  repoCount: number;
  score: number | null;
  active: number;
  backfill: number;
  faded: number;
  total: number;
  closeRate: number;
  repos: RepoRow[];
};

type Props = {
  repos: CiRepoSummary[];
  issues: CiTopIssue[];
  reportHref: (slug: string) => string;
};

const statusCounts = (issues: CiTopIssue[]) => ({
  active: issues.filter((issue) => /^仍活跃/.test(issue.status)).length,
  backfill: issues.filter((issue) => /待回填/.test(issue.status)).length,
  faded: issues.filter((issue) => /已消退/.test(issue.status)).length,
});

const reportName = (repo: RepoRow) => `${repo.slug}_${repo.latestDay}`;

const CiRepoProgressSection: React.FC<Props> = ({
  repos,
  issues,
  reportHref,
}) => {
  const [view, setView] = React.useState<'team' | 'repo'>('team');
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<React.Key[]>([]);
  const [teamSort, setTeamSort] = React.useState<{
    key?: TeamSortKey;
    order: TableSortOrder;
  }>({ order: null });
  const [detail, setDetail] = React.useState<{
    title: string;
    issues: CiTopIssue[];
    teams: Record<string, string>;
  } | null>(null);
  const { data: teamResponse } = useQuery({
    queryKey: ['overview-repo-teams'],
    queryFn: ({ signal }) => fetchRepoTeams(signal),
    staleTime: 5 * 60 * 1000,
  });

  const teamMap = React.useMemo(
    () =>
      Object.fromEntries(
        (teamResponse?.items ?? []).map((item) => [
          item.repoShort.replace(/_/g, '-'),
          item.teamName,
        ])
      ) as Record<string, string>,
    [teamResponse]
  );

  const repoRows = React.useMemo<RepoRow[]>(
    () =>
      repos.map((repo) => ({
        ...repo,
        teamName: teamMap[repo.slug] || '未分配团队',
        issues: issues.filter((issue) => issue.slug === repo.slug),
      })),
    [issues, repos, teamMap]
  );

  const teamRows = React.useMemo<TeamRow[]>(() => {
    const groups = new Map<string, RepoRow[]>();
    repoRows.forEach((repo) =>
      groups.set(repo.teamName, [...(groups.get(repo.teamName) ?? []), repo])
    );
    return Array.from(groups.entries()).map(([name, teamRepos]) => {
      const teamIssues = teamRepos.flatMap((repo) => repo.issues);
      const counts = statusCounts(teamIssues);
      const scores = teamRepos
        .map((repo) => repo.scoreOverall)
        .filter((score): score is number => score !== null);
      const total = teamIssues.length;
      return {
        id: name,
        name,
        repoCount: teamRepos.length,
        score: scores.length
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : null,
        ...counts,
        total,
        closeRate: total ? (counts.faded / total) * 100 : 100,
        repos: teamRepos,
      };
    });
  }, [repoRows]);

  const progress = (active: number, backfill: number, faded: number) => (
    <IssueProgressBar pending={active} inProgress={backfill} resolved={faded} />
  );
  const rate = (value: number) => (
    <span className="overview-close-rate-value text-sm font-semibold text-slate-700">
      {value.toFixed(0)}%
    </span>
  );
  const openDetails = (title: string, rows: RepoRow[]) =>
    setDetail({
      title,
      issues: rows.flatMap((repo) => repo.issues),
      teams: Object.fromEntries(rows.map((repo) => [repo.slug, repo.teamName])),
    });

  const sortExpandedRepos = React.useCallback(
    (teamRepos: RepoRow[]) => {
      if (!teamSort.key || !teamSort.order) return teamRepos;
      const direction = teamSort.order === 'ascend' ? 1 : -1;
      const value = (repo: RepoRow): string | number => {
        switch (teamSort.key) {
          case 'score':
            return repo.scoreOverall ?? -1;
          case 'total':
            return repo.issues.length;
          case 'closeRate': {
            const counts = statusCounts(repo.issues);
            return repo.issues.length ? counts.faded / repo.issues.length : 1;
          }
          case 'report':
            return reportName(repo);
          case 'name':
          case 'repoCount':
          default:
            return repo.slug;
        }
      };
      return [...teamRepos].sort((left, right) => {
        const leftValue = value(left);
        const rightValue = value(right);
        const result =
          typeof leftValue === 'string' && typeof rightValue === 'string'
            ? leftValue.localeCompare(rightValue, 'zh-CN')
            : Number(leftValue) - Number(rightValue);
        return result === 0
          ? left.slug.localeCompare(right.slug, 'zh-CN')
          : result * direction;
      });
    },
    [teamSort]
  );
  const displayedTeamRows = React.useMemo(
    () =>
      teamRows.map((team) => ({
        ...team,
        repos: sortExpandedRepos(team.repos),
      })),
    [sortExpandedRepos, teamRows]
  );

  const repoColumns = React.useMemo<TableProps<RepoRow>['columns']>(
    () => [
      {
        title: '序号',
        width: 64,
        align: 'center',
        render: (_v, _r, index) => <span className="row-num">{index + 1}</span>,
      },
      {
        title: '仓库',
        dataIndex: 'slug',
        width: 170,
        sorter: (a, b) => a.slug.localeCompare(b.slug),
      },
      {
        title: '责任团队',
        dataIndex: 'teamName',
        width: 150,
        sorter: (a, b) => a.teamName.localeCompare(b.teamName, 'zh-CN'),
      },
      {
        title: '综合体验评分',
        dataIndex: 'scoreOverall',
        width: 138,
        sorter: (a, b) => (a.scoreOverall ?? -1) - (b.scoreOverall ?? -1),
        render: (value: number | null) => (
          <span className="text-sm font-semibold text-slate-700">
            {value?.toFixed(1) ?? '—'}
          </span>
        ),
      },
      {
        title: '问题处理进展',
        width: 230,
        render: (_v, row) => {
          const counts = statusCounts(row.issues);
          return progress(counts.active, counts.backfill, counts.faded);
        },
      },
      {
        title: '总问题数',
        width: 105,
        sorter: (a, b) => a.issues.length - b.issues.length,
        render: (_v, row) => (
          <button
            type="button"
            className="overview-table-link overview-table-link-strong"
            onClick={() => openDetails(`${row.slug} · 总问题数`, [row])}
          >
            {row.issues.length}
          </button>
        ),
      },
      {
        title: '闭环率',
        width: 95,
        sorter: (a, b) => {
          const ac = statusCounts(a.issues);
          const bc = statusCounts(b.issues);
          return (
            (a.issues.length ? ac.faded / a.issues.length : 1) -
            (b.issues.length ? bc.faded / b.issues.length : 1)
          );
        },
        render: (_v, row) => {
          const counts = statusCounts(row.issues);
          return rate(
            row.issues.length ? (counts.faded / row.issues.length) * 100 : 100
          );
        },
      },
      {
        title: '最新报告',
        width: 110,
        fixed: 'right',
        sorter: (a, b) => reportName(a).localeCompare(reportName(b)),
        render: (_v, row) => (
          <Link href={reportHref(row.slug)} className="overview-table-link">
            查看报告
          </Link>
        ),
      },
    ],
    [reportHref]
  );

  const teamColumns = React.useMemo<TableProps<TeamRow>['columns']>(
    () => [
      {
        title: '序号',
        width: COLUMN_WIDTHS[0],
        align: 'center',
        render: (_v, _r, index) => <span className="row-num">{index + 1}</span>,
      },
      {
        title: '责任团队',
        dataIndex: 'name',
        key: 'name',
        width: COLUMN_WIDTHS[1],
        align: 'left',
        sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
        sortOrder: teamSort.key === 'name' ? teamSort.order : null,
        render: (value, row) => (
          <span className="overview-expand-label">
            <RightOutlined
              className={`overview-expand-icon ${
                expandedRowKeys.includes(row.id) ? 'is-expanded' : ''
              }`}
            />
            <span>{value}</span>
          </span>
        ),
      },
      {
        title: '负责仓库',
        dataIndex: 'repoCount',
        key: 'repoCount',
        width: COLUMN_WIDTHS[2],
        sorter: (a, b) => a.repoCount - b.repoCount,
        sortOrder: teamSort.key === 'repoCount' ? teamSort.order : null,
        render: (value: number) => `${value} 个`,
      },
      {
        title: '综合体验评分',
        dataIndex: 'score',
        key: 'score',
        width: COLUMN_WIDTHS[3],
        sorter: (a, b) => (a.score ?? -1) - (b.score ?? -1),
        sortOrder: teamSort.key === 'score' ? teamSort.order : null,
        render: (value: number | null) => value?.toFixed(1) ?? '—',
      },
      {
        title: '问题处理进展',
        width: COLUMN_WIDTHS[4],
        render: (_v, row) => progress(row.active, row.backfill, row.faded),
      },
      {
        title: '总问题数',
        key: 'total',
        width: COLUMN_WIDTHS[5],
        sorter: (a, b) => a.total - b.total,
        sortOrder: teamSort.key === 'total' ? teamSort.order : null,
        render: (_v, row) => (
          <button
            type="button"
            className="overview-table-link overview-table-link-strong"
            onClick={(event) => {
              event.stopPropagation();
              openDetails(`${row.name} · 总问题数`, row.repos);
            }}
          >
            {row.total}
          </button>
        ),
      },
      {
        title: '闭环率',
        dataIndex: 'closeRate',
        key: 'closeRate',
        width: COLUMN_WIDTHS[6],
        sorter: (a, b) => a.closeRate - b.closeRate,
        sortOrder: teamSort.key === 'closeRate' ? teamSort.order : null,
        render: (value: number) => rate(value),
      },
      {
        title: '最新报告',
        key: 'report',
        width: COLUMN_WIDTHS[7],
        sorter: (a, b) =>
          (a.repos.map(reportName).sort()[0] ?? '').localeCompare(
            b.repos.map(reportName).sort()[0] ?? ''
          ),
        sortOrder: teamSort.key === 'report' ? teamSort.order : null,
        render: () => <span className="text-slate-300">-</span>,
      },
    ],
    [expandedRowKeys, teamSort]
  );

  return (
    <>
      <Title level={4} className="oj-section-title">
        各仓库对比
      </Title>
      <div className="section-card">
        <div className="tab-bar progress-toolbar-row">
          <Segmented
            className="overview-segmented"
            value={view}
            onChange={(value) => setView(value as 'team' | 'repo')}
            options={[
              { label: '责任团队', value: 'team' },
              { label: '仓库', value: 'repo' },
            ]}
          />
        </div>
        {view === 'team' ? (
          <Table<TeamRow>
            className="overview-ant-table"
            dataSource={displayedTeamRows}
            columns={teamColumns}
            rowKey="id"
            pagination={false}
            tableLayout="fixed"
            scroll={{ x: TABLE_WIDTH }}
            onChange={(_pagination, _filters, sorter) => {
              const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter;
              setTeamSort({
                key: activeSorter.columnKey as TeamSortKey | undefined,
                order: activeSorter.order ?? null,
              });
            }}
            expandable={{
              expandedRowKeys,
              expandRowByClick: true,
              showExpandColumn: false,
              onExpandedRowsChange: (keys) => setExpandedRowKeys([...keys]),
              expandedRowRender: (team) => (
                <div className="overview-expanded-rows">
                  <table
                    className="overview-expanded-table"
                    style={{ minWidth: TABLE_WIDTH }}
                  >
                    <colgroup>
                      {COLUMN_WIDTHS.map((width, index) => (
                        <col key={index} style={{ width }} />
                      ))}
                    </colgroup>
                    <tbody>
                      {team.repos.map((repo, index) => {
                        const counts = statusCounts(repo.issues);
                        return (
                          <tr
                            key={repo.repo}
                            className="overview-expanded-row"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <td className="overview-expanded-cell overview-expanded-cell-index" />
                            <td className="overview-expanded-cell overview-expanded-cell-name">
                              <span className="overview-expanded-repo-name">
                                {repo.slug}
                              </span>
                            </td>
                            <td className="overview-expanded-cell">-</td>
                            <td className="overview-expanded-cell">
                              {repo.scoreOverall?.toFixed(1) ?? '—'}
                            </td>
                            <td className="overview-expanded-cell">
                              {progress(
                                counts.active,
                                counts.backfill,
                                counts.faded
                              )}
                            </td>
                            <td className="overview-expanded-cell">
                              <button
                                type="button"
                                className="overview-table-link overview-table-link-strong"
                                onClick={() =>
                                  openDetails(`${repo.slug} · 总问题数`, [repo])
                                }
                              >
                                {repo.issues.length}
                              </button>
                            </td>
                            <td className="overview-expanded-cell">
                              {rate(
                                repo.issues.length
                                  ? (counts.faded / repo.issues.length) * 100
                                  : 100
                              )}
                            </td>
                            <td className="overview-expanded-cell">
                              <Link
                                href={reportHref(repo.slug)}
                                className="overview-table-link"
                              >
                                查看报告
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ),
            }}
          />
        ) : (
          <Table<RepoRow>
            className="overview-ant-table"
            dataSource={repoRows}
            columns={repoColumns}
            rowKey="repo"
            pagination={false}
            tableLayout="fixed"
            scroll={{ x: 1168 }}
          />
        )}
      </div>
      <Modal
        open={detail !== null}
        onCancel={() => setDetail(null)}
        footer={null}
        width="min(96vw, 1420px)"
        title={detail ? `${detail.title}（共${detail.issues.length}条）` : ''}
        destroyOnHidden
      >
        <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-slate-200">
          <table className="w-full table-fixed border-collapse text-center text-[13px] text-slate-700">
            <thead className="sticky top-0 z-10 bg-slate-50 text-[11px] text-slate-500">
              <tr>
                <th className="w-[6%] px-2 py-3">序号</th>
                <th className="w-[10%] px-2 py-3">仓库</th>
                <th className="w-[12%] px-2 py-3">责任团队</th>
                <th className="w-[9%] px-2 py-3">优先级</th>
                <th className="w-[12%] px-2 py-3">状态</th>
                <th className="w-[25%] px-2 py-3">问题描述</th>
                <th className="w-[18%] px-2 py-3">建议动作</th>
                <th className="w-[8%] px-2 py-3">相关报告</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {detail?.issues.map((issue, index) => (
                <tr key={issue.key} className="hover:bg-slate-50/80">
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3">{issue.slug}</td>
                  <td className="px-2 py-3">{detail.teams[issue.slug]}</td>
                  <td className="px-2 py-3">{issue.pri}</td>
                  <td className="px-2 py-3">{issue.status}</td>
                  <td className="px-2 py-3">{issue.kb}</td>
                  <td className="px-2 py-3">{issue.action}</td>
                  <td className="px-2 py-3">
                    <Link
                      href={reportHref(issue.slug)}
                      className="overview-table-link text-blue-600"
                    >
                      查看报告
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default CiRepoProgressSection;
