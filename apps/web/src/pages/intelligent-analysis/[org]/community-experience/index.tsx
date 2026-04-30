import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Empty } from 'antd';

const UserJourney = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney'),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-slate-500">
        报告加载中...
      </div>
    ),
  }
);

const CommunityExperiencePage: React.FC = () => {
  const router = useRouter();
  const { soc, org } = router.query;

  if (soc === 'A5') {
    return (
      <div className="flex h-screen flex-1 items-center justify-center bg-[#f4f6fb]">
        <Empty
          className="mb-[100px]"
          styles={{
            image: { height: 150 },
            description: { marginTop: 8, textAlign: 'center' },
          }}
          description={
            <span
              style={{
                color: '#000000',
                fontSize: 14,
                lineHeight: '1.5715',
              }}
            >
              暂无数据
            </span>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-1 bg-[#eef2fa]">
      <div className="h-screen w-full overflow-y-auto">
        <UserJourney
          hidePageHeaderDeveloperControls
          transparentPageHeader
          org={typeof org === 'string' ? org : undefined}
        />
      </div>
    </div>
  );
};

export default CommunityExperiencePage;
