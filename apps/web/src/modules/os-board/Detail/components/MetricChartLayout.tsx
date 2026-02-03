import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MetricCard from './MetricCard';
import ModelCard from './ModelCard';
import ContributorTable from './ContributorTable';
import IssueTable from './IssueTable';
import PrTable from './PrTable';
import type {
  OsBoardMetric,
  OsBoardDerivedMetric,
  OsBoardDashboardMetric,
} from '../../types';
import {
  modelToMetricsMap,
  type ModelId,
} from '../../config/dimensionalityModelMap';

// 特殊指标 ID 映射（表格类型）
const SPECIAL_METRICS = {
  CONTRIBUTOR: 'metric_062', // 贡献者统计
  ISSUE: 'metric_063', // Issue 管理
  PR: 'metric_064', // PR 管理
} as const;

interface MetricChartLayoutProps {
  dashboard: {
    id: string;
    type: 'repo' | 'community';
    dashboard_metrics?: OsBoardDashboardMetric[];
    config: {
      projects: readonly string[];
      competitorProjects: readonly string[];
      metrics: readonly string[];
      compareMode: boolean;
    };
  };
  metrics?: readonly OsBoardMetric[];
  derivedMetrics?: readonly OsBoardDerivedMetric[];
}

const MetricChartLayout: React.FC<MetricChartLayoutProps> = ({
  dashboard,
  metrics = [],
  derivedMetrics = [],
}) => {
  const { t } = useTranslation();

  // 从 dashboard_metrics 获取指标列表
  const displayMetrics = useMemo(() => {
    if (dashboard.dashboard_metrics && dashboard.dashboard_metrics.length > 0) {
      return dashboard.dashboard_metrics
        .filter((m) => !m.hidden)
        .sort((a, b) => a.sort - b.sort);
    }
    // 兼容旧方式
    return dashboard.config.metrics.map((id, index) => ({
      dashboard_metric_info_ident: id,
      dashboard_model_info_ident: 'model_999',
      sort: index,
      hidden: false,
      from_model: false,
    })) as OsBoardDashboardMetric[];
  }, [dashboard.dashboard_metrics, dashboard.config.metrics]);

  // 计算哪些模型的所有指标都被选中了
  const completeModels = useMemo(() => {
    // 获取当前选中的所有指标 ID
    const selectedMetricIds = new Set(
      displayMetrics.map((m) => m.dashboard_metric_info_ident)
    );

    // 按模型分组当前选中的指标
    const metricsByModel = new Map<string, string[]>();
    displayMetrics.forEach((m) => {
      const modelId = m.dashboard_model_info_ident;
      if (!metricsByModel.has(modelId)) {
        metricsByModel.set(modelId, []);
      }
      metricsByModel.get(modelId)!.push(m.dashboard_metric_info_ident);
    });

    // 检查每个模型是否所有指标都被选中
    const complete = new Set<string>();
    metricsByModel.forEach((_, modelId) => {
      // 其他指标（model_999）不需要模型卡片
      if (modelId === 'model_999') {
        return;
      }

      // 获取该模型下应有的所有指标
      const allMetricsInModel = modelToMetricsMap[modelId as ModelId];
      if (!allMetricsInModel || allMetricsInModel.length === 0) {
        return;
      }

      // 检查是否所有指标都在选中列表中
      const allSelected = allMetricsInModel.every((metricId) =>
        selectedMetricIds.has(metricId)
      );

      if (allSelected) {
        complete.add(modelId);
      }
    });

    return complete;
  }, [displayMetrics]);

  // 如果没有任何指标，显示暂无数据
  if (displayMetrics.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        {t('common:no_data')}
      </div>
    );
  }

  // 渲染单个指标组件
  const renderMetricItem = (metric: OsBoardDashboardMetric) => {
    const metricIdent = metric.dashboard_metric_info_ident;
    const modelIdent = metric.dashboard_model_info_ident;

    // 根据指标类型渲染不同组件
    switch (metricIdent) {
      case SPECIAL_METRICS.CONTRIBUTOR:
        return (
          <div
            key={metricIdent}
            id={`metric_card_${metricIdent}`}
            className="col-span-2 md:col-span-1"
          >
            <ContributorTable
              dashboardId={dashboard.id}
              projects={dashboard.config.projects}
              competitorProjects={dashboard.config.competitorProjects}
            />
          </div>
        );

      case SPECIAL_METRICS.ISSUE:
        return (
          <div
            key={metricIdent}
            id={`metric_card_${metricIdent}`}
            className="col-span-2 md:col-span-1"
          >
            <IssueTable
              dashboardId={dashboard.id}
              dashboardType={dashboard.type}
              projects={dashboard.config.projects}
              competitorProjects={dashboard.config.competitorProjects}
            />
          </div>
        );

      case SPECIAL_METRICS.PR:
        return (
          <div
            key={metricIdent}
            id={`metric_card_${metricIdent}`}
            className="col-span-2 md:col-span-1"
          >
            <PrTable
              dashboardId={dashboard.id}
              dashboardType={dashboard.type}
              projects={dashboard.config.projects}
              competitorProjects={dashboard.config.competitorProjects}
            />
          </div>
        );

      default:
        // 普通指标图表卡片
        const i18nKey = `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.title`;
        const name = t(i18nKey, { defaultValue: metricIdent });

        return (
          <MetricCard
            key={metricIdent}
            metric={{
              id: metricIdent,
              name,
              category: modelIdent,
            }}
            dashboardId={dashboard.id}
            projects={dashboard.config.projects}
            competitorProjects={dashboard.config.competitorProjects}
            compareMode={dashboard.config.compareMode}
          />
        );
    }
  };

  // 渲染指标列表，包含模型得分卡片
  const renderMetricsWithModelCards = () => {
    const elements: React.ReactNode[] = [];
    const renderedModels = new Set<string>();

    displayMetrics.forEach((metric) => {
      const modelIdent = metric.dashboard_model_info_ident;

      // 如果该模型的所有指标都被选中，且还未渲染过该模型的 ModelCard
      if (completeModels.has(modelIdent) && !renderedModels.has(modelIdent)) {
        renderedModels.add(modelIdent);

        // 获取该模型下的所有指标 ID
        const modelMetrics = modelToMetricsMap[modelIdent as ModelId] || [];

        // 渲染 ModelCard
        elements.push(
          <div
            key={`model_card_${modelIdent}`}
            id={`metric_card_${modelIdent}`}
            className="col-span-2 md:col-span-1"
          >
            <ModelCard
              modelId={modelIdent}
              dashboardId={dashboard.id}
              projects={[...dashboard.config.projects]}
              metrics={modelMetrics}
            />
          </div>
        );
      }

      // 渲染指标卡片
      elements.push(renderMetricItem(metric));
    });

    return elements;
  };

  return (
    <div className="relative grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
      {renderMetricsWithModelCards()}
    </div>
  );
};

export default MetricChartLayout;
