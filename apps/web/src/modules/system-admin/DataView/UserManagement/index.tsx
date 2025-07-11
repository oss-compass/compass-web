import React, { useState, useEffect } from 'react';
import {
  Card,
  Tag,
  Button,
  Space,
  Input,
  Tooltip,
  message,
  Modal,
  Select,
} from 'antd';
import MyTable from '@common/components/Table';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
  role_level: number;
  role_level_desc: string;
  last_sign_in_at: string;
  created_at: string;
}

interface ApiResponse {
  total: number;
  page: number;
  per_page: number;
  data: UserData[];
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
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [keywords, setKeywords] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');

  // 编辑相关状态
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [selectedRoleLevel, setSelectedRoleLevel] = useState<number>(1);
  const [editLoading, setEditLoading] = useState(false);

  // 角色选项
  const roleOptions = [
    { label: '普通用户', value: 0 },
    { label: 'OH 用户', value: 2 },
    { label: '管理员', value: 7 },
  ];

  // API 调用函数
  const fetchUserData = async (
    page: number = 1,
    per_page: number = 20,
    keywords: string = ''
  ) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        '/api/v2/admin/manage_user_list',
        {
          keywords,
          page,
          per_page,
        }
      );

      setUserData(response.data.data);
      setTotal(response.data.total);
      setCurrentPage(response.data.page);
      setPageSize(response.data.per_page);
    } catch (error) {
      console.error('获取用户数据失败：', error);
      message.error('获取用户数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 更新用户角色 API
  const updateUserRole = async (id: number, role_level: number) => {
    setEditLoading(true);
    try {
      const response = await axios.post('/api/v2/admin/update_user_role', {
        id,
        role_level,
      });

      if (response.data.message === 'ok') {
        message.success('用户角色更新成功');

        // 更新本地数据
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === id
              ? { ...user, role_level: response.data.new_role_level }
              : user
          )
        );

        setEditModalVisible(false);
        setEditingUser(null);
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      console.error('更新用户角色失败：', error);
      message.error('更新用户角色失败');
    } finally {
      setEditLoading(false);
    }
  };

  // 组件加载时获取数据
  useEffect(() => {
    fetchUserData();
  }, []);

  // 搜索处理
  const handleSearch = () => {
    setSearchKeywords(keywords);
    fetchUserData(1, pageSize, keywords);
  };

  // 分页处理
  const handleTableChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    fetchUserData(page, size, searchKeywords);
  };

  // 角色标签渲染
  const getRoleTag = (roleLevel: number, roleDesc: string) => {
    // 根据 role_level_desc 或 role_level 判断角色类型
    if (roleLevel === 7) {
      return <Tag color="red">管理员</Tag>;
    } else if (roleLevel === 2) {
      return <Tag color="purple">OH 用户</Tag>;
    } else {
      return <Tag color="blue">普通用户</Tag>;
    }
  };

  // 打开编辑模态框
  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setSelectedRoleLevel(user.role_level);
    setEditModalVisible(true);
  };

  // 取消编辑
  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingUser(null);
    setSelectedRoleLevel(1);
  };

  // 确认编辑
  const handleEditConfirm = () => {
    if (editingUser) {
      updateUserRole(editingUser.id, selectedRoleLevel);
    }
  };

  const columns: ColumnsType<UserData> = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
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
      key: 'role',
      width: '12%',
      render: (_, record) =>
        getRoleTag(record.role_level, record.role_level_desc),
    },
    {
      title: '最后登录',
      dataIndex: 'last_sign_in_at',
      key: 'last_sign_in_at',
      width: '15%',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      width: '13%',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title="用户管理">
        <div className="mb-4 flex items-center justify-between">
          <Space>
            <Input
              placeholder="搜索用户名或邮箱"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onPressEnter={handleSearch}
            />
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
          </Space>
        </div>

        <MyTable
          columns={columns}
          dataSource={userData}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            onChange: handleTableChange,
            onShowSizeChange: handleTableChange,
          }}
        />

        {/* 编辑用户角色模态框 */}
        <Modal
          title="编辑用户角色"
          open={editModalVisible}
          onOk={handleEditConfirm}
          onCancel={handleEditCancel}
          confirmLoading={editLoading}
          okText="确定"
          cancelText="取消"
        >
          {editingUser && (
            <div>
              <p>
                <strong>用户名：</strong>
                {editingUser.name}
              </p>
              <p>
                <strong>邮箱：</strong>
                {editingUser.email}
              </p>
              <div style={{ marginTop: 16 }}>
                <label>角色：</label>
                <Select
                  value={selectedRoleLevel}
                  onChange={setSelectedRoleLevel}
                  style={{ width: '100%', marginTop: 8 }}
                  options={roleOptions}
                />
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default UserManagement;
