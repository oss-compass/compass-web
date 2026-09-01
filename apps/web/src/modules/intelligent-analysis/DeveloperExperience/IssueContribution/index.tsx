import React, { useEffect, useMemo, useState } from 'react';
import { Empty, Spin } from 'antd';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import {
  fetchIssuePainTrackings,
  fetchIssueReportData,
  postIssuePainTrackingAction,
} from './data';
import type {
  IssuePainTracking,
  IssuePainTrackingActionPayload,
  IssuePainTrackingResponse,
  IssueReportCatalogRecord,
  IssueReportRecord,
} from './types';
import { getTrackingStatusMeta } from './components/PainTrackingModal/constants';
import ExperienceBackLink from '../components/ExperienceBackLink';
import IssueReportControls from './components/IssueReportControls';
import IssueReportOverview from './components/IssueReportOverview';
import IssueExperiencePath from './components/IssueExperiencePath';
import IssueScoreOverview from './components/IssueScoreOverview';

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
  const requestedStage = getSingleQueryValue(router.query.stage);
  const requestedPain = getSingleQueryValue(router.query.pain);
  const [catalog, setCatalog] = useState<IssueReportCatalogRecord[]>([]);
  const [report, setReport] = useState<IssueReportRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeStageId, setActiveStageId] = useState('');
  const [painTrackings, setPainTrackings] =
    useState<IssuePainTrackingResponse | null>(null);

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
    const nextVisibleStages = report?.data.report_context.stages.filter(
      (stage) => !stage.is_lens
    );
    const requestedVisibleStage = nextVisibleStages?.find(
      (stage) => stage.id === requestedStage
    );
    setActiveStageId(
      requestedVisibleStage?.id ?? nextVisibleStages?.[0]?.id ?? ''
    );
  }, [report, requestedStage]);

  useEffect(() => {
    if (!report?.community || !report.period) {
      setPainTrackings(null);
      return;
    }
    const controller = new AbortController();
    setPainTrackings(null);
    void fetchIssuePainTrackings(
      report.community,
      report.period,
      controller.signal
    )
      .then(setPainTrackings)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setPainTrackings(null);
      });
    return () => controller.abort();
  }, [report?.community, report?.period]);

  const trackingByPain = useMemo(() => {
    const itemMap = new Map(
      (painTrackings?.items ?? []).map((item) => [item.trackingKey, item])
    );
    return new Map(
      (painTrackings?.reportBindings ?? []).flatMap((binding) => {
        const tracking = itemMap.get(binding.trackingKey);
        return tracking
          ? [[`${binding.stageId}#${binding.painId}`, tracking] as const]
          : [];
      })
    );
  }, [painTrackings]);

  const handleTrackingAction = async (
    payload: Omit<IssuePainTrackingActionPayload, 'community'>
  ): Promise<IssuePainTracking> => {
    if (!report?.community) throw new Error('当前报告缺少仓库信息');
    try {
      const response = await postIssuePainTrackingAction({
        ...payload,
        community: report.community,
      });
      if (payload.type === 'decide_issue' || payload.type === 'decide_issues') {
        const previous = painTrackings?.items.find(
          (item) => item.trackingKey === response.data.trackingKey
        );
        if (previous && previous.status !== response.data.status) {
          // 全部判定完成，状态自动流转
          toast.success(
            `判定提交成功，全部判定完成，已进入「${
              getTrackingStatusMeta(
                response.data.status,
                response.data.trackingType
              ).label
            }」`
          );
        } else if (payload.type === 'decide_issues') {
          toast.success(`已批量判定 ${payload.issueNumbers.length} 项`);
        } else {
          const previousIssue = previous?.activeIssues.find(
            (item) => item.number === payload.issueNumber
          );
          if (previousIssue && previousIssue.valid === payload.valid) {
            toast.success('判断原因已保存');
          } else {
            toast.success(
              payload.valid ? '已判定为有效问题' : '已判定为非有效问题'
            );
          }
        }
      }
      if (
        payload.type === 'mark_issues_fixed' ||
        payload.type === 'undo_issues_fixed'
      ) {
        const previous = painTrackings?.items.find(
          (item) => item.trackingKey === response.data.trackingKey
        );
        const count = payload.issueNumbers?.length ?? 0;
        const statusChanged =
          previous !== undefined && previous.status !== response.data.status;
        const actionLabel =
          payload.type === 'mark_issues_fixed'
            ? `已批量标记 ${count} 项为已修复`
            : `已批量撤销 ${count} 项修复标记`;
        if (statusChanged) {
          // 全部 Issue 修复后自动流转（或撤销后回退）
          toast.success(
            `${actionLabel}，已进入「${
              getTrackingStatusMeta(
                response.data.status,
                response.data.trackingType
              ).label
            }」`
          );
        } else {
          toast.success(actionLabel);
        }
      }
      if (
        payload.type === 'mark_issue_fixed' ||
        payload.type === 'undo_issue_fixed'
      ) {
        toast.success(
          payload.type === 'mark_issue_fixed'
            ? '已标记为已修复'
            : '已撤销修复标记'
        );
      }
      setPainTrackings((current) =>
        current
          ? {
              ...current,
              items: current.items.map((item) =>
                item.trackingKey === response.data.trackingKey
                  ? response.data
                  : item
              ),
            }
          : current
      );
      return response.data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '痛点跟踪操作失败');
      throw error;
    }
  };

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
  const visibleStages = useMemo(
    () =>
      report?.data.report_context.stages.filter((stage) => !stage.is_lens) ??
      [],
    [report]
  );

  const selectReport = (nextReport: IssueReportCatalogRecord) => {
    const { stage: _stage, pain: _pain, ...baseQuery } = router.query;
    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...baseQuery,
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ExperienceBackLink org={org} module="issue" />
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
                stages={visibleStages}
                pains={report.data.report_context.top_pains}
                recommendations={report.data.report_context.top_recs}
                issueScoreRows={report.data.report_context.issue_score_rows}
                activeStageId={activeStageId}
                focusPainId={requestedPain}
                onStageChange={setActiveStageId}
                trackingByPain={trackingByPain}
                onTrackingAction={handleTrackingAction}
              />
              <IssueScoreOverview
                stages={visibleStages}
                issueScoreRows={report.data.report_context.issue_score_rows}
              />
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
