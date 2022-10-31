import React, { useState } from 'react';
import { AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai';
import { useThrottle } from 'ahooks';
import { useSearchQuery } from '@graphql/generated';
import client from '@graphql/client';
import classnames from 'classnames';
import SearchDropdown from './SearchDropdown';

import styles from './index.module.scss';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const throttledKeyword = useThrottle(keyword, { wait: 300 });
  const { isLoading, data, fetchStatus } = useSearchQuery(
    client,
    { keyword: throttledKeyword },
    { enabled: Boolean(throttledKeyword) }
  );
  const showLoading = isLoading && fetchStatus === 'fetching';

  return (
    <div
      className={classnames(
        'absolute bottom-9 -left-[24px] w-[600px] p-6',
        'md:bottom-6 md:left-0 md:w-[380px]',
        styles.searchBg
      )}
    >
      <h1
        id="test"
        className="mb-6 text-[64px] leading-[80px] tracking-tight md:text-4xl"
      >
        It points to the thing
        <br />
        you want most in
        <br />
        open source world
      </h1>
      <p className="mb-10 text-lg md:text-sm">
        We help open source projects gain insight into its trends, and getting
        more value of it.
      </p>
      <div className="relative w-[496px] md:w-full">
        <div className="flex items-center border-2 border-black px-4 md:px-2">
          <input
            value={keyword}
            type="text"
            className={classnames(
              'h-[52px] w-full appearance-none bg-transparent text-xl outline-0 ',
              'md:h-[40px] md:text-sm'
            )}
            placeholder="Type the name to insight into your project"
            onChange={(event) => {
              const val = event.target.value;
              setKeyword(val);
            }}
            alt={'Type the name to insight into your project'}
          />
          <div className="h-8 w-8 cursor-pointer select-none pl-2">
            {showLoading ? (
              <AiOutlineLoading className="h-full w-full animate-spin" />
            ) : (
              <AiOutlineSearch className="h-full w-full" />
            )}
          </div>
        </div>
        <p className="mt-3 text-gray-500 md:text-sm">
          Please enter GitHub/Gitee repository name or community name
        </p>
        {throttledKeyword && (
          <div
            className={classnames(
              'absolute left-0 right-0 top-[58px] z-dropdown border-2 border-black bg-white drop-shadow',
              'md:top-[46px]'
            )}
          >
            <div className="w-full">
              <SearchDropdown result={data?.fuzzySearch!} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
