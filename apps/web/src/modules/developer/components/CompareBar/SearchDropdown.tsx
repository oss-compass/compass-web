import React, { useState } from 'react';
import classnames from 'classnames';
import Empty from '@common/components/Empty';
import useDropDown from '@common/hooks/useDropDown';
import { SearchQuery } from '@oss-compass/graphql';
import { removeHttps } from '@common/utils';
import CollectionTag from '@common/components/CollectionTag';

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
            className="flex w-max"
          >
            <a
              className={classnames(
                { 'bg-gray-100': active === index },
                'line-clamp-1 my-1 flex-shrink-0 whitespace-nowrap py-1 px-4 text-base text-black hover:bg-gray-100'
              )}
            >
              {removeHttps(item.label!)}
            </a>
            <CollectionTag
              className={'mx-2 flex-shrink-0'}
              collections={item.collections}
            />
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
