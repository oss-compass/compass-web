import React from 'react';
import { Descriptions } from 'antd';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Sandbox/Report/ReportPage/store/useReportStore';
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
    tpcSoftwareSandboxReports,
  } = useGetReportData();
  const targetReport = tpcSoftwareSandboxReports?.find(
    (item) => getPathname(item.codeUrl) === targetSoftware
  );
  const baseItems = [
    {
      key: '1',
      label: '目标沙箱软件',
      children: targetSoftware,
      span: hasOhRole ? 2 : 4,
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
      span: 4,
    },
    {
      key: '8',
      label: '同类型三方库',
      children: (
        <div className="line-clamp-1">{sameTypeSoftwareName || '无'}</div>
      ),
      span: 4,
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
