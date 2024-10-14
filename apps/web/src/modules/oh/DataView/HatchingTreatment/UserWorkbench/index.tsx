import React, { useState } from 'react';
import HeadBoxApply from './HeadBoxApply';
import HeadBoxApprove from './HeadBoxApprove';
import WorkbenchTable from './WorkbenchTable';
import OhRole from '@modules/oh/components/OhRole';

const Main = () => {
  const [active, setActive] = useState('apply');
  return (
    <OhRole>
      <div className="flex flex-1 bg-[#f2f2f2]">
        <div className="relative flex h-[calc(100vh-170px)] w-full flex-1 flex-col border bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
          <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
            流程进展
          </div>
          <div className="relative h-[calc(100%-60px)] overflow-auto">
            <div className="flex justify-center gap-4 p-4">
              <HeadBoxApply
                active={active === 'apply'}
                onClickFun={() => setActive('apply')}
              />
              <HeadBoxApprove
                active={active === 'approve'}
                onClickFun={() => setActive('approve')}
              />
              {/* <div className="h-48 w-[435px] rounded bg-[#f5fdf0]"></div> */}
            </div>
            <WorkbenchTable active={active} />
          </div>
        </div>
      </div>
    </OhRole>
  );
};

export default Main;
