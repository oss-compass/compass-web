// autocorrect: false
import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';

const nameMapping = {
  CUDA_ai_framework_adapter: 'AI框架适配',
  CUDA_ai_framework: 'AI框架',
  CUDA_communication_library: '通信库',
  CUDA_compiler: '编译器',
  CUDA_domain_acceleration_library: '领域加速库',
  CUDA_driver: '驱动',
  CUDA_graph_engine: '图引擎',
  CUDA_operator_library: '算子库',
  CUDA_programming_language: '编程语言',
  CUDA_runtime: '运行时',
  CUDA: 'CUDA 生态',
} as const;

const stackKeywordsByProjectType: Record<string, string[]> = {
  CUDA_ai_framework_adapter: [nameMapping.CUDA_ai_framework_adapter],
  CUDA_ai_framework: [nameMapping.CUDA_ai_framework],
  CUDA_communication_library: [nameMapping.CUDA_communication_library],
  CUDA_compiler: [nameMapping.CUDA_compiler, '毕昇编译器'],
  CUDA_domain_acceleration_library: [
    nameMapping.CUDA_domain_acceleration_library,
  ],
  CUDA_driver: [nameMapping.CUDA_driver],
  CUDA_graph_engine: [nameMapping.CUDA_graph_engine],
  CUDA_operator_library: [nameMapping.CUDA_operator_library],
  CUDA_programming_language: [
    nameMapping.CUDA_programming_language,
    'CUDA C++',
  ],
  CUDA_runtime: [nameMapping.CUDA_runtime],
};

const splitTechStacks = (techStack: string | undefined) => {
  if (!techStack) return [];
  return techStack
    .split(/[;；]/)
    .map((s) => s.trim())
    .filter(Boolean);
};

interface RepoData {
  项目URL: string;
  主导组织: string;
  技术栈: string;
  代码贡献者数量: number;
  代码贡献量: number;
}

interface RepoTableProps {
  projectType?: string;
  selectedRegions?: string[];
}

const RepoTable: React.FC<RepoTableProps> = ({
  projectType = '',
  selectedRegions = [],
}) => {
  const [data, setData] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/test/intelligent-analysis-new/repo_data.csv'
        );
        const buffer = await response.arrayBuffer();
        const decode = (encoding: string) =>
          new TextDecoder(encoding).decode(buffer);
        let text = decode('utf-8');
        if (
          text.includes('�') &&
          !text.includes('项目URL') &&
          !text.includes('主导组织')
        ) {
          text = decode('gbk');
        }
        text = text.replace(/^\uFEFF/, '');
        const rows = text.trim().split(/\r?\n/);

        // Skip header row and parse data
        const parsedData: RepoData[] = rows.slice(1).map((row) => {
          // Handle potential quotes in CSV, though simple split works for current sample
          // Assuming simple CSV format without embedded commas in fields for now based on sample
          const cols = row.split(',');
          return {
            项目URL: cols[0],
            主导组织: cols[1],
            // cols[2] is '英伟达主导/参与', skipping it
            技术栈: cols[3],
            代码贡献者数量: parseInt(cols[4], 10) || 0,
            代码贡献量: parseInt(cols[5], 10) || 0,
          };
        });

        setData(parsedData);
      } catch (error) {
        console.error('Error fetching repo data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    // 1. Filter by keyword
    const matchKeyword =
      item.项目URL.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.主导组织.toLowerCase().includes(searchKeyword.toLowerCase());

    // 2. Filter by projectType (CUDA ecosystem categories)
    let matchProjectType = true;
    if (projectType && projectType !== 'CUDA') {
      const keywords = stackKeywordsByProjectType[projectType];
      if (keywords && keywords.length > 0) {
        const stacks = splitTechStacks(item.技术栈);
        matchProjectType = keywords.some((keyword) => stacks.includes(keyword));
      }
    }

    // 3. Filter by regions
    let matchRegion = true;
    if (selectedRegions && selectedRegions.length > 0) {
      // Assuming '主导组织' format like "Region-OrgName" e.g., "美国-英伟达"
      // Check if any selected region is contained in the '主导组织' field
      matchRegion = selectedRegions.some((region) =>
        item.主导组织.includes(region)
      );
    }

    return matchKeyword && matchProjectType && matchRegion;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, projectType, selectedRegions]);

  const columns: ColumnsType<RepoData> = [
    {
      title: '排名',
      key: 'rank',
      width: 80,
      render: (_, __, index) => {
        const currentRank = (currentPage - 1) * pageSize + index + 1;
        return <Tag>{currentRank}</Tag>;
      },
    },
    {
      title: '项目URL',
      dataIndex: '项目URL',
      key: '项目URL',
      render: (text: string) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: '主导组织',
      dataIndex: '主导组织',
      key: '主导组织',
    },
    {
      title: '技术栈',
      dataIndex: '技术栈',
      key: '技术栈',
      render: (text: string) => {
        if (!text) return '-';
        const stacks = text.split(';').map((s) => {
          const trimmed = s.trim();
          return trimmed === '毕昇编译器' ? '编译器' : trimmed;
        });
        return (
          <div className="flex flex-wrap gap-1">
            {stacks.map((stack, i) => (
              <Tag key={i} color="blue">
                {stack}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: '代码贡献者数量',
      dataIndex: '代码贡献者数量',
      key: '代码贡献者数量',
      sorter: (a, b) => a.代码贡献者数量 - b.代码贡献者数量,
      defaultSortOrder: 'descend',
    },
    {
      title: '代码贡献量',
      dataIndex: '代码贡献量',
      key: '代码贡献量',
      sorter: (a, b) => a.代码贡献量 - b.代码贡献量,
    },
  ];

  return (
    <Card title="仓库信息" className="mb-6">
      <div className="mb-6">
        <Space>
          <Input
            placeholder="搜索仓库或组织"
            prefix={<SearchOutlined />}
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: 300 }}
          />
          <Button type="primary">搜索</Button>
        </Space>
      </div>

      <MyTable
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="项目URL"
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredData.length,
          onChange: setCurrentPage,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        }}
      />
    </Card>
  );
};

export default RepoTable;
