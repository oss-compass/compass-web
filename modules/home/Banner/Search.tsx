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
        'absolute top-60 w-[500px] p-6',
        'md:top-auto md:bottom-6 md:w-[300px]',
        styles.searchBg
      )}
    >
      <h1 id="test" className="mb-4 text-7xl md:text-4xl">
        Know more
        <br />
        your projects
        <br />
        way forward
      </h1>
      <p className="mb-8 text-lg md:text-sm">
        We help open source projects gain insight into its trends, and getting
        more value of it.
      </p>
      <div className="relative">
        <div className="flex items-center border-2 border-black px-4">
          <input
            value={keyword}
            type="text"
            className={classnames(
              'h-[70px]  w-full appearance-none bg-transparent text-xl outline-0',
              'md:h-[40px]'
            )}
            placeholder="eg: vscode"
            // placeholder="Type the name to insight into your project"
            onChange={(event) => {
              const val = event.target.value;
              setKeyword(val);
            }}
          />
          <div className="h-8 w-8 cursor-pointer select-none pl-2">
            {showLoading ? (
              <AiOutlineLoading className="h-full w-full animate-spin" />
            ) : (
              <AiOutlineSearch className="h-full w-full" />
            )}
          </div>
        </div>
        {throttledKeyword && (
          <div
            className={classnames(
              'absolute left-0 right-0 top-[76px] z-dropdown border-2 border-black bg-white drop-shadow',
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
