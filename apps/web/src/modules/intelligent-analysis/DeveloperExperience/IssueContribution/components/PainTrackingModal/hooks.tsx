import { useCallback, useEffect, useRef, useState } from 'react';
import { TRACKING_OPERATOR_STORAGE_KEY } from './constants';

export const useTrackingOperator = () => {
  const [operator, setOperator] = useState('');
  const lastOperator = useRef('');
  const restoreOperator = useCallback(() => {
    setOperator(lastOperator.current);
  }, []);

  useEffect(() => {
    try {
      lastOperator.current =
        localStorage.getItem(TRACKING_OPERATOR_STORAGE_KEY) || '';
    } catch {
      // localStorage 不可用时仅保留当前组件状态。
    }
    restoreOperator();
  }, [restoreOperator]);

  const rememberOperator = (value: string) => {
    const normalized = value.trim();
    lastOperator.current = normalized;
    setOperator(normalized);
    try {
      localStorage.setItem(TRACKING_OPERATOR_STORAGE_KEY, normalized);
    } catch {
      // localStorage 不可用时仅保留当前组件状态。
    }
    return normalized;
  };

  return { operator, setOperator, rememberOperator, restoreOperator };
};
