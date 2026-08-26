import React from 'react';
import Link from 'next/link';
import { FilterFilled } from '@ant-design/icons';
import { Dropdown, Modal, Radio, Tag, Tooltip } from 'antd';
import type { IssueOverviewTopPain } from '../../types';

const ALL = '__ALL__';

type SortKey = 'repo' | 'team' | 'stage' | 'title' | 'prio' | 'state';

type Props = {
  open: boolean;
  title: string;
  items: IssueOverviewTopPain[];
  loading: boolean;
  repoTeams: Record<string, string>;
  onClose: () => void;
  reportHref: (community: string, period?: string) => string;
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

  const resetFilters = () => {
    setStageFilter(ALL);
    setPrioFilter(ALL);
    setStateFilter(ALL);
  };

  const options = React.useMemo(
    () => ({
      stages: Array.from(new Set(items.map((item) => item.stageName))).filter(
        Boolean
      ),
      prios: Array.from(new Set(items.map((item) => item.prio))).filter(
        Boolean
      ),
      states: Array.from(new Set(items.map((item) => item.state))).filter(
        Boolean
      ),
    }),
    [items]
  );

  const displayedItems = React.useMemo(() => {
    const rows = items.filter(
      (item) =>
        (stageFilter === ALL || item.stageName === stageFilter) &&
        (prioFilter === ALL || item.prio === prioFilter) &&
        (stateFilter === ALL || item.state === stateFilter)
    );
    return [...rows].sort((a, b) => {
      const sortValue = (item: IssueOverviewTopPain) => {
        if (sortKey === 'repo') return item.repoShort;
        if (sortKey === 'team') return repoTeams[item.repoShort] || '';
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
                  {item}
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
    <Modal
      open={open}
      onCancel={onClose}
      afterClose={resetFilters}
      footer={null}
      width="min(96vw, 1420px)"
      title={`${title}（共${displayedItems.length}条）`}
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
              <th className="w-[10%] px-1.5 py-3">
                {sortableHeader('责任团队', 'team')}
              </th>
              <th className="w-[9%] px-1.5 py-3">
                {filterHeader(
                  '阶段',
                  'stage',
                  stageFilter,
                  options.stages,
                  setStageFilter
                )}
              </th>
              <th className="w-[21%] px-2 py-3">
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
              <th className="w-[22%] px-2 py-3">建议动作</th>
              <th className="w-[8%] px-1.5 py-3">相关报告</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-slate-400">
                  加载中...
                </td>
              </tr>
            ) : displayedItems.length ? (
              displayedItems.map((item, index) => (
                <tr key={item.key} className="align-top hover:bg-slate-50/80">
                  <td className="px-2 py-3 text-slate-400">{index + 1}</td>
                  <td className="px-1.5 py-3 font-medium">{item.repoShort}</td>
                  <td className="px-1.5 py-3 text-center">
                    {repoTeams[item.repoShort] || '--'}
                  </td>
                  <td className="px-1.5 py-3">{item.stageName || '--'}</td>
                  <td className="px-2 py-3 text-center leading-5">
                    <Tooltip title={item.title}>{item.title || '--'}</Tooltip>
                  </td>
                  <td className="px-1 py-3">
                    <Tag>{item.prio || '--'}</Tag>
                  </td>
                  <td className="px-1.5 py-3">{item.state || '--'}</td>
                  <td className="px-2 py-3 text-left leading-5">
                    <Tooltip title={item.action}>{item.action || '--'}</Tooltip>
                  </td>
                  <td className="px-1.5 py-3">
                    <Link
                      href={reportHref(item.community, item.period)}
                      className="overview-table-link text-blue-600 hover:text-blue-700"
                    >
                      查看报告
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-slate-400">
                  暂无匹配问题
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default IssuePainDetailModal;
