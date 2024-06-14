import React, { useState } from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import {
  procseeState,
  procseeActions,
  pointColorMap,
  textColorMap,
} from '@modules/oh/DataView/HatchingTreatment/OutProcess/OutProcseeState';
import { useSnapshot } from 'valtio';

const SideMenu: React.FC = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const snap = useSnapshot(procseeState);
  const { active, allProcesses } = snap;

  const menuClick = (id: string) => {
    procseeActions.setActive(id);
  };
  return (
    <div
      className={classnames(
        'mr-0 h-[calc(100vh-170px)] overflow-auto border bg-white drop-shadow-sm'
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
              'flex w-full justify-between border-b p-5 py-3 pb-[15px]',
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
                items={allProcesses.map(({ name, icon, id, state }) => {
                  return {
                    icon,
                    color:
                      id === active
                        ? pointColorMap['active']
                        : pointColorMap[state],
                    children: (
                      <div
                        className={classnames(
                          'w-[20] overflow-hidden text-ellipsis whitespace-nowrap',
                          [
                            id === active
                              ? textColorMap['active']
                              : textColorMap[state],
                            state == 'wait'
                              ? 'cursor-not-allowed'
                              : ' cursor-pointer',
                          ]
                        )}
                        onClick={() => {
                          if (state !== 'wait') {
                            menuClick(id);
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
