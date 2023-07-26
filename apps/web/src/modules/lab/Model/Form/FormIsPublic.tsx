import React, { PropsWithChildren } from 'react';
import { FormItemLabel } from './styled';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormIsPublic = () => {
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
      <FormItemLabel>是否公开</FormItemLabel>
      <div className="mb-3 flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio id="modal-public" {...controlProps('a')} />
          <label htmlFor={'modal-public'} className="ml-2">
            公开
          </label>
        </div>
        <div className=" text-secondary">
          这是一个可公开的评估模型，允许展示到 Compass LAB
          首页以供用户参与评估演进
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio
            id="modal-private"
            {...controlProps('b')}
            color="secondary"
          />
          <label htmlFor="modal-private" className="ml-2">
            不公开
          </label>
        </div>
        <div className=" text-secondary">
          这是一个不公开的内部评估模型，我仅希望和我的协作成员进行评估演进
        </div>
      </div>
    </div>
  );
};

export default FormIsPublic;
