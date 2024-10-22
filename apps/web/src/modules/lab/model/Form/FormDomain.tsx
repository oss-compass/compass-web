import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { formState } from './state';
import { FormItemLabel } from './Misc';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormDomain = ({ disabled }: { disabled: boolean }) => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formState);
  const isScore = snapshot.isScore;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    formState.isScore = val === 'general';
  };

  const controlProps = (item: string) => ({
    checked: (isScore && item == 'general') || (!isScore && item == 'other'),
    onChange: handleChange,
    value: item,
    name: 'radio-button-domain',
    disabled,
  });

  return (
    <div className="mb-6">
      <FormItemLabel>
        {t(
          'lab:industry_options.is_it_applicable_to_general_industries_fields'
        )}
      </FormItemLabel>
      <div className="flex">
        <div className="flex w-40 items-center">
          <CustomRadio id="general-domain" {...controlProps('general')} />
          <label className="ml-2 cursor-pointer" htmlFor="general-domain">
            {t('lab:industry_options.yes')}
          </label>
        </div>
        <div className="flex items-center">
          <CustomRadio
            id="specific-domain"
            {...controlProps('other')}
            color="secondary"
          />
          <label className="ml-2 cursor-pointer" htmlFor="specific-domain">
            {t('lab:industry_options.not')}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormDomain;
