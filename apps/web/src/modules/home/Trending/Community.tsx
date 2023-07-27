import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTrendingQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import ListPanel from './ListPanel';

const Community = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useTrendingQuery(client, { level: 'community' });
  const trending = data?.trending || [];

  return (
    <div>
      <div className="mb-6 text-2xl font-bold">
        {t('home:trending.community_weekly_activity_board')}
      </div>
      <ListPanel loading={isLoading} trending={trending} />
    </div>
  );
};

export default Community;
