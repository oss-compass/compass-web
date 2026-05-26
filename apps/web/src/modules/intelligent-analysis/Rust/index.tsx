import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import RegionDistributionCard from './components/RegionDistributionCard';
import LeaderboardTableCard from './components/LeaderboardTableCard';
import type { RustOverviewResponse } from './types';

const RustPage: React.FC = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const { data, isFetching } = useQuery<RustOverviewResponse>({
    queryKey: ['intelligent-analysis', 'rust', 'overview'],
    queryFn: async () => {
      const response = await fetch('/api/intelligent-analysis/rust/overview');
      if (!response.ok) {
        throw new Error('Failed to load Rust overview');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
        2022-2025年全球Rust开源项目分析
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
            title="开发者排行榜"
            selectedRegions={selectedRegions}
          />
          <LeaderboardTableCard
            type="organizations"
            title="开发者组织排行榜"
            selectedRegions={selectedRegions}
          />
          <LeaderboardTableCard
            type="projects"
            title="项目排行榜"
            selectedRegions={selectedRegions}
          />
        </div>
      </section>
    </div>
  );
};

export default RustPage;
