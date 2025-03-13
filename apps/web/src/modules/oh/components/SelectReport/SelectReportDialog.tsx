import React, { useState } from 'react';
import { queryKey } from '@modules/oh/constant';
import { Input } from 'antd';
import CommonReport from '@modules/oh/components/SelectReport/CommonReport';

const SelectReportDialog = ({
  getReport,
  fetcher,
  getMetricScore,
  GetReportComponent,
  reportMetricName,
}) => {
  const { Search } = Input;
  const [value, setValue] = useState('');

  let query = {
    ...queryKey,
    filterOpts: [
      {
        type: 'code_url',
        values: [value],
      },
      {
        type: 'status',
        values: ['success'],
      },
    ],
    reportTypeList: [0, 1],
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
      <CommonReport
        query={query}
        selectFun={(item) => {
          getReport(item);
        }}
        fetcher={fetcher}
        getMetricScore={getMetricScore}
        GetReportComponent={GetReportComponent}
        reportMetricName={reportMetricName}
      />
    </>
  );
};
export default SelectReportDialog;
