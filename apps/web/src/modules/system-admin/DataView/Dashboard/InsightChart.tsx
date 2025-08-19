import React, { useRef, useEffect, useState } from 'react';
import { Card, message } from 'antd';
import * as echarts from 'echarts';
import { useOsSituationVisitData } from '../../hooks';

interface InsightChartProps {
  className?: string;
}

const InsightChart: React.FC<InsightChartProps> = ({ className }) => {
  const insightChartRef = useRef<HTMLDivElement>(null);
  const [insightData, setInsightData] = useState<
    Array<{
      key: string;
      rank: number;
      dimension: string;
      clicks: number;
    }>
  >([]);

  // 获取开源态势洞察访问数据
  const {
    data: osSituationVisitApiData,
    isLoading,
    error,
  } = useOsSituationVisitData();

  // 指标名称映射
  const dimensionMapping = {
    push: '开源贡献量发展态势',
    import_export: '开源进出口贡献量发展态势',
    topics: '技术领域代码贡献量及开发者发展态势',
    repositories: '活跃及新增开源项目发展态势',
    contributor: '活跃及新增开发者发展态势',
    language: '编程语言活跃项目发展态势',
    license: 'License的应用与发展态势',
  };

  // 模拟数据作为后备
  const fallbackInsightData = [];

  // 处理 API 数据转换
  const processApiData = (
    apiData: Array<{
      name: string[];
      value: number;
    }>
  ) => {
    if (!apiData || apiData.length === 0) return null;

    // 转换 API 数据为组件所需格式
    const processedData = apiData
      .map((item, index) => {
        const key = item.name[0]; // 取 name 数组的第一个值作为 key
        const dimension =
          dimensionMapping[key as keyof typeof dimensionMapping];

        if (!dimension) return null; // 如果没有对应的映射，跳过该项

        return {
          key: String(index + 1),
          rank: index + 1,
          dimension,
          clicks: item.value,
        };
      })
      .filter(Boolean) // 过滤掉 null 值
      .sort((a, b) => (b?.clicks || 0) - (a?.clicks || 0)) // 按点击量降序排序
      .map((item, index) => ({
        ...item!,
        rank: index + 1, // 重新分配排名
        key: String(index + 1),
      }));

    return processedData;
  };

  // 处理 API 错误
  useEffect(() => {
    if (error) {
      message.error('获取开源态势洞察数据失败，将显示模拟数据');
      setInsightData(fallbackInsightData);
    }
  }, [error]);

  // 处理 API 数据
  useEffect(() => {
    if (osSituationVisitApiData && osSituationVisitApiData.length > 0) {
      const processedData = processApiData(osSituationVisitApiData);
      if (processedData && processedData.length > 0) {
        setInsightData(processedData);
      } else {
        setInsightData(fallbackInsightData);
      }
    } else if (!isLoading && !error) {
      // API 返回空数据时使用模拟数据
      setInsightData(fallbackInsightData);
    }
  }, [osSituationVisitApiData, isLoading, error]);

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
  }, [insightData]);

  return (
    <Card
      title="开源态势洞察维度点击量排名"
      className={className}
      loading={isLoading}
    >
      {error ? (
        <div className="flex h-72 items-center justify-center text-red-500">
          <div className="text-center">
            <div className="mb-2">数据加载失败</div>
          </div>
        </div>
      ) : (
        <div ref={insightChartRef} className="h-72 w-full"></div>
      )}
    </Card>
  );
};

export default InsightChart;
