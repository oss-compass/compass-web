import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Tag, Progress, Row, Col, Pagination, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import * as echarts from 'echarts';
// import { useState, useRef, useEffect } from 'react';

interface ServiceData {
  key: string;
  serviceName: string;
  status: 'running' | 'stopped' | 'error';
  cpu: number;
  memory: number;
  uptime: string;
}

interface VisitData {
  key: string;
  rank: number;
  keyword: string;
  users: number;
  percentage: string;
  trend: 'up' | 'down';
}

interface HotSearchData {
  key: string;
  rank: number;
  name: string;
  clicks: number;
}

interface InsightData {
  key: string;
  rank: number;
  dimension: string;
  clicks: number;
}

interface DataHubData {
  key: string;
  rank: number;
  name: string;
  count: number;
}

const ServiceMonitor: React.FC = () => {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const serviceChartRef = useRef<HTMLDivElement>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const evaluationChartRef = useRef<HTMLDivElement>(null);
  const insightChartRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('repository');
  const [dataHubTab, setDataHubTab] = useState<string>('api');

  const columns: ColumnsType<ServiceData> = [
    {
      title: '服务名称',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'running'
            ? 'green'
            : status === 'error'
            ? 'red'
            : 'orange';
        const text =
          status === 'running'
            ? '运行中'
            : status === 'error'
            ? '错误'
            : '已停止';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      key: 'cpu',
      render: (cpu: number) => (
        <Progress
          percent={cpu}
          size="small"
          status={cpu > 80 ? 'exception' : 'normal'}
        />
      ),
    },
    {
      title: '内存使用率',
      dataIndex: 'memory',
      key: 'memory',
      render: (memory: number) => (
        <Progress
          percent={memory}
          size="small"
          status={memory > 80 ? 'exception' : 'normal'}
        />
      ),
    },
    {
      title: '运行时间',
      dataIndex: 'uptime',
      key: 'uptime',
    },
  ];

  const data: ServiceData[] = [
    {
      key: '1',
      serviceName: 'Web服务',
      status: 'running',
      cpu: 45,
      memory: 62,
      uptime: '2天 14小时',
    },
    {
      key: '2',
      serviceName: 'API服务',
      status: 'running',
      cpu: 32,
      memory: 48,
      uptime: '5天 8小时',
    },
    {
      key: '3',
      serviceName: '数据库服务',
      status: 'running',
      cpu: 78,
      memory: 85,
      uptime: '12天 3小时',
    },
    {
      key: '4',
      serviceName: '缓存服务',
      status: 'error',
      cpu: 0,
      memory: 0,
      uptime: '0分钟',
    },
  ];

  const visitColumns: ColumnsType<VisitData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text: string) => (
        <span className="cursor-pointer text-blue-600 hover:underline">
          {text}
        </span>
      ),
    },
    {
      title: '用户数',
      dataIndex: 'users',
      key: 'users',
      width: 80,
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      width: 80,
      render: (text: string, record: VisitData) => (
        <span
          className={record.trend === 'up' ? 'text-red-500' : 'text-green-500'}
        >
          {text} {record.trend === 'up' ? '↑' : '↓'}
        </span>
      ),
    },
  ];

  const visitData: VisitData[] = [
    {
      key: '1',
      rank: 1,
      keyword: '搜索关键词-0',
      users: 313,
      percentage: '20%',
      trend: 'up',
    },
    {
      key: '2',
      rank: 2,
      keyword: '搜索关键词-1',
      users: 41,
      percentage: '5%',
      trend: 'down',
    },
    {
      key: '3',
      rank: 3,
      keyword: '搜索关键词-2',
      users: 150,
      percentage: '60%',
      trend: 'up',
    },
    {
      key: '4',
      rank: 4,
      keyword: '搜索关键词-3',
      users: 696,
      percentage: '65%',
      trend: 'up',
    },
    {
      key: '5',
      rank: 5,
      keyword: '搜索关键词-4',
      users: 780,
      percentage: '81%',
      trend: 'up',
    },
  ];

  const repositoryData: HotSearchData[] = [
    { key: '1', rank: 1, name: 'facebook/react', clicks: 15420 },
    { key: '2', rank: 2, name: 'vuejs/vue', clicks: 12350 },
    { key: '3', rank: 3, name: 'angular/angular', clicks: 9876 },
    { key: '4', rank: 4, name: 'sveltejs/svelte', clicks: 7654 },
    { key: '5', rank: 5, name: 'vercel/next.js', clicks: 6543 },
    { key: '6', rank: 6, name: 'nuxt/nuxt', clicks: 5432 },
    { key: '7', rank: 7, name: 'expressjs/express', clicks: 4321 },
    { key: '8', rank: 8, name: 'fastify/fastify', clicks: 3210 },
  ];

  const developerData: HotSearchData[] = [
    { key: '1', rank: 1, name: 'torvalds', clicks: 8765 },
    { key: '2', rank: 2, name: 'gaearon', clicks: 7654 },
    { key: '3', rank: 3, name: 'sindresorhus', clicks: 6543 },
    { key: '4', rank: 4, name: 'tj', clicks: 5432 },
    { key: '5', rank: 5, name: 'addyosmani', clicks: 4321 },
    { key: '6', rank: 6, name: 'kentcdodds', clicks: 3210 },
    { key: '7', rank: 7, name: 'wesbos', clicks: 2109 },
    { key: '8', rank: 8, name: 'bradtraversy', clicks: 1987 },
  ];

  const insightData: InsightData[] = [
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

  const apiClickData: DataHubData[] = [
    { key: '1', rank: 1, name: '获取项目release元数据', count: 8765 },
    { key: '2', rank: 2, name: '获取项目repo元数据', count: 7654 },
    { key: '3', rank: 3, name: '开发者对仓库贡献', count: 6543 },
    { key: '4', rank: 4, name: '获取项目git元数据', count: 5432 },
    { key: '5', rank: 5, name: '获取项目fork元数据', count: 4321 },
    { key: '6', rank: 6, name: '获取项目贡献者元数据', count: 3210 },
    { key: '7', rank: 7, name: '获取项目event元数据', count: 2109 },
  ];

  const archiveDownloadData: DataHubData[] = [
    { key: '1', rank: 1, name: '贡献量数据集', count: 15420 },
    { key: '2', rank: 2, name: '贡献者数据集', count: 12350 },
    { key: '3', rank: 3, name: '进出口数据集', count: 9876 },
    { key: '4', rank: 4, name: '编程语言数据集', count: 7654 },
  ];

  const hotSearchColumns: ColumnsType<HotSearchData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number) => (
        <span
          className={`font-bold ${
            rank <= 3
              ? 'text-red-500'
              : rank <= 6
              ? 'text-orange-500'
              : 'text-gray-500'
          }`}
        >
          {rank}
        </span>
      ),
    },
    {
      title: activeTab === 'repository' ? '仓库名' : '开发者',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          {text}
        </span>
      ),
    },
    {
      title: '点击量',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 100,
      render: (clicks: number) => (
        <span className="font-medium">{clicks.toLocaleString()}</span>
      ),
    },
  ];

  const insightColumns: ColumnsType<InsightData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number) => (
        <span
          className={`font-bold ${
            rank <= 3
              ? 'text-red-500'
              : rank <= 6
              ? 'text-orange-500'
              : 'text-gray-500'
          }`}
        >
          {rank}
        </span>
      ),
    },
    {
      title: '洞察维度',
      dataIndex: 'dimension',
      key: 'dimension',
      render: (text: string) => (
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          {text}
        </span>
      ),
    },
    {
      title: '点击量',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 100,
      render: (clicks: number) => (
        <span className="font-medium">{clicks.toLocaleString()}</span>
      ),
    },
  ];

  const currentHotSearchData =
    activeTab === 'repository' ? repositoryData : developerData;

  const tabItems = [
    {
      key: 'repository',
      label: '仓库/社区',
    },
    {
      key: 'developer',
      label: '开发者',
    },
  ];

  const dataHubColumns: ColumnsType<DataHubData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number) => (
        <span
          className={`font-bold ${
            rank <= 3
              ? 'text-red-500'
              : rank <= 6
              ? 'text-orange-500'
              : 'text-gray-500'
          }`}
        >
          {rank}
        </span>
      ),
    },
    {
      title: dataHubTab === 'api' ? 'API名称' : '归档数据',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          {text}
        </span>
      ),
    },
    {
      title: dataHubTab === 'api' ? '点击量' : '下载量',
      dataIndex: 'count',
      key: 'count',
      width: 100,
      render: (count: number) => (
        <span className="font-medium">{count.toLocaleString()}</span>
      ),
    },
  ];

  const currentDataHubData =
    dataHubTab === 'api' ? apiClickData : archiveDownloadData;

  const dataHubTabItems = [
    {
      key: 'api',
      label: 'API 点击量',
    },
    {
      key: 'archive',
      label: '归档数据下载量',
    },
  ];

  const pieData = [
    { name: '直接访问', value: 4544, color: '#1890ff' },
    { name: '邮件营销', value: 3321, color: '#52c41a' },
    { name: '联盟广告', value: 3115, color: '#faad14' },
    { name: '视频广告', value: 2341, color: '#f5222d' },
    { name: '搜索引擎', value: 1231, color: '#722ed1' },
    { name: '其他', value: 1231, color: '#13c2c2' },
  ];

  const serviceData = [
    { name: '开源健康评估', value: 2856, color: '#1890ff' },
    { name: '开发者画像评估', value: 2134, color: '#52c41a' },
    { name: '开源选型评估', value: 1987, color: '#faad14' },
    { name: '开源态势洞察', value: 1654, color: '#f5222d' },
    { name: '开源数据中枢', value: 1432, color: '#722ed1' },
    { name: '实验室', value: 1098, color: '#13c2c2' },
  ];

  const evaluationData = [
    { name: '直接评估已知软件', value: 4521, color: '#1890ff' },
    { name: '通过功能描述推荐软件', value: 3287, color: '#52c41a' },
    { name: '查找相似功能软件', value: 2156, color: '#faad14' },
  ];

  const trendData = {
    categories: ['01-15', '01-16', '01-17', '01-18', '01-19', '01-20', '01-21'],
    series: [
      {
        name: '开源健康评估',
        data: [12, 15, 11, 18, 14, 22, 19],
        color: '#1890ff',
      },
      {
        name: '开发者画像评估',
        data: [25, 20, 23, 28, 31, 35, 33],
        color: '#52c41a',
      },
      {
        name: '开源选型评估',
        data: [18, 26, 22, 19, 24, 38, 42],
        color: '#faad14',
      },
      {
        name: '开源态势洞察',
        data: [35, 38, 32, 36, 41, 39, 37],
        color: '#f5222d',
      },
      {
        name: '开源数据中枢',
        data: [45, 52, 48, 51, 58, 62, 59],
        color: '#722ed1',
      },
      {
        name: '实验室',
        data: [8, 6, 9, 11, 13, 15, 17],
        color: '#13c2c2',
      },
    ],
  };

  useEffect(() => {
    // 初始化服务点击量饼图
    if (serviceChartRef.current) {
      const serviceChart = echarts.init(serviceChartRef.current);

      const serviceOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '',
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
              length: 15,
              length2: 10,
              smooth: false,
            },
            data: serviceData.map((item) => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: item.color,
              },
            })),
          },
        ],
      };

      serviceChart.setOption(serviceOption);

      const handleServiceResize = () => {
        serviceChart.resize();
      };

      window.addEventListener('resize', handleServiceResize);
    }

    // 初始化服务点击量趋势图
    if (trendChartRef.current) {
      const trendChart = echarts.init(trendChartRef.current);

      const trendOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          show: true,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: trendData.categories,
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 11,
          },
        },
        series: trendData.series.map((item) => ({
          name: item.name,
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series',
          },
          data: item.data,
          itemStyle: {
            color: item.color,
          },
          areaStyle: {
            color: item.color,
            opacity: 0.4,
          },
        })),
      };

      trendChart.setOption(trendOption);

      const handleTrendResize = () => {
        trendChart.resize();
      };

      window.addEventListener('resize', handleTrendResize);
    }

    // 初始化开源选型评估服务使用占比饼图
    if (evaluationChartRef.current) {
      const evaluationChart = echarts.init(evaluationChartRef.current);

      const evaluationOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
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
    }

    // 初始化开源态势洞察维度点击量排名饼图
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
    }

    // 初始化销售额来源饼图
    if (pieChartRef.current) {
      const chart = echarts.init(pieChartRef.current);

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          itemGap: 20,
          textStyle: {
            fontSize: 12,
          },
        },
        series: [
          {
            name: '销售额来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: pieData.map((item) => ({
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

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
        if (serviceChartRef.current) {
          const serviceChart = echarts.getInstanceByDom(
            serviceChartRef.current
          );
          if (serviceChart) {
            window.removeEventListener('resize', () => serviceChart.resize());
            serviceChart.dispose();
          }
        }
        if (trendChartRef.current) {
          const trendChart = echarts.getInstanceByDom(trendChartRef.current);
          if (trendChart) {
            window.removeEventListener('resize', () => trendChart.resize());
            trendChart.dispose();
          }
        }
        if (evaluationChartRef.current) {
          const evaluationChart = echarts.getInstanceByDom(
            evaluationChartRef.current
          );
          if (evaluationChart) {
            window.removeEventListener('resize', () =>
              evaluationChart.resize()
            );
            evaluationChart.dispose();
          }
        }
        if (insightChartRef.current) {
          const insightChart = echarts.getInstanceByDom(
            insightChartRef.current
          );
          if (insightChart) {
            window.removeEventListener('resize', () => insightChart.resize());
            insightChart.dispose();
          }
        }
      };
    }
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* 第一行 */}
        <Col xs={24} lg={12}>
          <Card title="服务点击量占比" className="h-96">
            <div ref={serviceChartRef} className="h-72 w-full"></div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="服务点击量趋势" className="h-96">
            <div ref={trendChartRef} className="h-72 w-full"></div>
          </Card>
        </Col>

        {/* 第二行 */}
        <Col xs={24} lg={12}>
          <Card
            title="仓库/社区、开发者热门搜索"
            className="h-96"
            extra={
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                size="small"
              />
            }
          >
            <Table
              columns={hotSearchColumns}
              dataSource={currentHotSearchData}
              pagination={false}
              size="small"
              scroll={{ y: 250 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="开源态势洞察维度点击量排名" className="h-96">
            <div ref={insightChartRef} className="h-72 w-full"></div>
          </Card>
        </Col>

        {/* 第五个卡片 - 开源选型评估服务使用占比 */}
        <Col xs={24} lg={12}>
          <Card title="开源选型评估服务点击量占比" className="h-96">
            <div ref={evaluationChartRef} className="h-72 w-full"></div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="开源数据中枢点击量排名"
            className="h-96"
            extra={
              <Tabs
                activeKey={dataHubTab}
                onChange={setDataHubTab}
                items={dataHubTabItems}
                size="small"
              />
            }
          >
            <Table
              columns={dataHubColumns}
              dataSource={currentDataHubData}
              pagination={false}
              size="small"
              scroll={{ y: 250 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceMonitor;
