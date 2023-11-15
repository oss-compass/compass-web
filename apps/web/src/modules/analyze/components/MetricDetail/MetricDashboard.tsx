import React from 'react';
import { useTranslation } from 'next-i18next';
import { IoPeopleCircle, IoPersonCircle } from 'react-icons/io5';
import { GoIssueOpened, GoGitPullRequestClosed } from 'react-icons/go';
import { AiFillClockCircle, AiOutlineIssuesClose } from 'react-icons/ai';
import { BiChat, BiGitPullRequest, BiGitCommit } from 'react-icons/bi';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { useRouter } from 'next/router';
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
      <div className="mt-4 grid grid-cols-3 gap-4">
        <MetricBoxContributors data={data?.contributorsDetailOverview} />
        <MetricBoxIssues data={data?.issuesDetailOverview} />
        <MetricBoxPr data={data?.pullsDetailOverview} />
      </div>
    </div>
  );
};

export default MetricDashboard;

const MetricBoxContributors: React.FC<{
  data: ContributorDetailOverview;
}> = ({ data }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const slugs = router.query.slugs;

  return (
    <div className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none">
      <div className="flex justify-between">
        <div className="text-xl font-bold">
          {t('analyze:metric_detail:contributors_persona')}
        </div>
        <div
          className="cursor-pointer pt-1 text-sm text-[#585858]"
          onClick={() => {
            router.push('/analyze/metric/' + slugs);
          }}
        >
          {t('analyze:metric_detail:details')}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
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
  const router = useRouter();
  const slugs = router.query.slugs;

  return (
    <div className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none">
      <div className="flex justify-between">
        <div className="text-xl font-bold">
          {t('analyze:metric_detail:issues')}
        </div>
        <div
          className="cursor-pointer pt-1 text-sm text-[#585858]"
          onClick={() => {
            router.push('/analyze/metric/' + slugs);
          }}
        >
          {t('analyze:metric_detail:details')}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
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
  const router = useRouter();
  const slugs = router.query.slugs;
  return (
    <div className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none">
      <div className="flex justify-between">
        <div className="line-clamp-1 text-xl font-bold">
          {t('analyze:metric_detail:pull_requests')}
        </div>
        <div
          onClick={() => {
            router.push('/analyze/metric/' + slugs);
          }}
          className="cursor-pointer pt-1 text-sm text-[#585858]"
        >
          {t('analyze:metric_detail:details')}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
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
  <div className="rounded border px-6 py-6 shadow">
    <div className="flex flex-1 flex-col bg-white">
      <div className="animate-pulse">
        <div className="flex-1 space-y-4 ">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
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
