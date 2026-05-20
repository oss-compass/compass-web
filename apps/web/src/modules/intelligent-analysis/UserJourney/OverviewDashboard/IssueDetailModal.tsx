import React, { useEffect, useMemo, useState } from 'react';
import { FilterFilled } from '@ant-design/icons';
import { Button, Dropdown, Input, Modal, Radio, Tag, Tooltip } from 'antd';
import { SeverityBadge } from './Badges';
import { PAIN_STATUS_CFG, SEVERITY_RANK } from './constants';
import type { DashboardIssue, IssueModalState, Severity } from './types';
import { updateOverviewParentPain } from '../rawData/apiClient';
import taskDefinitions from '../rawData/task_definitions.json';

const TEAM_FILTER_ALL = '__ALL__';
const STAGE_FILTER_ALL = TEAM_FILTER_ALL;
const SEVERITY_FILTER_ALL = TEAM_FILTER_ALL;
const STATUS_FILTER_ALL = TEAM_FILTER_ALL;
const OTHER_TEAM_LABELS = new Set(['其他', '其它', '其他团队', '其它团队']);

type TaskDefinition = {
  task_id: string;
  name: string;
};

const TASK_DEF_MAP = (
  taskDefinitions as { tasks: Record<string, TaskDefinition> }
).tasks as Record<string, TaskDefinition>;

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
  painId?: string;
  fileKey: string;
  taskId?: string;
};

type ParentPainHistoryItem = {
  from_status?: string;
  to_status?: string;
  action?: string;
  reason?: string | null;
  by?: string | null;
  at?: string;
};

const parseChildId = (
  raw: string
): { painId: string; fileKey: string; taskId?: string } | null => {
  const text = String(raw || '').trim();
  if (!text) return null;

  const [fileKeyRaw, taskIdRaw] = text.split('#');
  const fileKey = String(fileKeyRaw || '').trim();
  if (!fileKey) return null;

  const taskId = String(taskIdRaw || '').trim();

  return {
    painId: text,
    fileKey,
    taskId: taskId || undefined,
  };
};

const getRepoName = (issue: DashboardIssue) =>
  issue.repoName || issue.projectName || issue.projectKey || '--';

