import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { formState } from './state';
import { FormItemLabel } from './Misc';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormIsTotalScore = () => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formState);
  const isScore = snapshot.isScore;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, v) => {
    const val = event.target.value;
    formState.isScore = val === 'totalScore';
  };

  const controlProps = (item: string) => ({
    checked:
      (isScore && item == 'totalScore') || (!isScore && item == 'noTotalScore'),
    onChange: handleChange,
    value: item,
    name: 'radio-button-is-public',
  });

  return (
    <div className="mb-6">
      {/* <FormItemLabel>{t('lab:is_public_options.label')}</FormItemLabel> */}
      <FormItemLabel>是否计算模型总分</FormItemLabel>
      <div className="mb-3 flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio id="modal-public" {...controlProps('totalScore')} />
          <label htmlFor={'modal-public'} className="ml-2 cursor-pointer">
            计算总分
          </label>
        </div>
        <div className=" text-secondary">
          计算总分需要设置每个指标的权重和阈值，选择模型算法，从而计算出模型总得分。
          {/* {t('lab:is_public_options.public_desc')} */}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center">
          <CustomRadio
            id="modal-private"
            {...controlProps('noTotalScore')}
            color="secondary"
          />
          <label htmlFor="modal-private" className="ml-2 cursor-pointer">
            不计算总分
          </label>
        </div>
        <div className=" text-secondary">
          无需设置每个指标的权重和阈值，不计算模型总得分。
          {/* {t('lab:is_public_options.non_public_desc')} */}
        </div>
      </div>
    </div>
  );
};

export default FormIsTotalScore;
