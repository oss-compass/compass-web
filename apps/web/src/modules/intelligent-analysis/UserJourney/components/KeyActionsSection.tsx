import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import { ActionDetailRecord, ActionStatus } from '../types';
import { getActionStatusClasses } from '../helpers';
import taskDefinitions from '../rawData/task_definitions.json';
import useLogData, { LogCommand, LogTask } from '../hooks/useLogData';

/* ─── 类型 ─── */
type TaskDefinition = {
  task_id: string;
  name: string;
  phase: string;
  description: string;
  task_type?: string;
  optional?: boolean;
  expected_outcome?: string;
  success_indicators?: string[];
  failure_indicators?: string[];
};

type KeyActionsSectionProps = {
  currentStepKey: string;
  executionPathItems: ActionDetailRecord[];
  /** 报告文件 key，如 cann_asc_devkit_20260408_1824，用于推导 log 路径 */
  projectFileKey?: string;
};

/* ─── 静态 task 定义 map ─── */
const TASK_DEF_MAP = (
  taskDefinitions as { tasks: Record<string, TaskDefinition> }
).tasks as Record<string, TaskDefinition>;

/* ─── 图标 ─── */
const ChevronIcon: React.FC<{ expanded: boolean; className?: string }> = ({
  expanded,
  className = '',
}) => (
  <svg
    className={`transition-transform duration-150 ${
      expanded ? 'rotate-180' : ''
    } ${className}`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EvidenceIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 5v3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
  </svg>
);

const PainIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2L14 13H2L8 2Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M8 6v3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="8" cy="10.5" r="0.75" fill="currentColor" />
  </svg>
);

const LogIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path
      d="M5 5.5h6M5 8h6M5 10.5h4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── 旧版 result 展示（无 log 时用） ─── */
const getResultDisplay = (detailItem: ActionDetailRecord) => {
  if (typeof detailItem.result === 'boolean') {
    return {
      label: detailItem.result ? '成功' : '失败',
      status: detailItem.result ? 'success' : 'failed',
    } as const;
  }
  if (detailItem.result != null) {
    const label = String(detailItem.result).trim();
    if (label) return { label, status: 'failed' } as const;
  }
  if (detailItem.statusLabel || detailItem.status) {
    return {
      label: detailItem.statusLabel ?? detailItem.status ?? '-',
      status: detailItem.status ?? 'failed',
    } as const;
  }
  return null;
};

/* ─── log status → ActionStatus ─── */
const normalizeLogStatus = (s: string | undefined): ActionStatus => {
  if (!s) return 'neutral';
  const lower = s.toLowerCase();
  if (lower === 'success') return 'success';
  if (lower === 'failure' || lower === 'failed' || lower === 'error')
    return 'failed';
  if (lower === 'warning' || lower === 'warn') return 'warning';
  return 'neutral';
};

/* ─── 按 taskId 分组 ─── */
const groupByTaskId = (
  items: ActionDetailRecord[]
): {
  taskId: string | undefined;
  rows: { item: ActionDetailRecord; globalIndex: number }[];
}[] => {
  const orderMap = new Map<
    string | undefined,
    { item: ActionDetailRecord; globalIndex: number }[]
  >();
  items.forEach((item, index) => {
    const key = item.taskId;
    if (!orderMap.has(key)) orderMap.set(key, []);
    orderMap.get(key)!.push({ item, globalIndex: index });
  });
  return Array.from(orderMap.entries()).map(([taskId, rows]) => ({
    taskId,
    rows,
  }));
};

