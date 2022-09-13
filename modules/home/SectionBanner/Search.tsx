import React, { useState } from 'react';
import { AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai';
import { useThrottle } from 'ahooks';
import { useSearchQuery } from '@graphql/generated';
import client from '@graphql/client';
import SearchDropdown from './SearchDropdown';

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
    <div className="absolute bottom-16 w-[500px] bg-white p-4">
      <h1 id="test" className="mb-4 text-7xl">
        Know more
        <br />
        your projects
        <br />
        way forward
      </h1>
      <p className="mb-8 break-words text-lg">
        We help open source projects gain insight into its trends, and getting
        more value of it.
      </p>
      <div className="relative">
        <div className="flex items-center border-2 border-black px-4">
          <input
            value={keyword}
            type="text"
            className="h-[70px]  w-full  text-xl outline-0"
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
          <div className="absolute left-0 right-0 top-[76px] z-[100] border-2 border-black bg-white drop-shadow">
            <div className="w-full">
              <SearchDropdown result={data?.fuzzySearch} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
