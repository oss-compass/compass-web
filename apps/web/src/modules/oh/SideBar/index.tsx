import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '总览',
    children: [
      {
        key: 'g1',
        label: 'TPC main 分支总览',
      },
      //   {
      //     key: 'g2',
      //     label: 'Item 2',
      //     type: 'group',
      //   },
    ],
  },
  //   {
  //     key: 'sub2',
  //     label: 'Navigation Two',
  //     children: [
  //       { key: '5', label: 'Option 5' },
  //       { key: '6', label: 'Option 6' },
  //       {
  //         key: 'sub3',
  //         label: 'Submenu',
  //         children: [
  //           { key: '7', label: 'Option 7' },
  //           { key: '8', label: 'Option 8' },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     type: 'divider',
  //   },
];

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;
