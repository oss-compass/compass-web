import React from 'react';
import { Descriptions, Drawer, Button } from 'antd';
import { getPathname } from '@common/utils';
import {
  getRishContent,
  getRishDeitalContent,
} from '@modules/oh/components/GraduationEvaluationInfo/AllGraduateMetricData';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import RiskClarification from './RiskClarification';

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
const MetricDrawer = ({ report, metric, open, onClose, nextAndPre }) => {
  const { codeUrl, shortCode } = report;
  const name = getPathname(codeUrl);
  const baseItems = useGetDefinition(metric);
  if (!metric) {
    return <></>;
  }

  const scoreItems = [
    {
      key: '3',
      label: '得分',
      children:
        metric.score == -1
          ? '未检测到该指标'
          : metric.score === null
          ? '功能开发中，敬请期待'
          : metric.score,
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
        <div className="line-clamp-3">{getRishDeitalContent(metric)}</div>
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
                <LeftOutlined rev={undefined} />
              </Button>
              <Button
                className="flex items-center !rounded-none"
                size="small"
                type="primary"
                title="下一个"
                onClick={() => nextAndPre('next')}
              >
                <RightOutlined rev={undefined} />
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
        <div className="pt-6">
          <RiskClarification metric={metric} report={report} />
        </div>
      </Drawer>
    </>
  );
};
export default MetricDrawer;
