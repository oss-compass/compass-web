import React, { useMemo, useState } from 'react';
import {
  ApiOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
  BuildOutlined,
  CodeOutlined,
  CopyOutlined,
  DashboardOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  Layout,
  Row,
  Select,
  Space,
  Statistic,
  Segmented,
  Typography,
} from 'antd';

const { Content, Sider } = Layout;
const { Text, Title } = Typography;

type OverviewMetric = {
  key: string;
  title: string;
  value: string | number;
  suffix?: string;
  extra?: string;
  delta: string;
  color: string;
};

type JourneyScene = {
  key: string;
  title: string;
  icon: React.ReactNode;
  actions: string[];
};

const journeyScenes: JourneyScene[] = [
  {
    key: 'search',
    title: '搜索与发现',
    icon: <AppstoreOutlined />,
    actions: [
      '输入搜索关键词',
      '浏览搜索结果',
      '识别并确认正确仓库URL',
      '区分同名/近名项目',
    ],
  },
  {
    key: 'guide',
    title: '理解与导航',
    icon: <ApiOutlined />,
    actions: [
      '阅读README.md',
      '定位QuickStart文档',
      '解析文档中的超链接',
      '理解项目目录结构',
      '识别文档中的外部依赖跳转',
    ],
  },
  {
    key: 'env',
    title: '环境准备',
    icon: <DashboardOutlined />,
    actions: [
      '选择硬件路径(本地/云)',
      '创建云开发环境(如需)',
      '下载并安装SDK/Toolkit',
      '配置环境变量',
      '验证工具链可用(如编译器版本检查)',
    ],
  },
  {
    key: 'code',
    title: '获取代码',
    icon: <CopyOutlined />,
    actions: [
      'git clone仓库',
      '设置文件权限',
      '安装requirements/依赖',
      '处理网络超时/重试',
    ],
  },
  {
    key: 'build',
    title: '编译构建',
    icon: <CodeOutlined />,
    actions: [
      '阅读构建参数说明',
      '选择目标芯片/架构',
      '执行构建命令',
      '诊断编译错误',
      '确认构建产物生成',
    ],
  },
  {
    key: 'deploy',
    title: '部署安装',
    icon: <BuildOutlined />,
    actions: [
      '执行安装命令(.run/make install)',
      '确认安装路径正确',
      '验证算子/模块已注册',
      '检查版本兼容性',
    ],
  },
  {
    key: 'verify',
    title: '运行验证',
    icon: <ToolOutlined />,
    actions: [
      '选择运行模式',
      '执行示例程序',
      '检查输出结果',
      '对比精度/预期',
      '确认端到端成功',
    ],
  },
];

const overviewMetrics: OverviewMetric[] = [
  {
    key: 'success',
    title: '开发成功率',
    value: 80,
    suffix: '%',
    extra: '(8/10)',
    delta: '+2',
    color: '#1677ff',
  },
  {
    key: 'pass',
    title: '用时执行通过率',
    value: 45,
    suffix: '%',
    extra: '(8/10)',
    delta: '+2',
    color: '#722ed1',
  },
  {
    key: 'tokens',
    title: '平均复杂度（tokens消耗量）',
    value: '1,230',
    delta: '+2',
    color: '#13c2c2',
  },
  {
    key: 'duration',
    title: '平均任务执行时长',
    value: 128,
    suffix: 'min',
    delta: '+2',
    color: '#b37feb',
  },
];

const MetricBarVisual: React.FC<{ color: string }> = ({ color }) => {
  const heights = [18, 24, 20, 32, 22, 28];

  return (
    <div className="flex h-16 items-end gap-1">
      {heights.map((height, index) => (
        <span
          key={`${color}-${height}-${index}`}
          className="w-3 rounded-full opacity-20"
          style={{ height, backgroundColor: color }}
        />
      ))}
      <span
        className="ml-1 w-3 rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
        style={{ height: 42, backgroundColor: color }}
      />
    </div>
  );
};

const MetricLineVisual: React.FC<{ color: string; points: number[] }> = ({
  color,
  points,
}) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const polyline = points
    .map((value, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * 100;
      const y = 34 - ((value - min) / Math.max(max - min, 1)) * 20;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 40" className="h-16 w-28 overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={polyline}
      />
    </svg>
  );
};

const getSceneColor = (key: string) => {
  switch (key) {
    case 'search':
      return '#1677ff';
    case 'guide':
      return '#722ed1';
    case 'env':
      return '#13c2c2';
    case 'code':
      return '#52c41a';
    case 'build':
      return '#faad14';
    case 'deploy':
      return '#eb2f96';
    default:
      return '#2f54eb';
  }
};

