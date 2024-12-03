import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import groupBy from 'lodash/groupBy';
import { FormItemLabel } from '../Misc';
import { ItemCard, ItemCardPlus } from './SelectedItem';
import { formState, actions } from '../state';
import { formFiledState } from './state';

const FormDataSet = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const snapshot = useSnapshot(formState);
  const item = groupBy(snapshot.dataSet, 'secondIdent');
  const subIdents = Object.keys(item);
  const dateSetSelectedLength = snapshot.dataSet.length;

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

        {dateSetSelectedLength < 10 ? (
          <ItemCardPlus
            onHandleAdd={() => {
              setOpen(true);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FormDataSet;
