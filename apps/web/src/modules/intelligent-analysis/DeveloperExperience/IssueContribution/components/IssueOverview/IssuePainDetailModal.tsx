import { getEvidenceActorName } from '../../evidenceActor';
import React from 'react';
import Link from 'next/link';
import { FilterFilled } from '@ant-design/icons';
import { Dropdown, Modal, Pagination, Radio, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import type { IssueOverviewTopPain } from '../../types';
import {
  fetchIssueOverviewPainDetail,
  fetchIssueOverviewTopPainsV2,
} from '../../data';
import type { IssueOverviewV2TopPainsQuery } from '../../data';
import { resolvePainIssuePriority } from '../../issuePriority';
import { getTrackingStatusMeta } from '../PainTrackingModal/constants';
import PainIssueTable from '../PainIssueTable';
import IssuePriorityTag, { ISSUE_PRIORITY_LEVELS } from './IssuePriorityTag';

import { resolvePainFilter } from './painFilterScope';

const ALL = '__ALL__';
const PAIN_PAGE_SIZE = 10;
const ISSUE_PAGE_SIZE = 10;
const PAIN_STATE_OPTIONS = [
  { value: 'pending', label: '待处理' },
  { value: 'inProgress', label: '进行中' },
  { value: 'resolved', label: '已闭环' },
  { value: 'historical', label: '历史感知痛点' },
];

const reportDateLabel = (period?: string) => {
  const value = String(period || '');
  const [, endDate] = value.split('_to_');
  return endDate || value || '--';
};

type SortKey =
  | 'repo'
  | 'team'
  | 'stage'
  | 'metric'
  | 'title'
  | 'prio'
  | 'state';

type Props = {
  open: boolean;
  title: string;
  /** 基础筛选条件；弹窗内的阶段/优先级/状态筛选会在其基础上覆盖。 */
  query: Omit<IssueOverviewV2TopPainsQuery, 'page' | 'pageSize'>;
  stageOptions: string[];
  /** Issue 明细按需拉取所需的组织隔离参数 */
  org?: string;
  onClose: () => void;
  reportHref: (
    community: string,
    period?: string,
    stageId?: string,
    painId?: string
  ) => string;
};

const getPainStateMeta = (item: IssueOverviewTopPain) => {
  if (!item.trackingStatus || !item.trackingType) return null;
  return getTrackingStatusMeta(
    item.trackingStatus,
    item.trackingType,
    item.trackingStatusLabel
  );
};

const getPainStateLabel = (item: IssueOverviewTopPain) =>
  getPainStateMeta(item)?.label || item.state || '--';

const getPainMetricLabel = (item: IssueOverviewTopPain) =>
  item.metricLabels?.filter(Boolean).join('、') ||
  item.metricCodes?.filter(Boolean).join('、') ||
  '--';

const PainIssuePriorityDistribution: React.FC<{
  item: IssueOverviewTopPain;
  onOpen: (priority?: 'P0' | 'P1' | 'P2' | 'P3') => void;
}> = ({ item, onOpen }) => {
  const issues = item.lowScoreIssues ?? [];
  const counts = issues.reduce<Record<'P0' | 'P1' | 'P2' | 'P3', number>>(
    (result, issue) => {
      const priority = resolvePainIssuePriority(issue.priority, issue.score);
      if (priority) result[priority] += 1;
      return result;
    },
    { P0: 0, P1: 0, P2: 0, P3: 0 }
  );
  const countFromModel = item.issuePriorityCounts;
  const openCount = countFromModel
    ? (countFromModel.P0 ?? 0) +
      (countFromModel.P1 ?? 0) +
      (countFromModel.P2 ?? 0) +
      (countFromModel.P3 ?? 0)
    : issues.length;
  const resolvedCount =
    item.resolvedIssueCount ?? item.resolvedIssues?.length ?? 0;
  const displayCounts = countFromModel
    ? {
        P0: countFromModel.P0 ?? 0,
        P1: countFromModel.P1 ?? 0,
        P2: countFromModel.P2 ?? 0,
        P3: countFromModel.P3 ?? 0,
      }
    : counts;

  if (!openCount)
    return resolvedCount ? (
      <button
        type="button"
        className="text-xs font-semibold text-emerald-700 hover:underline"
        onClick={() => onOpen()}
      >
        当前 0 · 已修复 {resolvedCount}
      </button>
    ) : (
      <span className="text-[var(--overview-slateLight)]">0</span>
    );

  return (
    <div className="overview-progress-cell !gap-1.5">
      <div className="overview-progress-bar">
        {ISSUE_PRIORITY_LEVELS.map((level) =>
          displayCounts[level.priority] > 0 ? (
            <span
              key={level.priority}
              className="overview-progress-segment"
              style={{
                width: `${(displayCounts[level.priority] / openCount) * 100}%`,
                background: level.tagColor,
              }}
            />
          ) : null
        )}
      </div>
      <div className="overview-progress-meta !gap-x-1.5 !gap-y-0 text-[10px]">
        <button
          type="button"
          className="whitespace-nowrap text-xs font-semibold tabular-nums leading-[18px] text-[var(--overview-slate)] hover:underline"
          onClick={() => onOpen()}
        >
          总 {openCount}
        </button>
        {ISSUE_PRIORITY_LEVELS.filter(
          (level) => displayCounts[level.priority] > 0
        ).map((level) => (
          <React.Fragment key={level.priority}>
            <span className="text-[var(--overview-slateLight)]">|</span>
            <button
              type="button"
              className="overview-progress-text hover:underline"
              style={{ color: level.tagColor }}
              onClick={() => onOpen(level.priority)}
            >
              {level.priority} {displayCounts[level.priority]}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const escapeCsvCell = (value: unknown) => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const downloadCsv = (
  filename: string,
  headers: string[],
  rows: unknown[][]
) => {
  const content = [headers, ...rows]
    .map((row) => row.map(escapeCsvCell).join(','))
    .join('\n');
  const blob = new Blob([`\uFEFF${content}\n`], {
    type: 'text/csv;charset=utf-8',
  });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename.replace(/[\\/:*?"<>|]+/g, '_');
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
};

const IssuePainDetailModal: React.FC<Props> = ({
  open,
  title,
  query,
  org,
  onClose,
  reportHref,
}) => {
  const [sortKey, setSortKey] = React.useState<SortKey>('team');
  const [sortAsc, setSortAsc] = React.useState(true);
  const [stageFilter, setStageFilter] = React.useState(ALL);
  const [prioFilter, setPrioFilter] = React.useState(ALL);
  const [stateFilter, setStateFilter] = React.useState(ALL);
  const [issueDetailPain, setIssueDetailPain] =
    React.useState<IssueOverviewTopPain | null>(null);
  const [issueDetailPriority, setIssueDetailPriority] = React.useState<
    'P0' | 'P1' | 'P2' | 'P3' | undefined
  >();
  const [painPage, setPainPage] = React.useState(1);
  const [issuePage, setIssuePage] = React.useState(1);

  const resetFilters = () => {
    setStageFilter(ALL);
    setPrioFilter(ALL);
    setStateFilter(ALL);
    setIssueDetailPain(null);
    setIssueDetailPriority(undefined);
    setPainPage(1);
    setIssuePage(1);
  };

  // Aggregate options over the entry scope, independent of page/local filters.
  const filterOptionsQuery = useQuery({
    queryKey: ['issue-pain-filter-options', org, query],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTopPainsV2(
        { ...query, page: 1, pageSize: 1, includeFilterOptions: true },
        signal
      ),
    enabled: open,
    staleTime: 0,
  });
  const options = filterOptionsQuery.data?.filterOptions ?? {
    stages: [],
    prios: [],
    states: [],
  };
  const stateScope = resolvePainFilter(
    stateFilter,
    query.state,
    query.states,
    options.states
  );
  const effectiveStateFilter = stateScope.value;
  const effectivePrioFilter = query.prio ?? prioFilter;
  const effectiveStageFilter = query.stage ?? stageFilter;
  const baseRepoKey = (query.repos ?? []).join(',');
  const baseStateKey = (query.states ?? []).join(',');

  // 入口条件（团队/仓库/分组/基础状态或优先级）变化时重置筛选与分页。
  React.useEffect(() => {
    setPrioFilter(query.prio ?? ALL);
    setStateFilter(query.state ?? ALL);
    setStageFilter(ALL);
    setPainPage(1);
    setIssueDetailPain(null);
    setIssueDetailPriority(undefined);
    setIssuePage(1);
  }, [
    open,
    baseRepoKey,
    baseStateKey,
    query.group,
    query.prio,
    query.repo,
    query.state,
    query.team,
  ]);

  React.useEffect(() => {
    setPainPage(1);
  }, [stageFilter, prioFilter, stateFilter]);

  const painsQuery = useQuery({
    queryKey: [
      'issue-overview-v2-top-pains',
      org ?? '',
      query.group ?? '',
      query.repo ?? '',
      baseRepoKey,
      query.team ?? '',
      query.prio ?? '',
      query.state ?? '',
      baseStateKey,
      effectiveStageFilter,
      effectivePrioFilter,
      effectiveStateFilter,
      painPage,
    ],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTopPainsV2(
        {
          ...query,
          page: painPage,
          pageSize: PAIN_PAGE_SIZE,
          stage:
            effectiveStageFilter === ALL ? undefined : effectiveStageFilter,
          prio: effectivePrioFilter === ALL ? undefined : effectivePrioFilter,
          state: stateScope.state,
          states: stateScope.states,
        },
        signal
      ),
    enabled: open,
    staleTime: 0,
  });
  const items = React.useMemo(
    () => painsQuery.data?.items ?? [],
    [painsQuery.data]
  );
  const total = painsQuery.data?.total ?? 0;
  const loading = painsQuery.isFetching;

  // 排序只作用于服务端返回的当前页，跨页顺序由 ES 默认优先级/周期排序保证。
  const pagedDisplayedItems = React.useMemo(
    () =>
      [...items].sort((a, b) => {
        const sortValue = (item: IssueOverviewTopPain) => {
          if (sortKey === 'repo') return item.repoShort;
          if (sortKey === 'team') return item.teamName || '';
          if (sortKey === 'metric') return getPainMetricLabel(item);
          if (sortKey === 'state') return getPainStateLabel(item);
          return String(item[sortKey] || '');
        };
        const left = sortValue(a);
        const right = sortValue(b);
        const result = left.localeCompare(right, 'zh-Hans-CN', {
          sensitivity: 'base',
        });
        return sortAsc ? result : -result;
      }),
    [items, sortAsc, sortKey]
  );

  const issueDetailQuery = useQuery({
    queryKey: [
      'issue-overview-v2-pain-detail',
      org ?? '',
      issueDetailPain?.key ?? '',
      issueDetailPriority ?? '',
      issuePage,
    ],
    queryFn: ({ signal }) =>
      fetchIssueOverviewPainDetail(
        issueDetailPain?.key ?? '',
        {
          org,
          page: issuePage,
          pageSize: ISSUE_PAGE_SIZE,
          priority: issueDetailPriority,
        },
        signal
      ),
    enabled: open && !!issueDetailPain,
    staleTime: 0,
  });
  const sourceDetailPain = issueDetailQuery.data?.pain ?? issueDetailPain;
  const resolvedOnly =
    sourceDetailPain?.openIssueCount === 0 &&
    (sourceDetailPain?.resolvedIssueCount ?? 0) > 0;
  const issueDetailItems = issueDetailQuery.data?.items ?? [];
  const issueDetailTotal = issueDetailQuery.data?.total ?? 0;

  const exportPainRows = () => {
    downloadCsv(
      `痛点_${title}.csv`,
      [
        '序号',
        '仓库',
        '责任团队',
        '阶段',
        '指标',
        '痛点描述',
        '优先级',
        '状态',
        '涉及 Issue 数',
        '相关报告',
      ],
      pagedDisplayedItems.map((item, index) => [
        (painPage - 1) * PAIN_PAGE_SIZE + index + 1,
        item.repoShort,
        item.teamName || '--',
        item.stageName || '--',
        getPainMetricLabel(item),
        item.title || '--',
        item.prio || '--',
        getPainStateLabel(item),
        item.openIssueCount ?? 0,
        reportHref(item.community, item.period, item.stageId, item.painId),
      ])
    );
  };

  const exportIssueRows = () => {
    downloadCsv(
      `涉及Issue_${sourceDetailPain?.title || '详情'}.csv`,
      [
        '序号',
        'Issue',
        '标题',
        '责任人',
        'Issue 状态',
        '链接',
        '得分',
        '指标',
        '低分原因',
        '原文依据',
        '报告周期',
        '报告链接',
      ],
      issueDetailItems.map((issue, index) => [
        index + 1,
        `#${issue.number}`,
        issue.title || '--',
        issue.assignees?.join('、') || '—',
        issue.issue_state === 'open'
          ? '开启中'
          : issue.issue_state === 'closed'
          ? '已关闭'
          : '—',
        issue.url || '--',
        issue.score ?? '—',
        issue.metric_code || '--',
        issue.reason || '--',
        issue.evidence?.length
          ? issue.evidence
              .map(
                (evidence) =>
                  `[${evidence.type || '记录'}] ${
                    evidence.time ? `${evidence.time.replace('T', ' ')} ` : ''
                  }${
                    getEvidenceActorName(evidence.actor)
                      ? `${getEvidenceActorName(evidence.actor)}：`
                      : ''
                  }${evidence.text || ''}${
                    evidence.url ? `（${evidence.url}）` : ''
                  }`
              )
              .join(' | ')
          : '--',
        issue.report_period || sourceDetailPain?.period || '--',
        sourceDetailPain
          ? reportHref(
              sourceDetailPain.community,
              issue.report_period || sourceDetailPain.period,
              sourceDetailPain.stageId,
              issue.report_pain_id || sourceDetailPain.painId
            )
          : '--',
      ])
    );
  };

  const sortableHeader = (label: string, key: SortKey) => (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-1 font-semibold text-[var(--overview-slate)] hover:text-[var(--overview-slateDark)]"
      onClick={() => {
        if (sortKey === key) setSortAsc((value) => !value);
        else {
          setSortKey(key);
          setSortAsc(true);
        }
      }}
    >
      <span>{label}</span>
      <span className="text-[10px] leading-none">
        {sortKey === key ? (sortAsc ? '↑' : '↓') : '↕'}
      </span>
    </button>
  );

  const filterHeader = (
    label: string,
    key: SortKey,
    value: string,
    values: string[],
    onChange: (value: string) => void
  ) => (
    <div className="flex items-center justify-center gap-1.5">
      {sortableHeader(label, key)}
      <Dropdown
        trigger={['click']}
        placement="bottomLeft"
        popupRender={() => (
          <div
            className="w-[200px] rounded-lg border border-[var(--overview-slateBorder)] bg-[var(--overview-white)] p-2 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <Radio.Group
              value={value}
              onChange={(event) => onChange(String(event.target.value))}
              className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1"
            >
              {!(
                (key === 'state' && stateScope.fixed) ||
                (key === 'prio' && query.prio) ||
                (key === 'stage' && query.stage)
              ) && <Radio value={ALL}>全部</Radio>}
              {values.map((item) => (
                <Radio key={item} value={item}>
                  {key === 'prio' ? (
                    <IssuePriorityTag priority={item} />
                  ) : key === 'state' ? (
                    PAIN_STATE_OPTIONS.find((state) => state.value === item)
                      ?.label ?? item
                  ) : (
                    item
                  )}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}
      >
        <button
          type="button"
          className={`inline-flex h-5 w-5 items-center justify-center rounded ${
            value === ALL
              ? 'text-[var(--overview-slateLight)]'
              : 'bg-[var(--overview-blueSoft)] text-[var(--overview-blue)]'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <FilterFilled className="text-[12px]" />
        </button>
      </Dropdown>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        afterClose={resetFilters}
        centered
        wrapClassName="issue-pain-viewport-modal"
        footer={null}
        width="min(96vw, 1420px)"
        styles={{
          content: {
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            overflow: 'hidden',
          },
          body: {
            boxSizing: 'border-box',
            flex: '1 1 auto',
            minHeight: 0,
            maxWidth: '100%',
            overflow: 'hidden',
          },
        }}
        title={
          <div className="mr-6 flex items-center justify-between gap-3">
            <span>{`${title}（共${total}条）`}</span>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-[var(--overview-slateBorder)] bg-[var(--overview-white)] px-3 py-1 text-xs font-semibold text-[var(--overview-slateDark)] shadow-sm transition-colors hover:bg-[var(--overview-slateSoft)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!total}
              onClick={exportPainRows}
            >
              导出
            </button>
          </div>
        }
        destroyOnHidden
      >
        <div className="flex h-full min-h-0 w-full max-w-full flex-col gap-3 overflow-hidden">
          <div
            className={`min-h-0 min-w-0 flex-1 overflow-x-hidden rounded-xl border border-[var(--overview-slateBorder)] ${
              issueDetailPain ? 'overflow-y-hidden' : 'overflow-y-auto'
            }`}
          >
            <table className="w-full min-w-0 table-fixed border-collapse text-center text-[12px] text-[var(--overview-slateDark)] md:text-[13px] [&_td]:whitespace-normal [&_td]:break-words [&_th]:whitespace-normal [&_th]:break-words">
              <thead className="sticky top-0 z-10 bg-[var(--overview-slateSoft)] text-[10px] uppercase tracking-wide text-[var(--overview-slate)] md:text-[11px]">
                <tr>
                  <th className="w-[4%] px-1.5 py-3">序号</th>
                  <th className="w-[10%] px-1.5 py-3">
                    {sortableHeader('仓库', 'repo')}
                  </th>
                  <th className="w-[8%] px-1.5 py-3">
                    {sortableHeader('责任团队', 'team')}
                  </th>
                  <th className="w-[7%] px-1.5 py-3">
                    {filterHeader(
                      '阶段',
                      'stage',
                      effectiveStageFilter,
                      options.stages,
                      setStageFilter
                    )}
                  </th>
                  <th className="w-[12%] px-2 py-3">
                    {sortableHeader('指标', 'metric')}
                  </th>
                  <th className="w-[15%] px-2 py-3">
                    {sortableHeader('痛点描述', 'title')}
                  </th>
                  <th className="w-[7%] px-1 py-3">
                    {filterHeader(
                      '优先级',
                      'prio',
                      effectivePrioFilter,
                      options.prios,
                      setPrioFilter
                    )}
                  </th>
                  <th className="w-[9%] px-1.5 py-3">
                    {filterHeader(
                      '状态',
                      'state',
                      effectiveStateFilter,
                      options.states,
                      setStateFilter
                    )}
                  </th>
                  <th className="w-[23%] px-1.5 py-3">涉及 Issue</th>
                  <th className="w-[6%] px-1.5 py-3">相关报告</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-[var(--overview-white)]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-12 text-[var(--overview-slateLight)]"
                    >
                      加载中...
                    </td>
                  </tr>
                ) : items.length ? (
                  pagedDisplayedItems.map((item, index) => (
                    <tr
                      key={item.key}
                      className="align-top hover:bg-[rgba(var(--overview-slateSoft-rgb),0.8)]"
                    >
                      <td className="px-2 py-3 text-[var(--overview-slateLight)]">
                        {(painPage - 1) * PAIN_PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-1.5 py-3 font-medium">
                        {item.repoShort}
                      </td>
                      <td className="px-1.5 py-3 text-center">
                        {item.teamName || '--'}
                      </td>
                      <td className="px-1.5 py-3">{item.stageName || '--'}</td>
                      <td className="px-2 py-3 text-center leading-5">
                        <Tooltip title={getPainMetricLabel(item)}>
                          {getPainMetricLabel(item)}
                        </Tooltip>
                      </td>
                      <td className="px-2 py-3 text-center leading-5">
                        <Tooltip title={item.title}>
                          {item.title || '--'}
                        </Tooltip>
                      </td>
                      <td className="px-1 py-3">
                        <IssuePriorityTag priority={item.prio} />
                      </td>
                      <td className="px-1.5 py-3">
                        {getPainStateMeta(item) ? (
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                              getPainStateMeta(item)?.className
                            }`}
                          >
                            {getPainStateLabel(item)}
                          </span>
                        ) : (
                          item.state || '--'
                        )}
                      </td>
                      <td className="px-1.5 py-3">
                        <PainIssuePriorityDistribution
                          item={item}
                          onOpen={(priority) => {
                            setIssuePage(1);
                            setIssueDetailPriority(priority);
                            setIssueDetailPain(item);
                          }}
                        />
                      </td>
                      <td className="px-1.5 py-3">
                        <Link
                          href={reportHref(
                            item.community,
                            item.period,
                            item.stageId,
                            item.painId
                          )}
                          className="overview-table-link text-[var(--overview-blue)] hover:text-[var(--overview-blueDark)]"
                        >
                          {reportDateLabel(item.period)}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-12 text-[var(--overview-slateLight)]"
                    >
                      暂无匹配问题
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 px-1">
            <span className="text-xs text-[var(--overview-slate)]">
              共 {total} 条
            </span>
            <Pagination
              current={painPage}
              pageSize={PAIN_PAGE_SIZE}
              total={total}
              showSizeChanger={false}
              size="small"
              onChange={setPainPage}
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={issueDetailPain !== null}
        onCancel={() => {
          setIssueDetailPain(null);
          setIssueDetailPriority(undefined);
          setIssuePage(1);
        }}
        centered
        wrapClassName="issue-pain-viewport-modal"
        footer={null}
        width="min(96vw, 1420px)"
        styles={{
          content: {
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            overflow: 'hidden',
          },
          body: {
            boxSizing: 'border-box',
            flex: '1 1 auto',
            minHeight: 0,
            maxWidth: '100%',
            overflow: 'hidden',
            paddingRight: '8px',
          },
        }}
        title={
          <div className="flex items-center justify-between gap-3 pr-8">
            <span className="text-base font-semibold text-[var(--overview-textSecondary)]">
              {resolvedOnly ? '已修复 Issue' : '涉及 Issue'}
              {issueDetailPriority ? ` · ${issueDetailPriority}` : ''}
            </span>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-[var(--overview-slateBorder)] bg-[var(--overview-white)] px-3 py-1 text-xs font-semibold text-[var(--overview-slateDark)] shadow-sm transition-colors hover:bg-[var(--overview-slateSoft)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!issueDetailItems.length}
              onClick={exportIssueRows}
            >
              导出
            </button>
          </div>
        }
        destroyOnHidden
      >
        <div className="flex h-full min-h-0 max-w-full flex-col gap-4 overflow-hidden">
          <div className="shrink-0 rounded-lg border border-[var(--overview-redSoft)] bg-[rgba(var(--overview-redSoft-rgb),0.8)] px-3.5 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[var(--overview-textSecondary)]">
                {sourceDetailPain?.title || '—'}
              </span>
              <span className="inline-flex rounded-full border border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)] px-2 py-0.5 text-[10px] font-medium text-[var(--overview-slate)]">
                {issueDetailTotal} 个 Issue
              </span>
            </div>
          </div>
          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            {issueDetailQuery.isFetching && !issueDetailQuery.data ? (
              <div className="flex h-full items-center justify-center text-sm text-[var(--overview-slateLight)]">
                加载中...
              </div>
            ) : (
              <PainIssueTable
                issues={issueDetailItems}
                pagination={false}
                responsive
                renderReportLink={(issue) => {
                  const period =
                    issue.report_period || sourceDetailPain?.period;
                  if (!sourceDetailPain || !period) {
                    return (
                      <span className="text-[var(--overview-slateLight)]">
                        --
                      </span>
                    );
                  }
                  return (
                    <Link
                      href={reportHref(
                        sourceDetailPain.community,
                        period,
                        sourceDetailPain.stageId,
                        issue.report_pain_id || sourceDetailPain.painId
                      )}
                      className="overview-table-link break-all text-[var(--overview-blue)] hover:text-[var(--overview-blueDark)]"
                    >
                      {reportDateLabel(period)}
                    </Link>
                  );
                }}
              />
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[var(--overview-slateBorder)] pt-3">
            <span className="text-xs text-[var(--overview-slate)]">
              共 {issueDetailTotal} 条
            </span>
            <Pagination
              current={issuePage}
              pageSize={ISSUE_PAGE_SIZE}
              total={issueDetailTotal}
              showSizeChanger={false}
              size="small"
              onChange={setIssuePage}
            />
          </div>
        </div>
      </Modal>
      <style jsx global>{`
        .issue-pain-viewport-modal {
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
};

// Reset local filters and pagination synchronously when opening a different entry.
const ScopedIssuePainDetailModal: React.FC<Props> = (props) => (
  <IssuePainDetailModal
    key={JSON.stringify([props.open, props.query, props.org])}
    {...props}
  />
);

export default ScopedIssuePainDetailModal;
