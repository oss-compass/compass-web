/**
 * 搜索模块统一导出
 * 提供搜索模块的所有公共接口
 */

// 主要组件
export { default as Search } from './index';
export { default as SearchDropdown } from './SearchDropdown';

// 子组件
export * from './components';

// 类型定义
export * from './types';

// 常量配置
export * from './constants';

// 工具函数
export * from './utils';

// 自定义Hooks
export * from './hooks/useSearch';
