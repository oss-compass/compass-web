import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { BsDownload } from 'react-icons/bs';
import { AiOutlineLoading } from 'react-icons/ai';

const Download = ({ downloadFun }: { downloadFun: () => void }) => {
  const { t } = useTranslation();
  const [loadingDownLoad, setLoadingDownLoad] = useState(false);

  return (
    <>
      <div className="flex h-7 w-10 cursor-pointer items-center justify-center rounded-sm border border-[#3f60ef] text-xs text-[#3f60ef]">
        {loadingDownLoad ? (
          <AiOutlineLoading className="t animate-spin" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={async () => {
              setLoadingDownLoad(true);
              await downloadFun();
              setLoadingDownLoad(false);
            }}
          >
            <BsDownload />
          </div>
        )}
      </div>
    </>
  );
};
export default Download;
