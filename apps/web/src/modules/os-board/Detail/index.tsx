import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { toast } from 'react-hot-toast';
import { Button } from '@oss-compass/ui';
import { osBoardState } from '../state';
import { useDashboardByIdentifier, useUpdateDashboard } from '../api/dashboard';
import { MODEL_CONFIGS } from '../config/modelMetrics';
import {
  DashboardContextProvider,
  DashboardStatus,
  DashboardContextValue,
} from '../context';
import DetailNav from './components/DetailNav';
import MetricChartLayout from './components/MetricChartLayout';
import MetricSidebar from './components/MetricSidebar';
import AlertManageDialog from './components/AlertManageDialog';
import UserManageDialog from './components/UserManageDialog';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import ExportDialog from './components/ExportDialog';
import EditDashboardModal from '../components/EditDashboardModal';
import DetailSkeleton from './components/DetailSkeleton';
import DetailNotFound from './components/DetailNotFound';
import DetailNoPermission from './components/DetailNoPermission';
import { DashboardFormValues } from '../components/DashboardForm';

/**
 * 详情页内容组件 - 在看板数据加载成功后渲染
 */
const DetailContent: React.FC<{
  dashboard: NonNullable<DashboardContextValue['dashboard']>;
  refetch: () => void;
}> = ({ dashboard, refetch }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const snap = useSnapshot(osBoardState);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [alertManageOpen, setAlertManageOpen] = useState(false);
  const [userManageOpen, setUserManageOpen] = useState(false);

  const updateMutation = useUpdateDashboard();

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleEditSubmit = async (values: DashboardFormValues) => {
    try {
      // 构建模型属性数组
      const dashboardModelsAttributes = (values.selectedModels || []).map(
        (modelIdent) => {
          const modelConfig = MODEL_CONFIGS.find((m) => m.id === modelIdent);
          return {
            name: modelConfig?.id || modelIdent,
            description: modelConfig?.i18nKey
              ? t(modelConfig.i18nKey)
              : modelIdent,
            dashboard_model_info_id: 0,
            dashboard_model_info_ident: modelIdent,
          };
        }
      );

      // 构建指标属性数组
      const dashboardMetricsAttributes = values.metricIds.map(
        (metricIdent, index) => {
          // 从映射表中获取指标所属的模型 ident
          const modelInfoIdent =
            values.metricToModelMap?.[metricIdent] || 'model_999';

          // 判断指标是否来自模型（不是 model_999 就是来自模型）
          const fromModel = modelInfoIdent !== 'model_999';

          // 检查指标是否被隐藏
          const isHidden = (values.hiddenMetricIds || []).includes(metricIdent);

          return {
            name: metricIdent,
            dashboard_metric_info_ident: metricIdent,
            dashboard_model_info_ident: modelInfoIdent,
            from_model: fromModel,
            hidden: isHidden,
            sort: index,
          };
        }
      );

      // 调用 API 更新看板
      await updateMutation.mutateAsync({
        id: String(dashboard.id),
        name: values.name,
        dashboard_type: values.type,
        repo_urls: values.projects,
        competitor_urls: values.competitors,
        dashboard_models_attributes: dashboardModelsAttributes,
        dashboard_metrics_attributes: dashboardMetricsAttributes,
      });

      // 更新成功
      toast.success(t('common:toast.modification_successful'));
      setEditOpen(false);
      refetch();
    } catch (error: any) {
      console.error('更新看板失败', error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          t('common:toast.modification_failed')
      );
    }
  };

  const handleAlertManage = () => {
    setAlertManageOpen(true);
  };

  const handleDelete = () => {
    // TODO: 调用删除 API
    setConfirmDelete(false);
    router.push('/os-board');
  };

  // 解析 repo_urls
  const parseUrls = (urls: string | string[] | undefined): string[] => {
    if (!urls) return [];
    if (Array.isArray(urls)) return urls;
    try {
      return JSON.parse(urls);
    } catch {
      return [];
    }
  };

  // 获取指标列表（从后端数据）
  const getMetricIds = (): string[] => {
    if (dashboard.dashboard_metrics && dashboard.dashboard_metrics.length > 0) {
      return dashboard.dashboard_metrics
        .filter((m) => !m.hidden)
        .sort((a, b) => a.sort - b.sort)
        .map((m) => m.dashboard_metric_info_ident);
    }
    return dashboard.config?.metrics || [];
  };

  // 构建兼容的 dashboard 对象给子组件使用
  const compatibleDashboard = {
    ...dashboard,
    id: String(dashboard.id),
    type: dashboard.dashboard_type || dashboard.type || 'repo',
    config: dashboard.config || {
      projects: parseUrls(dashboard.repo_urls),
      competitorProjects: parseUrls(dashboard.competitor_urls),
      metrics: getMetricIds(),
      compareMode: false,
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <DetailNav
        dashboard={compatibleDashboard as any}
        onEdit={handleEdit}
        onAlertManage={handleAlertManage}
        onUserManage={() => setUserManageOpen(true)}
        onDelete={() => setConfirmDelete(true)}
      />

      <div className="relative flex flex-1 bg-[#f9f9f9]">
        {/* 左侧指标侧边栏 */}
        <MetricSidebar dashboardMetrics={dashboard.dashboard_metrics} />

        {/* 主内容区 */}
        <div className="min-w-0 flex-1 px-8 py-6 md:px-4">
          <MetricChartLayout
            dashboard={{
              ...compatibleDashboard,
              dashboard_metrics: dashboard.dashboard_metrics,
            }}
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
        dashboardId={String(dashboard.id)}
        dashboardName={dashboard.name}
      />

      <EditDashboardModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialValues={{
          name: dashboard.name,
          type: (dashboard.dashboard_type || dashboard.type || 'repo') as any,
          projects: parseUrls(dashboard.repo_urls),
          competitors: parseUrls(dashboard.competitor_urls),
          compareMode: false,
          metricIds: getMetricIds(),
        }}
      />

      <AlertManageDialog
        open={alertManageOpen}
        onClose={() => setAlertManageOpen(false)}
        dashboardId={String(dashboard.id)}
      />

      <UserManageDialog
        open={userManageOpen}
        onClose={() => setUserManageOpen(false)}
        dashboardId={String(dashboard.id)}
      />
    </div>
  );
};

/**
 * 详情页主组件
 */
const Detail = () => {
  const router = useRouter();
  const identifier = router.query.id as string | undefined;

  // 调用 API 获取看板数据
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboardByIdentifier(identifier);

  // 计算状态
  const getStatus = (): DashboardStatus => {
    if (isLoading) return 'loading';
    if (isError) {
      // 根据错误类型判断是 404 还是 403
      const status = (error as any)?.response?.status;
      if (status === 404) return 'not_found';
      if (status === 403) return 'no_permission';
      return 'error';
    }
    if (!dashboard) return 'not_found';
    return 'success';
  };

  const status = getStatus();

  // 构建 Context 值
  const contextValue: DashboardContextValue = {
    dashboard: dashboard || null,
    isLoading,
    status,
    hasPermission: status !== 'no_permission',
    notFound: status === 'not_found',
    error: isError ? (error as Error) : null,
    refetch,
  };

  // 根据状态渲染不同内容
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <DetailSkeleton />;
      case 'not_found':
        return <DetailNotFound />;
      case 'no_permission':
        return <DetailNoPermission />;
      case 'error':
        return <DetailNotFound />;
      case 'success':
        if (dashboard) {
          return <DetailContent dashboard={dashboard} refetch={refetch} />;
        }
        return <DetailNotFound />;
      default:
        return <DetailSkeleton />;
    }
  };

  return (
    <DashboardContextProvider value={contextValue}>
      {renderContent()}
    </DashboardContextProvider>
  );
};

export default Detail;
