import React, { useState } from 'react';
import { Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import { getMetricScore } from '@modules/oh/utils';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import Loading from '@modules/oh/components/Loading';
import Analyzing from '@modules/oh/components/Analyzing';

import useLabelData from '@modules/oh/hooks/useLabelData';

const DetailItem = ({ item }) => {
  <div className="div">
    <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
      <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
        {'TPC 软件报告详情'}
        <div>
          <Input prefix={<SearchOutlined rev={undefined} />} />
        </div>
      </div>
      <div className="relative mb-6 flex h-[calc(100%-60px)] justify-center overflow-auto p-5">
        <EvaluationDetail item={item} />
      </div>
    </div>
  </div>;
};

const DetailPage = () => {
  let data = [
    {
      id: 's21t926o',
      name: 'jasonsantos/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updatedAt: '2024-06-20',
      score: '49.25',
      tpcSoftwareReportMetric: {
        complianceLicense: 10,
        complianceDco: 6,
        compliancePackageSig: 6,
        complianceLicenseCompatibility: 10,

        ecologyDependencyAcquisition: 10,
        ecologyCodeMaintenance: 0,
        ecologyCommunitySupport: 0,
        ecologyAdoptionAnalysis: 0,
        ecologySoftwareQuality: 6,
        ecologyPatentRisk: 0,

        lifecycleVersionNormalization: 10,
        lifecycleVersionNumber: 0,
        lifecycleVersionLifecycle: 0,

        securityBinaryArtifact: 0,
        securityVulnerability: 10,
        securityVulnerabilityResponse: 0,
        securityVulnerabilityDisclosure: 6,
        securityHistoryVulnerability: 10,
      },

      evaluationDetail: [
        {
          name: '合法合规',
          score: 80,
        },
        {
          name: '技术生态',
          score: 32,
        },
        {
          name: '生命周期',
          score: 33,
        },
        {
          name: '网络安全',
          score: 52,
        },
      ],
    },
    {
      id: 'sazgg2nh',
      name: 'gudzpoz/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updatedAt: '2024-06-20',
      score: '86',
      tpcSoftwareReportMetric: {
        complianceLicense: 10,
        complianceDco: 6,
        compliancePackageSig: 6,
        complianceLicenseCompatibility: 10,

        ecologyDependencyAcquisition: 10,
        ecologyCodeMaintenance: 10,
        ecologyCommunitySupport: 6,
        ecologyAdoptionAnalysis: 0,
        ecologySoftwareQuality: 6,
        ecologyPatentRisk: 0,

        lifecycleVersionNormalization: 10,
        lifecycleVersionNumber: 10,
        lifecycleVersionLifecycle: 10,

        securityBinaryArtifact: 10,
        securityVulnerability: 10,
        securityVulnerabilityResponse: 10,
        securityVulnerabilityDisclosure: 6,
        securityHistoryVulnerability: 10,
      },
      evaluationDetail: [
        {
          name: '合法合规',
          score: 80,
        },
        {
          name: '技术生态',
          score: 84,
        },
        {
          name: '生命周期',
          score: 100,
        },
        {
          name: '网络安全',
          score: 80,
        },
      ],
    },
  ];

  const { isLoading, status, reportItems, notFound } = useLabelData();
  if (isLoading) {
    return <Loading />;
  }
  if (notFound) {
    return <NotFoundOh />;
  }
  if (status != 'success') {
    return <Analyzing />;
  }
  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {'TPC 软件报告详情'}
          <div>
            {/* <Input prefix={<SearchOutlined rev={undefined} />} /> */}
          </div>
        </div>
        <div className="relative mb-6 flex h-[calc(100%-60px)] justify-center overflow-auto p-5">
          {reportItems.length === 1 ? (
            <EvaluationDetail item={reportItems[0]} />
          ) : (
            <Tabs
              className="oh-antd"
              size={'small'}
              items={reportItems.map((r) => {
                return {
                  key: r.id + '',
                  label: r.name,
                  children: <EvaluationDetail item={r} />,
                };
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
