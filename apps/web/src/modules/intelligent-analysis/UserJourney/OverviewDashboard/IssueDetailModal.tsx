import React, { useMemo, useState } from 'react';
import { FilterFilled } from '@ant-design/icons';
import { Dropdown, Modal, Radio, Tag, Tooltip } from 'antd';
import { SeverityBadge } from './Badges';
import { PAIN_STATUS_CFG, SEVERITY_RANK } from './constants';
import type { DashboardIssue, IssueModalState, Severity } from './types';
import { formatLocalDateTime } from '../time';
import taskDefinitions from '../rawData/task_definitions.json';

const TEAM_FILTER_ALL = '__ALL__';
const STAGE_FILTER_ALL = TEAM_FILTER_ALL;
const SEVERITY_FILTER_ALL = TEAM_FILTER_ALL;
const STATUS_FILTER_ALL = TEAM_FILTER_ALL;
const OWNER_FILTER_ALL = TEAM_FILTER_ALL;
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
  | 'createdAt'
  | 'owner'
  | 'report';

type SortOrder = 'asc' | 'desc';

type ReportEntry = {
  painId?: string;
  fileKey: string;
  taskId?: string;
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

const formatDateTime = (raw: string) => {
  return formatLocalDateTime(raw, { emptyText: '--' });
};

const getIssueFoundAt = (issue: DashboardIssue): string => {
  return String(
    issue.report_generated_at || issue.created_at || issue.createdAt || ''
  ).trim();
};

const parseDateToMs = (raw: unknown): number | null => {
  const text = String(raw ?? '').trim();
  if (!text) return null;
  const ms = Date.parse(text);
  if (Number.isNaN(ms)) return null;
  return ms;
};

const compareDateTimeWithEmptyLast = (
  leftMs: number | null,
  rightMs: number | null,
  order: SortOrder
) => {
  const leftInvalid = leftMs === null;
  const rightInvalid = rightMs === null;
  if (leftInvalid && rightInvalid) return 0;
  if (leftInvalid) return 1;
  if (rightInvalid) return -1;
  const result = leftMs - rightMs;
  return order === 'asc' ? result : -result;
};

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
  const [ownerFilter, setOwnerFilter] = useState<string>(OWNER_FILTER_ALL);
  const issues = state.issues;

  const resetFilters = () => {
    setTeamFilter(TEAM_FILTER_ALL);
    setStageFilter(STAGE_FILTER_ALL);
    setSeverityFilter(SEVERITY_FILTER_ALL);
    setStatusFilter(STATUS_FILTER_ALL);
    setOwnerFilter(OWNER_FILTER_ALL);
  };

  const teamOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issues.map((issue) => String(issue.team || '').trim()).filter(Boolean)
      )
    );
    values.sort((left, right) => compareTeamWithOtherLast(left, right, 'asc'));
    return values;
  }, [issues]);

  const stageOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issues
          .map((issue) => String(issue.journeyStage || '').trim())
          .filter(Boolean)
      )
    );
    values.sort(localeCompare);
    return values;
  }, [issues]);

  const severityOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issues
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
  }, [issues]);

  const statusOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issues.map((issue) => String(issue.status || '').trim()).filter(Boolean)
      )
    );
    values.sort((left, right) => Number(left) - Number(right));
    return values;
  }, [issues]);

  const ownerOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        issues
          .map((issue) => String(issue.owner || issue.teamOwner || '').trim())
          .filter(Boolean)
      )
    );
    values.sort(localeCompare);
    return values;
  }, [issues]);

  const displayedIssues = useMemo(() => {
    const filtered = issues.filter((issue) => {
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
      if (
        ownerFilter !== OWNER_FILTER_ALL &&
        String(issue.owner || issue.teamOwner || '').trim() !== ownerFilter
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
      const createdAtMs = parseDateToMs(getIssueFoundAt(issue));

      return {
        issue,
        index,
        reportText,
        severityRank,
        statusLabel,
        createdAtMs,
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
        case 'createdAt':
          result = compareDateTimeWithEmptyLast(
            left.createdAtMs,
            right.createdAtMs,
            sortOrder
          );
          break;
        case 'owner':
          result = localeCompare(
            left.issue.owner || left.issue.teamOwner || '',
            right.issue.owner || right.issue.teamOwner || ''
          );
          break;
        case 'report':
          result = localeCompare(left.reportText, right.reportText);
          break;
        default:
          result = 0;
      }

      if (sortKey === 'team' || sortKey === 'createdAt') {
        if (result !== 0) return result;
      } else {
        if (result !== 0) return sortOrder === 'asc' ? result : -result;
      }

      return left.index - right.index;
    });

    return withMeta.map((item) => item.issue);
  }, [
    issues,
    sortKey,
    sortOrder,
    stageFilter,
    severityFilter,
    statusFilter,
    teamFilter,
    ownerFilter,
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

  const renderSortableHeader = (
    label: string,
    key: IssueSortKey,
    align: 'left' | 'center' = 'center'
  ) => (
    <button
      type="button"
      className={`inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-700 ${
        align === 'left'
          ? 'justify-start text-left'
          : 'justify-center text-center'
      }`}
      onClick={() => handleSort(key)}
    >
      <span>{label}</span>
      <span className="text-[10px] leading-none">{sortArrow(key)}</span>
    </button>
  );

  const modalTitle = `${state.title}（共${displayedIssues.length}条）`;

  const downloadTextFile = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  };

  const escapeCsvCell = (value: string) => {
    const text = String(value ?? '');
    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const buildIssuesCsv = (rows: DashboardIssue[]) => {
    const header = [
      '序号',
      '仓库',
      '责任团队',
      '阶段',
      '具体任务',
      '问题描述',
      '严重程度',
      '状态',
      '发现时间',
      '责任人',
      '相关报告',
    ];
    const lines = [header.map(escapeCsvCell).join(',')];

    rows.forEach((issue, index) => {
      const taskLabel = getIssueTaskLabel(issue) || '--';
      const statusLabel =
        PAIN_STATUS_CFG[String(issue.status || '')]?.label ||
        String(issue.status || '').trim() ||
        '--';
      const reportEntries = getReportEntries(issue);
      const reportText = reportEntries.length
        ? reportEntries.map((e) => getReportDisplayText(e.fileKey)).join(' | ')
        : '--';
      const createdText = getIssueFoundAt(issue);
      const cells = [
        String(index + 1),
        getRepoName(issue),
        issue.team || '--',
        issue.journeyStage || '--',
        taskLabel,
        issue.description || '--',
        String(issue.severity || '--'),
        statusLabel,
        formatDateTime(createdText),
        issue.owner || issue.teamOwner || '--',
        reportText,
      ];
      lines.push(cells.map(escapeCsvCell).join(','));
    });

    return `\uFEFF${lines.join('\n')}\n`;
  };

  return (
    <Modal
      open={state.open}
      onCancel={onClose}
      afterClose={resetFilters}
      footer={null}
      width="min(96vw, 1420px)"
      title={
        <div className="mr-6 flex items-center justify-between gap-3">
          <span>{modalTitle}</span>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            onClick={() =>
              downloadTextFile(
                buildIssuesCsv(displayedIssues),
                `issues_${String(state.title || 'detail').replace(
                  /[\\/:*?"<>|]+/g,
                  '_'
                )}.csv`
              )
            }
          >
            导出
          </button>
        </div>
      }
      destroyOnClose
    >
      <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-slate-200">
        <table className="w-full table-fixed border-collapse text-center text-[12px] text-slate-700 md:text-[13px]">
          <thead className="sticky top-0 z-10 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 md:text-[11px]">
            <tr>
              <th className="w-[56px] px-2 py-2 text-center md:w-[64px] md:px-2 md:py-3">
                序号
              </th>
              <th className="w-[96px] px-2 py-2 text-center md:w-[100px] md:px-3 md:py-3">
                {renderSortableHeader('仓库', 'repo')}
              </th>
              <th className="w-[120px] px-2 py-2 text-left md:w-[100px] md:px-2 md:py-3">
                <div className="flex items-center justify-start gap-1.5">
                  {renderSortableHeader('责任团队', 'team', 'left')}
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
              <th className="w-[100px] px-2 py-2 text-center lg:table-cell">
                <div className="flex items-center justify-center gap-1.5">
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
              <th className="w-[100px] px-2 py-2 text-center lg:table-cell">
                {renderSortableHeader('具体任务', 'issueType')}
              </th>
              <th className="w-[220px] px-2 py-2 text-left md:w-[280px] md:px-3 md:py-3">
                {renderSortableHeader('问题描述', 'description', 'left')}
              </th>
              <th className="w-[96px] px-2 py-2 text-center md:table-cell">
                <div className="flex items-center justify-center gap-1.5">
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
              <th className="w-[84px] px-2 py-2 text-center md:w-[90px] md:px-3 md:py-3">
                <div className="flex items-center justify-center gap-1.5">
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
              <th className="w-[96px] px-2 py-2 text-center md:w-[120px] md:px-3 md:py-3">
                {renderSortableHeader('发现时间', 'createdAt')}
              </th>
              <th className="w-[88px] px-2 py-2 text-center md:w-[90px] md:px-3 md:py-3">
                <div className="flex items-center justify-center gap-1.5">
                  {renderSortableHeader('责任人', 'owner')}
                  <Dropdown
                    trigger={['click']}
                    placement="bottomLeft"
                    popupRender={() => (
                      <div
                        className="w-[220px] rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2 pb-2 text-[11px] font-medium tracking-wide text-slate-400">
                          责任人筛选
                        </div>
                        <Radio.Group
                          value={ownerFilter}
                          onChange={(e) =>
                            setOwnerFilter(
                              String(e.target.value || OWNER_FILTER_ALL)
                            )
                          }
                          className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1 pb-1"
                        >
                          <Radio value={OWNER_FILTER_ALL}>全部</Radio>
                          {ownerOptions.map((owner) => (
                            <Radio key={owner} value={owner}>
                              {owner}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </div>
                    )}
                  >
                    <button
                      type="button"
                      aria-label="筛选责任人"
                      title="筛选责任人"
                      className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
                        ownerFilter === OWNER_FILTER_ALL
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
              <th className="w-[96px] px-2 py-2 text-center md:w-[120px] md:px-3 md:py-3">
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
                    <td className="break-all px-2 py-2 text-center font-medium text-slate-900 md:px-3 md:py-3">
                      {getRepoName(issue)}
                    </td>
                    <td className="break-all px-2 py-2 text-left md:px-2 md:py-3">
                      {issue.team || '--'}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-center lg:table-cell">
                      {issue.journeyStage || '--'}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-center lg:table-cell">
                      <Tooltip title={taskLabel || '--'}>
                        <span className="block truncate">
                          {taskLabel || '--'}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="max-w-[240px] px-2 py-2 text-left md:max-w-[340px] md:px-3 md:py-3">
                      <Tooltip title={issue.description || '--'}>
                        <span className="line-clamp-2 cursor-default">
                          {issue.description || '--'}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-center md:table-cell">
                      <SeverityBadge severity={issue.severity} />
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-center md:px-3 md:py-3">
                      {(() => {
                        const cfg = PAIN_STATUS_CFG[String(issue.status || '')];
                        if (!cfg)
                          return <span className="text-slate-300">--</span>;
                        const status = String(issue.status || '').trim();
                        const confirmedAt = String(
                          issue.confirmedAt || ''
                        ).trim();
                        const retestReportId = String(
                          issue.retestReportId || ''
                        ).trim();
                        const shouldShowRetestPassedAt =
                          status === '5' && !!confirmedAt;
                        const shouldShowRetestReportId =
                          !!retestReportId &&
                          (status === '4' || status === '5' || status === '7');
                        const retestHref = shouldShowRetestReportId
                          ? `/intelligent-analysis/community-experience?project=${encodeURIComponent(
                              retestReportId
                            )}`
                          : '';
                        return (
                          <div className="flex flex-col items-center gap-1">
                            <Tooltip
                              title={
                                shouldShowRetestPassedAt
                                  ? `复测通过时间：${formatDateTime(
                                      confirmedAt
                                    )}`
                                  : null
                              }
                            >
                              <span className="inline-flex cursor-help">
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
                              </span>
                            </Tooltip>
                            {shouldShowRetestReportId ? (
                              <span className="self-center">
                                <Tooltip title={retestReportId}>
                                  <a
                                    href={retestHref}
                                    className="overview-table-link text-blue-600"
                                  >
                                    复测报告
                                  </a>
                                </Tooltip>
                              </span>
                            ) : null}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-center text-slate-600 md:px-3 md:py-3">
                      {(() => {
                        const createdText = getIssueFoundAt(issue);
                        const displayTime = formatDateTime(createdText);
                        return (
                          <Tooltip title={displayTime}>
                            <span>{displayTime}</span>
                          </Tooltip>
                        );
                      })()}
                    </td>
                    <td className="break-all px-2 py-2 text-center md:px-3 md:py-3">
                      {issue.owner || issue.teamOwner || '--'}
                    </td>
                    <td className="px-2 py-2 text-center text-[12px] md:px-3 md:py-3">
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
                              key={`${fileKey}-${taskId || ''}-${painId || ''}`}
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
                  colSpan={11}
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
