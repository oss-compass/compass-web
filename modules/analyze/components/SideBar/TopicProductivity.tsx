import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import ProductivityIcon from './assets/Productivity.svg';
import MenuTopicItem from './Menu/MenuTopicItem';
import MenuItem from './Menu/MenuItem';
import MenuSubItem from './Menu/MenuSubItem';
import {
  CodeQuality,
  useCodeQualityGuarantee,
  useCommunityServiceAndSupport,
  Support,
  Topic,
} from './config';
import { SideBarContext } from '@modules/analyze/context/SideBarContext';

const Productivity = () => {
  const { t } = useTranslation();
  const { menuId, subMenuId } = useContext(SideBarContext);
  const codeQualityGuarantee = useCodeQualityGuarantee();
  const communityServiceAndSupport = useCommunityServiceAndSupport();

  const menu = (
    <>
      <MenuItem
        active={menuId === CodeQuality.Overview}
        id={CodeQuality.Overview}
        subMenu={
          <>
            {codeQualityGuarantee.groups.map((item) => {
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
        {t('metrics_models:code_quality_guarantee.title')}
      </MenuItem>
      <MenuItem id="2" disabled>
        {t('metrics_models:code_security_guarantee.title')}
      </MenuItem>
      <MenuItem id="3" disabled>
        {t('metrics_models:code_compliance_guarantee.title')}
      </MenuItem>
      <MenuItem id="4" disabled>
        {t('metrics_models:content.title')}
      </MenuItem>
      <MenuItem
        active={menuId === Support.Overview}
        id={Support.Overview}
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
