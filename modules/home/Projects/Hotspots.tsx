import React from 'react';
import { OverviewQuery } from '@graphql/generated';
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
  return (
    <div className="lg:px-4  lg:pb-10">
      <div className="mb-6 text-2xl font-bold">Hotspots</div>
      <div className="relative mb-6 flex h-[139px] w-[496px] flex-col justify-center rounded bg-black lg:w-full">
        <h3 className="mb-6 text-center text-gray-100">Projects</h3>
        <div className="text-center text-4xl font-semibold italic text-white">
          <Odometer value={projectsCount!} duration={500} format="d" />
        </div>
        <div className="absolute -right-1.5 -bottom-1.5 -z-10 h-[139px] w-[496px] rounded border lg:w-full" />
      </div>
      <div className=" flex h-[138px] w-[496px] items-center justify-around rounded border lg:w-full">
        <div>
          <h3 className="mb-6">Dimensions</h3>
          <div className="text-center text-4xl italic">
            <Odometer value={dimensionsCount!} duration={500} format="d" />
          </div>
        </div>
        <div>
          <h3 className="mb-6">Models</h3>
          <div className="text-center text-4xl italic">
            <Odometer value={modelsCount!} duration={500} format="d" />
          </div>
        </div>
        <div>
          <h3 className="mb-6">Metrics</h3>
          <div className="text-center text-4xl italic">
            <Odometer value={metricsCount!} duration={500} format="d" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspots;
