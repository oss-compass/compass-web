import React, { useEffect, useRef, useState } from 'react';
import { useOverviewQuery, OverviewQuery } from '@graphql/generated';
import client from '@graphql/client';
import Hotspots from './Hotspots';
import HotProjects from './HotProjects';
import classnames from 'classnames';

const SectionProjects = () => {
  const { data, isLoading } = useOverviewQuery(client);
  const { projectsCount, metricsCount, dimensionsCount, modelsCount, trends } =
    data?.overview || {};

  return (
    <section
      className={classnames(
        'relative mx-auto flex w-[1200px] justify-between pt-[40px] pb-[120px]',
        'lg:w-full lg:flex-col'
      )}
    >
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
