import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import RegionDistributionCard from './components/RegionDistributionCard';
import LeaderboardTableCard from './components/LeaderboardTableCard';
import type { RustOverviewResponse } from './types';

type RustDataset = 'global' | 'creatio';

const EXPORT_ALL_DATA_URL =
  'https://compute.lishengbao.com.cn/downloads/22-25年rust数据.xlsx';

const TAB_CONFIG: {
  key: RustDataset;
  label: string;
  title: string;
}[] = [
  {
    key: 'global',
    label: '全球',
    title: '2022-2025年全球 Rust 开源项目分析',
  },
  {
    key: 'creatio',
    label: 'CreatIO',
    title: '2022-2025年 CreatIO Rust 开源项目分析',
  },
];

const RustPage: React.FC = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [activeDataset, setActiveDataset] = useState<RustDataset>('global');

  const activeTab = TAB_CONFIG.find((t) => t.key === activeDataset)!;

  const { data, isFetching } = useQuery<RustOverviewResponse>({
    queryKey: ['intelligent-analysis', 'rust', 'overview', activeDataset],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeDataset !== 'global') {
        params.set('dataset', activeDataset);
      }
      const qs = params.toString();
      const response = await fetch(
        `/api/intelligent-analysis/rust/overview${qs ? `?${qs}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Failed to load Rust overview');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleTabChange = (key: RustDataset) => {
    setActiveDataset(key);
    setSelectedRegions([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 顶部 Tab 切换 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-fit items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={[
                'rounded-md px-5 py-1.5 text-sm font-medium transition-all',
                activeDataset === tab.key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <a
          href={EXPORT_ALL_DATA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          导出全部数据
        </a>
      </div>

      <h1 className="text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
        {activeTab.title}
      </h1>

      <div className="mt-6">
        <RegionDistributionCard
          data={data}
          loading={isFetching}
          selectedRegions={selectedRegions}
          onRegionFilterChange={setSelectedRegions}
        />
      </div>

      <section className="mt-8 pb-10">
        <div className="space-y-5">
          <LeaderboardTableCard
            type="developers"
            title="开发者数量排行榜"
            selectedRegions={selectedRegions}
            dataset={activeDataset}
          />
          <LeaderboardTableCard
            type="organizations"
            title="开发者组织排行榜"
            selectedRegions={selectedRegions}
            dataset={activeDataset}
          />
          <LeaderboardTableCard
            type="projects"
            title="项目数量排行榜"
            selectedRegions={selectedRegions}
            dataset={activeDataset}
          />
        </div>
      </section>
    </div>
  );
};

export default RustPage;
