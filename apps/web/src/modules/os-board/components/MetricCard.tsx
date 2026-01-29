import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoNotifications } from 'react-icons/io5';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { colors } from '@common/options';
import { shortenAxisLabel } from '@common/utils/format';
import type { OsBoardMetric, OsBoardDerivedMetric } from '../types';
import { getMetricValue } from '../state';
import AlertManageDialog from './AlertManageDialog';

interface MetricCardProps {
  metric: OsBoardMetric | OsBoardDerivedMetric;
  dashboardId: string;
  projects: readonly string[];
  competitorProjects?: readonly string[];
  compareMode?: boolean;
  /** 是否显示预警设置按钮 */
  showAlertButton?: boolean;
}

// 确定性哈希函数，用于生成稳定的伪随机数
const hashSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// 基于种子的伪随机数生成器
const seededRandom = (seed: number, index: number): number => {
  const x = Math.sin(seed + index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

// 生成模拟的时序数据（确定性）
const generateMockTimeSeriesData = (
  dashboardId: string,
  project: string,
  metricId: string,
  days: number = 30
) => {
  const baseValue = getMetricValue({ dashboardId, project, metricId });
  const seed = hashSeed(`${dashboardId}-${project}-${metricId}`);
  const data: number[] = [];
  const dates: string[] = [];

  // 使用固定的基准日期，避免 SSR/CSR 不一致
  const baseDate = new Date('2026-01-15');

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));

    // 使用确定性的波动
    const randomFactor = seededRandom(seed, i) - 0.5;
    const variation =
      (Math.sin(i * 0.5) * 0.15 + randomFactor * 0.1) * baseValue;
    data.push(Math.max(0, Number((baseValue + variation).toFixed(2))));
  }

  return { dates, data };
};

const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  dashboardId,
  projects,
  competitorProjects = [],
  compareMode = false,
  showAlertButton = true,
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
    const { dates } = generateMockTimeSeriesData(
      dashboardId,
      displayProjects[0] || 'default',
      metric.id
    );

    const series = displayProjects.map((project, idx) => {
      const { data } = generateMockTimeSeriesData(
        dashboardId,
        project,
        metric.id
      );

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
  }, [dashboardId, displayProjects, metric]);

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
          <EChartX loading={false} option={chartOption} containerRef={ref} />
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
