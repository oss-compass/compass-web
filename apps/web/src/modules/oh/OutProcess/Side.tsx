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
    console.log(e);
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
  const [active, setActive] = useState('孵化准出申请');
  const menuItems = [
    {
      name: '孵化准出申请',
      id: '孵化准出申请',
      color: 'green',
      icon: null,
      textColor: '!text-[#333]',
    },
    {
      name: '孵化准出 TPC 预审',
      id: '孵化准出 TPC 预审',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#bfbfbf]',
    },
    {
      name: '孵化准出架构预审',
      id: '孵化准出架构预审',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#bfbfbf]',
    },
    {
      name: '孵化准出 QA 预审',
      id: '孵化准出 QA 预审',
      color: 'gray',
      icon: null,
      active: false,
      textColor: '!text-[#bfbfbf]',
    },
    {
      name: '准出电子流自动化处理 (TPC 建仓)',
      id: '准出电子流自动化处理 (TPC 建仓)',
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
  const { handleQueryParams } = useHandleQueryParams();
  return (
    <div
      className={classnames(
        'sticky top-[56px] m-4 mr-0 h-[calc(100vh-112px)]  overflow-auto border bg-white drop-shadow-sm'
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
          <div className="mt-6 px-5">
            {collapsed ? (
              ''
            ) : (
              <Timeline
                items={menuItems.map(({ name, color, icon, id, textColor }) => {
                  return {
                    icon,
                    color: active === id ? 'blue' : color,
                    children: (
                      <div
                        className={classnames(
                          'w-[20] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap',
                          [active === id ? '!text-[#1677ff]' : textColor]
                        )}
                        onClick={() => {
                          if (id.includes('孵化准出申请')) {
                            setActive(id);
                            handleQueryParams({ type: id });
                          }
                        }}
                      >
                        {name}
                      </div>
                    ),
                  };
                })}
              />
            )}
          </div>
        </Sider>
      </Layout>
    </div>
  );
};

export default SideMenu;
