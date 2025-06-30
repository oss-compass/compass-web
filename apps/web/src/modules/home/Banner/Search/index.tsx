import React, { useEffect } from 'react';
import { AiOutlineLoading, AiOutlineSearch } from 'react-icons/ai';
import { Trans, useTranslation } from 'react-i18next';
import classnames from 'classnames';
import SearchDropdown from './SearchDropdown';
import { useSearch } from './hooks/useSearch';
import { getSearchContainerPositionClass, getTitleFontClass } from './utils';
import { SEARCH_BOX_CONFIG, STYLE_CLASSES } from './constants';
import { SearchProps } from './types';
import styles from '../index.module.scss';

/**
 * 搜索组件主体
 * @param props 搜索组件属性
 * @returns 搜索组件
 */
const Search: React.FC<SearchProps> = ({
  highlight = false,
  defaultSearchType,
}) => {
  const { t, i18n } = useTranslation();

  // 使用自定义搜索Hook
  const {
    keyword,
    isFocused,
    searchType,
    showLoading,
    searchResult,
    containerRef,
    inputRef,
    handleKeywordChange,
    handleFocus,
    handleSearchTypeChange,
    focusInput,
  } = useSearch(defaultSearchType);

  // 当highlight状态变化时自动聚焦输入框
  useEffect(() => {
    if (highlight) {
      // 延迟聚焦，确保DOM已更新
      setTimeout(() => {
        focusInput();
      }, 100);
    }
  }, [highlight, focusInput]);

  return (
    <div
      className={classnames(
        STYLE_CLASSES.SEARCH_CONTAINER_BASE,
        getSearchContainerPositionClass(i18n.language),
        styles.searchBg
      )}
    >
      {/* 主标题 */}
      <h1
        id="test"
        className={classnames(
          STYLE_CLASSES.TITLE_BASE,
          getTitleFontClass(i18n.language)
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

      {/* 副标题 */}
      <p className="mb-10 text-lg md:text-sm">
        {t('home:we_help_open_source_projects_gain_insight_into_its')}
      </p>

      {/* 搜索框容器 */}
      <div
        className="relative w-[496px] md:w-full"
        ref={containerRef}
        onFocus={handleFocus}
      >
        {/* 搜索输入框 */}
        <div className="flex items-center border-2 border-black px-4 md:px-2">
          <input
            ref={inputRef}
            value={keyword}
            type="text"
            className={STYLE_CLASSES.INPUT_BASE}
            placeholder={t('home:type_the_name_to_insight_into_your_project')}
            onChange={(event) => {
              handleKeywordChange(event.target.value);
            }}
            alt={t('home:type_the_name_to_insight_into_your_project')}
          />

          {/* 搜索图标/加载图标 */}
          <div className="h-8 w-8 cursor-pointer select-none pl-2">
            {showLoading ? (
              <AiOutlineLoading className="h-full w-full animate-spin" />
            ) : (
              <AiOutlineSearch className="h-full w-full" />
            )}
          </div>
        </div>

        {/* 搜索提示文本 */}
        <p className="mt-3 text-gray-500 md:text-sm">
          {t('home:please_enter_repository_name_or_community')}
        </p>

        {/* 搜索下拉框 */}
        {isFocused && (
          <div className={STYLE_CLASSES.DROPDOWN_BASE}>
            <div className="w-full">
              <SearchDropdown
                keyword={keyword}
                result={searchResult!}
                onTabChange={handleSearchTypeChange}
                activeTabKey={searchType}
                showLoading={showLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
