import React from 'react';
import { Tag, Collapse } from 'antd';
import EndpointTab from './EndpointTab';
// import { CaretRightOutlined } from '@ant-design/icons';
// import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

const APIGroupPanel = ({ group }) => {
  return (
    <Collapse
      bordered={false}
      // activeKey={activeKey}
      // expandIcon={({ isActive }) => (
      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
      // )}
      className="bg-white"
      items={group.menus.map((endpoint) => {
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
export default APIGroupPanel;
