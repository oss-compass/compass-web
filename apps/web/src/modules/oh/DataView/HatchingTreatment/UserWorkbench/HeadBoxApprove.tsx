import React from 'react';
import classnames from 'classnames';
import style from './HeadBox.module.scss';
import client from '@common/gqlClient';
import { useTpcSoftwareMyReviewOverviewQuery } from '@oss-compass/graphql';
import { queryKey } from '@modules/oh/constant';
import LoadingBox from './LoadingBox';

const HeadBoxApprove = ({ active, onClickFun }) => {
  const { data, isLoading } = useTpcSoftwareMyReviewOverviewQuery(client, {
    ...queryKey,
  });
  if (isLoading) {
    return (
      <div className="h-48 w-[435px] rounded bg-[#f5fdf0]">
        <LoadingBox />
      </div>
    );
  }
  const {
    totalCount,
    awaitingClarificationCount,
    awaitingConfirmationCount,
    awaitingReviewCount,
    completedCount,
    rejectedCount,
  } = data.tpcSoftwareMyReviewOverview;
  return (
    <div
      onClick={onClickFun}
      className={classnames(
        style.Box,
        [active && '!bg-[#87da4c] text-white'],
        'relative h-48 w-[435px] cursor-pointer rounded bg-[#f5fdf0] p-5 text-sm'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold">我审批的流程总数</div>
        <div className="text-2xl font-extrabold">{totalCount || 0}</div>
      </div>
      <div className="mt-12 flex justify-between">
        <div className="">
          <div>待处理（待澄清/待确认/待审批）</div>
          <div className="mt-4 text-2xl font-extrabold">
            {awaitingClarificationCount +
              awaitingConfirmationCount +
              awaitingReviewCount || 0}
            ({awaitingClarificationCount || 0}/{awaitingConfirmationCount || 0}/
            {awaitingReviewCount || 0})
          </div>
        </div>
        <div className="">
          <div>已完成（已通过/已拒绝）</div>
          <div className="mt-4 text-2xl font-extrabold">
            {rejectedCount + completedCount || 0}({completedCount || 0}/
            {rejectedCount || 0})
          </div>
        </div>
      </div>

      {active ? (
        <div
          className={classnames(
            style.BoxArrow,
            'absolute left-1/2 top-full mt-0 h-0 w-0 -translate-x-1/2 transform border-t-[#87da4c]'
          )}
        ></div>
      ) : (
        ''
      )}
    </div>
  );
};

export default HeadBoxApprove;
