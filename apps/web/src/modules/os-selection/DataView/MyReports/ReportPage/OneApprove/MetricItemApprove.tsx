import React from 'react';
import { Descriptions } from 'antd';
import {
  getRishContent,
  getRishDeitalContent,
} from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/AllHatchMetricData';
import RiskClarification from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/MetricDrawer/RiskClarification';
import useCheckGraduateRiskState from '@modules/oh/hooks/useCheckGraduateRiskState';
import { getRiskFillScore } from '@modules/oh/utils/utils';

const useGetDefinition = (metric) => {
  if (!metric) {
    return [];
  }
  const list = metric.指标意义;
  // const scoreRule = metric.指标检查项及评分项;
  const baseItems = [
    {
      key: '1',
      label: '定义',
      children: <>{list}</>,
      span: 3,
    },
  ];
  baseItems.push({
    key: '4',
    label: '评分规则',
    children: <>{metric.指标检查项及评分项}</>,
    span: 3,
  });
  return baseItems;
};
const MerticApproveItem = ({ report, metric }) => {
  const { shortCode } = report;
  const { riskFill } = useCheckGraduateRiskState(shortCode, metric);
  const baseItems = useGetDefinition(metric);
  if (!metric) {
    return <></>;
  }

  const scoreItems = [
    {
      key: '3',
      label: '得分',
      children: getRiskFillScore(metric.score, riskFill),
      span: 3,
    },
    {
      key: '4',
      label: '风险',
      children: getRishContent(metric),
      span: 3,
    },
    {
      key: '5',
      label: '详情',
      children: (
        <div className="line-clamp-6 whitespace-normal break-all">
          {getRishDeitalContent(metric)}
        </div>
      ),
      span: 3,
    },
  ];

  return (
    <>
      <div className="">
        <div className="oh pb-1">
          <Descriptions items={scoreItems} />
          <Descriptions items={baseItems} />
        </div>
      </div>
      <div className="pt-6">
        <RiskClarification metric={metric} report={report} />
      </div>
    </>
  );
};
export default MerticApproveItem;
