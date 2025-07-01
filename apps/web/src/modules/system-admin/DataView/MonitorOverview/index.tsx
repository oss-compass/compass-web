import React from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Avatar,
  Tabs,
  DatePicker,
  Space,
} from 'antd';
import {
  DollarOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import Service from '../Dashboard/Service';

const MonitorOverview: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs('2023-01-01'),
    dayjs('2023-12-31'),
  ]);
  const [timeFilter, setTimeFilter] = useState<'month' | 'year'>('year');
  const chartData = [
    { month: '1月', value: 65 },
    { month: '2月', value: 45 },
    { month: '3月', value: 35 },
    { month: '4月', value: 240 },
    { month: '5月', value: 65 },
    { month: '6月', value: 45 },
    { month: '7月', value: 55 },
    { month: '8月', value: 35 },
    { month: '9月', value: 180 },
    { month: '10月', value: 220 },
    { month: '11月', value: 165 },
    { month: '12月', value: 145 },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
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
          data: chartData.map((item) => item.month),
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
        series: [
          {
            data: chartData.map((item) => item.value),
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#3b82f6',
              width: 3,
            },
            itemStyle: {
              color: '#3b82f6',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(59, 130, 246, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(59, 130, 246, 0.05)',
                  },
                ],
              },
            },
          },
        ],
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
  }, [chartData]);

  const activityData = [
    { id: 1, title: '工作流 0 导入', time: '321,234', avatar: '1' },
    { id: 2, title: '工作流 1 导入', time: '321,234', avatar: '2' },
    { id: 3, title: '工作流 2 导入', time: '321,234', avatar: '3' },
    { id: 4, title: '工作流 3 导入', time: '321,234', avatar: '4' },
    { id: 5, title: '工作流 4 导入', time: '321,234', avatar: '5' },
    { id: 6, title: '工作流 5 导入', time: '321,234', avatar: '6' },
    { id: 7, title: '工作流 6 导入', time: '321,234', avatar: '7' },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-36 border-0 shadow-sm">
            <div className="flex h-full flex-col">
              {/* 上部分 */}
              <div className="mb-4 flex flex-1 items-center justify-between">
                <div>
                  <div className="mb-1 text-sm font-semibold">月访问量</div>
                  <div className="text-3xl font-bold">6560</div>
                </div>
                <div className="flex h-12 w-16 items-center justify-center">
                  <ArrowUpOutlined className="text-2xl text-green-500" />
                </div>
              </div>
              {/* 横线分隔 */}
              <div className="border-t border-gray-200"></div>
              {/* 下部分 - 固定30px高度 */}
              <div className="flex h-7 items-center justify-between pt-2">
                <div className="text-sm text-gray-500">总访问量</div>
                <div className="text-sm font-medium">12,423</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-36 border-0 shadow-sm">
            <div className="flex h-full flex-col">
              {/* 上部分 */}
              <div className="mb-4 flex flex-1 items-center justify-between">
                <div>
                  <div className="mb-1 text-sm font-semibold">月新增用户</div>
                  <div className="text-3xl font-bold">846</div>
                </div>
                <div className="flex h-12 w-16 items-center justify-center">
                  <ArrowUpOutlined className="text-2xl text-green-500" />
                </div>
              </div>
              {/* 横线分隔 */}
              <div className="border-t border-gray-200"></div>
              {/* 下部分 - 固定30px高度 */}
              <div className="flex h-7 items-center justify-between pt-2">
                <div className="text-sm text-gray-500">总活跃用户</div>
                <div className="text-sm font-medium">3034</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-36 border-0 shadow-sm">
            <div className="flex h-full flex-col">
              {/* 上部分 */}
              <div className="mb-4 flex flex-1 items-center justify-between">
                <div>
                  <div className="mb-1 text-sm font-semibold">
                    月新增注册用户
                  </div>
                  <div className="text-3xl font-bold">60</div>
                </div>
                <div className="flex h-12 w-16 items-center justify-center">
                  <ArrowDownOutlined className="text-2xl text-red-500" />
                </div>
              </div>
              {/* 横线分隔 */}
              <div className="border-t border-gray-200"></div>
              {/* 下部分 - 固定30px高度 */}
              <div className="flex h-7 items-center justify-between pt-2">
                <div className="text-sm text-gray-500">总注册用户</div>
                <div className="text-sm font-medium">960</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-36 border-0 shadow-sm">
            <div className="flex h-full flex-col">
              {/* 上部分 */}
              <div className="mb-4 flex flex-1 items-center justify-between">
                <div>
                  <div className="mb-1 text-sm font-semibold">
                    月用户平均活动时长
                  </div>
                  <div className="text-3xl font-bold">2 分 16 秒</div>
                </div>
                <div className="flex h-12 w-16 items-center justify-center">
                  <ArrowDownOutlined className="text-2xl text-red-500" />
                </div>
              </div>
              {/* 横线分隔 */}
              <div className="border-t border-gray-200"></div>
              {/* 下部分 - 固定30px高度 */}
              <div className="flex h-7 items-center justify-between pt-2">
                <div className="text-sm text-gray-500">总用户平均活动时长</div>
                <div className="text-sm font-medium">3 分 46 秒</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={24}>
          <Card>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <Tabs defaultActiveKey="1" className="flex-1">
                  <Tabs.TabPane tab="访问量" key="1" />
                  <Tabs.TabPane tab="活跃用户、注册用户、留存用户" key="2" />
                  <Tabs.TabPane tab="用户留存率、用户转化率" key="3" />
                  <Tabs.TabPane tab="用户平均活动时长" key="4" />
                </Tabs>
                <div className="flex items-center space-x-4">
                  <Space>
                    <span
                      className={`cursor-pointer px-2 py-1 text-sm ${
                        timeFilter === 'month'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setTimeFilter('month')}
                    >
                      本月
                    </span>
                    <span
                      className={`cursor-pointer px-2 py-1 text-sm ${
                        timeFilter === 'year'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setTimeFilter('year')}
                    >
                      本年
                    </span>
                  </Space>
                  <DatePicker.RangePicker
                    value={dateRange}
                    onChange={(dates) => {
                      if (dates) {
                        setDateRange([dates[0]!, dates[1]!]);
                      }
                    }}
                    format="YYYY-MM-DD"
                    size="small"
                    className="text-sm"
                  />
                </div>
              </div>
              <div ref={chartRef} className="h-[340px] w-full"></div>
            </div>
          </Card>
        </Col>
      </Row>
      <Service />
    </div>
  );
};

export default MonitorOverview;
