// autocorrect: false
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Card, Spin } from 'antd';
import { useTranslation } from 'next-i18next';
import * as echarts from 'echarts';
import worldZh from '@public/geoData/worldZH.json';
import { translateByLocale, countryMapping } from './utils/countryMapping';
import { useQuery } from '@tanstack/react-query';
import { PROJECT_NAME_MAP } from '../utils';

interface RegionData {
  key: string;
  country: string;
  userCount: number;
}

interface DeveloperRegionChartProps {
  className?: string;
  projectType: string;
  loading?: boolean;
  selectedRegions?: string[];
  onRegionFilterChange?: (regions: string[]) => void;
}

const DeveloperRegionChart: React.FC<DeveloperRegionChartProps> = ({
  className,
  projectType,
  loading = false,
  selectedRegions = [],
  onRegionFilterChange,
}) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const mapChartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const selectedRegionsRef = useRef<string[]>(selectedRegions);
  const onRegionFilterChangeRef =
    useRef<DeveloperRegionChartProps['onRegionFilterChange']>(
      onRegionFilterChange
    );
  const [activeTab, setActiveTab] = useState<
    'all' | 'individual' | 'org_devs' | 'org_count'
  >('all');
  const dataset = PROJECT_NAME_MAP[projectType] || projectType;

  const { data: apiData, isFetching: apiLoading } = useQuery({
    queryKey: ['intelligent-analysis', 'regions', dataset, activeTab],
    queryFn: async () => {
      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/regions?metric=${encodeURIComponent(activeTab)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch regions: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const regionData: RegionData[] = Array.isArray(apiData?.items)
    ? apiData.items
    : [];

  const computedLoading = loading || apiLoading;

  // 地图数据映射
  const mapData = regionData
    .filter(
      (item) =>
        item.country && item.userCount !== undefined && item.userCount !== null
    )
    .map((item) => ({
      name: item.country,
      value: item.userCount || 0,
    }));

  const visualMapMax = useMemo(() => {
    const excludeCountries = ['未知', '东八区'];
    const validValues = mapData
      .filter((item) => !excludeCountries.includes(item.name))
      .map((item) => item.value)
      .filter((v) => v !== undefined && v !== null && v > 0);
    return validValues.length > 0 ? Math.max(...validValues) : 1;
  }, [mapData]);

  // 获取当前标签页的标题和描述
  const getTabInfo = () => {
    switch (activeTab) {
      case 'all':
        return {
          title: t('project_detail.region_chart.all_developers'),
          description: t('project_detail.region_chart.developer_count'),
        };
      case 'individual':
        return {
          title: t('project_detail.region_chart.individual_developers'),
          description: t('project_detail.region_chart.developer_count'),
        };
      case 'org_devs':
        return {
          title: t('project_detail.region_chart.organization_developers'),
          description: t('project_detail.region_chart.developer_count'),
        };
      case 'org_count':
        return {
          title: t('project_detail.region_chart.organization_count_label'),
          description: t('project_detail.region_chart.organization_count'),
        };
      default:
        return {
          title: t('project_detail.region_chart.all_developers'),
          description: t('project_detail.region_chart.developer_count'),
        };
    }
  };

  const tabInfo = getTabInfo();

  useEffect(() => {
    selectedRegionsRef.current = selectedRegions;
  }, [selectedRegions]);

  useEffect(() => {
    onRegionFilterChangeRef.current = onRegionFilterChange;
  }, [onRegionFilterChange]);

  useEffect(() => {
    if (!mapChartRef.current) return;
    if (chartInstanceRef.current) return;

    echarts.registerMap('world', worldZh as any);
    const chart = echarts.init(mapChartRef.current);
    chartInstanceRef.current = chart;

    chart.on('click', (params: any) => {
      const handler = onRegionFilterChangeRef.current;
      if (!params?.name || !handler) return;
      const clickedRegion = String(params.name);
      const currentSelected = selectedRegionsRef.current || [];
      const newSelectedRegions = currentSelected.includes(clickedRegion)
        ? currentSelected.filter((region) => region !== clickedRegion)
        : [...currentSelected, clickedRegion];
      handler(newSelectedRegions);
    });

    const handleMapResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleMapResize);

    requestAnimationFrame(() => chart.resize());

    return () => {
      window.removeEventListener('resize', handleMapResize);
      chart.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (!chart) return;

    const mapOption = {
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          if (params.data) {
            const value = params.data.value;
            const displayValue =
              value >= 10000
                ? `${(value / 10000).toFixed(1)}万`
                : value?.toLocaleString();
            const translatedName = translateByLocale(
              params.name,
              countryMapping,
              i18n.language
            );
            return `${translatedName}<br/>${tabInfo.description}：${displayValue || 0
              }`;
          }
          const translatedName = translateByLocale(
            params.name,
            countryMapping,
            i18n.language
          );
          return `${translatedName}<br/>${t(
            'project_detail.region_chart.no_data'
          )}`;
        },
      },
      visualMap: {
        min: 0,
        max: visualMapMax,
        left: 'left',
        top: 'bottom',
        text: [
          t('project_detail.region_chart.high'),
          t('project_detail.region_chart.low'),
        ],
        calculable: true,
        inRange: {
          color: ['#aecbfa', '#0958d9', '#003eb3'],
        },
        textStyle: {
          fontSize: 12,
        },
      },
      series: [
        {
          name: tabInfo.description,
          type: 'map',
          map: 'world',
          roam: true,
          zoom: 1.2,
          selectedMode: 'multiple',
          scaleLimit: {
            min: 0.8,
            max: 3,
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 12,
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
    };

    chart.setOption(mapOption, true);
    requestAnimationFrame(() => chart.resize());
  }, [i18n.language, mapData, selectedRegions, t, tabInfo, visualMapMax]);

  const tabStats = apiData?.stats;

  // 标签页配置
  const tabItems = [
    {
      key: 'all',
      label: (
        <span className="flex items-center gap-2">
          <span>{t('project_detail.region_chart.all_developers')}</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
            {(tabStats?.all ?? 0).toLocaleString()}
          </span>
        </span>
      ),
    },
    {
      key: 'individual',
      label: (
        <span className="flex items-center gap-2">
          <span>{t('project_detail.region_chart.individual_developers')}</span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            {(tabStats?.individual ?? 0).toLocaleString()}
          </span>
        </span>
      ),
    },
    {
      key: 'org_devs',
      label: (
        <span className="flex items-center gap-2">
          <span>
            {t('project_detail.region_chart.organization_developers')}
          </span>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
            {(tabStats?.orgDevs ?? 0).toLocaleString()}
          </span>
        </span>
      ),
    },
    {
      key: 'org_count',
      label: (
        <span className="flex items-center gap-2">
          <span>
            {t('project_detail.region_chart.organization_count_label')}
          </span>
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {(tabStats?.orgCount ?? 0).toLocaleString()}
          </span>
        </span>
      ),
    },
  ];

  const shouldShowTabs = !!tabStats;

  return (
    <Spin spinning={computedLoading}>
      <Card
        title={t('project_detail.region_chart.title')}
        tabList={shouldShowTabs ? tabItems : undefined}
        activeTabKey={shouldShowTabs ? activeTab : undefined}
        onTabChange={
          shouldShowTabs
            ? (key) =>
              setActiveTab(
                key as 'all' | 'individual' | 'org_devs' | 'org_count'
              )
            : undefined
        }
        className={className ? `w-full ${className}` : 'w-full'}
      >
        <div className="flex h-[484px]">
          {/* 地图区域 */}
          <div className="flex-1">
            <div ref={mapChartRef} className="h-full w-full"></div>
          </div>

          {/* 右侧数据表格 */}
          {/* <div className="ml-4 w-64">
            <Table
              columns={columns}
              dataSource={filteredRegionData}
              pagination={false}
              size="small"
              scroll={{ y: 300 }}
              className="border-l border-gray-200 pl-4"
            />
          </div> */}
        </div>
      </Card>
    </Spin>
  );
};

export default DeveloperRegionChart;
