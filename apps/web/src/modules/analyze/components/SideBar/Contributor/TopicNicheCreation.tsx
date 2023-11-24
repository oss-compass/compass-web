import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuItem from '../Menu/MenuItem';
import { Topic } from '../config';
import NicheCreationIcon from '@modules/analyze/components/SideBar/assets/NicheCreation.svg';

const NicheCreation = () => {
  const { t } = useTranslation();

  const menus = (
    <>
      <MenuItem id="1" disabled>
        {t('metrics_models:contributor_route.title')}
      </MenuItem>
    </>
  );

  return (
    <MenuTopicItem
      hash={Topic.NicheCreation}
      icon={
        <span className="mr-1 h-4 w-4 flex-shrink-0">
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
