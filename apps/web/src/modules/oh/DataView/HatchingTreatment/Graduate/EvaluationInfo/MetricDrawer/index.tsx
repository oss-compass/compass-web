import React from 'react';
import { Descriptions, Drawer, Button } from 'antd';
import { getPathname } from '@common/utils';
import {
  getRishContent,
  getRishDeitalContent,
} from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/AllGraduateMetricData';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import RiskClarification from './RiskClarification';
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
const MetricDrawer = ({
  canClarify,
  report,
  metric,
  open,
  onClose,
  nextAndPre,
}) => {
  const { codeUrl, shortCode } = report;
  const { riskFill } = useCheckGraduateRiskState(shortCode, metric);
  const name = getPathname(codeUrl);
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
      <Drawer
        width={560}
        placement="right"
        onClose={onClose}
        open={open}
        title={
          <div className="flex justify-between">
            {name}
            <div className="ml-3 flex gap-2">
              <Button
                className="flex items-center !rounded-none"
                size="small"
                type="primary"
                title="上一个"
                onClick={() => nextAndPre('pre')}
              >
                <LeftOutlined />
              </Button>
              <Button
                className="flex items-center !rounded-none"
                size="small"
                type="primary"
                title="下一个"
                onClick={() => nextAndPre('next')}
              >
                <RightOutlined />
              </Button>
            </div>
          </div>
        }
      >
        <div className="">
          <div className="text-lg font-bold">{metric.指标名称}</div>
          <div className="oh border-b pt-4 pb-1">
            <Descriptions items={scoreItems} />
            <div className="mb-4 border-b" />
            <Descriptions items={baseItems} />
          </div>
        </div>
        {canClarify && (
          <div className="pt-6">
            <RiskClarification metric={metric} report={report} />
          </div>
        )}
      </Drawer>
    </>
  );
};
export default MetricDrawer;
