import React, { PropsWithChildren } from 'react';

export const Title: React.FC<PropsWithChildren> = ({ children }) => (
  <h3 className="mb-6 pt-6 text-3xl">{children}</h3>
);
