import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import SearchDropdown from './SearchDropdown';
import { useThrottle } from 'ahooks';
import { useClickAway } from 'react-use';
import gsap from 'gsap';
import { SearchQuery, useSearchQuery } from '@graphql/generated';
import client from '@graphql/client';
import { AiOutlineLoading, AiOutlinePlus } from 'react-icons/ai';
import { Level } from '@modules/analyze/constant';

const AddInput = () => {
  const search = window.location.search;
  const ref = useRef(null);
  const router = useRouter();
  const isRepoCompare = router.query.hasOwnProperty('repo');
  const q = gsap.utils.selector(ref);

  const [confirmItem, setConfirmItem] = useState<
    SearchQuery['fuzzySearch'][number] | null
  >(null);

  const [keyword, setKeyword] = useState('');

  const throttledKeyword = useThrottle(keyword, { wait: 300 });
  const { isLoading, data, fetchStatus } = useSearchQuery(
    client,
    {
      keyword: throttledKeyword,
      level: isRepoCompare ? Level.REPO : Level.PROJECT,
    },
    { enabled: Boolean(throttledKeyword) }
  );
  const showLoading = isLoading && fetchStatus === 'fetching';

  useEffect(() => {
    setKeyword('');
  }, [search]);

  const resetInput = () => {
    setKeyword('');
    setConfirmItem(null);

    gsap.to(q('#search-input'), { display: 'none', left: 30, duration: 0 });
    gsap.to(q('#add-compare-btn'), { display: 'flex', duration: 0 });
    gsap.to(ref.current, {
      width: 96,
      duration: 0.2,
    });
  };

  useClickAway(ref, () => {
    resetInput();
  });

  return (
    <div
      ref={ref}
      className="ml-0.5 w-24 flex-shrink-0 cursor-pointer rounded-tr-lg rounded-br-lg bg-[#00B5EA] text-white"
    >
      <div
        id="search-input"
        className=" relative left-[30px] flex hidden h-full w-full items-center justify-center"
      >
        <div className="relative">
          <div className="flex items-center rounded  border ">
            <input
              value={confirmItem?.label || keyword}
              type="text"
              className="w-55 h-10 bg-transparent px-2 py-1 text-white outline-0 placeholder:text-white/60"
              placeholder={`search ${
                isRepoCompare ? Level.REPO : Level.PROJECT
              }`}
              onChange={(v) => {
                setKeyword(v.target.value);
                setConfirmItem(null);
              }}
            />
            <button
              className="flex h-10 w-24 items-center justify-center bg-white text-[#00B5EA] hover:bg-gray-100"
              onClick={async () => {
                if (confirmItem) {
                  const { label, level } = confirmItem;
                  await router.push(
                    `${router.pathname}${search}&${level}=${encodeURIComponent(
                      label!
                    )}`
                  );
                  resetInput();
                }
              }}
            >
              {showLoading ? (
                <AiOutlineLoading className="mr-1 animate-spin" />
              ) : null}
              compare
            </button>
          </div>
          {!confirmItem && throttledKeyword && (
            <div className="border-1 absolute left-0 right-0 top-[44px] z-[100] rounded  bg-white drop-shadow">
              <div className="w-full">
                <SearchDropdown
                  result={data?.fuzzySearch!}
                  onConfirm={(item) => {
                    setConfirmItem(item);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id="add-compare-btn"
        className="flex h-full w-full flex-col items-center justify-center"
        onClick={() => {
          const tl = gsap.timeline();
          tl.to(q('#add-compare-btn'), { display: 'none', duration: 0 });
          tl.to(ref.current, {
            width: 350,
            duration: 0.15,
          });
          tl.to(q('#search-input'), { display: 'flex', duration: 0 });
          tl.to(q('#search-input'), { left: 0, duration: 0.15 });
        }}
      >
        <AiOutlinePlus className="text-2xl" />
        <div>compare</div>
      </div>
    </div>
  );
};

export default AddInput;
