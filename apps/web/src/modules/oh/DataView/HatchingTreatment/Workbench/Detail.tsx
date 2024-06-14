import React from 'react';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import { AiOutlineLeftCircle } from 'react-icons/ai';

const Detail = ({ setActiveItem }) => {
  return (
    <>
      {/* <div className="relative flex  h-[calc(100vh-170px)] flex-1  flex-col border bg-white  drop-shadow-sm"> */}
      {/* <div className="oh-tabs flex items-center border-b px-5 py-3 font-semibold">
          <AiOutlineLeftCircle
            onClick={() => {
              setActiveItem(null);
            }}
            className="mr-2  cursor-pointer text-2xl text-[#3f60ef]"
          />
          TPC 软件选型评估报告
        </div> */}
      <div className="mb-6 h-[calc(100%-24px)] overflow-auto p-5">
        <EvaluationDetail
          back={() => {
            setActiveItem(null);
          }}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default Detail;
