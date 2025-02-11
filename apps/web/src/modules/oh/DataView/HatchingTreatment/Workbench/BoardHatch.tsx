import React, { useState } from 'react';

const Main = () => {
  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          孵化项目
          <div>
            {/* <Input prefix={<SearchOutlined rev={undefined} />} /> */}
          </div>
        </div>
        <div className="relative flex h-[calc(100%-60px)] justify-center">
          <div className="py-10 text-center text-gray-400">暂无数据</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
