// autocorrect: false
import React, { useMemo } from 'react';
import { Card, Table, Typography, Space } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
// @ts-ignore
import fluttercandiesRealData from 'public/test/intelligent-analysis/fluttercandies.json';

const { Text } = Typography;

// 简化表格数据类型
interface DetailedTableRowData {
  组织名称: string;
  项目生态: string;
  代码贡献总量: number;
  Issue贡献总量: number;
  网络影响力2024: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  网络影响力2025: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  GitHub账号: string;
  填写的组织信息: string;
  贡献的具体仓库: string[];
  角色2024: {
    代码贡献量: number;
    Issue贡献量: number;
    生态占比: number;
  };
  个人生态影响力2024: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  角色2025: {
    代码贡献量: number;
    Issue贡献量: number;
    生态占比: number;
  };
  个人生态影响力2025: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  projectRowSpan: number;
  key: string;
}

interface ParticipantDetailsProps {
  data: DetailedTableRowData[];
  userId: string;
}

// 原始JSON数据类型
interface RawParticipantData {
  组织名称: string;
  '项目/生态': string;
  '2024-2025组织代码贡献总量': number;
  '2024-2025组织Issue贡献总量': number;
  '2024年组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': string;
  '2025年组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': string;
  具体人员GitHub账号: string;
  填写的组织信息: string;
  贡献的具体仓库: string;
  '2024年角色(代码/Issue贡献量/目标生态占个人总活跃量比值)': string;
  '2024年个人在生态中(社区核心度/协作影响力/联通控制力/PageRank)': string;
  '2025年角色(代码/Issue贡献量/目标生态占个人总活跃量比值)': string;
  '2025年个人在生态中(社区核心度/协作影响力/联通控制力/PageRank)': string;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  data,
  userId,
}) => {
  // 影响力等级转数值映射
  const influenceToNumber = (level: string): number => {
    const mapping: Record<string, number> = {
      核心: 100,
      重要: 66.67,
      一般: 33.33,
      无: 0,
      无记录: 0,
    };
    return mapping[level] || 0;
  };

  // 解析网络影响力字符串 "核心/核心/核心/核心"
  const parseInfluence = (influenceStr: string) => {
    const parts = influenceStr.split('/');
    return {
      社区核心度: influenceToNumber(parts[0] || ''),
      协作影响力: influenceToNumber(parts[1] || ''),
      联通控制力: influenceToNumber(parts[2] || ''),
      PageRank: influenceToNumber(parts[3] || '') / 10000, // PageRank 通常是小数
    };
  };

  // 解析角色信息 "组织管理者(73/20/94.39%)" 或 "无角色(0/0/0.00%)"
  const parseRole = (roleStr: string) => {
    const match = roleStr.match(/^[^(]+\((\d+)\/(\d+)\/([0-9.]+)%\)$/);
    if (match) {
      return {
        代码贡献量: parseInt(match[1]),
        Issue贡献量: parseInt(match[2]),
        生态占比: parseFloat(match[3]) / 100,
      };
    }
    // 处理无角色或其他异常情况
    return {
      代码贡献量: 0,
      Issue贡献量: 0,
      生态占比: 0,
    };
  };

  // 解析个人生态影响力 "Flutter主仓(核心/核心/核心/核心)"
  const parsePersonalInfluence = (str: string) => {
    const match = str.match(/^[^(]+\(([^)]+)\)$/);
    if (match) {
      return parseInfluence(match[1]);
    }
    return {
      社区核心度: 0,
      协作影响力: 0,
      联通控制力: 0,
      PageRank: 0,
    };
  };

  // 从GitHub URL提取用户名
  const extractGithubUsername = (url: string): string => {
    const match = url.match(/github\.com\/([^/]+)/);
    return match ? match[1] : url;
  };

  // 转换真实数据为表格格式
  const convertRealDataToTableFormat = (
    rawData: RawParticipantData[]
  ): DetailedTableRowData[] => {
    // 先按项目分组，计算项目总的贡献量
    const projectStats: Record<
      string,
      {
        代码贡献总量: number;
        Issue贡献总量: number;
        网络影响力2024: any;
        网络影响力2025: any;
      }
    > = {};
    rawData.forEach((item) => {
      const project = item['项目/生态'];
      if (!projectStats[project]) {
        projectStats[project] = {
          代码贡献总量: item['2024-2025组织代码贡献总量'],
          Issue贡献总量: item['2024-2025组织Issue贡献总量'],
          网络影响力2024: parseInfluence(
            item[
              '2024年组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
            ]
          ),
          网络影响力2025: parseInfluence(
            item[
              '2025年组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
            ]
          ),
        };
      }
    });

    // 按项目和人员组织数据
    const groupedByProject: Record<string, RawParticipantData[]> = {};
    rawData.forEach((item) => {
      const project = item['项目/生态'];
      if (!groupedByProject[project]) {
        groupedByProject[project] = [];
      }
      groupedByProject[project].push(item);
    });

    const result: DetailedTableRowData[] = [];

    Object.entries(groupedByProject).forEach(([project, items]) => {
      items.forEach((item, index) => {
        const convertedItem: DetailedTableRowData = {
          key: `${project}-${extractGithubUsername(
            item['具体人员GitHub账号']
          )}-${index}`,
          组织名称: item.组织名称,
          项目生态: project,
          代码贡献总量: projectStats[project].代码贡献总量,
          Issue贡献总量: projectStats[project].Issue贡献总量,
          网络影响力2024: projectStats[project].网络影响力2024,
          网络影响力2025: projectStats[project].网络影响力2025,
          GitHub账号: extractGithubUsername(item['具体人员GitHub账号']),
          填写的组织信息: item['填写的组织信息'],
          贡献的具体仓库: [item['贡献的具体仓库']],
          角色2024: parseRole(
            item['2024年角色(代码/Issue贡献量/目标生态占个人总活跃量比值)']
          ),
          个人生态影响力2024: parsePersonalInfluence(
            item[
              '2024年个人在生态中(社区核心度/协作影响力/联通控制力/PageRank)'
            ]
          ),
          角色2025: parseRole(
            item['2025年角色(代码/Issue贡献量/目标生态占个人总活跃量比值)']
          ),
          个人生态影响力2025: parsePersonalInfluence(
            item[
              '2025年个人在生态中(社区核心度/协作影响力/联通控制力/PageRank)'
            ]
          ),
          projectRowSpan: index === 0 ? items.length : 0,
        };
        result.push(convertedItem);
      });
    });

    return result;
  };

  // 获取真实数据或使用传入的数据
  const tableData = useMemo(() => {
    if (userId === 'org:fluttercandies' && fluttercandiesRealData) {
      console.log('使用 fluttercandies 真实数据');
      return convertRealDataToTableFormat(
        fluttercandiesRealData as RawParticipantData[]
      );
    }
    return data;
  }, [data, userId]);
  const columns: ColumnsType<DetailedTableRowData> = [
    // {
    //   title: '组织名称',
    //   dataIndex: '组织名称',
    //   key: '组织名称',
    //   width: 120,
    //   fixed: 'left' as const,
    // },
    {
      title: '项目/生态',
      dataIndex: '项目生态',
      key: '项目生态',
      width: 120,
      fixed: 'left' as const,
      render: (text, record) => ({
        children: (
          <Text strong style={{ color: '#333' }}>
            {text}
          </Text>
        ),
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
    {
      title: '2024-2025 代码贡献总量',
      dataIndex: '代码贡献总量',
      key: '代码贡献总量',
      width: 180,
      fixed: 'left' as const,
      render: (value: number, record) => ({
        children: <Text>{value?.toLocaleString() || 0}</Text>,
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
    {
      title: '2024-2025 Issue 贡献总量',
      dataIndex: 'Issue贡献总量',
      key: 'Issue贡献总量',
      width: 180,
      fixed: 'left' as const,
      render: (value: number, record) => ({
        children: <Text>{value?.toLocaleString() || 0}</Text>,
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
    {
      title: '2024 年网络影响力',
      key: '网络影响力2024',
      width: 200,
      render: (record: DetailedTableRowData) => (
        <div style={{ fontSize: '12px' }}>
          <div>
            社区核心度:{' '}
            {record.网络影响力2024?.社区核心度?.toFixed(3) || '0.000'}
          </div>
          <div>
            协作影响力:{' '}
            {record.网络影响力2024?.协作影响力?.toFixed(3) || '0.000'}
          </div>
          <div>
            联通控制力:{' '}
            {record.网络影响力2024?.联通控制力?.toFixed(3) || '0.000'}
          </div>
          <div>
            PageRank: {record.网络影响力2024?.PageRank?.toFixed(4) || '0.0000'}
          </div>
        </div>
      ),
    },
    {
      title: '2025 年网络影响力',
      key: '网络影响力2025',
      width: 200,
      render: (record: DetailedTableRowData) => (
        <div style={{ fontSize: '12px' }}>
          <div>
            社区核心度:{' '}
            {record.网络影响力2025?.社区核心度?.toFixed(3) || '0.000'}
          </div>
          <div>
            协作影响力:{' '}
            {record.网络影响力2025?.协作影响力?.toFixed(3) || '0.000'}
          </div>
          <div>
            联通控制力:{' '}
            {record.网络影响力2025?.联通控制力?.toFixed(3) || '0.000'}
          </div>
          <div>
            PageRank: {record.网络影响力2025?.PageRank?.toFixed(4) || '0.0000'}
          </div>
        </div>
      ),
    },
    {
      title: '具体人员 GitHub 账号',
      dataIndex: 'GitHub账号',
      key: 'GitHub账号',
      width: 150,
      render: (text: string) => (
        <a
          href={`https://github.com/${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline"
          style={{ color: '#1890ff', textDecoration: 'none' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {text || '未知用户'}
        </a>
      ),
    },
    {
      title: '填写的组织信息',
      dataIndex: '填写的组织信息',
      key: '填写的组织信息',
      width: 200,
      ellipsis: true,
    },
    {
      title: '贡献的具体仓库',
      dataIndex: '贡献的具体仓库',
      key: '贡献的具体仓库',
      width: 200,
      render: (repos: string[]) => (
        <div style={{ fontSize: '12px' }}>
          {repos?.map((repo, index) => <div key={index}>{repo}</div>) || '-'}
        </div>
      ),
    },
    {
      title: '2024 年角色',
      key: '角色2024',
      width: 180,
      render: (record: DetailedTableRowData) => (
        <div style={{ fontSize: '12px' }}>
          <div>
            代码贡献量: {record.角色2024?.代码贡献量?.toLocaleString() || 0}
          </div>
          <div>
            Issue 贡献量: {record.角色2024?.Issue贡献量?.toLocaleString() || 0}
          </div>
          <div>
            生态占比: {((record.角色2024?.生态占比 || 0) * 100).toFixed(1)}%
          </div>
        </div>
      ),
    },
    {
      title: '2024 年个人在生态中',
      key: '个人生态影响力2024',
      width: 180,
      render: (record: DetailedTableRowData) => (
        <div style={{ fontSize: '12px' }}>
          <div>
            社区核心度:{' '}
            {record.个人生态影响力2024?.社区核心度?.toFixed(3) || '0.000'}
          </div>
          <div>
            协作影响力:{' '}
            {record.个人生态影响力2024?.协作影响力?.toFixed(3) || '0.000'}
          </div>
          <div>
            联通控制力:{' '}
            {record.个人生态影响力2024?.联通控制力?.toFixed(3) || '0.000'}
          </div>
          <div>
            PageRank:{' '}
            {record.个人生态影响力2024?.PageRank?.toFixed(4) || '0.0000'}
          </div>
        </div>
      ),
    },
    {
      title: '2025 年角色',
      key: '角色2025',
      width: 180,
      render: (record: DetailedTableRowData) => (
        <div style={{ fontSize: '12px' }}>
          <div>
            代码贡献量: {record.角色2025?.代码贡献量?.toLocaleString() || 0}
          </div>
          <div>
            Issue 贡献量: {record.角色2025?.Issue贡献量?.toLocaleString() || 0}
          </div>
          <div>
            生态占比: {((record.角色2025?.生态占比 || 0) * 100).toFixed(1)}%
          </div>
        </div>
      ),
    },
    {
      title: '2025 年个人在生态中',
      key: '个人生态影响力2025',
      width: 180,
      render: (record: DetailedTableRowData) => (
        <div style={{ fontSize: '12px' }}>
          <div>
            社区核心度:{' '}
            {record.个人生态影响力2025?.社区核心度?.toFixed(3) || '0.000'}
          </div>
          <div>
            协作影响力:{' '}
            {record.个人生态影响力2025?.协作影响力?.toFixed(3) || '0.000'}
          </div>
          <div>
            联通控制力:{' '}
            {record.个人生态影响力2025?.联通控制力?.toFixed(3) || '0.000'}
          </div>
          <div>
            PageRank:{' '}
            {record.个人生态影响力2025?.PageRank?.toFixed(4) || '0.0000'}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <TeamOutlined />
          <span>人员参与详情</span>
        </Space>
      }
      className="mb-6"
    >
      <Table
        size="small"
        dataSource={tableData}
        rowKey="key"
        pagination={false}
        bordered
        scroll={{ x: 1800, y: 600 }}
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 0 ? '' : 'ant-table-row-striped'
        }
        style={{ height: '650px' }}
      />
    </Card>
  );
};

export default ParticipantDetails;
