import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, Tooltip } from 'antd';
import { ActionDetailRecord, ActionStatus } from '../types';
import { getActionStatusClasses } from '../helpers';
import useLogData, { LogCommand, useCommandOutput } from '../hooks/useLogData';
import EvidencePanel, { EvidenceIcon } from './EvidencePanel';
import TaskCardShell, { TaskCardTab } from './TaskCardShell';
import SharedSearchEngineTabs from './SharedSearchEngineTabs';
import {
  ActionTaskGroup,
  getSharedSearchEngineOptions,
  groupActionItemsByTask,
} from '../taskMeta';

type KeyActionsSectionProps = {
  currentStepKey: string;
  /** 步骤的 code（如 S1_env_setup），用于痛点确认的唯一键 */
  stepCode?: string;
  executionPathItems: ActionDetailRecord[];
  /** 报告文件 key，如 cann_asc_devkit_20260408_1824，用于推导 log 路径 */
  projectFileKey?: string;
  isLatestReport?: boolean;
  painFocusTarget?: {
    taskId: string;
    painId: string;
    autoOpen?: boolean;
  };
  onPainFocusHandled?: () => void;
  versionOptions?: Array<{ value: string; label: string }>;
  previewMode?: boolean;
};

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

const formatArgValue = (value: unknown) => {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
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
  projectFileKey?: string;
  commandId?: string;
}> = ({ open, onClose, commandName, projectFileKey, commandId }) => {
  const { output, loading } = useCommandOutput(
    open ? projectFileKey : undefined,
    open ? commandId : undefined
  );

  return (
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
      destroyOnClose
    >
      <div className="max-h-[70vh] overflow-y-auto">
        {loading ? (
          <div className="px-5 py-6 text-center text-sm text-slate-400">
            加载中…
          </div>
        ) : output ? (
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
};

/* ─── 有 log 时表格上方展示的总结 & 痛点（内联卡片，默认展开） ─── */
const EvidenceInline: React.FC<{
  observations?: string[];
  pain_points?: string[];
  observations_tool_nums?: string[][];
  pain_points_tool_nums?: string[][];
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  legacyStepIds?: string[];
  highlightTaskId?: string;
  onStepClick?: (toolIds: string[]) => void;
  painFocusTarget?: {
    painId: string;
    autoOpen?: boolean;
  };
  onPainFocusHandled?: () => void;
  isLatestReport?: boolean;
  versionOptions?: Array<{ value: string; label: string }>;
  previewMode?: boolean;
}> = ({
  observations,
  pain_points,
  observations_tool_nums,
  pain_points_tool_nums,
  fileKey,
  stepId,
  legacyStepId,
  legacyStepIds,
  highlightTaskId,
  onStepClick,
  painFocusTarget,
  onPainFocusHandled,
  isLatestReport = false,
  versionOptions,
  previewMode = false,
}) => {
  const hasObs = observations && observations.length > 0;
  const hasPain = pain_points && pain_points.length > 0;
  if (!hasObs && !hasPain) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <EvidenceIcon className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-sm font-semibold text-slate-700">
          总结 &amp; 痛点
        </span>
        <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-bold leading-none text-slate-600">
          {(observations?.length ?? 0) + (pain_points?.length ?? 0)}
        </span>
      </div>
      <EvidencePanel
        observations={observations}
        pain_points={pain_points}
        observations_tool_nums={observations_tool_nums}
        pain_points_tool_nums={pain_points_tool_nums}
        showEmpty={false}
        fileKey={fileKey}
        stepId={stepId}
        legacyStepId={legacyStepId}
        legacyStepIds={legacyStepIds}
        highlightTaskId={highlightTaskId}
        onStepClick={onStepClick}
        painFocusTarget={painFocusTarget}
        onPainFocusHandled={onPainFocusHandled}
        isLatestReport={isLatestReport}
        versionOptions={versionOptions}
        previewMode={previewMode}
      />
    </div>
  );
};

/* ─── 证据 / 痛点折叠块 ─── */
const EvidenceBlock: React.FC<{
  observations?: string[];
  pain_points?: string[];
  observations_tool_nums?: string[][];
  pain_points_tool_nums?: string[][];
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  legacyStepIds?: string[];
  highlightTaskId?: string;
  onStepClick?: (toolIds: string[]) => void;
  painFocusTarget?: {
    painId: string;
    autoOpen?: boolean;
  };
  onPainFocusHandled?: () => void;
  isLatestReport?: boolean;
  versionOptions?: Array<{ value: string; label: string }>;
  previewMode?: boolean;
}> = ({
  observations,
  pain_points,
  observations_tool_nums,
  pain_points_tool_nums,
  fileKey,
  stepId,
  legacyStepId,
  legacyStepIds,
  highlightTaskId,
  onStepClick,
  painFocusTarget,
  onPainFocusHandled,
  isLatestReport = false,
  versionOptions,
  previewMode = false,
}) => {
  const [open, setOpen] = useState(false);
  const hasData =
    (observations && observations.length > 0) ||
    (pain_points && pain_points.length > 0);

  if (!hasData) {
    return (
      <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-3 py-2">
        <EvidenceIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" />
        <span className="text-xs text-slate-400">暂无总结与痛点记录</span>
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
          总结 & 痛点
          <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-bold leading-none text-slate-600">
            {(observations?.length ?? 0) + (pain_points?.length ?? 0)}
          </span>
        </span>
        <ChevronIcon expanded={open} className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {open && (
        <div className="border-t border-slate-100 px-3 py-3">
          <EvidencePanel
            observations={observations}
            pain_points={pain_points}
            observations_tool_nums={observations_tool_nums}
            pain_points_tool_nums={pain_points_tool_nums}
            variant="compact"
            showEmpty={false}
            fileKey={fileKey}
            stepId={stepId}
            legacyStepId={legacyStepId}
            legacyStepIds={legacyStepIds}
            highlightTaskId={highlightTaskId}
            onStepClick={onStepClick}
            painFocusTarget={painFocusTarget}
            onPainFocusHandled={onPainFocusHandled}
            isLatestReport={isLatestReport}
            versionOptions={versionOptions}
            previewMode={previewMode}
          />
        </div>
      )}
    </div>
  );
};

/* ─── Log 模式命令表格 ─── */
const LogCommandsTable: React.FC<{
  commands: LogCommand[];
  tableKey: string;
  projectFileKey?: string;
  highlightedIndices?: number[];
}> = ({ commands, tableKey, projectFileKey, highlightedIndices = [] }) => {
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
        <table className="w-full min-w-[760px] table-fixed">
          <colgroup>
            <col style={{ width: '36px' }} />
            <col style={{ width: 'clamp(88px, 14vw, 112px)' }} />
            <col style={{ width: 'clamp(120px, 22vw, 180px)' }} />
            <col />
            <col style={{ width: '72px' }} />
            <col style={{ width: '76px' }} />
            <col style={{ width: '72px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                #
              </th>
              <th
                className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-semibold text-slate-700"
                style={{ width: 'clamp(88px, 14vw, 112px)' }}
              >
                工具名称
              </th>
              <th className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-semibold text-slate-700">
                参数
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center justify-between gap-2">
                  <span className="whitespace-nowrap">摘要</span>
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                  >
                    <ChevronIcon
                      expanded={allExpanded}
                      className="h-2.5 w-2.5"
                    />
                    {allExpanded ? '收起' : '展开'}
                  </button>
                </div>
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 text-left text-sm font-semibold text-slate-700">
                详情
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 text-left text-sm font-semibold text-slate-700">
                结果
              </th>
              <th className="whitespace-nowrap px-3 py-2.5 text-left text-sm font-semibold text-slate-700">
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
              // output 字段由后端按需加载，通过 output_summary 或 thought 判断是否有内容可查看
              const hasOutput = !!(
                cmd.id &&
                (cmd.output_summary || cmd.thought || cmd.output)
              );

              // 参数格式化（简短展示）
              let argsDisplay = '';
              let argsEntries: Array<{ key: string; value: string }> = [];
              if (cmd.args && cmd.args !== '{}') {
                try {
                  const parsed = JSON.parse(cmd.args) as Record<
                    string,
                    unknown
                  >;
                  argsEntries = Object.entries(parsed).map(([key, value]) => ({
                    key,
                    value: formatArgValue(value),
                  }));
                  argsDisplay = argsEntries
                    .map(({ key, value }) => `${key}: ${value}`)
                    .join('；');
                } catch {
                  argsDisplay = cmd.args;
                }
              }

              return (
                <tr
                  key={`${tableKey}-cmd-${i}-${cmd.id}`}
                  id={`cmd-row-${tableKey}-${i + 1}`}
                  className={`border-b border-slate-100 transition-all last:border-b-0 hover:bg-slate-50/50 ${
                    highlightedIndices.includes(i + 1)
                      ? 'bg-indigo-50/80 ring-1 ring-inset ring-indigo-200'
                      : ''
                  }`}
                >
                  {/* 序号 */}
                  <td className="whitespace-nowrap px-4 py-3.5 align-top text-sm font-semibold text-slate-400">
                    {i + 1}
                  </td>
                  {/* 工具名 */}
                  <td
                    className="overflow-hidden px-4 py-3.5 align-top"
                    style={{ width: 'clamp(88px, 14vw, 112px)' }}
                  >
                    <Tooltip title={cmd.name}>
                      <code className="block w-full overflow-hidden truncate whitespace-nowrap rounded bg-slate-100 px-1.5 py-0.5 align-top font-mono text-xs text-slate-700">
                        {cmd.name}
                      </code>
                    </Tooltip>
                  </td>
                  {/* 参数 */}
                  <td className="px-4 py-3.5 align-top text-xs text-slate-500">
                    {argsDisplay ? (
                      <Tooltip
                        title={
                          <div className="max-w-[560px] whitespace-normal break-words leading-relaxed [word-break:break-word]">
                            {argsDisplay}
                          </div>
                        }
                        styles={{ root: { maxWidth: 600 } }}
                      >
                        {argsEntries.length ? (
                          <div className="cursor-default space-y-1">
                            {argsEntries.map(({ key, value }) => (
                              <div
                                key={key}
                                className="flex items-start gap-1 overflow-hidden whitespace-nowrap"
                              >
                                <span className="shrink-0 font-medium text-slate-600">
                                  {key}
                                </span>
                                <span className="shrink-0">:</span>
                                <span className="min-w-0 truncate">
                                  {value}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="line-clamp-2 cursor-default break-words leading-relaxed [word-break:break-word]">
                            {argsDisplay}
                          </span>
                        )}
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
                  <td className="whitespace-nowrap px-3 py-3.5 align-top">
                    {hasOutput ? (
                      <button
                        type="button"
                        onClick={() => setModalCmd(cmd)}
                        aria-label="查看详情"
                        title="查看详情"
                        className="inline-flex items-center justify-center gap-1 rounded border border-slate-200 bg-white px-1.5 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 lg:px-2"
                      >
                        <LogIcon className="h-3 w-3" />
                        <span className="hidden lg:inline">详情</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>
                  {/* 结果 */}
                  <td className="px-3 py-3.5 align-top">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${getActionStatusClasses(
                        status
                      )}`}
                    >
                      {cmd.status ?? '-'}
                    </span>
                  </td>
                  {/* 耗时 */}
                  <td className="px-3 py-3.5 align-top text-xs font-semibold text-slate-700">
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
          projectFileKey={projectFileKey}
          commandId={modalCmd.id}
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
          <col style={{ width: '96px' }} />
          <col />
          <col style={{ width: '72px' }} />
          <col style={{ width: '64px' }} />
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
              <div className="flex items-center justify-between gap-2">
                <span className="whitespace-nowrap">详情</span>
                <button
                  type="button"
                  onClick={toggleAll}
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                >
                  <ChevronIcon
                    expanded={tableAllExpanded}
                    className="h-2.5 w-2.5"
                  />
                  {tableAllExpanded ? '收起' : '展开'}
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
  group: ActionTaskGroup;
  currentStepKey: string;
  cardIndex: number;
  projectFileKey?: string;
  stepCode?: string;
  isLatestReport?: boolean;
  activeVariantTaskId: string;
  onActiveVariantTaskIdChange: (taskId: string) => void;
  hideTabs?: boolean;
  highlightedIndices?: number[];
  onStepClick?: (toolIds: string[]) => void;
  painFocusTarget?: {
    painId: string;
    autoOpen?: boolean;
  };
  onPainFocusHandled?: () => void;
  versionOptions?: Array<{ value: string; label: string }>;
  previewMode?: boolean;
}> = ({
  group,
  currentStepKey,
  cardIndex,
  projectFileKey,
  stepCode,
  isLatestReport = false,
  activeVariantTaskId,
  onActiveVariantTaskIdChange,
  hideTabs = false,
  highlightedIndices,
  onStepClick,
  painFocusTarget,
  onPainFocusHandled,
  versionOptions,
  previewMode = false,
}) => {
  const [tableExpanded, setTableExpanded] = useState(true);
  const activeVariant =
    group.variants.find(
      (variant) => (variant.taskId || '__no_task__') === activeVariantTaskId
    ) ?? group.variants[0];
  const activeTaskId = activeVariant?.taskId;
  const rows = activeVariant?.rows ?? [];
  const logTask = activeVariant?.logTask;

  const actionCount = logTask?.commands ? logTask.commands.length : rows.length;
  const taskStatus = logTask ? normalizeLogStatus(logTask.status) : undefined;
  const evidence = logTask?.evidence;
  const tableKey = `${currentStepKey}-${activeTaskId ?? 'no_task'}`;
  const tabs = useMemo<TaskCardTab[]>(
    () =>
      group.variants.map((variant) => ({
        key: variant.taskId || '__no_task__',
        label: variant.searchEngineLabel || '默认',
        description: variant.description || group.description,
      })),
    [group.description, group.variants]
  );

  return (
    <TaskCardShell
      cardId={`task-card-${currentStepKey}-${group.groupKey}`}
      cardIndex={cardIndex}
      title={group.displayName}
      description={group.description}
      tabs={hideTabs ? [] : tabs}
      activeTabKey={activeVariant?.taskId || '__no_task__'}
      onTabChange={onActiveVariantTaskIdChange}
      headerMeta={
        <>
          <TaskStatusBadge status={taskStatus} />
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
            {actionCount} 个动作
          </span>
        </>
      }
      headerAction={
        <button
          type="button"
          onClick={() => setTableExpanded((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
        >
          <ChevronIcon expanded={tableExpanded} className="h-3 w-3" />
          {tableExpanded ? '收起' : '展开'}
        </button>
      }
    >
      <>
        {tableExpanded &&
        logTask &&
        (evidence?.observations?.length || evidence?.pain_points?.length) ? (
          <div className="border-b border-slate-100 px-5 py-4">
            <EvidenceInline
              observations={evidence?.observations}
              pain_points={evidence?.pain_points}
              observations_tool_nums={evidence?.observations_tool_nums}
              pain_points_tool_nums={evidence?.pain_points_tool_nums}
              fileKey={projectFileKey}
              stepId={group.groupKey}
              legacyStepId={activeTaskId}
              legacyStepIds={
                [activeTaskId, stepCode].filter(Boolean) as string[]
              }
              highlightTaskId={activeTaskId}
              onStepClick={onStepClick}
              painFocusTarget={painFocusTarget}
              onPainFocusHandled={onPainFocusHandled}
              isLatestReport={isLatestReport}
              versionOptions={versionOptions}
              previewMode={previewMode}
            />
          </div>
        ) : null}

        {tableExpanded &&
          (logTask?.commands ? (
            <LogCommandsTable
              commands={logTask.commands}
              tableKey={tableKey}
              projectFileKey={projectFileKey}
              highlightedIndices={highlightedIndices}
            />
          ) : (
            <LegacyActionsTable rows={rows} tableKey={tableKey} />
          ))}

        {!logTask && tableExpanded && (
          <div className="border-t border-slate-100 px-5 py-4">
            <EvidenceBlock
              observations={evidence?.observations}
              pain_points={evidence?.pain_points}
              observations_tool_nums={evidence?.observations_tool_nums}
              pain_points_tool_nums={evidence?.pain_points_tool_nums}
              fileKey={projectFileKey}
              stepId={group.groupKey}
              legacyStepId={activeTaskId}
              legacyStepIds={
                [activeTaskId, stepCode].filter(Boolean) as string[]
              }
              highlightTaskId={activeTaskId}
              onStepClick={onStepClick}
              painFocusTarget={painFocusTarget}
              onPainFocusHandled={onPainFocusHandled}
              isLatestReport={isLatestReport}
              versionOptions={versionOptions}
              previewMode={previewMode}
            />
          </div>
        )}
      </>
    </TaskCardShell>
  );
};

/* ─── 主组件 ─── */
const KeyActionsSection: React.FC<KeyActionsSectionProps> = ({
  currentStepKey,
  stepCode,
  executionPathItems,
  projectFileKey,
  isLatestReport = false,
  painFocusTarget,
  onPainFocusHandled,
  versionOptions,
  previewMode = false,
}) => {
  const logData = useLogData(projectFileKey);
  const [highlightedInfo, setHighlightedInfo] = useState<{
    tableKey: string;
    indices: number[];
  } | null>(null);
  const [handledPainFocusKey, setHandledPainFocusKey] = useState<string>('');
  const [activeVariantByGroup, setActiveVariantByGroup] = useState<
    Record<string, string>
  >({});
  const [sharedSearchEngine, setSharedSearchEngine] = useState<string>('');
  const groups = useMemo(
    () => groupActionItemsByTask(executionPathItems, logData),
    [executionPathItems, logData]
  );
  const sharedSearchEngineOptions = useMemo(
    () =>
      stepCode?.startsWith('S0') ? getSharedSearchEngineOptions(groups) : [],
    [groups, stepCode]
  );
  const normalizedTaskId = painFocusTarget?.taskId?.trim() || '';
  const normalizedPainId = painFocusTarget?.painId?.trim() || '';
  const normalizedPainFocus = useMemo(
    () =>
      painFocusTarget && normalizedPainId
        ? {
            taskId: normalizedTaskId,
            painId: normalizedPainId,
            autoOpen: painFocusTarget.autoOpen,
          }
        : null,
    [normalizedPainId, normalizedTaskId, painFocusTarget]
  );
  const painFocusKey = normalizedPainFocus
    ? `${normalizedPainFocus.taskId}#${normalizedPainFocus.painId}`
    : '';
  useEffect(() => {
    setSharedSearchEngine(sharedSearchEngineOptions[0]?.value || '');
  }, [sharedSearchEngineOptions, stepCode]);
  const getVariantTaskId = useCallback(
    (group: ActionTaskGroup) =>
      (sharedSearchEngine
        ? group.variants.find(
            (variant) => variant.searchEngine === sharedSearchEngine
          )?.taskId
        : undefined) ||
      activeVariantByGroup[group.groupKey] ||
      group.variants[0]?.taskId ||
      '__no_task__',
    [activeVariantByGroup, sharedSearchEngine]
  );
  const setActiveVariantTaskId = useCallback(
    (groupKey: string, taskId: string) => {
      setActiveVariantByGroup((prev) =>
        prev[groupKey] === taskId ? prev : { ...prev, [groupKey]: taskId }
      );
    },
    []
  );

  const handleStepClick = (toolIds: string[], tableKey: string) => {
    const indices = toolIds
      .map((id) => parseInt(id, 10))
      .filter((n) => !isNaN(n));
    if (indices.length === 0) return;

    setHighlightedInfo({ tableKey, indices });

    // 滚动到第一个 ID 对应的步骤
    const firstId = indices[0];
    const element = document.getElementById(`cmd-row-${tableKey}-${firstId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const focusGroupTask = (taskId?: string) => {
      if (!taskId) return undefined;
      return groups.find(
        (group) =>
          group.groupKey === taskId ||
          group.variants.some((variant) => variant.taskId === taskId)
      );
    };

    const handleGlobalHighlight = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.toolIds) {
        const targetTaskId =
          typeof detail.taskId === 'string' ? detail.taskId : undefined;
        const targetGroup = focusGroupTask(targetTaskId) || groups[0];
        const targetVariant = targetGroup?.variants.find(
          (variant) => variant.taskId === targetTaskId
        );
        const targetTaskKey =
          targetVariant?.taskId ||
          (targetGroup ? getVariantTaskId(targetGroup) : undefined) ||
          targetGroup?.variants[0]?.taskId ||
          'no_task';
        if (targetVariant?.searchEngine) {
          setSharedSearchEngine(targetVariant.searchEngine);
        }
        if (targetGroup) {
          setActiveVariantTaskId(targetGroup.groupKey, targetTaskKey);
        }
        const targetTableKey = targetGroup
          ? `${currentStepKey}-${targetTaskKey}`
          : null;

        if (targetTableKey) {
          window.setTimeout(() => {
            handleStepClick(detail.toolIds, targetTableKey);
          }, 0);
        }
      }
    };

    window.addEventListener(
      'user-journey:highlight-steps',
      handleGlobalHighlight
    );
    return () => {
      window.removeEventListener(
        'user-journey:highlight-steps',
        handleGlobalHighlight
      );
    };
  }, [currentStepKey, getVariantTaskId, groups, setActiveVariantTaskId]); // 当步骤切换或数据变化时重新绑定逻辑

  useEffect(() => {
    if (!painFocusKey) {
      setHandledPainFocusKey('');
      return;
    }

    if (handledPainFocusKey && handledPainFocusKey !== painFocusKey) {
      setHandledPainFocusKey('');
    }
  }, [handledPainFocusKey, painFocusKey]);

  useEffect(() => {
    if (!normalizedPainFocus || handledPainFocusKey === painFocusKey) {
      return;
    }

    const targetGroup = groups.find(
      (group) =>
        group.groupKey === normalizedPainFocus.taskId ||
        group.variants.some(
          (variant) => variant.taskId === normalizedPainFocus.taskId
        )
    );
    const targetVariant = targetGroup?.variants.find(
      (variant) => variant.taskId === normalizedPainFocus.taskId
    );
    if (targetVariant?.searchEngine) {
      setSharedSearchEngine(targetVariant.searchEngine);
    }
    if (targetGroup) {
      setActiveVariantTaskId(
        targetGroup.groupKey,
        targetVariant?.taskId || getVariantTaskId(targetGroup)
      );
    }
    const taskCard = document.getElementById(
      `task-card-${currentStepKey}-${
        targetGroup?.groupKey || normalizedPainFocus.taskId || 'no_task'
      }`
    );
    if (taskCard) {
      taskCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [
    currentStepKey,
    groups,
    handledPainFocusKey,
    normalizedPainFocus,
    painFocusKey,
    getVariantTaskId,
    setActiveVariantTaskId,
  ]);

  return (
    <div className="mt-6">
      <div className="text-base font-semibold text-slate-900">
        任务与关键动作
      </div>

      {executionPathItems.length ? (
        <div className="mt-4 space-y-4">
          {sharedSearchEngineOptions.length > 1 ? (
            <SharedSearchEngineTabs
              options={sharedSearchEngineOptions}
              value={sharedSearchEngine}
              onChange={setSharedSearchEngine}
            />
          ) : null}
          {groups.map((group, idx) => {
            const activeTaskId = getVariantTaskId(group);
            const tableKey = `${currentStepKey}-${activeTaskId}`;
            return (
              <TaskCard
                key={group.groupKey}
                group={group}
                currentStepKey={currentStepKey}
                cardIndex={idx + 1}
                projectFileKey={projectFileKey}
                stepCode={stepCode}
                isLatestReport={isLatestReport}
                previewMode={previewMode}
                activeVariantTaskId={activeTaskId}
                onActiveVariantTaskIdChange={(taskId) =>
                  setActiveVariantTaskId(group.groupKey, taskId)
                }
                hideTabs={sharedSearchEngineOptions.length > 1}
                highlightedIndices={
                  highlightedInfo?.tableKey === tableKey
                    ? highlightedInfo.indices
                    : []
                }
                onStepClick={(ids) => handleStepClick(ids, tableKey)}
                painFocusTarget={
                  normalizedPainFocus &&
                  (activeTaskId === normalizedPainFocus.taskId ||
                    group.groupKey === normalizedPainFocus.taskId) &&
                  handledPainFocusKey !== painFocusKey
                    ? {
                        painId: normalizedPainFocus.painId,
                        autoOpen: normalizedPainFocus.autoOpen,
                      }
                    : undefined
                }
                onPainFocusHandled={() => {
                  if (painFocusKey) {
                    setHandledPainFocusKey(painFocusKey);
                  }
                  onPainFocusHandled?.();
                }}
                versionOptions={versionOptions}
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
