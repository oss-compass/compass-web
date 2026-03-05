import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoNotifications } from 'react-icons/io5';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { colors } from '@common/options';
import { shortenAxisLabel } from '@common/utils/format';
import type { OsBoardMetric, OsBoardDerivedMetric } from '../../types';
import { MetricData } from '../../api/dashboard';
import AlertManageDialog from './AlertManageDialog';

interface MetricCardProps {
  metric: OsBoardMetric | OsBoardDerivedMetric;
  dashboardId: string;
  projects: readonly string[];
  competitorProjects?: readonly string[];
  compareMode?: boolean;
  /** 是否显示预警设置按钮 */
  showAlertButton?: boolean;
  metricsDataMap?: Map<string, MetricData[]>;
  isLoading?: boolean;
}

// 确定性哈希函数，用于生成稳定的伪随机数
const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  dashboardId,
  projects,
  competitorProjects = [],
  compareMode = false,
  showAlertButton = true,
  metricsDataMap,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const allProjects = useMemo(() => {
    if (compareMode) {
      const projectSet = new Set([...projects, ...competitorProjects]);
      return Array.from(projectSet);
    }
    return [...projects];
  }, [projects, competitorProjects, compareMode]);

  // 如果没有项目，使用默认示例项目
  const displayProjects = useMemo(() => {
    if (allProjects.length === 0) {
      return ['example/project'];
    }
    return allProjects;
  }, [allProjects]);

  const chartOption = useMemo(() => {
    let dates: string[] = [];

    // 收集所有数据系列
    const series = displayProjects.map((project, idx) => {
      // 从 Map 中获取该项目的所有指标数据
      const projectMetrics = metricsDataMap?.get(project);
      // 找到当前卡片对应的指标数据
      const metricData = projectMetrics?.find((m) => m.ident === metric.id);

      const dataPoints = metricData?.data || [];
      const data = dataPoints.map((d) => d.value);

      // 如果 dates 为空，且当前项目有数据，则使用该项目的日期作为 X 轴
      if (dates.length === 0 && dataPoints.length > 0) {
        dates = dataPoints.map((d) => d.date.slice(0, 10));
      }

      return {
        name: project.split('/').pop() || project,
        type: 'line' as const,
        data,
        smooth: true,
        showSymbol: false,
        lineStyle: colors[idx % colors.length]
          ? { color: colors[idx % colors.length] }
          : {},
        itemStyle: colors[idx % colors.length]
          ? { color: colors[idx % colors.length] }
          : {},
      };
    });

    return {
      color: colors,
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: {
          type: 'cross' as const,
        },
        order: 'valueDesc' as const,
        enterable: true,
      },
      legend: {
        type: 'scroll' as const,
        icon: 'circle',
        left: 0,
      },
      grid: {
        top: 60,
        left: '50px',
        right: '30px',
        bottom: '50px',
      },
      xAxis: {
        type: 'category' as const,
        boundaryGap: true,
        data: dates,
        axisLabel: {
          align: 'center' as const,
          rotate: 5,
          margin: 20,
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value' as const,
        scale: true,
        axisLabel: {
          formatter: (value: any) => shortenAxisLabel(value) as string,
        },
      },
      series,
    };
  }, [dashboardId, displayProjects, metric, metricsDataMap]);

  const id = `metric_card_${metric.id}`;

  return (
    <>
      <BaseCard
        id={id}
        title={metric.name}
        description={metric.description}
        bodyClass="h-[360px]"
        headRight={
          showAlertButton ? (
            <button
              type="button"
              className="flex items-center justify-center rounded-full p-1.5 text-amber-500 transition-colors hover:bg-amber-50 hover:text-amber-600"
              onClick={() => setAlertDialogOpen(true)}
              title={t('os_board:alert_dialog.set_alert')}
            >
              <IoNotifications className="h-5 w-5" />
            </button>
          ) : null
        }
        bodyRender={(ref) => (
          <EChartX
            loading={isLoading}
            option={chartOption}
            containerRef={ref}
          />
        )}
      />

      <AlertManageDialog
        open={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        dashboardId={dashboardId}
        metricId={metric.id}
      />
    </>
  );
};

export default MetricCard;
