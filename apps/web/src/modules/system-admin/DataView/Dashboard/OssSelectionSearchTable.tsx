import React, { useState, useEffect, useCallback } from 'react';
import { Card, message, Tag, Tooltip, Typography, Empty, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import MyTable from '@common/components/Table';
import {
  useOssSelectionSearchData,
  OssSelectionSearchItem,
  useDateParams,
} from '../../hooks';
import dayjs from 'dayjs';

interface OssSelectionSearchTableProps {
  className?: string;
}

const { Text } = Typography;

const OssSelectionSearchTable: React.FC<OssSelectionSearchTableProps> = ({
  className,
}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // 使用自定义 Hook 获取数据
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useOssSelectionSearchData(page, pageSize);

  // 处理 API 返回的数据结构
  const tableData = apiResponse?.data || [];
  const total = apiResponse?.total || 0;

  // 模块类型映射
  const moduleTypeMap: Record<string, string> = {
    similar_software_section: '查找相似功能软件',
    assessment_section_search: '直接评估已知软件',
    recommendation_section_search: '通过功能描述推荐软件',
  };

  // 模块类型对应的标签颜色
  const moduleTypeColorMap: Record<string, string> = {
    similar_software_section: 'orange',
    assessment_section_search: 'blue',
    recommendation_section_search: 'green',
  };

  // 获取日期参数
  const { dateRange } = useDateParams();

  // 下载数据
  const handleDownload = useCallback(() => {
    // 获取日期参数
    const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '';
    const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '';

    // 构建下载 URL，添加日期参数
    const downloadUrl = `/api/v2/admin/oss_selection_search_table_download?begin_date=${begin_date}&end_date=${end_date}`;

    // 在新窗口打开下载链接
    window.open(downloadUrl, '_blank');
    message.loading('正在准备下载...', 0.5);
  }, [dateRange]);

  // 错误处理
  useEffect(() => {
    if (error) {
      console.error('开源选型评估服务搜索明细数据获取失败：', error);
      message.error('开源选型评估服务搜索明细数据获取失败');
    }
  }, [error]);

  // 获取搜索内容
  const getSearchContent = (record: OssSelectionSearchItem): string => {
    if (record.content.description) {
      return record.content.description;
    } else if (record.content.package_name) {
      return record.content.package_name;
    }
    return record.content.inputUrl;
  };

  // 表格列定义
  const columns = [
    {
      title: '搜索类型',
      dataIndex: 'module_type',
      key: 'module_type',
      width: '160px',
      render: (text: string) => (
        <Tag color={moduleTypeColorMap[text] || 'default'}>
          {moduleTypeMap[text] || text}
        </Tag>
      ),
    },
    {
      title: '搜索内容',
      key: 'content',
      render: (_, record: OssSelectionSearchItem) => {
        const content = getSearchContent(record);
        const extraInfo = [];

        // 添加额外信息
        if (record.content.src_ecosystem) {
          extraInfo.push(`源生态：${record.content.src_ecosystem}`);
        }

        if (
          record.content.target_ecosystems &&
          record.content.target_ecosystems.length > 0
        ) {
          extraInfo.push(
            `目标生态：${record.content.target_ecosystems.join(', ')}`
          );
        }

        if (
          record.content.selectedLanguages &&
          record.content.selectedLanguages.length > 0
        ) {
          extraInfo.push(
            `选择语言：${record.content.selectedLanguages.join(', ')}`
          );
        }

        return (
          <div>
            <Text strong>{content}</Text>
            {extraInfo.length > 0 && (
              <Tooltip title={extraInfo.join('\n')}>
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  (详情)
                </Text>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: '时间',
      dataIndex: 'searched_at',
      key: 'searched_at',
      width: '150px',
      sorter: (a, b) =>
        dayjs(a.searched_at).unix() - dayjs(b.searched_at).unix(),
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '用户',
      dataIndex: 'user_name',
      key: 'user_name',
    },
  ];
  return (
    <Card
      title="开源选型评估服务搜索明细"
      className={className}
      loading={isLoading}
      extra={
        <Button
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={isLoading}
          size="small"
        >
          下载
        </Button>
      }
    >
      <MyTable
        dataSource={tableData}
        columns={columns}
        rowKey={(record) =>
          `${record.user_id}-${record.searched_at}-${record.module_type}`
        }
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        size="middle"
        scroll={{ y: 270 }}
        locale={{
          emptyText: (
            <Empty
              description="暂无数据"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </Card>
  );
};

export default OssSelectionSearchTable;
