import React from 'react';
import { useOverviewQuery } from '@graphql/generated';
import client from '@graphql/client';

const Hotspots = () => {
  return (
    <div>
      <div className="mb-6 text-2xl font-bold">Hotspots</div>
      <div className="mb-6 flex h-[139px] w-[496px] flex-col justify-center rounded bg-black">
        <p className="text-center text-white">Projects</p>
        <p className="text-center text-4xl font-semibold italic text-white">
          2,001
        </p>
      </div>
      <div className=" flex h-[139px] w-[496px] items-center justify-around rounded border">
        <div>
          <div>Dimensions</div>
          <div className="text-center">3</div>
        </div>
        <div>
          <div>Models</div>
          <div className="text-center">3</div>
        </div>
        <div>
          <div>Metrics</div>
          <div className="text-center">3</div>
        </div>
      </div>
    </div>
  );
};

const HotProjects = () => {
  return (
    <div>
      <div className="mb-6 text-2xl font-bold">Hot Projects</div>
      <div className="flex h-[300px] w-[664px] flex-wrap rounded border-t border-l ">
        <div className="h-1/2 w-1/3 border-b border-r "></div>
        <div className="h-1/2 w-1/3 border-b border-r "></div>
        <div className="h-1/2 w-1/3 border-b border-r"></div>
        <div className="h-1/2 w-1/3 border-b border-r "></div>
        <div className="h-1/2 w-1/3 border-b border-r "></div>
        <div className="h-1/2 w-1/3 border-b border-r"></div>
      </div>
    </div>
  );
};

const SectionProjects = () => {
  const { data, isLoading } = useOverviewQuery(client);
  return (
    <section className="relative mx-auto flex w-[1200px] justify-between pt-[40px] pb-[120px]">
      <Hotspots />
      <HotProjects />
    </section>
  );
};

export default SectionProjects;
