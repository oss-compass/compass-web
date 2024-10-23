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
      <div className="max-w-[600px] flex-1">
        <FormItemLabel>{t('lab:model_description')}</FormItemLabel>
        <Input
          disabled={disabled}
          intent={'secondary'}
          placeholder={t('common:prompt.please_enter')}
          value={snapshot.description}
          onChange={(value) => {
            if (value.length > 500) {
              return;
            }
            actions.onDescriptionChange(value);
          }}
        />
      </div>
    </div>
  );
};

export default FormTitle;
