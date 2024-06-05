import React from 'react';
import Side from '@modules/oh/OutProcess/Side';
import Mian from '@modules/oh/OutProcess/Main';

const OutProcess = () => {
  return (
    <div className="flex flex-1 overflow-hidden bg-[#f2f2f2]">
      <Side />
      <Mian />
    </div>
  );
};

export default OutProcess;
