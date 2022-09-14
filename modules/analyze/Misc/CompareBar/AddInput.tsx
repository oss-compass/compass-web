import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchDropdown from './SearchDropdown';
import { useThrottle, useDebounce } from 'ahooks';
import { useSearchQuery } from '@graphql/generated';
import client from '@graphql/client';
import { AiOutlineLoading, AiOutlinePlus } from 'react-icons/ai';
import classnames from 'classnames';

const AddInput = () => {
  const search = window.location.search;
  const router = useRouter();
  const [confirmVal, setConfirmVal] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showInput, setShowInput] = useState(false);

  const throttledKeyword = useThrottle(keyword, { wait: 300 });
  const { isLoading, data, fetchStatus } = useSearchQuery(
    client,
    { keyword: throttledKeyword },
    { enabled: Boolean(throttledKeyword) }
  );
  const showLoading = isLoading && fetchStatus === 'fetching';

  useEffect(() => {
    setKeyword('');
  }, [search]);

  return (
    <div
      className={classnames(
        ' ml-0.5 w-24 flex-shrink-0 cursor-pointer rounded-tr-lg rounded-br-lg  bg-[#00B5EA] text-white transition-all hover:w-[350px]'
      )}
      onMouseEnter={() => {
        setShowInput(true);
      }}
      onMouseLeave={() => {
        setShowInput(false);
      }}
    >
      {showInput ? (
        <div className="flex h-full w-full items-center justify-center ">
          <div className="relative">
            <div className="flex items-center rounded  border ">
              <input
                value={confirmVal || keyword}
                type="text"
                className="h-10 w-36 bg-transparent px-2 py-1 text-white outline-0 placeholder:text-neutral-300"
                placeholder="Pick a project"
                onChange={(v) => {
                  setKeyword(v.target.value);
                  setConfirmVal('');
                }}
              />
              <button
                className="flex h-10 w-24 items-center justify-center bg-white text-[#00B5EA] hover:bg-gray-100"
                onClick={async () => {
                  if (confirmVal) {
                    setKeyword('');
                    setConfirmVal('');
                    await router.push(
                      `${router.pathname}${search}&url=${encodeURIComponent(
                        confirmVal
                      )}`
                    );
                  }
                }}
              >
                {showLoading ? (
                  <AiOutlineLoading className="mr-1 animate-spin" />
                ) : null}
                compare
              </button>
            </div>
            {!confirmVal && throttledKeyword && (
              <div className="border-1 absolute left-0 right-0 top-[44px] z-[100] rounded  bg-white drop-shadow">
                <div className="w-full">
                  <SearchDropdown
                    result={data?.fuzzySearch}
                    onConfirm={(url) => {
                      setConfirmVal(url);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className=" flex h-full w-full flex-col items-center justify-center">
          <AiOutlinePlus className="text-2xl" />
          <div>compare</div>
        </div>
      )}
    </div>
  );
};

export default AddInput;
