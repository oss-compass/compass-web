import React, { createContext, useContext, PropsWithChildren } from 'react';

export interface ConfigValue {
  status: string;
  isLoading: boolean;
  notFound: boolean;
}

export const DEFAULT_CONFIG: ConfigValue = {
  status: '',
  isLoading: false,
  notFound: false,
};

export const StatusContext = createContext<ConfigValue>(DEFAULT_CONFIG);

export function useStatusContext() {
  return useContext(StatusContext);
}

export const StatusContextProvider: React.FC<
  PropsWithChildren<{
    value: ConfigValue;
  }>
> = ({ value, children }) => {
  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};
