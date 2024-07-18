import React, { useEffect } from 'react';
import client from '@common/gqlClient';
import { useEventEmitter } from 'ahooks';
import { useTpcSoftwareSelectionQuery } from '@oss-compass/graphql';
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
  const { data, isLoading, refetch } = useTpcSoftwareSelectionQuery(client, {
    selectionId,
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
    setReportData(data?.tpcSoftwareSelection);
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
