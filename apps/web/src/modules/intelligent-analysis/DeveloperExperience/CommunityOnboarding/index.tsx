import React from 'react';
import dynamic from 'next/dynamic';
import { Empty } from 'antd';
import { useRouter } from 'next/router';

const UserJourney = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney'),
  {
    loading: () => (
      <div className="flex min-h-full items-center justify-center px-6 text-sm text-slate-500">
        报告加载中...
      </div>
    ),
  }
);

type CommunityOnboardingProps = {
  org?: string;
};

const getSingleQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const CommunityOnboarding: React.FC<CommunityOnboardingProps> = ({ org }) => {
  const router = useRouter();
  const soc = getSingleQueryValue(router.query.soc);

  if (soc === 'A5') {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#f4f6fb] px-6">
        <Empty
          className="mb-[72px]"
          styles={{
            image: { height: 150 },
            description: { marginTop: 8, textAlign: 'center' },
          }}
          description={
            <span className="text-sm leading-6 text-slate-700">暂无数据</span>
          }
        />
      </div>
    );
  }

  return (
    <UserJourney
      hidePageHeaderDeveloperControls
      hidePageHeaderOverviewLink
      transparentPageHeader
      org={org}
    />
  );
};

export default CommunityOnboarding;
