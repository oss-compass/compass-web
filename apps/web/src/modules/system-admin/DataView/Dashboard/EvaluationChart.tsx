import React, { useRef, useEffect } from 'react';
import { Card, message } from 'antd';
import * as echarts from 'echarts';
import { useOssSelectionClickData } from './hooks/useAdminApi';

interface EvaluationChartProps {
  className?: string;
}

const EvaluationChart: React.FC<EvaluationChartProps> = ({ className }) => {
  const evaluationChartRef = useRef<HTMLDivElement>(null);
  const { data: apiData, isLoading, error } = useOssSelectionClickData();

  // 服务名称映射
  const serviceNameMap: Record<string, string> = {
    similar_software_section: '查找相似功能软件',
    assessment_section_search: '直接评估已知软件',
    recommendation_section_search: '通过功能描述推荐软件',
  };

  // 颜色配置
  const colorMap: Record<string, string> = {
    直接评估已知软件: '#1890ff',
    通过功能描述推荐软件: '#52c41a',
    查找相似功能软件: '#faad14',
  };

  // 模拟数据（作为后备）
  const mockEvaluationData = [
    { name: '直接评估已知软件', value: 4521, color: '#1890ff' },
    { name: '通过功能描述推荐软件', value: 3287, color: '#52c41a' },
    { name: '查找相似功能软件', value: 2156, color: '#faad14' },
  ];

  // 处理 API 数据
  const processEvaluationData = () => {
    if (apiData && apiData.length > 0) {
      return apiData.map((item) => ({
        name: serviceNameMap[item.name] || item.name,
        value: item.value,
        color: colorMap[serviceNameMap[item.name]] || '#1890ff',
      }));
    }
    return mockEvaluationData;
  };

  const evaluationData = processEvaluationData();

  // 错误处理
  useEffect(() => {
    if (error) {
      console.error('开源选型点击数据获取失败：', error);
      message.error('开源选型点击数据获取失败，使用模拟数据');
    }
  }, [error]);

  useEffect(() => {
    if (evaluationChartRef.current && !isLoading) {
      const evaluationChart = echarts.init(evaluationChartRef.current);

      const evaluationOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '开源选型评估服务使用占比',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {c} ({d}%)',
              fontSize: 12,
              fontWeight: 'normal',
            },
            labelLine: {
              show: true,
            },
            data: evaluationData.map((item) => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: item.color,
              },
            })),
          },
        ],
      };

      evaluationChart.setOption(evaluationOption);

      const handleEvaluationResize = () => {
        evaluationChart.resize();
      };

      window.addEventListener('resize', handleEvaluationResize);

      return () => {
        window.removeEventListener('resize', handleEvaluationResize);
        evaluationChart.dispose();
      };
    }
  }, [evaluationData, isLoading]);

  return (
    <Card
      title="开源选型评估服务点击量占比"
      className={className}
      loading={isLoading}
    >
      <div ref={evaluationChartRef} className="h-72 w-full"></div>
    </Card>
  );
};

export default EvaluationChart;
