import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import { Button, Modal } from '@oss-compass/ui';
import {
  actions,
  buildReportText,
  evaluateDashboardAlerts,
  loadFromStorage,
  saveToStorage,
} from './state';
import { osBoardState } from './state';
import type { OsBoardExportFormat, OsBoardTimeRangePreset } from './types';
import DetailNav from './components/DetailNav';
import MetricChartLayout from './components/MetricChartLayout';
import AlertManageDialog from './components/AlertManageDialog';
import UserManageDialog from './components/UserManageDialog';
import DashboardForm, { DashboardFormValues } from './components/DashboardForm';
import ProjectList from './components/ProjectList';

const Detail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const snap = useSnapshot(osBoardState);
  const dashboardId = String(router.query.id || '');

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [alertManageOpen, setAlertManageOpen] = useState(false);
  const [userManageOpen, setUserManageOpen] = useState(false);

  const editFormRef = React.useRef<{ submit: () => void }>(null);

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
    setEditOpen(true);
  };

  const handleEditSubmit = (values: DashboardFormValues) => {
    actions.updateDashboard(dashboard.id, {
      name: values.name,
      config: {
        ...dashboard.config,
        compareMode: values.compareMode,
        projects: values.projects,
        competitorProjects: values.competitors,
        metrics: values.metricIds,
      },
    });
    saveToStorage();
    setEditOpen(false);
  };

  const handleAlertManage = () => {
    setAlertManageOpen(true);
  };

  const handleCopy = () => {
    const copy = actions.copyDashboard(dashboard.id);
    saveToStorage();
    if (copy) router.push(`/os-board/dashboard/${copy.id}`);
  };

  const handleTimeRangeChange = (
    preset: OsBoardTimeRangePreset,
    start?: string,
    end?: string
  ) => {
    actions.updateDashboard(dashboard.id, {
      config: {
        ...dashboard.config,
        timeRange: {
          preset,
          start,
          end,
        },
      },
    });
    saveToStorage();
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <DetailNav
        dashboard={dashboard}
        onEdit={handleEdit}
        onAlertManage={handleAlertManage}
        onUserManage={() => setUserManageOpen(true)}
        onDelete={() => setConfirmDelete(true)}
        onTimeRangeChange={handleTimeRangeChange}
      />

      <div className="relative flex-1 bg-[#f9f9f9] px-8 py-6 md:px-4">
        <ProjectList
          projects={dashboard.config.projects}
          competitorProjects={dashboard.config.competitorProjects}
          compareMode={dashboard.config.compareMode}
        />
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

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <div className="relative h-[80vh] w-[80vw] border-2 border-black bg-white shadow outline-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-8 pb-4 pt-8">
              <h2 className="text-2xl font-medium">
                {t('os_board:detail.edit')}
              </h2>
              <div
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => setEditOpen(false)}
              >
                <GrClose />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <DashboardForm
                ref={editFormRef}
                mode="edit"
                initialValues={{
                  name: dashboard.name,
                  type: dashboard.type,
                  projects: [...dashboard.config.projects],
                  competitors: [...dashboard.config.competitorProjects],
                  compareMode: dashboard.config.compareMode,
                  metricIds: [...dashboard.config.metrics],
                }}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditOpen(false)}
              />
            </div>
            <div className="flex justify-end border-t px-8 py-4">
              <Button
                intent="text"
                size="sm"
                onClick={() => setEditOpen(false)}
              >
                {t('common:btn.cancel')}
              </Button>
              <Button
                intent="primary"
                size="sm"
                className="ml-4"
                onClick={() => {
                  editFormRef.current?.submit();
                }}
              >
                {t('common:btn.save')}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <AlertManageDialog
        open={alertManageOpen}
        onClose={() => setAlertManageOpen(false)}
        dashboardId={dashboard.id}
      />

      <UserManageDialog
        open={userManageOpen}
        onClose={() => setUserManageOpen(false)}
        dashboardId={dashboard.id}
      />
    </div>
  );
};

export default Detail;
