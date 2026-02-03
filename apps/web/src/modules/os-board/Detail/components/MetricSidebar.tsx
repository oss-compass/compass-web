import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrevious, useWindowScroll } from 'react-use';
import classnames from 'classnames';
import Popper from '@mui/material/Popper';
import { AiOutlineAppstore, AiOutlineRight } from 'react-icons/ai';
import type {
  OsBoardMetric,
  OsBoardDerivedMetric,
  OsBoardDashboardMetric,
} from '../../types';
import {
  allDimensionalityIds,
  dimensionalityToModelsMap,
  type DimensionalityId,
  type ModelId,
} from '../../config/dimensionalityModelMap';

// 一级评估体系配置
const EVALUATION_SYSTEMS = [
  { id: 'community_health', name: '社区生态健康评估', enabled: true },
  { id: 'developer_journey', name: '开发者旅程评估', enabled: false },
  {
    id: 'supply_chain_security',
    name: '开源软件供应链安全评估',
    enabled: false,
  },
  { id: 'developer_experience', name: '开发者体验套件评估', enabled: false },
  {
    id: 'product_competitiveness',
    name: '开源软件制品竞争力评估',
    enabled: false,
  },
] as const;

interface MetricSidebarProps {
  /** 后端返回的指标列表 */
  dashboardMetrics?: OsBoardDashboardMetric[];
  /** 已废弃：兼容旧方式 */
  metrics?: readonly OsBoardMetric[];
  derivedMetrics?: readonly OsBoardDerivedMetric[];
  selectedMetricIds?: readonly string[];
}

interface MetricItem {
  id: string;
  name: string;
  metricIdent: string;
  modelIdent: string;
  fromModel: boolean;
}

interface ModelGroup {
  modelId: ModelId;
  modelName: string;
  metrics: MetricItem[];
}

interface DimensionalityGroup {
  dimensionalityId: DimensionalityId;
  dimensionalityName: string;
  models: ModelGroup[];
}

// 分隔线组件
const Divider = () => (
  <div className="mx-6 mb-4 mt-2 border-b border-gray-200"></div>
);

// 禁用菜单项组件（带hover Popper提示）
const DisabledMenuItem: React.FC<{ name: string }> = ({ name }) => {
  const popoverAnchor = useRef<HTMLDivElement>(null);
  const [openedPopover, setOpenedPopover] = useState(false);

  return (
    <div className="group relative px-4">
      <div
        ref={popoverAnchor}
        className={classnames(
          'mb-1 flex cursor-not-allowed items-center rounded px-2 py-2',
          'text-gray-400'
        )}
        onMouseEnter={() => setOpenedPopover(true)}
        onMouseLeave={() => setOpenedPopover(false)}
      >
        <AiOutlineRight className="mr-1 h-3 w-3" />
        <span className="text-sm font-semibold">{name}</span>
      </div>
      <Popper
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        placement="right"
        className="z-modal"
      >
        <div
          className="rounded bg-gray-800 px-3 py-1.5 text-xs text-white shadow-lg"
          onMouseEnter={() => setOpenedPopover(true)}
          onMouseLeave={() => setOpenedPopover(false)}
        >
          即将上线
        </div>
      </Popper>
    </div>
  );
};

