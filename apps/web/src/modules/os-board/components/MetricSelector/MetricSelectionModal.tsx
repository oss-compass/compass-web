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
  allL1DimensionalityIds,
  l1ToL2Map,
  getMetricsByModel,
  type DimensionalityId,
  type L1DimensionalityId,
  type ModelId,
} from '../../config/dimensionalityModelMap';

interface MetricSelectionModalProps {
  open: boolean;
  onClose: () => void;
  selectedIds: string[];
  onConfirm: (modelIds: string[]) => void;
}

interface ModelCardData {
  modelIdent: string;
  name: string;
  description: string;
  metrics: DashboardMetricInfo[];
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
  const [currentL2Category, setCurrentL2Category] = useState<string>('');
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  // L1 维度展开状态
  const [expandedL1, setExpandedL1] = useState<Set<L1DimensionalityId>>(
    new Set(allL1DimensionalityIds)
  );
  // 模型卡片收起状态（默认全部展开，用户可主动收起）
  const [collapsedModels, setCollapsedModels] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (open) {
      setTempSelected(selectedIds);
      setSearch('');
      setCollapsedModels(new Set());
    }
  }, [open, selectedIds]);

  // 使用 API 接口
  const { data, isLoading } = useModelMetricList();

  // 模型数据映射（modelIdent → 模型信息 + 指标列表）
  const modelDataMap = useMemo(() => {
    const map: Record<string, ModelCardData> = {};

    // 独立指标（model_999）
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

  // L2 维度分组数据
  const l2Groups = useMemo(() => {
    return allDimensionalityIds
      .map((dimId) => {
        const dimTitle = t(`metrics_models_v2:${dimId}.title`, dimId);
        const configuredModelIds = dimensionalityToModelsMap[dimId] || [];

        // 过滤出 API 返回中实际存在的模型
        const models = configuredModelIds
          .filter((modelId) => modelDataMap[modelId])
          .map((modelId) => modelDataMap[modelId]);

        // 计算该 L2 维度下已选中的模型数量
        const selectedCount = models.filter((m) =>
          tempSelected.includes(m.modelIdent)
        ).length;

        return {
          id: dimId,
          title: dimTitle,
          models,
          selectedCount,
        };
      })
      .filter((group) => group.models.length > 0);
  }, [modelDataMap, t, tempSelected]);

  // L1 维度分组数据
  const l1Groups = useMemo(() => {
    return allL1DimensionalityIds
      .map((l1Id) => {
        const l1Title = t(`metrics_models_v2:${l1Id}.title`, l1Id);
        const l2Ids = l1ToL2Map[l1Id] || [];

        // 过滤出有模型数据的 L2 维度
        const children = l2Ids
          .map((l2Id) => l2Groups.find((g) => g.id === l2Id))
          .filter(Boolean) as typeof l2Groups;

        if (children.length === 0) return null;

        const totalSelected = children.reduce(
          (sum, c) => sum + c.selectedCount,
          0
        );

        return {
          id: l1Id,
          title: l1Title,
          children,
          totalSelected,
        };
      })
      .filter(Boolean) as Array<{
      id: L1DimensionalityId;
      title: string;
      children: typeof l2Groups;
      totalSelected: number;
    }>;
  }, [l2Groups, t]);

  // 设置默认分类为第一个 L2 维度
  useEffect(() => {
    if (open && l2Groups.length > 0 && !currentL2Category) {
      setCurrentL2Category(l2Groups[0].id);
    }
  }, [open, l2Groups, currentL2Category]);

  // 当前 L2 维度的模型列表
  const currentModels = useMemo(() => {
    const group = l2Groups.find((g) => g.id === currentL2Category);
    return group?.models || [];
  }, [l2Groups, currentL2Category]);

  // 当前 L2 维度名称
  const currentL2Title = useMemo(() => {
    const group = l2Groups.find((g) => g.id === currentL2Category);
    return group?.title || '';
  }, [l2Groups, currentL2Category]);

  // 所有模型（用于搜索）
  const allModelsFlat = useMemo(() => {
    const models: Array<{
      modelIdent: string;
      name: string;
      description: string;
      l2DimensionId: string;
    }> = [];
    Object.values(modelDataMap).forEach((model) => {
      // 找到该模型所属的 L2 维度
      const l2Id = Object.entries(dimensionalityToModelsMap).find(
        ([, modelIds]) => modelIds.includes(model.modelIdent as ModelId)
      )?.[0];
      if (l2Id) {
        models.push({
          modelIdent: model.modelIdent,
          name: model.name,
          description: model.description,
          l2DimensionId: l2Id,
        });
      }
    });
    return models;
  }, [modelDataMap]);

  // 搜索结果
  const searchResult = useMemo(() => {
    if (!throttleSearch) return [];
    return allModelsFlat.filter((model) => {
      const searchLower = throttleSearch.toLowerCase();
      return (
        model.name.toLowerCase().indexOf(searchLower) > -1 ||
        model.description.toLowerCase().indexOf(searchLower) > -1
      );
    });
  }, [allModelsFlat, throttleSearch]);

  const toggleModel = (modelIdent: string) => {
    setTempSelected((prev) =>
      prev.includes(modelIdent)
        ? prev.filter((id) => id !== modelIdent)
        : [...prev, modelIdent]
    );
  };

  const handleSelectAllCurrent = () => {
    const modelIdents = throttleSearch
      ? searchResult.map((r) => r.modelIdent)
      : currentModels.map((m) => m.modelIdent);

    if (modelIdents.length === 0) return;

    const allSelected = modelIdents.every((id) => tempSelected.includes(id));

    if (allSelected) {
      setTempSelected((prev) => prev.filter((id) => !modelIdents.includes(id)));
    } else {
      setTempSelected((prev) => {
        const toAdd = modelIdents.filter((id) => !prev.includes(id));
        return [...prev, ...toAdd];
      });
    }
  };

  const currentSelectAllState = useMemo(() => {
    const modelIdents = throttleSearch
      ? searchResult.map((r) => r.modelIdent)
      : currentModels.map((m) => m.modelIdent);
    if (modelIdents.length === 0) return 'none';
    const allSelected = modelIdents.every((id) => tempSelected.includes(id));
    const someSelected = modelIdents.some((id) => tempSelected.includes(id));
    if (allSelected) return 'all';
    if (someSelected) return 'partial';
    return 'none';
  }, [throttleSearch, searchResult, currentModels, tempSelected]);

  const toggleModelExpand = (modelIdent: string) => {
    setCollapsedModels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(modelIdent)) {
        newSet.delete(modelIdent);
      } else {
        newSet.add(modelIdent);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    onConfirm(tempSelected);
    onClose();
  };

  const count = tempSelected.length;

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

  // 渲染左侧 L1→L2 菜单
  const renderCategoryMenu = () => {
    return (
      <div className="thin-scrollbar w-60 overflow-auto md:w-auto">
        <div className="border-silver flex flex-col border-l border-r border-t">
          {l1Groups.map((l1Group) => {
            const isExpanded = expandedL1.has(l1Group.id);

            return (
              <div key={l1Group.id}>
                {/* L1 一级维度菜单 */}
                <div
                  className="border-silver flex h-10 cursor-pointer items-center justify-between border-b bg-gray-100 px-3 text-sm font-semibold"
                  onClick={() => toggleL1(l1Group.id)}
                >
                  <div className="flex items-center gap-1">
                    {isExpanded ? (
                      <IoChevronDown className="text-gray-500" size={14} />
                    ) : (
                      <IoChevronForward className="text-gray-500" size={14} />
                    )}
                    <span className="truncate">{l1Group.title}</span>
                  </div>
                  {l1Group.totalSelected > 0 && (
                    <span className="bg-primary h-4 min-w-[16px] shrink-0 text-center text-xs leading-4 text-white">
                      {l1Group.totalSelected}
                    </span>
                  )}
                </div>

                {/* L2 二级维度子菜单 */}
                {isExpanded &&
                  l1Group.children.map((l2Group) => {
                    const isSelected = currentL2Category === l2Group.id;

                    return (
                      <div
                        key={l2Group.id}
                        onClick={() => setCurrentL2Category(l2Group.id)}
                        className={classnames(
                          'border-silver flex h-9 cursor-pointer items-center justify-between border-b pl-7 pr-3 text-xs font-normal',
                          isSelected
                            ? 'border-l-2 border-l-blue-600 bg-blue-50 !pl-[26px] text-blue-600'
                            : ''
                        )}
                      >
                        <span className="truncate">{l2Group.title}</span>
                        {l2Group.selectedCount > 0 && (
                          <span className="bg-primary h-4 min-w-[16px] shrink-0 text-center text-xs leading-4 text-white">
                            {l2Group.selectedCount}
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

  // 渲染模型指标子项（只读）
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
        className="border-b border-gray-200 px-3 py-2 last:border-b-0"
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

  // 渲染模型卡片
  const renderModelCard = (model: ModelCardData) => {
    const isSelected = tempSelected.includes(model.modelIdent);
    const isExpanded = !collapsedModels.has(model.modelIdent);

    return (
      <div
        key={model.modelIdent}
        className={classnames('border', {
          'border-2 border-blue-600': isSelected,
          'border-[#CCCCCC]': !isSelected,
        })}
      >
        {/* 卡片头部：选中框 + 模型信息 + 展开按钮 */}
        <div
          className={classnames(
            'flex min-h-14 cursor-pointer items-center justify-between',
            isSelected ? 'bg-smoke p-[11px]' : 'p-3'
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <input
              checked={isSelected}
              type="checkbox"
              onChange={() => toggleModel(model.modelIdent)}
              className="h-4 w-4 shrink-0"
            />
            <div
              className="min-w-0 flex-1"
              onClick={() => toggleModelExpand(model.modelIdent)}
            >
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
          <button
            type="button"
            className="ml-3 shrink-0 text-gray-400 hover:text-gray-600"
            onClick={() => toggleModelExpand(model.modelIdent)}
          >
            {isExpanded ? (
              <IoChevronDown size={18} />
            ) : (
              <IoChevronForward size={18} />
            )}
          </button>
        </div>

        {/* 展开的指标列表（只读） */}
        {isExpanded && model.metrics.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="border-b border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500">
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

  const content = () => {
    if (throttleSearch) {
      if (searchResult.length === 0) {
        return (
          <div className="text-secondary w-full text-center">
            {t('common:no_data')}
          </div>
        );
      }

      return (
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
          <div className="mb-3 flex items-center justify-end pr-2">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={handleSelectAllCurrent}
            >
              {currentSelectAllState === 'all'
                ? t('common:btn.deselect_all')
                : t('common:btn.select_all')}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 pr-2">
            {searchResult.map((modelSummary) => {
              const model = modelDataMap[modelSummary.modelIdent];
              if (!model) return null;
              return renderModelCard(model);
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
              <div className="space-y-4">
                <div className="h-4 bg-slate-200"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-4 bg-slate-200"></div>
                  <div className="col-span-1 h-4 bg-slate-200"></div>
                </div>
                <div className="h-4 bg-slate-200"></div>
              </div>
            </div>
          ) : (
            <div className="pr-2">
              {/* L2 维度标题 + 已选模型数量 */}
              {currentModels.length > 0 && (
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {currentL2Title}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={handleSelectAllCurrent}
                    >
                      {currentSelectAllState === 'all'
                        ? t('common:btn.deselect_all')
                        : t('common:btn.select_all')}
                    </button>
                    <span className="text-sm text-gray-500">
                      {t('os_board:create.metrics.model_count', {
                        count: currentModels.length,
                      })}
                    </span>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                {currentModels.map((model) => renderModelCard(model))}
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
            {t('os_board:create.model_selection.add_model')}
          </div>
          <div className="mb-4 text-sm">
            {t('os_board:create.metrics.selected_model_count', { count })}
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
