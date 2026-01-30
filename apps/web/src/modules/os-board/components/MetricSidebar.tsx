import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrevious, useWindowScroll } from 'react-use';
import classnames from 'classnames';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { AiOutlineAppstore } from 'react-icons/ai';
import type { OsBoardMetric, OsBoardDerivedMetric } from '../types';

interface MetricSidebarProps {
  metrics: readonly OsBoardMetric[];
  derivedMetrics: readonly OsBoardDerivedMetric[];
  selectedMetricIds: readonly string[];
}

const MetricSidebar: React.FC<MetricSidebarProps> = ({
  metrics,
  derivedMetrics,
  selectedMetricIds,
}) => {
  const { t } = useTranslation();
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  // 合并所有指标
  const allMetrics = useMemo(() => {
    return [...metrics, ...derivedMetrics];
  }, [metrics, derivedMetrics]);

  // 获取已选中的指标
  const selectedMetrics = useMemo(() => {
    const metricMap = new Map(allMetrics.map((m) => [m.id, m]));
    return selectedMetricIds
      .map((id) => metricMap.get(id))
      .filter(
        (m): m is OsBoardMetric | OsBoardDerivedMetric => m !== undefined
      );
  }, [allMetrics, selectedMetricIds]);

  // 按 category 分组
  const groupedMetrics = useMemo(() => {
    const groups = new Map<
      string,
      Array<OsBoardMetric | OsBoardDerivedMetric>
    >();
    for (const metric of selectedMetrics) {
      const category = metric.category || t('os_board:sidebar.other');
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(metric);
    }
    return groups;
  }, [selectedMetrics, t]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const scrollToMetric = (metricId: string) => {
    const element = document.getElementById(`metric_card_${metricId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // 添加高亮动画
      element.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
      }, 2000);
    }
  };

  const renderContent = () => {
    if (selectedMetrics.length === 0) {
      return (
        <div className="flex items-center justify-center py-10 text-sm text-gray-400">
          {t('os_board:sidebar.empty')}
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center gap-2 border-b px-6 pb-3">
          <AiOutlineAppstore className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-700">
            {t('os_board:sidebar.title')}
          </span>
          <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {selectedMetrics.length}
          </span>
        </div>

        <div className="mt-2">
          {Array.from(groupedMetrics.entries()).map(([category, items]) => {
            const isCollapsed = collapsedCategories.has(category);
            return (
              <div key={category} className="mb-0.5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-2 text-left text-xs font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {items.length}
                    </span>
                    {isCollapsed ? (
                      <IoChevronDown className="h-4 w-4" />
                    ) : (
                      <IoChevronUp className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="pb-1">
                    {items.map((metric) => (
                      <button
                        key={metric.id}
                        type="button"
                        className="group flex w-full items-center gap-2 rounded py-2 pl-6 pr-2 text-left text-xs text-gray-600 hover:bg-gray-100 hover:text-black"
                        onClick={() => scrollToMetric(metric.id)}
                        title={metric.description || metric.name}
                      >
                        <span className="group-hover:bg-primary h-1.5 w-1.5 rounded-full bg-gray-300" />
                        <span className="truncate">{metric.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <aside
      className={classnames(
        'relative w-64 flex-shrink-0 border-r bg-white',
        'lg:hidden'
      )}
    >
      <div
        className={classnames('thin-scrollbar sticky overflow-auto', [
          y < preY
            ? 'top-[136px] h-[calc(100vh-136px)]'
            : 'top-[56px] h-[calc(100vh-56px)]',
        ])}
      >
        <div className="py-4">{renderContent()}</div>
      </div>
    </aside>
  );
};

export default MetricSidebar;
