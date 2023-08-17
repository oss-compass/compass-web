import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { formState } from './state';
import { FormItemLabel } from './Misc';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormIsPublic = ({ disabled }: { disabled: boolean }) => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formState);
  const isPublic = snapshot.isPublic;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, v) => {
    const val = event.target.value;
    formState.isPublic = val === 'public';
  };

  const controlProps = (item: string) => ({
    checked: (isPublic && item == 'public') || (!isPublic && item == 'private'),
    onChange: handleChange,
    value: item,
    name: 'radio-button-is-public',
    disabled,
  });

  return (
    <div className="mb-6">
      <FormItemLabel>{t('lab:is_public_options.label')}</FormItemLabel>
      <div className="mb-3 flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio id="modal-public" {...controlProps('public')} />
          <label htmlFor={'modal-public'} className="ml-2 cursor-pointer">
            {t('lab:is_public_options.public')}
          </label>
        </div>
        <div className=" text-secondary">
          {' '}
          {t('lab:is_public_options.public_desc')}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio
            id="modal-private"
            {...controlProps('private')}
            color="secondary"
          />
          <label htmlFor="modal-private" className="ml-2 cursor-pointer">
            {t('lab:is_public_options.non_public')}
          </label>
        </div>
        <div className=" text-secondary">
          {t('lab:is_public_options.non_public_desc')}
        </div>
      </div>
    </div>
  );
};

export default FormIsPublic;
