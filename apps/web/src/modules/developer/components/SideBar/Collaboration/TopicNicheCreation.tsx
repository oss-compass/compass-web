import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuItem from '../Menu/MenuItem';
import MenuSubItem from '../Menu/MenuSubItem';
import { useOrganizationsActivity, Organizations, Topic } from '../config';
import NicheCreationIcon from '@modules/developer/components/SideBar/assets/NicheCreation.svg';
import { SideBarContext } from '@modules/developer/context/SideBarContext';

const NicheCreation = () => {
  const { t } = useTranslation();
  const organizationsActivity = useOrganizationsActivity();
  const { menuId, subMenuId } = useContext(SideBarContext);

  return (
    <MenuTopicItem
      hash={Topic.NicheCreation}
      icon={
        <span className="mr-1 h-4 w-4 flex-shrink-0">
          <NicheCreationIcon />
        </span>
      }
      menus={''}
    >
      Issue
    </MenuTopicItem>
  );
};

export default NicheCreation;
