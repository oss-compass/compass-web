import React from 'react';
import Pie from '@modules/oh/components/Pie';

const MiniEvaluationDetail = ({ score, evaluationDetail }) => (
  <div className="flex h-40 bg-[#fafafa]">
    <div className="flex h-full w-28 items-center">
      <Pie score={score} />
    </div>
    <div className="flex-1 pr-3 pt-3">
      {evaluationDetail.map(({ name, score }) => (
        <div
          key={name}
          className="mb-2 flex h-7 w-full border bg-white text-sm"
        >
          <div className="flex min-w-[90px] items-center justify-start px-3 font-semibold">
            {name}
          </div>
          <div className="flex w-[40px] items-center justify-center bg-[#e5e5e5] px-2 font-semibold">
            {score}
          </div>
          <div className="flex flex-1 items-center justify-center px-3">
            <div className="h-1 w-full bg-[#e5e5e5]">
              <div
                className="h-1 bg-[#4ade80]"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default MiniEvaluationDetail;
