import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import { formState, actions } from './state';
import { FormItemLabel } from './styled';

const FormVersionTitle = () => {
  const snapshot = useSnapshot(formState, { sync: true });
  return (
    <div className="mb-6 flex">
      <div className="max-w-[600px] flex-1 ">
        <FormItemLabel>版本名称</FormItemLabel>
        <Input
          intent={'secondary'}
          placeholder="请输入"
          value={snapshot.version}
          onChange={(value) => {
            actions.onVersionNameChange(value);
          }}
        />
      </div>
    </div>
  );
};

export default FormVersionTitle;
