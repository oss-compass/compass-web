import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

const NonSSRWrapper = (props: { children?: ReactNode | undefined }) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
