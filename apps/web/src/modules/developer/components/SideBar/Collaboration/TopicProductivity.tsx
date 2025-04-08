import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Chaoss from '@common/components/PoweredBy/Chaoss';
import ProductivityIcon from '@modules/developer/components/SideBar/assets/Productivity.svg';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuItem from '../Menu/MenuItem';
import MenuSubItem from '../Menu/MenuSubItem';
import {
  CollaborationDevelopment,
  useCollaborationDevelopmentIndex,
  useCommunityServiceAndSupport,
  Support,
  Topic,
} from '../config';
import { SideBarContext } from '@modules/developer/context/SideBarContext';

const Productivity = () => {
  const { t } = useTranslation();
  const { menuId, subMenuId } = useContext(SideBarContext);
  const collaborationDevelopmentIndex = useCollaborationDevelopmentIndex();
  const communityServiceAndSupport = useCommunityServiceAndSupport();

  const menu = (
    <>
      {/* <MenuItem id="3" disabled>
        {t('metrics_models:code_compliance_guarantee.title')}
      </MenuItem>
      <MenuItem id="2" disabled>
        {t('metrics_models:code_security_guarantee.title')}
      </MenuItem>
      <MenuItem id="4" disabled>
        {t('metrics_models:content.title')}
      </MenuItem> */}
    </>
  );

  return (
    <>
      <MenuTopicItem
        hash={Topic.Productivity}
        icon={
          <span className="mr-1 h-4 w-4 flex-shrink-0">
            <ProductivityIcon />
          </span>
        }
        menus={menu}
      >
        仓库
      </MenuTopicItem>
      <MenuTopicItem
        hash={Topic.Productivity}
        icon={
          <span className="mr-1 h-4 w-4 flex-shrink-0">
            <ProductivityIcon />
          </span>
        }
        menus={menu}
      >
        协作
      </MenuTopicItem>
    </>
  );
};

export default Productivity;
