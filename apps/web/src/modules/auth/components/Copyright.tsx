import React from 'react';

const Copyright = () => {
  return (
    <div className="fixed bottom-12 w-full px-6 text-center text-xs text-slate-600">
      <p className="">
        Copyright©{new Date().getFullYear()} OSS-Compass. All Rights Reserved.
      </p>
    </div>
  );
};

export default Copyright;
