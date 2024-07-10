import { TbMessage2 } from 'react-icons/tb';
import React, { useState } from 'react';
import { Badge } from 'antd';
import { useGetRisk } from '@modules/oh/store/UserRiskStore';
import { CheckOutlined } from '@ant-design/icons';

const RiskBadge = ({ shortCode, keyId }) => {
  const { count, state } = useGetRisk(shortCode, keyId);
  console.log(keyId, count, state);
  return (
    <div
      title="风险澄清"
      className="flex w-8 flex-shrink-0 items-center justify-center"
    >
      <Badge
        count={
          state === 1 ? (
            <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
              <CheckOutlined
                rev={undefined}
                className="rounded-full text-xs text-white"
              />
            </div>
          ) : (
            count
          )
        }
        size="small"
        style={{ backgroundColor: state === 1 ? '#52c41a' : 'red' }}
      >
        <TbMessage2 className="text-xl" />
      </Badge>
      {/* <span className="text-base font-bold">{item.score * 10}</span> */}
    </div>
  );
};

export default RiskBadge;
