import React, { useState } from 'react';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Main = () => {
  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col bg-white drop-shadow-sm md:p-0 lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs relative flex h-[calc(100%-100px)] items-center justify-center overflow-auto py-3">
          <Result
            icon={<SmileOutlined />}
            title="敬请期待!"
            subTitle="很抱歉！该功能尚未上线~"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
