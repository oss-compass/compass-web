import React, { useRef, useEffect, useState } from 'react';
import { Card, Table, message, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as echarts from 'echarts';
import { useUserRegionData } from './hooks/useAdminApi';
import worldZh from '@public/geoData/worldZH.json';

interface RegionData {
  key: string;
  country: string;
  userCount: number;
}

interface ActiveUsersByRegionChartProps {
  className?: string;
}

const ActiveUsersByRegionChart: React.FC<ActiveUsersByRegionChartProps> = ({
  className,
}) => {
  const mapChartRef = useRef<HTMLDivElement>(null);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [activeTab, setActiveTab] = useState<'0' | '1'>('0');

  // 获取用户地区分布数据
  const {
    data: userRegionApiData,
    isLoading,
    error,
  } = useUserRegionData(activeTab);

  // 模拟数据作为后备
  const fallbackRegionData: RegionData[] = [];

  // 处理 API 数据转换
  const processApiData = (
    apiData:
      | Array<{ country: string; value: number; desc: string }>
      | undefined,
    fallbackData: RegionData[]
  ): RegionData[] => {
    if (!apiData || apiData.length === 0) {
      return fallbackData;
    }

    return apiData.map((item, index) => ({
      key: (index + 1).toString(),
      country: item.desc, // 使用 desc 字段显示中文名称
      userCount: item.value,
    }));
  };

  // 错误处理
  useEffect(() => {
    if (error) {
      console.error('获取用户地区数据失败：', error);
      message.error('获取用户地区数据失败');
    }
  }, [error]);

  // 数据处理
  useEffect(() => {
    const processedData = processApiData(userRegionApiData, fallbackRegionData);
    setRegionData(processedData);
  }, [userRegionApiData]);

  // 地图数据映射 - 使用中文名称匹配地图
  const mapData = regionData
    .filter(
      (item) =>
        item.country && item.userCount !== undefined && item.userCount !== null
    )
    .map((item) => ({
      name: item.country, // 已经是中文名称（desc 字段）
      value: item.userCount || 0,
    }));

  // 获取当前标签页的标题和描述
  const getTabInfo = () => {
    switch (activeTab) {
      case '0':
        return {
          title: '活跃用户',
          description: '活跃用户数',
        };
      case '1':
        return {
          title: '新增用户',
          description: '新增用户数',
        };
      default:
        return {
          title: '活跃用户',
          description: '活跃用户数',
        };
    }
  };

  const tabInfo = getTabInfo();

  // 表格列定义
  const columns: ColumnsType<RegionData> = [
    {
      title: '国家/地区',
      dataIndex: 'country',
      key: 'country',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: tabInfo.description,
      dataIndex: 'userCount',
      key: 'userCount',
      width: 120,
      render: (count: number) => (
        <span className="font-medium text-blue-600">
          {count >= 10000
            ? `${(count / 10000).toFixed(1)}万`
            : count.toLocaleString()}
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (mapChartRef.current) {
      const mapChart = echarts.init(mapChartRef.current);

      // 注册世界地图 - 使用导入的 GeoJSON 数据
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
              return `${params.name}<br/>${tabInfo.description}：${
                displayValue || 0
              }`;
            }
            return `${params.name}<br/>暂无数据`;
          },
        },
        visualMap: {
          min: 0,
          max: (() => {
            const validValues = mapData
              .map((item) => item.value)
              .filter((v) => v !== undefined && v !== null && v > 0);
            return validValues.length > 0 ? Math.max(...validValues) : 1;
          })(),
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
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
                show: true,
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
  }, [mapData, tabInfo]); // 依赖 mapData 和 tabInfo，当数据或标签页变化时重新渲染地图

  // 标签页配置
  const tabItems = [
    {
      key: '0',
      label: '活跃用户',
    },
    {
      key: '1',
      label: '新增用户',
    },
  ];

  return (
    <Card
      title="按国家/地区划分的用户"
      tabList={tabItems}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key as '0' | '1')}
      className={className}
      loading={isLoading}
      extra={
        <span className="text-sm text-gray-500">
          总计:{' '}
          {regionData
            .reduce((sum, item) => sum + item.userCount, 0)
            .toLocaleString()}{' '}
          用户
        </span>
      }
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

export default ActiveUsersByRegionChart;
