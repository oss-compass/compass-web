import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import ProductivityIcon from '@modules/analyze/components/SideBar/assets/Productivity.svg';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuItem from '../Menu/MenuItem';
import MenuSubItem from '../Menu/MenuSubItem';
import { ContributorsPersona, useContributorsPersona, Topic } from '../config';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';

const Productivity = () => {
  const { t } = useTranslation();
  const { menuId, subMenuId } = useContext(SideBarContext);
  const contributorsPersonaItems = useContributorsPersona();

  const menu = (
    <>
      <MenuItem
        active={menuId === ContributorsPersona.Overview}
        id={ContributorsPersona.Overview}
        subMenu={
          <>
            {contributorsPersonaItems.groups.map((item) => {
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
        {t('metrics_models:contributors_persona.title')}
      </MenuItem>
    </>
  );

  return (
    <MenuTopicItem
      hash={Topic.Productivity}
      icon={
        <span className="mr-1 h-4 w-4 flex-shrink-0">
          <ProductivityIcon />
        </span>
      }
      menus={menu}
    >
      {t('analyze:topic.productivity')}
    </MenuTopicItem>
  );
};

export default Productivity;
