import React from 'react';
import { useTranslation } from 'next-i18next';
import { CiUser } from 'react-icons/ci';
import MenuTopicItem from './Menu/MenuTopicItem';
import { Topic } from './config';

const Overview = () => {
  const { t } = useTranslation();
  return (
    <MenuTopicItem
      hash={Topic.Overview}
      icon={<CiUser className="mr-1 flex-shrink-0" />}
    >
      WHOAMI
    </MenuTopicItem>
  );
};

export default Overview;
