import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { formState } from './state';
import { FormItemLabel } from './Misc';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormIsTotalScore = () => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formState);
  const isScore = snapshot.isScore;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, v) => {
    const val = event.target.value;
    formState.isScore = val === 'totalScore';
  };

  const controlProps = (item: string) => ({
    checked:
      (isScore && item == 'totalScore') || (!isScore && item == 'noTotalScore'),
    onChange: handleChange,
    value: item,
    name: 'radio-button-is-public',
  });

  return (
    <div className="mb-6">
      {/* <FormItemLabel>{t('lab:is_score_options.label')}</FormItemLabel> */}
      <FormItemLabel>{t('lab:is_score_options.label')}</FormItemLabel>
      <div className="mb-3 flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio id="modal-public" {...controlProps('totalScore')} />
          <label htmlFor={'modal-public'} className="ml-2 cursor-pointer">
            {t('lab:is_score_options.score')}
          </label>
        </div>
        <div className="line-clamp-1 text-secondary">
          {t('lab:is_score_options.score_desc')}
          {/* {t('lab:is_public_options.public_desc')} */}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio
            id="modal-private"
            {...controlProps('noTotalScore')}
            color="secondary"
          />
          <label htmlFor="modal-private" className="ml-2 cursor-pointer">
            {t('lab:is_score_options.non_score')}
          </label>
        </div>
        <div className="line-clamp-1 text-secondary">
          {t('lab:is_score_options.non_score_desc')}
          {/* {t('lab:is_public_options.non_public_desc')} */}
        </div>
      </div>
    </div>
  );
};

export default FormIsTotalScore;
