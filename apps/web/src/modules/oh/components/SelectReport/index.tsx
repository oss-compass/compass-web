import React, { useState } from 'react';
import Report from '@modules/oh/components/SelectReport/Report';
import { queryKey } from '@modules/oh/constant';

const SelectReport = ({ getReport }) => {
  const [selected, setSelected] = useState(null);
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
        selected={selected}
        selectFun={(item) => {
          setSelected(item);
          getReport(item);
        }}
      />
    </>
  );
};
export default SelectReport;
