import React, { PropsWithChildren, useEffect } from 'react';
import client from '@graphql/client';
import { useUserinfoQuery } from '@graphql/generated';
import { serUserLoading, setUserInfo } from './UserInfoStore';

const UserInfoFetcher: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useUserinfoQuery(client, {});

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  useEffect(() => {
    serUserLoading(isLoading);
  }, [isLoading]);

  return null;
};

export default UserInfoFetcher;
