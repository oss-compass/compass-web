import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Empty, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import { useTranslation } from 'next-i18next';

import worldZh from '@public/geoData/worldZH.json';
import {
  countryMapping,
  translateByLocale,
} from '@modules/intelligent-analysis/DataView/Overview/Project/utils/countryMapping';

import type {
  RustOverviewResponse,
  RustRegionRow,
  RustRegionTab,
} from '../types';

interface RegionDistributionCardProps {
  data?: RustOverviewResponse;
  loading?: boolean;
  selectedRegions: string[];
  onRegionFilterChange: (regions: string[]) => void;
}

const EXCLUDED_VISUAL_MAP_REGIONS = ['未知', '东八区'];

const RegionDistributionCard: React.FC<RegionDistributionCardProps> = ({
  data,
  loading = false,
  selectedRegions,
  onRegionFilterChange,
}) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [activeTab, setActiveTab] = useState<RustRegionTab>('developers');
  const mapChartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const selectedRegionsRef = useRef<string[]>(selectedRegions);
  const onRegionFilterChangeRef = useRef(onRegionFilterChange);

  const activeRows = useMemo<RustRegionRow[]>(() => {
    if (!data) return [];
    return data.distributions[activeTab] || [];
  }, [activeTab, data]);

  const mapData = useMemo(
    () =>
      activeRows.map((row) => ({
        name: row.国家,
        value: row.数量,
      })),
    [activeRows]
  );

  const visualMapMax = useMemo(() => {
    const validValues = mapData
      .filter((item) => !EXCLUDED_VISUAL_MAP_REGIONS.includes(item.name))
      .map((item) => item.value)
      .filter((value) => value > 0);

    return validValues.length > 0 ? Math.max(...validValues) : 1;
  }, [mapData]);

  const countLabel =
    activeTab === 'projects'
      ? '项目数量'
      : t('project_detail.region_chart.developer_count');

  useEffect(() => {
    selectedRegionsRef.current = selectedRegions;
  }, [selectedRegions]);

  useEffect(() => {
    onRegionFilterChangeRef.current = onRegionFilterChange;
  }, [onRegionFilterChange]);

  useEffect(() => {
    if (!mapChartRef.current || chartInstanceRef.current) {
      return;
    }

    echarts.registerMap('world', worldZh as any);
    const chart = echarts.init(mapChartRef.current);
    chartInstanceRef.current = chart;

    chart.on('click', (params: any) => {
      if (!params?.name) return;
      const currentSelected = selectedRegionsRef.current || [];
      const clickedRegion = String(params.name);
      const nextRegions = currentSelected.includes(clickedRegion)
        ? currentSelected.filter((region) => region !== clickedRegion)
        : [...currentSelected, clickedRegion];

      onRegionFilterChangeRef.current(nextRegions);
    });

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
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            const translatedName = translateByLocale(
              params.name,
              countryMapping,
              i18n.language
            );

            if (!params.data) {
              return `${translatedName}<br/>${t(
                'project_detail.region_chart.no_data'
              )}`;
            }

            return `${translatedName}<br/>${countLabel}：${Number(
              params.data.value || 0
            ).toLocaleString()}`;
          },
        },
        visualMap: {
          min: 0,
          max: visualMapMax,
          left: 'left',
          bottom: 8,
          text: [
            t('project_detail.region_chart.high'),
            t('project_detail.region_chart.low'),
          ],
          calculable: true,
          inRange: {
            color: ['#aecbfa', '#0958d9', '#003eb3'],
          },
          textStyle: {
            color: '#64748b',
            fontSize: 12,
          },
        },
        series: [
          {
            name: countLabel,
            type: 'map',
            map: 'world',
            roam: true,
            zoom: 1.15,
            selectedMode: 'multiple',
            scaleLimit: {
              min: 0.8,
              max: 3,
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '#ffa500',
              },
            },
            select: {
              itemStyle: {
                areaColor: '#52c41a',
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0.5,
            },
            data: mapData.map((item) => ({
              ...item,
              selected: selectedRegions.includes(item.name),
            })),
          },
        ],
      },
      true
    );

    requestAnimationFrame(() => chart.resize());
  }, [countLabel, i18n.language, mapData, selectedRegions, t, visualMapMax]);

  const tabItems = [
    {
      key: 'developers',
      label: '开发者分布',
    },
    {
      key: 'projects',
      label: '项目分布',
    },
  ];

  return (
    <Card
      title="国家/地区分布地图"
      className="mb-6"
      tabList={tabItems}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key as RustRegionTab)}
      extra={
        selectedRegions.length > 0 ? (
          <Button
            size="small"
            icon={<ReloadOutlined />}
            onClick={() => onRegionFilterChange([])}
          >
            清空筛选（{selectedRegions.length}）
          </Button>
        ) : null
      }
    >
      <Spin spinning={loading}>
        <div className="relative">
          <div
            ref={mapChartRef}
            className="h-[420px] w-full"
            style={{
              visibility: activeRows.length === 0 ? 'hidden' : 'visible',
            }}
          />
          {activeRows.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Empty description="暂无地区分布数据" />
            </div>
          )}
        </div>
      </Spin>
    </Card>
  );
};

export default RegionDistributionCard;
