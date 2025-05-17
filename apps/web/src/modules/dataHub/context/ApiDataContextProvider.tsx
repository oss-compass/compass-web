import React, { createContext, useContext, PropsWithChildren } from 'react';

export interface ConfigValue {
  isLoading: boolean;
  data: any;
}

export const DEFAULT_CONFIG: ConfigValue = {
  isLoading: true,
  data: null,
};
export const ApiDataContext = createContext<ConfigValue>(DEFAULT_CONFIG);

export const ApiDataProvider: React.FC<
  PropsWithChildren<{
    value: ConfigValue;
  }>
> = ({ value, children }) => {
  return (
    <ApiDataContext.Provider value={value}>{children}</ApiDataContext.Provider>
  );
};

export function useApiDataContext() {
  return useContext(ApiDataContext);
}
