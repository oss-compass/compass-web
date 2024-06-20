import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useSubjectSigPageQuery,
  SubjectSigPage,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Tag } from 'antd';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import { useUserInfo } from '@modules/auth';

interface TableQuery {
  label: string;
  level?: string;
  page?: number;
  per?: number;
}

const HatchingReport = () => {
  const { currentUser } = useUserInfo();

  const url = new URL(window.location.href.replace('#', ''));
  const name = url.searchParams.get('name'); // 'luajava'
  // if(name)
  let result = [];
  const [openConfirm, setOpenConfirm] = useState(false);
  const dataSource = result;
  const { timeStart, timeEnd } = useQueryDateRange();

  const columns = [
    // {
    //   title: '申请单号',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: '软件名称',
      dataIndex: 'softwareName',
      key: 'softwareName',
      render: (text, record) => {
        return (
          <a
            onClick={() => {}}
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
            onClick={() => {}}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '申请人',
      key: 'linkSig',
      render: (text) => {
        // let dom = text?.repos?.map((i) => <Tag key={i}>{i}</Tag>);
        return <div className="flex flex-wrap gap-y-2">{currentUser.name}</div>;
      },
    },
    {
      title: '申请时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        return '生成报告中';
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
  } = useGetTableOption({
    label: 'openharmony-tpc',
    level: 'community',
  });
  const myQuery = {
    page: query.page,
    per: query.per,
    label: 'openharmony-tpc',
    level: 'community',
  };
  const { isLoading, isFetching } = useSubjectSigPageQuery(client, myQuery, {
    onSuccess: (data) => {
      if (name) {
        let data = window.sessionStorage.getItem(name);
        console.log(JSON.parse(data));
        setData([JSON.parse(data)]);
      }
      // setTableParams({
      //   ...tableParams,
      //   pagination: {
      //     ...tableParams.pagination,
      //     total: data.subjectSigPage.count as number,
      //   },
      // });
      // setData([]);
    },
  });
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

export default HatchingReport;
