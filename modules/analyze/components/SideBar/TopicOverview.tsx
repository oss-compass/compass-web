import React from 'react';
import { CiGrid41 } from 'react-icons/ci';
import MenuTopicItem from './Menu/MenuTopicItem';
import { Topic } from './config';

const Overview = () => {
  return (
    <MenuTopicItem
      hash={Topic.Overview}
      icon={<CiGrid41 className="mr-1 flex-shrink-0" />}
    >
      Overview
    </MenuTopicItem>
  );
};

export default Overview;
