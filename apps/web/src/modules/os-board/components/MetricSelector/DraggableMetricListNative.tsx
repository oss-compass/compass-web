import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

interface OsBoardMetric {
  id: string;
  name: string;
  category?: string;
  unit?: string;
}

interface DraggableMetricItemProps {
  metric: OsBoardMetric;
  index: number;
  onDelete: () => void;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isNew?: boolean;
}

const DraggableMetricItem: React.FC<DraggableMetricItemProps> = ({
  metric,
  index,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
  isNew,
}) => {
  const { t } = useTranslation();

  // 使用 lab_metrics 国际化显示指标名称和描述
  const displayName = metric.category
    ? t(`lab_metrics:${metric.category}.${metric.id}`)
    : metric.name;
  const displayDesc = metric.category
    ? t(`lab_metrics:${metric.category}.${metric.id}_desc`)
    : '';

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onDragEnd={onDragEnd}
      className={classnames(
        'flex items-center justify-between border px-3 py-2',
        isDragging ? 'opacity-50' : '',
        isNew ? 'animate-highlight-new' : 'border-gray-200 bg-white'
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="cursor-grab touch-none text-gray-400 hover:text-gray-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="4" r="1.5" />
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="6" cy="8" r="1.5" />
            <circle cx="10" cy="8" r="1.5" />
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="10" cy="12" r="1.5" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{displayName}</div>
          {displayDesc && (
            <div className="truncate text-xs text-[#585858]">{displayDesc}</div>
          )}
        </div>
      </div>
      <button
        className="ml-2 flex-shrink-0 border px-2 py-1 text-xs hover:bg-gray-50"
        type="button"
        onClick={onDelete}
      >
        {t('common:btn.delete')}
      </button>
    </div>
  );
};

interface DraggableMetricListProps {
  metricIds: string[];
  allMetrics: OsBoardMetric[];
  onReorder: (newIds: string[]) => void;
  onDelete: (metricId: string) => void;
}

const DraggableMetricList: React.FC<DraggableMetricListProps> = ({
  metricIds,
  allMetrics,
  onReorder,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [newlyAddedIds, setNewlyAddedIds] = useState<string[]>([]);
  const prevMetricIdsRef = React.useRef<string[]>(metricIds);

  // 检测新增的指标
  useEffect(() => {
    const prevIds = prevMetricIdsRef.current;
    const added = metricIds.filter((id) => !prevIds.includes(id));
    if (added.length > 0) {
      setNewlyAddedIds((prev) => [...prev, ...added]);
      // 1.5秒后移除高亮
      setTimeout(() => {
        setNewlyAddedIds((prev) => prev.filter((id) => !added.includes(id)));
      }, 1500);
    }
    prevMetricIdsRef.current = metricIds;
  }, [metricIds]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    setHoveredIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex === null || hoveredIndex === null) {
      // 如果没有悬停在任何元素上，则使用当前位置
      setDraggedIndex(null);
      setHoveredIndex(null);
      return;
    }

    const newIds = [...metricIds];
    const [removed] = newIds.splice(draggedIndex, 1);
    newIds.splice(hoveredIndex, 0, removed);

    // 先更新父组件状态，然后延迟清理本地状态
    onReorder(newIds);
    setTimeout(() => {
      setDraggedIndex(null);
      setHoveredIndex(null);
    }, 0);
  };

  const metrics = metricIds
    .map((id) => allMetrics.find((m) => m.id === id))
    .filter((m): m is OsBoardMetric => m !== undefined);

  if (metrics.length === 0) {
    return (
      <div className="border border-dashed p-4 text-gray-500">
        {t('common:no_data')}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {metrics.map((metric, index) => (
        <DraggableMetricItem
          key={metric.id}
          metric={metric}
          index={index}
          onDelete={() => onDelete(metric.id)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          isDragging={draggedIndex === index}
          isNew={newlyAddedIds.includes(metric.id)}
        />
      ))}
    </div>
  );
};

export default DraggableMetricList;
