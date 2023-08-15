import React, { useState, useRef } from 'react';
import { Popper } from '@oss-compass/ui';
import { useTranslation } from 'next-i18next';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useSnapshot } from 'valtio';
import { PopperRefProps } from '@oss-compass/ui';
import { useLabModelDetail } from '../../hooks';
import { pageState, actions } from '../state';

const VersionSelect = () => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(pageState);
  const popperRef = useRef<PopperRefProps>();
  const { data } = useLabModelDetail();
  const versions = data?.labModelDetail?.latestVersions;

  return (
    <>
      <Popper
        ref={popperRef}
        placement="bottom-end"
        content={
          <div className="w-40 rounded bg-white shadow">
            {versions.map((version) => {
              return (
                <div
                  key={version.id}
                  className="cursor-pointer border-b px-2 py-2 text-sm"
                  onClick={() => {
                    popperRef.current.toggle();
                    actions.onCurrentVersionChange({
                      id: version.id,
                      version: version.version,
                    });
                  }}
                >
                  {version.version}
                </div>
              );
            })}
          </div>
        }
      >
        {(trigger) => (
          <div
            className="flex cursor-pointer items-center py-2"
            onClick={(e) => trigger(e)}
          >
            <div className="text-xs">
              {t('lab:versions')}: {snapshot.commentVersion?.version}
            </div>
            <IoMdArrowDropdown />
          </div>
        )}
      </Popper>
    </>
  );
};

export default VersionSelect;
