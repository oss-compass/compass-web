/**
 * 搜索模块的工具函数
 * 提供搜索相关的业务逻辑和辅助函数
 */

import { Level } from '@modules/analyze/constant';
import {
  getProvider,
  getRepoName,
  getPathname,
  getUsername,
  getShortAnalyzeLink,
  getDeveloperLink,
} from '@common/utils';
import { SearchResultItem } from '../types';
import { ICON_NAMES } from '../constants';

/**
 * 获取搜索结果项的显示内容
 * @param item 搜索结果项
 * @param t 翻译函数
 * @returns 格式化的显示内容
 */
export const getSearchItemContent = (
  item: SearchResultItem,
  t: (key: string) => string
) => {
  if (item.level === Level.REPO) {
    const host = getProvider(item.label!);
    return {
      type: 'repository',
      title: getRepoName(item.label!),
      subtitle: getPathname(item.label!),
      icon: host,
      showIcon: true,
    };
  }

  return {
    type: 'community',
    title: item.label,
    subtitle: item.level === Level.COMMUNITY ? t('home:community') : item.level,
    icon: null,
    showIcon: false,
  };
};

/**
 * 获取开发者信息
 * @param item 搜索结果项
 * @returns 开发者信息对象
 */
export const getDeveloperInfo = (item: SearchResultItem) => {
  return {
    username: getUsername(item.level!),
    avatarUrl: item.label || '/images/default.png',
    profileLink: getDeveloperLink(item.level!),
  };
};

/**
 * 获取搜索结果项的链接
 * @param item 搜索结果项
 * @returns 链接地址
 */
export const getSearchItemLink = (item: SearchResultItem) => {
  return getShortAnalyzeLink(item);
};

/**
 * 判断是否为有效的图标名称
 * @param name 图标名称
 * @returns 是否为有效图标
 */
export const isValidIconName = (name: string): boolean => {
  return Object.values(ICON_NAMES).includes(name as any);
};

/**
 * 格式化关键词显示（超长截断）
 * @param keyword 关键词
 * @param maxLength 最大长度
 * @returns 格式化后的关键词
 */
export const formatKeywordDisplay = (
  keyword: string,
  maxLength: number = 10
): string => {
  if (!keyword) return '';
  return keyword.length > maxLength
    ? `${keyword.slice(0, maxLength)}...`
    : keyword;
};

/**
 * 检查搜索结果是否为空
 * @param result 搜索结果
 * @returns 是否为空
 */
export const isEmptySearchResult = (result: any): boolean => {
  return !result || (Array.isArray(result) && result.length === 0);
};

/**
 * 获取搜索容器的位置样式类
 * @param language 当前语言
 * @returns 位置样式类名
 */
export const getSearchContainerPositionClass = (language: string): string => {
  return language === 'en'
    ? 'bottom-16 md:bottom-6'
    : 'top-[45%] -translate-y-1/2';
};

/**
 * 获取标题字体样式类
 * @param language 当前语言
 * @returns 字体样式类名
 */
export const getTitleFontClass = (language: string): string => {
  return language === 'zh' ? 'font-black' : '';
};
