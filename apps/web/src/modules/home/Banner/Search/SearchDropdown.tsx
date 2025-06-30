import React from 'react';
import classnames from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import { SearchDropdownProps, TabItem } from './types';
import { SEARCH_TYPES } from './constants';
import { formatKeywordDisplay, isEmptySearchResult } from './utils';
import {
  Tabs,
  DropDownList,
  DropDownListDeveloper,
  SubmitYourProject,
} from './components';

/**
 * 搜索下拉组件主体
 * @param result 搜索结果
 * @param keyword 搜索关键词
 * @param onTabChange 标签页切换回调
 * @param activeTabKey 当前激活的标签页
 * @returns 搜索下拉组件
 */
const SearchDropdown: React.FC<SearchDropdownProps> = ({
  result,
  keyword,
  onTabChange,
  activeTabKey,
  showLoading = false,
}) => {
  const { t } = useTranslation();

  // 标签页配置
  const tabItems: TabItem[] = [
    {
      key: SEARCH_TYPES.REPOSITORY,
      label: t('home:repo_community'),
    },
    {
      key: SEARCH_TYPES.DEVELOPER,
      label: t('home:developer'),
    },
  ];

  /**
   * 渲染搜索内容
   * @returns 内容组件
   */
  const renderContent = () => {
    // 空关键词状态
    if (keyword === '') {
      return (
        <p
          className={classnames(
            'flex items-center justify-between pl-4 pr-2.5 text-lg text-gray-500',
            'min-h-[84px] md:px-2 md:text-sm'
          )}
        >
          <span className="flex-wrap text-base leading-none">
            {t('home:no_matching_results')}
          </span>
        </p>
      );
    }

    // 加载状态
    if (showLoading) {
      return (
        <p
          className={classnames(
            'flex items-center justify-center pl-4 pr-2.5 text-lg text-gray-500',
            'min-h-[84px] md:px-2 md:text-sm'
          )}
        >
          <span className="flex-wrap text-base leading-none">
            {t('common:loading')}...
          </span>
        </p>
      );
    }

    // 无搜索结果状态
    if (isEmptySearchResult(result)) {
      return (
        <SubmitYourProject
          noResult
          hidden={activeTabKey === SEARCH_TYPES.DEVELOPER}
          content={
            <Trans
              i18nKey="nothing_about_yet"
              ns="home"
              values={{
                expr: formatKeywordDisplay(keyword),
              }}
              components={{
                s: <span className="mx-2 font-semibold italic" />,
              }}
            />
          }
        />
      );
    }

    // 有搜索结果状态
    if (activeTabKey === SEARCH_TYPES.DEVELOPER) {
      return <DropDownListDeveloper result={result!} />;
    } else {
      return <DropDownList result={result!} />;
    }
  };

  return (
    <>
      {/* 标签页 */}
      <div>
        <Tabs
          items={tabItems}
          onTabChange={onTabChange}
          activeTabKey={activeTabKey}
        />
      </div>

      {/* 搜索内容 */}
      {renderContent()}
    </>
  );
};
export default SearchDropdown;
