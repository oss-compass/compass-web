import React from 'react';
import { LeftCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { getPathname } from '@common/utils';
import EvaluationDownLoad from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/EvaluationDownLoad';
import EvaluationBaseInfo from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/EvaluationBaseInfo';
import EvaluationTopScore from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/EvaluationTopScore';
import EvaluationMerticList from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/EvaluationMerticList';
import RiskFetcher from '@modules/oh/store/RiskFetcher';
import TargetSoftwareFetcher from '@modules/oh/store/TargetSoftwareFetcher';
import {
  getEvaluationDetail,
  getMetricItemScore,
} from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/MerticDetail';

const EvaluationDetail = ({
  canClarify,
  item,
  back,
  refetch,
  targetSoftware = null,
}: {
  canClarify: boolean;
  item: any;
  back?: () => void;
  refetch?: () => void;
  targetSoftware?: string;
}) => {
  if (!item.evaluationDetail) {
    item = getEvaluationDetail(item);
  }
  const metricItemScoreList = getMetricItemScore(item.tpcSoftwareReportMetric);

  return (
    <div>
      <RiskFetcher shortCode={item.shortCode} />
      <div className="flex justify-between border bg-[#fafafa] py-3 px-6">
        <div className="flex">
          {back && (
            <LeftCircleOutlined
              onClick={() => {
                back();
              }}
              className="mr-2 mt-1 cursor-pointer text-2xl text-[#3f60ef]"
            />
          )}
          {targetSoftware === getPathname(item.codeUrl) && (
            <>
              <TargetSoftwareFetcher
                data={item}
                metricItemScoreList={metricItemScoreList}
              />
              <Popover content="目标选型软件">
                <CheckCircleOutlined className="mr-2 mt-1 cursor-pointer text-2xl text-[#3f60ef]" />
              </Popover>
            </>
          )}
          <div className="text-lg font-semibold">
            <a
              className="hover:underline"
              href={item.codeUrl}
              target="_blank"
            >{`${getPathname(item.codeUrl) || item.name}`}</a>{' '}
            评估报告
          </div>
          <div className="mt-2 ml-4 text-xs">
            更新于：
            {item?.tpcSoftwareReportMetric?.updatedAt?.slice(0, 10) || ''}
          </div>
        </div>
        <div className="float-right cursor-pointer text-lg">
          <EvaluationDownLoad item={item} />
        </div>
      </div>
      {/* </Badge.Ribbon> */}
      <EvaluationBaseInfo item={item} refetch={refetch} />
      <EvaluationTopScore items={item.evaluationDetail} score={item.score} />
      <EvaluationMerticList
        canClarify={canClarify}
        allData={item}
        metricItemScoreList={metricItemScoreList}
      />
    </div>
  );
};

export default EvaluationDetail;
