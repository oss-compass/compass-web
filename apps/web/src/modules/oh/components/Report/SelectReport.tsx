import React, { useState } from 'react';
import Report from '@modules/oh/components/Report/ReportList';
import { queryKey } from '@modules/oh/constant';

const SelectReport = ({ getReport }) => {
  let query = {
    ...queryKey,
    reportTypeList: [0, 1],
    page: 1,
    per: 100,
    status: 'success',
  };
  return (
    <>
      <Report
        query={query}
        selectFun={(item) => {
          getReport(item);
        }}
      />
    </>
  );
};
export default SelectReport;
