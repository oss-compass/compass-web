import React from 'react';
import { useTranslation } from 'next-i18next';
import TotalScore from './TotalScore';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';
import useExtractShortIds from '@modules/developer/hooks/useExtractShortIds';
import useQueryDateRange from '@modules/developer/hooks/useQueryDateRange';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PeopleData = () => {
  console.log('PeopleData');
  const { shortIds } = useExtractShortIds();
  const { timeStart, timeEnd } = useQueryDateRange();
  const url = '/api/v2/contributor_portrait/contributor_collaboration';
  const params = {
    access_token: '3753004aa8d8132b37b55b836a358ec47e625a92',
    contributor: 'lishengbao',
    begin_date: timeStart,
    end_date: timeEnd,
  };
  const fetchData = async () => {
    const response = await axios.post(url, {
      ...params,
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ['PeopleData', shortIds, timeStart, timeEnd],
    fetchData
  );
  return (
    <>
      <ConnectLineMini />
      <TotalScore data={data} error={error} isLoading={isLoading} />
    </>
  );
};

export default withErrorBoundary(PeopleData, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
