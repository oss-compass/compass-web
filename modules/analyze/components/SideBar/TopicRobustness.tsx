import React, { useContext } from 'react';
import RobustnessIcon from './assets/Robustness.svg';
import { Activity, CodeQuality, CommunityActivity, Topic } from './config';
import MenuItem from './Menu/MenuItem';
import MenuTopicItem from './Menu/MenuTopicItem';
import MenuSubItem from './Menu/MenuSubItem';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';

const Robustness = () => {
  const { menuId, subMenuId } = useContext(SideBarContext);

  const menu = (
    <>
      <MenuItem
        active={menuId === Activity.Overview}
        id={Activity.Overview}
        subMenu={
          <>
            {CommunityActivity.groups.map((item) => {
              return (
                <MenuSubItem
                  key={item.id}
                  active={item.id === subMenuId}
                  id={item.id}
                >
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
  );

  return (
    <MenuTopicItem
      hash={Topic.Robustness}
      icon={
        <span className="mr-1 flex-shrink-0">
          <RobustnessIcon />
        </span>
      }
      menus={menu}
    >
      Robustness
    </MenuTopicItem>
  );
};

export default Robustness;
