import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import RepoDetail from './RepoDetail';

const RepoTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      additions: 1983,
      deletions: 402,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_appframework',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_dmsfwk',
      branch: 'master',
      additions: 32,
      deletions: 18,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_appframework',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_form_fwk',
      branch: 'master',
      additions: 1415,
      deletions: 1040,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_appframework',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'accessibility',
      branch: 'master',
      additions: 18,
      deletions: 10,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_basicsoftwareservice',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'account_os_account',
      branch: 'master',
      additions: 425,
      deletions: 131,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_basicsoftwareservice',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'applications_app_samples',
      branch: 'master',
      additions: 33,
      deletions: 8,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_systemapplications',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'applications_hap',
      branch: 'master',
      additions: 6,
      deletions: 6,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_systemapplications',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkcompiler_ets_frontend',
      branch: 'master',
      additions: 5,
      deletions: 7,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_compileruntime',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkcompiler_ets_runtime',
      branch: 'master',
      additions: 3056,
      deletions: 168,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_compileruntime',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkcompiler_runtime_core',
      branch: 'master',
      additions: 2,
      deletions: 2,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_compileruntime',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
  ];

  const columns = [
    {
      title: '仓库',
      dataIndex: 'repo',
      key: 'repo',
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
    {
      title: '类型',
      dataIndex: 'isThird',
      key: 'isThird',
      render: (text, record: any, index: number) => {
        return text === 0 ? '自研' : '';
      },
    },
    {
      title: 'PR 新增代码量',
      dataIndex: 'additions',
      key: 'additions',
    },
    {
      title: 'PR 删除代码量',
      dataIndex: 'deletions',
      key: 'deletions',
    },
    {
      title: '修改代码总量 (增 + 删)',
      key: 'totalAdditions',
      render: (text: string, record: any, index: number) => {
        return record.additions + record.deletions;
      },
    },
    {
      title: '所属 SIG',
      dataIndex: 'sig',
      key: 'sig',
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'repoTable'} title={'仓库维度'}>
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
              'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className="">仓库维度详情</p>
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
              <RepoDetail />
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

export default RepoTable;
