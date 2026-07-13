import React from 'react';
import { Select, Switch } from 'antd';
import type {
  RepoRerunScheduleConfig,
  RepoRerunScheduleTask,
} from '../rawData/apiClient';

type ScheduleTaskPatch = Partial<
  Pick<RepoRerunScheduleTask, 'enabled' | 'schedule_period' | 'repo_scope'>
>;

type ScheduledRerunConfigSectionProps = {
  config?: RepoRerunScheduleConfig;
  loading: boolean;
  saving: boolean;
  onTaskChange: (taskId: string, patch: ScheduleTaskPatch) => void;
};

const formatDateTime = (value: unknown) => {
  const text = String(value || '').trim();
  if (!text) return '--';
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;
  return parsed.toLocaleString('zh-CN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

type ScheduleTaskCardProps = {
  task: RepoRerunScheduleTask;
  disabled: boolean;
  onChange: (taskId: string, patch: ScheduleTaskPatch) => void;
};

const ScheduleTaskCard: React.FC<ScheduleTaskCardProps> = ({
  task,
  disabled,
  onChange,
}) => {
  const nextTriggerText = task.next_trigger_at
    ? formatDateTime(task.next_trigger_at)
    : task.enabled
    ? '--'
    : '任务已关闭';
  const scheduleLabel =
    task.schedule_period === 'weekly' ? '每周六 03:00' : '每天 00:00';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-800">{task.task_name}</div>
          <div className="mt-1 text-xs text-slate-500">
            {scheduleLabel} · 下次触发：{nextTriggerText}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-sm text-slate-600">
          <span>{task.enabled ? '已开启' : '已关闭'}</span>
          <Switch
            checked={task.enabled}
            loading={disabled}
            onChange={(enabled) => onChange(task.task_id, { enabled })}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-xs font-medium text-slate-500">
            执行周期
          </span>
          <Select
            value={task.schedule_period}
            className="min-w-0 flex-1 [&_.ant-select-selector]:!rounded-xl"
            options={[
              { value: 'daily', label: '每天' },
              { value: 'weekly', label: '每周' },
            ]}
            disabled={disabled}
            onChange={(schedulePeriod) =>
              onChange(task.task_id, { schedule_period: schedulePeriod })
            }
          />
        </label>
        <label className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-xs font-medium text-slate-500">
            仓库范围
          </span>
          <Select
            value={task.repo_scope}
            className="min-w-0 flex-1 [&_.ant-select-selector]:!rounded-xl"
            options={[
              { value: 'all', label: '全部上线仓库' },
              {
                value: 'fixed_pending_retest',
                label: '仅已修复待复测仓库',
              },
            ]}
            disabled={disabled}
            onChange={(repoScope) =>
              onChange(task.task_id, { repo_scope: repoScope })
            }
          />
        </label>
      </div>

      {task.last_run_at ? (
        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
          最近执行：{formatDateTime(task.last_run_at)}；候选{' '}
          {task.last_run_result?.candidate_count ?? 0}，已触发{' '}
          {task.last_run_result?.triggered_count ?? 0}，失败{' '}
          {task.last_run_result?.failed_count ?? 0}
        </div>
      ) : null}
    </div>
  );
};

const ScheduledRerunConfigSection: React.FC<
  ScheduledRerunConfigSectionProps
> = ({ config, loading, saving, onTaskChange }) => {
  const tasks = config?.schedule_tasks || [];

  return (
    <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
      <div className="mb-4">
        <div className="font-semibold text-slate-800">定时自动重跑</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tasks.map((task) => (
          <ScheduleTaskCard
            key={task.task_id}
            task={task}
            disabled={loading || saving}
            onChange={onTaskChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduledRerunConfigSection;
