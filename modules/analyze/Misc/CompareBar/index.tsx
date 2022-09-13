import React from 'react';
import dynamic from 'next/dynamic';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getLastPathSegment } from '@common/utils/url';
import classnames from 'classnames';

const DynamicAddInput = dynamic(() => import('./AddInput'), { ssr: false });

const CompareBar = () => {
  const { compareItems } = useCompareItems();
  console.log(compareItems);
  return (
    <div className="mb-8 flex h-[100px] ">
      <div className="min-w-0 flex-1 rounded-tl-lg rounded-bl-lg bg-[#00B5EA]">
        <div className="flex h-full overflow-auto">
          {compareItems.map((item, index) => {
            return (
              <div
                key={item}
                className={classnames(
                  'min-w-[150px] max-w-xs border-r-2 border-r-white bg-[#3A5BEF] p-3 text-2xl text-white line-clamp-1',
                  { 'rounded-tl-lg rounded-bl-lg': index === 0 }
                )}
              >
                {getLastPathSegment(item)}
              </div>
            );
          })}
        </div>
      </div>
      <DynamicAddInput />
    </div>
  );
};

export default CompareBar;
