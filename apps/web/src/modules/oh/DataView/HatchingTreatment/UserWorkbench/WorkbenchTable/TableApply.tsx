import React from 'react';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareMyCreationPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTableColumns } from './useTableColumns';

const Table = ({ applicationType }) => {
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

  const { isLoading, isFetching, refetch } = useTpcSoftwareMyCreationPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareMyCreationPage.count as number,
          },
        });
        setData(data.tpcSoftwareMyCreationPage.items);
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
          { '--scroll-height': 'calc(100% - 50px)' } as React.CSSProperties
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

export default Table;
