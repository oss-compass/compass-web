import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { Button, Input, Modal } from '@oss-compass/ui';
import { useThrottle } from 'ahooks';
import classnames from 'classnames';
import LinkA from '@common/components/LinkA';
import { useModelMetricList } from '../../api/dashboard';
import type { DashboardMetricInfo } from '../../api/dashboard';
import {
  dimensionalityToModelsMap,
  allDimensionalityIds,
  type DimensionalityId,
  type ModelId,
} from '../../config/dimensionalityModelMap';

interface MetricSelectionModalProps {
  open: boolean;
  onClose: () => void;
  selectedIds: string[];
  onConfirm: (metricIds: string[]) => void;
}

const MetricSelectionModal: React.FC<MetricSelectionModalProps> = ({
  open,
  onClose,
  selectedIds,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const throttleSearch = useThrottle(search, { wait: 200 });
  const [currentCategory, setCurrentCategory] = useState('');
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  // 维度展开状态
  const [expandedDimensionalities, setExpandedDimensionalities] = useState<
    Set<DimensionalityId>
  >(new Set(allDimensionalityIds));

  useEffect(() => {
    if (open) {
      setTempSelected(selectedIds);
      setSearch('');
    }
  }, [open, selectedIds]);

  // 使用新的 API 接口
  const { data, isLoading } = useModelMetricList();

  // 模型数据映射（modelIdent -> 模型信息）
  const modelDataMap = useMemo(() => {
    const map: Record<
      string,
      {
        id: string;
        name: string;
        description?: string;
        modelIdent: string;
        metrics: DashboardMetricInfo[];
      }
    > = {};

    // 独立指标（model_999）
    if (data?.independent_metrics && data.independent_metrics.length > 0) {
      const i18nTitle = t('metrics_models_v2:model_999.title', '独立指标');
      const i18nDesc = t('metrics_models_v2:model_999.desc', '');
      map['model_999'] = {
        id: 'independent',
        name: i18nTitle,
        description: i18nDesc,
        modelIdent: 'model_999',
        metrics: data.independent_metrics,
      };
    }

    // 其他模型
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
            id: `model_${model.id}`,
            name: i18nTitle,
            description: i18nDesc,
            modelIdent,
            metrics: model.dashboard_metric_infos,
          };
        }
      });
    }

    return map;
  }, [data, t]);

  // 按维度分组的数据结构
  const dimensionalityGroups = useMemo(() => {
    return allDimensionalityIds
      .map((dimId) => {
        const dimTitle = t(`metrics_models_v2:${dimId}.title`, dimId);
        const modelIds = dimensionalityToModelsMap[dimId] || [];

        // 过滤出有数据的模型
        const models = modelIds
          .filter((modelId) => modelDataMap[modelId])
          .map((modelId) => modelDataMap[modelId]);

        // 计算该维度下已选中的指标数量
        const selectedCount = models.reduce((count, model) => {
          return (
            count +
            tempSelected.filter((ident) =>
              model.metrics.some((m) => m.ident === ident)
            ).length
          );
        }, 0);

        return {
          id: dimId,
          title: dimTitle,
          models,
          selectedCount,
        };
      })
      .filter((group) => group.models.length > 0);
  }, [modelDataMap, t, tempSelected]);

  // 设置默认分类为第一个维度的第一个模型
  useEffect(() => {
    if (open && dimensionalityGroups.length > 0 && !currentCategory) {
      const firstModel = dimensionalityGroups[0]?.models[0];
      if (firstModel) {
        setCurrentCategory(firstModel.modelIdent);
      }
    }
  }, [open, dimensionalityGroups, currentCategory]);

  // 当前分类的指标列表
  const showListItem = useMemo(() => {
    const model = modelDataMap[currentCategory];
    return model?.metrics || [];
  }, [modelDataMap, currentCategory]);

  // 当前模型信息
  const currentModelData = useMemo(() => {
    return modelDataMap[currentCategory];
  }, [modelDataMap, currentCategory]);

  // 所有指标（用于搜索）
  const allMetrics = useMemo(() => {
    const metrics: DashboardMetricInfo[] = [];
    if (data?.independent_metrics) {
      metrics.push(...data.independent_metrics);
    }
    if (data?.models) {
      data.models.forEach((model) => {
        metrics.push(...model.dashboard_metric_infos);
      });
    }
    return metrics;
  }, [data]);

  // 搜索结果
  const searchResult = useMemo(() => {
    if (!throttleSearch) return [];
    return allMetrics.filter((metric) => {
      return (
        metric.ident.toLowerCase().indexOf(throttleSearch.toLowerCase()) > -1 ||
        metric.name.toLowerCase().indexOf(throttleSearch.toLowerCase()) > -1
      );
    });
  }, [allMetrics, throttleSearch]);

  const toggleMetric = (metricIdent: string) => {
    const idStr = metricIdent;
    setTempSelected((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr]
    );
  };

  // 当前模型的全选/取消全选
  const isAllSelected = useMemo(() => {
    if (!showListItem || showListItem.length === 0) return false;
    return showListItem.every((m) => tempSelected.includes(m.ident));
  }, [showListItem, tempSelected]);

  const toggleSelectAll = () => {
    if (!showListItem || showListItem.length === 0) return;
    const currentIdents = showListItem.map((m) => m.ident);
    if (isAllSelected) {
      // 取消全选
      setTempSelected((prev) =>
        prev.filter((id) => !currentIdents.includes(id))
      );
    } else {
      // 全选
      setTempSelected((prev) => {
        const newSet = new Set([...prev, ...currentIdents]);
        return Array.from(newSet);
      });
    }
  };

  const handleSave = () => {
    onConfirm(tempSelected);
    onClose();
  };

  const count = tempSelected.length;

  const toggleDimensionality = (dimId: DimensionalityId) => {
    setExpandedDimensionalities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dimId)) {
        newSet.delete(dimId);
      } else {
        newSet.add(dimId);
      }
      return newSet;
    });
  };

  const renderCategoryMenu = () => {
    return (
      <div className="thin-scrollbar w-60 overflow-auto md:w-auto">
        <div className="border-silver flex flex-col border-l border-r border-t">
          {dimensionalityGroups.map((group) => {
            const isExpanded = expandedDimensionalities.has(
              group.id as DimensionalityId
            );

            // 其他指标（dimensionality_005）特殊处理：直接作为可点击项，不展示子菜单
            const isOtherMetrics = group.id === 'dimensionality_005';
            const isOtherMetricsSelected =
              isOtherMetrics && currentCategory === 'model_999';

            if (isOtherMetrics) {
              return (
                <div
                  key={group.id}
                  className={classnames(
                    'border-silver flex h-10 cursor-pointer items-center justify-between border-b px-3 text-sm font-semibold',
                    isOtherMetricsSelected
                      ? 'border-l-2 border-l-blue-600 bg-blue-50'
                      : 'bg-gray-50'
                  )}
                  onClick={() => setCurrentCategory('model_999')}
                >
                  <span className="truncate">{group.title}</span>
                  {group.selectedCount > 0 && (
                    <span className="bg-primary h-4 min-w-[16px] shrink-0 text-center text-xs leading-4 text-white">
                      {group.selectedCount}
                    </span>
                  )}
                </div>
              );
            }

            return (
              <div key={group.id}>
                {/* 维度一级菜单 - 字体更大更粗 */}
                <div
                  className="border-silver flex h-10 cursor-pointer items-center justify-between border-b bg-gray-50 px-3 text-sm font-semibold"
                  onClick={() =>
                    toggleDimensionality(group.id as DimensionalityId)
                  }
                >
                  <div className="flex items-center gap-1">
                    {isExpanded ? (
                      <IoChevronDown className="text-gray-500" size={14} />
                    ) : (
                      <IoChevronForward className="text-gray-500" size={14} />
                    )}
                    <span className="truncate">{group.title}</span>
                  </div>
                  {group.selectedCount > 0 && (
                    <span className="bg-primary h-4 min-w-[16px] shrink-0 text-center text-xs leading-4 text-white">
                      {group.selectedCount}
                    </span>
                  )}
                </div>

                {/* 模型二级菜单 - 字体更小更细 */}
                {isExpanded &&
                  group.models.map((model) => {
                    const modelCount = tempSelected.filter((ident) =>
                      model.metrics.some((m) => m.ident === ident)
                    ).length;
                    const isSelected = currentCategory === model.modelIdent;

                    return (
                      <div
                        key={model.modelIdent}
                        onClick={() => setCurrentCategory(model.modelIdent)}
                        className={classnames(
                          'border-silver flex h-9 cursor-pointer items-center justify-between border-b pl-7 pr-3 text-xs font-normal',
                          isSelected
                            ? 'border-l-2 border-l-blue-600 bg-blue-50 !pl-[26px]'
                            : ''
                        )}
                      >
                        <div className="truncate">{model.name}</div>
                        {modelCount > 0 && (
                          <span className="bg-primary h-4 min-w-[16px] shrink-0 text-center text-xs leading-4 text-white">
                            {modelCount}
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMetricCard = (
    metric: DashboardMetricInfo,
    modelIdent: string
  ) => {
    const { ident, name, category } = metric;
    const isSelected = tempSelected.includes(ident);

    // 使用国际化获取指标名称和描述
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
        className={classnames(
          'flex min-h-16 items-center justify-between border border-[#CCCCCC]',
          [
            isSelected
              ? ['border-blue-600', 'border-2', 'bg-smoke', 'p-[11px]']
              : ['border', 'p-3'],
            'cursor-pointer',
          ]
        )}
        onClick={() => toggleMetric(ident)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{i18nTitle}</span>
            <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
              {category}
            </span>
          </div>
          {i18nDesc && (
            <div className="mt-1 text-xs text-[#585858]" title={i18nDesc}>
              {i18nDesc}
            </div>
          )}
        </div>
        <div className="pl-5">
          <input checked={isSelected} type="checkbox" onChange={() => {}} />
        </div>
      </div>
    );
  };

  const content = () => {
    if (throttleSearch) {
      if (!searchResult || searchResult.length === 0) {
        return (
          <div className="text-secondary w-full text-center">
            {t('common:no_data')}
          </div>
        );
      }

      // 搜索结果需要找到对应的模型 ident
      const getMetricModelIdent = (metric: DashboardMetricInfo) => {
        // 先检查是否在独立指标中
        if (data?.independent_metrics?.some((m) => m.ident === metric.ident)) {
          return 'model_999';
        }

        // 在模型中查找，直接返回 model.ident
        const foundModel = data?.models?.find((model) =>
          model.dashboard_metric_infos.some((m) => m.ident === metric.ident)
        );

        return foundModel?.ident || '';
      };

      return (
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
          <div className="grid grid-cols-1 gap-4 pr-2">
            {searchResult?.map((metric) => {
              const modelIdent = getMetricModelIdent(metric);
              return renderMetricCard(metric, modelIdent);
            })}
          </div>
        </div>
      );
    }

    return (
      <>
        {renderCategoryMenu()}
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
          {isLoading ? (
            <div className="animate-pulse p-4">
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-slate-200"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-4 bg-slate-200"></div>
                  <div className="col-span-1 h-4 bg-slate-200"></div>
                </div>
                <div className="h-4 bg-slate-200"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-4 bg-slate-200"></div>
                  <div className="col-span-2 h-4 bg-slate-200"></div>
                </div>
                <div className="h-4 bg-slate-200"></div>
              </div>
            </div>
          ) : (
            <div className="pr-2">
              {/* 全选按钮 */}
              {showListItem && showListItem.length > 0 && (
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {t('os_board:create.metrics.metric_count', {
                      count: showListItem.length,
                    })}
                  </span>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={toggleSelectAll}
                  >
                    {isAllSelected
                      ? t('common:btn.deselect_all')
                      : t('common:btn.select_all')}
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                {showListItem?.map((metric) => {
                  return renderMetricCard(
                    metric,
                    currentModelData?.modelIdent || ''
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
        <div
          className="absolute right-10 top-10 cursor-pointer p-2"
          onClick={onClose}
        >
          <GrClose />
        </div>

        <div className="px-10 pt-8 md:px-2">
          <div className="mb-3 text-2xl font-medium">
            {t('os_board:create.metrics.add_metric')}
          </div>
          <div className="mb-4 text-sm">
            {t('os_board:create.metrics.selected_count', { count })}
          </div>
          <Input
            value={search}
            placeholder={t('lab:search_metric_placeholder')}
            className="mb-4 border-2"
            onChange={(v) => setSearch(v)}
          />

          <div className="flex h-[440px]">{content()}</div>

          <div className="border-silver absolute bottom-0 left-0 right-0 flex h-20 items-center justify-between border-t bg-white px-9 text-sm">
            <div>
              {t('lab:cant_find_a_suitable_metric')}
              <Trans
                i18nKey={'contact_us' as any}
                ns="common"
                components={{
                  s: <LinkA href={'/docs/community/'} />,
                }}
              />
            </div>
            <div>
              <Button className="min-w-[100px]" onClick={handleSave}>
                {t('common:btn.confirm')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MetricSelectionModal;
