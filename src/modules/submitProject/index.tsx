import React, { PropsWithChildren } from 'react';
import Auth from './Misc/Auth';
import NoSsr from '@common/components/NoSsr';

const SubmitProject: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="mx-auto w-[1000px] pb-20 md:w-full">
        <div className="w-[560px] pb-10 pt-10 md:w-full md:px-4">
          <Auth />
        </div>
        <NoSsr>{children}</NoSsr>
      </div>
    </>
  );
};

export default SubmitProject;
