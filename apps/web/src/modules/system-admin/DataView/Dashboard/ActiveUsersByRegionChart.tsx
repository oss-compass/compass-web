import React, { useRef, useEffect } from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as echarts from 'echarts';

interface RegionData {
  key: string;
  country: string;
  activeUsers: number;
}

interface ActiveUsersByRegionChartProps {
  className?: string;
}

const ActiveUsersByRegionChart: React.FC<ActiveUsersByRegionChartProps> = ({
  className,
}) => {
  const mapChartRef = useRef<HTMLDivElement>(null);

  // 模拟数据 - 按国家/地区划分的活跃用户数
  const regionData: RegionData[] = [
    { key: '1', country: 'China', activeUsers: 27000 },
    { key: '2', country: 'Hong Kong', activeUsers: 672 },
    { key: '3', country: 'Germany', activeUsers: 427 },
    { key: '4', country: 'United States', activeUsers: 386 },
    { key: '5', country: 'Singapore', activeUsers: 249 },
    { key: '6', country: 'Japan', activeUsers: 202 },
    { key: '7', country: 'Taiwan', activeUsers: 100 },
  ];

  // 地图数据映射
  const mapData = regionData.map((item) => ({
    name: item.country,
    value: item.activeUsers,
  }));

  // 表格列定义
  const columns: ColumnsType<RegionData> = [
    {
      title: '国家/地区',
      dataIndex: 'country',
      key: 'country',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: '活跃用户',
      dataIndex: 'activeUsers',
      key: 'activeUsers',
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

      // 注册世界地图 - 使用可用的 GeoJSON 数据源
      fetch(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      )
        .then((response) => response.json())
        .then((worldJson) => {
          echarts.registerMap('world', worldJson);

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
                  return `${params.name}<br/>活跃用户: ${displayValue}`;
                }
                return `${params.name}<br/>暂无数据`;
              },
            },
            visualMap: {
              min: 0,
              max: Math.max(...mapData.map((item) => item.value)),
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                color: ['#4096ff', '#0958d9', '#003eb3'],
              },
              textStyle: {
                fontSize: 12,
              },
            },
            series: [
              {
                name: '活跃用户',
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
        })
        .catch((error) => {
          console.error('Failed to load world map data:', error);
          // 如果地图数据加载失败，显示简单的提示
          const fallbackOption = {
            title: {
              text: '地图数据加载中...',
              left: 'center',
              top: 'middle',
              textStyle: {
                fontSize: 16,
                color: '#999',
              },
            },
          };
          mapChart.setOption(fallbackOption);
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
  }, []);

  return (
    <Card
      title="按国家/地区划分的活跃用户"
      className={className}
      extra={
        <span className="text-sm text-gray-500">
          总计:{' '}
          {regionData
            .reduce((sum, item) => sum + item.activeUsers, 0)
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
