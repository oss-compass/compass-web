import React, { useState } from 'react';
import NavBar from '@modules/analyze/components/NavBar';
import { BiMessageAltDetail } from 'react-icons/bi';
import CommentDrawer from './CommentDrawer';

const ModelVersionView = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative flex flex-1">
      <div className="bg-smoke flex-1"></div>

      {open ? null : (
        <div
          className="border-silver hover:bg-smoke fixed top-[100px] right-0 flex h-10 w-12 cursor-pointer items-center  justify-center rounded-l-full border bg-white pl-1"
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

export default ModelVersionView;
