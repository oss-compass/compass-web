import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import SearchDropdown from './SearchDropdown';
import { useThrottle } from 'ahooks';
import { useClickAway } from 'react-use';
import gsap from 'gsap';
import { SearchQuery, useSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { AiOutlineLoading, AiOutlinePlus } from 'react-icons/ai';
import { Level } from '@modules/analyze/constant';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { removeHttps } from '@common/utils';
import { compareIdsAdd } from '@common/utils/links';
import { getRouteAsPath } from '@common/utils/url';

const checkLevel = (shortId: string) => {
  if (shortId.startsWith('s')) {
    return Level.REPO;
  }
  if (shortId.startsWith('c')) {
    return Level.REPO;
  }
  return Level.REPO;
};

const AddInput = () => {
  const { t } = useTranslation();
  const search = window.location.search;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { compareItems, compareSlugs } = useCompareItems();
  const firstItem = compareItems[0];
  const level = firstItem.level;

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
      level,
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

  const placeholder = React.useMemo(() => {
    if (level === Level.REPO) {
      return t('analyze:search_repo_input_placeholder');
    }
    if (level === Level.COMMUNITY) {
      return t('analyze:search_community_input_placeholder');
    }
    return 'search';
  }, [level, t]);

  return (
    <div
      ref={ref}
      className="ml-0.5 w-24 flex-shrink-0 cursor-pointer rounded-tr-lg rounded-br-lg bg-[#00B5EA] text-white"
    >
      <div
        id="search-input"
        className="relative left-[60px] flex hidden h-full w-full items-center justify-center"
      >
        <div className="relative">
          <div className="flex items-center rounded  border ">
            <input
              ref={inputRef}
              value={removeHttps(confirmItem?.label!) || keyword}
              type="text"
              className="h-10 w-[300px] bg-transparent px-2 py-1 text-white outline-0 placeholder:text-white/60"
              placeholder={placeholder}
              onChange={(v) => {
                setKeyword(v.target.value);
                setConfirmItem(null);
              }}
            />
            <button
              className="flex h-10 w-24 items-center justify-center bg-white text-[#00B5EA] hover:bg-gray-100"
              onClick={async () => {
                if (confirmItem) {
                  const { shortCode } = confirmItem;
                  const slug = compareIdsAdd(compareSlugs, shortCode!);
                  await router.push(
                    getRouteAsPath(router.route, { slugs: slug })
                  );
                  resetInput();
                }
              }}
            >
              {showLoading ? (
                <AiOutlineLoading className="mr-1 animate-spin" />
              ) : null}
              {t('analyze:compare')}
            </button>
          </div>
          {!confirmItem && throttledKeyword && (
            <div className="border-1 z-dropdown absolute left-0 right-0 top-[44px] rounded  bg-white drop-shadow">
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
            width: 450,
            duration: 0.15,
          });
          tl.to(q('#search-input'), { display: 'flex', duration: 0 });
          tl.to(q('#search-input'), { left: 0, duration: 0.15 });

          tl.eventCallback('onComplete', () => {
            inputRef.current?.focus();
          });
        }}
      >
        <AiOutlinePlus className="text-2xl" />
        <div>{t('analyze:compare')}</div>
      </div>
    </div>
  );
};

export default AddInput;
