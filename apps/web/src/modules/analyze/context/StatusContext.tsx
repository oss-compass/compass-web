import React, { createContext, useContext, PropsWithChildren } from 'react';
import { StatusVerifyQuery } from '@oss-compass/graphql';
import { Level } from '../constant';

type Item = Pick<
  StatusVerifyQuery['analysisStatusVerify'],
  'label' | 'status' | 'shortCode' | 'collections'
>;

export type VerifiedLabelItem = {
  [K in keyof Item]-?: NonNullable<Item[K]>;
} & { level: Level };

export interface ConfigValue {
  status: string;
  isLoading: boolean;
  isError: boolean;
  notFound: boolean;
  verifiedItems: VerifiedLabelItem[];
  refetch: () => void;
}

export const DEFAULT_CONFIG: ConfigValue = {
  status: '',
  isLoading: false,
  isError: false,
  notFound: false,
  verifiedItems: [],
  refetch: () => {},
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
