import React, { useMemo, useState } from 'react';
import { FilterFilled } from '@ant-design/icons';
import { Dropdown, Modal, Radio, Tag, Tooltip } from 'antd';
import { SeverityBadge } from './Badges';
import { PAIN_STATUS_CFG, SEVERITY_RANK } from './constants';
import type { DashboardIssue, IssueModalState, Severity } from './types';

const TEAM_FILTER_ALL = '__ALL__';
const OTHER_TEAM_LABELS = new Set(['其他', '其它', '其他团队', '其它团队']);

type IssueDetailModalProps = {
  state: IssueModalState;
  onClose: () => void;
};

type IssueSortKey =
  | 'repo'
  | 'team'
  | 'stage'
  | 'issueType'
  | 'description'
  | 'severity'
  | 'status'
  | 'owner'
  | 'report';

type SortOrder = 'asc' | 'desc';

type ReportEntry = {
  fileKey: string;
  taskId?: string;
  painIndex?: number;
};

const parseChildId = (
  raw: string
): { fileKey: string; taskId?: string; painIndex?: number } | null => {
  const text = String(raw || '').trim();
  if (!text) return null;

  const [fileKeyRaw, taskIdRaw, painIndexRaw] = text.split('#');
  const fileKey = String(fileKeyRaw || '').trim();
  if (!fileKey) return null;

  const taskId = String(taskIdRaw || '').trim();
  const painIndexNum = Number.parseInt(String(painIndexRaw || '').trim(), 10);

  return {
    fileKey,
    taskId: taskId || undefined,
    painIndex: Number.isNaN(painIndexNum) ? undefined : painIndexNum,
  };
};

const getRepoName = (issue: DashboardIssue) =>
  issue.repoName || issue.projectName || issue.projectKey || '--';

const getReportDisplayText = (fileKey: string) => {
  const last = fileKey.lastIndexOf('_');
  if (last <= 0) return fileKey;
  const prev = fileKey.lastIndexOf('_', last - 1);
  if (prev < 0 || prev + 1 >= fileKey.length) return fileKey;
  return fileKey.slice(prev + 1);
};

const getReportEntries = (issue: DashboardIssue): ReportEntry[] => {
  const childIds = issue.childIds ?? [];
  const entries: ReportEntry[] = [];
  const seen = new Set<string>();

  for (let i = childIds.length - 1; i >= 0; i -= 1) {
    const parsed = parseChildId(String(childIds[i] || ''));
    if (!parsed || seen.has(parsed.fileKey)) continue;

    seen.add(parsed.fileKey);
    entries.push(parsed);
    if (entries.length >= 3) break;
  }

  if (!entries.length) {
    const currentIssueEntry = parseChildId(String(issue.id || ''));
    if (
      currentIssueEntry &&
      (!issue.fileKey || currentIssueEntry.fileKey === issue.fileKey)
    ) {
      entries.push(currentIssueEntry);
    } else if (issue.fileKey) {
      entries.push({
        fileKey: issue.fileKey,
      });
    }
  }

  return entries;
};

const localeCompare = (left: string, right: string) =>
  left.localeCompare(right, 'zh-Hans-CN', { sensitivity: 'base' });

const isOtherTeam = (teamName: string) =>
  OTHER_TEAM_LABELS.has(
    String(teamName || '')
      .trim()
      .replace(/\s+/g, '')
  );

