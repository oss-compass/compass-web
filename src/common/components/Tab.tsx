import React from 'react';
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';

const TabsList = styled(TabsListUnstyled)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  border: 1px solid #dee4ec;
  border-radius: 6px;
  padding: 3px;
  background-color: #f6f6f6;
`;

const TabItem = styled(TabUnstyled)`
  cursor: pointer;
  color: #585858;
  font-size: 14px;
  line-height: 1.25;
  padding: 5px 15px;
  border: none;
  display: flex;
  justify-content: center;

  &.${tabUnstyledClasses.selected} {
    color: #000;
    background-color: #fff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Tab: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <TabsUnstyled value={value} onChange={(e, v) => onChange(v as string)}>
    <TabsList>
      {options.map((option) => {
        return (
          <TabItem key={option.label} value={option.value}>
            {option.label}
          </TabItem>
        );
      })}
    </TabsList>
  </TabsUnstyled>
);

export default Tab;
