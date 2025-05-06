import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getApiJson = async () => {
  return await axios.get(`/api/v2/docs`, {
    headers: {
      accept: 'application/json',
    },
  });
};

const useApiData = () => {
  const { isLoading, data } = useQuery([], () => {
    return getApiJson();
  });
  return { isLoading, data: data?.data || null };
};

export default useApiData;
