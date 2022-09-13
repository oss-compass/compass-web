import React, { useState } from 'react';
import classnames from 'classnames';
import Empty from '@common/components/Empty';
import useDropDown from '@common/hooks/useDropDown';

const DropDownList: React.FC<{
  result: string[];
  onConfirm: (url: string) => void;
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
      {result.map((url, index) => {
        return (
          <div
            key={url}
            onClick={() => {
              onConfirm(url);
            }}
          >
            <a
              className={classnames(
                { 'bg-gray-100': active === index },
                'my-1 py-1 px-4 text-base text-black line-clamp-1'
              )}
            >
              {url}
            </a>
          </div>
        );
      })}
    </>
  );
};

const SearchDropdown: React.FC<{
  result: string[] | undefined;
  onConfirm: (url: string) => void;
}> = ({ result, onConfirm }) => {
  if (!result) return <Empty type="DropDownItem" />;
  if (Array.isArray(result) && result.length === 0) {
    return <Empty type="DropDownItem" />;
  }

  return <DropDownList result={result!} onConfirm={onConfirm} />;
};

export default SearchDropdown;
