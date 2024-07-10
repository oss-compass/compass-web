import { TbMessage2 } from 'react-icons/tb';
import React, { useState } from 'react';
import { Badge } from 'antd';

const RiskBadge = ({ key }) => {
  console.log(key);
  return (
    <div
      title="风险澄清"
      className="flex w-8 flex-shrink-0 items-center justify-center"
    >
      <Badge count={0} size="small">
        <TbMessage2 className="text-xl" />
      </Badge>
      {/* <span className="text-base font-bold">{item.score * 10}</span> */}
    </div>
  );
};

export default RiskBadge;
