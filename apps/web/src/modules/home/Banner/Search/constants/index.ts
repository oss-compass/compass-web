/**
 * 搜索模块的常量配置
 * 集中管理搜索相关的常量和配置项
 */

import { SearchType } from '../types';

// 搜索类型配置
export const SEARCH_TYPES = {
  REPOSITORY: SearchType.REPOSITORY,
  DEVELOPER: SearchType.DEVELOPER,
  ALL: SearchType.ALL,
} as const;

// 默认搜索类型
export const DEFAULT_SEARCH_TYPE = SEARCH_TYPES.ALL;

// 搜索防抖延迟时间（毫秒）
export const SEARCH_DEBOUNCE_DELAY = 300;

// 搜索框尺寸配置
export const SEARCH_BOX_CONFIG = {
  // 桌面端宽度
  DESKTOP_WIDTH: '520px',
  // 移动端宽度
  MOBILE_WIDTH: '380px',
  // 输入框高度
  INPUT_HEIGHT: {
    DESKTOP: '52px',
    MOBILE: '40px',
  },
  // 下拉框顶部偏移
  DROPDOWN_TOP_OFFSET: {
    DESKTOP: '58px',
    MOBILE: '46px',
  },
} as const;

// 样式类名配置
export const STYLE_CLASSES = {
  // 搜索容器基础样式
  SEARCH_CONTAINER_BASE:
    'absolute -left-6 w-[520px] p-4 md:w-[380px] lg:left-0',
  // 标题样式
  TITLE_BASE: 'mb-6 text-[52px] leading-[80px] tracking-tight md:text-3xl',
  // 输入框样式
  INPUT_BASE:
    'h-[52px] w-full appearance-none bg-transparent text-lg outline-0 md:h-[40px] md:text-sm',
  // 下拉框样式
  DROPDOWN_BASE:
    'z-dropdown absolute left-0 right-0 top-[58px] border-2 border-black bg-white drop-shadow-xl md:top-[46px]',
  // 链接项样式
  LINK_ITEM_BASE:
    'flex min-h-[48px] cursor-pointer items-center justify-between px-4 py-2 text-base hover:bg-gray-100 md:py-1.5 md:px-2 md:text-sm',
} as const;

// 图标名称映射
export const ICON_NAMES = {
  GITEE: 'gitee',
  GITHUB: 'github',
} as const;

// 最小高度配置
export const MIN_HEIGHT = {
  SUBMIT_PROJECT_NORMAL: '48px',
  SUBMIT_PROJECT_NO_RESULT: '84px',
  LINK_ITEM: '48px',
} as const;
