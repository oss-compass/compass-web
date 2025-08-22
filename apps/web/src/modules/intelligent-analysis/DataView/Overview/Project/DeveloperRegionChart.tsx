// autocorrect: false
import React, { useRef, useEffect, useState } from 'react';
import { Card, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import * as echarts from 'echarts';
import worldZh from '@public/geoData/worldZH.json';
import { DeveloperData } from '../types';
import { translateByLocale, countryMapping } from './utils/countryMapping';

interface RegionData {
  key: string;
  country: string;
  userCount: number;
}

interface DeveloperRegionChartProps {
  className?: string;
  data: DeveloperData[];
}

const DeveloperRegionChart: React.FC<DeveloperRegionChartProps> = ({
  className,
  data,
}) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const mapChartRef = useRef<HTMLDivElement>(null);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'org' | 'developer'>(
    'all'
  );

  // 处理数据转换
  const processData = (
    sourceData: DeveloperData[],
    filterType: string
  ): RegionData[] => {
    if (!sourceData || sourceData.length === 0) {
      return [];
    }

    // 根据 Tab 筛选数据
    let filteredData = sourceData;
    if (filterType === 'org') {
      filteredData = sourceData.filter((item) => item.用户类型 === '组织');
    } else if (filterType === 'developer') {
      filteredData = sourceData.filter((item) => item.用户类型 === '开发者');
    }

    // 按国家分组统计
    const countryMap = new Map<string, number>();
    filteredData.forEach((item) => {
      if (item.国家) {
        countryMap.set(item.国家, (countryMap.get(item.国家) || 0) + 1);
      }
    });

    // 转换为数组格式
    const result: RegionData[] = [];
    countryMap.forEach((count, country) => {
      result.push({
        key: country,
        country: country,
        userCount: count,
      });
    });

    // 按用户数量降序排序，但将"未知"和"东八区"排到最后
    return result.sort((a, b) => {
      const specialCountries = ['未知', '东八区'];
      const aIsSpecial = specialCountries.includes(a.country);
      const bIsSpecial = specialCountries.includes(b.country);

      // 如果一个是特殊国家，一个不是，特殊国家排后面
      if (aIsSpecial && !bIsSpecial) return 1;
      if (!aIsSpecial && bIsSpecial) return -1;

      // 都是特殊国家或都不是，按用户数量降序排序
      return b.userCount - a.userCount;
    });
  };

  // 数据处理
  useEffect(() => {
    const processedData = processData(data, activeTab);
    setRegionData(processedData);
  }, [data, activeTab]);

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

  // 获取用于计算 visualMap 的数据（排除"未知"和"东八区"）
  const getValidMapData = () => {
    const excludeCountries = ['未知', '东八区'];
    return mapData.filter((item) => !excludeCountries.includes(item.name));
  };

  // 获取当前标签页的标题和描述
  const getTabInfo = () => {
    switch (activeTab) {
      case 'all':
        return {
          title: t('project_detail.region_chart.all'),
          description: t('project_detail.region_chart.count'),
        };
      case 'org':
        return {
          title: t('project_detail.region_chart.organization'),
          description: t('project_detail.region_chart.organization_count'),
        };
      case 'developer':
        return {
          title: t('project_detail.region_chart.developer'),
          description: t('project_detail.region_chart.developer_count'),
        };
      default:
        return {
          title: t('project_detail.region_chart.all'),
          description: t('project_detail.region_chart.count'),
        };
    }
  };

  const tabInfo = getTabInfo();

  // 表格列定义
  const columns: ColumnsType<RegionData> = [
    {
      title: t('project_detail.region_chart.country_region'),
      dataIndex: 'country',
      key: 'country',
      render: (text: string) => (
        <span className="font-medium">
          {translateByLocale(text, countryMapping, i18n.language)}
        </span>
      ),
    },
    {
      title: tabInfo.description,
      dataIndex: 'userCount',
      key: 'userCount',
      width: 80,
      render: (count: number) => (
        <span className="font-medium text-blue-600">
          {count.toLocaleString()}
        </span>
      ),
    },
  ];

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
              const translatedName = translateByLocale(params.name, countryMapping, i18n.language);
              return `${translatedName}<br/>${tabInfo.description}：${displayValue || 0
                }`;
            }
            const translatedName = translateByLocale(params.name, countryMapping, i18n.language);
            return `${translatedName}<br/>${t('project_detail.region_chart.no_data')}`;
          },
        },
        visualMap: {
          min: 0,
          max: (() => {
            const validMapData = getValidMapData();
            const validValues = validMapData
              .map((item) => item.value)
              .filter((v) => v !== undefined && v !== null && v > 0);
            return validValues.length > 0 ? Math.max(...validValues) : 1;
          })(),
          left: 'left',
          top: 'bottom',
          text: [t('project_detail.region_chart.high'), t('project_detail.region_chart.low')],
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
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0.5,
            },
            data: mapData,
          },
        ],
      };

      mapChart.setOption(mapOption);

      const handleMapResize = () => {
        mapChart.resize();
      };

      window.addEventListener('resize', handleMapResize);

      return () => {
        window.removeEventListener('resize', handleMapResize);
        mapChart.dispose();
      };
    }
  }, [mapData, tabInfo]);

  // 计算各类型的数据统计
  const getTabStats = () => {
    const allCount = data.reduce((sum, item) => sum + 1, 0);
    const orgCount = data.filter((item) => item.用户类型 === '组织').length;
    const developerCount = data.filter(
      (item) => item.用户类型 === '开发者'
    ).length;

    return {
      all: allCount,
      org: orgCount,
      developer: developerCount,
    };
  };

  const tabStats = getTabStats();

  // 标签页配置
  const tabItems = [
    {
      key: 'all',
      label: (
        <span className="flex items-center gap-2">
          <span>{t('project_detail.region_chart.all')}</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
            {tabStats.all.toLocaleString()}
          </span>
        </span>
      ),
    },
    {
      key: 'org',
      label: (
        <span className="flex items-center gap-2">
          <span>{t('project_detail.region_chart.organization')}</span>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
            {tabStats.org.toLocaleString()}
          </span>
        </span>
      ),
    },
    {
      key: 'developer',
      label: (
        <span className="flex items-center gap-2">
          <span>{t('project_detail.region_chart.developer')}</span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            {tabStats.developer.toLocaleString()}
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
      onTabChange={(key) => setActiveTab(key as 'all' | 'org' | 'developer')}
      className={className}
    >
      <div className="flex h-full">
        {/* 地图区域 */}
        <div className="flex-1">
          <div ref={mapChartRef} className="h-80 w-full"></div>
        </div>

        {/* 右侧数据表格 */}
        <div className="ml-4 w-64">
          <Table
            columns={columns}
            dataSource={regionData}
            pagination={false}
            size="small"
            scroll={{ y: 300 }}
            className="border-l border-gray-200 pl-4"
          />
        </div>
      </div>
    </Card>
  );
};

export default DeveloperRegionChart;
