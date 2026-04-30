import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useModelMetricList } from '../api/dashboard';
import {
  modelToMetricsMap,
  type ModelId,
} from '../config/dimensionalityModelMap';

interface DashboardMetricsHookProps {
  initialValues?: {
    metricIds?: string[];
    selectedModels?: string[];
  };
}

export const useDashboardMetrics = ({
  initialValues,
}: DashboardMetricsHookProps) => {
  const { t } = useTranslation();

  const [metricIds, setMetricIds] = useState<string[]>(
    initialValues?.metricIds || []
  );
  // 记录隐藏的指标（用于后端标记）
  const [hiddenMetricIds, setHiddenMetricIds] = useState<string[]>([]);
  // 记录选中的模型 ident 列表
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>(
    initialValues?.selectedModels || []
  );
  // 记录指标ID到模型ident的映射
  const [metricToModelMap, setMetricToModelMap] = useState<
    Record<string, string>
  >({});

  const [metricModalOpen, setMetricModalOpen] = useState(false);

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

  // 当模型选择变化时，重新计算指标列表
  useEffect(() => {
    // 从选中的模型展开所有指标
    const modelBasedMetrics = new Set<string>();
    selectedModelIds.forEach((modelId) => {
      const metrics = modelToMetricsMap[modelId as ModelId];
      if (metrics) {
        metrics.forEach((m) => modelBasedMetrics.add(m));
      }
    });

    // 过滤出 API 实际返回的指标
    const validMetricIds = Array.from(modelBasedMetrics).filter((id) =>
      selectableMetrics.some((m) => m.id === id)
    );

    setMetricIds(validMetricIds);
  }, [selectedModelIds, selectableMetrics]);

  const handleDeleteModel = useCallback((modelId: string) => {
    setSelectedModelIds((prev) => prev.filter((m) => m !== modelId));
  }, []);

  const handleReorder = useCallback((newIds: string[]) => {
    setMetricIds(newIds);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      const modelIdent = metricToModelMap[id];
      if (!modelIdent) return;

      if (selectedModelIds.includes(modelIdent)) {
        setSelectedModelIds((prev) => prev.filter((m) => m !== modelIdent));
      }
    },
    [metricToModelMap, selectedModelIds]
  );

  const handleHide = useCallback((id: string) => {
    setHiddenMetricIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  return {
    metricIds,
    hiddenMetricIds,
    selectedModelIds,
    setSelectedModelIds,
    metricModalOpen,
    setMetricModalOpen,
    selectableMetrics,
    handleReorder,
    handleDelete,
    handleDeleteModel,
    handleHide,
    metricToModelMap,
  };
};