const UserJourney: React.FC = () => {
  const [activeSceneKey, setActiveSceneKey] = useState(journeyScenes[0].key);
  const [developerType, setDeveloperType] = useState('外部入门开发者');

  const currentScene = useMemo(
    () =>
      journeyScenes.find((scene) => scene.key === activeSceneKey) ||
      journeyScenes[0],
    [activeSceneKey]
  );

  return (
    <div className="min-h-full bg-[#f5f7fb]">
      <nav className="flex h-14 items-center justify-between border-b border-t bg-white px-6 md:h-12 md:px-4">
        <div className="relative flex h-10 flex-1 items-center gap-3 overflow-hidden pl-4 text-xl font-semibold ">
          <Select
            value={developerType}
            onChange={setDeveloperType}
            bordered={false}
            options={[
              { label: '外部入门开发者', value: '外部入门开发者' },
              { label: 'Ascend C算子开发', value: 'Ascend C算子开发' },
            ]}
            className="min-w-[185px] [&_.ant-select-arrow]:text-slate-700 [&_.ant-select-selection-item]:!text-xl [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!leading-10 [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!shadow-none"
            dropdownStyle={{ minWidth: 200 }}
          />
          <div className="ml-4 mt-2">
            <Segmented
              value={'开发算子入门'}
              style={{ marginBottom: 8 }}
              // onChange={setAlignValue}
              options={['开发算子入门', '调用算子学习']}
            />
          </div>
        </div>
      </nav>

      <Layout
        style={{
          background: 'transparent',
          padding: 20,
          alignItems: 'stretch',
          minHeight: 'calc(100vh - 136px)',
          boxSizing: 'border-box',
        }}
      >
        <Sider
          width={260}
          theme="light"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: 24,
            padding: 16,
            marginRight: 20,
            minHeight: 'calc(100vh - 176px)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.05)',
            boxSizing: 'border-box',
          }}
        >
          <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
            典型场景
          </Title>
          <Space direction="vertical" size={12} className="w-full">
            {journeyScenes.map((scene, index) => {
              const isActive = scene.key === activeSceneKey;

              return (
                <button
                  key={scene.key}
                  type="button"
                  onClick={() => setActiveSceneKey(scene.key)}
                  className={`w-full cursor-pointer rounded-2xl border text-left transition-all duration-200 ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)]'
                      : 'border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)]'
                  }`}
                >
                  <div className="flex items-center gap-3 px-4 py-4">
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? 'bg-white/12 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div
                      className={`min-w-0 truncate text-sm font-semibold ${
                        isActive ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {scene.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </Space>
        </Sider>

        <Content style={{ display: 'flex', minHeight: 'calc(100vh - 176px)' }}>
          <Card
            bordered={false}
            className="h-full w-full rounded-3xl"
            bodyStyle={{ minHeight: 'calc(100vh - 176px - 2px)' }}
          >
            <div className="mb-8">
              <div className="mb-4 text-2xl font-semibold text-slate-900">
                指标概览
              </div>
              <Row gutter={[16, 16]}>
                {overviewMetrics.map((metric) => (
                  <Col xs={24} md={12} xl={6} key={metric.key}>
                    <Card
                      bordered
                      className="h-full rounded-2xl border-slate-300 shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                    >
                      <Space direction="vertical" size={12} className="w-full">
                        <Text className="text-base font-semibold text-slate-800">
                          {metric.title}
                        </Text>
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <Statistic
                              value={metric.value}
                              suffix={metric.suffix}
                              valueStyle={{
                                fontSize: 32,
                                fontWeight: 600,
                                color: '#111827',
                              }}
                            />
                            {metric.extra ? (
                              <Text type="secondary">{metric.extra}</Text>
                            ) : null}
                            <div>
                              <Text style={{ color: '#52c41a', fontSize: 12 }}>
                                ↑ {metric.delta}
                              </Text>
                            </div>
                          </div>
                          <div className="flex min-w-[110px] justify-end">
                            {metric.key === 'success' ||
                            metric.key === 'pass' ? (
                              <MetricBarVisual color={metric.color} />
                            ) : (
                              <MetricLineVisual
                                color={metric.color}
                                points={
                                  metric.key === 'tokens'
                                    ? [16, 22, 18, 21, 19, 30, 20, 18]
                                    : [14, 21, 13, 20, 15, 22, 14]
                                }
                              />
                            )}
                          </div>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <div>
              <div className="mb-4 text-2xl font-semibold text-slate-900">
                开发旅程
              </div>
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${currentScene.actions.length}, minmax(0, 1fr))`,
                }}
              >
                {currentScene.actions.map((action, index) => (
                  <Card
                    key={`${currentScene.key}-${action}`}
                    bordered
                    className="h-[176px] rounded-2xl border-slate-300 shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                    headStyle={{
                      minHeight: 174,
                      padding: 20,
                      borderBottom: 'none',
                    }}
                    title={
                      <div className="flex h-full items-start gap-3">
                        <div
                          className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-semibold"
                          style={{
                            color: getSceneColor(currentScene.key),
                            background: `${getSceneColor(currentScene.key)}12`,
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="whitespace-normal break-words text-base font-semibold leading-8 text-slate-900">
                          {action}
                        </div>
                      </div>
                    }
                    bodyStyle={{ display: 'none' }}
                  />
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="https://onebox.huawei.com/v/ae8e6ec514aec0689eb41ea813c9c1e2?type=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#1677ff] hover:underline"
                >
                  查看报告
                  <ArrowRightOutlined />
                </a>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default UserJourney;
