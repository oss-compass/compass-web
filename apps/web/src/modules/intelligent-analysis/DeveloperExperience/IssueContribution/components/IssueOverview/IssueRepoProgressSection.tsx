import React from 'react';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Segmented, Table, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import { IssueProgressBar } from '../../../../UserJourney/OverviewDashboard/ProgressComponents';
import { fetchIssueTopPains } from '../../data';
import type { IssueOverviewRepo } from '../../types';
import IssuePainDetailModal from './IssuePainDetailModal';

const { Title } = Typography;

type ProgressView = 'team' | 'repo';

type TeamRow = {
  id: string;
  name: string;
  repoCount: number;
  score: number;
  painTotal: number;
  painPending: number;
  painInProgress: number;
  painResolved: number;
  closeRate: number;
  repos: IssueOverviewRepo[];
};

type Props = {
  org?: string;
  repos: IssueOverviewRepo[];
  reportHref: (community: string, period?: string) => string;
  onOpenScoreTrend: (repo: IssueOverviewRepo) => void;
};

const TEAM_COLUMN_WIDTHS = [64, 210, 110, 138, 230, 110, 100, 110] as const;
const TEAM_TABLE_WIDTH = TEAM_COLUMN_WIDTHS.reduce(
  (total, width) => total + width,
  0
);

const painCount = (repo: IssueOverviewRepo) =>
  repo.stages.reduce((total, stage) => total + stage.painCount, 0);

const reportSortName = (repo: IssueOverviewRepo) =>
  `${repo.repoShort}_${repo.period}`;

const teamReportSortName = (team: TeamRow) =>
  team.repos.map(reportSortName).sort((a, b) => a.localeCompare(b))[0] ?? '';

