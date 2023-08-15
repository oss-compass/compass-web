import React, { useState } from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';
import AnalyzeChart from './component/AnalyzeChart';
import CommentDrawer from './CommentDrawer';

const ModelVersionAnalyzePage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative flex flex-1">
      <div className="bg-smoke relative min-w-0 flex-1">
        <AnalyzeChart />
      </div>

      {open ? null : (
        <div
          className="border-silver hover:bg-smoke fixed top-[200px] right-0 flex h-10 w-12 cursor-pointer items-center  justify-center rounded-l-full border bg-white pl-1"
          onClick={() => {
            setOpen(true);
          }}
        >
          <BiMessageAltDetail className="text-xl" />
        </div>
      )}

      <CommentDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ModelVersionAnalyzePage;
