import React, { PropsWithChildren } from 'react';
import { FormItemLabel } from './styled';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormTitle = () => {
  return (
    <div className="mb-6 flex">
      <div className="w-36">
        <FormItemLabel>所属生态维度</FormItemLabel>
        <Select rootClassNames={'w-36'} defaultValue={1} placeholder="请选择">
          <SelectOption value={1}>生产力</SelectOption>
          <SelectOption value={2}>嘻嘻嘻</SelectOption>
        </Select>
      </div>
      <div className="max-w-[600px] flex-1 pl-2">
        <FormItemLabel>模型名称</FormItemLabel>
        <Input intent={'secondary'} placeholder="请输入" />
      </div>
    </div>
  );
};

export default FormTitle;
