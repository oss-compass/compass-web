import React, { PropsWithChildren } from 'react';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="flex flex-1">{children}</main>;
};

export default Main;
