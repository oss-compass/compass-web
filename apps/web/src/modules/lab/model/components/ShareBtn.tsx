import React from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { PiShareFatLight } from 'react-icons/pi';

const ShareBtn = ({ id }: { id: number }) => {
  const { t } = useTranslation();

  return (
    <div
      className="mr-2 flex cursor-pointer items-center"
      onClick={() => {
        if (navigator.clipboard?.writeText) {
          let source = `https://oss-compass.org/lab/model/${id}/detail`;
          navigator.clipboard
            .writeText(source)
            .then((value) => {
              toast.success(t('lab:copy_successfully'), {
                duration: 4000,
              });
            })
            .catch((err) => {
              toast.error('Failed! No copy permission');
            });
        } else {
          toast.error('Failed! Not Supported clipboard');
        }
      }}
    >
      <PiShareFatLight />
      <div className="ml-1 text-sm">{t('lab:share')}</div>
    </div>
  );
};

export default ShareBtn;
