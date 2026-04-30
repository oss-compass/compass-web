import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import type { OsBoardDashboardMetric } from '../../types';
import type { MetricData, ModelScoreData } from '../../api/dashboard';
import {
  dimensionalityToModelsMap,
  type DimensionalityId,
} from '../../config/dimensionalityModelMap';

const SUPPLY_CHAIN_DIMENSIONS: DimensionalityId[] = [
  'dimensionality_009',
  'dimensionality_010',
  'dimensionality_011',
];

interface SupplyChainViewProps {
  project: string;
  metricsDataMap: Map<string, MetricData[]>;
  modelScoresDataMap: Map<string, ModelScoreData[]>;
  supplyChainMetrics: OsBoardDashboardMetric[];
  isLoading: boolean;
}

interface MetricDisplayItem {
  metricIdent: string;
  modelIdent: string;
  name: string;
  description: string;
  value: number | null;
  unit: string;
}

interface ModelDisplayGroup {
  modelIdent: string;
  modelName: string;
  modelScore: number | null;
  metrics: MetricDisplayItem[];
}

const getLatestValue = (
  data:
    | { date: string; value: number; extra?: Record<string, any> }[]
    | undefined
): { value: number | null; unit: string } => {
  if (!data || data.length === 0) return { value: null, unit: '' };
  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latest = sorted[sorted.length - 1];
  return { value: latest.value, unit: latest.extra?.unit || '' };
};

const SupplyChainView: React.FC<SupplyChainViewProps> = ({
  project,
  metricsDataMap,
  modelScoresDataMap,
  supplyChainMetrics,
  isLoading,
}) => {
  const { t } = useTranslation();

  const modelGroups = useMemo((): ModelDisplayGroup[] => {
    const groups: ModelDisplayGroup[] = [];

    SUPPLY_CHAIN_DIMENSIONS.forEach((dimId) => {
      const modelIds = dimensionalityToModelsMap[dimId] || [];

      modelIds.forEach((modelIdent) => {
        const projectMetrics = metricsDataMap.get(project) || [];
        const projectModelScores = modelScoresDataMap.get(project) || [];

        const modelScoreData = projectModelScores.find(
          (m) => m.ident === modelIdent
        );
        const { value: modelScore } = getLatestValue(modelScoreData?.data);

        const modelName = t(`metrics_models_v2:${modelIdent}.title`, {
          defaultValue: modelIdent,
        });

        const metricsInModel = supplyChainMetrics.filter(
          (m) => m.dashboard_model_info_ident === modelIdent
        );

        const metricItems: MetricDisplayItem[] = metricsInModel.map((m) => {
          const metricIdent = m.dashboard_metric_info_ident;
          const metricData = projectMetrics.find(
            (md) => md.ident === metricIdent
          );
          const { value, unit } = getLatestValue(metricData?.data);

          const name = t(
            `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.title`,
            { defaultValue: m.name || metricIdent }
          );
          const description = t(
            `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.desc`,
            { defaultValue: '' }
          );

          return {
            metricIdent,
            modelIdent,
            name,
            description,
            value,
            unit,
          };
        });

        if (metricItems.length > 0) {
          groups.push({
            modelIdent,
            modelName,
            modelScore,
            metrics: metricItems,
          });
        }
      });
    });

    return groups;
  }, [project, metricsDataMap, modelScoresDataMap, supplyChainMetrics, t]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-48 rounded bg-slate-200"></div>
            <div className="h-2 w-full rounded bg-slate-200"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded bg-slate-200"></div>
              <div className="h-24 rounded bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (modelGroups.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        {t('common:no_data')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {modelGroups.map((group) => {
        const scoreDisplay =
          group.modelScore != null ? Math.round(group.modelScore * 100) : null;

        // 模型得分颜色逻辑：>=80 绿色, 40-80 橙色, <40 红色
        const getModelScoreColor = (score: number) => {
          if (score >= 80) return '#4ade80';
          if (score >= 40) return '#f8961e';
          return '##ff4d4f';
        };

        // 指标得分颜色逻辑：>=8 绿色, 4-7 橙色, <4 红色
        const getMetricScoreColor = (score: number) => {
          if (score >= 8) return 'text-green-500';
          if (score >= 4) return 'text-orange-500';
          return 'text-red-500';
        };

        const getMetricBgColor = (score: number) => {
          if (score >= 8) return 'bg-green-50';
          if (score >= 4) return 'bg-orange-50';
          return 'bg-red-50';
        };

        return (
          <div
            key={group.modelIdent}
            id={`metric_card_${group.modelIdent}`}
            className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none"
          >
            <h3 className="mb-2 text-lg font-semibold text-[#000000]">
              <span className="mr-2 rounded bg-[#F5F0FF] px-2 py-0.5 text-xs font-normal text-[#722ED1]">
                {t('os_board:detail.model_tag')}
              </span>
              {group.modelName}
            </h3>
            {scoreDisplay != null && (
              <div className="mb-5 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-[#e5e5e5]">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(scoreDisplay, 100)}%`,
                      backgroundColor: getModelScoreColor(scoreDisplay),
                    }}
                  />
                </div>
                <span
                  className="min-w-[40px] text-base font-semibold"
                  style={{ color: getModelScoreColor(scoreDisplay) }}
                >
                  {scoreDisplay}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {group.metrics.map((metric) => {
                const isDeveloping = metric.value === -1;

                return (
                  <div
                    key={metric.metricIdent}
                    id={`metric_card_${metric.metricIdent}`}
                    className="rounded-lg border border-gray-100 bg-white p-4 drop-shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={classnames(
                          'flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg',
                          isDeveloping
                            ? 'bg-gray-50'
                            : getMetricBgColor(metric.value || 0)
                        )}
                      >
                        {isDeveloping ? (
                          <Tooltip title="功能开发中，敬请期待">
                            <ClockCircleOutlined className="text-xl text-gray-400" />
                          </Tooltip>
                        ) : metric.value != null ? (
                          <span
                            className={classnames(
                              'text-lg font-bold',
                              getMetricScoreColor(metric.value)
                            )}
                          >
                            {Number.isInteger(metric.value)
                              ? metric.value
                              : metric.value.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#000000]">
                          {metric.name}
                        </div>
                        {metric.description && (
                          <div
                            className="mt-1 line-clamp-2 text-xs leading-5 text-[#585858]"
                            title={metric.description}
                          >
                            {metric.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupplyChainView;
