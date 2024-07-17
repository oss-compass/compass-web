import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Layout } from 'antd';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';

const SideMenu: React.FC = () => {
  const id = useHashchangeEvent();
  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.keyPath[1] === 'sub3') {
      router.push('/oh/' + e.key);
    } else {
      window.location.hash = e.key;
    }
  };

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  //   const menuItems = useMemo(() => {
  //   }, [id]);
  const [active, setActive] = useState('孵化选型申请');
  const menuItems = [
    {
      name: '孵化选型申请',
      id: '孵化选型申请',
      color: 'green',
      icon: null,
      textColor: '!text-[#333]',
    },
    {
      name: '孵化选型评审',
      id: '孵化选型评审',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#333]',
    },
    {
      name: '建仓门禁评审',
      id: '建仓门禁评审',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#bfbfbf]',
    },
    {
      name: '入库自动化处理',
      id: '入库自动化处理',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#bfbfbf]',
    },
    {
      name: '结束',
      id: '结束',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#bfbfbf]',
    },
  ];
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
  const { handleQueryParams } = useHandleQueryParams();

  return (
    <div
      className={classnames(
        'mr-0 h-[calc(100vh-170px)] flex-shrink-0 overflow-auto border bg-white drop-shadow-sm'
      )}
    >
      <Layout>
        <Sider
          breakpoint="lg"
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth="60"
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className={classnames(
              'flex w-full justify-between border-b p-5 py-3 pb-3.5',
              {
                '!justify-center': collapsed,
              }
            )}
          >
            {collapsed ? '' : <div>筛选</div>}
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
          <div className="mt-6 px-5">
            {collapsed ? (
              ''
            ) : (
              <div>
                <div className="text-base font-semibold">类型</div>
              </div>
            )}
          </div>
        </Sider>
      </Layout>
    </div>
  );
};

export default SideMenu;
