import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Tooltip,
  Progress,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface UserListData {
  key: string;
  username: string;
  email: string;
  country: string;
  city: string;
  behaviorProfile: {
    name: string;
    value: number;
    color: string;
  }[];
  avgActiveTime: number; // 平均活跃时长（分钟）
  organization: string;
  reportCount: number;
  reportDetails: string[];
}

interface BehaviorProfileProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const BehaviorProfile: React.FC<BehaviorProfileProps> = ({ data }) => {
  const [hoveredType, setHoveredType] = useState<string>('');
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="w-full">
      <div className="flex h-2.5 items-center  overflow-hidden">
        {data.map(({ name, value, color }) => {
          const width = (value / maxValue) * 100;
          return (
            <Tooltip key={name} title={`${name}: ${value}`}>
              <div
                style={{
                  backgroundColor: color,
                  opacity: 0.6,
                  width: `${width}%`,
                  border: hoveredType === name ? '1px solid #000' : 'none',
                }}
                className="h-full cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredType(name)}
                onMouseLeave={() => setHoveredType('')}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

const UserList: React.FC = () => {
  const columns: ColumnsType<UserListData> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: '12%',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
    },
    {
      title: '地域',
      key: 'location',
      width: '12%',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.country}</div>
          <div className="text-xs text-gray-500">{record.city}</div>
        </div>
      ),
    },
    {
      title: '服务使用量(点击量)',
      dataIndex: 'behaviorProfile',
      key: 'behaviorProfile',
      width: '25%',
      render: (behaviorProfile: UserListData['behaviorProfile']) => (
        <BehaviorProfile data={behaviorProfile} />
      ),
    },
    {
      title: '平均活跃时长',
      dataIndex: 'avgActiveTime',
      key: 'avgActiveTime',
      width: '10%',
      render: (time: number) => (
        <div className="text-center">
          <div className="font-medium">{time}分钟</div>
          <Progress
            percent={Math.min((time / 120) * 100, 100)}
            size="small"
            strokeColor={
              time > 60 ? '#52c41a' : time > 30 ? '#faad14' : '#f5222d'
            }
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: '组织信息',
      dataIndex: 'organization',
      key: 'organization',
      width: '12%',
      render: (org: string) => <Tag color="blue">{org}</Tag>,
    },
    {
      title: '提交报告数量',
      dataIndex: 'reportCount',
      key: 'reportCount',
      width: '8%',
      render: (count: number) => (
        <div className="text-center">
          <div className="text-lg font-medium">{count}</div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: '6%',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="查看报告详情">
            <Button type="link" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          {/* <Tooltip title="编辑用户">
            <Button type="link" icon={<EditOutlined />} size="small" />
          </Tooltip> */}
        </Space>
      ),
    },
  ];

  // 生成用户行为画像数据
  const generateBehaviorProfile = (activeTypes: number[] = []) => {
    const baseData = [
      { name: '开源健康评估', value: 0, color: '#1890ff' },
      { name: '开发者画像评估', value: 0, color: '#52c41a' },
      { name: '开源选型评估', value: 0, color: '#faad14' },
      { name: '开源态势洞察', value: 0, color: '#f5222d' },
      { name: '开源数据中枢', value: 0, color: '#722ed1' },
      { name: '实验室', value: 0, color: '#13c2c2' },
    ];

    return baseData.map((item, index) => ({
      ...item,
      value:
        activeTypes.length === 0 || activeTypes.includes(index)
          ? Math.floor(Math.random() * 3000) + 100
          : 0,
    }));
  };

  // 生成报告详情
  const generateReportDetails = (count: number): string[] => {
    const reportTypes = [
      '开源项目健康度评估报告',
      '技术栈选型分析报告',
      '开发者能力评估报告',
      '开源生态趋势报告',
      '项目风险评估报告',
    ];

    return Array.from(
      { length: count },
      (_, i) =>
        `${
          reportTypes[i % reportTypes.length]
        }_${new Date().getFullYear()}_${String(i + 1).padStart(3, '0')}`
    );
  };

  const data: UserListData[] = [
    {
      key: '1',
      username: 'admin',
      email: 'admin@example.com',
      country: '中国',
      city: '北京',
      behaviorProfile: generateBehaviorProfile([0, 1, 2, 3, 4, 5]), // 全部类型
      avgActiveTime: 95,
      organization: 'OSS Compass',
      reportCount: 15,
      reportDetails: generateReportDetails(15),
    },
    {
      key: '2',
      username: 'john_doe',
      email: 'john@example.com',
      country: '美国',
      city: '纽约',
      behaviorProfile: generateBehaviorProfile([0, 2]), // 只有健康评估和选型评估
      avgActiveTime: 67,
      organization: 'Tech Corp',
      reportCount: 8,
      reportDetails: generateReportDetails(8),
    },
    {
      key: '3',
      username: 'oh_user1',
      email: 'oh@example.com',
      country: '中国',
      city: '深圳',
      behaviorProfile: generateBehaviorProfile([1, 3, 5]), // 画像评估、态势洞察、实验室
      avgActiveTime: 123,
      organization: 'OpenHarmony',
      reportCount: 22,
      reportDetails: generateReportDetails(22),
    },
    {
      key: '4',
      username: 'regular_user',
      email: 'user@example.com',
      country: '德国',
      city: '柏林',
      behaviorProfile: generateBehaviorProfile([0]), // 只有健康评估
      avgActiveTime: 34,
      organization: 'StartupGmbH',
      reportCount: 3,
      reportDetails: generateReportDetails(3),
    },
    {
      key: '5',
      username: 'developer_zhang',
      email: 'zhang@tech.com',
      country: '中国',
      city: '上海',
      behaviorProfile: generateBehaviorProfile([1, 4]), // 画像评估和数据中枢
      avgActiveTime: 89,
      organization: '科技公司',
      reportCount: 12,
      reportDetails: generateReportDetails(12),
    },
    {
      key: '6',
      username: 'manager_li',
      email: 'li@company.com',
      country: '日本',
      city: '东京',
      behaviorProfile: generateBehaviorProfile([2, 3]), // 选型评估和态势洞察
      avgActiveTime: 76,
      organization: 'Enterprise Ltd',
      reportCount: 18,
      reportDetails: generateReportDetails(18),
    },
    {
      key: '7',
      username: 'researcher_wang',
      email: 'wang@research.org',
      country: '英国',
      city: '伦敦',
      behaviorProfile: generateBehaviorProfile([5]), // 只有实验室
      avgActiveTime: 145,
      organization: '研究院',
      reportCount: 25,
      reportDetails: generateReportDetails(25),
    },
    {
      key: '8',
      username: 'analyst_chen',
      email: 'chen@analytics.com',
      country: '加拿大',
      city: '多伦多',
      behaviorProfile: generateBehaviorProfile([3, 4]), // 态势洞察和数据中枢
      avgActiveTime: 52,
      organization: 'Analytics Inc',
      reportCount: 7,
      reportDetails: generateReportDetails(7),
    },
    {
      key: '9',
      username: 'architect_liu',
      email: 'liu@architect.net',
      country: '澳大利亚',
      city: '悉尼',
      behaviorProfile: generateBehaviorProfile([0, 2, 4]), // 健康评估、选型评估、数据中枢
      avgActiveTime: 98,
      organization: 'Design Studio',
      reportCount: 14,
      reportDetails: generateReportDetails(14),
    },
    {
      key: '10',
      username: 'student_zhao',
      email: 'zhao@university.edu',
      country: '韩国',
      city: '首尔',
      behaviorProfile: generateBehaviorProfile([1, 5]), // 画像评估和实验室
      avgActiveTime: 28,
      organization: '大学',
      reportCount: 2,
      reportDetails: generateReportDetails(2),
    },
  ];

  return (
    <div>
      <Card title="用户列表">
        <div className="mb-4 flex items-center justify-between">
          <Space>
            <Input
              placeholder="搜索用户名、邮箱或组织"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />}>
            导出数据
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default UserList;
