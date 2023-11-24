import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import RobustnessIcon from '@modules/analyze/components/SideBar/assets/Robustness.svg';
import { Activity, useCommunityActivity, Topic } from '../config';
import MenuItem from '../Menu/MenuItem';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuSubItem from '../Menu/MenuSubItem';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';
import Chaoss from '@common/components/PoweredBy/Chaoss';

const Robustness = () => {
  const { t } = useTranslation();

  const menu = (
    <>
      <MenuItem id="1" disabled>
        {t('metrics_models:contributor_reputation.title')}
      </MenuItem>
      <MenuItem id="2" disabled>
        {t('metrics_models:user_reputation.title')}
      </MenuItem>
    </>
  );

  return (
    <MenuTopicItem
      hash={Topic.Robustness}
      icon={
        <span className="mr-1 h-4 w-4 flex-shrink-0">
          <RobustnessIcon />
        </span>
      }
      menus={menu}
    >
      {t('analyze:topic.robustness')}
    </MenuTopicItem>
  );
};

export default Robustness;
