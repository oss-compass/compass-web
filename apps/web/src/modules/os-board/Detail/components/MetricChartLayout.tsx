import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueries } from '@tanstack/react-query';
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
  fetchMetricsByIdentifier,
  MetricData,
  ModelScoreData,
  MetricsByIdentifierResponse,
} from '../../api/dashboard';
import useOsBoardDateRange from '../../hooks/useOsBoardDateRange';
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
    identifier?: string;
    origin?: string | null;
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
  const { timeStart, timeEnd } = useOsBoardDateRange();

  // 获取所有需要查询的项目（包括竞品）
  const allProjects = useMemo(() => {
    if (dashboard.config.compareMode) {
      return [
        ...dashboard.config.projects,
        ...dashboard.config.competitorProjects,
      ];
    }
    return [...dashboard.config.projects];
  }, [
    dashboard.config.projects,
    dashboard.config.competitorProjects,
    dashboard.config.compareMode,
  ]);

  // 并行查询所有项目的指标数据
  const metricQueries = useQueries({
    queries: allProjects.map((project) => ({
      queryKey: [
        'dashboardMetrics',
        dashboard.id,
        project,
        dashboard.type,
        timeStart.toISOString(),
        timeEnd.toISOString(),
      ],
      queryFn: (): Promise<MetricsByIdentifierResponse> =>
        fetchMetricsByIdentifier({
          identifier: dashboard.identifier || dashboard.id,
          repo: project,
          level: dashboard.type,
          period: 'month', // 默认为 month，或者根据时间范围动态计算
          beginDate: timeStart.toISOString().slice(0, 10),
          endDate: timeEnd.toISOString().slice(0, 10),
        }),
      staleTime: 5 * 60 * 1000,
      enabled: !!dashboard.id && !!project,
    })),
  });

  // 将查询结果组织成 Map<Project, MetricData[]>
  const metricsDataMap = useMemo(() => {
    const map = new Map<string, MetricData[]>();
    metricQueries.forEach((result, index) => {
      const project = allProjects[index];
      if (result.data?.metrics) {
        map.set(project, result.data.metrics);
      }
    });
    return map;
  }, [metricQueries, allProjects]);

  const modelScoresDataMap = useMemo(() => {
    const map = new Map<string, ModelScoreData[]>();
    metricQueries.forEach((result, index) => {
      const project = allProjects[index];
      if (result.data?.model_scores) {
        map.set(project, result.data.model_scores);
      }
    });
    return map;
  }, [metricQueries, allProjects]);

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

  // 计算哪些模型有指标被选中（只要有任意指标就展示模型卡片）
  const completeModels = useMemo(() => {
    const complete = new Set<string>();

    displayMetrics.forEach((m) => {
      const modelId = m.dashboard_model_info_ident;

      // 其他指标（model_999）不需要模型卡片
      if (modelId === 'model_999') {
        return;
      }

      // 该模型在 modelToMetricsMap 中有定义才展示模型卡片
      const allMetricsInModel = modelToMetricsMap[modelId as ModelId];
      if (!allMetricsInModel || allMetricsInModel.length === 0) {
        return;
      }

      complete.add(modelId);
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
              dashboardType={dashboard.type}
              origin={dashboard.origin}
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
              origin={dashboard.origin}
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
              origin={dashboard.origin}
              projects={dashboard.config.projects}
              competitorProjects={dashboard.config.competitorProjects}
            />
          </div>
        );

      default:
        // 普通指标图表卡片
        const i18nKey = `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.title`;
        const name = t(i18nKey, { defaultValue: metricIdent });
        const i18nKeyDesc = `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.desc`;
        const description = t(i18nKeyDesc, { defaultValue: '' });

        return (
          <MetricCard
            key={metricIdent}
            metric={{
              id: metricIdent,
              name,
              description,
              category: modelIdent,
            }}
            dashboardId={dashboard.id}
            projects={dashboard.config.projects}
            competitorProjects={dashboard.config.competitorProjects}
            compareMode={dashboard.config.compareMode}
            metricsDataMap={metricsDataMap}
            isLoading={metricQueries.some((q) => q.isLoading)}
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
              modelScoresDataMap={modelScoresDataMap}
              isLoading={metricQueries.some((q) => q.isLoading)}
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
