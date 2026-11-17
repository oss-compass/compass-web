import React from 'react';
import Link from 'next/link';
import { FilterFilled } from '@ant-design/icons';
import { Alert, Dropdown, Modal, Pagination, Radio, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import type {
  IssueOverviewTopPain,
  IssueOverviewV2PainDetail,
} from '../../types';
import {
  fetchIssueOverviewPainDetail,
  fetchIssueOverviewPainIssuesCsv,
  fetchIssueOverviewTopPainsCsv,
  fetchIssueOverviewTopPainsV2,
} from '../../data';
import type { IssueOverviewV2TopPainsQuery } from '../../data';
import { resolvePainIssuePriority } from '../../issuePriority';
import { getTrackingStatusMeta } from '../PainTrackingModal/constants';
import PainIssueTable from '../PainIssueTable';
import IssuePriorityTag, { ISSUE_PRIORITY_LEVELS } from './IssuePriorityTag';

import { resolvePainFilter } from './painFilterScope';
import { downloadCsvResponse } from '../../issueExport';

const ALL = '__ALL__';
const PAIN_PAGE_SIZE = 10;
const ISSUE_PAGE_SIZE = 10;
const getTrackingStatusOptions = (options: { trackingStatuses?: string[] }) =>
  options.trackingStatuses ?? [];
const getStateFilterLabel = (value: string) =>
  value === 'historical'
    ? '无需跟踪修复'
    : getTrackingStatusMeta(Number(value), 'fix').label;

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
  /** 入口范围；弹窗内的筛选只在该范围中进一步收窄。 */
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

const getIssueDetails = (
  detail: IssueOverviewV2PainDetail | undefined,
  selectedPain: IssueOverviewTopPain | null
) => {
  const pain = detail?.pain ?? selectedPain;
  return {
    pain,
    resolvedOnly:
      pain?.openIssueCount === 0 && (pain?.resolvedIssueCount ?? 0) > 0,
    items: detail?.items ?? [],
    total: detail?.total ?? 0,
  };
};

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

const IssuePainDetailModal: React.FC<Props> = ({
  open,
  title,
  query,
  org,
  onClose,
  reportHref,
}) => {
  const orgKey = org ?? '';
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
  const [exportingPains, setExportingPains] = React.useState(false);
  const [exportingIssues, setExportingIssues] = React.useState(false);
  const [painExportError, setPainExportError] = React.useState('');
  const [issueExportError, setIssueExportError] = React.useState('');

  const resetFilters = () => {
    setStageFilter(ALL);
    setPrioFilter(ALL);
    setStateFilter(ALL);
    setIssueDetailPain(null);
    setIssueDetailPriority(undefined);
    setPainPage(1);
    setIssuePage(1);
    setPainExportError('');
    setIssueExportError('');
  };

  // Aggregate options over the entry scope, independent of page/local filters.
  const filterOptionsQuery = useQuery({
    queryKey: ['issue-pain-filter-options', 'tracking-status', org, query],
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
    trackingStatuses: [],
  };
  const statusOptions = getTrackingStatusOptions(options);
  const stateScope = resolvePainFilter(
    stateFilter,
    statusOptions,
    query.trackingStatus
  );
  const effectiveStateFilter = stateScope.value;
  const prioScope = resolvePainFilter(prioFilter, options.prios, query.prio);
  const stageScope = resolvePainFilter(
    stageFilter,
    options.stages,
    query.stage
  );
  const effectivePrioFilter = prioScope.value;
  const effectiveStageFilter = stageScope.value;
  const baseRepoKey = (query.repos ?? []).join(',');
  const baseStateKey = (query.states ?? []).join(',');

  // 入口条件（团队/仓库/分组/基础状态或优先级）变化时重置筛选与分页。
  React.useEffect(() => {
    setPrioFilter(ALL);
    setStateFilter(ALL);
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
    query.stage,
    query.trackingStatus,
    query.team,
  ]);

  React.useEffect(() => {
    setPainPage(1);
  }, [stageFilter, prioFilter, stateFilter]);

  const painsQuery = useQuery({
    queryKey: [
      'issue-overview-v2-top-pains',
      orgKey,
      query.group ?? '',
      query.repo ?? '',
      baseRepoKey,
      query.team ?? '',
      query.prio ?? '',
      query.stage ?? '',
      query.trackingStatus ?? '',
      query.state ?? '',
      baseStateKey,
      effectiveStageFilter,
      effectivePrioFilter,
      effectiveStateFilter,
      painPage,
      sortKey,
      sortAsc,
    ],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTopPainsV2(
        {
          ...query,
          page: painPage,
          pageSize: PAIN_PAGE_SIZE,
          sort: sortKey,
          order: sortAsc ? 'asc' : 'desc',
          stage: stageScope.filter,
          prio: prioScope.filter,
          trackingStatus: stateScope.filter,
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

  const pagedDisplayedItems = items;

  const issueDetailQuery = useQuery({
    queryKey: [
      'issue-overview-v2-pain-detail',
      orgKey,
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
  const {
    pain: sourceDetailPain,
    resolvedOnly,
    items: issueDetailItems,
    total: issueDetailTotal,
  } = getIssueDetails(issueDetailQuery.data, issueDetailPain);

  /**
   * 导出当前筛选条件下的全量痛点。
   * 由后端在同一筛选/排序范围内生成完整 CSV，前端不再逐页拉取。
   */
  const exportPainRows = async () => {
    if (exportingPains) return;
    setExportingPains(true);
    setPainExportError('');
    try {
      await downloadCsvResponse(
        await fetchIssueOverviewTopPainsCsv({
          ...query,
          sort: sortKey,
          order: sortAsc ? 'asc' : 'desc',
          stage: stageScope.filter,
          prio: prioScope.filter,
          trackingStatus: stateScope.filter,
        }),
        `痛点_${title}.csv`
      );
    } catch (error) {
      setPainExportError(
        error instanceof Error ? error.message : '导出失败，请稍后重试'
      );
    } finally {
      setExportingPains(false);
    }
  };

  /** 导出该痛点/优先级下的全量涉及 Issue（后端生成完整 CSV）。 */
  const exportIssueRows = async () => {
    if (exportingIssues || !issueDetailPain) return;
    setExportingIssues(true);
    setIssueExportError('');
    try {
      await downloadCsvResponse(
        await fetchIssueOverviewPainIssuesCsv({
          painId: issueDetailPain.key,
          org,
          priority: issueDetailPriority,
        }),
        `涉及Issue_${sourceDetailPain?.title || '详情'}.csv`
      );
    } catch (error) {
      setIssueExportError(
        error instanceof Error ? error.message : '导出失败，请稍后重试'
      );
    } finally {
      setExportingIssues(false);
    }
  };

  const sortableHeader = (label: string, key: SortKey) => (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-1 font-semibold text-[var(--overview-slate)] hover:text-[var(--overview-slateDark)]"
      onClick={() => {
        setPainPage(1);
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
              onChange={(event) => {
                setPainPage(1);
                onChange(String(event.target.value));
              }}
              className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1"
            >
              <Radio value={ALL}>全部</Radio>
              {values.map((item) => (
                <Radio key={item} value={item}>
                  {key === 'prio' ? (
                    <IssuePriorityTag priority={item} />
                  ) : key === 'state' ? (
                    getStateFilterLabel(item)
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
          aria-label={`筛选${label}`}
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
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
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
              disabled={!total || exportingPains}
              onClick={() => void exportPainRows()}
            >
              {exportingPains ? '导出中...' : '导出'}
            </button>
          </div>
        }
        destroyOnHidden
      >
        {painExportError ? (
          <Alert type="error" message={painExportError} />
        ) : null}
        <div className="flex min-h-0 w-full max-w-full flex-1 flex-col gap-3 overflow-hidden">
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
                      statusOptions,
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
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
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
              disabled={!issueDetailTotal || exportingIssues}
              onClick={() => void exportIssueRows()}
            >
              {exportingIssues ? '导出中...' : '导出'}
            </button>
          </div>
        }
        destroyOnHidden
      >
        {issueExportError ? (
          <Alert type="error" message={issueExportError} />
        ) : null}
        <div className="flex min-h-0 max-w-full flex-1 flex-col gap-4 overflow-hidden">
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
