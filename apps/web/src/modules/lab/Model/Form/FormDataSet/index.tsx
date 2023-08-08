import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import groupBy from 'lodash/groupBy';
import { FormItemLabel } from '../styled';
import { ItemCard, ItemCardPlus } from './SelectedItem';
import ModalSelect from './Modal';
import { formState, actions } from '../state';
import { formFiledState } from './state';

const FormDataSet = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const snapshot = useSnapshot(formState);
  const item = groupBy(snapshot.dataSet, 'secondIdent');
  const subIdents = Object.keys(item);

  return (
    <div className="mb-6">
      <FormItemLabel>{t('lab:add_dataset')}</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        {subIdents.map((subIdent) => {
          return (
            <ItemCard
              key={subIdent}
              ident={subIdent}
              count={item[subIdent].length}
              onHandleEdit={() => {
                setOpen(true);

                // 弹窗内默认展开
                const editItem = item[subIdent];
                if (editItem && editItem.length > 0) {
                  const { firstIdent, secondIdent } = editItem[0];
                  formFiledState.levelFirst = firstIdent;
                  formFiledState.levelSecond = secondIdent;
                }
              }}
              onHandleDelete={() => {
                actions.onDeleteDataSetItem(subIdent);
              }}
            />
          );
        })}
        <ItemCardPlus
          onHandleAdd={() => {
            setOpen(true);
          }}
        />
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

export default FormDataSet;
