import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Empty from '@common/components/Empty';
import useDropDown from '@common/hooks/useDropDown';

const DropDownList: React.FC<{ result: string[] }> = ({ result }) => {
  const router = useRouter();
  const { active } = useDropDown({
    totalLength: result.length,
    onPressEnter: () => {
      router.push(`/analyze?url=${encodeURIComponent(result[active])}`);
    },
  });

  return (
    <>
      {result.map((url, index) => {
        return (
          <Link href={`/analyze?url=${encodeURIComponent(url)}`} key={url}>
            <a
              className={classnames(
                { 'bg-gray-100': active === index },
                'block px-4 py-3 text-xl hover:bg-gray-100'
              )}
            >
              {url}
            </a>
          </Link>
        );
      })}
    </>
  );
};

const SearchDropdown: React.FC<{
  result: string[] | undefined;
}> = ({ result }) => {
  if (!result) return <Empty type="DropDownItem" />;
  if (Array.isArray(result) && result.length === 0) {
    return <Empty type="DropDownItem" />;
  }

  return <DropDownList result={result!} />;
};

export default SearchDropdown;
