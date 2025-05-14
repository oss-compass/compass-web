import React, { useEffect, useState } from 'react';
import { Tag, Collapse } from 'antd';
import EndpointTab from './EndpointTab';
// import { CaretRightOutlined } from '@ant-design/icons';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

const APICollapse = ({ menus }) => {
  console.log(menus);
  // const id = useHashchangeEvent();
  // const [activeKey, setActiveKey] = useState<string[]>([]);

  // // 监听hash和菜单数据变化
  // useEffect(() => {
  //   if (id && menus?.length) {
  //     const targetEndpoint = menus.find((e) => e.id === id);
  //     if (targetEndpoint) {
  //       setTimeout(()=>{
  //         setActiveKey([targetEndpoint.id]); // 设置匹配的activeKey
  //       })
  //     }
  //   }
  // }, [id, menus]);

  return (
    <Collapse
      bordered={false}
      // activeKey={activeKey}
      // expandIcon={({ isActive }) => (
      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
      // )}
      className="bg-white"
      items={menus?.map((endpoint) => {
        return {
          key: endpoint.id,
          children: <EndpointTab endpoint={endpoint} />,
          label: (
            <div className="flex items-center">
              <Tag
                className="mt-[1px]"
                color={endpoint.method === 'GET' ? 'green' : 'blue'}
              >
                {endpoint.method}
              </Tag>
              <span
                id={endpoint.id}
                className="ml-2 scroll-mt-[100px] text-xl font-semibold"
              >
                {endpoint.description}
              </span>
            </div>
          ),
        };
      })}
    ></Collapse>
  );
};

const APIGroupPanel = ({ group }) => {
  const hasSub = group.menus.some((menu) => menu?.subMenus);
  console.log(group, hasSub);
  return (
    <>
      {hasSub ? (
        group.menus.map((item) => {
          return (
            <>
              <div className="mb-4 mt-4 ml-4 flex items-center gap-4 text-xl font-semibold">
                <div className="relative h-2 w-2 rounded bg-[#000000]"></div>
                {item.convertName}
              </div>
              <APICollapse menus={item.subMenus} />
            </>
          );
        })
      ) : (
        <APICollapse menus={group.menus} />
      )}
    </>
  );
};
export default APIGroupPanel;
