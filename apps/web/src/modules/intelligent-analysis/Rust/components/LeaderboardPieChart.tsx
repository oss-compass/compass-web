import React, { useEffect, useMemo, useRef } from 'react';
import { Empty, Spin } from 'antd';
import * as echarts from 'echarts';
import { useTranslation } from 'next-i18next';

import {
  countryMapping,
  translateByLocale,
} from '@modules/intelligent-analysis/DataView/Overview/Project/utils/countryMapping';

import type { RustLeaderboardChartItem, RustLeaderboardType } from '../types';

interface LeaderboardPieChartProps {
  items: RustLeaderboardChartItem[];
  loading?: boolean;
  type: RustLeaderboardType;
}

const PIE_COLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
  '#48b8d0',
  '#d9d9d9',
];

const LeaderboardPieChart: React.FC<LeaderboardPieChartProps> = ({
  items,
  loading = false,
  type,
}) => {
  const { i18n } = useTranslation('intelligent_analysis');
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  const chartTitle =
    type === 'organizations' ? 'Top10组织构成' : 'Top10国家/地区构成';
  const metricLabel = type === 'projects' ? '项目数量' : '开发者数量';

  const displayItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        color: PIE_COLORS[index % PIE_COLORS.length],
        displayName:
          type === 'organizations' || item.name === 'Other'
            ? item.name
            : translateByLocale(item.name, countryMapping, i18n.language),
      })),
    [i18n.language, items, type]
  );

  useEffect(() => {
    if (!chartRef.current || chartInstanceRef.current) {
      return;
    }

    const chart = echarts.init(chartRef.current);
    chartInstanceRef.current = chart;

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (!chart) return;

    chart.setOption(
      {
        animationDuration: 400,
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            const value = Number(params.value || 0).toLocaleString();
            const percent = Number(params.data?.share || 0).toFixed(1);
            return `${params.name}<br/>${metricLabel}：${value}（${percent}%）`;
          },
        },
        legend: {
          type: 'plain',
          orient: 'horizontal',
          bottom: 0,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10,
          textStyle: {
            fontSize: 12,
            color: '#64748b',
          },
          selected: type === 'organizations' ? { Other: false } : {},
        },
        series: [
          {
            type: 'pie',
            radius: ['32%', '58%'],
            // 留出底部 legend 空间，圆心略上移
            center: ['50%', '44%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 2,
            },
            label: {
              show: true,
              formatter: (params: any) => {
                const percent = Number(params.data?.share || 0).toFixed(1);
                const value = Number(params.value || 0).toLocaleString();
                return `{name|${params.name}}\n{val|${value}（${percent}%）}`;
              },
              rich: {
                name: {
                  fontSize: 13,
                  color: '#334155',
                  lineHeight: 18,
                },
                val: {
                  fontSize: 12,
                  color: '#64748b',
                  lineHeight: 17,
                },
              },
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 12,
              smooth: true,
            },
            data: displayItems.map((item) => ({
              name: item.displayName,
              value: item.value,
              share: item.share,
              itemStyle: { color: item.color },
            })),
          },
        ],
      },
      true
    );

    requestAnimationFrame(() => chart.resize());
  }, [displayItems, metricLabel]);

  return (
    <Spin spinning={loading}>
      <div style={{ padding: '4px 0' }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: 4,
          }}
        >
          {chartTitle}
        </div>

        <div style={{ position: 'relative' }}>
          <div
            ref={chartRef}
            style={{
              height: 470,
              width: '100%',
              visibility: displayItems.length === 0 ? 'hidden' : 'visible',
            }}
          />
          {displayItems.length === 0 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty description="暂无图表数据" />
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default LeaderboardPieChart;
