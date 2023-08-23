import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import { MetricName, MetricDesc } from '../Misc';

export const SelectedItemCard = ({
  category,
  ident,
  onHandleDelete,
}: {
  category: string;
  ident: string;
  onHandleDelete: () => void;
}) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <div className="min-h-24 flex flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3">
        <div className="flex-1">
          <div className="text-sm font-medium">
            <MetricName ident={ident} category={category} />
          </div>
          <div className="text-steel line-clamp-3 text-xs">
            <MetricDesc ident={ident} category={category} />
          </div>
        </div>
        <div className="flex justify-end text-[#585858]">
          <div
            className="cursor-pointer p-1"
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            <RiDeleteBinLine />
          </div>
        </div>
      </div>
      <Dialog
        open={openConfirm}
        dialogTitle={<>{t('common:btn.confirm')}</>}
        dialogContent={<div className="w-96">{t('common:confirm.delete')}</div>}
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                onHandleDelete();
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};

export const ItemCardPlus = ({ onHandleAdd }: { onHandleAdd: () => void }) => {
  return (
    <div
      className="hover:bg-smoke flex min-h-[96px] cursor-pointer flex-col items-center justify-center border  border-[#CCCCCC] p-3 text-lg"
      onClick={() => {
        onHandleAdd();
      }}
    >
      <AiOutlinePlus />
    </div>
  );
};
