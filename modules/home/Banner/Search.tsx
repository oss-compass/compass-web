import React, { useState } from 'react';
import { AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai';
import { useThrottle } from 'ahooks';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchQuery } from '@graphql/generated';
import client from '@graphql/client';
import classnames from 'classnames';
import SearchDropdown from './SearchDropdown';

import styles from './index.module.scss';

const Search = () => {
  const { t } = useTranslation();
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
      <div className="relative w-[496px] md:w-full">
        <div className="flex items-center border-2 border-black px-4 md:px-2">
          <input
            value={keyword}
            type="text"
            className={classnames(
              'h-[52px] w-full appearance-none bg-transparent text-xl outline-0 ',
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
        {throttledKeyword && (
          <div
            className={classnames(
              'absolute left-0 right-0 top-[58px] z-dropdown border-2 border-black bg-white drop-shadow-xl',
              'md:top-[46px]'
            )}
          >
            <div className="w-full">
              <SearchDropdown keyword={keyword} result={data?.fuzzySearch!} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
