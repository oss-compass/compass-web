import React, { useState } from 'react';
import { Popover, Descriptions, Drawer, Button } from 'antd';
import { getPathname } from '@common/utils';
import {
  getRishContent,
  getRishDeitalContent,
} from '@modules/oh/components/EvaluationInfo/AllMetricData';
import {
  QuestionCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import RiskClarification from './RiskClarification';

const useGetDefinition = (metric) => {
  if (!metric) {
    return [];
  }
  const list = metric.指标意义.split('\n\n');
  const content = list[1];
  const ruleRegex = /【规则】([\s\S]*?)；/;
  const suggestionRegex = /【建议】([\s\S]*)；/;
  const ruleMatch = content.match(ruleRegex);
  const suggestionMatch = content.match(suggestionRegex);
  const rule = ruleMatch ? ruleMatch[1].trim() : '';
  const suggestion = suggestionMatch ? suggestionMatch[1].trim() : '';
  const baseItems = [
    {
      key: '1',
      label: '定义',
      children: <>{list[0]}</>,
      span: 3,
    },
    // {
    //   key: '2',
    //   label: '规则建议',
    //   children: (
    //     <>
    //       {rule.split('\n').map((line, index) => (
    //         <React.Fragment key={index}>
    //           {line}
    //           {index < rule.split('\n').length - 1 && <br />}
    //         </React.Fragment>
    //       ))}
    //     </>
    //   ),
    //   span: 3,
    // },
  ];
  rule &&
    baseItems.push({
      key: '2',
      label: '规则',
      children: <>{rule}</>,
      span: 3,
    });
  suggestion &&
    baseItems.push({
      key: '3',
      label: '建议',
      children: <>{suggestion}</>,
      span: 3,
    });
  baseItems.push({
    key: '4',
    label: '风险重要性',
    children: <>{metric.风险重要性}</>,
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
          {/* <div className="ml-3">
            <Popover
              content={
                <>
                  对数据有异议？<a className="text-[#69b1ff]">点此反馈</a>
                </>
              }
              title=""
            >
              <QuestionCircleOutlined
                rev={undefined}
                className="cursor-pointer text-lg text-[#69b1ff]"
              />
            </Popover>
          </div> */}
          <div className="oh border-b pt-4 pb-1">
            <Descriptions items={baseItems} />
            <Descriptions items={scoreItems} />
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
