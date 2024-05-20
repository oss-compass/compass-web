import React, { useState } from 'react';
import Dialog from '@common/components/Dialog';
import { GrClose } from 'react-icons/gr';
import RepoTable from './RepoTable/index';
import SigTable from './SigTable';
import EmployerTable from './EmployerTable';
import EmployerOverView from './OverView';

const CommunityContributions = () => {
  const [openConfirm, setOpenConfirm] = useState(true);

  return (
    <>
      <RepoTable />
      {/* <SigTable /> */}
      <EmployerTable />
      <Dialog
        open={openConfirm}
        classes={{
          paper:
            'border !bg-[#f9fafb] w-[95%] !max-w-[95%] min-h-[400px] !m-0 md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none',
        }}
        dialogTitle={
          <>
            <p className=""></p>
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
          </>
        }
        dialogContent={
          <div className="w-full">
            <EmployerOverView />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};

export default CommunityContributions;