const compareTeamWithOtherLast = (
  left: string,
  right: string,
  order: SortOrder
): number => {
  const normalizedLeft = String(left || '').trim();
  const normalizedRight = String(right || '').trim();
  const leftIsOther = isOtherTeam(normalizedLeft);
  const rightIsOther = isOtherTeam(normalizedRight);

  if (leftIsOther && !rightIsOther) return 1;
  if (!leftIsOther && rightIsOther) return -1;

  const result = localeCompare(normalizedLeft, normalizedRight);
  return order === 'asc' ? result : -result;
};

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  state,
  onClose,
}) => {
  const [sortKey, setSortKey] = useState<IssueSortKey>('team');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [teamFilter, setTeamFilter] = useState<string>(TEAM_FILTER_ALL);

  const teamOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        state.issues
          .map((issue) => String(issue.team || '').trim())
          .filter(Boolean)
      )
    );
    values.sort((left, right) => compareTeamWithOtherLast(left, right, 'asc'));
    return values;
  }, [state.issues]);

  const displayedIssues = useMemo(() => {
    const filtered =
      teamFilter === TEAM_FILTER_ALL
        ? state.issues
        : state.issues.filter(
            (issue) => String(issue.team || '').trim() === teamFilter
          );

    const withMeta = filtered.map((issue, index) => {
      const entries = getReportEntries(issue);
      const reportText = entries.length
        ? getReportDisplayText(entries[0].fileKey)
        : '';
      const severityRank =
        SEVERITY_RANK[issue.severity as Exclude<Severity, ''>] ?? 0;
      const statusLabel =
        PAIN_STATUS_CFG[String(issue.status || '')]?.label || '';

      return {
        issue,
        index,
        reportText,
        severityRank,
        statusLabel,
      };
    });

    withMeta.sort((left, right) => {
      let result = 0;
      switch (sortKey) {
        case 'repo':
          result = localeCompare(
            getRepoName(left.issue),
            getRepoName(right.issue)
          );
          break;
        case 'team':
          result = compareTeamWithOtherLast(
            left.issue.team,
            right.issue.team,
            sortOrder
          );
          break;
        case 'stage':
          result = localeCompare(
            left.issue.journeyStage || '',
            right.issue.journeyStage || ''
          );
          break;
        case 'issueType':
          result = localeCompare(
            left.issue.issueType || '',
            right.issue.issueType || ''
          );
          break;
        case 'description':
          result = localeCompare(
            left.issue.description || '',
            right.issue.description || ''
          );
          break;
        case 'severity':
          result = left.severityRank - right.severityRank;
          break;
        case 'status':
          result = localeCompare(left.statusLabel, right.statusLabel);
          break;
        case 'owner':
          result = localeCompare(
            left.issue.teamOwner || left.issue.owner || '',
            right.issue.teamOwner || right.issue.owner || ''
          );
          break;
        case 'report':
          result = localeCompare(left.reportText, right.reportText);
          break;
        default:
          result = 0;
      }

      if (sortKey === 'team') {
        if (result !== 0) return result;
      } else {
        if (result !== 0) return sortOrder === 'asc' ? result : -result;
      }

      return left.index - right.index;
    });

    return withMeta.map((item) => item.issue);
  }, [sortKey, sortOrder, state.issues, teamFilter]);

  const handleSort = (nextSortKey: IssueSortKey) => {
    if (sortKey === nextSortKey) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(nextSortKey);
    setSortOrder('asc');
  };

  const sortArrow = (key: IssueSortKey) => {
    if (sortKey !== key) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const renderSortableHeader = (label: string, key: IssueSortKey) => (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-left font-semibold text-slate-500 hover:text-slate-700"
      onClick={() => handleSort(key)}
    >
      <span>{label}</span>
      <span className="text-[10px] leading-none">{sortArrow(key)}</span>
    </button>
  );

  return (
    <Modal
      open={state.open}
      onCancel={onClose}
      footer={null}
      width="min(96vw, 1420px)"
      title={state.title}
      destroyOnHidden
    >
      <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-slate-200">
        <table className="w-full table-fixed border-collapse text-[12px] text-slate-700 md:text-[13px]">
          <thead className="sticky top-0 z-10 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 md:text-[11px]">
            <tr>
              <th className="w-[96px] px-2 py-2 text-left md:w-[100px] md:px-3 md:py-3">
                {renderSortableHeader('仓库', 'repo')}
              </th>
              <th className="w-[120px] px-2 py-2 text-left md:w-[100px] md:px-2 md:py-3">
                <div className="flex items-center gap-1.5">
                  {renderSortableHeader('责任团队', 'team')}
                  <Dropdown
                    trigger={['click']}
                    placement="bottomLeft"
                    popupRender={() => (
                      <div
                        className="w-[200px] rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2 pb-2 text-[11px] font-medium tracking-wide text-slate-400">
                          责任团队筛选
                        </div>
                        <Radio.Group
                          value={teamFilter}
                          onChange={(e) =>
                            setTeamFilter(
                              String(e.target.value || TEAM_FILTER_ALL)
                            )
                          }
                          className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1 pb-1"
                        >
                          <Radio value={TEAM_FILTER_ALL}>全部</Radio>
                          {teamOptions.map((team) => (
                            <Radio key={team} value={team}>
                              {team}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </div>
                    )}
                  >
                    <button
                      type="button"
                      aria-label="筛选责任团队"
                      title="筛选责任团队"
                      className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
                        teamFilter === TEAM_FILTER_ALL
                          ? 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FilterFilled className="text-[12px]" />
                    </button>
                  </Dropdown>
                </div>
              </th>
              <th className="w-[100px] px-2 py-2 text-left lg:table-cell">
                {renderSortableHeader('阶段', 'stage')}
              </th>
              <th className="w-[100px] px-2 py-2 text-left lg:table-cell">
                {renderSortableHeader('问题类型', 'issueType')}
              </th>
              <th className="w-[220px] px-2 py-2 text-left md:w-[280px] md:px-3 md:py-3">
                {renderSortableHeader('问题描述', 'description')}
              </th>
              <th className="w-[96px] px-2 py-2 text-left md:table-cell">
                {renderSortableHeader('严重程度', 'severity')}
              </th>
              <th className="w-[84px] px-2 py-2 text-left md:w-[90px] md:px-3 md:py-3">
                {renderSortableHeader('状态', 'status')}
              </th>
              <th className="w-[88px] px-2 py-2 text-left md:w-[90px] md:px-3 md:py-3">
                {renderSortableHeader('责任人', 'owner')}
              </th>
              <th className="w-[96px] px-2 py-2 text-left md:w-[120px] md:px-3 md:py-3">
                {renderSortableHeader('相关报告', 'report')}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedIssues.length > 0 ? (
              displayedIssues.map((issue, index) => {
                const reportEntries = getReportEntries(issue);
                return (
                  <tr
                    key={`${issue.id}-${index}`}
                    className="border-t border-slate-100 align-top transition-colors hover:bg-slate-50"
                  >
                    <td className="break-all px-2 py-2 font-medium text-slate-900 md:px-3 md:py-3">
                      {getRepoName(issue)}
                    </td>
                    <td className="break-all px-2 py-2 md:px-2 md:py-3">
                      {issue.team || '--'}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 lg:table-cell">
                      {issue.journeyStage || '--'}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 lg:table-cell">
                      {issue.issueType || '--'}
                    </td>
                    <td className="max-w-[240px] px-2 py-2 md:max-w-[340px] md:px-3 md:py-3">
                      <Tooltip title={issue.description || '--'}>
                        <span className="line-clamp-2 cursor-default">
                          {issue.description || '--'}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 md:table-cell">
                      <SeverityBadge severity={issue.severity} />
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 md:px-3 md:py-3">
                      {(() => {
                        const cfg = PAIN_STATUS_CFG[String(issue.status || '')];
                        if (!cfg)
                          return <span className="text-slate-300">--</span>;
                        return (
                          <Tag
                            className="overview-ant-tag"
                            style={{
                              background: cfg.tagBg,
                              color: cfg.tagColor,
                              borderColor: cfg.tagBorder,
                            }}
                          >
                            {cfg.label}
                          </Tag>
                        );
                      })()}
                    </td>
                    <td className="break-all px-2 py-2 md:px-3 md:py-3">
                      {issue.teamOwner || issue.owner || '--'}
                    </td>
                    <td className="px-2 py-2 text-[12px] md:px-3 md:py-3">
                      {reportEntries.length ? (
                        reportEntries.map(({ fileKey, taskId, painIndex }) => {
                          const search = new URLSearchParams();
                          search.set('project', fileKey);
                          if (taskId) {
                            search.set('focusTaskId', taskId);
                          }
                          if (typeof painIndex === 'number') {
                            search.set('focusPainIndex', String(painIndex));
                            search.set('autoOpenPain', '1');
                          }
                          const href = `/intelligent-analysis/community-experience?${search.toString()}`;

                          return (
                            <div
                              key={`${fileKey}-${taskId || ''}-${
                                painIndex ?? ''
                              }`}
                              className="leading-5"
                            >
                              <a
                                href={href}
                                className="overview-table-link text-blue-600"
                              >
                                {getReportDisplayText(fileKey)}
                              </a>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-slate-300">--</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-12 text-center text-sm text-slate-400"
                >
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default IssueDetailModal;
