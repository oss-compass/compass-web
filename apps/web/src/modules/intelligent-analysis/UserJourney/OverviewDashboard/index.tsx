import React, { useMemo, useState } from 'react';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchOverviewSummary,
  fetchOverviewCards,
  fetchOverviewCommonIssues,
  updateOverviewPainDetail,
  type OverviewPainPointRow,
} from '../rawData/apiClient';
import CommonIssuesSection from './CommonIssuesSection';
import { SEVERITY_RANK, STATUS_RANK } from './constants';
import DashboardStyles from './DashboardStyles';
import IssueDetailModal from './IssueDetailModal';
import OverviewSummarySection from './OverviewSummarySection';
import PainEditModal from './PainEditModal';
import RepoProgressSection from './RepoProgressSection';
import type {
  CommonIssueGroup,
  DashboardIssue,
  IssueBucket,
  IssueModalState,
  ProgressTab,
  RepoProgressRow,
  RepoSortKey,
} from './types';
import {
  calcMetrics,
  getAverage,
  getSortValue,
  mergeMetrics,
  toDashboardIssue,
} from './utils';

type OverviewDashboardProps = {
  org?: string;
};

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ org }) => {
  const queryClient = useQueryClient();
  const [editingPain, setEditingPain] = useState<OverviewPainPointRow | null>(
    null
  );
  const [issueModal, setIssueModal] = useState<IssueModalState>({
    open: false,
    title: '',
    issues: [],
  });
  const [currentTab, setCurrentTab] = useState<ProgressTab>('overall');
  const [includeCommonIssues, setIncludeCommonIssues] = useState(true);
  const [repoFilter, setRepoFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [sortKey, setSortKey] = useState<RepoSortKey | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const { data: cardsResp, isLoading } = useQuery({
    queryKey: [
      'overview-cards-page',
      org,
      currentTab,
      includeCommonIssues,
      repoFilter,
      teamFilter,
    ],
    queryFn: () =>
      fetchOverviewCards({
        viewType: 'repo',
        org,
        tab: currentTab,
        includeCommonIssues,
        team: teamFilter || undefined,
        repo: repoFilter || undefined,
        page: 1,
        size: 200,
      }),
  });

  const { data: summaryResp } = useQuery({
    queryKey: ['overview-summary', org],
    queryFn: () =>
      fetchOverviewSummary({
        org,
      }),
  });

  const { data: commonIssuesResp } = useQuery({
    queryKey: ['overview-common-issues', org, currentTab, teamFilter],
    queryFn: () =>
      fetchOverviewCommonIssues({
        org,
        tab: currentTab,
        team: teamFilter || undefined,
      }),
  });

  const painMutation = useMutation({
    mutationFn: (payload: Parameters<typeof updateOverviewPainDetail>[0]) =>
      updateOverviewPainDetail(payload),
    onSuccess: async () => {
      message.success('痛点已更新');
      await queryClient.invalidateQueries({
        queryKey: ['overview-cards-page'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['overview-summary'],
      });
    },
    onError: (error: Error) => message.error(error.message),
  });

  const repoRows = useMemo<RepoProgressRow[]>(() => {
    return (cardsResp?.items ?? []).map((card) => {
      const issues = toDashboardIssue(card);
      return {
        id: card.id,
        name: card.name,
        team: card.team || card.sig,
        score: card.latestScore ?? issues[0]?.score ?? null,
        successRate: card.latestSuccessRate ?? issues[0]?.successRate ?? null,
        latestReportId: card.latestReportId,
        detailReportUrl: card.detailReportUrl,
        overall: calcMetrics(issues),
        blocking: calcMetrics(issues.filter((issue) => issue.blocking)),
        issues,
      };
    });
  }, [cardsResp]);

  const teamOptions = useMemo(() => {
    const fromApi = (cardsResp?.teamOptions ?? []).filter(Boolean);
    if (fromApi.length) return fromApi;
    return Array.from(new Set(repoRows.map((row) => row.team))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [cardsResp, repoRows]);

  const repoOptions = useMemo(
    () =>
      cardsResp?.repoOptions?.length
        ? cardsResp.repoOptions
        : Array.from(
            new Map(
              repoRows.map((row) => [row.id, row.name] as const)
            ).entries()
          )
            .map(([value, label]) => ({ value, label }))
            .sort((a, b) => a.label.localeCompare(b.label)),
    [cardsResp, repoRows]
  );

  const progressRows = useMemo<RepoProgressRow[]>(() => {
    if (includeCommonIssues) return repoRows;
    return repoRows.map((row) => {
      const issues = row.issues.filter(
        (issue) => String(issue.severity) !== 'P5'
      );
      return {
        ...row,
        issues,
        overall: calcMetrics(issues),
        blocking: calcMetrics(issues.filter((issue) => issue.blocking)),
      };
    });
  }, [includeCommonIssues, repoRows]);

  const filteredRows = useMemo(() => progressRows, [progressRows]);

  const sortedRows = useMemo(() => {
    if (!sortKey) return filteredRows;
    const rows = [...filteredRows];
    rows.sort((left, right) => {
      const a = getSortValue(left, sortKey, currentTab);
      const b = getSortValue(right, sortKey, currentTab);
      if (typeof a === 'string' && typeof b === 'string') {
        const result = a.localeCompare(b);
        return sortAsc ? result : -result;
      }
      if (a === b) return 0;
      return sortAsc ? (a > b ? 1 : -1) : a < b ? 1 : -1;
    });
    return rows;
  }, [currentTab, filteredRows, sortAsc, sortKey]);

  const overviewSummary = useMemo(
    () => summaryResp?.overviewSummary ?? mergeMetrics(repoRows, 'overall'),
    [repoRows, summaryResp]
  );
  const blockingSummary = useMemo(
    () => summaryResp?.blockingSummary ?? mergeMetrics(repoRows, 'blocking'),
    [repoRows, summaryResp]
  );
  const summaryScore = useMemo(
    () =>
      summaryResp?.summaryScore ?? getAverage(repoRows.map((row) => row.score)),
    [repoRows, summaryResp]
  );
  const summarySuccessRate = useMemo(
    () =>
      summaryResp?.summarySuccessRate ??
      getAverage(repoRows.map((row) => row.successRate)),
    [repoRows, summaryResp]
  );

  const commonIssues = useMemo<CommonIssueGroup[]>(
    () => (commonIssuesResp?.items ?? []) as unknown as CommonIssueGroup[],
    [commonIssuesResp]
  );

  const openIssueModal = (title: string, issues: DashboardIssue[]) => {
    setIssueModal({
      open: true,
      title,
      issues: [...issues].sort((left, right) => {
        if (
          STATUS_RANK[left.normalizedStatus] !==
          STATUS_RANK[right.normalizedStatus]
        ) {
          return (
            STATUS_RANK[right.normalizedStatus] -
            STATUS_RANK[left.normalizedStatus]
          );
        }
        return SEVERITY_RANK[right.severity] - SEVERITY_RANK[left.severity];
      }),
    });
  };

  const openRepoIssues = (
    row: RepoProgressRow,
    bucket: IssueBucket | 'total'
  ) => {
    let issues =
      currentTab === 'blocking'
        ? row.issues.filter((issue) => issue.blocking)
        : row.issues;
    if (bucket === 'pending') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'pending');
    } else if (bucket === 'inProgress') {
      issues = issues.filter(
        (issue) => issue.normalizedStatus === 'inProgress'
      );
    } else if (bucket === 'resolved') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'resolved');
    } else if (bucket === 'na') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'na');
    } else {
      issues = issues.filter((issue) => issue.normalizedStatus !== 'na');
    }

    const bucketLabel =
      bucket === 'pending'
        ? '待处理'
        : bucket === 'inProgress'
        ? '进行中'
        : bucket === 'resolved'
        ? '已闭环'
        : bucket === 'na'
        ? '不需要修复'
        : '总问题数';

    openIssueModal(`${row.name} · ${bucketLabel}`, issues);
  };

  const handleSort = (key: RepoSortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
      return;
    }
    setSortKey(key);
    setSortAsc(true);
  };

  const sortArrow = (key: RepoSortKey) =>
    sortKey === key ? (sortAsc ? '↑' : '↓') : '';

  return (
    <div className="oj-page">
      <div className="detail-panel-body">
        <OverviewSummarySection
          overviewSummary={overviewSummary}
          blockingSummary={blockingSummary}
          summaryScore={summaryScore}
          summarySuccessRate={summarySuccessRate}
          repoCount={summaryResp?.repoCount ?? repoRows.length}
        />

        <RepoProgressSection
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          includeCommonIssues={includeCommonIssues}
          onIncludeCommonIssuesChange={setIncludeCommonIssues}
          repoFilter={repoFilter}
          repoOptions={repoOptions}
          onRepoFilterChange={setRepoFilter}
          teamFilter={teamFilter}
          teamOptions={teamOptions}
          onTeamFilterChange={setTeamFilter}
          isLoading={isLoading}
          sortedRows={sortedRows}
          sortArrow={sortArrow}
          onSort={handleSort}
          onOpenRepoIssues={openRepoIssues}
        />

        <CommonIssuesSection
          commonIssues={commonIssues}
          onOpenIssueModal={openIssueModal}
        />

        <IssueDetailModal
          state={issueModal}
          onClose={() => setIssueModal({ open: false, title: '', issues: [] })}
          onEdit={(issue) => {
            setIssueModal((prev) => ({ ...prev, open: false }));
            setEditingPain(issue);
          }}
        />
        <PainEditModal
          open={!!editingPain}
          row={editingPain}
          onClose={() => setEditingPain(null)}
          onSubmit={async (row, patch) => {
            await painMutation.mutateAsync({
              file_key: row.fileKey,
              step_id: row.stepId,
              pain_index: row.painIndex,
              ...patch,
            });
          }}
        />
        <DashboardStyles />
      </div>
    </div>
  );
};

export default OverviewDashboard;
