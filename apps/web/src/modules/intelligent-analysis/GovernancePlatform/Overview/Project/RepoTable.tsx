// autocorrect: false
import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';

interface RepoData {
  项目URL: string;
  主导组织: string;
  技术栈: string;
  贡献者数量: number;
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
        const text = await response.text();
        const rows = text.trim().split('\n');

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
            贡献者数量: parseInt(cols[4], 10) || 0,
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

    // 2. Filter by projectType (CUDA_operator_library)
    let matchProjectType = true;
    if (projectType === 'CUDA_operator_library') {
      matchProjectType = item.技术栈.includes('算子库');
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

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
      title: '贡献者数量',
      dataIndex: '贡献者数量',
      key: '贡献者数量',
      sorter: (a, b) => a.贡献者数量 - b.贡献者数量,
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
        dataSource={paginatedData}
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
