import React from 'react';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getLastPathSegment } from '@common/utils/url';
import classnames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { removeSearchValue } from '@modules/analyze/Misc/urlTool';
import { Level } from '@modules/analyze/constant';
import AddInput from './AddInput';

const CloseIcons: React.FC<{ label: string; level: Level }> = ({
  label,
  level,
}) => {
  const router = useRouter();
  return (
    <div
      className="absolute top-2 right-2 hidden cursor-pointer p-2 group-hover:block"
      onClick={() => {
        const p = removeSearchValue(label);
        router.push(p);
      }}
    >
      <AiOutlineClose className="text-base" />
    </div>
  );
};

const CompareBar = () => {
  const { compareItems } = useCompareItems();
  return (
    <div className="mb-8 flex h-[100px] md:hidden">
      <div className="min-w-0 flex-1 rounded-tl-lg rounded-bl-lg bg-[#00B5EA]">
        <div className="overflow flex h-full">
          {compareItems.map((item, index) => {
            return (
              <div
                key={item.label}
                className={classnames(
                  'group relative min-w-[150px] flex-1 border-l-2 border-r-white bg-[#3A5BEF] p-3 text-2xl text-white line-clamp-1',
                  { 'rounded-tl-lg rounded-bl-lg !border-l-0': index === 0 }
                )}
              >
                {compareItems.length > 1 && <CloseIcons {...item} />}
                {getLastPathSegment(item.label)}
              </div>
            );
          })}
        </div>
      </div>
      <AddInput />
    </div>
  );
};

export default CompareBar;
