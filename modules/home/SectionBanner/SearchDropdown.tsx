import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Empty from '@common/components/Empty';
import useDropDown from '@common/hooks/useDropDown';
import { SearchQuery } from '@graphql/generated';

const DropDownList: React.FC<{ result: SearchQuery['fuzzySearch'] }> = ({
  result,
}) => {
  const router = useRouter();
  const { active } = useDropDown({
    totalLength: result.length,
    onPressEnter: () => {
      const activeItem = result[active];
      router.push(
        `/analyze?${activeItem.level}=${encodeURIComponent(activeItem.label!)}`
      );
    },
  });

  return (
    <>
      {result.map((item, index) => {
        return (
          <Link
            href={`/analyze?${item.level}=${encodeURIComponent(item.label!)}`}
            key={item.label}
          >
            <a
              className={classnames(
                { 'bg-gray-100': active === index },
                'block px-4 py-3 text-xl hover:bg-gray-100'
              )}
            >
              <span className="mr-2 rounded bg-gray-200 p-1 text-base leading-none text-gray-400">
                {item.level}
              </span>
              {item.label}
            </a>
          </Link>
        );
      })}
    </>
  );
};

const SearchDropdown: React.FC<{
  result: SearchQuery['fuzzySearch'];
}> = ({ result }) => {
  if (!result) return <Empty type="DropDownItem" />;
  if (Array.isArray(result) && result.length === 0) {
    return <Empty type="DropDownItem" />;
  }

  return <DropDownList result={result!} />;
};

export default SearchDropdown;
