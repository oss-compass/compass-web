import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LabTerms from '@modules/lab/components/LabTerms';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';

const CheckTerms = ({
  select,
  setSelect,
}: {
  select: boolean;
  setSelect: () => void;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="my-6  text-sm text-black">
        <input
          className="mr-2"
          checked={select}
          type="checkbox"
          onChange={() => {
            setSelect();
          }}
        />
        {t('lab:i_have_understood_and_agreed_to_the')}{' '}
        <span
          className="text-primary cursor-pointer "
          onClick={() => {
            setOpen(true);
          }}
        >
          {t('lab:experimental_model_terms_of_use')}
        </span>
      </div>
      <Dialog
        open={open}
        maxWidth={'xl'}
        dialogContent={<LabTerms />}
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
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CheckTerms;
