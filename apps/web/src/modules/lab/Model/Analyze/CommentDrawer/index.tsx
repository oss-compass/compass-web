import React, { useRef } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'next-i18next';

import VersionSelect from './VersionSelect';
import CommentSection from './CommentSection';
import { useLabModelDetail, useLabModelVersion } from '../../hooks';

const CommentDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { data: modelDetail } = useLabModelDetail();
  const { data: modelVersion } = useLabModelVersion();

  const name = modelDetail?.labModelDetail?.name || '';
  const metrics = modelVersion?.labModelVersion?.metrics || [];

  return (
    <div
      className={classnames(
        'border-silver shrink-0 overflow-hidden  border-l transition-all',
        [open ? 'h-auto w-[400px] opacity-100' : 'h-0 w-0 opacity-0']
      )}
    >
      <div className="flex h-10 items-center justify-between border-b border-[#EAEAEA] bg-[#FAFAFA] pl-4 pr-2">
        <div className="text-sm">
          {t('lab:discuss')}
          {/*（{lastItem?.labModelComments?.count || 0}）*/}
        </div>
        <div className="flex items-center">
          <VersionSelect />
          <div
            className="hover:bg-smoke ml-2 cursor-pointer p-2"
            onClick={() => {
              onClose();
            }}
          >
            <GrClose className="" />
          </div>
        </div>
      </div>

      {/* model comment */}
      <CommentSection name={name} />

      {/* metrics comment */}
      {metrics.map((metric) => {
        return (
          <CommentSection
            key={metric.id}
            modelMetricId={metric.id}
            name={metric.name}
          />
        );
      })}
    </div>
  );
};

export default CommentDrawer;
