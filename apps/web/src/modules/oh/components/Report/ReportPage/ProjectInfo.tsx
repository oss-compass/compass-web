import React from 'react';
import { Descriptions } from 'antd';
import { useGetReportData } from '@modules/oh/components/Report/ReportPage/store/useReportStore';
import { getPathname } from '@common/utils';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const EvaluationBaseInfo = () => {
  const { hasOhRole } = useHasOhRole();
  const {
    targetSoftware,
    incubationTime,
    repoUrl,
    demandSource,
    reason,
    functionalDescription,
    committers,
    sameTypeSoftwareName,
    tpcSoftwareSelectionReports,
  } = useGetReportData();
  const targetReport = tpcSoftwareSelectionReports?.find(
    (item) => getPathname(item.codeUrl) === targetSoftware
  );
  const baseItems = [
    {
      key: '1',
      label: '目标孵化软件',
      children: targetSoftware,
      span: hasOhRole ? 2 : 4,
    },
    ...(hasOhRole
      ? [
          {
            key: '2',
            label: '需求来源',
            children: (
              <div title={demandSource} className="line-clamp-1">
                {demandSource}
              </div>
            ),
            span: 2,
          },
        ]
      : []),
    {
      key: '5',
      label: '需求描述',
      children: <div>{reason}</div>,
      span: 4,
    },
    {
      key: '6',
      label: '功能描述',
      children: <div>{functionalDescription}</div>,
      span: 4,
    },
    {
      key: '7',
      label: '垂域 Committers',
      children: (
        <div title={committers} className="line-clamp-1">
          {committers}
        </div>
      ),
      span: 4,
    },
    {
      key: '9',
      label: '适配仓路径',
      children: (
        <div title={repoUrl} className="line-clamp-1">
          {repoUrl}
        </div>
      ),
      span: 4,
    },
    {
      key: '1',
      label: 'License 信息',
      children: targetReport?.license,
      span: 2,
    },
    {
      key: '2',
      label: '适配方式',
      children: targetReport?.adaptationMethod,
      span: 2,
    },
    {
      key: '8',
      label: '同类型三方库',
      children: (
        <div className="line-clamp-1">{sameTypeSoftwareName || '无'}</div>
      ),
      span: 2,
    },
    {
      key: '2',
      label: '孵化周期',
      children: incubationTime,
      span: 2,
    },

    // {
    //   key: '4',
    //   label: '编程语言',
    //   children: item.programmingLanguage,
    // },
    // {
    //   key: '5',
    //   label: '代码量',
    //   children: item.codeCount + '行',
    // },
    // {
    //   key: '8',
    //   label: '适配方式',
    //   children: item.adaptationMethod,
    // },
    // {
    //   key: '6',
    //   label: '官网地址',
    //   children: (
    //     <>
    //       <a
    //         className="line-clamp-1 text-[#69b1ff]"
    //         target="_blank"
    //         href={item.websiteUrl}
    //       >
    //         {item.websiteUrl}
    //       </a>
    //     </>
    //   ),
    // },
    // {
    //   key: '7',
    //   label: '源码地址',
    //   children: (
    //     <>
    //       <a
    //         className="line-clamp-1 text-[#69b1ff]"
    //         target="_blank"
    //         href={item.codeUrl}
    //       >
    //         {item.codeUrl}
    //       </a>
    //     </>
    //   ),
    // },
    // {
    //   key: '9',
    //   label: '漏洞响应机制',
    //   children: (
    //     <>
    //       <a
    //         className="line-clamp-1 text-[#69b1ff]"
    //         target="_blank"
    //         href={item.codeUrl}
    //       >
    //         {item.vulnerabilityResponse || ''}
    //       </a>
    //     </>
    //   ),
    // },
  ];
  return (
    <div className="oh">
      <Descriptions
        labelStyle={{ width: '160px' }}
        bordered
        items={baseItems}
        column={4}
      />
    </div>
  );
};

export default EvaluationBaseInfo;
