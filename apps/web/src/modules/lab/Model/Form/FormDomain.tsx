import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { formState } from './state';
import { FormItemLabel } from './styled';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormDomain = () => {
  const snapshot = useSnapshot(formState);
  const isGeneral = snapshot.isGeneral;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    formState.isGeneral = val === 'general';
  };

  const controlProps = (item: string) => ({
    checked:
      (isGeneral && item == 'general') || (!isGeneral && item == 'other'),
    onChange: handleChange,
    value: item,
    name: 'radio-button-domain',
  });

  return (
    <div className="mb-6">
      <FormItemLabel>是否适用于通用行业/领域</FormItemLabel>
      <div className="flex">
        <div className="flex w-40 items-center">
          <CustomRadio id="general-domain" {...controlProps('general')} />
          <label className="ml-2 cursor-pointer" htmlFor="general-domain">
            是的
          </label>
        </div>
        <div className="flex items-center">
          <CustomRadio
            id="specific-domain"
            {...controlProps('other')}
            color="secondary"
          />
          <label className="ml-2 cursor-pointer" htmlFor="specific-domain">
            不是，这是个特定行业的专属模型
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormDomain;
