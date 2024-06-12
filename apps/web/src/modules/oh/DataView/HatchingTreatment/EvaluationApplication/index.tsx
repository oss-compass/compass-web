import React from 'react';
import EvaluationApplication from './EvaluationApplication';

const Main = () => {
  return (
    <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
      <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
        TPC 评估报告生成
      </div>
      <EvaluationApplication />
    </div>
  );
};

export default Main;
