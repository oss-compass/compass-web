import React from 'react';
// import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Empty } from 'antd';
// import getLocalesFile from '@common/utils/getLocalesFile';

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
// 暂时不需要国际化
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   return {
//     props: {
//       ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
//     },
//   };
// };

const CommunityExperiencePage: React.FC = () => {
  const router = useRouter();
  const { soc } = router.query;

  if (soc === 'A5') {
    return (
      <div className="flex h-screen flex-1 items-center justify-center bg-[#f4f6fb]">
        <Empty
          styles={{
            image: { height: 150 },
            description: { marginTop: 8 },
          }}
          description={
            <span
              style={{
                color: '#000000',
                fontSize: 14,
                lineHeight: '1.5715',
                textAlign: 'center',
              }}
            >
              正在开发中，敬请期待
            </span>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-1 bg-[#eef2fa]">
      <div className="h-screen w-full overflow-y-auto">
        <UserJourney hidePageHeaderDeveloperControls transparentPageHeader />
      </div>
    </div>
  );
};

export default CommunityExperiencePage;
