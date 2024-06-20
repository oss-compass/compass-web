import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button } from 'antd';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '社区总览',
    icon: <TeamOutlined rev={undefined} />,
    children: [
      {
        key: 'communityOverview',
        label: '总览',
      },
      {
        key: 'sigCenter',
        label: 'SIG 管理',
      },
      {
        key: 'communityManagement',
        label: '社区管理',
      },
    ],
  },
  {
    key: 'sub2',
    label: '贡献价值',
    icon: <PieChartOutlined rev={undefined} />,
    children: [
      {
        key: 'contributeOverview',
        label: '总览',
      },
      {
        key: 'code',
        label: '代码量统计',
      },
      {
        key: 'committer',
        label: 'Committer 贡献统计',
      },
      {
        key: 'communityContributions',
        label: '社区贡献统计',
      },
    ],
  },
  {
    key: 'sub3',
    label: '孵化治理',
    icon: <DownloadOutlined rev={undefined} />,
    children: [
      {
        key: 'work',
        label: '工作台',
      },
      {
        key: 'evaluationApplication',
        label: '报告生成',
      },
      {
        key: 'process',
        label: '软件选型申请',
      },
      {
        key: 'outProcess',
        label: '软件孵化申请',
      },
      {
        key: 'outProcess1',
        label: '软件毕业申请',
      },
      {
        key: 'workbench',
        label: '孵化治理看板',
      },
    ],
  },
];

const SideMenu: React.FC = () => {
  const id = useHashchangeEvent();
  const { clearAllQueryParams } = useHandleQueryParams();
  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    // console.log(e);
    // if (e.keyPath[1] === 'sub3') {
    //   router.push('/oh/' + e.key);
    // } else {
    // clearAllQueryParams();
    window.location.hash = e.key;
    // }
  };
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  const defaultSelectedKeys = useMemo(() => {
    return [id || 'index'];
  }, [id]);

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={classnames('sticky overflow-auto', [
        y > preY
          ? 'top-[56px] h-[calc(100vh-56px)]'
          : 'top-[136px] h-[calc(100vh-136px)]',
      ])}
    >
      <Layout className="oh">
        <Sider
          breakpoint="lg"
          theme="light"
          // trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {/* <div className="flex w-full justify-center">
            <Button
              type="text"
              className="w-full"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined rev={undefined} />
                ) : (
                  <MenuFoldOutlined rev={undefined} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: 64,
                fontSize: '16px',
                height: 64,
              }}
            />
          </div> */}
          <Menu
            defaultSelectedKeys={[id || 'index']}
            onClick={onClick}
            // style={{ width: 256 }}
            defaultOpenKeys={['sub3']}
            mode="inline"
            items={items}
            selectedKeys={defaultSelectedKeys}
          />
        </Sider>
      </Layout>
    </div>
  );
};

export default SideMenu;
