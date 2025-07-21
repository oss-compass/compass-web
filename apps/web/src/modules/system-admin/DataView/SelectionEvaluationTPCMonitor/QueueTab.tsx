import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Tag, Progress } from 'antd';
import * as echarts from 'echarts';

interface QueueData {
  key: string;
  queueName: string;
  taskCount: number;
  totalQueues: number;
  giteeQueues: {
    active: number;
    total: number;
  };
  casQueues: {
    active: number;
    total: number;
  };
  njuQueues: {
    active: number;
    total: number;
  };
  pkuQueues: {
    active: number;
    total: number;
  };
  queueType: 'TPC队列' | 'TPC优先队列';
}

// 图表数据类型
interface ChartData {
  xAxisData: string[];
  seriesData: number[][];
  seriesNames: string[];
}

// Tab类型
type ChartTabKey = 'all' | 'tpc' | 'tpc-priority';

// Tab配置
const chartTabList = [
  { key: 'all', tab: '所有队列' },
  { key: 'tpc', tab: 'TPC队列' },
  { key: 'tpc-priority', tab: 'TPC优先队列' },
];

const QueueTab: React.FC = () => {
  // 生成队列数据
  const generateQueueData = (): QueueData[] => {
    const queueTypes: QueueData['queueType'][] = ['TPC队列', 'TPC优先队列'];

    return queueTypes.map((type, index) => ({
      key: (index + 1).toString(),
      queueName: type,
      taskCount: Math.floor(Math.random() * 500) + 50,
      totalQueues: Math.floor(Math.random() * 20) + 10,
      giteeQueues: {
        active: Math.floor(Math.random() * 8) + 2,
        total: Math.floor(Math.random() * 5) + 10,
      },
      casQueues: {
        active: Math.floor(Math.random() * 6) + 1,
        total: Math.floor(Math.random() * 3) + 8,
      },
      njuQueues: {
        active: Math.floor(Math.random() * 5) + 1,
        total: Math.floor(Math.random() * 3) + 6,
      },
      pkuQueues: {
        active: Math.floor(Math.random() * 4) + 1,
        total: Math.floor(Math.random() * 2) + 5,
      },
      queueType: type,
    }));
  };

  const [queueData, setQueueData] = useState<QueueData[]>(generateQueueData());
  const [activeChartTab, setActiveChartTab] = useState<ChartTabKey>('all');
  const chartRef = useRef<HTMLDivElement>(null);

  // 生成图表数据
  const generateChartData = (tabKey: ChartTabKey): ChartData => {
    // 生成最近7天的日期
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
      });
    });

    // 根据不同tab生成不同的数据
    const generateSeriesData = () => {
      const baseData = {
        join: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 100) + 20
        ),
        consume: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 80) + 10
        ),
        total: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 200) + 100
        ),
      };

      // 根据tab类型调整数据规模
      const multiplier = tabKey === 'all' ? 1 : 0.6;

      return {
        join: baseData.join.map((val) => Math.floor(val * multiplier)),
        consume: baseData.consume.map((val) => Math.floor(val * multiplier)),
        total: baseData.total.map((val) => Math.floor(val * multiplier)),
      };
    };

    const seriesData = generateSeriesData();

    return {
      xAxisData: dates,
      seriesData: [seriesData.join, seriesData.consume, seriesData.total],
      seriesNames: ['项目加入数量', '项目消费数量', '项目总数量'],
    };
  };

  // 计算总计数据
  const calculateSummary = (data: QueueData[]) => {
    return data.reduce(
      (acc, item) => ({
        taskCount: acc.taskCount + item.taskCount,
        totalQueues: acc.totalQueues + item.totalQueues,
        giteeQueues: {
          active: acc.giteeQueues.active + item.giteeQueues.active,
          total: acc.giteeQueues.total + item.giteeQueues.total,
        },
        casQueues: {
          active: acc.casQueues.active + item.casQueues.active,
          total: acc.casQueues.total + item.casQueues.total,
        },
        njuQueues: {
          active: acc.njuQueues.active + item.njuQueues.active,
          total: acc.njuQueues.total + item.njuQueues.total,
        },
        pkuQueues: {
          active: acc.pkuQueues.active + item.pkuQueues.active,
          total: acc.pkuQueues.total + item.pkuQueues.total,
        },
      }),
      {
        taskCount: 0,
        totalQueues: 0,
        giteeQueues: { active: 0, total: 0 },
        casQueues: { active: 0, total: 0 },
        njuQueues: { active: 0, total: 0 },
        pkuQueues: { active: 0, total: 0 },
      }
    );
  };

  // 渲染队列状态
  const renderQueueStatus = (active: number, total: number) => {
    const percentage = Math.round((active / total) * 100);
    const color =
      percentage > 80 ? '#ff4d4f' : percentage > 50 ? '#faad14' : '#52c41a';

    return (
      <div className="flex items-center gap-2">
        <div>
          {active}/{total}
        </div>
        <div className="pb-1.5">
          <Progress
            showInfo={false}
            percent={percentage}
            strokeColor={color}
            size={[40, 4]}
          />
        </div>
      </div>
    );
  };

  // 获取队列类型标签颜色
  const getQueueTypeColor = (type: QueueData['queueType']) => {
    switch (type) {
      case 'TPC队列':
        return 'blue';
      case 'TPC优先队列':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '队列名称',
      dataIndex: 'queueName',
      key: 'queueName',
      width: '15%',
      render: (text: string, record: QueueData) => (
        <div>
          <Tag color={getQueueTypeColor(record.queueType)}>
            {record.queueType}
          </Tag>
        </div>
      ),
    },
    {
      title: '任务数量',
      dataIndex: 'taskCount',
      key: 'taskCount',
      width: '10%',
      render: (count: number) => (
        <span className="font-medium text-blue-600">{count}</span>
      ),
    },
    {
      title: '队列总数',
      dataIndex: 'totalQueues',
      key: 'totalQueues',
      width: '10%',
    },
    {
      title: 'Gitee队列',
      key: 'giteeQueues',
      width: '16%',
      render: (_, record: QueueData) =>
        renderQueueStatus(record.giteeQueues.active, record.giteeQueues.total),
    },
    {
      title: 'CAS队列',
      key: 'casQueues',
      width: '16%',
      render: (_, record: QueueData) =>
        renderQueueStatus(record.casQueues.active, record.casQueues.total),
    },
    {
      title: 'NJU队列',
      key: 'njuQueues',
      width: '16%',
      render: (_, record: QueueData) =>
        renderQueueStatus(record.njuQueues.active, record.njuQueues.total),
    },
    {
      title: 'PKU队列',
      key: 'pkuQueues',
      width: '16%',
      render: (_, record: QueueData) =>
        renderQueueStatus(record.pkuQueues.active, record.pkuQueues.total),
    },
  ];

  // 初始化图表
  useEffect(() => {
    const initChart = () => {
      if (chartRef.current) {
        const container = chartRef.current;

        // 检查容器尺寸
        if (container.clientWidth === 0 || container.clientHeight === 0) {
          setTimeout(initChart, 100);
          return;
        }

        const chart = echarts.init(container);
        const chartData = generateChartData(activeChartTab);

        const option = {
          title: {
            text: '队列趋势图',
            left: 'center',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: chartData.seriesNames,
            bottom: 10,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: chartData.xAxisData,
            axisLine: {
              lineStyle: {
                color: '#e8e8e8',
              },
            },
            axisLabel: {
              color: '#666',
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#e8e8e8',
              },
            },
            axisLabel: {
              color: '#666',
            },
            splitLine: {
              lineStyle: {
                color: '#f0f0f0',
              },
            },
          },
          series: chartData.seriesNames.map((name, index) => ({
            name,
            type: 'line',
            data: chartData.seriesData[index],
            smooth: true,
            lineStyle: {
              width: 2,
            },
            symbol: 'circle',
            symbolSize: 6,
          })),
        };

        chart.setOption(option);

        // 清理函数
        return () => {
          chart.dispose();
        };
      }
    };

    const cleanup = initChart();
    return cleanup;
  }, [activeChartTab]);

  // 定时更新数据
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData(generateQueueData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const summary = calculateSummary(queueData);

  return (
    <div className="mt-4 space-y-6">
      {/* 队列详情表格 */}
      <Card title="队列详情">
        <Table
          columns={columns}
          dataSource={queueData}
          pagination={false}
          size="middle"
        />
      </Card>

      {/* 图表区域 */}
      <Card
        title="队列趋势分析"
        tabList={chartTabList}
        activeTabKey={activeChartTab}
        onTabChange={(key) => setActiveChartTab(key as ChartTabKey)}
      >
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      </Card>
    </div>
  );
};

export default QueueTab;
