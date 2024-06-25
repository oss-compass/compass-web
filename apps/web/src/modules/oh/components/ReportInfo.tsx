import React, { useState } from 'react';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';

const ReportInfo = ({ report }) => {
  return (
    <div className="pt-3">
      <EvaluationDetail item={report} />
    </div>
  );
};
export default ReportInfo;
