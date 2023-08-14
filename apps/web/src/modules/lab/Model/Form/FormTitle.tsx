import React, { PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import { formState, actions } from './state';
import { FormItemLabel } from './Misc';

const FormTitle = ({ disabled }: { disabled: boolean }) => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formState, { sync: true });
  return (
    <div className="mb-6 flex">
      <div className="w-36">
        <FormItemLabel>{t('lab:ecological_dimension')}</FormItemLabel>
        <Select
          disabled={disabled}
          rootClassNames={'w-36'}
          placeholder={t('common:prompt.please_enter')}
          value={snapshot.dimension}
          onChange={(e, value) => {
            actions.onDimensionChange(value as number);
          }}
        >
          <SelectOption value={0}>
            {t('common:topic.productivity')}
          </SelectOption>
          <SelectOption value={1}>{t('common:topic.robustness')}</SelectOption>
          <SelectOption value={2}>
            {t('common:topic.niche_creation')}
          </SelectOption>
        </Select>
      </div>
      <div className="max-w-[600px] flex-1 pl-2">
        <FormItemLabel>{t('lab:model_name')}</FormItemLabel>
        <Input
          disabled={disabled}
          intent={'secondary'}
          placeholder={t('common:prompt.please_enter')}
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