// 二级菜单项组件（模型），带 Popper 显示三级菜单
const ModelMenuItem: React.FC<{
  model: ModelGroup;
  onMetricClick: (metricId: string) => void;
}> = ({ model, onMetricClick }) => {
  const popoverAnchor = useRef<HTMLDivElement>(null);
  const [openedPopover, setOpenedPopover] = useState(false);

  return (
    <div className="group mb-0.5 px-4">
      <div
        ref={popoverAnchor}
        className="w-full"
        onMouseEnter={() => setOpenedPopover(true)}
        onMouseLeave={() => setOpenedPopover(false)}
      >
        <a
          href={`#metric_card_${model.metrics[0]?.id}`}
          className={classnames(
            'flex items-center justify-between text-xs text-gray-600',
            'cursor-pointer rounded py-2 pl-6 pr-2',
            'hover:bg-gray-100 hover:text-black'
          )}
          onClick={(e) => {
            e.preventDefault();
            if (model.metrics[0]) {
              onMetricClick(model.metrics[0].id);
            }
          }}
        >
          <span className="truncate">{model.modelName}</span>
        </a>
      </div>
      <Popper
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        placement="right-start"
        className="z-modal"
      >
        <div
          className={classnames(
            'rounded bg-white py-2 drop-shadow-lg',
            'md:hidden'
          )}
          onMouseEnter={() => setOpenedPopover(true)}
          onMouseLeave={() => setOpenedPopover(false)}
        >
          {model.metrics.map((metric) => (
            <a
              key={metric.id}
              href={`#metric_card_${metric.id}`}
              className={classnames(
                'block min-w-[180px] cursor-pointer border-b px-4 py-2 text-xs text-gray-600 last:border-b-0',
                'hover:bg-gray-100 hover:text-black'
              )}
              onClick={(e) => {
                e.preventDefault();
                onMetricClick(metric.id);
              }}
            >
              {metric.name}
            </a>
          ))}
        </div>
      </Popper>
    </div>
  );
};

// 一级菜单项组件（维度）
const DimensionalityTopicItem: React.FC<{
  dim: DimensionalityGroup;
  onMetricClick: (metricId: string) => void;
}> = ({ dim, onMetricClick }) => {
  // 贡献总览（dimensionality_005）特殊处理：直接显示指标，不显示模型层级
  const isContributionOverview = dim.dimensionalityId === 'dimensionality_005';

  // 获取所有指标（用于贡献总览直接展示）
  const allMetrics = dim.models.flatMap((model) => model.metrics);

  return (
    <>
      <div className="group px-4">
        <div
          className={classnames(
            'mb-0.5 flex cursor-pointer items-center rounded px-2 py-2',
            'hover:bg-gray-100 hover:text-black'
          )}
        >
          <h3 className="line-clamp-1 text-sm font-medium">
            {dim.dimensionalityName}
          </h3>
        </div>
      </div>
      {isContributionOverview ? (
        // 贡献总览：直接显示指标列表
        <div className="mb-0.5 px-4">
          {allMetrics.map((metric) => (
            <a
              key={metric.id}
              href={`#metric_card_${metric.id}`}
              className={classnames(
                'flex items-center text-xs text-gray-600',
                'cursor-pointer rounded py-2 pl-6 pr-2',
                'hover:bg-gray-100 hover:text-black'
              )}
              onClick={(e) => {
                e.preventDefault();
                onMetricClick(metric.id);
              }}
            >
              <span className="truncate">{metric.name}</span>
            </a>
          ))}
        </div>
      ) : (
        // 其他维度：显示模型层级
        dim.models.map((model) => (
          <ModelMenuItem
            key={model.modelId}
            model={model}
            onMetricClick={onMetricClick}
          />
        ))
      )}
    </>
  );
};

