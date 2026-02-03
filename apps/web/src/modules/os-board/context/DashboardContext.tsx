import React, { createContext, useContext, PropsWithChildren } from 'react';
import type { OsBoardDashboard } from '../types';

export type DashboardStatus =
  | 'loading'
  | 'success'
  | 'error'
  | 'not_found'
  | 'no_permission';

export interface DashboardContextValue {
  /** 看板数据 */
  dashboard: OsBoardDashboard | null;
  /** 加载状态 */
  isLoading: boolean;
  /** 当前状态 */
  status: DashboardStatus;
  /** 是否有权限访问 */
  hasPermission: boolean;
  /** 是否未找到 */
  notFound: boolean;
  /** 错误信息 */
  error: Error | null;
  /** 刷新看板数据 */
  refetch: () => void;
}

export const DEFAULT_DASHBOARD_CONTEXT: DashboardContextValue = {
  dashboard: null,
  isLoading: true,
  status: 'loading',
  hasPermission: true,
  notFound: false,
  error: null,
  refetch: () => {},
};

export const DashboardContext = createContext<DashboardContextValue>(
  DEFAULT_DASHBOARD_CONTEXT
);

export const DashboardContextProvider: React.FC<
  PropsWithChildren<{
    value: DashboardContextValue;
  }>
> = ({ value, children }) => {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

/**
 * 获取看板上下文
 */
export function useDashboardContext() {
  return useContext(DashboardContext);
}
