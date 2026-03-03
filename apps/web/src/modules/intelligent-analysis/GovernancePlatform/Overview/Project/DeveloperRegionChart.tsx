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
    if (mapChartRef.current) {
      const mapChart = echarts.init(mapChartRef.current);

      // 注册世界地图
      echarts.registerMap('world', worldZh as any);

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
              return `${translatedName}<br/>${tabInfo.description}：${
                displayValue || 0
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

      mapChart.setOption(mapOption);

      // 添加地图点击事件处理
      mapChart.on('click', (params: any) => {
        if (params.name && onRegionFilterChange) {
          const clickedRegion = params.name;
          const newSelectedRegions = selectedRegions.includes(clickedRegion)
            ? selectedRegions.filter((region) => region !== clickedRegion)
            : [...selectedRegions, clickedRegion];
          onRegionFilterChange(newSelectedRegions);
        }
      });

      const handleMapResize = () => {
        mapChart.resize();
      };

      window.addEventListener('resize', handleMapResize);

      return () => {
        window.removeEventListener('resize', handleMapResize);
        mapChart.dispose();
      };
    }
  }, [
    i18n.language,
    mapData,
    onRegionFilterChange,
    selectedRegions,
    t,
    tabInfo,
    visualMapMax,
  ]);

  const tabStats = apiData?.stats || {
    all: 0,
    individual: 0,
    orgDevs: 0,
    orgCount: 0,
  };

  // 标签页配置
  const tabItems = [
    {
      key: 'all',
      label: (
        <span className="flex items-center gap-2">
          <span>{t('project_detail.region_chart.all_developers')}</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
            {tabStats.all.toLocaleString()}
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
            {tabStats.individual.toLocaleString()}
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
            {tabStats.orgDevs.toLocaleString()}
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
            {tabStats.orgCount.toLocaleString()}
          </span>
        </span>
      ),
    },
  ];

  return (
    <Card
      title={t('project_detail.region_chart.title')}
      tabList={tabItems}
      activeTabKey={activeTab}
      onTabChange={(key) =>
        setActiveTab(key as 'all' | 'individual' | 'org_devs' | 'org_count')
      }
      className={className}
    >
      <Spin spinning={loading || apiLoading}>
        <div className="flex h-[460px]">
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
      </Spin>
    </Card>
  );
};

export default DeveloperRegionChart;
