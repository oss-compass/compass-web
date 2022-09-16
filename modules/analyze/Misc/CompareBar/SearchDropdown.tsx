import React, { useState } from 'react';
import classnames from 'classnames';
import Empty from '@common/components/Empty';
import useDropDown from '@common/hooks/useDropDown';
import { SearchQuery } from '@graphql/generated';

const DropDownList: React.FC<{
  result: SearchQuery['fuzzySearch'];
  onConfirm: (item: SearchQuery['fuzzySearch'][number]) => void;
}> = ({ result, onConfirm }) => {
  const { active } = useDropDown({
    totalLength: result.length,
    onPressEnter: () => {
      const cp = result[active];
      onConfirm(cp);
    },
  });

  return (
    <>
      {result.map((item, index) => {
        return (
          <div
            key={item.label}
            onClick={() => {
              onConfirm(item);
            }}
          >
            <a
              className={classnames(
                { 'bg-gray-100': active === index },
                'my-1 py-1 px-4 text-base text-black line-clamp-1'
              )}
            >
              {item.label}
            </a>
          </div>
        );
      })}
    </>
  );
};

const SearchDropdown: React.FC<{
  result: SearchQuery['fuzzySearch'];
  onConfirm: (item: SearchQuery['fuzzySearch'][number]) => void;
}> = ({ result, onConfirm }) => {
  if (!result) return <Empty type="DropDownItem" />;
  if (Array.isArray(result) && result.length === 0) {
    return <Empty type="DropDownItem" />;
  }

  return <DropDownList result={result!} onConfirm={onConfirm} />;
};

export default SearchDropdown;
