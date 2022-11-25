import React, { useContext } from 'react';
import ProductivityIcon from './assets/Productivity.svg';
import MenuTopicItem from './MenuTopicItem';
import MenuItem from './MenuItem';
import MenuSubItem from './MenuSubItem';
import {
  CodeQuality,
  CodeQualityGuarantee,
  CommunityServiceAndSupport,
  Support,
  Topic,
} from './config';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';

const Productivity = () => {
  const { menuId, subMenuId } = useContext(SideBarContext);
  const menu = (
    <>
      <MenuItem
        active={menuId === CodeQuality.Overview}
        id={CodeQuality.Overview}
        subMenu={
          <>
            {CodeQualityGuarantee.groups.map((item) => {
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
        Code Quality Guarantee
      </MenuItem>
      <MenuItem id="2" disabled>
        Code Security Guarantee
      </MenuItem>
      <MenuItem id="3" disabled>
        Code Compliance Guarantee
      </MenuItem>
      <MenuItem id="4" disabled>
        Content
      </MenuItem>
      <MenuItem
        active={menuId === Support.Overview}
        id={Support.Overview}
        subMenu={
          <>
            {CommunityServiceAndSupport.groups.map((item) => {
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
        Community Service and Support
      </MenuItem>
    </>
  );

  return (
    <MenuTopicItem
      hash={Topic.Productivity}
      icon={
        <span className="mr-1 flex-shrink-0">
          <ProductivityIcon />
        </span>
      }
      menus={menu}
    >
      Productivity
    </MenuTopicItem>
  );
};

export default Productivity;
