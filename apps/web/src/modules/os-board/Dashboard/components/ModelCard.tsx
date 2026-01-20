import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import EChartX from '@common/components/EChartX';
import LoadInView from '@common/components/LoadInView';
import { colors } from '@common/options';
import { shortenAxisLabel } from '@common/utils/format';
import { getMetricValue } from '../../state';

interface ModelCardProps {
  dashboardId: string;
  projects: readonly string[];
  metrics: readonly string[];
}

// 确定性哈希函数
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

// 生成模型综合评分数据
const generateModelScoreData = (
  dashboardId: string,
  project: string,
  metrics: readonly string[],
  days: number = 30
) => {
  const seed = hashSeed(`${dashboardId}-${project}-model`);
  const data: number[] = [];
  const dates: string[] = [];
  const baseDate = new Date('2026-01-15');

  // 计算基础分数（基于所有指标的平均值）
  let baseScore = 0;
  metrics.forEach((metricId) => {
    const value = getMetricValue({ dashboardId, project, metricId });
    baseScore += value;
  });
  baseScore = metrics.length > 0 ? (baseScore / metrics.length) % 100 : 50;
  baseScore = Math.max(30, Math.min(95, baseScore));

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));

    const randomFactor = seededRandom(seed, i) - 0.5;
    const variation = Math.sin(i * 0.3) * 5 + randomFactor * 3;
    data.push(
      Math.max(0, Math.min(100, Number((baseScore + variation).toFixed(2))))
    );
  }

  return { dates, data };
};

const ModelCard: React.FC<ModelCardProps> = ({
  dashboardId,
  projects,
  metrics,
}) => {
  const { t } = useTranslation();

  const displayProjects = useMemo(() => {
    if (projects.length === 0) {
      return ['example/project'];
    }
    return [...projects];
  }, [projects]);

  const chartOption = useMemo(() => {
    const { dates } = generateModelScoreData(
      dashboardId,
      displayProjects[0] || 'default',
      metrics
    );

    const series = displayProjects.map((project, idx) => {
      const { data } = generateModelScoreData(dashboardId, project, metrics);

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
        min: 0,
        max: 100,
        axisLabel: {
          formatter: (value: any) => shortenAxisLabel(value) as string,
        },
      },
      series,
    };
  }, [dashboardId, displayProjects, metrics]);

  const id = `model_card_${dashboardId}`;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={id}
      ref={cardRef}
      className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none"
    >
      <h3 className="group mb-2 text-lg font-semibold text-[#000000]">
        <span className="mr-2 rounded bg-[#F5F0FF] px-2 py-0.5 text-xs font-normal text-[#722ED1]">
          {t('os_board:detail.model_tag')}
        </span>
        {t('os_board:detail.collaboration_dev_index')}
        <a href={`#${id}`}>
          <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
            #
          </span>
        </a>
      </h3>
      <LoadInView containerRef={cardRef} className="relative h-[360px]">
        <EChartX loading={false} option={chartOption} containerRef={cardRef} />
      </LoadInView>
    </div>
  );
};

export default ModelCard;