const getIssueTaskLabel = (issue: DashboardIssue) => {
  const taskId =
    issue.taskId || (issue as unknown as { task_id?: string }).task_id;
  if (!taskId) return issue.issueType || '--';
  return (
    TASK_DEF_MAP[String(taskId)]?.name || issue.issueType || String(taskId)
  );
};

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
  const [stageFilter, setStageFilter] = useState<string>(STAGE_FILTER_ALL);
  const [severityFilter, setSeverityFilter] =
    useState<string>(SEVERITY_FILTER_ALL);
  const [statusFilter, setStatusFilter] = useState<string>(STATUS_FILTER_ALL);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusModalIssue, setStatusModalIssue] =
    useState<DashboardIssue | null>(null);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<
    number | null
  >(null);
  const [rollbackModalOpen, setRollbackModalOpen] = useState(false);
  const [rollbackTargetStatus, setRollbackTargetStatus] = useState<string>('');
  const [rollbackBy, setRollbackBy] = useState('');
  const [rollbackReason, setRollbackReason] = useState('');
  const [rollbackSubmitting, setRollbackSubmitting] = useState(false);
  const [issueOverrides, setIssueOverrides] = useState<
    Record<string, Partial<DashboardIssue>>
  >({});

  useEffect(() => {
    if (!statusModalOpen) {
      setSelectedHistoryIndex(null);
    }
  }, [statusModalOpen]);

  const issuesWithOverrides = useMemo(() => {
    if (!Object.keys(issueOverrides).length) return state.issues;
    return state.issues.map((issue) => {
      const id = String(issue.id || '');
      const override = issueOverrides[id];
      return override ? ({ ...issue, ...override } as DashboardIssue) : issue;
    });
  }, [issueOverrides, state.issues]);

  const teamOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issuesWithOverrides
          .map((issue) => String(issue.team || '').trim())
          .filter(Boolean)
      )
    );
    values.sort((left, right) => compareTeamWithOtherLast(left, right, 'asc'));
    return values;
  }, [issuesWithOverrides]);

  const stageOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issuesWithOverrides
          .map((issue) => String(issue.journeyStage || '').trim())
          .filter(Boolean)
      )
    );
    values.sort(localeCompare);
    return values;
  }, [issuesWithOverrides]);

  const severityOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issuesWithOverrides
          .map((issue) => String(issue.severity || '').trim())
          .filter(Boolean)
      )
    );
    values.sort((left, right) => {
      const leftRank =
        SEVERITY_RANK[left as Exclude<Severity, ''>] ??
        (Number.isFinite(Number(left)) ? Number(left) : 0);
      const rightRank =
        SEVERITY_RANK[right as Exclude<Severity, ''>] ??
        (Number.isFinite(Number(right)) ? Number(right) : 0);
      return rightRank - leftRank;
    });
    return values;
  }, [issuesWithOverrides]);

  const statusOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issuesWithOverrides
          .map((issue) => String(issue.status || '').trim())
          .filter(Boolean)
      )
    );
    values.sort((left, right) => Number(left) - Number(right));
    return values;
  }, [issuesWithOverrides]);

  const displayedIssues = useMemo(() => {
    const filtered = issuesWithOverrides.filter((issue) => {
      if (
        teamFilter !== TEAM_FILTER_ALL &&
        String(issue.team || '').trim() !== teamFilter
      ) {
        return false;
      }
      if (
        stageFilter !== STAGE_FILTER_ALL &&
        String(issue.journeyStage || '').trim() !== stageFilter
      ) {
        return false;
      }
      if (
        severityFilter !== SEVERITY_FILTER_ALL &&
        String(issue.severity || '').trim() !== severityFilter
      ) {
        return false;
      }
      if (
        statusFilter !== STATUS_FILTER_ALL &&
        String(issue.status || '').trim() !== statusFilter
      ) {
        return false;
      }
      return true;
    });

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
            getIssueTaskLabel(left.issue),
            getIssueTaskLabel(right.issue)
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
  }, [
    issuesWithOverrides,
    sortKey,
    sortOrder,
    stageFilter,
    severityFilter,
    statusFilter,
    teamFilter,
  ]);

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

  const modalTitle = `${state.title}（共${displayedIssues.length}条）`;

  const statusHistory = (statusModalIssue?.statusHistory ??
    []) as unknown as ParentPainHistoryItem[];
  const currentStatus = String(statusModalIssue?.status || '').trim() || '';
  const reviewedHistory =
    selectedHistoryIndex == null ? null : statusHistory[selectedHistoryIndex];

  const viewedRollbackTarget = useMemo(() => {
    const reviewedTo = String(reviewedHistory?.to_status || '').trim();
    if (!reviewedTo) return null;
    if (!['1', '2', '3'].includes(reviewedTo)) return null;
    if (reviewedTo === currentStatus) return null;
    return reviewedTo;
  }, [currentStatus, reviewedHistory]);

  const openStatusModal = (issue: DashboardIssue) => {
    const override = issueOverrides[String(issue.id || '')];
    setStatusModalIssue(override ? { ...issue, ...override } : issue);
    setStatusModalOpen(true);
  };

  const openRollbackModal = (target: string) => {
    setRollbackTargetStatus(target);
    setRollbackBy('');
    setRollbackReason('');
    setRollbackModalOpen(true);
  };

  const submitRollback = async () => {
    if (!statusModalIssue) return;
    const parentId = String(
      statusModalIssue.parentId || statusModalIssue.id || ''
    ).trim();
    if (!parentId) return;
    const by = rollbackBy.trim();
    const reason = rollbackReason.trim();
    if (!by || !reason || !rollbackTargetStatus) return;

    setRollbackSubmitting(true);
    try {
      const res = await updateOverviewParentPain({
        parent_id: parentId,
        status: rollbackTargetStatus,
        action: 'rollback',
        action_by: by,
        action_reason: reason,
      });
      const next = (res as any)?.data ?? res;
      if (next && typeof next === 'object') {
        const normalizedPatch: Partial<DashboardIssue> = {
          status:
            typeof (next as any).status === 'string'
              ? (next as any).status
              : String((next as any).status ?? ''),
          statusHistory:
            (next as any).statusHistory ??
            (next as any).status_history ??
            statusModalIssue.statusHistory,
        };
        setIssueOverrides((prev) => ({
          ...prev,
          [String(statusModalIssue.id)]: {
            ...(prev[String(statusModalIssue.id)] ?? {}),
            ...normalizedPatch,
          },
        }));
        setStatusModalIssue((prev) =>
          prev ? { ...prev, ...normalizedPatch } : prev
        );
      }
      setRollbackModalOpen(false);
      setSelectedHistoryIndex(null);
    } finally {
      setRollbackSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={state.open}
        onCancel={onClose}
        footer={null}
        width="min(96vw, 1420px)"
        title={modalTitle}
        destroyOnHidden
      >
        <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-slate-200">
          <table className="w-full table-fixed border-collapse text-[12px] text-slate-700 md:text-[13px]">
            <thead className="sticky top-0 z-10 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 md:text-[11px]">
              <tr>
                <th className="w-[56px] px-2 py-2 text-center md:w-[64px] md:px-2 md:py-3">
                  序号
                </th>
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
                  <div className="flex items-center gap-1.5">
                    {renderSortableHeader('阶段', 'stage')}
                    <Dropdown
                      trigger={['click']}
                      placement="bottomLeft"
                      popupRender={() => (
                        <div
                          className="w-[200px] rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-2 pb-2 text-[11px] font-medium tracking-wide text-slate-400">
                            阶段筛选
                          </div>
                          <Radio.Group
                            value={stageFilter}
                            onChange={(e) =>
                              setStageFilter(
                                String(e.target.value || STAGE_FILTER_ALL)
                              )
                            }
                            className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1 pb-1"
                          >
                            <Radio value={STAGE_FILTER_ALL}>全部</Radio>
                            {stageOptions.map((stage) => (
                              <Radio key={stage} value={stage}>
                                {stage}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                      )}
                    >
                      <button
                        type="button"
                        aria-label="筛选阶段"
                        title="筛选阶段"
                        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
                          stageFilter === STAGE_FILTER_ALL
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
                  {renderSortableHeader('具体任务', 'issueType')}
                </th>
                <th className="w-[220px] px-2 py-2 text-left md:w-[280px] md:px-3 md:py-3">
                  {renderSortableHeader('问题描述', 'description')}
                </th>
                <th className="w-[96px] px-2 py-2 text-left md:table-cell">
                  <div className="flex items-center gap-1.5">
                    {renderSortableHeader('严重程度', 'severity')}
                    <Dropdown
                      trigger={['click']}
                      placement="bottomLeft"
                      popupRender={() => (
                        <div
                          className="w-[220px] rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-2 pb-2 text-[11px] font-medium tracking-wide text-slate-400">
                            严重程度筛选
                          </div>
                          <Radio.Group
                            value={severityFilter}
                            onChange={(e) =>
                              setSeverityFilter(
                                String(e.target.value || SEVERITY_FILTER_ALL)
                              )
                            }
                            className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1 pb-1"
                          >
                            <Radio value={SEVERITY_FILTER_ALL}>全部</Radio>
                            {severityOptions.map((severity) => (
                              <Radio key={severity} value={severity}>
                                <SeverityBadge
                                  severity={severity as unknown as Severity}
                                />
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                      )}
                    >
                      <button
                        type="button"
                        aria-label="筛选严重程度"
                        title="筛选严重程度"
                        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
                          severityFilter === SEVERITY_FILTER_ALL
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
                <th className="w-[84px] px-2 py-2 text-left md:w-[90px] md:px-3 md:py-3">
                  <div className="flex items-center gap-1.5">
                    {renderSortableHeader('状态', 'status')}
                    <Dropdown
                      trigger={['click']}
                      placement="bottomLeft"
                      popupRender={() => (
                        <div
                          className="w-[220px] rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-2 pb-2 text-[11px] font-medium tracking-wide text-slate-400">
                            状态筛选
                          </div>
                          <Radio.Group
                            value={statusFilter}
                            onChange={(e) =>
                              setStatusFilter(
                                String(e.target.value || STATUS_FILTER_ALL)
                              )
                            }
                            className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1 pb-1"
                          >
                            <Radio value={STATUS_FILTER_ALL}>全部</Radio>
                            {statusOptions.map((status) => {
                              const cfg = PAIN_STATUS_CFG[status];
                              return (
                                <Radio key={status} value={status}>
                                  {cfg ? (
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
                                  ) : (
                                    <span>{status}</span>
                                  )}
                                </Radio>
                              );
                            })}
                          </Radio.Group>
                        </div>
                      )}
                    >
                      <button
                        type="button"
                        aria-label="筛选状态"
                        title="筛选状态"
                        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
                          statusFilter === STATUS_FILTER_ALL
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
                  const taskLabel = getIssueTaskLabel(issue);
                  const reportEntries = getReportEntries(issue);
                  return (
                    <tr
                      key={`${issue.id}-${index}`}
                      className="border-t border-slate-100 align-top transition-colors hover:bg-slate-50"
                    >
                      <td className="px-2 py-2 text-center font-medium text-slate-500 md:px-2 md:py-3">
                        {index + 1}
                      </td>
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
                        <Tooltip title={taskLabel || '--'}>
                          <span className="block truncate">
                            {taskLabel || '--'}
                          </span>
                        </Tooltip>
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
                          const cfg =
                            PAIN_STATUS_CFG[String(issue.status || '')];
                          if (!cfg)
                            return <span className="text-slate-300">--</span>;
                          return (
                            <button
                              type="button"
                              onClick={() => openStatusModal(issue)}
                            >
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
                            </button>
                          );
                        })()}
                      </td>
                      <td className="break-all px-2 py-2 md:px-3 md:py-3">
                        {issue.teamOwner || issue.owner || '--'}
                      </td>
                      <td className="px-2 py-2 text-[12px] md:px-3 md:py-3">
                        {reportEntries.length ? (
                          reportEntries.map(({ painId, fileKey, taskId }) => {
                            const search = new URLSearchParams();
                            search.set('project', fileKey);
                            if (taskId) {
                              search.set('focusTaskId', taskId);
                            }
                            if (painId) {
                              search.set('painId', painId);
                              search.set('autoOpenPain', '1');
                            }
                            const href = `/intelligent-analysis/community-experience?${search.toString()}`;

                            return (
                              <div
                                key={`${fileKey}-${taskId || ''}-${
                                  painId || ''
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
                    colSpan={10}
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

      <Modal
        open={statusModalOpen}
        onCancel={() => setStatusModalOpen(false)}
        footer={
          reviewedHistory ? (
            <div className="flex items-center justify-end gap-2">
              <Button onClick={() => setSelectedHistoryIndex(null)}>
                返回当前状态
              </Button>
              {viewedRollbackTarget ? (
                <Button
                  danger={viewedRollbackTarget === '1'}
                  onClick={() => openRollbackModal(viewedRollbackTarget)}
                >
                  回退到
                  {PAIN_STATUS_CFG[viewedRollbackTarget]?.label ||
                    viewedRollbackTarget}
                </Button>
              ) : null}
              <Button onClick={() => setStatusModalOpen(false)}>关闭</Button>
            </div>
          ) : (
            <div className="flex items-center justify-end">
              <Button onClick={() => setStatusModalOpen(false)}>关闭</Button>
            </div>
          )
        }
        width="min(92vw, 880px)"
        title="状态流转"
        destroyOnHidden
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <div className="font-semibold text-slate-800">当前状态</div>
            <div className="mt-1">
              {(() => {
                const cfg = PAIN_STATUS_CFG[currentStatus];
                if (!cfg) return <span className="text-slate-400">--</span>;
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
            </div>
            <div className="mt-1 text-xs text-slate-500">
              点击下方历史记录可进入“过往状态”查看与回退操作
            </div>
          </div>

          <div className="rounded-xl border border-slate-200">
            <div className="border-b border-slate-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
              历史记录
            </div>
            {statusHistory.length ? (
              <div className="max-h-[46vh] overflow-y-auto">
                <table className="w-full table-fixed border-collapse text-[13px] text-slate-700">
                  <thead className="sticky top-0 z-10 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="w-[120px] px-3 py-2 text-left font-semibold">
                        目标状态
                      </th>
                      <th className="w-[100px] px-3 py-2 text-left font-semibold">
                        动作
                      </th>
                      <th className="w-[120px] px-3 py-2 text-left font-semibold">
                        操作人
                      </th>
                      <th className="w-[170px] px-3 py-2 text-left font-semibold">
                        操作时间
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        原因
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusHistory
                      .slice()
                      .reverse()
                      .map((h, idxFromEnd) => {
                        const actualIndex =
                          statusHistory.length - 1 - idxFromEnd;
                        const selected = selectedHistoryIndex === actualIndex;
                        const to = String(h.to_status || '').trim();
                        const toLabel =
                          PAIN_STATUS_CFG[to]?.label || to || '--';
                        return (
                          <tr
                            key={`${String(h.at || '')}-${actualIndex}`}
                            className={`cursor-pointer border-t border-slate-100 align-top transition-colors hover:bg-slate-50 ${
                              selected ? 'bg-indigo-50/60' : ''
                            }`}
                            onClick={() => setSelectedHistoryIndex(actualIndex)}
                          >
                            <td className="px-3 py-2">{toLabel}</td>
                            <td className="px-3 py-2">
                              {String(h.action || '').trim() || '--'}
                            </td>
                            <td className="px-3 py-2">
                              {String(h.by || '').trim() || '--'}
                            </td>
                            <td className="px-3 py-2">
                              {String(h.at || '')
                                .replace('T', ' ')
                                .replace('Z', '') || '--'}
                            </td>
                            <td className="px-3 py-2">
                              <Tooltip
                                title={String(h.reason || '').trim() || '--'}
                              >
                                <span className="block truncate">
                                  {String(h.reason || '').trim() || '--'}
                                </span>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-3 py-8 text-center text-sm text-slate-400">
                暂无历史记录
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        open={rollbackModalOpen}
        onCancel={() => setRollbackModalOpen(false)}
        onOk={submitRollback}
        okText="确认回退"
        cancelText="取消"
        okButtonProps={{
          disabled:
            rollbackSubmitting ||
            !rollbackTargetStatus ||
            !rollbackBy.trim() ||
            !rollbackReason.trim(),
          loading: rollbackSubmitting,
          danger: rollbackTargetStatus === '1',
        }}
        title={`回退到${
          PAIN_STATUS_CFG[rollbackTargetStatus]?.label || rollbackTargetStatus
        }`}
        destroyOnHidden
      >
        <div className="space-y-3">
          <div className="text-sm text-slate-600">
            回退将会修改当前痛点状态，并记录回退原因与操作人。
          </div>
          <div>
            <div className="mb-1 text-xs font-medium text-slate-600">
              操作人
            </div>
            <Input
              value={rollbackBy}
              onChange={(e) => setRollbackBy(e.target.value)}
              placeholder="请输入操作人"
              maxLength={100}
              allowClear
            />
          </div>
          <div className="mb-4">
            <div className="mb-1 text-xs font-medium text-slate-600">
              回退原因
            </div>
            <Input.TextArea
              value={rollbackReason}
              onChange={(e) => setRollbackReason(e.target.value)}
              placeholder="请输入回退原因"
              rows={2}
              maxLength={1000}
              showCount
              allowClear
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IssueDetailModal;
