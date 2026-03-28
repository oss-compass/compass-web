import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useModelMetricList } from '../api/dashboard';

// MODEL_METRICS_MAP 已废弃，使用空映射占位
const MODEL_METRICS_MAP: Record<string, string[]> = {};
import {
  useCollaborationDevelopmentIndex,
  useCommunityServiceAndSupport,
  useCommunityActivity,
  useOrganizationsActivity,
  useContributorMilestonePersona,
  useContributorRolePersona,
  useContributorDomainPersona,
} from '@modules/analyze/components/SideBar/config';

interface DashboardMetricsHookProps {
  initialValues?: {
    metricIds?: string[];
  };
}

export const useDashboardMetrics = ({
  initialValues,
}: DashboardMetricsHookProps) => {
  const { t } = useTranslation();

  const [metricIds, setMetricIds] = useState<string[]>([]);
  // 记录隐藏的指标（用于后端标记）
  const [hiddenMetricIds, setHiddenMetricIds] = useState<string[]>([]);
  // 记录手动添加的指标（非模型带来的）
  // In edit mode, initial metrics are considered manual since we don't store model info
  const [manualMetricIds, setManualMetricIds] = useState<string[]>(
    initialValues?.metricIds || []
  );
  // 记录指标ID到模型ident的映射
  const [metricToModelMap, setMetricToModelMap] = useState<
    Record<string, string>
  >({});

  const [metricModalOpen, setMetricModalOpen] = useState(false);

  // 模型选择相关状态
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  // 模型指标映射
  const collaborationDevelopmentIndex = useCollaborationDevelopmentIndex();
  const communityServiceAndSupport = useCommunityServiceAndSupport();
  const communityActivity = useCommunityActivity();
  const organizationsActivity = useOrganizationsActivity();
  const contributorMilestonePersona = useContributorMilestonePersona();
  const contributorRolePersona = useContributorRolePersona();
  const contributorDomainPersona = useContributorDomainPersona();

  const allModels = [
    collaborationDevelopmentIndex,
    communityServiceAndSupport,
    communityActivity,
    organizationsActivity,
    contributorMilestonePersona,
    contributorRolePersona,
    contributorDomainPersona,
  ];

  // 当模型选择或手动指标变化时更新指标
  useEffect(() => {
    setMetricIds((prevMetricIds) => {
      // 1. 计算所有应该存在的指标 ID 集合 (Source of Truth)
      const modelBasedMetricsSet = new Set<string>();
      selectedModels.forEach((modelId) => {
        const metrics = MODEL_METRICS_MAP[modelId];
        if (metrics) {
          metrics.forEach((m) => modelBasedMetricsSet.add(m));
        }
      });

      // 所有应该保留的指标 ID (手动 + 模型)
      const targetIds = new Set([
        ...manualMetricIds,
        ...Array.from(modelBasedMetricsSet),
      ]);

      // 2. 生成新的列表
      // 2a. 保留 prevMetricIds 中仍然合法的指标（保持原顺序）
      const nextMetricIds = prevMetricIds.filter((id) => targetIds.has(id));

      // 2b. 找出新增的指标（在 targetIds 中但不在 prevMetricIds 中）
      const currentIdSet = new Set(prevMetricIds);
      const newIdsToAdd: string[] = [];

      // 按照 manualMetricIds 的顺序添加新增的手动指标
      manualMetricIds.forEach((id) => {
        if (!currentIdSet.has(id)) {
          newIdsToAdd.push(id);
        }
      });

      // 添加新增的模型指标
      modelBasedMetricsSet.forEach((id) => {
        if (!currentIdSet.has(id)) {
          newIdsToAdd.push(id);
        }
      });

      // 合并
      const finalIds = Array.from(new Set([...nextMetricIds, ...newIdsToAdd]));

      // 比较 prevMetricIds 和 finalIds，如果相同则不更新以避免重渲染
      if (
        prevMetricIds.length === finalIds.length &&
        prevMetricIds.every((v, i) => v === finalIds[i])
      ) {
        return prevMetricIds;
      }
      return finalIds;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModels, manualMetricIds]);

  // 使用 REST API 获取指标数据
  const { data: metricData } = useModelMetricList();

  // 从远程 API 构建可选指标列表，并更新指标到模型的映射
  const selectableMetrics = useMemo(() => {
    const remoteMetrics: Array<{
      id: string;
      name: string;
      category: string;
      unit: string;
      modelIdent?: string;
    }> = [];
    const newMetricToModelMap: Record<string, string> = {};

    // 添加独立指标
    if (metricData?.independent_metrics) {
      metricData.independent_metrics.forEach((m) => {
        remoteMetrics.push({
          id: m.ident,
          name: m.name,
          category: m.category,
          unit: '',
          modelIdent: 'model_999',
        });
        newMetricToModelMap[m.ident] = 'model_999';
      });
    }

    // 添加模型指标
    if (metricData?.models) {
      metricData.models.forEach((model) => {
        model.dashboard_metric_infos.forEach((m) => {
          remoteMetrics.push({
            id: m.ident,
            name: m.name,
            category: m.category,
            unit: '',
            modelIdent: model.ident,
          });
          newMetricToModelMap[m.ident] = model.ident;
        });
      });
    }

    // 更新映射关系
    setMetricToModelMap(newMetricToModelMap);

    // 去重处理
    const uniqueMetrics = remoteMetrics.filter(
      (m, index, self) => index === self.findIndex((mm) => mm.id === m.id)
    );

    return uniqueMetrics;
  }, [metricData]);

  const handleReorder = (newIds: string[]) => {
    // 重新排序时，直接更新 metricIds，保持用户排序
    setMetricIds(newIds);

    // 同时也更新 manualMetricIds 的顺序，虽然这对显示没有直接影响（因为 useEffect 会尊重 metricIds 的顺序），
    // 但保持数据结构的一致性是好的。
    // 过滤掉模型带来的指标
    const allModelMetrics = new Set<string>();
    selectedModels.forEach((modelId) => {
      const metrics = MODEL_METRICS_MAP[modelId];
      if (metrics) {
        metrics.forEach((m) => allModelMetrics.add(m));
      }
    });
    const newManualMetrics = newIds.filter((id) => !allModelMetrics.has(id));
    setManualMetricIds(newManualMetrics);
  };

  const handleDelete = (id: string) => {
    // 检查是否属于某个已选模型
    const belongingModelId = selectedModels.find((modelId) =>
      MODEL_METRICS_MAP[modelId]?.includes(id)
    );

    if (belongingModelId) {
      const model = allModels.find((m) => m.id === belongingModelId);
      const modelName = model?.name || belongingModelId;
      toast.error(
        t('os_board:create.metrics.cannot_delete_model_metric', { modelName })
      );
      return;
    }

    // 删除指标时，检查是否是手动添加的
    if (manualMetricIds.includes(id)) {
      setManualMetricIds(manualMetricIds.filter((x) => x !== id));
    }
  };

  const handleHide = (id: string) => {
    // 隐藏指标：切换隐藏状态，用于后端标记
    setHiddenMetricIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    metricIds,
    hiddenMetricIds,
    manualMetricIds,
    setManualMetricIds,
    metricModalOpen,
    setMetricModalOpen,
    selectedModels,
    setSelectedModels,
    modelModalOpen,
    setModelModalOpen,
    allModels,
    selectableMetrics,
    handleReorder,
    handleDelete,
    handleHide,
    metricToModelMap,
  };
};
