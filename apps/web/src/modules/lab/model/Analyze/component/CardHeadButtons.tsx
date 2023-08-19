import React, { useRef } from 'react';
import { TbMessage2 } from 'react-icons/tb';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { getBodyScrollTop } from '@common/utils';
import { BadgeCount } from '@modules/lab/model/components/BadgeCount';

import { actions, pageState } from '../state';

const CardHeadButtons = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(pageState);
  const commentCount = snapshot.chartMeta[id]?.['commentCount'];

  const registerPosition = (el: HTMLDivElement) => {
    const rect = el?.getBoundingClientRect();
    if (rect?.top) {
      const scrollTop = getBodyScrollTop();
      actions.onSyncChartPosition(id, rect?.top + scrollTop);
    }
  };

  const handleScrollToComment = () => {
    const el = document.getElementById(`comment_${id}`);
    if (el) {
      el.scrollIntoView?.({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center"
      onClick={() => {
        actions.toggleCommentDrawer(true);
        actions.onCommentPanelShow(id, true);
        setTimeout(() => {
          handleScrollToComment();
          actions.activeComment(id);
        }, 100);
      }}
      ref={(el) => registerPosition(el)}
    >
      <TbMessage2 className="text-steel" />
      <span className="text-steel  ml-1 text-xs">{t('lab:discuss')}</span>
      {commentCount > 0 ? (
        <BadgeCount className="ml-1" count={commentCount} />
      ) : null}
    </div>
  );
};

export default CardHeadButtons;
