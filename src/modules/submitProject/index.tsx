import React, { PropsWithChildren } from 'react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import Auth from './Misc/Auth';
import NoSsr from '@common/components/NoSsr';

const SubmitProject: React.FC<
  PropsWithChildren<{
    providers: Record<
      LiteralUnion<BuiltInProviderType, string>,
      ClientSafeProvider
    >;
  }>
> = ({ providers, children }) => {
  return (
    <>
      <div className="mx-auto w-[1000px] pb-20 md:w-full">
        <div className="w-[560px] pb-10 pt-10 md:w-full md:px-4">
          <Auth providers={providers} />
        </div>
        <NoSsr>{children}</NoSsr>
      </div>
    </>
  );
};

export default SubmitProject;
