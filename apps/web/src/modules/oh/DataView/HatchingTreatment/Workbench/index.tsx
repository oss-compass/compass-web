import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Report from '@modules/oh/components/Report/ReportList';
import { queryKey } from '@modules/oh/constant';

const Main = ({ name }) => {
  // boardSandbox: <Workbench name={'沙箱项目'} />,
  // boardHatch: <Workbench name={'孵化项目'} />,
  // boardGraduateBoard: <Workbench name={'毕业项目'} />,
  let query = {
    ...queryKey,
    reportTypeList: [],
    page: 1,
    per: 100,
    status: 'success',
  };
  if ((name = '沙箱项目')) {
    query.reportTypeList = [0, 1];
  } else {
    query.reportTypeList = [2];
  }
  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {name || 'TPC 软件治理看板'}
          <div>
            {/* <Input prefix={<SearchOutlined rev={undefined} />} /> */}
          </div>
        </div>
        <div className="relative flex h-[calc(100%-60px)] justify-center">
          <Report query={query} />
        </div>
      </div>
    </div>
  );
};

export default Main;
