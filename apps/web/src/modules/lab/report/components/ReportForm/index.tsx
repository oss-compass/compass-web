import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import groupBy from 'lodash/groupBy';
import { FormItemLabel } from '@modules/lab/model/Form/Misc';
import { ItemCard, ItemCardPlus } from './FormDataSet/SelectedItem';
import { formState, actions } from './state';
import { formFiledState } from '@modules/lab/model/Form/FormDataSet/state';
import ModalSelect from './FormDataSet/Modal';

const ReportForm = ({ name, version, modelIsPublic = false, edit = false }) => {
  const { t } = useTranslation();
  const [openModalSelect, setOpenModalSelect] = useState(false);

  const snapshot = useSnapshot(formState);
  const item = groupBy(snapshot.dataSet, 'secondIdent');
  const subIdents = Object.keys(item);
  const dateSetSelectedLength = snapshot.dataSet?.length;
  useEffect(() => {
    actions.resetForm();
    if (edit && version) {
      const { isPublic, datasetStatus } = version;
      formState.isPublic = isPublic;
      formState.dataSet = datasetStatus?.items?.map((i) => {
        return {
          label: i.label,
          level: i.level,
          firstIdent: i.firstIdent,
          secondIdent: i.secondIdent,
        };
      });
    }
  }, [version]);

  return (
    <>
      <ModalSelect
        open={openModalSelect}
        onClose={() => {
          setOpenModalSelect(false);
        }}
      />
      <div className="pt-8 md:px-2">
        <FormItemLabel className="text-secondary mb-3  text-sm font-semibold">
          {t('lab:model_name')}
        </FormItemLabel>
        <div className="mb-3 text-xl font-medium">{name}</div>
        <FormItemLabel className="text-secondary mb-3  text-sm font-semibold">
          {t('lab:versions')}
        </FormItemLabel>
        <div className="mb-3 text-xl font-medium"> {version.version}</div>
        {/* <FormIsPublic disabled={false} /> */}
        <FormItemLabel className="text-secondary mb-3  text-sm font-semibold">
          {t('lab:select_dataset')}
        </FormItemLabel>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
          {subIdents.map((subIdent) => {
            return (
              <ItemCard
                key={subIdent}
                ident={subIdent}
                count={item[subIdent].length}
                onHandleEdit={() => {
                  setOpenModalSelect(true);
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
                setOpenModalSelect(true);
              }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReportForm;
