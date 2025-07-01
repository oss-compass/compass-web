import React, { useRef, useEffect } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts';

interface InsightChartProps {
  className?: string;
}

const InsightChart: React.FC<InsightChartProps> = ({ className }) => {
  const insightChartRef = useRef<HTMLDivElement>(null);

  const insightData = [
    { key: '1', rank: 1, dimension: '开源贡献量发展态势', clicks: 12450 },
    { key: '2', rank: 2, dimension: '开源进出口贡献量发展态势', clicks: 10320 },
    {
      key: '3',
      rank: 3,
      dimension: '技术领域代码贡献量及开发者发展态势',
      clicks: 9876,
    },
    {
      key: '4',
      rank: 4,
      dimension: '活跃及新增开源项目发展态势',
      clicks: 8765,
    },
    { key: '5', rank: 5, dimension: '活跃及新增开发者发展态势', clicks: 7654 },
    { key: '6', rank: 6, dimension: '编程语言活跃项目发展态势', clicks: 6543 },
    { key: '7', rank: 7, dimension: 'License的应用与发展态势', clicks: 5432 },
  ];

  useEffect(() => {
    if (insightChartRef.current) {
      const insightChart = echarts.init(insightChartRef.current);

      const insightOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '开源态势洞察维度点击量排名',
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
            data: insightData.map((item, index) => ({
              name: item.dimension,
              value: item.clicks,
              itemStyle: {
                color: [
                  '#1890ff',
                  '#52c41a',
                  '#faad14',
                  '#f5222d',
                  '#722ed1',
                  '#13c2c2',
                  '#eb2f96',
                ][index % 7],
              },
            })),
          },
        ],
      };

      insightChart.setOption(insightOption);

      const handleInsightResize = () => {
        insightChart.resize();
      };

      window.addEventListener('resize', handleInsightResize);

      return () => {
        window.removeEventListener('resize', handleInsightResize);
        insightChart.dispose();
      };
    }
  }, []);

  return (
    <Card title="开源态势洞察维度点击量排名" className={className}>
      <div ref={insightChartRef} className="h-72 w-full"></div>
    </Card>
  );
};

export default InsightChart;
