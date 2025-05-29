import React from 'react';
import { useTranslation } from 'next-i18next';
import { BiChat, BiGitPullRequest, BiGitCommit } from 'react-icons/bi';
import { GoIssueOpened, GoRepo } from 'react-icons/go';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import Pie from './Pie';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';

// 定义接口返回数据类型
interface ContributionOverviewData {
  commit_count: number;
  pr_count: number;
  issue_count: number;
  code_review_count: number;
  contributed_to_count: number;
  level: {
    rank: string;
    score: string;
  };
}

const Main = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } =
    useContributorApi<ContributionOverviewData>(
      '/api/v2/contributor_portrait/contribution_overview',
      'contribution_overview'
    );
  return (
    <BaseCard
      title={t('developer:contribution_overview')}
      id="contribution_overview"
      loading={isLoading}
      description=""
      className="h-[300px]"
      bodyClass="h-[260px]"
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
            enableReferenceLineSwitch={false}
          />
        </>
      )}
    >
      {() => <MetricBoxContributors data={data} />}
    </BaseCard>
  );
};

interface MetricBoxContributorsProps {
  data?: ContributionOverviewData;
}

const MetricBoxContributors = ({ data }: MetricBoxContributorsProps) => {
  return (
    <div className="relative flex min-w-0 scroll-mt-[200px] justify-center p-5">
      <div className="mr-10 grid max-w-[300px] flex-1 sm:mr-0 xl:mr-2">
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-lg text-[#ff9d36]">
              <BiGitCommit />
            </div>
            <div className="line-clamp-1 ">Commits</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">
            {data?.commit_count || 0}
          </div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-lg text-[#ff9d36]">
              <BiGitPullRequest />
            </div>
            <div className="line-clamp-1 ">PRs</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">
            {data?.pr_count || 0}
          </div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-[#ff9d36]">
              <GoIssueOpened />
            </div>
            <div className="line-clamp-1 ">Issues</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">
            {data?.issue_count || 0}
          </div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-[#ff9d36]">
              <BiChat />
            </div>
            <div className="line-clamp-1 ">Code Reviews</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">
            {data?.code_review_count || 0}
          </div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-[#ff9d36]">
              <GoRepo />
            </div>
            <div className="line-clamp-1 ">Contributed to</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">
            {data?.contributed_to_count || 0}
          </div>
        </div>
      </div>
      <div className="flex w-40 items-center justify-center">
        <Pie
          score={data?.level?.score || 'A'}
          rank={data?.level?.rank || '60'}
        />
      </div>
    </div>
  );
};

export default Main;
