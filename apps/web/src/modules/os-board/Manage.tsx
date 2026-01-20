import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import Center from '@common/components/Layout/Center';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import { actions, loadFromStorage, saveToStorage } from './state';
import { osBoardState } from './state';
import type { OsBoardAlertCondition, OsBoardAlertLevel } from './types';

const tabs = [
  'dashboards',
  'alerts',
  'permissions',
  'models',
  'subscriptions',
] as const;
type TabKey = (typeof tabs)[number];

const Manage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const snap = useSnapshot(osBoardState);
  const [tab, setTab] = useState<TabKey>('dashboards');

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const q = String(router.query.tab || '');
    if (tabs.includes(q as any)) {
      setTab(q as TabKey);
    }
  }, [router.isReady, router.query.tab]);

  const metricMap = useMemo(() => {
    const all = [...snap.metrics, ...snap.derivedMetrics];
    return new Map(all.map((m) => [m.id, m]));
  }, [snap.metrics, snap.derivedMetrics]);

  return (
    <div className="bg-[#FAFAFA] py-10 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xl font-semibold">
            {t('os_board:manage.title')}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => router.push('/os-board')}>
              {t('os_board:manage.back_home')}
            </Button>
            <Button
              size="sm"
              onClick={() => router.push('/os-board/dashboard/create')}
            >
              {t('os_board:home.new_dashboard')}
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((k) => (
            <button
              key={k}
              type="button"
              className={
                tab === k
                  ? 'rounded border border-blue-600 bg-blue-50 px-3 py-2'
                  : 'rounded border bg-white px-3 py-2'
              }
              onClick={() => setTab(k)}
            >
              {t(`os_board:manage.tabs.${k}`)}
            </button>
          ))}
        </div>

        {tab === 'dashboards' ? (
          <div className="border bg-white p-4">
            {snap.dashboards.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                {t('common:no_data')}
              </div>
            ) : (
              <div className="space-y-3">
                {snap.dashboards.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{d.name}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {t('os_board:home.projects_count', {
                          count: d.config.projects.length,
                        })}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          router.push(`/os-board/dashboard/${d.id}`)
                        }
                      >
                        {t('os_board:home.open')}
                      </Button>
                      <Button
                        intent="text"
                        size="sm"
                        onClick={() => {
                          actions.deleteDashboard(d.id);
                          saveToStorage();
                        }}
                      >
                        {t('common:btn.delete')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {tab === 'alerts' ? <AlertsPanel metricMap={metricMap} /> : null}

        {tab === 'permissions' ? <PermissionsPanel /> : null}

        {tab === 'models' ? <ModelsPanel metricMap={metricMap} /> : null}

        {tab === 'subscriptions' ? <SubscriptionsPanel /> : null}
      </Center>
    </div>
  );
};

const PermissionsPanel = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(osBoardState);
  const [dashboardId, setDashboardId] = useState('');
  const dashboard = snap.dashboards.find((d) => d.id === dashboardId);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState<'owner' | 'editor' | 'viewer'>('viewer');

  return (
    <div className="border bg-white p-4">
      <div className="mb-3 font-semibold">
        {t('os_board:manage.permissions.title')}
      </div>
      <div className="mb-4">
        <div className="mb-1 text-xs text-gray-500">
          {t('os_board:manage.permissions.dashboard')}
        </div>
        <select
          className="w-full rounded border px-3 py-2"
          value={dashboardId}
          onChange={(e) => setDashboardId(e.target.value)}
        >
          <option value="" disabled>
            {t('os_board:manage.alerts.dashboard_placeholder')}
          </option>
          {snap.dashboards.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {!dashboard ? (
        <div className="py-10 text-center text-gray-500">
          {t('common:no_data')}
        </div>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-3 gap-3 md:grid-cols-1">
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.permissions.user')}
              </div>
              <input
                className="w-full rounded border px-3 py-2"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="user_id"
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.permissions.role')}
              </div>
              <select
                className="w-full rounded border px-3 py-2"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
              >
                <option value="owner">
                  {t('os_board:manage.permissions.roles.owner')}
                </option>
                <option value="editor">
                  {t('os_board:manage.permissions.roles.editor')}
                </option>
                <option value="viewer">
                  {t('os_board:manage.permissions.roles.viewer')}
                </option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                size="sm"
                disabled={userId.trim().length === 0}
                onClick={() => {
                  actions.addDashboardMember({
                    dashboardId: dashboard.id,
                    userId: userId.trim(),
                    role,
                  });
                  saveToStorage();
                  setUserId('');
                  setRole('viewer');
                }}
              >
                {t('os_board:manage.permissions.add')}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {dashboard.permissions.map((p) => (
              <div
                key={p.userId}
                className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold">{p.userId}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {t(`os_board:manage.permissions.roles.${p.role}`)}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <select
                    className="rounded border px-2 py-1 text-xs"
                    value={p.role}
                    onChange={(e) => {
                      actions.setDashboardMemberRole({
                        dashboardId: dashboard.id,
                        userId: p.userId,
                        role: e.target.value as any,
                      });
                      saveToStorage();
                    }}
                    disabled={p.role === 'owner'}
                  >
                    <option value="owner">
                      {t('os_board:manage.permissions.roles.owner')}
                    </option>
                    <option value="editor">
                      {t('os_board:manage.permissions.roles.editor')}
                    </option>
                    <option value="viewer">
                      {t('os_board:manage.permissions.roles.viewer')}
                    </option>
                  </select>
                  <Button
                    size="sm"
                    intent="text"
                    disabled={p.role === 'owner'}
                    onClick={() => {
                      actions.removeDashboardMember({
                        dashboardId: dashboard.id,
                        userId: p.userId,
                      });
                      saveToStorage();
                    }}
                  >
                    {t('common:btn.delete')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AlertsPanel = ({
  metricMap,
}: {
  metricMap: Map<string, { id: string; name: string }>;
}) => {
  const { t } = useTranslation();
  const snap = useSnapshot(osBoardState);
  const [open, setOpen] = useState(false);
  const [dashboardId, setDashboardId] = useState<string>('');
  const [metricId, setMetricId] = useState<string>('health_score');
  const [condition, setCondition] = useState<OsBoardAlertCondition>('lt');
  const [threshold, setThreshold] = useState<number>(60);
  const [level, setLevel] = useState<OsBoardAlertLevel>('warning');

  return (
    <div className="border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">{t('os_board:manage.alerts.title')}</div>
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          disabled={snap.dashboards.length === 0}
        >
          {t('common:btn.add')}
        </Button>
      </div>

      {snap.alertRules.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          {t('common:no_data')}
        </div>
      ) : (
        <div className="space-y-2">
          {snap.alertRules.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate font-semibold">
                  {metricMap.get(r.metricId)?.name || r.metricId}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {r.dashboardId} · {r.condition} {r.threshold} · {r.level} ·{' '}
                  {r.enabled
                    ? t('os_board:manage.alerts.enabled')
                    : t('os_board:manage.alerts.disabled')}
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <Button
                  size="sm"
                  intent="text"
                  onClick={() => {
                    actions.upsertAlertRule({
                      ...r,
                      enabled: !r.enabled,
                      channels: [...r.channels],
                    });
                    saveToStorage();
                  }}
                >
                  {r.enabled
                    ? t('os_board:manage.alerts.disable')
                    : t('os_board:manage.alerts.enable')}
                </Button>
                <Button
                  size="sm"
                  intent="text"
                  onClick={() => {
                    actions.removeAlertRule(r.id);
                    saveToStorage();
                  }}
                >
                  {t('common:btn.delete')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <div className="mb-2 text-xs text-gray-500">
          {t('os_board:manage.alerts.history')}
        </div>
        {snap.alertEvents.length === 0 ? (
          <div className="rounded border border-dashed p-4 text-center text-gray-500">
            {t('common:no_data')}
          </div>
        ) : (
          <div className="space-y-2">
            {snap.alertEvents.slice(0, 15).map((e) => (
              <div
                key={e.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold">
                    {metricMap.get(e.metricId)?.name || e.metricId}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {e.dashboardId} · {e.level} · {e.value.toFixed(2)} /{' '}
                    {e.threshold} · {e.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={open}
        dialogTitle={t('os_board:manage.alerts.create')}
        dialogContent={
          <div className="w-96 space-y-3">
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.alerts.dashboard')}
              </div>
              <select
                className="w-full rounded border px-3 py-2"
                value={dashboardId}
                onChange={(e) => setDashboardId(e.target.value)}
              >
                <option value="" disabled>
                  {t('os_board:manage.alerts.dashboard_placeholder')}
                </option>
                {snap.dashboards.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.alerts.metric')}
              </div>
              <select
                className="w-full rounded border px-3 py-2"
                value={metricId}
                onChange={(e) => setMetricId(e.target.value)}
              >
                {Array.from(metricMap.values()).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:manage.alerts.condition')}
                </div>
                <select
                  className="w-full rounded border px-3 py-2"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                >
                  <option value="gt">&gt;</option>
                  <option value="gte">&gt;=</option>
                  <option value="lt">&lt;</option>
                  <option value="lte">&lt;=</option>
                  <option value="eq">=</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:manage.alerts.threshold')}
                </div>
                <input
                  className="w-full rounded border px-3 py-2"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.alerts.level')}
              </div>
              <select
                className="w-full rounded border px-3 py-2"
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
              >
                <option value="critical">
                  {t('os_board:manage.alerts.levels.critical')}
                </option>
                <option value="warning">
                  {t('os_board:manage.alerts.levels.warning')}
                </option>
                <option value="info">
                  {t('os_board:manage.alerts.levels.info')}
                </option>
              </select>
            </div>
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button intent="text" size="sm" onClick={() => setOpen(false)}>
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              disabled={!dashboardId}
              onClick={() => {
                actions.upsertAlertRule({
                  dashboardId,
                  metricId,
                  condition,
                  threshold,
                  level,
                  channels: ['inbox'],
                  enabled: true,
                });
                saveToStorage();
                setOpen(false);
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setOpen(false)}
      />
    </div>
  );
};

const ModelsPanel = ({
  metricMap,
}: {
  metricMap: Map<string, { id: string; name: string }>;
}) => {
  const { t } = useTranslation();
  const snap = useSnapshot(osBoardState);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('衍生模型');
  const [unit, setUnit] = useState('');
  const [baseMetricIds, setBaseMetricIds] = useState<string[]>([]);
  const [script, setScript] = useState('');

  return (
    <div className="border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">{t('os_board:manage.models.title')}</div>
        <Button size="sm" onClick={() => setOpen(true)}>
          {t('os_board:manage.models.create')}
        </Button>
      </div>

      <div className="mb-6">
        <div className="mb-2 text-xs text-gray-500">
          {t('os_board:manage.models.default')}
        </div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
          {snap.metrics.slice(0, 9).map((m) => (
            <div key={m.id} className="rounded border px-3 py-2">
              <div className="truncate font-semibold">{m.name}</div>
              <div className="mt-1 truncate text-xs text-gray-500">
                {m.category} · {m.unit || ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs text-gray-500">
          {t('os_board:manage.models.derived')}
        </div>
        {snap.derivedMetrics.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            {t('common:no_data')}
          </div>
        ) : (
          <div className="space-y-2">
            {snap.derivedMetrics.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold">{m.name}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {m.category} · {m.unit || ''} ·{' '}
                    {t('os_board:manage.models.base_count', {
                      count: m.baseMetricIds.length,
                    })}
                  </div>
                </div>
                <Button
                  intent="text"
                  size="sm"
                  onClick={() => {
                    actions.removeDerivedMetric(m.id);
                    saveToStorage();
                  }}
                >
                  {t('common:btn.delete')}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={open}
        dialogTitle={t('os_board:manage.models.create')}
        dialogContent={
          <div className="w-[520px] space-y-3 md:w-[360px]">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:manage.models.name')}
                </div>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:manage.models.unit')}
                </div>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.models.category')}
              </div>
              <input
                className="w-full rounded border px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.models.base')}
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(metricMap.values()).map((m) => {
                  const selected = baseMetricIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={
                        selected
                          ? 'rounded border border-blue-600 bg-blue-50 px-2 py-1 text-xs'
                          : 'rounded border bg-white px-2 py-1 text-xs'
                      }
                      onClick={() => {
                        if (selected) {
                          setBaseMetricIds(
                            baseMetricIds.filter((x) => x !== m.id)
                          );
                          return;
                        }
                        setBaseMetricIds([...baseMetricIds, m.id]);
                      }}
                    >
                      {m.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.models.script')}
              </div>
              <textarea
                className="h-32 w-full rounded border px-3 py-2 font-mono text-xs"
                value={script}
                onChange={(e) => setScript(e.target.value)}
              />
            </div>
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button intent="text" size="sm" onClick={() => setOpen(false)}>
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              disabled={name.trim().length === 0 || baseMetricIds.length === 0}
              onClick={() => {
                actions.addDerivedMetric({
                  name: name.trim(),
                  category,
                  unit,
                  description: '',
                  baseMetricIds,
                  script,
                });
                saveToStorage();
                setOpen(false);
                setName('');
                setUnit('');
                setCategory('衍生模型');
                setBaseMetricIds([]);
                setScript('');
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setOpen(false)}
      />
    </div>
  );
};

const SubscriptionsPanel = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(osBoardState);
  const [open, setOpen] = useState(false);
  const [dashboardId, setDashboardId] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(
    'weekly'
  );
  const [template, setTemplate] = useState<
    'weekly' | 'monthly' | 'quarterly' | 'custom'
  >('weekly');
  const [sendTime, setSendTime] = useState('Mon 09:00');
  const [recipients, setRecipients] = useState<string>(
    'example@oss-compass.org'
  );

  return (
    <div className="border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">
          {t('os_board:manage.subscriptions.title')}
        </div>
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          disabled={snap.dashboards.length === 0}
        >
          {t('common:btn.add')}
        </Button>
      </div>

      {snap.subscriptions.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          {t('common:no_data')}
        </div>
      ) : (
        <div className="space-y-2">
          {snap.subscriptions.map((s) => (
            <div
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded border px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate font-semibold">{s.dashboardId}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {s.enabled
                    ? t('os_board:manage.subscriptions.enabled')
                    : t('os_board:manage.subscriptions.disabled')}{' '}
                  · {s.frequency} · {s.template} · {s.sendTime}
                </div>
              </div>
              <Button
                intent="text"
                size="sm"
                onClick={() => {
                  actions.upsertSubscription({
                    ...s,
                    enabled: !s.enabled,
                    recipients: [...s.recipients],
                  });
                  saveToStorage();
                }}
              >
                {s.enabled
                  ? t('os_board:manage.alerts.disable')
                  : t('os_board:manage.alerts.enable')}
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={open}
        dialogTitle={t('os_board:manage.subscriptions.create')}
        dialogContent={
          <div className="w-96 space-y-3">
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.alerts.dashboard')}
              </div>
              <select
                className="w-full rounded border px-3 py-2"
                value={dashboardId}
                onChange={(e) => setDashboardId(e.target.value)}
              >
                <option value="" disabled>
                  {t('os_board:manage.alerts.dashboard_placeholder')}
                </option>
                {snap.dashboards.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                />
                <span>{t('os_board:manage.subscriptions.enable')}</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:manage.subscriptions.frequency')}
                </div>
                <select
                  className="w-full rounded border px-3 py-2"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                >
                  <option value="daily">
                    {t('os_board:manage.subscriptions.frequencies.daily')}
                  </option>
                  <option value="weekly">
                    {t('os_board:manage.subscriptions.frequencies.weekly')}
                  </option>
                  <option value="monthly">
                    {t('os_board:manage.subscriptions.frequencies.monthly')}
                  </option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:manage.subscriptions.template')}
                </div>
                <select
                  className="w-full rounded border px-3 py-2"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as any)}
                >
                  <option value="weekly">
                    {t('os_board:manage.subscriptions.templates.weekly')}
                  </option>
                  <option value="monthly">
                    {t('os_board:manage.subscriptions.templates.monthly')}
                  </option>
                  <option value="quarterly">
                    {t('os_board:manage.subscriptions.templates.quarterly')}
                  </option>
                  <option value="custom">
                    {t('os_board:manage.subscriptions.templates.custom')}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.subscriptions.send_time')}
              </div>
              <input
                className="w-full rounded border px-3 py-2"
                value={sendTime}
                onChange={(e) => setSendTime(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:manage.subscriptions.recipients')}
              </div>
              <input
                className="w-full rounded border px-3 py-2"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
            </div>
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button intent="text" size="sm" onClick={() => setOpen(false)}>
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              disabled={!dashboardId}
              onClick={() => {
                actions.upsertSubscription({
                  dashboardId,
                  enabled,
                  frequency,
                  template,
                  sendTime,
                  recipients: recipients
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                });
                saveToStorage();
                setOpen(false);
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Manage;
