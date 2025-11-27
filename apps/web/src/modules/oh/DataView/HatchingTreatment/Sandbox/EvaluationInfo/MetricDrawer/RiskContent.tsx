import React, { useState } from 'react';
import CommentEdit from './CommentEdit';
import CommentItemMore from './CommentItemMore';
import Image from 'next/image';
import { formatToNow } from '@common/utils/time';
import {
  RiskStore,
  riskEvent,
} from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/store/useRiskStore';

const RiskContent = ({
  item,
  shortCode,
  refetch,
}: {
  item: any;
  shortCode: string;
  refetch: () => void;
}) => {
  const { content, userId, id } = item;
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="flex pb-4">
        <div className="relative h-8 w-8  shrink-0 overflow-hidden rounded-full">
          <Image
            src={
              item?.user?.loginBinds[0]?.avatarUrl ||
              '/images/default-avatar.png'
            }
            unoptimized
            fill
            sizes="64px"
            style={{
              objectFit: 'cover',
            }}
            alt={'avatar'}
          />
        </div>
        <div className="flex-1 pl-2">
          <div className="mt-1 flex items-center justify-between">
            <div className=" flex items-center ">
              <div className="text-sm font-medium">{item?.user?.name}</div>
              <div className="text-secondary ml-2 text-xs">
                {formatToNow(item?.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        {edit ? (
          <CommentEdit
            content={content}
            clarificationId={id}
            onUpdateSuccess={() => {
              refetch();
              setTimeout(() => {
                setEdit(false);
              }, 1000);
            }}
            onCancel={() => {
              setEdit(false);
            }}
          />
        ) : (
          content
        )}
      </div>
      <div className="absolute top-4 right-4">
        <CommentItemMore
          userId={userId}
          clarificationId={item.id}
          onDeleteEdit={() => {
            setEdit(true);
          }}
          onDeleteSuccess={() => {
            refetch();
            RiskStore.event$[shortCode]?.emit(riskEvent.REFRESH);
          }}
        />
      </div>
    </>
  );
};

export default RiskContent;
