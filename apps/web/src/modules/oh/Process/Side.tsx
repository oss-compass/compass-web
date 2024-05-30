import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Layout } from 'antd';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const SideMenu: React.FC = () => {
  const id = useHashchangeEvent();
  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e);
    if (e.keyPath[1] === 'sub3') {
      router.push('/oh/' + e.key);
    } else {
      window.location.hash = e.key;
    }
  };
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          选型申请
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          指定软件 Owner/版本 Committer
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          Owner/Committer 审核
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          CTMG 审核
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          二级 BU 代表审核
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          产品线开源代表审核
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          入库自动化处理
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div className="w-[20] overflow-hidden text-ellipsis whitespace-nowrap">
          结束
        </div>
      ),
    },
    // {
    //   dot: (
    //     <ClockCircleOutlined rev={undefined} className="timeline-clock-icon" />
    //   ),
    //   color: 'red',
    //   children: 'Technical testing 2015-09-01',
    // },
  ];

  return (
    <div
      className={classnames('sticky overflow-auto', [
        y <= preY ? 'top-[56px] h-[calc(100vh-80px)]' : 'top-[0px] h-[100vh]',
      ])}
    >
      <Layout>
        <Sider
          breakpoint="lg"
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth="70"
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className={classnames('flex w-full justify-between p-4', {
              '!justify-center': collapsed,
            })}
          >
            {collapsed ? '' : <div>流程图</div>}
            <div
              className="hover:text-primary cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <MenuUnfoldOutlined rev={undefined} />
              ) : (
                <MenuFoldOutlined rev={undefined} />
              )}
            </div>
          </div>
          <div className="mt-2 px-4">
            {collapsed ? '' : <Timeline items={items} />}
          </div>
        </Sider>
      </Layout>
    </div>
  );
};

export default SideMenu;
