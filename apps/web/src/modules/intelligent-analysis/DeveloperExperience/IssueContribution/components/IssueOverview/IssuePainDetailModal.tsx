import React from 'react';
import Link from 'next/link';
import { FilterFilled } from '@ant-design/icons';
import { Dropdown, Modal, Pagination, Radio, Tooltip } from 'antd';
import type { IssueOverviewTopPain } from '../../types';
import { getTrackingStatusMeta } from '../PainTrackingModal/constants';
import PainIssueTable from '../PainIssueTable';
import IssuePriorityTag from './IssuePriorityTag';

const ALL = '__ALL__';
const ISSUE_PAGE_SIZE = 10;

type SortKey = 'repo' | 'team' | 'stage' | 'title' | 'prio' | 'state';

type Props = {
  open: boolean;
  title: string;
  items: IssueOverviewTopPain[];
  loading: boolean;
  repoTeams: Record<string, string>;
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
  items,
  loading,
  repoTeams,
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
  const [issuePage, setIssuePage] = React.useState(1);

  const resetFilters = () => {
    setStageFilter(ALL);
    setPrioFilter(ALL);
    setStateFilter(ALL);
    setIssueDetailPain(null);
    setIssuePage(1);
  };

  const options = React.useMemo(
    () => ({
      stages: Array.from(new Set(items.map((item) => item.stageName))).filter(
        Boolean
      ),
      prios: Array.from(new Set(items.map((item) => item.prio))).filter(
        Boolean
      ),
      states: Array.from(new Set(items.map(getPainStateLabel))).filter(Boolean),
    }),
    [items]
  );

  const displayedItems = React.useMemo(() => {
    const rows = items.filter(
      (item) =>
        (stageFilter === ALL || item.stageName === stageFilter) &&
        (prioFilter === ALL || item.prio === prioFilter) &&
        (stateFilter === ALL || getPainStateLabel(item) === stateFilter)
    );
    return [...rows].sort((a, b) => {
      const sortValue = (item: IssueOverviewTopPain) => {
        if (sortKey === 'repo') return item.repoShort;
        if (sortKey === 'team') return repoTeams[item.repoShort] || '';
        if (sortKey === 'state') return getPainStateLabel(item);
        return String(item[sortKey] || '');
      };
      const left = sortValue(a);
      const right = sortValue(b);
      const result = left.localeCompare(right, 'zh-Hans-CN', {
        sensitivity: 'base',
      });
      return sortAsc ? result : -result;
    });
  }, [
    items,
    prioFilter,
    repoTeams,
    sortAsc,
    sortKey,
    stageFilter,
    stateFilter,
  ]);
  const issueDetailItems = issueDetailPain?.lowScoreIssues ?? [];
  const pagedIssueDetailItems = issueDetailItems.slice(
    (issuePage - 1) * ISSUE_PAGE_SIZE,
    issuePage * ISSUE_PAGE_SIZE
  );

  const exportPainRows = () => {
    downloadCsv(
      `痛点_${title}.csv`,
      [
        '序号',
        '仓库',
        '责任团队',
        '阶段',
        '问题描述',
        '优先级',
        '状态',
        '涉及 Issue 数',
        '建议动作',
        '相关报告',
      ],
      displayedItems.map((item, index) => [
        index + 1,
        item.repoShort,
        repoTeams[item.repoShort] || '--',
        item.stageName || '--',
        item.title || '--',
        item.prio || '--',
        getPainStateLabel(item),
        item.lowScoreIssues?.length ?? 0,
        item.action || '--',
        reportHref(item.community, item.period, item.stageId, item.painId),
      ])
    );
  };

  const exportIssueRows = () => {
    downloadCsv(
      `涉及Issue_${issueDetailPain?.title || '详情'}.csv`,
      ['序号', 'Issue', '标题', '链接', '得分', '指标', '低分原因', '原文依据'],
      issueDetailItems.map((issue, index) => [
        index + 1,
        `#${issue.number}`,
        issue.title || '--',
        issue.url || '--',
        issue.score ?? '—',
        issue.metric_code || '--',
        issue.reason || '--',
        issue.evidence?.length
          ? issue.evidence
              .map(
                (evidence) =>
                  `[${evidence.type || '记录'}] ${
                    evidence.actor ? `${evidence.actor}：` : ''
                  }${evidence.text || ''}${
                    evidence.url ? `（${evidence.url}）` : ''
                  }`
              )
              .join(' | ')
          : '--',
      ])
    );
  };

  const sortableHeader = (label: string, key: SortKey) => (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-1 font-semibold text-slate-500 hover:text-slate-700"
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
            className="w-[200px] rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <Radio.Group
              value={value}
              onChange={(event) => onChange(String(event.target.value))}
              className="flex max-h-[240px] flex-col gap-1 overflow-auto px-1"
            >
              <Radio value={ALL}>全部</Radio>
              {values.map((item) => (
                <Radio key={item} value={item}>
                  {key === 'prio' ? <IssuePriorityTag priority={item} /> : item}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}
      >
        <button
          type="button"
          className={`inline-flex h-5 w-5 items-center justify-center rounded ${
            value === ALL ? 'text-slate-400' : 'bg-blue-50 text-blue-600'
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
        footer={null}
        width="min(96vw, 1420px)"
        title={
          <div className="mr-6 flex items-center justify-between gap-3">
            <span>{`${title}（共${displayedItems.length}条）`}</span>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!displayedItems.length}
              onClick={exportPainRows}
            >
              导出
            </button>
          </div>
        }
        destroyOnHidden
      >
        <div className="max-h-[70vh] w-full overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200">
          <table className="w-full min-w-0 table-fixed border-collapse text-center text-[12px] text-slate-700 md:text-[13px] [&_td]:whitespace-normal [&_td]:break-words [&_th]:whitespace-normal [&_th]:break-words">
            <thead className="sticky top-0 z-10 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 md:text-[11px]">
              <tr>
                <th className="w-[5%] px-1.5 py-3">序号</th>
                <th className="w-[8%] px-1.5 py-3">
                  {sortableHeader('仓库', 'repo')}
                </th>
                <th className="w-[9%] px-1.5 py-3">
                  {sortableHeader('责任团队', 'team')}
                </th>
                <th className="w-[8%] px-1.5 py-3">
                  {filterHeader(
                    '阶段',
                    'stage',
                    stageFilter,
                    options.stages,
                    setStageFilter
                  )}
                </th>
                <th className="w-[18%] px-2 py-3">
                  {sortableHeader('问题描述', 'title')}
                </th>
                <th className="w-[7%] px-1 py-3">
                  {filterHeader(
                    '优先级',
                    'prio',
                    prioFilter,
                    options.prios,
                    setPrioFilter
                  )}
                </th>
                <th className="w-[10%] px-1.5 py-3">
                  {filterHeader(
                    '状态',
                    'state',
                    stateFilter,
                    options.states,
                    setStateFilter
                  )}
                </th>
                <th className="w-[8%] px-1.5 py-3">涉及 Issue</th>
                <th className="w-[18%] px-2 py-3">建议动作</th>
                <th className="w-[8%] px-1.5 py-3">相关报告</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-slate-400">
                    加载中...
                  </td>
                </tr>
              ) : displayedItems.length ? (
                displayedItems.map((item, index) => (
                  <tr key={item.key} className="align-top hover:bg-slate-50/80">
                    <td className="px-2 py-3 text-slate-400">{index + 1}</td>
                    <td className="px-1.5 py-3 font-medium">
                      {item.repoShort}
                    </td>
                    <td className="px-1.5 py-3 text-center">
                      {repoTeams[item.repoShort] || '--'}
                    </td>
                    <td className="px-1.5 py-3">{item.stageName || '--'}</td>
                    <td className="px-2 py-3 text-center leading-5">
                      <Tooltip title={item.title}>{item.title || '--'}</Tooltip>
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
                      {(item.lowScoreIssues?.length ?? 0) > 0 ? (
                        <button
                          type="button"
                          className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                          onClick={() => {
                            setIssuePage(1);
                            setIssueDetailPain(item);
                          }}
                        >
                          {item.lowScoreIssues?.length ?? 0}
                        </button>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-left leading-5">
                      <Tooltip title={item.action}>
                        {item.action || '--'}
                      </Tooltip>
                    </td>
                    <td className="px-1.5 py-3">
                      <Link
                        href={reportHref(
                          item.community,
                          item.period,
                          item.stageId,
                          item.painId
                        )}
                        className="overview-table-link text-blue-600 hover:text-blue-700"
                      >
                        查看报告
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-slate-400">
                    暂无匹配问题
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>
      <Modal
        open={issueDetailPain !== null}
        onCancel={() => {
          setIssueDetailPain(null);
          setIssuePage(1);
        }}
        footer={null}
        width="70%"
        styles={{
          body: {
            height: '70vh',
            overflow: 'hidden',
            paddingRight: '8px',
          },
        }}
        title={
          <div className="flex items-center justify-between gap-3 pr-8">
            <span className="text-base font-semibold text-slate-800">
              涉及 Issue
            </span>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!issueDetailItems.length}
              onClick={exportIssueRows}
            >
              导出
            </button>
          </div>
        }
        destroyOnHidden
      >
        <div className="flex h-full min-h-0 flex-col gap-4">
          <div className="shrink-0 rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">
                {issueDetailPain?.title || '—'}
              </span>
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">
                {issueDetailItems.length} 个 Issue
              </span>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <PainIssueTable issues={pagedIssueDetailItems} pagination={false} />
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-200 pt-3">
            <span className="text-xs text-slate-500">
              共 {issueDetailItems.length} 条
            </span>
            <Pagination
              current={issuePage}
              pageSize={ISSUE_PAGE_SIZE}
              total={issueDetailItems.length}
              showSizeChanger={false}
              size="small"
              onChange={setIssuePage}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IssuePainDetailModal;
