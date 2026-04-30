import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { useModelMetricList } from '../../api/dashboard';
import type { DashboardMetricInfo } from '../../api/dashboard';
import {
  dimensionalityToModelsMap,
  allDimensionalityIds,
  allL1DimensionalityIds,
  l1ToL2Map,
  type L1DimensionalityId,
} from '../../config/dimensionalityModelMap';

interface ModelCardData {
  modelIdent: string;
  name: string;
  description: string;
  metrics: DashboardMetricInfo[];
}

interface SelectedModelListProps {
  selectedModelIds: string[];
  onDelete: (modelId: string) => void;
}

const SelectedModelList: React.FC<SelectedModelListProps> = ({
  selectedModelIds,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set());
  const [expandedL1, setExpandedL1] = useState<Set<L1DimensionalityId>>(
    new Set(allL1DimensionalityIds)
  );

  const { data } = useModelMetricList();

  const modelDataMap = useMemo(() => {
    const map: Record<string, ModelCardData> = {};

    if (data?.independent_metrics && data.independent_metrics.length > 0) {
      const i18nTitle = t('metrics_models_v2:model_999.title', '独立指标');
      const i18nDesc = t('metrics_models_v2:model_999.desc', '');
      map['model_999'] = {
        modelIdent: 'model_999',
        name: i18nTitle,
        description: i18nDesc,
        metrics: data.independent_metrics,
      };
    }

    if (data?.models) {
      data.models.forEach((model) => {
        if (model.dashboard_metric_infos.length > 0) {
          const modelIdent = model.ident;
          const i18nTitle = t(
            `metrics_models_v2:${modelIdent}.title`,
            model.name
          );
          const i18nDesc = t(
            `metrics_models_v2:${modelIdent}.desc`,
            model.description
          );
          map[modelIdent] = {
            modelIdent,
            name: i18nTitle,
            description: i18nDesc,
            metrics: model.dashboard_metric_infos,
          };
        }
      });
    }

    return map;
  }, [data, t]);

  const l2Groups = useMemo(() => {
    return allDimensionalityIds
      .map((dimId) => {
        const dimTitle = t(`metrics_models_v2:${dimId}.title`, dimId);
        const configuredModelIds = dimensionalityToModelsMap[dimId] || [];

        const selectedModels = configuredModelIds
          .filter((modelId) => selectedModelIds.includes(modelId))
          .map((modelId) => modelDataMap[modelId])
          .filter(Boolean);

        return {
          id: dimId,
          title: dimTitle,
          models: selectedModels,
        };
      })
      .filter((group) => group.models.length > 0);
  }, [modelDataMap, t, selectedModelIds]);

  const l1Groups = useMemo(() => {
    return allL1DimensionalityIds
      .map((l1Id) => {
        const l1Title = t(`metrics_models_v2:${l1Id}.title`, l1Id);
        const l2Ids = l1ToL2Map[l1Id] || [];

        const children = l2Ids
          .map((l2Id) => l2Groups.find((g) => g.id === l2Id))
          .filter(Boolean) as typeof l2Groups;

        if (children.length === 0) return null;

        return {
          id: l1Id,
          title: l1Title,
          children,
        };
      })
      .filter(Boolean) as Array<{
      id: L1DimensionalityId;
      title: string;
      children: typeof l2Groups;
    }>;
  }, [l2Groups, t]);

  const toggleL1 = (l1Id: L1DimensionalityId) => {
    setExpandedL1((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(l1Id)) {
        newSet.delete(l1Id);
      } else {
        newSet.add(l1Id);
      }
      return newSet;
    });
  };

  const toggleModelExpand = (modelIdent: string) => {
    setExpandedModels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(modelIdent)) {
        newSet.delete(modelIdent);
      } else {
        newSet.add(modelIdent);
      }
      return newSet;
    });
  };

  const renderMetricItem = (
    metric: DashboardMetricInfo,
    modelIdent: string
  ) => {
    const { ident, name } = metric;
    const i18nTitle = t(
      `metrics_models_v2:${modelIdent}.metrics.${ident}.title`,
      name
    );
    const i18nDesc = t(
      `metrics_models_v2:${modelIdent}.metrics.${ident}.desc`,
      ''
    );

    return (
      <div
        key={ident}
        className="border-b border-gray-100 px-3 py-2 last:border-b-0"
      >
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium">{i18nTitle}</div>
            {i18nDesc && (
              <div
                className="mt-0.5 line-clamp-2 text-xs text-[#585858]"
                title={i18nDesc}
              >
                {i18nDesc}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderModelCard = (model: ModelCardData) => {
    const isExpanded = expandedModels.has(model.modelIdent);

    return (
      <div key={model.modelIdent} className="border border-[#CCCCCC]">
        <div className="flex min-h-14 items-center justify-between p-3">
          <div
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3"
            onClick={() => toggleModelExpand(model.modelIdent)}
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{model.name}</div>
              {model.description && (
                <div
                  className="mt-0.5 line-clamp-2 text-xs text-[#585858]"
                  title={model.description}
                >
                  {model.description}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border px-2 py-1 text-xs hover:bg-gray-50"
              onClick={() => onDelete(model.modelIdent)}
            >
              {t('common:btn.delete')}
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => toggleModelExpand(model.modelIdent)}
            >
              {isExpanded ? (
                <IoChevronDown size={18} />
              ) : (
                <IoChevronForward size={18} />
              )}
            </button>
          </div>
        </div>

        {isExpanded && model.metrics.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="px-3 py-1.5 text-xs font-medium text-gray-500">
              {t('os_board:create.metrics.metric_count', {
                count: model.metrics.length,
              })}
            </div>
            {model.metrics.map((metric) =>
              renderMetricItem(metric, model.modelIdent)
            )}
          </div>
        )}
      </div>
    );
  };

  if (selectedModelIds.length === 0) {
    return (
      <div className="border border-dashed p-4 text-gray-500">
        {t('common:no_data')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {l1Groups.map((l1Group) => {
        const isExpanded = expandedL1.has(l1Group.id);

        return (
          <div key={l1Group.id}>
            <div
              className="flex cursor-pointer items-center gap-1 py-2 text-base font-semibold"
              onClick={() => toggleL1(l1Group.id)}
            >
              {isExpanded ? (
                <IoChevronDown className="text-gray-500" size={14} />
              ) : (
                <IoChevronForward className="text-gray-500" size={14} />
              )}
              <span>{l1Group.title}</span>
            </div>

            {isExpanded &&
              l1Group.children.map((l2Group) => (
                <div key={l2Group.id} className="ml-4 mt-2">
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    {l2Group.title}
                  </div>
                  <div className="space-y-2">
                    {l2Group.models.map((model) => renderModelCard(model))}
                  </div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedModelList;
