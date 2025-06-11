import React, { useState } from 'react';
import { useMerticDetailData } from '../MerticDetail';
import { useTranslation } from 'next-i18next';

const MetricIcon = ({ item }) => {
  const { useGetMetricIcon } = useMerticDetailData();
  return (
    <div className="flex w-12 flex-shrink-0 items-center justify-start pl-2 text-lg text-green-600">
      {useGetMetricIcon(item, false)}
    </div>
  );
};
const RiskTag = ({ item }) => {
  const { setRiskTag } = useMerticDetailData();
  return <div className="ml-2">{setRiskTag(item, false)}</div>;
};
const EvaluationMerticItem = ({
  canClarify,
  report,
  mertic,
  items,
  score,
  showDrawer,
}) => {
  const { t } = useTranslation('os-selection');
  return (
    <div className="mb-4 flex flex-col border bg-[#fafafa] p-6">
      <div id={mertic} className="mb-4 text-lg font-semibold">
        {t(mertic) || mertic}
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
              key={t(item.指标名称) || item.指标名称}
              onClick={() => {
                showDrawer(item);
              }}
              className="flex h-[90px] cursor-pointer border border-b-0 bg-white px-4 py-3 hover:bg-[#f5f6fd]"
            >
              <MetricIcon item={item} />
              <div className="flex-1 pr-3">
                <div className="flex h-[29px] text-base font-semibold">
                  <div className="flex-shrink-0">
                    {' '}
                    {t(item.指标名称) || item.指标名称}
                  </div>
                  <RiskTag item={item} />
                </div>
                <div
                  title={(t(item.指标意义) || item.指标意义).split('\n\n')}
                  className="line-clamp-2 mt-1 text-xs"
                >
                  {(t(item.指标意义) || item.指标意义)
                    .split('\n\n')
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationMerticList = ({ canClarify, allData, metricItemScoreList }) => {
  const { t } = useTranslation('os-selection');
  const { metricList } = useMerticDetailData();
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
          (item) => (t(item.维度) || item.维度) === (t(mertic) || mertic)
        );
        const score = allData.evaluationDetail.find(
          (item) => (t(item.name) || item.name) === (t(mertic) || mertic)
        ).score;
        return (
          <EvaluationMerticItem
            canClarify={canClarify}
            report={allData}
            showDrawer={showDrawer}
            key={t(mertic) || mertic}
            mertic={t(mertic) || mertic}
            items={items}
            score={score}
          />
        );
      })}
    </div>
  );
};

export default EvaluationMerticList;
