import React, { useMemo, useState } from 'react';
import {
  useContributorsDetailListQuery,
  ContributorDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import MyTable from '@common/components/Table';
import {
  useContributionTypeLsit,
  useGetContributionTypeI18n,
  useEcologicalType,
  useMileageOptions,
} from './contribution';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useTranslation } from 'next-i18next';

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
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t, i18n } = useTranslation();
  const ecologicalOptions = useEcologicalType();
  const mileageOptions = useMileageOptions();
  const filterMap = {
    ecologicalType: 'ecological_type',
    contributionTypeList: 'contribution_type',
  };
  const contributionTypeMap = useGetContributionTypeI18n();
  const mileageFilter = useMemo(() => {
    if (mileage.length > 0) {
      return { type: 'mileage_type', values: mileage };
    } else {
      return null;
    }
  }, [mileage]);

  const [filterContributionType, setFilterContributionType] = useState(false);
  const [tableData, setData] = useState<ContributorDetail[]>();
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
  });
  const query = {
    page: tableParams.pagination.current,
    per: tableParams.pagination.pageSize,
    filterOpts: [...tableParams.filterOpts, mileageFilter],
    sortOpts: tableParams.sortOpts,
    label,
    level,
    beginDate,
    endDate,
  };
  const { isLoading } = useContributorsDetailListQuery(client, query, {
    // enabled: false,
    onSuccess: (data) => {
      const items = data.contributorsDetailList.items;
      const hasTypeFilter = tableParams.filterOpts.find(
        (i) => i.type === 'contribution_type'
      );
      if (hasTypeFilter) {
        let value = hasTypeFilter.values;
        items.map((item) => {
          let list = item.contributionTypeList;
          item.contributionTypeList = list.filter((i) =>
            value.includes(i.contributionType)
          );
        });
      }
      setData(items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.contributorsDetailList.count,
        },
      });
    },
    onError(res: any) {
      // toast.error(
      //   getErrorMessage(res) || (() => <>{t('lab:create_failed')}</>),
      //   {
      //     position: 'top-center',
      //   }
      // );
    },
  });
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<ContributorDetail>
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
          type: filterMap[key],
          values: filters[key] as string[],
        };
        filters[key] && filterOpts.push(transformedObj);
      }
    }
    if (filterOpts.find((i) => i.type === 'contribution_type')) {
      setFilterContributionType(true);
    } else {
      setFilterContributionType(false);
    }
    setTableParams({
      pagination,
      sortOpts,
      filterOpts,
    });
  };

  const columns: ColumnsType<ContributorDetail> = [
    {
      title: t('analyze:metric_detail:contributor'),
      dataIndex: 'contributor',
      align: 'left',
      width: '200px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:role_persona'),
      dataIndex: 'ecologicalType',
      align: 'left',
      width: '200px',
      filters: ecologicalOptions,
      render: (text) => {
        return ecologicalOptions.find((i) => i.value === text)?.text || text;
      },
    },

    {
      title: t('analyze:metric_detail:milestone_persona'),
      dataIndex: 'mileageType',
      render: (text) => {
        return mileageOptions.find((i) => i.value === text)?.label || text;
      },
      align: 'left',
      width: '200px',
    },
    {
      title: t('analyze:metric_detail:domain_persona'),
      dataIndex: 'contributionTypeList',
      render: (list) => {
        let arr = list.map(
          (item) => contributionTypeMap[item.contributionType]
        );
        let br = <br></br>;
        let result = null;
        if (arr.length < 1) {
          return arr[0];
        }
        for (let i = 0; i < arr.length; i++) {
          if (i == 0) {
            result = arr[i];
          } else {
            result = (
              <span>
                {result}
                {br}
                {arr[i]}
              </span>
            );
          }
        }
        return <div>{result}</div>;
      },
      filters: useContributionTypeLsit(),
      filterMode: 'tree',
      align: 'left',
      width: '220px',
    },
    {
      title: t('analyze:metric_detail:organization'),
      dataIndex: 'organization',
      align: 'left',
      width: '160px',
    },
    {
      title: t('analyze:metric_detail:contribution'),
      dataIndex: 'contribution',
      key: 'contribution',
      render: (contribution, record) => {
        if (filterContributionType) {
          let filterCount = record.contributionTypeList.reduce(
            (total, obj) => total + obj.contribution,
            0
          );
          return contribution + ` (${filterCount})`;
        } else {
          return contribution;
        }
      },
      align: 'left',
      width: '200px',
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
      rowKey={'contributor'}
      scroll={{ x: 'max-content' }}
    />
  );
};
export default MetricTable;
