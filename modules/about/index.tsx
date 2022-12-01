import React from 'react';
import Banner from './Banner';
import Introduce from './Introduce';
import Board from './Board';
import Members from './Members';
import Contributors from './Contributors';

const Index = () => {
  return (
    <>
      <Banner />
      <div className="bg-black py-20 text-white/90">
        <div className="mx-auto  w-[1000px] md:w-full md:px-4">
          <Introduce />
          <Board />
          <Members />
          <Contributors />
        </div>
      </div>
    </>
  );
};

export default Index;
