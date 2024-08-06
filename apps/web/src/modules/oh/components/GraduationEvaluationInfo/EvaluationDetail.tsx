import React from 'react';
import { LeftCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { getPathname } from '@common/utils';
import EvaluationDownLoad from '@modules/oh/components/GraduationEvaluationInfo/EvaluationDownLoad';
import EvaluationBaseInfo from '@modules/oh/components/GraduationEvaluationInfo/EvaluationBaseInfo';
import EvaluationTopScore from '@modules/oh/components/GraduationEvaluationInfo/EvaluationTopScore';
import EvaluationMerticList from '@modules/oh/components/GraduationEvaluationInfo/EvaluationMerticList';
import RiskFetcher from '@modules/oh/components/GraduationEvaluationInfo/store/RiskFetcher';
import TargetSoftwareFetcher from '@modules/oh/store/TargetSoftwareFetcher';
import {
  getEvaluationDetail,
  getMetricItemScore,
} from '@modules/oh/components/GraduationEvaluationInfo/MerticDetail';

const EvaluationDetail = ({
  item,
  back,
  refetch,
  targetSoftware = null,
}: {
  item: any;
  back?: () => void;
  refetch?: () => void;
  targetSoftware?: string;
}) => {
  if (!item.evaluationDetail) {
    item = getEvaluationDetail(item);
  }
  const metricItemScoreList = getMetricItemScore(item.graduationReportMetric);

  return (
    <div>
      <RiskFetcher shortCode={item.shortCode} />
      <TargetSoftwareFetcher
        data={item}
        metricItemScoreList={metricItemScoreList}
      />
      <div className="flex justify-between border bg-[#f9f9f9] py-3 px-6">
        <div className="flex">
          {back && (
            <LeftCircleOutlined
              onClick={() => {
                back();
              }}
              className="mr-2 mt-1 cursor-pointer text-2xl text-[#3f60ef]"
              rev={undefined}
            />
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
            {item?.graduationReportMetric?.updatedAt?.slice(0, 10) || ''}
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
        allData={item}
        metricItemScoreList={metricItemScoreList}
      />
    </div>
  );
};

export default EvaluationDetail;
