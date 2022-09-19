import { createContext, useContext } from 'react';

export interface AnalyzeConfigValue {
  status: string | undefined;
}

export const DEFAULT_ANALYZE_CONFIG: AnalyzeConfigValue = {
  status: undefined,
};

export interface AnalyzeConfig {
  value: AnalyzeConfigValue;
}

export const AnalyzeConfigCtx = createContext<AnalyzeConfig>({
  value: DEFAULT_ANALYZE_CONFIG,
});

export function useAnalyzeConfigContext() {
  return useContext(AnalyzeConfigCtx);
}
