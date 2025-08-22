// autocorrect: false
import React, { useMemo, useRef } from 'react';
import { Tabs, Card } from 'antd';
import { useTranslation } from 'next-i18next';
import EChartX from '@common/components/EChartX';
import { translateByLocale, ecosystemMapping } from '../utils/countryMapping';

// 根据实际JSON数据结构定义接口
interface EcoData {
  name: string;
  score2024: number;
  score2025: number;
  roleScore2024: number;
  roleScore2025: number;
  roleBreakdown2024: Record<string, number>;
  roleBreakdown2025: Record<string, number>;
  contributionScore2024: number;
  contributionScore2025: number;
  contributionBreakdown2024: Record<string, number>;
  contributionBreakdown2025: Record<string, number>;
  influenceScore2024: number;
  influenceScore2025: number;
  influenceBreakdown2024: Record<string, number>;
  influenceBreakdown2025: Record<string, number>;
}

interface EcoChartsProps {
  data: EcoData[];
}

const EcoCharts: React.FC<EcoChartsProps> = ({ data }) => {
  const { i18n } = useTranslation();
  console.log('EcoCharts data:', data);
  console.log('EcoCharts data length:', data?.length);

  const containerRef = useRef<HTMLDivElement>(null);

  // 动态创建refs，根据实际生态数量
  const chartRefs = useMemo(() => {
    const count = data?.length || 0;
    return Array.from({ length: count }, () => ({
      roleRef: { current: null as HTMLDivElement | null },
      contributionRef: { current: null as HTMLDivElement | null },
      influenceRef: { current: null as HTMLDivElement | null },
    }));
  }, [data?.length]);

  const chartOptions = useMemo(() => {
    // 如果没有数据，返回空数组
    if (!data || data.length === 0) {
      return [];
    }

    return data.map((eco, index) => {
      // 使用动态创建的refs
      const currentRefs = chartRefs[index];
      if (!currentRefs) return null;

      const { roleRef, contributionRef, influenceRef } = currentRefs;

      // 合并2024年和2025年的所有类别
      const getAllCategories = (
        data2024: Record<string, number>,
        data2025: Record<string, number>
      ) => {
        const categories = new Set([
          ...Object.keys(data2024),
          ...Object.keys(data2025),
        ]);
        return Array.from(categories);
      };

      // 根据类别获取对应的值
      const getValueByCategory = (
        data: Record<string, number>,
        category: string
      ) => {
        return data[category] || 0;
      };

      const roleCategories = getAllCategories(
        eco.roleBreakdown2024,
        eco.roleBreakdown2025
      );
      const contributionCategories = getAllCategories(
        eco.contributionBreakdown2024,
        eco.contributionBreakdown2025
      );
      const influenceCategories = getAllCategories(
        eco.influenceBreakdown2024,
        eco.influenceBreakdown2025
      );

      return {
        key: eco.name,
        label: translateByLocale(eco.name, ecosystemMapping, i18n.language),
        children: (
          <div className="space-y-6">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {translateByLocale(eco.name, ecosystemMapping, i18n.language)}
              </h3>
              <div className="text-base text-gray-600">
                <span className="font-semibold text-blue-600">
                  {i18n.language === 'en' ? '2024: ' : '2024年: '}{eco.score2024.toFixed(2)}
                </span>
                <span className="mx-3 text-gray-400">→</span>
                <span className="font-semibold text-green-600">
                  {i18n.language === 'en' ? '2025: ' : '2025年: '}{eco.score2025.toFixed(2)}
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
              <Card title={i18n.language === 'en' ? 'Role Score' : '角色得分'} size="small">
                <div
                  style={{ height: '300px', width: '100%' }}
                  ref={roleRef}
                >
                  <EChartX
                    containerRef={roleRef}
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
                        data: i18n.language === 'en' ? ['2024', '2025'] : ['2024年', '2025年'],
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
                        data: roleCategories.map(cat => translateByLocale(cat, ecosystemMapping, i18n.language)),
                        axisLabel: {
                          rotate: 45,
                          fontSize: 10,
                        },
                      },
                      yAxis: {
                        type: 'value',
                        name: i18n.language === 'en' ? 'Project Count' : '项目数量',
                      },
                      series: [
                        {
                          name: i18n.language === 'en' ? '2024' : '2024年',
                          type: 'bar',
                          data: roleCategories.map((cat) =>
                            getValueByCategory(eco.roleBreakdown2024, cat)
                          ),
                          itemStyle: {
                            color: '#1890ff',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: function(params): string {
                              return typeof params.value === 'number' ? params.value.toFixed(2) : String(params.value);
                            },
                          },
                        },
                        {
                          name: i18n.language === 'en' ? '2025' : '2025年',
                          type: 'bar',
                          data: roleCategories.map((cat) =>
                            getValueByCategory(eco.roleBreakdown2025, cat)
                          ),
                          itemStyle: {
                            color: '#52c41a',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: function(params): string {
                              return typeof params.value === 'number' ? params.value.toFixed(2) : String(params.value);
                            },
                          },
                        },
                      ],
                    }}
                  />
                </div>
              </Card>

              {/* 代码Issue贡献得分图表 */}
              <Card title={i18n.language === 'en' ? 'Code Issue Contribution Score' : '代码Issue贡献得分'} size="small">
                <div
                  style={{ height: '300px', width: '100%' }}
                  ref={contributionRef}
                >
                  <EChartX
                    containerRef={contributionRef}
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
                        data: i18n.language === 'en' ? ['2024', '2025'] : ['2024年', '2025年'],
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
                        data: contributionCategories.map((item) => {
                          // 提取括号前的名称，如 "2024年代码贡献(里程:核心, 数量:1685)" -> "代码贡献"
                          const match = item.match(/^(\d+年)?(.+?)(\(.*\))?$/);
                          const cleanName = match ? match[2] : item;
                          return translateByLocale(cleanName, ecosystemMapping, i18n.language);
                        }),
                        axisLabel: {
                          rotate: 45,
                          fontSize: 10,
                        },
                      },
                      yAxis: {
                        type: 'value',
                        name: i18n.language === 'en' ? 'Normalized Score' : '归一化得分',
                      },
                      series: [
                        {
                          name: i18n.language === 'en' ? '2024' : '2024年',
                          type: 'bar',
                          data: contributionCategories.map((cat) =>
                            getValueByCategory(
                              eco.contributionBreakdown2024,
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
                            formatter: function(params): string {
                              return typeof params.value === 'number' ? params.value.toFixed(2) : String(params.value);
                            },
                          },
                        },
                        {
                          name: i18n.language === 'en' ? '2025' : '2025年',
                          type: 'bar',
                          data: contributionCategories.map((cat) =>
                            getValueByCategory(
                              eco.contributionBreakdown2025,
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
                            formatter: function(params): string {
                              return typeof params.value === 'number' ? params.value.toFixed(2) : String(params.value);
                            },
                          },
                        },
                      ],
                    }}
                  />
                </div>
              </Card>

              {/* 协作影响力得分图表 */}
              <Card title={i18n.language === 'en' ? 'Collaboration Influence Score' : '协作影响力得分'} size="small">
                <div
                  style={{ height: '300px', width: '100%' }}
                  ref={influenceRef}
                >
                  <EChartX
                    containerRef={influenceRef}
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
                        data: i18n.language === 'en' ? ['2024', '2025'] : ['2024年', '2025年'],
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
                        data: influenceCategories.map((item) => {
                          // 提取括号前的名称，如 "2024年社区核心度(程度:核心, 数值:0.0017)" -> "社区核心度"
                          const match = item.match(/^(\d+年)?(.+?)(\(.*\))?$/);
                          const cleanName = match ? match[2] : item;
                          return translateByLocale(cleanName, ecosystemMapping, i18n.language);
                        }),
                        axisLabel: {
                          rotate: 45,
                          fontSize: 10,
                        },
                      },
                      yAxis: {
                        type: 'value',
                        name: i18n.language === 'en' ? 'Normalized Score' : '归一化得分',
                      },
                      series: [
                        {
                          name: i18n.language === 'en' ? '2024' : '2024年',
                          type: 'bar',
                          data: influenceCategories.map((cat) =>
                            getValueByCategory(eco.influenceBreakdown2024, cat)
                          ),
                          itemStyle: {
                            color: '#1890ff',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: function(params): string {
                              return typeof params.value === 'number' ? params.value.toFixed(2) : String(params.value);
                            },
                          },
                        },
                        {
                          name: i18n.language === 'en' ? '2025' : '2025年',
                          type: 'bar',
                          data: influenceCategories.map((cat) =>
                            getValueByCategory(eco.influenceBreakdown2025, cat)
                          ),
                          itemStyle: {
                            color: '#52c41a',
                          },
                          label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            formatter: function(params): string {
                              return typeof params.value === 'number' ? params.value.toFixed(2) : String(params.value);
                            },
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
    }).filter(Boolean); // 过滤掉null值
  }, [data, chartRefs, i18n.language]);

  // 如果没有数据，显示提示信息
  if (!data || data.length === 0 || chartOptions.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        {i18n.language === 'en' ? 'No chart data available' : '暂无图表数据'}
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
