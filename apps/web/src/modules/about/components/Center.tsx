import React, { PropsWithChildren } from 'react';

const Center: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-black py-[80px] text-white/90">
      <div className="mx-auto  w-[1000px]">{children}</div>
    </div>
  );
};

export default Center;
