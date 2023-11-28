import React, { useState } from 'react';
import {
  usePullsDetailListQuery,
  PullDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import MyTable from '@common/components/Table';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useTranslation } from 'next-i18next';
import { format, parseJSON } from 'date-fns';
import { useStateType } from '@modules/analyze/DataView/MetricDetail/MetricPr/PR';

interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  filters?: Record<string, FilterValue>;
}

const MetricTable: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
}> = ({ label, level, beginDate, endDate }) => {
  const { t } = useTranslation();
  const stateOption = useStateType();
  const [tableData, setData] = useState<PullDetail[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
      position: ['bottomCenter'],
      showTotal: (total) => {
        return `Total ${total} items`;
      },
    },
    filterOpts: [],
    sortOpts: {
      type: 'state',
      direction: 'desc',
    },
  });
  const query = {
    page: tableParams.pagination.current,
    per: tableParams.pagination.pageSize,
    filterOpts: tableParams.filterOpts,
    sortOpts: tableParams.sortOpts,
    label,
    level,
    beginDate,
    endDate,
  };
  const { isLoading } = usePullsDetailListQuery(client, query, {
    // enabled: false,
    onSuccess: (data) => {
      const items = data.pullsDetailList.items;
      setData(items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.pullsDetailList.count,
        },
      });
    },
  });
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<PullDetail>
  ) => {
    let sortOpts = null;
    let filterOpts = [];
    sortOpts = sorter.field && {
      type: sorter.field,
      direction: sorter.order === 'ascend' ? 'asc' : 'desc',
    };
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const transformedObj = {
          type: key,
          values: filters[key] as string[],
        };
        filters[key] && filterOpts.push(transformedObj);
      }
    }
    setTableParams({
      pagination,
      sortOpts,
      filterOpts,
    });
  };

  const columns: ColumnsType<PullDetail> = [
    {
      title: t('analyze:metric_detail:pr_title'),
      dataIndex: 'title',
      align: 'left',
      width: '200px',
      sorter: true,
      fixed: 'left',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'left',
      width: '220px',
    },
    {
      title: t('analyze:metric_detail:state'),
      dataIndex: 'state',
      align: 'left',
      width: '100px',
      filters: stateOption,
      sorter: true,
      render: (text) => {
        return stateOption.find((i) => i.value === text)?.text || text;
      },
    },
    {
      title: t('analyze:metric_detail:created_time'),
      dataIndex: 'createdAt',
      align: 'left',
      width: '140px',
      sorter: true,
      render: (time) => (time ? format(parseJSON(time)!, 'yyyy-MM-dd') : ''),
    },
    {
      title: t('analyze:metric_detail:close_time'),
      dataIndex: 'closedAt',
      align: 'left',
      width: '120px',
      sorter: true,
      render: (time) => (time ? format(parseJSON(time)!, 'yyyy-MM-dd') : ''),
    },
    {
      title: t('analyze:metric_detail:processing_time'),
      dataIndex: 'timeToCloseDays',
      align: 'left',
      width: '200px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:first_response_time'),
      dataIndex: 'timeToFirstAttentionWithoutBot',
      align: 'left',
      width: '220px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:comments_count'),
      dataIndex: 'numReviewComments',
      align: 'left',
      width: '160px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:tags'),
      dataIndex: 'labels',
      align: 'left',
      width: '100px',
      render: (list) => list?.join(', ') || '',
    },
    {
      title: t('analyze:metric_detail:creator'),
      dataIndex: 'userLogin',
      align: 'left',
      width: '100px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:reviewer'),
      dataIndex: 'reviewersLogin',
      align: 'left',
      width: '100px',
      render: (list) => list?.join(',') || '',
    },
    {
      title: t('analyze:metric_detail:merge_author'),
      dataIndex: 'mergeAuthorLogin',
      align: 'left',
      width: '140px',
      sorter: true,
    },
  ];
  return (
    <MyTable
      columns={columns}
      dataSource={tableData}
      loading={isLoading}
      onChange={handleTableChange}
      pagination={tableParams.pagination}
      rowKey={'url'}
      scroll={{ x: 'max-content' }}
    />
  );
};
export default MetricTable;
