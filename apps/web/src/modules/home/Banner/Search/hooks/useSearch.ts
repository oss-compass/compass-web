/**
 * 搜索功能的自定义Hook
 * 管理搜索状态和相关逻辑
 */

import { useState, useRef, useEffect } from 'react';
import { useThrottle } from 'ahooks';
import { useClickAway } from 'react-use';
import { useSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { DEFAULT_SEARCH_TYPE, SEARCH_DEBOUNCE_DELAY } from '../constants';
import { SearchType } from '../types';

/**
 * 搜索功能Hook
 * @param defaultSearchType 默认搜索类型
 * @returns 搜索相关的状态和方法
 */
export const useSearch = (defaultSearchType?: SearchType) => {
  // 搜索相关状态
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>(
    defaultSearchType || DEFAULT_SEARCH_TYPE
  );

  // 当defaultSearchType变化时更新searchType
  useEffect(() => {
    if (defaultSearchType) {
      setSearchType(defaultSearchType);
    }
  }, [defaultSearchType]);

  // 容器和输入框引用
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 防抖处理的关键词
  const throttledKeyword = useThrottle(keyword, {
    wait: SEARCH_DEBOUNCE_DELAY,
  });

  // GraphQL查询
  const { isLoading, data, fetchStatus } = useSearchQuery(
    client,
    { keyword: throttledKeyword, type: Number(searchType) },
    { enabled: Boolean(throttledKeyword) }
  );

  // 显示加载状态
  const showLoading = isLoading && fetchStatus === 'fetching';

  // 点击外部区域关闭下拉框
  useClickAway(containerRef, () => {
    setKeyword('');
    setIsFocused(false);
  });

  /**
   * 处理关键词变化
   * @param value 新的关键词值
   */
  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  /**
   * 处理搜索框聚焦
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * 处理搜索类型变化
   * @param type 新的搜索类型
   */
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type as SearchType);
  };

  /**
   * 重置搜索状态
   */
  const resetSearch = () => {
    setKeyword('');
    setIsFocused(false);
    setSearchType(DEFAULT_SEARCH_TYPE);
  };

  /**
   * 聚焦搜索输入框
   */
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return {
    // 状态
    keyword,
    isFocused,
    searchType,
    showLoading,
    searchResult: data?.fuzzySearch,

    // 引用
    containerRef,
    inputRef,

    // 方法
    handleKeywordChange,
    handleFocus,
    handleSearchTypeChange,
    resetSearch,
    focusInput,
  };
};
