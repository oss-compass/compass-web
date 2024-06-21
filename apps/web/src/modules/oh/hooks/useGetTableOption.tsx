import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { FilterOptionInput, SortOptionInput } from '@oss-compass/graphql';
import { toUnderline } from '@common/utils/format';
import { queryKey } from '@modules/oh/constant';

interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  filters?: Record<string, FilterValue>;
}
const useGetLineOption = <T extends Record<string, any>>(
  queryOpt?: {},
  opt?: {
    filterOpts?: FilterOptionInput[];
  }
) => {
  const { t } = useTranslation();
  const [tableData, setData] = useState<T[]>();
  const defaultfilterOpts = opt?.filterOpts || [];
  const [filterOpts, setFilterOpts] = useState(defaultfilterOpts || []);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
      showSizeChanger: false,
      position: ['bottomCenter'],
      showTotal: (total) => {
        return `${t('analyze:total_people', { total })} `;
      },
      total: 0,
    },
    sortOpts: null,
  });
  const query = {
    page: tableParams.pagination.current,
    per: tableParams.pagination.pageSize,
    filterOpts: [...filterOpts],
    sortOpts: tableParams.sortOpts,
    ...queryOpt,
    ...queryKey,
  };
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<T>
  ) => {
    let sortOpts = null;
    let filterOpts = [...defaultfilterOpts];
    sortOpts = sorter.field && {
      type: toUnderline(sorter.field as string),
      direction: sorter.order === 'ascend' ? 'asc' : 'desc',
    };
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const transformedObj = {
          type: toUnderline(key),
          values: filters[key] as string[],
        };
        filters[key] && filterOpts.push(transformedObj);
      }
    }
    setFilterOpts(filterOpts);
    setTableParams({
      pagination: {
        showTotal: tableParams.pagination.showTotal,
        ...pagination,
      },
      sortOpts,
      filterOpts,
    });
  };
  return {
    tableData,
    setData,
    filterOpts,
    setFilterOpts,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  };
};

export default useGetLineOption;
