import React, { useEffect, useRef, useState } from 'react';
import { useInViewport, useToggle } from 'ahooks';
import { useOverviewQuery, OverviewQuery } from '@graphql/generated';
import client from '@graphql/client';
import Hotspots from './Hotspots';
import HotProjects from './HotProjects';

const SectionProjects = () => {
  const { data, isLoading } = useOverviewQuery(client);
  const { projectsCount, metricsCount, dimensionsCount, modelsCount, trends } =
    data?.overview || {};

  return (
    <section className="relative mx-auto flex w-[1200px] justify-between pt-[40px] pb-[120px]">
      <Hotspots
        projectsCount={projectsCount}
        metricsCount={metricsCount}
        dimensionsCount={dimensionsCount}
        modelsCount={modelsCount}
      />
      <HotProjects trends={trends} />
    </section>
  );
};

export default SectionProjects;
