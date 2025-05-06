import React from 'react';
import { Tag, Collapse } from 'antd';
import EndpointTab from './EndpointTab';
// import { CaretRightOutlined } from '@ant-design/icons';
// import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

const { Panel } = Collapse;

const APIGroupPanel = ({ group }) => {
  // const activeId = useHashchangeEvent();

  // const activeKey = useMemo(() => {
  //   return [activeId];
  // }, [activeId]);
  return (
    <Collapse
      bordered={false}
      // activeKey={activeKey}
      // expandIcon={({ isActive }) => (
      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
      // )}
      className="bg-white p-3"
    >
      {group.menus.map((endpoint) => (
        <Panel
          key={endpoint.id}
          header={
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
          }
        >
          <EndpointTab endpoint={endpoint} />
        </Panel>
      ))}
    </Collapse>
  );
};
export default APIGroupPanel;