/* ─── Task 状态徽章 ─── */
const TaskStatusBadge: React.FC<{ status?: ActionStatus }> = ({ status }) => {
  if (!status) return null;
  const cfg: Record<
    ActionStatus,
    { label: string; dot: string; badge: string }
  > = {
    success: {
      label: '成功',
      dot: 'bg-emerald-500',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
    warning: {
      label: '警告',
      dot: 'bg-amber-400',
      badge: 'border-amber-200 bg-amber-50 text-amber-700',
    },
    failed: {
      label: '失败',
      dot: 'bg-rose-500',
      badge: 'border-rose-200 bg-rose-50 text-rose-700',
    },
    neutral: {
      label: '中立',
      dot: 'bg-slate-400',
      badge: 'border-slate-200 bg-slate-50 text-slate-600',
    },
  };
  const c = cfg[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

/* ─── 日志详情弹窗 ─── */
const LogOutputModal: React.FC<{
  open: boolean;
  onClose: () => void;
  commandName: string;
  output?: string;
}> = ({ open, onClose, commandName, output }) => (
  <Modal
    open={open}
    onCancel={onClose}
    onOk={onClose}
    title={
      <div className="flex items-center gap-2">
        <LogIcon className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-semibold text-slate-800">日志详情</span>
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600">
          {commandName}
        </code>
      </div>
    }
    width={'80vw'}
    footer={null}
    styles={{ body: { padding: 0 } }}
    destroyOnHidden
  >
    <div className="max-h-[70vh] overflow-y-auto">
      {output ? (
        <div className="px-5 py-4">
          <pre className="whitespace-pre-wrap break-all rounded-lg bg-slate-50 px-3 py-2.5 font-mono text-sm leading-relaxed text-slate-700">
            {output}
          </pre>
        </div>
      ) : (
        <div className="px-5 py-6 text-center text-sm text-slate-400">
          暂无输出内容
        </div>
      )}
    </div>
  </Modal>
);

/* ─── 有 log 时表格上方展示的观点 & 痛点（内联卡片，默认展开） ─── */
const EvidenceInline: React.FC<{
  observations?: string[];
  pain_points?: string[];
}> = ({ observations, pain_points }) => {
  const hasObs = observations && observations.length > 0;
  const hasPain = pain_points && pain_points.length > 0;
  if (!hasObs && !hasPain) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <EvidenceIcon className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-sm font-semibold text-slate-700">
          观点 & 痛点
        </span>
        <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-bold leading-none text-slate-600">
          {(observations?.length ?? 0) + (pain_points?.length ?? 0)}
        </span>
      </div>
      <div className="flex gap-3">
        {hasObs && (
          <div className="min-w-0 flex-1 rounded-xl border border-sky-100 bg-sky-50/70 px-4 py-3">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-600">
              <EvidenceIcon className="h-3 w-3" />
              观点
              <span className="ml-0.5 rounded-full bg-sky-100 px-1.5 text-[10px] font-bold text-sky-700">
                {observations!.length}
              </span>
            </div>
            <ul className="space-y-1.5">
              {observations!.map((obs, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-5 text-sky-900"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  {obs}
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasPain && (
          <div className="min-w-0 flex-1 rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-600">
              <PainIcon className="h-3 w-3" />
              痛点
              <span className="ml-0.5 rounded-full bg-rose-100 px-1.5 text-[10px] font-bold text-rose-700">
                {pain_points!.length}
              </span>
            </div>
            <ul className="space-y-1.5">
              {pain_points!.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-5 text-rose-900"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── 证据 / 痛点折叠块 ─── */
const EvidenceBlock: React.FC<{
  observations?: string[];
  pain_points?: string[];
}> = ({ observations, pain_points }) => {
  const [open, setOpen] = useState(false);
  const hasData =
    (observations && observations.length > 0) ||
    (pain_points && pain_points.length > 0);

  if (!hasData) {
    return (
      <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-3 py-2">
        <EvidenceIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" />
        <span className="text-xs text-slate-400">暂无观点与痛点记录</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-slate-50"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <EvidenceIcon className="h-3.5 w-3.5 text-slate-400" />
          观点 & 痛点
          <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-bold leading-none text-slate-600">
            {(observations?.length ?? 0) + (pain_points?.length ?? 0)}
          </span>
        </span>
        <ChevronIcon expanded={open} className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {open && (
        <div className="space-y-3 border-t border-slate-100 px-3 py-3">
          {observations && observations.length > 0 && (
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500">
                <EvidenceIcon className="h-3 w-3" />
                观点
              </div>
              <ul className="space-y-1">
                {observations.map((obs, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-md bg-sky-50 px-2.5 py-1.5 text-sm text-sky-800"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pain_points && pain_points.length > 0 && (
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500">
                <PainIcon className="h-3 w-3" />
                痛点
              </div>
              <ul className="space-y-1">
                {pain_points.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-md bg-rose-50 px-2.5 py-1.5 text-sm text-rose-800"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Log 模式命令表格 ─── */
const LogCommandsTable: React.FC<{
  commands: LogCommand[];
  tableKey: string;
}> = ({ commands, tableKey }) => {
  const [allExpanded, setAllExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [modalCmd, setModalCmd] = useState<LogCommand | null>(null);

  const toggleAll = () => {
    const next = !allExpanded;
    setAllExpanded(next);
    const m: Record<number, boolean> = {};
    commands.forEach((_, i) => {
      m[i] = next;
    });
    setExpandedRows(m);
  };

  const isExpanded = (i: number) => !!expandedRows[i];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '220px' }} />
            <col />
            <col style={{ width: '90px' }} />
            <col style={{ width: '76px' }} />
            <col style={{ width: '68px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                #
              </th>
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                工具名称
              </th>
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                参数
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <span>日志摘要</span>
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                  >
                    <ChevronIcon
                      expanded={allExpanded}
                      className="h-2.5 w-2.5"
                    />
                    {allExpanded ? '收起全部' : '展开全部'}
                  </button>
                </div>
              </th>
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                日志详情
              </th>
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                结果
              </th>
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                耗时
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((cmd, i) => {
              const status = normalizeLogStatus(cmd.status);
              const expanded = isExpanded(i);
              const summary = cmd.output_summary ?? '';
              const longSummary = summary.length > 60;
              const hasOutput = !!(cmd.output || cmd.thought);

              // 参数格式化（简短展示）
              let argsDisplay = '';
              if (cmd.args && cmd.args !== '{}') {
                try {
                  const parsed = JSON.parse(cmd.args) as Record<
                    string,
                    unknown
                  >;
                  argsDisplay = Object.entries(parsed)
                    .map(([k, v]) => `${k}: ${String(v)}`)
                    .join(' · ');
                } catch {
                  argsDisplay = cmd.args;
                }
              }

              return (
                <tr
                  key={`${tableKey}-cmd-${i}-${cmd.id}`}
                  className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/50"
                >
                  {/* 序号 */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top text-sm font-semibold text-slate-400">
                    {i + 1}
                  </td>
                  {/* 工具名 */}
                  <td className="px-4 py-3.5 align-top">
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">
                      {cmd.name}
                    </code>
                  </td>
                  {/* 参数 */}
                  <td className="px-4 py-3.5 align-top text-xs text-slate-500">
                    {argsDisplay ? (
                      <Tooltip
                        title={argsDisplay}
                        styles={{ root: { maxWidth: 400 } }}
                      >
                        <span className="line-clamp-2 cursor-default break-all">
                          {argsDisplay}
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  {/* 摘要 */}
                  <td className="overflow-hidden px-4 py-3.5 align-top text-xs leading-6 text-slate-600">
                    {longSummary ? (
                      <div className="relative pr-6">
                        <div
                          className={`break-words ${
                            expanded ? 'whitespace-pre-wrap' : 'line-clamp-2'
                          }`}
                        >
                          {summary}
                        </div>
                        <Tooltip title={expanded ? '收起' : '展开'}>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedRows((prev) => ({
                                ...prev,
                                [i]: !prev[i],
                              }))
                            }
                            className="absolute right-1 top-1 inline-flex items-center text-slate-400 transition-colors hover:text-slate-600"
                          >
                            <ChevronIcon
                              expanded={expanded}
                              className="h-3.5 w-3.5"
                            />
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap break-words">
                        {summary || <span className="text-slate-300">—</span>}
                      </span>
                    )}
                  </td>
                  {/* 日志详情按钮 */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top">
                    {hasOutput ? (
                      <button
                        type="button"
                        onClick={() => setModalCmd(cmd)}
                        className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <LogIcon className="h-3 w-3" />
                        详情
                      </button>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>
                  {/* 结果 */}
                  <td className="px-4 py-3.5 align-top">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${getActionStatusClasses(
                        status
                      )}`}
                    >
                      {cmd.status ?? '-'}
                    </span>
                  </td>
                  {/* 耗时 */}
                  <td className="px-4 py-3.5 align-top text-xs font-semibold text-slate-700">
                    {cmd.duration_time ?? '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 日志详情弹窗 */}
      {modalCmd && (
        <LogOutputModal
          open={!!modalCmd}
          onClose={() => setModalCmd(null)}
          commandName={modalCmd.name}
          output={modalCmd.output}
        />
      )}
    </>
  );
};

/* ─── 旧版动作表格（无 log 时） ─── */
const LegacyActionsTable: React.FC<{
  rows: { item: ActionDetailRecord; globalIndex: number }[];
  tableKey: string;
}> = ({ rows, tableKey }) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [tableAllExpanded, setTableAllExpanded] = useState(false);

  const toggleAll = () => {
    const next = !tableAllExpanded;
    setTableAllExpanded(next);
    const m: Record<number, boolean> = {};
    rows.forEach(({ globalIndex }) => {
      m[globalIndex] = next;
    });
    setExpandedRows(m);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">
        <colgroup>
          <col style={{ width: '40px' }} />
          <col style={{ width: '108px' }} />
          <col />
          <col style={{ width: '80px' }} />
          <col style={{ width: '68px' }} />
        </colgroup>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
              #
            </th>
            <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
              动作类型
            </th>
            <th className="px-3 py-2 text-left text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span>详情</span>
                <button
                  type="button"
                  onClick={toggleAll}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                >
                  <ChevronIcon
                    expanded={tableAllExpanded}
                    className="h-2.5 w-2.5"
                  />
                  {tableAllExpanded ? '收起全部' : '展开全部'}
                </button>
              </div>
            </th>
            <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
              结果
            </th>
            <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
              耗时
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ item: detailItem, globalIndex: index }) => {
            const resultDisplay = getResultDisplay(detailItem);
            const expanded = !!expandedRows[index];
            const longDesc =
              detailItem.description && detailItem.description.length > 60;
            return (
              <tr
                key={`${tableKey}-legacy-${index}-${detailItem.label}`}
                className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3.5 align-top text-sm font-semibold text-slate-400">
                  {index + 1}
                </td>
                <td className="px-4 py-3.5 align-top text-xs font-medium text-slate-700">
                  {detailItem.label}
                </td>
                <td className="overflow-hidden px-4 py-3.5 align-top text-xs leading-6 text-slate-600">
                  {longDesc ? (
                    <div className="relative pr-6">
                      <div
                        className={`break-words ${
                          expanded ? 'whitespace-pre-wrap' : 'line-clamp-2'
                        }`}
                      >
                        {detailItem.description}
                      </div>
                      <Tooltip title={expanded ? '收起' : '展开'}>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedRows((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                          className="absolute right-1 top-1 inline-flex items-center text-slate-400 transition-colors hover:text-slate-600"
                        >
                          <ChevronIcon
                            expanded={expanded}
                            className="h-3.5 w-3.5"
                          />
                        </button>
                      </Tooltip>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap break-words">
                      {detailItem.description}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5 align-top">
                  {resultDisplay ? (
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${getActionStatusClasses(
                        resultDisplay.status
                      )}`}
                    >
                      {resultDisplay.label}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3.5 align-top text-xs font-semibold text-slate-700">
                  {detailItem.duration || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ─── 单个 Task 卡片 ─── */
const TaskCard: React.FC<{
  taskId: string | undefined;
  rows: { item: ActionDetailRecord; globalIndex: number }[];
  currentStepKey: string;
  logTask?: LogTask;
  cardIndex: number;
}> = ({ taskId, rows, currentStepKey, logTask, cardIndex }) => {
  const [tableExpanded, setTableExpanded] = useState(true);

  const def = taskId ? TASK_DEF_MAP[taskId] : undefined;
  const displayName = def?.name ?? taskId ?? '未分组';

  // 优先使用 log 数据，否则 fallback 到原始 rows 的数量
  const actionCount = logTask?.commands ? logTask.commands.length : rows.length;
  const taskStatus = logTask ? normalizeLogStatus(logTask.status) : undefined;
  const evidence = logTask?.evidence;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      {/* 卡片头 */}
      <div className="flex items-center gap-0 border-b border-slate-100">
        {/* 左侧序号 */}
        <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
            {cardIndex}
          </span>
        </div>

        {/* 中间：标题 + 描述 */}
        <div className="min-w-0 flex-1 px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              {displayName}
            </span>
            <TaskStatusBadge status={taskStatus} />
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {actionCount} 个动作
            </span>
            {/* log 数据来源标识 */}
            {/* {logTask && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-500 ring-1 ring-indigo-100">
                <LogIcon className="h-3 w-3" />
                LOG
              </span>
            )} */}
          </div>
          {def?.description && (
            <Tooltip
              title={def.description}
              placement="bottomLeft"
              styles={{ root: { maxWidth: 520 } }}
            >
              <p className="mt-2 line-clamp-2 cursor-default text-xs leading-relaxed text-slate-500">
                {def.description}
              </p>
            </Tooltip>
          )}
        </div>

        {/* 右侧：折叠按钮 */}
        <button
          type="button"
          onClick={() => setTableExpanded((v) => !v)}
          className="mr-4 inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
        >
          <ChevronIcon expanded={tableExpanded} className="h-3 w-3" />
          {tableExpanded ? '收起' : '展开'}
        </button>
      </div>

      {/* 有 log 时：观点 & 痛点置于表格上方 */}
      {tableExpanded &&
      logTask &&
      (evidence?.observations?.length || evidence?.pain_points?.length) ? (
        <div className="border-b border-slate-100 px-5 py-4">
          <EvidenceInline
            observations={evidence?.observations}
            pain_points={evidence?.pain_points}
          />
        </div>
      ) : null}

      {/* 动作表格 */}
      {tableExpanded &&
        (logTask?.commands ? (
          <LogCommandsTable
            commands={logTask.commands}
            tableKey={`${currentStepKey}-${taskId ?? 'no_task'}`}
          />
        ) : (
          <LegacyActionsTable
            rows={rows}
            tableKey={`${currentStepKey}-${taskId ?? 'no_task'}`}
          />
        ))}

      {/* 无 log 时：观测 & 痛点保留在表格下方（折叠块） */}
      {!logTask && tableExpanded && (
        <div className="border-t border-slate-100 px-5 py-4">
          <EvidenceBlock
            observations={evidence?.observations}
            pain_points={evidence?.pain_points}
          />
        </div>
      )}
    </div>
  );
};

/* ─── 主组件 ─── */
const KeyActionsSection: React.FC<KeyActionsSectionProps> = ({
  currentStepKey,
  executionPathItems,
  projectFileKey,
}) => {
  const logData = useLogData(projectFileKey);

  const groups = groupByTaskId(executionPathItems);

  return (
    <div className="mt-6">
      <div className="text-base font-semibold text-slate-900">
        任务与关键动作
      </div>

      {executionPathItems.length ? (
        <div className="mt-4 space-y-4">
          {groups.map(({ taskId, rows }, idx) => {
            const logTask =
              logData && taskId
                ? (logData[taskId] as LogTask | undefined)
                : undefined;
            return (
              <TaskCard
                key={taskId ?? '__no_task__'}
                taskId={taskId}
                rows={rows}
                currentStepKey={currentStepKey}
                logTask={logTask}
                cardIndex={idx + 1}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-700">
          当前步骤未记录执行路径。
        </div>
      )}
    </div>
  );
};

export default KeyActionsSection;
