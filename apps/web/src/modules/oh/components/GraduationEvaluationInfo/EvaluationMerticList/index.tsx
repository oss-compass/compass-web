import React, { useState } from 'react';
import { Tag } from 'antd';
import RiskBadge from '@modules/oh/components/GraduationEvaluationInfo/Badge/RiskBadge';
import MetricDrawer from '@modules/oh/components/GraduationEvaluationInfo/MetricDrawer';
import {
  metricList,
  useGetMetricIcon,
  setRiskTag,
} from '@modules/oh/components/GraduationEvaluationInfo/MerticDetail';
import useCheckGraduateRiskState from '@modules/oh/hooks/useCheckGraduateRiskState';

const MetricIcon = ({ shortCode, item }) => {
  const { riskFill } = useCheckGraduateRiskState(shortCode, item);
  return (
    <div className="flex w-12 flex-shrink-0 items-center justify-start pl-2 text-lg text-green-600">
      {useGetMetricIcon(item, riskFill)}
    </div>
  );
};

const EvaluationMerticItem = ({ report, mertic, items, score, showDrawer }) => {
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
              <MetricIcon shortCode={report.shortCode} item={item} />
              {/* <div className="mr-4 flex items-center justify-center">
                {item.score}
              </div> */}
              <div className="flex-1 pr-3">
                <div className="flex h-[29px] text-base font-semibold">
                  <div className="flex-shrink-0"> {item.指标名称}</div>
                  <div className="ml-2">{setRiskTag(item)}</div>
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
              <RiskBadge shortCode={report.shortCode} mertic={item} />
              {/* <div
                title="风险澄清"
                className="flex w-8 flex-shrink-0 items-center justify-center"
              >
                <Badge count={0} size="small">
                  <TbMessage2 className="text-xl" />
                </Badge>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationMerticList = ({ allData, metricItemScoreList }) => {
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
