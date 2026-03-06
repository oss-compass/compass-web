import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EChartX from '@common/components/EChartX';
import LoadInView from '@common/components/LoadInView';
import { colors } from '@common/options';
import { shortenAxisLabel } from '@common/utils/format';
import { toFixed } from '@common/utils';
import type { ModelScoreData } from '../../api/dashboard';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import transHundredMarkSystem from '@common/transform/transHundredMarkSystem';

interface ModelCardProps {
  modelId: string;
  dashboardId: string;
  projects: readonly string[];
  modelScoresDataMap?: Map<string, ModelScoreData[]>;
  isLoading?: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({
  modelId,
  dashboardId,
  projects,
  modelScoresDataMap,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(true);

  const displayProjects = useMemo(() => {
    if (projects.length === 0) {
      return ['example/project'];
    }
    return [...projects];
  }, [projects]);

  const chartOption = useMemo(() => {
    let dates: string[] = [];
    let overallMax = 0;

    const series = displayProjects.map((project, idx) => {
      const projectModelScores = modelScoresDataMap?.get(project) || [];
      const score = projectModelScores.find((m) => m.ident === modelId);
      const dataPoints = score?.data || [];
      const raw = dataPoints.map((d) => d.value);
      const data = onePointSys
        ? raw
        : raw.map((v) => transHundredMarkSystem(v) as number);

      if (dates.length === 0 && dataPoints.length > 0) {
        dates = dataPoints.map((d) => d.date.slice(0, 7));
      }

      const localMax = data.reduce(
        (m, v) =>
          typeof v === 'number' && Number.isFinite(v) ? Math.max(m, v) : m,
        0
      );
      overallMax = Math.max(overallMax, localMax);

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
        formatter: (params: any) => {
          const items = Array.isArray(params) ? params : [params];
          const axisValue =
            items[0]?.axisValueLabel ?? items[0]?.axisValue ?? '';
          const rows = items.map((p: any) => {
            const raw = Array.isArray(p?.value) ? p.value[1] : p?.value;
            const v = typeof raw === 'number' ? raw : Number(raw);
            const display = (() => {
              if (typeof v !== 'number' || !Number.isFinite(v)) return '-';
              if (Number.isInteger(v)) return String(v);
              return String(toFixed(v, 3));
            })();
            return `${p?.marker ?? ''}${p?.seriesName ?? ''}: ${display}`;
          });
          return [axisValue, ...rows].join('<br/>');
        },
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
        max: onePointSys ? 1 : 100,
        axisLabel: {
          formatter: (value: any) => shortenAxisLabel(value) as string,
        },
      },
      series,
    };
  }, [dashboardId, displayProjects, modelId, modelScoresDataMap, onePointSys]);

  const id = `model_card_${modelId}`;
  const cardRef = useRef<HTMLDivElement>(null);

  // 从 i18n 获取模型标题
  const modelTitle = t(`metrics_models_v2:${modelId}.title`, {
    defaultValue: modelId,
  });

  return (
    <div
      id={id}
      ref={cardRef}
      className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="group text-lg font-semibold text-[#000000]">
          <span className="mr-2 rounded bg-[#F5F0FF] px-2 py-0.5 text-xs font-normal text-[#722ED1]">
            {t('os_board:detail.model_tag')}
          </span>
          {modelTitle}
          <a href={`#${id}`}>
            <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
              #
            </span>
          </a>
        </h3>
        <ScoreConversion onePoint={onePointSys} onChange={setOnePointSys} />
      </div>
      <LoadInView containerRef={cardRef} className="relative h-[360px]">
        <EChartX
          loading={isLoading}
          option={chartOption}
          containerRef={cardRef}
        />
      </LoadInView>
    </div>
  );
};

export default ModelCard;
