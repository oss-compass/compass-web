import React from 'react';
import { useTranslation } from 'next-i18next';
import { CiGrid41 } from 'react-icons/ci';
import MenuTopicItem from './Menu/MenuTopicItem';
import { Topic } from './config';

const Overview = () => {
  const { t } = useTranslation();
  return (
    <MenuTopicItem
      hash={Topic.Overview}
      icon={<CiGrid41 className="mr-1 flex-shrink-0" />}
    >
      {t('analyze:overview')}
    </MenuTopicItem>
  );
};

export default Overview;
