import React, { createContext, useContext, PropsWithChildren } from 'react';

export interface ConfigValue {
  status: string;
  loading: boolean;
}

export const DEFAULT_CONFIG: ConfigValue = {
  loading: false,
  status: '',
};

export const ConfigContext = createContext<ConfigValue>(DEFAULT_CONFIG);

export function useConfigContext() {
  return useContext(ConfigContext);
}

export const ConfigContextProvider: React.FC<
  PropsWithChildren<{
    value: ConfigValue;
  }>
> = ({ value, children }) => {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
