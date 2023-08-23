import React, { createContext, useContext, PropsWithChildren } from 'react';
import { StatusVerifyQuery } from '@oss-compass/graphql';
import { Level } from '@common/constant';

type Item = Pick<
  StatusVerifyQuery['analysisStatusVerify'],
  'label' | 'status' | 'shortCode'
>;

export type VerifiedLabelItem = {
  [K in keyof Item]-?: NonNullable<Item[K]>;
} & { level: Level };

export interface ConfigValue {
  isLoading: boolean;
  notFound: boolean;
  verifiedItems: VerifiedLabelItem[];
}

export const DEFAULT_CONFIG: ConfigValue = {
  isLoading: false,
  notFound: false,
  verifiedItems: [],
};

export const SlugsVerifyContext = createContext<ConfigValue>(DEFAULT_CONFIG);

export function useSlugsVerifyContext() {
  return useContext(SlugsVerifyContext);
}

export const SlugsVerifyContextProvider: React.FC<
  PropsWithChildren<{
    value: ConfigValue;
  }>
> = ({ value, children }) => {
  return (
    <SlugsVerifyContext.Provider value={value}>
      {children}
    </SlugsVerifyContext.Provider>
  );
};
