import React, { useState } from 'react';
import ReportList from '@modules/oh/components/Report/ReportList';
import { queryKey } from '@modules/oh/constant';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SelectReport = ({ getReport }) => {
  const { Search } = Input;
  const [value, setValue] = useState('');

  let query = {
    ...queryKey,
    filterOpts: [
      {
        type: 'code_url',
        values: [value],
      },
    ],
    reportTypeList: [0, 1],
    page: 1,
    per: 100,
    status: 'success',
  };

  return (
    <>
      <div className="oh-tabs mr-8 mb-4 flex items-center gap-8">
        <p className="flex-shrink-0 text-xl font-semibold">选择软件</p>
        <div className="max-w-[400px]">
          <Search
            enterButton
            placeholder=""
            onSearch={(value) => {
              setValue(value);
            }}
            onKeyDown={(event) => {
              if (event.key == 'Enter' || event.code == 'Enter') {
                let value = (event.target as HTMLInputElement).value;
                setValue(value);
                event.preventDefault();
              }
            }}
          />
        </div>
      </div>
      <ReportList
        query={query}
        selectFun={(item) => {
          getReport(item);
        }}
      />
    </>
  );
};
export default SelectReport;
