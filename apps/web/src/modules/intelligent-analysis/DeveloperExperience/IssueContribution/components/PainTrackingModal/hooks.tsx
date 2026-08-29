import { useEffect, useState } from 'react';
import { TRACKING_OPERATOR_STORAGE_KEY } from './constants';

export const useTrackingOperator = () => {
  const [operator, setOperator] = useState('');

  useEffect(() => {
    try {
      setOperator(localStorage.getItem(TRACKING_OPERATOR_STORAGE_KEY) || '');
    } catch {
      setOperator('');
    }
  }, []);

  const rememberOperator = (value: string) => {
    const normalized = value.trim();
    setOperator(normalized);
    try {
      localStorage.setItem(TRACKING_OPERATOR_STORAGE_KEY, normalized);
    } catch {
      // localStorage 不可用时仅保留当前组件状态。
    }
    return normalized;
  };

  return { operator, setOperator, rememberOperator };
};
