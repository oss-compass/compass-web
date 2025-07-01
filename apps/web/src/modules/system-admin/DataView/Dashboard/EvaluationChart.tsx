import React, { useRef, useEffect } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts';

interface EvaluationChartProps {
  className?: string;
}

const EvaluationChart: React.FC<EvaluationChartProps> = ({ className }) => {
  const evaluationChartRef = useRef<HTMLDivElement>(null);

  const evaluationData = [
    { name: '直接评估已知软件', value: 4521, color: '#1890ff' },
    { name: '通过功能描述推荐软件', value: 3287, color: '#52c41a' },
    { name: '查找相似功能软件', value: 2156, color: '#faad14' },
  ];

  useEffect(() => {
    if (evaluationChartRef.current) {
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
  }, []);

  return (
    <Card title="开源选型评估服务点击量占比" className={className}>
      <div ref={evaluationChartRef} className="h-72 w-full"></div>
    </Card>
  );
};

export default EvaluationChart;
