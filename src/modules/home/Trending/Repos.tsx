import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTrendingQuery } from '@graphql/generated';
import client from '@graphql/client';
import ListPanel from './ListPanel';

const Repos = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useTrendingQuery(client, { level: 'repo' });
  const trending = data?.trending || [];

  return (
    <div>
      <div className="mb-6 text-2xl font-bold">
        {t('home:trending.repository_weekly_activity_board')}
      </div>
      <ListPanel loading={isLoading} trending={trending} />
    </div>
  );
};

export default Repos;
