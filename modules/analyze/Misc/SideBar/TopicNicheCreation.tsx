import React from 'react';
import MenuTopicItem from './MenuTopicItem';
import MenuItem from './MenuItem';
import { Topic } from './config';
import NicheCreationIcon from './assets/NicheCreation.svg';

const NicheCreation = () => {
  return (
    <MenuTopicItem
      hash={Topic.NicheCreation}
      icon={
        <span className="mr-1 flex-shrink-0">
          <NicheCreationIcon />
        </span>
      }
      menus={
        <>
          <MenuItem id="1" disabled>
            Developer Attraction
          </MenuItem>
          <MenuItem id="2" disabled>
            Organizations Activity
          </MenuItem>
          <MenuItem id="3" disabled>
            Technological Advancement
          </MenuItem>
        </>
      }
    >
      Niche Creation
    </MenuTopicItem>
  );
};

export default NicheCreation;
