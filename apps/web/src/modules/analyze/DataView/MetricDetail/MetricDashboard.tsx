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
import { SiGitee, SiGithub } from 'react-icons/si';
import { toFixed } from '@common/utils';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
    return (
      <>
        <div className="mt-6 mb-2 flex justify-between">
          <div className="text-xl font-semibold text-[#000000]">
            {t('analyze:metric_detail:project_deep_dive_insight')}
          </div>
          <div
            className="flex cursor-pointer items-center gap-2 rounded border border-[#3A5BEF] py-1.5 px-3 text-xs text-[#3A5BEF]"
            onClick={() => {
              const query = window.location.search;
              router.push('/analyze/insight/' + slugs + query);
            }}
          >
            {t('analyze:metric_detail:details')}
            <AiOutlineArrowRight />
          </div>
        </div>
        <Loading />
      </>
    );
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
            const query = window.location.search;
            router.push('/analyze/insight/' + slugs + query);
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

  if (!data) {
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
            </div>
            <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
              {t('analyze:metric_detail:org_count')}
            </div>
          </div>
          <div>
            <div className="flex text-xl font-medium">
              <div className="mt-1 mr-2 text-[#ccc]">
                <IoPeopleCircle />
              </div>
              <div className="line-clamp-1">-</div>
            </div>
            <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
              {t('analyze:metric_detail:top_contributing_org')}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="line-clamp-1">{data.contributorAllCount || 0}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:contributor_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            {getTopUser(
              data.highestContributionContributor?.origin,
              data.highestContributionContributor?.name
            )}
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
            <div className="line-clamp-1">{data.orgAllCount || 0}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            {t('analyze:metric_detail:org_count')}
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              {getIcons(data.highestContributionOrganization?.origin)}
            </div>
            <div className="line-clamp-1">
              {data.highestContributionOrganization?.name || '/'}
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

  if (!data) {
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
            </div>
            <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
              {t('analyze:metric_detail:average_comments_count')}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="line-clamp-1">{data.issueCount || 0}</div>
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
              {data.issueCompletionRatio
                ? toFixed(data.issueCompletionRatio * 100, 1) +
                  '% (' +
                  (data.issueCompletionCount || 0) +
                  ')'
                : '/'}
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
            <div className="line-clamp-1">
              {data.issueUnresponsiveCount || 0}
            </div>
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
              {data.issueCommentFrequencyMean
                ? toFixed(data.issueCommentFrequencyMean, 2)
                : 0}
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

  if (!data) {
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
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
              <div className="line-clamp-1">-</div>
            </div>
            <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
              {t('analyze:metric_detail:commit_count')}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="line-clamp-1">{data.pullCount || 0}</div>
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
              {data.pullCompletionRatio
                ? toFixed(data.pullCompletionRatio * 100, 1) +
                  '% (' +
                  (data.pullCompletionCount || 0) +
                  ')'
                : '/'}
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
            <div className="line-clamp-1">
              {data.pullUnresponsiveCount || 0}
            </div>
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
            <div className="line-clamp-1">{data.commitCount || 0}</div>
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
  <div className="h-[348px] animate-pulse rounded border bg-white p-10 px-6 py-6 shadow">
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
  if (!type) {
    return <IoPeopleCircle />;
  }
  switch (type) {
    case 'github':
      return <SiGithub color="#171516" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="mr-0" />;
    default:
      return <IoPeopleCircle />;
  }
};
const getTopUser = (type, name) => {
  let url = null;
  let userIcon = null;
  if (!name) {
    userIcon = <IoPersonCircle />;
  } else {
    switch (type) {
      case 'github':
        url = 'https://github.com/' + name;
        userIcon = (
          <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full border border-gray-100 p-0">
            <Image
              src={'https://github.com/' + name + '.png'}
              onError={(e) => (e.currentTarget.src = '/images/github.png')}
              unoptimized
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              alt="icon"
              placeholder="blur"
              blurDataURL="/images/github.png"
            />
          </div>
        );
        break;
      case 'gitee':
        url = 'https://gitee.com/' + name;
        userIcon = (
          <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full border border-gray-100">
            <Image
              src={'https://gitee.com/' + name + '.png'}
              onError={(e) =>
                (e.currentTarget.src = '/images/logos/gitee-red.svg')
              }
              unoptimized
              fill={true}
              alt="icon"
              placeholder="blur"
              blurDataURL="/images/logos/gitee-red.svg"
            />
          </div>
        );
        break;
      default:
        userIcon = <IoPersonCircle />;
        break;
    }
  }

  return (
    <>
      <div className="mt-1 mr-2 text-[#ccc]">{userIcon}</div>
      <div className="line-clamp-1">
        {url ? (
          <a
            className="whitespace-nowrap hover:text-[black] hover:underline"
            href={url}
            target="_blank"
            rel={'noreferrer'}
          >
            {name}
          </a>
        ) : (
          name || '/'
        )}
      </div>
    </>
  );
};
export default MetricDashboard;
