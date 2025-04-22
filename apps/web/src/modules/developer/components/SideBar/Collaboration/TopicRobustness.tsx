import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import RobustnessIcon from '@modules/developer/components/SideBar/assets/Robustness.svg';
import { Activity, useCommunityActivity, Topic } from '../config';
import MenuItem from '../Menu/MenuItem';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuSubItem from '../Menu/MenuSubItem';
import { SideBarContext } from '@modules/developer/context/SideBarContext';
import Chaoss from '@common/components/PoweredBy/Chaoss';

const Robustness = () => {
  const { t } = useTranslation();
  const communityActivity = useCommunityActivity();
  const { menuId, subMenuId } = useContext(SideBarContext);

  const menu = (
    <>
      {/* <MenuItem id="2" disabled>
        {t('metrics_models:developer_convertion.title')}
      </MenuItem>
      <MenuItem id="3" disabled>
        {t('metrics_models:developer_retention.title')}
      </MenuItem>
      <MenuItem id="4" disabled>
        {t('metrics_models:inner_connectedness.title')}
      </MenuItem>
      <MenuItem id="5" disabled>
        {t('metrics_models:organization_collaboration_relationships.title')}
      </MenuItem>
      <MenuItem id="6" disabled>
        {t('metrics_models:outbound_connectedness.title')}
      </MenuItem> */}
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
      Code
    </MenuTopicItem>
  );
};

export default Robustness;
