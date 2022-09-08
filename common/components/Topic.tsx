import React, { PropsWithChildren } from 'react';

const Topic: React.FC<PropsWithChildren> = ({ children }) => (
  <h1 className="mt-14 mb-6 text-3xl">{children}</h1>
);

export default Topic;
