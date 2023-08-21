import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'next-i18next';
import VersionSelect from './VersionSelect';
import CommentSection from './CommentSection';
import { useLabModelDetail, useLabModelVersion } from '../../hooks';
import { actions } from '../state';

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

  useEffect(() => {
    if (modelVersion?.labModelVersion) {
      const { id, version } = modelVersion?.labModelVersion;
      actions.onCurrentVersionChange({ id, version });
    }
  }, [modelVersion]);

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

      <div className="px-4 pb-10">
        {/* model comment */}
        <CommentSection
          name={name}
          anchor={`card_model_${modelDetail?.labModelDetail?.id}`}
        />

        {/* metrics comment */}
        {metrics.map((metric) => {
          return (
            <CommentSection
              key={metric.id}
              modelMetricId={metric.id}
              name={t(`lab_metrics:${metric.category}.${metric.ident}`)}
              anchor={`card_${metric.category}_${metric.ident}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentDrawer;
