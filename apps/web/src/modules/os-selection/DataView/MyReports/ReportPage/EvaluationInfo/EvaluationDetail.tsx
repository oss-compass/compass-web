import React from 'react';
import { getPathname } from '@common/utils';
import EvaluationDownLoad from './EvaluationDownLoad';
import EvaluationTopScore from './EvaluationTopScore';
import EvaluationMerticList from './EvaluationMerticList';
import { useMerticDetailData } from './MerticDetail';
import { useTranslation } from 'next-i18next';

const EvaluationDetail = ({
  canClarify,
  item,
  refetch,
}: {
  canClarify: boolean;
  item: any;
  refetch?: () => void;
}) => {
  const { t } = useTranslation('os-selection');
  const { getEvaluationDetail, getMetricItemScore } = useMerticDetailData();
  if (!item.evaluationDetail) {
    item = getEvaluationDetail(item);
  }
  const metricItemScoreList = getMetricItemScore(item.tpcSoftwareReportMetric);

  return (
    <div>
      <div className="flex justify-between border bg-[#fafafa] py-3 px-6">
        <div className="flex">
          <div className="text-lg font-semibold">
            <a
              className="hover:underline"
              href={item.codeUrl}
              target="_blank"
            >{`${getPathname(item.codeUrl) || item.name}`}</a>{' '}
            {t('my_reports.evaluation_report')}
          </div>
          <div className="mt-2 ml-4 text-xs">
            {t('my_reports.updated_at')}
            {item?.tpcSoftwareReportMetric?.updatedAt?.slice(0, 10) || ''}
          </div>
        </div>
        <div className="float-right cursor-pointer text-lg">
          <EvaluationDownLoad item={item} />
        </div>
      </div>
      {/* </Badge.Ribbon> */}
      {/* <EvaluationBaseInfo item={item} refetch={refetch} /> */}
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
