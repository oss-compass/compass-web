import React, { useRef, useEffect, useMemo } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import * as echarts from 'echarts';
import {
  useRepositoryUpdateOverview,
  useRepositoryPlatformOverview,
} from '../../../hooks';

const RepositoryOverview: React.FC = () => {
  const platformChartRef = useRef<HTMLDivElement>(null);
  const updateChartRef = useRef<HTMLDivElement>(null);

  // 使用 API hooks 获取数据
  const {
    data: updateOverviewData,
    isLoading: updateOverviewLoading,
    error: updateOverviewError,
  } = useRepositoryUpdateOverview();

  const {
    data: platformOverviewData,
    isLoading: platformOverviewLoading,
    error: platformOverviewError,
  } = useRepositoryPlatformOverview();

  // 处理平台分布数据
  const platformData = useMemo(() => {
    if (!platformOverviewData) {
      return [
        { name: 'GitHub', value: 0, color: '#1890ff' },
        { name: 'Gitee', value: 0, color: '#52c41a' },
        { name: 'GitCode', value: 0, color: '#faad14' },
      ];
    }
    return [
      {
        name: 'GitHub',
        value: platformOverviewData.github_count,
        color: '#1890ff',
      },
      {
        name: 'Gitee',
        value: platformOverviewData.gitee_count,
        color: '#52c41a',
      },
      {
        name: 'GitCode',
        value: platformOverviewData.gitcode_count,
        color: '#faad14',
      },
    ].filter((item) => item.value > 0);
  }, [platformOverviewData]);

  // 处理更新时间分布数据
  const updateData = useMemo(() => {
    if (!updateOverviewData) {
      return [
        { name: '1 个月内', value: 0, color: '#52c41a' },
        { name: '超过 1 个月', value: 0, color: '#1890ff' },
        { name: '超过 3 个月', value: 0, color: '#13c2c2' },
        { name: '超过半年', value: 0, color: '#faad14' },
        { name: '超过 1 年', value: 0, color: '#ff4d4f' },
      ];
    }
    return [
      {
        name: '1 个月内',
        value: updateOverviewData.within_1m,
        color: '#52c41a',
      },
      {
        name: '超过 1 个月',
        value: updateOverviewData.over_1m,
        color: '#1890ff',
      },
      {
        name: '超过 3 个月',
        value: updateOverviewData.over_3m,
        color: '#13c2c2',
      },
      {
        name: '超过半年',
        value: updateOverviewData.over_6m,
        color: '#faad14',
      },
      {
        name: '超过 1 年',
        value: updateOverviewData.over_12m,
        color: '#ff4d4f',
      },
    ].filter((item) => item.value > 0);
  }, [updateOverviewData]);

  // 初始化平台分布饼图
  useEffect(() => {
    const initPlatformChart = () => {
      if (platformChartRef.current) {
        const existingChart = echarts.getInstanceByDom(
          platformChartRef.current
        );
        if (existingChart) {
          existingChart.dispose();
        }

        const chart = echarts.init(platformChartRef.current);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: '平台分布',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {c}',
                fontSize: 12,
                fontWeight: 'normal',
              },
              labelLine: {
                show: true,
                length: 15,
                length2: 10,
                smooth: false,
              },
              data: platformData.map((item) => ({
                name: item.name,
                value: item.value,
                itemStyle: {
                  color: item.color,
                },
              })),
            },
          ],
        };

        chart.setOption(option);

        // 保存清理函数
        (platformChartRef.current as any)._chartCleanup = () => {
          chart.dispose();
        };

        // 窗口大小变化时重新调整图表
        const resizeHandler = () => {
          chart.resize();
        };
        window.addEventListener('resize', resizeHandler);

        return () => {
          window.removeEventListener('resize', resizeHandler);
          chart.dispose();
        };
      }
    };

    // 延迟初始化以确保 DOM 已渲染
    const timer = setTimeout(initPlatformChart, 50);

    return () => {
      clearTimeout(timer);
      if (
        platformChartRef.current &&
        (platformChartRef.current as any)._chartCleanup
      ) {
        (platformChartRef.current as any)._chartCleanup();
      }
    };
  }, [platformData]);

  // 初始化更新时间分布柱状图
  useEffect(() => {
    const initUpdateChart = () => {
      if (updateChartRef.current) {
        const existingChart = echarts.getInstanceByDom(updateChartRef.current);
        if (existingChart) {
          existingChart.dispose();
        }

        const chart = echarts.init(updateChartRef.current);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: '更新时间分布',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {c}',
                fontSize: 12,
                fontWeight: 'normal',
              },
              labelLine: {
                show: true,
                length: 15,
                length2: 10,
                smooth: false,
              },
              data: updateData.map((item) => ({
                name: item.name,
                value: item.value,
                itemStyle: {
                  color: item.color,
                },
              })),
            },
          ],
        };

        chart.setOption(option);

        // 保存清理函数
        (updateChartRef.current as any)._chartCleanup = () => {
          chart.dispose();
        };

        // 窗口大小变化时重新调整图表
        const resizeHandler = () => {
          chart.resize();
        };
        window.addEventListener('resize', resizeHandler);

        return () => {
          window.removeEventListener('resize', resizeHandler);
          chart.dispose();
        };
      }
    };

    // 延迟初始化以确保 DOM 已渲染
    const timer = setTimeout(initUpdateChart, 50);

    return () => {
      clearTimeout(timer);
      if (
        updateChartRef.current &&
        (updateChartRef.current as any)._chartCleanup
      ) {
        (updateChartRef.current as any)._chartCleanup();
      }
    };
  }, [updateData]);

  return (
    <Card title="数据概览" className="mt-4">
      <Row gutter={24}>
        <Col span={12}>
          <div className="text-center">
            <h4 className="mb-4 text-base font-medium">平台分布</h4>
            {platformOverviewLoading ? (
              <div
                className="flex items-center justify-center"
                style={{ height: '300px' }}
              >
                <Spin size="large" />
              </div>
            ) : platformOverviewError ? (
              <div
                className="flex items-center justify-center text-red-500"
                style={{ height: '300px' }}
              >
                加载失败，请重试
              </div>
            ) : (
              <div
                ref={platformChartRef}
                style={{
                  width: '100%',
                  height: '300px',
                  minHeight: '300px',
                }}
              />
            )}
          </div>
        </Col>
        <Col span={12}>
          <div className="text-center">
            <h4 className="mb-4 text-base font-medium">更新时间分布</h4>
            {updateOverviewLoading ? (
              <div
                className="flex items-center justify-center"
                style={{ height: '300px' }}
              >
                <Spin size="large" />
              </div>
            ) : updateOverviewError ? (
              <div
                className="flex items-center justify-center text-red-500"
                style={{ height: '300px' }}
              >
                加载失败，请重试
              </div>
            ) : (
              <div
                ref={updateChartRef}
                style={{
                  width: '100%',
                  height: '300px',
                  minHeight: '300px',
                }}
              />
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default RepositoryOverview;
