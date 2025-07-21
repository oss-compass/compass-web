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
  queueType: '仓库队列' | '社区队列' | '仓库优先队列' | '社区优先队列';
}

// 图表数据类型
interface ChartData {
  xAxisData: string[];
  seriesData: number[][];
  seriesNames: string[];
}

// Tab类型
type ChartTabKey =
  | 'all'
  | 'repository'
  | 'community'
  | 'repository-priority'
  | 'community-priority';

// Tab配置
const chartTabList = [
  { key: 'all', tab: '所有队列' },
  { key: 'repository', tab: '仓库队列' },
  { key: 'community', tab: '社区队列' },
  { key: 'repository-priority', tab: '仓库优先队列' },
  { key: 'community-priority', tab: '社区优先队列' },
];

const QueueTab: React.FC = () => {
  // 生成队列数据
  const generateQueueData = (): QueueData[] => {
    const queueTypes: QueueData['queueType'][] = [
      '仓库队列',
      '社区队列',
      '仓库优先队列',
      '社区优先队列',
    ];

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
      case '仓库队列':
        return 'blue';
      case '社区队列':
        return 'green';
      case '仓库优先队列':
        return 'orange';
      case '社区优先队列':
        return 'purple';
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
      width: '12%',
      render: (count: number) => (
        <span className="font-medium text-blue-600">{count}</span>
      ),
    },
    {
      title: '总队列数量',
      dataIndex: 'totalQueues',
      key: 'totalQueues',
      width: '12%',
      render: (count: number) => <span className="font-medium">{count}</span>,
    },
    {
      title: 'Gitee队列数量(活跃/总)',
      dataIndex: 'giteeQueues',
      key: 'giteeQueues',
      width: '18%',
      render: (queues: QueueData['giteeQueues']) =>
        renderQueueStatus(queues.active, queues.total),
    },
    {
      title: '中科院队列数量(活跃/总)',
      dataIndex: 'casQueues',
      key: 'casQueues',
      width: '18%',
      render: (queues: QueueData['casQueues']) =>
        renderQueueStatus(queues.active, queues.total),
    },
    {
      title: '南大队列数量(活跃/总)',
      dataIndex: 'njuQueues',
      key: 'njuQueues',
      width: '16%',
      render: (queues: QueueData['njuQueues']) =>
        renderQueueStatus(queues.active, queues.total),
    },
    {
      title: '北大队列数量(活跃/总)',
      dataIndex: 'pkuQueues',
      key: 'pkuQueues',
      width: '16%',
      render: (queues: QueueData['pkuQueues']) =>
        renderQueueStatus(queues.active, queues.total),
    },
  ];

  // 定时更新数据
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData(generateQueueData());
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, []);

  // 图表初始化和更新
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const chartData = generateChartData(activeChartTab);

      // 颜色配置
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];

      const option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '12%',
          containLabel: true,
        },
        legend: {
          top: '0',
          left: 'center',
          data: chartData.seriesNames,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: chartData.xAxisData,
          axisLine: {
            lineStyle: {
              color: '#e5e7eb',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#6b7280',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#6b7280',
          },
          splitLine: {
            lineStyle: {
              color: '#f3f4f6',
            },
          },
        },
        series: chartData.seriesData.map((data, index) => ({
          name: chartData.seriesNames[index],
          data: data,
          type: 'line',
          smooth: true,
          symbolSize: 6,
          lineStyle: {
            color: colors[index],
            width: 2,
          },
          itemStyle: {
            color: colors[index],
          },
        })),
      };

      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [activeChartTab]);

  // Tab切换处理
  const handleChartTabChange = (key: string) => {
    setActiveChartTab(key as ChartTabKey);
  };

  return (
    <>
      <Card title="队列监控" className="mt-4">
        <Table
          columns={columns}
          dataSource={queueData}
          pagination={false}
          scroll={{ x: 1000 }}
          size="middle"
          summary={() => {
            const summaryData = calculateSummary(queueData);
            return (
              <Table.Summary.Row
                style={{ backgroundColor: '#fafafa', fontWeight: 'bold' }}
              >
                <Table.Summary.Cell index={0}>
                  <span className="font-bold">总计</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span className="font-bold text-blue-600">
                    {summaryData.taskCount}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span className="font-bold">{summaryData.totalQueues}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  {renderQueueStatus(
                    summaryData.giteeQueues.active,
                    summaryData.giteeQueues.total
                  )}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  {renderQueueStatus(
                    summaryData.casQueues.active,
                    summaryData.casQueues.total
                  )}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  {renderQueueStatus(
                    summaryData.njuQueues.active,
                    summaryData.njuQueues.total
                  )}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  {renderQueueStatus(
                    summaryData.pkuQueues.active,
                    summaryData.pkuQueues.total
                  )}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </Card>

      <Card
        title="队列趋势分析"
        className="mt-4"
        tabList={chartTabList}
        activeTabKey={activeChartTab}
        onTabChange={handleChartTabChange}
      >
        <div
          ref={chartRef}
          style={{
            width: '100%',
            height: '400px',
            minHeight: '400px',
          }}
        />
      </Card>
    </>
  );
};

export default QueueTab;
