import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import MenuTopicItem from './Menu/MenuTopicItem';
import MenuItem from './Menu/MenuItem';
import MenuSubItem from './Menu/MenuSubItem';
import { useOrganizationsActivity, Organizations, Topic } from './config';
import NicheCreationIcon from './assets/NicheCreation.svg';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';
import { useSnapshot } from 'valtio';
import { dataState } from '@modules/analyze/store/dataState';

const NicheCreation = () => {
  const { t } = useTranslation();
  const organizationsActivity = useOrganizationsActivity();
  const { menuId, subMenuId } = useContext(SideBarContext);
  const snapshot = useSnapshot(dataState);

  const menus = (
    <>
      <MenuItem id="1" disabled>
        {t('metrics_models:developer_attraction.title')}
      </MenuItem>
      <MenuItem
        disabled={!snapshot.showOrganizations}
        active={menuId === Organizations.Overview}
        id={Organizations.Overview}
        subMenu={
          snapshot.showOrganizations && (
            <>
              {organizationsActivity.groups.map((item) => {
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
          )
        }
      >
        {t('metrics_models:organizations_activity.title')}
      </MenuItem>
      <MenuItem id="3" disabled>
        {t('metrics_models:technological_advancement.title')}
      </MenuItem>
    </>
  );

  return (
    <MenuTopicItem
      hash={Topic.NicheCreation}
      icon={
        <span className="mr-1 flex-shrink-0">
          <NicheCreationIcon />
        </span>
      }
      menus={menus}
    >
      {t('analyze:topic.niche_creation')}
    </MenuTopicItem>
  );
};

export default NicheCreation;
