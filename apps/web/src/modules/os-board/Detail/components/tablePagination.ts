import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterOptionInput, SortOptionInput } from '../../api/tableData';

export interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput | null;
}

export const resetTablePagination = (params: TableParams): TableParams => ({
  ...params,
  pagination: {
    ...params.pagination,
    current: 1,
  },
});
