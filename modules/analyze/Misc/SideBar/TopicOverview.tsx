import React from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import MenuTopicItem from './MenuTopicItem';
import { Topic } from './config';

const Overview = () => {
  return (
    <MenuTopicItem
      hash={Topic.Overview}
      bold
      icon={<HiOutlineViewGrid className="mr-1 flex-shrink-0" />}
    >
      Overview
    </MenuTopicItem>
  );
};

export default Overview;
