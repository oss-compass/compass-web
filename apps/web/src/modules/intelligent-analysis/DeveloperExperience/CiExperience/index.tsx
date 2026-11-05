import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseRepoKey, repoKeyToQuery } from './helpers';
import type { CiRepoKey } from './types';
import { useCiCatalogQuery, useCiDatasetQuery } from './queries';
import type { CiCatalogEntry } from './api';
import ExperienceBackLink from '../components/ExperienceBackLink';
import CiControls from './components/CiControls';
import CiReport from './components/CiReport';
import CiDataState from './components/CiDataState';
import CiReportMetadata from './components/CiReportMetadata';

const getDefaultRepo = (catalog: CiCatalogEntry[] = []) =>
  catalog.find((entry) => entry.repo === 'runtime')?.repo ??
  catalog[0]?.repo ??
  null;

const CiExperience: React.FC<{ org?: string }> = ({ org }) => {
  const router = useRouter();
  const supportedOrg = !org || org.toLowerCase() === 'cann';
  const catalogQuery = useCiCatalogQuery(router.isReady && supportedOrg);
  const catalog = catalogQuery.data;
  const requestedRepo = router.query.repo;
  const hasRequestedRepo = requestedRepo !== undefined;
  const parsedRepo = parseRepoKey(requestedRepo, catalog);
  const defaultRepo = getDefaultRepo(catalog);
  const repo = hasRequestedRepo ? parsedRepo : defaultRepo;
  const availableRepo =
    supportedOrg && catalog?.some((entry) => entry.repo === repo) ? repo : null;
  const reportQuery = useCiDatasetQuery(
    availableRepo,
    router.isReady && supportedOrg
  );
  const data = reportQuery.data?.dataset;
  const journey = reportQuery.data?.journey;

  // 按仓库保留有效选择；异步刷新不覆盖用户正在查看的历史日期。
  const [selection, setSelection] = useState<{
    repo: CiRepoKey;
    day: string;
  } | null>(null);
  const day =
    data && selection?.repo === repo && data.days.includes(selection.day)
      ? selection.day
      : data?.days[data.days.length - 1] ?? '';
  useEffect(() => {
    if (repo && data && day)
      setSelection((current) =>
        current?.repo === repo && current.day === day ? current : { repo, day }
      );
  }, [repo, data, day]);

  const handleRepoChange = useCallback(
    (next: CiRepoKey) => {
      setSelection(null);
      void router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, repo: repoKeyToQuery(next) },
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const error = supportedOrg ? catalogQuery.error || reportQuery.error : null;
  const loading =
    supportedOrg &&
    (!router.isReady ||
      catalogQuery.isLoading ||
      (availableRepo !== null && reportQuery.isLoading));
  const unavailable = !supportedOrg || !availableRepo;

  return (
    <div className="min-h-full bg-slate-50">
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
              days={data.days}
              onDayChange={(next) =>
                setSelection({ repo: availableRepo, day: next })
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
              void catalogQuery.refetch();
              if (availableRepo) void reportQuery.refetch();
            }}
          />
        ) : (
          <>
            <CiReport
              key={JSON.stringify([data.org, repo, data.workflow, day])}
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
