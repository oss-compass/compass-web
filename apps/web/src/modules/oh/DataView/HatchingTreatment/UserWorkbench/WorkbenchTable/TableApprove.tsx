import React from 'react';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareMyReviewPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTableColumns } from './useTableColumns';

const TableApprove = ({ applicationType }) => {
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
    applicationType,
  };
  const { isLoading, isFetching, refetch } = useTpcSoftwareMyReviewPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareMyReviewPage.count as number,
          },
        });
        setData(data.tpcSoftwareMyReviewPage.items);
      },
      onError: (error) => {},
    }
  );
  const { columns } = useTableColumns(refetch);
  return (
    <>
      <div
        className="h-[calc(100%-84px)] py-2"
        style={
          { '--scroll-height': 'calc(100% - 80px)' } as React.CSSProperties
        }
      >
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'key'}
          tableLayout={'fixed'}
          scroll={{ y: 'var(--scroll-height)' }}
          // scroll={{ x: 'max-content' }}
        />
      </div>
    </>
  );
};

export default TableApprove;
