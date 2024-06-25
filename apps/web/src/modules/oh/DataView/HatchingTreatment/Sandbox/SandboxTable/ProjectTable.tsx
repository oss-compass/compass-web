import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useTpcSoftwareSelectionReportPageQuery,
  SubjectSigPage,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Tag } from 'antd';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import { useUserInfo } from '@modules/auth';

const ReportTable = () => {
  // const { currentUser } = useUserInfo();
  // const url = new URL(window.location.href.replace('#', ''));
  // const name = url.searchParams.get('name'); // 'luajava'
  let result = [];
  const [openConfirm, setOpenConfirm] = useState(false);
  const dataSource = result;
  // const { timeStart, timeEnd } = useQueryDateRange();
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
      // render: (text, record) => {
      //   return (
      //     <a
      //       onClick={() => {}}
      //       className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
      //     >
      //       {text}
      //     </a>
      //   );
      // },
    },
    // {
    //   title: '报告类别',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: '源码地址',
      dataIndex: 'codeUrl',
      key: 'codeUrl',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              window.open(text, '_blank');
            }}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '官网地址',
      dataIndex: 'websiteUrl',
      key: 'websiteUrl',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              window.open(text, '_blank');
            }}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '编程语言',
      dataIndex: 'programmingLanguage',
      key: 'programmingLanguage',
      // render: (text) => {
      // },
    },
    {
      title: '开发商',
      dataIndex: 'manufacturer',
      key: 'time',
    },
    // {
    //   title: '申请人',
    //   key: 'linkSig',
    //   // render: (text) => {
    //   // },
    // },
    // {
    //   title: '申请时间',
    //   dataIndex: 'time',
    //   key: 'time',
    // },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        return record?.tpcSoftwareReportMetric.status === 'success'
          ? '生成成功'
          : '生成中';
      },
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
    reportTypeList: [0, 1],
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
    }
  );
  return (
    <>
      <div className="p-4">
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'key'}
          scroll={{ x: 'max-content' }}
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