const buildTeamRows = (repos: IssueOverviewRepo[]): TeamRow[] => {
  const groups = new Map<string, IssueOverviewRepo[]>();
  repos.forEach((repo) => {
    const team = repo.teamName || '未分配团队';
    groups.set(team, [...(groups.get(team) ?? []), repo]);
  });
  return Array.from(groups.entries())
    .map(([name, teamRepos]) => {
      const painTotal = teamRepos.reduce(
        (sum, repo) => sum + repo.painTotal,
        0
      );
      const painPending = teamRepos.reduce(
        (sum, repo) => sum + repo.painPending,
        0
      );
      const painInProgress = teamRepos.reduce(
        (sum, repo) => sum + repo.painInProgress,
        0
      );
      const painResolved = teamRepos.reduce(
        (sum, repo) => sum + repo.painResolved,
        0
      );
      const scoreWeight = teamRepos.reduce(
        (sum, repo) => sum + repo.idxTotal * Math.max(repo.nTotal, 1),
        0
      );
      const totalWeight = teamRepos.reduce(
        (sum, repo) => sum + Math.max(repo.nTotal, 1),
        0
      );
      return {
        id: name,
        name,
        repoCount: teamRepos.length,
        score: totalWeight ? scoreWeight / totalWeight : 0,
        painTotal,
        painPending,
        painInProgress,
        painResolved,
        closeRate: painTotal ? (painResolved / painTotal) * 100 : 100,
        repos: teamRepos,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
};

const IssueRepoProgressSection: React.FC<Props> = ({
  org,
  repos,
  reportHref,
  onOpenScoreTrend,
}) => {
  const [view, setView] = React.useState<ProgressView>('team');
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<React.Key[]>([]);
  const [detailTarget, setDetailTarget] = React.useState<
    | { type: 'team'; name: string }
    | { type: 'repo'; repo: IssueOverviewRepo }
    | null
  >(null);
  const teamRows = React.useMemo(() => buildTeamRows(repos), [repos]);

  const { data: detailData, isFetching: detailLoading } = useQuery({
    queryKey: ['issue-progress-pains', org, detailTarget],
    queryFn: ({ signal }) =>
      fetchIssueTopPains(
        {
          org,
          repoPeriods:
            detailTarget?.type === 'team'
              ? teamRows
                  .find((team) => team.name === detailTarget.name)
                  ?.repos.map((repo) => `${repo.repoShort}@${repo.period}`)
                  .join(',')
              : detailTarget?.type === 'repo'
              ? `${detailTarget.repo.repoShort}@${detailTarget.repo.period}`
              : undefined,
          page: 1,
          pageSize: 5000,
        },
        signal
      ),
    enabled: detailTarget !== null,
    keepPreviousData: true,
  });

  const openPainDetails = (
    target:
      | { type: 'team'; name: string }
      | { type: 'repo'; repo: IssueOverviewRepo }
  ) => {
    setDetailTarget(target);
  };

  const progressCell = (
    pending: number,
    inProgress: number,
    resolved: number
  ) => (
    <IssueProgressBar
      pending={pending}
      inProgress={inProgress}
      resolved={resolved}
    />
  );
  const closeRateCell = (rate: number) => (
    <span className="overview-close-rate-value text-sm font-semibold text-slate-700">
      {rate.toFixed(0)}%
    </span>
  );
  const repoScoreCell = (repo: IssueOverviewRepo) => (
    <div className="overview-close-rate-cell">
      {repo.idxTrend.length > 1 ? (
        <button
          type="button"
          className="bm-trend-sparkline"
          title="查看得分趋势"
          onClick={(event) => {
            event.stopPropagation();
            onOpenScoreTrend(repo);
          }}
        >
          <CloseRateSparkline
            values={repo.idxTrend}
            minValue={0}
            maxValue={100}
          />
        </button>
      ) : null}
      <span className="text-sm font-semibold text-slate-700">
        {repo.idxTotal.toFixed(1)}
      </span>
    </div>
  );

  const repoColumns = React.useMemo<TableProps<IssueOverviewRepo>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: TEAM_COLUMN_WIDTHS[0],
        align: 'center',
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: '仓库',
        dataIndex: 'repoShort',
        key: 'repoShort',
        width: 170,
        sorter: (a, b) => a.repoShort.localeCompare(b.repoShort),
        render: (value, record) => (
          <Tooltip
            title={`${record.periodLabel} · 置信度 ${record.confidence}`}
          >
            <span className="font-semibold text-slate-700">{value}</span>
          </Tooltip>
        ),
      },
      {
        title: '责任团队',
        dataIndex: 'teamName',
        key: 'teamName',
        width: 150,
        ellipsis: true,
        sorter: (a, b) => a.teamName.localeCompare(b.teamName, 'zh-CN'),
      },
      {
        title: '综合体验评分',
        dataIndex: 'idxTotal',
        key: 'idxTotal',
        width: 138,
        sorter: (a, b) => a.idxTotal - b.idxTotal,
        render: (_value: number, record) => repoScoreCell(record),
      },
      {
        title: '问题处理进展',
        key: 'progress',
        width: 230,
        render: (_value, record) =>
          progressCell(
            record.painPending,
            record.painInProgress,
            record.painResolved
          ),
      },
      {
        title: '总问题数',
        key: 'painTotal',
        width: 105,
        sorter: (a, b) => a.painTotal - b.painTotal,
        render: (_value, record) => (
          <button
            type="button"
            className="overview-table-link overview-table-link-strong"
            onClick={() => openPainDetails({ type: 'repo', repo: record })}
          >
            {record.painTotal}
          </button>
        ),
      },
      {
        title: '闭环率',
        dataIndex: 'painCloseRate',
        key: 'closeRate',
        width: 95,
        sorter: (a, b) => a.painCloseRate - b.painCloseRate,
        render: (value: number) => closeRateCell(value),
      },
      {
        title: '重点痛点',
        key: 'painCount',
        width: 100,
        sorter: (a, b) => painCount(a) - painCount(b),
        render: (_value, record) => painCount(record),
      },
      {
        title: '最新报告',
        key: 'report',
        width: 100,
        fixed: 'right',
        sorter: (a, b) =>
          reportSortName(a).localeCompare(reportSortName(b), 'zh-CN'),
        render: (_value, record) => (
          <Link
            href={reportHref(record.community, record.period)}
            className="overview-table-link"
          >
            查看报告
          </Link>
        ),
      },
    ],
    [onOpenScoreTrend, reportHref]
  );

  const teamColumns = React.useMemo<TableProps<TeamRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: 64,
        align: 'center',
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: '责任团队',
        dataIndex: 'name',
        key: 'name',
        width: TEAM_COLUMN_WIDTHS[1],
        align: 'left',
        sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
        render: (value, record) => (
          <span className="overview-expand-label">
            <RightOutlined
              className={`overview-expand-icon ${
                expandedRowKeys.includes(record.id) ? 'is-expanded' : ''
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
        width: TEAM_COLUMN_WIDTHS[2],
        sorter: (a, b) => a.repoCount - b.repoCount,
        render: (value: number) => `${value} 个`,
      },
      {
        title: '综合体验评分',
        dataIndex: 'score',
        key: 'score',
        width: TEAM_COLUMN_WIDTHS[3],
        sorter: (a, b) => a.score - b.score,
        render: (value: number) => (
          <span className="text-sm font-semibold text-slate-700">
            {value.toFixed(1)}
          </span>
        ),
      },
      {
        title: '问题处理进展',
        key: 'progress',
        width: TEAM_COLUMN_WIDTHS[4],
        render: (_value, record) =>
          progressCell(
            record.painPending,
            record.painInProgress,
            record.painResolved
          ),
      },
      {
        title: '总问题数',
        key: 'painTotal',
        width: TEAM_COLUMN_WIDTHS[5],
        sorter: (a, b) => a.painTotal - b.painTotal,
        render: (_value, record) => (
          <button
            type="button"
            className="overview-table-link overview-table-link-strong"
            onClick={(event) => {
              event.stopPropagation();
              openPainDetails({ type: 'team', name: record.name });
            }}
          >
            {record.painTotal}
          </button>
        ),
      },
      {
        title: '闭环率',
        dataIndex: 'closeRate',
        key: 'closeRate',
        width: TEAM_COLUMN_WIDTHS[6],
        sorter: (a, b) => a.closeRate - b.closeRate,
        render: (value: number) => closeRateCell(value),
      },
      {
        title: '最新报告',
        key: 'report',
        width: TEAM_COLUMN_WIDTHS[7],
        sorter: (a, b) =>
          teamReportSortName(a).localeCompare(teamReportSortName(b), 'zh-CN'),
        render: () => <span className="text-slate-300">-</span>,
      },
    ],
    [expandedRowKeys]
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
            onChange={(value) => setView(value as ProgressView)}
            options={[
              { label: '责任团队', value: 'team' },
              { label: '仓库', value: 'repo' },
            ]}
          />
        </div>
        {view === 'team' ? (
          <Table<TeamRow>
            className="overview-ant-table"
            dataSource={teamRows}
            columns={teamColumns}
            rowKey="id"
            pagination={false}
            tableLayout="fixed"
            scroll={{ x: TEAM_TABLE_WIDTH }}
            locale={{ emptyText: '暂无责任团队数据' }}
            expandable={{
              expandedRowKeys,
              expandRowByClick: true,
              showExpandColumn: false,
              onExpandedRowsChange: (keys) => setExpandedRowKeys([...keys]),
              expandedRowRender: (team) => (
                <div className="overview-expanded-rows">
                  <table
                    className="overview-expanded-table"
                    style={{ minWidth: TEAM_TABLE_WIDTH }}
                  >
                    <colgroup>
                      {TEAM_COLUMN_WIDTHS.map((width, index) => (
                        <col key={index} style={{ width }} />
                      ))}
                    </colgroup>
                    <tbody>
                      {team.repos.map((repo, index) => (
                        <tr
                          key={`${repo.community}-${repo.period}`}
                          className="overview-expanded-row"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="overview-expanded-cell overview-expanded-cell-index" />
                          <td className="overview-expanded-cell overview-expanded-cell-name">
                            <span className="overview-expanded-repo-name">
                              {repo.repoShort}
                            </span>
                          </td>
                          <td className="overview-expanded-cell overview-expanded-cell-empty">
                            -
                          </td>
                          <td className="overview-expanded-cell">
                            {repoScoreCell(repo)}
                          </td>
                          <td className="overview-expanded-cell">
                            {progressCell(
                              repo.painPending,
                              repo.painInProgress,
                              repo.painResolved
                            )}
                          </td>
                          <td className="overview-expanded-cell">
                            <button
                              type="button"
                              className="overview-table-link overview-table-link-strong"
                              onClick={() =>
                                openPainDetails({ type: 'repo', repo })
                              }
                            >
                              {repo.painTotal}
                            </button>
                          </td>
                          <td className="overview-expanded-cell">
                            {closeRateCell(repo.painCloseRate)}
                          </td>
                          <td className="overview-expanded-cell">
                            <Link
                              href={reportHref(repo.community, repo.period)}
                              className="overview-table-link"
                            >
                              查看报告
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
              rowExpandable: (team) => team.repos.length > 0,
            }}
          />
        ) : (
          <Table<IssueOverviewRepo>
            className="overview-ant-table"
            dataSource={repos}
            columns={repoColumns}
            rowKey={(repo) => `${repo.community}-${repo.period}`}
            pagination={false}
            tableLayout="fixed"
            scroll={{ x: 1252 }}
            locale={{ emptyText: '暂无仓库数据' }}
          />
        )}
      </div>
      <IssuePainDetailModal
        open={detailTarget !== null}
        onClose={() => setDetailTarget(null)}
        loading={detailLoading}
        items={detailData?.items ?? []}
        repoTeams={Object.fromEntries(
          repos.map((repo) => [repo.repoShort, repo.teamName])
        )}
        reportHref={reportHref}
        title={
          detailTarget
            ? `${
                detailTarget.type === 'team'
                  ? detailTarget.name
                  : detailTarget.repo.repoShort
              } · 总问题数`
            : '问题详情'
        }
      />
    </>
  );
};

export default IssueRepoProgressSection;
