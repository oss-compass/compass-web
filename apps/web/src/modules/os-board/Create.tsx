import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import Center from '@common/components/Layout/Center';
import { Button } from '@oss-compass/ui';
import Dialog from '@common/components/Dialog';
import { actions } from './state';
import { useCreateDashboard } from './api/dashboard';
import { MODEL_CONFIGS } from './config/modelMetrics';
import DashboardForm, {
  DashboardFormRef,
  DashboardFormValues,
} from './components/DashboardForm';

const CreateDashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const formRef = useRef<DashboardFormRef>(null);

  const [confirmCancel, setConfirmCancel] = useState(false);
  const createMutation = useCreateDashboard();

  const handleCreate = async (values: DashboardFormValues) => {
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
            dashboard_model_info_id: 0, // 后端会自动处理
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

      // 调用 API 创建看板
      const result = await createMutation.mutateAsync({
        name: values.name,
        dashboard_type: values.type,
        repo_urls: values.projects,
        competitor_urls: values.competitors,
        dashboard_models_attributes: dashboardModelsAttributes,
        dashboard_metrics_attributes: dashboardMetricsAttributes,
      });

      // 创建成功
      toast.success(t('common:toast.add_successful'));
      router.push('/os-board');
      // // 跳转到看板详情页
      // if (result?.dashboard?.id) {
      //   router.push(`/os-board/dashboard/${result.dashboard.id}`);
      // } else {
      //   // 如果后端没有返回 ID，跳转到列表页
      //   router.push('/os-board');
      // }
    } catch (error: any) {
      console.error('创建看板失败', error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          t('common:toast.add_failed')
      );

      // // 如果 API 调用失败，降级到本地存储方案
      // try {
      //   const dashboard = actions.createDashboard({
      //     name: values.name,
      //     type: values.type,
      //     config: {
      //       projects: values.projects,
      //       competitorProjects: values.competitors,
      //       metrics: values.metricIds,
      //       compareMode: values.compareMode,
      //       timeRange: { preset: '30d' },
      //     },
      //   });
      //   router.push(`/os-board/dashboard/${dashboard.id}`);
      // } catch (fallbackError) {
      //   console.error('本地创建也失败', fallbackError);
      // }
    }
  };

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href="/os-board">{t('os_board:home.title')}</Link> /
            <span className="ml-2">{t('os_board:create.title')}</span>
          </div>
          <Button
            intent="text"
            size="sm"
            onClick={() => setConfirmCancel(true)}
          >
            {t('common:btn.cancel')}
          </Button>
        </div>

        <div className="border bg-white p-6 md:p-4">
          <DashboardForm
            ref={formRef}
            mode="create"
            initialValues={{
              type: 'repo',
            }}
            onSubmit={handleCreate}
            onCancel={() => setConfirmCancel(true)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            size="sm"
            onClick={() => formRef.current?.submit()}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? t('common:btn.submitting')
              : t('common:btn.confirm')}
          </Button>
        </div>
      </Center>

      <Dialog
        open={confirmCancel}
        dialogTitle={t('os_board:create.cancel.title')}
        dialogContent={
          <div className="w-96">{t('os_board:create.cancel.body')}</div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => setConfirmCancel(false)}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                setConfirmCancel(false);
                router.push('/os-board');
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setConfirmCancel(false)}
      />
    </div>
  );
};

export default CreateDashboard;
