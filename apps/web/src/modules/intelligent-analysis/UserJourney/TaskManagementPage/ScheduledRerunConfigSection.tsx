import React from 'react';
import { Select, Switch } from 'antd';
import type { RepoRerunScheduleConfig } from '../rawData/apiClient';

type ScheduledRerunConfigSectionProps = {
  config?: RepoRerunScheduleConfig;
  loading: boolean;
  saving: boolean;
  onEnabledChange: (enabled: boolean) => void;
  onPeriodChange: (period: 'daily' | 'weekly') => void;
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

const ScheduledRerunConfigSection: React.FC<
  ScheduledRerunConfigSectionProps
> = ({ config, loading, saving, onEnabledChange, onPeriodChange }) => {
  const isEnabled = config?.enabled !== false;
  const nextTriggerText = config?.next_trigger_at
    ? formatDateTime(config.next_trigger_at)
    : isEnabled
    ? '--'
    : '任务已关闭';
  const scheduleLabel =
    config?.schedule_period === 'weekly'
      ? '（每周一 00:00）'
      : '（每天 00:00）';

  return (
    <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-semibold text-slate-800">定时自动重跑</div>
          <div className="mt-1 text-sm text-slate-500">
            扫描总览看板中存在“已修复待复测”痛点的仓库，进行自动重跑。
          </div>
          <div className="mt-2 text-xs text-slate-500">
            下次触发：{nextTriggerText}
            {scheduleLabel}
          </div>
          {config?.last_run_at ? (
            <div className="mt-2 text-xs text-slate-500">
              最近执行：{formatDateTime(config.last_run_at)}；候选{' '}
              {config.last_run_result?.candidate_count ?? 0}，已触发{' '}
              {config.last_run_result?.triggered_count ?? 0}，失败{' '}
              {config.last_run_result?.failed_count ?? 0}
            </div>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
          <span>周期</span>
          <Select
            value={config?.schedule_period || 'daily'}
            className="[&_.ant-select-selector]:!rounded-full"
            options={[
              { value: 'daily', label: '每天' },
              { value: 'weekly', label: '每周' },
            ]}
            disabled={loading || saving}
            style={{ width: 96 }}
            onChange={onPeriodChange}
          />
          <span>{isEnabled ? '已开启' : '已关闭'}</span>
          <Switch
            checked={isEnabled}
            loading={loading || saving}
            onChange={onEnabledChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduledRerunConfigSection;
