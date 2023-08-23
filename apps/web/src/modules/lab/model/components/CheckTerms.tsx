import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import LabTerms from './LabTerms';

const CheckTerms = ({
  select,
  setSelect,
}: {
  select: boolean;
  setSelect: (e: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="my-6  text-sm text-black">
        <input
          id="agreed_to_the_term"
          className="mr-2"
          checked={select}
          type="checkbox"
          onChange={() => {
            setSelect(!select);
          }}
        />
        <label htmlFor="agreed_to_the_term">
          {t('lab:i_have_understood_and_agreed_to_the')}
        </label>
        <span
          className="text-primary ml-2 cursor-pointer "
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
                setSelect(true);
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
