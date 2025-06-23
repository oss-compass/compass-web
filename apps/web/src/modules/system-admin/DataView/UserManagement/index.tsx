import React, { useState } from 'react';
import { Card, Table, Tag, Button, Space, Input, Tooltip } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface UserData {
  key: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'oh_user';
  lastLogin: string;
  createTime: string;
  behaviorProfile: {
    name: string;
    value: number;
    color: string;
  }[];
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

const UserManagement: React.FC = () => {
  const columns: ColumnsType<UserData> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: '15%',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: '12%',
      render: (role: string) => {
        const config = {
          admin: { color: 'red', text: '管理员' },
          user: { color: 'blue', text: '普通用户' },
          oh_user: { color: 'purple', text: 'OH用户' },
        };
        const { color, text } = config[role as keyof typeof config] || {
          color: 'default',
          text: '未知',
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '用户行为分析(点击量)',
      dataIndex: 'behaviorProfile',
      key: 'behaviorProfile',
      width: '25%',
      render: (behaviorProfile: UserData['behaviorProfile']) => (
        <BehaviorProfile data={behaviorProfile} />
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: '15%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '10%',
    },
    {
      title: '操作',
      key: 'action',
      width: '13%',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            删除
          </Button>
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

  const data: UserData[] = [
    {
      key: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      lastLogin: '2024-01-15 10:30:00',
      createTime: '2023-01-01',
      behaviorProfile: generateBehaviorProfile([0, 1, 2, 3, 4, 5]), // 全部类型
    },
    {
      key: '2',
      username: 'john_doe',
      email: 'john@example.com',
      role: 'user',
      lastLogin: '2024-01-14 15:45:00',
      createTime: '2023-06-15',
      behaviorProfile: generateBehaviorProfile([0, 2]), // 只有健康评估和选型评估
    },
    {
      key: '3',
      username: 'oh_user1',
      email: 'oh@example.com',
      role: 'oh_user',
      lastLogin: '2024-01-13 09:20:00',
      createTime: '2023-03-10',
      behaviorProfile: generateBehaviorProfile([1, 3, 5]), // 画像评估、态势洞察、实验室
    },
    {
      key: '4',
      username: 'regular_user',
      email: 'user@example.com',
      role: 'user',
      lastLogin: '2024-01-01 08:00:00',
      createTime: '2023-12-01',
      behaviorProfile: generateBehaviorProfile([0]), // 只有健康评估
    },
    {
      key: '5',
      username: 'developer_zhang',
      email: 'zhang@tech.com',
      role: 'user',
      lastLogin: '2024-01-12 14:20:00',
      createTime: '2023-08-20',
      behaviorProfile: generateBehaviorProfile([1, 4]), // 画像评估和数据中枢
    },
    {
      key: '6',
      username: 'manager_li',
      email: 'li@company.com',
      role: 'oh_user',
      lastLogin: '2024-01-11 16:45:00',
      createTime: '2023-05-12',
      behaviorProfile: generateBehaviorProfile([2, 3]), // 选型评估和态势洞察
    },
    {
      key: '7',
      username: 'researcher_wang',
      email: 'wang@research.org',
      role: 'user',
      lastLogin: '2024-01-10 11:30:00',
      createTime: '2023-09-08',
      behaviorProfile: generateBehaviorProfile([5]), // 只有实验室
    },
    {
      key: '8',
      username: 'analyst_chen',
      email: 'chen@analytics.com',
      role: 'user',
      lastLogin: '2024-01-09 13:15:00',
      createTime: '2023-11-25',
      behaviorProfile: generateBehaviorProfile([3, 4]), // 态势洞察和数据中枢
    },
    {
      key: '9',
      username: 'architect_liu',
      email: 'liu@architect.net',
      role: 'oh_user',
      lastLogin: '2024-01-08 09:45:00',
      createTime: '2023-04-18',
      behaviorProfile: generateBehaviorProfile([0, 2, 4]), // 健康评估、选型评估、数据中枢
    },
    {
      key: '10',
      username: 'student_zhao',
      email: 'zhao@university.edu',
      role: 'user',
      lastLogin: '2024-01-07 20:30:00',
      createTime: '2023-10-15',
      behaviorProfile: generateBehaviorProfile([1, 5]), // 画像评估和实验室
    },
    {
      key: '11',
      username: 'consultant_wu',
      email: 'wu@consulting.com',
      role: 'user',
      lastLogin: '2024-01-06 12:00:00',
      createTime: '2023-07-30',
      behaviorProfile: generateBehaviorProfile([0, 1, 3]), // 健康评估、画像评估、态势洞察
    },
    {
      key: '12',
      username: 'engineer_sun',
      email: 'sun@engineering.com',
      role: 'user',
      lastLogin: '2024-01-05 15:20:00',
      createTime: '2023-12-10',
      behaviorProfile: generateBehaviorProfile([4]), // 只有数据中枢
    },
  ];

  return (
    <div>
      {/* <h1 className="mb-6 text-2xl font-bold text-gray-800">用户管理</h1> */}

      <Card title="用户管理">
        <div className="mb-4 flex items-center justify-between">
          <Space>
            <Input
              placeholder="搜索用户名或邮箱"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />}>
            添加用户
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
        />
      </Card>
    </div>
  );
};

export default UserManagement;
