// autocorrect: false
import React, { useMemo, useRef } from 'react';
import { Tabs, Card } from 'antd';
import EChartX from '@common/components/EChartX';

interface EcoData {
  name: string;
  score2024: number;
  score2025: number;
  charts: {
    role: {
      title: string;
      maxScore: number;
      data2024: { name: string; value: number }[];
      data2025: { name: string; value: number }[];
    };
    contribution: {
      title: string;
      maxScore: number;
      data2024: { name: string; value: number }[];
      data2025: { name: string; value: number }[];
    };
    influence: {
      title: string;
      maxScore: number;
      data2024: { name: string; value: number }[];
      data2025: { name: string; value: number }[];
    };
  };
}

interface EcoChartsProps {
  data: EcoData[];
}

const EcoCharts: React.FC<EcoChartsProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 为每个生态预创建refs（最多3个生态系统）
  const roleChartRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const contributionChartRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const influenceChartRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const chartOptions = useMemo(() => {
    // 如果没有数据，返回空数组
    if (!data || data.length === 0) {
      return [];
    }

    return data.map((eco, index) => {
      // 使用预创建的refs
      const roleChartRef = roleChartRefs[index];
      const contributionChartRef = contributionChartRefs[index];
      const influenceChartRef = influenceChartRefs[index];

      // 合并2024年和2025年的所有类别
      const getAllCategories = (
        data2024: { name: string; value: number }[],
        data2025: { name: string; value: number }[]
      ) => {
        const categories = new Set([
          ...data2024.map((item) => item.name),
          ...data2025.map((item) => item.name),
        ]);
        return Array.from(categories);
      };

      // 根据类别获取对应的值
      const getValueByCategory = (
        data: { name: string; value: number }[],
        category: string
      ) => {
        const item = data.find((d) => d.name === category);
        return item ? item.value : 0;
      };

      const roleCategories = getAllCategories(
        eco.charts.role.data2024,
        eco.charts.role.data2025
      );
      const contributionCategories = getAllCategories(
        eco.charts.contribution.data2024,
        eco.charts.contribution.data2025
      );
      const influenceCategories = getAllCategories(
        eco.charts.influence.data2024,
        eco.charts.influence.data2025
      );

      return {
        key: eco.name,
        label: eco.name,
        children: (
          <div className="space-y-6">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {eco.name}
              </h3>
              <div className="text-base text-gray-600">
                <span className="font-semibold text-blue-600">
                  2024年: {eco.score2024.toFixed(2)}
                </span>
                <span className="mx-3 text-gray-400">→</span>
                <span className="font-semibold text-green-600">
                  2025年: {eco.score2025.toFixed(2)}
                </span>
                <span
                  className={`ml-3 font-bold ${
                    eco.score2025 > eco.score2024
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  ({eco.score2025 > eco.score2024 ? '+' : ''}
                  {(eco.score2025 - eco.score2024).toFixed(2)})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 lg:grid-cols-3">
              {/* 角色得分图表 */}
              <Card title={eco.charts.role.title} size="small">
                <div
                  style={{ height: '300px', width: '100%' }}
                  ref={roleChartRef}
                >
                  <EChartX
                    containerRef={roleChartRef}
                    loading={false}
                    style={{ width: '100%', height: '100%' }}
                    option={{
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                          type: 'shadow',
                        },
                      },
                      legend: {
                        data: ['2024年', '2025年'],
                        top: 0,
                      },
                      grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true,
                      },
                      xAxis: {
                        type: 'category',
                        data: roleCategories,
                        axisLabel: {
                          rotate: 45,
                          fontSize: 10,
                        },
                      },
                      yAxis: {
                        type: 'value',
                        name: '项目数量',
                      },
                      series: [
                        {
                          name: '2024年',
                          type: 'bar',
                          data: roleCategories.map((cat) =>
                            getValueByCategory(eco.charts.role.data2024, cat)
                          ),
                          itemStyle: {
                            color: '#1890ff',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                          },
                        },
                        {
                          name: '2025年',
                          type: 'bar',
                          data: roleCategories.map((cat) =>
                            getValueByCategory(eco.charts.role.data2025, cat)
                          ),
                          itemStyle: {
                            color: '#52c41a',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                          },
                        },
                      ],
                    }}
                  />
                </div>
              </Card>

              {/* 代码Issue贡献得分图表 */}
              <Card title={eco.charts.contribution.title} size="small">
                <div
                  style={{ height: '300px', width: '100%' }}
                  ref={contributionChartRef}
                >
                  <EChartX
                    containerRef={contributionChartRef}
                    loading={false}
                    style={{ width: '100%', height: '100%' }}
                    option={{
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                          type: 'shadow',
                        },
                      },
                      legend: {
                        data: ['2024年', '2025年'],
                        top: 0,
                      },
                      grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true,
                      },
                      xAxis: {
                        type: 'category',
                        data: contributionCategories.map(
                          (item) => item.split('(')[0]
                        ),
                        axisLabel: {
                          rotate: 45,
                          fontSize: 10,
                        },
                      },
                      yAxis: {
                        type: 'value',
                        name: '归一化得分',
                      },
                      series: [
                        {
                          name: '2024年',
                          type: 'bar',
                          data: contributionCategories.map((cat) =>
                            getValueByCategory(
                              eco.charts.contribution.data2024,
                              cat
                            )
                          ),
                          itemStyle: {
                            color: '#1890ff',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: '{c}',
                          },
                        },
                        {
                          name: '2025年',
                          type: 'bar',
                          data: contributionCategories.map((cat) =>
                            getValueByCategory(
                              eco.charts.contribution.data2025,
                              cat
                            )
                          ),
                          itemStyle: {
                            color: '#52c41a',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: '{c}',
                          },
                        },
                      ],
                    }}
                  />
                </div>
              </Card>

              {/* 协作影响力得分图表 */}
              <Card title={eco.charts.influence.title} size="small">
                <div
                  style={{ height: '300px', width: '100%' }}
                  ref={influenceChartRef}
                >
                  <EChartX
                    containerRef={influenceChartRef}
                    loading={false}
                    style={{ width: '100%', height: '100%' }}
                    option={{
                      tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                          type: 'shadow',
                        },
                      },
                      legend: {
                        data: ['2024年', '2025年'],
                        top: 0,
                      },
                      grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true,
                      },
                      xAxis: {
                        type: 'category',
                        data: influenceCategories.map(
                          (item) => item.split('(')[0]
                        ),
                        axisLabel: {
                          rotate: 45,
                          fontSize: 10,
                        },
                      },
                      yAxis: {
                        type: 'value',
                        name: '归一化得分',
                      },
                      series: [
                        {
                          name: '2024年',
                          type: 'bar',
                          data: influenceCategories.map((cat) =>
                            getValueByCategory(
                              eco.charts.influence.data2024,
                              cat
                            )
                          ),
                          itemStyle: {
                            color: '#1890ff',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: '{c}',
                          },
                        },
                        {
                          name: '2025年',
                          type: 'bar',
                          data: influenceCategories.map((cat) =>
                            getValueByCategory(
                              eco.charts.influence.data2025,
                              cat
                            )
                          ),
                          itemStyle: {
                            color: '#52c41a',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: '{c}',
                          },
                        },
                      ],
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        ),
      };
    });
  }, [data, roleChartRefs, contributionChartRefs, influenceChartRefs]);

  // 如果没有数据，显示提示信息
  if (!data || data.length === 0 || chartOptions.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        暂无图表数据
      </div>
    );
  }

  return (
    <div className="w-full" ref={containerRef}>
      <Tabs
        defaultActiveKey={data[0]?.name}
        items={chartOptions}
        size="large"
        tabPosition="top"
      />
    </div>
  );
};

export default EcoCharts;
