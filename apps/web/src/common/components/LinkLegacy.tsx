import React, { ComponentProps, PropsWithChildren } from 'react';

const LinkLegacy: React.FC<
  PropsWithChildren<{ href: string } & ComponentProps<'a'>>
> = ({ children, href, ...props }) => (
  <a href={href} className="text-primary mx-1 inline-block" {...props}>
    {children}
  </a>
);

export default LinkLegacy;
