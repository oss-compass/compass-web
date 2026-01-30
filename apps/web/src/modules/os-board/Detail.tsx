import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { Button } from '@oss-compass/ui';
import {
  actions,
  evaluateDashboardAlerts,
  loadFromStorage,
  saveToStorage,
} from './state';
import { osBoardState } from './state';
import type { OsBoardTimeRangePreset } from './types';
import DetailNav from './components/DetailNav';
import MetricChartLayout from './components/MetricChartLayout';
import MetricSidebar from './components/MetricSidebar';
import AlertManageDialog from './components/AlertManageDialog';
import UserManageDialog from './components/UserManageDialog';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import ExportDialog from './components/ExportDialog';
import EditDashboardModal from './components/EditDashboardModal';
import ProjectList from './components/ProjectList';
import { DashboardFormValues } from './components/DashboardForm';

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

  const handleDelete = () => {
    actions.deleteDashboard(dashboard.id);
    saveToStorage();
    setConfirmDelete(false);
    router.push('/os-board');
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

      <div className="relative flex flex-1 bg-[#f9f9f9]">
        {/* 左侧指标侧边栏 */}
        <MetricSidebar
          metrics={snap.metrics as any}
          derivedMetrics={snap.derivedMetrics as any}
          selectedMetricIds={dashboard.config.metrics}
        />

        {/* 主内容区 */}
        <div className="min-w-0 flex-1 px-8 py-6 md:px-4">
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
      </div>

      <DeleteConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />

      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        dashboardId={dashboard.id}
        dashboardName={dashboard.name}
      />

      <EditDashboardModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialValues={{
          name: dashboard.name,
          type: dashboard.type,
          projects: [...dashboard.config.projects],
          competitors: [...dashboard.config.competitorProjects],
          compareMode: dashboard.config.compareMode,
          metricIds: [...dashboard.config.metrics],
        }}
      />

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
