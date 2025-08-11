import React, { useMemo } from 'react';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareGraduationReportPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTableColumns } from './useTableColumns';

const ReportTable = () => {
  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption();
  const myQuery = useMemo(
    () => ({
      ...query,
    }),
    [query]
  );

  const { isLoading, isFetching, refetch } =
    useTpcSoftwareGraduationReportPageQuery(client, myQuery, {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareGraduationReportPage.count as number,
          },
        });
        setData(data.tpcSoftwareGraduationReportPage.items);
      },
      onError: (error) => {},
    });
  const { columns } = useTableColumns(refetch);
  return (
    <>
      <div className="h-[calc(100vh-250px)] px-3">
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'id'}
          tableLayout={'fixed'}
          // scroll={{ x: 'max-content' }}
        />
      </div>
    </>
  );
};

export default ReportTable;
