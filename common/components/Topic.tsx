import React, { PropsWithChildren } from 'react';

const Topic: React.FC<PropsWithChildren> = ({ children }) => (
  <h1 className="mt-14 mb-6 text-3xl md:mt-9 md:mb-4 md:px-4 md:text-xl md:font-semibold">
    {children}
  </h1>
);

export default Topic;
