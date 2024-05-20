import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import Dialog from '@common/components/Dialog';
import CodeDetail from './CodeDetail';

const CodeTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'distributed_camera',
      gitBranch: 'master',
      codeLine: 0,
      codeLineTotal: 0,
      repoAttrs: ['未分类'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: '华为',
      changLine: 0,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'third_party_rust_http',
      gitBranch: 'master',
      codeLine: 0,
      codeLineTotal: 0,
      repoAttrs: ['富设备'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: 'thirdParty',
      changLine: 0,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'third_party_lame',
      gitBranch: 'master',
      codeLine: 94.005,
      codeLineTotal: 126.258,
      repoAttrs: null,
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: 'thirdParty',
      changLine: 0.299,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'vendor_kaihong',
      gitBranch: 'master',
      codeLine: 5.165,
      codeLineTotal: 6.805,
      repoAttrs: ['富设备'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: '华为',
      changLine: 0.393,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'third_party_rust_heck',
      gitBranch: 'master',
      codeLine: 0.639,
      codeLineTotal: 1.075,
      repoAttrs: ['富设备'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: 'thirdParty',
      changLine: 0,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'global_resource_tool',
      gitBranch: 'master',
      codeLine: 0,
      codeLineTotal: 0,
      repoAttrs: ['未分类'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: '华为',
      changLine: 0,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'third_party_pyyaml',
      gitBranch: 'master',
      codeLine: 9.283,
      codeLineTotal: 12.141,
      repoAttrs: ['富设备'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: 'thirdParty',
      changLine: 0.045,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'third_party_vulkan-loader',
      gitBranch: 'master',
      codeLine: 82.453,
      codeLineTotal: 99.892,
      repoAttrs: ['富设备'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: 'thirdParty',
      changLine: 0.015,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'third_party_libjpeg-turbo',
      gitBranch: 'master',
      codeLine: 0.998,
      codeLineTotal: 1.398,
      repoAttrs: ['富设备'],
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: 'thirdParty',
      changLine: 0.013,
    },
    {
      date: '2024-05-14',
      projectName: 'openharmony',
      sigNameEn: null,
      repoNameEn: 'applications_dlp_manager',
      gitBranch: 'master',
      codeLine: 2.508,
      codeLineTotal: 2.804,
      repoAttrs: null,
      attrs: null,
      committers: null,
      manger: null,
      manufacturer: '华为',
      changLine: 1.406,
    },
  ];

  const columns = [
    {
      title: '仓库',
      dataIndex: 'repoNameEn',
      key: 'repoNameEn',
    },
    {
      title: '厂家',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: '分支',
      dataIndex: 'gitBranch',
      key: 'gitBranch',
    },
    {
      title: '模块/子系统',
      dataIndex: 'repoNameEn',
      key: 'repoNameEn',
    },
    {
      title: '仓库类型',
      dataIndex: 'repoAttrs',
      key: 'repoAttrs',
    },
    {
      title: '责任人',
      dataIndex: 'manger',
      key: 'manger',
    },
    {
      title: '有效代码量（千行）',
      dataIndex: 'codeLine',
      key: 'codeLine',
    },
    {
      title: '总代码量（千行）',
      dataIndex: 'codeLineTotal',
      key: 'codeLineTotal',
    },
    {
      title: '变化量（千行）',
      dataIndex: 'changLine',
      key: 'changLine',
      render: (text: string, record: any) => {
        return (
          <div className="flex">
            <span
              onClick={() => {
                // setCurrentName(col.contributor);
                // col.organization && setCurrentOrgName(col.organization);
                setOpenConfirm(true);
              }}
              className="text-primary ml-2 mt-1 cursor-pointer"
            >
              {text}
            </span>
          </div>
        );
      },
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'topCode'} title={'代码量统计'}>
        <MyTable
          columns={columns}
          dataSource={dataSource}
          //   loading={isLoading || isFetching}
          //   onChange={handleTableChange}
          pagination={pagination}
          rowKey={'key'}
          scroll={{ x: 'max-content' }}
        />
        <Dialog
          open={openConfirm}
          classes={{
            paper: classnames(
              'border w-[70%] !max-w-[80%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className=""></p>
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
          dialogContent={
            <div className="w-full">
              <CodeDetail />
            </div>
          }
          handleClose={() => {
            setOpenConfirm(false);
          }}
        />
      </TableCard>
    </>
  );
};

export default CodeTable;
