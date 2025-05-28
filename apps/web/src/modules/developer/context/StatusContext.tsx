import React, { createContext, useContext, PropsWithChildren } from 'react';
import { StatusVerifyQuery } from '@oss-compass/graphql';
import { Level } from '../constant';

type Item = Pick<
  StatusVerifyQuery['analysisStatusVerify'],
  'label' | 'status' | 'shortCode' | 'collections'
>;

// 定义 API 返回的 data 对象结构
export interface ContributorOverviewData {
  avatar_url: string;
  html_url: string;
  country: string | null;
  city: string | null;
  company: string | null;
  main_language: string | null;
  repo_roles: any;
  topics: any;
  contributor?: string;
  // 根据实际情况添加或修改其他字段
}

export interface ConfigValue {
  status: string;
  isLoading: boolean;
  notFound: boolean;
  verifiedItems: any;
}

export const DEFAULT_CONFIG: ConfigValue = {
  status: '',
  isLoading: false,
  notFound: false,
  verifiedItems: [],
};

export const StatusContext = createContext<ConfigValue>(DEFAULT_CONFIG);

export const StatusContextProvider: React.FC<
  PropsWithChildren<{
    value: ConfigValue;
  }>
> = ({ value, children }) => {
  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export function useStatusContext() {
  return useContext(StatusContext);
}
