import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CI_DATA } from './data';
import { normalizeRepoKey, repoKeyToQuery } from './helpers';
import type { CiRepoKey } from './types';
import CiControls from './components/CiControls';
import CiBanner from './components/CiBanner';
import CiReport from './components/CiReport';

type CiExperienceProps = {
  org?: string;
};

const CiExperience: React.FC<CiExperienceProps> = () => {
  const router = useRouter();
  const [repo, setRepo] = useState<CiRepoKey>(() =>
    normalizeRepoKey(router.query.repo)
  );

  // 路由 query 变化时同步本地状态（前进/后退、外链带 repo 进入）
  useEffect(() => {
    setRepo(normalizeRepoKey(router.query.repo));
  }, [router.query.repo]);

  const handleRepoChange = useCallback(
    (next: CiRepoKey) => {
      setRepo(next);
      void router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, repo: repoKeyToQuery(next) },
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const data = CI_DATA[repo];

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)]">
      <div className="flex min-h-full flex-col gap-5 p-5">
        {/* 控制栏：组织 / 仓库 / Workflow */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="m-0 text-lg font-semibold text-slate-900">
              CI 体验诊断
            </h1>
          </div>
          <CiControls repo={repo} onRepoChange={handleRepoChange} data={data} />
        </div>

        {/* 数据声明 */}
        <CiBanner />

        {/* 报告部分（维度驱动联动区）；总览已迁至总览看板 OverviewDashboard */}
        <CiReport data={data} repo={repo} />

        <footer className="px-1 py-2 text-[11.5px] leading-relaxed text-slate-400">
          Cogito · CI 体验诊断 · 数字由验证仓 gitcode-ci-lab
          实测生成（2026-07-11→07-18）· 本页不打总分，改进效果看指标曲线 +
          落地标注 + 前后对比
        </footer>
      </div>
    </div>
  );
};

export default CiExperience;
