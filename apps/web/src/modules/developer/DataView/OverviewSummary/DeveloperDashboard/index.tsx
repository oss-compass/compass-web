import React from 'react';
import { useTranslation } from 'next-i18next';
import { IoPeopleCircle, IoPersonCircle } from 'react-icons/io5';
import useCompareItems from '@modules/developer/hooks/useCompareItems';
import useQueryDateRange from '@modules/developer/hooks/useQueryDateRange';
import {
  useMetricDashboardQuery,
  ContributorDetailOverview,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { SiGitee, SiGithub } from 'react-icons/si';
import { useRouter } from 'next/router';
import { BiChat, BiGitPullRequest, BiGitCommit } from 'react-icons/bi';
import {
  AiFillClockCircle,
  AiOutlineIssuesClose,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { GoIssueOpened, GoGitPullRequestClosed, GoRepo } from 'react-icons/go';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import BaseCard from '@common/components/BaseCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import Pie from '@modules/oh/components/Pie';

const DeveloperDashboard = () => {
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
  return (
    <BaseCard
      title={'贡献概览'}
      id={Topic.Overview}
      description=""
      className="h-[300px]"
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
      {(containerRef) => (
        <MetricBoxContributors />
        // <EChartX
        //   option={echartsOpts}
        //   loading={loading}
        //   containerRef={containerRef}
        // />
      )}
    </BaseCard>
  );
  // return (
  //   <>
  //     <div className="base-card rounded-lg border-2 border-b border-transparent bg-white drop-shadow-sm md:rounded-none">
  //       <MetricBoxContributors data={data?.contributorsDetailOverview} />
  //       <Languages />
  //     </div>
  //   </>
  // );
};

const MetricBoxContributors = () => {
  return (
    <div className="relative flex min-w-0 scroll-mt-[200px] justify-center p-5">
      <div className="mr-12 grid max-w-[300px] flex-1">
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-lg text-[#ff9d36]">
              <BiGitCommit />
            </div>
            <div className="line-clamp-1 ">Commits</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">{523}</div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-lg text-[#ff9d36]">
              <BiGitPullRequest />
            </div>
            <div className="line-clamp-1 ">PRs</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">{56}</div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-[#ff9d36]">
              <GoIssueOpened />
            </div>
            <div className="line-clamp-1 ">Issues</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">{129}</div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-[#ff9d36]">
              <BiChat />
            </div>
            <div className="line-clamp-1 ">Code Reviews</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">{71}</div>
        </div>
        <div className="mb-2 flex items-center font-medium">
          <div className="flex flex-1 items-center">
            <div className="mr-2 text-[#ff9d36]">
              <GoRepo />
            </div>
            <div className="line-clamp-1 ">Contributed to</div>
          </div>
          <div className="line-clamp-1 w-16 font-semibold">{236}</div>
        </div>
      </div>
      <div className="flex w-40 items-center justify-center">
        <Pie score={80} />
      </div>
    </div>
  );
};
const Loading = () => (
  <div className="h-[286px] animate-pulse rounded border bg-white p-10 px-6 py-6 shadow">
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
      return <SiGithub color="#171516" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="mr-0" />;
    default:
      return <IoPeopleCircle />;
  }
};

export default DeveloperDashboard;
