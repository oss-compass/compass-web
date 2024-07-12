import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareSelectionPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { getHubUrl } from '@common/utils';
import { useTableColumns } from './useTableColumns';

const ReportTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const editAction = (report) => {
    setOpenConfirm(true);
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
  const { isLoading, isFetching } = useTpcSoftwareSelectionPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
        console.log(data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareSelectionPage.count as number,
          },
        });
        setData(data.tpcSoftwareSelectionPage.items);
      },
    }
  );
  return (
    <>
      <div className="h-[calc(100vh-240px)]  p-4">
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'key'}
          tableLayout={'fixed'}
        />
        <Dialog
          open={openConfirm}
          classes={{
            paper: classnames(
              'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className="">Committer 详情 (total：1)</p>
              <div
                className="absolute right-6 top-4 cursor-pointer p-2"
                onClick={() => {
                  setOpenConfirm(false);
                }}
              >
                <GrClose className="text-base" />
              </div>
            </>
          }
          dialogContent={<div className="w-full"></div>}
          handleClose={() => {
            setOpenConfirm(false);
          }}
        />
      </div>
    </>
  );
};

export default ReportTable;
