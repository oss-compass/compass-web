import { createContext, useContext } from 'react';

export interface AnalyzeConfigValue {
  status: string;
}

export const DEFAULT_ANALYZE_CONFIG: AnalyzeConfigValue = {
  status: 'pending',
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
