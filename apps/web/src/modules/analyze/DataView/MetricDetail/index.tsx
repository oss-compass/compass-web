import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import MyTab from '@common/components/Tab';
import MetricContributor from './MetricContributor';
import MetricIssue from './MetricIssue';
import MetricPr from './MetricPr';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import MerticDatePicker from '@modules/analyze/components/NavBar/MerticDatePicker';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import useVerifyDetailRange from '@modules/analyze/hooks/useVerifyDetailRange';
import LoadingAnalysis from '@modules/analyze/DataView/Status/LoadingAnalysis';
import LabelItems from '@modules/analyze/components/NavBar/LabelItems';

const VerifyMetricDetail = () => {
  const { isLoading } = useVerifyDetailRange();
  if (isLoading) {
    return <LoadingAnalysis />;
  }
  return <MetricDetail />;
};
const MetricDetail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const slugs = router.query.slugs;
  const { isLoading, verifiedItems } = useLabelStatus();
  const [tab, setTab] = useState<string>('contributor');
  if (isLoading || verifiedItems.length > 1) {
    return null;
  }

  const tabOptions = [
    {
      label: t('analyze:metric_detail:contributors_persona'),
      value: 'contributor',
    },
    { label: t('analyze:metric_detail:issues'), value: 'issue' },
    { label: t('analyze:metric_detail:pull_requests'), value: 'pr' },
  ];

  let source;
  switch (tab) {
    case 'contributor': {
      source = <MetricContributor />;
      break;
    }
    case 'issue': {
      source = <MetricIssue />;
      break;
    }
    case 'pr': {
      source = <MetricPr />;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div className="flex w-full flex-col bg-[#fafafa]">
      <div className="relative flex h-14 w-full flex-shrink-0 items-center bg-[#ffffff] px-6 shadow">
        <div className="flex items-center text-lg font-medium">
          <AiOutlineLeftCircle
            onClick={() => {
              const query = window.location.search;
              router.push('/analyze/' + slugs + query);
            }}
            className="mr-4 cursor-pointer text-[#3f60ef]"
          />
          <div className="md:hidden">
            <LabelItems />
          </div>
          <span className="lg:hidden">
            {t('analyze:metric_detail:project_deep_dive_insight')}
          </span>
        </div>
        <div className="absolute right-1/2 flex translate-x-1/2 justify-center">
          <MyTab options={tabOptions} value={tab} onChange={(v) => setTab(v)} />
        </div>
        <div className="absolute right-6">
          <MerticDatePicker />
        </div>
      </div>
      <div className="relative m-4 min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-transparent bg-white drop-shadow-sm md:rounded-none">
        {source}
      </div>
    </div>
  );
};

export default withErrorBoundary(VerifyMetricDetail, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
