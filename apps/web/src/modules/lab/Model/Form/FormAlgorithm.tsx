import React from 'react';
import { FormItemLabel } from './styled';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormAlgorithm = () => {
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
      <FormItemLabel>选择算法</FormItemLabel>
      <div className="mb-3 flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio id="modal-public" {...controlProps('a')} />
          <label htmlFor={'modal-public'} className="ml-2">
            系统默认算法
          </label>
        </div>
        <div className=" text-secondary">
          使用 Compass 系统的默认值设置度量指标的权重
        </div>
      </div>
      {/*<div className="flex items-center">*/}
      {/*  <div className="flex w-40 items-center">*/}
      {/*    <CustomRadio*/}
      {/*      id="modal-private"*/}
      {/*      {...controlProps('b')}*/}
      {/*      color="secondary"*/}
      {/*    />*/}
      {/*    <label htmlFor="modal-private" className="ml-2">*/}
      {/*      AIAIAI算法*/}
      {/*    </label>*/}
      {/*  </div>*/}
      {/*  <div className=" text-secondary">算法介绍文案，设置度量指标的权重</div>*/}
      {/*</div>*/}

      <div className="border border-[#D6B76B] bg-[#FFF6D5] py-3 px-4">
        对模型算法有更多想法？欢迎进入官方 Slack 社区或微信群与我们讨论。
      </div>
    </div>
  );
};

export default FormAlgorithm;
