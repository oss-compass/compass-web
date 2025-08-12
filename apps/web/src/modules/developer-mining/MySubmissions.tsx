import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Descriptions,
  message,
  Input,
  Select,
} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;

interface Submission {
  id: string;
  projectName: string;
  projectType: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submitTime: string;
  reviewTime?: string;
  score?: number;
  description: string;
  repositoryUrl: string;
  contactEmail: string;
  tags: string[];
  reviewComments?: string;
}

const MySubmissions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(
    []
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 模拟数据
  const mockData: Submission[] = [
    {
      id: '1',
      projectName: 'Flutter商城应用',
      projectType: 'flutter',
      status: 'approved',
      submitTime: '2024-01-15 10:30:00',
      reviewTime: '2024-01-18 14:20:00',
      score: 85.5,
      description:
        '基于Flutter开发的电商应用，包含商品展示、购物车、支付等功能',
      repositoryUrl: 'https://github.com/user/flutter-shop',
      contactEmail: 'user@example.com',
      tags: ['移动应用', '电商', 'Flutter'],
      reviewComments: '项目结构清晰，代码质量良好，功能完整。',
    },
    {
      id: '2',
      projectName: 'React Native天气应用',
      projectType: 'react-native',
      status: 'under-review',
      submitTime: '2024-01-20 09:15:00',
      description: '跨平台天气预报应用，支持多城市天气查询',
      repositoryUrl: 'https://github.com/user/rn-weather',
      contactEmail: 'user@example.com',
      tags: ['移动应用', '工具', 'React Native'],
    },
    {
      id: '3',
      projectName: 'Ionic教育平台',
      projectType: 'ionic',
      status: 'rejected',
      submitTime: '2024-01-10 16:45:00',
      reviewTime: '2024-01-12 11:30:00',
      description: '在线教育平台，支持课程学习和考试功能',
      repositoryUrl: 'https://github.com/user/ionic-edu',
      contactEmail: 'user@example.com',
      tags: ['移动应用', '教育', 'Ionic'],
      reviewComments: '项目缺少核心功能实现，代码结构需要优化。',
    },
  ];

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchKeyword, statusFilter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmissions(mockData);
    } catch (error) {
      message.error('获取提交记录失败');
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    // 状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // 关键词搜索
    if (searchKeyword) {
      filtered = filtered.filter(
        (item) =>
          item.projectName
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          item.description.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    setFilteredSubmissions(filtered);
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      pending: { color: 'default', text: '待审核' },
      'under-review': { color: 'processing', text: '审核中' },
      approved: { color: 'success', text: '已通过' },
      rejected: { color: 'error', text: '已拒绝' },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getProjectTypeTag = (type: string) => {
    const typeMap = {
      flutter: { color: 'blue', text: 'Flutter' },
      'react-native': { color: 'cyan', text: 'React Native' },
      ionic: { color: 'purple', text: 'Ionic' },
      other: { color: 'default', text: '其他' },
    };
    const config = typeMap[type as keyof typeof typeMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleViewDetail = (record: Submission) => {
    setSelectedSubmission(record);
    setDetailModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个提交记录吗？此操作不可恢复。',
      onOk: async () => {
        try {
          // 模拟删除API调用
          await new Promise((resolve) => setTimeout(resolve, 300));
          setSubmissions((prev) => prev.filter((item) => item.id !== id));
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const columns: ColumnsType<Submission> = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '20%',
    },
    {
      title: '项目类型',
      dataIndex: 'projectType',
      key: 'projectType',
      width: '12%',
      render: (type: string) => getProjectTypeTag(type),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: '8%',
      render: (score?: number) =>
        score ? (
          <span className="font-semibold text-blue-600">{score}</span>
        ) : (
          '-'
        ),
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: '15%',
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      key: 'reviewTime',
      width: '15%',
      render: (time?: string) => time || '-',
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetail(record)}
          >
            查看
          </Button>
          {record.status === 'pending' && (
            <Button type="link" icon={<EditOutlined />} size="small">
              编辑
            </Button>
          )}
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">我的提交</h1>
          <p className="mt-2 text-gray-600">查看和管理您提交的项目状态。</p>
        </div>

        <Card>
          {/* 搜索和筛选区域 */}
          <div className="mb-6">
            <Space wrap size="middle">
              <Search
                placeholder="搜索项目名称或描述"
                style={{ width: 300 }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                allowClear
              />
              <Select
                placeholder="筛选状态"
                style={{ width: 120 }}
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Select.Option value="all">全部状态</Select.Option>
                <Select.Option value="pending">待审核</Select.Option>
                <Select.Option value="under-review">审核中</Select.Option>
                <Select.Option value="approved">已通过</Select.Option>
                <Select.Option value="rejected">已拒绝</Select.Option>
              </Select>
            </Space>
          </div>

          {/* 表格 */}
          <Table
            columns={columns}
            dataSource={filteredSubmissions}
            loading={loading}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            }}
          />
        </Card>

        {/* 详情弹窗 */}
        <Modal
          title="提交详情"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedSubmission && (
            <Descriptions column={2} bordered>
              <Descriptions.Item label="项目名称" span={2}>
                {selectedSubmission.projectName}
              </Descriptions.Item>
              <Descriptions.Item label="项目类型">
                {getProjectTypeTag(selectedSubmission.projectType)}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(selectedSubmission.status)}
              </Descriptions.Item>
              <Descriptions.Item label="提交时间">
                {selectedSubmission.submitTime}
              </Descriptions.Item>
              <Descriptions.Item label="审核时间">
                {selectedSubmission.reviewTime || '未审核'}
              </Descriptions.Item>
              {selectedSubmission.score && (
                <Descriptions.Item label="得分" span={2}>
                  <span className="text-lg font-semibold text-blue-600">
                    {selectedSubmission.score}
                  </span>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="项目描述" span={2}>
                {selectedSubmission.description}
              </Descriptions.Item>
              <Descriptions.Item label="代码仓库" span={2}>
                <a
                  href={selectedSubmission.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedSubmission.repositoryUrl}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="联系邮箱" span={2}>
                {selectedSubmission.contactEmail}
              </Descriptions.Item>
              <Descriptions.Item label="项目标签" span={2}>
                {selectedSubmission.tags.map((tag) => (
                  <Tag key={tag} color="blue">
                    {tag}
                  </Tag>
                ))}
              </Descriptions.Item>
              {selectedSubmission.reviewComments && (
                <Descriptions.Item label="审核意见" span={2}>
                  {selectedSubmission.reviewComments}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MySubmissions;
