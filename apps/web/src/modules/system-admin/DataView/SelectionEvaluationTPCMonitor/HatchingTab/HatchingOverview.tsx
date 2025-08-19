import React, { useRef, useEffect, useMemo } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import * as echarts from 'echarts';
import {
  useIncubationPlatformOverview,
  useIncubationUpdateOverview,
} from '../../../hooks';

const HatchingOverview: React.FC = () => {
  const {
    data: platformOverviewData,
    isLoading: platformOverviewLoading,
    error: platformOverviewError,
  } = useIncubationPlatformOverview();

  const {
    data: updateOverviewData,
    isLoading: updateOverviewLoading,
    error: updateOverviewError,
  } = useIncubationUpdateOverview();

  const totalProjects = updateOverviewData?.total ?? 0;

  const platformData = useMemo(() => {
    if (!platformOverviewData)
      return [] as Array<{ name: string; value: number; color: string }>;
    return [
      {
        name: 'GitHub',
        value: platformOverviewData.github_count,
        color: '#1890ff',
      },
      {
        name: 'Gitee',
        value: platformOverviewData.gitee_count,
        color: '#ff4d4f',
      },
      {
        name: 'GitCode',
        value: platformOverviewData.gitcode_count,
        color: '#faad14',
      },
    ].filter((item) => item.value > 0);
  }, [platformOverviewData]);

  const updateData = useMemo(() => {
    if (!updateOverviewData)
      return [] as Array<{ name: string; value: number; color: string }>;
    return [
      {
        name: '1 个月内有更新',
        value: updateOverviewData.updated_within_one_month,
        color: '#52c41a',
      },
      {
        name: '超过 1 个月未更新',
        value: updateOverviewData.updated_within_three_months,
        color: '#1890ff',
      },
      {
        name: '超过 3 个月未更新',
        value: updateOverviewData.updated_within_six_months,
        color: '#13c2c2',
      },
      {
        name: '超过半年未更新',
        value: updateOverviewData.updated_within_twelve_months,
        color: '#faad14',
      },
      {
        name: '超过 1 年未更新',
        value: updateOverviewData.updated_over_twelve_months,
        color: '#ff4d4f',
      },
    ].filter((item) => item.value > 0);
  }, [updateOverviewData]);

  const platformChartRef = useRef<HTMLDivElement>(null);
  const updateChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlatformChart = () => {
      if (!platformChartRef.current) return;
      const container = platformChartRef.current;
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        setTimeout(initPlatformChart, 100);
        return;
      }
      const chart = echarts.init(container);
      const option = {
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { show: false },
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
            labelLine: { show: true, length: 15, length2: 10, smooth: false },
            data: platformData.map((item) => ({
              value: item.value,
              name: item.name,
              itemStyle: { color: item.color },
            })),
          },
        ],
      };
      chart.setOption(option);
      return () => chart.dispose();
    };
    return initPlatformChart();
  }, [platformData]);

  useEffect(() => {
    const initUpdateChart = () => {
      if (!updateChartRef.current) return;
      const container = updateChartRef.current;
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        setTimeout(initUpdateChart, 100);
        return;
      }
      const chart = echarts.init(container);
      const option = {
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { show: false },
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
            labelLine: { show: true, length: 15, length2: 10, smooth: false },
            data: updateData.map((item) => ({
              value: item.value,
              name: item.name,
              itemStyle: { color: item.color },
            })),
          },
        ],
      };
      chart.setOption(option);
      return () => chart.dispose();
    };
    return initUpdateChart();
  }, [updateData]);

  return (
    <Card
      title={
        <div>
          <span>孵化项目总览</span>
          <span className="ml-2 text-sm font-normal text-gray-500">
            总计：{totalProjects} 项目
          </span>
        </div>
      }
      className="mt-4"
    >
      <Row gutter={24}>
        <Col span={12}>
          <div className="text-center">
            <h4 className="mb-4 text-base font-medium">平台分布</h4>
            {platformOverviewLoading ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin size="large" />
              </div>
            ) : platformOverviewError ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff4d4f',
                }}
              >
                数据加载失败
              </div>
            ) : (
              <div
                ref={platformChartRef}
                style={{ width: '100%', height: '300px', minHeight: '300px' }}
              />
            )}
          </div>
        </Col>
        <Col span={12}>
          <div className="text-center">
            <h4 className="mb-4 text-base font-medium">更新时间分布</h4>
            {updateOverviewLoading ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin size="large" />
              </div>
            ) : updateOverviewError ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff4d4f',
                }}
              >
                数据加载失败
              </div>
            ) : (
              <div
                ref={updateChartRef}
                style={{ width: '100%', height: '300px', minHeight: '300px' }}
              />
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default HatchingOverview;
