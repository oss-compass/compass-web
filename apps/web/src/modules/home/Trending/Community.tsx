import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTrendingQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import ListPanel from './ListPanel';
import Tooltip from '@common/components/Tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const Community = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useTrendingQuery(client, { level: 'community' });
  const trending = data?.trending || [];

  return (
    <div>
      <div className="mb-6 flex items-center text-2xl font-bold">
        {t('home:trending.community_weekly_activity_board')}
        <Tooltip
          arrow
          title={
            <>
              <span className="text-sm">
                {t('home:trending.community_weekly_activity_board_desc')}
              </span>
            </>
          }
          placement="right"
        >
          <span className="ml-2 cursor-pointer">
            <AiOutlineQuestionCircle />
          </span>
        </Tooltip>
      </div>
      <ListPanel loading={isLoading} trending={trending} />
    </div>
  );
};

export default Community;
