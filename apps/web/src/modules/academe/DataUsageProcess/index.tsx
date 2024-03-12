import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Dialog, { Transition } from '@common/components/Dialog';
import classnames from 'classnames';
import { Button } from '@oss-compass/ui';
import DataTerms from './DataTerms';

const DataUsageProcess = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        classes={{
          paper: classnames(
            'border-2 border-black w-[840px] !max-w-[840px] !rounded-none !m-0 md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogContent={<DataTerms />}
        handleClose={() => {
          setOpen(false);
        }}
        dialogActions={
          <>
            <Button
              intent="text"
              size="sm"
              className="mr-2"
              onClick={() => {
                setOpen(false);
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </>
        }
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
          {t('academe:data_usage_process')}
        </a>
      </div>
    </>
  );
};
export default DataUsageProcess;
