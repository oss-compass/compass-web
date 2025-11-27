import React, { useState } from 'react';
import { Tag } from 'antd';
import RiskBadge from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/Badge/RiskBadge';
import MetricDrawer from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/MetricDrawer';
import {
  metricList,
  useGetMetricIcon,
  setRiskTag,
} from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/MerticDetail';
import useCheckRiskState from '@modules/oh/hooks/useCheckRiskState';

const MetricIcon = ({ canClarify, shortCode, item }) => {
  const { riskFill } = useCheckRiskState(shortCode, item);
  return (
    <div className="flex w-12 flex-shrink-0 items-center justify-start pl-2 text-lg text-green-600">
      {useGetMetricIcon(item, canClarify ? riskFill : false)}
    </div>
  );
};
const RiskTag = ({ canClarify, shortCode, item }) => {
  const { riskFill } = useCheckRiskState(shortCode, item);
  return (
    <div className="ml-2">
      {setRiskTag(item, canClarify ? riskFill : false)}
    </div>
  );
};
const EvaluationMerticItem = ({
  canClarify,
  report,
  mertic,
  items,
  score,
  showDrawer,
}) => {
  return (
    <div className="mb-4 flex flex-col border bg-[#fafafa] p-6">
      <div id={mertic} className="mb-4 text-lg font-semibold">
        {mertic}
      </div>
      <div className="flex h-6 items-center justify-start">
        <div className="h-1.5 w-[600px] bg-[#e5e5e5]">
          <div
            className="h-1.5"
            style={{
              width: `${score}%`,
              backgroundColor: score > 60 ? '#4ade80' : '#f8961e',
            }}
          ></div>
        </div>
        <div className="ml-4 text-base font-semibold">{score}</div>
      </div>
      <div className="mt-6 w-full border-b">
        {items.map((item) => {
          return (
            <div
              key={item.指标名称}
              onClick={() => {
                showDrawer(item);
              }}
              className="flex h-[90px] cursor-pointer border border-b-0 bg-white px-4 py-3 hover:bg-[#f5f6fd]"
            >
              <MetricIcon
                canClarify={canClarify}
                shortCode={report.shortCode}
                item={item}
              />
              <div className="flex-1 pr-3">
                <div className="flex h-[29px] text-base font-semibold">
                  <div className="flex-shrink-0"> {item.指标名称}</div>
                  <div className="ml-4">
                    {item.是否必须澄清 === '是' ? (
                      <Tag color="geekblue">必须澄清： {item.是否必须澄清}</Tag>
                    ) : (
                      <Tag color="cyan">必须澄清： {item.是否必须澄清}</Tag>
                    )}
                  </div>
                  <RiskTag
                    canClarify={canClarify}
                    shortCode={report.shortCode}
                    item={item}
                  />
                </div>
                <div
                  title={item.指标意义.split('\n\n')}
                  className="line-clamp-2 mt-1 text-xs"
                >
                  {item.指标意义.split('\n\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {canClarify && (
                <RiskBadge shortCode={report.shortCode} mertic={item} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationMerticList = ({ canClarify, allData, metricItemScoreList }) => {
  const [metric, setMetric] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = (item) => {
    setOpen(true);
    setMetric(item);
  };
  const nextAndPre = (type) => {
    const index = metricItemScoreList.findIndex((z) => z.key === metric.key);
    if (type === 'next') {
      if (index < metricItemScoreList.length - 1) {
        setMetric(metricItemScoreList[index + 1]);
      } else {
        setMetric(metricItemScoreList[0]);
      }
    } else {
      if (index > 0) {
        setMetric(metricItemScoreList[index - 1]);
      } else {
        setMetric(metricItemScoreList[metricItemScoreList.length - 1]);
      }
    }
  };
  return (
    <div className="mt-6">
      {metricList.map((mertic) => {
        const items = metricItemScoreList.filter(
          (item) => item.维度 === mertic
        );
        const score = allData.evaluationDetail.find(
          (item) => item.name === mertic
        ).score;
        return (
          <EvaluationMerticItem
            canClarify={canClarify}
            report={allData}
            showDrawer={showDrawer}
            key={mertic}
            mertic={mertic}
            items={items}
            score={score}
          />
        );
      })}
      {open && (
        <MetricDrawer
          canClarify={canClarify}
          report={allData}
          metric={metric}
          open={open}
          onClose={() => setOpen(false)}
          nextAndPre={nextAndPre}
        />
      )}
    </div>
  );
};

export default EvaluationMerticList;
