import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormItemLabel } from '../Misc';
import { useSnapshot } from 'valtio';
import { formState, actions } from '../state';
import { SelectedItemCard, ItemCardPlus } from './SelectedItem';
import ModalSelect from './Modal';

const FormMetric = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const snapshot = useSnapshot(formState);
  const metricSetLength = snapshot.metricSet.length;

  return (
    <div className="mb-6">
      <FormItemLabel>{t('lab:add_metric')}</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        {snapshot.metricSet.map((i) => {
          return (
            <SelectedItemCard
              key={i.metricId}
              category={i.category}
              ident={i.ident}
              onHandleDelete={() => {
                actions.onDeleteMetricItem(i.ident);
              }}
            />
          );
        })}
        {metricSetLength < 10 ? (
          <ItemCardPlus
            onHandleAdd={() => {
              setOpen(true);
            }}
          />
        ) : null}
      </div>

      <ModalSelect
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default FormMetric;
