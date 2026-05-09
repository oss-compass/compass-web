import React, { useMemo, useState } from 'react';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchOverviewCards,
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
  normalizeText,
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
  const [teamFilter, setTeamFilter] = useState('');
  const [sortKey, setSortKey] = useState<RepoSortKey>('team');
  const [sortAsc, setSortAsc] = useState(true);

  const { data: cardsResp, isLoading } = useQuery({
    queryKey: ['overview-cards-page', org],
    queryFn: () =>
      fetchOverviewCards({
        viewType: 'repo',
        org,
        page: 1,
        size: 200,
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
    },
    onError: (error: Error) => message.error(error.message),
  });

  const repoRows = useMemo<RepoProgressRow[]>(() => {
    return (cardsResp?.items ?? []).map((card) => {
      const issues = toDashboardIssue(card);
      return {
        id: card.id,
        name: card.name,
        team: card.sig,
        score: issues[0]?.score ?? null,
        successRate: issues[0]?.successRate ?? null,
        overall: calcMetrics(issues),
        blocking: calcMetrics(issues.filter((issue) => issue.blocking)),
        issues,
      };
    });
  }, [cardsResp]);

  const teamOptions = useMemo(
    () =>
      Array.from(new Set(repoRows.map((row) => row.team))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [repoRows]
  );

  const filteredRows = useMemo(
    () =>
      repoRows.filter((row) => (teamFilter ? row.team === teamFilter : true)),
    [repoRows, teamFilter]
  );

  const sortedRows = useMemo(() => {
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
    () => mergeMetrics(repoRows, 'overall'),
    [repoRows]
  );
  const blockingSummary = useMemo(
    () => mergeMetrics(repoRows, 'blocking'),
    [repoRows]
  );
  const summaryScore = useMemo(
    () => getAverage(repoRows.map((row) => row.score)),
    [repoRows]
  );
  const summarySuccessRate = useMemo(
    () => getAverage(repoRows.map((row) => row.successRate)),
    [repoRows]
  );

  const commonIssues = useMemo<CommonIssueGroup[]>(() => {
    const issueMap = new Map<string, CommonIssueGroup>();
    repoRows.forEach((row) => {
      row.issues.forEach((issue) => {
        const key = [
          issue.journeyStage,
          issue.issueType,
          normalizeText(issue.description),
          issue.severity,
        ].join('::');
        const existing = issueMap.get(key);
        if (existing) {
          existing.items.push(issue);
          existing.repoCount = new Set(
            existing.items.map((item) => item.repoName)
          ).size;
          existing.status =
            STATUS_RANK[issue.normalizedStatus] > STATUS_RANK[existing.status]
              ? issue.normalizedStatus
              : existing.status;
          return;
        }
        issueMap.set(key, {
          key,
          journeyStage: issue.journeyStage,
          issueType: issue.issueType,
          description: issue.description,
          severity: issue.severity,
          repoCount: 1,
          status: issue.normalizedStatus,
          items: [issue],
        });
      });
    });

    return Array.from(issueMap.values())
      .filter((group) => group.items.length > 0)
      .sort((left, right) => {
        if (right.repoCount !== left.repoCount)
          return right.repoCount - left.repoCount;
        if (SEVERITY_RANK[right.severity] !== SEVERITY_RANK[left.severity]) {
          return SEVERITY_RANK[right.severity] - SEVERITY_RANK[left.severity];
        }
        return STATUS_RANK[right.status] - STATUS_RANK[left.status];
      });
  }, [repoRows]);

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

  const openSummaryIssues = (
    tab: ProgressTab,
    bucket: Exclude<IssueBucket, 'na'> | 'total'
  ) => {
    let issues = repoRows.flatMap((row) => row.issues);
    if (tab === 'blocking') {
      issues = issues.filter((issue) => issue.blocking);
    }
    if (bucket === 'pending') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'pending');
    } else if (bucket === 'inProgress') {
      issues = issues.filter(
        (issue) => issue.normalizedStatus === 'inProgress'
      );
    } else if (bucket === 'resolved') {
      issues = issues.filter((issue) => issue.normalizedStatus === 'resolved');
    } else {
      issues = issues.filter((issue) => issue.normalizedStatus !== 'na');
    }

    const tabLabel = tab === 'blocking' ? '阻塞问题' : '总体问题';
    const bucketLabel =
      bucket === 'pending'
        ? '待处理'
        : bucket === 'inProgress'
        ? '进行中'
        : bucket === 'resolved'
        ? '已闭环'
        : '总问题数';

    openIssueModal(`总览信息 · ${tabLabel} · ${bucketLabel}`, issues);
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
          repoCount={repoRows.length}
          onOpenSummaryIssues={openSummaryIssues}
        />

        <RepoProgressSection
          currentTab={currentTab}
          onTabChange={setCurrentTab}
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
