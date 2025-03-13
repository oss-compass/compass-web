import React from 'react';
import { Descriptions } from 'antd';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/store/useReportStore';
import { getPathname } from '@common/utils';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const EvaluationBaseInfo = () => {
  const { hasOhRole } = useHasOhRole();
  const {
    demandSource,
    committers,
    functionalDescription,
    tpcSoftwareGraduationReports,
  } = useGetReportData();
  // const targetReport = tpcSoftwareGraduationReports?.find(
  //   (item) => getPathname(item.codeUrl) === targetSoftware
  // );
  const targetReport = tpcSoftwareGraduationReports?.[0];
  const baseItems = [
    {
      key: '1',
      label: '目标孵化软件',
      children: targetReport?.name,
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
          {
            key: '4',
            label: '功能描述',
            children: (
              <div title={functionalDescription} className="line-clamp-1">
                {functionalDescription || '--'}
              </div>
            ),
            span: 4,
          },
        ]
      : []),
    {
      key: '1',
      label: 'License 信息',
      children: targetReport?.license ? targetReport?.license : '--',
      span: 2,
    },
    {
      key: '2',
      label: '适配方式',
      children: targetReport?.adaptationMethod,
      span: 2,
    },
    // {
    //   key: '2',
    //   label: '孵化周期',
    //   children: incubationTime,
    //   span: 2,
    // },
    {
      key: '7',
      label: '垂域 Committers',
      children: (
        <div title={committers} className="line-clamp-1">
          {committers}
        </div>
      ),
      span: 2,
    },
    // {
    //   key: '4',s
    //   label: '编程语言',
    //   children: item.programmingLanguage,
    // },
    {
      key: '5',
      label: '代码量',
      children: targetReport?.codeCount ? targetReport?.codeCount + '行' : '--',
    },
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
