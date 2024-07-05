import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Report from '@modules/oh/components/Report/ReportList';
import { queryKey } from '@modules/oh/constant';

const Main = () => {
  // boardSandbox: <Workbench name={'沙箱项目'} />,
  // boardHatch: <Workbench name={'孵化项目'} />,
  // boardGraduateBoard: <Workbench name={'毕业项目'} />,
  let query = {
    ...queryKey,
    reportTypeList: [0, 1],
    page: 1,
    per: 100,
    status: 'success',
  };
  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          沙箱项目
          <div>
            {/* <Input prefix={<SearchOutlined rev={undefined} />} /> */}
          </div>
        </div>
        <div className="relative flex h-[calc(100%-60px)] justify-center">
          {/* <Report query={query} /> */}
          <div className="py-10 text-center text-gray-400">暂无数据</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
