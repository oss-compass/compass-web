import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import { useTpcSoftwareSelectionReportPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Radio } from 'antd';

const ReportTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [reportType, setReportType] = useState(0);

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
    // {
    //   title: '是否建仓',
    //   dataIndex: 'reportType',
    //   key: 'reportType',
    //   render: (text, record) => {
    //     return text === 1 ? '已建仓' : '未建仓';
    //   },
    // },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        return record?.tpcSoftwareReportMetric?.status === 'success'
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
    reportTypeList: [reportType],
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
      onError: (error) => {
        setData([
          {
            codeCount: null,
            codeUrl: 'https://github.com/jasonsantos/luajava',
            id: 25,
            manufacturer: 'jasonsantos',
            name: 'luajava',
            programmingLanguage: 'Java',
            release: 'v1.0.0',
            releaseTime: '2019-12-31T16:00:00Z',
            tpcSoftwareReportMetric: {
              complianceDco: 5,
              complianceLicense: 5,
              compliancePackageSig: 5,
              createdAt: '2024-06-21T09:31:14Z',
              ecologyAdoptionAnalysis: 5,
              ecologyCodeMaintenance: 5,
              ecologyCommunitySupport: 5,
              ecologyDependencyAcquisition: 5,
              ecologyPatentRisk: 5,
              ecologySoftwareQuality: 5,
              id: 10,
              lifecycleVersionLifecycle: 5,
              lifecycleVersionNormalization: 5,
              lifecycleVersionNumber: 5,
              securityBinaryArtifact: 5,
              securityHistoryVulnerability: 5,
              securityVulnerability: 5,
              securityVulnerabilityDisclosure: 5,
              securityVulnerabilityResponse: 5,
              status: 'success',
              tpcSoftwareReportId: 25,
            },
            tpcSoftwareSig: {
              description: 'RN 框架描述',
              id: 2,
              name: 'RN 框架',
            },
            websiteUrl: 'www.keplerproject.org/luajava/',
          },
        ]);
      },
    }
  );
  return (
    <>
      <div className="p-4">
        <div className="mb-2 ml-2">
          <Radio.Group
            onChange={(e) => {
              setReportType(e.target.value);
            }}
            value={reportType}
          >
            <Radio value={0}>选型申请</Radio>
            <Radio value={1}>已建仓申请</Radio>
          </Radio.Group>
        </div>

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
