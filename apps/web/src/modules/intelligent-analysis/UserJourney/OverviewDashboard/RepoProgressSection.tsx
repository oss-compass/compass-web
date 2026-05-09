import React from 'react';
import { Segmented, Select } from 'antd';
import type { ProgressTab, RepoProgressRow, RepoSortKey } from './types';
import { formatPercent, formatScore, getAverage } from './utils';

type RepoProgressSectionProps = {
  currentTab: ProgressTab;
  onTabChange: (tab: ProgressTab) => void;
  teamFilter: string;
  teamOptions: string[];
  onTeamFilterChange: (team: string) => void;
  isLoading: boolean;
  sortedRows: RepoProgressRow[];
  sortArrow: (key: RepoSortKey) => string;
  onSort: (key: RepoSortKey) => void;
  onOpenRepoIssues: (
    row: RepoProgressRow,
    bucket: 'pending' | 'inProgress' | 'resolved' | 'na' | 'total'
  ) => void;
};

const RepoProgressSection: React.FC<RepoProgressSectionProps> = ({
  currentTab,
  onTabChange,
  teamFilter,
  teamOptions,
  onTeamFilterChange,
  isLoading,
  sortedRows,
  sortArrow,
  onSort,
  onOpenRepoIssues,
}) => {
  const tableSummary = sortedRows.reduce(
    (acc, row) => {
      const metrics = row[currentTab];
      acc.pending += metrics.pending;
      acc.inProgress += metrics.inProgress;
      acc.resolved += metrics.resolved;
      acc.total += metrics.total;
      acc.na += metrics.na;
      return acc;
    },
    { pending: 0, inProgress: 0, resolved: 0, total: 0, na: 0 }
  );
  const closeRate =
    tableSummary.total > 0
      ? Number(((tableSummary.resolved / tableSummary.total) * 100).toFixed(1))
      : 0;

  return (
    <>
      <div className="section-title">🗂️ 各仓库进展</div>
      <div className="section-card">
        <div className="tab-bar">
          <Segmented
            className="overview-segmented"
            value={currentTab}
            onChange={(value) => onTabChange(value as ProgressTab)}
            options={[
              { label: '总体问题', value: 'overall' },
              { label: '阻塞问题', value: 'blocking' },
            ]}
          />
          <div className="team-filter">
            <Select
              value={teamFilter || undefined}
              onChange={(value) => onTeamFilterChange(value ?? '')}
              allowClear
              placeholder="全部团队"
              className="overview-select"
              popupMatchSelectWidth={false}
              options={teamOptions.map((team) => ({
                value: team,
                label: team,
              }))}
            />
          </div>
        </div>

        <div className="table-wrapper">
          {isLoading ? (
            <div className="px-5 py-8 text-center text-sm text-slate-400">
              加载中...
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>仓库</th>
                  <th className="sortable" onClick={() => onSort('team')}>
                    责任团队{' '}
                    <span className="sort-arrow">{sortArrow('team')}</span>
                  </th>
                  <th className="sortable" onClick={() => onSort('score')}>
                    评分{' '}
                    <span className="sort-arrow">{sortArrow('score')}</span>
                  </th>
                  <th className="sortable" onClick={() => onSort('rate')}>
                    成功率{' '}
                    <span className="sort-arrow">{sortArrow('rate')}</span>
                  </th>
                  <th
                    className="sortable"
                    style={{ color: '#f97316' }}
                    onClick={() => onSort('pending')}
                  >
                    待处理{' '}
                    <span className="sort-arrow">{sortArrow('pending')}</span>
                  </th>
                  <th
                    className="sortable"
                    style={{ color: '#f59e0b' }}
                    onClick={() => onSort('inProgress')}
                  >
                    进行中{' '}
                    <span className="sort-arrow">
                      {sortArrow('inProgress')}
                    </span>
                  </th>
                  <th
                    className="sortable"
                    style={{ color: '#10b981' }}
                    onClick={() => onSort('resolved')}
                  >
                    已闭环{' '}
                    <span className="sort-arrow">{sortArrow('resolved')}</span>
                  </th>
                  <th className="sortable" onClick={() => onSort('total')}>
                    总问题数{' '}
                    <span className="sort-arrow">{sortArrow('total')}</span>
                  </th>
                  <th className="sortable" onClick={() => onSort('closeRate')}>
                    闭环率{' '}
                    <span className="sort-arrow">{sortArrow('closeRate')}</span>
                  </th>
                  <th style={{ color: '#b0b7c3' }}>不需要修复</th>
                  <th>详细报告</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.length > 0 ? (
                  sortedRows.map((row, index) => {
                    const metrics = row[currentTab];
                    return (
                      <tr key={row.id}>
                        <td className="row-num">{index + 1}</td>
                        <td>{row.name}</td>
                        <td>{row.team}</td>
                        <td>{formatScore(row.score)}</td>
                        <td>{formatPercent(row.successRate)}</td>
                        <td>
                          <span
                            className="clickable-count"
                            onClick={() => onOpenRepoIssues(row, 'pending')}
                          >
                            {metrics.pending}
                          </span>
                        </td>
                        <td>
                          <span
                            className="clickable-count"
                            onClick={() => onOpenRepoIssues(row, 'inProgress')}
                          >
                            {metrics.inProgress}
                          </span>
                        </td>
                        <td>
                          <span
                            className="clickable-count"
                            onClick={() => onOpenRepoIssues(row, 'resolved')}
                          >
                            {metrics.resolved}
                          </span>
                        </td>
                        <td>
                          <span
                            className="clickable-count total-deep"
                            onClick={() => onOpenRepoIssues(row, 'total')}
                          >
                            {metrics.total}
                          </span>
                        </td>
                        <td>{formatPercent(metrics.closeRate)}</td>
                        <td>
                          <span
                            className="clickable-count na-cell"
                            onClick={() => onOpenRepoIssues(row, 'na')}
                          >
                            {metrics.na}
                          </span>
                        </td>
                        <td>
                          <span
                            className="detail-arrow"
                            onClick={() => onOpenRepoIssues(row, 'total')}
                          >
                            →
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={12}
                      className="px-5 py-8 text-center text-sm text-slate-400"
                    >
                      暂无匹配仓库
                    </td>
                  </tr>
                )}
              </tbody>
              {sortedRows.length > 0 && (
                <tfoot>
                  <tr>
                    <td />
                    <td colSpan={2}>
                      <strong>总计</strong>
                    </td>
                    <td>
                      {formatScore(
                        getAverage(sortedRows.map((row) => row.score))
                      )}
                    </td>
                    <td>
                      {formatPercent(
                        getAverage(sortedRows.map((row) => row.successRate))
                      )}
                    </td>
                    <td>{tableSummary.pending}</td>
                    <td>{tableSummary.inProgress}</td>
                    <td>{tableSummary.resolved}</td>
                    <td>{tableSummary.total}</td>
                    <td>{formatPercent(closeRate)}</td>
                    <td className="na-cell">{tableSummary.na}</td>
                    <td>—</td>
                  </tr>
                </tfoot>
              )}
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default RepoProgressSection;
