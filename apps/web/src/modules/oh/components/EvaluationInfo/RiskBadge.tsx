import React from 'react';
import { Badge, Popover } from 'antd';
import { useGetRisk } from '@modules/oh/store/useRiskStore';
import { CheckOutlined } from '@ant-design/icons';
import { TbMessage2 } from 'react-icons/tb';

const RiskBadge = ({ shortCode, keyId }) => {
  const { count, metricState } = useGetRisk(shortCode, keyId);
  let BadgeContent = null;

  if (metricState?.state === 1) {
    BadgeContent = (
      <Popover content={`风险澄清已确认；确认人：${metricState.user.name}123`}>
        <Badge
          count={
            <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
              <CheckOutlined
                rev={undefined}
                className="rounded-full text-xs text-white"
              />
            </div>
          }
          size="small"
          style={{
            backgroundColor: '#52c41a',
          }}
        >
          <TbMessage2 className="text-xl" />
        </Badge>
      </Popover>
    );
  } else {
    BadgeContent = (
      <Popover content={'查看风险澄清'}>
        <Badge
          count={count}
          size="small"
          style={{
            backgroundColor: 'red',
          }}
        >
          <TbMessage2 className="text-xl" />
        </Badge>
      </Popover>
    );
  }
  return (
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {BadgeContent}
    </div>
  );
};

export default RiskBadge;
