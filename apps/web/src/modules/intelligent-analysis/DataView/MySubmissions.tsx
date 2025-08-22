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
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation('intelligent_analysis');
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
      message.error(t('my_submissions.fetch_error'));
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
      pending: { color: 'default', text: t('my_submissions.status.pending') },
      'under-review': { color: 'processing', text: t('my_submissions.status.reviewing') },
      approved: { color: 'success', text: t('my_submissions.status.approved') },
      rejected: { color: 'error', text: t('my_submissions.status.rejected') },
    };
    const config = statusMap[status as keyof typeof statusMap];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getProjectTypeTag = (type: string) => {
    const typeMap = {
      flutter: { color: 'blue', text: 'Flutter' },
      'react-native': { color: 'cyan', text: 'React Native' },
      ionic: { color: 'purple', text: 'Ionic' },
      other: { color: 'default', text: t('my_submissions.project_types.other') },
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
      title: t('my_submissions.delete_confirm_title'),
      content: t('my_submissions.delete_confirm_content'),
      okText: t('my_submissions.confirm'),
      cancelText: t('my_submissions.cancel'),
      onOk: async () => {
        try {
          // 模拟删除API调用
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSubmissions(prev => prev.filter(item => item.id !== id));
          message.success(t('my_submissions.delete_success'));
        } catch (error) {
          message.error(t('my_submissions.delete_error'));
        }
      },
    });
  };

  const columns: ColumnsType<Submission> = [
    {
      title: t('my_submissions.table.project_name'),
      dataIndex: 'projectName',
      key: 'projectName',
      width: '20%',
    },
    {
      title: t('my_submissions.table.project_type'),
      dataIndex: 'projectType',
      key: 'projectType',
      width: '12%',
      render: (type: string) => getProjectTypeTag(type),
    },
    {
      title: t('my_submissions.table.status'),
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: t('my_submissions.table.score'),
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
      title: t('my_submissions.table.submit_time'),
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: '15%',
    },
    {
      title: t('my_submissions.table.review_time'),
      dataIndex: 'reviewTime',
      key: 'reviewTime',
      width: '15%',
      render: (time?: string) => time || '-',
    },
    {
      title: t('my_submissions.table.actions'),
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
            {t('my_submissions.view')}
          </Button>
          {record.status === 'pending' && (
            <Button type="link" icon={<EditOutlined />} size="small">
              {t('my_submissions.edit')}
            </Button>
          )}
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            {t('my_submissions.delete')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('my_submissions.title')}</h1>
          <p className="mt-2 text-gray-600">{t('my_submissions.description')}</p>
        </div>

        <Card>
          {/* 搜索和筛选区域 */}
          <div className="mb-6">
            <Space wrap size="middle">
              <Search
                placeholder={t('my_submissions.search_placeholder')}
                style={{ width: 300 }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                allowClear
              />
              <Select
                placeholder={t('my_submissions.filter_status')}
                style={{ width: 120 }}
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Select.Option value="all">{t('my_submissions.all_status')}</Select.Option>
                <Select.Option value="pending">{t('my_submissions.status.pending')}</Select.Option>
                <Select.Option value="under-review">{t('my_submissions.status.reviewing')}</Select.Option>
                <Select.Option value="approved">{t('my_submissions.status.approved')}</Select.Option>
                <Select.Option value="rejected">{t('my_submissions.status.rejected')}</Select.Option>
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
                t('my_submissions.pagination_total', { start: range[0], end: range[1], total }),
            }}
          />
        </Card>

        {/* 详情弹窗 */}
        <Modal
          title={t('my_submissions.detail_modal_title')}
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedSubmission && (
            <Descriptions column={2} bordered>
              <Descriptions.Item label={t('my_submissions.detail.project_name')} span={2}>
                {selectedSubmission.projectName}
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.project_type')}>
                {getProjectTypeTag(selectedSubmission.projectType)}
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.status')}>
                {getStatusTag(selectedSubmission.status)}
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.submit_time')}>
                {selectedSubmission.submitTime}
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.review_time')}>
                {selectedSubmission.reviewTime || t('my_submissions.detail.not_reviewed')}
              </Descriptions.Item>
              {selectedSubmission.score && (
                <Descriptions.Item label={t('my_submissions.detail.score')} span={2}>
                  <span className="text-lg font-semibold text-blue-600">
                    {selectedSubmission.score}
                  </span>
                </Descriptions.Item>
              )}
              <Descriptions.Item label={t('my_submissions.detail.description')} span={2}>
                {selectedSubmission.description}
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.repository')} span={2}>
                <a
                  href={selectedSubmission.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedSubmission.repositoryUrl}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.contact_email')} span={2}>
                {selectedSubmission.contactEmail}
              </Descriptions.Item>
              <Descriptions.Item label={t('my_submissions.detail.tags')} span={2}>
                {selectedSubmission.tags.map((tag) => (
                  <Tag key={tag} color="blue">
                    {tag}
                  </Tag>
                ))}
              </Descriptions.Item>
              {selectedSubmission.reviewComments && (
                <Descriptions.Item label={t('my_submissions.detail.review_comments')} span={2}>
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
