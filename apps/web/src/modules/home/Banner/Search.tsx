import React, { useState, useRef } from 'react';
import { AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai';
import { useThrottle } from 'ahooks';
import { useClickAway } from 'react-use';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import classnames from 'classnames';
import SearchDropdown from './SearchDropdown';

import styles from './index.module.scss';

const Search = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchType, setSearchType] = useState('2'); // 0: All, 1: Developer, 2: Repo
  const throttledKeyword = useThrottle(keyword, { wait: 300 });
  const { isLoading, data, fetchStatus } = useSearchQuery(
    client,
    { keyword: throttledKeyword, type: Number(searchType) },
    { enabled: Boolean(throttledKeyword) }
  );
  const showLoading = isLoading && fetchStatus === 'fetching';

  useClickAway(ref, () => {
    setKeyword('');
    setIsFocused(false);
  });

  return (
    <div
      className={classnames(
        'absolute -left-6 w-[600px] p-4',
        'md:w-[380px] lg:left-0',
        [
          i18n.language === 'en'
            ? 'bottom-9 md:bottom-6'
            : 'top-[51%] -translate-y-1/2',
        ],
        styles.searchBg
      )}
    >
      <h1
        id="test"
        className={classnames(
          'mb-6 text-[60px] leading-[80px] tracking-tight md:text-4xl',
          { 'font-black': i18n.language === 'zh' }
        )}
      >
        <Trans
          i18nKey="it_points_to_the_thing_you_want_most_in_open_source"
          ns="home"
          components={{
            br: <br />,
          }}
        />
      </h1>
      <p className="mb-10 text-lg md:text-sm">
        {t('home:we_help_open_source_projects_gain_insight_into_its')}
      </p>
      <div
        className="relative w-[496px] md:w-full"
        ref={ref}
        onFocus={() => setIsFocused(true)}
      >
        <div className="flex items-center border-2 border-black px-4 md:px-2">
          <input
            value={keyword}
            type="text"
            className={classnames(
              'h-[52px] w-full appearance-none bg-transparent text-lg outline-0 ',
              'md:h-[40px] md:text-sm'
            )}
            placeholder={t('home:type_the_name_to_insight_into_your_project')}
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
          {t('home:please_enter_repository_name_or_community')}
        </p>
        {isFocused && (
          <div
            className={classnames(
              'z-dropdown absolute left-0 right-0 top-[58px] border-2 border-black bg-white drop-shadow-xl',
              'md:top-[46px]'
            )}
          >
            <div className="w-full">
              <SearchDropdown
                keyword={keyword}
                result={data?.fuzzySearch!}
                onTabChange={setSearchType}
                activeTabKey={searchType}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
