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
import Image from 'next/image';
import Languages from './Languages';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';

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
    <>
      <div className="base-card rounded-lg border-2 border-b border-transparent bg-white drop-shadow-sm md:rounded-none">
        <MetricBoxContributors data={data?.contributorsDetailOverview} />
        <Languages />
      </div>
    </>
  );
};

const MetricBoxContributors: React.FC<{
  data: ContributorDetailOverview;
}> = ({ data }) => {
  const { t } = useTranslation();
  // const cardRef = useRef<HTMLDivElement>(null);
  // const titleRef = useRef<HTMLDivElement>(null);
  // const [fullScreen, setFullScreen] = useState(false);
  return (
    <div className="relative min-w-0 scroll-mt-[200px] border-b p-5">
      <div className="flex justify-between">
        <div className="text-lg font-bold">概览</div>
        {/* <CardDropDownMenu ={}/> */}
      </div>
      <div className="mt-4 mb-2 grid grid-cols-6 gap-4 pl-12">
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPersonCircle />
            </div>
            <div className="line-clamp-1">{data.contributorAllCount}</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            总贡献量
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPersonCircle />
            </div>
            <div className="line-clamp-1">211</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            总 Commit
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPeopleCircle />
            </div>
            <div className="line-clamp-1">125</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            总 Issues
          </div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">
              <IoPeopleCircle />
            </div>
            <div className="line-clamp-1">25</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">总 PR</div>
        </div>
        <div>
          <div className="flex text-xl font-medium">
            <div className="mt-1 mr-2 text-[#ccc]">{getIcons('github')}</div>
            <div className="line-clamp-1">flutter</div>
          </div>
          <div className="line-clamp-1 pl-7 text-sm text-[#585858]">
            Top 贡献仓库
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
            所属组织
          </div>
        </div>
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
export default DeveloperDashboard;
