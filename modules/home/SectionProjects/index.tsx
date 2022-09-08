import React, { useEffect, useRef, useState } from 'react';
import { useInViewport, useToggle } from 'ahooks';
import { useOverviewQuery, OverviewQuery } from '@graphql/generated';
import client from '@graphql/client';
import Odometer from '@common/components/Odometer';

const Hotspots: React.FC<
  Pick<
    OverviewQuery['overview'],
    'projectsCount' | 'modelsCount' | 'dimensionsCount' | 'metricsCount'
  >
> = ({
  projectsCount = 0,
  modelsCount = 0,
  metricsCount = 0,
  dimensionsCount = 0,
}) => {
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);
  return (
    <div>
      <div className="mb-6 text-2xl font-bold">Hotspots</div>
      <div className="relative">
        <div className="absolute -right-1.5 -bottom-1.5 h-[139px] w-[496px] rounded border" />
        <div
          className="relative mb-6 flex h-[139px] w-[496px] flex-col justify-center rounded bg-black"
          ref={ref}
        >
          <h3 className="mb-6 text-center text-gray-100">Projects</h3>
          <div className="text-center text-4xl font-semibold italic text-white">
            <Odometer
              value={inViewport ? projectsCount! : 0}
              duration={500}
              format="d"
            />
          </div>
        </div>
      </div>
      <div className=" flex h-[139px] w-[496px] items-center justify-around rounded border">
        <div>
          <h3 className="mb-6">Dimensions</h3>
          <div className="text-center text-4xl italic">
            <Odometer
              value={dimensionsCount!}
              auto={inViewport}
              duration={500}
              format="d"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-6">Models</h3>
          <div className="text-center text-4xl italic">
            <Odometer
              value={modelsCount!}
              auto={inViewport}
              duration={500}
              format="d"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-6">Metrics</h3>
          <div className="text-center text-4xl italic">
            <Odometer
              value={metricsCount!}
              auto={inViewport}
              duration={500}
              format="d"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
  return (
    <div>
      <div className="mb-6 text-2xl font-bold">Hot Projects</div>
      <div className="flex h-[300px] w-[664px] flex-wrap rounded border-t border-l ">
        {trends?.map((repo) => {
          return (
            <div className="h-1/2 w-1/3 border-b border-r p-6" key={repo.path}>
              <h3 className="mb-5 text-sm text-gray-400">{repo.name}</h3>
              <p className="text-xl">{repo.stargazersCount}</p>
            </div>
          );
        })}

        {/*<div className="h-1/2 w-1/3 border-b border-r "></div>*/}
        {/*<div className="h-1/2 w-1/3 border-b border-r"></div>*/}
        {/*<div className="h-1/2 w-1/3 border-b border-r "></div>*/}
        {/*<div className="h-1/2 w-1/3 border-b border-r "></div>*/}
        {/*<div className="h-1/2 w-1/3 border-b border-r"></div>*/}
      </div>
    </div>
  );
};

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
