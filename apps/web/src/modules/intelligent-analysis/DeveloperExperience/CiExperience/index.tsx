import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CI_DATA } from './data';
import { normalizeRepoKey, repoKeyToQuery } from './helpers';
import type { CiDimKey, CiRepoKey } from './types';
import CiControls from './components/CiControls';
import CiReportOverview from './components/CiReportOverview';
import CiBanner from './components/CiBanner';
import CiViewToggle, { type CiView } from './components/CiViewToggle';
import SectionCard from './components/SectionCard';
import { EmptyState } from './components/shared';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import Appendix from './components/Appendix';

type CiExperienceProps = {
  org?: string;
};

type DimSelection = CiDimKey | 'all';

const lastDay = (repo: CiRepoKey): string | null => {
  const { days } = CI_DATA[repo];
  return days.length ? days[days.length - 1] : null;
};

const defaultDim = (repo: CiRepoKey, day: string | null): DimSelection => {
  if (!day) return 'all';
  const board = CI_DATA[repo].boards[day];
  return board ? board.default_dim : 'all';
};

const CiExperience: React.FC<CiExperienceProps> = () => {
  const router = useRouter();
  const [repo, setRepo] = useState<CiRepoKey>(() =>
    normalizeRepoKey(router.query.repo)
  );
  const [view, setView] = useState<CiView>('daily');
  const [day, setDay] = useState<string | null>(() =>
    lastDay(normalizeRepoKey(router.query.repo))
  );
  const [dim, setDim] = useState<DimSelection>(() => {
    const initialRepo = normalizeRepoKey(router.query.repo);
    return defaultDim(initialRepo, lastDay(initialRepo));
  });

  // 路由 query 变化时同步本地状态（前进/后退、外链带 repo 进入）
  useEffect(() => {
    setRepo(normalizeRepoKey(router.query.repo));
  }, [router.query.repo]);

  // 切换仓库：重置到该仓最后一天，并回落到该日默认维度
  useEffect(() => {
    const nextDay = lastDay(repo);
    setDay(nextDay);
    setDim(defaultDim(repo, nextDay));
  }, [repo]);

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
  const { days } = data;

  const currentDay =
    day && data.boards[day]
      ? day
      : days.length
      ? days[days.length - 1]
      : null;
  const board = currentDay ? data.boards[currentDay] : null;

  // 切换日期：联动重置维度为该日默认维度
  const handleSelectDay = useCallback(
    (nextDay: string) => {
      setDay(nextDay);
      setDim(defaultDim(repo, nextDay));
    },
    [repo]
  );

  const appendixIndex = view === 'daily' ? 4 : 10;

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)]">
      <div className="flex min-h-full flex-col gap-5 p-5">
        {/* 控制栏：组织 / 仓库 / Workflow */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="m-0 text-lg font-semibold text-slate-900">
              CI 体验诊断
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              数据驱动的双视图报告 · 只回答「本周谁该做哪件具体的事」
            </p>
          </div>
          <CiControls repo={repo} onRepoChange={handleRepoChange} data={data} />
        </div>

        {/* 报告概览 + 报告元数据 */}
        <CiReportOverview data={data} />

        {/* 数据声明 */}
        <CiBanner />

        {/* 日观测板 / 周复盘 切换 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CiViewToggle view={view} onChange={setView} />
          <span className="text-[11.5px] leading-relaxed text-slate-400">
            日观测板管「今天派活」，周复盘管「本周立项与回验」。
          </span>
        </div>

        {/* 视图内容 */}
        {view === 'daily' ? (
          board ? (
            <DailyView
              repo={repo}
              days={days}
              currentDay={currentDay as string}
              board={board}
              dim={dim}
              startIndex={1}
              onSelectDay={handleSelectDay}
              onSelectDim={setDim}
            />
          ) : (
            <SectionCard cardIndex={1} title="日观测板">
              <EmptyState>该仓库数据落库中，暂无日观测板内容。</EmptyState>
            </SectionCard>
          )
        ) : (
          <WeeklyView data={data} startIndex={1} />
        )}

        {/* 附录 */}
        <Appendix cardIndex={appendixIndex} />

        <footer className="px-1 py-2 text-[11.5px] leading-relaxed text-slate-400">
          Cogito · CI 体验诊断 · 2026W29（观察窗代周期）·
          本页不打总分，只回答「本周谁该做哪件具体的事」
        </footer>
      </div>
    </div>
  );
};

export default CiExperience;
