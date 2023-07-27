import React, { PropsWithChildren } from 'react';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    // min-w-0 can let div(flex-1) narrow with parent div
    <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-10 pt-8 md:p-0">
      {children}
    </div>
  );
};

export default Content;
