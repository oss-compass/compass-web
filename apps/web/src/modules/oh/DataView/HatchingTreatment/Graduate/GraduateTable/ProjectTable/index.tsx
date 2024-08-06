import React, { useState } from 'react';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareGraduationPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTableColumns } from './useTableColumns';

const ReportTable = () => {
  const editAction = (report) => {
    // setReport(report);
  };
  const { columns } = useTableColumns(editAction);

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption();

  const myQuery = {
    ...query,
    selectionType: 0,
  };
  const { isLoading, isFetching } = useTpcSoftwareGraduationPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareGraduationPage.count as number,
          },
        });
        setData(data.tpcSoftwareGraduationPage.items);
      },
    }
  );
  return (
    <>
      <div className="h-[calc(100vh-240px)] p-4">
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'key'}
          tableLayout={'fixed'}
        />
      </div>
    </>
  );
};

export default ReportTable;
