import React from 'react';
import dynamic from 'next/dynamic';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getLastPathSegment } from '@common/utils/url';
import classnames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { removeUrlValue } from '@modules/analyze/Misc/urlTool';

const DynamicAddInput = dynamic(() => import('./AddInput'), { ssr: false });

const CompareBar = () => {
  const router = useRouter();
  const { compareItems } = useCompareItems();
  return (
    <div className="mb-8 flex h-[100px] ">
      <div className="min-w-0 flex-1 rounded-tl-lg rounded-bl-lg bg-[#00B5EA]">
        <div className="flex h-full overflow-auto">
          {compareItems.map((item, index) => {
            return (
              <div
                key={item}
                className={classnames(
                  'group relative min-w-[150px] flex-1 border-r-2 border-r-white bg-[#3A5BEF] p-3 text-2xl text-white line-clamp-1',
                  { 'rounded-tl-lg rounded-bl-lg': index === 0 }
                )}
              >
                {compareItems.length > 1 && (
                  <div
                    className="absolute top-2 right-2 hidden cursor-pointer p-2 group-hover:block"
                    onClick={() => {
                      const p = removeUrlValue(item);
                      router.push(p);
                    }}
                  >
                    <AiOutlineClose className="text-base" />
                  </div>
                )}
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
