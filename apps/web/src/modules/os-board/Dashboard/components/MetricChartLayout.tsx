import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MetricCard from './MetricCard';
import ModelCard from './ModelCard';
import ContributorTable from './ContributorTable';
import type {
  OsBoardMetric,
  OsBoardDerivedMetric,
  OsBoardDashboard,
} from '../../types';

interface MetricChartLayoutProps {
  dashboard: {
    id: string;
    config: {
      projects: readonly string[];
      competitorProjects: readonly string[];
      metrics: readonly string[];
      compareMode: boolean;
    };
  };
  metrics: readonly OsBoardMetric[];
  derivedMetrics: readonly OsBoardDerivedMetric[];
}

const MetricChartLayout: React.FC<MetricChartLayoutProps> = ({
  dashboard,
  metrics,
  derivedMetrics,
}) => {
  const { t } = useTranslation();

  const selectableMetrics = useMemo(() => {
    return [...metrics, ...derivedMetrics];
  }, [metrics, derivedMetrics]);

  const metricMap = useMemo(() => {
    return new Map(selectableMetrics.map((m) => [m.id, m]));
  }, [selectableMetrics]);

  const selectedMetrics = useMemo(() => {
    return dashboard.config.metrics
      .map((id) => metricMap.get(id))
      .filter(
        (m): m is OsBoardMetric | OsBoardDerivedMetric => m !== undefined
      );
  }, [dashboard.config.metrics, metricMap]);

  if (selectedMetrics.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        {t('common:no_data')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 贡献者表格 */}
      <ContributorTable
        dashboardId={dashboard.id}
        projects={dashboard.config.projects}
      />

      {/* 模型综合评分图表 - 占满一行 */}
      <ModelCard
        dashboardId={dashboard.id}
        projects={dashboard.config.projects}
        metrics={dashboard.config.metrics}
      />

      {/* 指标图表 - 两列布局 */}
      <div className="relative grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        {selectedMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            dashboardId={dashboard.id}
            projects={dashboard.config.projects}
            competitorProjects={dashboard.config.competitorProjects}
            compareMode={dashboard.config.compareMode}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricChartLayout;
