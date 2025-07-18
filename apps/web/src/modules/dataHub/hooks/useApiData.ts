import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// http://159.138.38.244:7000
const getApiJson = async () => {
  return await axios.get(`/api/v2/docs`, {
    headers: {
      accept: 'application/json',
    },
  });
};

const useApiData = () => {
  const { isLoading, data, isError } = useQuery(
    ['apiData'],
    () => {
      return getApiJson();
    },
    {
      retry: 1, // 禁止重试
      retryDelay: 3000, // 设置重试延迟为0
    }
  );
  return { isLoading, isError, data: data?.data || null };
};

export default useApiData;
