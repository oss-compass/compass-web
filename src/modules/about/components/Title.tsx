import React, { PropsWithChildren } from 'react';

export const Title: React.FC<PropsWithChildren<{ id?: string }>> = ({
  id,
  children,
}) => {
  const restProps: any = {};
  if (id) {
    restProps.id = id;
  }
  return (
    <h3 className="mb-10 text-3xl font-medium" {...restProps}>
      {children}
    </h3>
  );
};

export const DocTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <h3 className="mb-6 text-3xl font-medium">{children}</h3>
);
