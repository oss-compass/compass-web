import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareSelectionReportPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTableColumns } from './useTableColumns';

const ReportTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  // const columns = [
  //   {
  //     title: '软件名称',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: '源码地址',
  //     dataIndex: 'codeUrl',
  //     key: 'codeUrl',
  //     render: (text) => {
  //       return (
  //         <a
  //           target="_blank"
  //           href={setUrlHost(text)}
  //           className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
  //         >
  //           {text}
  //         </a>
  //       );
  //     },
  //   },
  //   {
  //     title: '官网地址',
  //     dataIndex: 'websiteUrl',
  //     key: 'websiteUrl',
  //     render: (text) => {
  //       return (
  //         <a
  //           target="_blank"
  //           href={setUrlHost(text)}
  //           className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
  //         >
  //           {text}
  //         </a>
  //       );
  //     },
  //   },
  //   {
  //     title: '编程语言',
  //     dataIndex: 'programmingLanguage',
  //     key: 'programmingLanguage',
  //   },
  //   {
  //     title: '开发商',
  //     dataIndex: 'manufacturer',
  //     key: 'time',
  //   },
  //   {
  //     title: '申请人',
  //     key: 'user',
  //     dataIndex: 'user',
  //     render: (_, record) => {
  //       const { provider, nickname } = record?.user?.loginBinds[0];
  //       return (
  //         <a
  //           target="_blank"
  //           href={getHubUrl(provider, nickname)}
  //           className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
  //         >
  //           {record?.user?.name}
  //         </a>
  //       );
  //     },
  //   },
  //   {
  //     title: '当前状态',
  //     dataIndex: 'state',
  //     key: 'state',
  //     render: (text, record) => {
  //       return record?.tpcSoftwareReportMetric?.status === 'success' ? (
  //         <>
  //           <a
  //             target="_blank"
  //             onClick={() => {
  //               window.location.hash =
  //                 'reportDetailPage?projectId=' + record.shortCode;
  //             }}
  //             className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
  //           >
  //             生成成功
  //           </a>
  //         </>
  //       ) : (
  //         '生成中'
  //       );
  //     },
  //   },
  //   {
  //     title: '报告更新时间',
  //     key: 'createdAt',
  //     render: (_, record) => {
  //       return record?.tpcSoftwareReportMetric?.createdAt?.slice(0, 10);
  //     },
  //   },
  //   {
  //     title: '操作',
  //     key: 'createdAt',
  //     width: 70,
  //     render: (_, record) => {
  //       return (
  //         <div className="flex cursor-pointer justify-center text-[#3e8eff]">
  //           {currentUser.id === record.userId && (
  //             <Popover content={'编辑报告信息'}>
  //               <EditOutlined
  //                 rev={undefined}
  //                 onClick={() => {
  //                   setOpenConfirm(true);
  //                 }}
  //               />
  //             </Popover>
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const { columns } = useTableColumns();
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
    reportTypeList: [0],
  };
  const { isLoading, isFetching } = useTpcSoftwareSelectionReportPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
        console.log(data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareSelectionReportPage.count as number,
          },
        });
        setData(data.tpcSoftwareSelectionReportPage.items);
      },
      onError: (error) => {},
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
          // scroll={{ x: 'max-content' }}
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
