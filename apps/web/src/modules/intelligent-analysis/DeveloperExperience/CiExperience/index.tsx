import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { repoKeyToQuery } from './helpers';
import type { CiRepoKey } from './types';
import { useCiReportPageQuery } from './queries';
import ExperienceBackLink from '../components/ExperienceBackLink';
import CiControls from './components/CiControls';
import CiReport from './components/CiReport';
import CiDataState from './components/CiDataState';
import CiReportMetadata from './components/CiReportMetadata';

type DaySelection = {
  repo: string | undefined;
  day: string;
  requestedDay: string;
};

const CiExperience: React.FC<{ org?: string }> = ({ org }) => {
  const router = useRouter();
  const supportedOrg = !org || org.toLowerCase() === 'cann';
  const requestedRepo = Array.isArray(router.query.repo)
    ? router.query.repo[0]
    : router.query.repo;
  const hasRequestedRepo = requestedRepo !== undefined;
  const requestedDay =
    typeof router.query.day === 'string' ? router.query.day : '';
  const [selection, setSelection] = useState<DaySelection | null>(null);
  const selectedDay =
    selection &&
    selection.repo === requestedRepo &&
    selection.requestedDay === requestedDay
      ? selection.day
      : requestedDay;
  const reportQuery = useCiReportPageQuery(
    requestedRepo,
    selectedDay || undefined,
    router.isReady && supportedOrg
  );
  const catalog = reportQuery.data?.catalog;
  const availableRepo = catalog?.some(
    (entry) => entry.repo === reportQuery.data?.repo
  )
    ? reportQuery.data!.repo
    : null;
  const data = reportQuery.data?.dataset;
  const journey = reportQuery.data?.journey;
  const day = reportQuery.data?.selected_day ?? '';

  const handleRepoChange = useCallback(
    (next: CiRepoKey) => {
      setSelection(null);
      void router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            day: undefined,
            repo: repoKeyToQuery(next),
          },
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const error = supportedOrg ? reportQuery.error : null;
  const loading = supportedOrg && (!router.isReady || reportQuery.isLoading);
  const unavailable = !supportedOrg || !availableRepo;

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)]">
      <div className="flex min-h-full flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ExperienceBackLink org={org} module="ci" />
          {catalog && data && availableRepo ? (
            <CiControls
              repo={availableRepo}
              catalog={catalog}
              onRepoChange={handleRepoChange}
              data={data}
              day={day}
              days={reportQuery.data!.available_days}
              onDayChange={(next) =>
                setSelection({ repo: requestedRepo, day: next, requestedDay })
              }
            />
          ) : null}
        </div>
        {loading || error || unavailable || !data || !journey || !day ? (
          <CiDataState
            loading={loading}
            error={error}
            emptyText={
              hasRequestedRepo && !availableRepo
                ? '该仓库暂无 CI 报告数据'
                : undefined
            }
            onRetry={() => {
              void reportQuery.refetch();
            }}
          />
        ) : (
          <>
            <CiReport
              key={JSON.stringify([
                data.org,
                availableRepo,
                data.workflow,
                day,
              ])}
              data={data}
              context={reportQuery.data?.report_context?.boards[day]}
              journey={journey}
              repo={availableRepo!}
              day={day}
              org={data.org || org}
            />
            <CiReportMetadata day={day} report={reportQuery.data!} />
          </>
        )}
      </div>
    </div>
  );
};

export default CiExperience;
