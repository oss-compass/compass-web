import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Dialog, { Transition } from '@common/components/Dialog';
import classnames from 'classnames';
import { MdEmail } from 'react-icons/md';

const Coutact = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        classes={{
          paper: classnames(
            'border-2 border-black w-[640px] !max-w-[640px] !rounded-none !m-0 md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogContent={
          <>
            <div className="flex items-center justify-center text-base">
              <MdEmail />
              Email:
              <a
                className="ml-2 mb-0.5 text-[#002fa7]"
                href="mailto:contact@oss-compass.org"
              >
                contact@oss-compass.org
              </a>
            </div>
          </>
        }
        handleClose={() => {
          setOpen(false);
        }}
      />
      <div
        className="h-10 cursor-pointer bg-gradient-to-r from-[#72D74F] to-[#27AE65] px-4 text-center text-sm leading-10 text-[#fff]"
        onClick={() => {
          setOpen(true);
        }}
      >
        <a
          // href="mailto:contact@oss-compass.org"
          title="contact@oss-compass.org"
        >
          {t('academe:submit_your_application_now')}
        </a>
      </div>
    </>
  );
};
export default Coutact;
