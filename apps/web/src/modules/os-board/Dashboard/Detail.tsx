import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import {
  actions,
  buildReportText,
  evaluateDashboardAlerts,
  loadFromStorage,
  saveToStorage,
} from '../state';
import { osBoardState } from '../state';
import type { OsBoardExportFormat } from '../types';
import ProjectInput from './components/ProjectInput';
import DetailNav from './components/DetailNav';
import MetricChartLayout from './components/MetricChartLayout';
import AlertManageDialog from './components/AlertManageDialog';

const LoadingUi = () => (
  <div className="rounded-lg bg-white px-6 py-6 drop-shadow-sm">
    <div className="flex-1 animate-pulse space-y-4">
      <div className="h-6 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-6 rounded bg-slate-200"></div>
        <div className="col-span-1 h-6 rounded bg-slate-200"></div>
      </div>
      <div className="h-6 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-6 rounded bg-slate-200"></div>
        <div className="col-span-2 h-6 rounded bg-slate-200"></div>
      </div>
      <div className="h-6 rounded bg-slate-200"></div>
    </div>
  </div>
);

const Detail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const snap = useSnapshot(osBoardState);
  const dashboardId = String(router.query.id || '');

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [alertManageOpen, setAlertManageOpen] = useState(false);

  const [editName, setEditName] = useState('');
  const [editCompare, setEditCompare] = useState(false);
  const [editPreset, setEditPreset] = useState<'7d' | '30d' | '90d' | '1y'>(
    '30d'
  );
  const [editProjects, setEditProjects] = useState<string[]>([]);
  const [editCompetitors, setEditCompetitors] = useState<string[]>([]);
  const [editMetricIds, setEditMetricIds] = useState<string[]>([]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);

  useEffect(() => {
    if (!dashboard) return;
    evaluateDashboardAlerts(dashboard.id);
    saveToStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard?.id]);

  const selectableMetrics = useMemo(() => {
    return [...snap.metrics, ...snap.derivedMetrics];
  }, [snap.metrics, snap.derivedMetrics]);

  if (!dashboard) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
        <div className="flex flex-1 items-center justify-center">
          <div className="rounded-lg border bg-white p-6 text-center">
            <div className="text-gray-500">
              {t('os_board:detail.not_found')}
            </div>
            <div className="mt-4">
              <Button
                size="sm"
                onClick={() => {
                  router.push('/os-board');
                }}
              >
                {t('common:btn.back')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const doExport = (format: OsBoardExportFormat) => {
    const res = actions.exportDashboardSnapshot(dashboard.id, format);
    if (!res.ok) return;
    const filename =
      format === 'json'
        ? `${dashboard.name}.json`
        : format === 'csv'
        ? `${dashboard.name}.csv`
        : `${dashboard.name}.txt`;
    const blob = new Blob([res.payload], {
      type:
        format === 'json'
          ? 'application/json;charset=utf-8'
          : format === 'csv'
          ? 'text/csv;charset=utf-8'
          : 'text/plain;charset=utf-8',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    saveToStorage();
  };

  const downloadText = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    setEditName(dashboard.name);
    setEditCompare(dashboard.config.compareMode);
    setEditPreset(dashboard.config.timeRange.preset as any);
    setEditProjects([...dashboard.config.projects]);
    setEditCompetitors([...dashboard.config.competitorProjects]);
    setEditMetricIds([...dashboard.config.metrics]);
    setEditOpen(true);
  };

  const handleAlertManage = () => {
    setAlertManageOpen(true);
  };

  const handleCopy = () => {
    const copy = actions.copyDashboard(dashboard.id);
    saveToStorage();
    if (copy) router.push(`/os-board/dashboard/${copy.id}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <DetailNav
        dashboard={dashboard}
        onEdit={handleEdit}
        onAlertManage={handleAlertManage}
        onExport={() => setExportOpen(true)}
        onCopy={handleCopy}
        onDelete={() => setConfirmDelete(true)}
      />

      <div className="relative flex-1 bg-[#f9f9f9] px-8 py-6 md:px-4">
        <MetricChartLayout
          dashboard={dashboard}
          metrics={snap.metrics as any}
          derivedMetrics={snap.derivedMetrics as any}
        />
      </div>

      <Dialog
        open={confirmDelete}
        dialogTitle={t('os_board:detail.delete.title')}
        dialogContent={
          <div className="w-96">{t('os_board:detail.delete.body')}</div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => setConfirmDelete(false)}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                actions.deleteDashboard(dashboard.id);
                saveToStorage();
                setConfirmDelete(false);
                router.push('/os-board');
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setConfirmDelete(false)}
      />

      <Dialog
        open={exportOpen}
        dialogTitle={t('os_board:detail.export_title')}
        dialogContent={
          <div className="w-96">
            <div className="mb-2 text-sm text-gray-600">
              {t('os_board:detail.export.help')}
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => doExport('json')}>
                JSON
              </Button>
              <Button size="sm" onClick={() => doExport('csv')}>
                CSV
              </Button>
              <Button size="sm" intent="text" onClick={() => doExport('pdf')}>
                {t('os_board:detail.export.print')}
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              {t('os_board:detail.report')}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => {
                  const text = buildReportText({
                    dashboardId: dashboard.id,
                    template: 'weekly',
                  });
                  if (!text) return;
                  downloadText(`${dashboard.name}-weekly-report.txt`, text);
                }}
              >
                {t('os_board:detail.report_weekly')}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const text = buildReportText({
                    dashboardId: dashboard.id,
                    template: 'monthly',
                  });
                  if (!text) return;
                  downloadText(`${dashboard.name}-monthly-report.txt`, text);
                }}
              >
                {t('os_board:detail.report_monthly')}
              </Button>
            </div>
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => setExportOpen(false)}
            >
              {t('common:btn.close')}
            </Button>
          </div>
        }
        handleClose={() => setExportOpen(false)}
      />

      <Dialog
        open={editOpen}
        dialogTitle={t('os_board:detail.edit')}
        dialogContent={
          <div className="w-[640px] space-y-4 md:w-[360px]">
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:create.basic.name')}
              </div>
              <input
                className="w-full rounded border px-3 py-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:create.basic.time_range')}
                </div>
                <select
                  className="w-full rounded border px-3 py-2"
                  value={editPreset}
                  onChange={(e) => setEditPreset(e.target.value as any)}
                >
                  <option value="7d">{t('os_board:time.7d')}</option>
                  <option value="30d">{t('os_board:time.30d')}</option>
                  <option value="90d">{t('os_board:time.90d')}</option>
                  <option value="1y">{t('os_board:time.1y')}</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:create.basic.compare')}
                </div>
                <label className="flex cursor-pointer items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    checked={editCompare}
                    onChange={(e) => setEditCompare(e.target.checked)}
                  />
                  <span>{t('os_board:create.basic.compare_help')}</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:create.scope.projects')}
                </div>
                <ProjectInput
                  values={editProjects}
                  onChange={setEditProjects}
                  placeholder={t('os_board:create.scope.projects_placeholder')}
                />
              </div>
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  {t('os_board:create.scope.competitors')}
                </div>
                <ProjectInput
                  values={editCompetitors}
                  onChange={setEditCompetitors}
                  placeholder={t(
                    'os_board:create.scope.competitors_placeholder'
                  )}
                  disabled={!editCompare}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">
                {t('os_board:create.metrics.selected')}
              </div>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
                {selectableMetrics.map((m) => {
                  const selected = editMetricIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={
                        selected
                          ? 'rounded border border-blue-600 bg-blue-50 px-2 py-2 text-left text-xs'
                          : 'rounded border bg-white px-2 py-2 text-left text-xs'
                      }
                      onClick={() => {
                        if (selected) {
                          setEditMetricIds(
                            editMetricIds.filter((x) => x !== m.id)
                          );
                          return;
                        }
                        setEditMetricIds([...editMetricIds, m.id]);
                      }}
                    >
                      <div className="truncate font-semibold">{m.name}</div>
                      <div className="truncate text-[10px] text-gray-500">
                        {m.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button intent="text" size="sm" onClick={() => setEditOpen(false)}>
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              disabled={
                editName.trim().length === 0 ||
                editProjects.length === 0 ||
                editMetricIds.length === 0
              }
              onClick={() => {
                actions.updateDashboard(dashboard.id, {
                  name: editName.trim(),
                  config: {
                    ...dashboard.config,
                    compareMode: editCompare,
                    projects: editProjects,
                    competitorProjects: editCompare ? editCompetitors : [],
                    metrics: editMetricIds,
                    timeRange: { preset: editPreset },
                  },
                });
                saveToStorage();
                setEditOpen(false);
              }}
            >
              {t('common:btn.save')}
            </Button>
          </div>
        }
        handleClose={() => setEditOpen(false)}
      />

      <AlertManageDialog
        open={alertManageOpen}
        onClose={() => setAlertManageOpen(false)}
        dashboardId={dashboard.id}
      />
    </div>
  );
};

export default Detail;
