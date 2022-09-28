import React, { PropsWithChildren } from 'react';

const WithHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default WithHeader;
