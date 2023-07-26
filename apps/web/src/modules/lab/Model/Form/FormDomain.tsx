import React, { PropsWithChildren } from 'react';
import { FormItemLabel } from './styled';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormDomain = () => {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className="mb-6">
      <FormItemLabel>是否适用于通用行业/领域</FormItemLabel>
      <div className="flex">
        <div className="flex w-40 items-center">
          <CustomRadio id="general-domain" {...controlProps('a')} />
          <label className="ml-2" htmlFor="general-domain">
            是的
          </label>
        </div>
        <div className="flex items-center">
          <CustomRadio
            id="specific-domain"
            {...controlProps('b')}
            color="secondary"
          />
          <label className="ml-2" htmlFor="specific-domain">
            不是，这是个特定行业的专属模型
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormDomain;
