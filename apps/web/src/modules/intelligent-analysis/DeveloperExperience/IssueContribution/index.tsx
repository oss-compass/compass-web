import React, { useEffect, useMemo, useState } from 'react';
import { Empty, Spin } from 'antd';
import { useRouter } from 'next/router';
import { fetchIssueReportData } from './data';
import type { IssueReportCatalogRecord, IssueReportRecord } from './types';
import IssueReportControls from './components/IssueReportControls';
import IssueReportOverview from './components/IssueReportOverview';
import IssueExecutiveSummary from './components/IssueExecutiveSummary';
import IssueExperiencePath from './components/IssueExperiencePath';

type IssueContributionProps = {
  org?: string;
};

const getSingleQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const toUniqueOptions = <T extends string>(
  records: IssueReportCatalogRecord[],
  getValue: (record: IssueReportCatalogRecord) => T,
  getLabel: (record: IssueReportCatalogRecord) => React.ReactNode
) => {
  const seen = new Set<string>();
  return records.reduce<Array<{ value: string; label: React.ReactNode }>>(
    (options, record) => {
      const value = getValue(record);
      if (!seen.has(value)) {
        seen.add(value);
        options.push({ value, label: getLabel(record) });
      }
      return options;
    },
    []
  );
};

const IssueContribution: React.FC<IssueContributionProps> = ({ org }) => {
  const router = useRouter();
  const requestedPlatform = getSingleQueryValue(router.query.platform);
  const requestedCommunity = getSingleQueryValue(router.query.repo);
  const requestedPeriod = getSingleQueryValue(router.query.period);
  const requestedVersion = getSingleQueryValue(router.query.version);
  const [catalog, setCatalog] = useState<IssueReportCatalogRecord[]>([]);
  const [report, setReport] = useState<IssueReportRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeStageId, setActiveStageId] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    const controller = new AbortController();
    setLoading(true);
    setLoadError(false);
    setReport(null);

    void fetchIssueReportData(
      {
        org,
        platform: requestedPlatform,
        community: requestedCommunity,
        period: requestedPeriod,
        version: requestedVersion,
      },
      controller.signal
    )
      .then((response) => {
        setCatalog(response.catalog);
        setReport(response.report);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setCatalog([]);
        setReport(null);
        setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [
    org,
    requestedCommunity,
    requestedPeriod,
    requestedPlatform,
    requestedVersion,
    router.isReady,
  ]);

  useEffect(() => {
    if (!report) return;
    setActiveStageId(report.data.report_context.stages[0]?.id ?? '');
  }, [report]);

  const platform = report?.platform ?? requestedPlatform ?? '';
  const community = report?.community ?? requestedCommunity ?? '';
  const period = report?.period ?? requestedPeriod ?? '';
  const version = report?.version ?? requestedVersion ?? '';

  const communityOptions = useMemo(
    () =>
      toUniqueOptions(
        catalog,
        (record) => record.community,
        (record) => record.community
      ),
    [catalog]
  );
  const periodOptions = useMemo(
    () =>
      toUniqueOptions(
        catalog.filter(
          (record) =>
            record.community === community &&
            (!platform || record.platform === platform)
        ),
        (record) => record.period,
        (record) => record.periodLabel
      ),
    [catalog, community, platform]
  );
  const versionOptions = useMemo(
    () =>
      toUniqueOptions(
        catalog.filter(
          (record) => record.community === community && record.period === period
        ),
        (record) => record.version,
        (record) => record.version
      ),
    [catalog, community, period]
  );

  const selectReport = (nextReport: IssueReportCatalogRecord) => {
    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          platform: nextReport.platform,
          repo: nextReport.community,
          period: nextReport.period,
          version: nextReport.version,
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  const handleCommunityChange = (nextCommunity: string) => {
    const nextReport = catalog.find(
      (record) => record.community === nextCommunity
    );
    if (nextReport) selectReport(nextReport);
  };

  const handlePeriodChange = (nextPeriod: string) => {
    const nextReport = catalog.find(
      (record) => record.community === community && record.period === nextPeriod
    );
    if (nextReport) selectReport(nextReport);
  };

  const handleVersionChange = (nextVersion: string) => {
    const nextReport = catalog.find(
      (record) =>
        record.community === community &&
        record.period === period &&
        record.version === nextVersion
    );
    if (nextReport) selectReport(nextReport);
  };

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_24%),linear-gradient(180deg,#f6f8fc_0%,#eef3fb_100%)]">
      <div className="flex min-h-full w-full min-w-0 flex-col gap-5 p-5">
        <div className="flex justify-end">
          <IssueReportControls
            community={community}
            period={period}
            version={version}
            communityOptions={communityOptions}
            periodOptions={periodOptions}
            versionOptions={versionOptions}
            onCommunityChange={handleCommunityChange}
            onPeriodChange={handlePeriodChange}
            onVersionChange={handleVersionChange}
          />
        </div>

        {loading ? (
          <div className="flex min-h-[520px] items-center justify-center rounded-3xl border border-white/80 bg-white/85 px-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <Spin tip="报告数据加载中..." />
          </div>
        ) : report ? (
          <>
            <IssueReportOverview report={report}>
              <IssueExperiencePath
                projectName={report.data.community_name}
                stages={report.data.report_context.stages}
                pains={report.data.report_context.top_pains}
                recommendations={report.data.report_context.top_recs}
                sampleSize={report.data.report_context.n_total}
                activeStageId={activeStageId}
                onStageChange={setActiveStageId}
              />
              <IssueExecutiveSummary context={report.data.report_context} />
            </IssueReportOverview>

            <footer className="px-1 pb-2 text-[11px] leading-5 text-slate-500">
              Cogito · Issue 贡献体验 · {report.periodLabel}
            </footer>
          </>
        ) : (
          <div className="flex min-h-[520px] items-center justify-center rounded-3xl border border-white/80 bg-white/85 px-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <Empty
              description={
                <span className="text-sm text-slate-500">
                  {loadError
                    ? '报告数据加载失败，请稍后重试'
                    : org
                    ? `组织 ${org} 下暂无匹配的 Issue 贡献报告`
                    : '当前社区、时间与报告版本组合暂无数据'}
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueContribution;
