import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';

const AnalyzeChartDataFetch = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);
  const shortCode = router.query.shortCode as string;

  const { data, isLoading } = useLabModelVersionReportDetailQuery(
    gqlClient,
    {
      modelId,
      versionId,
      shortCode,
    },
    {
      enabled: Boolean(modelId) && Boolean(versionId) && Boolean(shortCode),
    }
  );

  return <></>;
};

export default AnalyzeChartDataFetch;
