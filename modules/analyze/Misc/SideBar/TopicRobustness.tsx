import React from 'react';
import RobustnessIcon from './assets/Robustness.svg';
import { CommunityActivity, Topic } from './config';
import MenuItem from './MenuItem';
import MenuTopicItem from './MenuTopicItem';
import MenuSubItem from './MenuSubItem';

const Robustness = () => {
  return (
    <MenuTopicItem
      hash={Topic.Robustness}
      bold
      icon={
        <span className="mr-1 flex-shrink-0">
          <RobustnessIcon />
        </span>
      }
      menus={
        <>
          <MenuItem
            id={CommunityActivity.id}
            subMenu={
              <>
                {CommunityActivity.groups.map((item) => {
                  return (
                    <MenuSubItem key={item.id} id={item.id}>
                      {item.name}
                    </MenuSubItem>
                  );
                })}
              </>
            }
          >
            Activity
          </MenuItem>
          <MenuItem id="2" disabled>
            Developer Convertion
          </MenuItem>
          <MenuItem id="3" disabled>
            Developer Retention
          </MenuItem>
          <MenuItem id="4" disabled>
            Inner Connectedness
          </MenuItem>
          <MenuItem id="5" disabled>
            Organization Collaboration Relationships
          </MenuItem>
          <MenuItem id="6" disabled>
            Outbound Connectedness
          </MenuItem>
        </>
      }
    >
      Robustness
    </MenuTopicItem>
  );
};

export default Robustness;
