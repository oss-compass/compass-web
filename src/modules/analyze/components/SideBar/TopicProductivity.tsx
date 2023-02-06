import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Chaoss from '@common/components/PoweredBy/Chaoss';
import ProductivityIcon from './assets/Productivity.svg';
import MenuTopicItem from './Menu/MenuTopicItem';
import MenuItem from './Menu/MenuItem';
import MenuSubItem from './Menu/MenuSubItem';
import {
  CollaborationDevelopment,
  useCollaborationDevelopmentIndex,
  useCommunityServiceAndSupport,
  Support,
  Topic,
} from './config';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';

const Productivity = () => {
  const { t } = useTranslation();
  const { menuId, subMenuId } = useContext(SideBarContext);
  const collaborationDevelopmentIndex = useCollaborationDevelopmentIndex();
  const communityServiceAndSupport = useCommunityServiceAndSupport();

  const menu = (
    <>
      <MenuItem
        active={menuId === CollaborationDevelopment.Overview}
        id={CollaborationDevelopment.Overview}
        leftIcons={<Chaoss />}
        subMenu={
          <>
            {collaborationDevelopmentIndex.groups.map((item) => {
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
        {t('metrics_models:collaboration_development_index.title')}
      </MenuItem>
      <MenuItem
        active={menuId === Support.Overview}
        id={Support.Overview}
        leftIcons={<Chaoss />}
        subMenu={
          <>
            {communityServiceAndSupport.groups.map((item) => {
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
        {t('metrics_models:community_service_and_support.title')}
      </MenuItem>
      <MenuItem id="3" disabled>
        {t('metrics_models:code_compliance_guarantee.title')}
      </MenuItem>
      <MenuItem id="2" disabled>
        {t('metrics_models:code_security_guarantee.title')}
      </MenuItem>
      <MenuItem id="4" disabled>
        {t('metrics_models:content.title')}
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
      {t('analyze:topic.productivity')}
    </MenuTopicItem>
  );
};

export default Productivity;
