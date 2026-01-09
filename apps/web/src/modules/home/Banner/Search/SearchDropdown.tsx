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
  LinkItem,
  DeveloperItem,
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
      key: SEARCH_TYPES.ALL,
      label: t('home:all'),
    },
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
          hidden={
            activeTabKey === SEARCH_TYPES.DEVELOPER ||
            activeTabKey === SEARCH_TYPES.ALL
          }
          content={
            <Trans
              i18nKey={'nothing_about_yet' as any}
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
    if (activeTabKey === SEARCH_TYPES.ALL) {
      // ALL tab: 混合展示仓库和开发者，按类型分组
      const repoItems = result!.filter((item) => item.type !== 'developer');
      const developerItems = result!.filter(
        (item) => item.type === 'developer'
      );

      return (
        <>
          {/* 仓库/社区分组 */}
          {repoItems.length > 0 && (
            <>
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">
                {t('home:repo_community')}
              </div>
              {repoItems.map((item, index) => (
                <LinkItem
                  key={`repo-${item.label}-${index}`}
                  item={item}
                  active={false}
                />
              ))}
            </>
          )}

          {/* 开发者分组 */}
          {developerItems.length > 0 && (
            <>
              <div className="border-y border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">
                {t('home:developer')}
              </div>
              {developerItems.map((item, index) => (
                <DeveloperItem
                  key={`dev-${item.label}-${index}`}
                  item={item}
                  active={false}
                />
              ))}
            </>
          )}

          {/* 提交项目提示 */}
          <SubmitYourProject
            content={t('home:cant_find_the_right_option')}
            className="border-t-2 border-black"
          />
        </>
      );
    } else if (activeTabKey === SEARCH_TYPES.DEVELOPER) {
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
