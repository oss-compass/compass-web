/**
 * 搜索模块的类型定义
 * 定义搜索相关的接口和类型
 */

import { SearchQuery } from '@oss-compass/graphql';

// 搜索结果项类型
export type SearchResultItem = SearchQuery['fuzzySearch'][number];

// 搜索类型枚举
export enum SearchType {
  ALL = '0',
  DEVELOPER = '1',
  REPOSITORY = '2',
}

// 标签页配置项
export interface TabItem {
  key: string;
  label: string;
}

// 搜索下拉组件属性
export interface SearchDropdownProps {
  keyword: string;
  result: SearchQuery['fuzzySearch'];
  onTabChange: (type: string) => void;
  activeTabKey: string;
  showLoading?: boolean;
}

// 标签页组件属性
export interface TabsProps {
  items: TabItem[];
  onTabChange: (key: string) => void;
  activeTabKey: string;
}

// 链接项组件属性
export interface LinkItemProps {
  item: SearchResultItem;
  active: boolean;
}

// 下拉列表组件属性
export interface DropDownListProps {
  result: SearchQuery['fuzzySearch'];
}

// 搜索组件属性
export interface SearchProps {
  highlight?: boolean;
  defaultSearchType?: SearchType;
}

// 开发者下拉列表组件属性
export interface DropDownListDeveloperProps {
  result: SearchQuery['fuzzySearch'];
}

// 提交项目组件属性
export interface SubmitYourProjectProps {
  content: React.ReactNode;
  noResult?: boolean;
  className?: string;
  hidden?: boolean;
}

// 图标组件属性
export interface IconProps {
  name: string;
}
