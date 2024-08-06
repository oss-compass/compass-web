import React, { useEffect } from 'react';
import client from '@common/gqlClient';
import { useEventEmitter } from 'ahooks';
import { useTpcSoftwareGraduationQuery } from '@oss-compass/graphql';
import { useUnmount } from 'ahooks';
import {
  setReportLoading,
  setReportData,
  ReportStore,
  ReportEventType,
  ReportEvent,
  resetReportData,
} from './useReportStore';

const ReportFetcher = ({ selectionId }) => {
  const { data, isLoading, refetch } = useTpcSoftwareGraduationQuery(client, {
    graduationId: selectionId,
  });

  const event$ = useEventEmitter<ReportEventType>();
  event$.useSubscription((e) => {
    if (e === ReportEvent.REFRESH) {
      refetch();
    }
  });
  useEffect(() => {
    ReportStore.event$ = event$;
  }, [event$]);

  useEffect(() => {
    setReportData(data?.tpcSoftwareGraduation);
  }, [data]);

  useEffect(() => {
    setReportLoading(isLoading);
  }, [isLoading]);

  useUnmount(() => {
    resetReportData();
  });
  return null;
};

export default ReportFetcher;
