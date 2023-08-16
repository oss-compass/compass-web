import React, { useState } from 'react';
import OpenCommentDrawerFixedButton from './component/FixedCommentButton';
import CommentDrawer from './CommentDrawer';
import ChartPanel from './ChartPanel';

const ModelVersionAnalyzePage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative flex flex-1">
      <div className="bg-smoke relative min-w-0 flex-1">
        <ChartPanel />
      </div>

      <CommentDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      {open ? null : (
        <OpenCommentDrawerFixedButton
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default ModelVersionAnalyzePage;
