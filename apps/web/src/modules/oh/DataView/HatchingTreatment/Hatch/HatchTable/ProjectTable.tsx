import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareSelectionPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Radio } from 'antd';
import { getHubUrl } from '@common/utils';

const ReportTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [reportType, setReportType] = useState(0);

  const columns = [
    // {
    //   title: '申请单号',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: '软件名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return record?.tpcSoftwareSelectionReports
          ?.map((item) => item.name)
          .join(', ');
      },
    },
    // {
    //   title: 'Issue 地址',
    //   dataIndex: 'issueUrl',
    //   key: 'issueUrl',
    //   render: (text) => {
    //     return (
    //       <a
    //         onClick={() => {
    //           window.open(setUrlHost(text), '_blank');
    //         }}
    //         className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
    //       >
    //         {text}
    //       </a>
    //     );
    //   },
    // },
    // {
    //   title: '引入方式',
    //   key: 'adaptationMethod',
    //   dataIndex: 'adaptationMethod',
    // },
    {
      title: '申请人',
      key: 'user',
      dataIndex: 'user',
      render: (_, record) => {
        const { provider, nickname } = record?.user?.loginBinds[0];
        return (
          <a
            target="_blank"
            href={getHubUrl(provider, nickname)}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {record?.user?.name}
          </a>
        );
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return text?.slice(0, 10);
      },
    },
    {
      title: '申请背景',
      dataIndex: 'reason',
      width: '300px',
      key: 'reason',
    },
  ];
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
    selectionType: 2,
  };
  const { isLoading, isFetching } = useTpcSoftwareSelectionPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
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
