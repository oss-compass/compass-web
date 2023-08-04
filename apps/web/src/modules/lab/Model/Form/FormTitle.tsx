import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import { formState, actions } from './state';
import { FormItemLabel } from './styled';

const FormTitle = () => {
  const snapshot = useSnapshot(formState);
  return (
    <div className="mb-6 flex">
      <div className="w-36">
        <FormItemLabel>所属生态维度</FormItemLabel>
        <Select
          rootClassNames={'w-36'}
          placeholder="请选择"
          value={snapshot.dimension}
          onChange={(e, value) => {
            actions.onDimensionChange(value as number);
          }}
        >
          <SelectOption value={0}>生产力</SelectOption>
          <SelectOption value={1}>稳健性</SelectOption>
          <SelectOption value={2}>创新力</SelectOption>
        </Select>
      </div>
      <div className="max-w-[600px] flex-1 pl-2">
        <FormItemLabel>模型名称</FormItemLabel>
        <Input
          intent={'secondary'}
          placeholder="请输入"
          value={snapshot.name}
          onChange={(value) => {
            actions.onNameChange(value);
          }}
        />
      </div>
    </div>
  );
};

export default FormTitle;
