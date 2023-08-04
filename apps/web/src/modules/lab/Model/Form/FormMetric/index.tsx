import React, { useState } from 'react';
import { FormItemLabel } from '../styled';
import { useSnapshot } from 'valtio';
import { formState } from '../state';
import { SelectedItemCard, ItemCardPlus } from './MetricCard';
import ModalContent from './ModalContent';

const FormMetric = () => {
  const [open, setOpen] = useState(false);
  const snapshot = useSnapshot(formState);

  return (
    <div className="mb-6">
      <FormItemLabel>选择度量指标</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        {snapshot.metricSet.map((i) => {
          return <SelectedItemCard key={i.id} ident={i.ident} />;
        })}
        <ItemCardPlus
          onHandleAdd={() => {
            setOpen(true);
          }}
        />
      </div>

      <ModalContent
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default FormMetric;
