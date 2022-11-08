import React from 'react';
import ProductivityIcon from './assets/Productivity.svg';
import MenuTopicItem from './MenuTopicItem';
import MenuItem from './MenuItem';
import MenuSubItem from './MenuSubItem';
import {
  CodeQualityGuarantee,
  CommunityServiceAndSupport,
  Topic,
} from './config';

const Productivity = () => {
  return (
    <MenuTopicItem
      hash={Topic.Productivity}
      bold
      icon={
        <span className="mr-1 flex-shrink-0">
          <ProductivityIcon />
        </span>
      }
      menus={
        <>
          <MenuItem
            id={CodeQualityGuarantee.id}
            subMenu={
              <>
                {CodeQualityGuarantee.groups.map((item) => {
                  return (
                    <MenuSubItem key={item.id} id={item.id}>
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
            id={CommunityServiceAndSupport.id}
            subMenu={
              <>
                {CommunityServiceAndSupport.groups.map((item) => {
                  return (
                    <MenuSubItem key={item.id} id={item.id}>
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
      }
    >
      Productivity
    </MenuTopicItem>
  );
};

export default Productivity;
