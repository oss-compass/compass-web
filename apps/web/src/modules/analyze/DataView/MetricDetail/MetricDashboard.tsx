import React from 'react';
import { useTranslation } from 'next-i18next';
import { IoPeopleCircle, IoPersonCircle } from 'react-icons/io5';
import { GoIssueOpened, GoGitPullRequestClosed } from 'react-icons/go';
import {
  AiFillClockCircle,
  AiOutlineIssuesClose,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { BiChat, BiGitPullRequest, BiGitCommit } from 'react-icons/bi';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import {
  useMetricDashboardQuery,
  ContributorDetailOverview,
  IssueDetailOverview,
  PullDetailOverview,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import { toFixed } from '@common/utils';
import { useRouter } from 'next/router';

const MetricDashboard = () => {
  const { compareItems } = useCompareItems();
  const len = compareItems.length;
  if (len > 1) {
    return null;
  }
  return <Main />;
};

const Main = () => {
  const { t } = useTranslation();
  const { compareItems } = useCompareItems();
  const { timeStart, timeEnd } = useQueryDateRange();
  const router = useRouter();
  const slugs = router.query.slugs;
  const { label, level } = compareItems[0];
  const { data, isLoading } = useMetricDashboardQuery(client, {
    label: label,
    level: level,
    beginDate: timeStart,
    endDate: timeEnd,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mt-6 mb-2 flex justify-between">
        <div className="text-xl font-semibold text-[#000000]">
          {t('analyze:metric_detail:project_deep_dive_insight')}
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 rounded border border-[#3A5BEF] py-1.5 px-3 text-xs text-[#3A5BEF]"
          onClick={() => {
            router.push('/analyze/insight/' + slugs + '?range=1M');
          }}
        >
          {t('analyze:metric_detail:details')}
          <AiOutlineArrowRight />
        </div>
      </div>
      <div className="base-card rounded-lg border-2 border-b border-transparent bg-white drop-shadow-sm md:rounded-none">
        <MetricBoxContributors data={data?.contributorsDetailOverview} />
        <div className="grid grid-cols-2">
          <MetricBoxIssues data={data?.issuesDetailOverview} />
          <MetricBoxPr data={data?.pullsDetailOverview} />
        </div>
      </div>
    </div>
  );
};

const MetricBoxContributors: React.FC<{
  data: ContributorDetailOverview;
}> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="relative min-w-0 scroll-mt-[200px] border-b p-5">
      <div className="flex justify-between">
        <div className="text-lg font-bold">
          {t('analyze:metric_detail:contributor')}
        </div>
      </div>
      <div className="mt-4 mb-2 grid grid-cols-4 gap-4 pl-12">
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPersonCircle />
            </div>
            <div className="line-clamp-1">{data.contributorAllCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:contributor_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPersonCircle />
            </div>
            <div className="line-clamp-1">
              {data.highestContributionContributor.name}
            </div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:top_contributor')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPeopleCircle />
            </div>
            <div className="line-clamp-1">{data.orgAllCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:org_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              {getIcons(data.highestContributionOrganization.origin)}
            </div>
            <div className="line-clamp-1">
              {data.highestContributionOrganization.name || '/'}
            </div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:top_contributing_org')}
          </div>
        </div>
      </div>
    </div>
  );
};
const MetricBoxIssues: React.FC<{
  data: IssueDetailOverview;
}> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="relative min-w-0 scroll-mt-[200px] border-r bg-white p-5">
      <div className="flex justify-between">
        <div className="text-lg font-bold">
          {t('analyze:metric_detail:issues')}
        </div>
      </div>
      <div className="mt-4 mb-2 grid grid-cols-2 gap-4 pl-12">
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <GoIssueOpened />
            </div>
            <div className="line-clamp-1">{data.issueCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:newly_created_issues')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <AiOutlineIssuesClose />
            </div>
            <div className="line-clamp-1">
              {toFixed(data.issueCompletionRatio * 100, 1) +
                '% (' +
                data.issueCompletionCount +
                ')'}
            </div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:issue_completion_rate')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <AiFillClockCircle />
            </div>
            <div className="line-clamp-1">{data.issueUnresponsiveCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:unanswered_issue_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <BiChat />
            </div>
            <div className="line-clamp-1">
              {toFixed(data.issueCommentFrequencyMean, 2)}
            </div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:average_comments_count')}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBoxPr: React.FC<{
  data: PullDetailOverview;
}> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="relative min-w-0 scroll-mt-[200px] p-5">
      <div className="flex justify-between">
        <div className="line-clamp-1 text-lg font-bold">
          {t('analyze:metric_detail:pull_requests')}
        </div>
      </div>
      <div className="mt-4 mb-2 grid grid-cols-2 gap-4 pl-12">
        <div>
          <div className="flex text-xl font-medium">
            <div className="line-clamp-1 mt-1 mr-2 text-[#ccc]">
              <BiGitPullRequest />
            </div>
            <div className="line-clamp-1">{data.pullCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:newly_created_pr_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <GoGitPullRequestClosed />
            </div>
            <div className="line-clamp-1">
              {toFixed(data.pullCompletionRatio * 100, 1) +
                '% (' +
                data.pullCompletionCount +
                ')'}
            </div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:pr_completion_rate')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <AiFillClockCircle />
            </div>
            <div className="line-clamp-1">{data.pullUnresponsiveCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:unanswered_pr_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <BiGitCommit />
            </div>
            <div className="line-clamp-1">{data.commitCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:commit_count')}
          </div>
        </div>
      </div>
    </div>
  );
};
const Loading = () => (
  <div className="animate-pulse rounded border p-10 px-6 py-6 shadow">
    <div className="flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="h-4 rounded bg-slate-200"></div>
    </div>
  </div>
);
const getIcons = (type: string) => {
  switch (type) {
    case 'github':
      return <AiFillGithub className="mr-2" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="mr-0" />;
    default:
      return <IoPeopleCircle />;
  }
};

export default MetricDashboard;