const MetricSidebar: React.FC<MetricSidebarProps> = ({
  dashboardMetrics,
  metrics = [],
  derivedMetrics = [],
  selectedMetricIds = [],
}) => {
  const { t } = useTranslation();
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  // 控制社区生态健康评估的展开/收缩状态
  const [isExpanded, setIsExpanded] = useState(true);

  // 构建三级菜单数据结构
  const menuData = useMemo((): DimensionalityGroup[] => {
    const metricsByModel = new Map<string, MetricItem[]>();

    if (dashboardMetrics && dashboardMetrics.length > 0) {
      dashboardMetrics
        .filter((m) => !m.hidden)
        .sort((a, b) => a.sort - b.sort)
        .forEach((m) => {
          const modelIdent = m.dashboard_model_info_ident;
          const metricIdent = m.dashboard_metric_info_ident;

          const i18nKey = `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.title`;
          const name = t(i18nKey, { defaultValue: m.name || metricIdent });

          const metricItem: MetricItem = {
            id: metricIdent,
            name,
            metricIdent,
            modelIdent,
            fromModel: m.from_model,
          };

          if (!metricsByModel.has(modelIdent)) {
            metricsByModel.set(modelIdent, []);
          }
          metricsByModel.get(modelIdent)!.push(metricItem);
        });
    } else {
      // 兼容旧方式
      const allMetrics = [...metrics, ...derivedMetrics];
      const metricMap = new Map(allMetrics.map((m) => [m.id, m]));
      selectedMetricIds.forEach((id) => {
        const m = metricMap.get(id);
        if (m) {
          const modelIdent = 'model_999';
          const metricItem: MetricItem = {
            id: m.id,
            name: m.name,
            metricIdent: m.id,
            modelIdent,
            fromModel: false,
          };
          if (!metricsByModel.has(modelIdent)) {
            metricsByModel.set(modelIdent, []);
          }
          metricsByModel.get(modelIdent)!.push(metricItem);
        }
      });
    }

    // 构建维度->模型->指标的层级结构
    const result: DimensionalityGroup[] = [];

    allDimensionalityIds.forEach((dimId) => {
      const dimName = t(`metrics_models_v2:${dimId}.title`, {
        defaultValue: dimId,
      });
      const modelIds = dimensionalityToModelsMap[dimId] || [];

      const models: ModelGroup[] = [];
      modelIds.forEach((modelId) => {
        const metricsInModel = metricsByModel.get(modelId);
        if (metricsInModel && metricsInModel.length > 0) {
          const modelName = t(`metrics_models_v2:${modelId}.title`, {
            defaultValue: modelId,
          });
          models.push({
            modelId,
            modelName,
            metrics: metricsInModel,
          });
        }
      });

      if (models.length > 0) {
        result.push({
          dimensionalityId: dimId,
          dimensionalityName: dimName,
          models,
        });
      }
    });

    return result;
  }, [dashboardMetrics, metrics, derivedMetrics, selectedMetricIds, t]);

  const scrollToMetric = (metricId: string) => {
    const element = document.getElementById(`metric_card_${metricId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
      }, 2000);
    }
  };

  const renderContent = () => {
    return (
      <>
        {/* 总标题 */}
        <div className="border-b px-6 pb-4">
          <div className="flex items-center gap-2">
            <AiOutlineAppstore className="h-6 w-6 text-gray-700" />
            <span className="text-base font-bold text-gray-800">
              开源生态评估体系
            </span>
          </div>
        </div>

        {/* 一级评估体系菜单 */}
        <div className="py-2">
          {EVALUATION_SYSTEMS.map((system, sysIndex) => (
            <div key={system.id}>
              {system.enabled ? (
                <>
                  {/* 社区生态健康评估 - 可展开/收缩 */}
                  <div className="group px-4">
                    <div
                      className={classnames(
                        'mb-1 flex cursor-pointer items-center rounded px-2 py-2',
                        isExpanded
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-100'
                      )}
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <AiOutlineRight
                        className={classnames(
                          'mr-1 h-3 w-3 transition-transform duration-200',
                          isExpanded && 'rotate-90'
                        )}
                      />
                      <span className="text-sm font-semibold">
                        {system.name}
                      </span>
                    </div>
                  </div>
                  {/* 展开的维度->模型->指标三级菜单（缩进） */}
                  {isExpanded &&
                    (menuData.length > 0 ? (
                      <div className="pb-2 pl-4">
                        {menuData.map((dim, index) => (
                          <React.Fragment key={dim.dimensionalityId}>
                            {index > 0 && <Divider />}
                            <DimensionalityTopicItem
                              dim={dim}
                              onMetricClick={scrollToMetric}
                            />
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-6 text-sm text-gray-400">
                        {t('os_board:sidebar.empty')}
                      </div>
                    ))}
                </>
              ) : (
                /* 其他评估体系 - 灰色不可点击，hover显示即将上线 */
                <DisabledMenuItem name={system.name} />
              )}
            </div>
          ))}
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
