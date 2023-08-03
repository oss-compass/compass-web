import React, { useState, ReactNode, PropsWithChildren } from 'react';
import { useSnapshot } from 'valtio';
import groupBy from 'lodash/groupBy';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Input, Modal, Button } from '@oss-compass/ui';
import { FormItemLabel, ItemCard, ItemCardPlus } from '../styled';
import CategoryMenu from './CategoryMenu';
import ModalContent from './ModalContent';
import { formState } from '../state';

const FormDataSet = () => {
  const [open, setOpen] = useState(false);

  const snapshot = useSnapshot(formState);
  const item = groupBy(snapshot.dataSet, 'secondIdent');
  const subIdents = Object.keys(item);

  return (
    <div className="mb-6">
      <FormItemLabel>选择数据集</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        {subIdents.map((ident) => {
          return (
            <ItemCard
              key={ident}
              ident={ident}
              count={item[ident].length}
              onHandleEdit={() => {
                setOpen(true);
              }}
              onHandleDelete={() => {}}
            />
          );
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

export default FormDataSet;
