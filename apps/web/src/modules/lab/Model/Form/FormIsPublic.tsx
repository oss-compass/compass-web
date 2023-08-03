import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { formState } from './state';
import { FormItemLabel } from './styled';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormIsPublic = () => {
  const snapshot = useSnapshot(formState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, v) => {
    console.log(v);
  };

  const controlProps = (item: string) => ({
    // eslint-disable-next-line valtio/state-snapshot-rule
    checked: snapshot.isPublic,
    onChange: handleChange,
    value: item,
    name: 'radio-button-is-public',
  });

  return (
    <div className="mb-6">
      <FormItemLabel>是否公开</FormItemLabel>
      <div className="mb-3 flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio id="modal-public" {...controlProps('1')} />
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
            {...controlProps('2')}
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
